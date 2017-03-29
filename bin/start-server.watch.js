const path = require('path')
const fs = require('fs')

const nodemon = require('nodemon')

// https://github.com/JacksonGariety/gulp-nodemon/issues/77
function dieGracefullyWhenKilled() {
  process.once('SIGINT', () => {
    nodemon.once('exit', () => {
      process.exit()
    })
  })
}

function watchServer() {
  nodemon({
    script: './bin/start-server.dev.js',
    watch: [
      path.resolve(__dirname, '..', 'dist/server.js')
    ]
  })
  nodemon.on('restart', files => console.log(`
    ${files} has changed, server restarting...
  `))
  dieGracefullyWhenKilled()
}

function waitUntilReady() {
  if (fs.existsSync(path.resolve(__dirname, '..', 'dist/webpack-chunks.json'))) {
    console.log('Starting server...')
    watchServer()
  } else {
    setTimeout(waitUntilReady, 1000)
  }
}

console.log('Waiting for "webpack-chunks.json" to become available...')
waitUntilReady()
