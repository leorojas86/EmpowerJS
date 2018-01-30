class InventoryContextMenuModel {

  constructor(component) {
    this.cuttingItem = null;
    this.component = component;
  }

  getMenuOptions(item) {
    if(item) {
      return [
        { id:'rename', text:'[@rename_text@]', symbol:'edit', onClick:() => this.onClick('rename', item) },
        { id:'cut', text:'[@cut_text@]', symbol:'cut', onClick:() => this.onClick('cut', item) },
        { id:'delete', text:'[@delete_text@]', symbol:'delete', onClick:() => this.onClick('delete', item) }
      ];
    } else {
      const defaultOptions = [
        { id:'add_file', text:'[@add_file_text@]', symbol:'file', onClick:() => this.onClick('add_file', item) },
        { id:'add_folder', text:'[@add_folder_text@]', symbol:'folder', onClick:() => this.onClick('add_folder', item) }
      ];
      if(this.cuttingItem &&
         this.cuttingItem.parentId != AppData.instance.getCurrentInventoryItem().id &&
         !App.instance.inventory.header.breadcrumb.model.isInPath(this.cuttingItem.id)) {
        defaultOptions.push({ id:'paste', text:'[@paste_text@]', symbol:'copy', onClick:() => this.onClick('paste', item) });
      }
      return defaultOptions;
    }
  }

  onClick(action, item) {
    switch (action) {
      case 'cut': this.cuttingItem=item; break;
      case 'rename': this.component.renameItem(item);  break;
      case 'delete': this.component.deleteItem(item);  break;
      case 'add_file': this.component.addItem('file');  break;
      case 'add_folder': this.component.addItem('folder');  break;
      case 'paste': this.component.pasteItem();  break;
    }
  }

}

class InventoryContextMenuView {

  constructor(component, inventoryFolder) {
    this.component = component;
    this.inventoryFolder = inventoryFolder;
    this.id = 'inventory_context_menu';
  }

  buildHTML() {
    return `<div id='${this.id}'></div>`;
  }

  onDomUpdated() {
    Html.onContextMenu(this.inventoryFolder.view.id, (event) => {
      const itemId = event.target.getAttribute('itemId');
      const item = itemId ? this.inventoryFolder.model.children.find((currentItem) => currentItem.id === itemId) : null;
      const contextMenuPosition = Html.convertToScrolledPosition({ x:event.clientX, y:event.clientY });
      App.instance.contextMenu.show(this.component.model.getMenuOptions(item), contextMenuPosition);
      return false;
    });
  }

}

class InventoryContextMenu {

  constructor(inventoryFolder) {
    this.model = new InventoryContextMenuModel(this, inventoryFolder);
    this.view = new InventoryContextMenuView(this, inventoryFolder);
  }

  addItem(itemType) {
    App.instance.textPromptPopup.show({
      title:`[@add_${itemType}_text@]`,
      placeholder:'[@name_text@]',
      onTextEntered: (text) => {
        const action = () => ApiClient.instance.inventoryService.addItem(itemType, text, AppData.instance.getCurrentInventoryItem());
        App.instance.inventory.exectuteAction(action);
      }
    });
  }

  deleteItem(item) {
    const action = () => ApiClient.instance.inventoryService.deleteItem(item);
    App.instance.inventory.exectuteAction(action);
  }

  renameItem(item) {
    App.instance.textPromptPopup.show({
      title:`[@change_name_text@]`,
      placeholder:'[@name_text@]',
      value: item.name,
      onTextEntered: (text) => {
        const action = () => ApiClient.instance.inventoryService.renameItem(item, text);
        App.instance.inventory.exectuteAction(action);
      }
    });
  }

  pasteItem() {
    const action = () => ApiClient.instance.inventoryService.moveItem(this.model.cuttingItem, AppData.instance.getCurrentInventoryItem());
    App.instance.inventory.exectuteAction(action);
  }
}
