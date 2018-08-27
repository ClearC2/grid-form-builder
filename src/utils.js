export const timeStamp = () => {
  let ms = new Date().getTime()
  ms = String(ms).slice(-7)
  return +ms
}
