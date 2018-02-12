class InventoryServiceS3 {

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

  getItemById(id) {
    return S3.instance.getItem(`item_${id}`);
  }

  getItemChildren(item) {
    const promises = item.children.map((childId) => S3.instance.getItem(`item_${childId}`));
    return Promise.all(promises);
  }

  getItemPath(item) {
    return this._getPathItemRecursively(item);
  }

  deleteItem(item) {
    return this.getItemById(item.parentId)
      .then((parentItem) => {
        parentItem.children.splice(parentItem.children.indexOf(item.id), 1);//Delete from parent children
        return this.saveItem(parentItem);
      })
      .then(() => S3.instance.deleteItem(item.id));
  }

  addChildItem(type, name, parentItem) {
    const newItem = { id:Guid.generateNewGUID(), name:name, type:type, parentId:parentItem.id, children:[] };
    parentItem.children.push(newItem.id);
    return this.saveItem(newItem)
      .then(() => this.saveItem(parentItem));
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
    return S3.instance.saveItem(`item_${item.id}`, item);
  }

}
