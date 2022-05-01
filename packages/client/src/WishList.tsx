import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Container, Heading, ListItem, UnorderedList } from '@chakra-ui/react'

import { cityUrl } from './Home'

export const WishList: FC = () => {
  const [wishlist, setWishlist] = useState()

  useEffect(() => {
    fetch(cityUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => setWishlist(data))
      .catch(error => console.log('Error getting data from API', error))
  }, [])

  const addListItems = () => {
    const displayWishlist = []

    if (wishlist !== undefined) {
      for (let i in wishlist.cities) {
        if (wishlist.cities[i].wishlist === true) {
          displayWishlist.push(<ListItem>{wishlist.cities[i].name}</ListItem>)
        }
      }
    }

    return displayWishlist
  }

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row"></Container>
      <UnorderedList>{addListItems()}</UnorderedList>
    </>
  )
}
