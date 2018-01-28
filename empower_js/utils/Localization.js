class Localization {

  initialize(localizationTable, currentLanguage) {
    this.localizationTable = localizationTable;
    this.currentLanguage = currentLanguage;
  }

  _getLocalizedText(match) {
    const localizeKey = match.replace('[@', '').replace('@]', '');
    const localizedText = this.localizationTable[localizeKey];
    if(localizedText) {
      return localizedText[this.currentLanguage];
    }
    return null;
  }

  localizeHTML(html) {
    const regex = /\[@+\w+\@\]/g;
    const matches = html.match(regex);
    if(matches) {
      matches.forEach((match) => {
        const localizedText = this._getLocalizedText(match);
        if(localizedText) {
          html = html.replace(match, localizedText);
        }
      });
    }
    return html;
  }

}


//https://regex101.com/
//\[@+\w+\@\]
//<button id="user_button" class="user_button">[@LOGIN_TEXT@]</button>
