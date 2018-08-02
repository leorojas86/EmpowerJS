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
    return (id != null ? ApiClient.instance.inventoryService.getItemById(id) : ApiClient.instance.inventoryService.getRootItem())
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
    if(!AppData.instance.getCurrentInventoryItem()) {
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
