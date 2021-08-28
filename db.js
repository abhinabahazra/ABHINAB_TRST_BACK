const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'magnox',
	host: '13.233.117.90',
	database: 'billionskills',
	password: 'DaTaBaSe#123',
	port: 5432,
});


module.exports = pool;