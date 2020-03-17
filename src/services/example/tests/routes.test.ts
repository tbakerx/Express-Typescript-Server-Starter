import express, { Router } from 'express'
import request from 'supertest'
import { applyMiddleware, applyRoutes } from '../../../utils'
import promiseRequest from 'request-promise'
import middleware from '../../../middleware'
import errorHandlers from '../../../middleware/errorHandlers'
import routes from "../../../services/example/routes"
const { API_VERSION = '/api/v1' } = process.env

jest.mock('request-promise');

(promiseRequest as any).mockImplementation(() => Promise.resolve('{"name": "Sadio Mane", "id": 10}'))

describe('routes', () => {
  let router: Router

  beforeEach(() => {
    router = express()
    applyMiddleware(middleware, router)
    applyRoutes(routes, router)
    applyMiddleware(errorHandlers, router)
  })

  test('A valid query', async () => {
    const response = await request(router).get(`${API_VERSION}/exampleuser?id=10`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ name: 'Sadio Mane', id: 10 })
  })

  test('A non-existing api method', async () => {
    const response = await request(router).get(`${API_VERSION}/fakeroute`)
    expect(response.status).toEqual(404)
  })

  test('An empty string', async () => {
    const response = await request(router).get(`${API_VERSION}/exampleuser?id=`)
    expect(response.status).toEqual(400)
  })
})