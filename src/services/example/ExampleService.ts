import request from 'request-promise'

// Below is a call to a placeholder site for testing requests for data
export const getTestUser = async (query: number) => {
  const url = `https://jsonplaceholder.typicode.com/users?id=${query}`
  const response = await request(url)
  return JSON.parse(response)
}