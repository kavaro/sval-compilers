import typename from './typename'

export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat
    this.lng = lng
  }

  compare(other) {
    const type = typename(other)
    if (type === 'LatLng') {
      return this.lat - other.lat || this.lng - other.lng
    }
    throw new Error(`Cannot compare LatLng with ${type}`)
  }
}
