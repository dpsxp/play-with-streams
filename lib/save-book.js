const { Transform } = require('stream')
const cheerio = require('cheerio');

function saveBook() {
  return new Transform({
    transform(chunk, enc, next) {
      const $ = cheerio.load(chunk.toString())
      const title = $('dcterms\\:title').text()
      const author = $('dcterms\\:creator pgterms\\:name').text()
      const subjects = $('dcterms\\:subject').map((_idx, el) => {
        return $(el).find('rdf\\:value').text()
      }).get()

      const book = {
        title,
        author,
        subjects
      };

      this.push(JSON.stringify(book) + '\n')
      next()
    }
  })
}

module.exports = saveBook;
