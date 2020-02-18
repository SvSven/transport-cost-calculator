# Transport Cost Calculator

Functionality to calculate transport cost to a given address using [OpenRouteService](https://openrouteservice.org/).

This is a very case-specific solution meant to replace an old Google Maps feature on an ecommerce site. Because a significant enough number
of people still use Internet Explorer when visiting the site this was made for, several polyfills are included and the build is compiled
with Babel.

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
per kilometer. An optional multiplier parameter can be passed to multiply the calculated cost. Value passed to callback has 2 decimal
points (e.g. `5.47`).
