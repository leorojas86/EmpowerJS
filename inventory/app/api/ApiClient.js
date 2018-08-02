class ApiClient {

  static get instance() {
    if (ApiClient._instance) {
      return ApiClient._instance;
    }
    return ApiClient._instance = new ApiClient();
  }

  initialize() {
    this.userService = new UserService();
    this.inventoryService = new InventoryService();
    this.imageService = new ImageService();
    this.searchService = new SearchService();
    this.cartService = new CartService();

    if(Config.get().CURRENT_ENVIRONMENT === 'mock') {
      this.storageService = new StorageServiceMock();
      return this._initMockData();
    }
    
    this.storageService = new S3StorageService(Environments.get()[env].s3);
    this.userService.restore();
    return Promise.resolved();
  }

  _initMockData() {
    return ApiClient.instance.inventoryService.saveItem({ id:'root', name:'home', type:'folder', parentId:null, children:[] })
      .then(() => {
        return this.inventoryService.getRootItem()
          .then((rootItem) => {
            return this.inventoryService.addChildItem('file', 'Mock File', rootItem)
              .then(() => this.inventoryService.addChildItem('folder', 'Mock Folder', rootItem));
          });
      })
      .then(() => this.userService.register('test@test.com', 'test'));
     

    /*this.items = [
      ,
      { id:'1', name:'Folder 1', type:'folder', parentId:'0', children:['5'] },
      { id:'2', name:'Arroz', type:'file', parentId:'0', unit:'3 kg', pricePerUnit:3300 },
      { id:'3', name:'Atún', type:'file', parentId:'0', unit:'200 g', pricePerUnit:900 },
      { id:'4', name:'Escoba', type:'file', parentId:'0', unit:'uni', pricePerUnit:2500 },
      { id:'5', name:'Folder 2', type:'folder', parentId:'1', children:[] },
    ];*/

    //this.inventoryService.items.forEach((item) => this.searchService.updateSearchData(item));

  }

  _saveImageData(item, imageData) {
    if(item.image) {
      return this.imageService.saveImage(item.image, imageData)
        .then(() => item.image);
    } else {
      const imageId = Guid.generateNewGUID();
      return this.imageService.saveImage(imageId, imageData)
        .then(() => imageId);
    }
  }

  saveItem(item, imageData) {
    if(imageData) {
      return this._saveImageData(imageData)
        .then((imageId) => {
          item.image = imageId;
          this.searchService.updateSearchData(item);//TODO: should we queue this to the promise?
          return this.inventoryService.saveItem(item);
        });
    } else {
      item.image = undefined;
      this.searchService.updateSearchData(item);//TODO: should we queue this to the promise?
      return this.inventoryService.saveItem(item);
    }
  }
}
