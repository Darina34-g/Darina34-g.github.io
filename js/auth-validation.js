document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.querySelector('.autorize form');
    const loginInput = document.getElementById('text');
    const passwordInput = document.getElementById('password');
    
    const createCustomAlert = () => {
        const alertHTML = `
            <div id="customAlert" class="custom-alert-overlay">
                <div class="custom-alert-box">
                    <h3 class="custom-alert-title"></h3>
                    <p class="custom-alert-message"></p>
                    <button class="custom-alert-btn">OK</button>
                </div>
            </div>
        `;
        
        if (!document.getElementById('customAlert')) {
            document.body.insertAdjacentHTML('beforeend', alertHTML);
            
            const alertOverlay = document.getElementById('customAlert');
            const alertBtn = alertOverlay.querySelector('.custom-alert-btn');
            
            alertBtn.addEventListener('click', function() {
                alertOverlay.style.display = 'none';
            });
            
            alertOverlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && alertOverlay.style.display === 'flex') {
                    alertOverlay.style.display = 'none';
                }
            });
        }
    };
    
    function showCustomAlert(title, message) {
        createCustomAlert();
        
        const alertOverlay = document.getElementById('customAlert');
        const alertTitle = alertOverlay.querySelector('.custom-alert-title');
        const alertMessage = alertOverlay.querySelector('.custom-alert-message');
        
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        alertOverlay.style.display = 'flex';
        
        setTimeout(() => {
            alertOverlay.querySelector('.custom-alert-btn').focus();
        }, 100);
    }
    
    function showAuthError(message) {
        showCustomAlert('Ошибка авторизации', message);
    }
    
    function showAuthSuccess(message) {
        showCustomAlert('Успешно!', message);
        
        const alertOverlay = document.getElementById('customAlert');
        alertOverlay.classList.add('success');
        
        alertOverlay.addEventListener('click', function handler(e) {
            if (e.target === this || e.target.classList.contains('custom-alert-btn')) {
                this.classList.remove('success');
            }
        });
    }
    
    if (authForm) {
        authForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const login = loginInput.value.trim();
            const password = passwordInput.value.trim();
            let hasError = false;
            
            if (!validateLogin(login)) {
                showAuthError('Логин должен содержать только буквы и быть не более 10 символов');
                loginInput.focus();
                loginInput.classList.add('input-error');
                hasError = true;
            } else {
                loginInput.classList.remove('input-error');
            }
            
            if (!hasError && !validatePassword(password)) {
                showAuthError('Пароль должен быть от 6 до 10 символов');
                passwordInput.focus();
                passwordInput.classList.add('input-error');
                hasError = true;
            } else {
                passwordInput.classList.remove('input-error');
            }
            
            if (!hasError) {
                showAuthSuccess('Вход выполнен успешно!');
                
                setTimeout(() => { 
                    this.submit(); 
                }, 1000);
            }
        });
    }
    
    function validateLogin(login) {
        if (login.length === 0) return false;
        
        const loginRegex = /^[a-zA-Zа-яА-ЯёЁ]{1,10}$/;
        return loginRegex.test(login);
    }
    
    function validatePassword(password) {
        return password.length >= 6 && password.length <= 10;
    }
    
    if (loginInput) {
        loginInput.addEventListener('input', function() {
            const value = this.value;
            
            const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
            this.value = lettersOnly;
            
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
            
            this.classList.remove('input-error');
        });
        
        loginInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validateLogin(value)) {
                this.classList.add('input-error');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const value = this.value;
            
            if (value.length > 10) {
                this.value = value.substring(0, 10);
            }
            
            this.classList.remove('input-error');
        });
        
        passwordInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validatePassword(value)) {
                this.classList.add('input-error');
            }
        });
    }
});