class ApiClient {
  constructor() {
    const env = Config.get().CURRENT_ENVIRONMENT;
    switch(env) {
      case 'mock':
        this.userService = new UserServiceMock();
        this.inventoryService = new InventoryServiceMock();
        this.imageService = new ImageServiceMock();
      break;
      default:
        S3.instance = new S3(Environments.get()[env].s3);
        this.userService = new UserServiceS3();
        this.inventoryService = new InventoryServiceS3();
        this.imageService = new ImageServiceS3();
      break;
    }
  }
}
