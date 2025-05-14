 export class RegistrationForm {
  constructor(config) {
    this.nameInput = document.getElementById(config.nameId);
    this.emailInput = document.getElementById(config.emailId);
    this.passwordInput = document.getElementById(config.passwordId);
    this.confirmPasswordInput = document.getElementById(
      config.confirmPasswordId
    );
    this.agreeCheckbox = document.getElementById(config.agreeId);
    this.agreeLabel = document.querySelector(`label[for="${config.agreeId}"]`);
    this.registerBtn = document.querySelector(config.registerSelector);
    this.eyeIcon = document.querySelector(config.eyeIconSelector);

    this.Init();
  }

  Init() {
    this.registerBtn.addEventListener('click', () => this.validate());
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
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;
    const agree = this.agreeCheckbox.checked;

    [
      this.nameInput,
      this.emailInput,
      this.passwordInput,
      this.confirmPasswordInput,
    ].forEach((input) => {
      input.classList.remove('error');
      if (input.dataset.originalPlaceholder) {
        input.placeholder = input.dataset.originalPlaceholder;
      }
    });
    this.agreeLabel.classList.remove('error');

    let hasErrors = false;

    if (!name) {
      this.showInputError(this.nameInput, 'Enter your name');
      hasErrors = true;
    }

    if (!email) {
      this.showInputError(this.emailInput, 'Enter your email');
      hasErrors = true;
    } else if (!/@example\.com$/.test(email)) {
      this.showInputError(this.emailInput, 'Email must be @example.com');
      hasErrors = true;
    }

    if (!password) {
      this.showInputError(this.passwordInput, 'Create a password');
      hasErrors = true;
    }

    if (!confirmPassword) {
      this.showInputError(this.confirmPasswordInput, 'Confirm your password');
      hasErrors = true;
    } else if (password && password !== confirmPassword) {
      this.showInputError(this.confirmPasswordInput, 'Passwords do not match');
      hasErrors = true;
    }

    if (!agree) {
      this.agreeLabel.classList.add('error');
      hasErrors = true;
    }

    if (!hasErrors) {
      alert('✅ Registered successfully!');
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

const registration = new RegistrationForm({
  nameId: 'name',
  emailId: 'email',
  passwordId: 'password-input',
  confirmPasswordId: 'confirmPassword',
  agreeId: 'agree',
  registerSelector: '.reg-btn',
  eyeIconSelector: '.psw-img',
});
