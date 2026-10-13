
(function () {
    "use strict";

    if (document.getElementById("kk-widget-root")) {
        return;
    }

    const root = document.createElement("div");
    root.id = "kk-widget-root";

    Object.assign(root.style, {
        position: "fixed",
        right: "0",
        bottom: "0",
        width: "0",
        height: "0",
        overflow: "visible",
        zIndex: "999999"
    });

    const iframe = document.createElement("iframe");

    iframe.src = "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev/";
    iframe.title = "Kreative Kudi AI Assistant";
    iframe.setAttribute("scrolling", "no");

    Object.assign(iframe.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "92px",
        height: "92px",
        border: "0",
        background: "transparent",
        overflow: "hidden",
        zIndex: "999999",
        display: "block",
        transition: "width 0.2s ease, height 0.2s ease"
    });

    window.addEventListener("message", function (event) {
        if (
            event.origin !== "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev" ||
            !event.data ||
            event.data.type !== "KK_CHATBOT_STATE"
        ) {
            return;
        }

        if (event.data.state === "open") {
            iframe.style.width = "430px";
            iframe.style.height = "650px";
        }

        if (event.data.state === "closed") {
            iframe.style.width = "92px";
            iframe.style.height = "92px";
        }
    });

    root.appendChild(iframe);
    document.body.appendChild(root);

    console.log("Kreative Kudi chatbot mounted");
})();
