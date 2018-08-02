class HeaderModel {

  get currentScreenTitleText() {
    return AppData.instance.getCurrentScreen() + '_text';
  }

  get isUserLoggedIn() {
    return AppData.instance.getUser() != null;
  }

}

class HeaderView {

  constructor(component) {
    this.component = component;
    this.id = 'header';
  }

  buildHTML() {
    if(this.component.model.isUserLoggedIn) {
      return `<div id='${this.id}' class='${this.id}'>
                <button id='${this.id}_menu_button' class='left'>
                  <span class="lsf symbol">menu</span>
                </button>
                <span class='screen_title'>[@${this.component.model.currentScreenTitleText}@]</span>
                <button id='${this.id}_user_button' class='header_user_button right'>
                  <span class="lsf symbol">user</span>
                </button>
              </div>`;
    }

    return `<div id='${this.id}' class='${this.id}'>
              <span class='screen_title'>[@${this.component.model.currentScreenTitleText}@]</span>
              <button id='${this.id}_login_button' class='header_user_button right'>
                <span class="lsf symbol">in</span>
              </button>
            </div>`;
  }

  onDomUpdated() {
    if(AppData.instance.getUser()) {
      Html.onClick(`${this.id}_user_button`, () => this.component.onUserButtonClicked());
      Html.onClick(`${this.id}_menu_button`, () => this.component.onMenuButtonClicked());
    } else {
      Html.onClick(`${this.id}_login_button`, () => this.component.onLoginButtonClicked());
    }
  }

}

class Header {

  constructor() {
		this.model = new HeaderModel(this);
		this.view = new HeaderView(this);
	}

  onUserButtonClicked() {
    App.instance.userPopup.show();
  }

  onLoginButtonClicked() {
    App.instance.loginPopup.show();
  }

  onMenuButtonClicked() {
    App.instance.menuPopup.show();
  }

}
