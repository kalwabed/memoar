export function uniqueUsername(fullname: string) {
  return fullname.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 10000)
}
