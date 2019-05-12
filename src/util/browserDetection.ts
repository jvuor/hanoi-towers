function isSafari () {
  return /iPad|iPhone/.test(navigator.userAgent);
}

export {isSafari}
