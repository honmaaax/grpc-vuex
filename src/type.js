const Type = {
  isArray (item) {
    return Object.prototype.toString.call(item) === '[object Array]'
  },
  isObject (item) {
    return typeof item === 'object' && item !== null && !Type.isArray(item)
  },
}
export default Type
