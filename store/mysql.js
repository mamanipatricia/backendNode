const mysql = require('mysql2'); // propio de npm

const config = require('../config');
const error = require('../utils/error');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// the connection
let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Conected ... ');
        }
    });

    connection.on('error', errorMySQL => {
        console.error('[db error]', errorMySQL);

        if (errorMySQL.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw error(errorMySQL.sqlMessage, 500);
        }

    });

}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${table}.id = ${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);

        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            // connection.query(`UPDATE ${table} SET ? WHERE id=?`, {...data}, (err, result) => {
            if (err) return reject(err);
            resolve(result);

        })
    })
}

function upsert(table, data) {
    if (data.id && data) {
        // return update(table, data);
    }
    return insert(table, data);
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

function query(table, query, join) { // QUERY(user_follow, {user_from: 8puc7...}, {user: user_to})
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0]; //user
        const val = join[key]; // user_to
        // joinQuery = `JOIN user ON user_follow.user_to = user.id`;
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query,
            (err, res) => {
                if (err) return reject(err);
                resolve(res[0] || null);
            })

    })
}
/*
    select *
   from user as u
   left join user_follow as f
   on u.id=f.user_from
   where u.id='8PUc7_0mb9GZy_6udeaV4'
*/

/*
   select *
   from user_follow
   join user on user_follow.user_to=user.id
   where user_follow.user_from='8PUc7_0mb9GZy_6udeaV4'
*/

module.exports = {
    list,
    get,
    upsert,
    query,
    insert,
}