# Products Grid

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.

## Features

- [x] products are displayed in a grid.
- [x] give the user an option to sort the products in ascending order. Can sort by "size". The products list should be reloaded when a new sorting option is chosen.
- each product has :
  - [x] a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic impression of what they're buying.
  - [x] a "price" field, in cents. This should be formatted as dollars like `$3.51`.
  - [x] a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
- [x] the product grid should automatically load more items as you scroll down.
- [x] display an animated "loading..." message while the user waits for the data to load.
- [ ] to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time. But they still should not be displayed until the user has scrolled to the bottom of the product grid.
- [x] when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

### Ads features

- after every 20 products we need to insert an advertisement from one of our sponsors. Use the same markup as the advertisement in the header shown in `public/index/html`, but make sure the `?r` query param is randomly generated each time an ad is displayed.
- Ads should be randomly selected, but a user must never see the same ad twice in a row.

## Products API

- The basic query looks like this: `/api/products`
- The response format is JSON.
- To paginate results use the `_page` parameter, eg: `/api/products?_page=10&_limit=15` (returns 15 results starting from the 10th page).
- To sort results use the `_sort` parameter, eg: `/api/products?_sort=price`. Valid sort values are `price`, `size` and `id`.

## Instructions

### How do I start the app?

It uses `webpack` to serve react files and `json-server` as the backend server. To start the app,

- first, make sure you have all the packages installed by running `npm i` to install all the dependencies

- run this command `npm run both` to run both the `webpack server` and the `json-server` and it will start the app in the browser automatically on port `9000`.

### Feature I left out

- sort by price or ID
  - I would approach this by storing an option into two variables one as the original and the other as the temporary variable, If I want to append the new data to the data in the state or overwrite the data, I would check first if the option chosen is the same as the in the temp variable, if it is, then I would append otherwise I would overwrite with the new data.
- Ads Features
  - The way I would approach it, I would find watch for the products data array length if it is divisible by 20 I would show the ads otherwise they would be hidden.
