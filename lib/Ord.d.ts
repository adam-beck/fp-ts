/**
 * @file The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * See [Getting started with fp-ts: Ord](https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e)
 */
import { Ordering } from './Ordering';
import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
/**
 * @since 2.0.0
 */
export interface Ord<A> extends Eq<A> {
    readonly compare: (x: A, y: A) => Ordering;
}
/**
 * @since 2.0.0
 */
export declare const unsafeCompare: (x: any, y: any) => Ordering;
/**
 * @since 2.0.0
 */
export declare const ordString: Ord<string>;
/**
 * @since 2.0.0
 */
export declare const ordNumber: Ord<number>;
/**
 * @since 2.0.0
 */
export declare const ordBoolean: Ord<boolean>;
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
export declare const lessThan: <A>(O: Ord<A>) => (x: A, y: A) => boolean;
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
export declare const greaterThan: <A>(O: Ord<A>) => (x: A, y: A) => boolean;
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
export declare const lessThanOrEq: <A>(O: Ord<A>) => (x: A, y: A) => boolean;
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
export declare const greaterThanOrEq: <A>(O: Ord<A>) => (x: A, y: A) => boolean;
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export declare const min: <A>(O: Ord<A>) => (x: A, y: A) => A;
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
export declare const max: <A>(O: Ord<A>) => (x: A, y: A) => A;
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
export declare const clamp: <A>(O: Ord<A>) => (low: A, hi: A) => (x: A) => A;
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
export declare const between: <A>(O: Ord<A>) => (low: A, hi: A) => (x: A) => boolean;
/**
 * @since 2.0.0
 */
export declare const fromCompare: <A>(compare: (x: A, y: A) => Ordering) => Ord<A>;
/**
 * @since 2.0.0
 */
export declare function contramap<A, B>(O: Ord<A>, f: (b: B) => A): Ord<B>;
/**
 * @since 2.0.0
 */
export declare const getSemigroup: <A = never>() => Semigroup<Ord<A>>;
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.0.0
 */
export declare const getTupleOrd: <T extends Ord<any>[]>(...ords: T) => Ord<{ [K in keyof T]: T[K] extends Ord<infer A> ? A : never; }>;
/**
 * @since 2.0.0
 */
export declare const getDualOrd: <A>(O: Ord<A>) => Ord<A>;
/**
 * @since 2.0.0
 */
export declare const ordDate: Ord<Date>;
