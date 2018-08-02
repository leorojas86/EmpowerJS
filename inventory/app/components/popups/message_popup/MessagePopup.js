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
    this.model = new MessagePopupModel(this);
		this.view = new MessagePopupView(this);
  }

}
