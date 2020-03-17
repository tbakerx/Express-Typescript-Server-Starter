import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { applyMiddleware, applyRoutes } from './utils'
import middleware from './middleware'
import errorHandlers from './middleware/errorHandlers'
import routes from './services'

// Handling uncaught and unhandled exceptions 
process.on('uncaughtException', e => {
  console.log(e)
  process.exit(1)
})

process.on('unhandledRejection', e => {
  console.log(e)
  process.exit(1)
})

const router = express()
applyMiddleware(middleware, router)
applyRoutes(routes, router)
//Must apply error middleware after routes and other middleware
applyMiddleware(errorHandlers, router)

const { PORT = 3000 } = process.env
const server = http.createServer(router)

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`)
})