const db = {
    'user' : [
        {'id': 1, name: 'Patricia'},
    ],

}

function list(table) {
    return db[table];
}

function get(table, id) {
    let col = list(table);
    return col.filter(item => item.id === id)[0] || null;
}

function upsert(table, data) {
    db[collections].push.data;
}
function remove(table, id) {}

module.exports = {
    list,
    get,
    upsert,
    remove,
}