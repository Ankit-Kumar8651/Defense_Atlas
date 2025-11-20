// Jab poora page load ho jaye, tab yeh functions run karo
document.addEventListener("DOMContentLoaded", () => {
    
    // Function 1: Naya VFX Background
    setupVfxBackground();

    // Function 2: Mobile Menu (Hamburger icon)
    setupMobileMenu();

    // Function 3: Chatbot
    setupChatbot();
    
    // Function 4: Finance Manager (Naya)
    setupFinanceManager();

});


// ===== FUNCTION 1: NAYA VFX (Floating Orbs / Bokeh) =====
function setupVfxBackground() {
    const canvas = document.getElementById('vfx-canvas');
    if (!canvas) return; // Agar canvas nahi mila to ruk jao

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    // Colors (Aapke primary color ke shades)
    const colors = ['rgba(0, 212, 255, 0.3)', 'rgba(0, 170, 255, 0.3)', 'rgba(0, 100, 200, 0.3)'];
    
    // Particle (Orb) kaisa hoga
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // speed x
            this.vy = (Math.random() - 0.5) * 0.5; // speed y
            this.radius = Math.random() * 5 + 3; // size
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        // Particle ko draw karna
        draw() {
            ctx.beginPath();
            
            // Glow effect (Radial Gradient)
            let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, this.color.replace('0.3', '0.8')); // Center me dark
            gradient.addColorStop(1, this.color.replace('0.3', '0')); // Bahar light (transparent)
            
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Particle ki position update karna
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Screen wrap (Agar screen ke bahar jaye to dusri taraf se wapas aa jaye)
            if (this.x < -this.radius) this.x = width + this.radius;
            if (this.x > width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = height + this.radius;
            if (this.y > height + this.radius) this.y = -this.radius;
        }
    }

    // Shuruaat me particles banana
    function init() {
        particles = [];
        let particleCount = (width < 768) ? 50 : 100; // Phone par kam particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Main animation loop (jo hamesha chalta rahega)
    function animate() {
        ctx.clearRect(0, 0, width, height); // Har frame par screen clear karna

        // Har particle ko update aur draw karna
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate); // Agla frame request karna
    }

    // Agar user window ka size badalta hai
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init(); // Particles ko reset karna
    });

    init(); // Sabse pehle particles banana
    animate(); // Animation loop start karna
}


// ===== FUNCTION 2: MOBILE MENU (Hamburger Icon) =====
// (Yeh code pehle jaisa hi hai)
function setupMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuIcon || !navMenu) return;

    // Icon par click karne par
    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // menu ko dikhao/chupao
        // Icon ko badlo (bars se cross)
        menuIcon.querySelector('i').classList.toggle('fa-bars');
        menuIcon.querySelector('i').classList.toggle('fa-times');
    });

    // Link par click karne par menu band kar do
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuIcon.querySelector('i').classList.remove('fa-times');
                menuIcon.querySelector('i').classList.add('fa-bars');
            }
        });
    });
}


// ===== FUNCTION 3: CHATBOT =====
// (Yeh code pehle jaisa hi hai)
function setupChatbot() {
    const chatWindow = document.getElementById('chat-window');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const closeChatBtn = document.getElementById('close-chat');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    if (!chatWindow || !chatToggleBtn || !closeChatBtn || !sendChatBtn || !chatInput || !chatBody) return;

    // Chatbot kholne wala button
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('show-chat');
    });

    // Chatbot band karne wala button
    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('show-chat');
    });

    // "Send" button
    sendChatBtn.addEventListener('click', handleUserMessage);
    // "Enter" key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    function handleUserMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;
        appendMessage(userMessage, 'user');
        chatInput.value = "";

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            appendMessage(botResponse, 'bot');
        }, 1000);
    }

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(message) {
        const m = message.toLowerCase();
        if (m.includes('hello') || m.includes('hi')) return 'Hello! I am the Defense AI Bot. How can I assist you?';
        if (m.includes('tejas')) return 'HAL Tejas is an Indian single-engine, delta wing, light multirole fighter. [cite: 16]';
        if (m.includes('vikrant')) return 'INS Vikrant is an indigenous aircraft carrier (IAC-1) built by Cochin Shipyard for the Indian Navy. [cite: 16]';
        if (m.includes('finance')) return 'The "My Finance" section is on the main page. This chat is for defense queries only.';
        if (m.includes('compare')) return 'Please use the "Compare" tool on the main page to see a side-by-side analysis. [cite: 17, 22]';
        return "I am still learning. I can provide info on 'Tejas' or 'INS Vikrant'.";
    }
}


// ===== FUNCTION 4: FINANCE MANAGER (NAYA) =====
function setupFinanceManager() {
    // HTML elements ko select karna
    const financeForm = document.getElementById('finance-form');
    const expenseDesc = document.getElementById('expense-desc');
    const expenseValue = document.getElementById('expense-value');
    const budgetAmountEl = document.getElementById('budget-amount');
    const expenseAmountEl = document.getElementById('expense-amount');
    const remainingAmountEl = document.getElementById('remaining-amount');
    const expenseListContainer = document.getElementById('expense-list-container');

    if (!financeForm) return; // Agar finance form nahi mila to ruk jao

    // Shuruaati budget set karna
    let totalBudget = 50000;
    let totalExpenses = 0;
    
    // Numbers ko format karna (jaise ₹50,000)
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    });

    // Shuruaati values ko update karna
    budgetAmountEl.innerText = formatter.format(totalBudget);
    expenseAmountEl.innerText = formatter.format(totalExpenses);
    remainingAmountEl.innerText = formatter.format(totalBudget - totalExpenses);

    // Jab form submit (Add Expense button) ho
    financeForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Page ko reload hone se roko

        const desc = expenseDesc.value;
        const amount = parseInt(expenseValue.value); // Text se number me convert karo

        // Agar galat value dali hai to ruk jao
        if (!desc || !amount || amount <= 0) {
            alert("Please enter a valid description and amount.");
            return;
        }

        // 1. Total kharch badhao
        totalExpenses += amount;

        // 2. Numbers ko screen par update karo
        expenseAmountEl.innerText = formatter.format(totalExpenses);
        remainingAmountEl.innerText = formatter.format(totalBudget - totalExpenses);
        
        // Agar budget se zyada ho gaya to remaining ko laal kar do
        if (totalBudget - totalExpenses < 0) {
            remainingAmountEl.style.color = "#ff6b6b";
        } else {
            remainingAmountEl.style.color = "#4dff91";
        }

        // 3. Kharch ko list me jodo
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span>${desc}</span>
            <span>${formatter.format(amount)}</span>
        `;
        expenseListContainer.appendChild(expenseItem);

        // 4. Input fields ko khali kar do
        expenseDesc.value = "";
        expenseValue.value = "";
    });
}