let currentUrl = location.href;
let activeSeconds = 0;
let lastTickAt = Date.now();
let lastSentAt = 0;
let lastSignature = "";
let isWindowFocused = document.hasFocus();

const MIN_ACTIVE_SECONDS = 10;
const SEND_INTERVAL_MS = 45000;
const MAX_TEXT_CHARS = 1400;

const platformFromHost = () => {
  const host = location.hostname.replace(/^www\./, "");
  if (host.includes("youtube")) return "youtube";
  if (host.includes("tiktok")) return "tiktok";
  if (host.includes("instagram")) return "instagram";
  if (host.includes("reddit")) return "reddit";
  if (host.includes("twitter") || host === "x.com") return "x";
  if (host.includes("facebook")) return "facebook";
  return host;
};

const getMeta = (name) =>
  document.querySelector(`meta[name="${name}"]`)?.content ||
  document.querySelector(`meta[property="${name}"]`)?.content ||
  "";

const getCanonicalUrl = () =>
  document.querySelector('link[rel="canonical"]')?.href || location.href;

const cleanText = (value) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim();

const extractHashtags = (text) =>
  Array.from(
    new Set(
      (text.match(/#[\w-]+/g) || [])
        .map((tag) => tag.slice(1).toLowerCase())
        .filter(Boolean),
    ),
  ).slice(0, 12);

const getReadableBodyText = () => {
  const selectors = [
    "article",
    "main",
    '[data-testid="tweetText"]',
    "#description",
    "h1",
    "h2",
    "p",
  ];

  const text = selectors
    .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
    .map((node) => node.innerText || node.textContent || "")
    .join(" ");

  return cleanText(text || document.body?.innerText || "").slice(
    0,
    MAX_TEXT_CHARS,
  );
};

const buildPayload = () => {
  const title = cleanText(document.title || getMeta("og:title"));
  const description = cleanText(
    getMeta("description") || getMeta("og:description"),
  );
  const textContext = getReadableBodyText();
  const combinedText = `${title} ${description} ${textContext}`;

  return {
    platform: platformFromHost(),
    url: getCanonicalUrl(),
    title,
    description: description || textContext.slice(0, 260),
    hashtags: extractHashtags(combinedText),
    duration: Math.max(MIN_ACTIVE_SECONDS, Math.round(activeSeconds)),
  };
};

const payloadSignature = (payload) =>
  [
    payload.platform,
    payload.url,
    payload.title,
    payload.description,
    payload.duration,
  ].join("|");

const tickActiveTime = () => {
  const now = Date.now();
  const elapsedSeconds = Math.min(10, Math.max(0, (now - lastTickAt) / 1000));
  lastTickAt = now;

  if (!document.hidden && isWindowFocused) {
    activeSeconds += elapsedSeconds;
  }
};

const resetForNavigation = () => {
  currentUrl = location.href;
  activeSeconds = 0;
  lastTickAt = Date.now();
  lastSentAt = 0;
  lastSignature = "";
};

const sendEvent = ({ force = false } = {}) => {
  tickActiveTime();

  const now = Date.now();
  if (!force && now - lastSentAt < SEND_INTERVAL_MS) return;
  if (activeSeconds < MIN_ACTIVE_SECONDS) return;

  const payload = buildPayload();
  const signature = payloadSignature(payload);

  if (!force && signature === lastSignature) return;

  lastSentAt = now;
  lastSignature = signature;

  chrome.runtime.sendMessage({ type: "DWEL_CONTENT_EVENT", payload }, () => {
    chrome.runtime.lastError;
  });
};

const watchSpaNavigation = () => {
  const checkUrl = () => {
    if (location.href !== currentUrl) {
      sendEvent({ force: true });
      resetForNavigation();
    }
  };

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function pushState(...args) {
    originalPushState.apply(this, args);
    setTimeout(checkUrl, 0);
  };

  history.replaceState = function replaceState(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(checkUrl, 0);
  };

  window.addEventListener("popstate", checkUrl);
  setInterval(checkUrl, 2000);
};

window.addEventListener("focus", () => {
  isWindowFocused = true;
  lastTickAt = Date.now();
});

window.addEventListener("blur", () => {
  tickActiveTime();
  isWindowFocused = false;
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    sendEvent({ force: true });
  } else {
    lastTickAt = Date.now();
  }
});

window.addEventListener("beforeunload", () => sendEvent({ force: true }));

watchSpaNavigation();
setInterval(sendEvent, 15000);
