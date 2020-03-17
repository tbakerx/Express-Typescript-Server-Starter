import { getTestUser } from './ExampleService'

export const getTestUserById = async (id: number) => {
  return await getTestUser(id)
}