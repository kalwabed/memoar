import slugify from '@sindresorhus/slugify'
import { uid } from 'uid'

export function generateSlug(str: string) {
  const slug = slugify(str)
  const withUid = slug + '-' + uid(5)

  return withUid
}
