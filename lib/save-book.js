const { Transform } = require('stream')

function saveBook() {
  return new Transform({
    transform(chunk, enc, next) {
      // TODO: extract book information and save in any database
      next()
    }
  })
}

module.exports = saveBook;
