export const fetch = jest.fn(id => ({ id: `${id}`, name: `place${id}` }))
export const search = jest.fn()
