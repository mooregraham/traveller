import React from 'react'
import type { FC } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { UpdateButton } from './UpdateButton'

export const CityTable: FC = ({ city }) => {
  const cityData = { city }

  if (cityData.city.name === undefined) return null

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
              <UpdateButton city={cityData.city.id} page="visited" selected={!cityData.city.visited} />
            </Td>
            <Td>
              <UpdateButton city={cityData.city.id} page="wishlist" selected={!cityData.city.wishlist} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
