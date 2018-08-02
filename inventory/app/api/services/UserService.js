class UserService {

  constructor() {
    this.loggedUser = null;
  }

  _checkForExistingUser(email) {
    return new Promise((resolve, reject) => {
      ApiClient.instance.storageService.hasItem(`user_${email}`)
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
      return this._checkForExistingUser(email)
        .then(() => {
            const userItem = { id:Guid.generateNewGUID(), name:email, email:email, password:password };
            return ApiClient.instance.storageService.saveItem(`user_${email}`, userItem, 'application/json')
              .then(() => this.login(email, password));
        });
  }

  login(email, password) {
    return ApiClient.instance.storageService.hasItem(`user_${email}`)
      .then((userExists) => {
        if(userExists) {
          return ApiClient.instance.storageService.getItem(`user_${email}`)
            .then((user) => {
              if(user.password === password) { //TODO: Encrypt password
                this.loggedUser = user;
                user.password = undefined;
                Storage.setObject('LOGGED_USER', user);
                return user;
              } else {
                throw { errorCode: 'invalid_credentials' };
              }
            });
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
