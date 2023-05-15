export const getHotels = async (query: string) => {
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
