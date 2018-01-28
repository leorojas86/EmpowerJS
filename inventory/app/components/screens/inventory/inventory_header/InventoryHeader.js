class InventoryHeaderModel {

  constructor(component) {
    this.component = component;
  }

  loadCurrentItemPath() {
    return ApiClient.instance.inventoryService.getItemPath(AppData.instance.getCurrentInventoryItem());
  }

}

class InventoryHeaderView {

  constructor(component) {
    this.id = 'inventory_header';
    this.component = component;
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              ${ this.component.breadcrumb.view.buildHTML() }
              <span class="lsf symbol search">search</span>
            </div>`;
  }

}

class InventoryHeader {

  constructor() {
    this.model = new InventoryHeaderModel(this);
    this.view = new InventoryHeaderView(this);
    this.breadcrumb = Html.addChild(new Breadcrumb('inventory_breadcrumb', (index) => this.onPathItemClicked(index)), this);
  }

  load() {
    return this.model.loadCurrentItemPath()
      .then((path) => this.breadcrumb.model.data.path = path);
  }

  onPathItemClicked(pathItem) {
    App.instance.inventory.loadItem(pathItem.id);
  }

}
