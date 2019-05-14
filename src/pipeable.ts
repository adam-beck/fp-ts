import { Apply, Apply1, Apply2, Apply2C, Apply3 } from './Apply'
import { Bifunctor, Bifunctor2, Bifunctor3 } from './Bifunctor'
import { Chain, Chain1, Chain2, Chain2C, Chain3 } from './Chain'
import { identity } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import { HKT, HKT2, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import {
  FunctorWithIndex,
  FunctorWithIndex1,
  FunctorWithIndex2,
  FunctorWithIndex2C,
  FunctorWithIndex3
} from './FunctorWithIndex'
import { Extend, Extend1, Extend2, Extend2C, Extend3 } from './Extend'

export interface PipeableFunctor<F> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

export interface PipeableFunctor1<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
}

export interface PipeableFunctor2<F extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctor2C<F extends URIS2, L> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctor3<F extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface PipeableFunctorWithIndex<F, I> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

export interface PipeableFunctorWithIndex1<F extends URIS, I> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Type<F, A>) => Type<F, B>
}

export interface PipeableFunctorWithIndex2<F extends URIS2, I> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctorWithIndex2C<F extends URIS2, I, L> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctorWithIndex3<F extends URIS3, I> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface PipeableApply<F> extends PipeableFunctor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly apFirst: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, A>
  readonly apSecond: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, B>
}

export interface PipeableApply1<F extends URIS> extends PipeableFunctor1<F> {
  readonly ap: <A, B>(fab: Type<F, (a: A) => B>) => (fa: Type<F, A>) => Type<F, B>
  readonly apFirst: <B>(fb: Type<F, B>) => <A>(fa: Type<F, A>) => Type<F, A>
  readonly apSecond: <B>(fb: Type<F, B>) => <A>(fa: Type<F, A>) => Type<F, B>
}

export interface PipeableApply2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly ap: <L, A, B>(fab: Type2<F, L, (a: A) => B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly apFirst: <L, B>(fb: Type2<F, L, B>) => <A>(fa: Type2<F, L, A>) => Type2<F, L, A>
  readonly apSecond: <L, B>(fb: Type2<F, L, B>) => <A>(fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableApply2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly ap: <A, B>(fab: Type2<F, L, (a: A) => B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly apFirst: <A>(fb: Type2<F, L, A>) => <B>(fb: Type2<F, L, B>) => Type2<F, L, A>
  readonly apSecond: <A>(fb: Type2<F, L, A>) => <B>(fb: Type2<F, L, B>) => Type2<F, L, B>
}

export interface PipeableApply3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly ap: <U, L, A, B>(fab: Type3<F, U, L, (a: A) => B>) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly apFirst: <U, L, B>(fb: Type3<F, U, L, B>) => <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly apSecond: <U, L, B>(fb: Type3<F, U, L, B>) => <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface PipeableChain<F> extends PipeableApply<F> {
  readonly chain: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, B>
  readonly flatten: <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
}

export interface PipeableChain1<F extends URIS> extends PipeableApply1<F> {
  readonly chain: <A, B>(f: (a: A) => Type<F, B>) => (ma: Type<F, A>) => Type<F, B>
  readonly flatten: <A>(mma: Type<F, Type<F, A>>) => Type<F, A>
}

export interface PipeableChain2<F extends URIS2> extends PipeableApply2<F> {
  readonly chain: <L, A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly flatten: <L, A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
}

export interface PipeableChain2C<F extends URIS2, L> extends PipeableApply2C<F, L> {
  readonly chain: <A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly flatten: <A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
}

export interface PipeableChain3<F extends URIS3> extends PipeableApply3<F> {
  readonly chain: <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly flatten: <U, L, A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>
}

export interface PipeableExtend<F> extends PipeableFunctor<F> {
  readonly extend: <A, B>(f: (fa: HKT<F, A>) => B) => (ma: HKT<F, A>) => HKT<F, B>
  readonly duplicate: <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
}

export interface PipeableExtend1<F extends URIS> extends PipeableFunctor1<F> {
  readonly extend: <A, B>(f: (fa: Type<F, A>) => B) => (ma: Type<F, A>) => Type<F, B>
  readonly duplicate: <A>(ma: Type<F, A>) => Type<F, Type<F, A>>
}

export interface PipeableExtend2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly extend: <L, A, B>(f: (fa: Type2<F, L, A>) => B) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly duplicate: <L, A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
}

export interface PipeableExtend2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly extend: <A, B>(f: (fa: Type2<F, L, A>) => B) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly duplicate: <A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
}

export interface PipeableExtend3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly extend: <U, L, A, B>(f: (fa: Type3<F, U, L, A>) => B) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly duplicate: <U, L, A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
}

export interface PipeableBifunctor<F> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: HKT2<F, L, A>) => HKT2<F, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => (fa: HKT2<F, L, A>) => HKT2<F, M, A>
}

export interface PipeableBifunctor2<F extends URIS2> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => (fa: Type2<F, L, A>) => Type2<F, M, A>
}

export interface PipeableBifunctor3<F extends URIS3> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => <U>(fa: Type3<F, U, L, A>) => Type3<F, U, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => <U>(fa: Type3<F, U, L, A>) => Type3<F, U, M, A>
}

const isFunctor = <F>(I: any): I is Functor<F> => typeof I.map === 'function'
const isFunctorWithIndex = <F>(I: any): I is FunctorWithIndex<F, unknown> => typeof I.mapWithIndex === 'function'
const isApply = <F>(I: any): I is Apply<F> => typeof I.ap === 'function'
const isChain = <F>(I: any): I is Chain<F> => typeof I.chain === 'function'
const isBifunctor = <F>(I: any): I is Bifunctor<F> => typeof I.bimap === 'function'
const isExtend = <F>(I: any): I is Extend<F> => typeof I.extend === 'function'

/**
 * @since 2.0.0
 */
export function pipeable<F extends URIS3, I>(
  I: { URI: F } & I
): (I extends Chain3<F>
  ? PipeableChain3<F>
  : I extends Apply3<F>
  ? PipeableApply3<F>
  : I extends Functor3<F>
  ? PipeableFunctor3<F>
  : {}) &
  (I extends FunctorWithIndex3<F, infer Ix> ? PipeableFunctorWithIndex3<F, Ix> : {}) &
  (I extends Bifunctor3<F> ? PipeableBifunctor3<F> : {}) &
  (I extends Extend3<F> ? PipeableExtend3<F> : {})
export function pipeable<F extends URIS2, I, L>(
  I: { URI: F; _L: L } & I
): (I extends Chain2C<F, L>
  ? PipeableChain2C<F, L>
  : I extends Apply2C<F, L>
  ? PipeableApply2C<F, L>
  : I extends Functor2C<F, L>
  ? PipeableFunctor2C<F, L>
  : {}) &
  (I extends FunctorWithIndex2C<F, infer Ix, L> ? PipeableFunctorWithIndex2C<F, Ix, L> : {}) &
  (I extends Extend2C<F, L> ? PipeableExtend2C<F, L> : {})
export function pipeable<F extends URIS2, I>(
  I: { URI: F } & I
): (I extends Chain2<F>
  ? PipeableChain2<F>
  : I extends Apply2<F>
  ? PipeableApply2<F>
  : I extends Functor2<F>
  ? PipeableFunctor2<F>
  : {}) &
  (I extends FunctorWithIndex2<F, infer Ix> ? PipeableFunctorWithIndex2<F, Ix> : {}) &
  (I extends Bifunctor2<F> ? PipeableBifunctor2<F> : {}) &
  (I extends Extend2<F> ? PipeableExtend2<F> : {})
export function pipeable<F extends URIS, I>(
  I: { URI: F } & I
): (I extends Chain1<F>
  ? PipeableChain1<F>
  : I extends Apply1<F>
  ? PipeableApply1<F>
  : I extends Functor1<F>
  ? PipeableFunctor1<F>
  : {}) &
  (I extends FunctorWithIndex1<F, infer Ix> ? PipeableFunctorWithIndex1<F, Ix> : {}) &
  (I extends Extend1<F> ? PipeableExtend1<F> : {})
export function pipeable<F, I>(
  I: { URI: F } & I
): (I extends Chain<F>
  ? PipeableChain<F>
  : I extends Apply<F>
  ? PipeableApply<F>
  : I extends Functor<F>
  ? PipeableFunctor<F>
  : {}) &
  (I extends FunctorWithIndex<F, infer Ix> ? PipeableFunctorWithIndex<F, Ix> : {}) &
  (I extends Bifunctor<F> ? PipeableBifunctor<F> : {}) &
  (I extends Extend<F> ? PipeableExtend<F> : {})
export function pipeable<F, I>(I: { URI: F } & I): any {
  const r: any = {}
  if (isFunctor<F>(I)) {
    const map: PipeableFunctor<F>['map'] = f => fa => I.map(fa, f)
    r.map = map
  }
  if (isFunctorWithIndex<F>(I)) {
    const mapWithIndex: PipeableFunctorWithIndex<F, unknown>['mapWithIndex'] = f => fa => I.mapWithIndex(fa, f)
    r.mapWithIndex = mapWithIndex
  }
  if (isApply<F>(I)) {
    const ap: PipeableApply<F>['ap'] = fab => fa => I.ap(fab, fa)
    const apFirst: PipeableApply<F>['apFirst'] = fb => fa => I.ap(I.map(fa, a => () => a), fb)
    r.ap = ap
    r.apFirst = apFirst
    r.apSecond = <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>): HKT<F, B> => I.ap(I.map(fa, () => (b: B) => b), fb)
  }
  if (isChain<F>(I)) {
    const chain: PipeableChain<F>['chain'] = f => ma => I.chain(ma, f)
    const flatten: PipeableChain<F>['flatten'] = mma => I.chain(mma, identity)
    r.chain = chain
    r.flatten = flatten
  }
  if (isBifunctor<F>(I)) {
    const bimap: PipeableBifunctor<F>['bimap'] = (f, g) => fa => I.bimap(fa, f, g)
    const mapLeft: PipeableBifunctor<F>['mapLeft'] = f => fa => I.mapLeft(fa, f)
    r.bimap = bimap
    r.mapLeft = mapLeft
  }
  if (isExtend<F>(I)) {
    const extend: PipeableExtend<F>['extend'] = f => ma => I.extend(ma, f)
    const duplicate: PipeableExtend<F>['duplicate'] = ma => I.extend(ma, identity)
    r.extend = extend
    r.duplicate = duplicate
  }
  return r
}
