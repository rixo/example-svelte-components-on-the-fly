import express from 'express'
import cors from 'cors'

export const serve = ({ buildComponent }) => {
  const listen = (port, host = 'localhost') => {
    express()
      // you might want to securize CORS...
      .use(cors())
      .get('/components/:name', (req, res) => {
        const name = req.params.name
        buildComponent(name)
          .then(filename => {
            res.sendFile(filename)
          })
          .catch(err => {
            console.error('Failed to build component ' + name, err)
            res.status(500).send({})
          })
      })
      .listen(port, host, err => {
        if (err) {
          console.log('Failed to start server', err)
        } else {
          console.log('Listening on http://%s:%s', host, port)
        }
      })
  }

  return { listen }
}
