import { Request, Response } from 'express'
import { getTestUserById } from './ExampleController'
import { checkForId } from '../../middleware/checks'
const { API_VERSION = '/api/v1' } = process.env

export default [
  {
    path: `${API_VERSION}/`,
    method: 'get',
    handler: async (req: Request, res: Response) => {
      res.send('Hello World, example route 1')
    }
  },
  {
    path: `${API_VERSION}/exampleuser`,
    method: 'get',
    handler: [
      checkForId,
      async ({ query }: Request, res: Response) => {
        const result = await getTestUserById(query.id)
        res.status(200).send(result)
      }
    ]
  }
]