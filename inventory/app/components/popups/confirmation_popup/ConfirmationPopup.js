class ConfirmationPopupModel {

}

class ConfirmationPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'confirmation_popup';
  }

  buildHTML() {
    const data = this.component.model.data;
    return  `<div id='${this.id}' align='center'>
               <span class='title'>
                <span class="lsf symbol">${data.symbol}</span> ${data.title}
               </span>
               <p class='message'>${data.message}</p>
               <button id='${this.id}_no_button'>
                 <span class="lsf symbol">close</span> [@no_text@]
               </button>
               <button id='${this.id}_yes_button'>
                 <span class="lsf symbol">ok</span> [@yes_text@]
               </button>
             </div>`;
  }

  onDomUpdated() {
    Html.onMouseDown(`${this.id}_grayout`, () => {});//Do nothing
    Html.onClick(`${this.id}_no_button`, () => this.component.popup.hide());
    Html.onClick(`${this.id}_yes_button`, () => {
      this.component.popup.hide();
      this.component.model.data.onConfirmation();
    });
  }

}

class ConfirmationPopup {

  constructor() {
    this.model = new ConfirmationPopupModel();
		this.view = new ConfirmationPopupView(this);
  }

}
