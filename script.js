/* ========================================================
   KREATIVE KUDI AI ASSISTANT CHATBOT WIDGET
   JAVASCRIPT FUNCTIONALITY
   ======================================================== */

// Configuration
const CONFIG = {
    API_URL: "https://kreative-kudi-backend-218191242103.asia-south2.run.app/api/chat",// Change to your API endpoint
    DEMO_MODE: false, // Set to false when connecting to real API
};

// Initialize messages array
let messages = [];

/* ========================================================
   SELECT QUESTION FROM QUICK QUESTIONS
   ======================================================== */

function selectQuestion(question) {
    sendQuestion(question);
}

/* ========================================================
   SEND QUESTION TO CHATBOT
   ======================================================== */

function sendQuestion(question) {
    // Show chat area
    document.getElementById('contentArea').classList.add('hidden');
    document.getElementById('chatMessages').classList.remove('hidden');

    // Add user message to UI
    addMessage(question, 'user');

    // Send to API or show demo response
    if (CONFIG.DEMO_MODE) {
        // Demo response
        setTimeout(() => {
            const response = `Thank you for asking "${question}". This is a demo response. In production, this would be connected to your Kreative Kudi API to provide real answers from your knowledge base.`;
            addMessage(response, 'bot');
        }, 500);
    } else {
        // Real API call
        sendToAPI(question);
    }

    // Clear input
    document.getElementById('chatInput').value = '';
}

/* ========================================================
   SEND MESSAGE FROM INPUT
   ======================================================== */

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Show chat area if hidden
    if (document.getElementById('contentArea').classList.contains('hidden') === false) {
        document.getElementById('contentArea').classList.add('hidden');
        document.getElementById('chatMessages').classList.remove('hidden');
    }

    sendQuestion(message);
}

/* ========================================================
   HANDLE ENTER KEY PRESS
   ======================================================== */

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}

/* ========================================================
   ADD MESSAGE TO CHAT
   ======================================================== */

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `kk-message ${sender}`;

    const formattedText = sender === 'bot'
        ? formatBotMessage(text)
        : escapeHtml(text);

    messageEl.innerHTML = `
        <div class="kk-message-content">${formattedText}</div>
    `;

    chatMessages.appendChild(messageEl);

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Store message
    messages.push({ text, sender, timestamp: new Date() });
}

/* ========================================================
   SEND TO API
   ======================================================== */

function sendToAPI(question) {
    // Show loading indicator
    const chatMessages = document.getElementById('chatMessages');
    const loadingEl = document.createElement('div');
    loadingEl.className = 'kk-message bot';
    loadingEl.id = 'loading-message';
    loadingEl.innerHTML = '<div class="kk-message-content">⏳ Thinking...</div>';
    chatMessages.appendChild(loadingEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Make API request
    fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add authentication header if needed
            // 'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify({
            message: question,
            conversation_id: getConversationId(),
            // Add any other data your API needs
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Remove loading message
        const loading = document.getElementById('loading-message');
        if (loading) loading.remove();

        // Add bot response
        const botResponse = data.response || data.message || 'Sorry, I could not process your request.';
        addMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('API Error:', error);
        
        // Remove loading message
        const loading = document.getElementById('loading-message');
        if (loading) loading.remove();

        // Show error message
        addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
    });
}

/* ========================================================
   ESCAPE KEY TO RETURN TO WELCOME SCREEN
   ======================================================== */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        returnToWelcome();
    }
});

function returnToWelcome() {
    document.getElementById('contentArea').classList.remove('hidden');
    document.getElementById('chatMessages').classList.add('hidden');
    document.getElementById('chatMessages').innerHTML = '';
    messages = [];
}

/* ========================================================
   UTILITY FUNCTIONS
   ======================================================== */

/**
 * Format bot Markdown safely for the chatbot UI
 */
function formatBotMessage(text) {
    let html = escapeHtml(text);

    // Normalize escaped Markdown bullets
    html = html.replace(/\\\*/g, '*');

    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert bullet lines beginning with * or -
    const lines = html.split('\n');
    let output = '';
    let inList = false;

    lines.forEach(line => {
        const trimmed = line.trim();

        // Bullet point
        if (/^[*-]\s+/.test(trimmed)) {
            if (!inList) {
                output += '<ul>';
                inList = true;
            }

            const bulletText = trimmed.replace(/^[*-]\s+/, '');
            output += `<li>${bulletText}</li>`;
        } else {
            // Close list
            if (inList) {
                output += '</ul>';
                inList = false;
            }

            if (trimmed === '') {
                output += '<br>';
            } else {
                output += `<div>${line}</div>`;
            }
        }
    });

    // Close any remaining list
    if (inList) {
        output += '</ul>';
    }

    return output;
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Get or create conversation ID for multi-turn conversations
 */
function getConversationId() {
    let conversationId = sessionStorage.getItem('kk-conversation-id');
    if (!conversationId) {
        conversationId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('kk-conversation-id', conversationId);
    }
    return conversationId;
}

/**
 * Get all messages (for logging or sending to analytics)
 */
function getMessageHistory() {
    return messages;
}

/**
 * Clear conversation
 */
function clearConversation() {
    messages = [];
    sessionStorage.removeItem('kk-conversation-id');
    returnToWelcome();
}

/**
 * Export conversation as JSON (useful for debugging)
 */
function exportConversation() {
    const data = {
        conversationId: getConversationId(),
        messages: messages,
        timestamp: new Date().toISOString()
    };
    console.log('Conversation exported:', JSON.stringify(data, null, 2));
    return data;
}

/* ========================================================
   INITIALIZE ON PAGE LOAD
   ======================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kreative Kudi Chatbot Widget Initialized');
    console.log('Demo Mode:', CONFIG.DEMO_MODE);
    console.log('API URL:', CONFIG.API_URL);
});

function notifyParentChatbotState(state) {
    if (window.parent !== window) {
        window.parent.postMessage(
            {
                type: 'KK_CHATBOT_STATE',
                state: state
            },
            'https://www.kreativekudi.com'
        );
    }
}

function closeChatbot() {
    const chatbot = document.querySelector('.chatbot-widget');
    const toggleButton = document.getElementById('kk-chat-toggle');
    const liveDot = document.querySelector('.kk-live-dot');

    if (chatbot) {
        chatbot.style.display = 'none';
    }

    if (toggleButton) {
        toggleButton.style.display = 'flex';
    }

    // Show live status again when chatbot is closed
    if (liveDot) {
        liveDot.style.display = 'block';
    }
}

function openChatbot() {
    const chatbot = document.querySelector('.chatbot-widget');
    const toggleButton = document.getElementById('kk-chat-toggle');
    const greeting = document.getElementById('kk-chat-greeting');
    const liveDot = document.querySelector('.kk-live-dot');
    const unreadBadge = document.getElementById('kk-unread-badge');

    if (chatbot) {
        chatbot.style.display = 'flex';
    }

    if (toggleButton) {
        toggleButton.style.display = 'none';
    }

    if (greeting) {
        greeting.style.display = 'none';
    }

    // Hide live status and unread notification
    if (liveDot) {
        liveDot.style.display = 'none';
    }

    if (unreadBadge) {
        unreadBadge.style.display = 'none';
    }
}

/* ========================================================
   GREETING POPUP
   ======================================================== */

window.addEventListener('load', function () {

    setTimeout(function () {

        const greeting = document.getElementById('kk-chat-greeting');
        const chatbot = document.querySelector('.chatbot-widget');

        if (!greeting || !chatbot) return;

        // Show greeting
        if (chatbot.style.display !== 'flex') {
            greeting.classList.add('show');

            // Hide after 5 seconds
            setTimeout(function () {
                greeting.classList.remove('show');
            }, 8000);
        }

    }, 5000);

});