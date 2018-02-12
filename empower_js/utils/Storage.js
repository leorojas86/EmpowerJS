class Storage {

  static getData(key) {
		return localStorage.getItem(key);
	}

	static setData(key, value) {
		localStorage.setItem(key, value);
	}

  static getObject(key) {
    const json = this.getData(key);
    return json != null ? JSON.parse(json) : null;
  }

	static setObject(key, object) {
		const json = JSON.stringify(object);
		this.setData(key, json);
	}

	static remove(key) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}
