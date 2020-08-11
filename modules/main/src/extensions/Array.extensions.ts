Array.prototype.remove = function(item) {
  const index = this.indexOf(item)
  if (index === -1) return false

  this.splice(index, 1)
  return true
}