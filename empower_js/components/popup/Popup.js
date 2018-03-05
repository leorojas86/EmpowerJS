class PopupModel {

  constructor() {
    this.isShown = false;
  }

}

class PopupView {
  constructor(component, contentComponent) {
    this.component = component;
    this.contentComponent = contentComponent;
    this.id = `${contentComponent.view.id}_main`;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      return `<div id='${this.id}' class='${this.contentComponent.view.id} popup'>
                <div id='${this.contentComponent.view.id}_grayout' class='grayout'></div>
                <div class='popup_content'>
    						 ${ this.contentComponent.view.buildHTML() }
                </div>
  			  		</div>`;
    }
    return `<div id='${this.id}'></div>`;
  }

  onDomUpdated() {
    if(this.component.model.isShown) {
      Html.onMouseDown(`${this.contentComponent.view.id}_grayout`, () => this.component.hide());
      Html.onKeyUp(this.id, (key) => {
        if(key.code === 'Escape') {
          this.component.hide();
        }
      });
    }
  }

}

class Popup {

  constructor(contentComponent) {
    this.model = new PopupModel();
		this.view = new PopupView(this, contentComponent);
    this.contentComponent = Html.addChild(contentComponent, this);
    this.contentComponent.popup = this;
  }

  show(popupData) {
    this.contentComponent.model.data = popupData;
    this.model.isShown = true;
    Html.refresh(this);
  }

  hide() {
    this.model.isShown = false;
    Html.refresh(this);
  }

}
