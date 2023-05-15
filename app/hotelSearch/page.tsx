'use client'

import { useState } from 'react'
import { HotelInfo, HotelSearchResult } from '@/types/hotelSearch.type'
import { getHotels } from '@/components/api/getHotels'

const HotelSearch = () => {
  const [query, setQuery] = useState('')
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const hotelsData = await getHotels(query)
      setHotels(hotelsData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form>
        <input placeholder="text" type="text" value={query} onChange={(x) => setQuery(x.target.value)} />
        <button onClick={handleButtonClick}>Search</button>
      </form>
      {hotels.length > 0 ? (
        hotels.map((value) => {
          return (
            <div key={value.hotel[0].hotelBasicInfo.hotelNo}>
              {value.hotel[0].hotelBasicInfo.hotelName}
              {value.hotel[0].hotelBasicInfo.hotelInformationUrl}
              {value.hotel[0].hotelBasicInfo.hotelMinCharge}
            </div>
          )
        })
      ) : (
        <div>No results</div>
      )}
    </>
  )
}

export default HotelSearch
