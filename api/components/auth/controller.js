const TABLA = 'auth';

module.exports = function (injectedStored) {
	let store = injectedStored;
	if (!store) {
		store = require('../../../network/store/dummy');
    }

    function upsert(data) {
        // para registro y actualizacion del usr
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,

    }


}