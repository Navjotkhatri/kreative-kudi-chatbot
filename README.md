# Kreative Kudi AI Assistant - Chatbot Widget

A beautiful, responsive HTML/CSS/JavaScript chatbot widget (390x610px) for embedding on your website.

## 📁 File Structure

```
kreative-kudi-chatbot/
├── index.html      # HTML structure (semantic markup)
├── styles.css      # All CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🚀 Quick Start

1. **Download all 3 files** (index.html, styles.css, script.js)
2. **Place them in the same folder**
3. **Open index.html in a browser**
4. **Done!** The chatbot widget will appear in the bottom-right corner

## 🔧 Customization Guide

### 1. Change Colors

Edit in `styles.css`:

```css
/* Purple (Primary Color) */
--primary: #7c3aed;

/* Pink (Secondary Color) */
--secondary: #db2777;

/* Change any color value in the CSS */
.kk-title-gradient {
    background: linear-gradient(90deg, #YOUR_COLOR, #YOUR_COLOR2);
}
```

### 2. Change Logo/Icon

Edit in `index.html`:

```html
<!-- Change the emoji in the logo -->
<div class="kk-logo">🎨</div>  <!-- Replace 🎨 with your emoji or image -->

<!-- For image logo, use: -->
<div class="kk-logo">
    <img src="your-logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
</div>
```

### 3. Change Quick Questions

Edit in `index.html`:

```html
<div class="kk-question-card kk-question-founder" onclick="selectQuestion('Your custom question here')">
    <div class="kk-question-icon">👤</div>  <!-- Change emoji -->
    <div class="kk-question-title">Founder</div>  <!-- Change text -->
    <div class="kk-question-description">Your custom description</div>
</div>
```

### 4. Change Widget Size

Edit in `styles.css`:

```css
.chatbot-widget {
    width: 390px;      /* Change width */
    height: 610px;     /* Change height */
    /* ... other styles ... */
}
```

### 5. Change Position

Edit in `styles.css`:

```css
.chatbot-widget {
    position: fixed;
    bottom: 20px;      /* Distance from bottom */
    right: 20px;       /* Distance from right */
    /* Or use: left: 20px; for left side */
}
```

### 6. Connect to Your API

Edit in `script.js`:

```javascript
// Configuration
const CONFIG = {
    API_URL: 'https://your-api.com/api/chat',  // Change to your API endpoint
    DEMO_MODE: false,  // Set to false when API is ready
};

// Your API should return:
{
    "response": "Your answer here",
    // OR
    "message": "Your answer here"
}
```

Your API endpoint should accept POST requests with this body:
```json
{
    "message": "User question here",
    "conversation_id": "unique_id",
}
```

### 7. Change Welcome Message

Edit in `index.html`:

```html
<div class="kk-welcome-title">Hello! How can I help you today?</div>
<div class="kk-welcome-text">Ask me about our services, courses, pricing, projects, team, contact details and more.</div>
```

### 8. Change "Powered By" Text

Edit in `index.html`:

```html
<div class="kk-powered">
    🛡️ Powered by <strong>Your Company Name</strong>
</div>
```

## 📱 Responsive Design

The widget automatically adapts to mobile devices:

- **Desktop**: Fixed position in bottom-right corner (390x610px)
- **Mobile**: Full screen (100% width & height)

To change breakpoint, edit in `styles.css`:

```css
@media (max-width: 500px) {
    /* Mobile styles */
}
```

## 🎨 Color Reference

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary (Purple) | Purple | #7c3aed |
| Secondary (Pink) | Pink | #db2777 |
| Services (Orange) | Orange | #f97316 |
| Courses (Teal) | Teal | #10b981 |
| Background | Light Gray | #f9f9f9 |
| Text | Dark Gray | #1a1a1a |

## 🔐 Security Notes

- The code escapes HTML to prevent XSS attacks
- Never expose API keys in frontend code
- Use HTTPS for API calls
- Implement CORS properly on your backend

## 📊 Message History

Access conversation history programmatically:

```javascript
// Get all messages
const history = getMessageHistory();

// Export conversation as JSON
const data = exportConversation();

// Clear conversation
clearConversation();
```

## 🚢 Deployment Options

### Option 1: Embed as iframe (Recommended)

```html
<iframe 
    src="https://your-domain.com/chatbot/index.html" 
    width="390" 
    height="610" 
    frameborder="0"
    style="border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); position: fixed; bottom: 20px; right: 20px; z-index: 9999;"
></iframe>
```

### Option 2: Include as JavaScript

```html
<!-- Add to your website -->
<div id="kk-chatbot-container"></div>

<script>
    (function() {
        const container = document.getElementById('kk-chatbot-container');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://your-domain.com/chatbot/styles.css';
        document.head.appendChild(link);

        const html = fetch('https://your-domain.com/chatbot/index.html')
            .then(r => r.text())
            .then(html => container.innerHTML = html);

        const script = document.createElement('script');
        script.src = 'https://your-domain.com/chatbot/script.js';
        document.body.appendChild(script);
    })();
</script>
```

### Option 3: Include in existing HTML

Simply copy the styles and scripts into your existing HTML file.

## 🐛 Debugging

Check browser console for debug messages:

```javascript
// Show all messages
console.log('Messages:', getMessageHistory());

// Test API connection
console.log('Config:', CONFIG);
```

## 📝 Keyboard Shortcuts

- **Enter**: Send message
- **Escape**: Return to welcome screen

## 📞 Support

For issues or questions about implementation:
1. Check console for errors (F12)
2. Verify API endpoint is correct
3. Check CORS settings on your backend
4. Ensure files are in the same directory

## 📄 License

This chatbot widget is proprietary to Kreative Kudi.

---

**Version**: 1.0  
**Last Updated**: 2026-08-22  
**Created for**: Kreative Kudi AI Assistant
