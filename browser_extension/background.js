chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "DWEL_CONTENT_EVENT") return false;

  chrome.storage.sync.get(
    {
      apiBaseUrl: "http://localhost:3000/api",
      accessToken: "",
    },
    async (settings) => {
      try {
        if (!settings.accessToken) {
          sendResponse({ ok: false, message: "Missing access token" });
          return;
        }

        const response = await fetch(`${settings.apiBaseUrl}/extension/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${settings.accessToken}`,
          },
          body: JSON.stringify(message.payload),
        });

        sendResponse({ ok: response.ok, status: response.status });
      } catch (error) {
        sendResponse({ ok: false, message: error.message });
      }
    },
  );

  return true;
});
