const http = require('http');
const { Readable } = require('stream');
const parser = require('./parser');
const saveBook = require('./save-book');

function download() {
  let request;
  return new Readable({
    read(size) {
      if (request) {
        return
      }

      request = http.request({
        host: 'www.gutenberg.org',
        path: '/cache/epub/feeds/rdf-files.tar.bz2'
      })

      request
        .on('response', (res) => {
          res
            .on('data', (data) => {
              if (!this.isPaused()) {
                this.push(data)
              }
            })
        })
        .on('error', (err) => this.emit('error', err))
        .once('close', () => this.push(null))
        .end()
    }
  })
}

module.exports = download
