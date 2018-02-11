Localization.instance = new Localization();
ApiClient.instance = new ApiClient();
AppData.instance = new AppData();
App.instance = new App();

window.onload = () => {
	Platform.init();
	Localization.instance.initialize(LocalizationTable.get(), AppData.instance.getCurrentLanguage());
	ApiClient.instance.userService.restore();
	App.instance.onLoggedUserChanged(ApiClient.instance.userService.loggedUser);
	Html.refresh(App.instance);
};
