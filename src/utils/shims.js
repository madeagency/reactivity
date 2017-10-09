export const raf = (global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
})
