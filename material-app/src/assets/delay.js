module.exports = (req, res, next) => {
    setTimeout(() => next(), 1500); // 1500ms delay (1.5 seconds)
  }
  