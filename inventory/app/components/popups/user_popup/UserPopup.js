class UserPopupModel {

}

class UserPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'user_popup';
  }

  buildHTML() {
    const user = AppData.instance.getUser();
    return `<div id='${this.id}'>
              <span class='user_name'>
                <span class="lsf symbol">user</span> ${user.name}
              </span>
              <button id='${this.id}_cart_button'>
                <span class="lsf symbol">cart</span> [@cart_text@]
              </button>
              <button id='${this.id}_notifications_button'>
                <span class="lsf symbol">globe</span> [@notifications_text@]
              </button>
              <button id='${this.id}_settings_button'>
                <span class="lsf symbol">setting</span> [@settings_text@]
              </button>
              <button id='${this.id}_logout_button'>
               <span class="lsf symbol">out</span> [@logout_button_text@]
              </button>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_logout_button`, () => this.component.onLogoutButtonClick());
    Html.onClick(`${this.id}_settings_button`, () => this.component.onSettingButtonClicked());
  }

}

class UserPopup {

  constructor() {
		this.model = new UserPopupModel();
		this.view = new UserPopupView(this);
    this.spinner = Html.addChild(new Spinner('user_popup_spinner'), this);
	}

  onLogoutButtonClick() {
    this.spinner.show();
    ApiClient.instance.userService.logout()
      .finally(() => {
        this.spinner.hide();
        this.popup.hide();
        App.instance.onLoggedUserChanged(null);
      });
  }

  onSettingButtonClicked() {
    App.instance.settingsPopup.show();
  }

}
