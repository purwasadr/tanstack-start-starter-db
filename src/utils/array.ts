/**
 * Groups the elements of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * an object where the keys are the generated keys and the values are arrays of elements that share
 * the same key.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {T[]} arr - The array to group.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {Record<K, T[]>} An object where each key is associated with an array of elements that
 * share that key.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = groupBy(array, item => item.category);
 * // result will be:
 * // {
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 */
export function groupBy<T, K extends PropertyKey>(
  arr: ReadonlyArray<T>,
  getKeyFromItem: (item: T) => K,
): Record<K, Array<T>> {
  const result = {} as Record<K, Array<T>>

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const key = getKeyFromItem(item)

    if (!Object.hasOwn(result, key)) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}

/**
 * Flattens an array up to the specified depth.
 *
 * @template T - The type of elements within the array.
 * @template D - The depth to which the array should be flattened.
 * @param {T[]} arr - The array to flatten.
 * @param {D} depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns {Array<FlatArray<T[], D>>} A new array that has been flattened.
 *
 * @example
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 1);
 * // Returns: [1, 2, 3, 4, [5, 6]]
 *
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 2);
 * // Returns: [1, 2, 3, 4, 5, 6]
 */
export function flatten<T, D extends number = 1>(
  arr: ReadonlyArray<T>,
  depth = 1 as D,
): Array<FlatArray<Array<T>, D>> {
  const result: Array<FlatArray<Array<T>, D>> = []
  const flooredDepth = Math.floor(depth)

  const recursive = (arr: ReadonlyArray<T>, currentDepth: number) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (Array.isArray(item) && currentDepth < flooredDepth) {
        recursive(item, currentDepth + 1)
      } else {
        result.push(item as FlatArray<Array<T>, D>)
      }
    }
  }

  recursive(arr, 0)
  return result
}

/**
 * Maps each element in the array using the iteratee function and flattens the result up to the specified depth.
 *
 * @template T - The type of elements within the array.
 * @template U - The type of elements within the returned array from the iteratee function.
 * @template D - The depth to which the array should be flattened.
 * @param {T[]} arr - The array to flatten.
 * @param {(item: T) => U} iteratee - The function that produces the new array elements.
 * @param {D} depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns {Array<FlatArray<U[], D>>} The new array with the mapped and flattened elements.
 *
 * @example
 * const arr = [1, 2, 3];
 *
 * flatMap(arr, (item: number) => [item, item]);
 * // [1, 1, 2, 2, 3, 3]
 *
 * flatMap(arr, (item: number) => [[item, item]], 2);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMap<T, U, D extends number = 1>(
  arr: ReadonlyArray<T>,
  iteratee: (item: T) => U,
  depth: D = 1 as D,
): Array<FlatArray<Array<U>, D>> {
  return flatten(
    arr.map((item) => iteratee(item)),
    depth,
  )
}

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the mapper function.
 *
 * When duplicates are found, the first occurrence is kept and the rest are discarded.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of mapped elements.
 * @param {T[]} arr - The array to process.
 * @param {(item: T) => U} mapper - The function used to convert the array elements.
 * @returns {T[]} A new array containing only the unique elements from the original array, based on the values returned by the mapper function.
 *
 * @example
 * ```ts
 * uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
 * // [1.2, 2.1, 3.2, 5.7, 7.19]
 * ```
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 * ];
 * uniqBy(array, item => item.category).length
 * // 2
 * ```
 */
export function uniqBy<T, U>(
  arr: ReadonlyArray<T>,
  mapper: (item: T) => U,
): Array<T> {
  const map = new Map<U, T>()

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const key = mapper(item)

    if (!map.has(key)) {
      map.set(key, item)
    }
  }

  return Array.from(map.values())
}

/**
 * Creates an array of unique values, in order, from all given arrays using a provided mapping function to determine equality.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of mapped elements.
 * @param {T[]} arr1 - The first array.
 * @param {T[]} arr2 - The second array.
 * @param {(item: T) => U} mapper - The function to map array elements to comparison values.
 * @returns {T[]} A new array containing the union of unique elements from `arr1` and `arr2`, based on the values returned by the mapping function.
 *
 * @example
 * // Custom mapping function for numbers (modulo comparison)
 * const moduloMapper = (x) => x % 3;
 * unionBy([1, 2, 3], [4, 5, 6], moduloMapper);
 * // Returns [1, 2, 3]
 *
 * @example
 * // Custom mapping function for objects with an 'id' property
 * const idMapper = (obj) => obj.id;
 * unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
 * // Returns [{ id: 1 }, { id: 2 }, { id: 3 }]
 */
export function unionBy<T, U>(
  arr1: ReadonlyArray<T>,
  arr2: ReadonlyArray<T>,
  mapper: (item: T) => U,
): Array<T> {
  return uniqBy(arr1.concat(arr2), mapper)
}

/**
 * Returns a random element from an array.
 *
 * This function takes an array and returns a single element selected randomly from the array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to sample from.
 * @returns {T} A random element from the array.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const randomElement = sample(array);
 * // randomElement will be one of the elements from the array, selected randomly.
 */
export function sample<T>(arr: ReadonlyArray<T>): T {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
