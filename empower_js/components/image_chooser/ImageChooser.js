class ImageChooserModel {

  constructor() {
    this.imageData = null;
  }

  setImageData(imageData) {
    this.imageData = imageData;
  }

}

class ImageChooserView {

  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    const imageHtml = this.component.model.imageData ?
      `<img src='${this.component.model.imageData}'/>`
      :
      `<span class='lsf symbol'>image</span>`;
      return `<div id='${this.id}' class='image_chooser' align='center'>
                ${imageHtml}
                <button id='${this.id}_image_button' class='select_image_button'>
                  <span class='lsf symbol'>image</span>
                  <span>[@select_image_text@]</span>
                  <input  id='${this.id}_image_input'
                          type='file'
                          accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp, image/tif"
                          style="display:none;">
                </button>
              </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_image_button`, () => Html.getElement(`${this.id}_image_input`).click());
    Html.onChange(`${this.id}_image_input`, () => {
      Html.getImageData(`${this.id}_image_input`)
        .then((imageData) => {
          this.component.onImageChoosed(imageData)
        } );
    });
  }

}

class ImageChooser {

  constructor(id) {
    this.model = new ImageChooserModel(this);
    this.view = new ImageChooserView(this, id);
  }

  load(imageData, onImageChoosedCallback) {
    this.onImageChoosedCallback = onImageChoosedCallback;
    this.model.setImageData(imageData);
  }

  onImageChoosed(imageData) {
    this.model.setImageData(imageData);
    Html.refresh(this);
    this.onImageChoosedCallback();
  }

}
