import express from 'express'
import mongoose from 'mongoose'
import { PORT, HOSTNAME, BASE_URL } from './constants/connection.constants.js'
import { loginValidation, registerValidation } from './validations/auth.js'
import tokenVerify from './utils/token-verify.js'
import { login, register, profile } from './controllers/authentication-controller.js'

const app = express()

mongoose.set('strictQuery', false)
mongoose
  .connect(
    'mongodb+srv://admin:root@node-js-db-cluster.x6wfxph.mongodb.net/test_12devs_db?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Db ok')
  })
  .catch((err) => {
    console.error('Db error', err)
  })

app.use(express.json())

app.post(`${BASE_URL}/auth/login`, loginValidation, login)
app.post(`${BASE_URL}/auth/register`, registerValidation, register)
app.get(`${BASE_URL}/auth/profile`, tokenVerify, profile)

app.listen(PORT, HOSTNAME, (err) => {
  if (err) {
    return console.error('Server error :(')
  }
  console.log(`Server listening on http://${HOSTNAME}:${PORT}`)
})
