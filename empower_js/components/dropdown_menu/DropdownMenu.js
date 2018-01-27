class DropdownMenuModel {

  constructor() {
    this.data = { options:[] };
    this.isShown = false;
  }

}

class DropdownMenuView {

  constructor(id, component) {
    this.id = id;
    this.component = component;
  }

  buildHTML() {
    if(this.component.model.isShown) {
      let optionsHTML = '';
      this.component.model.data.options.forEach((option) => {
        optionsHTML += `<button id='${option.id}' class='${option.id} option'>
                          <span class="lsf symbol">${option.symbol}</span> ${option.text}
                        </button>`;
      });
      return `<div id='${this.id}' class='${this.id} dropdown_menu'>
                ${optionsHTML}
              </div>`;
    }
    return `<div id='${this.id}'></div>`;
  }

  onDomUpdated() {
    if(this.component.model.isShown) {
      this.component.model.data.options.forEach((option) => {
        Html.onClick(option.id, () => {
          this.component.hide();
          option.onClick();
        });
      });
    }
  }

  setPosition(position) {
    const element = Html.getElement(this.id);
    element.style.position = "absolute";
    element.style.display  = 'inline';
		element.style.left 	   = position.x + "px";
		element.style.top  	   = position.y + "px";
  }

}

class DropdownMenu {

  constructor(id) {
    this.model = new DropdownMenuModel();
    this.view = new DropdownMenuView(id, this);
  }

  show(options, position) {
    this.model.data.options = options;
    this.model.isShown = true;
    Html.refresh(this);
    this.view.setPosition(position);
  }

  hide() {
    this.model.isShown = false;
    Html.refresh(this);
  }

}
