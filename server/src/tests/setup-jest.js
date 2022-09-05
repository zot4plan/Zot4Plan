// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
//const iconv = require('../../node_modules/mysql2/node_modules/iconv-lite').encodingExists('foo');

afterEach((done) => {
    done();
})