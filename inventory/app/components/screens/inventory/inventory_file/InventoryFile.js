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
