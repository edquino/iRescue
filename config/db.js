const { Pool } = require('pg');

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password: 'PDDHbase2021$',
    database: 'iRescue',
    port: '5432'
});

module.exports = pool;