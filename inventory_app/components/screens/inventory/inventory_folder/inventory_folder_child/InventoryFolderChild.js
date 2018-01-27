class InventoryFolderChildModel {

  constructor(data) {
    this.data = data;
  }

}

class InventoryFolderChildView {

  constructor(component, id) {
    this.component = component;
    this.id = id;
  }

  buildHTML() {
    return `<div id='${this.id}' class='inventory_folder_child' itemId='${this.id}'>
              <span class='lsf symbol' itemId='${this.id}'>${this.component.model.data.type}</span>
              <span class='name' itemId='${this.id}'>${this.component.model.data.name}</span>
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(this.id, () => this.component.onClick());
  }

}

class InventoryFolderChild {

  constructor(id, data) {
    this.model = new InventoryFolderChildModel(data);
    this.view = new InventoryFolderChildView(this, id);
  }

  onClick() {
    App.instance.inventory.loadItem(this.model.data.id);
  }

}
