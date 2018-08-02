class StorageServiceMock {

    constructor() {
        this.items = {};
        this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
    }

    saveItem(itemKey, item, contentType) {
      return this.saveData(itemKey, JSON.stringify(item), contentType);
    }

    getItem(itemKey) {
      return this.getData(itemKey)
        .then((data) => {
            return JSON.parse(data);
        });
    }

    getItemWithDefault(itemKey, defaultData) {
      return this.hasItem(itemKey)
        .then((hasItem) => hasItem ? this.getItem(itemKey) : defaultData);
    }

    saveData(dataKey, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.items[dataKey] = data;
                resolve();
            }, this.responseMiliSec);
        });
    }

    getData(dataKey) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.items[dataKey]);
            }, this.responseMiliSec);
        });
    }

    deleteItem(itemKey) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                delete this.items[itemKey];
                resolve();
            }, this.responseMiliSec);
        });
    }

    hasItem(itemKey) {
        return Promise.resolve(this.items[itemKey] != null);
    }

}
