import { randomBytes } from 'node:crypto'

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// Slug corto y aleatorio para links públicos (/f, /d, /c). Descarta bytes ≥ 248 para no sesgar el alfabeto.
export function randomSlug(length = 10): string {
  let out = ''
  while (out.length < length) {
    for (const byte of randomBytes(length * 2)) {
      if (byte < 248 && out.length < length) out += BASE62[byte % 62]
    }
  }
  return out
}
