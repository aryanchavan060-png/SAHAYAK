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

// --- Language Change Handler ---
function changeLanguage(langCode) {
    const langNames = {
        'en': 'English',
        'hi': 'हिंदी (Hindi)',
        'mr': 'मराठी (Marathi)',
        'te': 'తెలుగు (Telugu)',
        'ta': 'தமிழ் (Tamil)'
    };
    alert(`Language switched to ${langNames[langCode]}. Speech and UI reloaded in ${langNames[langCode]}.`);
}

// --- WhatsApp Modal Tab Switcher ---
function switchWaTab(tabName) {
    document.getElementById('tabBtnQr').classList.toggle('active', tabName === 'qr');
    document.getElementById('tabBtnSandbox').classList.toggle('active', tabName === 'sandbox');
    document.getElementById('tabBtnArch').classList.toggle('active', tabName === 'architecture');

    document.getElementById('waTabQr').classList.toggle('hidden-section', tabName !== 'qr');
    document.getElementById('waTabSandbox').classList.toggle('hidden-section', tabName !== 'sandbox');
    document.getElementById('waTabArch').classList.toggle('hidden-section', tabName !== 'architecture');
}

function copyWaNumber() {
    navigator.clipboard.writeText('+919876543210');
    alert("WhatsApp Hotline Number (+91 98765 43210) copied to clipboard!");
}

// --- Modal Controls ---
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// --- Tab Switching (Registration) ---
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

// --- Tab Switching (Login) ---
let loginRole = 'beneficiary';
function switchLoginRole(role) {
    loginRole = role;
    document.getElementById('loginTabBeneficiary').classList.toggle('active', role === 'beneficiary');
    document.getElementById('loginTabGia').classList.toggle('active', role === 'gia');
}

// --- Form Submissions ---
function handleRegistration(e) {
    e.preventDefault();
    alert("Registration Successful! Please login to access your portal.");
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

// --- Live Voice Demo Chatbot Logic ---
let isRecording = false;

function toggleVoiceInput() {
    const micBtn = document.getElementById('micBtn');
    const input = document.getElementById('demoChatInput');
    
    if (!isRecording) {
        isRecording = true;
        micBtn.classList.add('recording');
        input.placeholder = "Listening to voice input... Speak now!";
        
        setTimeout(() => {
            isRecording = false;
            micBtn.classList.remove('recording');
            input.value = "Show active PM-AJAY livelihood grants for micro-enterprises";
            input.placeholder = "Type or click microphone to speak your query...";
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

    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg bot';

        const query = text.toLowerCase();
        if (query.includes('grant') || query.includes('enterprise') || query.includes('pm-ajay')) {
            botMsg.innerHTML = "<strong>Active Live Schemes Found:</strong><br>1. <strong>PM-AJAY Micro-Enterprise Grant:</strong> Up to ₹50,000 capital support for SC entrepreneurs.<br>2. <strong>Self-Employment Support Scheme:</strong> Subsidy + interest subvention for small retail units.";
        } else if (query.includes('skill') || query.includes('nsqf') || query.includes('trade')) {
            botMsg.innerHTML = "<strong>Recommended NSQF Certification Trades:</strong><br>• Solar PV Installer & Maintenance (Level 4)<br>• Agricultural Equipment Operation (Level 4)<br>• Digital Retail & E-Commerce Executive (Level 5)";
        } else if (query.includes('agri') || query.includes('farm')) {
            botMsg.innerHTML = "<strong>Agriculture & Allied Schemes:</strong><br>• PM-AJAY Organic Farming Grant<br>• SC Livestock & Dairy Enterprise Subsidy (Up to 60% Support)";
        } else {
            botMsg.textContent = "SAHAYAK Live Scheme Engine: Validated query against live MyScheme.gov.in APIs. Updated eligibility results fetched successfully.";
        }

        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1100);
}

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
            labels: ['Micro-Enterprise', 'Artisans', 'Agri Support', 'NSQF Skilling', 'Self-Employment'],
            datasets: [{
                label: 'SC Beneficiaries Reached',
                data: [3400, 2100, 2900, 4100, 1950],
                backgroundColor: '#0f766e',
                borderRadius: 4
            },
            {
                label: 'Grants & Placements Approved',
                data: [2900, 1850, 2600, 3700, 1700],
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
