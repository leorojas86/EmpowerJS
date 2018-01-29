class LoginPopupMode {

  get inputValues() { return Config.get().environment === 'prod' ? { email: '', password: ''} : { email: 'test@test.com', password: 'test'}; }

}

class LoginPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'login_popup';
  }

  buildHTML() {
    return `<div id='${this.id}'>
              <p>[@email_text@]</p>
              <input type='text' id='${this.id}_user_email' value='${this.component.model.inputValues.email}'>
              <p>[@password_text@]</p>
              <input type='text' id='${this.id}_user_password' value='${this.component.model.inputValues.password}'>
              <button id='${this.id}_login_button'>
               <span class="lsf symbol">in</span> [@login_button_text@]
              </button>
              <button id='${this.id}_register_button'>
               <span class="lsf symbol">plus</span> [@register_button_text@]
              </button>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_login_button`, () => {
      const email = Html.getValue(`${this.id}_user_email`);
      const password = Html.getValue(`${this.id}_user_password`);
      this.component.onLoginButtonClick(email, password);
    });
    Html.onClick(`${this.id}_register_button`, () => this.component.popup.hide());
    Html.setFocus(`${this.id}_user_email`);
  }

}

class LoginPopup {

  constructor() {
		this.model = new LoginPopupMode();
		this.view = new LoginPopupView(this);
    this.spinner = Html.addChild(new Spinner('login_popup_spinner'), this);
	}

  onLoginButtonClick(email, password) {
    this.spinner.show();
    ApiClient.instance.userService.login(email, password)
      .then((response) => {
        this.popup.hide();
        App.instance.onLoggedUserChanged(response);
      })
      .catch((reason) => App.instance.handleError(reason, '[@login_failed_text@]'))
      .finally(() => this.spinner.hide());
  }

}
