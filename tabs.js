async function listAllTabs() {
  const tabs = await chrome.tabs.query({});
  const container = document.getElementById("tabs");

  for (const tab of tabs) {
    const item = document.createElement("li");
    item.className = "tab-item";

    // 建立 favicon 圖示
    const icon = document.createElement("img");
    icon.src = tab.favIconUrl || "google.png";
    icon.style.flexShrink = "0";
    
    // 建立連結
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = tab.title || tab.url;
    link.addEventListener("click", () => {
      chrome.tabs.update(tab.id, { active: true });
      chrome.windows.update(tab.windowId, { focused: true });
    });
    item.appendChild(icon);
    item.appendChild(link);
    container.appendChild(item);
  }
}

listAllTabs();
