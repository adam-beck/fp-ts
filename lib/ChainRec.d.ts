import { Chain, Chain1, Chain2, Chain2C, Chain3 } from './Chain';
import { Either } from './Either';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
/**
 * @since 2.0.0
 */
export interface ChainRec<F> extends Chain<F> {
    readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>;
}
/**
 * @since 2.0.0
 */
export interface ChainRec1<F extends URIS> extends Chain1<F> {
    readonly chainRec: <A, B>(a: A, f: (a: A) => Type<F, Either<A, B>>) => Type<F, B>;
}
/**
 * @since 2.0.0
 */
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
    readonly chainRec: <L, A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>;
}
/**
 * @since 2.0.0
 */
export interface ChainRec2C<F extends URIS2, L> extends Chain2C<F, L> {
    readonly chainRec: <A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>;
}
/**
 * @since 2.0.0
 */
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
    readonly chainRec: <U, L, A, B>(a: A, f: (a: A) => Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, B>;
}
/**
 * @since 2.0.0
 */
export declare function tailRec<A, B>(a: A, f: (a: A) => Either<A, B>): B;
