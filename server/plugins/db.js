const oracle = require('./oracle-db-plugin');
// https://github.com/agendor/sample-hapi-rest-api/blob/master/src/middleware/db.js
// https://oracle.github.io/node-oracledb/INSTALL.html#quickstart
// https://www.npmjs.com/package/oracledb
// https://github.com/tejzpr/hapi-plugin-oracledb
// https://github.com/oracle/oracle-db-examples/tree/master/javascript/rest-api
// https://github.com/DEFRA/hapi-api-boilerplate
// https://www.oratable.com/sqlplus-instant-client-installation/

//https://stackoverflow.com/questions/35293117/npm-install-that-requires-node-gyp-fails-on-windows/42713948

module.exports = {
    plugin: {
      name: 'oracle-db-config',
      register: (server, options) => {
        oracle.register(server,  {
            connectString: "localhost:1521/servicename",
            user: "root",
            password: ""
        })
      }
    }
  }