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
