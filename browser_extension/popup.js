const apiBaseUrl = document.getElementById("apiBaseUrl");
const accessToken = document.getElementById("accessToken");
const status = document.getElementById("status");

chrome.storage.sync.get(
  {
    apiBaseUrl: "http://localhost:3000/api",
    accessToken: "",
  },
  (settings) => {
    apiBaseUrl.value = settings.apiBaseUrl;
    accessToken.value = settings.accessToken;
  },
);

document.getElementById("save").addEventListener("click", () => {
  chrome.storage.sync.set(
    {
      apiBaseUrl: apiBaseUrl.value.trim() || "http://localhost:3000/api",
      accessToken: accessToken.value.trim(),
    },
    () => {
      status.textContent = "Saved";
      setTimeout(() => {
        status.textContent = "";
      }, 1600);
    },
  );
});
