import express from 'express'
import path from 'path'

const app = express()

const __dirname = path.resolve()

const PORT = 3000
const HOSTNAME = 'localhost'

app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(express.static('public'))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started on http://${HOSTNAME}:${PORT}`)
})
