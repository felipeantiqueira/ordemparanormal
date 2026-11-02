(() => {
  "use strict";

  const cases = {
    heredistho: { index: "01", title: "A Maldição de Heredistho", status: "Já jogado" },
    principe: { index: "02", title: "O Culto do Príncipe", status: "Já jogado" },
    cataclisma: { index: "03", title: "O Cataclisma", status: "Ainda não jogado" }
  };

  const dialog = document.getElementById("case-dialog");
  const closeButton = document.getElementById("dialog-close");
  const backButton = document.getElementById("dialog-back");

  function openCase(key) {
    const entry = cases[key];
    if (!entry) return;

    document.getElementById("dialog-index").textContent = "CASO " + entry.index;
    document.getElementById("dialog-title").textContent = entry.title;
    document.getElementById("dialog-status").textContent = entry.status;

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeCase() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  document.querySelectorAll("[data-case]").forEach(card => {
    card.addEventListener("click", () => openCase(card.dataset.case));
  });

  closeButton.addEventListener("click", closeCase);
  backButton.addEventListener("click", closeCase);

  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeCase();
  });

  document.addEventListener("keydown", event => {
    if (dialog.open || event.altKey || event.ctrlKey || event.metaKey) return;

    const el = document.activeElement;
    if (el && (["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName) || el.isContentEditable)) return;

    const shortcut = { "1": "heredistho", "2": "principe", "3": "cataclisma" }[event.key];
    if (shortcut) openCase(shortcut);
  });
})();