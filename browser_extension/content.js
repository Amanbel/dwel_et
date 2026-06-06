const startedAt = Date.now();
let lastUrl = location.href;
let lastSentAt = 0;

const platformFromHost = () => {
  const host = location.hostname.replace("www.", "");
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

const extractHashtags = (text) => Array.from(new Set((text.match(/#[\w-]+/g) || []).map((tag) => tag.slice(1).toLowerCase())));

const buildPayload = () => {
  const title = document.title || getMeta("og:title");
  const description = getMeta("description") || getMeta("og:description");
  const visibleText = `${title} ${description} ${document.body?.innerText?.slice(0, 1200) || ""}`;

  return {
    platform: platformFromHost(),
    url: location.href,
    title,
    description,
    hashtags: extractHashtags(visibleText),
    duration: Math.max(5, Math.round((Date.now() - startedAt) / 1000)),
  };
};

const sendEvent = () => {
  const now = Date.now();
  if (now - lastSentAt < 30000) return;
  lastSentAt = now;
  chrome.runtime.sendMessage({ type: "DWEL_CONTENT_EVENT", payload: buildPayload() });
};

setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    lastSentAt = 0;
  }
  sendEvent();
}, 15000);

window.addEventListener("beforeunload", sendEvent);
