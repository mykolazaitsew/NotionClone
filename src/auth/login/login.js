import { RegistrationForm } from "../registration/registration.js";

class LoginForm extends RegistrationForm {
    constructor (config) {
        super(config);
        this.Init();
    }

    Init() {
        this.registerBtn.addEventListener('click', () => this.validate);
        this.eyeIcon.addEventListener('click', () => this.togglePassword());
    }
}

const login = new LoginForm({
  nameId: 'name',
  passwordId: 'password-input',
  registerSelector: '.reg-btn',
  eyeIconSelector: '.psw-img',
});