import request from 'request-promise'
import * as Controller from '../ExampleController'

jest.mock('request-promise')

describe('ExampleController', () => {
  test('Test example controller', async () => {
    (request as any).mockImplementation(() =>
      Promise.resolve('{"name": "Mo Salah", "id": 11}')
    )
    const result = await Controller.getTestUserById(11)
    expect(result).toEqual({ name: 'Mo Salah', id: 11 })
  })
})