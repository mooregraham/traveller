// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

/*

I've never written tests or used Jest before, so haven't written any tests I'm afraid.

However, as a rough idea I'd be looking to test:

User Input:
- Handles empty string
- Handles invalid entry
- Handles correct entry

Table of data
- Has a button to add to visited/wishlist
- Has a button to remove from visited/wishlist
- Doesn't display if invalid/no data received

API:
- Handles 404
- Handles bad data received (good response but bad data?)

WishList & Visited
- Handles all 500 items

*/
