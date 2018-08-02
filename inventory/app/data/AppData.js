class AppData {

  static get instance() {
    if (AppData._instance) {
      return AppData._instance;
    }
    return AppData._instance = new AppData();
  }

  constructor() {
    this.data = {//Default values
			user: null,
			currentLanguage:'en',
			currentScreen: 'welcome',
			currentInventoryItem: null
		};
    this.testAccount = { email:'test@test.com', password:'test'};
  }

  getUser() { return this.data.user; }
  setUser(user) { this.data.user = user; }

  getCurrentScreen() { return this.data.currentScreen; }
  setCurrentScreen(screen) { this.data.currentScreen = screen; }

  getCurrentLanguage() { return this.data.currentLanguage; }
  setCurrentLanguage(language) {
    this.data.currentLanguage = language;
    Localization.instance.currentLanguage = language;
  }

  getCurrentInventoryItem() { return this.data.currentInventoryItem; }
  setCurrentInventoryItem(item) { this.data.currentInventoryItem = item; }

}
