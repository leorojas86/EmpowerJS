class RegistrationModel {

  constructor() {

  }

  validateRegistrationData(email, password, confirmPassword) {
    return new Promise((resolve, reject) => {
      if(!email || !password || !confirmPassword) {
        reject('[@fields_cant_be_empty@]');
      }
      else if(password !== confirmPassword) {
        reject('[@passwords_dont_match@]');
      } else {
        resolve();
      }
    });
  }

  get inputValues() { return Config.get().CURRENT_ENVIRONMENT === 'prod' ? { email: '', password: ''} : AppData.instance.testAccount; }

}

class RegistrationView {

  constructor(component) {
    this.component = component;
    this.id = 'registration_screen';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}' align='center'>
              <div class='container'>
                <p>[@email_text@]</p>
                <input type='text' id='${this.id}_user_email' value='${this.component.model.inputValues.email}'>
                <p>[@password_text@]</p>
                <input type='text' id='${this.id}_user_password' value='${this.component.model.inputValues.password}'>
                <p>[@confirm_password_text@]</p>
                <input type='text' id='${this.id}_confirm_user_password' value='${this.component.model.inputValues.password}'>
                <button id='${this.id}_register_button'>
                  <span class="lsf symbol">plus</span> [@register_button_text@]
                </button>
                ${ this.component.spinner.view.buildHTML() }
              </div>
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_register_button`, () => {
      const email = Html.getValue(`${this.id}_user_email`);
      const password = Html.getValue(`${this.id}_user_password`);
      const confirmPassword = Html.getValue(`${this.id}_confirm_user_password`);
      this.component.onRegisterButtonClick(email, password, confirmPassword);
    });
  }

}

class Registration {

  constructor() {
    this.view = new RegistrationView(this);
    this.model = new RegistrationModel(this);
    this.spinner = Html.addChild(new Spinner('registration_spinner'), this);
  }

  onRegisterButtonClick(email, password, confirmPassword) {
    this.spinner.show();
    this.model.validateRegistrationData(email, password, confirmPassword)
      .then(() => {
        return ApiClient.instance.userService.register(email, password)
          .then((response) => App.instance.onLoggedUserChanged(response))
          .catch((reason) => App.instance.handleError(reason, '[@registration_failed_text@]'))
      })
      .catch((reason) => App.instance.messagePopup.show({ symbol:'trouble', title:'[@registration_failed_text@]', message:reason }))
      .finally(() => this.spinner.hide());
  }

}
