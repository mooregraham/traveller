import React, { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { cityUrl } from './Home'

export const UpdateButton = ({ city, page, selected }) => {
  const [buttonText, setButtonText] = useState('')

  const request = { [page]: selected }

  const updateButtonLabels = () => {
    if (buttonText === 'Remove') setButtonText('Add')
    else setButtonText('Remove')
  }

  useEffect(() => {
    updateButtonLabels()
  }, [])

  const handleButtonClick = () => {
    fetch(cityUrl + city, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then(response => response.json())
      .catch(error => console.log('Error putting data to API: Visited', error))

    updateButtonLabels()
  }

  return (
    <Button onClick={handleButtonClick} colorScheme="blue">
      {buttonText}
    </Button>
  )
}
