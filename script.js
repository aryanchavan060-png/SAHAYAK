// --- Scroll Based Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.scroll-anim').forEach((el) => {
    observer.observe(el);
});

// --- Section Navigation ---
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden-section');
    });
    const target = document.getElementById(sectionId);
    target.classList.remove('hidden-section');
    target.classList.add('active-section');
    
    // Trigger animations immediately for newly visible section
    target.querySelectorAll('.scroll-anim').forEach(el => {
        el.classList.add('visible');
    });
}

// --- Auth Handling ---
let currentRole = 'beneficiary';

function switchRole(role) {
    currentRole = role;
    const tabs = document.querySelectorAll('.tab');
    tabs[0].classList.toggle('active', role === 'beneficiary');
    tabs[1].classList.toggle('active', role === 'gia');
}

function handleLogin(e) {
    e.preventDefault();
    if (currentRole === 'beneficiary') {
        showSection('beneficiary-dash');
    } else {
        showSection('gia-dash');
        initChart(); // Load chart when dashboard is shown
    }
}

// --- Chatbot Logic ---
function sendMessage() {
    const input = document.getElementById('chatInput');
    const msgText = input.value.trim();
    if (!msgText) return;

    const chatBox = document.getElementById('chatBox');
    
    // Add User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = msgText;
    chatBox.appendChild(userMsg);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate Bot Response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg bot';
        
        // Contextual demo logic
        if (msgText.toLowerCase().includes('discriminate') || msgText.toLowerCase().includes('complaint')) {
            botMsg.innerHTML = "I understand. Your grievance has been recorded and will be auto-routed to CPGRAMS / NCSC / SC-ST POA Cell anonymously. You will receive a tracking ID shortly.";
        } else {
            botMsg.textContent = "Thank you. Based on this, I am fetching live schemes from MyScheme.gov.in. Please wait...";
        }
        
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// Allow Enter key to send message
document.getElementById('chatInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// --- GIA Officer Chart Logic ---
let chartInstance = null;
function initChart() {
    const ctx = document.getElementById('enrolmentChart');
    if (!ctx) return;
    
    if (chartInstance) {
        chartInstance.destroy(); // Prevent duplicate charts
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'NSQF Enrolments',
                data: [65, 89, 120, 150, 180, 210],
                backgroundColor: '#0f766e',
                borderRadius: 5
            },
            {
                label: 'Placements Secured',
                data: [40, 70, 95, 120, 160, 190],
                backgroundColor: '#ea580c',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
