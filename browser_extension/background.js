const DEFAULT_SETTINGS = {
  apiBaseUrl: "http://localhost:3000/api",
  accessToken: "",
  trackingEnabled: true,
};

const DEFAULT_STATUS = {
  eventCount: 0,
  lastStatus: "--",
  lastMessage: "Not configured",
  lastSentAt: null,
  lastError: "",
};

const normalizeApiBaseUrl = (value) => {
  const fallback = DEFAULT_SETTINGS.apiBaseUrl;
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  return trimmed || fallback;
};

const setBadge = (status) => {
  const color = status === "ok" ? "#087a6c" : status === "error" ? "#ba1a1a" : "#7b8494";
  const text = status === "ok" ? "ON" : status === "error" ? "!" : "";

  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color });
};

const readSettings = () =>
  new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      resolve({
        ...settings,
        apiBaseUrl: normalizeApiBaseUrl(settings.apiBaseUrl),
      });
    });
  });

const readStatus = () =>
  new Promise((resolve) => {
    chrome.storage.local.get(DEFAULT_STATUS, (status) => resolve({ ...DEFAULT_STATUS, ...status }));
  });

const writeStatus = async (updates) => {
  const current = await readStatus();
  const next = { ...current, ...updates };
  chrome.storage.local.set(next);
  return next;
};

const updateSuccessStatus = async (statusCode) => {
  const current = await readStatus();
  const next = await writeStatus({
    eventCount: current.eventCount + 1,
    lastStatus: String(statusCode),
    lastMessage: "Collecting content",
    lastSentAt: new Date().toISOString(),
    lastError: "",
  });
  setBadge("ok");
  return next;
};

const updateErrorStatus = async (message, statusCode = "--") => {
  const next = await writeStatus({
    lastStatus: String(statusCode),
    lastMessage: message,
    lastError: message,
  });
  setBadge("error");
  return next;
};

const postContentEvent = async (payload) => {
  const settings = await readSettings();

  if (!settings.trackingEnabled) {
    return { ok: false, message: "Tracking is paused" };
  }

  if (!settings.accessToken) {
    await updateErrorStatus("Missing access token");
    return { ok: false, message: "Missing access token" };
  }

  try {
    const response = await fetch(`${settings.apiBaseUrl}/extension/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await updateErrorStatus(`Event rejected with HTTP ${response.status}`, response.status);
      return { ok: false, status: response.status };
    }

    await updateSuccessStatus(response.status);
    return { ok: true, status: response.status };
  } catch (error) {
    const message = error?.message || "Unable to reach DWEL API";
    await updateErrorStatus(message);
    return { ok: false, message };
  }
};

const testConnection = async () => {
  const settings = await readSettings();

  if (!settings.accessToken) {
    await updateErrorStatus("Paste an access token first");
    return { ok: false, message: "Paste an access token first" };
  }

  try {
    const response = await fetch(`${settings.apiBaseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${settings.accessToken}`,
      },
    });

    if (!response.ok) {
      await updateErrorStatus(`Token test failed with HTTP ${response.status}`, response.status);
      return { ok: false, status: response.status };
    }

    await writeStatus({
      lastStatus: String(response.status),
      lastMessage: "Connected to DWEL",
      lastError: "",
    });
    setBadge(settings.trackingEnabled ? "ok" : "idle");
    return { ok: true, status: response.status };
  } catch (error) {
    const message = error?.message || "Unable to reach DWEL API";
    await updateErrorStatus(message);
    return { ok: false, message };
  }
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set(DEFAULT_STATUS);
  setBadge("idle");
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync" && changes.trackingEnabled) {
    setBadge(changes.trackingEnabled.newValue ? "ok" : "idle");
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "DWEL_CONTENT_EVENT") {
    postContentEvent(message.payload).then(sendResponse);
    return true;
  }

  if (message.type === "DWEL_TEST_CONNECTION") {
    testConnection().then(sendResponse);
    return true;
  }

  if (message.type === "DWEL_GET_STATUS") {
    Promise.all([readSettings(), readStatus()]).then(([settings, status]) => {
      sendResponse({ settings, status });
    });
    return true;
  }

  return false;
});
