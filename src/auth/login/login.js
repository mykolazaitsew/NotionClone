class LoginForm {
    constructor (config) {
        this.nameInput = document.getElementById(config.nameId);
        this.passwordInput = document.getElementById(config.passwordId);
        this.loginBtn = document.querySelector(config.loginSelector);
        this.eyeIcon = document.querySelector(config.eyeIconSelector);

        this.Init();
    }

    Init() {
        this.loginBtn.addEventListener('click', () => this.validate());
        this.eyeIcon.addEventListener('click', () => this.togglePassword());
    }

    togglePassword() {
    if (this.passwordInput.type === 'password') {
      this.passwordInput.type = 'text';
      this.eyeIcon.src = '/assets/close-eye.png';
    } else {
      this.passwordInput.type = 'password';
      this.eyeIcon.src = '/assets/open-eye.png';
    }
  }

  validate() {
    const name = this.nameInput.value.trim();
    const password = this.passwordInput.value;

    [
      this.nameInput,
      this.passwordInput,
    ].forEach((input) => {
      input.classList.remove('error');
      if (input.dataset.originalPlaceholder) {
        input.placeholder = input.dataset.originalPlaceholder;
      }
    });

    let hasErrors = false;
    
    if (!name) {
      this.showInputError(this.nameInput, 'Enter your name');
      hasErrors = true;
    }

    if (!password) {
      this.showInputError(this.passwordInput, 'Enter your password');
      hasErrors = true;
    }
    
    if (!hasErrors) {
      alert('✅ Loged in successfully!');
    }
  }

   showInputError(input, message) {
    if (!input.dataset.originalPlaceholder) {
      input.dataset.originalPlaceholder = input.placeholder;
    }
    input.value = '';
    input.placeholder = message;
    input.classList.add('error');
    input.addEventListener(
      'focus',
      () => {
        input.placeholder = input.dataset.originalPlaceholder;
        input.classList.remove('error');
      },
      { once: true }
    );
  }
  
}

const login = new LoginForm({
  nameId: 'name',
  passwordId: 'password-input',
  loginSelector: '.log-btn',
  eyeIconSelector: '.psw-img',
});