
function reverseMap(map) {
  return Object.entries(map).reduce((prev, i) => {
    prev[i[1]] = i[0]; /* eslint-disable-line prefer-destructuring */
    return prev;
  }, {});
}

module.exports = {
  reverseMap,
};
