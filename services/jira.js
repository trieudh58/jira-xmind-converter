const rq = require('request-promise')
const url = require('url');

const config = require('../config.json')

module.exports = {

  findSprint: async (sprint) => {
    const DEFAULT_MAX_RESULTS = 1000
    const jqlString = `sprint="${sprint}"`
    const options = {
      method: 'GET',
      json: true,
      uri: makeApiUri('/search'),
      qs: {
        jql: jqlString,
        maxResults: DEFAULT_MAX_RESULTS,
      },
    }
    return makeRequest(options)
  }
} 

function makeApiUri(path) {
  const basePath = 'rest/api/'
  const uri = url.format({
    protocol: config.protocol,
    hostname: config.host,
    port: config.port,
    pathname: basePath + config.apiVersion + path,
  });
  return decodeURIComponent(uri)
}

function makeRequest(options) {
  const auth = {
    user: config.user,
    pass: config.pass,
  }
  Object.assign(options, { auth })
  return rq(options)
}
