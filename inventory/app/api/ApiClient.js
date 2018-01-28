class ApiClient {
  constructor() {
    const environment = Config.get().environment;
    switch(environment) {
      case 'mock':
        this.userService = new UserServiceMock();
        this.inventoryService = new InventoryServiceMock();
      break;
      default:
        console.error(`Unknown environment '${environment}'`);
      break;
    }
  }
}
