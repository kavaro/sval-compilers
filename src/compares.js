export default {
  string: {
    string: (a, b) => a.localeCompare(b)
  },
  number: {
    number: (a, b) => a - b,
    boolean: (a, b) => a - (b ? 1 : 0),
    Range: (a, b) => -1 * b.compare(a)
  },
  boolean: {
    boolean: (a, b) => (a ? 1 : 0) - (b ? 1 : 0),
    number: (a, b) => (a ? 1 : 0) - b
  },
  Range: {
    Range: (a, b) => a.compare(b),
    number: (a, b) => a.compare(b)
  },
  LatLng: {
    LatLng: (a, b) => a.compare(b)
  }
}