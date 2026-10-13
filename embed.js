(function () {
  "use strict";

  const CHATBOT_ORIGIN = "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev";
  const CLOSED_SIZE   = "120px";   // bigger so shadows aren't clipped
  const OPEN_WIDTH    = "430px";
  const OPEN_HEIGHT   = "650px";

  function init() {
    if (document.getElementById("kk-widget-root")) return;

    const root = document.createElement("div");
    root.id = "kk-widget-root";
    Object.assign(root.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "2147483647"
    });

    const iframe = document.createElement("iframe");
    iframe.src = CHATBOT_ORIGIN + "/";
    iframe.title = "Kreative Kudi AI Assistant";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allow", "clipboard-write; microphone");
    iframe.setAttribute("allowtransparency", "true");

    Object.assign(iframe.style, {
      position: "fixed",
      right: "0",
      bottom: "0",
      width: CLOSED_SIZE,
      height: CLOSED_SIZE,
      border: "0",
      background: "transparent",
      display: "block",
      pointerEvents: "auto",
      boxSizing: "border-box",
      zIndex: "2147483647",
      transition: "width .2s ease, height .2s ease"
    });

    function onMessage(event) {
      if (event.origin !== CHATBOT_ORIGIN) return;
      if (!event.data || event.data.type !== "KK_CHATBOT_STATE") return;
      if (event.data.state === "open") {
        iframe.style.width  = OPEN_WIDTH;
        iframe.style.height = OPEN_HEIGHT;
      } else if (event.data.state === "closed") {
        iframe.style.width  = CLOSED_SIZE;
        iframe.style.height = CLOSED_SIZE;
      }
    }

    window.addEventListener("message", onMessage);
    root.appendChild(iframe);
    document.body.appendChild(root);
    console.log("Kreative Kudi chatbot embed loaded");
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
