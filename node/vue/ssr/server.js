import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

// Runtime env vars
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value'
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value'

console.log('=== Runtime Variables ===')
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR)
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR)

async function createServer() {
  const app = express()

  app.use(compression())

  // API endpoint for runtime env vars
  app.get('/api/env', (req, res) => {
    res.json({
      runtimePrivateVar: RUNTIME_PRIVATE_VAR,
      runtimePublicVar: RUNTIME_PUBLIC_VAR,
    })
  })

  let vite
  let template
  let render

  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

    template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
    render = (await import('./dist/server/entry-server.js')).render
  } else {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  }

  app.use('/{*splat}', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let html

      if (isProduction) {
        const rendered = await render(url)
        html = template.replace('<!--ssr-outlet-->', rendered.html)
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
        const rendered = await render(url)
        html = template.replace('<!--ssr-outlet-->', rendered.html)
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

createServer()
