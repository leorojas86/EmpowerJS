window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), AppData.instance.getCurrentLanguage());
	Html.refresh(App.instance);
};
