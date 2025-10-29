// Form validation functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Real-time validation on input
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    // Validation on blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            // Show success message
            formSuccess.style.display = 'block';
            form.reset();
            resetPasswordStrength();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameInput, nameError, 'Name can only contain letters and spaces');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        if (phone === '') {
            showError(phoneInput, phoneError, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(phone)) {
            showError(phoneInput, phoneError, 'Please enter a valid phone number');
            return false;
        } else {
            showSuccess(phoneInput, phoneError);
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            showError(passwordInput, passwordError, 'Password is required');
            updatePasswordStrength(0, 'Weak', '#ea4335');
            return false;
        } else if (password.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters');
            updatePasswordStrength(30, 'Weak', '#ea4335');
            return false;
        } else {
            const strength = calculatePasswordStrength(password);
            showSuccess(passwordInput, passwordError);
            
            if (strength < 50) {
                updatePasswordStrength(strength, 'Fair', '#fbbc04');
            } else if (strength < 80) {
                updatePasswordStrength(strength, 'Good', '#34a853');
            } else {
                updatePasswordStrength(strength, 'Strong', '#0d8043');
            }
            
            validateConfirmPassword();
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
            return false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            return false;
        } else {
            showSuccess(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 10;
        
        // Character variety checks
        if (/[a-z]/.test(password)) strength += 10;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 25;
        
        return Math.min(strength, 100);
    }
    
    function updatePasswordStrength(strength, text, color) {
        strengthFill.style.width = `${strength}%`;
        strengthFill.style.backgroundColor = color;
        strengthText.textContent = `Password strength: ${text}`;
        strengthText.style.color = color;
    }
    
    function resetPasswordStrength() {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Password strength';
        strengthText.style.color = '#5f6368';
    }
    
    function showError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = '';
    }
});