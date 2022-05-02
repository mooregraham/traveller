import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text } from '@chakra-ui/react'
import { UpdateButton } from './UpdateButton'

export const CityTable: FC = ({ city }) => {
  const cityData = { city }

  if (cityData.city.name === undefined) {
    return <Text>Try searching for a new city!</Text>
  }

  const [cityName, setCityName] = useState(cityData.city.name)
  const [visited, setVisited] = useState(!cityData.city.visited)
  const [wishlist, setWishlist] = useState(!cityData.city.wishlist)

  // If the city changes, update the cityName state so that useEffect fires
  if (cityData.city.name !== cityName) {
    setCityName(cityData.city.name)
  }

  // If the city has changed, make sure we're using the correct versions of visited and wishlist
  useEffect(() => {
    setVisited(!cityData.city.visited)
    setWishlist(!cityData.city.wishlist)
  }, [cityName])

  // Callbacks toggle the current state so that we send the opposite state next time.
  // Needs to be here so that when the city changes we're always looking at the current visited/wishlist state.
  const handleVisitedClicked = () => {
    setVisited(!visited)
  }

  const handleWishlistClicked = () => {
    setWishlist(!wishlist)
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="25%">City</Th>
            <Th width="25%">Country</Th>
            <Th width="25%">Visited</Th>
            <Th width="25%">Wishlist</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{cityData.city.name}</Td>
            <Td>{cityData.city.country}</Td>
            <Td>
              <UpdateButton city={cityData.city.id} page="visited" selected={visited} onClick={handleVisitedClicked} />
            </Td>
            <Td>
              <UpdateButton
                city={cityData.city.id}
                page="wishlist"
                selected={wishlist}
                onClick={handleWishlistClicked}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
