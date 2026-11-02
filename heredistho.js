(() => {
  "use strict";
  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-tab]'));
  const panels = new Map(
    Array.from(document.querySelectorAll('[role="tabpanel"]')).map(panel => [panel.id.slice(6), panel])
  );
  const ids = tabs.map(tab => tab.dataset.tab);

  function activate(id, focus) {
    const activeId = ids.includes(id) ? id : ids[0];
    tabs.forEach(tab => {
      const selected = tab.dataset.tab === activeId;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach((panel, key) => { panel.hidden = key !== activeId; });
  }

  function select(id, focus) {
    if (!ids.includes(id)) return;
    activate(id, focus);
    if (window.location.hash !== "#" + id) {
      window.location.hash = id;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab.dataset.tab, false));
    tab.addEventListener("keydown", event => {
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next].dataset.tab, true);
    });
  });

  window.addEventListener("hashchange", () => {
    const target = window.location.hash.slice(1);
    if (ids.includes(target)) activate(target, false);
  });

  const initial = window.location.hash.slice(1);
  activate(ids.includes(initial) ? initial : ids[0], false);
})();