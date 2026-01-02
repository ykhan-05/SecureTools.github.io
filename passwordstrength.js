document.addEventListener('DOMContentLoaded', function() {
    const pwdInput = document.getElementById('pwdInput');
    if (pwdInput) {
        pwdInput.addEventListener('input', checkPasswordStrength);
    }
});

function switchTab(tabName) {
    const pwdStrength = document.getElementById("pwd-strength");
    const pwdGen = document.getElementById("pwd-gen");
    const tabStrength = document.getElementById("tab-strength");
    const tabGen = document.getElementById("tab-generate");

    if (tabName === 'strength') {
        pwdStrength.style.display = 'block';
        pwdGen.style.display = 'none';
        tabStrength.classList.add('active');
        tabGen.classList.remove('active');
    } else {
        pwdGen.style.display = 'block';
        pwdStrength.style.display = 'none';
        tabGen.classList.add('active');
        tabStrength.classList.remove('active');
    }
}

function togglePassword() {
    const input = document.getElementById("pwdInput");
    const toggle = document.querySelector(".toggle-password");
    if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "Hide Password";
    } else {
        input.type = "password";
        toggle.textContent = "Show Password";
    }
}

function checkPasswordStrength() {
    const passwordInput = document.getElementById('pwdInput');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
            
    if (!passwordInput || !strengthBar || !strengthText) return;
            
    const password = passwordInput.value;
    let strength = 0;
            
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
            
    document.getElementById('req-length').classList.toggle('met', requirements.length);
    document.getElementById('req-uppercase').classList.toggle('met', requirements.uppercase);
    document.getElementById('req-lowercase').classList.toggle('met', requirements.lowercase);
    document.getElementById('req-number').classList.toggle('met', requirements.number);
    document.getElementById('req-special').classList.toggle('met', requirements.special);
            
    strength = Object.values(requirements).filter(Boolean).length;
            
    let strengthClass = '';
    let strengthLabel = '';
    let widthPercent = 0;
            
    if (password.length === 0) {
        strengthLabel = '';
        widthPercent = 0;
    } else if (strength <= 2) {
        strengthClass = 'weak';
        strengthLabel = '❌ Weak Password';
        widthPercent = 25;
    } else if (strength === 3) {
        strengthClass = 'fair';
        strengthLabel = '⚠️ Fair Password';
        widthPercent = 50;
    } else if (strength === 4) {
        strengthClass = 'good';
        strengthLabel = '✓ Good Password';
        widthPercent = 75;
    } else {
        strengthClass = 'strong';
        strengthLabel = '✓✓ Strong Password';
        widthPercent = 100;
    }
            
    strengthBar.style.width = widthPercent + '%';
    strengthBar.className = 'strength-bar bar-' + strengthClass;
    strengthText.textContent = strengthLabel;
    strengthText.className = 'strength-text strength-' + strengthClass;
}

function generate(length = 12) {
    // Define Character Sets
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_+=<>?';

    // Combine all character sets
    const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;

    // Ensure minimum length is met and clamp the length
    const passwordLength = Math.max(8, length);

    // Ensure at least one character from each set is included
    let password = '';
    password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
    password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    // Fill the rest of the password length randomly
    for (let i = password.length; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }

    // Shuffle the password to randomize the position of the required characters
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    document.getElementById("passOut").value = password;
}

function reset() {
    document.getElementById("passOut").value = "Your password will appear here";
}

function copyPassword() {
    const pwdOutput = document.getElementById("passOut");
    const copyMessage = document.getElementById("copyMessage");

    navigator.clipboard.writeText(pwdOutput.value)
        .then(() => {
            copyMessage.textContent = 'Copied!';
            setTimeout(() => {
                copyMessage.textContent = '';
            }, 2000);
        });
}