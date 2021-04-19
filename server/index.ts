import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRouter from './routes/auth.routes'

const PORT = config.get<number>('serverPort') || 5000
const app = express()

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
  await mongoose.connect(config.get('dbURL'))
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
  })
  try {
  } catch (error) {
    console.log(error)
  }
}

start()
