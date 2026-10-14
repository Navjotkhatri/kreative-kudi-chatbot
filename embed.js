(function () {
    "use strict";

    const CHATBOT_ORIGIN =
        "https://kreative-kudi-chatbot.navjotkhatri999.workers.dev";

    const CLOSED_SIZE = 120;

    // Desktop iframe canvas.
    // Actual chatbot panel remains 390 × 610.
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

        /* =========================================
           ROOT
           ========================================= */

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


        /* =========================================
           CHATBOT IFRAME
           ========================================= */

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


        /* =========================================
           GREETING BUBBLE
           ========================================= */

        const greeting = document.createElement("div");

        greeting.id = "kk-embed-greeting";

        greeting.textContent =
            "Hello, may I help you?";

        Object.assign(greeting.style, {

            position: "fixed",

            /*
             * Launcher lives inside the 120px iframe.
             * Put greeting immediately to its left.
             */
            right: "100px",
            bottom: "34px",

            padding: "10px 14px",

            background: "#ffffff",
            color: "#1a1a1a",

            borderRadius: "12px",

            fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

            fontSize: "13px",
            lineHeight: "1.4",

            whiteSpace: "nowrap",

            boxShadow:
                "0 6px 20px rgba(0,0,0,0.15)",

            /*
             * Start hidden.
             */
            opacity: "0",
            visibility: "hidden",

            transform:
                "translateX(12px) scale(0.9)",

            transition:
                "opacity .35s ease, transform .35s ease, visibility .35s ease",

            pointerEvents: "none",

            /*
             * One level below iframe.
             */
            zIndex: "2147483646"
        });


        /* =========================================
           GREETING FUNCTIONS
           ========================================= */

        function showGreeting() {

            /*
             * Don't show while chatbot is open.
             */
            if (isOpen) {
                return;
            }

            greeting.style.visibility = "visible";
            greeting.style.opacity = "1";

            greeting.style.transform =
                "translateX(0) scale(1)";
        }


        function hideGreeting() {

            greeting.style.opacity = "0";

            greeting.style.transform =
                "translateX(12px) scale(0.9)";

            setTimeout(function () {

                if (
                    greeting.style.opacity === "0"
                ) {
                    greeting.style.visibility =
                        "hidden";
                }

            }, 350);
        }


        /* =========================================
           CLOSED STATE
           ========================================= */

        function setClosedSize() {

            isOpen = false;

            iframe.style.width =
                CLOSED_SIZE + "px";

            iframe.style.height =
                CLOSED_SIZE + "px";

            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }


        /* =========================================
           OPEN STATE
           ========================================= */

        function setOpenSize() {

            isOpen = true;

            /*
             * Greeting should disappear immediately
             * when chatbot opens.
             */
            hideGreeting();


            /* ---------- MOBILE ---------- */

            if (isMobile()) {

                iframe.style.width = "100vw";
                iframe.style.height = "100dvh";

                iframe.style.right = "0";
                iframe.style.bottom = "0";

                return;
            }


            /* ---------- DESKTOP ---------- */

            iframe.style.width =
                DESKTOP_WIDTH + "px";

            iframe.style.height =
                DESKTOP_HEIGHT + "px";

            iframe.style.right = "0";
            iframe.style.bottom = "0";
        }


        /* =========================================
           RECEIVE CHATBOT STATE
           ========================================= */

        window.addEventListener(
            "message",
            function (event) {

                if (event.origin !== CHATBOT_ORIGIN) {
                    return;
                }

                if (
                    !event.data ||
                    event.data.type !==
                        "KK_CHATBOT_STATE"
                ) {
                    return;
                }


                /* OPEN */

                if (event.data.state === "open") {

                    setOpenSize();
                }


                /* CLOSED */

                if (event.data.state === "closed") {

                    setClosedSize();
                }
            }
        );


        /* =========================================
           RESPONSIVE RESIZE
           ========================================= */

        window.addEventListener(
            "resize",
            function () {

                if (isOpen) {

                    setOpenSize();
                }
            }
        );


        /* =========================================
           ADD TO PAGE
           ========================================= */

        root.appendChild(iframe);

        document.body.appendChild(root);

        document.body.appendChild(greeting);

        setClosedSize();


        /* =========================================
           GREETING TIMER
           ========================================= */

        setTimeout(function () {

            if (!isOpen) {

                showGreeting();

                /*
                 * Hide after 8 seconds.
                 */
                setTimeout(function () {

                    hideGreeting();

                }, 8000);
            }

        }, 5000);


        console.log(
            "Kreative Kudi chatbot embed loaded"
        );
    }


    /* =============================================
       INITIALIZE
       ============================================= */

    if (document.body) {

        init();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    }

})();