window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), 'en');
	Html.refresh(App.instance);
};
