window.onload = () => {
	Platform.init();
	Localization.instance.initialize(LocalizationTable.get(), AppData.instance.getCurrentLanguage());
	ApiClient.instance.initialize()
		.then(() => {
			App.instance.onLoggedUserChanged();
			Html.refresh(App.instance);
		});
};
