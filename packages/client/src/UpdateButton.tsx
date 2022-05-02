import React, { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { cityUrl } from './Home'

/* 
UpdateButton has an optional click handler.  If we add the button to the Wishlist or Visited pages, 
we're only going to want to Remove so we don't need to worry about pasing state back up. Will need to consider button
labelling at that point.
 */
export const UpdateButton = ({ city, page, selected, onClick = () => {} }) => {
  const [buttonText, setButtonText] = useState('')

  const request = { [page]: selected }

  // Use effect runs each time. If it's only set to run once, when the city changes the button names wouldn't necessarily be correct
  useEffect(() => {
    if (selected) setButtonText('Add')
    else setButtonText('Remove')
  })

  const updateButtonLabels = () => {
    if (selected) setButtonText('Remove')
    else setButtonText('Add')
  }

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
    onClick()
  }

  return (
    <Button onClick={handleButtonClick} colorScheme="blue">
      {buttonText}
    </Button>
  )
}
