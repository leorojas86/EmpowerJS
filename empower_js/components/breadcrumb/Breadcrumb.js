class BreadcrumbModel {

  constructor(onPathNameClicked) {
    this.data = { path:[] };
    this.onPathNameClicked = onPathNameClicked;
  }

  isInPath(itemId) {
    return this.data.path.find((currentPathItem) => currentPathItem.id === itemId) != null;
  }

}

class BreadcrumbView {

  constructor(id, component) {
    this.id = id;
    this.component = component;
  }

  buildHTML() {
    let pathHTML = '';
    let index = 0;
    this.component.model.data.path.forEach((currentPathItem) => {
      if(index === 0) { //First one
        pathHTML += `<span id='path_${index}' class="lsf symbol home">${currentPathItem.name}</span>`;
      } else if(index === this.component.model.data.path.length - 1) { //Last one
        pathHTML += `<span class="lsf symbol arrow">right</span><span id='path_${index}'>${currentPathItem.name}</span>`;
      } else {
        pathHTML += `<span class="lsf symbol arrow">right</span><span id='path_${index}' class='clickable_path_item'>${currentPathItem.name}</span>`;
      }
      index++;
    });

    return `<div id='${this.id}' class='${this.id} breadcrumb'>
              ${pathHTML}
            </div>`;
  }

  onDomUpdated() {
    const path = this.component.model.data.path;
    path.forEach((currentPathItem) => {
      const index = path.indexOf(currentPathItem);
      if(index < path.length - 1) { //Not the last one
        Html.onClick(`path_${index}`, () => this.component.model.onPathNameClicked(currentPathItem));
      }
    });
  }

}

class Breadcrumb {

  constructor(id, onPathNameClicked) {
    this.model = new BreadcrumbModel(onPathNameClicked);
    this.view = new BreadcrumbView(id, this);
  }

}
