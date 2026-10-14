(function () {
    "use strict";

    const CHATBOT_ORIGIN =
        "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev";

    const CLOSED_SIZE = 120;

    // Desktop iframe canvas.
    // Chatbot itself remains 390 x 610.
    const DESKTOP_WIDTH = 520;
    const DESKTOP_HEIGHT = 650;

    let isOpen = false;

    function isMobile() {
        return window.innerWidth <= 500;
    }

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

            width: CLOSED_SIZE + "px",
            height: CLOSED_SIZE + "px",

            border: "0",
            margin: "0",
            padding: "0",

            background: "transparent",

            display: "block",
            overflow: "hidden",

            pointerEvents: "auto",

            boxSizing: "border-box",

            zIndex: "2147483647"
        });

        function setClosedSize() {

            isOpen = false;

            iframe.style.width =
                CLOSED_SIZE + "px";

            iframe.style.height =
                CLOSED_SIZE + "px";

            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }

        function setOpenSize() {

            isOpen = true;

            /*
             * MOBILE
             *
             * iframe viewport follows the actual browser.
             * This allows @media (max-width: 500px)
             * inside the chatbot to activate.
             */
            if (isMobile()) {

                iframe.style.width = "100vw";
                iframe.style.height = "100dvh";

                iframe.style.right = "0";
                iframe.style.bottom = "0";

                return;
            }

            /*
             * DESKTOP
             *
             * Keep iframe >500px so mobile CSS
             * does NOT activate.
             */
            iframe.style.width =
                DESKTOP_WIDTH + "px";

            iframe.style.height =
                DESKTOP_HEIGHT + "px";

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
                    setOpenSize();
                }

                if (event.data.state === "closed") {
                    setClosedSize();
                }
            }
        );

        /*
         * Handle phone rotation and browser resize.
         */
        window.addEventListener(
            "resize",
            function () {

                if (isOpen) {
                    setOpenSize();
                }
            }
        );

        root.appendChild(iframe);
        document.body.appendChild(root);

        setClosedSize();

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