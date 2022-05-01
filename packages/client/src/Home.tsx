import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { CityTable } from './CityTable'

export const cityUrl = 'http://localhost:4000/rest/cities/'

export const Home: FC = () => {
  const [cities, setCities] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [city, setCity] = useState({})
  let timerId

  // Get the data from the API when the component first mounts
  useEffect(() => {
    fetch(cityUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const availableCities = []
        for (let i in data.cities) {
          availableCities.push(data.cities[i].name)
        }
        setCities(availableCities)
      })
      .catch(error => console.log('Error getting data from API', error))
  }, [])

  const formatSearchInput = input => {
    // API format is first letter of each word capiatlised, remainder lower case
    // Massage the user input so that it matches
    const cityName = input
      .trim()
      .split(' ')
      .map(city => {
        return city[0].toUpperCase() + city.substring(1).toLowerCase()
      })
      .join(' ')

    return cityName
  }

  const updateSearch = searchInput => {
    // Debounce the input so we're not updating state until user finishes typing
    if (timerId) clearTimeout(timerId)

    timerId = setTimeout(() => {
      const formattedInput = formatSearchInput(searchInput)
      setSearchInput(formattedInput)
    }, 1000)
  }

  const conductSearch = () => {
    const cityId = cities.indexOf(searchInput)

    fetch(cityUrl + cityId, { method: 'GET' })
      .then(response => response.json())
      .then(data => setCity(data))
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
        <CityTable city={city} />
      </Container>
    </VStack>
  )
}
