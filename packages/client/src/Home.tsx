import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

export const Home: FC = () => {
  const [cities, setCities] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const cityUrl = 'http://localhost:4000/rest/cities/'
  let timer

  // Get the data from the API when the component first mounts
  useEffect(() => {
    fetch(cityUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const availableCities = []
        for (let id in data.cities) {
          availableCities.push(data.cities[id].name)
        }
        setCities(availableCities)
      })
      .catch(error => console.log('Error getting data from API', error))
  }, [])

  const formatSearchInput = input => {
    const trimmed = input.trim()
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
  }

  const updateSearch = searchInput => {
    // Debounce the input so we're not updating state until user finishes typing
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      const formattedInput = formatSearchInput(searchInput)
      setSearchInput(formattedInput)
    }, 1000)
  }

  const conductSearch = () => {
    const cityId = cities.indexOf(searchInput)

    fetch(cityUrl + cityId, { method: 'GET' })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('Error getting data from API', error))
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input placeholder="City" onChange={e => updateSearch(e.target.value)} />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} onClick={conductSearch} />} />
        </InputGroup>
      </Container>
    </VStack>
  )
}
