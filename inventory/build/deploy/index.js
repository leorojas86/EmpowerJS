class AppData {

  constructor() {
    this.data = {//Default values
			user: null,
			currentLanguage:'en',
			currentScreen: 'welcome',
			currentInventoryItem: null
		};
  }

  getUser() { return this.data.user; }
  setUser(user) { this.data.user = user; }

  getCurrentScreen() { return this.data.currentScreen; }
  setCurrentScreen(screen) { this.data.currentScreen = screen; }

  getCurrentLanguage() { return this.data.currentLanguage; }
  setCurrentLanguage(language) {
    this.data.currentLanguage = language;
    Localization.instance.currentLanguage = language;
  }

  getCurrentInventoryItem() { return this.data.currentInventoryItem; }
  setCurrentInventoryItem(item) { this.data.currentInventoryItem = item; }

}

AppData.instance = new AppData();

class Config {
  static get() {
    return {
      environment: 'mock'
    };
  }
}

class Environments {
  static get() {
    return {
      mock: {
        responseSec: 0.1
      },
      dev: {

      },
      prod: {

      }
    };
  }
}

class LocalizationTable {

  static get() {
    return {
      "email_text": { en: 'Email', es: 'Correo Electrónico' },
      "password_text": { en: 'Password', es: 'Contraseña' },
      "login_button_text": { en: 'Login', es: 'Ingresar' },
      "register_button_text": { en: 'Register', es: 'Registrarse' },
      "logout_button_text": { en: 'Logout', es: 'Salir' },
      "login_failed_text": { en: 'Login Failed', es: 'Fallo en autenticación' },
      "load_error_text": { en: 'Loading error', es: 'Error cargando' },
      "something_wrong_text": { en: 'Something went wrong', es: 'Algo salió mal' },
      "ok_text": { en: 'Ok', es: 'Aceptar' },
      "loading_text": { en: 'Loading', es: 'Cargando' },
      "cart_text": { en: 'Cart', es: 'Carrito' },
      "notifications_text": { en: 'Notifications', es: 'Notificaciones' },
      "language_text": { en: 'Language', es: 'Lenguage' },
      "login_to_get_started_text": { en: 'Login to get started', es: 'Autentíquese para iniciar' },
      "settings_text": { en: 'Settings', es: 'Configuración' },
      "skin_text": { en: 'Skin', es: 'Apariencia' },
      "welcome_text": { en: 'Welcome', es: 'Bienvenid@' },
      "inventory_text": { en: 'Inventory', es: 'Inventario' },
      "add_file_text": { en: 'Add File', es: 'Agregar Archivo' },
      "add_folder_text": { en: 'Add Folder', es: 'Agregar Folder' },
      "rename_text": { en: 'Rename', es: 'Renombrar' },
      "cut_text": { en: 'Cut', es: 'Cortar' },
      "delete_text": { en: 'Delete', es: 'Borrar' },
      "paste_text": { en: 'Paste', es: 'Pegar' },
      "cancel_text":  { en: 'Cancel', es: 'Cancelar' },
      "add_file_text": { en: 'Add file', es: '+ Archivo' },
      "add_folder_text": { en: 'Add folder', es: '+ Directorio' },
      "change_name_text": { en: 'Change name', es: 'Cambio de nombre' },
      "name_text": { en: 'Name', es: 'Nombre' },
      "save_text": { en: 'Save', es: 'Salvar' },
      "select_image_text": { en: 'Select image', es: 'Seleccionar imagen' },
      /*Error Codes*/
      "invalid_credentials": { en: 'Invalid email or password.', es: 'Correo o password invalido(s).' }
    };
  }

}

class ApiClient {
  constructor() {
    const environment = Config.get().environment;
    switch(environment) {
      case 'mock':
        this.userService = new UserServiceMock();
        this.inventoryService = new InventoryServiceMock();
      break;
      default:
        console.error(`Unknown environment '${environment}'`);
      break;
    }
  }
}

ApiClient.instance = new ApiClient();

class InventoryServiceMock {

  constructor() {
    this.items = [
      { id:'0', name:'home', type:'folder', parentId:null, children:['1','2'] },
      { id:'1', name:'folder 1', type:'folder', parentId:'0', children:['3'] },
      { id:'2', name:'file 1', type:'file', parentId:'0' },
      { id:'3', name:'folder 2', type:'folder', parentId:'1', children:[] },
    ];
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
    this.currentId = 3;
  }

  getItemById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = this.items.find((currentItem) => currentItem.id === id);
        resolve(item);
      }, this.responseMiliSec);
    });
  }

  getItemChildren(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const children = [];
        this.items.forEach((currentItem) => {
          if(item.children.includes(currentItem.id)) {
            children.push(currentItem);
          }
        });
        resolve(children);
      }, this.responseMiliSec);
    });
  }

  getItemPath(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = [];
        let pathItem = item;
        while(pathItem) {
          path.push({ id:pathItem.id, name:pathItem.name });
          pathItem = this.items.find((currentItem) => currentItem.id === pathItem.parentId);
        }
        path.reverse();
        resolve(path);
      }, this.responseMiliSec);
    });
  }

  deleteItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.items.splice(this.items.indexOf(item), 1);
        const parentItem = this.items.find((currentItem) => currentItem.id === item.parentId);
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);
        resolve();
      }, this.responseMiliSec);
    });
  }

  addItem(type, name, parentItem) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.currentId++;
        const id = `${this.currentId}`;
        this.items.push({ id:id, name:name, type:type, parentId:parentItem.id, children:[] });
        parentItem.children.push(id);
        resolve();
      }, this.responseMiliSec);
    });
  }

  renameItem(item, newName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        item.name = newName;
        resolve();
      }, this.responseMiliSec);
    });
  }

  moveItem(item, newParent) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const parentItem = this.items.find((currentItem) => currentItem.id === item.parentId);
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);
        newParent.children.push(item.id);
        item.parentId = newParent.id;
        resolve();
      }, this.responseMiliSec);
    });
  }

  saveItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Do nothing since the item is a reference and it is already updated
        resolve();
      }, this.responseMiliSec);
    });
  }

}

class UserServiceMock {

  constructor() {
    this.users = [{ name: 'test', email: 'test@test.com', password: 'test',  rootInventoryItemId:'0'}];
    this.loggedUser = null;
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
  }

  register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { name: name, email: email, password: password };
        this.users.push(newUser);
        resolve(newUser);
      }, this.responseMiliSec);
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = this.users.find((user) => user.email === email && user.password === password);
        if(foundUser) {
          this.loggedUser = foundUser;
          resolve(foundUser);
        }
        else {
          reject({ errorCode: 'invalid_credentials' });
        }
      }, this.responseMiliSec);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loggedUser = null;
        resolve();
      }, this.responseMiliSec);
    });
  }

}


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
		this.inventory = Html.addChild(new Inventory(), this);
		this.welcome = Html.addChild(new Welcome(), this);
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

App.instance = new App();

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

class HeaderModel {

}

class HeaderView {

  constructor(component) {
    this.component = component;
    this.id = 'header';
  }

  buildHTML() {
    const currentScreenTitleText = AppData.instance.getCurrentScreen() + '_text';
    const rightButton = AppData.instance.getUser() ?
       `<button id='${this.id}_user_button' class='header_user_button right'>
         <span class="lsf symbol">user</span>
        </button>`
       :
       `<button id='${this.id}_login_button' class='header_user_button right'>
         <span class="lsf symbol">in</span>
        </button>`;
    return `<div id='${this.id}' class='${this.id}'>
              <button id='${this.id}_menu_button' class='left'>
               <span class="lsf symbol">menu</span>
              </button>
              <span class='screen_title'>[@${currentScreenTitleText}@]</span>
              ${rightButton}
            </div>`;
  }

  onDomUpdated() {
    if(AppData.instance.getUser()) {
      Html.onClick(`${this.id}_user_button`, () => this.component.onUserButtonClicked());
    } else {
      Html.onClick(`${this.id}_login_button`, () => this.component.onLoginButtonClicked());
    }
  }

}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView(this);
	}

  onUserButtonClicked() {
    App.instance.userPopup.show();
  }

  onLoginButtonClicked() {
    App.instance.loginPopup.show();
  }

}

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
              <div>
                <button id='${this.id}_login_button'>
                 <span class="lsf symbol">in</span> [@login_button_text@]
                </button>
                <button id='${this.id}_register_button'>
                 <span class="lsf symbol">plus</span> [@register_button_text@]
                </button>
              </div>
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

class MessagePopupModel {

}

class MessagePopupView {

  constructor(component) {
    this.component = component;
    this.id = 'message_popup';
  }

  buildHTML() {
    const data = this.component.model.data;
    return  `<div id='${this.id}' align='center'>
               <span class='title'>
                <span class="lsf symbol">${data.symbol}</span> ${data.title}
               </span>
               <p class='message'>${data.message}</p>
               <button id='${this.id}_ok_button'>
                 <span class="lsf symbol">ok</span> [@ok_text@]
               </button>
             </div>`;
  }

  onDomUpdated() {
    Html.onMouseDown(`${this.id}_grayout`, () => {});//Do nothing
    Html.onClick(`${this.id}_ok_button`, () => this.component.popup.hide());
  }

}

class MessagePopup {

  constructor() {
    this.model = new MessagePopupModel();
		this.view = new MessagePopupView(this);
  }

}

class SettingsPopupModel {

}

class SettingsPopupView {

  constructor(component) {
    this.component=component;
    this.id='settings_popup';
  }

  buildHTML() {
    return `<div id='${this.id}' align='center'>
              <span class='title'>
               <span class="lsf symbol">setting</span> [@settings_text@]
              </span>
              <div class='setting'>
                <span>[@language_text@]:</span>
                <select id='${this.id}_language_select'>
                  <option value="en" ${ AppData.instance.getCurrentLanguage() === 'en' ? 'selected' : '' }>English</option>
                  <option value="es" ${ AppData.instance.getCurrentLanguage() === 'es' ? 'selected' : '' }>Español</option>
                </select>
              </div>
              <div class='setting'>
                <span>[@skin_text@]:</span>
                <select>
                  <option value="en">Default</option>
                  <option value="es">Dark</option>
                </select>
              </div>
              <button id='${this.id}_ok_button'>
                <span class="lsf symbol">ok</span> [@ok_text@]
              </button>
            </div>`;
  }

  onDomUpdated() {
    Html.onMouseDown(`${this.id}_grayout`, () => {});//Do nothing
    Html.onClick(`${this.id}_ok_button`, () => this.component.popup.hide());
    Html.onChange(`${this.id}_language_select`, (event) => this.component.selectLanguage(event.target.value));
  }

}

class SettingsPopup {

  constructor() {
    this.model = new SettingsPopupModel(this);
    this.view = new SettingsPopupView(this);
  }

  selectLanguage(value) {
    AppData.instance.setCurrentLanguage(value);
    Html.refresh(App.instance);
  }

}

class TextPromptPopupModel {

}

class TextPromptPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'text_prompt_popup';
  }

  buildHTML() {
    const data = this.component.model.data;
    return  `<div id='${this.id}' align='center'>
               <span class='title'>${data.title}</span>
               <p>
                <input type='text' id='${this.id}_input_text' placeholder='${data.placeholder}' value='${data.value ? data.value : ''}'>
               </p>
               <button id='${this.id}_cancel_button'>
                 <span class="lsf symbol">close</span> [@cancel_text@]
               </button>
               <button id='${this.id}_ok_button'>
                 <span class="lsf symbol">ok</span> [@ok_text@]
               </button>
             </div>`;
  }

  onDomUpdated() {
    Html.onMouseDown(`${this.id}_grayout`, () => {});//Do not automatically close modal when clicked outside the modal
    Html.onClick(`${this.id}_ok_button`, () => this.submit());
    Html.onClick(`${this.id}_cancel_button`, () => this.component.popup.hide());
    Html.setDisabled(`${this.id}_ok_button`, true);
    Html.onKeyUp(`${this.id}_input_text`, (key) => {
      const inputValue = Html.getValue(`${this.id}_input_text`);
      Html.setDisabled(`${this.id}_ok_button`, !inputValue);
      if(inputValue && key.code === 'Enter') {
        this.submit();
      }
    });
    Html.setFocus(`${this.id}_input_text`);
  }

  submit() {
    const inputValue = Html.getValue(`${this.id}_input_text`);
    this.component.popup.hide();
    this.component.model.data.onTextEntered(inputValue);
  }

}

class TextPromptPopup {

  constructor() {
    this.model = new TextPromptPopupModel();
		this.view = new TextPromptPopupView(this);
  }

}

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
              <p>
                <span class="lsf symbol">user</span> ${user.name}
              </p>
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

class InventoryFileModel {

  constructor() {
    this.selectedImageData = null;
  }

  saveImageData() {
    const currentItem = AppData.instance.getCurrentInventoryItem();
    currentItem.imageData = this.selectedImageData;
    return ApiClient.instance.inventoryService.saveItem(currentItem)
      .then(() => this.selectedImageData = null);
  }

  get imageData() {
    return this.selectedImageData || AppData.instance.getCurrentInventoryItem().imageData;
  }
}

class InventoryFileView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_file';
  }

  buildHTML() {
    const imageHtml = this.component.model.imageData ?
      `<img src='${this.component.model.imageData}'/>`
      :
      `<span class='lsf symbol'>image</span>`;
    return `<div id='${this.id}' class='${this.id}'>
              <button id='${this.id}_image_button' class='select_image_button'>
                <span class='lsf symbol'>image</span>
                <span>[@select_image_text@]</span>
                <input  id='${this.id}_image_input'
                        type='file'
                        accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp, image/tif"
                        style="display:none;">
              </button>
              <button id='${this.id}_save_button'>
                <span class='lsf symbol'>save</span> [@save_text@]
              </button>
              <div class='image' align='center'>
                ${imageHtml}
              </div>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_image_button`, () => Html.getElement(`${this.id}_image_input`).click());
    Html.onChange(`${this.id}_image_input`, () => this.component.onImageSelected());
    Html.setDisabled(`${this.id}_save_button`, this.component.model.selectedImageData === null);
    Html.onClick(`${this.id}_save_button`,() => this.component.onSaveButtonClick());
  }

}

class InventoryFile {

  constructor() {
    this.model = new InventoryFileModel();
    this.view = new InventoryFileView(this);
    this.spinner = Html.addChild(new Spinner('inventory_file_spinner'), this);
  }

  load() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  onImageSelected() {
    this.spinner.show();
    Html.getImageData(`${this.view.id}_image_input`)
      .then((imageData) => this.model.selectedImageData = imageData)
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

  onSaveButtonClick() {
    this.spinner.show();
    this.model.saveImageData()
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

}

class InventoryContextMenuModel {

  constructor(component) {
    this.cuttingItem = null;
    this.component = component;
  }

  getMenuOptions(item) {
    if(item) {
      return [
        { id:'rename', text:'[@rename_text@]', symbol:'edit', onClick:() => this.onClick('rename', item) },
        { id:'cut', text:'[@cut_text@]', symbol:'copy', onClick:() => this.onClick('cut', item) },
        { id:'delete', text:'[@delete_text@]', symbol:'delete', onClick:() => this.onClick('delete', item) }
      ];
    } else {
      const defaultOptions = [
        { id:'add_file', text:'[@add_file_text@]', symbol:'file', onClick:() => this.onClick('add_file', item) },
        { id:'add_folder', text:'[@add_folder_text@]', symbol:'folder', onClick:() => this.onClick('add_folder', item) }
      ];
      if(this.cuttingItem &&
         this.cuttingItem.parentId != AppData.instance.getCurrentInventoryItem().id &&
         !App.instance.inventory.header.breadcrumb.model.isInPath(this.cuttingItem.id)) {
        defaultOptions.push({ id:'paste', text:'[@paste_text@]', symbol:'copy', onClick:() => this.onClick('paste', item) });
      }
      return defaultOptions;
    }
  }

  onClick(action, item) {
    switch (action) {
      case 'cut': this.cuttingItem=item; break;
      case 'rename': this.component.renameItem(item);  break;
      case 'delete': this.component.deleteItem(item);  break;
      case 'add_file': this.component.addItem('file');  break;
      case 'add_folder': this.component.addItem('folder');  break;
      case 'paste': this.component.pasteItem();  break;
    }
  }

}

class InventoryContextMenuView {

  constructor(component, inventoryFolder) {
    this.component = component;
    this.inventoryFolder = inventoryFolder;
    this.id = 'inventory_context_menu';
  }

  buildHTML() {
    return `<div id='${this.id}'></div>`;
  }

  onDomUpdated() {
    const inventoryElement = document.getElementById(this.inventoryFolder.view.id);
    inventoryElement.oncontextmenu = (event) => {
      const itemId = event.target.getAttribute('itemId');
      const item = itemId ? this.inventoryFolder.model.children.find((currentItem) => currentItem.id === itemId) : null;
      App.instance.contextMenu.show(this.component.model.getMenuOptions(item), { x:event.clientX, y:event.clientY });
      return false;
    }
    document.onclick = () => App.instance.contextMenu.hide();
  }

}

class InventoryContextMenu {

  constructor(inventoryFolder) {
    this.model = new InventoryContextMenuModel(this, inventoryFolder);
    this.view = new InventoryContextMenuView(this, inventoryFolder);
  }

  addItem(itemType) {
    App.instance.textPromptPopup.show({
      title:`[@add_${itemType}_text@]`,
      placeholder:'[@name_text@]',
      onTextEntered: (text) => {
        const action = () => ApiClient.instance.inventoryService.addItem(itemType, text, AppData.instance.getCurrentInventoryItem());
        App.instance.inventory.exectuteAction(action);
      }
    });
  }

  deleteItem(item) {
    const action = () => ApiClient.instance.inventoryService.deleteItem(item);
    App.instance.inventory.exectuteAction(action);
  }

  renameItem(item) {
    App.instance.textPromptPopup.show({
      title:`[@change_name_text@]`,
      placeholder:'[@name_text@]',
      value: item.name,
      onTextEntered: (text) => {
        const action = () => ApiClient.instance.inventoryService.renameItem(item, text);
        App.instance.inventory.exectuteAction(action);
      }
    });
  }

  pasteItem() {
    const action = () => ApiClient.instance.inventoryService.moveItem(this.model.cuttingItem, AppData.instance.getCurrentInventoryItem());
    App.instance.inventory.exectuteAction(action);
  }
}

class InventoryFolderChildModel {

  constructor(data) {
    this.data = data;
  }

}

class InventoryFolderChildView {

  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    return `<div id='${this.id}' class='inventory_folder_child' itemId='${this.id}'>
              <span class='lsf symbol' itemId='${this.id}'>${this.component.model.data.type}</span>
              <span class='name' itemId='${this.id}'>${this.component.model.data.name}</span>
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(this.id, () => this.component.onClick());
  }

}

class InventoryFolderChild {

  constructor(id, data) {
    this.model = new InventoryFolderChildModel(data);
    this.view = new InventoryFolderChildView(this, id);
  }

  onClick() {
    App.instance.inventory.loadItem(this.model.data.id);
  }

}

class InventoryFolderModel {

  constructor(component) {
    this.component = component;
    this.children = [];
  }

  loadCurrentItemChildren() {
    return ApiClient.instance.inventoryService.getItemChildren(AppData.instance.getCurrentInventoryItem())
      .then((children) => {
        this.children = children;
        return children;
      });
  }

}

class InventoryFolderView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_folder';
  }

  buildHTML() {
    let childrenHTML = '';
    this.component.children.forEach((child) => childrenHTML += child.view.buildHTML() );
    return `<div id='${this.id}' class='${this.id}'>
              ${childrenHTML}
              ${ this.component.contextMenu.view.buildHTML() }
            </div>`;
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel(this);
    this.view = new InventoryFolderView(this);
    this.contextMenu = Html.addChild(new InventoryContextMenu(this), this);
    this.children = [];
  }

  load() {
    return this.model.loadCurrentItemChildren()
      .then((children) => {
        this.children = children.map((child) => Html.addChild(new InventoryFolderChild(`${child.id}`, child), this));
      });
  }

}

class InventoryHeaderModel {

  constructor(component) {
    this.component = component;
  }

  loadCurrentItemPath() {
    return ApiClient.instance.inventoryService.getItemPath(AppData.instance.getCurrentInventoryItem());
  }

}

class InventoryHeaderView {

  constructor(component) {
    this.id = 'inventory_header';
    this.component = component;
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.breadcrumb.view.buildHTML() }
              <span class="lsf symbol search">search</span>
            </div>`;
  }

}

class InventoryHeader {

  constructor() {
    this.model = new InventoryHeaderModel(this);
    this.view = new InventoryHeaderView(this);
    this.breadcrumb = Html.addChild(new Breadcrumb('inventory_breadcrumb', (index) => this.onPathItemClicked(index)), this);
  }

  load() {
    return this.model.loadCurrentItemPath()
      .then((path) => this.breadcrumb.model.data.path = path);
  }

  onPathItemClicked(pathItem) {
    App.instance.inventory.loadItem(pathItem.id);
  }

}

class InventoryModel {

  constructor(component) {
    this.component = component;
  }

  get currentItemComponent() {
    if(AppData.instance.getCurrentInventoryItem()) {
      switch(AppData.instance.getCurrentInventoryItem().type) {
        case 'folder': return this.component.inventoryFolder; break;
        case 'file': return this.component.inventoryFile; break;
      }
    }
    return null;
  }

  loadItem(id) {
    id = id || AppData.instance.getUser().rootInventoryItemId;
    return ApiClient.instance.inventoryService.getItemById(id)
      .then((item) => AppData.instance.setCurrentInventoryItem(item));
  }

}

class InventoryView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.header.view.buildHTML() }
              ${ this.component.model.currentItemComponent ? this.component.model.currentItemComponent.view.buildHTML() : '' }
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    if(!this.component.model.currentItemComponent) {
      this.component.loadItem();
    }
  }

}

class Inventory {

  constructor() {
    this.model = new InventoryModel(this);
    this.view = new InventoryView(this);
    this.header = Html.addChild(new InventoryHeader(), this);
    this.spinner = Html.addChild(new Spinner('inventory_spinner'), this);
    this.inventoryFolder = Html.addChild(new InventoryFolder(), this);
    this.inventoryFile = Html.addChild(new InventoryFile(), this);
  }

  loadItem(id) {
    this.exectuteAction(() => this.model.loadItem(id));
  }

  exectuteAction(actionPromise) {
    this.spinner.show();
    actionPromise()
      .then(() => this.header.load())
      .then(() => this.model.currentItemComponent.load())
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

}

class WelcomeView {

  constructor() {
    this.id = 'welcome_screen';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              <p>[@login_to_get_started_text@]</p>
            </div>`;
  }

}

class Welcome {

  constructor() {
    this.view = new WelcomeView();
  }

}

window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), AppData.instance.getCurrentLanguage());
	Html.refresh(App.instance);
};
