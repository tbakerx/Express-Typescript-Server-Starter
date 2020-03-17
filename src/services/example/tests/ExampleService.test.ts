import request from 'request-promise'
import * as Service from '../ExampleService'

jest.mock('request-promise')

describe('ExampleService', () => {
  test('Get user with id 11', async () => {
    (request as any).mockImplementation(() =>
      Promise.resolve('{"name": "Mo Salah", "id": 11}')
    )
    const result = await Service.getTestUser(11)
    expect(result).toEqual({ name: 'Mo Salah', id: 11 })
  })
  test('an invalid json response', async () => {
    (request as any).mockImplementation(() => "Service Unavailable.")
    await expect(Service.getTestUser(1)).rejects.toThrow(SyntaxError)
  })
})