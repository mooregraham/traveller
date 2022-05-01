import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Container, Heading, ListItem, UnorderedList } from '@chakra-ui/react'

import { cityUrl } from './Home'

export const Visited: FC = () => {
  const [cities, setCities] = useState()

  useEffect(() => {
    fetch(cityUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log('Error getting data from API', error))
  }, [])

  const addListItems = () => {
    const displayVisited = []

    // Check that the promise has resolved first
    if (cities !== undefined) {
      for (let i in cities.cities) {
        if (cities.cities[i].visited === true) {
          displayVisited.push(<ListItem>{cities.cities[i].name}</ListItem>)
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
