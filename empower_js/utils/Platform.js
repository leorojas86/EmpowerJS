class Platform {

  static init() {
    if(!Promise.prototype.finally) {//.finally is not supported by Promise for iOS: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
      Promise.prototype.finally = function(callback) {
        return this.then(callback)
          .catch(callback);
      };
    }
  }

  static isiOS() {
    return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  }
}
