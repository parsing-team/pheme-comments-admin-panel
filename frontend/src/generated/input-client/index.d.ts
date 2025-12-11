
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model future_sources
 * 
 */
export type future_sources = $Result.DefaultSelection<Prisma.$future_sourcesPayload>
/**
 * Model rss_news
 * 
 */
export type rss_news = $Result.DefaultSelection<Prisma.$rss_newsPayload>
/**
 * Model twitter_action_stats
 * 
 */
export type twitter_action_stats = $Result.DefaultSelection<Prisma.$twitter_action_statsPayload>
/**
 * Model twitter_posts
 * This table is a partition table and requires additional setup for migrations. Visit https://pris.ly/d/partition-tables for more info.
 */
export type twitter_posts = $Result.DefaultSelection<Prisma.$twitter_postsPayload>
/**
 * Model twitter_profiles
 * 
 */
export type twitter_profiles = $Result.DefaultSelection<Prisma.$twitter_profilesPayload>
/**
 * Model twitter_profiles_stats
 * 
 */
export type twitter_profiles_stats = $Result.DefaultSelection<Prisma.$twitter_profiles_statsPayload>
/**
 * Model twitter_profiles_temp
 * 
 */
export type twitter_profiles_temp = $Result.DefaultSelection<Prisma.$twitter_profiles_tempPayload>
/**
 * Model twitter_profiles_twitter_posts
 * 
 */
export type twitter_profiles_twitter_posts = $Result.DefaultSelection<Prisma.$twitter_profiles_twitter_postsPayload>
/**
 * Model twitter_relation_reply
 * 
 */
export type twitter_relation_reply = $Result.DefaultSelection<Prisma.$twitter_relation_replyPayload>
/**
 * Model twitter_relationships_reply_profiles
 * 
 */
export type twitter_relationships_reply_profiles = $Result.DefaultSelection<Prisma.$twitter_relationships_reply_profilesPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Future_sources
 * const future_sources = await prisma.future_sources.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Future_sources
   * const future_sources = await prisma.future_sources.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.future_sources`: Exposes CRUD operations for the **future_sources** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Future_sources
    * const future_sources = await prisma.future_sources.findMany()
    * ```
    */
  get future_sources(): Prisma.future_sourcesDelegate<ExtArgs>;

  /**
   * `prisma.rss_news`: Exposes CRUD operations for the **rss_news** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rss_news
    * const rss_news = await prisma.rss_news.findMany()
    * ```
    */
  get rss_news(): Prisma.rss_newsDelegate<ExtArgs>;

  /**
   * `prisma.twitter_action_stats`: Exposes CRUD operations for the **twitter_action_stats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_action_stats
    * const twitter_action_stats = await prisma.twitter_action_stats.findMany()
    * ```
    */
  get twitter_action_stats(): Prisma.twitter_action_statsDelegate<ExtArgs>;

  /**
   * `prisma.twitter_posts`: Exposes CRUD operations for the **twitter_posts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_posts
    * const twitter_posts = await prisma.twitter_posts.findMany()
    * ```
    */
  get twitter_posts(): Prisma.twitter_postsDelegate<ExtArgs>;

  /**
   * `prisma.twitter_profiles`: Exposes CRUD operations for the **twitter_profiles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_profiles
    * const twitter_profiles = await prisma.twitter_profiles.findMany()
    * ```
    */
  get twitter_profiles(): Prisma.twitter_profilesDelegate<ExtArgs>;

  /**
   * `prisma.twitter_profiles_stats`: Exposes CRUD operations for the **twitter_profiles_stats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_profiles_stats
    * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findMany()
    * ```
    */
  get twitter_profiles_stats(): Prisma.twitter_profiles_statsDelegate<ExtArgs>;

  /**
   * `prisma.twitter_profiles_temp`: Exposes CRUD operations for the **twitter_profiles_temp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_profiles_temps
    * const twitter_profiles_temps = await prisma.twitter_profiles_temp.findMany()
    * ```
    */
  get twitter_profiles_temp(): Prisma.twitter_profiles_tempDelegate<ExtArgs>;

  /**
   * `prisma.twitter_profiles_twitter_posts`: Exposes CRUD operations for the **twitter_profiles_twitter_posts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_profiles_twitter_posts
    * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findMany()
    * ```
    */
  get twitter_profiles_twitter_posts(): Prisma.twitter_profiles_twitter_postsDelegate<ExtArgs>;

  /**
   * `prisma.twitter_relation_reply`: Exposes CRUD operations for the **twitter_relation_reply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_relation_replies
    * const twitter_relation_replies = await prisma.twitter_relation_reply.findMany()
    * ```
    */
  get twitter_relation_reply(): Prisma.twitter_relation_replyDelegate<ExtArgs>;

  /**
   * `prisma.twitter_relationships_reply_profiles`: Exposes CRUD operations for the **twitter_relationships_reply_profiles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Twitter_relationships_reply_profiles
    * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findMany()
    * ```
    */
  get twitter_relationships_reply_profiles(): Prisma.twitter_relationships_reply_profilesDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    future_sources: 'future_sources',
    rss_news: 'rss_news',
    twitter_action_stats: 'twitter_action_stats',
    twitter_posts: 'twitter_posts',
    twitter_profiles: 'twitter_profiles',
    twitter_profiles_stats: 'twitter_profiles_stats',
    twitter_profiles_temp: 'twitter_profiles_temp',
    twitter_profiles_twitter_posts: 'twitter_profiles_twitter_posts',
    twitter_relation_reply: 'twitter_relation_reply',
    twitter_relationships_reply_profiles: 'twitter_relationships_reply_profiles'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "future_sources" | "rss_news" | "twitter_action_stats" | "twitter_posts" | "twitter_profiles" | "twitter_profiles_stats" | "twitter_profiles_temp" | "twitter_profiles_twitter_posts" | "twitter_relation_reply" | "twitter_relationships_reply_profiles"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      future_sources: {
        payload: Prisma.$future_sourcesPayload<ExtArgs>
        fields: Prisma.future_sourcesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.future_sourcesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.future_sourcesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>
          }
          findFirst: {
            args: Prisma.future_sourcesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.future_sourcesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>
          }
          findMany: {
            args: Prisma.future_sourcesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>[]
          }
          create: {
            args: Prisma.future_sourcesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>
          }
          createMany: {
            args: Prisma.future_sourcesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.future_sourcesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>[]
          }
          delete: {
            args: Prisma.future_sourcesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>
          }
          update: {
            args: Prisma.future_sourcesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>
          }
          deleteMany: {
            args: Prisma.future_sourcesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.future_sourcesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.future_sourcesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$future_sourcesPayload>
          }
          aggregate: {
            args: Prisma.Future_sourcesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuture_sources>
          }
          groupBy: {
            args: Prisma.future_sourcesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Future_sourcesGroupByOutputType>[]
          }
          count: {
            args: Prisma.future_sourcesCountArgs<ExtArgs>
            result: $Utils.Optional<Future_sourcesCountAggregateOutputType> | number
          }
        }
      }
      rss_news: {
        payload: Prisma.$rss_newsPayload<ExtArgs>
        fields: Prisma.rss_newsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rss_newsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rss_newsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>
          }
          findFirst: {
            args: Prisma.rss_newsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rss_newsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>
          }
          findMany: {
            args: Prisma.rss_newsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>[]
          }
          create: {
            args: Prisma.rss_newsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>
          }
          createMany: {
            args: Prisma.rss_newsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rss_newsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>[]
          }
          delete: {
            args: Prisma.rss_newsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>
          }
          update: {
            args: Prisma.rss_newsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>
          }
          deleteMany: {
            args: Prisma.rss_newsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rss_newsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.rss_newsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rss_newsPayload>
          }
          aggregate: {
            args: Prisma.Rss_newsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRss_news>
          }
          groupBy: {
            args: Prisma.rss_newsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Rss_newsGroupByOutputType>[]
          }
          count: {
            args: Prisma.rss_newsCountArgs<ExtArgs>
            result: $Utils.Optional<Rss_newsCountAggregateOutputType> | number
          }
        }
      }
      twitter_action_stats: {
        payload: Prisma.$twitter_action_statsPayload<ExtArgs>
        fields: Prisma.twitter_action_statsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_action_statsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_action_statsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>
          }
          findFirst: {
            args: Prisma.twitter_action_statsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_action_statsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>
          }
          findMany: {
            args: Prisma.twitter_action_statsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>[]
          }
          create: {
            args: Prisma.twitter_action_statsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>
          }
          createMany: {
            args: Prisma.twitter_action_statsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_action_statsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>[]
          }
          delete: {
            args: Prisma.twitter_action_statsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>
          }
          update: {
            args: Prisma.twitter_action_statsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>
          }
          deleteMany: {
            args: Prisma.twitter_action_statsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_action_statsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_action_statsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_action_statsPayload>
          }
          aggregate: {
            args: Prisma.Twitter_action_statsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_action_stats>
          }
          groupBy: {
            args: Prisma.twitter_action_statsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_action_statsGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_action_statsCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_action_statsCountAggregateOutputType> | number
          }
        }
      }
      twitter_posts: {
        payload: Prisma.$twitter_postsPayload<ExtArgs>
        fields: Prisma.twitter_postsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_postsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_postsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>
          }
          findFirst: {
            args: Prisma.twitter_postsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_postsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>
          }
          findMany: {
            args: Prisma.twitter_postsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>[]
          }
          create: {
            args: Prisma.twitter_postsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>
          }
          createMany: {
            args: Prisma.twitter_postsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_postsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>[]
          }
          delete: {
            args: Prisma.twitter_postsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>
          }
          update: {
            args: Prisma.twitter_postsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>
          }
          deleteMany: {
            args: Prisma.twitter_postsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_postsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_postsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_postsPayload>
          }
          aggregate: {
            args: Prisma.Twitter_postsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_posts>
          }
          groupBy: {
            args: Prisma.twitter_postsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_postsGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_postsCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_postsCountAggregateOutputType> | number
          }
        }
      }
      twitter_profiles: {
        payload: Prisma.$twitter_profilesPayload<ExtArgs>
        fields: Prisma.twitter_profilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_profilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_profilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>
          }
          findFirst: {
            args: Prisma.twitter_profilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_profilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>
          }
          findMany: {
            args: Prisma.twitter_profilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>[]
          }
          create: {
            args: Prisma.twitter_profilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>
          }
          createMany: {
            args: Prisma.twitter_profilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_profilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>[]
          }
          delete: {
            args: Prisma.twitter_profilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>
          }
          update: {
            args: Prisma.twitter_profilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>
          }
          deleteMany: {
            args: Prisma.twitter_profilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_profilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_profilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profilesPayload>
          }
          aggregate: {
            args: Prisma.Twitter_profilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_profiles>
          }
          groupBy: {
            args: Prisma.twitter_profilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_profilesCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profilesCountAggregateOutputType> | number
          }
        }
      }
      twitter_profiles_stats: {
        payload: Prisma.$twitter_profiles_statsPayload<ExtArgs>
        fields: Prisma.twitter_profiles_statsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_profiles_statsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_profiles_statsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>
          }
          findFirst: {
            args: Prisma.twitter_profiles_statsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_profiles_statsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>
          }
          findMany: {
            args: Prisma.twitter_profiles_statsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>[]
          }
          create: {
            args: Prisma.twitter_profiles_statsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>
          }
          createMany: {
            args: Prisma.twitter_profiles_statsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_profiles_statsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>[]
          }
          delete: {
            args: Prisma.twitter_profiles_statsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>
          }
          update: {
            args: Prisma.twitter_profiles_statsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>
          }
          deleteMany: {
            args: Prisma.twitter_profiles_statsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_profiles_statsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_profiles_statsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_statsPayload>
          }
          aggregate: {
            args: Prisma.Twitter_profiles_statsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_profiles_stats>
          }
          groupBy: {
            args: Prisma.twitter_profiles_statsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profiles_statsGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_profiles_statsCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profiles_statsCountAggregateOutputType> | number
          }
        }
      }
      twitter_profiles_temp: {
        payload: Prisma.$twitter_profiles_tempPayload<ExtArgs>
        fields: Prisma.twitter_profiles_tempFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_profiles_tempFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_profiles_tempFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>
          }
          findFirst: {
            args: Prisma.twitter_profiles_tempFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_profiles_tempFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>
          }
          findMany: {
            args: Prisma.twitter_profiles_tempFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>[]
          }
          create: {
            args: Prisma.twitter_profiles_tempCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>
          }
          createMany: {
            args: Prisma.twitter_profiles_tempCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_profiles_tempCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>[]
          }
          delete: {
            args: Prisma.twitter_profiles_tempDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>
          }
          update: {
            args: Prisma.twitter_profiles_tempUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>
          }
          deleteMany: {
            args: Prisma.twitter_profiles_tempDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_profiles_tempUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_profiles_tempUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_tempPayload>
          }
          aggregate: {
            args: Prisma.Twitter_profiles_tempAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_profiles_temp>
          }
          groupBy: {
            args: Prisma.twitter_profiles_tempGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profiles_tempGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_profiles_tempCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profiles_tempCountAggregateOutputType> | number
          }
        }
      }
      twitter_profiles_twitter_posts: {
        payload: Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>
        fields: Prisma.twitter_profiles_twitter_postsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_profiles_twitter_postsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_profiles_twitter_postsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>
          }
          findFirst: {
            args: Prisma.twitter_profiles_twitter_postsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_profiles_twitter_postsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>
          }
          findMany: {
            args: Prisma.twitter_profiles_twitter_postsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>[]
          }
          create: {
            args: Prisma.twitter_profiles_twitter_postsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>
          }
          createMany: {
            args: Prisma.twitter_profiles_twitter_postsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_profiles_twitter_postsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>[]
          }
          delete: {
            args: Prisma.twitter_profiles_twitter_postsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>
          }
          update: {
            args: Prisma.twitter_profiles_twitter_postsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>
          }
          deleteMany: {
            args: Prisma.twitter_profiles_twitter_postsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_profiles_twitter_postsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_profiles_twitter_postsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_profiles_twitter_postsPayload>
          }
          aggregate: {
            args: Prisma.Twitter_profiles_twitter_postsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_profiles_twitter_posts>
          }
          groupBy: {
            args: Prisma.twitter_profiles_twitter_postsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profiles_twitter_postsGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_profiles_twitter_postsCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_profiles_twitter_postsCountAggregateOutputType> | number
          }
        }
      }
      twitter_relation_reply: {
        payload: Prisma.$twitter_relation_replyPayload<ExtArgs>
        fields: Prisma.twitter_relation_replyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_relation_replyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_relation_replyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>
          }
          findFirst: {
            args: Prisma.twitter_relation_replyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_relation_replyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>
          }
          findMany: {
            args: Prisma.twitter_relation_replyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>[]
          }
          create: {
            args: Prisma.twitter_relation_replyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>
          }
          createMany: {
            args: Prisma.twitter_relation_replyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_relation_replyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>[]
          }
          delete: {
            args: Prisma.twitter_relation_replyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>
          }
          update: {
            args: Prisma.twitter_relation_replyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>
          }
          deleteMany: {
            args: Prisma.twitter_relation_replyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_relation_replyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_relation_replyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relation_replyPayload>
          }
          aggregate: {
            args: Prisma.Twitter_relation_replyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_relation_reply>
          }
          groupBy: {
            args: Prisma.twitter_relation_replyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_relation_replyGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_relation_replyCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_relation_replyCountAggregateOutputType> | number
          }
        }
      }
      twitter_relationships_reply_profiles: {
        payload: Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>
        fields: Prisma.twitter_relationships_reply_profilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twitter_relationships_reply_profilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twitter_relationships_reply_profilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>
          }
          findFirst: {
            args: Prisma.twitter_relationships_reply_profilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twitter_relationships_reply_profilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>
          }
          findMany: {
            args: Prisma.twitter_relationships_reply_profilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>[]
          }
          create: {
            args: Prisma.twitter_relationships_reply_profilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>
          }
          createMany: {
            args: Prisma.twitter_relationships_reply_profilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twitter_relationships_reply_profilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>[]
          }
          delete: {
            args: Prisma.twitter_relationships_reply_profilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>
          }
          update: {
            args: Prisma.twitter_relationships_reply_profilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>
          }
          deleteMany: {
            args: Prisma.twitter_relationships_reply_profilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twitter_relationships_reply_profilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.twitter_relationships_reply_profilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twitter_relationships_reply_profilesPayload>
          }
          aggregate: {
            args: Prisma.Twitter_relationships_reply_profilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitter_relationships_reply_profiles>
          }
          groupBy: {
            args: Prisma.twitter_relationships_reply_profilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Twitter_relationships_reply_profilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.twitter_relationships_reply_profilesCountArgs<ExtArgs>
            result: $Utils.Optional<Twitter_relationships_reply_profilesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Twitter_profilesCountOutputType
   */

  export type Twitter_profilesCountOutputType = {
    twitter_action_stats: number
    twitter_posts: number
    twitter_profiles_stats: number
    twitter_profiles_twitter_posts: number
  }

  export type Twitter_profilesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_action_stats?: boolean | Twitter_profilesCountOutputTypeCountTwitter_action_statsArgs
    twitter_posts?: boolean | Twitter_profilesCountOutputTypeCountTwitter_postsArgs
    twitter_profiles_stats?: boolean | Twitter_profilesCountOutputTypeCountTwitter_profiles_statsArgs
    twitter_profiles_twitter_posts?: boolean | Twitter_profilesCountOutputTypeCountTwitter_profiles_twitter_postsArgs
  }

  // Custom InputTypes
  /**
   * Twitter_profilesCountOutputType without action
   */
  export type Twitter_profilesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Twitter_profilesCountOutputType
     */
    select?: Twitter_profilesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Twitter_profilesCountOutputType without action
   */
  export type Twitter_profilesCountOutputTypeCountTwitter_action_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_action_statsWhereInput
  }

  /**
   * Twitter_profilesCountOutputType without action
   */
  export type Twitter_profilesCountOutputTypeCountTwitter_postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_postsWhereInput
  }

  /**
   * Twitter_profilesCountOutputType without action
   */
  export type Twitter_profilesCountOutputTypeCountTwitter_profiles_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_profiles_statsWhereInput
  }

  /**
   * Twitter_profilesCountOutputType without action
   */
  export type Twitter_profilesCountOutputTypeCountTwitter_profiles_twitter_postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_profiles_twitter_postsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model future_sources
   */

  export type AggregateFuture_sources = {
    _count: Future_sourcesCountAggregateOutputType | null
    _avg: Future_sourcesAvgAggregateOutputType | null
    _sum: Future_sourcesSumAggregateOutputType | null
    _min: Future_sourcesMinAggregateOutputType | null
    _max: Future_sourcesMaxAggregateOutputType | null
  }

  export type Future_sourcesAvgAggregateOutputType = {
    id: number | null
  }

  export type Future_sourcesSumAggregateOutputType = {
    id: number | null
  }

  export type Future_sourcesMinAggregateOutputType = {
    id: number | null
    name: string | null
    count_followers: string | null
    is_ready: boolean | null
    profiles_id: string | null
  }

  export type Future_sourcesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    count_followers: string | null
    is_ready: boolean | null
    profiles_id: string | null
  }

  export type Future_sourcesCountAggregateOutputType = {
    id: number
    name: number
    count_followers: number
    is_ready: number
    profiles_id: number
    _all: number
  }


  export type Future_sourcesAvgAggregateInputType = {
    id?: true
  }

  export type Future_sourcesSumAggregateInputType = {
    id?: true
  }

  export type Future_sourcesMinAggregateInputType = {
    id?: true
    name?: true
    count_followers?: true
    is_ready?: true
    profiles_id?: true
  }

  export type Future_sourcesMaxAggregateInputType = {
    id?: true
    name?: true
    count_followers?: true
    is_ready?: true
    profiles_id?: true
  }

  export type Future_sourcesCountAggregateInputType = {
    id?: true
    name?: true
    count_followers?: true
    is_ready?: true
    profiles_id?: true
    _all?: true
  }

  export type Future_sourcesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which future_sources to aggregate.
     */
    where?: future_sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of future_sources to fetch.
     */
    orderBy?: future_sourcesOrderByWithRelationInput | future_sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: future_sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` future_sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` future_sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned future_sources
    **/
    _count?: true | Future_sourcesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Future_sourcesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Future_sourcesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Future_sourcesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Future_sourcesMaxAggregateInputType
  }

  export type GetFuture_sourcesAggregateType<T extends Future_sourcesAggregateArgs> = {
        [P in keyof T & keyof AggregateFuture_sources]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuture_sources[P]>
      : GetScalarType<T[P], AggregateFuture_sources[P]>
  }




  export type future_sourcesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: future_sourcesWhereInput
    orderBy?: future_sourcesOrderByWithAggregationInput | future_sourcesOrderByWithAggregationInput[]
    by: Future_sourcesScalarFieldEnum[] | Future_sourcesScalarFieldEnum
    having?: future_sourcesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Future_sourcesCountAggregateInputType | true
    _avg?: Future_sourcesAvgAggregateInputType
    _sum?: Future_sourcesSumAggregateInputType
    _min?: Future_sourcesMinAggregateInputType
    _max?: Future_sourcesMaxAggregateInputType
  }

  export type Future_sourcesGroupByOutputType = {
    id: number
    name: string
    count_followers: string | null
    is_ready: boolean | null
    profiles_id: string | null
    _count: Future_sourcesCountAggregateOutputType | null
    _avg: Future_sourcesAvgAggregateOutputType | null
    _sum: Future_sourcesSumAggregateOutputType | null
    _min: Future_sourcesMinAggregateOutputType | null
    _max: Future_sourcesMaxAggregateOutputType | null
  }

  type GetFuture_sourcesGroupByPayload<T extends future_sourcesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Future_sourcesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Future_sourcesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Future_sourcesGroupByOutputType[P]>
            : GetScalarType<T[P], Future_sourcesGroupByOutputType[P]>
        }
      >
    >


  export type future_sourcesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    count_followers?: boolean
    is_ready?: boolean
    profiles_id?: boolean
  }, ExtArgs["result"]["future_sources"]>

  export type future_sourcesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    count_followers?: boolean
    is_ready?: boolean
    profiles_id?: boolean
  }, ExtArgs["result"]["future_sources"]>

  export type future_sourcesSelectScalar = {
    id?: boolean
    name?: boolean
    count_followers?: boolean
    is_ready?: boolean
    profiles_id?: boolean
  }


  export type $future_sourcesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "future_sources"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      count_followers: string | null
      is_ready: boolean | null
      profiles_id: string | null
    }, ExtArgs["result"]["future_sources"]>
    composites: {}
  }

  type future_sourcesGetPayload<S extends boolean | null | undefined | future_sourcesDefaultArgs> = $Result.GetResult<Prisma.$future_sourcesPayload, S>

  type future_sourcesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<future_sourcesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Future_sourcesCountAggregateInputType | true
    }

  export interface future_sourcesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['future_sources'], meta: { name: 'future_sources' } }
    /**
     * Find zero or one Future_sources that matches the filter.
     * @param {future_sourcesFindUniqueArgs} args - Arguments to find a Future_sources
     * @example
     * // Get one Future_sources
     * const future_sources = await prisma.future_sources.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends future_sourcesFindUniqueArgs>(args: SelectSubset<T, future_sourcesFindUniqueArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Future_sources that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {future_sourcesFindUniqueOrThrowArgs} args - Arguments to find a Future_sources
     * @example
     * // Get one Future_sources
     * const future_sources = await prisma.future_sources.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends future_sourcesFindUniqueOrThrowArgs>(args: SelectSubset<T, future_sourcesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Future_sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {future_sourcesFindFirstArgs} args - Arguments to find a Future_sources
     * @example
     * // Get one Future_sources
     * const future_sources = await prisma.future_sources.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends future_sourcesFindFirstArgs>(args?: SelectSubset<T, future_sourcesFindFirstArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Future_sources that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {future_sourcesFindFirstOrThrowArgs} args - Arguments to find a Future_sources
     * @example
     * // Get one Future_sources
     * const future_sources = await prisma.future_sources.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends future_sourcesFindFirstOrThrowArgs>(args?: SelectSubset<T, future_sourcesFindFirstOrThrowArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Future_sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {future_sourcesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Future_sources
     * const future_sources = await prisma.future_sources.findMany()
     * 
     * // Get first 10 Future_sources
     * const future_sources = await prisma.future_sources.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const future_sourcesWithIdOnly = await prisma.future_sources.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends future_sourcesFindManyArgs>(args?: SelectSubset<T, future_sourcesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Future_sources.
     * @param {future_sourcesCreateArgs} args - Arguments to create a Future_sources.
     * @example
     * // Create one Future_sources
     * const Future_sources = await prisma.future_sources.create({
     *   data: {
     *     // ... data to create a Future_sources
     *   }
     * })
     * 
     */
    create<T extends future_sourcesCreateArgs>(args: SelectSubset<T, future_sourcesCreateArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Future_sources.
     * @param {future_sourcesCreateManyArgs} args - Arguments to create many Future_sources.
     * @example
     * // Create many Future_sources
     * const future_sources = await prisma.future_sources.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends future_sourcesCreateManyArgs>(args?: SelectSubset<T, future_sourcesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Future_sources and returns the data saved in the database.
     * @param {future_sourcesCreateManyAndReturnArgs} args - Arguments to create many Future_sources.
     * @example
     * // Create many Future_sources
     * const future_sources = await prisma.future_sources.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Future_sources and only return the `id`
     * const future_sourcesWithIdOnly = await prisma.future_sources.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends future_sourcesCreateManyAndReturnArgs>(args?: SelectSubset<T, future_sourcesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Future_sources.
     * @param {future_sourcesDeleteArgs} args - Arguments to delete one Future_sources.
     * @example
     * // Delete one Future_sources
     * const Future_sources = await prisma.future_sources.delete({
     *   where: {
     *     // ... filter to delete one Future_sources
     *   }
     * })
     * 
     */
    delete<T extends future_sourcesDeleteArgs>(args: SelectSubset<T, future_sourcesDeleteArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Future_sources.
     * @param {future_sourcesUpdateArgs} args - Arguments to update one Future_sources.
     * @example
     * // Update one Future_sources
     * const future_sources = await prisma.future_sources.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends future_sourcesUpdateArgs>(args: SelectSubset<T, future_sourcesUpdateArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Future_sources.
     * @param {future_sourcesDeleteManyArgs} args - Arguments to filter Future_sources to delete.
     * @example
     * // Delete a few Future_sources
     * const { count } = await prisma.future_sources.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends future_sourcesDeleteManyArgs>(args?: SelectSubset<T, future_sourcesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Future_sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {future_sourcesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Future_sources
     * const future_sources = await prisma.future_sources.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends future_sourcesUpdateManyArgs>(args: SelectSubset<T, future_sourcesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Future_sources.
     * @param {future_sourcesUpsertArgs} args - Arguments to update or create a Future_sources.
     * @example
     * // Update or create a Future_sources
     * const future_sources = await prisma.future_sources.upsert({
     *   create: {
     *     // ... data to create a Future_sources
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Future_sources we want to update
     *   }
     * })
     */
    upsert<T extends future_sourcesUpsertArgs>(args: SelectSubset<T, future_sourcesUpsertArgs<ExtArgs>>): Prisma__future_sourcesClient<$Result.GetResult<Prisma.$future_sourcesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Future_sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {future_sourcesCountArgs} args - Arguments to filter Future_sources to count.
     * @example
     * // Count the number of Future_sources
     * const count = await prisma.future_sources.count({
     *   where: {
     *     // ... the filter for the Future_sources we want to count
     *   }
     * })
    **/
    count<T extends future_sourcesCountArgs>(
      args?: Subset<T, future_sourcesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Future_sourcesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Future_sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Future_sourcesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Future_sourcesAggregateArgs>(args: Subset<T, Future_sourcesAggregateArgs>): Prisma.PrismaPromise<GetFuture_sourcesAggregateType<T>>

    /**
     * Group by Future_sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {future_sourcesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends future_sourcesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: future_sourcesGroupByArgs['orderBy'] }
        : { orderBy?: future_sourcesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, future_sourcesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuture_sourcesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the future_sources model
   */
  readonly fields: future_sourcesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for future_sources.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__future_sourcesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the future_sources model
   */ 
  interface future_sourcesFieldRefs {
    readonly id: FieldRef<"future_sources", 'Int'>
    readonly name: FieldRef<"future_sources", 'String'>
    readonly count_followers: FieldRef<"future_sources", 'String'>
    readonly is_ready: FieldRef<"future_sources", 'Boolean'>
    readonly profiles_id: FieldRef<"future_sources", 'String'>
  }
    

  // Custom InputTypes
  /**
   * future_sources findUnique
   */
  export type future_sourcesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * Filter, which future_sources to fetch.
     */
    where: future_sourcesWhereUniqueInput
  }

  /**
   * future_sources findUniqueOrThrow
   */
  export type future_sourcesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * Filter, which future_sources to fetch.
     */
    where: future_sourcesWhereUniqueInput
  }

  /**
   * future_sources findFirst
   */
  export type future_sourcesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * Filter, which future_sources to fetch.
     */
    where?: future_sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of future_sources to fetch.
     */
    orderBy?: future_sourcesOrderByWithRelationInput | future_sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for future_sources.
     */
    cursor?: future_sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` future_sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` future_sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of future_sources.
     */
    distinct?: Future_sourcesScalarFieldEnum | Future_sourcesScalarFieldEnum[]
  }

  /**
   * future_sources findFirstOrThrow
   */
  export type future_sourcesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * Filter, which future_sources to fetch.
     */
    where?: future_sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of future_sources to fetch.
     */
    orderBy?: future_sourcesOrderByWithRelationInput | future_sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for future_sources.
     */
    cursor?: future_sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` future_sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` future_sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of future_sources.
     */
    distinct?: Future_sourcesScalarFieldEnum | Future_sourcesScalarFieldEnum[]
  }

  /**
   * future_sources findMany
   */
  export type future_sourcesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * Filter, which future_sources to fetch.
     */
    where?: future_sourcesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of future_sources to fetch.
     */
    orderBy?: future_sourcesOrderByWithRelationInput | future_sourcesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing future_sources.
     */
    cursor?: future_sourcesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` future_sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` future_sources.
     */
    skip?: number
    distinct?: Future_sourcesScalarFieldEnum | Future_sourcesScalarFieldEnum[]
  }

  /**
   * future_sources create
   */
  export type future_sourcesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * The data needed to create a future_sources.
     */
    data: XOR<future_sourcesCreateInput, future_sourcesUncheckedCreateInput>
  }

  /**
   * future_sources createMany
   */
  export type future_sourcesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many future_sources.
     */
    data: future_sourcesCreateManyInput | future_sourcesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * future_sources createManyAndReturn
   */
  export type future_sourcesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many future_sources.
     */
    data: future_sourcesCreateManyInput | future_sourcesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * future_sources update
   */
  export type future_sourcesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * The data needed to update a future_sources.
     */
    data: XOR<future_sourcesUpdateInput, future_sourcesUncheckedUpdateInput>
    /**
     * Choose, which future_sources to update.
     */
    where: future_sourcesWhereUniqueInput
  }

  /**
   * future_sources updateMany
   */
  export type future_sourcesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update future_sources.
     */
    data: XOR<future_sourcesUpdateManyMutationInput, future_sourcesUncheckedUpdateManyInput>
    /**
     * Filter which future_sources to update
     */
    where?: future_sourcesWhereInput
  }

  /**
   * future_sources upsert
   */
  export type future_sourcesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * The filter to search for the future_sources to update in case it exists.
     */
    where: future_sourcesWhereUniqueInput
    /**
     * In case the future_sources found by the `where` argument doesn't exist, create a new future_sources with this data.
     */
    create: XOR<future_sourcesCreateInput, future_sourcesUncheckedCreateInput>
    /**
     * In case the future_sources was found with the provided `where` argument, update it with this data.
     */
    update: XOR<future_sourcesUpdateInput, future_sourcesUncheckedUpdateInput>
  }

  /**
   * future_sources delete
   */
  export type future_sourcesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
    /**
     * Filter which future_sources to delete.
     */
    where: future_sourcesWhereUniqueInput
  }

  /**
   * future_sources deleteMany
   */
  export type future_sourcesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which future_sources to delete
     */
    where?: future_sourcesWhereInput
  }

  /**
   * future_sources without action
   */
  export type future_sourcesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the future_sources
     */
    select?: future_sourcesSelect<ExtArgs> | null
  }


  /**
   * Model rss_news
   */

  export type AggregateRss_news = {
    _count: Rss_newsCountAggregateOutputType | null
    _avg: Rss_newsAvgAggregateOutputType | null
    _sum: Rss_newsSumAggregateOutputType | null
    _min: Rss_newsMinAggregateOutputType | null
    _max: Rss_newsMaxAggregateOutputType | null
  }

  export type Rss_newsAvgAggregateOutputType = {
    id: number | null
  }

  export type Rss_newsSumAggregateOutputType = {
    id: number | null
  }

  export type Rss_newsMinAggregateOutputType = {
    id: number | null
    link: string | null
    publish_date: Date | null
    date: Date | null
  }

  export type Rss_newsMaxAggregateOutputType = {
    id: number | null
    link: string | null
    publish_date: Date | null
    date: Date | null
  }

  export type Rss_newsCountAggregateOutputType = {
    id: number
    link: number
    publish_date: number
    date: number
    _all: number
  }


  export type Rss_newsAvgAggregateInputType = {
    id?: true
  }

  export type Rss_newsSumAggregateInputType = {
    id?: true
  }

  export type Rss_newsMinAggregateInputType = {
    id?: true
    link?: true
    publish_date?: true
    date?: true
  }

  export type Rss_newsMaxAggregateInputType = {
    id?: true
    link?: true
    publish_date?: true
    date?: true
  }

  export type Rss_newsCountAggregateInputType = {
    id?: true
    link?: true
    publish_date?: true
    date?: true
    _all?: true
  }

  export type Rss_newsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rss_news to aggregate.
     */
    where?: rss_newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rss_news to fetch.
     */
    orderBy?: rss_newsOrderByWithRelationInput | rss_newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rss_newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rss_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rss_news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rss_news
    **/
    _count?: true | Rss_newsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Rss_newsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Rss_newsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Rss_newsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Rss_newsMaxAggregateInputType
  }

  export type GetRss_newsAggregateType<T extends Rss_newsAggregateArgs> = {
        [P in keyof T & keyof AggregateRss_news]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRss_news[P]>
      : GetScalarType<T[P], AggregateRss_news[P]>
  }




  export type rss_newsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rss_newsWhereInput
    orderBy?: rss_newsOrderByWithAggregationInput | rss_newsOrderByWithAggregationInput[]
    by: Rss_newsScalarFieldEnum[] | Rss_newsScalarFieldEnum
    having?: rss_newsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Rss_newsCountAggregateInputType | true
    _avg?: Rss_newsAvgAggregateInputType
    _sum?: Rss_newsSumAggregateInputType
    _min?: Rss_newsMinAggregateInputType
    _max?: Rss_newsMaxAggregateInputType
  }

  export type Rss_newsGroupByOutputType = {
    id: number
    link: string
    publish_date: Date | null
    date: Date | null
    _count: Rss_newsCountAggregateOutputType | null
    _avg: Rss_newsAvgAggregateOutputType | null
    _sum: Rss_newsSumAggregateOutputType | null
    _min: Rss_newsMinAggregateOutputType | null
    _max: Rss_newsMaxAggregateOutputType | null
  }

  type GetRss_newsGroupByPayload<T extends rss_newsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Rss_newsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Rss_newsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Rss_newsGroupByOutputType[P]>
            : GetScalarType<T[P], Rss_newsGroupByOutputType[P]>
        }
      >
    >


  export type rss_newsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    publish_date?: boolean
    date?: boolean
  }, ExtArgs["result"]["rss_news"]>

  export type rss_newsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    publish_date?: boolean
    date?: boolean
  }, ExtArgs["result"]["rss_news"]>

  export type rss_newsSelectScalar = {
    id?: boolean
    link?: boolean
    publish_date?: boolean
    date?: boolean
  }


  export type $rss_newsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rss_news"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      link: string
      publish_date: Date | null
      date: Date | null
    }, ExtArgs["result"]["rss_news"]>
    composites: {}
  }

  type rss_newsGetPayload<S extends boolean | null | undefined | rss_newsDefaultArgs> = $Result.GetResult<Prisma.$rss_newsPayload, S>

  type rss_newsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<rss_newsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Rss_newsCountAggregateInputType | true
    }

  export interface rss_newsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rss_news'], meta: { name: 'rss_news' } }
    /**
     * Find zero or one Rss_news that matches the filter.
     * @param {rss_newsFindUniqueArgs} args - Arguments to find a Rss_news
     * @example
     * // Get one Rss_news
     * const rss_news = await prisma.rss_news.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rss_newsFindUniqueArgs>(args: SelectSubset<T, rss_newsFindUniqueArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Rss_news that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {rss_newsFindUniqueOrThrowArgs} args - Arguments to find a Rss_news
     * @example
     * // Get one Rss_news
     * const rss_news = await prisma.rss_news.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rss_newsFindUniqueOrThrowArgs>(args: SelectSubset<T, rss_newsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Rss_news that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rss_newsFindFirstArgs} args - Arguments to find a Rss_news
     * @example
     * // Get one Rss_news
     * const rss_news = await prisma.rss_news.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rss_newsFindFirstArgs>(args?: SelectSubset<T, rss_newsFindFirstArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Rss_news that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rss_newsFindFirstOrThrowArgs} args - Arguments to find a Rss_news
     * @example
     * // Get one Rss_news
     * const rss_news = await prisma.rss_news.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rss_newsFindFirstOrThrowArgs>(args?: SelectSubset<T, rss_newsFindFirstOrThrowArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rss_news that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rss_newsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rss_news
     * const rss_news = await prisma.rss_news.findMany()
     * 
     * // Get first 10 Rss_news
     * const rss_news = await prisma.rss_news.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rss_newsWithIdOnly = await prisma.rss_news.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends rss_newsFindManyArgs>(args?: SelectSubset<T, rss_newsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Rss_news.
     * @param {rss_newsCreateArgs} args - Arguments to create a Rss_news.
     * @example
     * // Create one Rss_news
     * const Rss_news = await prisma.rss_news.create({
     *   data: {
     *     // ... data to create a Rss_news
     *   }
     * })
     * 
     */
    create<T extends rss_newsCreateArgs>(args: SelectSubset<T, rss_newsCreateArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rss_news.
     * @param {rss_newsCreateManyArgs} args - Arguments to create many Rss_news.
     * @example
     * // Create many Rss_news
     * const rss_news = await prisma.rss_news.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rss_newsCreateManyArgs>(args?: SelectSubset<T, rss_newsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rss_news and returns the data saved in the database.
     * @param {rss_newsCreateManyAndReturnArgs} args - Arguments to create many Rss_news.
     * @example
     * // Create many Rss_news
     * const rss_news = await prisma.rss_news.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rss_news and only return the `id`
     * const rss_newsWithIdOnly = await prisma.rss_news.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rss_newsCreateManyAndReturnArgs>(args?: SelectSubset<T, rss_newsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Rss_news.
     * @param {rss_newsDeleteArgs} args - Arguments to delete one Rss_news.
     * @example
     * // Delete one Rss_news
     * const Rss_news = await prisma.rss_news.delete({
     *   where: {
     *     // ... filter to delete one Rss_news
     *   }
     * })
     * 
     */
    delete<T extends rss_newsDeleteArgs>(args: SelectSubset<T, rss_newsDeleteArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Rss_news.
     * @param {rss_newsUpdateArgs} args - Arguments to update one Rss_news.
     * @example
     * // Update one Rss_news
     * const rss_news = await prisma.rss_news.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rss_newsUpdateArgs>(args: SelectSubset<T, rss_newsUpdateArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rss_news.
     * @param {rss_newsDeleteManyArgs} args - Arguments to filter Rss_news to delete.
     * @example
     * // Delete a few Rss_news
     * const { count } = await prisma.rss_news.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rss_newsDeleteManyArgs>(args?: SelectSubset<T, rss_newsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rss_news.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rss_newsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rss_news
     * const rss_news = await prisma.rss_news.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rss_newsUpdateManyArgs>(args: SelectSubset<T, rss_newsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Rss_news.
     * @param {rss_newsUpsertArgs} args - Arguments to update or create a Rss_news.
     * @example
     * // Update or create a Rss_news
     * const rss_news = await prisma.rss_news.upsert({
     *   create: {
     *     // ... data to create a Rss_news
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rss_news we want to update
     *   }
     * })
     */
    upsert<T extends rss_newsUpsertArgs>(args: SelectSubset<T, rss_newsUpsertArgs<ExtArgs>>): Prisma__rss_newsClient<$Result.GetResult<Prisma.$rss_newsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rss_news.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rss_newsCountArgs} args - Arguments to filter Rss_news to count.
     * @example
     * // Count the number of Rss_news
     * const count = await prisma.rss_news.count({
     *   where: {
     *     // ... the filter for the Rss_news we want to count
     *   }
     * })
    **/
    count<T extends rss_newsCountArgs>(
      args?: Subset<T, rss_newsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Rss_newsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rss_news.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Rss_newsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Rss_newsAggregateArgs>(args: Subset<T, Rss_newsAggregateArgs>): Prisma.PrismaPromise<GetRss_newsAggregateType<T>>

    /**
     * Group by Rss_news.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rss_newsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rss_newsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rss_newsGroupByArgs['orderBy'] }
        : { orderBy?: rss_newsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rss_newsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRss_newsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rss_news model
   */
  readonly fields: rss_newsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rss_news.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rss_newsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the rss_news model
   */ 
  interface rss_newsFieldRefs {
    readonly id: FieldRef<"rss_news", 'Int'>
    readonly link: FieldRef<"rss_news", 'String'>
    readonly publish_date: FieldRef<"rss_news", 'DateTime'>
    readonly date: FieldRef<"rss_news", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * rss_news findUnique
   */
  export type rss_newsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * Filter, which rss_news to fetch.
     */
    where: rss_newsWhereUniqueInput
  }

  /**
   * rss_news findUniqueOrThrow
   */
  export type rss_newsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * Filter, which rss_news to fetch.
     */
    where: rss_newsWhereUniqueInput
  }

  /**
   * rss_news findFirst
   */
  export type rss_newsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * Filter, which rss_news to fetch.
     */
    where?: rss_newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rss_news to fetch.
     */
    orderBy?: rss_newsOrderByWithRelationInput | rss_newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rss_news.
     */
    cursor?: rss_newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rss_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rss_news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rss_news.
     */
    distinct?: Rss_newsScalarFieldEnum | Rss_newsScalarFieldEnum[]
  }

  /**
   * rss_news findFirstOrThrow
   */
  export type rss_newsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * Filter, which rss_news to fetch.
     */
    where?: rss_newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rss_news to fetch.
     */
    orderBy?: rss_newsOrderByWithRelationInput | rss_newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rss_news.
     */
    cursor?: rss_newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rss_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rss_news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rss_news.
     */
    distinct?: Rss_newsScalarFieldEnum | Rss_newsScalarFieldEnum[]
  }

  /**
   * rss_news findMany
   */
  export type rss_newsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * Filter, which rss_news to fetch.
     */
    where?: rss_newsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rss_news to fetch.
     */
    orderBy?: rss_newsOrderByWithRelationInput | rss_newsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rss_news.
     */
    cursor?: rss_newsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rss_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rss_news.
     */
    skip?: number
    distinct?: Rss_newsScalarFieldEnum | Rss_newsScalarFieldEnum[]
  }

  /**
   * rss_news create
   */
  export type rss_newsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * The data needed to create a rss_news.
     */
    data: XOR<rss_newsCreateInput, rss_newsUncheckedCreateInput>
  }

  /**
   * rss_news createMany
   */
  export type rss_newsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rss_news.
     */
    data: rss_newsCreateManyInput | rss_newsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rss_news createManyAndReturn
   */
  export type rss_newsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many rss_news.
     */
    data: rss_newsCreateManyInput | rss_newsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rss_news update
   */
  export type rss_newsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * The data needed to update a rss_news.
     */
    data: XOR<rss_newsUpdateInput, rss_newsUncheckedUpdateInput>
    /**
     * Choose, which rss_news to update.
     */
    where: rss_newsWhereUniqueInput
  }

  /**
   * rss_news updateMany
   */
  export type rss_newsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rss_news.
     */
    data: XOR<rss_newsUpdateManyMutationInput, rss_newsUncheckedUpdateManyInput>
    /**
     * Filter which rss_news to update
     */
    where?: rss_newsWhereInput
  }

  /**
   * rss_news upsert
   */
  export type rss_newsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * The filter to search for the rss_news to update in case it exists.
     */
    where: rss_newsWhereUniqueInput
    /**
     * In case the rss_news found by the `where` argument doesn't exist, create a new rss_news with this data.
     */
    create: XOR<rss_newsCreateInput, rss_newsUncheckedCreateInput>
    /**
     * In case the rss_news was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rss_newsUpdateInput, rss_newsUncheckedUpdateInput>
  }

  /**
   * rss_news delete
   */
  export type rss_newsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
    /**
     * Filter which rss_news to delete.
     */
    where: rss_newsWhereUniqueInput
  }

  /**
   * rss_news deleteMany
   */
  export type rss_newsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rss_news to delete
     */
    where?: rss_newsWhereInput
  }

  /**
   * rss_news without action
   */
  export type rss_newsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rss_news
     */
    select?: rss_newsSelect<ExtArgs> | null
  }


  /**
   * Model twitter_action_stats
   */

  export type AggregateTwitter_action_stats = {
    _count: Twitter_action_statsCountAggregateOutputType | null
    _avg: Twitter_action_statsAvgAggregateOutputType | null
    _sum: Twitter_action_statsSumAggregateOutputType | null
    _min: Twitter_action_statsMinAggregateOutputType | null
    _max: Twitter_action_statsMaxAggregateOutputType | null
  }

  export type Twitter_action_statsAvgAggregateOutputType = {
    id: number | null
    likes: number | null
    views: number | null
    comments: number | null
    reposts: number | null
    saveds: number | null
    post_id: number | null
    source_id: number | null
    rev: number | null
  }

  export type Twitter_action_statsSumAggregateOutputType = {
    id: number | null
    likes: number | null
    views: number | null
    comments: number | null
    reposts: number | null
    saveds: number | null
    post_id: number | null
    source_id: number | null
    rev: number | null
  }

  export type Twitter_action_statsMinAggregateOutputType = {
    id: number | null
    likes: number | null
    views: number | null
    comments: number | null
    reposts: number | null
    saveds: number | null
    post_id: number | null
    permalink: string | null
    source_id: number | null
    rev: number | null
    date: Date | null
  }

  export type Twitter_action_statsMaxAggregateOutputType = {
    id: number | null
    likes: number | null
    views: number | null
    comments: number | null
    reposts: number | null
    saveds: number | null
    post_id: number | null
    permalink: string | null
    source_id: number | null
    rev: number | null
    date: Date | null
  }

  export type Twitter_action_statsCountAggregateOutputType = {
    id: number
    likes: number
    views: number
    comments: number
    reposts: number
    saveds: number
    post_id: number
    permalink: number
    source_id: number
    rev: number
    date: number
    _all: number
  }


  export type Twitter_action_statsAvgAggregateInputType = {
    id?: true
    likes?: true
    views?: true
    comments?: true
    reposts?: true
    saveds?: true
    post_id?: true
    source_id?: true
    rev?: true
  }

  export type Twitter_action_statsSumAggregateInputType = {
    id?: true
    likes?: true
    views?: true
    comments?: true
    reposts?: true
    saveds?: true
    post_id?: true
    source_id?: true
    rev?: true
  }

  export type Twitter_action_statsMinAggregateInputType = {
    id?: true
    likes?: true
    views?: true
    comments?: true
    reposts?: true
    saveds?: true
    post_id?: true
    permalink?: true
    source_id?: true
    rev?: true
    date?: true
  }

  export type Twitter_action_statsMaxAggregateInputType = {
    id?: true
    likes?: true
    views?: true
    comments?: true
    reposts?: true
    saveds?: true
    post_id?: true
    permalink?: true
    source_id?: true
    rev?: true
    date?: true
  }

  export type Twitter_action_statsCountAggregateInputType = {
    id?: true
    likes?: true
    views?: true
    comments?: true
    reposts?: true
    saveds?: true
    post_id?: true
    permalink?: true
    source_id?: true
    rev?: true
    date?: true
    _all?: true
  }

  export type Twitter_action_statsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_action_stats to aggregate.
     */
    where?: twitter_action_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_action_stats to fetch.
     */
    orderBy?: twitter_action_statsOrderByWithRelationInput | twitter_action_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_action_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_action_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_action_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_action_stats
    **/
    _count?: true | Twitter_action_statsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_action_statsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_action_statsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_action_statsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_action_statsMaxAggregateInputType
  }

  export type GetTwitter_action_statsAggregateType<T extends Twitter_action_statsAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_action_stats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_action_stats[P]>
      : GetScalarType<T[P], AggregateTwitter_action_stats[P]>
  }




  export type twitter_action_statsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_action_statsWhereInput
    orderBy?: twitter_action_statsOrderByWithAggregationInput | twitter_action_statsOrderByWithAggregationInput[]
    by: Twitter_action_statsScalarFieldEnum[] | Twitter_action_statsScalarFieldEnum
    having?: twitter_action_statsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_action_statsCountAggregateInputType | true
    _avg?: Twitter_action_statsAvgAggregateInputType
    _sum?: Twitter_action_statsSumAggregateInputType
    _min?: Twitter_action_statsMinAggregateInputType
    _max?: Twitter_action_statsMaxAggregateInputType
  }

  export type Twitter_action_statsGroupByOutputType = {
    id: number
    likes: number | null
    views: number | null
    comments: number | null
    reposts: number | null
    saveds: number | null
    post_id: number | null
    permalink: string | null
    source_id: number | null
    rev: number | null
    date: Date | null
    _count: Twitter_action_statsCountAggregateOutputType | null
    _avg: Twitter_action_statsAvgAggregateOutputType | null
    _sum: Twitter_action_statsSumAggregateOutputType | null
    _min: Twitter_action_statsMinAggregateOutputType | null
    _max: Twitter_action_statsMaxAggregateOutputType | null
  }

  type GetTwitter_action_statsGroupByPayload<T extends twitter_action_statsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_action_statsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_action_statsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_action_statsGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_action_statsGroupByOutputType[P]>
        }
      >
    >


  export type twitter_action_statsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    likes?: boolean
    views?: boolean
    comments?: boolean
    reposts?: boolean
    saveds?: boolean
    post_id?: boolean
    permalink?: boolean
    source_id?: boolean
    rev?: boolean
    date?: boolean
    twitter_profiles?: boolean | twitter_action_stats$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_action_stats"]>

  export type twitter_action_statsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    likes?: boolean
    views?: boolean
    comments?: boolean
    reposts?: boolean
    saveds?: boolean
    post_id?: boolean
    permalink?: boolean
    source_id?: boolean
    rev?: boolean
    date?: boolean
    twitter_profiles?: boolean | twitter_action_stats$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_action_stats"]>

  export type twitter_action_statsSelectScalar = {
    id?: boolean
    likes?: boolean
    views?: boolean
    comments?: boolean
    reposts?: boolean
    saveds?: boolean
    post_id?: boolean
    permalink?: boolean
    source_id?: boolean
    rev?: boolean
    date?: boolean
  }

  export type twitter_action_statsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_action_stats$twitter_profilesArgs<ExtArgs>
  }
  export type twitter_action_statsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_action_stats$twitter_profilesArgs<ExtArgs>
  }

  export type $twitter_action_statsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_action_stats"
    objects: {
      twitter_profiles: Prisma.$twitter_profilesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      likes: number | null
      views: number | null
      comments: number | null
      reposts: number | null
      saveds: number | null
      post_id: number | null
      permalink: string | null
      source_id: number | null
      rev: number | null
      date: Date | null
    }, ExtArgs["result"]["twitter_action_stats"]>
    composites: {}
  }

  type twitter_action_statsGetPayload<S extends boolean | null | undefined | twitter_action_statsDefaultArgs> = $Result.GetResult<Prisma.$twitter_action_statsPayload, S>

  type twitter_action_statsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_action_statsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_action_statsCountAggregateInputType | true
    }

  export interface twitter_action_statsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_action_stats'], meta: { name: 'twitter_action_stats' } }
    /**
     * Find zero or one Twitter_action_stats that matches the filter.
     * @param {twitter_action_statsFindUniqueArgs} args - Arguments to find a Twitter_action_stats
     * @example
     * // Get one Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_action_statsFindUniqueArgs>(args: SelectSubset<T, twitter_action_statsFindUniqueArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_action_stats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_action_statsFindUniqueOrThrowArgs} args - Arguments to find a Twitter_action_stats
     * @example
     * // Get one Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_action_statsFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_action_statsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_action_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_action_statsFindFirstArgs} args - Arguments to find a Twitter_action_stats
     * @example
     * // Get one Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_action_statsFindFirstArgs>(args?: SelectSubset<T, twitter_action_statsFindFirstArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_action_stats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_action_statsFindFirstOrThrowArgs} args - Arguments to find a Twitter_action_stats
     * @example
     * // Get one Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_action_statsFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_action_statsFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_action_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_action_statsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.findMany()
     * 
     * // Get first 10 Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_action_statsWithIdOnly = await prisma.twitter_action_stats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_action_statsFindManyArgs>(args?: SelectSubset<T, twitter_action_statsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_action_stats.
     * @param {twitter_action_statsCreateArgs} args - Arguments to create a Twitter_action_stats.
     * @example
     * // Create one Twitter_action_stats
     * const Twitter_action_stats = await prisma.twitter_action_stats.create({
     *   data: {
     *     // ... data to create a Twitter_action_stats
     *   }
     * })
     * 
     */
    create<T extends twitter_action_statsCreateArgs>(args: SelectSubset<T, twitter_action_statsCreateArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_action_stats.
     * @param {twitter_action_statsCreateManyArgs} args - Arguments to create many Twitter_action_stats.
     * @example
     * // Create many Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_action_statsCreateManyArgs>(args?: SelectSubset<T, twitter_action_statsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_action_stats and returns the data saved in the database.
     * @param {twitter_action_statsCreateManyAndReturnArgs} args - Arguments to create many Twitter_action_stats.
     * @example
     * // Create many Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_action_stats and only return the `id`
     * const twitter_action_statsWithIdOnly = await prisma.twitter_action_stats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_action_statsCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_action_statsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_action_stats.
     * @param {twitter_action_statsDeleteArgs} args - Arguments to delete one Twitter_action_stats.
     * @example
     * // Delete one Twitter_action_stats
     * const Twitter_action_stats = await prisma.twitter_action_stats.delete({
     *   where: {
     *     // ... filter to delete one Twitter_action_stats
     *   }
     * })
     * 
     */
    delete<T extends twitter_action_statsDeleteArgs>(args: SelectSubset<T, twitter_action_statsDeleteArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_action_stats.
     * @param {twitter_action_statsUpdateArgs} args - Arguments to update one Twitter_action_stats.
     * @example
     * // Update one Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_action_statsUpdateArgs>(args: SelectSubset<T, twitter_action_statsUpdateArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_action_stats.
     * @param {twitter_action_statsDeleteManyArgs} args - Arguments to filter Twitter_action_stats to delete.
     * @example
     * // Delete a few Twitter_action_stats
     * const { count } = await prisma.twitter_action_stats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_action_statsDeleteManyArgs>(args?: SelectSubset<T, twitter_action_statsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_action_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_action_statsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_action_statsUpdateManyArgs>(args: SelectSubset<T, twitter_action_statsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_action_stats.
     * @param {twitter_action_statsUpsertArgs} args - Arguments to update or create a Twitter_action_stats.
     * @example
     * // Update or create a Twitter_action_stats
     * const twitter_action_stats = await prisma.twitter_action_stats.upsert({
     *   create: {
     *     // ... data to create a Twitter_action_stats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_action_stats we want to update
     *   }
     * })
     */
    upsert<T extends twitter_action_statsUpsertArgs>(args: SelectSubset<T, twitter_action_statsUpsertArgs<ExtArgs>>): Prisma__twitter_action_statsClient<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_action_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_action_statsCountArgs} args - Arguments to filter Twitter_action_stats to count.
     * @example
     * // Count the number of Twitter_action_stats
     * const count = await prisma.twitter_action_stats.count({
     *   where: {
     *     // ... the filter for the Twitter_action_stats we want to count
     *   }
     * })
    **/
    count<T extends twitter_action_statsCountArgs>(
      args?: Subset<T, twitter_action_statsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_action_statsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_action_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_action_statsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_action_statsAggregateArgs>(args: Subset<T, Twitter_action_statsAggregateArgs>): Prisma.PrismaPromise<GetTwitter_action_statsAggregateType<T>>

    /**
     * Group by Twitter_action_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_action_statsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_action_statsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_action_statsGroupByArgs['orderBy'] }
        : { orderBy?: twitter_action_statsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_action_statsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_action_statsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_action_stats model
   */
  readonly fields: twitter_action_statsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_action_stats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_action_statsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    twitter_profiles<T extends twitter_action_stats$twitter_profilesArgs<ExtArgs> = {}>(args?: Subset<T, twitter_action_stats$twitter_profilesArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_action_stats model
   */ 
  interface twitter_action_statsFieldRefs {
    readonly id: FieldRef<"twitter_action_stats", 'Int'>
    readonly likes: FieldRef<"twitter_action_stats", 'Int'>
    readonly views: FieldRef<"twitter_action_stats", 'Int'>
    readonly comments: FieldRef<"twitter_action_stats", 'Int'>
    readonly reposts: FieldRef<"twitter_action_stats", 'Int'>
    readonly saveds: FieldRef<"twitter_action_stats", 'Int'>
    readonly post_id: FieldRef<"twitter_action_stats", 'Int'>
    readonly permalink: FieldRef<"twitter_action_stats", 'String'>
    readonly source_id: FieldRef<"twitter_action_stats", 'Int'>
    readonly rev: FieldRef<"twitter_action_stats", 'Int'>
    readonly date: FieldRef<"twitter_action_stats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * twitter_action_stats findUnique
   */
  export type twitter_action_statsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_action_stats to fetch.
     */
    where: twitter_action_statsWhereUniqueInput
  }

  /**
   * twitter_action_stats findUniqueOrThrow
   */
  export type twitter_action_statsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_action_stats to fetch.
     */
    where: twitter_action_statsWhereUniqueInput
  }

  /**
   * twitter_action_stats findFirst
   */
  export type twitter_action_statsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_action_stats to fetch.
     */
    where?: twitter_action_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_action_stats to fetch.
     */
    orderBy?: twitter_action_statsOrderByWithRelationInput | twitter_action_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_action_stats.
     */
    cursor?: twitter_action_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_action_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_action_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_action_stats.
     */
    distinct?: Twitter_action_statsScalarFieldEnum | Twitter_action_statsScalarFieldEnum[]
  }

  /**
   * twitter_action_stats findFirstOrThrow
   */
  export type twitter_action_statsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_action_stats to fetch.
     */
    where?: twitter_action_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_action_stats to fetch.
     */
    orderBy?: twitter_action_statsOrderByWithRelationInput | twitter_action_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_action_stats.
     */
    cursor?: twitter_action_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_action_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_action_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_action_stats.
     */
    distinct?: Twitter_action_statsScalarFieldEnum | Twitter_action_statsScalarFieldEnum[]
  }

  /**
   * twitter_action_stats findMany
   */
  export type twitter_action_statsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_action_stats to fetch.
     */
    where?: twitter_action_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_action_stats to fetch.
     */
    orderBy?: twitter_action_statsOrderByWithRelationInput | twitter_action_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_action_stats.
     */
    cursor?: twitter_action_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_action_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_action_stats.
     */
    skip?: number
    distinct?: Twitter_action_statsScalarFieldEnum | Twitter_action_statsScalarFieldEnum[]
  }

  /**
   * twitter_action_stats create
   */
  export type twitter_action_statsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * The data needed to create a twitter_action_stats.
     */
    data?: XOR<twitter_action_statsCreateInput, twitter_action_statsUncheckedCreateInput>
  }

  /**
   * twitter_action_stats createMany
   */
  export type twitter_action_statsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_action_stats.
     */
    data: twitter_action_statsCreateManyInput | twitter_action_statsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_action_stats createManyAndReturn
   */
  export type twitter_action_statsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_action_stats.
     */
    data: twitter_action_statsCreateManyInput | twitter_action_statsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * twitter_action_stats update
   */
  export type twitter_action_statsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * The data needed to update a twitter_action_stats.
     */
    data: XOR<twitter_action_statsUpdateInput, twitter_action_statsUncheckedUpdateInput>
    /**
     * Choose, which twitter_action_stats to update.
     */
    where: twitter_action_statsWhereUniqueInput
  }

  /**
   * twitter_action_stats updateMany
   */
  export type twitter_action_statsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_action_stats.
     */
    data: XOR<twitter_action_statsUpdateManyMutationInput, twitter_action_statsUncheckedUpdateManyInput>
    /**
     * Filter which twitter_action_stats to update
     */
    where?: twitter_action_statsWhereInput
  }

  /**
   * twitter_action_stats upsert
   */
  export type twitter_action_statsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * The filter to search for the twitter_action_stats to update in case it exists.
     */
    where: twitter_action_statsWhereUniqueInput
    /**
     * In case the twitter_action_stats found by the `where` argument doesn't exist, create a new twitter_action_stats with this data.
     */
    create: XOR<twitter_action_statsCreateInput, twitter_action_statsUncheckedCreateInput>
    /**
     * In case the twitter_action_stats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_action_statsUpdateInput, twitter_action_statsUncheckedUpdateInput>
  }

  /**
   * twitter_action_stats delete
   */
  export type twitter_action_statsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    /**
     * Filter which twitter_action_stats to delete.
     */
    where: twitter_action_statsWhereUniqueInput
  }

  /**
   * twitter_action_stats deleteMany
   */
  export type twitter_action_statsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_action_stats to delete
     */
    where?: twitter_action_statsWhereInput
  }

  /**
   * twitter_action_stats.twitter_profiles
   */
  export type twitter_action_stats$twitter_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    where?: twitter_profilesWhereInput
  }

  /**
   * twitter_action_stats without action
   */
  export type twitter_action_statsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
  }


  /**
   * Model twitter_posts
   */

  export type AggregateTwitter_posts = {
    _count: Twitter_postsCountAggregateOutputType | null
    _avg: Twitter_postsAvgAggregateOutputType | null
    _sum: Twitter_postsSumAggregateOutputType | null
    _min: Twitter_postsMinAggregateOutputType | null
    _max: Twitter_postsMaxAggregateOutputType | null
  }

  export type Twitter_postsAvgAggregateOutputType = {
    id: number | null
    lang_proba: Decimal | null
    source_id: number | null
    mlready: number | null
  }

  export type Twitter_postsSumAggregateOutputType = {
    id: number | null
    lang_proba: Decimal | null
    source_id: number | null
    mlready: number | null
  }

  export type Twitter_postsMinAggregateOutputType = {
    id: number | null
    title: string | null
    plain_content: string | null
    publish_date: Date | null
    lang: string | null
    lang_proba: Decimal | null
    date: Date | null
    source_id: number | null
    permalink: string | null
    mlready: number | null
  }

  export type Twitter_postsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    plain_content: string | null
    publish_date: Date | null
    lang: string | null
    lang_proba: Decimal | null
    date: Date | null
    source_id: number | null
    permalink: string | null
    mlready: number | null
  }

  export type Twitter_postsCountAggregateOutputType = {
    id: number
    title: number
    plain_content: number
    image_data: number
    publish_date: number
    lang: number
    lang_proba: number
    date: number
    source_id: number
    permalink: number
    mlready: number
    _all: number
  }


  export type Twitter_postsAvgAggregateInputType = {
    id?: true
    lang_proba?: true
    source_id?: true
    mlready?: true
  }

  export type Twitter_postsSumAggregateInputType = {
    id?: true
    lang_proba?: true
    source_id?: true
    mlready?: true
  }

  export type Twitter_postsMinAggregateInputType = {
    id?: true
    title?: true
    plain_content?: true
    publish_date?: true
    lang?: true
    lang_proba?: true
    date?: true
    source_id?: true
    permalink?: true
    mlready?: true
  }

  export type Twitter_postsMaxAggregateInputType = {
    id?: true
    title?: true
    plain_content?: true
    publish_date?: true
    lang?: true
    lang_proba?: true
    date?: true
    source_id?: true
    permalink?: true
    mlready?: true
  }

  export type Twitter_postsCountAggregateInputType = {
    id?: true
    title?: true
    plain_content?: true
    image_data?: true
    publish_date?: true
    lang?: true
    lang_proba?: true
    date?: true
    source_id?: true
    permalink?: true
    mlready?: true
    _all?: true
  }

  export type Twitter_postsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_posts to aggregate.
     */
    where?: twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_posts to fetch.
     */
    orderBy?: twitter_postsOrderByWithRelationInput | twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_posts
    **/
    _count?: true | Twitter_postsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_postsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_postsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_postsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_postsMaxAggregateInputType
  }

  export type GetTwitter_postsAggregateType<T extends Twitter_postsAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_posts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_posts[P]>
      : GetScalarType<T[P], AggregateTwitter_posts[P]>
  }




  export type twitter_postsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_postsWhereInput
    orderBy?: twitter_postsOrderByWithAggregationInput | twitter_postsOrderByWithAggregationInput[]
    by: Twitter_postsScalarFieldEnum[] | Twitter_postsScalarFieldEnum
    having?: twitter_postsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_postsCountAggregateInputType | true
    _avg?: Twitter_postsAvgAggregateInputType
    _sum?: Twitter_postsSumAggregateInputType
    _min?: Twitter_postsMinAggregateInputType
    _max?: Twitter_postsMaxAggregateInputType
  }

  export type Twitter_postsGroupByOutputType = {
    id: number
    title: string | null
    plain_content: string | null
    image_data: string[]
    publish_date: Date | null
    lang: string | null
    lang_proba: Decimal | null
    date: Date
    source_id: number | null
    permalink: string | null
    mlready: number
    _count: Twitter_postsCountAggregateOutputType | null
    _avg: Twitter_postsAvgAggregateOutputType | null
    _sum: Twitter_postsSumAggregateOutputType | null
    _min: Twitter_postsMinAggregateOutputType | null
    _max: Twitter_postsMaxAggregateOutputType | null
  }

  type GetTwitter_postsGroupByPayload<T extends twitter_postsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_postsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_postsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_postsGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_postsGroupByOutputType[P]>
        }
      >
    >


  export type twitter_postsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    plain_content?: boolean
    image_data?: boolean
    publish_date?: boolean
    lang?: boolean
    lang_proba?: boolean
    date?: boolean
    source_id?: boolean
    permalink?: boolean
    mlready?: boolean
    twitter_profiles?: boolean | twitter_posts$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_posts"]>

  export type twitter_postsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    plain_content?: boolean
    image_data?: boolean
    publish_date?: boolean
    lang?: boolean
    lang_proba?: boolean
    date?: boolean
    source_id?: boolean
    permalink?: boolean
    mlready?: boolean
    twitter_profiles?: boolean | twitter_posts$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_posts"]>

  export type twitter_postsSelectScalar = {
    id?: boolean
    title?: boolean
    plain_content?: boolean
    image_data?: boolean
    publish_date?: boolean
    lang?: boolean
    lang_proba?: boolean
    date?: boolean
    source_id?: boolean
    permalink?: boolean
    mlready?: boolean
  }

  export type twitter_postsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_posts$twitter_profilesArgs<ExtArgs>
  }
  export type twitter_postsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_posts$twitter_profilesArgs<ExtArgs>
  }

  export type $twitter_postsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_posts"
    objects: {
      twitter_profiles: Prisma.$twitter_profilesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string | null
      plain_content: string | null
      image_data: string[]
      publish_date: Date | null
      lang: string | null
      lang_proba: Prisma.Decimal | null
      date: Date
      source_id: number | null
      permalink: string | null
      mlready: number
    }, ExtArgs["result"]["twitter_posts"]>
    composites: {}
  }

  type twitter_postsGetPayload<S extends boolean | null | undefined | twitter_postsDefaultArgs> = $Result.GetResult<Prisma.$twitter_postsPayload, S>

  type twitter_postsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_postsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_postsCountAggregateInputType | true
    }

  export interface twitter_postsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_posts'], meta: { name: 'twitter_posts' } }
    /**
     * Find zero or one Twitter_posts that matches the filter.
     * @param {twitter_postsFindUniqueArgs} args - Arguments to find a Twitter_posts
     * @example
     * // Get one Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_postsFindUniqueArgs>(args: SelectSubset<T, twitter_postsFindUniqueArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_posts that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_postsFindUniqueOrThrowArgs} args - Arguments to find a Twitter_posts
     * @example
     * // Get one Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_postsFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_postsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_postsFindFirstArgs} args - Arguments to find a Twitter_posts
     * @example
     * // Get one Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_postsFindFirstArgs>(args?: SelectSubset<T, twitter_postsFindFirstArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_posts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_postsFindFirstOrThrowArgs} args - Arguments to find a Twitter_posts
     * @example
     * // Get one Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_postsFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_postsFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_postsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.findMany()
     * 
     * // Get first 10 Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_postsWithIdOnly = await prisma.twitter_posts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_postsFindManyArgs>(args?: SelectSubset<T, twitter_postsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_posts.
     * @param {twitter_postsCreateArgs} args - Arguments to create a Twitter_posts.
     * @example
     * // Create one Twitter_posts
     * const Twitter_posts = await prisma.twitter_posts.create({
     *   data: {
     *     // ... data to create a Twitter_posts
     *   }
     * })
     * 
     */
    create<T extends twitter_postsCreateArgs>(args: SelectSubset<T, twitter_postsCreateArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_posts.
     * @param {twitter_postsCreateManyArgs} args - Arguments to create many Twitter_posts.
     * @example
     * // Create many Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_postsCreateManyArgs>(args?: SelectSubset<T, twitter_postsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_posts and returns the data saved in the database.
     * @param {twitter_postsCreateManyAndReturnArgs} args - Arguments to create many Twitter_posts.
     * @example
     * // Create many Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_posts and only return the `id`
     * const twitter_postsWithIdOnly = await prisma.twitter_posts.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_postsCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_postsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_posts.
     * @param {twitter_postsDeleteArgs} args - Arguments to delete one Twitter_posts.
     * @example
     * // Delete one Twitter_posts
     * const Twitter_posts = await prisma.twitter_posts.delete({
     *   where: {
     *     // ... filter to delete one Twitter_posts
     *   }
     * })
     * 
     */
    delete<T extends twitter_postsDeleteArgs>(args: SelectSubset<T, twitter_postsDeleteArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_posts.
     * @param {twitter_postsUpdateArgs} args - Arguments to update one Twitter_posts.
     * @example
     * // Update one Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_postsUpdateArgs>(args: SelectSubset<T, twitter_postsUpdateArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_posts.
     * @param {twitter_postsDeleteManyArgs} args - Arguments to filter Twitter_posts to delete.
     * @example
     * // Delete a few Twitter_posts
     * const { count } = await prisma.twitter_posts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_postsDeleteManyArgs>(args?: SelectSubset<T, twitter_postsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_postsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_postsUpdateManyArgs>(args: SelectSubset<T, twitter_postsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_posts.
     * @param {twitter_postsUpsertArgs} args - Arguments to update or create a Twitter_posts.
     * @example
     * // Update or create a Twitter_posts
     * const twitter_posts = await prisma.twitter_posts.upsert({
     *   create: {
     *     // ... data to create a Twitter_posts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_posts we want to update
     *   }
     * })
     */
    upsert<T extends twitter_postsUpsertArgs>(args: SelectSubset<T, twitter_postsUpsertArgs<ExtArgs>>): Prisma__twitter_postsClient<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_postsCountArgs} args - Arguments to filter Twitter_posts to count.
     * @example
     * // Count the number of Twitter_posts
     * const count = await prisma.twitter_posts.count({
     *   where: {
     *     // ... the filter for the Twitter_posts we want to count
     *   }
     * })
    **/
    count<T extends twitter_postsCountArgs>(
      args?: Subset<T, twitter_postsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_postsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_postsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_postsAggregateArgs>(args: Subset<T, Twitter_postsAggregateArgs>): Prisma.PrismaPromise<GetTwitter_postsAggregateType<T>>

    /**
     * Group by Twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_postsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_postsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_postsGroupByArgs['orderBy'] }
        : { orderBy?: twitter_postsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_postsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_postsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_posts model
   */
  readonly fields: twitter_postsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_posts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_postsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    twitter_profiles<T extends twitter_posts$twitter_profilesArgs<ExtArgs> = {}>(args?: Subset<T, twitter_posts$twitter_profilesArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_posts model
   */ 
  interface twitter_postsFieldRefs {
    readonly id: FieldRef<"twitter_posts", 'Int'>
    readonly title: FieldRef<"twitter_posts", 'String'>
    readonly plain_content: FieldRef<"twitter_posts", 'String'>
    readonly image_data: FieldRef<"twitter_posts", 'String[]'>
    readonly publish_date: FieldRef<"twitter_posts", 'DateTime'>
    readonly lang: FieldRef<"twitter_posts", 'String'>
    readonly lang_proba: FieldRef<"twitter_posts", 'Decimal'>
    readonly date: FieldRef<"twitter_posts", 'DateTime'>
    readonly source_id: FieldRef<"twitter_posts", 'Int'>
    readonly permalink: FieldRef<"twitter_posts", 'String'>
    readonly mlready: FieldRef<"twitter_posts", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * twitter_posts findUnique
   */
  export type twitter_postsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_posts to fetch.
     */
    where: twitter_postsWhereUniqueInput
  }

  /**
   * twitter_posts findUniqueOrThrow
   */
  export type twitter_postsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_posts to fetch.
     */
    where: twitter_postsWhereUniqueInput
  }

  /**
   * twitter_posts findFirst
   */
  export type twitter_postsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_posts to fetch.
     */
    where?: twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_posts to fetch.
     */
    orderBy?: twitter_postsOrderByWithRelationInput | twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_posts.
     */
    cursor?: twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_posts.
     */
    distinct?: Twitter_postsScalarFieldEnum | Twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_posts findFirstOrThrow
   */
  export type twitter_postsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_posts to fetch.
     */
    where?: twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_posts to fetch.
     */
    orderBy?: twitter_postsOrderByWithRelationInput | twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_posts.
     */
    cursor?: twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_posts.
     */
    distinct?: Twitter_postsScalarFieldEnum | Twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_posts findMany
   */
  export type twitter_postsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_posts to fetch.
     */
    where?: twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_posts to fetch.
     */
    orderBy?: twitter_postsOrderByWithRelationInput | twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_posts.
     */
    cursor?: twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_posts.
     */
    skip?: number
    distinct?: Twitter_postsScalarFieldEnum | Twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_posts create
   */
  export type twitter_postsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * The data needed to create a twitter_posts.
     */
    data: XOR<twitter_postsCreateInput, twitter_postsUncheckedCreateInput>
  }

  /**
   * twitter_posts createMany
   */
  export type twitter_postsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_posts.
     */
    data: twitter_postsCreateManyInput | twitter_postsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_posts createManyAndReturn
   */
  export type twitter_postsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_posts.
     */
    data: twitter_postsCreateManyInput | twitter_postsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * twitter_posts update
   */
  export type twitter_postsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * The data needed to update a twitter_posts.
     */
    data: XOR<twitter_postsUpdateInput, twitter_postsUncheckedUpdateInput>
    /**
     * Choose, which twitter_posts to update.
     */
    where: twitter_postsWhereUniqueInput
  }

  /**
   * twitter_posts updateMany
   */
  export type twitter_postsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_posts.
     */
    data: XOR<twitter_postsUpdateManyMutationInput, twitter_postsUncheckedUpdateManyInput>
    /**
     * Filter which twitter_posts to update
     */
    where?: twitter_postsWhereInput
  }

  /**
   * twitter_posts upsert
   */
  export type twitter_postsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * The filter to search for the twitter_posts to update in case it exists.
     */
    where: twitter_postsWhereUniqueInput
    /**
     * In case the twitter_posts found by the `where` argument doesn't exist, create a new twitter_posts with this data.
     */
    create: XOR<twitter_postsCreateInput, twitter_postsUncheckedCreateInput>
    /**
     * In case the twitter_posts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_postsUpdateInput, twitter_postsUncheckedUpdateInput>
  }

  /**
   * twitter_posts delete
   */
  export type twitter_postsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    /**
     * Filter which twitter_posts to delete.
     */
    where: twitter_postsWhereUniqueInput
  }

  /**
   * twitter_posts deleteMany
   */
  export type twitter_postsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_posts to delete
     */
    where?: twitter_postsWhereInput
  }

  /**
   * twitter_posts.twitter_profiles
   */
  export type twitter_posts$twitter_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    where?: twitter_profilesWhereInput
  }

  /**
   * twitter_posts without action
   */
  export type twitter_postsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
  }


  /**
   * Model twitter_profiles
   */

  export type AggregateTwitter_profiles = {
    _count: Twitter_profilesCountAggregateOutputType | null
    _avg: Twitter_profilesAvgAggregateOutputType | null
    _sum: Twitter_profilesSumAggregateOutputType | null
    _min: Twitter_profilesMinAggregateOutputType | null
    _max: Twitter_profilesMaxAggregateOutputType | null
  }

  export type Twitter_profilesAvgAggregateOutputType = {
    id: number | null
    active: number | null
  }

  export type Twitter_profilesSumAggregateOutputType = {
    id: number | null
    active: number | null
  }

  export type Twitter_profilesMinAggregateOutputType = {
    id: number | null
    type: string | null
    name: string | null
    profiles_id: string | null
    active: number | null
    updated: Date | null
  }

  export type Twitter_profilesMaxAggregateOutputType = {
    id: number | null
    type: string | null
    name: string | null
    profiles_id: string | null
    active: number | null
    updated: Date | null
  }

  export type Twitter_profilesCountAggregateOutputType = {
    id: number
    type: number
    name: number
    profiles_id: number
    active: number
    updated: number
    _all: number
  }


  export type Twitter_profilesAvgAggregateInputType = {
    id?: true
    active?: true
  }

  export type Twitter_profilesSumAggregateInputType = {
    id?: true
    active?: true
  }

  export type Twitter_profilesMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    profiles_id?: true
    active?: true
    updated?: true
  }

  export type Twitter_profilesMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    profiles_id?: true
    active?: true
    updated?: true
  }

  export type Twitter_profilesCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    profiles_id?: true
    active?: true
    updated?: true
    _all?: true
  }

  export type Twitter_profilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles to aggregate.
     */
    where?: twitter_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles to fetch.
     */
    orderBy?: twitter_profilesOrderByWithRelationInput | twitter_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_profiles
    **/
    _count?: true | Twitter_profilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_profilesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_profilesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_profilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_profilesMaxAggregateInputType
  }

  export type GetTwitter_profilesAggregateType<T extends Twitter_profilesAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_profiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_profiles[P]>
      : GetScalarType<T[P], AggregateTwitter_profiles[P]>
  }




  export type twitter_profilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_profilesWhereInput
    orderBy?: twitter_profilesOrderByWithAggregationInput | twitter_profilesOrderByWithAggregationInput[]
    by: Twitter_profilesScalarFieldEnum[] | Twitter_profilesScalarFieldEnum
    having?: twitter_profilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_profilesCountAggregateInputType | true
    _avg?: Twitter_profilesAvgAggregateInputType
    _sum?: Twitter_profilesSumAggregateInputType
    _min?: Twitter_profilesMinAggregateInputType
    _max?: Twitter_profilesMaxAggregateInputType
  }

  export type Twitter_profilesGroupByOutputType = {
    id: number
    type: string | null
    name: string | null
    profiles_id: string | null
    active: number | null
    updated: Date | null
    _count: Twitter_profilesCountAggregateOutputType | null
    _avg: Twitter_profilesAvgAggregateOutputType | null
    _sum: Twitter_profilesSumAggregateOutputType | null
    _min: Twitter_profilesMinAggregateOutputType | null
    _max: Twitter_profilesMaxAggregateOutputType | null
  }

  type GetTwitter_profilesGroupByPayload<T extends twitter_profilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_profilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_profilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_profilesGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_profilesGroupByOutputType[P]>
        }
      >
    >


  export type twitter_profilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    profiles_id?: boolean
    active?: boolean
    updated?: boolean
    twitter_action_stats?: boolean | twitter_profiles$twitter_action_statsArgs<ExtArgs>
    twitter_posts?: boolean | twitter_profiles$twitter_postsArgs<ExtArgs>
    twitter_profiles_stats?: boolean | twitter_profiles$twitter_profiles_statsArgs<ExtArgs>
    twitter_profiles_twitter_posts?: boolean | twitter_profiles$twitter_profiles_twitter_postsArgs<ExtArgs>
    _count?: boolean | Twitter_profilesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_profiles"]>

  export type twitter_profilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    profiles_id?: boolean
    active?: boolean
    updated?: boolean
  }, ExtArgs["result"]["twitter_profiles"]>

  export type twitter_profilesSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    profiles_id?: boolean
    active?: boolean
    updated?: boolean
  }

  export type twitter_profilesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_action_stats?: boolean | twitter_profiles$twitter_action_statsArgs<ExtArgs>
    twitter_posts?: boolean | twitter_profiles$twitter_postsArgs<ExtArgs>
    twitter_profiles_stats?: boolean | twitter_profiles$twitter_profiles_statsArgs<ExtArgs>
    twitter_profiles_twitter_posts?: boolean | twitter_profiles$twitter_profiles_twitter_postsArgs<ExtArgs>
    _count?: boolean | Twitter_profilesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type twitter_profilesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $twitter_profilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_profiles"
    objects: {
      twitter_action_stats: Prisma.$twitter_action_statsPayload<ExtArgs>[]
      twitter_posts: Prisma.$twitter_postsPayload<ExtArgs>[]
      twitter_profiles_stats: Prisma.$twitter_profiles_statsPayload<ExtArgs>[]
      twitter_profiles_twitter_posts: Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string | null
      name: string | null
      profiles_id: string | null
      active: number | null
      updated: Date | null
    }, ExtArgs["result"]["twitter_profiles"]>
    composites: {}
  }

  type twitter_profilesGetPayload<S extends boolean | null | undefined | twitter_profilesDefaultArgs> = $Result.GetResult<Prisma.$twitter_profilesPayload, S>

  type twitter_profilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_profilesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_profilesCountAggregateInputType | true
    }

  export interface twitter_profilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_profiles'], meta: { name: 'twitter_profiles' } }
    /**
     * Find zero or one Twitter_profiles that matches the filter.
     * @param {twitter_profilesFindUniqueArgs} args - Arguments to find a Twitter_profiles
     * @example
     * // Get one Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_profilesFindUniqueArgs>(args: SelectSubset<T, twitter_profilesFindUniqueArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_profiles that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_profilesFindUniqueOrThrowArgs} args - Arguments to find a Twitter_profiles
     * @example
     * // Get one Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_profilesFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_profilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profilesFindFirstArgs} args - Arguments to find a Twitter_profiles
     * @example
     * // Get one Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_profilesFindFirstArgs>(args?: SelectSubset<T, twitter_profilesFindFirstArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_profiles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profilesFindFirstOrThrowArgs} args - Arguments to find a Twitter_profiles
     * @example
     * // Get one Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_profilesFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_profilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.findMany()
     * 
     * // Get first 10 Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_profilesWithIdOnly = await prisma.twitter_profiles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_profilesFindManyArgs>(args?: SelectSubset<T, twitter_profilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_profiles.
     * @param {twitter_profilesCreateArgs} args - Arguments to create a Twitter_profiles.
     * @example
     * // Create one Twitter_profiles
     * const Twitter_profiles = await prisma.twitter_profiles.create({
     *   data: {
     *     // ... data to create a Twitter_profiles
     *   }
     * })
     * 
     */
    create<T extends twitter_profilesCreateArgs>(args: SelectSubset<T, twitter_profilesCreateArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_profiles.
     * @param {twitter_profilesCreateManyArgs} args - Arguments to create many Twitter_profiles.
     * @example
     * // Create many Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_profilesCreateManyArgs>(args?: SelectSubset<T, twitter_profilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_profiles and returns the data saved in the database.
     * @param {twitter_profilesCreateManyAndReturnArgs} args - Arguments to create many Twitter_profiles.
     * @example
     * // Create many Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_profiles and only return the `id`
     * const twitter_profilesWithIdOnly = await prisma.twitter_profiles.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_profilesCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_profilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_profiles.
     * @param {twitter_profilesDeleteArgs} args - Arguments to delete one Twitter_profiles.
     * @example
     * // Delete one Twitter_profiles
     * const Twitter_profiles = await prisma.twitter_profiles.delete({
     *   where: {
     *     // ... filter to delete one Twitter_profiles
     *   }
     * })
     * 
     */
    delete<T extends twitter_profilesDeleteArgs>(args: SelectSubset<T, twitter_profilesDeleteArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_profiles.
     * @param {twitter_profilesUpdateArgs} args - Arguments to update one Twitter_profiles.
     * @example
     * // Update one Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_profilesUpdateArgs>(args: SelectSubset<T, twitter_profilesUpdateArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_profiles.
     * @param {twitter_profilesDeleteManyArgs} args - Arguments to filter Twitter_profiles to delete.
     * @example
     * // Delete a few Twitter_profiles
     * const { count } = await prisma.twitter_profiles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_profilesDeleteManyArgs>(args?: SelectSubset<T, twitter_profilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_profilesUpdateManyArgs>(args: SelectSubset<T, twitter_profilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_profiles.
     * @param {twitter_profilesUpsertArgs} args - Arguments to update or create a Twitter_profiles.
     * @example
     * // Update or create a Twitter_profiles
     * const twitter_profiles = await prisma.twitter_profiles.upsert({
     *   create: {
     *     // ... data to create a Twitter_profiles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_profiles we want to update
     *   }
     * })
     */
    upsert<T extends twitter_profilesUpsertArgs>(args: SelectSubset<T, twitter_profilesUpsertArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profilesCountArgs} args - Arguments to filter Twitter_profiles to count.
     * @example
     * // Count the number of Twitter_profiles
     * const count = await prisma.twitter_profiles.count({
     *   where: {
     *     // ... the filter for the Twitter_profiles we want to count
     *   }
     * })
    **/
    count<T extends twitter_profilesCountArgs>(
      args?: Subset<T, twitter_profilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_profilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_profilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_profilesAggregateArgs>(args: Subset<T, Twitter_profilesAggregateArgs>): Prisma.PrismaPromise<GetTwitter_profilesAggregateType<T>>

    /**
     * Group by Twitter_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profilesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_profilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_profilesGroupByArgs['orderBy'] }
        : { orderBy?: twitter_profilesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_profilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_profilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_profiles model
   */
  readonly fields: twitter_profilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_profiles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_profilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    twitter_action_stats<T extends twitter_profiles$twitter_action_statsArgs<ExtArgs> = {}>(args?: Subset<T, twitter_profiles$twitter_action_statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_action_statsPayload<ExtArgs>, T, "findMany"> | Null>
    twitter_posts<T extends twitter_profiles$twitter_postsArgs<ExtArgs> = {}>(args?: Subset<T, twitter_profiles$twitter_postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_postsPayload<ExtArgs>, T, "findMany"> | Null>
    twitter_profiles_stats<T extends twitter_profiles$twitter_profiles_statsArgs<ExtArgs> = {}>(args?: Subset<T, twitter_profiles$twitter_profiles_statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "findMany"> | Null>
    twitter_profiles_twitter_posts<T extends twitter_profiles$twitter_profiles_twitter_postsArgs<ExtArgs> = {}>(args?: Subset<T, twitter_profiles$twitter_profiles_twitter_postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_profiles model
   */ 
  interface twitter_profilesFieldRefs {
    readonly id: FieldRef<"twitter_profiles", 'Int'>
    readonly type: FieldRef<"twitter_profiles", 'String'>
    readonly name: FieldRef<"twitter_profiles", 'String'>
    readonly profiles_id: FieldRef<"twitter_profiles", 'String'>
    readonly active: FieldRef<"twitter_profiles", 'Int'>
    readonly updated: FieldRef<"twitter_profiles", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * twitter_profiles findUnique
   */
  export type twitter_profilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles to fetch.
     */
    where: twitter_profilesWhereUniqueInput
  }

  /**
   * twitter_profiles findUniqueOrThrow
   */
  export type twitter_profilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles to fetch.
     */
    where: twitter_profilesWhereUniqueInput
  }

  /**
   * twitter_profiles findFirst
   */
  export type twitter_profilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles to fetch.
     */
    where?: twitter_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles to fetch.
     */
    orderBy?: twitter_profilesOrderByWithRelationInput | twitter_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles.
     */
    cursor?: twitter_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles.
     */
    distinct?: Twitter_profilesScalarFieldEnum | Twitter_profilesScalarFieldEnum[]
  }

  /**
   * twitter_profiles findFirstOrThrow
   */
  export type twitter_profilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles to fetch.
     */
    where?: twitter_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles to fetch.
     */
    orderBy?: twitter_profilesOrderByWithRelationInput | twitter_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles.
     */
    cursor?: twitter_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles.
     */
    distinct?: Twitter_profilesScalarFieldEnum | Twitter_profilesScalarFieldEnum[]
  }

  /**
   * twitter_profiles findMany
   */
  export type twitter_profilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles to fetch.
     */
    where?: twitter_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles to fetch.
     */
    orderBy?: twitter_profilesOrderByWithRelationInput | twitter_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_profiles.
     */
    cursor?: twitter_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles.
     */
    skip?: number
    distinct?: Twitter_profilesScalarFieldEnum | Twitter_profilesScalarFieldEnum[]
  }

  /**
   * twitter_profiles create
   */
  export type twitter_profilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * The data needed to create a twitter_profiles.
     */
    data?: XOR<twitter_profilesCreateInput, twitter_profilesUncheckedCreateInput>
  }

  /**
   * twitter_profiles createMany
   */
  export type twitter_profilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_profiles.
     */
    data: twitter_profilesCreateManyInput | twitter_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_profiles createManyAndReturn
   */
  export type twitter_profilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_profiles.
     */
    data: twitter_profilesCreateManyInput | twitter_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_profiles update
   */
  export type twitter_profilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * The data needed to update a twitter_profiles.
     */
    data: XOR<twitter_profilesUpdateInput, twitter_profilesUncheckedUpdateInput>
    /**
     * Choose, which twitter_profiles to update.
     */
    where: twitter_profilesWhereUniqueInput
  }

  /**
   * twitter_profiles updateMany
   */
  export type twitter_profilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_profiles.
     */
    data: XOR<twitter_profilesUpdateManyMutationInput, twitter_profilesUncheckedUpdateManyInput>
    /**
     * Filter which twitter_profiles to update
     */
    where?: twitter_profilesWhereInput
  }

  /**
   * twitter_profiles upsert
   */
  export type twitter_profilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * The filter to search for the twitter_profiles to update in case it exists.
     */
    where: twitter_profilesWhereUniqueInput
    /**
     * In case the twitter_profiles found by the `where` argument doesn't exist, create a new twitter_profiles with this data.
     */
    create: XOR<twitter_profilesCreateInput, twitter_profilesUncheckedCreateInput>
    /**
     * In case the twitter_profiles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_profilesUpdateInput, twitter_profilesUncheckedUpdateInput>
  }

  /**
   * twitter_profiles delete
   */
  export type twitter_profilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    /**
     * Filter which twitter_profiles to delete.
     */
    where: twitter_profilesWhereUniqueInput
  }

  /**
   * twitter_profiles deleteMany
   */
  export type twitter_profilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles to delete
     */
    where?: twitter_profilesWhereInput
  }

  /**
   * twitter_profiles.twitter_action_stats
   */
  export type twitter_profiles$twitter_action_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_action_stats
     */
    select?: twitter_action_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_action_statsInclude<ExtArgs> | null
    where?: twitter_action_statsWhereInput
    orderBy?: twitter_action_statsOrderByWithRelationInput | twitter_action_statsOrderByWithRelationInput[]
    cursor?: twitter_action_statsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Twitter_action_statsScalarFieldEnum | Twitter_action_statsScalarFieldEnum[]
  }

  /**
   * twitter_profiles.twitter_posts
   */
  export type twitter_profiles$twitter_postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_posts
     */
    select?: twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_postsInclude<ExtArgs> | null
    where?: twitter_postsWhereInput
    orderBy?: twitter_postsOrderByWithRelationInput | twitter_postsOrderByWithRelationInput[]
    cursor?: twitter_postsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Twitter_postsScalarFieldEnum | Twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_profiles.twitter_profiles_stats
   */
  export type twitter_profiles$twitter_profiles_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    where?: twitter_profiles_statsWhereInput
    orderBy?: twitter_profiles_statsOrderByWithRelationInput | twitter_profiles_statsOrderByWithRelationInput[]
    cursor?: twitter_profiles_statsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Twitter_profiles_statsScalarFieldEnum | Twitter_profiles_statsScalarFieldEnum[]
  }

  /**
   * twitter_profiles.twitter_profiles_twitter_posts
   */
  export type twitter_profiles$twitter_profiles_twitter_postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    where?: twitter_profiles_twitter_postsWhereInput
    orderBy?: twitter_profiles_twitter_postsOrderByWithRelationInput | twitter_profiles_twitter_postsOrderByWithRelationInput[]
    cursor?: twitter_profiles_twitter_postsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Twitter_profiles_twitter_postsScalarFieldEnum | Twitter_profiles_twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_profiles without action
   */
  export type twitter_profilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
  }


  /**
   * Model twitter_profiles_stats
   */

  export type AggregateTwitter_profiles_stats = {
    _count: Twitter_profiles_statsCountAggregateOutputType | null
    _avg: Twitter_profiles_statsAvgAggregateOutputType | null
    _sum: Twitter_profiles_statsSumAggregateOutputType | null
    _min: Twitter_profiles_statsMinAggregateOutputType | null
    _max: Twitter_profiles_statsMaxAggregateOutputType | null
  }

  export type Twitter_profiles_statsAvgAggregateOutputType = {
    id: number | null
    twitter_profilesid: number | null
    subscription: number | null
  }

  export type Twitter_profiles_statsSumAggregateOutputType = {
    id: number | null
    twitter_profilesid: number | null
    subscription: number | null
  }

  export type Twitter_profiles_statsMinAggregateOutputType = {
    id: number | null
    twitter_profilesid: number | null
    date: Date | null
    subscription: number | null
  }

  export type Twitter_profiles_statsMaxAggregateOutputType = {
    id: number | null
    twitter_profilesid: number | null
    date: Date | null
    subscription: number | null
  }

  export type Twitter_profiles_statsCountAggregateOutputType = {
    id: number
    twitter_profilesid: number
    date: number
    subscription: number
    _all: number
  }


  export type Twitter_profiles_statsAvgAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    subscription?: true
  }

  export type Twitter_profiles_statsSumAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    subscription?: true
  }

  export type Twitter_profiles_statsMinAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    date?: true
    subscription?: true
  }

  export type Twitter_profiles_statsMaxAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    date?: true
    subscription?: true
  }

  export type Twitter_profiles_statsCountAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    date?: true
    subscription?: true
    _all?: true
  }

  export type Twitter_profiles_statsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles_stats to aggregate.
     */
    where?: twitter_profiles_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_stats to fetch.
     */
    orderBy?: twitter_profiles_statsOrderByWithRelationInput | twitter_profiles_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_profiles_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_profiles_stats
    **/
    _count?: true | Twitter_profiles_statsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_profiles_statsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_profiles_statsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_profiles_statsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_profiles_statsMaxAggregateInputType
  }

  export type GetTwitter_profiles_statsAggregateType<T extends Twitter_profiles_statsAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_profiles_stats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_profiles_stats[P]>
      : GetScalarType<T[P], AggregateTwitter_profiles_stats[P]>
  }




  export type twitter_profiles_statsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_profiles_statsWhereInput
    orderBy?: twitter_profiles_statsOrderByWithAggregationInput | twitter_profiles_statsOrderByWithAggregationInput[]
    by: Twitter_profiles_statsScalarFieldEnum[] | Twitter_profiles_statsScalarFieldEnum
    having?: twitter_profiles_statsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_profiles_statsCountAggregateInputType | true
    _avg?: Twitter_profiles_statsAvgAggregateInputType
    _sum?: Twitter_profiles_statsSumAggregateInputType
    _min?: Twitter_profiles_statsMinAggregateInputType
    _max?: Twitter_profiles_statsMaxAggregateInputType
  }

  export type Twitter_profiles_statsGroupByOutputType = {
    id: number
    twitter_profilesid: number | null
    date: Date | null
    subscription: number | null
    _count: Twitter_profiles_statsCountAggregateOutputType | null
    _avg: Twitter_profiles_statsAvgAggregateOutputType | null
    _sum: Twitter_profiles_statsSumAggregateOutputType | null
    _min: Twitter_profiles_statsMinAggregateOutputType | null
    _max: Twitter_profiles_statsMaxAggregateOutputType | null
  }

  type GetTwitter_profiles_statsGroupByPayload<T extends twitter_profiles_statsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_profiles_statsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_profiles_statsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_profiles_statsGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_profiles_statsGroupByOutputType[P]>
        }
      >
    >


  export type twitter_profiles_statsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    twitter_profilesid?: boolean
    date?: boolean
    subscription?: boolean
    twitter_profiles?: boolean | twitter_profiles_stats$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_profiles_stats"]>

  export type twitter_profiles_statsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    twitter_profilesid?: boolean
    date?: boolean
    subscription?: boolean
    twitter_profiles?: boolean | twitter_profiles_stats$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_profiles_stats"]>

  export type twitter_profiles_statsSelectScalar = {
    id?: boolean
    twitter_profilesid?: boolean
    date?: boolean
    subscription?: boolean
  }

  export type twitter_profiles_statsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_profiles_stats$twitter_profilesArgs<ExtArgs>
  }
  export type twitter_profiles_statsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_profiles_stats$twitter_profilesArgs<ExtArgs>
  }

  export type $twitter_profiles_statsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_profiles_stats"
    objects: {
      twitter_profiles: Prisma.$twitter_profilesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      twitter_profilesid: number | null
      date: Date | null
      subscription: number | null
    }, ExtArgs["result"]["twitter_profiles_stats"]>
    composites: {}
  }

  type twitter_profiles_statsGetPayload<S extends boolean | null | undefined | twitter_profiles_statsDefaultArgs> = $Result.GetResult<Prisma.$twitter_profiles_statsPayload, S>

  type twitter_profiles_statsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_profiles_statsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_profiles_statsCountAggregateInputType | true
    }

  export interface twitter_profiles_statsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_profiles_stats'], meta: { name: 'twitter_profiles_stats' } }
    /**
     * Find zero or one Twitter_profiles_stats that matches the filter.
     * @param {twitter_profiles_statsFindUniqueArgs} args - Arguments to find a Twitter_profiles_stats
     * @example
     * // Get one Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_profiles_statsFindUniqueArgs>(args: SelectSubset<T, twitter_profiles_statsFindUniqueArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_profiles_stats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_profiles_statsFindUniqueOrThrowArgs} args - Arguments to find a Twitter_profiles_stats
     * @example
     * // Get one Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_profiles_statsFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_profiles_statsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_profiles_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_statsFindFirstArgs} args - Arguments to find a Twitter_profiles_stats
     * @example
     * // Get one Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_profiles_statsFindFirstArgs>(args?: SelectSubset<T, twitter_profiles_statsFindFirstArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_profiles_stats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_statsFindFirstOrThrowArgs} args - Arguments to find a Twitter_profiles_stats
     * @example
     * // Get one Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_profiles_statsFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_profiles_statsFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_profiles_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_statsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findMany()
     * 
     * // Get first 10 Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_profiles_statsWithIdOnly = await prisma.twitter_profiles_stats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_profiles_statsFindManyArgs>(args?: SelectSubset<T, twitter_profiles_statsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_profiles_stats.
     * @param {twitter_profiles_statsCreateArgs} args - Arguments to create a Twitter_profiles_stats.
     * @example
     * // Create one Twitter_profiles_stats
     * const Twitter_profiles_stats = await prisma.twitter_profiles_stats.create({
     *   data: {
     *     // ... data to create a Twitter_profiles_stats
     *   }
     * })
     * 
     */
    create<T extends twitter_profiles_statsCreateArgs>(args: SelectSubset<T, twitter_profiles_statsCreateArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_profiles_stats.
     * @param {twitter_profiles_statsCreateManyArgs} args - Arguments to create many Twitter_profiles_stats.
     * @example
     * // Create many Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_profiles_statsCreateManyArgs>(args?: SelectSubset<T, twitter_profiles_statsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_profiles_stats and returns the data saved in the database.
     * @param {twitter_profiles_statsCreateManyAndReturnArgs} args - Arguments to create many Twitter_profiles_stats.
     * @example
     * // Create many Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_profiles_stats and only return the `id`
     * const twitter_profiles_statsWithIdOnly = await prisma.twitter_profiles_stats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_profiles_statsCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_profiles_statsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_profiles_stats.
     * @param {twitter_profiles_statsDeleteArgs} args - Arguments to delete one Twitter_profiles_stats.
     * @example
     * // Delete one Twitter_profiles_stats
     * const Twitter_profiles_stats = await prisma.twitter_profiles_stats.delete({
     *   where: {
     *     // ... filter to delete one Twitter_profiles_stats
     *   }
     * })
     * 
     */
    delete<T extends twitter_profiles_statsDeleteArgs>(args: SelectSubset<T, twitter_profiles_statsDeleteArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_profiles_stats.
     * @param {twitter_profiles_statsUpdateArgs} args - Arguments to update one Twitter_profiles_stats.
     * @example
     * // Update one Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_profiles_statsUpdateArgs>(args: SelectSubset<T, twitter_profiles_statsUpdateArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_profiles_stats.
     * @param {twitter_profiles_statsDeleteManyArgs} args - Arguments to filter Twitter_profiles_stats to delete.
     * @example
     * // Delete a few Twitter_profiles_stats
     * const { count } = await prisma.twitter_profiles_stats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_profiles_statsDeleteManyArgs>(args?: SelectSubset<T, twitter_profiles_statsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_profiles_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_statsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_profiles_statsUpdateManyArgs>(args: SelectSubset<T, twitter_profiles_statsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_profiles_stats.
     * @param {twitter_profiles_statsUpsertArgs} args - Arguments to update or create a Twitter_profiles_stats.
     * @example
     * // Update or create a Twitter_profiles_stats
     * const twitter_profiles_stats = await prisma.twitter_profiles_stats.upsert({
     *   create: {
     *     // ... data to create a Twitter_profiles_stats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_profiles_stats we want to update
     *   }
     * })
     */
    upsert<T extends twitter_profiles_statsUpsertArgs>(args: SelectSubset<T, twitter_profiles_statsUpsertArgs<ExtArgs>>): Prisma__twitter_profiles_statsClient<$Result.GetResult<Prisma.$twitter_profiles_statsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_profiles_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_statsCountArgs} args - Arguments to filter Twitter_profiles_stats to count.
     * @example
     * // Count the number of Twitter_profiles_stats
     * const count = await prisma.twitter_profiles_stats.count({
     *   where: {
     *     // ... the filter for the Twitter_profiles_stats we want to count
     *   }
     * })
    **/
    count<T extends twitter_profiles_statsCountArgs>(
      args?: Subset<T, twitter_profiles_statsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_profiles_statsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_profiles_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_profiles_statsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_profiles_statsAggregateArgs>(args: Subset<T, Twitter_profiles_statsAggregateArgs>): Prisma.PrismaPromise<GetTwitter_profiles_statsAggregateType<T>>

    /**
     * Group by Twitter_profiles_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_statsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_profiles_statsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_profiles_statsGroupByArgs['orderBy'] }
        : { orderBy?: twitter_profiles_statsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_profiles_statsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_profiles_statsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_profiles_stats model
   */
  readonly fields: twitter_profiles_statsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_profiles_stats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_profiles_statsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    twitter_profiles<T extends twitter_profiles_stats$twitter_profilesArgs<ExtArgs> = {}>(args?: Subset<T, twitter_profiles_stats$twitter_profilesArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_profiles_stats model
   */ 
  interface twitter_profiles_statsFieldRefs {
    readonly id: FieldRef<"twitter_profiles_stats", 'Int'>
    readonly twitter_profilesid: FieldRef<"twitter_profiles_stats", 'Int'>
    readonly date: FieldRef<"twitter_profiles_stats", 'DateTime'>
    readonly subscription: FieldRef<"twitter_profiles_stats", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * twitter_profiles_stats findUnique
   */
  export type twitter_profiles_statsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_stats to fetch.
     */
    where: twitter_profiles_statsWhereUniqueInput
  }

  /**
   * twitter_profiles_stats findUniqueOrThrow
   */
  export type twitter_profiles_statsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_stats to fetch.
     */
    where: twitter_profiles_statsWhereUniqueInput
  }

  /**
   * twitter_profiles_stats findFirst
   */
  export type twitter_profiles_statsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_stats to fetch.
     */
    where?: twitter_profiles_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_stats to fetch.
     */
    orderBy?: twitter_profiles_statsOrderByWithRelationInput | twitter_profiles_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles_stats.
     */
    cursor?: twitter_profiles_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles_stats.
     */
    distinct?: Twitter_profiles_statsScalarFieldEnum | Twitter_profiles_statsScalarFieldEnum[]
  }

  /**
   * twitter_profiles_stats findFirstOrThrow
   */
  export type twitter_profiles_statsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_stats to fetch.
     */
    where?: twitter_profiles_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_stats to fetch.
     */
    orderBy?: twitter_profiles_statsOrderByWithRelationInput | twitter_profiles_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles_stats.
     */
    cursor?: twitter_profiles_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles_stats.
     */
    distinct?: Twitter_profiles_statsScalarFieldEnum | Twitter_profiles_statsScalarFieldEnum[]
  }

  /**
   * twitter_profiles_stats findMany
   */
  export type twitter_profiles_statsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_stats to fetch.
     */
    where?: twitter_profiles_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_stats to fetch.
     */
    orderBy?: twitter_profiles_statsOrderByWithRelationInput | twitter_profiles_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_profiles_stats.
     */
    cursor?: twitter_profiles_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_stats.
     */
    skip?: number
    distinct?: Twitter_profiles_statsScalarFieldEnum | Twitter_profiles_statsScalarFieldEnum[]
  }

  /**
   * twitter_profiles_stats create
   */
  export type twitter_profiles_statsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * The data needed to create a twitter_profiles_stats.
     */
    data?: XOR<twitter_profiles_statsCreateInput, twitter_profiles_statsUncheckedCreateInput>
  }

  /**
   * twitter_profiles_stats createMany
   */
  export type twitter_profiles_statsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_profiles_stats.
     */
    data: twitter_profiles_statsCreateManyInput | twitter_profiles_statsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_profiles_stats createManyAndReturn
   */
  export type twitter_profiles_statsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_profiles_stats.
     */
    data: twitter_profiles_statsCreateManyInput | twitter_profiles_statsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * twitter_profiles_stats update
   */
  export type twitter_profiles_statsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * The data needed to update a twitter_profiles_stats.
     */
    data: XOR<twitter_profiles_statsUpdateInput, twitter_profiles_statsUncheckedUpdateInput>
    /**
     * Choose, which twitter_profiles_stats to update.
     */
    where: twitter_profiles_statsWhereUniqueInput
  }

  /**
   * twitter_profiles_stats updateMany
   */
  export type twitter_profiles_statsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_profiles_stats.
     */
    data: XOR<twitter_profiles_statsUpdateManyMutationInput, twitter_profiles_statsUncheckedUpdateManyInput>
    /**
     * Filter which twitter_profiles_stats to update
     */
    where?: twitter_profiles_statsWhereInput
  }

  /**
   * twitter_profiles_stats upsert
   */
  export type twitter_profiles_statsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * The filter to search for the twitter_profiles_stats to update in case it exists.
     */
    where: twitter_profiles_statsWhereUniqueInput
    /**
     * In case the twitter_profiles_stats found by the `where` argument doesn't exist, create a new twitter_profiles_stats with this data.
     */
    create: XOR<twitter_profiles_statsCreateInput, twitter_profiles_statsUncheckedCreateInput>
    /**
     * In case the twitter_profiles_stats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_profiles_statsUpdateInput, twitter_profiles_statsUncheckedUpdateInput>
  }

  /**
   * twitter_profiles_stats delete
   */
  export type twitter_profiles_statsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
    /**
     * Filter which twitter_profiles_stats to delete.
     */
    where: twitter_profiles_statsWhereUniqueInput
  }

  /**
   * twitter_profiles_stats deleteMany
   */
  export type twitter_profiles_statsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles_stats to delete
     */
    where?: twitter_profiles_statsWhereInput
  }

  /**
   * twitter_profiles_stats.twitter_profiles
   */
  export type twitter_profiles_stats$twitter_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    where?: twitter_profilesWhereInput
  }

  /**
   * twitter_profiles_stats without action
   */
  export type twitter_profiles_statsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_stats
     */
    select?: twitter_profiles_statsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_statsInclude<ExtArgs> | null
  }


  /**
   * Model twitter_profiles_temp
   */

  export type AggregateTwitter_profiles_temp = {
    _count: Twitter_profiles_tempCountAggregateOutputType | null
    _avg: Twitter_profiles_tempAvgAggregateOutputType | null
    _sum: Twitter_profiles_tempSumAggregateOutputType | null
    _min: Twitter_profiles_tempMinAggregateOutputType | null
    _max: Twitter_profiles_tempMaxAggregateOutputType | null
  }

  export type Twitter_profiles_tempAvgAggregateOutputType = {
    id: number | null
  }

  export type Twitter_profiles_tempSumAggregateOutputType = {
    id: number | null
  }

  export type Twitter_profiles_tempMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type Twitter_profiles_tempMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type Twitter_profiles_tempCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type Twitter_profiles_tempAvgAggregateInputType = {
    id?: true
  }

  export type Twitter_profiles_tempSumAggregateInputType = {
    id?: true
  }

  export type Twitter_profiles_tempMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type Twitter_profiles_tempMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type Twitter_profiles_tempCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type Twitter_profiles_tempAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles_temp to aggregate.
     */
    where?: twitter_profiles_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_temps to fetch.
     */
    orderBy?: twitter_profiles_tempOrderByWithRelationInput | twitter_profiles_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_profiles_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_profiles_temps
    **/
    _count?: true | Twitter_profiles_tempCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_profiles_tempAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_profiles_tempSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_profiles_tempMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_profiles_tempMaxAggregateInputType
  }

  export type GetTwitter_profiles_tempAggregateType<T extends Twitter_profiles_tempAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_profiles_temp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_profiles_temp[P]>
      : GetScalarType<T[P], AggregateTwitter_profiles_temp[P]>
  }




  export type twitter_profiles_tempGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_profiles_tempWhereInput
    orderBy?: twitter_profiles_tempOrderByWithAggregationInput | twitter_profiles_tempOrderByWithAggregationInput[]
    by: Twitter_profiles_tempScalarFieldEnum[] | Twitter_profiles_tempScalarFieldEnum
    having?: twitter_profiles_tempScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_profiles_tempCountAggregateInputType | true
    _avg?: Twitter_profiles_tempAvgAggregateInputType
    _sum?: Twitter_profiles_tempSumAggregateInputType
    _min?: Twitter_profiles_tempMinAggregateInputType
    _max?: Twitter_profiles_tempMaxAggregateInputType
  }

  export type Twitter_profiles_tempGroupByOutputType = {
    id: number
    name: string | null
    _count: Twitter_profiles_tempCountAggregateOutputType | null
    _avg: Twitter_profiles_tempAvgAggregateOutputType | null
    _sum: Twitter_profiles_tempSumAggregateOutputType | null
    _min: Twitter_profiles_tempMinAggregateOutputType | null
    _max: Twitter_profiles_tempMaxAggregateOutputType | null
  }

  type GetTwitter_profiles_tempGroupByPayload<T extends twitter_profiles_tempGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_profiles_tempGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_profiles_tempGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_profiles_tempGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_profiles_tempGroupByOutputType[P]>
        }
      >
    >


  export type twitter_profiles_tempSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["twitter_profiles_temp"]>

  export type twitter_profiles_tempSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["twitter_profiles_temp"]>

  export type twitter_profiles_tempSelectScalar = {
    id?: boolean
    name?: boolean
  }


  export type $twitter_profiles_tempPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_profiles_temp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
    }, ExtArgs["result"]["twitter_profiles_temp"]>
    composites: {}
  }

  type twitter_profiles_tempGetPayload<S extends boolean | null | undefined | twitter_profiles_tempDefaultArgs> = $Result.GetResult<Prisma.$twitter_profiles_tempPayload, S>

  type twitter_profiles_tempCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_profiles_tempFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_profiles_tempCountAggregateInputType | true
    }

  export interface twitter_profiles_tempDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_profiles_temp'], meta: { name: 'twitter_profiles_temp' } }
    /**
     * Find zero or one Twitter_profiles_temp that matches the filter.
     * @param {twitter_profiles_tempFindUniqueArgs} args - Arguments to find a Twitter_profiles_temp
     * @example
     * // Get one Twitter_profiles_temp
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_profiles_tempFindUniqueArgs>(args: SelectSubset<T, twitter_profiles_tempFindUniqueArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_profiles_temp that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_profiles_tempFindUniqueOrThrowArgs} args - Arguments to find a Twitter_profiles_temp
     * @example
     * // Get one Twitter_profiles_temp
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_profiles_tempFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_profiles_tempFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_profiles_temp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_tempFindFirstArgs} args - Arguments to find a Twitter_profiles_temp
     * @example
     * // Get one Twitter_profiles_temp
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_profiles_tempFindFirstArgs>(args?: SelectSubset<T, twitter_profiles_tempFindFirstArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_profiles_temp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_tempFindFirstOrThrowArgs} args - Arguments to find a Twitter_profiles_temp
     * @example
     * // Get one Twitter_profiles_temp
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_profiles_tempFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_profiles_tempFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_profiles_temps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_tempFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_profiles_temps
     * const twitter_profiles_temps = await prisma.twitter_profiles_temp.findMany()
     * 
     * // Get first 10 Twitter_profiles_temps
     * const twitter_profiles_temps = await prisma.twitter_profiles_temp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_profiles_tempWithIdOnly = await prisma.twitter_profiles_temp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_profiles_tempFindManyArgs>(args?: SelectSubset<T, twitter_profiles_tempFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_profiles_temp.
     * @param {twitter_profiles_tempCreateArgs} args - Arguments to create a Twitter_profiles_temp.
     * @example
     * // Create one Twitter_profiles_temp
     * const Twitter_profiles_temp = await prisma.twitter_profiles_temp.create({
     *   data: {
     *     // ... data to create a Twitter_profiles_temp
     *   }
     * })
     * 
     */
    create<T extends twitter_profiles_tempCreateArgs>(args: SelectSubset<T, twitter_profiles_tempCreateArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_profiles_temps.
     * @param {twitter_profiles_tempCreateManyArgs} args - Arguments to create many Twitter_profiles_temps.
     * @example
     * // Create many Twitter_profiles_temps
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_profiles_tempCreateManyArgs>(args?: SelectSubset<T, twitter_profiles_tempCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_profiles_temps and returns the data saved in the database.
     * @param {twitter_profiles_tempCreateManyAndReturnArgs} args - Arguments to create many Twitter_profiles_temps.
     * @example
     * // Create many Twitter_profiles_temps
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_profiles_temps and only return the `id`
     * const twitter_profiles_tempWithIdOnly = await prisma.twitter_profiles_temp.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_profiles_tempCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_profiles_tempCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_profiles_temp.
     * @param {twitter_profiles_tempDeleteArgs} args - Arguments to delete one Twitter_profiles_temp.
     * @example
     * // Delete one Twitter_profiles_temp
     * const Twitter_profiles_temp = await prisma.twitter_profiles_temp.delete({
     *   where: {
     *     // ... filter to delete one Twitter_profiles_temp
     *   }
     * })
     * 
     */
    delete<T extends twitter_profiles_tempDeleteArgs>(args: SelectSubset<T, twitter_profiles_tempDeleteArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_profiles_temp.
     * @param {twitter_profiles_tempUpdateArgs} args - Arguments to update one Twitter_profiles_temp.
     * @example
     * // Update one Twitter_profiles_temp
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_profiles_tempUpdateArgs>(args: SelectSubset<T, twitter_profiles_tempUpdateArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_profiles_temps.
     * @param {twitter_profiles_tempDeleteManyArgs} args - Arguments to filter Twitter_profiles_temps to delete.
     * @example
     * // Delete a few Twitter_profiles_temps
     * const { count } = await prisma.twitter_profiles_temp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_profiles_tempDeleteManyArgs>(args?: SelectSubset<T, twitter_profiles_tempDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_profiles_temps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_tempUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_profiles_temps
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_profiles_tempUpdateManyArgs>(args: SelectSubset<T, twitter_profiles_tempUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_profiles_temp.
     * @param {twitter_profiles_tempUpsertArgs} args - Arguments to update or create a Twitter_profiles_temp.
     * @example
     * // Update or create a Twitter_profiles_temp
     * const twitter_profiles_temp = await prisma.twitter_profiles_temp.upsert({
     *   create: {
     *     // ... data to create a Twitter_profiles_temp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_profiles_temp we want to update
     *   }
     * })
     */
    upsert<T extends twitter_profiles_tempUpsertArgs>(args: SelectSubset<T, twitter_profiles_tempUpsertArgs<ExtArgs>>): Prisma__twitter_profiles_tempClient<$Result.GetResult<Prisma.$twitter_profiles_tempPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_profiles_temps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_tempCountArgs} args - Arguments to filter Twitter_profiles_temps to count.
     * @example
     * // Count the number of Twitter_profiles_temps
     * const count = await prisma.twitter_profiles_temp.count({
     *   where: {
     *     // ... the filter for the Twitter_profiles_temps we want to count
     *   }
     * })
    **/
    count<T extends twitter_profiles_tempCountArgs>(
      args?: Subset<T, twitter_profiles_tempCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_profiles_tempCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_profiles_temp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_profiles_tempAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_profiles_tempAggregateArgs>(args: Subset<T, Twitter_profiles_tempAggregateArgs>): Prisma.PrismaPromise<GetTwitter_profiles_tempAggregateType<T>>

    /**
     * Group by Twitter_profiles_temp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_tempGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_profiles_tempGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_profiles_tempGroupByArgs['orderBy'] }
        : { orderBy?: twitter_profiles_tempGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_profiles_tempGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_profiles_tempGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_profiles_temp model
   */
  readonly fields: twitter_profiles_tempFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_profiles_temp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_profiles_tempClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_profiles_temp model
   */ 
  interface twitter_profiles_tempFieldRefs {
    readonly id: FieldRef<"twitter_profiles_temp", 'Int'>
    readonly name: FieldRef<"twitter_profiles_temp", 'String'>
  }
    

  // Custom InputTypes
  /**
   * twitter_profiles_temp findUnique
   */
  export type twitter_profiles_tempFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_temp to fetch.
     */
    where: twitter_profiles_tempWhereUniqueInput
  }

  /**
   * twitter_profiles_temp findUniqueOrThrow
   */
  export type twitter_profiles_tempFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_temp to fetch.
     */
    where: twitter_profiles_tempWhereUniqueInput
  }

  /**
   * twitter_profiles_temp findFirst
   */
  export type twitter_profiles_tempFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_temp to fetch.
     */
    where?: twitter_profiles_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_temps to fetch.
     */
    orderBy?: twitter_profiles_tempOrderByWithRelationInput | twitter_profiles_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles_temps.
     */
    cursor?: twitter_profiles_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles_temps.
     */
    distinct?: Twitter_profiles_tempScalarFieldEnum | Twitter_profiles_tempScalarFieldEnum[]
  }

  /**
   * twitter_profiles_temp findFirstOrThrow
   */
  export type twitter_profiles_tempFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_temp to fetch.
     */
    where?: twitter_profiles_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_temps to fetch.
     */
    orderBy?: twitter_profiles_tempOrderByWithRelationInput | twitter_profiles_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles_temps.
     */
    cursor?: twitter_profiles_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_temps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles_temps.
     */
    distinct?: Twitter_profiles_tempScalarFieldEnum | Twitter_profiles_tempScalarFieldEnum[]
  }

  /**
   * twitter_profiles_temp findMany
   */
  export type twitter_profiles_tempFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_temps to fetch.
     */
    where?: twitter_profiles_tempWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_temps to fetch.
     */
    orderBy?: twitter_profiles_tempOrderByWithRelationInput | twitter_profiles_tempOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_profiles_temps.
     */
    cursor?: twitter_profiles_tempWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_temps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_temps.
     */
    skip?: number
    distinct?: Twitter_profiles_tempScalarFieldEnum | Twitter_profiles_tempScalarFieldEnum[]
  }

  /**
   * twitter_profiles_temp create
   */
  export type twitter_profiles_tempCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * The data needed to create a twitter_profiles_temp.
     */
    data?: XOR<twitter_profiles_tempCreateInput, twitter_profiles_tempUncheckedCreateInput>
  }

  /**
   * twitter_profiles_temp createMany
   */
  export type twitter_profiles_tempCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_profiles_temps.
     */
    data: twitter_profiles_tempCreateManyInput | twitter_profiles_tempCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_profiles_temp createManyAndReturn
   */
  export type twitter_profiles_tempCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_profiles_temps.
     */
    data: twitter_profiles_tempCreateManyInput | twitter_profiles_tempCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_profiles_temp update
   */
  export type twitter_profiles_tempUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * The data needed to update a twitter_profiles_temp.
     */
    data: XOR<twitter_profiles_tempUpdateInput, twitter_profiles_tempUncheckedUpdateInput>
    /**
     * Choose, which twitter_profiles_temp to update.
     */
    where: twitter_profiles_tempWhereUniqueInput
  }

  /**
   * twitter_profiles_temp updateMany
   */
  export type twitter_profiles_tempUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_profiles_temps.
     */
    data: XOR<twitter_profiles_tempUpdateManyMutationInput, twitter_profiles_tempUncheckedUpdateManyInput>
    /**
     * Filter which twitter_profiles_temps to update
     */
    where?: twitter_profiles_tempWhereInput
  }

  /**
   * twitter_profiles_temp upsert
   */
  export type twitter_profiles_tempUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * The filter to search for the twitter_profiles_temp to update in case it exists.
     */
    where: twitter_profiles_tempWhereUniqueInput
    /**
     * In case the twitter_profiles_temp found by the `where` argument doesn't exist, create a new twitter_profiles_temp with this data.
     */
    create: XOR<twitter_profiles_tempCreateInput, twitter_profiles_tempUncheckedCreateInput>
    /**
     * In case the twitter_profiles_temp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_profiles_tempUpdateInput, twitter_profiles_tempUncheckedUpdateInput>
  }

  /**
   * twitter_profiles_temp delete
   */
  export type twitter_profiles_tempDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
    /**
     * Filter which twitter_profiles_temp to delete.
     */
    where: twitter_profiles_tempWhereUniqueInput
  }

  /**
   * twitter_profiles_temp deleteMany
   */
  export type twitter_profiles_tempDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles_temps to delete
     */
    where?: twitter_profiles_tempWhereInput
  }

  /**
   * twitter_profiles_temp without action
   */
  export type twitter_profiles_tempDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_temp
     */
    select?: twitter_profiles_tempSelect<ExtArgs> | null
  }


  /**
   * Model twitter_profiles_twitter_posts
   */

  export type AggregateTwitter_profiles_twitter_posts = {
    _count: Twitter_profiles_twitter_postsCountAggregateOutputType | null
    _avg: Twitter_profiles_twitter_postsAvgAggregateOutputType | null
    _sum: Twitter_profiles_twitter_postsSumAggregateOutputType | null
    _min: Twitter_profiles_twitter_postsMinAggregateOutputType | null
    _max: Twitter_profiles_twitter_postsMaxAggregateOutputType | null
  }

  export type Twitter_profiles_twitter_postsAvgAggregateOutputType = {
    id: number | null
    twitter_profilesid: number | null
    twitter_postid: number | null
  }

  export type Twitter_profiles_twitter_postsSumAggregateOutputType = {
    id: number | null
    twitter_profilesid: number | null
    twitter_postid: number | null
  }

  export type Twitter_profiles_twitter_postsMinAggregateOutputType = {
    id: number | null
    post_id: string | null
    likes: string | null
    views: string | null
    reposts: string | null
    comments: string | null
    saveds: string | null
    twitter_profilesid: number | null
    twitter_postid: number | null
    isvideo: boolean | null
    is_repost: boolean | null
    source_link: string | null
  }

  export type Twitter_profiles_twitter_postsMaxAggregateOutputType = {
    id: number | null
    post_id: string | null
    likes: string | null
    views: string | null
    reposts: string | null
    comments: string | null
    saveds: string | null
    twitter_profilesid: number | null
    twitter_postid: number | null
    isvideo: boolean | null
    is_repost: boolean | null
    source_link: string | null
  }

  export type Twitter_profiles_twitter_postsCountAggregateOutputType = {
    id: number
    post_id: number
    likes: number
    views: number
    reposts: number
    comments: number
    saveds: number
    twitter_profilesid: number
    twitter_postid: number
    isvideo: number
    is_repost: number
    source_link: number
    _all: number
  }


  export type Twitter_profiles_twitter_postsAvgAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    twitter_postid?: true
  }

  export type Twitter_profiles_twitter_postsSumAggregateInputType = {
    id?: true
    twitter_profilesid?: true
    twitter_postid?: true
  }

  export type Twitter_profiles_twitter_postsMinAggregateInputType = {
    id?: true
    post_id?: true
    likes?: true
    views?: true
    reposts?: true
    comments?: true
    saveds?: true
    twitter_profilesid?: true
    twitter_postid?: true
    isvideo?: true
    is_repost?: true
    source_link?: true
  }

  export type Twitter_profiles_twitter_postsMaxAggregateInputType = {
    id?: true
    post_id?: true
    likes?: true
    views?: true
    reposts?: true
    comments?: true
    saveds?: true
    twitter_profilesid?: true
    twitter_postid?: true
    isvideo?: true
    is_repost?: true
    source_link?: true
  }

  export type Twitter_profiles_twitter_postsCountAggregateInputType = {
    id?: true
    post_id?: true
    likes?: true
    views?: true
    reposts?: true
    comments?: true
    saveds?: true
    twitter_profilesid?: true
    twitter_postid?: true
    isvideo?: true
    is_repost?: true
    source_link?: true
    _all?: true
  }

  export type Twitter_profiles_twitter_postsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles_twitter_posts to aggregate.
     */
    where?: twitter_profiles_twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_twitter_posts to fetch.
     */
    orderBy?: twitter_profiles_twitter_postsOrderByWithRelationInput | twitter_profiles_twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_profiles_twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_twitter_posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_profiles_twitter_posts
    **/
    _count?: true | Twitter_profiles_twitter_postsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_profiles_twitter_postsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_profiles_twitter_postsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_profiles_twitter_postsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_profiles_twitter_postsMaxAggregateInputType
  }

  export type GetTwitter_profiles_twitter_postsAggregateType<T extends Twitter_profiles_twitter_postsAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_profiles_twitter_posts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_profiles_twitter_posts[P]>
      : GetScalarType<T[P], AggregateTwitter_profiles_twitter_posts[P]>
  }




  export type twitter_profiles_twitter_postsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_profiles_twitter_postsWhereInput
    orderBy?: twitter_profiles_twitter_postsOrderByWithAggregationInput | twitter_profiles_twitter_postsOrderByWithAggregationInput[]
    by: Twitter_profiles_twitter_postsScalarFieldEnum[] | Twitter_profiles_twitter_postsScalarFieldEnum
    having?: twitter_profiles_twitter_postsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_profiles_twitter_postsCountAggregateInputType | true
    _avg?: Twitter_profiles_twitter_postsAvgAggregateInputType
    _sum?: Twitter_profiles_twitter_postsSumAggregateInputType
    _min?: Twitter_profiles_twitter_postsMinAggregateInputType
    _max?: Twitter_profiles_twitter_postsMaxAggregateInputType
  }

  export type Twitter_profiles_twitter_postsGroupByOutputType = {
    id: number
    post_id: string
    likes: string | null
    views: string | null
    reposts: string | null
    comments: string | null
    saveds: string | null
    twitter_profilesid: number | null
    twitter_postid: number | null
    isvideo: boolean | null
    is_repost: boolean | null
    source_link: string | null
    _count: Twitter_profiles_twitter_postsCountAggregateOutputType | null
    _avg: Twitter_profiles_twitter_postsAvgAggregateOutputType | null
    _sum: Twitter_profiles_twitter_postsSumAggregateOutputType | null
    _min: Twitter_profiles_twitter_postsMinAggregateOutputType | null
    _max: Twitter_profiles_twitter_postsMaxAggregateOutputType | null
  }

  type GetTwitter_profiles_twitter_postsGroupByPayload<T extends twitter_profiles_twitter_postsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_profiles_twitter_postsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_profiles_twitter_postsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_profiles_twitter_postsGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_profiles_twitter_postsGroupByOutputType[P]>
        }
      >
    >


  export type twitter_profiles_twitter_postsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    post_id?: boolean
    likes?: boolean
    views?: boolean
    reposts?: boolean
    comments?: boolean
    saveds?: boolean
    twitter_profilesid?: boolean
    twitter_postid?: boolean
    isvideo?: boolean
    is_repost?: boolean
    source_link?: boolean
    twitter_profiles?: boolean | twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_profiles_twitter_posts"]>

  export type twitter_profiles_twitter_postsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    post_id?: boolean
    likes?: boolean
    views?: boolean
    reposts?: boolean
    comments?: boolean
    saveds?: boolean
    twitter_profilesid?: boolean
    twitter_postid?: boolean
    isvideo?: boolean
    is_repost?: boolean
    source_link?: boolean
    twitter_profiles?: boolean | twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs>
  }, ExtArgs["result"]["twitter_profiles_twitter_posts"]>

  export type twitter_profiles_twitter_postsSelectScalar = {
    id?: boolean
    post_id?: boolean
    likes?: boolean
    views?: boolean
    reposts?: boolean
    comments?: boolean
    saveds?: boolean
    twitter_profilesid?: boolean
    twitter_postid?: boolean
    isvideo?: boolean
    is_repost?: boolean
    source_link?: boolean
  }

  export type twitter_profiles_twitter_postsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs>
  }
  export type twitter_profiles_twitter_postsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    twitter_profiles?: boolean | twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs>
  }

  export type $twitter_profiles_twitter_postsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_profiles_twitter_posts"
    objects: {
      twitter_profiles: Prisma.$twitter_profilesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      post_id: string
      likes: string | null
      views: string | null
      reposts: string | null
      comments: string | null
      saveds: string | null
      twitter_profilesid: number | null
      twitter_postid: number | null
      isvideo: boolean | null
      is_repost: boolean | null
      source_link: string | null
    }, ExtArgs["result"]["twitter_profiles_twitter_posts"]>
    composites: {}
  }

  type twitter_profiles_twitter_postsGetPayload<S extends boolean | null | undefined | twitter_profiles_twitter_postsDefaultArgs> = $Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload, S>

  type twitter_profiles_twitter_postsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_profiles_twitter_postsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_profiles_twitter_postsCountAggregateInputType | true
    }

  export interface twitter_profiles_twitter_postsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_profiles_twitter_posts'], meta: { name: 'twitter_profiles_twitter_posts' } }
    /**
     * Find zero or one Twitter_profiles_twitter_posts that matches the filter.
     * @param {twitter_profiles_twitter_postsFindUniqueArgs} args - Arguments to find a Twitter_profiles_twitter_posts
     * @example
     * // Get one Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_profiles_twitter_postsFindUniqueArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsFindUniqueArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_profiles_twitter_posts that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_profiles_twitter_postsFindUniqueOrThrowArgs} args - Arguments to find a Twitter_profiles_twitter_posts
     * @example
     * // Get one Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_profiles_twitter_postsFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_profiles_twitter_posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_twitter_postsFindFirstArgs} args - Arguments to find a Twitter_profiles_twitter_posts
     * @example
     * // Get one Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_profiles_twitter_postsFindFirstArgs>(args?: SelectSubset<T, twitter_profiles_twitter_postsFindFirstArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_profiles_twitter_posts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_twitter_postsFindFirstOrThrowArgs} args - Arguments to find a Twitter_profiles_twitter_posts
     * @example
     * // Get one Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_profiles_twitter_postsFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_profiles_twitter_postsFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_profiles_twitter_posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_twitter_postsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findMany()
     * 
     * // Get first 10 Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_profiles_twitter_postsWithIdOnly = await prisma.twitter_profiles_twitter_posts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_profiles_twitter_postsFindManyArgs>(args?: SelectSubset<T, twitter_profiles_twitter_postsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_profiles_twitter_posts.
     * @param {twitter_profiles_twitter_postsCreateArgs} args - Arguments to create a Twitter_profiles_twitter_posts.
     * @example
     * // Create one Twitter_profiles_twitter_posts
     * const Twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.create({
     *   data: {
     *     // ... data to create a Twitter_profiles_twitter_posts
     *   }
     * })
     * 
     */
    create<T extends twitter_profiles_twitter_postsCreateArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsCreateArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_profiles_twitter_posts.
     * @param {twitter_profiles_twitter_postsCreateManyArgs} args - Arguments to create many Twitter_profiles_twitter_posts.
     * @example
     * // Create many Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_profiles_twitter_postsCreateManyArgs>(args?: SelectSubset<T, twitter_profiles_twitter_postsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_profiles_twitter_posts and returns the data saved in the database.
     * @param {twitter_profiles_twitter_postsCreateManyAndReturnArgs} args - Arguments to create many Twitter_profiles_twitter_posts.
     * @example
     * // Create many Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_profiles_twitter_posts and only return the `id`
     * const twitter_profiles_twitter_postsWithIdOnly = await prisma.twitter_profiles_twitter_posts.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_profiles_twitter_postsCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_profiles_twitter_postsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_profiles_twitter_posts.
     * @param {twitter_profiles_twitter_postsDeleteArgs} args - Arguments to delete one Twitter_profiles_twitter_posts.
     * @example
     * // Delete one Twitter_profiles_twitter_posts
     * const Twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.delete({
     *   where: {
     *     // ... filter to delete one Twitter_profiles_twitter_posts
     *   }
     * })
     * 
     */
    delete<T extends twitter_profiles_twitter_postsDeleteArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsDeleteArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_profiles_twitter_posts.
     * @param {twitter_profiles_twitter_postsUpdateArgs} args - Arguments to update one Twitter_profiles_twitter_posts.
     * @example
     * // Update one Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_profiles_twitter_postsUpdateArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsUpdateArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_profiles_twitter_posts.
     * @param {twitter_profiles_twitter_postsDeleteManyArgs} args - Arguments to filter Twitter_profiles_twitter_posts to delete.
     * @example
     * // Delete a few Twitter_profiles_twitter_posts
     * const { count } = await prisma.twitter_profiles_twitter_posts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_profiles_twitter_postsDeleteManyArgs>(args?: SelectSubset<T, twitter_profiles_twitter_postsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_profiles_twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_twitter_postsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_profiles_twitter_postsUpdateManyArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_profiles_twitter_posts.
     * @param {twitter_profiles_twitter_postsUpsertArgs} args - Arguments to update or create a Twitter_profiles_twitter_posts.
     * @example
     * // Update or create a Twitter_profiles_twitter_posts
     * const twitter_profiles_twitter_posts = await prisma.twitter_profiles_twitter_posts.upsert({
     *   create: {
     *     // ... data to create a Twitter_profiles_twitter_posts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_profiles_twitter_posts we want to update
     *   }
     * })
     */
    upsert<T extends twitter_profiles_twitter_postsUpsertArgs>(args: SelectSubset<T, twitter_profiles_twitter_postsUpsertArgs<ExtArgs>>): Prisma__twitter_profiles_twitter_postsClient<$Result.GetResult<Prisma.$twitter_profiles_twitter_postsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_profiles_twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_twitter_postsCountArgs} args - Arguments to filter Twitter_profiles_twitter_posts to count.
     * @example
     * // Count the number of Twitter_profiles_twitter_posts
     * const count = await prisma.twitter_profiles_twitter_posts.count({
     *   where: {
     *     // ... the filter for the Twitter_profiles_twitter_posts we want to count
     *   }
     * })
    **/
    count<T extends twitter_profiles_twitter_postsCountArgs>(
      args?: Subset<T, twitter_profiles_twitter_postsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_profiles_twitter_postsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_profiles_twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_profiles_twitter_postsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_profiles_twitter_postsAggregateArgs>(args: Subset<T, Twitter_profiles_twitter_postsAggregateArgs>): Prisma.PrismaPromise<GetTwitter_profiles_twitter_postsAggregateType<T>>

    /**
     * Group by Twitter_profiles_twitter_posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_profiles_twitter_postsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_profiles_twitter_postsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_profiles_twitter_postsGroupByArgs['orderBy'] }
        : { orderBy?: twitter_profiles_twitter_postsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_profiles_twitter_postsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_profiles_twitter_postsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_profiles_twitter_posts model
   */
  readonly fields: twitter_profiles_twitter_postsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_profiles_twitter_posts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_profiles_twitter_postsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    twitter_profiles<T extends twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs> = {}>(args?: Subset<T, twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs>>): Prisma__twitter_profilesClient<$Result.GetResult<Prisma.$twitter_profilesPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_profiles_twitter_posts model
   */ 
  interface twitter_profiles_twitter_postsFieldRefs {
    readonly id: FieldRef<"twitter_profiles_twitter_posts", 'Int'>
    readonly post_id: FieldRef<"twitter_profiles_twitter_posts", 'String'>
    readonly likes: FieldRef<"twitter_profiles_twitter_posts", 'String'>
    readonly views: FieldRef<"twitter_profiles_twitter_posts", 'String'>
    readonly reposts: FieldRef<"twitter_profiles_twitter_posts", 'String'>
    readonly comments: FieldRef<"twitter_profiles_twitter_posts", 'String'>
    readonly saveds: FieldRef<"twitter_profiles_twitter_posts", 'String'>
    readonly twitter_profilesid: FieldRef<"twitter_profiles_twitter_posts", 'Int'>
    readonly twitter_postid: FieldRef<"twitter_profiles_twitter_posts", 'Int'>
    readonly isvideo: FieldRef<"twitter_profiles_twitter_posts", 'Boolean'>
    readonly is_repost: FieldRef<"twitter_profiles_twitter_posts", 'Boolean'>
    readonly source_link: FieldRef<"twitter_profiles_twitter_posts", 'String'>
  }
    

  // Custom InputTypes
  /**
   * twitter_profiles_twitter_posts findUnique
   */
  export type twitter_profiles_twitter_postsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_twitter_posts to fetch.
     */
    where: twitter_profiles_twitter_postsWhereUniqueInput
  }

  /**
   * twitter_profiles_twitter_posts findUniqueOrThrow
   */
  export type twitter_profiles_twitter_postsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_twitter_posts to fetch.
     */
    where: twitter_profiles_twitter_postsWhereUniqueInput
  }

  /**
   * twitter_profiles_twitter_posts findFirst
   */
  export type twitter_profiles_twitter_postsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_twitter_posts to fetch.
     */
    where?: twitter_profiles_twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_twitter_posts to fetch.
     */
    orderBy?: twitter_profiles_twitter_postsOrderByWithRelationInput | twitter_profiles_twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles_twitter_posts.
     */
    cursor?: twitter_profiles_twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_twitter_posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles_twitter_posts.
     */
    distinct?: Twitter_profiles_twitter_postsScalarFieldEnum | Twitter_profiles_twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_profiles_twitter_posts findFirstOrThrow
   */
  export type twitter_profiles_twitter_postsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_twitter_posts to fetch.
     */
    where?: twitter_profiles_twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_twitter_posts to fetch.
     */
    orderBy?: twitter_profiles_twitter_postsOrderByWithRelationInput | twitter_profiles_twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_profiles_twitter_posts.
     */
    cursor?: twitter_profiles_twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_twitter_posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_profiles_twitter_posts.
     */
    distinct?: Twitter_profiles_twitter_postsScalarFieldEnum | Twitter_profiles_twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_profiles_twitter_posts findMany
   */
  export type twitter_profiles_twitter_postsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * Filter, which twitter_profiles_twitter_posts to fetch.
     */
    where?: twitter_profiles_twitter_postsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_profiles_twitter_posts to fetch.
     */
    orderBy?: twitter_profiles_twitter_postsOrderByWithRelationInput | twitter_profiles_twitter_postsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_profiles_twitter_posts.
     */
    cursor?: twitter_profiles_twitter_postsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_profiles_twitter_posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_profiles_twitter_posts.
     */
    skip?: number
    distinct?: Twitter_profiles_twitter_postsScalarFieldEnum | Twitter_profiles_twitter_postsScalarFieldEnum[]
  }

  /**
   * twitter_profiles_twitter_posts create
   */
  export type twitter_profiles_twitter_postsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * The data needed to create a twitter_profiles_twitter_posts.
     */
    data: XOR<twitter_profiles_twitter_postsCreateInput, twitter_profiles_twitter_postsUncheckedCreateInput>
  }

  /**
   * twitter_profiles_twitter_posts createMany
   */
  export type twitter_profiles_twitter_postsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_profiles_twitter_posts.
     */
    data: twitter_profiles_twitter_postsCreateManyInput | twitter_profiles_twitter_postsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_profiles_twitter_posts createManyAndReturn
   */
  export type twitter_profiles_twitter_postsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_profiles_twitter_posts.
     */
    data: twitter_profiles_twitter_postsCreateManyInput | twitter_profiles_twitter_postsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * twitter_profiles_twitter_posts update
   */
  export type twitter_profiles_twitter_postsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * The data needed to update a twitter_profiles_twitter_posts.
     */
    data: XOR<twitter_profiles_twitter_postsUpdateInput, twitter_profiles_twitter_postsUncheckedUpdateInput>
    /**
     * Choose, which twitter_profiles_twitter_posts to update.
     */
    where: twitter_profiles_twitter_postsWhereUniqueInput
  }

  /**
   * twitter_profiles_twitter_posts updateMany
   */
  export type twitter_profiles_twitter_postsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_profiles_twitter_posts.
     */
    data: XOR<twitter_profiles_twitter_postsUpdateManyMutationInput, twitter_profiles_twitter_postsUncheckedUpdateManyInput>
    /**
     * Filter which twitter_profiles_twitter_posts to update
     */
    where?: twitter_profiles_twitter_postsWhereInput
  }

  /**
   * twitter_profiles_twitter_posts upsert
   */
  export type twitter_profiles_twitter_postsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * The filter to search for the twitter_profiles_twitter_posts to update in case it exists.
     */
    where: twitter_profiles_twitter_postsWhereUniqueInput
    /**
     * In case the twitter_profiles_twitter_posts found by the `where` argument doesn't exist, create a new twitter_profiles_twitter_posts with this data.
     */
    create: XOR<twitter_profiles_twitter_postsCreateInput, twitter_profiles_twitter_postsUncheckedCreateInput>
    /**
     * In case the twitter_profiles_twitter_posts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_profiles_twitter_postsUpdateInput, twitter_profiles_twitter_postsUncheckedUpdateInput>
  }

  /**
   * twitter_profiles_twitter_posts delete
   */
  export type twitter_profiles_twitter_postsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
    /**
     * Filter which twitter_profiles_twitter_posts to delete.
     */
    where: twitter_profiles_twitter_postsWhereUniqueInput
  }

  /**
   * twitter_profiles_twitter_posts deleteMany
   */
  export type twitter_profiles_twitter_postsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_profiles_twitter_posts to delete
     */
    where?: twitter_profiles_twitter_postsWhereInput
  }

  /**
   * twitter_profiles_twitter_posts.twitter_profiles
   */
  export type twitter_profiles_twitter_posts$twitter_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles
     */
    select?: twitter_profilesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profilesInclude<ExtArgs> | null
    where?: twitter_profilesWhereInput
  }

  /**
   * twitter_profiles_twitter_posts without action
   */
  export type twitter_profiles_twitter_postsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_profiles_twitter_posts
     */
    select?: twitter_profiles_twitter_postsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twitter_profiles_twitter_postsInclude<ExtArgs> | null
  }


  /**
   * Model twitter_relation_reply
   */

  export type AggregateTwitter_relation_reply = {
    _count: Twitter_relation_replyCountAggregateOutputType | null
    _avg: Twitter_relation_replyAvgAggregateOutputType | null
    _sum: Twitter_relation_replySumAggregateOutputType | null
    _min: Twitter_relation_replyMinAggregateOutputType | null
    _max: Twitter_relation_replyMaxAggregateOutputType | null
  }

  export type Twitter_relation_replyAvgAggregateOutputType = {
    id: number | null
    replies: number | null
    reposts: number | null
    likes: number | null
    bookmarks: number | null
    views: number | null
  }

  export type Twitter_relation_replySumAggregateOutputType = {
    id: number | null
    replies: number | null
    reposts: number | null
    likes: number | null
    bookmarks: number | null
    views: number | null
  }

  export type Twitter_relation_replyMinAggregateOutputType = {
    id: number | null
    name: string | null
    post_type: string | null
    plain_context: string | null
    replies: number | null
    reposts: number | null
    likes: number | null
    bookmarks: number | null
    views: number | null
    publish_date: Date | null
    post_id: string | null
    source_id: string | null
    reposted_profile: string | null
    root_post: string | null
  }

  export type Twitter_relation_replyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    post_type: string | null
    plain_context: string | null
    replies: number | null
    reposts: number | null
    likes: number | null
    bookmarks: number | null
    views: number | null
    publish_date: Date | null
    post_id: string | null
    source_id: string | null
    reposted_profile: string | null
    root_post: string | null
  }

  export type Twitter_relation_replyCountAggregateOutputType = {
    id: number
    name: number
    post_type: number
    plain_context: number
    replies: number
    reposts: number
    likes: number
    bookmarks: number
    views: number
    publish_date: number
    post_id: number
    source_id: number
    reposted_profile: number
    root_post: number
    _all: number
  }


  export type Twitter_relation_replyAvgAggregateInputType = {
    id?: true
    replies?: true
    reposts?: true
    likes?: true
    bookmarks?: true
    views?: true
  }

  export type Twitter_relation_replySumAggregateInputType = {
    id?: true
    replies?: true
    reposts?: true
    likes?: true
    bookmarks?: true
    views?: true
  }

  export type Twitter_relation_replyMinAggregateInputType = {
    id?: true
    name?: true
    post_type?: true
    plain_context?: true
    replies?: true
    reposts?: true
    likes?: true
    bookmarks?: true
    views?: true
    publish_date?: true
    post_id?: true
    source_id?: true
    reposted_profile?: true
    root_post?: true
  }

  export type Twitter_relation_replyMaxAggregateInputType = {
    id?: true
    name?: true
    post_type?: true
    plain_context?: true
    replies?: true
    reposts?: true
    likes?: true
    bookmarks?: true
    views?: true
    publish_date?: true
    post_id?: true
    source_id?: true
    reposted_profile?: true
    root_post?: true
  }

  export type Twitter_relation_replyCountAggregateInputType = {
    id?: true
    name?: true
    post_type?: true
    plain_context?: true
    replies?: true
    reposts?: true
    likes?: true
    bookmarks?: true
    views?: true
    publish_date?: true
    post_id?: true
    source_id?: true
    reposted_profile?: true
    root_post?: true
    _all?: true
  }

  export type Twitter_relation_replyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_relation_reply to aggregate.
     */
    where?: twitter_relation_replyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relation_replies to fetch.
     */
    orderBy?: twitter_relation_replyOrderByWithRelationInput | twitter_relation_replyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_relation_replyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relation_replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relation_replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_relation_replies
    **/
    _count?: true | Twitter_relation_replyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_relation_replyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_relation_replySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_relation_replyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_relation_replyMaxAggregateInputType
  }

  export type GetTwitter_relation_replyAggregateType<T extends Twitter_relation_replyAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_relation_reply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_relation_reply[P]>
      : GetScalarType<T[P], AggregateTwitter_relation_reply[P]>
  }




  export type twitter_relation_replyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_relation_replyWhereInput
    orderBy?: twitter_relation_replyOrderByWithAggregationInput | twitter_relation_replyOrderByWithAggregationInput[]
    by: Twitter_relation_replyScalarFieldEnum[] | Twitter_relation_replyScalarFieldEnum
    having?: twitter_relation_replyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_relation_replyCountAggregateInputType | true
    _avg?: Twitter_relation_replyAvgAggregateInputType
    _sum?: Twitter_relation_replySumAggregateInputType
    _min?: Twitter_relation_replyMinAggregateInputType
    _max?: Twitter_relation_replyMaxAggregateInputType
  }

  export type Twitter_relation_replyGroupByOutputType = {
    id: number
    name: string | null
    post_type: string | null
    plain_context: string | null
    replies: number | null
    reposts: number | null
    likes: number | null
    bookmarks: number | null
    views: number | null
    publish_date: Date | null
    post_id: string | null
    source_id: string | null
    reposted_profile: string | null
    root_post: string | null
    _count: Twitter_relation_replyCountAggregateOutputType | null
    _avg: Twitter_relation_replyAvgAggregateOutputType | null
    _sum: Twitter_relation_replySumAggregateOutputType | null
    _min: Twitter_relation_replyMinAggregateOutputType | null
    _max: Twitter_relation_replyMaxAggregateOutputType | null
  }

  type GetTwitter_relation_replyGroupByPayload<T extends twitter_relation_replyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_relation_replyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_relation_replyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_relation_replyGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_relation_replyGroupByOutputType[P]>
        }
      >
    >


  export type twitter_relation_replySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    post_type?: boolean
    plain_context?: boolean
    replies?: boolean
    reposts?: boolean
    likes?: boolean
    bookmarks?: boolean
    views?: boolean
    publish_date?: boolean
    post_id?: boolean
    source_id?: boolean
    reposted_profile?: boolean
    root_post?: boolean
  }, ExtArgs["result"]["twitter_relation_reply"]>

  export type twitter_relation_replySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    post_type?: boolean
    plain_context?: boolean
    replies?: boolean
    reposts?: boolean
    likes?: boolean
    bookmarks?: boolean
    views?: boolean
    publish_date?: boolean
    post_id?: boolean
    source_id?: boolean
    reposted_profile?: boolean
    root_post?: boolean
  }, ExtArgs["result"]["twitter_relation_reply"]>

  export type twitter_relation_replySelectScalar = {
    id?: boolean
    name?: boolean
    post_type?: boolean
    plain_context?: boolean
    replies?: boolean
    reposts?: boolean
    likes?: boolean
    bookmarks?: boolean
    views?: boolean
    publish_date?: boolean
    post_id?: boolean
    source_id?: boolean
    reposted_profile?: boolean
    root_post?: boolean
  }


  export type $twitter_relation_replyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_relation_reply"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      post_type: string | null
      plain_context: string | null
      replies: number | null
      reposts: number | null
      likes: number | null
      bookmarks: number | null
      views: number | null
      publish_date: Date | null
      post_id: string | null
      source_id: string | null
      reposted_profile: string | null
      root_post: string | null
    }, ExtArgs["result"]["twitter_relation_reply"]>
    composites: {}
  }

  type twitter_relation_replyGetPayload<S extends boolean | null | undefined | twitter_relation_replyDefaultArgs> = $Result.GetResult<Prisma.$twitter_relation_replyPayload, S>

  type twitter_relation_replyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_relation_replyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_relation_replyCountAggregateInputType | true
    }

  export interface twitter_relation_replyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_relation_reply'], meta: { name: 'twitter_relation_reply' } }
    /**
     * Find zero or one Twitter_relation_reply that matches the filter.
     * @param {twitter_relation_replyFindUniqueArgs} args - Arguments to find a Twitter_relation_reply
     * @example
     * // Get one Twitter_relation_reply
     * const twitter_relation_reply = await prisma.twitter_relation_reply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_relation_replyFindUniqueArgs>(args: SelectSubset<T, twitter_relation_replyFindUniqueArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_relation_reply that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_relation_replyFindUniqueOrThrowArgs} args - Arguments to find a Twitter_relation_reply
     * @example
     * // Get one Twitter_relation_reply
     * const twitter_relation_reply = await prisma.twitter_relation_reply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_relation_replyFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_relation_replyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_relation_reply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relation_replyFindFirstArgs} args - Arguments to find a Twitter_relation_reply
     * @example
     * // Get one Twitter_relation_reply
     * const twitter_relation_reply = await prisma.twitter_relation_reply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_relation_replyFindFirstArgs>(args?: SelectSubset<T, twitter_relation_replyFindFirstArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_relation_reply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relation_replyFindFirstOrThrowArgs} args - Arguments to find a Twitter_relation_reply
     * @example
     * // Get one Twitter_relation_reply
     * const twitter_relation_reply = await prisma.twitter_relation_reply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_relation_replyFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_relation_replyFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_relation_replies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relation_replyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_relation_replies
     * const twitter_relation_replies = await prisma.twitter_relation_reply.findMany()
     * 
     * // Get first 10 Twitter_relation_replies
     * const twitter_relation_replies = await prisma.twitter_relation_reply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_relation_replyWithIdOnly = await prisma.twitter_relation_reply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_relation_replyFindManyArgs>(args?: SelectSubset<T, twitter_relation_replyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_relation_reply.
     * @param {twitter_relation_replyCreateArgs} args - Arguments to create a Twitter_relation_reply.
     * @example
     * // Create one Twitter_relation_reply
     * const Twitter_relation_reply = await prisma.twitter_relation_reply.create({
     *   data: {
     *     // ... data to create a Twitter_relation_reply
     *   }
     * })
     * 
     */
    create<T extends twitter_relation_replyCreateArgs>(args: SelectSubset<T, twitter_relation_replyCreateArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_relation_replies.
     * @param {twitter_relation_replyCreateManyArgs} args - Arguments to create many Twitter_relation_replies.
     * @example
     * // Create many Twitter_relation_replies
     * const twitter_relation_reply = await prisma.twitter_relation_reply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_relation_replyCreateManyArgs>(args?: SelectSubset<T, twitter_relation_replyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_relation_replies and returns the data saved in the database.
     * @param {twitter_relation_replyCreateManyAndReturnArgs} args - Arguments to create many Twitter_relation_replies.
     * @example
     * // Create many Twitter_relation_replies
     * const twitter_relation_reply = await prisma.twitter_relation_reply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_relation_replies and only return the `id`
     * const twitter_relation_replyWithIdOnly = await prisma.twitter_relation_reply.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_relation_replyCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_relation_replyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_relation_reply.
     * @param {twitter_relation_replyDeleteArgs} args - Arguments to delete one Twitter_relation_reply.
     * @example
     * // Delete one Twitter_relation_reply
     * const Twitter_relation_reply = await prisma.twitter_relation_reply.delete({
     *   where: {
     *     // ... filter to delete one Twitter_relation_reply
     *   }
     * })
     * 
     */
    delete<T extends twitter_relation_replyDeleteArgs>(args: SelectSubset<T, twitter_relation_replyDeleteArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_relation_reply.
     * @param {twitter_relation_replyUpdateArgs} args - Arguments to update one Twitter_relation_reply.
     * @example
     * // Update one Twitter_relation_reply
     * const twitter_relation_reply = await prisma.twitter_relation_reply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_relation_replyUpdateArgs>(args: SelectSubset<T, twitter_relation_replyUpdateArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_relation_replies.
     * @param {twitter_relation_replyDeleteManyArgs} args - Arguments to filter Twitter_relation_replies to delete.
     * @example
     * // Delete a few Twitter_relation_replies
     * const { count } = await prisma.twitter_relation_reply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_relation_replyDeleteManyArgs>(args?: SelectSubset<T, twitter_relation_replyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_relation_replies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relation_replyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_relation_replies
     * const twitter_relation_reply = await prisma.twitter_relation_reply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_relation_replyUpdateManyArgs>(args: SelectSubset<T, twitter_relation_replyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_relation_reply.
     * @param {twitter_relation_replyUpsertArgs} args - Arguments to update or create a Twitter_relation_reply.
     * @example
     * // Update or create a Twitter_relation_reply
     * const twitter_relation_reply = await prisma.twitter_relation_reply.upsert({
     *   create: {
     *     // ... data to create a Twitter_relation_reply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_relation_reply we want to update
     *   }
     * })
     */
    upsert<T extends twitter_relation_replyUpsertArgs>(args: SelectSubset<T, twitter_relation_replyUpsertArgs<ExtArgs>>): Prisma__twitter_relation_replyClient<$Result.GetResult<Prisma.$twitter_relation_replyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_relation_replies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relation_replyCountArgs} args - Arguments to filter Twitter_relation_replies to count.
     * @example
     * // Count the number of Twitter_relation_replies
     * const count = await prisma.twitter_relation_reply.count({
     *   where: {
     *     // ... the filter for the Twitter_relation_replies we want to count
     *   }
     * })
    **/
    count<T extends twitter_relation_replyCountArgs>(
      args?: Subset<T, twitter_relation_replyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_relation_replyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_relation_reply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_relation_replyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_relation_replyAggregateArgs>(args: Subset<T, Twitter_relation_replyAggregateArgs>): Prisma.PrismaPromise<GetTwitter_relation_replyAggregateType<T>>

    /**
     * Group by Twitter_relation_reply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relation_replyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_relation_replyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_relation_replyGroupByArgs['orderBy'] }
        : { orderBy?: twitter_relation_replyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_relation_replyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_relation_replyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_relation_reply model
   */
  readonly fields: twitter_relation_replyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_relation_reply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_relation_replyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_relation_reply model
   */ 
  interface twitter_relation_replyFieldRefs {
    readonly id: FieldRef<"twitter_relation_reply", 'Int'>
    readonly name: FieldRef<"twitter_relation_reply", 'String'>
    readonly post_type: FieldRef<"twitter_relation_reply", 'String'>
    readonly plain_context: FieldRef<"twitter_relation_reply", 'String'>
    readonly replies: FieldRef<"twitter_relation_reply", 'Int'>
    readonly reposts: FieldRef<"twitter_relation_reply", 'Int'>
    readonly likes: FieldRef<"twitter_relation_reply", 'Int'>
    readonly bookmarks: FieldRef<"twitter_relation_reply", 'Int'>
    readonly views: FieldRef<"twitter_relation_reply", 'Int'>
    readonly publish_date: FieldRef<"twitter_relation_reply", 'DateTime'>
    readonly post_id: FieldRef<"twitter_relation_reply", 'String'>
    readonly source_id: FieldRef<"twitter_relation_reply", 'String'>
    readonly reposted_profile: FieldRef<"twitter_relation_reply", 'String'>
    readonly root_post: FieldRef<"twitter_relation_reply", 'String'>
  }
    

  // Custom InputTypes
  /**
   * twitter_relation_reply findUnique
   */
  export type twitter_relation_replyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * Filter, which twitter_relation_reply to fetch.
     */
    where: twitter_relation_replyWhereUniqueInput
  }

  /**
   * twitter_relation_reply findUniqueOrThrow
   */
  export type twitter_relation_replyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * Filter, which twitter_relation_reply to fetch.
     */
    where: twitter_relation_replyWhereUniqueInput
  }

  /**
   * twitter_relation_reply findFirst
   */
  export type twitter_relation_replyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * Filter, which twitter_relation_reply to fetch.
     */
    where?: twitter_relation_replyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relation_replies to fetch.
     */
    orderBy?: twitter_relation_replyOrderByWithRelationInput | twitter_relation_replyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_relation_replies.
     */
    cursor?: twitter_relation_replyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relation_replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relation_replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_relation_replies.
     */
    distinct?: Twitter_relation_replyScalarFieldEnum | Twitter_relation_replyScalarFieldEnum[]
  }

  /**
   * twitter_relation_reply findFirstOrThrow
   */
  export type twitter_relation_replyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * Filter, which twitter_relation_reply to fetch.
     */
    where?: twitter_relation_replyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relation_replies to fetch.
     */
    orderBy?: twitter_relation_replyOrderByWithRelationInput | twitter_relation_replyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_relation_replies.
     */
    cursor?: twitter_relation_replyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relation_replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relation_replies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_relation_replies.
     */
    distinct?: Twitter_relation_replyScalarFieldEnum | Twitter_relation_replyScalarFieldEnum[]
  }

  /**
   * twitter_relation_reply findMany
   */
  export type twitter_relation_replyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * Filter, which twitter_relation_replies to fetch.
     */
    where?: twitter_relation_replyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relation_replies to fetch.
     */
    orderBy?: twitter_relation_replyOrderByWithRelationInput | twitter_relation_replyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_relation_replies.
     */
    cursor?: twitter_relation_replyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relation_replies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relation_replies.
     */
    skip?: number
    distinct?: Twitter_relation_replyScalarFieldEnum | Twitter_relation_replyScalarFieldEnum[]
  }

  /**
   * twitter_relation_reply create
   */
  export type twitter_relation_replyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * The data needed to create a twitter_relation_reply.
     */
    data?: XOR<twitter_relation_replyCreateInput, twitter_relation_replyUncheckedCreateInput>
  }

  /**
   * twitter_relation_reply createMany
   */
  export type twitter_relation_replyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_relation_replies.
     */
    data: twitter_relation_replyCreateManyInput | twitter_relation_replyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_relation_reply createManyAndReturn
   */
  export type twitter_relation_replyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_relation_replies.
     */
    data: twitter_relation_replyCreateManyInput | twitter_relation_replyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_relation_reply update
   */
  export type twitter_relation_replyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * The data needed to update a twitter_relation_reply.
     */
    data: XOR<twitter_relation_replyUpdateInput, twitter_relation_replyUncheckedUpdateInput>
    /**
     * Choose, which twitter_relation_reply to update.
     */
    where: twitter_relation_replyWhereUniqueInput
  }

  /**
   * twitter_relation_reply updateMany
   */
  export type twitter_relation_replyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_relation_replies.
     */
    data: XOR<twitter_relation_replyUpdateManyMutationInput, twitter_relation_replyUncheckedUpdateManyInput>
    /**
     * Filter which twitter_relation_replies to update
     */
    where?: twitter_relation_replyWhereInput
  }

  /**
   * twitter_relation_reply upsert
   */
  export type twitter_relation_replyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * The filter to search for the twitter_relation_reply to update in case it exists.
     */
    where: twitter_relation_replyWhereUniqueInput
    /**
     * In case the twitter_relation_reply found by the `where` argument doesn't exist, create a new twitter_relation_reply with this data.
     */
    create: XOR<twitter_relation_replyCreateInput, twitter_relation_replyUncheckedCreateInput>
    /**
     * In case the twitter_relation_reply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_relation_replyUpdateInput, twitter_relation_replyUncheckedUpdateInput>
  }

  /**
   * twitter_relation_reply delete
   */
  export type twitter_relation_replyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
    /**
     * Filter which twitter_relation_reply to delete.
     */
    where: twitter_relation_replyWhereUniqueInput
  }

  /**
   * twitter_relation_reply deleteMany
   */
  export type twitter_relation_replyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_relation_replies to delete
     */
    where?: twitter_relation_replyWhereInput
  }

  /**
   * twitter_relation_reply without action
   */
  export type twitter_relation_replyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relation_reply
     */
    select?: twitter_relation_replySelect<ExtArgs> | null
  }


  /**
   * Model twitter_relationships_reply_profiles
   */

  export type AggregateTwitter_relationships_reply_profiles = {
    _count: Twitter_relationships_reply_profilesCountAggregateOutputType | null
    _avg: Twitter_relationships_reply_profilesAvgAggregateOutputType | null
    _sum: Twitter_relationships_reply_profilesSumAggregateOutputType | null
    _min: Twitter_relationships_reply_profilesMinAggregateOutputType | null
    _max: Twitter_relationships_reply_profilesMaxAggregateOutputType | null
  }

  export type Twitter_relationships_reply_profilesAvgAggregateOutputType = {
    id: number | null
  }

  export type Twitter_relationships_reply_profilesSumAggregateOutputType = {
    id: number | null
  }

  export type Twitter_relationships_reply_profilesMinAggregateOutputType = {
    id: number | null
    profile_id: string | null
    name: string | null
    username: string | null
    followers_count: string | null
    following_count: string | null
    location: string | null
    birthdate: Date | null
    description: string | null
    joined: Date | null
    url: string | null
    category: string | null
  }

  export type Twitter_relationships_reply_profilesMaxAggregateOutputType = {
    id: number | null
    profile_id: string | null
    name: string | null
    username: string | null
    followers_count: string | null
    following_count: string | null
    location: string | null
    birthdate: Date | null
    description: string | null
    joined: Date | null
    url: string | null
    category: string | null
  }

  export type Twitter_relationships_reply_profilesCountAggregateOutputType = {
    id: number
    profile_id: number
    name: number
    username: number
    followers_count: number
    following_count: number
    location: number
    birthdate: number
    description: number
    joined: number
    url: number
    category: number
    _all: number
  }


  export type Twitter_relationships_reply_profilesAvgAggregateInputType = {
    id?: true
  }

  export type Twitter_relationships_reply_profilesSumAggregateInputType = {
    id?: true
  }

  export type Twitter_relationships_reply_profilesMinAggregateInputType = {
    id?: true
    profile_id?: true
    name?: true
    username?: true
    followers_count?: true
    following_count?: true
    location?: true
    birthdate?: true
    description?: true
    joined?: true
    url?: true
    category?: true
  }

  export type Twitter_relationships_reply_profilesMaxAggregateInputType = {
    id?: true
    profile_id?: true
    name?: true
    username?: true
    followers_count?: true
    following_count?: true
    location?: true
    birthdate?: true
    description?: true
    joined?: true
    url?: true
    category?: true
  }

  export type Twitter_relationships_reply_profilesCountAggregateInputType = {
    id?: true
    profile_id?: true
    name?: true
    username?: true
    followers_count?: true
    following_count?: true
    location?: true
    birthdate?: true
    description?: true
    joined?: true
    url?: true
    category?: true
    _all?: true
  }

  export type Twitter_relationships_reply_profilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_relationships_reply_profiles to aggregate.
     */
    where?: twitter_relationships_reply_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relationships_reply_profiles to fetch.
     */
    orderBy?: twitter_relationships_reply_profilesOrderByWithRelationInput | twitter_relationships_reply_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twitter_relationships_reply_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relationships_reply_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relationships_reply_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twitter_relationships_reply_profiles
    **/
    _count?: true | Twitter_relationships_reply_profilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Twitter_relationships_reply_profilesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Twitter_relationships_reply_profilesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Twitter_relationships_reply_profilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Twitter_relationships_reply_profilesMaxAggregateInputType
  }

  export type GetTwitter_relationships_reply_profilesAggregateType<T extends Twitter_relationships_reply_profilesAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitter_relationships_reply_profiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitter_relationships_reply_profiles[P]>
      : GetScalarType<T[P], AggregateTwitter_relationships_reply_profiles[P]>
  }




  export type twitter_relationships_reply_profilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twitter_relationships_reply_profilesWhereInput
    orderBy?: twitter_relationships_reply_profilesOrderByWithAggregationInput | twitter_relationships_reply_profilesOrderByWithAggregationInput[]
    by: Twitter_relationships_reply_profilesScalarFieldEnum[] | Twitter_relationships_reply_profilesScalarFieldEnum
    having?: twitter_relationships_reply_profilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Twitter_relationships_reply_profilesCountAggregateInputType | true
    _avg?: Twitter_relationships_reply_profilesAvgAggregateInputType
    _sum?: Twitter_relationships_reply_profilesSumAggregateInputType
    _min?: Twitter_relationships_reply_profilesMinAggregateInputType
    _max?: Twitter_relationships_reply_profilesMaxAggregateInputType
  }

  export type Twitter_relationships_reply_profilesGroupByOutputType = {
    id: number
    profile_id: string | null
    name: string | null
    username: string | null
    followers_count: string | null
    following_count: string | null
    location: string | null
    birthdate: Date | null
    description: string | null
    joined: Date | null
    url: string | null
    category: string | null
    _count: Twitter_relationships_reply_profilesCountAggregateOutputType | null
    _avg: Twitter_relationships_reply_profilesAvgAggregateOutputType | null
    _sum: Twitter_relationships_reply_profilesSumAggregateOutputType | null
    _min: Twitter_relationships_reply_profilesMinAggregateOutputType | null
    _max: Twitter_relationships_reply_profilesMaxAggregateOutputType | null
  }

  type GetTwitter_relationships_reply_profilesGroupByPayload<T extends twitter_relationships_reply_profilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Twitter_relationships_reply_profilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Twitter_relationships_reply_profilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Twitter_relationships_reply_profilesGroupByOutputType[P]>
            : GetScalarType<T[P], Twitter_relationships_reply_profilesGroupByOutputType[P]>
        }
      >
    >


  export type twitter_relationships_reply_profilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    name?: boolean
    username?: boolean
    followers_count?: boolean
    following_count?: boolean
    location?: boolean
    birthdate?: boolean
    description?: boolean
    joined?: boolean
    url?: boolean
    category?: boolean
  }, ExtArgs["result"]["twitter_relationships_reply_profiles"]>

  export type twitter_relationships_reply_profilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    name?: boolean
    username?: boolean
    followers_count?: boolean
    following_count?: boolean
    location?: boolean
    birthdate?: boolean
    description?: boolean
    joined?: boolean
    url?: boolean
    category?: boolean
  }, ExtArgs["result"]["twitter_relationships_reply_profiles"]>

  export type twitter_relationships_reply_profilesSelectScalar = {
    id?: boolean
    profile_id?: boolean
    name?: boolean
    username?: boolean
    followers_count?: boolean
    following_count?: boolean
    location?: boolean
    birthdate?: boolean
    description?: boolean
    joined?: boolean
    url?: boolean
    category?: boolean
  }


  export type $twitter_relationships_reply_profilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twitter_relationships_reply_profiles"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      profile_id: string | null
      name: string | null
      username: string | null
      followers_count: string | null
      following_count: string | null
      location: string | null
      birthdate: Date | null
      description: string | null
      joined: Date | null
      url: string | null
      category: string | null
    }, ExtArgs["result"]["twitter_relationships_reply_profiles"]>
    composites: {}
  }

  type twitter_relationships_reply_profilesGetPayload<S extends boolean | null | undefined | twitter_relationships_reply_profilesDefaultArgs> = $Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload, S>

  type twitter_relationships_reply_profilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<twitter_relationships_reply_profilesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Twitter_relationships_reply_profilesCountAggregateInputType | true
    }

  export interface twitter_relationships_reply_profilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twitter_relationships_reply_profiles'], meta: { name: 'twitter_relationships_reply_profiles' } }
    /**
     * Find zero or one Twitter_relationships_reply_profiles that matches the filter.
     * @param {twitter_relationships_reply_profilesFindUniqueArgs} args - Arguments to find a Twitter_relationships_reply_profiles
     * @example
     * // Get one Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twitter_relationships_reply_profilesFindUniqueArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesFindUniqueArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Twitter_relationships_reply_profiles that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {twitter_relationships_reply_profilesFindUniqueOrThrowArgs} args - Arguments to find a Twitter_relationships_reply_profiles
     * @example
     * // Get one Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twitter_relationships_reply_profilesFindUniqueOrThrowArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Twitter_relationships_reply_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relationships_reply_profilesFindFirstArgs} args - Arguments to find a Twitter_relationships_reply_profiles
     * @example
     * // Get one Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twitter_relationships_reply_profilesFindFirstArgs>(args?: SelectSubset<T, twitter_relationships_reply_profilesFindFirstArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Twitter_relationships_reply_profiles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relationships_reply_profilesFindFirstOrThrowArgs} args - Arguments to find a Twitter_relationships_reply_profiles
     * @example
     * // Get one Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twitter_relationships_reply_profilesFindFirstOrThrowArgs>(args?: SelectSubset<T, twitter_relationships_reply_profilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Twitter_relationships_reply_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relationships_reply_profilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findMany()
     * 
     * // Get first 10 Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitter_relationships_reply_profilesWithIdOnly = await prisma.twitter_relationships_reply_profiles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twitter_relationships_reply_profilesFindManyArgs>(args?: SelectSubset<T, twitter_relationships_reply_profilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Twitter_relationships_reply_profiles.
     * @param {twitter_relationships_reply_profilesCreateArgs} args - Arguments to create a Twitter_relationships_reply_profiles.
     * @example
     * // Create one Twitter_relationships_reply_profiles
     * const Twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.create({
     *   data: {
     *     // ... data to create a Twitter_relationships_reply_profiles
     *   }
     * })
     * 
     */
    create<T extends twitter_relationships_reply_profilesCreateArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesCreateArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Twitter_relationships_reply_profiles.
     * @param {twitter_relationships_reply_profilesCreateManyArgs} args - Arguments to create many Twitter_relationships_reply_profiles.
     * @example
     * // Create many Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twitter_relationships_reply_profilesCreateManyArgs>(args?: SelectSubset<T, twitter_relationships_reply_profilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Twitter_relationships_reply_profiles and returns the data saved in the database.
     * @param {twitter_relationships_reply_profilesCreateManyAndReturnArgs} args - Arguments to create many Twitter_relationships_reply_profiles.
     * @example
     * // Create many Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Twitter_relationships_reply_profiles and only return the `id`
     * const twitter_relationships_reply_profilesWithIdOnly = await prisma.twitter_relationships_reply_profiles.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twitter_relationships_reply_profilesCreateManyAndReturnArgs>(args?: SelectSubset<T, twitter_relationships_reply_profilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Twitter_relationships_reply_profiles.
     * @param {twitter_relationships_reply_profilesDeleteArgs} args - Arguments to delete one Twitter_relationships_reply_profiles.
     * @example
     * // Delete one Twitter_relationships_reply_profiles
     * const Twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.delete({
     *   where: {
     *     // ... filter to delete one Twitter_relationships_reply_profiles
     *   }
     * })
     * 
     */
    delete<T extends twitter_relationships_reply_profilesDeleteArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesDeleteArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Twitter_relationships_reply_profiles.
     * @param {twitter_relationships_reply_profilesUpdateArgs} args - Arguments to update one Twitter_relationships_reply_profiles.
     * @example
     * // Update one Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twitter_relationships_reply_profilesUpdateArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesUpdateArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Twitter_relationships_reply_profiles.
     * @param {twitter_relationships_reply_profilesDeleteManyArgs} args - Arguments to filter Twitter_relationships_reply_profiles to delete.
     * @example
     * // Delete a few Twitter_relationships_reply_profiles
     * const { count } = await prisma.twitter_relationships_reply_profiles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twitter_relationships_reply_profilesDeleteManyArgs>(args?: SelectSubset<T, twitter_relationships_reply_profilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Twitter_relationships_reply_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relationships_reply_profilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twitter_relationships_reply_profilesUpdateManyArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Twitter_relationships_reply_profiles.
     * @param {twitter_relationships_reply_profilesUpsertArgs} args - Arguments to update or create a Twitter_relationships_reply_profiles.
     * @example
     * // Update or create a Twitter_relationships_reply_profiles
     * const twitter_relationships_reply_profiles = await prisma.twitter_relationships_reply_profiles.upsert({
     *   create: {
     *     // ... data to create a Twitter_relationships_reply_profiles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Twitter_relationships_reply_profiles we want to update
     *   }
     * })
     */
    upsert<T extends twitter_relationships_reply_profilesUpsertArgs>(args: SelectSubset<T, twitter_relationships_reply_profilesUpsertArgs<ExtArgs>>): Prisma__twitter_relationships_reply_profilesClient<$Result.GetResult<Prisma.$twitter_relationships_reply_profilesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Twitter_relationships_reply_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relationships_reply_profilesCountArgs} args - Arguments to filter Twitter_relationships_reply_profiles to count.
     * @example
     * // Count the number of Twitter_relationships_reply_profiles
     * const count = await prisma.twitter_relationships_reply_profiles.count({
     *   where: {
     *     // ... the filter for the Twitter_relationships_reply_profiles we want to count
     *   }
     * })
    **/
    count<T extends twitter_relationships_reply_profilesCountArgs>(
      args?: Subset<T, twitter_relationships_reply_profilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Twitter_relationships_reply_profilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Twitter_relationships_reply_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Twitter_relationships_reply_profilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Twitter_relationships_reply_profilesAggregateArgs>(args: Subset<T, Twitter_relationships_reply_profilesAggregateArgs>): Prisma.PrismaPromise<GetTwitter_relationships_reply_profilesAggregateType<T>>

    /**
     * Group by Twitter_relationships_reply_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twitter_relationships_reply_profilesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twitter_relationships_reply_profilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twitter_relationships_reply_profilesGroupByArgs['orderBy'] }
        : { orderBy?: twitter_relationships_reply_profilesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twitter_relationships_reply_profilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitter_relationships_reply_profilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twitter_relationships_reply_profiles model
   */
  readonly fields: twitter_relationships_reply_profilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twitter_relationships_reply_profiles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twitter_relationships_reply_profilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twitter_relationships_reply_profiles model
   */ 
  interface twitter_relationships_reply_profilesFieldRefs {
    readonly id: FieldRef<"twitter_relationships_reply_profiles", 'Int'>
    readonly profile_id: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly name: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly username: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly followers_count: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly following_count: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly location: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly birthdate: FieldRef<"twitter_relationships_reply_profiles", 'DateTime'>
    readonly description: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly joined: FieldRef<"twitter_relationships_reply_profiles", 'DateTime'>
    readonly url: FieldRef<"twitter_relationships_reply_profiles", 'String'>
    readonly category: FieldRef<"twitter_relationships_reply_profiles", 'String'>
  }
    

  // Custom InputTypes
  /**
   * twitter_relationships_reply_profiles findUnique
   */
  export type twitter_relationships_reply_profilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * Filter, which twitter_relationships_reply_profiles to fetch.
     */
    where: twitter_relationships_reply_profilesWhereUniqueInput
  }

  /**
   * twitter_relationships_reply_profiles findUniqueOrThrow
   */
  export type twitter_relationships_reply_profilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * Filter, which twitter_relationships_reply_profiles to fetch.
     */
    where: twitter_relationships_reply_profilesWhereUniqueInput
  }

  /**
   * twitter_relationships_reply_profiles findFirst
   */
  export type twitter_relationships_reply_profilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * Filter, which twitter_relationships_reply_profiles to fetch.
     */
    where?: twitter_relationships_reply_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relationships_reply_profiles to fetch.
     */
    orderBy?: twitter_relationships_reply_profilesOrderByWithRelationInput | twitter_relationships_reply_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_relationships_reply_profiles.
     */
    cursor?: twitter_relationships_reply_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relationships_reply_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relationships_reply_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_relationships_reply_profiles.
     */
    distinct?: Twitter_relationships_reply_profilesScalarFieldEnum | Twitter_relationships_reply_profilesScalarFieldEnum[]
  }

  /**
   * twitter_relationships_reply_profiles findFirstOrThrow
   */
  export type twitter_relationships_reply_profilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * Filter, which twitter_relationships_reply_profiles to fetch.
     */
    where?: twitter_relationships_reply_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relationships_reply_profiles to fetch.
     */
    orderBy?: twitter_relationships_reply_profilesOrderByWithRelationInput | twitter_relationships_reply_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twitter_relationships_reply_profiles.
     */
    cursor?: twitter_relationships_reply_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relationships_reply_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relationships_reply_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twitter_relationships_reply_profiles.
     */
    distinct?: Twitter_relationships_reply_profilesScalarFieldEnum | Twitter_relationships_reply_profilesScalarFieldEnum[]
  }

  /**
   * twitter_relationships_reply_profiles findMany
   */
  export type twitter_relationships_reply_profilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * Filter, which twitter_relationships_reply_profiles to fetch.
     */
    where?: twitter_relationships_reply_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twitter_relationships_reply_profiles to fetch.
     */
    orderBy?: twitter_relationships_reply_profilesOrderByWithRelationInput | twitter_relationships_reply_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twitter_relationships_reply_profiles.
     */
    cursor?: twitter_relationships_reply_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twitter_relationships_reply_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twitter_relationships_reply_profiles.
     */
    skip?: number
    distinct?: Twitter_relationships_reply_profilesScalarFieldEnum | Twitter_relationships_reply_profilesScalarFieldEnum[]
  }

  /**
   * twitter_relationships_reply_profiles create
   */
  export type twitter_relationships_reply_profilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * The data needed to create a twitter_relationships_reply_profiles.
     */
    data?: XOR<twitter_relationships_reply_profilesCreateInput, twitter_relationships_reply_profilesUncheckedCreateInput>
  }

  /**
   * twitter_relationships_reply_profiles createMany
   */
  export type twitter_relationships_reply_profilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twitter_relationships_reply_profiles.
     */
    data: twitter_relationships_reply_profilesCreateManyInput | twitter_relationships_reply_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_relationships_reply_profiles createManyAndReturn
   */
  export type twitter_relationships_reply_profilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many twitter_relationships_reply_profiles.
     */
    data: twitter_relationships_reply_profilesCreateManyInput | twitter_relationships_reply_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twitter_relationships_reply_profiles update
   */
  export type twitter_relationships_reply_profilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * The data needed to update a twitter_relationships_reply_profiles.
     */
    data: XOR<twitter_relationships_reply_profilesUpdateInput, twitter_relationships_reply_profilesUncheckedUpdateInput>
    /**
     * Choose, which twitter_relationships_reply_profiles to update.
     */
    where: twitter_relationships_reply_profilesWhereUniqueInput
  }

  /**
   * twitter_relationships_reply_profiles updateMany
   */
  export type twitter_relationships_reply_profilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twitter_relationships_reply_profiles.
     */
    data: XOR<twitter_relationships_reply_profilesUpdateManyMutationInput, twitter_relationships_reply_profilesUncheckedUpdateManyInput>
    /**
     * Filter which twitter_relationships_reply_profiles to update
     */
    where?: twitter_relationships_reply_profilesWhereInput
  }

  /**
   * twitter_relationships_reply_profiles upsert
   */
  export type twitter_relationships_reply_profilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * The filter to search for the twitter_relationships_reply_profiles to update in case it exists.
     */
    where: twitter_relationships_reply_profilesWhereUniqueInput
    /**
     * In case the twitter_relationships_reply_profiles found by the `where` argument doesn't exist, create a new twitter_relationships_reply_profiles with this data.
     */
    create: XOR<twitter_relationships_reply_profilesCreateInput, twitter_relationships_reply_profilesUncheckedCreateInput>
    /**
     * In case the twitter_relationships_reply_profiles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twitter_relationships_reply_profilesUpdateInput, twitter_relationships_reply_profilesUncheckedUpdateInput>
  }

  /**
   * twitter_relationships_reply_profiles delete
   */
  export type twitter_relationships_reply_profilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
    /**
     * Filter which twitter_relationships_reply_profiles to delete.
     */
    where: twitter_relationships_reply_profilesWhereUniqueInput
  }

  /**
   * twitter_relationships_reply_profiles deleteMany
   */
  export type twitter_relationships_reply_profilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twitter_relationships_reply_profiles to delete
     */
    where?: twitter_relationships_reply_profilesWhereInput
  }

  /**
   * twitter_relationships_reply_profiles without action
   */
  export type twitter_relationships_reply_profilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twitter_relationships_reply_profiles
     */
    select?: twitter_relationships_reply_profilesSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Future_sourcesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    count_followers: 'count_followers',
    is_ready: 'is_ready',
    profiles_id: 'profiles_id'
  };

  export type Future_sourcesScalarFieldEnum = (typeof Future_sourcesScalarFieldEnum)[keyof typeof Future_sourcesScalarFieldEnum]


  export const Rss_newsScalarFieldEnum: {
    id: 'id',
    link: 'link',
    publish_date: 'publish_date',
    date: 'date'
  };

  export type Rss_newsScalarFieldEnum = (typeof Rss_newsScalarFieldEnum)[keyof typeof Rss_newsScalarFieldEnum]


  export const Twitter_action_statsScalarFieldEnum: {
    id: 'id',
    likes: 'likes',
    views: 'views',
    comments: 'comments',
    reposts: 'reposts',
    saveds: 'saveds',
    post_id: 'post_id',
    permalink: 'permalink',
    source_id: 'source_id',
    rev: 'rev',
    date: 'date'
  };

  export type Twitter_action_statsScalarFieldEnum = (typeof Twitter_action_statsScalarFieldEnum)[keyof typeof Twitter_action_statsScalarFieldEnum]


  export const Twitter_postsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    plain_content: 'plain_content',
    image_data: 'image_data',
    publish_date: 'publish_date',
    lang: 'lang',
    lang_proba: 'lang_proba',
    date: 'date',
    source_id: 'source_id',
    permalink: 'permalink',
    mlready: 'mlready'
  };

  export type Twitter_postsScalarFieldEnum = (typeof Twitter_postsScalarFieldEnum)[keyof typeof Twitter_postsScalarFieldEnum]


  export const Twitter_profilesScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    profiles_id: 'profiles_id',
    active: 'active',
    updated: 'updated'
  };

  export type Twitter_profilesScalarFieldEnum = (typeof Twitter_profilesScalarFieldEnum)[keyof typeof Twitter_profilesScalarFieldEnum]


  export const Twitter_profiles_statsScalarFieldEnum: {
    id: 'id',
    twitter_profilesid: 'twitter_profilesid',
    date: 'date',
    subscription: 'subscription'
  };

  export type Twitter_profiles_statsScalarFieldEnum = (typeof Twitter_profiles_statsScalarFieldEnum)[keyof typeof Twitter_profiles_statsScalarFieldEnum]


  export const Twitter_profiles_tempScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type Twitter_profiles_tempScalarFieldEnum = (typeof Twitter_profiles_tempScalarFieldEnum)[keyof typeof Twitter_profiles_tempScalarFieldEnum]


  export const Twitter_profiles_twitter_postsScalarFieldEnum: {
    id: 'id',
    post_id: 'post_id',
    likes: 'likes',
    views: 'views',
    reposts: 'reposts',
    comments: 'comments',
    saveds: 'saveds',
    twitter_profilesid: 'twitter_profilesid',
    twitter_postid: 'twitter_postid',
    isvideo: 'isvideo',
    is_repost: 'is_repost',
    source_link: 'source_link'
  };

  export type Twitter_profiles_twitter_postsScalarFieldEnum = (typeof Twitter_profiles_twitter_postsScalarFieldEnum)[keyof typeof Twitter_profiles_twitter_postsScalarFieldEnum]


  export const Twitter_relation_replyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    post_type: 'post_type',
    plain_context: 'plain_context',
    replies: 'replies',
    reposts: 'reposts',
    likes: 'likes',
    bookmarks: 'bookmarks',
    views: 'views',
    publish_date: 'publish_date',
    post_id: 'post_id',
    source_id: 'source_id',
    reposted_profile: 'reposted_profile',
    root_post: 'root_post'
  };

  export type Twitter_relation_replyScalarFieldEnum = (typeof Twitter_relation_replyScalarFieldEnum)[keyof typeof Twitter_relation_replyScalarFieldEnum]


  export const Twitter_relationships_reply_profilesScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
    name: 'name',
    username: 'username',
    followers_count: 'followers_count',
    following_count: 'following_count',
    location: 'location',
    birthdate: 'birthdate',
    description: 'description',
    joined: 'joined',
    url: 'url',
    category: 'category'
  };

  export type Twitter_relationships_reply_profilesScalarFieldEnum = (typeof Twitter_relationships_reply_profilesScalarFieldEnum)[keyof typeof Twitter_relationships_reply_profilesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type future_sourcesWhereInput = {
    AND?: future_sourcesWhereInput | future_sourcesWhereInput[]
    OR?: future_sourcesWhereInput[]
    NOT?: future_sourcesWhereInput | future_sourcesWhereInput[]
    id?: IntFilter<"future_sources"> | number
    name?: StringFilter<"future_sources"> | string
    count_followers?: StringNullableFilter<"future_sources"> | string | null
    is_ready?: BoolNullableFilter<"future_sources"> | boolean | null
    profiles_id?: StringNullableFilter<"future_sources"> | string | null
  }

  export type future_sourcesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    count_followers?: SortOrderInput | SortOrder
    is_ready?: SortOrderInput | SortOrder
    profiles_id?: SortOrderInput | SortOrder
  }

  export type future_sourcesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: future_sourcesWhereInput | future_sourcesWhereInput[]
    OR?: future_sourcesWhereInput[]
    NOT?: future_sourcesWhereInput | future_sourcesWhereInput[]
    count_followers?: StringNullableFilter<"future_sources"> | string | null
    is_ready?: BoolNullableFilter<"future_sources"> | boolean | null
    profiles_id?: StringNullableFilter<"future_sources"> | string | null
  }, "id" | "name">

  export type future_sourcesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    count_followers?: SortOrderInput | SortOrder
    is_ready?: SortOrderInput | SortOrder
    profiles_id?: SortOrderInput | SortOrder
    _count?: future_sourcesCountOrderByAggregateInput
    _avg?: future_sourcesAvgOrderByAggregateInput
    _max?: future_sourcesMaxOrderByAggregateInput
    _min?: future_sourcesMinOrderByAggregateInput
    _sum?: future_sourcesSumOrderByAggregateInput
  }

  export type future_sourcesScalarWhereWithAggregatesInput = {
    AND?: future_sourcesScalarWhereWithAggregatesInput | future_sourcesScalarWhereWithAggregatesInput[]
    OR?: future_sourcesScalarWhereWithAggregatesInput[]
    NOT?: future_sourcesScalarWhereWithAggregatesInput | future_sourcesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"future_sources"> | number
    name?: StringWithAggregatesFilter<"future_sources"> | string
    count_followers?: StringNullableWithAggregatesFilter<"future_sources"> | string | null
    is_ready?: BoolNullableWithAggregatesFilter<"future_sources"> | boolean | null
    profiles_id?: StringNullableWithAggregatesFilter<"future_sources"> | string | null
  }

  export type rss_newsWhereInput = {
    AND?: rss_newsWhereInput | rss_newsWhereInput[]
    OR?: rss_newsWhereInput[]
    NOT?: rss_newsWhereInput | rss_newsWhereInput[]
    id?: IntFilter<"rss_news"> | number
    link?: StringFilter<"rss_news"> | string
    publish_date?: DateTimeNullableFilter<"rss_news"> | Date | string | null
    date?: DateTimeNullableFilter<"rss_news"> | Date | string | null
  }

  export type rss_newsOrderByWithRelationInput = {
    id?: SortOrder
    link?: SortOrder
    publish_date?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
  }

  export type rss_newsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    link?: string
    AND?: rss_newsWhereInput | rss_newsWhereInput[]
    OR?: rss_newsWhereInput[]
    NOT?: rss_newsWhereInput | rss_newsWhereInput[]
    publish_date?: DateTimeNullableFilter<"rss_news"> | Date | string | null
    date?: DateTimeNullableFilter<"rss_news"> | Date | string | null
  }, "id" | "link">

  export type rss_newsOrderByWithAggregationInput = {
    id?: SortOrder
    link?: SortOrder
    publish_date?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    _count?: rss_newsCountOrderByAggregateInput
    _avg?: rss_newsAvgOrderByAggregateInput
    _max?: rss_newsMaxOrderByAggregateInput
    _min?: rss_newsMinOrderByAggregateInput
    _sum?: rss_newsSumOrderByAggregateInput
  }

  export type rss_newsScalarWhereWithAggregatesInput = {
    AND?: rss_newsScalarWhereWithAggregatesInput | rss_newsScalarWhereWithAggregatesInput[]
    OR?: rss_newsScalarWhereWithAggregatesInput[]
    NOT?: rss_newsScalarWhereWithAggregatesInput | rss_newsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"rss_news"> | number
    link?: StringWithAggregatesFilter<"rss_news"> | string
    publish_date?: DateTimeNullableWithAggregatesFilter<"rss_news"> | Date | string | null
    date?: DateTimeNullableWithAggregatesFilter<"rss_news"> | Date | string | null
  }

  export type twitter_action_statsWhereInput = {
    AND?: twitter_action_statsWhereInput | twitter_action_statsWhereInput[]
    OR?: twitter_action_statsWhereInput[]
    NOT?: twitter_action_statsWhereInput | twitter_action_statsWhereInput[]
    id?: IntFilter<"twitter_action_stats"> | number
    likes?: IntNullableFilter<"twitter_action_stats"> | number | null
    views?: IntNullableFilter<"twitter_action_stats"> | number | null
    comments?: IntNullableFilter<"twitter_action_stats"> | number | null
    reposts?: IntNullableFilter<"twitter_action_stats"> | number | null
    saveds?: IntNullableFilter<"twitter_action_stats"> | number | null
    post_id?: IntNullableFilter<"twitter_action_stats"> | number | null
    permalink?: StringNullableFilter<"twitter_action_stats"> | string | null
    source_id?: IntNullableFilter<"twitter_action_stats"> | number | null
    rev?: IntNullableFilter<"twitter_action_stats"> | number | null
    date?: DateTimeNullableFilter<"twitter_action_stats"> | Date | string | null
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }

  export type twitter_action_statsOrderByWithRelationInput = {
    id?: SortOrder
    likes?: SortOrderInput | SortOrder
    views?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    reposts?: SortOrderInput | SortOrder
    saveds?: SortOrderInput | SortOrder
    post_id?: SortOrderInput | SortOrder
    permalink?: SortOrderInput | SortOrder
    source_id?: SortOrderInput | SortOrder
    rev?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    twitter_profiles?: twitter_profilesOrderByWithRelationInput
  }

  export type twitter_action_statsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: twitter_action_statsWhereInput | twitter_action_statsWhereInput[]
    OR?: twitter_action_statsWhereInput[]
    NOT?: twitter_action_statsWhereInput | twitter_action_statsWhereInput[]
    likes?: IntNullableFilter<"twitter_action_stats"> | number | null
    views?: IntNullableFilter<"twitter_action_stats"> | number | null
    comments?: IntNullableFilter<"twitter_action_stats"> | number | null
    reposts?: IntNullableFilter<"twitter_action_stats"> | number | null
    saveds?: IntNullableFilter<"twitter_action_stats"> | number | null
    post_id?: IntNullableFilter<"twitter_action_stats"> | number | null
    permalink?: StringNullableFilter<"twitter_action_stats"> | string | null
    source_id?: IntNullableFilter<"twitter_action_stats"> | number | null
    rev?: IntNullableFilter<"twitter_action_stats"> | number | null
    date?: DateTimeNullableFilter<"twitter_action_stats"> | Date | string | null
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }, "id">

  export type twitter_action_statsOrderByWithAggregationInput = {
    id?: SortOrder
    likes?: SortOrderInput | SortOrder
    views?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    reposts?: SortOrderInput | SortOrder
    saveds?: SortOrderInput | SortOrder
    post_id?: SortOrderInput | SortOrder
    permalink?: SortOrderInput | SortOrder
    source_id?: SortOrderInput | SortOrder
    rev?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    _count?: twitter_action_statsCountOrderByAggregateInput
    _avg?: twitter_action_statsAvgOrderByAggregateInput
    _max?: twitter_action_statsMaxOrderByAggregateInput
    _min?: twitter_action_statsMinOrderByAggregateInput
    _sum?: twitter_action_statsSumOrderByAggregateInput
  }

  export type twitter_action_statsScalarWhereWithAggregatesInput = {
    AND?: twitter_action_statsScalarWhereWithAggregatesInput | twitter_action_statsScalarWhereWithAggregatesInput[]
    OR?: twitter_action_statsScalarWhereWithAggregatesInput[]
    NOT?: twitter_action_statsScalarWhereWithAggregatesInput | twitter_action_statsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_action_stats"> | number
    likes?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    views?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    comments?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    reposts?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    saveds?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    post_id?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    permalink?: StringNullableWithAggregatesFilter<"twitter_action_stats"> | string | null
    source_id?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    rev?: IntNullableWithAggregatesFilter<"twitter_action_stats"> | number | null
    date?: DateTimeNullableWithAggregatesFilter<"twitter_action_stats"> | Date | string | null
  }

  export type twitter_postsWhereInput = {
    AND?: twitter_postsWhereInput | twitter_postsWhereInput[]
    OR?: twitter_postsWhereInput[]
    NOT?: twitter_postsWhereInput | twitter_postsWhereInput[]
    id?: IntFilter<"twitter_posts"> | number
    title?: StringNullableFilter<"twitter_posts"> | string | null
    plain_content?: StringNullableFilter<"twitter_posts"> | string | null
    image_data?: StringNullableListFilter<"twitter_posts">
    publish_date?: DateTimeNullableFilter<"twitter_posts"> | Date | string | null
    lang?: StringNullableFilter<"twitter_posts"> | string | null
    lang_proba?: DecimalNullableFilter<"twitter_posts"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFilter<"twitter_posts"> | Date | string
    source_id?: IntNullableFilter<"twitter_posts"> | number | null
    permalink?: StringNullableFilter<"twitter_posts"> | string | null
    mlready?: IntFilter<"twitter_posts"> | number
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }

  export type twitter_postsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    plain_content?: SortOrderInput | SortOrder
    image_data?: SortOrder
    publish_date?: SortOrderInput | SortOrder
    lang?: SortOrderInput | SortOrder
    lang_proba?: SortOrderInput | SortOrder
    date?: SortOrder
    source_id?: SortOrderInput | SortOrder
    permalink?: SortOrderInput | SortOrder
    mlready?: SortOrder
    twitter_profiles?: twitter_profilesOrderByWithRelationInput
  }

  export type twitter_postsWhereUniqueInput = Prisma.AtLeast<{
    id_date?: twitter_postsIdDateCompoundUniqueInput
    AND?: twitter_postsWhereInput | twitter_postsWhereInput[]
    OR?: twitter_postsWhereInput[]
    NOT?: twitter_postsWhereInput | twitter_postsWhereInput[]
    id?: IntFilter<"twitter_posts"> | number
    title?: StringNullableFilter<"twitter_posts"> | string | null
    plain_content?: StringNullableFilter<"twitter_posts"> | string | null
    image_data?: StringNullableListFilter<"twitter_posts">
    publish_date?: DateTimeNullableFilter<"twitter_posts"> | Date | string | null
    lang?: StringNullableFilter<"twitter_posts"> | string | null
    lang_proba?: DecimalNullableFilter<"twitter_posts"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFilter<"twitter_posts"> | Date | string
    source_id?: IntNullableFilter<"twitter_posts"> | number | null
    permalink?: StringNullableFilter<"twitter_posts"> | string | null
    mlready?: IntFilter<"twitter_posts"> | number
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }, "id_date">

  export type twitter_postsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    plain_content?: SortOrderInput | SortOrder
    image_data?: SortOrder
    publish_date?: SortOrderInput | SortOrder
    lang?: SortOrderInput | SortOrder
    lang_proba?: SortOrderInput | SortOrder
    date?: SortOrder
    source_id?: SortOrderInput | SortOrder
    permalink?: SortOrderInput | SortOrder
    mlready?: SortOrder
    _count?: twitter_postsCountOrderByAggregateInput
    _avg?: twitter_postsAvgOrderByAggregateInput
    _max?: twitter_postsMaxOrderByAggregateInput
    _min?: twitter_postsMinOrderByAggregateInput
    _sum?: twitter_postsSumOrderByAggregateInput
  }

  export type twitter_postsScalarWhereWithAggregatesInput = {
    AND?: twitter_postsScalarWhereWithAggregatesInput | twitter_postsScalarWhereWithAggregatesInput[]
    OR?: twitter_postsScalarWhereWithAggregatesInput[]
    NOT?: twitter_postsScalarWhereWithAggregatesInput | twitter_postsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_posts"> | number
    title?: StringNullableWithAggregatesFilter<"twitter_posts"> | string | null
    plain_content?: StringNullableWithAggregatesFilter<"twitter_posts"> | string | null
    image_data?: StringNullableListFilter<"twitter_posts">
    publish_date?: DateTimeNullableWithAggregatesFilter<"twitter_posts"> | Date | string | null
    lang?: StringNullableWithAggregatesFilter<"twitter_posts"> | string | null
    lang_proba?: DecimalNullableWithAggregatesFilter<"twitter_posts"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeWithAggregatesFilter<"twitter_posts"> | Date | string
    source_id?: IntNullableWithAggregatesFilter<"twitter_posts"> | number | null
    permalink?: StringNullableWithAggregatesFilter<"twitter_posts"> | string | null
    mlready?: IntWithAggregatesFilter<"twitter_posts"> | number
  }

  export type twitter_profilesWhereInput = {
    AND?: twitter_profilesWhereInput | twitter_profilesWhereInput[]
    OR?: twitter_profilesWhereInput[]
    NOT?: twitter_profilesWhereInput | twitter_profilesWhereInput[]
    id?: IntFilter<"twitter_profiles"> | number
    type?: StringNullableFilter<"twitter_profiles"> | string | null
    name?: StringNullableFilter<"twitter_profiles"> | string | null
    profiles_id?: StringNullableFilter<"twitter_profiles"> | string | null
    active?: IntNullableFilter<"twitter_profiles"> | number | null
    updated?: DateTimeNullableFilter<"twitter_profiles"> | Date | string | null
    twitter_action_stats?: Twitter_action_statsListRelationFilter
    twitter_posts?: Twitter_postsListRelationFilter
    twitter_profiles_stats?: Twitter_profiles_statsListRelationFilter
    twitter_profiles_twitter_posts?: Twitter_profiles_twitter_postsListRelationFilter
  }

  export type twitter_profilesOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    profiles_id?: SortOrderInput | SortOrder
    active?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    twitter_action_stats?: twitter_action_statsOrderByRelationAggregateInput
    twitter_posts?: twitter_postsOrderByRelationAggregateInput
    twitter_profiles_stats?: twitter_profiles_statsOrderByRelationAggregateInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsOrderByRelationAggregateInput
  }

  export type twitter_profilesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: twitter_profilesWhereInput | twitter_profilesWhereInput[]
    OR?: twitter_profilesWhereInput[]
    NOT?: twitter_profilesWhereInput | twitter_profilesWhereInput[]
    type?: StringNullableFilter<"twitter_profiles"> | string | null
    name?: StringNullableFilter<"twitter_profiles"> | string | null
    profiles_id?: StringNullableFilter<"twitter_profiles"> | string | null
    active?: IntNullableFilter<"twitter_profiles"> | number | null
    updated?: DateTimeNullableFilter<"twitter_profiles"> | Date | string | null
    twitter_action_stats?: Twitter_action_statsListRelationFilter
    twitter_posts?: Twitter_postsListRelationFilter
    twitter_profiles_stats?: Twitter_profiles_statsListRelationFilter
    twitter_profiles_twitter_posts?: Twitter_profiles_twitter_postsListRelationFilter
  }, "id">

  export type twitter_profilesOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    profiles_id?: SortOrderInput | SortOrder
    active?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    _count?: twitter_profilesCountOrderByAggregateInput
    _avg?: twitter_profilesAvgOrderByAggregateInput
    _max?: twitter_profilesMaxOrderByAggregateInput
    _min?: twitter_profilesMinOrderByAggregateInput
    _sum?: twitter_profilesSumOrderByAggregateInput
  }

  export type twitter_profilesScalarWhereWithAggregatesInput = {
    AND?: twitter_profilesScalarWhereWithAggregatesInput | twitter_profilesScalarWhereWithAggregatesInput[]
    OR?: twitter_profilesScalarWhereWithAggregatesInput[]
    NOT?: twitter_profilesScalarWhereWithAggregatesInput | twitter_profilesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_profiles"> | number
    type?: StringNullableWithAggregatesFilter<"twitter_profiles"> | string | null
    name?: StringNullableWithAggregatesFilter<"twitter_profiles"> | string | null
    profiles_id?: StringNullableWithAggregatesFilter<"twitter_profiles"> | string | null
    active?: IntNullableWithAggregatesFilter<"twitter_profiles"> | number | null
    updated?: DateTimeNullableWithAggregatesFilter<"twitter_profiles"> | Date | string | null
  }

  export type twitter_profiles_statsWhereInput = {
    AND?: twitter_profiles_statsWhereInput | twitter_profiles_statsWhereInput[]
    OR?: twitter_profiles_statsWhereInput[]
    NOT?: twitter_profiles_statsWhereInput | twitter_profiles_statsWhereInput[]
    id?: IntFilter<"twitter_profiles_stats"> | number
    twitter_profilesid?: IntNullableFilter<"twitter_profiles_stats"> | number | null
    date?: DateTimeNullableFilter<"twitter_profiles_stats"> | Date | string | null
    subscription?: IntNullableFilter<"twitter_profiles_stats"> | number | null
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }

  export type twitter_profiles_statsOrderByWithRelationInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    subscription?: SortOrderInput | SortOrder
    twitter_profiles?: twitter_profilesOrderByWithRelationInput
  }

  export type twitter_profiles_statsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: twitter_profiles_statsWhereInput | twitter_profiles_statsWhereInput[]
    OR?: twitter_profiles_statsWhereInput[]
    NOT?: twitter_profiles_statsWhereInput | twitter_profiles_statsWhereInput[]
    twitter_profilesid?: IntNullableFilter<"twitter_profiles_stats"> | number | null
    date?: DateTimeNullableFilter<"twitter_profiles_stats"> | Date | string | null
    subscription?: IntNullableFilter<"twitter_profiles_stats"> | number | null
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }, "id">

  export type twitter_profiles_statsOrderByWithAggregationInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    subscription?: SortOrderInput | SortOrder
    _count?: twitter_profiles_statsCountOrderByAggregateInput
    _avg?: twitter_profiles_statsAvgOrderByAggregateInput
    _max?: twitter_profiles_statsMaxOrderByAggregateInput
    _min?: twitter_profiles_statsMinOrderByAggregateInput
    _sum?: twitter_profiles_statsSumOrderByAggregateInput
  }

  export type twitter_profiles_statsScalarWhereWithAggregatesInput = {
    AND?: twitter_profiles_statsScalarWhereWithAggregatesInput | twitter_profiles_statsScalarWhereWithAggregatesInput[]
    OR?: twitter_profiles_statsScalarWhereWithAggregatesInput[]
    NOT?: twitter_profiles_statsScalarWhereWithAggregatesInput | twitter_profiles_statsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_profiles_stats"> | number
    twitter_profilesid?: IntNullableWithAggregatesFilter<"twitter_profiles_stats"> | number | null
    date?: DateTimeNullableWithAggregatesFilter<"twitter_profiles_stats"> | Date | string | null
    subscription?: IntNullableWithAggregatesFilter<"twitter_profiles_stats"> | number | null
  }

  export type twitter_profiles_tempWhereInput = {
    AND?: twitter_profiles_tempWhereInput | twitter_profiles_tempWhereInput[]
    OR?: twitter_profiles_tempWhereInput[]
    NOT?: twitter_profiles_tempWhereInput | twitter_profiles_tempWhereInput[]
    id?: IntFilter<"twitter_profiles_temp"> | number
    name?: StringNullableFilter<"twitter_profiles_temp"> | string | null
  }

  export type twitter_profiles_tempOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
  }

  export type twitter_profiles_tempWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: twitter_profiles_tempWhereInput | twitter_profiles_tempWhereInput[]
    OR?: twitter_profiles_tempWhereInput[]
    NOT?: twitter_profiles_tempWhereInput | twitter_profiles_tempWhereInput[]
  }, "id" | "name">

  export type twitter_profiles_tempOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: twitter_profiles_tempCountOrderByAggregateInput
    _avg?: twitter_profiles_tempAvgOrderByAggregateInput
    _max?: twitter_profiles_tempMaxOrderByAggregateInput
    _min?: twitter_profiles_tempMinOrderByAggregateInput
    _sum?: twitter_profiles_tempSumOrderByAggregateInput
  }

  export type twitter_profiles_tempScalarWhereWithAggregatesInput = {
    AND?: twitter_profiles_tempScalarWhereWithAggregatesInput | twitter_profiles_tempScalarWhereWithAggregatesInput[]
    OR?: twitter_profiles_tempScalarWhereWithAggregatesInput[]
    NOT?: twitter_profiles_tempScalarWhereWithAggregatesInput | twitter_profiles_tempScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_profiles_temp"> | number
    name?: StringNullableWithAggregatesFilter<"twitter_profiles_temp"> | string | null
  }

  export type twitter_profiles_twitter_postsWhereInput = {
    AND?: twitter_profiles_twitter_postsWhereInput | twitter_profiles_twitter_postsWhereInput[]
    OR?: twitter_profiles_twitter_postsWhereInput[]
    NOT?: twitter_profiles_twitter_postsWhereInput | twitter_profiles_twitter_postsWhereInput[]
    id?: IntFilter<"twitter_profiles_twitter_posts"> | number
    post_id?: StringFilter<"twitter_profiles_twitter_posts"> | string
    likes?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    views?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    reposts?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    comments?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    saveds?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    twitter_profilesid?: IntNullableFilter<"twitter_profiles_twitter_posts"> | number | null
    twitter_postid?: IntNullableFilter<"twitter_profiles_twitter_posts"> | number | null
    isvideo?: BoolNullableFilter<"twitter_profiles_twitter_posts"> | boolean | null
    is_repost?: BoolNullableFilter<"twitter_profiles_twitter_posts"> | boolean | null
    source_link?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }

  export type twitter_profiles_twitter_postsOrderByWithRelationInput = {
    id?: SortOrder
    post_id?: SortOrder
    likes?: SortOrderInput | SortOrder
    views?: SortOrderInput | SortOrder
    reposts?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    saveds?: SortOrderInput | SortOrder
    twitter_profilesid?: SortOrderInput | SortOrder
    twitter_postid?: SortOrderInput | SortOrder
    isvideo?: SortOrderInput | SortOrder
    is_repost?: SortOrderInput | SortOrder
    source_link?: SortOrderInput | SortOrder
    twitter_profiles?: twitter_profilesOrderByWithRelationInput
  }

  export type twitter_profiles_twitter_postsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    post_id?: string
    AND?: twitter_profiles_twitter_postsWhereInput | twitter_profiles_twitter_postsWhereInput[]
    OR?: twitter_profiles_twitter_postsWhereInput[]
    NOT?: twitter_profiles_twitter_postsWhereInput | twitter_profiles_twitter_postsWhereInput[]
    likes?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    views?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    reposts?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    comments?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    saveds?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    twitter_profilesid?: IntNullableFilter<"twitter_profiles_twitter_posts"> | number | null
    twitter_postid?: IntNullableFilter<"twitter_profiles_twitter_posts"> | number | null
    isvideo?: BoolNullableFilter<"twitter_profiles_twitter_posts"> | boolean | null
    is_repost?: BoolNullableFilter<"twitter_profiles_twitter_posts"> | boolean | null
    source_link?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    twitter_profiles?: XOR<Twitter_profilesNullableRelationFilter, twitter_profilesWhereInput> | null
  }, "id" | "post_id">

  export type twitter_profiles_twitter_postsOrderByWithAggregationInput = {
    id?: SortOrder
    post_id?: SortOrder
    likes?: SortOrderInput | SortOrder
    views?: SortOrderInput | SortOrder
    reposts?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    saveds?: SortOrderInput | SortOrder
    twitter_profilesid?: SortOrderInput | SortOrder
    twitter_postid?: SortOrderInput | SortOrder
    isvideo?: SortOrderInput | SortOrder
    is_repost?: SortOrderInput | SortOrder
    source_link?: SortOrderInput | SortOrder
    _count?: twitter_profiles_twitter_postsCountOrderByAggregateInput
    _avg?: twitter_profiles_twitter_postsAvgOrderByAggregateInput
    _max?: twitter_profiles_twitter_postsMaxOrderByAggregateInput
    _min?: twitter_profiles_twitter_postsMinOrderByAggregateInput
    _sum?: twitter_profiles_twitter_postsSumOrderByAggregateInput
  }

  export type twitter_profiles_twitter_postsScalarWhereWithAggregatesInput = {
    AND?: twitter_profiles_twitter_postsScalarWhereWithAggregatesInput | twitter_profiles_twitter_postsScalarWhereWithAggregatesInput[]
    OR?: twitter_profiles_twitter_postsScalarWhereWithAggregatesInput[]
    NOT?: twitter_profiles_twitter_postsScalarWhereWithAggregatesInput | twitter_profiles_twitter_postsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_profiles_twitter_posts"> | number
    post_id?: StringWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string
    likes?: StringNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string | null
    views?: StringNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string | null
    reposts?: StringNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string | null
    comments?: StringNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string | null
    saveds?: StringNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string | null
    twitter_profilesid?: IntNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | number | null
    twitter_postid?: IntNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | number | null
    isvideo?: BoolNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | boolean | null
    is_repost?: BoolNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | boolean | null
    source_link?: StringNullableWithAggregatesFilter<"twitter_profiles_twitter_posts"> | string | null
  }

  export type twitter_relation_replyWhereInput = {
    AND?: twitter_relation_replyWhereInput | twitter_relation_replyWhereInput[]
    OR?: twitter_relation_replyWhereInput[]
    NOT?: twitter_relation_replyWhereInput | twitter_relation_replyWhereInput[]
    id?: IntFilter<"twitter_relation_reply"> | number
    name?: StringNullableFilter<"twitter_relation_reply"> | string | null
    post_type?: StringNullableFilter<"twitter_relation_reply"> | string | null
    plain_context?: StringNullableFilter<"twitter_relation_reply"> | string | null
    replies?: IntNullableFilter<"twitter_relation_reply"> | number | null
    reposts?: IntNullableFilter<"twitter_relation_reply"> | number | null
    likes?: IntNullableFilter<"twitter_relation_reply"> | number | null
    bookmarks?: IntNullableFilter<"twitter_relation_reply"> | number | null
    views?: IntNullableFilter<"twitter_relation_reply"> | number | null
    publish_date?: DateTimeNullableFilter<"twitter_relation_reply"> | Date | string | null
    post_id?: StringNullableFilter<"twitter_relation_reply"> | string | null
    source_id?: StringNullableFilter<"twitter_relation_reply"> | string | null
    reposted_profile?: StringNullableFilter<"twitter_relation_reply"> | string | null
    root_post?: StringNullableFilter<"twitter_relation_reply"> | string | null
  }

  export type twitter_relation_replyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    post_type?: SortOrderInput | SortOrder
    plain_context?: SortOrderInput | SortOrder
    replies?: SortOrderInput | SortOrder
    reposts?: SortOrderInput | SortOrder
    likes?: SortOrderInput | SortOrder
    bookmarks?: SortOrderInput | SortOrder
    views?: SortOrderInput | SortOrder
    publish_date?: SortOrderInput | SortOrder
    post_id?: SortOrderInput | SortOrder
    source_id?: SortOrderInput | SortOrder
    reposted_profile?: SortOrderInput | SortOrder
    root_post?: SortOrderInput | SortOrder
  }

  export type twitter_relation_replyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    post_id?: string
    AND?: twitter_relation_replyWhereInput | twitter_relation_replyWhereInput[]
    OR?: twitter_relation_replyWhereInput[]
    NOT?: twitter_relation_replyWhereInput | twitter_relation_replyWhereInput[]
    name?: StringNullableFilter<"twitter_relation_reply"> | string | null
    post_type?: StringNullableFilter<"twitter_relation_reply"> | string | null
    plain_context?: StringNullableFilter<"twitter_relation_reply"> | string | null
    replies?: IntNullableFilter<"twitter_relation_reply"> | number | null
    reposts?: IntNullableFilter<"twitter_relation_reply"> | number | null
    likes?: IntNullableFilter<"twitter_relation_reply"> | number | null
    bookmarks?: IntNullableFilter<"twitter_relation_reply"> | number | null
    views?: IntNullableFilter<"twitter_relation_reply"> | number | null
    publish_date?: DateTimeNullableFilter<"twitter_relation_reply"> | Date | string | null
    source_id?: StringNullableFilter<"twitter_relation_reply"> | string | null
    reposted_profile?: StringNullableFilter<"twitter_relation_reply"> | string | null
    root_post?: StringNullableFilter<"twitter_relation_reply"> | string | null
  }, "id" | "post_id">

  export type twitter_relation_replyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    post_type?: SortOrderInput | SortOrder
    plain_context?: SortOrderInput | SortOrder
    replies?: SortOrderInput | SortOrder
    reposts?: SortOrderInput | SortOrder
    likes?: SortOrderInput | SortOrder
    bookmarks?: SortOrderInput | SortOrder
    views?: SortOrderInput | SortOrder
    publish_date?: SortOrderInput | SortOrder
    post_id?: SortOrderInput | SortOrder
    source_id?: SortOrderInput | SortOrder
    reposted_profile?: SortOrderInput | SortOrder
    root_post?: SortOrderInput | SortOrder
    _count?: twitter_relation_replyCountOrderByAggregateInput
    _avg?: twitter_relation_replyAvgOrderByAggregateInput
    _max?: twitter_relation_replyMaxOrderByAggregateInput
    _min?: twitter_relation_replyMinOrderByAggregateInput
    _sum?: twitter_relation_replySumOrderByAggregateInput
  }

  export type twitter_relation_replyScalarWhereWithAggregatesInput = {
    AND?: twitter_relation_replyScalarWhereWithAggregatesInput | twitter_relation_replyScalarWhereWithAggregatesInput[]
    OR?: twitter_relation_replyScalarWhereWithAggregatesInput[]
    NOT?: twitter_relation_replyScalarWhereWithAggregatesInput | twitter_relation_replyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_relation_reply"> | number
    name?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
    post_type?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
    plain_context?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
    replies?: IntNullableWithAggregatesFilter<"twitter_relation_reply"> | number | null
    reposts?: IntNullableWithAggregatesFilter<"twitter_relation_reply"> | number | null
    likes?: IntNullableWithAggregatesFilter<"twitter_relation_reply"> | number | null
    bookmarks?: IntNullableWithAggregatesFilter<"twitter_relation_reply"> | number | null
    views?: IntNullableWithAggregatesFilter<"twitter_relation_reply"> | number | null
    publish_date?: DateTimeNullableWithAggregatesFilter<"twitter_relation_reply"> | Date | string | null
    post_id?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
    source_id?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
    reposted_profile?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
    root_post?: StringNullableWithAggregatesFilter<"twitter_relation_reply"> | string | null
  }

  export type twitter_relationships_reply_profilesWhereInput = {
    AND?: twitter_relationships_reply_profilesWhereInput | twitter_relationships_reply_profilesWhereInput[]
    OR?: twitter_relationships_reply_profilesWhereInput[]
    NOT?: twitter_relationships_reply_profilesWhereInput | twitter_relationships_reply_profilesWhereInput[]
    id?: IntFilter<"twitter_relationships_reply_profiles"> | number
    profile_id?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    name?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    username?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    followers_count?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    following_count?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    location?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    birthdate?: DateTimeNullableFilter<"twitter_relationships_reply_profiles"> | Date | string | null
    description?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    joined?: DateTimeNullableFilter<"twitter_relationships_reply_profiles"> | Date | string | null
    url?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    category?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
  }

  export type twitter_relationships_reply_profilesOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    followers_count?: SortOrderInput | SortOrder
    following_count?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    joined?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
  }

  export type twitter_relationships_reply_profilesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    profile_id?: string
    AND?: twitter_relationships_reply_profilesWhereInput | twitter_relationships_reply_profilesWhereInput[]
    OR?: twitter_relationships_reply_profilesWhereInput[]
    NOT?: twitter_relationships_reply_profilesWhereInput | twitter_relationships_reply_profilesWhereInput[]
    name?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    username?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    followers_count?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    following_count?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    location?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    birthdate?: DateTimeNullableFilter<"twitter_relationships_reply_profiles"> | Date | string | null
    description?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    joined?: DateTimeNullableFilter<"twitter_relationships_reply_profiles"> | Date | string | null
    url?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
    category?: StringNullableFilter<"twitter_relationships_reply_profiles"> | string | null
  }, "id" | "profile_id">

  export type twitter_relationships_reply_profilesOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    followers_count?: SortOrderInput | SortOrder
    following_count?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    joined?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    _count?: twitter_relationships_reply_profilesCountOrderByAggregateInput
    _avg?: twitter_relationships_reply_profilesAvgOrderByAggregateInput
    _max?: twitter_relationships_reply_profilesMaxOrderByAggregateInput
    _min?: twitter_relationships_reply_profilesMinOrderByAggregateInput
    _sum?: twitter_relationships_reply_profilesSumOrderByAggregateInput
  }

  export type twitter_relationships_reply_profilesScalarWhereWithAggregatesInput = {
    AND?: twitter_relationships_reply_profilesScalarWhereWithAggregatesInput | twitter_relationships_reply_profilesScalarWhereWithAggregatesInput[]
    OR?: twitter_relationships_reply_profilesScalarWhereWithAggregatesInput[]
    NOT?: twitter_relationships_reply_profilesScalarWhereWithAggregatesInput | twitter_relationships_reply_profilesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"twitter_relationships_reply_profiles"> | number
    profile_id?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    name?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    username?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    followers_count?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    following_count?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    location?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    birthdate?: DateTimeNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | Date | string | null
    description?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    joined?: DateTimeNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | Date | string | null
    url?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
    category?: StringNullableWithAggregatesFilter<"twitter_relationships_reply_profiles"> | string | null
  }

  export type future_sourcesCreateInput = {
    name: string
    count_followers?: string | null
    is_ready?: boolean | null
    profiles_id?: string | null
  }

  export type future_sourcesUncheckedCreateInput = {
    id?: number
    name: string
    count_followers?: string | null
    is_ready?: boolean | null
    profiles_id?: string | null
  }

  export type future_sourcesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    count_followers?: NullableStringFieldUpdateOperationsInput | string | null
    is_ready?: NullableBoolFieldUpdateOperationsInput | boolean | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type future_sourcesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    count_followers?: NullableStringFieldUpdateOperationsInput | string | null
    is_ready?: NullableBoolFieldUpdateOperationsInput | boolean | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type future_sourcesCreateManyInput = {
    id?: number
    name: string
    count_followers?: string | null
    is_ready?: boolean | null
    profiles_id?: string | null
  }

  export type future_sourcesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    count_followers?: NullableStringFieldUpdateOperationsInput | string | null
    is_ready?: NullableBoolFieldUpdateOperationsInput | boolean | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type future_sourcesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    count_followers?: NullableStringFieldUpdateOperationsInput | string | null
    is_ready?: NullableBoolFieldUpdateOperationsInput | boolean | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rss_newsCreateInput = {
    link: string
    publish_date?: Date | string | null
    date?: Date | string | null
  }

  export type rss_newsUncheckedCreateInput = {
    id?: number
    link: string
    publish_date?: Date | string | null
    date?: Date | string | null
  }

  export type rss_newsUpdateInput = {
    link?: StringFieldUpdateOperationsInput | string
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rss_newsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    link?: StringFieldUpdateOperationsInput | string
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rss_newsCreateManyInput = {
    id?: number
    link: string
    publish_date?: Date | string | null
    date?: Date | string | null
  }

  export type rss_newsUpdateManyMutationInput = {
    link?: StringFieldUpdateOperationsInput | string
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rss_newsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    link?: StringFieldUpdateOperationsInput | string
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_action_statsCreateInput = {
    likes?: number | null
    views?: number | null
    comments?: number | null
    reposts?: number | null
    saveds?: number | null
    post_id?: number | null
    permalink?: string | null
    rev?: number | null
    date?: Date | string | null
    twitter_profiles?: twitter_profilesCreateNestedOneWithoutTwitter_action_statsInput
  }

  export type twitter_action_statsUncheckedCreateInput = {
    id?: number
    likes?: number | null
    views?: number | null
    comments?: number | null
    reposts?: number | null
    saveds?: number | null
    post_id?: number | null
    permalink?: string | null
    source_id?: number | null
    rev?: number | null
    date?: Date | string | null
  }

  export type twitter_action_statsUpdateInput = {
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_profiles?: twitter_profilesUpdateOneWithoutTwitter_action_statsNestedInput
  }

  export type twitter_action_statsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableIntFieldUpdateOperationsInput | number | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_action_statsCreateManyInput = {
    id?: number
    likes?: number | null
    views?: number | null
    comments?: number | null
    reposts?: number | null
    saveds?: number | null
    post_id?: number | null
    permalink?: string | null
    source_id?: number | null
    rev?: number | null
    date?: Date | string | null
  }

  export type twitter_action_statsUpdateManyMutationInput = {
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_action_statsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableIntFieldUpdateOperationsInput | number | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_postsCreateInput = {
    id?: number
    title?: string | null
    plain_content?: string | null
    image_data?: twitter_postsCreateimage_dataInput | string[]
    publish_date?: Date | string | null
    lang?: string | null
    lang_proba?: Decimal | DecimalJsLike | number | string | null
    date: Date | string
    permalink?: string | null
    mlready?: number
    twitter_profiles?: twitter_profilesCreateNestedOneWithoutTwitter_postsInput
  }

  export type twitter_postsUncheckedCreateInput = {
    id?: number
    title?: string | null
    plain_content?: string | null
    image_data?: twitter_postsCreateimage_dataInput | string[]
    publish_date?: Date | string | null
    lang?: string | null
    lang_proba?: Decimal | DecimalJsLike | number | string | null
    date: Date | string
    source_id?: number | null
    permalink?: string | null
    mlready?: number
  }

  export type twitter_postsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
    twitter_profiles?: twitter_profilesUpdateOneWithoutTwitter_postsNestedInput
  }

  export type twitter_postsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
  }

  export type twitter_postsCreateManyInput = {
    id?: number
    title?: string | null
    plain_content?: string | null
    image_data?: twitter_postsCreateimage_dataInput | string[]
    publish_date?: Date | string | null
    lang?: string | null
    lang_proba?: Decimal | DecimalJsLike | number | string | null
    date: Date | string
    source_id?: number | null
    permalink?: string | null
    mlready?: number
  }

  export type twitter_postsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
  }

  export type twitter_postsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
  }

  export type twitter_profilesCreateInput = {
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_posts?: twitter_postsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesUncheckedCreateInput = {
    id?: number
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_posts?: twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesUpdateInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_posts?: twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_posts?: twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesCreateManyInput = {
    id?: number
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
  }

  export type twitter_profilesUpdateManyMutationInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_profilesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_profiles_statsCreateInput = {
    date?: Date | string | null
    subscription?: number | null
    twitter_profiles?: twitter_profilesCreateNestedOneWithoutTwitter_profiles_statsInput
  }

  export type twitter_profiles_statsUncheckedCreateInput = {
    id?: number
    twitter_profilesid?: number | null
    date?: Date | string | null
    subscription?: number | null
  }

  export type twitter_profiles_statsUpdateInput = {
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
    twitter_profiles?: twitter_profilesUpdateOneWithoutTwitter_profiles_statsNestedInput
  }

  export type twitter_profiles_statsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    twitter_profilesid?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type twitter_profiles_statsCreateManyInput = {
    id?: number
    twitter_profilesid?: number | null
    date?: Date | string | null
    subscription?: number | null
  }

  export type twitter_profiles_statsUpdateManyMutationInput = {
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type twitter_profiles_statsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    twitter_profilesid?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type twitter_profiles_tempCreateInput = {
    name?: string | null
  }

  export type twitter_profiles_tempUncheckedCreateInput = {
    id?: number
    name?: string | null
  }

  export type twitter_profiles_tempUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_tempUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_tempCreateManyInput = {
    id?: number
    name?: string | null
  }

  export type twitter_profiles_tempUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_tempUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_twitter_postsCreateInput = {
    post_id: string
    likes?: string | null
    views?: string | null
    reposts?: string | null
    comments?: string | null
    saveds?: string | null
    twitter_postid?: number | null
    isvideo?: boolean | null
    is_repost?: boolean | null
    source_link?: string | null
    twitter_profiles?: twitter_profilesCreateNestedOneWithoutTwitter_profiles_twitter_postsInput
  }

  export type twitter_profiles_twitter_postsUncheckedCreateInput = {
    id?: number
    post_id: string
    likes?: string | null
    views?: string | null
    reposts?: string | null
    comments?: string | null
    saveds?: string | null
    twitter_profilesid?: number | null
    twitter_postid?: number | null
    isvideo?: boolean | null
    is_repost?: boolean | null
    source_link?: string | null
  }

  export type twitter_profiles_twitter_postsUpdateInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_profiles?: twitter_profilesUpdateOneWithoutTwitter_profiles_twitter_postsNestedInput
  }

  export type twitter_profiles_twitter_postsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_profilesid?: NullableIntFieldUpdateOperationsInput | number | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_twitter_postsCreateManyInput = {
    id?: number
    post_id: string
    likes?: string | null
    views?: string | null
    reposts?: string | null
    comments?: string | null
    saveds?: string | null
    twitter_profilesid?: number | null
    twitter_postid?: number | null
    isvideo?: boolean | null
    is_repost?: boolean | null
    source_link?: string | null
  }

  export type twitter_profiles_twitter_postsUpdateManyMutationInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_twitter_postsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_profilesid?: NullableIntFieldUpdateOperationsInput | number | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relation_replyCreateInput = {
    name?: string | null
    post_type?: string | null
    plain_context?: string | null
    replies?: number | null
    reposts?: number | null
    likes?: number | null
    bookmarks?: number | null
    views?: number | null
    publish_date?: Date | string | null
    post_id?: string | null
    source_id?: string | null
    reposted_profile?: string | null
    root_post?: string | null
  }

  export type twitter_relation_replyUncheckedCreateInput = {
    id?: number
    name?: string | null
    post_type?: string | null
    plain_context?: string | null
    replies?: number | null
    reposts?: number | null
    likes?: number | null
    bookmarks?: number | null
    views?: number | null
    publish_date?: Date | string | null
    post_id?: string | null
    source_id?: string | null
    reposted_profile?: string | null
    root_post?: string | null
  }

  export type twitter_relation_replyUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    post_type?: NullableStringFieldUpdateOperationsInput | string | null
    plain_context?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    bookmarks?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    reposted_profile?: NullableStringFieldUpdateOperationsInput | string | null
    root_post?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relation_replyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    post_type?: NullableStringFieldUpdateOperationsInput | string | null
    plain_context?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    bookmarks?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    reposted_profile?: NullableStringFieldUpdateOperationsInput | string | null
    root_post?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relation_replyCreateManyInput = {
    id?: number
    name?: string | null
    post_type?: string | null
    plain_context?: string | null
    replies?: number | null
    reposts?: number | null
    likes?: number | null
    bookmarks?: number | null
    views?: number | null
    publish_date?: Date | string | null
    post_id?: string | null
    source_id?: string | null
    reposted_profile?: string | null
    root_post?: string | null
  }

  export type twitter_relation_replyUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    post_type?: NullableStringFieldUpdateOperationsInput | string | null
    plain_context?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    bookmarks?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    reposted_profile?: NullableStringFieldUpdateOperationsInput | string | null
    root_post?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relation_replyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    post_type?: NullableStringFieldUpdateOperationsInput | string | null
    plain_context?: NullableStringFieldUpdateOperationsInput | string | null
    replies?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    bookmarks?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_id?: NullableStringFieldUpdateOperationsInput | string | null
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    reposted_profile?: NullableStringFieldUpdateOperationsInput | string | null
    root_post?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relationships_reply_profilesCreateInput = {
    profile_id?: string | null
    name?: string | null
    username?: string | null
    followers_count?: string | null
    following_count?: string | null
    location?: string | null
    birthdate?: Date | string | null
    description?: string | null
    joined?: Date | string | null
    url?: string | null
    category?: string | null
  }

  export type twitter_relationships_reply_profilesUncheckedCreateInput = {
    id?: number
    profile_id?: string | null
    name?: string | null
    username?: string | null
    followers_count?: string | null
    following_count?: string | null
    location?: string | null
    birthdate?: Date | string | null
    description?: string | null
    joined?: Date | string | null
    url?: string | null
    category?: string | null
  }

  export type twitter_relationships_reply_profilesUpdateInput = {
    profile_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    followers_count?: NullableStringFieldUpdateOperationsInput | string | null
    following_count?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    joined?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relationships_reply_profilesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    profile_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    followers_count?: NullableStringFieldUpdateOperationsInput | string | null
    following_count?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    joined?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relationships_reply_profilesCreateManyInput = {
    id?: number
    profile_id?: string | null
    name?: string | null
    username?: string | null
    followers_count?: string | null
    following_count?: string | null
    location?: string | null
    birthdate?: Date | string | null
    description?: string | null
    joined?: Date | string | null
    url?: string | null
    category?: string | null
  }

  export type twitter_relationships_reply_profilesUpdateManyMutationInput = {
    profile_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    followers_count?: NullableStringFieldUpdateOperationsInput | string | null
    following_count?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    joined?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_relationships_reply_profilesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    profile_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    followers_count?: NullableStringFieldUpdateOperationsInput | string | null
    following_count?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    joined?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type future_sourcesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    count_followers?: SortOrder
    is_ready?: SortOrder
    profiles_id?: SortOrder
  }

  export type future_sourcesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type future_sourcesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    count_followers?: SortOrder
    is_ready?: SortOrder
    profiles_id?: SortOrder
  }

  export type future_sourcesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    count_followers?: SortOrder
    is_ready?: SortOrder
    profiles_id?: SortOrder
  }

  export type future_sourcesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type rss_newsCountOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    publish_date?: SortOrder
    date?: SortOrder
  }

  export type rss_newsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type rss_newsMaxOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    publish_date?: SortOrder
    date?: SortOrder
  }

  export type rss_newsMinOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    publish_date?: SortOrder
    date?: SortOrder
  }

  export type rss_newsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Twitter_profilesNullableRelationFilter = {
    is?: twitter_profilesWhereInput | null
    isNot?: twitter_profilesWhereInput | null
  }

  export type twitter_action_statsCountOrderByAggregateInput = {
    id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    comments?: SortOrder
    reposts?: SortOrder
    saveds?: SortOrder
    post_id?: SortOrder
    permalink?: SortOrder
    source_id?: SortOrder
    rev?: SortOrder
    date?: SortOrder
  }

  export type twitter_action_statsAvgOrderByAggregateInput = {
    id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    comments?: SortOrder
    reposts?: SortOrder
    saveds?: SortOrder
    post_id?: SortOrder
    source_id?: SortOrder
    rev?: SortOrder
  }

  export type twitter_action_statsMaxOrderByAggregateInput = {
    id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    comments?: SortOrder
    reposts?: SortOrder
    saveds?: SortOrder
    post_id?: SortOrder
    permalink?: SortOrder
    source_id?: SortOrder
    rev?: SortOrder
    date?: SortOrder
  }

  export type twitter_action_statsMinOrderByAggregateInput = {
    id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    comments?: SortOrder
    reposts?: SortOrder
    saveds?: SortOrder
    post_id?: SortOrder
    permalink?: SortOrder
    source_id?: SortOrder
    rev?: SortOrder
    date?: SortOrder
  }

  export type twitter_action_statsSumOrderByAggregateInput = {
    id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    comments?: SortOrder
    reposts?: SortOrder
    saveds?: SortOrder
    post_id?: SortOrder
    source_id?: SortOrder
    rev?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type twitter_postsIdDateCompoundUniqueInput = {
    id: number
    date: Date | string
  }

  export type twitter_postsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    plain_content?: SortOrder
    image_data?: SortOrder
    publish_date?: SortOrder
    lang?: SortOrder
    lang_proba?: SortOrder
    date?: SortOrder
    source_id?: SortOrder
    permalink?: SortOrder
    mlready?: SortOrder
  }

  export type twitter_postsAvgOrderByAggregateInput = {
    id?: SortOrder
    lang_proba?: SortOrder
    source_id?: SortOrder
    mlready?: SortOrder
  }

  export type twitter_postsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    plain_content?: SortOrder
    publish_date?: SortOrder
    lang?: SortOrder
    lang_proba?: SortOrder
    date?: SortOrder
    source_id?: SortOrder
    permalink?: SortOrder
    mlready?: SortOrder
  }

  export type twitter_postsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    plain_content?: SortOrder
    publish_date?: SortOrder
    lang?: SortOrder
    lang_proba?: SortOrder
    date?: SortOrder
    source_id?: SortOrder
    permalink?: SortOrder
    mlready?: SortOrder
  }

  export type twitter_postsSumOrderByAggregateInput = {
    id?: SortOrder
    lang_proba?: SortOrder
    source_id?: SortOrder
    mlready?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Twitter_action_statsListRelationFilter = {
    every?: twitter_action_statsWhereInput
    some?: twitter_action_statsWhereInput
    none?: twitter_action_statsWhereInput
  }

  export type Twitter_postsListRelationFilter = {
    every?: twitter_postsWhereInput
    some?: twitter_postsWhereInput
    none?: twitter_postsWhereInput
  }

  export type Twitter_profiles_statsListRelationFilter = {
    every?: twitter_profiles_statsWhereInput
    some?: twitter_profiles_statsWhereInput
    none?: twitter_profiles_statsWhereInput
  }

  export type Twitter_profiles_twitter_postsListRelationFilter = {
    every?: twitter_profiles_twitter_postsWhereInput
    some?: twitter_profiles_twitter_postsWhereInput
    none?: twitter_profiles_twitter_postsWhereInput
  }

  export type twitter_action_statsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type twitter_postsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type twitter_profiles_statsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type twitter_profiles_twitter_postsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type twitter_profilesCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    profiles_id?: SortOrder
    active?: SortOrder
    updated?: SortOrder
  }

  export type twitter_profilesAvgOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
  }

  export type twitter_profilesMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    profiles_id?: SortOrder
    active?: SortOrder
    updated?: SortOrder
  }

  export type twitter_profilesMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    profiles_id?: SortOrder
    active?: SortOrder
    updated?: SortOrder
  }

  export type twitter_profilesSumOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
  }

  export type twitter_profiles_statsCountOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    date?: SortOrder
    subscription?: SortOrder
  }

  export type twitter_profiles_statsAvgOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    subscription?: SortOrder
  }

  export type twitter_profiles_statsMaxOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    date?: SortOrder
    subscription?: SortOrder
  }

  export type twitter_profiles_statsMinOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    date?: SortOrder
    subscription?: SortOrder
  }

  export type twitter_profiles_statsSumOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    subscription?: SortOrder
  }

  export type twitter_profiles_tempCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type twitter_profiles_tempAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type twitter_profiles_tempMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type twitter_profiles_tempMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type twitter_profiles_tempSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type twitter_profiles_twitter_postsCountOrderByAggregateInput = {
    id?: SortOrder
    post_id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    reposts?: SortOrder
    comments?: SortOrder
    saveds?: SortOrder
    twitter_profilesid?: SortOrder
    twitter_postid?: SortOrder
    isvideo?: SortOrder
    is_repost?: SortOrder
    source_link?: SortOrder
  }

  export type twitter_profiles_twitter_postsAvgOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    twitter_postid?: SortOrder
  }

  export type twitter_profiles_twitter_postsMaxOrderByAggregateInput = {
    id?: SortOrder
    post_id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    reposts?: SortOrder
    comments?: SortOrder
    saveds?: SortOrder
    twitter_profilesid?: SortOrder
    twitter_postid?: SortOrder
    isvideo?: SortOrder
    is_repost?: SortOrder
    source_link?: SortOrder
  }

  export type twitter_profiles_twitter_postsMinOrderByAggregateInput = {
    id?: SortOrder
    post_id?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    reposts?: SortOrder
    comments?: SortOrder
    saveds?: SortOrder
    twitter_profilesid?: SortOrder
    twitter_postid?: SortOrder
    isvideo?: SortOrder
    is_repost?: SortOrder
    source_link?: SortOrder
  }

  export type twitter_profiles_twitter_postsSumOrderByAggregateInput = {
    id?: SortOrder
    twitter_profilesid?: SortOrder
    twitter_postid?: SortOrder
  }

  export type twitter_relation_replyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    post_type?: SortOrder
    plain_context?: SortOrder
    replies?: SortOrder
    reposts?: SortOrder
    likes?: SortOrder
    bookmarks?: SortOrder
    views?: SortOrder
    publish_date?: SortOrder
    post_id?: SortOrder
    source_id?: SortOrder
    reposted_profile?: SortOrder
    root_post?: SortOrder
  }

  export type twitter_relation_replyAvgOrderByAggregateInput = {
    id?: SortOrder
    replies?: SortOrder
    reposts?: SortOrder
    likes?: SortOrder
    bookmarks?: SortOrder
    views?: SortOrder
  }

  export type twitter_relation_replyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    post_type?: SortOrder
    plain_context?: SortOrder
    replies?: SortOrder
    reposts?: SortOrder
    likes?: SortOrder
    bookmarks?: SortOrder
    views?: SortOrder
    publish_date?: SortOrder
    post_id?: SortOrder
    source_id?: SortOrder
    reposted_profile?: SortOrder
    root_post?: SortOrder
  }

  export type twitter_relation_replyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    post_type?: SortOrder
    plain_context?: SortOrder
    replies?: SortOrder
    reposts?: SortOrder
    likes?: SortOrder
    bookmarks?: SortOrder
    views?: SortOrder
    publish_date?: SortOrder
    post_id?: SortOrder
    source_id?: SortOrder
    reposted_profile?: SortOrder
    root_post?: SortOrder
  }

  export type twitter_relation_replySumOrderByAggregateInput = {
    id?: SortOrder
    replies?: SortOrder
    reposts?: SortOrder
    likes?: SortOrder
    bookmarks?: SortOrder
    views?: SortOrder
  }

  export type twitter_relationships_reply_profilesCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    followers_count?: SortOrder
    following_count?: SortOrder
    location?: SortOrder
    birthdate?: SortOrder
    description?: SortOrder
    joined?: SortOrder
    url?: SortOrder
    category?: SortOrder
  }

  export type twitter_relationships_reply_profilesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type twitter_relationships_reply_profilesMaxOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    followers_count?: SortOrder
    following_count?: SortOrder
    location?: SortOrder
    birthdate?: SortOrder
    description?: SortOrder
    joined?: SortOrder
    url?: SortOrder
    category?: SortOrder
  }

  export type twitter_relationships_reply_profilesMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    followers_count?: SortOrder
    following_count?: SortOrder
    location?: SortOrder
    birthdate?: SortOrder
    description?: SortOrder
    joined?: SortOrder
    url?: SortOrder
    category?: SortOrder
  }

  export type twitter_relationships_reply_profilesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type twitter_profilesCreateNestedOneWithoutTwitter_action_statsInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_action_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_action_statsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_action_statsInput
    connect?: twitter_profilesWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type twitter_profilesUpdateOneWithoutTwitter_action_statsNestedInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_action_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_action_statsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_action_statsInput
    upsert?: twitter_profilesUpsertWithoutTwitter_action_statsInput
    disconnect?: twitter_profilesWhereInput | boolean
    delete?: twitter_profilesWhereInput | boolean
    connect?: twitter_profilesWhereUniqueInput
    update?: XOR<XOR<twitter_profilesUpdateToOneWithWhereWithoutTwitter_action_statsInput, twitter_profilesUpdateWithoutTwitter_action_statsInput>, twitter_profilesUncheckedUpdateWithoutTwitter_action_statsInput>
  }

  export type twitter_postsCreateimage_dataInput = {
    set: string[]
  }

  export type twitter_profilesCreateNestedOneWithoutTwitter_postsInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_postsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_postsInput
    connect?: twitter_profilesWhereUniqueInput
  }

  export type twitter_postsUpdateimage_dataInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type twitter_profilesUpdateOneWithoutTwitter_postsNestedInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_postsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_postsInput
    upsert?: twitter_profilesUpsertWithoutTwitter_postsInput
    disconnect?: twitter_profilesWhereInput | boolean
    delete?: twitter_profilesWhereInput | boolean
    connect?: twitter_profilesWhereUniqueInput
    update?: XOR<XOR<twitter_profilesUpdateToOneWithWhereWithoutTwitter_postsInput, twitter_profilesUpdateWithoutTwitter_postsInput>, twitter_profilesUncheckedUpdateWithoutTwitter_postsInput>
  }

  export type twitter_action_statsCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_action_statsCreateWithoutTwitter_profilesInput, twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_action_statsCreateWithoutTwitter_profilesInput[] | twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_action_statsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
  }

  export type twitter_postsCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_postsCreateWithoutTwitter_profilesInput, twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_postsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
  }

  export type twitter_profiles_statsCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_profiles_statsCreateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_statsCreateWithoutTwitter_profilesInput[] | twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_statsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
  }

  export type twitter_profiles_twitter_postsCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_twitter_postsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
  }

  export type twitter_action_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_action_statsCreateWithoutTwitter_profilesInput, twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_action_statsCreateWithoutTwitter_profilesInput[] | twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_action_statsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
  }

  export type twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_postsCreateWithoutTwitter_profilesInput, twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_postsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
  }

  export type twitter_profiles_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_profiles_statsCreateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_statsCreateWithoutTwitter_profilesInput[] | twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_statsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
  }

  export type twitter_profiles_twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput = {
    create?: XOR<twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_twitter_postsCreateManyTwitter_profilesInputEnvelope
    connect?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
  }

  export type twitter_action_statsUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_action_statsCreateWithoutTwitter_profilesInput, twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_action_statsCreateWithoutTwitter_profilesInput[] | twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_action_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_action_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_action_statsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    disconnect?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    delete?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    connect?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    update?: twitter_action_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_action_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_action_statsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_action_statsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_action_statsScalarWhereInput | twitter_action_statsScalarWhereInput[]
  }

  export type twitter_postsUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_postsCreateWithoutTwitter_profilesInput, twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_postsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    disconnect?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    delete?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    connect?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    update?: twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_postsScalarWhereInput | twitter_postsScalarWhereInput[]
  }

  export type twitter_profiles_statsUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_profiles_statsCreateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_statsCreateWithoutTwitter_profilesInput[] | twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_profiles_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_statsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    disconnect?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    delete?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    connect?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    update?: twitter_profiles_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_profiles_statsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_profiles_statsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_profiles_statsScalarWhereInput | twitter_profiles_statsScalarWhereInput[]
  }

  export type twitter_profiles_twitter_postsUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_profiles_twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_twitter_postsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    disconnect?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    delete?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    connect?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    update?: twitter_profiles_twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_profiles_twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_profiles_twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_profiles_twitter_postsScalarWhereInput | twitter_profiles_twitter_postsScalarWhereInput[]
  }

  export type twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_action_statsCreateWithoutTwitter_profilesInput, twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_action_statsCreateWithoutTwitter_profilesInput[] | twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_action_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_action_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_action_statsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    disconnect?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    delete?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    connect?: twitter_action_statsWhereUniqueInput | twitter_action_statsWhereUniqueInput[]
    update?: twitter_action_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_action_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_action_statsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_action_statsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_action_statsScalarWhereInput | twitter_action_statsScalarWhereInput[]
  }

  export type twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_postsCreateWithoutTwitter_profilesInput, twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_postsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    disconnect?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    delete?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    connect?: twitter_postsWhereUniqueInput | twitter_postsWhereUniqueInput[]
    update?: twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_postsScalarWhereInput | twitter_postsScalarWhereInput[]
  }

  export type twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_profiles_statsCreateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_statsCreateWithoutTwitter_profilesInput[] | twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_profiles_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_statsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    disconnect?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    delete?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    connect?: twitter_profiles_statsWhereUniqueInput | twitter_profiles_statsWhereUniqueInput[]
    update?: twitter_profiles_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_profiles_statsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_profiles_statsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_profiles_statsScalarWhereInput | twitter_profiles_statsScalarWhereInput[]
  }

  export type twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput = {
    create?: XOR<twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput> | twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput[] | twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput[]
    connectOrCreate?: twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput | twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput[]
    upsert?: twitter_profiles_twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput[]
    createMany?: twitter_profiles_twitter_postsCreateManyTwitter_profilesInputEnvelope
    set?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    disconnect?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    delete?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    connect?: twitter_profiles_twitter_postsWhereUniqueInput | twitter_profiles_twitter_postsWhereUniqueInput[]
    update?: twitter_profiles_twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput | twitter_profiles_twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput[]
    updateMany?: twitter_profiles_twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput | twitter_profiles_twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput[]
    deleteMany?: twitter_profiles_twitter_postsScalarWhereInput | twitter_profiles_twitter_postsScalarWhereInput[]
  }

  export type twitter_profilesCreateNestedOneWithoutTwitter_profiles_statsInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_profiles_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_statsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_profiles_statsInput
    connect?: twitter_profilesWhereUniqueInput
  }

  export type twitter_profilesUpdateOneWithoutTwitter_profiles_statsNestedInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_profiles_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_statsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_profiles_statsInput
    upsert?: twitter_profilesUpsertWithoutTwitter_profiles_statsInput
    disconnect?: twitter_profilesWhereInput | boolean
    delete?: twitter_profilesWhereInput | boolean
    connect?: twitter_profilesWhereUniqueInput
    update?: XOR<XOR<twitter_profilesUpdateToOneWithWhereWithoutTwitter_profiles_statsInput, twitter_profilesUpdateWithoutTwitter_profiles_statsInput>, twitter_profilesUncheckedUpdateWithoutTwitter_profiles_statsInput>
  }

  export type twitter_profilesCreateNestedOneWithoutTwitter_profiles_twitter_postsInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_twitter_postsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_profiles_twitter_postsInput
    connect?: twitter_profilesWhereUniqueInput
  }

  export type twitter_profilesUpdateOneWithoutTwitter_profiles_twitter_postsNestedInput = {
    create?: XOR<twitter_profilesCreateWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_twitter_postsInput>
    connectOrCreate?: twitter_profilesCreateOrConnectWithoutTwitter_profiles_twitter_postsInput
    upsert?: twitter_profilesUpsertWithoutTwitter_profiles_twitter_postsInput
    disconnect?: twitter_profilesWhereInput | boolean
    delete?: twitter_profilesWhereInput | boolean
    connect?: twitter_profilesWhereUniqueInput
    update?: XOR<XOR<twitter_profilesUpdateToOneWithWhereWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUpdateWithoutTwitter_profiles_twitter_postsInput>, twitter_profilesUncheckedUpdateWithoutTwitter_profiles_twitter_postsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type twitter_profilesCreateWithoutTwitter_action_statsInput = {
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_posts?: twitter_postsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesUncheckedCreateWithoutTwitter_action_statsInput = {
    id?: number
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_posts?: twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesCreateOrConnectWithoutTwitter_action_statsInput = {
    where: twitter_profilesWhereUniqueInput
    create: XOR<twitter_profilesCreateWithoutTwitter_action_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_action_statsInput>
  }

  export type twitter_profilesUpsertWithoutTwitter_action_statsInput = {
    update: XOR<twitter_profilesUpdateWithoutTwitter_action_statsInput, twitter_profilesUncheckedUpdateWithoutTwitter_action_statsInput>
    create: XOR<twitter_profilesCreateWithoutTwitter_action_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_action_statsInput>
    where?: twitter_profilesWhereInput
  }

  export type twitter_profilesUpdateToOneWithWhereWithoutTwitter_action_statsInput = {
    where?: twitter_profilesWhereInput
    data: XOR<twitter_profilesUpdateWithoutTwitter_action_statsInput, twitter_profilesUncheckedUpdateWithoutTwitter_action_statsInput>
  }

  export type twitter_profilesUpdateWithoutTwitter_action_statsInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_posts?: twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesUncheckedUpdateWithoutTwitter_action_statsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_posts?: twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesCreateWithoutTwitter_postsInput = {
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesUncheckedCreateWithoutTwitter_postsInput = {
    id?: number
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesCreateOrConnectWithoutTwitter_postsInput = {
    where: twitter_profilesWhereUniqueInput
    create: XOR<twitter_profilesCreateWithoutTwitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_postsInput>
  }

  export type twitter_profilesUpsertWithoutTwitter_postsInput = {
    update: XOR<twitter_profilesUpdateWithoutTwitter_postsInput, twitter_profilesUncheckedUpdateWithoutTwitter_postsInput>
    create: XOR<twitter_profilesCreateWithoutTwitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_postsInput>
    where?: twitter_profilesWhereInput
  }

  export type twitter_profilesUpdateToOneWithWhereWithoutTwitter_postsInput = {
    where?: twitter_profilesWhereInput
    data: XOR<twitter_profilesUpdateWithoutTwitter_postsInput, twitter_profilesUncheckedUpdateWithoutTwitter_postsInput>
  }

  export type twitter_profilesUpdateWithoutTwitter_postsInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesUncheckedUpdateWithoutTwitter_postsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_action_statsCreateWithoutTwitter_profilesInput = {
    likes?: number | null
    views?: number | null
    comments?: number | null
    reposts?: number | null
    saveds?: number | null
    post_id?: number | null
    permalink?: string | null
    rev?: number | null
    date?: Date | string | null
  }

  export type twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput = {
    id?: number
    likes?: number | null
    views?: number | null
    comments?: number | null
    reposts?: number | null
    saveds?: number | null
    post_id?: number | null
    permalink?: string | null
    rev?: number | null
    date?: Date | string | null
  }

  export type twitter_action_statsCreateOrConnectWithoutTwitter_profilesInput = {
    where: twitter_action_statsWhereUniqueInput
    create: XOR<twitter_action_statsCreateWithoutTwitter_profilesInput, twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_action_statsCreateManyTwitter_profilesInputEnvelope = {
    data: twitter_action_statsCreateManyTwitter_profilesInput | twitter_action_statsCreateManyTwitter_profilesInput[]
    skipDuplicates?: boolean
  }

  export type twitter_postsCreateWithoutTwitter_profilesInput = {
    id?: number
    title?: string | null
    plain_content?: string | null
    image_data?: twitter_postsCreateimage_dataInput | string[]
    publish_date?: Date | string | null
    lang?: string | null
    lang_proba?: Decimal | DecimalJsLike | number | string | null
    date: Date | string
    permalink?: string | null
    mlready?: number
  }

  export type twitter_postsUncheckedCreateWithoutTwitter_profilesInput = {
    id?: number
    title?: string | null
    plain_content?: string | null
    image_data?: twitter_postsCreateimage_dataInput | string[]
    publish_date?: Date | string | null
    lang?: string | null
    lang_proba?: Decimal | DecimalJsLike | number | string | null
    date: Date | string
    permalink?: string | null
    mlready?: number
  }

  export type twitter_postsCreateOrConnectWithoutTwitter_profilesInput = {
    where: twitter_postsWhereUniqueInput
    create: XOR<twitter_postsCreateWithoutTwitter_profilesInput, twitter_postsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_postsCreateManyTwitter_profilesInputEnvelope = {
    data: twitter_postsCreateManyTwitter_profilesInput | twitter_postsCreateManyTwitter_profilesInput[]
    skipDuplicates?: boolean
  }

  export type twitter_profiles_statsCreateWithoutTwitter_profilesInput = {
    date?: Date | string | null
    subscription?: number | null
  }

  export type twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput = {
    id?: number
    date?: Date | string | null
    subscription?: number | null
  }

  export type twitter_profiles_statsCreateOrConnectWithoutTwitter_profilesInput = {
    where: twitter_profiles_statsWhereUniqueInput
    create: XOR<twitter_profiles_statsCreateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_statsCreateManyTwitter_profilesInputEnvelope = {
    data: twitter_profiles_statsCreateManyTwitter_profilesInput | twitter_profiles_statsCreateManyTwitter_profilesInput[]
    skipDuplicates?: boolean
  }

  export type twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput = {
    post_id: string
    likes?: string | null
    views?: string | null
    reposts?: string | null
    comments?: string | null
    saveds?: string | null
    twitter_postid?: number | null
    isvideo?: boolean | null
    is_repost?: boolean | null
    source_link?: string | null
  }

  export type twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput = {
    id?: number
    post_id: string
    likes?: string | null
    views?: string | null
    reposts?: string | null
    comments?: string | null
    saveds?: string | null
    twitter_postid?: number | null
    isvideo?: boolean | null
    is_repost?: boolean | null
    source_link?: string | null
  }

  export type twitter_profiles_twitter_postsCreateOrConnectWithoutTwitter_profilesInput = {
    where: twitter_profiles_twitter_postsWhereUniqueInput
    create: XOR<twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_twitter_postsCreateManyTwitter_profilesInputEnvelope = {
    data: twitter_profiles_twitter_postsCreateManyTwitter_profilesInput | twitter_profiles_twitter_postsCreateManyTwitter_profilesInput[]
    skipDuplicates?: boolean
  }

  export type twitter_action_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_action_statsWhereUniqueInput
    update: XOR<twitter_action_statsUpdateWithoutTwitter_profilesInput, twitter_action_statsUncheckedUpdateWithoutTwitter_profilesInput>
    create: XOR<twitter_action_statsCreateWithoutTwitter_profilesInput, twitter_action_statsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_action_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_action_statsWhereUniqueInput
    data: XOR<twitter_action_statsUpdateWithoutTwitter_profilesInput, twitter_action_statsUncheckedUpdateWithoutTwitter_profilesInput>
  }

  export type twitter_action_statsUpdateManyWithWhereWithoutTwitter_profilesInput = {
    where: twitter_action_statsScalarWhereInput
    data: XOR<twitter_action_statsUpdateManyMutationInput, twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesInput>
  }

  export type twitter_action_statsScalarWhereInput = {
    AND?: twitter_action_statsScalarWhereInput | twitter_action_statsScalarWhereInput[]
    OR?: twitter_action_statsScalarWhereInput[]
    NOT?: twitter_action_statsScalarWhereInput | twitter_action_statsScalarWhereInput[]
    id?: IntFilter<"twitter_action_stats"> | number
    likes?: IntNullableFilter<"twitter_action_stats"> | number | null
    views?: IntNullableFilter<"twitter_action_stats"> | number | null
    comments?: IntNullableFilter<"twitter_action_stats"> | number | null
    reposts?: IntNullableFilter<"twitter_action_stats"> | number | null
    saveds?: IntNullableFilter<"twitter_action_stats"> | number | null
    post_id?: IntNullableFilter<"twitter_action_stats"> | number | null
    permalink?: StringNullableFilter<"twitter_action_stats"> | string | null
    source_id?: IntNullableFilter<"twitter_action_stats"> | number | null
    rev?: IntNullableFilter<"twitter_action_stats"> | number | null
    date?: DateTimeNullableFilter<"twitter_action_stats"> | Date | string | null
  }

  export type twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_postsWhereUniqueInput
    update: XOR<twitter_postsUpdateWithoutTwitter_profilesInput, twitter_postsUncheckedUpdateWithoutTwitter_profilesInput>
    create: XOR<twitter_postsCreateWithoutTwitter_profilesInput, twitter_postsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_postsWhereUniqueInput
    data: XOR<twitter_postsUpdateWithoutTwitter_profilesInput, twitter_postsUncheckedUpdateWithoutTwitter_profilesInput>
  }

  export type twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput = {
    where: twitter_postsScalarWhereInput
    data: XOR<twitter_postsUpdateManyMutationInput, twitter_postsUncheckedUpdateManyWithoutTwitter_profilesInput>
  }

  export type twitter_postsScalarWhereInput = {
    AND?: twitter_postsScalarWhereInput | twitter_postsScalarWhereInput[]
    OR?: twitter_postsScalarWhereInput[]
    NOT?: twitter_postsScalarWhereInput | twitter_postsScalarWhereInput[]
    id?: IntFilter<"twitter_posts"> | number
    title?: StringNullableFilter<"twitter_posts"> | string | null
    plain_content?: StringNullableFilter<"twitter_posts"> | string | null
    image_data?: StringNullableListFilter<"twitter_posts">
    publish_date?: DateTimeNullableFilter<"twitter_posts"> | Date | string | null
    lang?: StringNullableFilter<"twitter_posts"> | string | null
    lang_proba?: DecimalNullableFilter<"twitter_posts"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFilter<"twitter_posts"> | Date | string
    source_id?: IntNullableFilter<"twitter_posts"> | number | null
    permalink?: StringNullableFilter<"twitter_posts"> | string | null
    mlready?: IntFilter<"twitter_posts"> | number
  }

  export type twitter_profiles_statsUpsertWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_profiles_statsWhereUniqueInput
    update: XOR<twitter_profiles_statsUpdateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedUpdateWithoutTwitter_profilesInput>
    create: XOR<twitter_profiles_statsCreateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_statsUpdateWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_profiles_statsWhereUniqueInput
    data: XOR<twitter_profiles_statsUpdateWithoutTwitter_profilesInput, twitter_profiles_statsUncheckedUpdateWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_statsUpdateManyWithWhereWithoutTwitter_profilesInput = {
    where: twitter_profiles_statsScalarWhereInput
    data: XOR<twitter_profiles_statsUpdateManyMutationInput, twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_statsScalarWhereInput = {
    AND?: twitter_profiles_statsScalarWhereInput | twitter_profiles_statsScalarWhereInput[]
    OR?: twitter_profiles_statsScalarWhereInput[]
    NOT?: twitter_profiles_statsScalarWhereInput | twitter_profiles_statsScalarWhereInput[]
    id?: IntFilter<"twitter_profiles_stats"> | number
    twitter_profilesid?: IntNullableFilter<"twitter_profiles_stats"> | number | null
    date?: DateTimeNullableFilter<"twitter_profiles_stats"> | Date | string | null
    subscription?: IntNullableFilter<"twitter_profiles_stats"> | number | null
  }

  export type twitter_profiles_twitter_postsUpsertWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_profiles_twitter_postsWhereUniqueInput
    update: XOR<twitter_profiles_twitter_postsUpdateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedUpdateWithoutTwitter_profilesInput>
    create: XOR<twitter_profiles_twitter_postsCreateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedCreateWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_twitter_postsUpdateWithWhereUniqueWithoutTwitter_profilesInput = {
    where: twitter_profiles_twitter_postsWhereUniqueInput
    data: XOR<twitter_profiles_twitter_postsUpdateWithoutTwitter_profilesInput, twitter_profiles_twitter_postsUncheckedUpdateWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_twitter_postsUpdateManyWithWhereWithoutTwitter_profilesInput = {
    where: twitter_profiles_twitter_postsScalarWhereInput
    data: XOR<twitter_profiles_twitter_postsUpdateManyMutationInput, twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesInput>
  }

  export type twitter_profiles_twitter_postsScalarWhereInput = {
    AND?: twitter_profiles_twitter_postsScalarWhereInput | twitter_profiles_twitter_postsScalarWhereInput[]
    OR?: twitter_profiles_twitter_postsScalarWhereInput[]
    NOT?: twitter_profiles_twitter_postsScalarWhereInput | twitter_profiles_twitter_postsScalarWhereInput[]
    id?: IntFilter<"twitter_profiles_twitter_posts"> | number
    post_id?: StringFilter<"twitter_profiles_twitter_posts"> | string
    likes?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    views?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    reposts?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    comments?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    saveds?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
    twitter_profilesid?: IntNullableFilter<"twitter_profiles_twitter_posts"> | number | null
    twitter_postid?: IntNullableFilter<"twitter_profiles_twitter_posts"> | number | null
    isvideo?: BoolNullableFilter<"twitter_profiles_twitter_posts"> | boolean | null
    is_repost?: BoolNullableFilter<"twitter_profiles_twitter_posts"> | boolean | null
    source_link?: StringNullableFilter<"twitter_profiles_twitter_posts"> | string | null
  }

  export type twitter_profilesCreateWithoutTwitter_profiles_statsInput = {
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_posts?: twitter_postsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesUncheckedCreateWithoutTwitter_profiles_statsInput = {
    id?: number
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_posts?: twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesCreateOrConnectWithoutTwitter_profiles_statsInput = {
    where: twitter_profilesWhereUniqueInput
    create: XOR<twitter_profilesCreateWithoutTwitter_profiles_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_statsInput>
  }

  export type twitter_profilesUpsertWithoutTwitter_profiles_statsInput = {
    update: XOR<twitter_profilesUpdateWithoutTwitter_profiles_statsInput, twitter_profilesUncheckedUpdateWithoutTwitter_profiles_statsInput>
    create: XOR<twitter_profilesCreateWithoutTwitter_profiles_statsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_statsInput>
    where?: twitter_profilesWhereInput
  }

  export type twitter_profilesUpdateToOneWithWhereWithoutTwitter_profiles_statsInput = {
    where?: twitter_profilesWhereInput
    data: XOR<twitter_profilesUpdateWithoutTwitter_profiles_statsInput, twitter_profilesUncheckedUpdateWithoutTwitter_profiles_statsInput>
  }

  export type twitter_profilesUpdateWithoutTwitter_profiles_statsInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_posts?: twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesUncheckedUpdateWithoutTwitter_profiles_statsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_posts?: twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_twitter_posts?: twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesCreateWithoutTwitter_profiles_twitter_postsInput = {
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsCreateNestedManyWithoutTwitter_profilesInput
    twitter_posts?: twitter_postsCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesUncheckedCreateWithoutTwitter_profiles_twitter_postsInput = {
    id?: number
    type?: string | null
    name?: string | null
    profiles_id?: string | null
    active?: number | null
    updated?: Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_posts?: twitter_postsUncheckedCreateNestedManyWithoutTwitter_profilesInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedCreateNestedManyWithoutTwitter_profilesInput
  }

  export type twitter_profilesCreateOrConnectWithoutTwitter_profiles_twitter_postsInput = {
    where: twitter_profilesWhereUniqueInput
    create: XOR<twitter_profilesCreateWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_twitter_postsInput>
  }

  export type twitter_profilesUpsertWithoutTwitter_profiles_twitter_postsInput = {
    update: XOR<twitter_profilesUpdateWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUncheckedUpdateWithoutTwitter_profiles_twitter_postsInput>
    create: XOR<twitter_profilesCreateWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUncheckedCreateWithoutTwitter_profiles_twitter_postsInput>
    where?: twitter_profilesWhereInput
  }

  export type twitter_profilesUpdateToOneWithWhereWithoutTwitter_profiles_twitter_postsInput = {
    where?: twitter_profilesWhereInput
    data: XOR<twitter_profilesUpdateWithoutTwitter_profiles_twitter_postsInput, twitter_profilesUncheckedUpdateWithoutTwitter_profiles_twitter_postsInput>
  }

  export type twitter_profilesUpdateWithoutTwitter_profiles_twitter_postsInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_posts?: twitter_postsUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_profilesUncheckedUpdateWithoutTwitter_profiles_twitter_postsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profiles_id?: NullableStringFieldUpdateOperationsInput | string | null
    active?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitter_action_stats?: twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_posts?: twitter_postsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
    twitter_profiles_stats?: twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesNestedInput
  }

  export type twitter_action_statsCreateManyTwitter_profilesInput = {
    id?: number
    likes?: number | null
    views?: number | null
    comments?: number | null
    reposts?: number | null
    saveds?: number | null
    post_id?: number | null
    permalink?: string | null
    rev?: number | null
    date?: Date | string | null
  }

  export type twitter_postsCreateManyTwitter_profilesInput = {
    id?: number
    title?: string | null
    plain_content?: string | null
    image_data?: twitter_postsCreateimage_dataInput | string[]
    publish_date?: Date | string | null
    lang?: string | null
    lang_proba?: Decimal | DecimalJsLike | number | string | null
    date: Date | string
    permalink?: string | null
    mlready?: number
  }

  export type twitter_profiles_statsCreateManyTwitter_profilesInput = {
    id?: number
    date?: Date | string | null
    subscription?: number | null
  }

  export type twitter_profiles_twitter_postsCreateManyTwitter_profilesInput = {
    id?: number
    post_id: string
    likes?: string | null
    views?: string | null
    reposts?: string | null
    comments?: string | null
    saveds?: string | null
    twitter_postid?: number | null
    isvideo?: boolean | null
    is_repost?: boolean | null
    source_link?: string | null
  }

  export type twitter_action_statsUpdateWithoutTwitter_profilesInput = {
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_action_statsUncheckedUpdateWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_action_statsUncheckedUpdateManyWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    likes?: NullableIntFieldUpdateOperationsInput | number | null
    views?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableIntFieldUpdateOperationsInput | number | null
    reposts?: NullableIntFieldUpdateOperationsInput | number | null
    saveds?: NullableIntFieldUpdateOperationsInput | number | null
    post_id?: NullableIntFieldUpdateOperationsInput | number | null
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    rev?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type twitter_postsUpdateWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
  }

  export type twitter_postsUncheckedUpdateWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
  }

  export type twitter_postsUncheckedUpdateManyWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    plain_content?: NullableStringFieldUpdateOperationsInput | string | null
    image_data?: twitter_postsUpdateimage_dataInput | string[]
    publish_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lang?: NullableStringFieldUpdateOperationsInput | string | null
    lang_proba?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    permalink?: NullableStringFieldUpdateOperationsInput | string | null
    mlready?: IntFieldUpdateOperationsInput | number
  }

  export type twitter_profiles_statsUpdateWithoutTwitter_profilesInput = {
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type twitter_profiles_statsUncheckedUpdateWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type twitter_profiles_statsUncheckedUpdateManyWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscription?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type twitter_profiles_twitter_postsUpdateWithoutTwitter_profilesInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_twitter_postsUncheckedUpdateWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twitter_profiles_twitter_postsUncheckedUpdateManyWithoutTwitter_profilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    post_id?: StringFieldUpdateOperationsInput | string
    likes?: NullableStringFieldUpdateOperationsInput | string | null
    views?: NullableStringFieldUpdateOperationsInput | string | null
    reposts?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    saveds?: NullableStringFieldUpdateOperationsInput | string | null
    twitter_postid?: NullableIntFieldUpdateOperationsInput | number | null
    isvideo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_repost?: NullableBoolFieldUpdateOperationsInput | boolean | null
    source_link?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use Twitter_profilesCountOutputTypeDefaultArgs instead
     */
    export type Twitter_profilesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Twitter_profilesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use future_sourcesDefaultArgs instead
     */
    export type future_sourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = future_sourcesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use rss_newsDefaultArgs instead
     */
    export type rss_newsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = rss_newsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_action_statsDefaultArgs instead
     */
    export type twitter_action_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_action_statsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_postsDefaultArgs instead
     */
    export type twitter_postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_postsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_profilesDefaultArgs instead
     */
    export type twitter_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_profilesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_profiles_statsDefaultArgs instead
     */
    export type twitter_profiles_statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_profiles_statsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_profiles_tempDefaultArgs instead
     */
    export type twitter_profiles_tempArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_profiles_tempDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_profiles_twitter_postsDefaultArgs instead
     */
    export type twitter_profiles_twitter_postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_profiles_twitter_postsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_relation_replyDefaultArgs instead
     */
    export type twitter_relation_replyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_relation_replyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use twitter_relationships_reply_profilesDefaultArgs instead
     */
    export type twitter_relationships_reply_profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = twitter_relationships_reply_profilesDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}