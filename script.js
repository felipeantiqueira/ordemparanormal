/* GNOLAND — case selection. No case history is filled in automatically. */
(() => {
  "use strict";
  const cases = {
    heredistho: {
      number: "01", serial: "/ 001", title: "A MALDIÇÃO DE HEREDISTHO",
      description: "Um dos casos que já jogamos. Esta página será construída com as lembranças, arquivos e informações que decidirmos publicar.",
      status: "CASO JOGADO · PÁGINA EM PREPARAÇÃO"
    },
    principe: {
      number: "02", serial: "/ 002", title: "O CULTO DO PRÍNCIPE",
      description: "Um dos casos que já jogamos. Esta página será construída com as lembranças, arquivos e informações que decidirmos publicar.",
      status: "CASO JOGADO · PÁGINA EM PREPARAÇÃO"
    },
    cataclisma: {
      number: "03", serial: "/ 003", title: "O CATACLISMA",
      description: "Este caso ainda não foi jogado. Seu espaço está reservado e não vamos antecipar acontecimentos nem criar informações antes da hora.",
      status: "AINDA NÃO JOGADO"
    }
  };
  const caseDialog = document.getElementById("case-dialog");
  const aboutDialog = document.getElementById("about-dialog");

  function show(dialog) {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function hide(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }
  function openCase(key) {
    const data = cases[key];
    if (!data) return;
    document.getElementById("dialog-serial").textContent = data.serial;
    document.getElementById("dialog-number").textContent = data.number;
    document.getElementById("dialog-title").textContent = data.title;
    document.getElementById("dialog-description").textContent = data.description;
    document.getElementById("dialog-status").textContent = data.status;
    show(caseDialog);
  }
  document.querySelectorAll("[data-case]").forEach(card => {
    card.addEventListener("click", () => openCase(card.dataset.case));
  });
  document.getElementById("dialog-close").addEventListener("click", () => hide(caseDialog));
  document.getElementById("dialog-back").addEventListener("click", () => hide(caseDialog));
  document.getElementById("about-open").addEventListener("click", () => show(aboutDialog));
  document.getElementById("about-close").addEventListener("click", () => hide(aboutDialog));
  document.getElementById("about-back").addEventListener("click", () => hide(aboutDialog));
  [caseDialog, aboutDialog].forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) hide(dialog);
    });
  });
  document.addEventListener("keydown", event => {
    if (caseDialog.open || aboutDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    const focused = document.activeElement;
    if (focused && (["INPUT","TEXTAREA","SELECT"].includes(focused.tagName) || focused.isContentEditable)) return;
    const shortcut = { "1": "heredistho", "2": "principe", "3": "cataclisma" }[event.key];
    if (shortcut) openCase(shortcut);
  });
})();