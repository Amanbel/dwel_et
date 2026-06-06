const apiBaseUrl = document.getElementById("apiBaseUrl");
const accessToken = document.getElementById("accessToken");
const trackingEnabled = document.getElementById("trackingEnabled");
const connectionLabel = document.getElementById("connectionLabel");
const statusDot = document.getElementById("statusDot");
const eventCount = document.getElementById("eventCount");
const lastStatus = document.getElementById("lastStatus");
const status = document.getElementById("status");
const saveButton = document.getElementById("save");
const testButton = document.getElementById("test");
const clearTokenButton = document.getElementById("clearToken");

const DEFAULT_API_URL = "http://localhost:3000/api";

const normalizeApiBaseUrl = (value) => {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  return trimmed || DEFAULT_API_URL;
};

const setStatusText = (message, tone = "") => {
  status.textContent = message;
  status.className = tone;
};

const setConnectionState = (message, tone) => {
  connectionLabel.textContent = message;
  statusDot.className = `dot ${tone === "ok" ? "dot-ok" : tone === "error" ? "dot-error" : "dot-muted"}`;
};

const render = ({ settings, status: storedStatus }) => {
  apiBaseUrl.value = settings.apiBaseUrl || DEFAULT_API_URL;
  accessToken.value = settings.accessToken || "";
  trackingEnabled.checked = Boolean(settings.trackingEnabled);
  eventCount.textContent = String(storedStatus.eventCount || 0);
  lastStatus.textContent = storedStatus.lastStatus || "--";

  if (!settings.accessToken) {
    setConnectionState("Token required", "muted");
    return;
  }

  if (storedStatus.lastError) {
    setConnectionState(storedStatus.lastMessage || "Connection issue", "error");
    return;
  }

  setConnectionState(storedStatus.lastMessage || "Ready to collect", settings.trackingEnabled ? "ok" : "muted");
};

const loadState = () => {
  chrome.runtime.sendMessage({ type: "DWEL_GET_STATUS" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      setConnectionState("Extension worker unavailable", "error");
      return;
    }

    render(response);
  });
};

const saveSettings = (message = "Settings saved") => {
  const nextSettings = {
    apiBaseUrl: normalizeApiBaseUrl(apiBaseUrl.value),
    accessToken: accessToken.value.trim(),
    trackingEnabled: trackingEnabled.checked,
  };

  chrome.storage.sync.set(nextSettings, () => {
    setStatusText(message, "success");
    loadState();
    setTimeout(() => setStatusText(""), 1800);
  });
};

saveButton.addEventListener("click", () => {
  saveSettings();
});

trackingEnabled.addEventListener("change", () => {
  saveSettings(trackingEnabled.checked ? "Tracking enabled" : "Tracking paused");
});

testButton.addEventListener("click", () => {
  saveSettings("Testing connection...");
  testButton.disabled = true;

  chrome.runtime.sendMessage({ type: "DWEL_TEST_CONNECTION" }, (response) => {
    testButton.disabled = false;

    if (chrome.runtime.lastError || !response) {
      setStatusText("Could not reach extension worker", "error");
      loadState();
      return;
    }

    setStatusText(response.ok ? "Connected to DWEL" : "Connection test failed", response.ok ? "success" : "error");
    loadState();
  });
});

clearTokenButton.addEventListener("click", () => {
  accessToken.value = "";
  saveSettings("Token cleared");
});

document.addEventListener("DOMContentLoaded", loadState);
loadState();
