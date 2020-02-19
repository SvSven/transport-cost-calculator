import regeneratorRuntime from 'regenerator-runtime'
import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'

window.TransportCostCalculator = async function TransportCostCalculator(
  options,
  callback,
) {
  const { key, origin, destination, pricePerKm, multiplier } = options
  const API = 'https://api.openrouteservice.org'

  const get = async (url) => {
    let response = await window.fetch(url, { method: 'GET', mode: 'cors' })
    return await response.json()
  }

  const geocode = async (destination) => {
    const geocodeUrl = `${API}/geocode/search?size=1&boundary.country=NL,BE&api_key=${key}&text=${destination}`
    const geocode = await get(geocodeUrl)

    if (!geocode.features || geocode.features.length === 0) return false

    const { coordinates } = geocode.features[0].geometry
    return coordinates
  }

  const calculateDistance = async (destination) => {
    const coordinates = await geocode(destination)

    const start = `${origin.lng},${origin.lat}`
    const end = `${coordinates[0]},${coordinates[1]}`

    const distanceUrl = `${API}/v2/directions/driving-car?api_key=${key}&start=${start}&end=${end}`
    const distance = await get(distanceUrl)

    if (!distance.features || distance.features.length === 0) return false

    return distance.features[0].properties.summary.distance
  }

  const getCost = (distance, multiplier = 1) => {
    let price = distance * pricePerKm * multiplier
    return parseFloat(Math.round(price * 100) / 100).toFixed(2)
  }

  const distance = await calculateDistance(destination)
  const parsedDistance = parseFloat(distance / 1000).toFixed(2)

  const cost = await getCost(parsedDistance, multiplier)

  callback({ distance: parsedDistance, cost: cost })
}
