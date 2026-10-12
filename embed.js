(function () {
    "use strict";

    if (document.getElementById("kk-widget-root")) {
        return;
    }

    const root = document.createElement("div");
    root.id = "kk-widget-root";

    const iframe = document.createElement("iframe");

    iframe.src = "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev";
    iframe.title = "Kreative Kudi AI Assistant";

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "92px";
    iframe.style.height = "92px";
    iframe.style.border = "0";
    iframe.style.background = "transparent";
    iframe.style.zIndex = "999999";
    iframe.style.transition = "width 0.2s ease, height 0.2s ease";

    window.addEventListener("message", function (event) {

        if (!event.data || event.data.type !== "KK_CHATBOT_STATE") {
            return;
        }

        if (event.data.state === "open") {
            iframe.style.width = "430px";
            iframe.style.height = "650px";
            iframe.style.minWidth = "430px";
            iframe.style.minHeight = "650px";
        }

        if (event.data.state === "closed") {
            iframe.style.width = "92px";
            iframe.style.height = "92px";
            iframe.setAttribute("scrolling", "no");
            iframe.style.overflow = "hidden";
        }
    });

    root.appendChild(iframe);
    document.body.appendChild(root);

    console.log("Kreative Kudi chatbot mounted");
})();