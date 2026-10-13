(function () {
    "use strict";

    const CHATBOT_ORIGIN =
        "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev";

    const CLOSED_SIZE = "120px";

    /*
     * Open iframe is deliberately > 500px wide.
     * Your current chatbot CSS uses:
     *
     * @media (max-width: 500px)
     *
     * Because media queries inside an iframe use the iframe
     * viewport, 430px was incorrectly activating mobile mode.
     */
    const OPEN_WIDTH = "520px";
    const OPEN_HEIGHT = "650px";

    function init() {

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
            pointerEvents: "none",
            zIndex: "2147483647"
        });

        const iframe = document.createElement("iframe");

        iframe.src = CHATBOT_ORIGIN + "/";
        iframe.title = "Kreative Kudi AI Assistant";

        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute(
            "allow",
            "clipboard-write; microphone"
        );

        Object.assign(iframe.style, {

            position: "fixed",

            right: "0",
            bottom: "0",

            width: CLOSED_SIZE,
            height: CLOSED_SIZE,

            border: "0",
            margin: "0",
            padding: "0",

            background: "transparent",

            display: "block",

            overflow: "hidden",

            pointerEvents: "auto",

            boxSizing: "border-box",

            zIndex: "2147483647",

            transition:
                "width 0.2s ease, height 0.2s ease"
        });

        function openFrame() {

            iframe.style.width = OPEN_WIDTH;
            iframe.style.height = OPEN_HEIGHT;

            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }

        function closeFrame() {

            iframe.style.width = CLOSED_SIZE;
            iframe.style.height = CLOSED_SIZE;

            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }

        window.addEventListener(
            "message",
            function (event) {

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

                    /*
                     * IMPORTANT:
                     * Resize parent iframe BEFORE allowing
                     * the chatbot to settle into desktop mode.
                     */
                    openFrame();
                }

                if (event.data.state === "closed") {

                    closeFrame();
                }
            }
        );

        root.appendChild(iframe);

        document.body.appendChild(root);

        closeFrame();

        console.log(
            "Kreative Kudi chatbot embed loaded"
        );
    }

    if (document.body) {

        init();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    }

})();