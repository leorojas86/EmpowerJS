class UserServiceMock {

  constructor() {
    this.users = [{ name: 'test', email: 'test@test.com', password: 'test',  rootInventoryItemId:'0'}];
    this.loggedUser = null;
    this.mockEnvironment = Environments.get()['mock'];
    this.responseMiliSec = this.mockEnvironment.responseSec * 1000;
  }

  register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { name: name, email: email, password: password };
        this.users.push(newUser);
        resolve(newUser);
      }, this.responseMiliSec);
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = this.users.find((user) => user.email === email && user.password === password);
        if(foundUser) {
          this.loggedUser = foundUser;
          resolve(foundUser);
        }
        else {
          reject({ errorCode: 'invalid_credentials' });
        }
      }, this.responseMiliSec);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loggedUser = null;
        resolve();
      }, this.responseMiliSec);
    });
  }

}
