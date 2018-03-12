const Vue = require('vue')
const express = require('express')
const path = require('path')
const LRU = require('lru-cache')
const app = express()
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./src/view/server.html')

readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )

//app.use(favicon('./public/logo-48.png'))
app.use('/dist', express.static(resolve('./dist', true)))
app.use('/public', express.static(resolve('./public', true)))
app.use('/manifest.json', express.static(resolve('./manifest.json', true)))
app.use('/service-worker.js', express.static(resolve('./dist/service-worker.js')))


function render (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    console.log(`whole request: ${Date.now() - s}ms`)
  })
}

app.get('*', (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
