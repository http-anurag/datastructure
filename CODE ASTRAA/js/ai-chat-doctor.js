document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Responsive adjustments
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = '';
        }
    });
    
    // Chat functionality
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendBtn = document.querySelector('.send-btn');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai-message';
        typingIndicator.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response after delay
        setTimeout(function() {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Generate AI response
            generateAIResponse(message);
        }, 1500);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate AI response
    function generateAIResponse(userMessage) {
        let response = '';
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
            response = `Common cold symptoms often include runny nose, sore throat, cough, congestion, and sometimes mild fever. The flu typically has more severe symptoms including high fever, body aches, fatigue, and headache. Would you like me to provide more specific information about your symptoms?`;
        } else if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
            response = `Headaches can have various causes including tension, dehydration, or sinus issues. For mild headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe, persistent, or accompanied by other symptoms like vision changes or nausea, you should consult a healthcare provider.`;
        } else if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
            response = `For adults, a fever is generally considered to be 100.4°F (38°C) or higher. You should seek medical attention if fever is above 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms like difficulty breathing or confusion. Would you like to share your temperature reading?`;
        } else {
            response = `I understand you're asking about "${userMessage}". While I can provide general health information, for personal medical advice it's always best to consult with a healthcare professional. Would you like me to help you find more resources about this topic?`;
        }
        
        addMessage(response, 'ai');
    }
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key (but allow Shift+Enter for new lines)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            chatInput.value = this.textContent;
            chatInput.focus();
        });
    });
});