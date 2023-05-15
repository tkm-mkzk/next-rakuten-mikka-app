'use client'

import { useState } from 'react'
import { HotelInfo, HotelSearchResult } from '@/types/hotelSearch.type'

const HotelSearch = () => {
  const [query, setQuery] = useState('')
  const [hotels, setHotels] = useState<
    {
      hotel: [HotelInfo]
    }[]
  >([])

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${query}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_ID}`
      )
      const data = await response.json()
      return data.hotels
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // prevent page reload
    try {
      const hotelsData = await handleSearch()
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
