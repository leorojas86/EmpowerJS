class ApiClient {
  constructor() {
    switch(Config.get().CURRENT_ENVIRONMENT) {
      case 'mock':
        this.userService = new UserServiceMock();
        this.inventoryService = new InventoryServiceMock();
      break;
      case 'dev':
        S3.instance = new S3(Environments.get()['dev'].s3);
        this.userService = new UserServiceS3();
        this.inventoryService = new InventoryServiceS3();
      break;
      default:
        console.error(`Unknown environment '${environment}'`);
      break;
    }
  }
}
