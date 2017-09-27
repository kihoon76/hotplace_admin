var config = module.exports = {};

config.db = {
	user: 'sa',
	password: 'qkrtjdls0209@',
	server:'192.168.0.2',
	pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};