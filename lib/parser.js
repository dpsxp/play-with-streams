const { Transform } = require('stream')

const parser = () => {
  let data = ''
  const delimiter = /\/rdf:RDF>\n/
  const EOF = '\n<'

  return new Transform({
    transform(chunk, enc, next) {
      let files = chunk.toString().split(delimiter)

      if (data.length > 0) {
        files = [data.concat(files[0]), ...files.slice(1)]
      }

      files.forEach((file) => {
        if (file.endsWith(EOF)) {
          const data = file.split('\n').slice(1).join('\n').concat('/rdf:RDF>\n')
          setImmediate(() => this.push(data))
        }
      })

      if (files[files.length - 1].endsWith(EOF)) {
        data = ''
      } else {
        data = files[files.length - 1]
      }

      next()
    }
  })
}

module.exports = parser
