const parser = require('./lib/parser');
const bz2 = require('unbzip2-stream');
const download = require('./lib/download');

download()
  // .pipe(bz2())
  // .pipe(parser())
  // .on('end', () => console.log('finished'));
