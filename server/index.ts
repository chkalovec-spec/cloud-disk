import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

const PORT = config.get<number>('serverPort') || 5000
const app = express()

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
