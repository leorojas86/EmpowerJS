const INVENTORY_ROOT_ITEM_ID = "root";

class InventoryService {

  _getPathItemRecursively(item) {
    const pathItem = { id:item.id, name:item.name };
    if(item.parentId) {
      return this.getItemById(item.parentId)
        .then((parentItem) => this._getPathItemRecursively(parentItem))
        .then((path) => {
          path.push(pathItem);
          return path;
        });
    }
    return Promise.resolve([pathItem]);
  }

  _checkForExistingRootItem() {
    return ApiClient.instance.storageService.hasItem(INVENTORY_ROOT_ITEM_ID)
      .then((hasItem) => {
        //TODO: Check when should this be created
        /*if(!hasItem) {
          const newItem = { id:INVENTORY_ROOT_ITEM_ID, name:'home', type:'folder', parentId:null, children:[] };
          return this.saveItem(newItem);
        }*/
      });
  }

  getRootItem() {
    return this._checkForExistingRootItem()
      .then(() => this.getItemById(INVENTORY_ROOT_ITEM_ID));
  }

  getItemById(id) {
    return ApiClient.instance.storageService.getItem(`item_${id}`);
  }

  getItemChildren(item) {
    const promises = item.children.map((childId) => ApiClient.instance.storageService.getItem(`item_${childId}`));
    return Promise.all(promises);
  }

  getItemPath(item) {
    return this._getPathItemRecursively(item);
  }

  _deleteRecursively(item) {
    const deleteChildrenPromises = item.children.map((childId) => {
      return ApiClient.instance.storageService.getItem(`item_${childId}`)
        .then((item) => this._deleteRecursively(item));
    });
    return Promise.all(deleteChildrenPromises)
      .then(() => ApiClient.instance.storageService.deleteItem(`item_${item.id}`));
  }

  deleteItem(item) {
    return this.getItemById(item.parentId)
      .then((parentItem) => {
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);//Delete from parent children
        return this.saveItem(parentItem);
      })
      .then(() => this._deleteRecursively(item));
  }

  addChildItem(type, name, parentItem) {
    const newItem = { id:Guid.generateNewGUID(), name:name, type:type, parentId:parentItem.id, children:[] };
    return this.saveItem(newItem)
      .then(() => {
        parentItem.children.push(newItem.id);
        this.saveItem(parentItem);
      });
  }

  renameItem(item, newName) {
    item.name = newName;
    return this.saveItem(item);
  }

  moveItem(item, newParent) {
    return this.getItemById(item.parentId)
      .then((parentItem) => {
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);//Delete from parent children
        return this.saveItem(parentItem);
      })
      .then(() => {
        item.parentId = newParent.id;
        newParent.children.push(item.id);
        return this.saveItem(item)
          .then(() => this.saveItem(newParent))
      });
  }

  saveItem(item) {
    return ApiClient.instance.storageService.saveItem(`item_${item.id}`, item);
  }

}
