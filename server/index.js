const hapi = require('hapi')
const config = require('./config')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  
  // Register the plugins
  // https://github.com/tejzpr/hapi-plugin-oracledb/blob/master/lib/index.js
  // https://github.com/agendor/sample-hapi-rest-api/blob/master/src/middleware/db.js
  await server.register(require('./plugins/db'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  

  if (config.isDev) {
    await server.register(require('blipp'))
    await server.register(require('./plugins/logging'))
  }

  return server
}

module.exports = createServer
