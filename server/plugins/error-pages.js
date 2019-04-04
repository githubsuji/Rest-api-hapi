/*
* Add an `onPreResponse` listener to return error pages
*/

module.exports = {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        
        if (request.path === '/favicon.ico') {
         
          const ctx = {
              message: (response.output.statusCode === 404 ? 'No favicon Found' : 'something went wrong')
          };
         
          return   h.response(ctx).code(response.output.statusCode);;
        }
        if (response.isBoom) {
          // An error was raised during
          // processing the request
          const statusCode = response.output.statusCode
          if (statusCode === 404) {
            const ctx = {
              message: (response.output.statusCode === 404 ? 'No Resource Found' : 'something went wrong')
          };
            return  h.response(ctx).code(response.output.statusCode);;
          }

          request.log('error', {
            statusCode: statusCode,
            data: response.data,
            message: response.message
          })

          
            const ctx = {
              message: 'Internal Server Error' 
          };
          // The return the `500` view
          return  h.response(ctx).code(500);
        }
        return h.continue
      })
    }
  }
}
