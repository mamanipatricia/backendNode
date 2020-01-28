// const store = require('../../../network/store/dummy');
const nanoid = require('nanoid');
 
const TABLA = 'user';

module.exports = function (injectedStored) {
	let store = injectedStored;
	if (!store) {
		store = require('../../../network/store/dummy');
	}

	function list() {
		return store.list(TABLA);
	}
	function get(id) {
		return store.list(TABLA, id);
	}
	function upsert(body) {
		const user = {
			name: body.name
		}
		if (body.id) {
			user.id = body.id;
		} else {
			user.id - nanoid();
		}
		return store.upsert(TABLA, user);
	}

	return {
		list,
		get,
		upsert,
	};
}

// module.exports = {
// 	list,
// }
