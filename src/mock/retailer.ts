interface IRetailer {
  id: string
  name: string
  picture?: string
}

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

export const MOCK_RETAILERS = JSON.parse(
  `[{"id": 8, "retailer_name": "Albertsons Safeway", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 17, "retailer_name": "BJs Wholesale Club", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 24, "retailer_name": "Publix", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 30, "retailer_name": "HEB", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 33, "retailer_name": "Walmart", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 65, "retailer_name": "Dollar General", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 112, "retailer_name": "Ahold Delhaize", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 116, "retailer_name": "Kroger", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 126, "retailer_name": "Meijer", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 132, "retailer_name": "Walgreens", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 133, "retailer_name": "Family Dollar", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 137, "retailer_name": "Amazon", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 145, "retailer_name": "Target", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 153, "retailer_name": "Wakefern", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 155, "retailer_name": "CVS", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}, {"id": 156, "retailer_name": "Sams", "retailer_status": 0, "owner_name": null, "retailer_icon": null, "retailer_color": null}]`
) as IRetailer[]
