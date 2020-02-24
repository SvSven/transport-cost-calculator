# Transport Cost Calculator

Functionality to calculate transport cost to a given address using [OpenRouteService](https://openrouteservice.org/).

This is a very case-specific solution meant to replace an old Google Maps feature on an ecommerce site. Because a significant enough number
of people still use Internet Explorer when visiting the site this was made for, several polyfills are included and the build is compiled
with Babel.

The geocode lookup is currently limited to searching for locations in the Netherlands and Belgium for more accurate results.
This restriction can be changed or removed by either removing or adjusting the `country` url parameter in the `geocodeUrl` variable.

See the [external documentation](https://github.com/pelias/documentation/blob/master/search.md#narrow-your-search) on how to narrow geocode searches.

### Usage

```js
TransportCostCalculator({
  key: API_KEY,
  origin: {
    lng: 4.891988,
    lat: 52.373138
  },
  destination: 'Stationsplein 1, 3013 AJ, Rotterdam',
  pricePerKm: 0.45,
  multiplier: 2 // optional
}, callback)
```

Uses the [reverse geocode API](https://openrouteservice.org/dev/#/api-docs/geocode) to get the coordinates for a given address string,
then uses the [distance API](https://openrouteservice.org/dev/#/api-docs/directions) to calculate the distance between the provided
origin point and destination. The transport cost is then calculated by multiplying the distance in kilometers with the provided price
per kilometer. An optional multiplier parameter can be passed to multiply the calculated cost.

Return value passed to callback:
```js
  {
    distance: 12.16,
    cost: 5.47
  }
```
Distance in kilometers, rounded to 2 decimal points.
