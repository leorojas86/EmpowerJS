
class AppModel {

	constructor(component) {
		this.component = component;
	}

	updateLoggedUser(user) {
		AppData.instance.setUser(user);
		AppData.instance.setCurrentScreen(user ? 'inventory' : 'welcome');
	}

	get currentScreen() {
		switch (AppData.instance.getCurrentScreen()) {
			case 'welcome': return this.component.welcome; break;
			case 'inventory': return this.component.inventory; break;
			case 'registration': return this.component.registration; break;
		}
 		return null;
	}

}

class AppView {

	constructor(component) {
		this.component = component;
		this.id = 'app';
	}

	buildHTML() {
		return `<div id='${this.id}' class='${this.id}'>
							${ this.component.header.view.buildHTML() }
							${ this.component.model.currentScreen.view.buildHTML() }
							${ this.component.contextMenu.view.buildHTML() }
							${ this.component.loginPopup.view.buildHTML() }
              ${ this.component.userPopup.view.buildHTML() }
							${ this.component.messagePopup.view.buildHTML() }
							${ this.component.textPromptPopup.view.buildHTML() }
							${ this.component.settingsPopup.view.buildHTML() }
						</div>`;
	}

}

class App
{

	constructor() {
		this.model = new AppModel(this);
		this.view = new AppView(this);
		this.header = Html.addChild(new Header(), this);
		this.welcome = Html.addChild(new Welcome(), this);
		this.registration = Html.addChild(new Registration(), this);
		this.inventory = Html.addChild(new Inventory(), this);
		this.contextMenu = Html.addChild(new DropdownMenu('context_menu'), this);
		this.loginPopup = Html.addChild(new Popup(new LoginPopup()), this);
    this.userPopup = Html.addChild(new Popup(new UserPopup()), this);
		this.messagePopup = Html.addChild(new Popup(new MessagePopup()), this);
		this.textPromptPopup = Html.addChild(new Popup(new TextPromptPopup()), this);
		this.settingsPopup = Html.addChild(new Popup(new SettingsPopup()), this);
	}

	handleError(errorData, title) {
		const message = errorData.errorCode ? `[@${errorData.errorCode}@]` : `[@something_wrong_text@]`;
		App.instance.messagePopup.show({ symbol:'trouble', title:title, message:message });
		console.error(errorData);
	}

	onLoggedUserChanged(user) {
		this.model.updateLoggedUser(user);
		Html.refresh(App.instance);
	}

}

/*

App
	- Header
		- ScreenTitle
		- ScreenLinks
			- Home
			- Inventory
			- ?
		- User
	- Body
		- Home
		- Inventory
	- Footer
		- Eula
		- Version
	- Modals
*/
