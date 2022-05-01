import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Container, Heading, ListItem, UnorderedList } from '@chakra-ui/react'

import { cityUrl } from './Home'

export const Visited: FC = () => {
  const [visited, setVisited] = useState()

  useEffect(() => {
    fetch(cityUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => setVisited(data))
      .catch(error => console.log('Error getting data from API', error))
  }, [])

  const addListItems = () => {
    const displayVisited = []

    if (visited !== undefined) {
      for (let i in visited.cities) {
        if (visited.cities[i].visited === true) {
          displayVisited.push(<ListItem>{visited.cities[i].name}</ListItem>)
        }
      }
    }

    return displayVisited
  }

  return (
    <>
      <Heading as="h1">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="row"></Container>
      <UnorderedList>{addListItems()}</UnorderedList>
    </>
  )
}
