const http = require('http');
const fs = require('fs');
const bz2 = require('unbzip2-stream');
const { Transform } = require('stream');
const parser = require('./parser');
const saveBook = require('./save-book');

function download() {
  const request = http.request({
    host: 'www.gutenberg.org',
    path: '/cache/epub/feeds/rdf-files.tar.bz2'
  })

  request
    .on('response', (res) => {
      res
        .pipe(bz2())
        .pipe(parser())
        .pipe(saveBook())
        .on('end', () => console.log('finished'));
    })
    .end()
}

module.exports = download
