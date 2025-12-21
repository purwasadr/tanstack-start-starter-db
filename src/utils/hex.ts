/**
 * Typed array
 */
export type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

/**
 * Hexadecimal string
 */
const hexadecimal = '0123456789abcdef'

/**
 * Hexadecimal utilities
 */
export const hex = {
  /**
   * Encode data to hexadecimal string
   * @param data - The data to encode
   * @returns The hexadecimal string
   */
  encode: (data: string | ArrayBuffer | TypedArray) => {
    if (typeof data === 'string') {
      data = new TextEncoder().encode(data)
    }
    if (data.byteLength === 0) {
      return ''
    }

    // @ts-ignore
    const buffer = new Uint8Array(data)
    let result = ''
    for (const byte of buffer) {
      result += byte.toString(16).padStart(2, '0')
    }
    return result
  },

  /**
   * Decode hexadecimal string
   * @param data - The hexadecimal string
   * @returns The decoded string
   */
  decode: (data: string | ArrayBuffer | TypedArray) => {
    if (!data) {
      return ''
    }
    if (typeof data === 'string') {
      if (data.length % 2 !== 0) {
        throw new Error('Invalid hexadecimal string')
      }
      if (!new RegExp(`^[${hexadecimal}]+$`).test(data)) {
        throw new Error('Invalid hexadecimal string')
      }
      const result = new Uint8Array(data.length / 2)
      for (let i = 0; i < data.length; i += 2) {
        result[i / 2] = parseInt(data.slice(i, i + 2), 16)
      }
      return new TextDecoder().decode(result)
    }
    return new TextDecoder().decode(data)
  },
}
