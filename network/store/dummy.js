const db = {
    'user' : [
        {id: 1, name: 'Patricia'},
    ],

};

async function list(table) {
    return db[table]; // esto inmediatamente devuelve una promesa.
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    db[collections].push.data;
}
async  function remove(table, id) {}

module.exports = {
    list,
    get,
    upsert,
    remove,
}