
const debug = require('debug')('signalk-resources')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
//const Routes = require('./routes')
const {apiRoutePrefix} = require('./constants')

module.exports = function(app) {
  let routeProviders = []
  let pluginStarted = false
  const configBasePath = app.config.configPath
  const defaultRoutesPath = path.join(configBasePath, "/routes")
  ensureDirectoryExists(defaultRoutesPath)

  function start(props) {
    const routesPath = props.routesPath ? path.resolve(configBasePath, props.routesPath) : defaultRoutesPath
    debug(`Start plugin, routes path: ${routesPath}`)
    const loadProviders = Routes.findRoutes(routesPath)
    return loadProviders.then(routes => {
      console.log(`Route plugin: Found ${_.keys(routes).length} routes from ${routesPath}`)
      routeProviders = routes
      // Do not register routes if plugin has been started once already
      pluginStarted === false && registerRoutes()
      pluginStarted = true
    }).catch(e => {
      console.error(`Error loading route providers`, e.message)
      routeProviders = {}
    })
  }

  function stop() {
    debug("Route plugin stopped")
  }

  function registerRoutes() {

    app.get(apiRoutePrefix + "/routes", (req, res) => {
      const sanitized = _.mapValues(routeProviders, sanitizeProvider)
      res.json(sanitized)
    })
  }

  return {
    id: 'routes',
    name: 'Signal K Routes',
    description: 'Singal K Routes resource',
    schema: {
      title: 'Signal K Routes',
      type: 'object',
      properties: {
        routesPath: {
          type: 'string',
          title: "Routes path",
          description: `Path for route files, relative to "${configBasePath}". Defaults to "${defaultRoutesPath}".`
        }
      }
    },
    start,
    stop
  }
}


const responseHttpOptions = {
  headers: {
    'Cache-Control': 'public, max-age=7776000' // 90 days
  }
}

function sanitizeProvider(provider) {
  return _.omit(provider, ['_filePath', '_fileFormat', '_mbtilesHandle', '_flipY'])
}

function ensureDirectoryExists (path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}
