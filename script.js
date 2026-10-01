// --- Scroll Animations ---
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

// --- Modal Control ---
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// --- Tab Switching Logic (Registration) ---
let regRole = 'beneficiary';
function switchRegRole(role) {
    regRole = role;
    document.getElementById('regTabBeneficiary').classList.toggle('active', role === 'beneficiary');
    document.getElementById('regTabGia').classList.toggle('active', role === 'gia');
    
    if (role === 'beneficiary') {
        document.getElementById('beneficiaryFields').classList.remove('hidden-section');
        document.getElementById('giaFields').classList.add('hidden-section');
    } else {
        document.getElementById('beneficiaryFields').classList.add('hidden-section');
        document.getElementById('giaFields').classList.remove('hidden-section');
    }
}

// --- Tab Switching Logic (Login) ---
let loginRole = 'beneficiary';
function switchLoginRole(role) {
    loginRole = role;
    document.getElementById('loginTabBeneficiary').classList.toggle('active', role === 'beneficiary');
    document.getElementById('loginTabGia').classList.toggle('active', role === 'gia');
}

// --- Form Handling ---
function handleRegistration(e) {
    e.preventDefault();
    alert("Registration Successful! Please login to continue.");
    closeModal('registerModal');
    openModal('loginModal');
}

function handleLogin(e) {
    e.preventDefault();
    closeModal('loginModal');
    
    document.getElementById('landing').classList.add('hidden-section');
    if (loginRole === 'beneficiary') {
        document.getElementById('beneficiary-dash').classList.remove('hidden-section');
    } else {
        document.getElementById('gia-dash').classList.remove('hidden-section');
        initChart();
    }
}

function logout() {
    document.getElementById('beneficiary-dash').classList.add('hidden-section');
    document.getElementById('gia-dash').classList.add('hidden-section');
    document.getElementById('landing').classList.remove('hidden-section');
}

function showSection(secId) {
    logout();
}

// --- Live Demo Chatbot Logic ---
let isRecording = false;

function toggleVoiceInput() {
    const micBtn = document.getElementById('micBtn');
    const input = document.getElementById('demoChatInput');
    
    if (!isRecording) {
        isRecording = true;
        micBtn.classList.add('recording');
        input.placeholder = "Listening in Hindi/Marathi... Boliyen!";
        
        // Simulate voice recognition after 3 seconds
        setTimeout(() => {
            isRecording = false;
            micBtn.classList.remove('recording');
            input.value = "Nagpur me NSQF skill training trades konse hain?";
            input.placeholder = "Apna sawal yahan type karein ya mic dabayein...";
        }, 3000);
    }
}

function sendQuickPrompt(text) {
    document.getElementById('demoChatInput').value = text;
    handleDemoChatSend();
}

function handleDemoChatSend() {
    const input = document.getElementById('demoChatInput');
    const text = input.value.trim();
    if (!text) return;

    const chatBox = document.getElementById('demoChatBox');

    // User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulated Intelligent Bot Reply
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg bot';

        const query = text.toLowerCase();
        if (query.includes('scheme') || query.includes('scholarship')) {
            botMsg.innerHTML = "<strong>Live Scheme Match Found:</strong><br>1. <strong>PM-AJAY Skill Grant:</strong> ₹15,000 stipend per semester for SC/ST students.<br>2. <strong>MahaDBT Post-Matric SC Scholarship:</strong> 100% tuition fee reimbursement for Private Colleges in Nagpur.";
        } else if (query.includes('nsqf') || query.includes('trade')) {
            botMsg.innerHTML = "<strong>NSQF Aligned Trades in Nagpur:</strong><br>• CNC Machining & Automation (Level 5)<br>• Web Development & Cloud Support (Level 4)<br>• Solar PV System Installation (Level 4)";
        } else if (query.includes('complaint') || query.includes('grievance') || query.includes('discrimination')) {
            botMsg.innerHTML = "<strong>Grievance Redressal Activated:</strong><br>Aapki complaint CPGRAMS aur NCSC Cell ko auto-route kar di gayi hai. Unique Tracking Ref: <code>SAH-NGP-2026-8821</code>";
        } else {
            botMsg.textContent = "SAHAYAK Live Scheme Engine: Aapka query receive hua hai. MyScheme.gov.in database se real-time eligibility check ho rahi hai.";
        }

        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1200);
}

// Allow Enter key
document.getElementById('demoChatInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleDemoChatSend();
});

// --- GIA Officer Chart ---
let chartInstance = null;
function initChart() {
    const ctx = document.getElementById('enrolmentChart');
    if (!ctx) return;
    
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['YCCE', 'RCOEM', 'PCE', 'KDK', 'GHRCE', 'Pallotti'],
            datasets: [{
                label: 'SC/ST Scheme Enrolments',
                data: [320, 280, 410, 290, 350, 190],
                backgroundColor: '#0f766e',
                borderRadius: 4
            },
            {
                label: 'Post-Training Placements',
                data: [280, 250, 360, 240, 310, 160],
                backgroundColor: '#ea580c',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
        }
    });
}
