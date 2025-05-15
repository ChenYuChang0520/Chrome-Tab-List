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
    icon.style.backgroundColor = "#ddd";  // 或用 #e0e0e0、#ccc
    icon.style.borderRadius = "4px";
    icon.style.padding = "2px";
    // 建立連結
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = tab.title || tab.url;
    item.addEventListener("click", () => {
      chrome.tabs.update(tab.id, { active: true });
      chrome.windows.update(tab.windowId, { focused: true });
    });
    item.appendChild(icon);
    item.appendChild(link);
    container.appendChild(item);
    // Highlight Active Tabs
    if (tab.active && tab.highlighted) {
      item.style.backgroundColor = "rgba(0, 0, 0, 0.3)"; // 或其他高亮色
    }
  }
}

listAllTabs();
