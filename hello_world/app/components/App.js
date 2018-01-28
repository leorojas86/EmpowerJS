class AppModel {

}

class AppView {

  constructor() {
    this.id = 'app';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              <p>[@hello_world_text@]</p>
            </div>`;
  }

}

class App {

  constructor() {
    this.model = new AppModel(this);
    this.view = new AppView(this);
  }

}

App.instance = new App();
