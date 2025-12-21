import { scryptAsync } from '@noble/hashes/scrypt.js'
import { hexToBytes } from '@noble/hashes/utils.js'
import { hex } from '@/utils/hex'

/**
 * Compare two buffers in constant time.
 */
function constantTimeEqual(
  a: ArrayBuffer | Uint8Array | string,
  b: ArrayBuffer | Uint8Array | string,
): boolean {
  if (typeof a === 'string') {
    a = new TextEncoder().encode(a)
  }
  if (typeof b === 'string') {
    b = new TextEncoder().encode(b)
  }
  const aBuffer = new Uint8Array(a)
  const bBuffer = new Uint8Array(b)
  let c = aBuffer.length ^ bBuffer.length
  const length = Math.max(aBuffer.length, bBuffer.length)
  for (let i = 0; i < length; i++) {
    c |=
      (i < aBuffer.length ? aBuffer[i] : 0) ^
      (i < bBuffer.length ? bBuffer[i] : 0)
  }
  return c === 0
}

const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
}

async function generateKey(password: string, salt: string) {
  return await scryptAsync(password.normalize('NFKC'), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2,
  })
}

export const hashPassword = async (password: string) => {
  const salt = hex.encode(crypto.getRandomValues(new Uint8Array(16)))
  const key = await generateKey(password, salt)
  return `${salt}:${hex.encode(key)}`
}

export const verifyPassword = async ({
  hash,
  password,
}: {
  hash: string
  password: string
}) => {
  const [salt, key] = hash.split(':')
  if (!salt || !key) {
    throw new Error('Invalid password hash')
  }
  const targetKey = await generateKey(password, salt)
  return constantTimeEqual(targetKey, hexToBytes(key))
}
