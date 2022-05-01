import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Checkbox } from '@chakra-ui/react'
import { cityUrl } from './Home'

export const CityTable: FC = ({ city }) => {
  const cityData = { city }

  if (cityData.city.name === undefined) return null

  const [currentCity, setCurrentCity] = useState('')
  const [visited, setVisited] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  if (currentCity !== cityData.city.name) setCurrentCity(cityData.city.name)

  useEffect(() => {
    setVisited(cityData.city.visited)
    setWishlist(cityData.city.wishlist)
  }, [currentCity])

  useEffect(() => {
    fetch(cityUrl + cityData.city.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visited }),
    })
      .then(response => response.json())
      .catch(error => console.log('Error putting data to API: Visited', error))
  }, [visited])

  useEffect(() => {
    fetch(cityUrl + cityData.city.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wishlist }),
    })
      .then(response => response.json())
      .catch(error => console.log('Error putting data to API: Wishlist', error))
  }, [wishlist])

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>City</Th>
            <Th>Country</Th>
            <Th>Visited</Th>
            <Th>Wishlist</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{cityData.city.name}</Td>
            <Td>{cityData.city.country}</Td>
            <Td>
              <Checkbox onChange={e => setVisited(e.target.checked)} isChecked={visited} />
            </Td>
            <Td>
              <Checkbox onChange={e => setWishlist(e.target.checked)} isChecked={wishlist} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
