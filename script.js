(() => {
  "use strict";
  const casos = {
    heredistho: {numero:"01",titulo:"A Maldição de Heredistho",estado:"JÁ JOGADO"},
    principe: {numero:"02",titulo:"O Culto do Príncipe",estado:"JÁ JOGADO"},
    cataclisma: {numero:"03",titulo:"O Cataclisma",estado:"AINDA NÃO JOGADO"}
  };
  const janela = document.getElementById("case-dialog");
  const fechar = () => {
    if (typeof janela.close === "function") janela.close();
    else janela.removeAttribute("open");
  };
  const abrir = chave => {
    const caso = casos[chave];
    if (!caso) return;
    document.getElementById("dialog-number").textContent = "CASO " + caso.numero;
    document.getElementById("dialog-title").textContent = caso.titulo;
    document.getElementById("dialog-status").textContent = caso.estado;
    if (typeof janela.showModal === "function") janela.showModal();
    else janela.setAttribute("open","");
  };

  document.querySelectorAll("[data-case]").forEach(botao => {
    botao.addEventListener("click", () => abrir(botao.dataset.case));
  });
  document.getElementById("dialog-close").addEventListener("click",fechar);
  document.getElementById("dialog-back").addEventListener("click",fechar);
  janela.addEventListener("click",evento => {
    if (evento.target === janela) fechar();
  });

  document.addEventListener("keydown",evento => {
    if (janela.open || evento.altKey || evento.ctrlKey || evento.metaKey) return;
    const foco = document.activeElement;
    if (foco && (foco.isContentEditable || ["INPUT","TEXTAREA","SELECT"].includes(foco.tagName))) return;
    if (evento.key === "1" || evento.key === "2") {
      window.location.assign(evento.key === "1" ? "heredistho.html" : "principe.html");
      return;
    }
    const mapa = {"3":"cataclisma"};
    if (mapa[evento.key]) abrir(mapa[evento.key]);
  });
})();