const auth = require('../../../auth')
const bcrypt = require('bcrypt')
const TABLA = 'auth';

module.exports = function (injectedStored) {
    let store = injectedStored;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        let userTemporal = {
            username: username,
            // username
        }

        console.log('_----------')
        console.log(userTemporal)
        console.log('_----------')

        const userT = await store.query(TABLA, userTemporal);
        let user= JSON.parse(JSON.stringify(userT))

        console.log(password, user);
        return bcrypt.compare(password, user.password)
        .then(isEqual => {
            // generar token
            if (isEqual) {
                return auth.sign(user);
            }
            throw new Error("Informacion invalida");
        })
    }

    async function upsert(data) {
        // para registro y actualizacion del usr
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 6);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login,

    }

}