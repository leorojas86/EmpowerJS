class CartService {

  constructor() {

  }

  _getNewCart() {
    return { id:Guid.generateNewGUID(), status:'preparing', productsInfo:[], creationDate:new Date().toUTCString() };
  }

  _checkForExistingCartsHistory(userId) {
    return ApiClient.instance.storageService.hasItem(`carts_${userId}`)
      .then((hasItem) => {
        if(!hasItem) {
          const newCart = this._getNewCart();
          return this.saveCart(newCart)
            .then(() => {
              return this.saveCartsHistory(userId, { carts:[{ cartId:newCart.id, creationDate:newCart.creationDate }] });
            });
        }
      });
  }

  addNewCart(userId) {
    const newCart = this._getNewCart();
    return this.saveCart(newCart)
      .then(() => {
        return this.getCartsHistory(userId)
          .then((cartsHistory) => {
            cartsHistory.carts.splice(0, 0, { cartId:newCart.id, creationDate:newCart.creationDate });
            return this.saveCartsHistory(cartsHistory);
          });
      });
  }

  getCurrentCart(userId) {
    return this.getCartsHistory(userId)
      .then((cartsHistory) => this.getCartById(cartsHistory.carts[0].cartId));
  }

  getCartsHistory(userId) {
    return this._checkForExistingCartsHistory(userId)
      .then(() => ApiClient.instance.storageService.getItem(`carts_${userId}`));
  }

  saveCartsHistory(userId, cartsHistory) {
    return ApiClient.instance.storageService.saveItem(`carts_${userId}`, cartsHistory, 'application/json');
  }

  getCartById(id) {
    return ApiClient.instance.storageService.getItem(`cart_${id}`);
  }

  saveCart(cart) {
    return ApiClient.instance.storageService.saveItem(`cart_${cart.id}`, cart, 'application/json');
  }

  isInCurrentCart(userId, item) {
    return this.getCurrentCart(userId)
      .then((currentCart) => {
        return currentCart.productsInfo.find((productInfo) => productInfo.itemId === item.id) != null;
      });
  }

  addToCurrentCart(userId, item, quantity) {
    return this.getCurrentCart(userId)
      .then((cart) => {
        cart.productsInfo.push({ itemId:item.id, quantity:quantity, unit:item.unit, description:item.description || item.name, pricePerUnit: item.pricePerUnit});
        return this.saveCart(cart);
      });
  }

  clearCurrentCart(userId) {
    return this.getCurrentCart(userId)
      .then((currentCart) => {
        currentCart.creationDate = Date.now().toUTCString();
        currentCart.productsInfo = [];
        return this.saveCart(currentCart);
      });
  }

}
