class TextInputModel {

  constructor() {

  }

}

class TextInputView {

  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  get inputId() {
    return `${this.id}_input_text`;
  }

  get inputText() {
    return Html.getValue(this.inputId);
  }

  buildHTML() {
    return  `<div id='${this.id}' class='text_input'>
              <span class="lsf symbol">${this.component.model.data.symbol}</span>
              <input type='text' id='${this.inputId}' placeholder='${this.component.model.data.placeHolderText}' value='${this.component.model.data.inputText}'>
             </div>`;
  }

  onDomUpdated() {
    Html.onClick(this.id, () => Html.setFocus(`${this.id}_input_text`));
  }

}

class TextInput {

  constructor(id) {
    this.model = new TextInputModel(this);
		this.view = new TextInputView(this, id);
  }

}
