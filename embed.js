
(function () {
    "use strict";

    const CHATBOT_ORIGIN =
        "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev";

    const CLOSED_SIZE = "92px";
    const OPEN_WIDTH = "430px";
    const OPEN_HEIGHT = "650px";

    if (document.getElementById("kk-widget-root")) {
        return;
    }

    // Create an isolated host for the chatbot iframe.
    const root = document.createElement("div");
    root.id = "kk-widget-root";

    Object.assign(root.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: "2147483647"
    });

    // Create the chatbot iframe.
    const iframe = document.createElement("iframe");

    iframe.src = CHATBOT_ORIGIN + "/";
    iframe.title = "Kreative Kudi AI Assistant";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allow", "clipboard-write");

    Object.assign(iframe.style, {
        position: "fixed",
        right: "0",
        bottom: "0",
        width: CLOSED_SIZE,
        height: CLOSED_SIZE,
        minWidth: "0",
        minHeight: "0",
        padding: "0",
        margin: "0",
        border: "0",
        background: "transparent",
        overflow: "hidden",
        display: "block",
        pointerEvents: "auto",
        boxSizing: "border-box",
        zIndex: "2147483647"
    });

    // Resize the iframe when the chatbot reports its state.
    function handleChatbotMessage(event) {
        if (event.origin !== CHATBOT_ORIGIN) {
            return;
        }

        if (
            !event.data ||
            event.data.type !== "KK_CHATBOT_STATE"
        ) {
            return;
        }

        if (event.data.state === "open") {
            iframe.style.width = OPEN_WIDTH;
            iframe.style.height = OPEN_HEIGHT;
            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }

        if (event.data.state === "closed") {
            iframe.style.width = CLOSED_SIZE;
            iframe.style.height = CLOSED_SIZE;
            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }
    }

    window.addEventListener("message", handleChatbotMessage);

    root.appendChild(iframe);
    document.body.appendChild(root);

    console.log("Kreative Kudi chatbot embed loaded");
})();
