// const store = require('../../../network/store/dummy');
const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStored) {
	let store = injectedStored;
	// let store = null;
	console.log('---------ingrese--------', injectedStored)
	if (!store) { // aca ya no ingresa por q ya existe una conexion a mysql
		console.log('---------')
		store = require('../../../store/dummy');
	}

	function list() {
		return store.list(TABLA);
	}

	function get(id) {
		return store.get(TABLA, id);
	}

	async function upsert(body) {
		const user = {
			name: body.name,
			username: body.username,
		}
		if (body.id) {
			user.id = body.id;
		} else {
			user.id = nanoid();
		}

		if (body.password || body.username) {
			await auth.upsert({
				id: user.id,
				username: user.username,
				password: body.password,
			})
		}

		return store.upsert(TABLA, user);
	}

	function deleteUser(userId) {
		return store.remove(TABLA, userId);
	}

	function follow(from, to) {
		return store.upsert(`${TABLA}_follow`, {
			user_from: from,
			user_to: to
		})
	}
	async function following(userId) {
		const join = {}
		join[TABLA] = 'user_to'; // {user: 'user_to'}
		const query = { user_from: userId };

		return await store.query(TABLA + '_follow', query, join);

	}

	


	return {
		list,
		get,
		upsert,
		deleteUser,
		follow,
		following,
	};
}

// module.exports = {
// 	list,
// }
