function pairSelector (state) {
  var partition = Math.floor(state.length / 3)

  return {
    groups: [
      state.slice(0, partition),
      state.slice(partition, partition * 2),
      state.slice(partition * 2)
    ]
  }
}

export default pairSelector
