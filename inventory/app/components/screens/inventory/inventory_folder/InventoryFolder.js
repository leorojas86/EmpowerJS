class InventoryFolderModel {

  constructor(component) {
    this.component = component;
    this.children = [];
  }

  loadCurrentItemChildren() {
    return ApiClient.instance.inventoryService.getItemChildren(AppData.instance.getCurrentInventoryItem())
      .then((children) => {
        this.children = children;
        return children;
      });
  }

}

class InventoryFolderView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_folder';
  }

  buildHTML() {
    let childrenHTML = '';
    this.component.children.forEach((child) => childrenHTML += child.view.buildHTML() );
    return `<div id='${this.id}' class='${this.id}'>
              ${childrenHTML}
              ${ this.component.contextMenu.view.buildHTML() }
            </div>`;
  }

}

class InventoryFolder {

  constructor() {
    this.model = new InventoryFolderModel(this);
    this.view = new InventoryFolderView(this);
    this.contextMenu = Html.addChild(new InventoryContextMenu(this), this);
    this.children = [];
  }

  load() {
    return this.model.loadCurrentItemChildren()
      .then((children) => {
        this.children = children.map((child) => Html.addChild(new InventoryFolderChild(`${child.id}`, child), this));
      });
  }

}
