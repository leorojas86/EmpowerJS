class Storage {

  static get(key) {
		return localStorage.getItem(key);
	}

	static set(key, value) {
		localStorage.setItem(key, value);
	}

  static getObject(key) {
    const json = this.get(key);
    return json != null ? JSON.parse(json) : null;
  }

	static setObject(key, object) {
		const json = JSON.stringify(object);
		this.set(key, json);
	}

	static remove(key) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}
