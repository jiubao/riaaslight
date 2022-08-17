import { IRetailer } from '../domain/retailer'

// export const Retailers = [
//   {
//     id: 1,
//     name: 'google',
//   },
//   {
//     id: 2,
//     name: 'microsoft',
//   },
//   {
//     id: 3,
//     name: 'superloooooooooooooooooooong',
//   },
//   {
//     id: 4,
//     name: 's',
//   },
//   {
//     id: 5,
//     name: 's',
//   },
//   {
//     id: 6,
//     name: 's',
//   },
//   {
//     id: 7,
//     name: 's',
//   },
//   {
//     id: 8,
//     name: 's',
//   },
//   {
//     id: 9,
//     name: 's',
//   },
//   {
//     id: 10,
//     name: 's',
//   },
//   {
//     id: 11,
//     name: 's',
//   },
// ] as unknown as IRetailer[]

const _retailers = [
  'google',
  'microsoft',
  'apple',
  'facebook',
  'tesla',
  'superloooooooooooooooooong',
  'ali',
  'a',
  'b',
  'c',
  'c',
  'c',
  'c',
  'c',
  'c',
]

export const Retailers = _retailers.map((name, id) => ({
  id,
  name,
  picture:
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
})) as unknown as IRetailer[]

export const Brands = Retailers
