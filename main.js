const bz2 = require('unbzip2-stream');
const download = require('./lib/download');
const parser = require('./lib/parser');
const saveBook = require('./lib/save-book');

download()
  .pipe(bz2())
  .pipe(parser())
  .pipe(saveBook())
  .on('end', () => console.log('finished'));
