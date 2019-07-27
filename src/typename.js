import typeName from 'type-name'

export default function typename(value) {
  const name = typeName(value)
  if (name === 'number' && isNaN(value)) {
    return 'NaN'
  }
  return name
}