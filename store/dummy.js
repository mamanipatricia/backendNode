const db = {
    'user': [
        { id: 1, name: 'Patricia' },
        { id: 2, name: 'Patricia2' },
    ],
    'auth': [
        { name: 'patty', username: 'patty', password: 123 },
    ]

    // 'logs': []
};

async function list(table) {
    return db[table] || []; // esto inmediatamente devuelve una promesa.
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);
    console.log(db);
}

async function remove(table, id) {
    if (!db[table]) {
        db[table] = [];
    }
    let indexPosition = db[table].findIndex(user => {
        return user.id == id;
    })
    if (indexPosition == -1) {
        throw "User not found."
    }
    db[table].splice(indexPosition, 1);
}

async function query(table, q) {
    let col = await list(table); // get all 'auth table' rows (an array)
    let keys = Object.keys(q); // [ .... 'keys',] =>[username] -- return an array of keys from an object > Object.keys({name:"patty"}) > [ 'name' ]
    let key = keys[0];
    return col
        .filter(item => item[key] === q[key])
    [0] || {};
    // return [{id:1},{id:2}].filter(i => {
    //     return i.username === q.username
    // })[0] || null  -- an explanation..
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}
