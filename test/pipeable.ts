import * as assert from 'assert'
import { array } from '../src/Array'
import { pipeable } from '../src/pipeable'
import { either, right, left } from '../src/Either'
import { monoidSum, fold } from '../src/Monoid'

describe('pipeable', () => {
  it('{}', () => {
    const r = pipeable<'{}', {}>({ URI: '{}' })
    assert.deepStrictEqual(r, {})
  })

  it('Functor', () => {
    const { map } = pipeable(array)
    assert.deepStrictEqual(map((n: number) => n * 2)([1, 2, 3]), [2, 4, 6])
  })

  it('FunctorWithIndex', () => {
    const { mapWithIndex } = pipeable(array)
    assert.deepStrictEqual(mapWithIndex((i, n: number) => n * 2 + i)([1, 2, 3]), [2, 5, 8])
  })

  it('Apply', () => {
    const { ap, apFirst, apSecond } = pipeable(array)
    assert.deepStrictEqual(ap([(n: number) => n * 2])([1, 2, 3]), [2, 4, 6])
    assert.deepStrictEqual(apFirst([2])([1]), [1])
    assert.deepStrictEqual(apSecond([2])([1]), [2])
  })

  it('Chain', () => {
    const { chain, flatten } = pipeable(array)
    assert.deepStrictEqual(chain((n: number) => [n * 2])([1, 2, 3]), [2, 4, 6])
    assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('Bifunctor', () => {
    const { bimap, mapLeft } = pipeable(either)
    assert.deepStrictEqual(bimap((s: string) => s.length, (n: number) => n * 2)(right(1)), right(2))
    assert.deepStrictEqual(bimap((s: string) => s.length, (n: number) => n * 2)(left('aa')), left(2))
    assert.deepStrictEqual(mapLeft((s: string) => s.length)(right(1)), right(1))
    assert.deepStrictEqual(mapLeft((s: string) => s.length)(left('aa')), left(2))
  })

  it('Extend', () => {
    const { extend, duplicate } = pipeable(array)
    assert.deepStrictEqual(extend((as: Array<number>) => fold(monoidSum)(as))([1, 2, 3]), [6, 5, 3])
    assert.deepStrictEqual(duplicate([1, 2, 3]), [[1, 2, 3], [2, 3], [3]])
  })
})
