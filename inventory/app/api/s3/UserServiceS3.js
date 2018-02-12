class UserServiceS3 {

  constructor() {
    this.loggedUser = null;
  }

  _checkForExistingUser(email) {
    return new Promise((resolve, reject) => {
      S3.instance.hasItem(`user_${email}`)
        .then((hasItem) => hasItem ? reject({ errorCode: 'user_already_exists' }) : resolve())
        .catch((reason) => reject(reason));
      });
  }

  restore() {
    this.loggedUser = Storage.getObject('LOGGED_USER');
    Storage.clear();
    Storage.setObject('LOGGED_USER', this.loggedUser);
  }

  register(email, password) {
      const rootItem = { id:Guid.generateNewGUID(), name:'home', type:'folder', parentId:null, children:[] };
      return this._checkForExistingUser(email)
        .then(() => ApiClient.instance.inventoryService.saveItem(rootItem))//Create root/home item
        .then(() => {
            const userItem = { name:email, email:email, password:password, rootInventoryItemId:rootItem.id };
            return S3.instance.saveItem(`user_${email}`, userItem, 'application/json')
              .then(() => this.login(email, password));
        });
  }

  login(email, password) {
    return S3.instance.getItem(`user_${email}`)
      .then((user) => {
        if(user.password === password) { //TODO: Encript password
          this.loggedUser = user;
          user.password = undefined;
          Storage.setObject('LOGGED_USER', user);
          return user;
        } else {
          throw { errorCode: 'invalid_credentials' };
        }
      });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.loggedUser = null;
      Storage.clear();
      resolve();
    });
  }

}
