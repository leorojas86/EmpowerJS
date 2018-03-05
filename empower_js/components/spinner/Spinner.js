class SpinnerModel {

  constructor() {
    this.isShown = false;
  }

}

class SpinnerView {
  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      return `<div id='${this.id}' class='spinner'>
                <div id='${this.id}_animation' class='spinner_animation'></div>
              </div>`;
    }
    return `<div id='${this.id}'></div>`;
  }

}

class Spinner {

  constructor(id) {
    this.model = new SpinnerModel();
    this.view = new SpinnerView(this, id);
  }

  show() {
    if(!this.model.isShown) {
      this.model.isShown = true;
      Html.refresh(this);
    }
  }

  hide() {
    this.model.isShown = false;
    Html.refresh(this);
  }

}
