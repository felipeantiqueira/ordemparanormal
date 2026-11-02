(() => {
  "use strict";
  const cases = {
    heredistho: { number: "01", serial: "/ 001", title: "A MALDIÇÃO DE HEREDISTHO" },
    principe: { number: "02", serial: "/ 002", title: "O CULTO DO PRÍNCIPE" },
    cataclisma: { number: "03", serial: "/ 003", title: "O CATACLISMA" }
  };
  const archiveDialog = document.getElementById("case-dialog");
  const aboutDialog = document.getElementById("about-dialog");
  const caseCards = Array.from(document.querySelectorAll(".case-card"));
  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }
  function openCase(key) {
    const entry = cases[key];
    if (!entry) return;
    document.getElementById("dialog-serial").textContent = entry.serial;
    document.getElementById("dialog-number").textContent = entry.number;
    document.getElementById("dialog-title").textContent = entry.title;
    openDialog(archiveDialog);
  }
  caseCards.forEach(card => {
    card.addEventListener("click", () => openCase(card.dataset.case));
    card.addEventListener("pointerenter", () => {
      document.getElementById("orbit-number").textContent = cases[card.dataset.case].number;
      document.getElementById("orbit-sub").textContent = "SELECIONADO";
    });
    card.addEventListener("pointerleave", () => {
      document.getElementById("orbit-number").textContent = "03";
      document.getElementById("orbit-sub").textContent = "REGISTROS";
    });
  });
  document.getElementById("dialog-close").addEventListener("click", () => closeDialog(archiveDialog));
  document.getElementById("dialog-back").addEventListener("click", () => closeDialog(archiveDialog));
  document.getElementById("about-open").addEventListener("click", () => openDialog(aboutDialog));
  document.getElementById("about-close").addEventListener("click", () => closeDialog(aboutDialog));
  document.getElementById("about-back").addEventListener("click", () => closeDialog(aboutDialog));
  [archiveDialog, aboutDialog].forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });
  document.addEventListener("keydown", event => {
    if (archiveDialog.open || aboutDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    const focused = document.activeElement;
    if (focused && /INPUT|TEXTAREA|SELECT/.test(focused.tagName)) return;
    const keyMap = { "1": "heredistho", "2": "principe", "3": "cataclisma" };
    if (keyMap[event.key]) openCase(keyMap[event.key]);
  });
  const toggle = document.getElementById("signal-toggle");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.body.classList.add("signal-off");
    toggle.classList.add("is-off");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Ativar efeitos de sinal");
    toggle.querySelector(".signal-label").textContent = "SINAL PAUSADO";
  }
  toggle.addEventListener("click", () => {
    const isOff = document.body.classList.toggle("signal-off");
    toggle.classList.toggle("is-off", isOff);
    toggle.setAttribute("aria-pressed", String(!isOff));
    toggle.setAttribute("aria-label", isOff ? "Ativar efeitos de sinal" : "Desativar efeitos de sinal");
    toggle.querySelector(".signal-label").textContent = isOff ? "SINAL PAUSADO" : "SINAL ATIVO";
  });
  let requestedFrame = false;
  document.addEventListener("pointermove", event => {
    if (document.body.classList.contains("signal-off") || requestedFrame) return;
    requestedFrame = true;
    const x = event.clientX, y = event.clientY;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--mx", x + "px");
      document.documentElement.style.setProperty("--my", y + "px");
      requestedFrame = false;
    });
  }, { passive: true });
})();