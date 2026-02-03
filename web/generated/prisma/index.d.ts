/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Account
 *
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken =
	$Result.DefaultSelection<Prisma.$VerificationTokenPayload>;
/**
 * Model Bus
 *
 */
export type Bus = $Result.DefaultSelection<Prisma.$BusPayload>;
/**
 * Model Driver
 *
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>;
/**
 * Model Conductor
 *
 */
export type Conductor = $Result.DefaultSelection<Prisma.$ConductorPayload>;
/**
 * Model Stop
 *
 */
export type Stop = $Result.DefaultSelection<Prisma.$StopPayload>;
/**
 * Model StudentPass
 *
 */
export type StudentPass = $Result.DefaultSelection<Prisma.$StudentPassPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
	ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
	const U = "log" extends keyof ClientOptions
		? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
			? Prisma.GetEvents<ClientOptions["log"]>
			: never
		: never,
	ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
	[K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

	/**
	 * ##  Prisma Client ʲˢ
	 *
	 * Type-safe database client for TypeScript & Node.js
	 * @example
	 * ```
	 * const prisma = new PrismaClient()
	 * // Fetch zero or more Accounts
	 * const accounts = await prisma.account.findMany()
	 * ```
	 *
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
	 */

	constructor(
		optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
	);
	$on<V extends U>(
		eventType: V,
		callback: (
			event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
		) => void,
	): PrismaClient;

	/**
	 * Connect with the database
	 */
	$connect(): $Utils.JsPromise<void>;

	/**
	 * Disconnect from the database
	 */
	$disconnect(): $Utils.JsPromise<void>;

	/**
	 * Executes a prepared raw query and returns the number of affected rows.
	 * @example
	 * ```
	 * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$executeRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<number>;

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
	$executeRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<number>;

	/**
	 * Performs a prepared raw query and returns the `SELECT` data.
	 * @example
	 * ```
	 * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$queryRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<T>;

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
	$queryRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<T>;

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
	$transaction<P extends Prisma.PrismaPromise<any>[]>(
		arg: [...P],
		options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
	): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

	$transaction<R>(
		fn: (
			prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
		) => $Utils.JsPromise<R>,
		options?: {
			maxWait?: number;
			timeout?: number;
			isolationLevel?: Prisma.TransactionIsolationLevel;
		},
	): $Utils.JsPromise<R>;

	$extends: $Extensions.ExtendsHook<
		"extends",
		Prisma.TypeMapCb<ClientOptions>,
		ExtArgs,
		$Utils.Call<
			Prisma.TypeMapCb<ClientOptions>,
			{
				extArgs: ExtArgs;
			}
		>
	>;

	/**
	 * `prisma.account`: Exposes CRUD operations for the **Account** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Accounts
	 * const accounts = await prisma.account.findMany()
	 * ```
	 */
	get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.session`: Exposes CRUD operations for the **Session** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Sessions
	 * const sessions = await prisma.session.findMany()
	 * ```
	 */
	get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.user`: Exposes CRUD operations for the **User** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Users
	 * const users = await prisma.user.findMany()
	 * ```
	 */
	get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more VerificationTokens
	 * const verificationTokens = await prisma.verificationToken.findMany()
	 * ```
	 */
	get verificationToken(): Prisma.VerificationTokenDelegate<
		ExtArgs,
		ClientOptions
	>;

	/**
	 * `prisma.bus`: Exposes CRUD operations for the **Bus** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Buses
	 * const buses = await prisma.bus.findMany()
	 * ```
	 */
	get bus(): Prisma.BusDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Drivers
	 * const drivers = await prisma.driver.findMany()
	 * ```
	 */
	get driver(): Prisma.DriverDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.conductor`: Exposes CRUD operations for the **Conductor** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Conductors
	 * const conductors = await prisma.conductor.findMany()
	 * ```
	 */
	get conductor(): Prisma.ConductorDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.stop`: Exposes CRUD operations for the **Stop** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Stops
	 * const stops = await prisma.stop.findMany()
	 * ```
	 */
	get stop(): Prisma.StopDelegate<ExtArgs, ClientOptions>;

	/**
	 * `prisma.studentPass`: Exposes CRUD operations for the **StudentPass** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more StudentPasses
	 * const studentPasses = await prisma.studentPass.findMany()
	 * ```
	 */
	get studentPass(): Prisma.StudentPassDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
	export import DMMF = runtime.DMMF;

	export type PrismaPromise<T> = $Public.PrismaPromise<T>;

	/**
	 * Validator
	 */
	export import validator = runtime.Public.validator;

	/**
	 * Prisma Errors
	 */
	export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
	export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
	export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
	export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
	export import PrismaClientValidationError = runtime.PrismaClientValidationError;

	/**
	 * Re-export of sql-template-tag
	 */
	export import sql = runtime.sqltag;
	export import empty = runtime.empty;
	export import join = runtime.join;
	export import raw = runtime.raw;
	export import Sql = runtime.Sql;

	/**
	 * Decimal.js
	 */
	export import Decimal = runtime.Decimal;

	export type DecimalJsLike = runtime.DecimalJsLike;

	/**
	 * Metrics
	 */
	export type Metrics = runtime.Metrics;
	export type Metric<T> = runtime.Metric<T>;
	export type MetricHistogram = runtime.MetricHistogram;
	export type MetricHistogramBucket = runtime.MetricHistogramBucket;

	/**
	 * Extensions
	 */
	export import Extension = $Extensions.UserArgs;
	export import getExtensionContext = runtime.Extensions.getExtensionContext;
	export import Args = $Public.Args;
	export import Payload = $Public.Payload;
	export import Result = $Public.Result;
	export import Exact = $Public.Exact;

	/**
	 * Prisma Client JS version: 6.19.2
	 * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
	 */
	export type PrismaVersion = {
		client: string;
	};

	export const prismaVersion: PrismaVersion;

	/**
	 * Utility Types
	 */

	export import Bytes = runtime.Bytes;
	export import JsonObject = runtime.JsonObject;
	export import JsonArray = runtime.JsonArray;
	export import JsonValue = runtime.JsonValue;
	export import InputJsonObject = runtime.InputJsonObject;
	export import InputJsonArray = runtime.InputJsonArray;
	export import InputJsonValue = runtime.InputJsonValue;

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
			private DbNull: never;
			private constructor();
		}

		/**
		 * Type of `Prisma.JsonNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class JsonNull {
			private JsonNull: never;
			private constructor();
		}

		/**
		 * Type of `Prisma.AnyNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class AnyNull {
			private AnyNull: never;
			private constructor();
		}
	}

	/**
	 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const DbNull: NullTypes.DbNull;

	/**
	 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const JsonNull: NullTypes.JsonNull;

	/**
	 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const AnyNull: NullTypes.AnyNull;

	type SelectAndInclude = {
		select: any;
		include: any;
	};

	type SelectAndOmit = {
		select: any;
		omit: any;
	};

	/**
	 * Get the type of the value, that the Promise holds.
	 */
	export type PromiseType<T extends PromiseLike<any>> =
		T extends PromiseLike<infer U> ? U : T;

	/**
	 * Get the return type of a function which returns a Promise.
	 */
	export type PromiseReturnType<
		T extends (...args: any) => $Utils.JsPromise<any>,
	> = PromiseType<ReturnType<T>>;

	/**
	 * From T, pick a set of properties whose keys are in the union K
	 */
	type Prisma__Pick<T, K extends keyof T> = {
		[P in K]: T[P];
	};

	export type Enumerable<T> = T | Array<T>;

	export type RequiredKeys<T> = {
		[K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
	}[keyof T];

	export type TruthyKeys<T> = keyof {
		[K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
	};

	export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
		[key in keyof T]: key extends keyof U ? T[key] : never;
	} & (T extends SelectAndInclude
		? "Please either choose `select` or `include`."
		: T extends SelectAndOmit
			? "Please either choose `select` or `omit`."
			: {});

	/**
	 * Subset + Intersection
	 * @desc From `T` pick properties that exist in `U` and intersect `K`
	 */
	export type SubsetIntersection<T, U, K> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	} & K;

	type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

	/**
	 * XOR is needed to have a real mutually exclusive union type
	 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
	 */
	type XOR<T, U> = T extends object
		? U extends object
			? (Without<T, U> & U) | (Without<U, T> & T)
			: U
		: T;

	/**
	 * Is T a Record?
	 */
	type IsObject<T> =
		T extends Array<any>
			? False
			: T extends Date
				? False
				: T extends Uint8Array
					? False
					: T extends bigint
						? False
						: T extends object
							? True
							: False;

	/**
	 * If it's T[], return T
	 */
	export type UnEnumerate<T> = T extends Array<infer U> ? U : T;

	/**
	 * From ts-toolbelt
	 */

	type __Either<O extends object, K extends Key> = Omit<O, K> &
		{
			// Merge all but K
			[P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
		}[K];

	type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

	type EitherLoose<O extends object, K extends Key> = ComputeRaw<
		__Either<O, K>
	>;

	type _Either<O extends object, K extends Key, strict extends Boolean> = {
		1: EitherStrict<O, K>;
		0: EitherLoose<O, K>;
	}[strict];

	type Either<
		O extends object,
		K extends Key,
		strict extends Boolean = 1,
	> = O extends unknown ? _Either<O, K, strict> : never;

	export type Union = any;

	type PatchUndefined<O extends object, O1 extends object> = {
		[K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
	} & {};

	/** Helper Types for "Merge" **/
	export type IntersectOf<U extends Union> = (
		U extends unknown
			? (k: U) => void
			: never
	) extends (k: infer I) => void
		? I
		: never;

	export type Overwrite<O extends object, O1 extends object> = {
		[K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
	} & {};

	type _Merge<U extends object> = IntersectOf<
		Overwrite<
			U,
			{
				[K in keyof U]-?: At<U, K>;
			}
		>
	>;

	type Key = string | number | symbol;
	type AtBasic<O extends object, K extends Key> = K extends keyof O
		? O[K]
		: never;
	type AtStrict<O extends object, K extends Key> = O[K & keyof O];
	type AtLoose<O extends object, K extends Key> = O extends unknown
		? AtStrict<O, K>
		: never;
	export type At<
		O extends object,
		K extends Key,
		strict extends Boolean = 1,
	> = {
		1: AtStrict<O, K>;
		0: AtLoose<O, K>;
	}[strict];

	export type ComputeRaw<A> = A extends Function
		? A
		: {
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
			?
					| (K extends keyof O ? { [P in K]: O[P] } & O : O)
					| ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
			: never
	>;

	type _Strict<U, _U = U> = U extends unknown
		? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
		: never;

	export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
	/** End Helper Types for "Merge" **/

	export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

	/**
  A [[Boolean]]
  */
	export type Boolean = True | False;

	// /**
	// 1
	// */
	export type True = 1;

	/**
  0
  */
	export type False = 0;

	export type Not<B extends Boolean> = {
		0: 1;
		1: 0;
	}[B];

	export type Extends<A1, A2> = [A1] extends [never]
		? 0 // anything `never` is false
		: A1 extends A2
			? 1
			: 0;

	export type Has<U extends Union, U1 extends Union> = Not<
		Extends<Exclude<U1, U>, U1>
	>;

	export type Or<B1 extends Boolean, B2 extends Boolean> = {
		0: {
			0: 0;
			1: 1;
		};
		1: {
			0: 1;
			1: 1;
		};
	}[B1][B2];

	export type Keys<U extends Union> = U extends unknown ? keyof U : never;

	type Cast<A, B> = A extends B ? A : B;

	export const type: unique symbol;

	/**
	 * Used by group by
	 */

	export type GetScalarType<T, O> = O extends object
		? {
				[P in keyof T]: P extends keyof O ? O[P] : never;
			}
		: never;

	type FieldPaths<
		T,
		U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
	> = IsObject<T> extends True ? U : T;

	type GetHavingFields<T> = {
		[K in keyof T]: Or<
			Or<Extends<"OR", K>, Extends<"AND", K>>,
			Extends<"NOT", K>
		> extends True
			? // infer is only needed to not hit TS limit
				// based on the brilliant idea of Pierre-Antoine Mills
				// https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
				T[K] extends infer TK
				? GetHavingFields<
						UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
					>
				: never
			: {} extends FieldPaths<T[K]>
				? never
				: K;
	}[keyof T];

	/**
	 * Convert tuple to union
	 */
	type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
	type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
	type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

	/**
	 * Like `Pick`, but additionally can also accept an array of keys
	 */
	type PickEnumerable<
		T,
		K extends Enumerable<keyof T> | keyof T,
	> = Prisma__Pick<T, MaybeTupleToUnion<K>>;

	/**
	 * Exclude all keys with underscores
	 */
	type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
		? never
		: T;

	export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

	type FieldRefInputType<Model, FieldType> = Model extends never
		? never
		: FieldRef<Model, FieldType>;

	export const ModelName: {
		Account: "Account";
		Session: "Session";
		User: "User";
		VerificationToken: "VerificationToken";
		Bus: "Bus";
		Driver: "Driver";
		Conductor: "Conductor";
		Stop: "Stop";
		StudentPass: "StudentPass";
	};

	export type ModelName = (typeof ModelName)[keyof typeof ModelName];

	export type Datasources = {
		db?: Datasource;
	};

	interface TypeMapCb<ClientOptions = {}>
		extends $Utils.Fn<
			{ extArgs: $Extensions.InternalArgs },
			$Utils.Record<string, any>
		> {
		returns: Prisma.TypeMap<
			this["params"]["extArgs"],
			ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
		>;
	}

	export type TypeMap<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> = {
		globalOmitOptions: {
			omit: GlobalOmitOptions;
		};
		meta: {
			modelProps:
				| "account"
				| "session"
				| "user"
				| "verificationToken"
				| "bus"
				| "driver"
				| "conductor"
				| "stop"
				| "studentPass";
			txIsolationLevel: Prisma.TransactionIsolationLevel;
		};
		model: {
			Account: {
				payload: Prisma.$AccountPayload<ExtArgs>;
				fields: Prisma.AccountFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.AccountFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
					};
					findFirst: {
						args: Prisma.AccountFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
					};
					findMany: {
						args: Prisma.AccountFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
					};
					create: {
						args: Prisma.AccountCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
					};
					createMany: {
						args: Prisma.AccountCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
					};
					delete: {
						args: Prisma.AccountDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
					};
					update: {
						args: Prisma.AccountUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
					};
					deleteMany: {
						args: Prisma.AccountDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.AccountUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
					};
					upsert: {
						args: Prisma.AccountUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
					};
					aggregate: {
						args: Prisma.AccountAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateAccount>;
					};
					groupBy: {
						args: Prisma.AccountGroupByArgs<ExtArgs>;
						result: $Utils.Optional<AccountGroupByOutputType>[];
					};
					count: {
						args: Prisma.AccountCountArgs<ExtArgs>;
						result: $Utils.Optional<AccountCountAggregateOutputType> | number;
					};
				};
			};
			Session: {
				payload: Prisma.$SessionPayload<ExtArgs>;
				fields: Prisma.SessionFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.SessionFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
					};
					findFirst: {
						args: Prisma.SessionFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
					};
					findMany: {
						args: Prisma.SessionFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
					};
					create: {
						args: Prisma.SessionCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
					};
					createMany: {
						args: Prisma.SessionCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
					};
					delete: {
						args: Prisma.SessionDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
					};
					update: {
						args: Prisma.SessionUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
					};
					deleteMany: {
						args: Prisma.SessionDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.SessionUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
					};
					upsert: {
						args: Prisma.SessionUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
					};
					aggregate: {
						args: Prisma.SessionAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateSession>;
					};
					groupBy: {
						args: Prisma.SessionGroupByArgs<ExtArgs>;
						result: $Utils.Optional<SessionGroupByOutputType>[];
					};
					count: {
						args: Prisma.SessionCountArgs<ExtArgs>;
						result: $Utils.Optional<SessionCountAggregateOutputType> | number;
					};
				};
			};
			User: {
				payload: Prisma.$UserPayload<ExtArgs>;
				fields: Prisma.UserFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.UserFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>;
					};
					findFirst: {
						args: Prisma.UserFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>;
					};
					findMany: {
						args: Prisma.UserFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
					};
					create: {
						args: Prisma.UserCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>;
					};
					createMany: {
						args: Prisma.UserCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
					};
					delete: {
						args: Prisma.UserDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>;
					};
					update: {
						args: Prisma.UserUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>;
					};
					deleteMany: {
						args: Prisma.UserDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.UserUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
					};
					upsert: {
						args: Prisma.UserUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$UserPayload>;
					};
					aggregate: {
						args: Prisma.UserAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateUser>;
					};
					groupBy: {
						args: Prisma.UserGroupByArgs<ExtArgs>;
						result: $Utils.Optional<UserGroupByOutputType>[];
					};
					count: {
						args: Prisma.UserCountArgs<ExtArgs>;
						result: $Utils.Optional<UserCountAggregateOutputType> | number;
					};
				};
			};
			VerificationToken: {
				payload: Prisma.$VerificationTokenPayload<ExtArgs>;
				fields: Prisma.VerificationTokenFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
					};
					findFirst: {
						args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
					};
					findMany: {
						args: Prisma.VerificationTokenFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
					};
					create: {
						args: Prisma.VerificationTokenCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
					};
					createMany: {
						args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
					};
					delete: {
						args: Prisma.VerificationTokenDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
					};
					update: {
						args: Prisma.VerificationTokenUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
					};
					deleteMany: {
						args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
					};
					upsert: {
						args: Prisma.VerificationTokenUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
					};
					aggregate: {
						args: Prisma.VerificationTokenAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateVerificationToken>;
					};
					groupBy: {
						args: Prisma.VerificationTokenGroupByArgs<ExtArgs>;
						result: $Utils.Optional<VerificationTokenGroupByOutputType>[];
					};
					count: {
						args: Prisma.VerificationTokenCountArgs<ExtArgs>;
						result:
							| $Utils.Optional<VerificationTokenCountAggregateOutputType>
							| number;
					};
				};
			};
			Bus: {
				payload: Prisma.$BusPayload<ExtArgs>;
				fields: Prisma.BusFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.BusFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.BusFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>;
					};
					findFirst: {
						args: Prisma.BusFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.BusFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>;
					};
					findMany: {
						args: Prisma.BusFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>[];
					};
					create: {
						args: Prisma.BusCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>;
					};
					createMany: {
						args: Prisma.BusCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.BusCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>[];
					};
					delete: {
						args: Prisma.BusDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>;
					};
					update: {
						args: Prisma.BusUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>;
					};
					deleteMany: {
						args: Prisma.BusDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.BusUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.BusUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>[];
					};
					upsert: {
						args: Prisma.BusUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$BusPayload>;
					};
					aggregate: {
						args: Prisma.BusAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateBus>;
					};
					groupBy: {
						args: Prisma.BusGroupByArgs<ExtArgs>;
						result: $Utils.Optional<BusGroupByOutputType>[];
					};
					count: {
						args: Prisma.BusCountArgs<ExtArgs>;
						result: $Utils.Optional<BusCountAggregateOutputType> | number;
					};
				};
			};
			Driver: {
				payload: Prisma.$DriverPayload<ExtArgs>;
				fields: Prisma.DriverFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.DriverFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>;
					};
					findFirst: {
						args: Prisma.DriverFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>;
					};
					findMany: {
						args: Prisma.DriverFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>[];
					};
					create: {
						args: Prisma.DriverCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>;
					};
					createMany: {
						args: Prisma.DriverCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>[];
					};
					delete: {
						args: Prisma.DriverDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>;
					};
					update: {
						args: Prisma.DriverUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>;
					};
					deleteMany: {
						args: Prisma.DriverDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.DriverUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.DriverUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>[];
					};
					upsert: {
						args: Prisma.DriverUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$DriverPayload>;
					};
					aggregate: {
						args: Prisma.DriverAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateDriver>;
					};
					groupBy: {
						args: Prisma.DriverGroupByArgs<ExtArgs>;
						result: $Utils.Optional<DriverGroupByOutputType>[];
					};
					count: {
						args: Prisma.DriverCountArgs<ExtArgs>;
						result: $Utils.Optional<DriverCountAggregateOutputType> | number;
					};
				};
			};
			Conductor: {
				payload: Prisma.$ConductorPayload<ExtArgs>;
				fields: Prisma.ConductorFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.ConductorFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.ConductorFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>;
					};
					findFirst: {
						args: Prisma.ConductorFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.ConductorFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>;
					};
					findMany: {
						args: Prisma.ConductorFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>[];
					};
					create: {
						args: Prisma.ConductorCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>;
					};
					createMany: {
						args: Prisma.ConductorCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.ConductorCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>[];
					};
					delete: {
						args: Prisma.ConductorDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>;
					};
					update: {
						args: Prisma.ConductorUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>;
					};
					deleteMany: {
						args: Prisma.ConductorDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.ConductorUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.ConductorUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>[];
					};
					upsert: {
						args: Prisma.ConductorUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$ConductorPayload>;
					};
					aggregate: {
						args: Prisma.ConductorAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateConductor>;
					};
					groupBy: {
						args: Prisma.ConductorGroupByArgs<ExtArgs>;
						result: $Utils.Optional<ConductorGroupByOutputType>[];
					};
					count: {
						args: Prisma.ConductorCountArgs<ExtArgs>;
						result: $Utils.Optional<ConductorCountAggregateOutputType> | number;
					};
				};
			};
			Stop: {
				payload: Prisma.$StopPayload<ExtArgs>;
				fields: Prisma.StopFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.StopFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.StopFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>;
					};
					findFirst: {
						args: Prisma.StopFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.StopFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>;
					};
					findMany: {
						args: Prisma.StopFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>[];
					};
					create: {
						args: Prisma.StopCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>;
					};
					createMany: {
						args: Prisma.StopCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.StopCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>[];
					};
					delete: {
						args: Prisma.StopDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>;
					};
					update: {
						args: Prisma.StopUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>;
					};
					deleteMany: {
						args: Prisma.StopDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.StopUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.StopUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>[];
					};
					upsert: {
						args: Prisma.StopUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StopPayload>;
					};
					aggregate: {
						args: Prisma.StopAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateStop>;
					};
					groupBy: {
						args: Prisma.StopGroupByArgs<ExtArgs>;
						result: $Utils.Optional<StopGroupByOutputType>[];
					};
					count: {
						args: Prisma.StopCountArgs<ExtArgs>;
						result: $Utils.Optional<StopCountAggregateOutputType> | number;
					};
				};
			};
			StudentPass: {
				payload: Prisma.$StudentPassPayload<ExtArgs>;
				fields: Prisma.StudentPassFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.StudentPassFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.StudentPassFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>;
					};
					findFirst: {
						args: Prisma.StudentPassFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.StudentPassFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>;
					};
					findMany: {
						args: Prisma.StudentPassFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>[];
					};
					create: {
						args: Prisma.StudentPassCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>;
					};
					createMany: {
						args: Prisma.StudentPassCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.StudentPassCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>[];
					};
					delete: {
						args: Prisma.StudentPassDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>;
					};
					update: {
						args: Prisma.StudentPassUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>;
					};
					deleteMany: {
						args: Prisma.StudentPassDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.StudentPassUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.StudentPassUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>[];
					};
					upsert: {
						args: Prisma.StudentPassUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$StudentPassPayload>;
					};
					aggregate: {
						args: Prisma.StudentPassAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateStudentPass>;
					};
					groupBy: {
						args: Prisma.StudentPassGroupByArgs<ExtArgs>;
						result: $Utils.Optional<StudentPassGroupByOutputType>[];
					};
					count: {
						args: Prisma.StudentPassCountArgs<ExtArgs>;
						result:
							| $Utils.Optional<StudentPassCountAggregateOutputType>
							| number;
					};
				};
			};
		};
	} & {
		other: {
			payload: any;
			operations: {
				$executeRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
					result: any;
				};
				$executeRawUnsafe: {
					args: [query: string, ...values: any[]];
					result: any;
				};
				$queryRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
					result: any;
				};
				$queryRawUnsafe: {
					args: [query: string, ...values: any[]];
					result: any;
				};
			};
		};
	};
	export const defineExtension: $Extensions.ExtendsHook<
		"define",
		Prisma.TypeMapCb,
		$Extensions.DefaultArgs
	>;
	export type DefaultPrismaClient = PrismaClient;
	export type ErrorFormat = "pretty" | "colorless" | "minimal";
	export interface PrismaClientOptions {
		/**
		 * Overwrites the datasource url from your schema.prisma file
		 */
		datasources?: Datasources;
		/**
		 * Overwrites the datasource url from your schema.prisma file
		 */
		datasourceUrl?: string;
		/**
		 * @default "colorless"
		 */
		errorFormat?: ErrorFormat;
		/**
		 * @example
		 * ```
		 * // Shorthand for `emit: 'stdout'`
		 * log: ['query', 'info', 'warn', 'error']
		 *
		 * // Emit as events only
		 * log: [
		 *   { emit: 'event', level: 'query' },
		 *   { emit: 'event', level: 'info' },
		 *   { emit: 'event', level: 'warn' }
		 *   { emit: 'event', level: 'error' }
		 * ]
		 *
		 * / Emit as events and log to stdout
		 * og: [
		 *  { emit: 'stdout', level: 'query' },
		 *  { emit: 'stdout', level: 'info' },
		 *  { emit: 'stdout', level: 'warn' }
		 *  { emit: 'stdout', level: 'error' }
		 *
		 * ```
		 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
		 */
		log?: (LogLevel | LogDefinition)[];
		/**
		 * The default values for transactionOptions
		 * maxWait ?= 2000
		 * timeout ?= 5000
		 */
		transactionOptions?: {
			maxWait?: number;
			timeout?: number;
			isolationLevel?: Prisma.TransactionIsolationLevel;
		};
		/**
		 * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
		 */
		adapter?: runtime.SqlDriverAdapterFactory | null;
		/**
		 * Global configuration for omitting model fields by default.
		 *
		 * @example
		 * ```
		 * const prisma = new PrismaClient({
		 *   omit: {
		 *     user: {
		 *       password: true
		 *     }
		 *   }
		 * })
		 * ```
		 */
		omit?: Prisma.GlobalOmitConfig;
	}
	export type GlobalOmitConfig = {
		account?: AccountOmit;
		session?: SessionOmit;
		user?: UserOmit;
		verificationToken?: VerificationTokenOmit;
		bus?: BusOmit;
		driver?: DriverOmit;
		conductor?: ConductorOmit;
		stop?: StopOmit;
		studentPass?: StudentPassOmit;
	};

	/* Types for Logging */
	export type LogLevel = "info" | "query" | "warn" | "error";
	export type LogDefinition = {
		level: LogLevel;
		emit: "stdout" | "event";
	};

	export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

	export type GetLogType<T> = CheckIsLogLevel<
		T extends LogDefinition ? T["level"] : T
	>;

	export type GetEvents<T extends any[]> =
		T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

	export type QueryEvent = {
		timestamp: Date;
		query: string;
		params: string;
		duration: number;
		target: string;
	};

	export type LogEvent = {
		timestamp: Date;
		message: string;
		target: string;
	};
	/* End Types for Logging */

	export type PrismaAction =
		| "findUnique"
		| "findUniqueOrThrow"
		| "findMany"
		| "findFirst"
		| "findFirstOrThrow"
		| "create"
		| "createMany"
		| "createManyAndReturn"
		| "update"
		| "updateMany"
		| "updateManyAndReturn"
		| "upsert"
		| "delete"
		| "deleteMany"
		| "executeRaw"
		| "queryRaw"
		| "aggregate"
		| "count"
		| "runCommandRaw"
		| "findRaw"
		| "groupBy";

	// tested in getLogLevel.test.ts
	export function getLogLevel(
		log: Array<LogLevel | LogDefinition>,
	): LogLevel | undefined;

	/**
	 * `PrismaClient` proxy available in interactive transactions.
	 */
	export type TransactionClient = Omit<
		Prisma.DefaultPrismaClient,
		runtime.ITXClientDenyList
	>;

	export type Datasource = {
		url?: string;
	};

	/**
	 * Count Types
	 */

	/**
	 * Count Type UserCountOutputType
	 */

	export type UserCountOutputType = {
		accounts: number;
		sessions: number;
	};

	export type UserCountOutputTypeSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
		sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
	};

	// Custom InputTypes
	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserCountOutputType
		 */
		select?: UserCountOutputTypeSelect<ExtArgs> | null;
	};

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountAccountsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: AccountWhereInput;
	};

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountSessionsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: SessionWhereInput;
	};

	/**
	 * Count Type BusCountOutputType
	 */

	export type BusCountOutputType = {
		passes: number;
	};

	export type BusCountOutputTypeSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		passes?: boolean | BusCountOutputTypeCountPassesArgs;
	};

	// Custom InputTypes
	/**
	 * BusCountOutputType without action
	 */
	export type BusCountOutputTypeDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the BusCountOutputType
		 */
		select?: BusCountOutputTypeSelect<ExtArgs> | null;
	};

	/**
	 * BusCountOutputType without action
	 */
	export type BusCountOutputTypeCountPassesArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: StudentPassWhereInput;
	};

	/**
	 * Count Type StopCountOutputType
	 */

	export type StopCountOutputType = {
		passes: number;
	};

	export type StopCountOutputTypeSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		passes?: boolean | StopCountOutputTypeCountPassesArgs;
	};

	// Custom InputTypes
	/**
	 * StopCountOutputType without action
	 */
	export type StopCountOutputTypeDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StopCountOutputType
		 */
		select?: StopCountOutputTypeSelect<ExtArgs> | null;
	};

	/**
	 * StopCountOutputType without action
	 */
	export type StopCountOutputTypeCountPassesArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: StudentPassWhereInput;
	};

	/**
	 * Models
	 */

	/**
	 * Model Account
	 */

	export type AggregateAccount = {
		_count: AccountCountAggregateOutputType | null;
		_avg: AccountAvgAggregateOutputType | null;
		_sum: AccountSumAggregateOutputType | null;
		_min: AccountMinAggregateOutputType | null;
		_max: AccountMaxAggregateOutputType | null;
	};

	export type AccountAvgAggregateOutputType = {
		expires_at: number | null;
		refresh_token_expires_in: number | null;
	};

	export type AccountSumAggregateOutputType = {
		expires_at: number | null;
		refresh_token_expires_in: number | null;
	};

	export type AccountMinAggregateOutputType = {
		id: string | null;
		userId: string | null;
		type: string | null;
		provider: string | null;
		providerAccountId: string | null;
		refresh_token: string | null;
		access_token: string | null;
		expires_at: number | null;
		token_type: string | null;
		scope: string | null;
		id_token: string | null;
		session_state: string | null;
		refresh_token_expires_in: number | null;
	};

	export type AccountMaxAggregateOutputType = {
		id: string | null;
		userId: string | null;
		type: string | null;
		provider: string | null;
		providerAccountId: string | null;
		refresh_token: string | null;
		access_token: string | null;
		expires_at: number | null;
		token_type: string | null;
		scope: string | null;
		id_token: string | null;
		session_state: string | null;
		refresh_token_expires_in: number | null;
	};

	export type AccountCountAggregateOutputType = {
		id: number;
		userId: number;
		type: number;
		provider: number;
		providerAccountId: number;
		refresh_token: number;
		access_token: number;
		expires_at: number;
		token_type: number;
		scope: number;
		id_token: number;
		session_state: number;
		refresh_token_expires_in: number;
		_all: number;
	};

	export type AccountAvgAggregateInputType = {
		expires_at?: true;
		refresh_token_expires_in?: true;
	};

	export type AccountSumAggregateInputType = {
		expires_at?: true;
		refresh_token_expires_in?: true;
	};

	export type AccountMinAggregateInputType = {
		id?: true;
		userId?: true;
		type?: true;
		provider?: true;
		providerAccountId?: true;
		refresh_token?: true;
		access_token?: true;
		expires_at?: true;
		token_type?: true;
		scope?: true;
		id_token?: true;
		session_state?: true;
		refresh_token_expires_in?: true;
	};

	export type AccountMaxAggregateInputType = {
		id?: true;
		userId?: true;
		type?: true;
		provider?: true;
		providerAccountId?: true;
		refresh_token?: true;
		access_token?: true;
		expires_at?: true;
		token_type?: true;
		scope?: true;
		id_token?: true;
		session_state?: true;
		refresh_token_expires_in?: true;
	};

	export type AccountCountAggregateInputType = {
		id?: true;
		userId?: true;
		type?: true;
		provider?: true;
		providerAccountId?: true;
		refresh_token?: true;
		access_token?: true;
		expires_at?: true;
		token_type?: true;
		scope?: true;
		id_token?: true;
		session_state?: true;
		refresh_token_expires_in?: true;
		_all?: true;
	};

	export type AccountAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Account to aggregate.
		 */
		where?: AccountWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Accounts to fetch.
		 */
		orderBy?:
			| AccountOrderByWithRelationInput
			| AccountOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: AccountWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Accounts from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Accounts.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Accounts
		 **/
		_count?: true | AccountCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: AccountAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: AccountSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: AccountMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: AccountMaxAggregateInputType;
	};

	export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
		[P in keyof T & keyof AggregateAccount]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateAccount[P]>
			: GetScalarType<T[P], AggregateAccount[P]>;
	};

	export type AccountGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: AccountWhereInput;
		orderBy?:
			| AccountOrderByWithAggregationInput
			| AccountOrderByWithAggregationInput[];
		by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
		having?: AccountScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: AccountCountAggregateInputType | true;
		_avg?: AccountAvgAggregateInputType;
		_sum?: AccountSumAggregateInputType;
		_min?: AccountMinAggregateInputType;
		_max?: AccountMaxAggregateInputType;
	};

	export type AccountGroupByOutputType = {
		id: string;
		userId: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token: string | null;
		access_token: string | null;
		expires_at: number | null;
		token_type: string | null;
		scope: string | null;
		id_token: string | null;
		session_state: string | null;
		refresh_token_expires_in: number | null;
		_count: AccountCountAggregateOutputType | null;
		_avg: AccountAvgAggregateOutputType | null;
		_sum: AccountSumAggregateOutputType | null;
		_min: AccountMinAggregateOutputType | null;
		_max: AccountMaxAggregateOutputType | null;
	};

	type GetAccountGroupByPayload<T extends AccountGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<AccountGroupByOutputType, T["by"]> & {
					[P in keyof T & keyof AccountGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], AccountGroupByOutputType[P]>
						: GetScalarType<T[P], AccountGroupByOutputType[P]>;
				}
			>
		>;

	export type AccountSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			userId?: boolean;
			type?: boolean;
			provider?: boolean;
			providerAccountId?: boolean;
			refresh_token?: boolean;
			access_token?: boolean;
			expires_at?: boolean;
			token_type?: boolean;
			scope?: boolean;
			id_token?: boolean;
			session_state?: boolean;
			refresh_token_expires_in?: boolean;
			user?: boolean | UserDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["account"]
	>;

	export type AccountSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			userId?: boolean;
			type?: boolean;
			provider?: boolean;
			providerAccountId?: boolean;
			refresh_token?: boolean;
			access_token?: boolean;
			expires_at?: boolean;
			token_type?: boolean;
			scope?: boolean;
			id_token?: boolean;
			session_state?: boolean;
			refresh_token_expires_in?: boolean;
			user?: boolean | UserDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["account"]
	>;

	export type AccountSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			userId?: boolean;
			type?: boolean;
			provider?: boolean;
			providerAccountId?: boolean;
			refresh_token?: boolean;
			access_token?: boolean;
			expires_at?: boolean;
			token_type?: boolean;
			scope?: boolean;
			id_token?: boolean;
			session_state?: boolean;
			refresh_token_expires_in?: boolean;
			user?: boolean | UserDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["account"]
	>;

	export type AccountSelectScalar = {
		id?: boolean;
		userId?: boolean;
		type?: boolean;
		provider?: boolean;
		providerAccountId?: boolean;
		refresh_token?: boolean;
		access_token?: boolean;
		expires_at?: boolean;
		token_type?: boolean;
		scope?: boolean;
		id_token?: boolean;
		session_state?: boolean;
		refresh_token_expires_in?: boolean;
	};

	export type AccountOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		| "id"
		| "userId"
		| "type"
		| "provider"
		| "providerAccountId"
		| "refresh_token"
		| "access_token"
		| "expires_at"
		| "token_type"
		| "scope"
		| "id_token"
		| "session_state"
		| "refresh_token_expires_in",
		ExtArgs["result"]["account"]
	>;
	export type AccountInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>;
	};
	export type AccountIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>;
	};
	export type AccountIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>;
	};

	export type $AccountPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "Account";
		objects: {
			user: Prisma.$UserPayload<ExtArgs>;
		};
		scalars: $Extensions.GetPayloadResult<
			{
				id: string;
				userId: string;
				type: string;
				provider: string;
				providerAccountId: string;
				refresh_token: string | null;
				access_token: string | null;
				expires_at: number | null;
				token_type: string | null;
				scope: string | null;
				id_token: string | null;
				session_state: string | null;
				refresh_token_expires_in: number | null;
			},
			ExtArgs["result"]["account"]
		>;
		composites: {};
	};

	type AccountGetPayload<
		S extends boolean | null | undefined | AccountDefaultArgs,
	> = $Result.GetResult<Prisma.$AccountPayload, S>;

	type AccountCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<AccountFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
		select?: AccountCountAggregateInputType | true;
	};

	export interface AccountDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["Account"];
			meta: { name: "Account" };
		};
		/**
		 * Find zero or one Account that matches the filter.
		 * @param {AccountFindUniqueArgs} args - Arguments to find a Account
		 * @example
		 * // Get one Account
		 * const account = await prisma.account.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends AccountFindUniqueArgs>(
			args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Account that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
		 * @example
		 * // Get one Account
		 * const account = await prisma.account.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
			args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Account that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountFindFirstArgs} args - Arguments to find a Account
		 * @example
		 * // Get one Account
		 * const account = await prisma.account.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends AccountFindFirstArgs>(
			args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Account that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
		 * @example
		 * // Get one Account
		 * const account = await prisma.account.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
			args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Accounts that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Accounts
		 * const accounts = await prisma.account.findMany()
		 *
		 * // Get first 10 Accounts
		 * const accounts = await prisma.account.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends AccountFindManyArgs>(
			args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Account.
		 * @param {AccountCreateArgs} args - Arguments to create a Account.
		 * @example
		 * // Create one Account
		 * const Account = await prisma.account.create({
		 *   data: {
		 *     // ... data to create a Account
		 *   }
		 * })
		 *
		 */
		create<T extends AccountCreateArgs>(
			args: SelectSubset<T, AccountCreateArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Accounts.
		 * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
		 * @example
		 * // Create many Accounts
		 * const account = await prisma.account.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends AccountCreateManyArgs>(
			args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Accounts and returns the data saved in the database.
		 * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
		 * @example
		 * // Create many Accounts
		 * const account = await prisma.account.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Accounts and only return the `id`
		 * const accountWithIdOnly = await prisma.account.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(
			args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Account.
		 * @param {AccountDeleteArgs} args - Arguments to delete one Account.
		 * @example
		 * // Delete one Account
		 * const Account = await prisma.account.delete({
		 *   where: {
		 *     // ... filter to delete one Account
		 *   }
		 * })
		 *
		 */
		delete<T extends AccountDeleteArgs>(
			args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Account.
		 * @param {AccountUpdateArgs} args - Arguments to update one Account.
		 * @example
		 * // Update one Account
		 * const account = await prisma.account.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends AccountUpdateArgs>(
			args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Accounts.
		 * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
		 * @example
		 * // Delete a few Accounts
		 * const { count } = await prisma.account.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends AccountDeleteManyArgs>(
			args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Accounts.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Accounts
		 * const account = await prisma.account.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends AccountUpdateManyArgs>(
			args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Accounts and returns the data updated in the database.
		 * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
		 * @example
		 * // Update many Accounts
		 * const account = await prisma.account.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Accounts and only return the `id`
		 * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(
			args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Account.
		 * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
		 * @example
		 * // Update or create a Account
		 * const account = await prisma.account.upsert({
		 *   create: {
		 *     // ... data to create a Account
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Account we want to update
		 *   }
		 * })
		 */
		upsert<T extends AccountUpsertArgs>(
			args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>,
		): Prisma__AccountClient<
			$Result.GetResult<
				Prisma.$AccountPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Accounts.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
		 * @example
		 * // Count the number of Accounts
		 * const count = await prisma.account.count({
		 *   where: {
		 *     // ... the filter for the Accounts we want to count
		 *   }
		 * })
		 **/
		count<T extends AccountCountArgs>(
			args?: Subset<T, AccountCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], AccountCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Account.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends AccountAggregateArgs>(
			args: Subset<T, AccountAggregateArgs>,
		): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

		/**
		 * Group by Account.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {AccountGroupByArgs} args - Group by arguments.
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
			T extends AccountGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: AccountGroupByArgs["orderBy"] }
				: { orderBy?: AccountGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetAccountGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the Account model
		 */
		readonly fields: AccountFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Account.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__AccountClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| $Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					"findUniqueOrThrow",
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the Account model
	 */
	interface AccountFieldRefs {
		readonly id: FieldRef<"Account", "String">;
		readonly userId: FieldRef<"Account", "String">;
		readonly type: FieldRef<"Account", "String">;
		readonly provider: FieldRef<"Account", "String">;
		readonly providerAccountId: FieldRef<"Account", "String">;
		readonly refresh_token: FieldRef<"Account", "String">;
		readonly access_token: FieldRef<"Account", "String">;
		readonly expires_at: FieldRef<"Account", "Int">;
		readonly token_type: FieldRef<"Account", "String">;
		readonly scope: FieldRef<"Account", "String">;
		readonly id_token: FieldRef<"Account", "String">;
		readonly session_state: FieldRef<"Account", "String">;
		readonly refresh_token_expires_in: FieldRef<"Account", "Int">;
	}

	// Custom InputTypes
	/**
	 * Account findUnique
	 */
	export type AccountFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * Filter, which Account to fetch.
		 */
		where: AccountWhereUniqueInput;
	};

	/**
	 * Account findUniqueOrThrow
	 */
	export type AccountFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * Filter, which Account to fetch.
		 */
		where: AccountWhereUniqueInput;
	};

	/**
	 * Account findFirst
	 */
	export type AccountFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * Filter, which Account to fetch.
		 */
		where?: AccountWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Accounts to fetch.
		 */
		orderBy?:
			| AccountOrderByWithRelationInput
			| AccountOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Accounts.
		 */
		cursor?: AccountWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Accounts from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Accounts.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Accounts.
		 */
		distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
	};

	/**
	 * Account findFirstOrThrow
	 */
	export type AccountFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * Filter, which Account to fetch.
		 */
		where?: AccountWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Accounts to fetch.
		 */
		orderBy?:
			| AccountOrderByWithRelationInput
			| AccountOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Accounts.
		 */
		cursor?: AccountWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Accounts from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Accounts.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Accounts.
		 */
		distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
	};

	/**
	 * Account findMany
	 */
	export type AccountFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * Filter, which Accounts to fetch.
		 */
		where?: AccountWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Accounts to fetch.
		 */
		orderBy?:
			| AccountOrderByWithRelationInput
			| AccountOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Accounts.
		 */
		cursor?: AccountWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Accounts from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Accounts.
		 */
		skip?: number;
		distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
	};

	/**
	 * Account create
	 */
	export type AccountCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * The data needed to create a Account.
		 */
		data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
	};

	/**
	 * Account createMany
	 */
	export type AccountCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Accounts.
		 */
		data: AccountCreateManyInput | AccountCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Account createManyAndReturn
	 */
	export type AccountCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * The data used to create many Accounts.
		 */
		data: AccountCreateManyInput | AccountCreateManyInput[];
		skipDuplicates?: boolean;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Account update
	 */
	export type AccountUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * The data needed to update a Account.
		 */
		data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
		/**
		 * Choose, which Account to update.
		 */
		where: AccountWhereUniqueInput;
	};

	/**
	 * Account updateMany
	 */
	export type AccountUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Accounts.
		 */
		data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
		/**
		 * Filter which Accounts to update
		 */
		where?: AccountWhereInput;
		/**
		 * Limit how many Accounts to update.
		 */
		limit?: number;
	};

	/**
	 * Account updateManyAndReturn
	 */
	export type AccountUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * The data used to update Accounts.
		 */
		data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
		/**
		 * Filter which Accounts to update
		 */
		where?: AccountWhereInput;
		/**
		 * Limit how many Accounts to update.
		 */
		limit?: number;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Account upsert
	 */
	export type AccountUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * The filter to search for the Account to update in case it exists.
		 */
		where: AccountWhereUniqueInput;
		/**
		 * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
		 */
		create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
		/**
		 * In case the Account was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
	};

	/**
	 * Account delete
	 */
	export type AccountDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		/**
		 * Filter which Account to delete.
		 */
		where: AccountWhereUniqueInput;
	};

	/**
	 * Account deleteMany
	 */
	export type AccountDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Accounts to delete
		 */
		where?: AccountWhereInput;
		/**
		 * Limit how many Accounts to delete.
		 */
		limit?: number;
	};

	/**
	 * Account without action
	 */
	export type AccountDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
	};

	/**
	 * Model Session
	 */

	export type AggregateSession = {
		_count: SessionCountAggregateOutputType | null;
		_min: SessionMinAggregateOutputType | null;
		_max: SessionMaxAggregateOutputType | null;
	};

	export type SessionMinAggregateOutputType = {
		id: string | null;
		sessionToken: string | null;
		userId: string | null;
		expires: Date | null;
	};

	export type SessionMaxAggregateOutputType = {
		id: string | null;
		sessionToken: string | null;
		userId: string | null;
		expires: Date | null;
	};

	export type SessionCountAggregateOutputType = {
		id: number;
		sessionToken: number;
		userId: number;
		expires: number;
		_all: number;
	};

	export type SessionMinAggregateInputType = {
		id?: true;
		sessionToken?: true;
		userId?: true;
		expires?: true;
	};

	export type SessionMaxAggregateInputType = {
		id?: true;
		sessionToken?: true;
		userId?: true;
		expires?: true;
	};

	export type SessionCountAggregateInputType = {
		id?: true;
		sessionToken?: true;
		userId?: true;
		expires?: true;
		_all?: true;
	};

	export type SessionAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Session to aggregate.
		 */
		where?: SessionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: SessionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Sessions
		 **/
		_count?: true | SessionCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: SessionMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: SessionMaxAggregateInputType;
	};

	export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
		[P in keyof T & keyof AggregateSession]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateSession[P]>
			: GetScalarType<T[P], AggregateSession[P]>;
	};

	export type SessionGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: SessionWhereInput;
		orderBy?:
			| SessionOrderByWithAggregationInput
			| SessionOrderByWithAggregationInput[];
		by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
		having?: SessionScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: SessionCountAggregateInputType | true;
		_min?: SessionMinAggregateInputType;
		_max?: SessionMaxAggregateInputType;
	};

	export type SessionGroupByOutputType = {
		id: string;
		sessionToken: string;
		userId: string;
		expires: Date;
		_count: SessionCountAggregateOutputType | null;
		_min: SessionMinAggregateOutputType | null;
		_max: SessionMaxAggregateOutputType | null;
	};

	type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<SessionGroupByOutputType, T["by"]> & {
					[P in keyof T & keyof SessionGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], SessionGroupByOutputType[P]>
						: GetScalarType<T[P], SessionGroupByOutputType[P]>;
				}
			>
		>;

	export type SessionSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			sessionToken?: boolean;
			userId?: boolean;
			expires?: boolean;
			user?: boolean | UserDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["session"]
	>;

	export type SessionSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			sessionToken?: boolean;
			userId?: boolean;
			expires?: boolean;
			user?: boolean | UserDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["session"]
	>;

	export type SessionSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			sessionToken?: boolean;
			userId?: boolean;
			expires?: boolean;
			user?: boolean | UserDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["session"]
	>;

	export type SessionSelectScalar = {
		id?: boolean;
		sessionToken?: boolean;
		userId?: boolean;
		expires?: boolean;
	};

	export type SessionOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"id" | "sessionToken" | "userId" | "expires",
		ExtArgs["result"]["session"]
	>;
	export type SessionInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>;
	};
	export type SessionIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>;
	};
	export type SessionIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>;
	};

	export type $SessionPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "Session";
		objects: {
			user: Prisma.$UserPayload<ExtArgs>;
		};
		scalars: $Extensions.GetPayloadResult<
			{
				id: string;
				sessionToken: string;
				userId: string;
				expires: Date;
			},
			ExtArgs["result"]["session"]
		>;
		composites: {};
	};

	type SessionGetPayload<
		S extends boolean | null | undefined | SessionDefaultArgs,
	> = $Result.GetResult<Prisma.$SessionPayload, S>;

	type SessionCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<SessionFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
		select?: SessionCountAggregateInputType | true;
	};

	export interface SessionDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["Session"];
			meta: { name: "Session" };
		};
		/**
		 * Find zero or one Session that matches the filter.
		 * @param {SessionFindUniqueArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends SessionFindUniqueArgs>(
			args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Session that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
			args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Session that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionFindFirstArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends SessionFindFirstArgs>(
			args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Session that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
			args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Sessions that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Sessions
		 * const sessions = await prisma.session.findMany()
		 *
		 * // Get first 10 Sessions
		 * const sessions = await prisma.session.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends SessionFindManyArgs>(
			args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Session.
		 * @param {SessionCreateArgs} args - Arguments to create a Session.
		 * @example
		 * // Create one Session
		 * const Session = await prisma.session.create({
		 *   data: {
		 *     // ... data to create a Session
		 *   }
		 * })
		 *
		 */
		create<T extends SessionCreateArgs>(
			args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Sessions.
		 * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
		 * @example
		 * // Create many Sessions
		 * const session = await prisma.session.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends SessionCreateManyArgs>(
			args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Sessions and returns the data saved in the database.
		 * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
		 * @example
		 * // Create many Sessions
		 * const session = await prisma.session.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Sessions and only return the `id`
		 * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
			args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Session.
		 * @param {SessionDeleteArgs} args - Arguments to delete one Session.
		 * @example
		 * // Delete one Session
		 * const Session = await prisma.session.delete({
		 *   where: {
		 *     // ... filter to delete one Session
		 *   }
		 * })
		 *
		 */
		delete<T extends SessionDeleteArgs>(
			args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Session.
		 * @param {SessionUpdateArgs} args - Arguments to update one Session.
		 * @example
		 * // Update one Session
		 * const session = await prisma.session.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends SessionUpdateArgs>(
			args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Sessions.
		 * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
		 * @example
		 * // Delete a few Sessions
		 * const { count } = await prisma.session.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends SessionDeleteManyArgs>(
			args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Sessions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Sessions
		 * const session = await prisma.session.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends SessionUpdateManyArgs>(
			args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Sessions and returns the data updated in the database.
		 * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
		 * @example
		 * // Update many Sessions
		 * const session = await prisma.session.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Sessions and only return the `id`
		 * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
			args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Session.
		 * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
		 * @example
		 * // Update or create a Session
		 * const session = await prisma.session.upsert({
		 *   create: {
		 *     // ... data to create a Session
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Session we want to update
		 *   }
		 * })
		 */
		upsert<T extends SessionUpsertArgs>(
			args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
		): Prisma__SessionClient<
			$Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Sessions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
		 * @example
		 * // Count the number of Sessions
		 * const count = await prisma.session.count({
		 *   where: {
		 *     // ... the filter for the Sessions we want to count
		 *   }
		 * })
		 **/
		count<T extends SessionCountArgs>(
			args?: Subset<T, SessionCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], SessionCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Session.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends SessionAggregateArgs>(
			args: Subset<T, SessionAggregateArgs>,
		): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

		/**
		 * Group by Session.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionGroupByArgs} args - Group by arguments.
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
			T extends SessionGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: SessionGroupByArgs["orderBy"] }
				: { orderBy?: SessionGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetSessionGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the Session model
		 */
		readonly fields: SessionFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Session.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__SessionClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| $Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					"findUniqueOrThrow",
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the Session model
	 */
	interface SessionFieldRefs {
		readonly id: FieldRef<"Session", "String">;
		readonly sessionToken: FieldRef<"Session", "String">;
		readonly userId: FieldRef<"Session", "String">;
		readonly expires: FieldRef<"Session", "DateTime">;
	}

	// Custom InputTypes
	/**
	 * Session findUnique
	 */
	export type SessionFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * Filter, which Session to fetch.
		 */
		where: SessionWhereUniqueInput;
	};

	/**
	 * Session findUniqueOrThrow
	 */
	export type SessionFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * Filter, which Session to fetch.
		 */
		where: SessionWhereUniqueInput;
	};

	/**
	 * Session findFirst
	 */
	export type SessionFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * Filter, which Session to fetch.
		 */
		where?: SessionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Sessions.
		 */
		cursor?: SessionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Sessions.
		 */
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
	};

	/**
	 * Session findFirstOrThrow
	 */
	export type SessionFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * Filter, which Session to fetch.
		 */
		where?: SessionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Sessions.
		 */
		cursor?: SessionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Sessions.
		 */
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
	};

	/**
	 * Session findMany
	 */
	export type SessionFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * Filter, which Sessions to fetch.
		 */
		where?: SessionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Sessions.
		 */
		cursor?: SessionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number;
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
	};

	/**
	 * Session create
	 */
	export type SessionCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * The data needed to create a Session.
		 */
		data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
	};

	/**
	 * Session createMany
	 */
	export type SessionCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Sessions.
		 */
		data: SessionCreateManyInput | SessionCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Session createManyAndReturn
	 */
	export type SessionCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * The data used to create many Sessions.
		 */
		data: SessionCreateManyInput | SessionCreateManyInput[];
		skipDuplicates?: boolean;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Session update
	 */
	export type SessionUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * The data needed to update a Session.
		 */
		data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
		/**
		 * Choose, which Session to update.
		 */
		where: SessionWhereUniqueInput;
	};

	/**
	 * Session updateMany
	 */
	export type SessionUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Sessions.
		 */
		data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
		/**
		 * Filter which Sessions to update
		 */
		where?: SessionWhereInput;
		/**
		 * Limit how many Sessions to update.
		 */
		limit?: number;
	};

	/**
	 * Session updateManyAndReturn
	 */
	export type SessionUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * The data used to update Sessions.
		 */
		data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
		/**
		 * Filter which Sessions to update
		 */
		where?: SessionWhereInput;
		/**
		 * Limit how many Sessions to update.
		 */
		limit?: number;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Session upsert
	 */
	export type SessionUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * The filter to search for the Session to update in case it exists.
		 */
		where: SessionWhereUniqueInput;
		/**
		 * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
		 */
		create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
		/**
		 * In case the Session was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
	};

	/**
	 * Session delete
	 */
	export type SessionDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		/**
		 * Filter which Session to delete.
		 */
		where: SessionWhereUniqueInput;
	};

	/**
	 * Session deleteMany
	 */
	export type SessionDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Sessions to delete
		 */
		where?: SessionWhereInput;
		/**
		 * Limit how many Sessions to delete.
		 */
		limit?: number;
	};

	/**
	 * Session without action
	 */
	export type SessionDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
	};

	/**
	 * Model User
	 */

	export type AggregateUser = {
		_count: UserCountAggregateOutputType | null;
		_min: UserMinAggregateOutputType | null;
		_max: UserMaxAggregateOutputType | null;
	};

	export type UserMinAggregateOutputType = {
		id: string | null;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
	};

	export type UserMaxAggregateOutputType = {
		id: string | null;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
	};

	export type UserCountAggregateOutputType = {
		id: number;
		name: number;
		email: number;
		emailVerified: number;
		image: number;
		_all: number;
	};

	export type UserMinAggregateInputType = {
		id?: true;
		name?: true;
		email?: true;
		emailVerified?: true;
		image?: true;
	};

	export type UserMaxAggregateInputType = {
		id?: true;
		name?: true;
		email?: true;
		emailVerified?: true;
		image?: true;
	};

	export type UserCountAggregateInputType = {
		id?: true;
		name?: true;
		email?: true;
		emailVerified?: true;
		image?: true;
		_all?: true;
	};

	export type UserAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which User to aggregate.
		 */
		where?: UserWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: UserWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Users
		 **/
		_count?: true | UserCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: UserMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: UserMaxAggregateInputType;
	};

	export type GetUserAggregateType<T extends UserAggregateArgs> = {
		[P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateUser[P]>
			: GetScalarType<T[P], AggregateUser[P]>;
	};

	export type UserGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: UserWhereInput;
		orderBy?:
			| UserOrderByWithAggregationInput
			| UserOrderByWithAggregationInput[];
		by: UserScalarFieldEnum[] | UserScalarFieldEnum;
		having?: UserScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: UserCountAggregateInputType | true;
		_min?: UserMinAggregateInputType;
		_max?: UserMaxAggregateInputType;
	};

	export type UserGroupByOutputType = {
		id: string;
		name: string | null;
		email: string | null;
		emailVerified: Date | null;
		image: string | null;
		_count: UserCountAggregateOutputType | null;
		_min: UserMinAggregateOutputType | null;
		_max: UserMaxAggregateOutputType | null;
	};

	type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<UserGroupByOutputType, T["by"]> & {
				[P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], UserGroupByOutputType[P]>
					: GetScalarType<T[P], UserGroupByOutputType[P]>;
			}
		>
	>;

	export type UserSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			name?: boolean;
			email?: boolean;
			emailVerified?: boolean;
			image?: boolean;
			accounts?: boolean | User$accountsArgs<ExtArgs>;
			sessions?: boolean | User$sessionsArgs<ExtArgs>;
			_count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["user"]
	>;

	export type UserSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			name?: boolean;
			email?: boolean;
			emailVerified?: boolean;
			image?: boolean;
		},
		ExtArgs["result"]["user"]
	>;

	export type UserSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			name?: boolean;
			email?: boolean;
			emailVerified?: boolean;
			image?: boolean;
		},
		ExtArgs["result"]["user"]
	>;

	export type UserSelectScalar = {
		id?: boolean;
		name?: boolean;
		email?: boolean;
		emailVerified?: boolean;
		image?: boolean;
	};

	export type UserOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"id" | "name" | "email" | "emailVerified" | "image",
		ExtArgs["result"]["user"]
	>;
	export type UserInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		accounts?: boolean | User$accountsArgs<ExtArgs>;
		sessions?: boolean | User$sessionsArgs<ExtArgs>;
		_count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
	};
	export type UserIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {};
	export type UserIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {};

	export type $UserPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "User";
		objects: {
			accounts: Prisma.$AccountPayload<ExtArgs>[];
			sessions: Prisma.$SessionPayload<ExtArgs>[];
		};
		scalars: $Extensions.GetPayloadResult<
			{
				id: string;
				name: string | null;
				email: string | null;
				emailVerified: Date | null;
				image: string | null;
			},
			ExtArgs["result"]["user"]
		>;
		composites: {};
	};

	type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
		$Result.GetResult<Prisma.$UserPayload, S>;

	type UserCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
		select?: UserCountAggregateInputType | true;
	};

	export interface UserDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["User"];
			meta: { name: "User" };
		};
		/**
		 * Find zero or one User that matches the filter.
		 * @param {UserFindUniqueArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends UserFindUniqueArgs>(
			args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one User that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
			args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first User that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindFirstArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends UserFindFirstArgs>(
			args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first User that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
			args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Users that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Users
		 * const users = await prisma.user.findMany()
		 *
		 * // Get first 10 Users
		 * const users = await prisma.user.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends UserFindManyArgs>(
			args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a User.
		 * @param {UserCreateArgs} args - Arguments to create a User.
		 * @example
		 * // Create one User
		 * const User = await prisma.user.create({
		 *   data: {
		 *     // ... data to create a User
		 *   }
		 * })
		 *
		 */
		create<T extends UserCreateArgs>(
			args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Users.
		 * @param {UserCreateManyArgs} args - Arguments to create many Users.
		 * @example
		 * // Create many Users
		 * const user = await prisma.user.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends UserCreateManyArgs>(
			args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Users and returns the data saved in the database.
		 * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
		 * @example
		 * // Create many Users
		 * const user = await prisma.user.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Users and only return the `id`
		 * const userWithIdOnly = await prisma.user.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
			args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a User.
		 * @param {UserDeleteArgs} args - Arguments to delete one User.
		 * @example
		 * // Delete one User
		 * const User = await prisma.user.delete({
		 *   where: {
		 *     // ... filter to delete one User
		 *   }
		 * })
		 *
		 */
		delete<T extends UserDeleteArgs>(
			args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one User.
		 * @param {UserUpdateArgs} args - Arguments to update one User.
		 * @example
		 * // Update one User
		 * const user = await prisma.user.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends UserUpdateArgs>(
			args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Users.
		 * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
		 * @example
		 * // Delete a few Users
		 * const { count } = await prisma.user.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends UserDeleteManyArgs>(
			args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Users.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Users
		 * const user = await prisma.user.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends UserUpdateManyArgs>(
			args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Users and returns the data updated in the database.
		 * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
		 * @example
		 * // Update many Users
		 * const user = await prisma.user.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Users and only return the `id`
		 * const userWithIdOnly = await prisma.user.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
			args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one User.
		 * @param {UserUpsertArgs} args - Arguments to update or create a User.
		 * @example
		 * // Update or create a User
		 * const user = await prisma.user.upsert({
		 *   create: {
		 *     // ... data to create a User
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the User we want to update
		 *   }
		 * })
		 */
		upsert<T extends UserUpsertArgs>(
			args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Users.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserCountArgs} args - Arguments to filter Users to count.
		 * @example
		 * // Count the number of Users
		 * const count = await prisma.user.count({
		 *   where: {
		 *     // ... the filter for the Users we want to count
		 *   }
		 * })
		 **/
		count<T extends UserCountArgs>(
			args?: Subset<T, UserCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], UserCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a User.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends UserAggregateArgs>(
			args: Subset<T, UserAggregateArgs>,
		): Prisma.PrismaPromise<GetUserAggregateType<T>>;

		/**
		 * Group by User.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserGroupByArgs} args - Group by arguments.
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
			T extends UserGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: UserGroupByArgs["orderBy"] }
				: { orderBy?: UserGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetUserGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the User model
		 */
		readonly fields: UserFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for User.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__UserClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		accounts<T extends User$accountsArgs<ExtArgs> = {}>(
			args?: Subset<T, User$accountsArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$AccountPayload<ExtArgs>,
					T,
					"findMany",
					GlobalOmitOptions
			  >
			| Null
		>;
		sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
			args?: Subset<T, User$sessionsArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$SessionPayload<ExtArgs>,
					T,
					"findMany",
					GlobalOmitOptions
			  >
			| Null
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the User model
	 */
	interface UserFieldRefs {
		readonly id: FieldRef<"User", "String">;
		readonly name: FieldRef<"User", "String">;
		readonly email: FieldRef<"User", "String">;
		readonly emailVerified: FieldRef<"User", "DateTime">;
		readonly image: FieldRef<"User", "String">;
	}

	// Custom InputTypes
	/**
	 * User findUnique
	 */
	export type UserFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * Filter, which User to fetch.
		 */
		where: UserWhereUniqueInput;
	};

	/**
	 * User findUniqueOrThrow
	 */
	export type UserFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * Filter, which User to fetch.
		 */
		where: UserWhereUniqueInput;
	};

	/**
	 * User findFirst
	 */
	export type UserFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * Filter, which User to fetch.
		 */
		where?: UserWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Users.
		 */
		cursor?: UserWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
	};

	/**
	 * User findFirstOrThrow
	 */
	export type UserFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * Filter, which User to fetch.
		 */
		where?: UserWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Users.
		 */
		cursor?: UserWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
	};

	/**
	 * User findMany
	 */
	export type UserFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * Filter, which Users to fetch.
		 */
		where?: UserWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Users.
		 */
		cursor?: UserWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number;
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
	};

	/**
	 * User create
	 */
	export type UserCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * The data needed to create a User.
		 */
		data?: XOR<UserCreateInput, UserUncheckedCreateInput>;
	};

	/**
	 * User createMany
	 */
	export type UserCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Users.
		 */
		data: UserCreateManyInput | UserCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * User createManyAndReturn
	 */
	export type UserCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * The data used to create many Users.
		 */
		data: UserCreateManyInput | UserCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * User update
	 */
	export type UserUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * The data needed to update a User.
		 */
		data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
		/**
		 * Choose, which User to update.
		 */
		where: UserWhereUniqueInput;
	};

	/**
	 * User updateMany
	 */
	export type UserUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Users.
		 */
		data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
		/**
		 * Filter which Users to update
		 */
		where?: UserWhereInput;
		/**
		 * Limit how many Users to update.
		 */
		limit?: number;
	};

	/**
	 * User updateManyAndReturn
	 */
	export type UserUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * The data used to update Users.
		 */
		data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
		/**
		 * Filter which Users to update
		 */
		where?: UserWhereInput;
		/**
		 * Limit how many Users to update.
		 */
		limit?: number;
	};

	/**
	 * User upsert
	 */
	export type UserUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * The filter to search for the User to update in case it exists.
		 */
		where: UserWhereUniqueInput;
		/**
		 * In case the User found by the `where` argument doesn't exist, create a new User with this data.
		 */
		create: XOR<UserCreateInput, UserUncheckedCreateInput>;
		/**
		 * In case the User was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
	};

	/**
	 * User delete
	 */
	export type UserDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
		/**
		 * Filter which User to delete.
		 */
		where: UserWhereUniqueInput;
	};

	/**
	 * User deleteMany
	 */
	export type UserDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Users to delete
		 */
		where?: UserWhereInput;
		/**
		 * Limit how many Users to delete.
		 */
		limit?: number;
	};

	/**
	 * User.accounts
	 */
	export type User$accountsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Account
		 */
		select?: AccountSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Account
		 */
		omit?: AccountOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: AccountInclude<ExtArgs> | null;
		where?: AccountWhereInput;
		orderBy?:
			| AccountOrderByWithRelationInput
			| AccountOrderByWithRelationInput[];
		cursor?: AccountWhereUniqueInput;
		take?: number;
		skip?: number;
		distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
	};

	/**
	 * User.sessions
	 */
	export type User$sessionsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null;
		where?: SessionWhereInput;
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[];
		cursor?: SessionWhereUniqueInput;
		take?: number;
		skip?: number;
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
	};

	/**
	 * User without action
	 */
	export type UserDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null;
	};

	/**
	 * Model VerificationToken
	 */

	export type AggregateVerificationToken = {
		_count: VerificationTokenCountAggregateOutputType | null;
		_min: VerificationTokenMinAggregateOutputType | null;
		_max: VerificationTokenMaxAggregateOutputType | null;
	};

	export type VerificationTokenMinAggregateOutputType = {
		identifier: string | null;
		token: string | null;
		expires: Date | null;
	};

	export type VerificationTokenMaxAggregateOutputType = {
		identifier: string | null;
		token: string | null;
		expires: Date | null;
	};

	export type VerificationTokenCountAggregateOutputType = {
		identifier: number;
		token: number;
		expires: number;
		_all: number;
	};

	export type VerificationTokenMinAggregateInputType = {
		identifier?: true;
		token?: true;
		expires?: true;
	};

	export type VerificationTokenMaxAggregateInputType = {
		identifier?: true;
		token?: true;
		expires?: true;
	};

	export type VerificationTokenCountAggregateInputType = {
		identifier?: true;
		token?: true;
		expires?: true;
		_all?: true;
	};

	export type VerificationTokenAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which VerificationToken to aggregate.
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of VerificationTokens to fetch.
		 */
		orderBy?:
			| VerificationTokenOrderByWithRelationInput
			| VerificationTokenOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: VerificationTokenWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` VerificationTokens from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` VerificationTokens.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned VerificationTokens
		 **/
		_count?: true | VerificationTokenCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: VerificationTokenMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: VerificationTokenMaxAggregateInputType;
	};

	export type GetVerificationTokenAggregateType<
		T extends VerificationTokenAggregateArgs,
	> = {
		[P in keyof T & keyof AggregateVerificationToken]: P extends
			| "_count"
			| "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateVerificationToken[P]>
			: GetScalarType<T[P], AggregateVerificationToken[P]>;
	};

	export type VerificationTokenGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: VerificationTokenWhereInput;
		orderBy?:
			| VerificationTokenOrderByWithAggregationInput
			| VerificationTokenOrderByWithAggregationInput[];
		by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum;
		having?: VerificationTokenScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: VerificationTokenCountAggregateInputType | true;
		_min?: VerificationTokenMinAggregateInputType;
		_max?: VerificationTokenMaxAggregateInputType;
	};

	export type VerificationTokenGroupByOutputType = {
		identifier: string;
		token: string;
		expires: Date;
		_count: VerificationTokenCountAggregateOutputType | null;
		_min: VerificationTokenMinAggregateOutputType | null;
		_max: VerificationTokenMaxAggregateOutputType | null;
	};

	type GetVerificationTokenGroupByPayload<
		T extends VerificationTokenGroupByArgs,
	> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<VerificationTokenGroupByOutputType, T["by"]> & {
				[P in keyof T &
					keyof VerificationTokenGroupByOutputType]: P extends "_count"
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
					: GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>;
			}
		>
	>;

	export type VerificationTokenSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			identifier?: boolean;
			token?: boolean;
			expires?: boolean;
		},
		ExtArgs["result"]["verificationToken"]
	>;

	export type VerificationTokenSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			identifier?: boolean;
			token?: boolean;
			expires?: boolean;
		},
		ExtArgs["result"]["verificationToken"]
	>;

	export type VerificationTokenSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			identifier?: boolean;
			token?: boolean;
			expires?: boolean;
		},
		ExtArgs["result"]["verificationToken"]
	>;

	export type VerificationTokenSelectScalar = {
		identifier?: boolean;
		token?: boolean;
		expires?: boolean;
	};

	export type VerificationTokenOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"identifier" | "token" | "expires",
		ExtArgs["result"]["verificationToken"]
	>;

	export type $VerificationTokenPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "VerificationToken";
		objects: {};
		scalars: $Extensions.GetPayloadResult<
			{
				identifier: string;
				token: string;
				expires: Date;
			},
			ExtArgs["result"]["verificationToken"]
		>;
		composites: {};
	};

	type VerificationTokenGetPayload<
		S extends boolean | null | undefined | VerificationTokenDefaultArgs,
	> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>;

	type VerificationTokenCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<
		VerificationTokenFindManyArgs,
		"select" | "include" | "distinct" | "omit"
	> & {
		select?: VerificationTokenCountAggregateInputType | true;
	};

	export interface VerificationTokenDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["VerificationToken"];
			meta: { name: "VerificationToken" };
		};
		/**
		 * Find zero or one VerificationToken that matches the filter.
		 * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
		 * @example
		 * // Get one VerificationToken
		 * const verificationToken = await prisma.verificationToken.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends VerificationTokenFindUniqueArgs>(
			args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
		 * @example
		 * // Get one VerificationToken
		 * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
			args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first VerificationToken that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
		 * @example
		 * // Get one VerificationToken
		 * const verificationToken = await prisma.verificationToken.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends VerificationTokenFindFirstArgs>(
			args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first VerificationToken that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
		 * @example
		 * // Get one VerificationToken
		 * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
			args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more VerificationTokens that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all VerificationTokens
		 * const verificationTokens = await prisma.verificationToken.findMany()
		 *
		 * // Get first 10 VerificationTokens
		 * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
		 *
		 * // Only select the `identifier`
		 * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
		 *
		 */
		findMany<T extends VerificationTokenFindManyArgs>(
			args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a VerificationToken.
		 * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
		 * @example
		 * // Create one VerificationToken
		 * const VerificationToken = await prisma.verificationToken.create({
		 *   data: {
		 *     // ... data to create a VerificationToken
		 *   }
		 * })
		 *
		 */
		create<T extends VerificationTokenCreateArgs>(
			args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many VerificationTokens.
		 * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
		 * @example
		 * // Create many VerificationTokens
		 * const verificationToken = await prisma.verificationToken.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends VerificationTokenCreateManyArgs>(
			args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many VerificationTokens and returns the data saved in the database.
		 * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
		 * @example
		 * // Create many VerificationTokens
		 * const verificationToken = await prisma.verificationToken.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many VerificationTokens and only return the `identifier`
		 * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
		 *   select: { identifier: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(
			args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a VerificationToken.
		 * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
		 * @example
		 * // Delete one VerificationToken
		 * const VerificationToken = await prisma.verificationToken.delete({
		 *   where: {
		 *     // ... filter to delete one VerificationToken
		 *   }
		 * })
		 *
		 */
		delete<T extends VerificationTokenDeleteArgs>(
			args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one VerificationToken.
		 * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
		 * @example
		 * // Update one VerificationToken
		 * const verificationToken = await prisma.verificationToken.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends VerificationTokenUpdateArgs>(
			args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more VerificationTokens.
		 * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
		 * @example
		 * // Delete a few VerificationTokens
		 * const { count } = await prisma.verificationToken.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends VerificationTokenDeleteManyArgs>(
			args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more VerificationTokens.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many VerificationTokens
		 * const verificationToken = await prisma.verificationToken.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends VerificationTokenUpdateManyArgs>(
			args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more VerificationTokens and returns the data updated in the database.
		 * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
		 * @example
		 * // Update many VerificationTokens
		 * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more VerificationTokens and only return the `identifier`
		 * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
		 *   select: { identifier: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(
			args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one VerificationToken.
		 * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
		 * @example
		 * // Update or create a VerificationToken
		 * const verificationToken = await prisma.verificationToken.upsert({
		 *   create: {
		 *     // ... data to create a VerificationToken
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the VerificationToken we want to update
		 *   }
		 * })
		 */
		upsert<T extends VerificationTokenUpsertArgs>(
			args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>,
		): Prisma__VerificationTokenClient<
			$Result.GetResult<
				Prisma.$VerificationTokenPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of VerificationTokens.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
		 * @example
		 * // Count the number of VerificationTokens
		 * const count = await prisma.verificationToken.count({
		 *   where: {
		 *     // ... the filter for the VerificationTokens we want to count
		 *   }
		 * })
		 **/
		count<T extends VerificationTokenCountArgs>(
			args?: Subset<T, VerificationTokenCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<
							T["select"],
							VerificationTokenCountAggregateOutputType
						>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a VerificationToken.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends VerificationTokenAggregateArgs>(
			args: Subset<T, VerificationTokenAggregateArgs>,
		): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>;

		/**
		 * Group by VerificationToken.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
			T extends VerificationTokenGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: VerificationTokenGroupByArgs["orderBy"] }
				: { orderBy?: VerificationTokenGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetVerificationTokenGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the VerificationToken model
		 */
		readonly fields: VerificationTokenFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for VerificationToken.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__VerificationTokenClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the VerificationToken model
	 */
	interface VerificationTokenFieldRefs {
		readonly identifier: FieldRef<"VerificationToken", "String">;
		readonly token: FieldRef<"VerificationToken", "String">;
		readonly expires: FieldRef<"VerificationToken", "DateTime">;
	}

	// Custom InputTypes
	/**
	 * VerificationToken findUnique
	 */
	export type VerificationTokenFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * Filter, which VerificationToken to fetch.
		 */
		where: VerificationTokenWhereUniqueInput;
	};

	/**
	 * VerificationToken findUniqueOrThrow
	 */
	export type VerificationTokenFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * Filter, which VerificationToken to fetch.
		 */
		where: VerificationTokenWhereUniqueInput;
	};

	/**
	 * VerificationToken findFirst
	 */
	export type VerificationTokenFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * Filter, which VerificationToken to fetch.
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of VerificationTokens to fetch.
		 */
		orderBy?:
			| VerificationTokenOrderByWithRelationInput
			| VerificationTokenOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for VerificationTokens.
		 */
		cursor?: VerificationTokenWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` VerificationTokens from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` VerificationTokens.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of VerificationTokens.
		 */
		distinct?:
			| VerificationTokenScalarFieldEnum
			| VerificationTokenScalarFieldEnum[];
	};

	/**
	 * VerificationToken findFirstOrThrow
	 */
	export type VerificationTokenFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * Filter, which VerificationToken to fetch.
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of VerificationTokens to fetch.
		 */
		orderBy?:
			| VerificationTokenOrderByWithRelationInput
			| VerificationTokenOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for VerificationTokens.
		 */
		cursor?: VerificationTokenWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` VerificationTokens from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` VerificationTokens.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of VerificationTokens.
		 */
		distinct?:
			| VerificationTokenScalarFieldEnum
			| VerificationTokenScalarFieldEnum[];
	};

	/**
	 * VerificationToken findMany
	 */
	export type VerificationTokenFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * Filter, which VerificationTokens to fetch.
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of VerificationTokens to fetch.
		 */
		orderBy?:
			| VerificationTokenOrderByWithRelationInput
			| VerificationTokenOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing VerificationTokens.
		 */
		cursor?: VerificationTokenWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` VerificationTokens from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` VerificationTokens.
		 */
		skip?: number;
		distinct?:
			| VerificationTokenScalarFieldEnum
			| VerificationTokenScalarFieldEnum[];
	};

	/**
	 * VerificationToken create
	 */
	export type VerificationTokenCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * The data needed to create a VerificationToken.
		 */
		data: XOR<
			VerificationTokenCreateInput,
			VerificationTokenUncheckedCreateInput
		>;
	};

	/**
	 * VerificationToken createMany
	 */
	export type VerificationTokenCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many VerificationTokens.
		 */
		data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * VerificationToken createManyAndReturn
	 */
	export type VerificationTokenCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * The data used to create many VerificationTokens.
		 */
		data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * VerificationToken update
	 */
	export type VerificationTokenUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * The data needed to update a VerificationToken.
		 */
		data: XOR<
			VerificationTokenUpdateInput,
			VerificationTokenUncheckedUpdateInput
		>;
		/**
		 * Choose, which VerificationToken to update.
		 */
		where: VerificationTokenWhereUniqueInput;
	};

	/**
	 * VerificationToken updateMany
	 */
	export type VerificationTokenUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update VerificationTokens.
		 */
		data: XOR<
			VerificationTokenUpdateManyMutationInput,
			VerificationTokenUncheckedUpdateManyInput
		>;
		/**
		 * Filter which VerificationTokens to update
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * Limit how many VerificationTokens to update.
		 */
		limit?: number;
	};

	/**
	 * VerificationToken updateManyAndReturn
	 */
	export type VerificationTokenUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * The data used to update VerificationTokens.
		 */
		data: XOR<
			VerificationTokenUpdateManyMutationInput,
			VerificationTokenUncheckedUpdateManyInput
		>;
		/**
		 * Filter which VerificationTokens to update
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * Limit how many VerificationTokens to update.
		 */
		limit?: number;
	};

	/**
	 * VerificationToken upsert
	 */
	export type VerificationTokenUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * The filter to search for the VerificationToken to update in case it exists.
		 */
		where: VerificationTokenWhereUniqueInput;
		/**
		 * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
		 */
		create: XOR<
			VerificationTokenCreateInput,
			VerificationTokenUncheckedCreateInput
		>;
		/**
		 * In case the VerificationToken was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<
			VerificationTokenUpdateInput,
			VerificationTokenUncheckedUpdateInput
		>;
	};

	/**
	 * VerificationToken delete
	 */
	export type VerificationTokenDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
		/**
		 * Filter which VerificationToken to delete.
		 */
		where: VerificationTokenWhereUniqueInput;
	};

	/**
	 * VerificationToken deleteMany
	 */
	export type VerificationTokenDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which VerificationTokens to delete
		 */
		where?: VerificationTokenWhereInput;
		/**
		 * Limit how many VerificationTokens to delete.
		 */
		limit?: number;
	};

	/**
	 * VerificationToken without action
	 */
	export type VerificationTokenDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the VerificationToken
		 */
		select?: VerificationTokenSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the VerificationToken
		 */
		omit?: VerificationTokenOmit<ExtArgs> | null;
	};

	/**
	 * Model Bus
	 */

	export type AggregateBus = {
		_count: BusCountAggregateOutputType | null;
		_avg: BusAvgAggregateOutputType | null;
		_sum: BusSumAggregateOutputType | null;
		_min: BusMinAggregateOutputType | null;
		_max: BusMaxAggregateOutputType | null;
	};

	export type BusAvgAggregateOutputType = {
		bus_id: number | null;
		capacity: number | null;
	};

	export type BusSumAggregateOutputType = {
		bus_id: number | null;
		capacity: number | null;
	};

	export type BusMinAggregateOutputType = {
		bus_id: number | null;
		bus_no: string | null;
		capacity: number | null;
		route_id: string | null;
		route_name: string | null;
		arrival_time: string | null;
		departure_time: string | null;
	};

	export type BusMaxAggregateOutputType = {
		bus_id: number | null;
		bus_no: string | null;
		capacity: number | null;
		route_id: string | null;
		route_name: string | null;
		arrival_time: string | null;
		departure_time: string | null;
	};

	export type BusCountAggregateOutputType = {
		bus_id: number;
		bus_no: number;
		capacity: number;
		route_id: number;
		route_name: number;
		arrival_time: number;
		departure_time: number;
		_all: number;
	};

	export type BusAvgAggregateInputType = {
		bus_id?: true;
		capacity?: true;
	};

	export type BusSumAggregateInputType = {
		bus_id?: true;
		capacity?: true;
	};

	export type BusMinAggregateInputType = {
		bus_id?: true;
		bus_no?: true;
		capacity?: true;
		route_id?: true;
		route_name?: true;
		arrival_time?: true;
		departure_time?: true;
	};

	export type BusMaxAggregateInputType = {
		bus_id?: true;
		bus_no?: true;
		capacity?: true;
		route_id?: true;
		route_name?: true;
		arrival_time?: true;
		departure_time?: true;
	};

	export type BusCountAggregateInputType = {
		bus_id?: true;
		bus_no?: true;
		capacity?: true;
		route_id?: true;
		route_name?: true;
		arrival_time?: true;
		departure_time?: true;
		_all?: true;
	};

	export type BusAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Bus to aggregate.
		 */
		where?: BusWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Buses to fetch.
		 */
		orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: BusWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Buses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Buses.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Buses
		 **/
		_count?: true | BusCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: BusAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: BusSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: BusMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: BusMaxAggregateInputType;
	};

	export type GetBusAggregateType<T extends BusAggregateArgs> = {
		[P in keyof T & keyof AggregateBus]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateBus[P]>
			: GetScalarType<T[P], AggregateBus[P]>;
	};

	export type BusGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: BusWhereInput;
		orderBy?: BusOrderByWithAggregationInput | BusOrderByWithAggregationInput[];
		by: BusScalarFieldEnum[] | BusScalarFieldEnum;
		having?: BusScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: BusCountAggregateInputType | true;
		_avg?: BusAvgAggregateInputType;
		_sum?: BusSumAggregateInputType;
		_min?: BusMinAggregateInputType;
		_max?: BusMaxAggregateInputType;
	};

	export type BusGroupByOutputType = {
		bus_id: number;
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		_count: BusCountAggregateOutputType | null;
		_avg: BusAvgAggregateOutputType | null;
		_sum: BusSumAggregateOutputType | null;
		_min: BusMinAggregateOutputType | null;
		_max: BusMaxAggregateOutputType | null;
	};

	type GetBusGroupByPayload<T extends BusGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<BusGroupByOutputType, T["by"]> & {
				[P in keyof T & keyof BusGroupByOutputType]: P extends "_count"
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], BusGroupByOutputType[P]>
					: GetScalarType<T[P], BusGroupByOutputType[P]>;
			}
		>
	>;

	export type BusSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			bus_id?: boolean;
			bus_no?: boolean;
			capacity?: boolean;
			route_id?: boolean;
			route_name?: boolean;
			arrival_time?: boolean;
			departure_time?: boolean;
			driver?: boolean | Bus$driverArgs<ExtArgs>;
			conductor?: boolean | Bus$conductorArgs<ExtArgs>;
			passes?: boolean | Bus$passesArgs<ExtArgs>;
			_count?: boolean | BusCountOutputTypeDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["bus"]
	>;

	export type BusSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			bus_id?: boolean;
			bus_no?: boolean;
			capacity?: boolean;
			route_id?: boolean;
			route_name?: boolean;
			arrival_time?: boolean;
			departure_time?: boolean;
		},
		ExtArgs["result"]["bus"]
	>;

	export type BusSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			bus_id?: boolean;
			bus_no?: boolean;
			capacity?: boolean;
			route_id?: boolean;
			route_name?: boolean;
			arrival_time?: boolean;
			departure_time?: boolean;
		},
		ExtArgs["result"]["bus"]
	>;

	export type BusSelectScalar = {
		bus_id?: boolean;
		bus_no?: boolean;
		capacity?: boolean;
		route_id?: boolean;
		route_name?: boolean;
		arrival_time?: boolean;
		departure_time?: boolean;
	};

	export type BusOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		| "bus_id"
		| "bus_no"
		| "capacity"
		| "route_id"
		| "route_name"
		| "arrival_time"
		| "departure_time",
		ExtArgs["result"]["bus"]
	>;
	export type BusInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		driver?: boolean | Bus$driverArgs<ExtArgs>;
		conductor?: boolean | Bus$conductorArgs<ExtArgs>;
		passes?: boolean | Bus$passesArgs<ExtArgs>;
		_count?: boolean | BusCountOutputTypeDefaultArgs<ExtArgs>;
	};
	export type BusIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {};
	export type BusIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {};

	export type $BusPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "Bus";
		objects: {
			driver: Prisma.$DriverPayload<ExtArgs> | null;
			conductor: Prisma.$ConductorPayload<ExtArgs> | null;
			passes: Prisma.$StudentPassPayload<ExtArgs>[];
		};
		scalars: $Extensions.GetPayloadResult<
			{
				bus_id: number;
				bus_no: string;
				capacity: number;
				route_id: string;
				route_name: string;
				arrival_time: string;
				departure_time: string;
			},
			ExtArgs["result"]["bus"]
		>;
		composites: {};
	};

	type BusGetPayload<S extends boolean | null | undefined | BusDefaultArgs> =
		$Result.GetResult<Prisma.$BusPayload, S>;

	type BusCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<BusFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
		select?: BusCountAggregateInputType | true;
	};

	export interface BusDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["Bus"];
			meta: { name: "Bus" };
		};
		/**
		 * Find zero or one Bus that matches the filter.
		 * @param {BusFindUniqueArgs} args - Arguments to find a Bus
		 * @example
		 * // Get one Bus
		 * const bus = await prisma.bus.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends BusFindUniqueArgs>(
			args: SelectSubset<T, BusFindUniqueArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Bus that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {BusFindUniqueOrThrowArgs} args - Arguments to find a Bus
		 * @example
		 * // Get one Bus
		 * const bus = await prisma.bus.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends BusFindUniqueOrThrowArgs>(
			args: SelectSubset<T, BusFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Bus that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusFindFirstArgs} args - Arguments to find a Bus
		 * @example
		 * // Get one Bus
		 * const bus = await prisma.bus.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends BusFindFirstArgs>(
			args?: SelectSubset<T, BusFindFirstArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Bus that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusFindFirstOrThrowArgs} args - Arguments to find a Bus
		 * @example
		 * // Get one Bus
		 * const bus = await prisma.bus.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends BusFindFirstOrThrowArgs>(
			args?: SelectSubset<T, BusFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Buses that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Buses
		 * const buses = await prisma.bus.findMany()
		 *
		 * // Get first 10 Buses
		 * const buses = await prisma.bus.findMany({ take: 10 })
		 *
		 * // Only select the `bus_id`
		 * const busWithBus_idOnly = await prisma.bus.findMany({ select: { bus_id: true } })
		 *
		 */
		findMany<T extends BusFindManyArgs>(
			args?: SelectSubset<T, BusFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Bus.
		 * @param {BusCreateArgs} args - Arguments to create a Bus.
		 * @example
		 * // Create one Bus
		 * const Bus = await prisma.bus.create({
		 *   data: {
		 *     // ... data to create a Bus
		 *   }
		 * })
		 *
		 */
		create<T extends BusCreateArgs>(
			args: SelectSubset<T, BusCreateArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Buses.
		 * @param {BusCreateManyArgs} args - Arguments to create many Buses.
		 * @example
		 * // Create many Buses
		 * const bus = await prisma.bus.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends BusCreateManyArgs>(
			args?: SelectSubset<T, BusCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Buses and returns the data saved in the database.
		 * @param {BusCreateManyAndReturnArgs} args - Arguments to create many Buses.
		 * @example
		 * // Create many Buses
		 * const bus = await prisma.bus.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Buses and only return the `bus_id`
		 * const busWithBus_idOnly = await prisma.bus.createManyAndReturn({
		 *   select: { bus_id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends BusCreateManyAndReturnArgs>(
			args?: SelectSubset<T, BusCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Bus.
		 * @param {BusDeleteArgs} args - Arguments to delete one Bus.
		 * @example
		 * // Delete one Bus
		 * const Bus = await prisma.bus.delete({
		 *   where: {
		 *     // ... filter to delete one Bus
		 *   }
		 * })
		 *
		 */
		delete<T extends BusDeleteArgs>(
			args: SelectSubset<T, BusDeleteArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Bus.
		 * @param {BusUpdateArgs} args - Arguments to update one Bus.
		 * @example
		 * // Update one Bus
		 * const bus = await prisma.bus.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends BusUpdateArgs>(
			args: SelectSubset<T, BusUpdateArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Buses.
		 * @param {BusDeleteManyArgs} args - Arguments to filter Buses to delete.
		 * @example
		 * // Delete a few Buses
		 * const { count } = await prisma.bus.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends BusDeleteManyArgs>(
			args?: SelectSubset<T, BusDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Buses.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Buses
		 * const bus = await prisma.bus.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends BusUpdateManyArgs>(
			args: SelectSubset<T, BusUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Buses and returns the data updated in the database.
		 * @param {BusUpdateManyAndReturnArgs} args - Arguments to update many Buses.
		 * @example
		 * // Update many Buses
		 * const bus = await prisma.bus.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Buses and only return the `bus_id`
		 * const busWithBus_idOnly = await prisma.bus.updateManyAndReturn({
		 *   select: { bus_id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends BusUpdateManyAndReturnArgs>(
			args: SelectSubset<T, BusUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Bus.
		 * @param {BusUpsertArgs} args - Arguments to update or create a Bus.
		 * @example
		 * // Update or create a Bus
		 * const bus = await prisma.bus.upsert({
		 *   create: {
		 *     // ... data to create a Bus
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Bus we want to update
		 *   }
		 * })
		 */
		upsert<T extends BusUpsertArgs>(
			args: SelectSubset<T, BusUpsertArgs<ExtArgs>>,
		): Prisma__BusClient<
			$Result.GetResult<
				Prisma.$BusPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Buses.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusCountArgs} args - Arguments to filter Buses to count.
		 * @example
		 * // Count the number of Buses
		 * const count = await prisma.bus.count({
		 *   where: {
		 *     // ... the filter for the Buses we want to count
		 *   }
		 * })
		 **/
		count<T extends BusCountArgs>(
			args?: Subset<T, BusCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], BusCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Bus.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends BusAggregateArgs>(
			args: Subset<T, BusAggregateArgs>,
		): Prisma.PrismaPromise<GetBusAggregateType<T>>;

		/**
		 * Group by Bus.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BusGroupByArgs} args - Group by arguments.
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
			T extends BusGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: BusGroupByArgs["orderBy"] }
				: { orderBy?: BusGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, BusGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetBusGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the Bus model
		 */
		readonly fields: BusFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Bus.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__BusClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		driver<T extends Bus$driverArgs<ExtArgs> = {}>(
			args?: Subset<T, Bus$driverArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;
		conductor<T extends Bus$conductorArgs<ExtArgs> = {}>(
			args?: Subset<T, Bus$conductorArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;
		passes<T extends Bus$passesArgs<ExtArgs> = {}>(
			args?: Subset<T, Bus$passesArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$StudentPassPayload<ExtArgs>,
					T,
					"findMany",
					GlobalOmitOptions
			  >
			| Null
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the Bus model
	 */
	interface BusFieldRefs {
		readonly bus_id: FieldRef<"Bus", "Int">;
		readonly bus_no: FieldRef<"Bus", "String">;
		readonly capacity: FieldRef<"Bus", "Int">;
		readonly route_id: FieldRef<"Bus", "String">;
		readonly route_name: FieldRef<"Bus", "String">;
		readonly arrival_time: FieldRef<"Bus", "String">;
		readonly departure_time: FieldRef<"Bus", "String">;
	}

	// Custom InputTypes
	/**
	 * Bus findUnique
	 */
	export type BusFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * Filter, which Bus to fetch.
		 */
		where: BusWhereUniqueInput;
	};

	/**
	 * Bus findUniqueOrThrow
	 */
	export type BusFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * Filter, which Bus to fetch.
		 */
		where: BusWhereUniqueInput;
	};

	/**
	 * Bus findFirst
	 */
	export type BusFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * Filter, which Bus to fetch.
		 */
		where?: BusWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Buses to fetch.
		 */
		orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Buses.
		 */
		cursor?: BusWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Buses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Buses.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Buses.
		 */
		distinct?: BusScalarFieldEnum | BusScalarFieldEnum[];
	};

	/**
	 * Bus findFirstOrThrow
	 */
	export type BusFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * Filter, which Bus to fetch.
		 */
		where?: BusWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Buses to fetch.
		 */
		orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Buses.
		 */
		cursor?: BusWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Buses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Buses.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Buses.
		 */
		distinct?: BusScalarFieldEnum | BusScalarFieldEnum[];
	};

	/**
	 * Bus findMany
	 */
	export type BusFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * Filter, which Buses to fetch.
		 */
		where?: BusWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Buses to fetch.
		 */
		orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Buses.
		 */
		cursor?: BusWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Buses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Buses.
		 */
		skip?: number;
		distinct?: BusScalarFieldEnum | BusScalarFieldEnum[];
	};

	/**
	 * Bus create
	 */
	export type BusCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * The data needed to create a Bus.
		 */
		data: XOR<BusCreateInput, BusUncheckedCreateInput>;
	};

	/**
	 * Bus createMany
	 */
	export type BusCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Buses.
		 */
		data: BusCreateManyInput | BusCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Bus createManyAndReturn
	 */
	export type BusCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * The data used to create many Buses.
		 */
		data: BusCreateManyInput | BusCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Bus update
	 */
	export type BusUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * The data needed to update a Bus.
		 */
		data: XOR<BusUpdateInput, BusUncheckedUpdateInput>;
		/**
		 * Choose, which Bus to update.
		 */
		where: BusWhereUniqueInput;
	};

	/**
	 * Bus updateMany
	 */
	export type BusUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Buses.
		 */
		data: XOR<BusUpdateManyMutationInput, BusUncheckedUpdateManyInput>;
		/**
		 * Filter which Buses to update
		 */
		where?: BusWhereInput;
		/**
		 * Limit how many Buses to update.
		 */
		limit?: number;
	};

	/**
	 * Bus updateManyAndReturn
	 */
	export type BusUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * The data used to update Buses.
		 */
		data: XOR<BusUpdateManyMutationInput, BusUncheckedUpdateManyInput>;
		/**
		 * Filter which Buses to update
		 */
		where?: BusWhereInput;
		/**
		 * Limit how many Buses to update.
		 */
		limit?: number;
	};

	/**
	 * Bus upsert
	 */
	export type BusUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * The filter to search for the Bus to update in case it exists.
		 */
		where: BusWhereUniqueInput;
		/**
		 * In case the Bus found by the `where` argument doesn't exist, create a new Bus with this data.
		 */
		create: XOR<BusCreateInput, BusUncheckedCreateInput>;
		/**
		 * In case the Bus was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<BusUpdateInput, BusUncheckedUpdateInput>;
	};

	/**
	 * Bus delete
	 */
	export type BusDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
		/**
		 * Filter which Bus to delete.
		 */
		where: BusWhereUniqueInput;
	};

	/**
	 * Bus deleteMany
	 */
	export type BusDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Buses to delete
		 */
		where?: BusWhereInput;
		/**
		 * Limit how many Buses to delete.
		 */
		limit?: number;
	};

	/**
	 * Bus.driver
	 */
	export type Bus$driverArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		where?: DriverWhereInput;
	};

	/**
	 * Bus.conductor
	 */
	export type Bus$conductorArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		where?: ConductorWhereInput;
	};

	/**
	 * Bus.passes
	 */
	export type Bus$passesArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		where?: StudentPassWhereInput;
		orderBy?:
			| StudentPassOrderByWithRelationInput
			| StudentPassOrderByWithRelationInput[];
		cursor?: StudentPassWhereUniqueInput;
		take?: number;
		skip?: number;
		distinct?: StudentPassScalarFieldEnum | StudentPassScalarFieldEnum[];
	};

	/**
	 * Bus without action
	 */
	export type BusDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Bus
		 */
		select?: BusSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Bus
		 */
		omit?: BusOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: BusInclude<ExtArgs> | null;
	};

	/**
	 * Model Driver
	 */

	export type AggregateDriver = {
		_count: DriverCountAggregateOutputType | null;
		_avg: DriverAvgAggregateOutputType | null;
		_sum: DriverSumAggregateOutputType | null;
		_min: DriverMinAggregateOutputType | null;
		_max: DriverMaxAggregateOutputType | null;
	};

	export type DriverAvgAggregateOutputType = {
		driver_id: number | null;
		bus_id: number | null;
	};

	export type DriverSumAggregateOutputType = {
		driver_id: number | null;
		bus_id: number | null;
	};

	export type DriverMinAggregateOutputType = {
		driver_id: number | null;
		name: string | null;
		phone: string | null;
		license_no: string | null;
		bus_id: number | null;
	};

	export type DriverMaxAggregateOutputType = {
		driver_id: number | null;
		name: string | null;
		phone: string | null;
		license_no: string | null;
		bus_id: number | null;
	};

	export type DriverCountAggregateOutputType = {
		driver_id: number;
		name: number;
		phone: number;
		license_no: number;
		bus_id: number;
		_all: number;
	};

	export type DriverAvgAggregateInputType = {
		driver_id?: true;
		bus_id?: true;
	};

	export type DriverSumAggregateInputType = {
		driver_id?: true;
		bus_id?: true;
	};

	export type DriverMinAggregateInputType = {
		driver_id?: true;
		name?: true;
		phone?: true;
		license_no?: true;
		bus_id?: true;
	};

	export type DriverMaxAggregateInputType = {
		driver_id?: true;
		name?: true;
		phone?: true;
		license_no?: true;
		bus_id?: true;
	};

	export type DriverCountAggregateInputType = {
		driver_id?: true;
		name?: true;
		phone?: true;
		license_no?: true;
		bus_id?: true;
		_all?: true;
	};

	export type DriverAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Driver to aggregate.
		 */
		where?: DriverWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Drivers to fetch.
		 */
		orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: DriverWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Drivers from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Drivers.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Drivers
		 **/
		_count?: true | DriverCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: DriverAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: DriverSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: DriverMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: DriverMaxAggregateInputType;
	};

	export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
		[P in keyof T & keyof AggregateDriver]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateDriver[P]>
			: GetScalarType<T[P], AggregateDriver[P]>;
	};

	export type DriverGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: DriverWhereInput;
		orderBy?:
			| DriverOrderByWithAggregationInput
			| DriverOrderByWithAggregationInput[];
		by: DriverScalarFieldEnum[] | DriverScalarFieldEnum;
		having?: DriverScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: DriverCountAggregateInputType | true;
		_avg?: DriverAvgAggregateInputType;
		_sum?: DriverSumAggregateInputType;
		_min?: DriverMinAggregateInputType;
		_max?: DriverMaxAggregateInputType;
	};

	export type DriverGroupByOutputType = {
		driver_id: number;
		name: string;
		phone: string;
		license_no: string;
		bus_id: number;
		_count: DriverCountAggregateOutputType | null;
		_avg: DriverAvgAggregateOutputType | null;
		_sum: DriverSumAggregateOutputType | null;
		_min: DriverMinAggregateOutputType | null;
		_max: DriverMaxAggregateOutputType | null;
	};

	type GetDriverGroupByPayload<T extends DriverGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<DriverGroupByOutputType, T["by"]> & {
					[P in keyof T & keyof DriverGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], DriverGroupByOutputType[P]>
						: GetScalarType<T[P], DriverGroupByOutputType[P]>;
				}
			>
		>;

	export type DriverSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			driver_id?: boolean;
			name?: boolean;
			phone?: boolean;
			license_no?: boolean;
			bus_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["driver"]
	>;

	export type DriverSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			driver_id?: boolean;
			name?: boolean;
			phone?: boolean;
			license_no?: boolean;
			bus_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["driver"]
	>;

	export type DriverSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			driver_id?: boolean;
			name?: boolean;
			phone?: boolean;
			license_no?: boolean;
			bus_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["driver"]
	>;

	export type DriverSelectScalar = {
		driver_id?: boolean;
		name?: boolean;
		phone?: boolean;
		license_no?: boolean;
		bus_id?: boolean;
	};

	export type DriverOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"driver_id" | "name" | "phone" | "license_no" | "bus_id",
		ExtArgs["result"]["driver"]
	>;
	export type DriverInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
	};
	export type DriverIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
	};
	export type DriverIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
	};

	export type $DriverPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "Driver";
		objects: {
			bus: Prisma.$BusPayload<ExtArgs>;
		};
		scalars: $Extensions.GetPayloadResult<
			{
				driver_id: number;
				name: string;
				phone: string;
				license_no: string;
				bus_id: number;
			},
			ExtArgs["result"]["driver"]
		>;
		composites: {};
	};

	type DriverGetPayload<
		S extends boolean | null | undefined | DriverDefaultArgs,
	> = $Result.GetResult<Prisma.$DriverPayload, S>;

	type DriverCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<DriverFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
		select?: DriverCountAggregateInputType | true;
	};

	export interface DriverDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["Driver"];
			meta: { name: "Driver" };
		};
		/**
		 * Find zero or one Driver that matches the filter.
		 * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
		 * @example
		 * // Get one Driver
		 * const driver = await prisma.driver.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends DriverFindUniqueArgs>(
			args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Driver that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
		 * @example
		 * // Get one Driver
		 * const driver = await prisma.driver.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(
			args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Driver that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverFindFirstArgs} args - Arguments to find a Driver
		 * @example
		 * // Get one Driver
		 * const driver = await prisma.driver.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends DriverFindFirstArgs>(
			args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Driver that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
		 * @example
		 * // Get one Driver
		 * const driver = await prisma.driver.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(
			args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Drivers that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Drivers
		 * const drivers = await prisma.driver.findMany()
		 *
		 * // Get first 10 Drivers
		 * const drivers = await prisma.driver.findMany({ take: 10 })
		 *
		 * // Only select the `driver_id`
		 * const driverWithDriver_idOnly = await prisma.driver.findMany({ select: { driver_id: true } })
		 *
		 */
		findMany<T extends DriverFindManyArgs>(
			args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Driver.
		 * @param {DriverCreateArgs} args - Arguments to create a Driver.
		 * @example
		 * // Create one Driver
		 * const Driver = await prisma.driver.create({
		 *   data: {
		 *     // ... data to create a Driver
		 *   }
		 * })
		 *
		 */
		create<T extends DriverCreateArgs>(
			args: SelectSubset<T, DriverCreateArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Drivers.
		 * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
		 * @example
		 * // Create many Drivers
		 * const driver = await prisma.driver.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends DriverCreateManyArgs>(
			args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Drivers and returns the data saved in the database.
		 * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
		 * @example
		 * // Create many Drivers
		 * const driver = await prisma.driver.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Drivers and only return the `driver_id`
		 * const driverWithDriver_idOnly = await prisma.driver.createManyAndReturn({
		 *   select: { driver_id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(
			args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Driver.
		 * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
		 * @example
		 * // Delete one Driver
		 * const Driver = await prisma.driver.delete({
		 *   where: {
		 *     // ... filter to delete one Driver
		 *   }
		 * })
		 *
		 */
		delete<T extends DriverDeleteArgs>(
			args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Driver.
		 * @param {DriverUpdateArgs} args - Arguments to update one Driver.
		 * @example
		 * // Update one Driver
		 * const driver = await prisma.driver.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends DriverUpdateArgs>(
			args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Drivers.
		 * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
		 * @example
		 * // Delete a few Drivers
		 * const { count } = await prisma.driver.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends DriverDeleteManyArgs>(
			args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Drivers.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Drivers
		 * const driver = await prisma.driver.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends DriverUpdateManyArgs>(
			args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Drivers and returns the data updated in the database.
		 * @param {DriverUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
		 * @example
		 * // Update many Drivers
		 * const driver = await prisma.driver.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Drivers and only return the `driver_id`
		 * const driverWithDriver_idOnly = await prisma.driver.updateManyAndReturn({
		 *   select: { driver_id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends DriverUpdateManyAndReturnArgs>(
			args: SelectSubset<T, DriverUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Driver.
		 * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
		 * @example
		 * // Update or create a Driver
		 * const driver = await prisma.driver.upsert({
		 *   create: {
		 *     // ... data to create a Driver
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Driver we want to update
		 *   }
		 * })
		 */
		upsert<T extends DriverUpsertArgs>(
			args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>,
		): Prisma__DriverClient<
			$Result.GetResult<
				Prisma.$DriverPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Drivers.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
		 * @example
		 * // Count the number of Drivers
		 * const count = await prisma.driver.count({
		 *   where: {
		 *     // ... the filter for the Drivers we want to count
		 *   }
		 * })
		 **/
		count<T extends DriverCountArgs>(
			args?: Subset<T, DriverCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], DriverCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Driver.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends DriverAggregateArgs>(
			args: Subset<T, DriverAggregateArgs>,
		): Prisma.PrismaPromise<GetDriverAggregateType<T>>;

		/**
		 * Group by Driver.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {DriverGroupByArgs} args - Group by arguments.
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
			T extends DriverGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: DriverGroupByArgs["orderBy"] }
				: { orderBy?: DriverGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetDriverGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the Driver model
		 */
		readonly fields: DriverFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Driver.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__DriverClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		bus<T extends BusDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, BusDefaultArgs<ExtArgs>>,
		): Prisma__BusClient<
			| $Result.GetResult<
					Prisma.$BusPayload<ExtArgs>,
					T,
					"findUniqueOrThrow",
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the Driver model
	 */
	interface DriverFieldRefs {
		readonly driver_id: FieldRef<"Driver", "Int">;
		readonly name: FieldRef<"Driver", "String">;
		readonly phone: FieldRef<"Driver", "String">;
		readonly license_no: FieldRef<"Driver", "String">;
		readonly bus_id: FieldRef<"Driver", "Int">;
	}

	// Custom InputTypes
	/**
	 * Driver findUnique
	 */
	export type DriverFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * Filter, which Driver to fetch.
		 */
		where: DriverWhereUniqueInput;
	};

	/**
	 * Driver findUniqueOrThrow
	 */
	export type DriverFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * Filter, which Driver to fetch.
		 */
		where: DriverWhereUniqueInput;
	};

	/**
	 * Driver findFirst
	 */
	export type DriverFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * Filter, which Driver to fetch.
		 */
		where?: DriverWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Drivers to fetch.
		 */
		orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Drivers.
		 */
		cursor?: DriverWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Drivers from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Drivers.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Drivers.
		 */
		distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[];
	};

	/**
	 * Driver findFirstOrThrow
	 */
	export type DriverFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * Filter, which Driver to fetch.
		 */
		where?: DriverWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Drivers to fetch.
		 */
		orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Drivers.
		 */
		cursor?: DriverWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Drivers from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Drivers.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Drivers.
		 */
		distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[];
	};

	/**
	 * Driver findMany
	 */
	export type DriverFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * Filter, which Drivers to fetch.
		 */
		where?: DriverWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Drivers to fetch.
		 */
		orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Drivers.
		 */
		cursor?: DriverWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Drivers from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Drivers.
		 */
		skip?: number;
		distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[];
	};

	/**
	 * Driver create
	 */
	export type DriverCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * The data needed to create a Driver.
		 */
		data: XOR<DriverCreateInput, DriverUncheckedCreateInput>;
	};

	/**
	 * Driver createMany
	 */
	export type DriverCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Drivers.
		 */
		data: DriverCreateManyInput | DriverCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Driver createManyAndReturn
	 */
	export type DriverCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * The data used to create many Drivers.
		 */
		data: DriverCreateManyInput | DriverCreateManyInput[];
		skipDuplicates?: boolean;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverIncludeCreateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Driver update
	 */
	export type DriverUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * The data needed to update a Driver.
		 */
		data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>;
		/**
		 * Choose, which Driver to update.
		 */
		where: DriverWhereUniqueInput;
	};

	/**
	 * Driver updateMany
	 */
	export type DriverUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Drivers.
		 */
		data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>;
		/**
		 * Filter which Drivers to update
		 */
		where?: DriverWhereInput;
		/**
		 * Limit how many Drivers to update.
		 */
		limit?: number;
	};

	/**
	 * Driver updateManyAndReturn
	 */
	export type DriverUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * The data used to update Drivers.
		 */
		data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>;
		/**
		 * Filter which Drivers to update
		 */
		where?: DriverWhereInput;
		/**
		 * Limit how many Drivers to update.
		 */
		limit?: number;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverIncludeUpdateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Driver upsert
	 */
	export type DriverUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * The filter to search for the Driver to update in case it exists.
		 */
		where: DriverWhereUniqueInput;
		/**
		 * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
		 */
		create: XOR<DriverCreateInput, DriverUncheckedCreateInput>;
		/**
		 * In case the Driver was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>;
	};

	/**
	 * Driver delete
	 */
	export type DriverDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
		/**
		 * Filter which Driver to delete.
		 */
		where: DriverWhereUniqueInput;
	};

	/**
	 * Driver deleteMany
	 */
	export type DriverDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Drivers to delete
		 */
		where?: DriverWhereInput;
		/**
		 * Limit how many Drivers to delete.
		 */
		limit?: number;
	};

	/**
	 * Driver without action
	 */
	export type DriverDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Driver
		 */
		select?: DriverSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Driver
		 */
		omit?: DriverOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: DriverInclude<ExtArgs> | null;
	};

	/**
	 * Model Conductor
	 */

	export type AggregateConductor = {
		_count: ConductorCountAggregateOutputType | null;
		_avg: ConductorAvgAggregateOutputType | null;
		_sum: ConductorSumAggregateOutputType | null;
		_min: ConductorMinAggregateOutputType | null;
		_max: ConductorMaxAggregateOutputType | null;
	};

	export type ConductorAvgAggregateOutputType = {
		conductor_id: number | null;
		bus_id: number | null;
	};

	export type ConductorSumAggregateOutputType = {
		conductor_id: number | null;
		bus_id: number | null;
	};

	export type ConductorMinAggregateOutputType = {
		conductor_id: number | null;
		name: string | null;
		phone: string | null;
		bus_id: number | null;
	};

	export type ConductorMaxAggregateOutputType = {
		conductor_id: number | null;
		name: string | null;
		phone: string | null;
		bus_id: number | null;
	};

	export type ConductorCountAggregateOutputType = {
		conductor_id: number;
		name: number;
		phone: number;
		bus_id: number;
		_all: number;
	};

	export type ConductorAvgAggregateInputType = {
		conductor_id?: true;
		bus_id?: true;
	};

	export type ConductorSumAggregateInputType = {
		conductor_id?: true;
		bus_id?: true;
	};

	export type ConductorMinAggregateInputType = {
		conductor_id?: true;
		name?: true;
		phone?: true;
		bus_id?: true;
	};

	export type ConductorMaxAggregateInputType = {
		conductor_id?: true;
		name?: true;
		phone?: true;
		bus_id?: true;
	};

	export type ConductorCountAggregateInputType = {
		conductor_id?: true;
		name?: true;
		phone?: true;
		bus_id?: true;
		_all?: true;
	};

	export type ConductorAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Conductor to aggregate.
		 */
		where?: ConductorWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Conductors to fetch.
		 */
		orderBy?:
			| ConductorOrderByWithRelationInput
			| ConductorOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: ConductorWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Conductors from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Conductors.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Conductors
		 **/
		_count?: true | ConductorCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: ConductorAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: ConductorSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: ConductorMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: ConductorMaxAggregateInputType;
	};

	export type GetConductorAggregateType<T extends ConductorAggregateArgs> = {
		[P in keyof T & keyof AggregateConductor]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateConductor[P]>
			: GetScalarType<T[P], AggregateConductor[P]>;
	};

	export type ConductorGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: ConductorWhereInput;
		orderBy?:
			| ConductorOrderByWithAggregationInput
			| ConductorOrderByWithAggregationInput[];
		by: ConductorScalarFieldEnum[] | ConductorScalarFieldEnum;
		having?: ConductorScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: ConductorCountAggregateInputType | true;
		_avg?: ConductorAvgAggregateInputType;
		_sum?: ConductorSumAggregateInputType;
		_min?: ConductorMinAggregateInputType;
		_max?: ConductorMaxAggregateInputType;
	};

	export type ConductorGroupByOutputType = {
		conductor_id: number;
		name: string;
		phone: string;
		bus_id: number;
		_count: ConductorCountAggregateOutputType | null;
		_avg: ConductorAvgAggregateOutputType | null;
		_sum: ConductorSumAggregateOutputType | null;
		_min: ConductorMinAggregateOutputType | null;
		_max: ConductorMaxAggregateOutputType | null;
	};

	type GetConductorGroupByPayload<T extends ConductorGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<ConductorGroupByOutputType, T["by"]> & {
					[P in keyof T & keyof ConductorGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], ConductorGroupByOutputType[P]>
						: GetScalarType<T[P], ConductorGroupByOutputType[P]>;
				}
			>
		>;

	export type ConductorSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			conductor_id?: boolean;
			name?: boolean;
			phone?: boolean;
			bus_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["conductor"]
	>;

	export type ConductorSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			conductor_id?: boolean;
			name?: boolean;
			phone?: boolean;
			bus_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["conductor"]
	>;

	export type ConductorSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			conductor_id?: boolean;
			name?: boolean;
			phone?: boolean;
			bus_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["conductor"]
	>;

	export type ConductorSelectScalar = {
		conductor_id?: boolean;
		name?: boolean;
		phone?: boolean;
		bus_id?: boolean;
	};

	export type ConductorOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"conductor_id" | "name" | "phone" | "bus_id",
		ExtArgs["result"]["conductor"]
	>;
	export type ConductorInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
	};
	export type ConductorIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
	};
	export type ConductorIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
	};

	export type $ConductorPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "Conductor";
		objects: {
			bus: Prisma.$BusPayload<ExtArgs>;
		};
		scalars: $Extensions.GetPayloadResult<
			{
				conductor_id: number;
				name: string;
				phone: string;
				bus_id: number;
			},
			ExtArgs["result"]["conductor"]
		>;
		composites: {};
	};

	type ConductorGetPayload<
		S extends boolean | null | undefined | ConductorDefaultArgs,
	> = $Result.GetResult<Prisma.$ConductorPayload, S>;

	type ConductorCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<
		ConductorFindManyArgs,
		"select" | "include" | "distinct" | "omit"
	> & {
		select?: ConductorCountAggregateInputType | true;
	};

	export interface ConductorDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["Conductor"];
			meta: { name: "Conductor" };
		};
		/**
		 * Find zero or one Conductor that matches the filter.
		 * @param {ConductorFindUniqueArgs} args - Arguments to find a Conductor
		 * @example
		 * // Get one Conductor
		 * const conductor = await prisma.conductor.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends ConductorFindUniqueArgs>(
			args: SelectSubset<T, ConductorFindUniqueArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Conductor that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {ConductorFindUniqueOrThrowArgs} args - Arguments to find a Conductor
		 * @example
		 * // Get one Conductor
		 * const conductor = await prisma.conductor.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends ConductorFindUniqueOrThrowArgs>(
			args: SelectSubset<T, ConductorFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Conductor that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorFindFirstArgs} args - Arguments to find a Conductor
		 * @example
		 * // Get one Conductor
		 * const conductor = await prisma.conductor.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends ConductorFindFirstArgs>(
			args?: SelectSubset<T, ConductorFindFirstArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Conductor that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorFindFirstOrThrowArgs} args - Arguments to find a Conductor
		 * @example
		 * // Get one Conductor
		 * const conductor = await prisma.conductor.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends ConductorFindFirstOrThrowArgs>(
			args?: SelectSubset<T, ConductorFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Conductors that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Conductors
		 * const conductors = await prisma.conductor.findMany()
		 *
		 * // Get first 10 Conductors
		 * const conductors = await prisma.conductor.findMany({ take: 10 })
		 *
		 * // Only select the `conductor_id`
		 * const conductorWithConductor_idOnly = await prisma.conductor.findMany({ select: { conductor_id: true } })
		 *
		 */
		findMany<T extends ConductorFindManyArgs>(
			args?: SelectSubset<T, ConductorFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Conductor.
		 * @param {ConductorCreateArgs} args - Arguments to create a Conductor.
		 * @example
		 * // Create one Conductor
		 * const Conductor = await prisma.conductor.create({
		 *   data: {
		 *     // ... data to create a Conductor
		 *   }
		 * })
		 *
		 */
		create<T extends ConductorCreateArgs>(
			args: SelectSubset<T, ConductorCreateArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Conductors.
		 * @param {ConductorCreateManyArgs} args - Arguments to create many Conductors.
		 * @example
		 * // Create many Conductors
		 * const conductor = await prisma.conductor.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends ConductorCreateManyArgs>(
			args?: SelectSubset<T, ConductorCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Conductors and returns the data saved in the database.
		 * @param {ConductorCreateManyAndReturnArgs} args - Arguments to create many Conductors.
		 * @example
		 * // Create many Conductors
		 * const conductor = await prisma.conductor.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Conductors and only return the `conductor_id`
		 * const conductorWithConductor_idOnly = await prisma.conductor.createManyAndReturn({
		 *   select: { conductor_id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends ConductorCreateManyAndReturnArgs>(
			args?: SelectSubset<T, ConductorCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Conductor.
		 * @param {ConductorDeleteArgs} args - Arguments to delete one Conductor.
		 * @example
		 * // Delete one Conductor
		 * const Conductor = await prisma.conductor.delete({
		 *   where: {
		 *     // ... filter to delete one Conductor
		 *   }
		 * })
		 *
		 */
		delete<T extends ConductorDeleteArgs>(
			args: SelectSubset<T, ConductorDeleteArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Conductor.
		 * @param {ConductorUpdateArgs} args - Arguments to update one Conductor.
		 * @example
		 * // Update one Conductor
		 * const conductor = await prisma.conductor.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends ConductorUpdateArgs>(
			args: SelectSubset<T, ConductorUpdateArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Conductors.
		 * @param {ConductorDeleteManyArgs} args - Arguments to filter Conductors to delete.
		 * @example
		 * // Delete a few Conductors
		 * const { count } = await prisma.conductor.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends ConductorDeleteManyArgs>(
			args?: SelectSubset<T, ConductorDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Conductors.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Conductors
		 * const conductor = await prisma.conductor.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends ConductorUpdateManyArgs>(
			args: SelectSubset<T, ConductorUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Conductors and returns the data updated in the database.
		 * @param {ConductorUpdateManyAndReturnArgs} args - Arguments to update many Conductors.
		 * @example
		 * // Update many Conductors
		 * const conductor = await prisma.conductor.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Conductors and only return the `conductor_id`
		 * const conductorWithConductor_idOnly = await prisma.conductor.updateManyAndReturn({
		 *   select: { conductor_id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends ConductorUpdateManyAndReturnArgs>(
			args: SelectSubset<T, ConductorUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Conductor.
		 * @param {ConductorUpsertArgs} args - Arguments to update or create a Conductor.
		 * @example
		 * // Update or create a Conductor
		 * const conductor = await prisma.conductor.upsert({
		 *   create: {
		 *     // ... data to create a Conductor
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Conductor we want to update
		 *   }
		 * })
		 */
		upsert<T extends ConductorUpsertArgs>(
			args: SelectSubset<T, ConductorUpsertArgs<ExtArgs>>,
		): Prisma__ConductorClient<
			$Result.GetResult<
				Prisma.$ConductorPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Conductors.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorCountArgs} args - Arguments to filter Conductors to count.
		 * @example
		 * // Count the number of Conductors
		 * const count = await prisma.conductor.count({
		 *   where: {
		 *     // ... the filter for the Conductors we want to count
		 *   }
		 * })
		 **/
		count<T extends ConductorCountArgs>(
			args?: Subset<T, ConductorCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], ConductorCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Conductor.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends ConductorAggregateArgs>(
			args: Subset<T, ConductorAggregateArgs>,
		): Prisma.PrismaPromise<GetConductorAggregateType<T>>;

		/**
		 * Group by Conductor.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConductorGroupByArgs} args - Group by arguments.
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
			T extends ConductorGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: ConductorGroupByArgs["orderBy"] }
				: { orderBy?: ConductorGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, ConductorGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetConductorGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the Conductor model
		 */
		readonly fields: ConductorFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Conductor.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__ConductorClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		bus<T extends BusDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, BusDefaultArgs<ExtArgs>>,
		): Prisma__BusClient<
			| $Result.GetResult<
					Prisma.$BusPayload<ExtArgs>,
					T,
					"findUniqueOrThrow",
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the Conductor model
	 */
	interface ConductorFieldRefs {
		readonly conductor_id: FieldRef<"Conductor", "Int">;
		readonly name: FieldRef<"Conductor", "String">;
		readonly phone: FieldRef<"Conductor", "String">;
		readonly bus_id: FieldRef<"Conductor", "Int">;
	}

	// Custom InputTypes
	/**
	 * Conductor findUnique
	 */
	export type ConductorFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * Filter, which Conductor to fetch.
		 */
		where: ConductorWhereUniqueInput;
	};

	/**
	 * Conductor findUniqueOrThrow
	 */
	export type ConductorFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * Filter, which Conductor to fetch.
		 */
		where: ConductorWhereUniqueInput;
	};

	/**
	 * Conductor findFirst
	 */
	export type ConductorFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * Filter, which Conductor to fetch.
		 */
		where?: ConductorWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Conductors to fetch.
		 */
		orderBy?:
			| ConductorOrderByWithRelationInput
			| ConductorOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Conductors.
		 */
		cursor?: ConductorWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Conductors from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Conductors.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Conductors.
		 */
		distinct?: ConductorScalarFieldEnum | ConductorScalarFieldEnum[];
	};

	/**
	 * Conductor findFirstOrThrow
	 */
	export type ConductorFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * Filter, which Conductor to fetch.
		 */
		where?: ConductorWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Conductors to fetch.
		 */
		orderBy?:
			| ConductorOrderByWithRelationInput
			| ConductorOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Conductors.
		 */
		cursor?: ConductorWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Conductors from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Conductors.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Conductors.
		 */
		distinct?: ConductorScalarFieldEnum | ConductorScalarFieldEnum[];
	};

	/**
	 * Conductor findMany
	 */
	export type ConductorFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * Filter, which Conductors to fetch.
		 */
		where?: ConductorWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Conductors to fetch.
		 */
		orderBy?:
			| ConductorOrderByWithRelationInput
			| ConductorOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Conductors.
		 */
		cursor?: ConductorWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Conductors from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Conductors.
		 */
		skip?: number;
		distinct?: ConductorScalarFieldEnum | ConductorScalarFieldEnum[];
	};

	/**
	 * Conductor create
	 */
	export type ConductorCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * The data needed to create a Conductor.
		 */
		data: XOR<ConductorCreateInput, ConductorUncheckedCreateInput>;
	};

	/**
	 * Conductor createMany
	 */
	export type ConductorCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Conductors.
		 */
		data: ConductorCreateManyInput | ConductorCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Conductor createManyAndReturn
	 */
	export type ConductorCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * The data used to create many Conductors.
		 */
		data: ConductorCreateManyInput | ConductorCreateManyInput[];
		skipDuplicates?: boolean;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorIncludeCreateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Conductor update
	 */
	export type ConductorUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * The data needed to update a Conductor.
		 */
		data: XOR<ConductorUpdateInput, ConductorUncheckedUpdateInput>;
		/**
		 * Choose, which Conductor to update.
		 */
		where: ConductorWhereUniqueInput;
	};

	/**
	 * Conductor updateMany
	 */
	export type ConductorUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Conductors.
		 */
		data: XOR<
			ConductorUpdateManyMutationInput,
			ConductorUncheckedUpdateManyInput
		>;
		/**
		 * Filter which Conductors to update
		 */
		where?: ConductorWhereInput;
		/**
		 * Limit how many Conductors to update.
		 */
		limit?: number;
	};

	/**
	 * Conductor updateManyAndReturn
	 */
	export type ConductorUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * The data used to update Conductors.
		 */
		data: XOR<
			ConductorUpdateManyMutationInput,
			ConductorUncheckedUpdateManyInput
		>;
		/**
		 * Filter which Conductors to update
		 */
		where?: ConductorWhereInput;
		/**
		 * Limit how many Conductors to update.
		 */
		limit?: number;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorIncludeUpdateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * Conductor upsert
	 */
	export type ConductorUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * The filter to search for the Conductor to update in case it exists.
		 */
		where: ConductorWhereUniqueInput;
		/**
		 * In case the Conductor found by the `where` argument doesn't exist, create a new Conductor with this data.
		 */
		create: XOR<ConductorCreateInput, ConductorUncheckedCreateInput>;
		/**
		 * In case the Conductor was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<ConductorUpdateInput, ConductorUncheckedUpdateInput>;
	};

	/**
	 * Conductor delete
	 */
	export type ConductorDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
		/**
		 * Filter which Conductor to delete.
		 */
		where: ConductorWhereUniqueInput;
	};

	/**
	 * Conductor deleteMany
	 */
	export type ConductorDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Conductors to delete
		 */
		where?: ConductorWhereInput;
		/**
		 * Limit how many Conductors to delete.
		 */
		limit?: number;
	};

	/**
	 * Conductor without action
	 */
	export type ConductorDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Conductor
		 */
		select?: ConductorSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Conductor
		 */
		omit?: ConductorOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConductorInclude<ExtArgs> | null;
	};

	/**
	 * Model Stop
	 */

	export type AggregateStop = {
		_count: StopCountAggregateOutputType | null;
		_avg: StopAvgAggregateOutputType | null;
		_sum: StopSumAggregateOutputType | null;
		_min: StopMinAggregateOutputType | null;
		_max: StopMaxAggregateOutputType | null;
	};

	export type StopAvgAggregateOutputType = {
		stop_id: number | null;
		distance_km: number | null;
	};

	export type StopSumAggregateOutputType = {
		stop_id: number | null;
		distance_km: number | null;
	};

	export type StopMinAggregateOutputType = {
		stop_id: number | null;
		stop_name: string | null;
		area: string | null;
		distance_km: number | null;
	};

	export type StopMaxAggregateOutputType = {
		stop_id: number | null;
		stop_name: string | null;
		area: string | null;
		distance_km: number | null;
	};

	export type StopCountAggregateOutputType = {
		stop_id: number;
		stop_name: number;
		area: number;
		distance_km: number;
		_all: number;
	};

	export type StopAvgAggregateInputType = {
		stop_id?: true;
		distance_km?: true;
	};

	export type StopSumAggregateInputType = {
		stop_id?: true;
		distance_km?: true;
	};

	export type StopMinAggregateInputType = {
		stop_id?: true;
		stop_name?: true;
		area?: true;
		distance_km?: true;
	};

	export type StopMaxAggregateInputType = {
		stop_id?: true;
		stop_name?: true;
		area?: true;
		distance_km?: true;
	};

	export type StopCountAggregateInputType = {
		stop_id?: true;
		stop_name?: true;
		area?: true;
		distance_km?: true;
		_all?: true;
	};

	export type StopAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Stop to aggregate.
		 */
		where?: StopWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Stops to fetch.
		 */
		orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: StopWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Stops from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Stops.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Stops
		 **/
		_count?: true | StopCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: StopAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: StopSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: StopMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: StopMaxAggregateInputType;
	};

	export type GetStopAggregateType<T extends StopAggregateArgs> = {
		[P in keyof T & keyof AggregateStop]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateStop[P]>
			: GetScalarType<T[P], AggregateStop[P]>;
	};

	export type StopGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: StopWhereInput;
		orderBy?:
			| StopOrderByWithAggregationInput
			| StopOrderByWithAggregationInput[];
		by: StopScalarFieldEnum[] | StopScalarFieldEnum;
		having?: StopScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: StopCountAggregateInputType | true;
		_avg?: StopAvgAggregateInputType;
		_sum?: StopSumAggregateInputType;
		_min?: StopMinAggregateInputType;
		_max?: StopMaxAggregateInputType;
	};

	export type StopGroupByOutputType = {
		stop_id: number;
		stop_name: string;
		area: string;
		distance_km: number;
		_count: StopCountAggregateOutputType | null;
		_avg: StopAvgAggregateOutputType | null;
		_sum: StopSumAggregateOutputType | null;
		_min: StopMinAggregateOutputType | null;
		_max: StopMaxAggregateOutputType | null;
	};

	type GetStopGroupByPayload<T extends StopGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<StopGroupByOutputType, T["by"]> & {
				[P in keyof T & keyof StopGroupByOutputType]: P extends "_count"
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], StopGroupByOutputType[P]>
					: GetScalarType<T[P], StopGroupByOutputType[P]>;
			}
		>
	>;

	export type StopSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			stop_id?: boolean;
			stop_name?: boolean;
			area?: boolean;
			distance_km?: boolean;
			passes?: boolean | Stop$passesArgs<ExtArgs>;
			_count?: boolean | StopCountOutputTypeDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["stop"]
	>;

	export type StopSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			stop_id?: boolean;
			stop_name?: boolean;
			area?: boolean;
			distance_km?: boolean;
		},
		ExtArgs["result"]["stop"]
	>;

	export type StopSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			stop_id?: boolean;
			stop_name?: boolean;
			area?: boolean;
			distance_km?: boolean;
		},
		ExtArgs["result"]["stop"]
	>;

	export type StopSelectScalar = {
		stop_id?: boolean;
		stop_name?: boolean;
		area?: boolean;
		distance_km?: boolean;
	};

	export type StopOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"stop_id" | "stop_name" | "area" | "distance_km",
		ExtArgs["result"]["stop"]
	>;
	export type StopInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		passes?: boolean | Stop$passesArgs<ExtArgs>;
		_count?: boolean | StopCountOutputTypeDefaultArgs<ExtArgs>;
	};
	export type StopIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {};
	export type StopIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {};

	export type $StopPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "Stop";
		objects: {
			passes: Prisma.$StudentPassPayload<ExtArgs>[];
		};
		scalars: $Extensions.GetPayloadResult<
			{
				stop_id: number;
				stop_name: string;
				area: string;
				distance_km: number;
			},
			ExtArgs["result"]["stop"]
		>;
		composites: {};
	};

	type StopGetPayload<S extends boolean | null | undefined | StopDefaultArgs> =
		$Result.GetResult<Prisma.$StopPayload, S>;

	type StopCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<StopFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
		select?: StopCountAggregateInputType | true;
	};

	export interface StopDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["Stop"];
			meta: { name: "Stop" };
		};
		/**
		 * Find zero or one Stop that matches the filter.
		 * @param {StopFindUniqueArgs} args - Arguments to find a Stop
		 * @example
		 * // Get one Stop
		 * const stop = await prisma.stop.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends StopFindUniqueArgs>(
			args: SelectSubset<T, StopFindUniqueArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Stop that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {StopFindUniqueOrThrowArgs} args - Arguments to find a Stop
		 * @example
		 * // Get one Stop
		 * const stop = await prisma.stop.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends StopFindUniqueOrThrowArgs>(
			args: SelectSubset<T, StopFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Stop that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopFindFirstArgs} args - Arguments to find a Stop
		 * @example
		 * // Get one Stop
		 * const stop = await prisma.stop.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends StopFindFirstArgs>(
			args?: SelectSubset<T, StopFindFirstArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Stop that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopFindFirstOrThrowArgs} args - Arguments to find a Stop
		 * @example
		 * // Get one Stop
		 * const stop = await prisma.stop.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends StopFindFirstOrThrowArgs>(
			args?: SelectSubset<T, StopFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Stops that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Stops
		 * const stops = await prisma.stop.findMany()
		 *
		 * // Get first 10 Stops
		 * const stops = await prisma.stop.findMany({ take: 10 })
		 *
		 * // Only select the `stop_id`
		 * const stopWithStop_idOnly = await prisma.stop.findMany({ select: { stop_id: true } })
		 *
		 */
		findMany<T extends StopFindManyArgs>(
			args?: SelectSubset<T, StopFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Stop.
		 * @param {StopCreateArgs} args - Arguments to create a Stop.
		 * @example
		 * // Create one Stop
		 * const Stop = await prisma.stop.create({
		 *   data: {
		 *     // ... data to create a Stop
		 *   }
		 * })
		 *
		 */
		create<T extends StopCreateArgs>(
			args: SelectSubset<T, StopCreateArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Stops.
		 * @param {StopCreateManyArgs} args - Arguments to create many Stops.
		 * @example
		 * // Create many Stops
		 * const stop = await prisma.stop.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends StopCreateManyArgs>(
			args?: SelectSubset<T, StopCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Stops and returns the data saved in the database.
		 * @param {StopCreateManyAndReturnArgs} args - Arguments to create many Stops.
		 * @example
		 * // Create many Stops
		 * const stop = await prisma.stop.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Stops and only return the `stop_id`
		 * const stopWithStop_idOnly = await prisma.stop.createManyAndReturn({
		 *   select: { stop_id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends StopCreateManyAndReturnArgs>(
			args?: SelectSubset<T, StopCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Stop.
		 * @param {StopDeleteArgs} args - Arguments to delete one Stop.
		 * @example
		 * // Delete one Stop
		 * const Stop = await prisma.stop.delete({
		 *   where: {
		 *     // ... filter to delete one Stop
		 *   }
		 * })
		 *
		 */
		delete<T extends StopDeleteArgs>(
			args: SelectSubset<T, StopDeleteArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Stop.
		 * @param {StopUpdateArgs} args - Arguments to update one Stop.
		 * @example
		 * // Update one Stop
		 * const stop = await prisma.stop.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends StopUpdateArgs>(
			args: SelectSubset<T, StopUpdateArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Stops.
		 * @param {StopDeleteManyArgs} args - Arguments to filter Stops to delete.
		 * @example
		 * // Delete a few Stops
		 * const { count } = await prisma.stop.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends StopDeleteManyArgs>(
			args?: SelectSubset<T, StopDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Stops.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Stops
		 * const stop = await prisma.stop.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends StopUpdateManyArgs>(
			args: SelectSubset<T, StopUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Stops and returns the data updated in the database.
		 * @param {StopUpdateManyAndReturnArgs} args - Arguments to update many Stops.
		 * @example
		 * // Update many Stops
		 * const stop = await prisma.stop.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Stops and only return the `stop_id`
		 * const stopWithStop_idOnly = await prisma.stop.updateManyAndReturn({
		 *   select: { stop_id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends StopUpdateManyAndReturnArgs>(
			args: SelectSubset<T, StopUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Stop.
		 * @param {StopUpsertArgs} args - Arguments to update or create a Stop.
		 * @example
		 * // Update or create a Stop
		 * const stop = await prisma.stop.upsert({
		 *   create: {
		 *     // ... data to create a Stop
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Stop we want to update
		 *   }
		 * })
		 */
		upsert<T extends StopUpsertArgs>(
			args: SelectSubset<T, StopUpsertArgs<ExtArgs>>,
		): Prisma__StopClient<
			$Result.GetResult<
				Prisma.$StopPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Stops.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopCountArgs} args - Arguments to filter Stops to count.
		 * @example
		 * // Count the number of Stops
		 * const count = await prisma.stop.count({
		 *   where: {
		 *     // ... the filter for the Stops we want to count
		 *   }
		 * })
		 **/
		count<T extends StopCountArgs>(
			args?: Subset<T, StopCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], StopCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Stop.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends StopAggregateArgs>(
			args: Subset<T, StopAggregateArgs>,
		): Prisma.PrismaPromise<GetStopAggregateType<T>>;

		/**
		 * Group by Stop.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StopGroupByArgs} args - Group by arguments.
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
			T extends StopGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: StopGroupByArgs["orderBy"] }
				: { orderBy?: StopGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, StopGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetStopGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the Stop model
		 */
		readonly fields: StopFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Stop.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__StopClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		passes<T extends Stop$passesArgs<ExtArgs> = {}>(
			args?: Subset<T, Stop$passesArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$StudentPassPayload<ExtArgs>,
					T,
					"findMany",
					GlobalOmitOptions
			  >
			| Null
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the Stop model
	 */
	interface StopFieldRefs {
		readonly stop_id: FieldRef<"Stop", "Int">;
		readonly stop_name: FieldRef<"Stop", "String">;
		readonly area: FieldRef<"Stop", "String">;
		readonly distance_km: FieldRef<"Stop", "Float">;
	}

	// Custom InputTypes
	/**
	 * Stop findUnique
	 */
	export type StopFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * Filter, which Stop to fetch.
		 */
		where: StopWhereUniqueInput;
	};

	/**
	 * Stop findUniqueOrThrow
	 */
	export type StopFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * Filter, which Stop to fetch.
		 */
		where: StopWhereUniqueInput;
	};

	/**
	 * Stop findFirst
	 */
	export type StopFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * Filter, which Stop to fetch.
		 */
		where?: StopWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Stops to fetch.
		 */
		orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Stops.
		 */
		cursor?: StopWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Stops from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Stops.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Stops.
		 */
		distinct?: StopScalarFieldEnum | StopScalarFieldEnum[];
	};

	/**
	 * Stop findFirstOrThrow
	 */
	export type StopFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * Filter, which Stop to fetch.
		 */
		where?: StopWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Stops to fetch.
		 */
		orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Stops.
		 */
		cursor?: StopWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Stops from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Stops.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Stops.
		 */
		distinct?: StopScalarFieldEnum | StopScalarFieldEnum[];
	};

	/**
	 * Stop findMany
	 */
	export type StopFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * Filter, which Stops to fetch.
		 */
		where?: StopWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Stops to fetch.
		 */
		orderBy?: StopOrderByWithRelationInput | StopOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Stops.
		 */
		cursor?: StopWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Stops from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Stops.
		 */
		skip?: number;
		distinct?: StopScalarFieldEnum | StopScalarFieldEnum[];
	};

	/**
	 * Stop create
	 */
	export type StopCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * The data needed to create a Stop.
		 */
		data: XOR<StopCreateInput, StopUncheckedCreateInput>;
	};

	/**
	 * Stop createMany
	 */
	export type StopCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Stops.
		 */
		data: StopCreateManyInput | StopCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Stop createManyAndReturn
	 */
	export type StopCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * The data used to create many Stops.
		 */
		data: StopCreateManyInput | StopCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * Stop update
	 */
	export type StopUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * The data needed to update a Stop.
		 */
		data: XOR<StopUpdateInput, StopUncheckedUpdateInput>;
		/**
		 * Choose, which Stop to update.
		 */
		where: StopWhereUniqueInput;
	};

	/**
	 * Stop updateMany
	 */
	export type StopUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Stops.
		 */
		data: XOR<StopUpdateManyMutationInput, StopUncheckedUpdateManyInput>;
		/**
		 * Filter which Stops to update
		 */
		where?: StopWhereInput;
		/**
		 * Limit how many Stops to update.
		 */
		limit?: number;
	};

	/**
	 * Stop updateManyAndReturn
	 */
	export type StopUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * The data used to update Stops.
		 */
		data: XOR<StopUpdateManyMutationInput, StopUncheckedUpdateManyInput>;
		/**
		 * Filter which Stops to update
		 */
		where?: StopWhereInput;
		/**
		 * Limit how many Stops to update.
		 */
		limit?: number;
	};

	/**
	 * Stop upsert
	 */
	export type StopUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * The filter to search for the Stop to update in case it exists.
		 */
		where: StopWhereUniqueInput;
		/**
		 * In case the Stop found by the `where` argument doesn't exist, create a new Stop with this data.
		 */
		create: XOR<StopCreateInput, StopUncheckedCreateInput>;
		/**
		 * In case the Stop was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<StopUpdateInput, StopUncheckedUpdateInput>;
	};

	/**
	 * Stop delete
	 */
	export type StopDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
		/**
		 * Filter which Stop to delete.
		 */
		where: StopWhereUniqueInput;
	};

	/**
	 * Stop deleteMany
	 */
	export type StopDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Stops to delete
		 */
		where?: StopWhereInput;
		/**
		 * Limit how many Stops to delete.
		 */
		limit?: number;
	};

	/**
	 * Stop.passes
	 */
	export type Stop$passesArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		where?: StudentPassWhereInput;
		orderBy?:
			| StudentPassOrderByWithRelationInput
			| StudentPassOrderByWithRelationInput[];
		cursor?: StudentPassWhereUniqueInput;
		take?: number;
		skip?: number;
		distinct?: StudentPassScalarFieldEnum | StudentPassScalarFieldEnum[];
	};

	/**
	 * Stop without action
	 */
	export type StopDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Stop
		 */
		select?: StopSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the Stop
		 */
		omit?: StopOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StopInclude<ExtArgs> | null;
	};

	/**
	 * Model StudentPass
	 */

	export type AggregateStudentPass = {
		_count: StudentPassCountAggregateOutputType | null;
		_avg: StudentPassAvgAggregateOutputType | null;
		_sum: StudentPassSumAggregateOutputType | null;
		_min: StudentPassMinAggregateOutputType | null;
		_max: StudentPassMaxAggregateOutputType | null;
	};

	export type StudentPassAvgAggregateOutputType = {
		pass_id: number | null;
		amount: number | null;
		bus_id: number | null;
		stop_id: number | null;
	};

	export type StudentPassSumAggregateOutputType = {
		pass_id: number | null;
		amount: number | null;
		bus_id: number | null;
		stop_id: number | null;
	};

	export type StudentPassMinAggregateOutputType = {
		pass_id: number | null;
		issue_date: Date | null;
		valid_till: Date | null;
		amount: number | null;
		bus_id: number | null;
		stop_id: number | null;
	};

	export type StudentPassMaxAggregateOutputType = {
		pass_id: number | null;
		issue_date: Date | null;
		valid_till: Date | null;
		amount: number | null;
		bus_id: number | null;
		stop_id: number | null;
	};

	export type StudentPassCountAggregateOutputType = {
		pass_id: number;
		issue_date: number;
		valid_till: number;
		amount: number;
		bus_id: number;
		stop_id: number;
		_all: number;
	};

	export type StudentPassAvgAggregateInputType = {
		pass_id?: true;
		amount?: true;
		bus_id?: true;
		stop_id?: true;
	};

	export type StudentPassSumAggregateInputType = {
		pass_id?: true;
		amount?: true;
		bus_id?: true;
		stop_id?: true;
	};

	export type StudentPassMinAggregateInputType = {
		pass_id?: true;
		issue_date?: true;
		valid_till?: true;
		amount?: true;
		bus_id?: true;
		stop_id?: true;
	};

	export type StudentPassMaxAggregateInputType = {
		pass_id?: true;
		issue_date?: true;
		valid_till?: true;
		amount?: true;
		bus_id?: true;
		stop_id?: true;
	};

	export type StudentPassCountAggregateInputType = {
		pass_id?: true;
		issue_date?: true;
		valid_till?: true;
		amount?: true;
		bus_id?: true;
		stop_id?: true;
		_all?: true;
	};

	export type StudentPassAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which StudentPass to aggregate.
		 */
		where?: StudentPassWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of StudentPasses to fetch.
		 */
		orderBy?:
			| StudentPassOrderByWithRelationInput
			| StudentPassOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: StudentPassWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` StudentPasses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` StudentPasses.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned StudentPasses
		 **/
		_count?: true | StudentPassCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: StudentPassAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: StudentPassSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: StudentPassMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: StudentPassMaxAggregateInputType;
	};

	export type GetStudentPassAggregateType<T extends StudentPassAggregateArgs> =
		{
			[P in keyof T & keyof AggregateStudentPass]: P extends "_count" | "count"
				? T[P] extends true
					? number
					: GetScalarType<T[P], AggregateStudentPass[P]>
				: GetScalarType<T[P], AggregateStudentPass[P]>;
		};

	export type StudentPassGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: StudentPassWhereInput;
		orderBy?:
			| StudentPassOrderByWithAggregationInput
			| StudentPassOrderByWithAggregationInput[];
		by: StudentPassScalarFieldEnum[] | StudentPassScalarFieldEnum;
		having?: StudentPassScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: StudentPassCountAggregateInputType | true;
		_avg?: StudentPassAvgAggregateInputType;
		_sum?: StudentPassSumAggregateInputType;
		_min?: StudentPassMinAggregateInputType;
		_max?: StudentPassMaxAggregateInputType;
	};

	export type StudentPassGroupByOutputType = {
		pass_id: number;
		issue_date: Date;
		valid_till: Date;
		amount: number;
		bus_id: number;
		stop_id: number;
		_count: StudentPassCountAggregateOutputType | null;
		_avg: StudentPassAvgAggregateOutputType | null;
		_sum: StudentPassSumAggregateOutputType | null;
		_min: StudentPassMinAggregateOutputType | null;
		_max: StudentPassMaxAggregateOutputType | null;
	};

	type GetStudentPassGroupByPayload<T extends StudentPassGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<StudentPassGroupByOutputType, T["by"]> & {
					[P in keyof T &
						keyof StudentPassGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], StudentPassGroupByOutputType[P]>
						: GetScalarType<T[P], StudentPassGroupByOutputType[P]>;
				}
			>
		>;

	export type StudentPassSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			pass_id?: boolean;
			issue_date?: boolean;
			valid_till?: boolean;
			amount?: boolean;
			bus_id?: boolean;
			stop_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
			stop?: boolean | StopDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["studentPass"]
	>;

	export type StudentPassSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			pass_id?: boolean;
			issue_date?: boolean;
			valid_till?: boolean;
			amount?: boolean;
			bus_id?: boolean;
			stop_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
			stop?: boolean | StopDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["studentPass"]
	>;

	export type StudentPassSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			pass_id?: boolean;
			issue_date?: boolean;
			valid_till?: boolean;
			amount?: boolean;
			bus_id?: boolean;
			stop_id?: boolean;
			bus?: boolean | BusDefaultArgs<ExtArgs>;
			stop?: boolean | StopDefaultArgs<ExtArgs>;
		},
		ExtArgs["result"]["studentPass"]
	>;

	export type StudentPassSelectScalar = {
		pass_id?: boolean;
		issue_date?: boolean;
		valid_till?: boolean;
		amount?: boolean;
		bus_id?: boolean;
		stop_id?: boolean;
	};

	export type StudentPassOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		"pass_id" | "issue_date" | "valid_till" | "amount" | "bus_id" | "stop_id",
		ExtArgs["result"]["studentPass"]
	>;
	export type StudentPassInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
		stop?: boolean | StopDefaultArgs<ExtArgs>;
	};
	export type StudentPassIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
		stop?: boolean | StopDefaultArgs<ExtArgs>;
	};
	export type StudentPassIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		bus?: boolean | BusDefaultArgs<ExtArgs>;
		stop?: boolean | StopDefaultArgs<ExtArgs>;
	};

	export type $StudentPassPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: "StudentPass";
		objects: {
			bus: Prisma.$BusPayload<ExtArgs>;
			stop: Prisma.$StopPayload<ExtArgs>;
		};
		scalars: $Extensions.GetPayloadResult<
			{
				pass_id: number;
				issue_date: Date;
				valid_till: Date;
				amount: number;
				bus_id: number;
				stop_id: number;
			},
			ExtArgs["result"]["studentPass"]
		>;
		composites: {};
	};

	type StudentPassGetPayload<
		S extends boolean | null | undefined | StudentPassDefaultArgs,
	> = $Result.GetResult<Prisma.$StudentPassPayload, S>;

	type StudentPassCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<
		StudentPassFindManyArgs,
		"select" | "include" | "distinct" | "omit"
	> & {
		select?: StudentPassCountAggregateInputType | true;
	};

	export interface StudentPassDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>["model"]["StudentPass"];
			meta: { name: "StudentPass" };
		};
		/**
		 * Find zero or one StudentPass that matches the filter.
		 * @param {StudentPassFindUniqueArgs} args - Arguments to find a StudentPass
		 * @example
		 * // Get one StudentPass
		 * const studentPass = await prisma.studentPass.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends StudentPassFindUniqueArgs>(
			args: SelectSubset<T, StudentPassFindUniqueArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"findUnique",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one StudentPass that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {StudentPassFindUniqueOrThrowArgs} args - Arguments to find a StudentPass
		 * @example
		 * // Get one StudentPass
		 * const studentPass = await prisma.studentPass.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends StudentPassFindUniqueOrThrowArgs>(
			args: SelectSubset<T, StudentPassFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"findUniqueOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first StudentPass that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassFindFirstArgs} args - Arguments to find a StudentPass
		 * @example
		 * // Get one StudentPass
		 * const studentPass = await prisma.studentPass.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends StudentPassFindFirstArgs>(
			args?: SelectSubset<T, StudentPassFindFirstArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"findFirst",
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first StudentPass that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassFindFirstOrThrowArgs} args - Arguments to find a StudentPass
		 * @example
		 * // Get one StudentPass
		 * const studentPass = await prisma.studentPass.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends StudentPassFindFirstOrThrowArgs>(
			args?: SelectSubset<T, StudentPassFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"findFirstOrThrow",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more StudentPasses that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all StudentPasses
		 * const studentPasses = await prisma.studentPass.findMany()
		 *
		 * // Get first 10 StudentPasses
		 * const studentPasses = await prisma.studentPass.findMany({ take: 10 })
		 *
		 * // Only select the `pass_id`
		 * const studentPassWithPass_idOnly = await prisma.studentPass.findMany({ select: { pass_id: true } })
		 *
		 */
		findMany<T extends StudentPassFindManyArgs>(
			args?: SelectSubset<T, StudentPassFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"findMany",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a StudentPass.
		 * @param {StudentPassCreateArgs} args - Arguments to create a StudentPass.
		 * @example
		 * // Create one StudentPass
		 * const StudentPass = await prisma.studentPass.create({
		 *   data: {
		 *     // ... data to create a StudentPass
		 *   }
		 * })
		 *
		 */
		create<T extends StudentPassCreateArgs>(
			args: SelectSubset<T, StudentPassCreateArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"create",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many StudentPasses.
		 * @param {StudentPassCreateManyArgs} args - Arguments to create many StudentPasses.
		 * @example
		 * // Create many StudentPasses
		 * const studentPass = await prisma.studentPass.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends StudentPassCreateManyArgs>(
			args?: SelectSubset<T, StudentPassCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many StudentPasses and returns the data saved in the database.
		 * @param {StudentPassCreateManyAndReturnArgs} args - Arguments to create many StudentPasses.
		 * @example
		 * // Create many StudentPasses
		 * const studentPass = await prisma.studentPass.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many StudentPasses and only return the `pass_id`
		 * const studentPassWithPass_idOnly = await prisma.studentPass.createManyAndReturn({
		 *   select: { pass_id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends StudentPassCreateManyAndReturnArgs>(
			args?: SelectSubset<T, StudentPassCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"createManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a StudentPass.
		 * @param {StudentPassDeleteArgs} args - Arguments to delete one StudentPass.
		 * @example
		 * // Delete one StudentPass
		 * const StudentPass = await prisma.studentPass.delete({
		 *   where: {
		 *     // ... filter to delete one StudentPass
		 *   }
		 * })
		 *
		 */
		delete<T extends StudentPassDeleteArgs>(
			args: SelectSubset<T, StudentPassDeleteArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"delete",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one StudentPass.
		 * @param {StudentPassUpdateArgs} args - Arguments to update one StudentPass.
		 * @example
		 * // Update one StudentPass
		 * const studentPass = await prisma.studentPass.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends StudentPassUpdateArgs>(
			args: SelectSubset<T, StudentPassUpdateArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"update",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more StudentPasses.
		 * @param {StudentPassDeleteManyArgs} args - Arguments to filter StudentPasses to delete.
		 * @example
		 * // Delete a few StudentPasses
		 * const { count } = await prisma.studentPass.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends StudentPassDeleteManyArgs>(
			args?: SelectSubset<T, StudentPassDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more StudentPasses.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many StudentPasses
		 * const studentPass = await prisma.studentPass.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends StudentPassUpdateManyArgs>(
			args: SelectSubset<T, StudentPassUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more StudentPasses and returns the data updated in the database.
		 * @param {StudentPassUpdateManyAndReturnArgs} args - Arguments to update many StudentPasses.
		 * @example
		 * // Update many StudentPasses
		 * const studentPass = await prisma.studentPass.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more StudentPasses and only return the `pass_id`
		 * const studentPassWithPass_idOnly = await prisma.studentPass.updateManyAndReturn({
		 *   select: { pass_id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends StudentPassUpdateManyAndReturnArgs>(
			args: SelectSubset<T, StudentPassUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"updateManyAndReturn",
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one StudentPass.
		 * @param {StudentPassUpsertArgs} args - Arguments to update or create a StudentPass.
		 * @example
		 * // Update or create a StudentPass
		 * const studentPass = await prisma.studentPass.upsert({
		 *   create: {
		 *     // ... data to create a StudentPass
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the StudentPass we want to update
		 *   }
		 * })
		 */
		upsert<T extends StudentPassUpsertArgs>(
			args: SelectSubset<T, StudentPassUpsertArgs<ExtArgs>>,
		): Prisma__StudentPassClient<
			$Result.GetResult<
				Prisma.$StudentPassPayload<ExtArgs>,
				T,
				"upsert",
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of StudentPasses.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassCountArgs} args - Arguments to filter StudentPasses to count.
		 * @example
		 * // Count the number of StudentPasses
		 * const count = await prisma.studentPass.count({
		 *   where: {
		 *     // ... the filter for the StudentPasses we want to count
		 *   }
		 * })
		 **/
		count<T extends StudentPassCountArgs>(
			args?: Subset<T, StudentPassCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], StudentPassCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a StudentPass.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends StudentPassAggregateArgs>(
			args: Subset<T, StudentPassAggregateArgs>,
		): Prisma.PrismaPromise<GetStudentPassAggregateType<T>>;

		/**
		 * Group by StudentPass.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {StudentPassGroupByArgs} args - Group by arguments.
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
			T extends StudentPassGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<"skip", Keys<T>>,
				Extends<"take", Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: StudentPassGroupByArgs["orderBy"] }
				: { orderBy?: StudentPassGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T["orderBy"]>>
			>,
			ByFields extends MaybeTupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
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
											"Field ",
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: "take" extends Keys<T>
						? "orderBy" extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: "skip" extends Keys<T>
							? "orderBy" extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, StudentPassGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetStudentPassGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the StudentPass model
		 */
		readonly fields: StudentPassFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for StudentPass.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__StudentPassClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: "PrismaPromise";
		bus<T extends BusDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, BusDefaultArgs<ExtArgs>>,
		): Prisma__BusClient<
			| $Result.GetResult<
					Prisma.$BusPayload<ExtArgs>,
					T,
					"findUniqueOrThrow",
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>;
		stop<T extends StopDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, StopDefaultArgs<ExtArgs>>,
		): Prisma__StopClient<
			| $Result.GetResult<
					Prisma.$StopPayload<ExtArgs>,
					T,
					"findUniqueOrThrow",
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>;
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the StudentPass model
	 */
	interface StudentPassFieldRefs {
		readonly pass_id: FieldRef<"StudentPass", "Int">;
		readonly issue_date: FieldRef<"StudentPass", "DateTime">;
		readonly valid_till: FieldRef<"StudentPass", "DateTime">;
		readonly amount: FieldRef<"StudentPass", "Float">;
		readonly bus_id: FieldRef<"StudentPass", "Int">;
		readonly stop_id: FieldRef<"StudentPass", "Int">;
	}

	// Custom InputTypes
	/**
	 * StudentPass findUnique
	 */
	export type StudentPassFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * Filter, which StudentPass to fetch.
		 */
		where: StudentPassWhereUniqueInput;
	};

	/**
	 * StudentPass findUniqueOrThrow
	 */
	export type StudentPassFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * Filter, which StudentPass to fetch.
		 */
		where: StudentPassWhereUniqueInput;
	};

	/**
	 * StudentPass findFirst
	 */
	export type StudentPassFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * Filter, which StudentPass to fetch.
		 */
		where?: StudentPassWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of StudentPasses to fetch.
		 */
		orderBy?:
			| StudentPassOrderByWithRelationInput
			| StudentPassOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for StudentPasses.
		 */
		cursor?: StudentPassWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` StudentPasses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` StudentPasses.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of StudentPasses.
		 */
		distinct?: StudentPassScalarFieldEnum | StudentPassScalarFieldEnum[];
	};

	/**
	 * StudentPass findFirstOrThrow
	 */
	export type StudentPassFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * Filter, which StudentPass to fetch.
		 */
		where?: StudentPassWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of StudentPasses to fetch.
		 */
		orderBy?:
			| StudentPassOrderByWithRelationInput
			| StudentPassOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for StudentPasses.
		 */
		cursor?: StudentPassWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` StudentPasses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` StudentPasses.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of StudentPasses.
		 */
		distinct?: StudentPassScalarFieldEnum | StudentPassScalarFieldEnum[];
	};

	/**
	 * StudentPass findMany
	 */
	export type StudentPassFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * Filter, which StudentPasses to fetch.
		 */
		where?: StudentPassWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of StudentPasses to fetch.
		 */
		orderBy?:
			| StudentPassOrderByWithRelationInput
			| StudentPassOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing StudentPasses.
		 */
		cursor?: StudentPassWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` StudentPasses from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` StudentPasses.
		 */
		skip?: number;
		distinct?: StudentPassScalarFieldEnum | StudentPassScalarFieldEnum[];
	};

	/**
	 * StudentPass create
	 */
	export type StudentPassCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * The data needed to create a StudentPass.
		 */
		data: XOR<StudentPassCreateInput, StudentPassUncheckedCreateInput>;
	};

	/**
	 * StudentPass createMany
	 */
	export type StudentPassCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many StudentPasses.
		 */
		data: StudentPassCreateManyInput | StudentPassCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * StudentPass createManyAndReturn
	 */
	export type StudentPassCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * The data used to create many StudentPasses.
		 */
		data: StudentPassCreateManyInput | StudentPassCreateManyInput[];
		skipDuplicates?: boolean;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassIncludeCreateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * StudentPass update
	 */
	export type StudentPassUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * The data needed to update a StudentPass.
		 */
		data: XOR<StudentPassUpdateInput, StudentPassUncheckedUpdateInput>;
		/**
		 * Choose, which StudentPass to update.
		 */
		where: StudentPassWhereUniqueInput;
	};

	/**
	 * StudentPass updateMany
	 */
	export type StudentPassUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update StudentPasses.
		 */
		data: XOR<
			StudentPassUpdateManyMutationInput,
			StudentPassUncheckedUpdateManyInput
		>;
		/**
		 * Filter which StudentPasses to update
		 */
		where?: StudentPassWhereInput;
		/**
		 * Limit how many StudentPasses to update.
		 */
		limit?: number;
	};

	/**
	 * StudentPass updateManyAndReturn
	 */
	export type StudentPassUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * The data used to update StudentPasses.
		 */
		data: XOR<
			StudentPassUpdateManyMutationInput,
			StudentPassUncheckedUpdateManyInput
		>;
		/**
		 * Filter which StudentPasses to update
		 */
		where?: StudentPassWhereInput;
		/**
		 * Limit how many StudentPasses to update.
		 */
		limit?: number;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassIncludeUpdateManyAndReturn<ExtArgs> | null;
	};

	/**
	 * StudentPass upsert
	 */
	export type StudentPassUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * The filter to search for the StudentPass to update in case it exists.
		 */
		where: StudentPassWhereUniqueInput;
		/**
		 * In case the StudentPass found by the `where` argument doesn't exist, create a new StudentPass with this data.
		 */
		create: XOR<StudentPassCreateInput, StudentPassUncheckedCreateInput>;
		/**
		 * In case the StudentPass was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<StudentPassUpdateInput, StudentPassUncheckedUpdateInput>;
	};

	/**
	 * StudentPass delete
	 */
	export type StudentPassDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
		/**
		 * Filter which StudentPass to delete.
		 */
		where: StudentPassWhereUniqueInput;
	};

	/**
	 * StudentPass deleteMany
	 */
	export type StudentPassDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which StudentPasses to delete
		 */
		where?: StudentPassWhereInput;
		/**
		 * Limit how many StudentPasses to delete.
		 */
		limit?: number;
	};

	/**
	 * StudentPass without action
	 */
	export type StudentPassDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the StudentPass
		 */
		select?: StudentPassSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the StudentPass
		 */
		omit?: StudentPassOmit<ExtArgs> | null;
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: StudentPassInclude<ExtArgs> | null;
	};

	/**
	 * Enums
	 */

	export const TransactionIsolationLevel: {
		ReadUncommitted: "ReadUncommitted";
		ReadCommitted: "ReadCommitted";
		RepeatableRead: "RepeatableRead";
		Serializable: "Serializable";
	};

	export type TransactionIsolationLevel =
		(typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

	export const AccountScalarFieldEnum: {
		id: "id";
		userId: "userId";
		type: "type";
		provider: "provider";
		providerAccountId: "providerAccountId";
		refresh_token: "refresh_token";
		access_token: "access_token";
		expires_at: "expires_at";
		token_type: "token_type";
		scope: "scope";
		id_token: "id_token";
		session_state: "session_state";
		refresh_token_expires_in: "refresh_token_expires_in";
	};

	export type AccountScalarFieldEnum =
		(typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

	export const SessionScalarFieldEnum: {
		id: "id";
		sessionToken: "sessionToken";
		userId: "userId";
		expires: "expires";
	};

	export type SessionScalarFieldEnum =
		(typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

	export const UserScalarFieldEnum: {
		id: "id";
		name: "name";
		email: "email";
		emailVerified: "emailVerified";
		image: "image";
	};

	export type UserScalarFieldEnum =
		(typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

	export const VerificationTokenScalarFieldEnum: {
		identifier: "identifier";
		token: "token";
		expires: "expires";
	};

	export type VerificationTokenScalarFieldEnum =
		(typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];

	export const BusScalarFieldEnum: {
		bus_id: "bus_id";
		bus_no: "bus_no";
		capacity: "capacity";
		route_id: "route_id";
		route_name: "route_name";
		arrival_time: "arrival_time";
		departure_time: "departure_time";
	};

	export type BusScalarFieldEnum =
		(typeof BusScalarFieldEnum)[keyof typeof BusScalarFieldEnum];

	export const DriverScalarFieldEnum: {
		driver_id: "driver_id";
		name: "name";
		phone: "phone";
		license_no: "license_no";
		bus_id: "bus_id";
	};

	export type DriverScalarFieldEnum =
		(typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum];

	export const ConductorScalarFieldEnum: {
		conductor_id: "conductor_id";
		name: "name";
		phone: "phone";
		bus_id: "bus_id";
	};

	export type ConductorScalarFieldEnum =
		(typeof ConductorScalarFieldEnum)[keyof typeof ConductorScalarFieldEnum];

	export const StopScalarFieldEnum: {
		stop_id: "stop_id";
		stop_name: "stop_name";
		area: "area";
		distance_km: "distance_km";
	};

	export type StopScalarFieldEnum =
		(typeof StopScalarFieldEnum)[keyof typeof StopScalarFieldEnum];

	export const StudentPassScalarFieldEnum: {
		pass_id: "pass_id";
		issue_date: "issue_date";
		valid_till: "valid_till";
		amount: "amount";
		bus_id: "bus_id";
		stop_id: "stop_id";
	};

	export type StudentPassScalarFieldEnum =
		(typeof StudentPassScalarFieldEnum)[keyof typeof StudentPassScalarFieldEnum];

	export const SortOrder: {
		asc: "asc";
		desc: "desc";
	};

	export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

	export const QueryMode: {
		default: "default";
		insensitive: "insensitive";
	};

	export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

	export const NullsOrder: {
		first: "first";
		last: "last";
	};

	export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

	/**
	 * Field references
	 */

	/**
	 * Reference to a field of type 'String'
	 */
	export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"String"
	>;

	/**
	 * Reference to a field of type 'String[]'
	 */
	export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"String[]"
	>;

	/**
	 * Reference to a field of type 'Int'
	 */
	export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"Int"
	>;

	/**
	 * Reference to a field of type 'Int[]'
	 */
	export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"Int[]"
	>;

	/**
	 * Reference to a field of type 'DateTime'
	 */
	export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"DateTime"
	>;

	/**
	 * Reference to a field of type 'DateTime[]'
	 */
	export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"DateTime[]"
	>;

	/**
	 * Reference to a field of type 'Float'
	 */
	export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"Float"
	>;

	/**
	 * Reference to a field of type 'Float[]'
	 */
	export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		"Float[]"
	>;

	/**
	 * Deep Input Types
	 */

	export type AccountWhereInput = {
		AND?: AccountWhereInput | AccountWhereInput[];
		OR?: AccountWhereInput[];
		NOT?: AccountWhereInput | AccountWhereInput[];
		id?: StringFilter<"Account"> | string;
		userId?: StringFilter<"Account"> | string;
		type?: StringFilter<"Account"> | string;
		provider?: StringFilter<"Account"> | string;
		providerAccountId?: StringFilter<"Account"> | string;
		refresh_token?: StringNullableFilter<"Account"> | string | null;
		access_token?: StringNullableFilter<"Account"> | string | null;
		expires_at?: IntNullableFilter<"Account"> | number | null;
		token_type?: StringNullableFilter<"Account"> | string | null;
		scope?: StringNullableFilter<"Account"> | string | null;
		id_token?: StringNullableFilter<"Account"> | string | null;
		session_state?: StringNullableFilter<"Account"> | string | null;
		refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null;
		user?: XOR<UserScalarRelationFilter, UserWhereInput>;
	};

	export type AccountOrderByWithRelationInput = {
		id?: SortOrder;
		userId?: SortOrder;
		type?: SortOrder;
		provider?: SortOrder;
		providerAccountId?: SortOrder;
		refresh_token?: SortOrderInput | SortOrder;
		access_token?: SortOrderInput | SortOrder;
		expires_at?: SortOrderInput | SortOrder;
		token_type?: SortOrderInput | SortOrder;
		scope?: SortOrderInput | SortOrder;
		id_token?: SortOrderInput | SortOrder;
		session_state?: SortOrderInput | SortOrder;
		refresh_token_expires_in?: SortOrderInput | SortOrder;
		user?: UserOrderByWithRelationInput;
	};

	export type AccountWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string;
			provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput;
			AND?: AccountWhereInput | AccountWhereInput[];
			OR?: AccountWhereInput[];
			NOT?: AccountWhereInput | AccountWhereInput[];
			userId?: StringFilter<"Account"> | string;
			type?: StringFilter<"Account"> | string;
			provider?: StringFilter<"Account"> | string;
			providerAccountId?: StringFilter<"Account"> | string;
			refresh_token?: StringNullableFilter<"Account"> | string | null;
			access_token?: StringNullableFilter<"Account"> | string | null;
			expires_at?: IntNullableFilter<"Account"> | number | null;
			token_type?: StringNullableFilter<"Account"> | string | null;
			scope?: StringNullableFilter<"Account"> | string | null;
			id_token?: StringNullableFilter<"Account"> | string | null;
			session_state?: StringNullableFilter<"Account"> | string | null;
			refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null;
			user?: XOR<UserScalarRelationFilter, UserWhereInput>;
		},
		"id" | "provider_providerAccountId"
	>;

	export type AccountOrderByWithAggregationInput = {
		id?: SortOrder;
		userId?: SortOrder;
		type?: SortOrder;
		provider?: SortOrder;
		providerAccountId?: SortOrder;
		refresh_token?: SortOrderInput | SortOrder;
		access_token?: SortOrderInput | SortOrder;
		expires_at?: SortOrderInput | SortOrder;
		token_type?: SortOrderInput | SortOrder;
		scope?: SortOrderInput | SortOrder;
		id_token?: SortOrderInput | SortOrder;
		session_state?: SortOrderInput | SortOrder;
		refresh_token_expires_in?: SortOrderInput | SortOrder;
		_count?: AccountCountOrderByAggregateInput;
		_avg?: AccountAvgOrderByAggregateInput;
		_max?: AccountMaxOrderByAggregateInput;
		_min?: AccountMinOrderByAggregateInput;
		_sum?: AccountSumOrderByAggregateInput;
	};

	export type AccountScalarWhereWithAggregatesInput = {
		AND?:
			| AccountScalarWhereWithAggregatesInput
			| AccountScalarWhereWithAggregatesInput[];
		OR?: AccountScalarWhereWithAggregatesInput[];
		NOT?:
			| AccountScalarWhereWithAggregatesInput
			| AccountScalarWhereWithAggregatesInput[];
		id?: StringWithAggregatesFilter<"Account"> | string;
		userId?: StringWithAggregatesFilter<"Account"> | string;
		type?: StringWithAggregatesFilter<"Account"> | string;
		provider?: StringWithAggregatesFilter<"Account"> | string;
		providerAccountId?: StringWithAggregatesFilter<"Account"> | string;
		refresh_token?:
			| StringNullableWithAggregatesFilter<"Account">
			| string
			| null;
		access_token?:
			| StringNullableWithAggregatesFilter<"Account">
			| string
			| null;
		expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null;
		token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null;
		scope?: StringNullableWithAggregatesFilter<"Account"> | string | null;
		id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null;
		session_state?:
			| StringNullableWithAggregatesFilter<"Account">
			| string
			| null;
		refresh_token_expires_in?:
			| IntNullableWithAggregatesFilter<"Account">
			| number
			| null;
	};

	export type SessionWhereInput = {
		AND?: SessionWhereInput | SessionWhereInput[];
		OR?: SessionWhereInput[];
		NOT?: SessionWhereInput | SessionWhereInput[];
		id?: StringFilter<"Session"> | string;
		sessionToken?: StringFilter<"Session"> | string;
		userId?: StringFilter<"Session"> | string;
		expires?: DateTimeFilter<"Session"> | Date | string;
		user?: XOR<UserScalarRelationFilter, UserWhereInput>;
	};

	export type SessionOrderByWithRelationInput = {
		id?: SortOrder;
		sessionToken?: SortOrder;
		userId?: SortOrder;
		expires?: SortOrder;
		user?: UserOrderByWithRelationInput;
	};

	export type SessionWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string;
			sessionToken?: string;
			AND?: SessionWhereInput | SessionWhereInput[];
			OR?: SessionWhereInput[];
			NOT?: SessionWhereInput | SessionWhereInput[];
			userId?: StringFilter<"Session"> | string;
			expires?: DateTimeFilter<"Session"> | Date | string;
			user?: XOR<UserScalarRelationFilter, UserWhereInput>;
		},
		"id" | "sessionToken"
	>;

	export type SessionOrderByWithAggregationInput = {
		id?: SortOrder;
		sessionToken?: SortOrder;
		userId?: SortOrder;
		expires?: SortOrder;
		_count?: SessionCountOrderByAggregateInput;
		_max?: SessionMaxOrderByAggregateInput;
		_min?: SessionMinOrderByAggregateInput;
	};

	export type SessionScalarWhereWithAggregatesInput = {
		AND?:
			| SessionScalarWhereWithAggregatesInput
			| SessionScalarWhereWithAggregatesInput[];
		OR?: SessionScalarWhereWithAggregatesInput[];
		NOT?:
			| SessionScalarWhereWithAggregatesInput
			| SessionScalarWhereWithAggregatesInput[];
		id?: StringWithAggregatesFilter<"Session"> | string;
		sessionToken?: StringWithAggregatesFilter<"Session"> | string;
		userId?: StringWithAggregatesFilter<"Session"> | string;
		expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
	};

	export type UserWhereInput = {
		AND?: UserWhereInput | UserWhereInput[];
		OR?: UserWhereInput[];
		NOT?: UserWhereInput | UserWhereInput[];
		id?: StringFilter<"User"> | string;
		name?: StringNullableFilter<"User"> | string | null;
		email?: StringNullableFilter<"User"> | string | null;
		emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
		image?: StringNullableFilter<"User"> | string | null;
		accounts?: AccountListRelationFilter;
		sessions?: SessionListRelationFilter;
	};

	export type UserOrderByWithRelationInput = {
		id?: SortOrder;
		name?: SortOrderInput | SortOrder;
		email?: SortOrderInput | SortOrder;
		emailVerified?: SortOrderInput | SortOrder;
		image?: SortOrderInput | SortOrder;
		accounts?: AccountOrderByRelationAggregateInput;
		sessions?: SessionOrderByRelationAggregateInput;
	};

	export type UserWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string;
			email?: string;
			AND?: UserWhereInput | UserWhereInput[];
			OR?: UserWhereInput[];
			NOT?: UserWhereInput | UserWhereInput[];
			name?: StringNullableFilter<"User"> | string | null;
			emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
			image?: StringNullableFilter<"User"> | string | null;
			accounts?: AccountListRelationFilter;
			sessions?: SessionListRelationFilter;
		},
		"id" | "email"
	>;

	export type UserOrderByWithAggregationInput = {
		id?: SortOrder;
		name?: SortOrderInput | SortOrder;
		email?: SortOrderInput | SortOrder;
		emailVerified?: SortOrderInput | SortOrder;
		image?: SortOrderInput | SortOrder;
		_count?: UserCountOrderByAggregateInput;
		_max?: UserMaxOrderByAggregateInput;
		_min?: UserMinOrderByAggregateInput;
	};

	export type UserScalarWhereWithAggregatesInput = {
		AND?:
			| UserScalarWhereWithAggregatesInput
			| UserScalarWhereWithAggregatesInput[];
		OR?: UserScalarWhereWithAggregatesInput[];
		NOT?:
			| UserScalarWhereWithAggregatesInput
			| UserScalarWhereWithAggregatesInput[];
		id?: StringWithAggregatesFilter<"User"> | string;
		name?: StringNullableWithAggregatesFilter<"User"> | string | null;
		email?: StringNullableWithAggregatesFilter<"User"> | string | null;
		emailVerified?:
			| DateTimeNullableWithAggregatesFilter<"User">
			| Date
			| string
			| null;
		image?: StringNullableWithAggregatesFilter<"User"> | string | null;
	};

	export type VerificationTokenWhereInput = {
		AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
		OR?: VerificationTokenWhereInput[];
		NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
		identifier?: StringFilter<"VerificationToken"> | string;
		token?: StringFilter<"VerificationToken"> | string;
		expires?: DateTimeFilter<"VerificationToken"> | Date | string;
	};

	export type VerificationTokenOrderByWithRelationInput = {
		identifier?: SortOrder;
		token?: SortOrder;
		expires?: SortOrder;
	};

	export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<
		{
			token?: string;
			identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput;
			AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
			OR?: VerificationTokenWhereInput[];
			NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
			identifier?: StringFilter<"VerificationToken"> | string;
			expires?: DateTimeFilter<"VerificationToken"> | Date | string;
		},
		"token" | "identifier_token"
	>;

	export type VerificationTokenOrderByWithAggregationInput = {
		identifier?: SortOrder;
		token?: SortOrder;
		expires?: SortOrder;
		_count?: VerificationTokenCountOrderByAggregateInput;
		_max?: VerificationTokenMaxOrderByAggregateInput;
		_min?: VerificationTokenMinOrderByAggregateInput;
	};

	export type VerificationTokenScalarWhereWithAggregatesInput = {
		AND?:
			| VerificationTokenScalarWhereWithAggregatesInput
			| VerificationTokenScalarWhereWithAggregatesInput[];
		OR?: VerificationTokenScalarWhereWithAggregatesInput[];
		NOT?:
			| VerificationTokenScalarWhereWithAggregatesInput
			| VerificationTokenScalarWhereWithAggregatesInput[];
		identifier?: StringWithAggregatesFilter<"VerificationToken"> | string;
		token?: StringWithAggregatesFilter<"VerificationToken"> | string;
		expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string;
	};

	export type BusWhereInput = {
		AND?: BusWhereInput | BusWhereInput[];
		OR?: BusWhereInput[];
		NOT?: BusWhereInput | BusWhereInput[];
		bus_id?: IntFilter<"Bus"> | number;
		bus_no?: StringFilter<"Bus"> | string;
		capacity?: IntFilter<"Bus"> | number;
		route_id?: StringFilter<"Bus"> | string;
		route_name?: StringFilter<"Bus"> | string;
		arrival_time?: StringFilter<"Bus"> | string;
		departure_time?: StringFilter<"Bus"> | string;
		driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null;
		conductor?: XOR<
			ConductorNullableScalarRelationFilter,
			ConductorWhereInput
		> | null;
		passes?: StudentPassListRelationFilter;
	};

	export type BusOrderByWithRelationInput = {
		bus_id?: SortOrder;
		bus_no?: SortOrder;
		capacity?: SortOrder;
		route_id?: SortOrder;
		route_name?: SortOrder;
		arrival_time?: SortOrder;
		departure_time?: SortOrder;
		driver?: DriverOrderByWithRelationInput;
		conductor?: ConductorOrderByWithRelationInput;
		passes?: StudentPassOrderByRelationAggregateInput;
	};

	export type BusWhereUniqueInput = Prisma.AtLeast<
		{
			bus_id?: number;
			AND?: BusWhereInput | BusWhereInput[];
			OR?: BusWhereInput[];
			NOT?: BusWhereInput | BusWhereInput[];
			bus_no?: StringFilter<"Bus"> | string;
			capacity?: IntFilter<"Bus"> | number;
			route_id?: StringFilter<"Bus"> | string;
			route_name?: StringFilter<"Bus"> | string;
			arrival_time?: StringFilter<"Bus"> | string;
			departure_time?: StringFilter<"Bus"> | string;
			driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null;
			conductor?: XOR<
				ConductorNullableScalarRelationFilter,
				ConductorWhereInput
			> | null;
			passes?: StudentPassListRelationFilter;
		},
		"bus_id"
	>;

	export type BusOrderByWithAggregationInput = {
		bus_id?: SortOrder;
		bus_no?: SortOrder;
		capacity?: SortOrder;
		route_id?: SortOrder;
		route_name?: SortOrder;
		arrival_time?: SortOrder;
		departure_time?: SortOrder;
		_count?: BusCountOrderByAggregateInput;
		_avg?: BusAvgOrderByAggregateInput;
		_max?: BusMaxOrderByAggregateInput;
		_min?: BusMinOrderByAggregateInput;
		_sum?: BusSumOrderByAggregateInput;
	};

	export type BusScalarWhereWithAggregatesInput = {
		AND?:
			| BusScalarWhereWithAggregatesInput
			| BusScalarWhereWithAggregatesInput[];
		OR?: BusScalarWhereWithAggregatesInput[];
		NOT?:
			| BusScalarWhereWithAggregatesInput
			| BusScalarWhereWithAggregatesInput[];
		bus_id?: IntWithAggregatesFilter<"Bus"> | number;
		bus_no?: StringWithAggregatesFilter<"Bus"> | string;
		capacity?: IntWithAggregatesFilter<"Bus"> | number;
		route_id?: StringWithAggregatesFilter<"Bus"> | string;
		route_name?: StringWithAggregatesFilter<"Bus"> | string;
		arrival_time?: StringWithAggregatesFilter<"Bus"> | string;
		departure_time?: StringWithAggregatesFilter<"Bus"> | string;
	};

	export type DriverWhereInput = {
		AND?: DriverWhereInput | DriverWhereInput[];
		OR?: DriverWhereInput[];
		NOT?: DriverWhereInput | DriverWhereInput[];
		driver_id?: IntFilter<"Driver"> | number;
		name?: StringFilter<"Driver"> | string;
		phone?: StringFilter<"Driver"> | string;
		license_no?: StringFilter<"Driver"> | string;
		bus_id?: IntFilter<"Driver"> | number;
		bus?: XOR<BusScalarRelationFilter, BusWhereInput>;
	};

	export type DriverOrderByWithRelationInput = {
		driver_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		license_no?: SortOrder;
		bus_id?: SortOrder;
		bus?: BusOrderByWithRelationInput;
	};

	export type DriverWhereUniqueInput = Prisma.AtLeast<
		{
			driver_id?: number;
			bus_id?: number;
			AND?: DriverWhereInput | DriverWhereInput[];
			OR?: DriverWhereInput[];
			NOT?: DriverWhereInput | DriverWhereInput[];
			name?: StringFilter<"Driver"> | string;
			phone?: StringFilter<"Driver"> | string;
			license_no?: StringFilter<"Driver"> | string;
			bus?: XOR<BusScalarRelationFilter, BusWhereInput>;
		},
		"driver_id" | "bus_id"
	>;

	export type DriverOrderByWithAggregationInput = {
		driver_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		license_no?: SortOrder;
		bus_id?: SortOrder;
		_count?: DriverCountOrderByAggregateInput;
		_avg?: DriverAvgOrderByAggregateInput;
		_max?: DriverMaxOrderByAggregateInput;
		_min?: DriverMinOrderByAggregateInput;
		_sum?: DriverSumOrderByAggregateInput;
	};

	export type DriverScalarWhereWithAggregatesInput = {
		AND?:
			| DriverScalarWhereWithAggregatesInput
			| DriverScalarWhereWithAggregatesInput[];
		OR?: DriverScalarWhereWithAggregatesInput[];
		NOT?:
			| DriverScalarWhereWithAggregatesInput
			| DriverScalarWhereWithAggregatesInput[];
		driver_id?: IntWithAggregatesFilter<"Driver"> | number;
		name?: StringWithAggregatesFilter<"Driver"> | string;
		phone?: StringWithAggregatesFilter<"Driver"> | string;
		license_no?: StringWithAggregatesFilter<"Driver"> | string;
		bus_id?: IntWithAggregatesFilter<"Driver"> | number;
	};

	export type ConductorWhereInput = {
		AND?: ConductorWhereInput | ConductorWhereInput[];
		OR?: ConductorWhereInput[];
		NOT?: ConductorWhereInput | ConductorWhereInput[];
		conductor_id?: IntFilter<"Conductor"> | number;
		name?: StringFilter<"Conductor"> | string;
		phone?: StringFilter<"Conductor"> | string;
		bus_id?: IntFilter<"Conductor"> | number;
		bus?: XOR<BusScalarRelationFilter, BusWhereInput>;
	};

	export type ConductorOrderByWithRelationInput = {
		conductor_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		bus_id?: SortOrder;
		bus?: BusOrderByWithRelationInput;
	};

	export type ConductorWhereUniqueInput = Prisma.AtLeast<
		{
			conductor_id?: number;
			bus_id?: number;
			AND?: ConductorWhereInput | ConductorWhereInput[];
			OR?: ConductorWhereInput[];
			NOT?: ConductorWhereInput | ConductorWhereInput[];
			name?: StringFilter<"Conductor"> | string;
			phone?: StringFilter<"Conductor"> | string;
			bus?: XOR<BusScalarRelationFilter, BusWhereInput>;
		},
		"conductor_id" | "bus_id"
	>;

	export type ConductorOrderByWithAggregationInput = {
		conductor_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		bus_id?: SortOrder;
		_count?: ConductorCountOrderByAggregateInput;
		_avg?: ConductorAvgOrderByAggregateInput;
		_max?: ConductorMaxOrderByAggregateInput;
		_min?: ConductorMinOrderByAggregateInput;
		_sum?: ConductorSumOrderByAggregateInput;
	};

	export type ConductorScalarWhereWithAggregatesInput = {
		AND?:
			| ConductorScalarWhereWithAggregatesInput
			| ConductorScalarWhereWithAggregatesInput[];
		OR?: ConductorScalarWhereWithAggregatesInput[];
		NOT?:
			| ConductorScalarWhereWithAggregatesInput
			| ConductorScalarWhereWithAggregatesInput[];
		conductor_id?: IntWithAggregatesFilter<"Conductor"> | number;
		name?: StringWithAggregatesFilter<"Conductor"> | string;
		phone?: StringWithAggregatesFilter<"Conductor"> | string;
		bus_id?: IntWithAggregatesFilter<"Conductor"> | number;
	};

	export type StopWhereInput = {
		AND?: StopWhereInput | StopWhereInput[];
		OR?: StopWhereInput[];
		NOT?: StopWhereInput | StopWhereInput[];
		stop_id?: IntFilter<"Stop"> | number;
		stop_name?: StringFilter<"Stop"> | string;
		area?: StringFilter<"Stop"> | string;
		distance_km?: FloatFilter<"Stop"> | number;
		passes?: StudentPassListRelationFilter;
	};

	export type StopOrderByWithRelationInput = {
		stop_id?: SortOrder;
		stop_name?: SortOrder;
		area?: SortOrder;
		distance_km?: SortOrder;
		passes?: StudentPassOrderByRelationAggregateInput;
	};

	export type StopWhereUniqueInput = Prisma.AtLeast<
		{
			stop_id?: number;
			AND?: StopWhereInput | StopWhereInput[];
			OR?: StopWhereInput[];
			NOT?: StopWhereInput | StopWhereInput[];
			stop_name?: StringFilter<"Stop"> | string;
			area?: StringFilter<"Stop"> | string;
			distance_km?: FloatFilter<"Stop"> | number;
			passes?: StudentPassListRelationFilter;
		},
		"stop_id"
	>;

	export type StopOrderByWithAggregationInput = {
		stop_id?: SortOrder;
		stop_name?: SortOrder;
		area?: SortOrder;
		distance_km?: SortOrder;
		_count?: StopCountOrderByAggregateInput;
		_avg?: StopAvgOrderByAggregateInput;
		_max?: StopMaxOrderByAggregateInput;
		_min?: StopMinOrderByAggregateInput;
		_sum?: StopSumOrderByAggregateInput;
	};

	export type StopScalarWhereWithAggregatesInput = {
		AND?:
			| StopScalarWhereWithAggregatesInput
			| StopScalarWhereWithAggregatesInput[];
		OR?: StopScalarWhereWithAggregatesInput[];
		NOT?:
			| StopScalarWhereWithAggregatesInput
			| StopScalarWhereWithAggregatesInput[];
		stop_id?: IntWithAggregatesFilter<"Stop"> | number;
		stop_name?: StringWithAggregatesFilter<"Stop"> | string;
		area?: StringWithAggregatesFilter<"Stop"> | string;
		distance_km?: FloatWithAggregatesFilter<"Stop"> | number;
	};

	export type StudentPassWhereInput = {
		AND?: StudentPassWhereInput | StudentPassWhereInput[];
		OR?: StudentPassWhereInput[];
		NOT?: StudentPassWhereInput | StudentPassWhereInput[];
		pass_id?: IntFilter<"StudentPass"> | number;
		issue_date?: DateTimeFilter<"StudentPass"> | Date | string;
		valid_till?: DateTimeFilter<"StudentPass"> | Date | string;
		amount?: FloatFilter<"StudentPass"> | number;
		bus_id?: IntFilter<"StudentPass"> | number;
		stop_id?: IntFilter<"StudentPass"> | number;
		bus?: XOR<BusScalarRelationFilter, BusWhereInput>;
		stop?: XOR<StopScalarRelationFilter, StopWhereInput>;
	};

	export type StudentPassOrderByWithRelationInput = {
		pass_id?: SortOrder;
		issue_date?: SortOrder;
		valid_till?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
		bus?: BusOrderByWithRelationInput;
		stop?: StopOrderByWithRelationInput;
	};

	export type StudentPassWhereUniqueInput = Prisma.AtLeast<
		{
			pass_id?: number;
			AND?: StudentPassWhereInput | StudentPassWhereInput[];
			OR?: StudentPassWhereInput[];
			NOT?: StudentPassWhereInput | StudentPassWhereInput[];
			issue_date?: DateTimeFilter<"StudentPass"> | Date | string;
			valid_till?: DateTimeFilter<"StudentPass"> | Date | string;
			amount?: FloatFilter<"StudentPass"> | number;
			bus_id?: IntFilter<"StudentPass"> | number;
			stop_id?: IntFilter<"StudentPass"> | number;
			bus?: XOR<BusScalarRelationFilter, BusWhereInput>;
			stop?: XOR<StopScalarRelationFilter, StopWhereInput>;
		},
		"pass_id"
	>;

	export type StudentPassOrderByWithAggregationInput = {
		pass_id?: SortOrder;
		issue_date?: SortOrder;
		valid_till?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
		_count?: StudentPassCountOrderByAggregateInput;
		_avg?: StudentPassAvgOrderByAggregateInput;
		_max?: StudentPassMaxOrderByAggregateInput;
		_min?: StudentPassMinOrderByAggregateInput;
		_sum?: StudentPassSumOrderByAggregateInput;
	};

	export type StudentPassScalarWhereWithAggregatesInput = {
		AND?:
			| StudentPassScalarWhereWithAggregatesInput
			| StudentPassScalarWhereWithAggregatesInput[];
		OR?: StudentPassScalarWhereWithAggregatesInput[];
		NOT?:
			| StudentPassScalarWhereWithAggregatesInput
			| StudentPassScalarWhereWithAggregatesInput[];
		pass_id?: IntWithAggregatesFilter<"StudentPass"> | number;
		issue_date?: DateTimeWithAggregatesFilter<"StudentPass"> | Date | string;
		valid_till?: DateTimeWithAggregatesFilter<"StudentPass"> | Date | string;
		amount?: FloatWithAggregatesFilter<"StudentPass"> | number;
		bus_id?: IntWithAggregatesFilter<"StudentPass"> | number;
		stop_id?: IntWithAggregatesFilter<"StudentPass"> | number;
	};

	export type AccountCreateInput = {
		id?: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string | null;
		access_token?: string | null;
		expires_at?: number | null;
		token_type?: string | null;
		scope?: string | null;
		id_token?: string | null;
		session_state?: string | null;
		refresh_token_expires_in?: number | null;
		user: UserCreateNestedOneWithoutAccountsInput;
	};

	export type AccountUncheckedCreateInput = {
		id?: string;
		userId: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string | null;
		access_token?: string | null;
		expires_at?: number | null;
		token_type?: string | null;
		scope?: string | null;
		id_token?: string | null;
		session_state?: string | null;
		refresh_token_expires_in?: number | null;
	};

	export type AccountUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
		user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
	};

	export type AccountUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		userId?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
	};

	export type AccountCreateManyInput = {
		id?: string;
		userId: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string | null;
		access_token?: string | null;
		expires_at?: number | null;
		token_type?: string | null;
		scope?: string | null;
		id_token?: string | null;
		session_state?: string | null;
		refresh_token_expires_in?: number | null;
	};

	export type AccountUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
	};

	export type AccountUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string;
		userId?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
	};

	export type SessionCreateInput = {
		id?: string;
		sessionToken: string;
		expires: Date | string;
		user: UserCreateNestedOneWithoutSessionsInput;
	};

	export type SessionUncheckedCreateInput = {
		id?: string;
		sessionToken: string;
		userId: string;
		expires: Date | string;
	};

	export type SessionUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
		user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
	};

	export type SessionUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		userId?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type SessionCreateManyInput = {
		id?: string;
		sessionToken: string;
		userId: string;
		expires: Date | string;
	};

	export type SessionUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type SessionUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		userId?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type UserCreateInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
		accounts?: AccountCreateNestedManyWithoutUserInput;
		sessions?: SessionCreateNestedManyWithoutUserInput;
	};

	export type UserUncheckedCreateInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
		accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
	};

	export type UserUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
		accounts?: AccountUpdateManyWithoutUserNestedInput;
		sessions?: SessionUpdateManyWithoutUserNestedInput;
	};

	export type UserUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
		accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
	};

	export type UserCreateManyInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
	};

	export type UserUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
	};

	export type UserUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
	};

	export type VerificationTokenCreateInput = {
		identifier: string;
		token: string;
		expires: Date | string;
	};

	export type VerificationTokenUncheckedCreateInput = {
		identifier: string;
		token: string;
		expires: Date | string;
	};

	export type VerificationTokenUpdateInput = {
		identifier?: StringFieldUpdateOperationsInput | string;
		token?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type VerificationTokenUncheckedUpdateInput = {
		identifier?: StringFieldUpdateOperationsInput | string;
		token?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type VerificationTokenCreateManyInput = {
		identifier: string;
		token: string;
		expires: Date | string;
	};

	export type VerificationTokenUpdateManyMutationInput = {
		identifier?: StringFieldUpdateOperationsInput | string;
		token?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type VerificationTokenUncheckedUpdateManyInput = {
		identifier?: StringFieldUpdateOperationsInput | string;
		token?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type BusCreateInput = {
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		driver?: DriverCreateNestedOneWithoutBusInput;
		conductor?: ConductorCreateNestedOneWithoutBusInput;
		passes?: StudentPassCreateNestedManyWithoutBusInput;
	};

	export type BusUncheckedCreateInput = {
		bus_id?: number;
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		driver?: DriverUncheckedCreateNestedOneWithoutBusInput;
		conductor?: ConductorUncheckedCreateNestedOneWithoutBusInput;
		passes?: StudentPassUncheckedCreateNestedManyWithoutBusInput;
	};

	export type BusUpdateInput = {
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		driver?: DriverUpdateOneWithoutBusNestedInput;
		conductor?: ConductorUpdateOneWithoutBusNestedInput;
		passes?: StudentPassUpdateManyWithoutBusNestedInput;
	};

	export type BusUncheckedUpdateInput = {
		bus_id?: IntFieldUpdateOperationsInput | number;
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		driver?: DriverUncheckedUpdateOneWithoutBusNestedInput;
		conductor?: ConductorUncheckedUpdateOneWithoutBusNestedInput;
		passes?: StudentPassUncheckedUpdateManyWithoutBusNestedInput;
	};

	export type BusCreateManyInput = {
		bus_id?: number;
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
	};

	export type BusUpdateManyMutationInput = {
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
	};

	export type BusUncheckedUpdateManyInput = {
		bus_id?: IntFieldUpdateOperationsInput | number;
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
	};

	export type DriverCreateInput = {
		name: string;
		phone: string;
		license_no: string;
		bus: BusCreateNestedOneWithoutDriverInput;
	};

	export type DriverUncheckedCreateInput = {
		driver_id?: number;
		name: string;
		phone: string;
		license_no: string;
		bus_id: number;
	};

	export type DriverUpdateInput = {
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		license_no?: StringFieldUpdateOperationsInput | string;
		bus?: BusUpdateOneRequiredWithoutDriverNestedInput;
	};

	export type DriverUncheckedUpdateInput = {
		driver_id?: IntFieldUpdateOperationsInput | number;
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		license_no?: StringFieldUpdateOperationsInput | string;
		bus_id?: IntFieldUpdateOperationsInput | number;
	};

	export type DriverCreateManyInput = {
		driver_id?: number;
		name: string;
		phone: string;
		license_no: string;
		bus_id: number;
	};

	export type DriverUpdateManyMutationInput = {
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		license_no?: StringFieldUpdateOperationsInput | string;
	};

	export type DriverUncheckedUpdateManyInput = {
		driver_id?: IntFieldUpdateOperationsInput | number;
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		license_no?: StringFieldUpdateOperationsInput | string;
		bus_id?: IntFieldUpdateOperationsInput | number;
	};

	export type ConductorCreateInput = {
		name: string;
		phone: string;
		bus: BusCreateNestedOneWithoutConductorInput;
	};

	export type ConductorUncheckedCreateInput = {
		conductor_id?: number;
		name: string;
		phone: string;
		bus_id: number;
	};

	export type ConductorUpdateInput = {
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		bus?: BusUpdateOneRequiredWithoutConductorNestedInput;
	};

	export type ConductorUncheckedUpdateInput = {
		conductor_id?: IntFieldUpdateOperationsInput | number;
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		bus_id?: IntFieldUpdateOperationsInput | number;
	};

	export type ConductorCreateManyInput = {
		conductor_id?: number;
		name: string;
		phone: string;
		bus_id: number;
	};

	export type ConductorUpdateManyMutationInput = {
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
	};

	export type ConductorUncheckedUpdateManyInput = {
		conductor_id?: IntFieldUpdateOperationsInput | number;
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		bus_id?: IntFieldUpdateOperationsInput | number;
	};

	export type StopCreateInput = {
		stop_name: string;
		area: string;
		distance_km: number;
		passes?: StudentPassCreateNestedManyWithoutStopInput;
	};

	export type StopUncheckedCreateInput = {
		stop_id?: number;
		stop_name: string;
		area: string;
		distance_km: number;
		passes?: StudentPassUncheckedCreateNestedManyWithoutStopInput;
	};

	export type StopUpdateInput = {
		stop_name?: StringFieldUpdateOperationsInput | string;
		area?: StringFieldUpdateOperationsInput | string;
		distance_km?: FloatFieldUpdateOperationsInput | number;
		passes?: StudentPassUpdateManyWithoutStopNestedInput;
	};

	export type StopUncheckedUpdateInput = {
		stop_id?: IntFieldUpdateOperationsInput | number;
		stop_name?: StringFieldUpdateOperationsInput | string;
		area?: StringFieldUpdateOperationsInput | string;
		distance_km?: FloatFieldUpdateOperationsInput | number;
		passes?: StudentPassUncheckedUpdateManyWithoutStopNestedInput;
	};

	export type StopCreateManyInput = {
		stop_id?: number;
		stop_name: string;
		area: string;
		distance_km: number;
	};

	export type StopUpdateManyMutationInput = {
		stop_name?: StringFieldUpdateOperationsInput | string;
		area?: StringFieldUpdateOperationsInput | string;
		distance_km?: FloatFieldUpdateOperationsInput | number;
	};

	export type StopUncheckedUpdateManyInput = {
		stop_id?: IntFieldUpdateOperationsInput | number;
		stop_name?: StringFieldUpdateOperationsInput | string;
		area?: StringFieldUpdateOperationsInput | string;
		distance_km?: FloatFieldUpdateOperationsInput | number;
	};

	export type StudentPassCreateInput = {
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		bus: BusCreateNestedOneWithoutPassesInput;
		stop: StopCreateNestedOneWithoutPassesInput;
	};

	export type StudentPassUncheckedCreateInput = {
		pass_id?: number;
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		bus_id: number;
		stop_id: number;
	};

	export type StudentPassUpdateInput = {
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		bus?: BusUpdateOneRequiredWithoutPassesNestedInput;
		stop?: StopUpdateOneRequiredWithoutPassesNestedInput;
	};

	export type StudentPassUncheckedUpdateInput = {
		pass_id?: IntFieldUpdateOperationsInput | number;
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		bus_id?: IntFieldUpdateOperationsInput | number;
		stop_id?: IntFieldUpdateOperationsInput | number;
	};

	export type StudentPassCreateManyInput = {
		pass_id?: number;
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		bus_id: number;
		stop_id: number;
	};

	export type StudentPassUpdateManyMutationInput = {
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
	};

	export type StudentPassUncheckedUpdateManyInput = {
		pass_id?: IntFieldUpdateOperationsInput | number;
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		bus_id?: IntFieldUpdateOperationsInput | number;
		stop_id?: IntFieldUpdateOperationsInput | number;
	};

	export type StringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		mode?: QueryMode;
		not?: NestedStringFilter<$PrismaModel> | string;
	};

	export type StringNullableFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null;
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		mode?: QueryMode;
		not?: NestedStringNullableFilter<$PrismaModel> | string | null;
	};

	export type IntNullableFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableFilter<$PrismaModel> | number | null;
	};

	export type UserScalarRelationFilter = {
		is?: UserWhereInput;
		isNot?: UserWhereInput;
	};

	export type SortOrderInput = {
		sort: SortOrder;
		nulls?: NullsOrder;
	};

	export type AccountProviderProviderAccountIdCompoundUniqueInput = {
		provider: string;
		providerAccountId: string;
	};

	export type AccountCountOrderByAggregateInput = {
		id?: SortOrder;
		userId?: SortOrder;
		type?: SortOrder;
		provider?: SortOrder;
		providerAccountId?: SortOrder;
		refresh_token?: SortOrder;
		access_token?: SortOrder;
		expires_at?: SortOrder;
		token_type?: SortOrder;
		scope?: SortOrder;
		id_token?: SortOrder;
		session_state?: SortOrder;
		refresh_token_expires_in?: SortOrder;
	};

	export type AccountAvgOrderByAggregateInput = {
		expires_at?: SortOrder;
		refresh_token_expires_in?: SortOrder;
	};

	export type AccountMaxOrderByAggregateInput = {
		id?: SortOrder;
		userId?: SortOrder;
		type?: SortOrder;
		provider?: SortOrder;
		providerAccountId?: SortOrder;
		refresh_token?: SortOrder;
		access_token?: SortOrder;
		expires_at?: SortOrder;
		token_type?: SortOrder;
		scope?: SortOrder;
		id_token?: SortOrder;
		session_state?: SortOrder;
		refresh_token_expires_in?: SortOrder;
	};

	export type AccountMinOrderByAggregateInput = {
		id?: SortOrder;
		userId?: SortOrder;
		type?: SortOrder;
		provider?: SortOrder;
		providerAccountId?: SortOrder;
		refresh_token?: SortOrder;
		access_token?: SortOrder;
		expires_at?: SortOrder;
		token_type?: SortOrder;
		scope?: SortOrder;
		id_token?: SortOrder;
		session_state?: SortOrder;
		refresh_token_expires_in?: SortOrder;
	};

	export type AccountSumOrderByAggregateInput = {
		expires_at?: SortOrder;
		refresh_token_expires_in?: SortOrder;
	};

	export type StringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		mode?: QueryMode;
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedStringFilter<$PrismaModel>;
		_max?: NestedStringFilter<$PrismaModel>;
	};

	export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null;
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		mode?: QueryMode;
		not?:
			| NestedStringNullableWithAggregatesFilter<$PrismaModel>
			| string
			| null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedStringNullableFilter<$PrismaModel>;
		_max?: NestedStringNullableFilter<$PrismaModel>;
	};

	export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_avg?: NestedFloatNullableFilter<$PrismaModel>;
		_sum?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedIntNullableFilter<$PrismaModel>;
		_max?: NestedIntNullableFilter<$PrismaModel>;
	};

	export type DateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
	};

	export type SessionCountOrderByAggregateInput = {
		id?: SortOrder;
		sessionToken?: SortOrder;
		userId?: SortOrder;
		expires?: SortOrder;
	};

	export type SessionMaxOrderByAggregateInput = {
		id?: SortOrder;
		sessionToken?: SortOrder;
		userId?: SortOrder;
		expires?: SortOrder;
	};

	export type SessionMinOrderByAggregateInput = {
		id?: SortOrder;
		sessionToken?: SortOrder;
		userId?: SortOrder;
		expires?: SortOrder;
	};

	export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedDateTimeFilter<$PrismaModel>;
		_max?: NestedDateTimeFilter<$PrismaModel>;
	};

	export type DateTimeNullableFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
	};

	export type AccountListRelationFilter = {
		every?: AccountWhereInput;
		some?: AccountWhereInput;
		none?: AccountWhereInput;
	};

	export type SessionListRelationFilter = {
		every?: SessionWhereInput;
		some?: SessionWhereInput;
		none?: SessionWhereInput;
	};

	export type AccountOrderByRelationAggregateInput = {
		_count?: SortOrder;
	};

	export type SessionOrderByRelationAggregateInput = {
		_count?: SortOrder;
	};

	export type UserCountOrderByAggregateInput = {
		id?: SortOrder;
		name?: SortOrder;
		email?: SortOrder;
		emailVerified?: SortOrder;
		image?: SortOrder;
	};

	export type UserMaxOrderByAggregateInput = {
		id?: SortOrder;
		name?: SortOrder;
		email?: SortOrder;
		emailVerified?: SortOrder;
		image?: SortOrder;
	};

	export type UserMinOrderByAggregateInput = {
		id?: SortOrder;
		name?: SortOrder;
		email?: SortOrder;
		emailVerified?: SortOrder;
		image?: SortOrder;
	};

	export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?:
			| NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
			| Date
			| string
			| null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedDateTimeNullableFilter<$PrismaModel>;
		_max?: NestedDateTimeNullableFilter<$PrismaModel>;
	};

	export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
		identifier: string;
		token: string;
	};

	export type VerificationTokenCountOrderByAggregateInput = {
		identifier?: SortOrder;
		token?: SortOrder;
		expires?: SortOrder;
	};

	export type VerificationTokenMaxOrderByAggregateInput = {
		identifier?: SortOrder;
		token?: SortOrder;
		expires?: SortOrder;
	};

	export type VerificationTokenMinOrderByAggregateInput = {
		identifier?: SortOrder;
		token?: SortOrder;
		expires?: SortOrder;
	};

	export type IntFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>;
		in?: number[] | ListIntFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntFilter<$PrismaModel> | number;
	};

	export type DriverNullableScalarRelationFilter = {
		is?: DriverWhereInput | null;
		isNot?: DriverWhereInput | null;
	};

	export type ConductorNullableScalarRelationFilter = {
		is?: ConductorWhereInput | null;
		isNot?: ConductorWhereInput | null;
	};

	export type StudentPassListRelationFilter = {
		every?: StudentPassWhereInput;
		some?: StudentPassWhereInput;
		none?: StudentPassWhereInput;
	};

	export type StudentPassOrderByRelationAggregateInput = {
		_count?: SortOrder;
	};

	export type BusCountOrderByAggregateInput = {
		bus_id?: SortOrder;
		bus_no?: SortOrder;
		capacity?: SortOrder;
		route_id?: SortOrder;
		route_name?: SortOrder;
		arrival_time?: SortOrder;
		departure_time?: SortOrder;
	};

	export type BusAvgOrderByAggregateInput = {
		bus_id?: SortOrder;
		capacity?: SortOrder;
	};

	export type BusMaxOrderByAggregateInput = {
		bus_id?: SortOrder;
		bus_no?: SortOrder;
		capacity?: SortOrder;
		route_id?: SortOrder;
		route_name?: SortOrder;
		arrival_time?: SortOrder;
		departure_time?: SortOrder;
	};

	export type BusMinOrderByAggregateInput = {
		bus_id?: SortOrder;
		bus_no?: SortOrder;
		capacity?: SortOrder;
		route_id?: SortOrder;
		route_name?: SortOrder;
		arrival_time?: SortOrder;
		departure_time?: SortOrder;
	};

	export type BusSumOrderByAggregateInput = {
		bus_id?: SortOrder;
		capacity?: SortOrder;
	};

	export type IntWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>;
		in?: number[] | ListIntFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
		_count?: NestedIntFilter<$PrismaModel>;
		_avg?: NestedFloatFilter<$PrismaModel>;
		_sum?: NestedIntFilter<$PrismaModel>;
		_min?: NestedIntFilter<$PrismaModel>;
		_max?: NestedIntFilter<$PrismaModel>;
	};

	export type BusScalarRelationFilter = {
		is?: BusWhereInput;
		isNot?: BusWhereInput;
	};

	export type DriverCountOrderByAggregateInput = {
		driver_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		license_no?: SortOrder;
		bus_id?: SortOrder;
	};

	export type DriverAvgOrderByAggregateInput = {
		driver_id?: SortOrder;
		bus_id?: SortOrder;
	};

	export type DriverMaxOrderByAggregateInput = {
		driver_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		license_no?: SortOrder;
		bus_id?: SortOrder;
	};

	export type DriverMinOrderByAggregateInput = {
		driver_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		license_no?: SortOrder;
		bus_id?: SortOrder;
	};

	export type DriverSumOrderByAggregateInput = {
		driver_id?: SortOrder;
		bus_id?: SortOrder;
	};

	export type ConductorCountOrderByAggregateInput = {
		conductor_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		bus_id?: SortOrder;
	};

	export type ConductorAvgOrderByAggregateInput = {
		conductor_id?: SortOrder;
		bus_id?: SortOrder;
	};

	export type ConductorMaxOrderByAggregateInput = {
		conductor_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		bus_id?: SortOrder;
	};

	export type ConductorMinOrderByAggregateInput = {
		conductor_id?: SortOrder;
		name?: SortOrder;
		phone?: SortOrder;
		bus_id?: SortOrder;
	};

	export type ConductorSumOrderByAggregateInput = {
		conductor_id?: SortOrder;
		bus_id?: SortOrder;
	};

	export type FloatFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel>;
		in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		lt?: number | FloatFieldRefInput<$PrismaModel>;
		lte?: number | FloatFieldRefInput<$PrismaModel>;
		gt?: number | FloatFieldRefInput<$PrismaModel>;
		gte?: number | FloatFieldRefInput<$PrismaModel>;
		not?: NestedFloatFilter<$PrismaModel> | number;
	};

	export type StopCountOrderByAggregateInput = {
		stop_id?: SortOrder;
		stop_name?: SortOrder;
		area?: SortOrder;
		distance_km?: SortOrder;
	};

	export type StopAvgOrderByAggregateInput = {
		stop_id?: SortOrder;
		distance_km?: SortOrder;
	};

	export type StopMaxOrderByAggregateInput = {
		stop_id?: SortOrder;
		stop_name?: SortOrder;
		area?: SortOrder;
		distance_km?: SortOrder;
	};

	export type StopMinOrderByAggregateInput = {
		stop_id?: SortOrder;
		stop_name?: SortOrder;
		area?: SortOrder;
		distance_km?: SortOrder;
	};

	export type StopSumOrderByAggregateInput = {
		stop_id?: SortOrder;
		distance_km?: SortOrder;
	};

	export type FloatWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel>;
		in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		lt?: number | FloatFieldRefInput<$PrismaModel>;
		lte?: number | FloatFieldRefInput<$PrismaModel>;
		gt?: number | FloatFieldRefInput<$PrismaModel>;
		gte?: number | FloatFieldRefInput<$PrismaModel>;
		not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
		_count?: NestedIntFilter<$PrismaModel>;
		_avg?: NestedFloatFilter<$PrismaModel>;
		_sum?: NestedFloatFilter<$PrismaModel>;
		_min?: NestedFloatFilter<$PrismaModel>;
		_max?: NestedFloatFilter<$PrismaModel>;
	};

	export type StopScalarRelationFilter = {
		is?: StopWhereInput;
		isNot?: StopWhereInput;
	};

	export type StudentPassCountOrderByAggregateInput = {
		pass_id?: SortOrder;
		issue_date?: SortOrder;
		valid_till?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
	};

	export type StudentPassAvgOrderByAggregateInput = {
		pass_id?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
	};

	export type StudentPassMaxOrderByAggregateInput = {
		pass_id?: SortOrder;
		issue_date?: SortOrder;
		valid_till?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
	};

	export type StudentPassMinOrderByAggregateInput = {
		pass_id?: SortOrder;
		issue_date?: SortOrder;
		valid_till?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
	};

	export type StudentPassSumOrderByAggregateInput = {
		pass_id?: SortOrder;
		amount?: SortOrder;
		bus_id?: SortOrder;
		stop_id?: SortOrder;
	};

	export type UserCreateNestedOneWithoutAccountsInput = {
		create?: XOR<
			UserCreateWithoutAccountsInput,
			UserUncheckedCreateWithoutAccountsInput
		>;
		connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
		connect?: UserWhereUniqueInput;
	};

	export type StringFieldUpdateOperationsInput = {
		set?: string;
	};

	export type NullableStringFieldUpdateOperationsInput = {
		set?: string | null;
	};

	export type NullableIntFieldUpdateOperationsInput = {
		set?: number | null;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
		create?: XOR<
			UserCreateWithoutAccountsInput,
			UserUncheckedCreateWithoutAccountsInput
		>;
		connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
		upsert?: UserUpsertWithoutAccountsInput;
		connect?: UserWhereUniqueInput;
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutAccountsInput,
				UserUpdateWithoutAccountsInput
			>,
			UserUncheckedUpdateWithoutAccountsInput
		>;
	};

	export type UserCreateNestedOneWithoutSessionsInput = {
		create?: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>;
		connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
		connect?: UserWhereUniqueInput;
	};

	export type DateTimeFieldUpdateOperationsInput = {
		set?: Date | string;
	};

	export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
		create?: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>;
		connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
		upsert?: UserUpsertWithoutSessionsInput;
		connect?: UserWhereUniqueInput;
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutSessionsInput,
				UserUpdateWithoutSessionsInput
			>,
			UserUncheckedUpdateWithoutSessionsInput
		>;
	};

	export type AccountCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					AccountCreateWithoutUserInput,
					AccountUncheckedCreateWithoutUserInput
			  >
			| AccountCreateWithoutUserInput[]
			| AccountUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| AccountCreateOrConnectWithoutUserInput
			| AccountCreateOrConnectWithoutUserInput[];
		createMany?: AccountCreateManyUserInputEnvelope;
		connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
	};

	export type SessionCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[];
		createMany?: SessionCreateManyUserInputEnvelope;
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
	};

	export type AccountUncheckedCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					AccountCreateWithoutUserInput,
					AccountUncheckedCreateWithoutUserInput
			  >
			| AccountCreateWithoutUserInput[]
			| AccountUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| AccountCreateOrConnectWithoutUserInput
			| AccountCreateOrConnectWithoutUserInput[];
		createMany?: AccountCreateManyUserInputEnvelope;
		connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
	};

	export type SessionUncheckedCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[];
		createMany?: SessionCreateManyUserInputEnvelope;
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
	};

	export type NullableDateTimeFieldUpdateOperationsInput = {
		set?: Date | string | null;
	};

	export type AccountUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					AccountCreateWithoutUserInput,
					AccountUncheckedCreateWithoutUserInput
			  >
			| AccountCreateWithoutUserInput[]
			| AccountUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| AccountCreateOrConnectWithoutUserInput
			| AccountCreateOrConnectWithoutUserInput[];
		upsert?:
			| AccountUpsertWithWhereUniqueWithoutUserInput
			| AccountUpsertWithWhereUniqueWithoutUserInput[];
		createMany?: AccountCreateManyUserInputEnvelope;
		set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		update?:
			| AccountUpdateWithWhereUniqueWithoutUserInput
			| AccountUpdateWithWhereUniqueWithoutUserInput[];
		updateMany?:
			| AccountUpdateManyWithWhereWithoutUserInput
			| AccountUpdateManyWithWhereWithoutUserInput[];
		deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
	};

	export type SessionUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[];
		upsert?:
			| SessionUpsertWithWhereUniqueWithoutUserInput
			| SessionUpsertWithWhereUniqueWithoutUserInput[];
		createMany?: SessionCreateManyUserInputEnvelope;
		set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		update?:
			| SessionUpdateWithWhereUniqueWithoutUserInput
			| SessionUpdateWithWhereUniqueWithoutUserInput[];
		updateMany?:
			| SessionUpdateManyWithWhereWithoutUserInput
			| SessionUpdateManyWithWhereWithoutUserInput[];
		deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
	};

	export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					AccountCreateWithoutUserInput,
					AccountUncheckedCreateWithoutUserInput
			  >
			| AccountCreateWithoutUserInput[]
			| AccountUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| AccountCreateOrConnectWithoutUserInput
			| AccountCreateOrConnectWithoutUserInput[];
		upsert?:
			| AccountUpsertWithWhereUniqueWithoutUserInput
			| AccountUpsertWithWhereUniqueWithoutUserInput[];
		createMany?: AccountCreateManyUserInputEnvelope;
		set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
		update?:
			| AccountUpdateWithWhereUniqueWithoutUserInput
			| AccountUpdateWithWhereUniqueWithoutUserInput[];
		updateMany?:
			| AccountUpdateManyWithWhereWithoutUserInput
			| AccountUpdateManyWithWhereWithoutUserInput[];
		deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
	};

	export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[];
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[];
		upsert?:
			| SessionUpsertWithWhereUniqueWithoutUserInput
			| SessionUpsertWithWhereUniqueWithoutUserInput[];
		createMany?: SessionCreateManyUserInputEnvelope;
		set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
		update?:
			| SessionUpdateWithWhereUniqueWithoutUserInput
			| SessionUpdateWithWhereUniqueWithoutUserInput[];
		updateMany?:
			| SessionUpdateManyWithWhereWithoutUserInput
			| SessionUpdateManyWithWhereWithoutUserInput[];
		deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
	};

	export type DriverCreateNestedOneWithoutBusInput = {
		create?: XOR<
			DriverCreateWithoutBusInput,
			DriverUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: DriverCreateOrConnectWithoutBusInput;
		connect?: DriverWhereUniqueInput;
	};

	export type ConductorCreateNestedOneWithoutBusInput = {
		create?: XOR<
			ConductorCreateWithoutBusInput,
			ConductorUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: ConductorCreateOrConnectWithoutBusInput;
		connect?: ConductorWhereUniqueInput;
	};

	export type StudentPassCreateNestedManyWithoutBusInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutBusInput,
					StudentPassUncheckedCreateWithoutBusInput
			  >
			| StudentPassCreateWithoutBusInput[]
			| StudentPassUncheckedCreateWithoutBusInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutBusInput
			| StudentPassCreateOrConnectWithoutBusInput[];
		createMany?: StudentPassCreateManyBusInputEnvelope;
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
	};

	export type DriverUncheckedCreateNestedOneWithoutBusInput = {
		create?: XOR<
			DriverCreateWithoutBusInput,
			DriverUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: DriverCreateOrConnectWithoutBusInput;
		connect?: DriverWhereUniqueInput;
	};

	export type ConductorUncheckedCreateNestedOneWithoutBusInput = {
		create?: XOR<
			ConductorCreateWithoutBusInput,
			ConductorUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: ConductorCreateOrConnectWithoutBusInput;
		connect?: ConductorWhereUniqueInput;
	};

	export type StudentPassUncheckedCreateNestedManyWithoutBusInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutBusInput,
					StudentPassUncheckedCreateWithoutBusInput
			  >
			| StudentPassCreateWithoutBusInput[]
			| StudentPassUncheckedCreateWithoutBusInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutBusInput
			| StudentPassCreateOrConnectWithoutBusInput[];
		createMany?: StudentPassCreateManyBusInputEnvelope;
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
	};

	export type IntFieldUpdateOperationsInput = {
		set?: number;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type DriverUpdateOneWithoutBusNestedInput = {
		create?: XOR<
			DriverCreateWithoutBusInput,
			DriverUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: DriverCreateOrConnectWithoutBusInput;
		upsert?: DriverUpsertWithoutBusInput;
		disconnect?: DriverWhereInput | boolean;
		delete?: DriverWhereInput | boolean;
		connect?: DriverWhereUniqueInput;
		update?: XOR<
			XOR<
				DriverUpdateToOneWithWhereWithoutBusInput,
				DriverUpdateWithoutBusInput
			>,
			DriverUncheckedUpdateWithoutBusInput
		>;
	};

	export type ConductorUpdateOneWithoutBusNestedInput = {
		create?: XOR<
			ConductorCreateWithoutBusInput,
			ConductorUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: ConductorCreateOrConnectWithoutBusInput;
		upsert?: ConductorUpsertWithoutBusInput;
		disconnect?: ConductorWhereInput | boolean;
		delete?: ConductorWhereInput | boolean;
		connect?: ConductorWhereUniqueInput;
		update?: XOR<
			XOR<
				ConductorUpdateToOneWithWhereWithoutBusInput,
				ConductorUpdateWithoutBusInput
			>,
			ConductorUncheckedUpdateWithoutBusInput
		>;
	};

	export type StudentPassUpdateManyWithoutBusNestedInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutBusInput,
					StudentPassUncheckedCreateWithoutBusInput
			  >
			| StudentPassCreateWithoutBusInput[]
			| StudentPassUncheckedCreateWithoutBusInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutBusInput
			| StudentPassCreateOrConnectWithoutBusInput[];
		upsert?:
			| StudentPassUpsertWithWhereUniqueWithoutBusInput
			| StudentPassUpsertWithWhereUniqueWithoutBusInput[];
		createMany?: StudentPassCreateManyBusInputEnvelope;
		set?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		disconnect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		delete?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		update?:
			| StudentPassUpdateWithWhereUniqueWithoutBusInput
			| StudentPassUpdateWithWhereUniqueWithoutBusInput[];
		updateMany?:
			| StudentPassUpdateManyWithWhereWithoutBusInput
			| StudentPassUpdateManyWithWhereWithoutBusInput[];
		deleteMany?: StudentPassScalarWhereInput | StudentPassScalarWhereInput[];
	};

	export type DriverUncheckedUpdateOneWithoutBusNestedInput = {
		create?: XOR<
			DriverCreateWithoutBusInput,
			DriverUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: DriverCreateOrConnectWithoutBusInput;
		upsert?: DriverUpsertWithoutBusInput;
		disconnect?: DriverWhereInput | boolean;
		delete?: DriverWhereInput | boolean;
		connect?: DriverWhereUniqueInput;
		update?: XOR<
			XOR<
				DriverUpdateToOneWithWhereWithoutBusInput,
				DriverUpdateWithoutBusInput
			>,
			DriverUncheckedUpdateWithoutBusInput
		>;
	};

	export type ConductorUncheckedUpdateOneWithoutBusNestedInput = {
		create?: XOR<
			ConductorCreateWithoutBusInput,
			ConductorUncheckedCreateWithoutBusInput
		>;
		connectOrCreate?: ConductorCreateOrConnectWithoutBusInput;
		upsert?: ConductorUpsertWithoutBusInput;
		disconnect?: ConductorWhereInput | boolean;
		delete?: ConductorWhereInput | boolean;
		connect?: ConductorWhereUniqueInput;
		update?: XOR<
			XOR<
				ConductorUpdateToOneWithWhereWithoutBusInput,
				ConductorUpdateWithoutBusInput
			>,
			ConductorUncheckedUpdateWithoutBusInput
		>;
	};

	export type StudentPassUncheckedUpdateManyWithoutBusNestedInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutBusInput,
					StudentPassUncheckedCreateWithoutBusInput
			  >
			| StudentPassCreateWithoutBusInput[]
			| StudentPassUncheckedCreateWithoutBusInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutBusInput
			| StudentPassCreateOrConnectWithoutBusInput[];
		upsert?:
			| StudentPassUpsertWithWhereUniqueWithoutBusInput
			| StudentPassUpsertWithWhereUniqueWithoutBusInput[];
		createMany?: StudentPassCreateManyBusInputEnvelope;
		set?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		disconnect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		delete?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		update?:
			| StudentPassUpdateWithWhereUniqueWithoutBusInput
			| StudentPassUpdateWithWhereUniqueWithoutBusInput[];
		updateMany?:
			| StudentPassUpdateManyWithWhereWithoutBusInput
			| StudentPassUpdateManyWithWhereWithoutBusInput[];
		deleteMany?: StudentPassScalarWhereInput | StudentPassScalarWhereInput[];
	};

	export type BusCreateNestedOneWithoutDriverInput = {
		create?: XOR<
			BusCreateWithoutDriverInput,
			BusUncheckedCreateWithoutDriverInput
		>;
		connectOrCreate?: BusCreateOrConnectWithoutDriverInput;
		connect?: BusWhereUniqueInput;
	};

	export type BusUpdateOneRequiredWithoutDriverNestedInput = {
		create?: XOR<
			BusCreateWithoutDriverInput,
			BusUncheckedCreateWithoutDriverInput
		>;
		connectOrCreate?: BusCreateOrConnectWithoutDriverInput;
		upsert?: BusUpsertWithoutDriverInput;
		connect?: BusWhereUniqueInput;
		update?: XOR<
			XOR<
				BusUpdateToOneWithWhereWithoutDriverInput,
				BusUpdateWithoutDriverInput
			>,
			BusUncheckedUpdateWithoutDriverInput
		>;
	};

	export type BusCreateNestedOneWithoutConductorInput = {
		create?: XOR<
			BusCreateWithoutConductorInput,
			BusUncheckedCreateWithoutConductorInput
		>;
		connectOrCreate?: BusCreateOrConnectWithoutConductorInput;
		connect?: BusWhereUniqueInput;
	};

	export type BusUpdateOneRequiredWithoutConductorNestedInput = {
		create?: XOR<
			BusCreateWithoutConductorInput,
			BusUncheckedCreateWithoutConductorInput
		>;
		connectOrCreate?: BusCreateOrConnectWithoutConductorInput;
		upsert?: BusUpsertWithoutConductorInput;
		connect?: BusWhereUniqueInput;
		update?: XOR<
			XOR<
				BusUpdateToOneWithWhereWithoutConductorInput,
				BusUpdateWithoutConductorInput
			>,
			BusUncheckedUpdateWithoutConductorInput
		>;
	};

	export type StudentPassCreateNestedManyWithoutStopInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutStopInput,
					StudentPassUncheckedCreateWithoutStopInput
			  >
			| StudentPassCreateWithoutStopInput[]
			| StudentPassUncheckedCreateWithoutStopInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutStopInput
			| StudentPassCreateOrConnectWithoutStopInput[];
		createMany?: StudentPassCreateManyStopInputEnvelope;
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
	};

	export type StudentPassUncheckedCreateNestedManyWithoutStopInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutStopInput,
					StudentPassUncheckedCreateWithoutStopInput
			  >
			| StudentPassCreateWithoutStopInput[]
			| StudentPassUncheckedCreateWithoutStopInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutStopInput
			| StudentPassCreateOrConnectWithoutStopInput[];
		createMany?: StudentPassCreateManyStopInputEnvelope;
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
	};

	export type FloatFieldUpdateOperationsInput = {
		set?: number;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type StudentPassUpdateManyWithoutStopNestedInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutStopInput,
					StudentPassUncheckedCreateWithoutStopInput
			  >
			| StudentPassCreateWithoutStopInput[]
			| StudentPassUncheckedCreateWithoutStopInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutStopInput
			| StudentPassCreateOrConnectWithoutStopInput[];
		upsert?:
			| StudentPassUpsertWithWhereUniqueWithoutStopInput
			| StudentPassUpsertWithWhereUniqueWithoutStopInput[];
		createMany?: StudentPassCreateManyStopInputEnvelope;
		set?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		disconnect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		delete?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		update?:
			| StudentPassUpdateWithWhereUniqueWithoutStopInput
			| StudentPassUpdateWithWhereUniqueWithoutStopInput[];
		updateMany?:
			| StudentPassUpdateManyWithWhereWithoutStopInput
			| StudentPassUpdateManyWithWhereWithoutStopInput[];
		deleteMany?: StudentPassScalarWhereInput | StudentPassScalarWhereInput[];
	};

	export type StudentPassUncheckedUpdateManyWithoutStopNestedInput = {
		create?:
			| XOR<
					StudentPassCreateWithoutStopInput,
					StudentPassUncheckedCreateWithoutStopInput
			  >
			| StudentPassCreateWithoutStopInput[]
			| StudentPassUncheckedCreateWithoutStopInput[];
		connectOrCreate?:
			| StudentPassCreateOrConnectWithoutStopInput
			| StudentPassCreateOrConnectWithoutStopInput[];
		upsert?:
			| StudentPassUpsertWithWhereUniqueWithoutStopInput
			| StudentPassUpsertWithWhereUniqueWithoutStopInput[];
		createMany?: StudentPassCreateManyStopInputEnvelope;
		set?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		disconnect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		delete?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		connect?: StudentPassWhereUniqueInput | StudentPassWhereUniqueInput[];
		update?:
			| StudentPassUpdateWithWhereUniqueWithoutStopInput
			| StudentPassUpdateWithWhereUniqueWithoutStopInput[];
		updateMany?:
			| StudentPassUpdateManyWithWhereWithoutStopInput
			| StudentPassUpdateManyWithWhereWithoutStopInput[];
		deleteMany?: StudentPassScalarWhereInput | StudentPassScalarWhereInput[];
	};

	export type BusCreateNestedOneWithoutPassesInput = {
		create?: XOR<
			BusCreateWithoutPassesInput,
			BusUncheckedCreateWithoutPassesInput
		>;
		connectOrCreate?: BusCreateOrConnectWithoutPassesInput;
		connect?: BusWhereUniqueInput;
	};

	export type StopCreateNestedOneWithoutPassesInput = {
		create?: XOR<
			StopCreateWithoutPassesInput,
			StopUncheckedCreateWithoutPassesInput
		>;
		connectOrCreate?: StopCreateOrConnectWithoutPassesInput;
		connect?: StopWhereUniqueInput;
	};

	export type BusUpdateOneRequiredWithoutPassesNestedInput = {
		create?: XOR<
			BusCreateWithoutPassesInput,
			BusUncheckedCreateWithoutPassesInput
		>;
		connectOrCreate?: BusCreateOrConnectWithoutPassesInput;
		upsert?: BusUpsertWithoutPassesInput;
		connect?: BusWhereUniqueInput;
		update?: XOR<
			XOR<
				BusUpdateToOneWithWhereWithoutPassesInput,
				BusUpdateWithoutPassesInput
			>,
			BusUncheckedUpdateWithoutPassesInput
		>;
	};

	export type StopUpdateOneRequiredWithoutPassesNestedInput = {
		create?: XOR<
			StopCreateWithoutPassesInput,
			StopUncheckedCreateWithoutPassesInput
		>;
		connectOrCreate?: StopCreateOrConnectWithoutPassesInput;
		upsert?: StopUpsertWithoutPassesInput;
		connect?: StopWhereUniqueInput;
		update?: XOR<
			XOR<
				StopUpdateToOneWithWhereWithoutPassesInput,
				StopUpdateWithoutPassesInput
			>,
			StopUncheckedUpdateWithoutPassesInput
		>;
	};

	export type NestedStringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		not?: NestedStringFilter<$PrismaModel> | string;
	};

	export type NestedStringNullableFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null;
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		not?: NestedStringNullableFilter<$PrismaModel> | string | null;
	};

	export type NestedIntNullableFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableFilter<$PrismaModel> | number | null;
	};

	export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedStringFilter<$PrismaModel>;
		_max?: NestedStringFilter<$PrismaModel>;
	};

	export type NestedIntFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>;
		in?: number[] | ListIntFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntFilter<$PrismaModel> | number;
	};

	export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null;
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		not?:
			| NestedStringNullableWithAggregatesFilter<$PrismaModel>
			| string
			| null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedStringNullableFilter<$PrismaModel>;
		_max?: NestedStringNullableFilter<$PrismaModel>;
	};

	export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_avg?: NestedFloatNullableFilter<$PrismaModel>;
		_sum?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedIntNullableFilter<$PrismaModel>;
		_max?: NestedIntNullableFilter<$PrismaModel>;
	};

	export type NestedFloatNullableFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
		lt?: number | FloatFieldRefInput<$PrismaModel>;
		lte?: number | FloatFieldRefInput<$PrismaModel>;
		gt?: number | FloatFieldRefInput<$PrismaModel>;
		gte?: number | FloatFieldRefInput<$PrismaModel>;
		not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
	};

	export type NestedDateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
	};

	export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedDateTimeFilter<$PrismaModel>;
		_max?: NestedDateTimeFilter<$PrismaModel>;
	};

	export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
	};

	export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
		{
			equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
			in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
			notIn?:
				| Date[]
				| string[]
				| ListDateTimeFieldRefInput<$PrismaModel>
				| null;
			lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
			lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
			gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
			gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
			not?:
				| NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
				| Date
				| string
				| null;
			_count?: NestedIntNullableFilter<$PrismaModel>;
			_min?: NestedDateTimeNullableFilter<$PrismaModel>;
			_max?: NestedDateTimeNullableFilter<$PrismaModel>;
		};

	export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>;
		in?: number[] | ListIntFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
		_count?: NestedIntFilter<$PrismaModel>;
		_avg?: NestedFloatFilter<$PrismaModel>;
		_sum?: NestedIntFilter<$PrismaModel>;
		_min?: NestedIntFilter<$PrismaModel>;
		_max?: NestedIntFilter<$PrismaModel>;
	};

	export type NestedFloatFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel>;
		in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		lt?: number | FloatFieldRefInput<$PrismaModel>;
		lte?: number | FloatFieldRefInput<$PrismaModel>;
		gt?: number | FloatFieldRefInput<$PrismaModel>;
		gte?: number | FloatFieldRefInput<$PrismaModel>;
		not?: NestedFloatFilter<$PrismaModel> | number;
	};

	export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel>;
		in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
		lt?: number | FloatFieldRefInput<$PrismaModel>;
		lte?: number | FloatFieldRefInput<$PrismaModel>;
		gt?: number | FloatFieldRefInput<$PrismaModel>;
		gte?: number | FloatFieldRefInput<$PrismaModel>;
		not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
		_count?: NestedIntFilter<$PrismaModel>;
		_avg?: NestedFloatFilter<$PrismaModel>;
		_sum?: NestedFloatFilter<$PrismaModel>;
		_min?: NestedFloatFilter<$PrismaModel>;
		_max?: NestedFloatFilter<$PrismaModel>;
	};

	export type UserCreateWithoutAccountsInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
		sessions?: SessionCreateNestedManyWithoutUserInput;
	};

	export type UserUncheckedCreateWithoutAccountsInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
	};

	export type UserCreateOrConnectWithoutAccountsInput = {
		where: UserWhereUniqueInput;
		create: XOR<
			UserCreateWithoutAccountsInput,
			UserUncheckedCreateWithoutAccountsInput
		>;
	};

	export type UserUpsertWithoutAccountsInput = {
		update: XOR<
			UserUpdateWithoutAccountsInput,
			UserUncheckedUpdateWithoutAccountsInput
		>;
		create: XOR<
			UserCreateWithoutAccountsInput,
			UserUncheckedCreateWithoutAccountsInput
		>;
		where?: UserWhereInput;
	};

	export type UserUpdateToOneWithWhereWithoutAccountsInput = {
		where?: UserWhereInput;
		data: XOR<
			UserUpdateWithoutAccountsInput,
			UserUncheckedUpdateWithoutAccountsInput
		>;
	};

	export type UserUpdateWithoutAccountsInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
		sessions?: SessionUpdateManyWithoutUserNestedInput;
	};

	export type UserUncheckedUpdateWithoutAccountsInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
	};

	export type UserCreateWithoutSessionsInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
		accounts?: AccountCreateNestedManyWithoutUserInput;
	};

	export type UserUncheckedCreateWithoutSessionsInput = {
		id?: string;
		name?: string | null;
		email?: string | null;
		emailVerified?: Date | string | null;
		image?: string | null;
		accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
	};

	export type UserCreateOrConnectWithoutSessionsInput = {
		where: UserWhereUniqueInput;
		create: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>;
	};

	export type UserUpsertWithoutSessionsInput = {
		update: XOR<
			UserUpdateWithoutSessionsInput,
			UserUncheckedUpdateWithoutSessionsInput
		>;
		create: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>;
		where?: UserWhereInput;
	};

	export type UserUpdateToOneWithWhereWithoutSessionsInput = {
		where?: UserWhereInput;
		data: XOR<
			UserUpdateWithoutSessionsInput,
			UserUncheckedUpdateWithoutSessionsInput
		>;
	};

	export type UserUpdateWithoutSessionsInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
		accounts?: AccountUpdateManyWithoutUserNestedInput;
	};

	export type UserUncheckedUpdateWithoutSessionsInput = {
		id?: StringFieldUpdateOperationsInput | string;
		name?: NullableStringFieldUpdateOperationsInput | string | null;
		email?: NullableStringFieldUpdateOperationsInput | string | null;
		emailVerified?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null;
		image?: NullableStringFieldUpdateOperationsInput | string | null;
		accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
	};

	export type AccountCreateWithoutUserInput = {
		id?: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string | null;
		access_token?: string | null;
		expires_at?: number | null;
		token_type?: string | null;
		scope?: string | null;
		id_token?: string | null;
		session_state?: string | null;
		refresh_token_expires_in?: number | null;
	};

	export type AccountUncheckedCreateWithoutUserInput = {
		id?: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string | null;
		access_token?: string | null;
		expires_at?: number | null;
		token_type?: string | null;
		scope?: string | null;
		id_token?: string | null;
		session_state?: string | null;
		refresh_token_expires_in?: number | null;
	};

	export type AccountCreateOrConnectWithoutUserInput = {
		where: AccountWhereUniqueInput;
		create: XOR<
			AccountCreateWithoutUserInput,
			AccountUncheckedCreateWithoutUserInput
		>;
	};

	export type AccountCreateManyUserInputEnvelope = {
		data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
		skipDuplicates?: boolean;
	};

	export type SessionCreateWithoutUserInput = {
		id?: string;
		sessionToken: string;
		expires: Date | string;
	};

	export type SessionUncheckedCreateWithoutUserInput = {
		id?: string;
		sessionToken: string;
		expires: Date | string;
	};

	export type SessionCreateOrConnectWithoutUserInput = {
		where: SessionWhereUniqueInput;
		create: XOR<
			SessionCreateWithoutUserInput,
			SessionUncheckedCreateWithoutUserInput
		>;
	};

	export type SessionCreateManyUserInputEnvelope = {
		data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
		skipDuplicates?: boolean;
	};

	export type AccountUpsertWithWhereUniqueWithoutUserInput = {
		where: AccountWhereUniqueInput;
		update: XOR<
			AccountUpdateWithoutUserInput,
			AccountUncheckedUpdateWithoutUserInput
		>;
		create: XOR<
			AccountCreateWithoutUserInput,
			AccountUncheckedCreateWithoutUserInput
		>;
	};

	export type AccountUpdateWithWhereUniqueWithoutUserInput = {
		where: AccountWhereUniqueInput;
		data: XOR<
			AccountUpdateWithoutUserInput,
			AccountUncheckedUpdateWithoutUserInput
		>;
	};

	export type AccountUpdateManyWithWhereWithoutUserInput = {
		where: AccountScalarWhereInput;
		data: XOR<
			AccountUpdateManyMutationInput,
			AccountUncheckedUpdateManyWithoutUserInput
		>;
	};

	export type AccountScalarWhereInput = {
		AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
		OR?: AccountScalarWhereInput[];
		NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
		id?: StringFilter<"Account"> | string;
		userId?: StringFilter<"Account"> | string;
		type?: StringFilter<"Account"> | string;
		provider?: StringFilter<"Account"> | string;
		providerAccountId?: StringFilter<"Account"> | string;
		refresh_token?: StringNullableFilter<"Account"> | string | null;
		access_token?: StringNullableFilter<"Account"> | string | null;
		expires_at?: IntNullableFilter<"Account"> | number | null;
		token_type?: StringNullableFilter<"Account"> | string | null;
		scope?: StringNullableFilter<"Account"> | string | null;
		id_token?: StringNullableFilter<"Account"> | string | null;
		session_state?: StringNullableFilter<"Account"> | string | null;
		refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null;
	};

	export type SessionUpsertWithWhereUniqueWithoutUserInput = {
		where: SessionWhereUniqueInput;
		update: XOR<
			SessionUpdateWithoutUserInput,
			SessionUncheckedUpdateWithoutUserInput
		>;
		create: XOR<
			SessionCreateWithoutUserInput,
			SessionUncheckedCreateWithoutUserInput
		>;
	};

	export type SessionUpdateWithWhereUniqueWithoutUserInput = {
		where: SessionWhereUniqueInput;
		data: XOR<
			SessionUpdateWithoutUserInput,
			SessionUncheckedUpdateWithoutUserInput
		>;
	};

	export type SessionUpdateManyWithWhereWithoutUserInput = {
		where: SessionScalarWhereInput;
		data: XOR<
			SessionUpdateManyMutationInput,
			SessionUncheckedUpdateManyWithoutUserInput
		>;
	};

	export type SessionScalarWhereInput = {
		AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
		OR?: SessionScalarWhereInput[];
		NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
		id?: StringFilter<"Session"> | string;
		sessionToken?: StringFilter<"Session"> | string;
		userId?: StringFilter<"Session"> | string;
		expires?: DateTimeFilter<"Session"> | Date | string;
	};

	export type DriverCreateWithoutBusInput = {
		name: string;
		phone: string;
		license_no: string;
	};

	export type DriverUncheckedCreateWithoutBusInput = {
		driver_id?: number;
		name: string;
		phone: string;
		license_no: string;
	};

	export type DriverCreateOrConnectWithoutBusInput = {
		where: DriverWhereUniqueInput;
		create: XOR<
			DriverCreateWithoutBusInput,
			DriverUncheckedCreateWithoutBusInput
		>;
	};

	export type ConductorCreateWithoutBusInput = {
		name: string;
		phone: string;
	};

	export type ConductorUncheckedCreateWithoutBusInput = {
		conductor_id?: number;
		name: string;
		phone: string;
	};

	export type ConductorCreateOrConnectWithoutBusInput = {
		where: ConductorWhereUniqueInput;
		create: XOR<
			ConductorCreateWithoutBusInput,
			ConductorUncheckedCreateWithoutBusInput
		>;
	};

	export type StudentPassCreateWithoutBusInput = {
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		stop: StopCreateNestedOneWithoutPassesInput;
	};

	export type StudentPassUncheckedCreateWithoutBusInput = {
		pass_id?: number;
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		stop_id: number;
	};

	export type StudentPassCreateOrConnectWithoutBusInput = {
		where: StudentPassWhereUniqueInput;
		create: XOR<
			StudentPassCreateWithoutBusInput,
			StudentPassUncheckedCreateWithoutBusInput
		>;
	};

	export type StudentPassCreateManyBusInputEnvelope = {
		data: StudentPassCreateManyBusInput | StudentPassCreateManyBusInput[];
		skipDuplicates?: boolean;
	};

	export type DriverUpsertWithoutBusInput = {
		update: XOR<
			DriverUpdateWithoutBusInput,
			DriverUncheckedUpdateWithoutBusInput
		>;
		create: XOR<
			DriverCreateWithoutBusInput,
			DriverUncheckedCreateWithoutBusInput
		>;
		where?: DriverWhereInput;
	};

	export type DriverUpdateToOneWithWhereWithoutBusInput = {
		where?: DriverWhereInput;
		data: XOR<
			DriverUpdateWithoutBusInput,
			DriverUncheckedUpdateWithoutBusInput
		>;
	};

	export type DriverUpdateWithoutBusInput = {
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		license_no?: StringFieldUpdateOperationsInput | string;
	};

	export type DriverUncheckedUpdateWithoutBusInput = {
		driver_id?: IntFieldUpdateOperationsInput | number;
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
		license_no?: StringFieldUpdateOperationsInput | string;
	};

	export type ConductorUpsertWithoutBusInput = {
		update: XOR<
			ConductorUpdateWithoutBusInput,
			ConductorUncheckedUpdateWithoutBusInput
		>;
		create: XOR<
			ConductorCreateWithoutBusInput,
			ConductorUncheckedCreateWithoutBusInput
		>;
		where?: ConductorWhereInput;
	};

	export type ConductorUpdateToOneWithWhereWithoutBusInput = {
		where?: ConductorWhereInput;
		data: XOR<
			ConductorUpdateWithoutBusInput,
			ConductorUncheckedUpdateWithoutBusInput
		>;
	};

	export type ConductorUpdateWithoutBusInput = {
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
	};

	export type ConductorUncheckedUpdateWithoutBusInput = {
		conductor_id?: IntFieldUpdateOperationsInput | number;
		name?: StringFieldUpdateOperationsInput | string;
		phone?: StringFieldUpdateOperationsInput | string;
	};

	export type StudentPassUpsertWithWhereUniqueWithoutBusInput = {
		where: StudentPassWhereUniqueInput;
		update: XOR<
			StudentPassUpdateWithoutBusInput,
			StudentPassUncheckedUpdateWithoutBusInput
		>;
		create: XOR<
			StudentPassCreateWithoutBusInput,
			StudentPassUncheckedCreateWithoutBusInput
		>;
	};

	export type StudentPassUpdateWithWhereUniqueWithoutBusInput = {
		where: StudentPassWhereUniqueInput;
		data: XOR<
			StudentPassUpdateWithoutBusInput,
			StudentPassUncheckedUpdateWithoutBusInput
		>;
	};

	export type StudentPassUpdateManyWithWhereWithoutBusInput = {
		where: StudentPassScalarWhereInput;
		data: XOR<
			StudentPassUpdateManyMutationInput,
			StudentPassUncheckedUpdateManyWithoutBusInput
		>;
	};

	export type StudentPassScalarWhereInput = {
		AND?: StudentPassScalarWhereInput | StudentPassScalarWhereInput[];
		OR?: StudentPassScalarWhereInput[];
		NOT?: StudentPassScalarWhereInput | StudentPassScalarWhereInput[];
		pass_id?: IntFilter<"StudentPass"> | number;
		issue_date?: DateTimeFilter<"StudentPass"> | Date | string;
		valid_till?: DateTimeFilter<"StudentPass"> | Date | string;
		amount?: FloatFilter<"StudentPass"> | number;
		bus_id?: IntFilter<"StudentPass"> | number;
		stop_id?: IntFilter<"StudentPass"> | number;
	};

	export type BusCreateWithoutDriverInput = {
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		conductor?: ConductorCreateNestedOneWithoutBusInput;
		passes?: StudentPassCreateNestedManyWithoutBusInput;
	};

	export type BusUncheckedCreateWithoutDriverInput = {
		bus_id?: number;
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		conductor?: ConductorUncheckedCreateNestedOneWithoutBusInput;
		passes?: StudentPassUncheckedCreateNestedManyWithoutBusInput;
	};

	export type BusCreateOrConnectWithoutDriverInput = {
		where: BusWhereUniqueInput;
		create: XOR<
			BusCreateWithoutDriverInput,
			BusUncheckedCreateWithoutDriverInput
		>;
	};

	export type BusUpsertWithoutDriverInput = {
		update: XOR<
			BusUpdateWithoutDriverInput,
			BusUncheckedUpdateWithoutDriverInput
		>;
		create: XOR<
			BusCreateWithoutDriverInput,
			BusUncheckedCreateWithoutDriverInput
		>;
		where?: BusWhereInput;
	};

	export type BusUpdateToOneWithWhereWithoutDriverInput = {
		where?: BusWhereInput;
		data: XOR<
			BusUpdateWithoutDriverInput,
			BusUncheckedUpdateWithoutDriverInput
		>;
	};

	export type BusUpdateWithoutDriverInput = {
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		conductor?: ConductorUpdateOneWithoutBusNestedInput;
		passes?: StudentPassUpdateManyWithoutBusNestedInput;
	};

	export type BusUncheckedUpdateWithoutDriverInput = {
		bus_id?: IntFieldUpdateOperationsInput | number;
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		conductor?: ConductorUncheckedUpdateOneWithoutBusNestedInput;
		passes?: StudentPassUncheckedUpdateManyWithoutBusNestedInput;
	};

	export type BusCreateWithoutConductorInput = {
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		driver?: DriverCreateNestedOneWithoutBusInput;
		passes?: StudentPassCreateNestedManyWithoutBusInput;
	};

	export type BusUncheckedCreateWithoutConductorInput = {
		bus_id?: number;
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		driver?: DriverUncheckedCreateNestedOneWithoutBusInput;
		passes?: StudentPassUncheckedCreateNestedManyWithoutBusInput;
	};

	export type BusCreateOrConnectWithoutConductorInput = {
		where: BusWhereUniqueInput;
		create: XOR<
			BusCreateWithoutConductorInput,
			BusUncheckedCreateWithoutConductorInput
		>;
	};

	export type BusUpsertWithoutConductorInput = {
		update: XOR<
			BusUpdateWithoutConductorInput,
			BusUncheckedUpdateWithoutConductorInput
		>;
		create: XOR<
			BusCreateWithoutConductorInput,
			BusUncheckedCreateWithoutConductorInput
		>;
		where?: BusWhereInput;
	};

	export type BusUpdateToOneWithWhereWithoutConductorInput = {
		where?: BusWhereInput;
		data: XOR<
			BusUpdateWithoutConductorInput,
			BusUncheckedUpdateWithoutConductorInput
		>;
	};

	export type BusUpdateWithoutConductorInput = {
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		driver?: DriverUpdateOneWithoutBusNestedInput;
		passes?: StudentPassUpdateManyWithoutBusNestedInput;
	};

	export type BusUncheckedUpdateWithoutConductorInput = {
		bus_id?: IntFieldUpdateOperationsInput | number;
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		driver?: DriverUncheckedUpdateOneWithoutBusNestedInput;
		passes?: StudentPassUncheckedUpdateManyWithoutBusNestedInput;
	};

	export type StudentPassCreateWithoutStopInput = {
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		bus: BusCreateNestedOneWithoutPassesInput;
	};

	export type StudentPassUncheckedCreateWithoutStopInput = {
		pass_id?: number;
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		bus_id: number;
	};

	export type StudentPassCreateOrConnectWithoutStopInput = {
		where: StudentPassWhereUniqueInput;
		create: XOR<
			StudentPassCreateWithoutStopInput,
			StudentPassUncheckedCreateWithoutStopInput
		>;
	};

	export type StudentPassCreateManyStopInputEnvelope = {
		data: StudentPassCreateManyStopInput | StudentPassCreateManyStopInput[];
		skipDuplicates?: boolean;
	};

	export type StudentPassUpsertWithWhereUniqueWithoutStopInput = {
		where: StudentPassWhereUniqueInput;
		update: XOR<
			StudentPassUpdateWithoutStopInput,
			StudentPassUncheckedUpdateWithoutStopInput
		>;
		create: XOR<
			StudentPassCreateWithoutStopInput,
			StudentPassUncheckedCreateWithoutStopInput
		>;
	};

	export type StudentPassUpdateWithWhereUniqueWithoutStopInput = {
		where: StudentPassWhereUniqueInput;
		data: XOR<
			StudentPassUpdateWithoutStopInput,
			StudentPassUncheckedUpdateWithoutStopInput
		>;
	};

	export type StudentPassUpdateManyWithWhereWithoutStopInput = {
		where: StudentPassScalarWhereInput;
		data: XOR<
			StudentPassUpdateManyMutationInput,
			StudentPassUncheckedUpdateManyWithoutStopInput
		>;
	};

	export type BusCreateWithoutPassesInput = {
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		driver?: DriverCreateNestedOneWithoutBusInput;
		conductor?: ConductorCreateNestedOneWithoutBusInput;
	};

	export type BusUncheckedCreateWithoutPassesInput = {
		bus_id?: number;
		bus_no: string;
		capacity: number;
		route_id: string;
		route_name: string;
		arrival_time: string;
		departure_time: string;
		driver?: DriverUncheckedCreateNestedOneWithoutBusInput;
		conductor?: ConductorUncheckedCreateNestedOneWithoutBusInput;
	};

	export type BusCreateOrConnectWithoutPassesInput = {
		where: BusWhereUniqueInput;
		create: XOR<
			BusCreateWithoutPassesInput,
			BusUncheckedCreateWithoutPassesInput
		>;
	};

	export type StopCreateWithoutPassesInput = {
		stop_name: string;
		area: string;
		distance_km: number;
	};

	export type StopUncheckedCreateWithoutPassesInput = {
		stop_id?: number;
		stop_name: string;
		area: string;
		distance_km: number;
	};

	export type StopCreateOrConnectWithoutPassesInput = {
		where: StopWhereUniqueInput;
		create: XOR<
			StopCreateWithoutPassesInput,
			StopUncheckedCreateWithoutPassesInput
		>;
	};

	export type BusUpsertWithoutPassesInput = {
		update: XOR<
			BusUpdateWithoutPassesInput,
			BusUncheckedUpdateWithoutPassesInput
		>;
		create: XOR<
			BusCreateWithoutPassesInput,
			BusUncheckedCreateWithoutPassesInput
		>;
		where?: BusWhereInput;
	};

	export type BusUpdateToOneWithWhereWithoutPassesInput = {
		where?: BusWhereInput;
		data: XOR<
			BusUpdateWithoutPassesInput,
			BusUncheckedUpdateWithoutPassesInput
		>;
	};

	export type BusUpdateWithoutPassesInput = {
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		driver?: DriverUpdateOneWithoutBusNestedInput;
		conductor?: ConductorUpdateOneWithoutBusNestedInput;
	};

	export type BusUncheckedUpdateWithoutPassesInput = {
		bus_id?: IntFieldUpdateOperationsInput | number;
		bus_no?: StringFieldUpdateOperationsInput | string;
		capacity?: IntFieldUpdateOperationsInput | number;
		route_id?: StringFieldUpdateOperationsInput | string;
		route_name?: StringFieldUpdateOperationsInput | string;
		arrival_time?: StringFieldUpdateOperationsInput | string;
		departure_time?: StringFieldUpdateOperationsInput | string;
		driver?: DriverUncheckedUpdateOneWithoutBusNestedInput;
		conductor?: ConductorUncheckedUpdateOneWithoutBusNestedInput;
	};

	export type StopUpsertWithoutPassesInput = {
		update: XOR<
			StopUpdateWithoutPassesInput,
			StopUncheckedUpdateWithoutPassesInput
		>;
		create: XOR<
			StopCreateWithoutPassesInput,
			StopUncheckedCreateWithoutPassesInput
		>;
		where?: StopWhereInput;
	};

	export type StopUpdateToOneWithWhereWithoutPassesInput = {
		where?: StopWhereInput;
		data: XOR<
			StopUpdateWithoutPassesInput,
			StopUncheckedUpdateWithoutPassesInput
		>;
	};

	export type StopUpdateWithoutPassesInput = {
		stop_name?: StringFieldUpdateOperationsInput | string;
		area?: StringFieldUpdateOperationsInput | string;
		distance_km?: FloatFieldUpdateOperationsInput | number;
	};

	export type StopUncheckedUpdateWithoutPassesInput = {
		stop_id?: IntFieldUpdateOperationsInput | number;
		stop_name?: StringFieldUpdateOperationsInput | string;
		area?: StringFieldUpdateOperationsInput | string;
		distance_km?: FloatFieldUpdateOperationsInput | number;
	};

	export type AccountCreateManyUserInput = {
		id?: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string | null;
		access_token?: string | null;
		expires_at?: number | null;
		token_type?: string | null;
		scope?: string | null;
		id_token?: string | null;
		session_state?: string | null;
		refresh_token_expires_in?: number | null;
	};

	export type SessionCreateManyUserInput = {
		id?: string;
		sessionToken: string;
		expires: Date | string;
	};

	export type AccountUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
	};

	export type AccountUncheckedUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
	};

	export type AccountUncheckedUpdateManyWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string;
		type?: StringFieldUpdateOperationsInput | string;
		provider?: StringFieldUpdateOperationsInput | string;
		providerAccountId?: StringFieldUpdateOperationsInput | string;
		refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
		access_token?: NullableStringFieldUpdateOperationsInput | string | null;
		expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
		token_type?: NullableStringFieldUpdateOperationsInput | string | null;
		scope?: NullableStringFieldUpdateOperationsInput | string | null;
		id_token?: NullableStringFieldUpdateOperationsInput | string | null;
		session_state?: NullableStringFieldUpdateOperationsInput | string | null;
		refresh_token_expires_in?:
			| NullableIntFieldUpdateOperationsInput
			| number
			| null;
	};

	export type SessionUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type SessionUncheckedUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type SessionUncheckedUpdateManyWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string;
		sessionToken?: StringFieldUpdateOperationsInput | string;
		expires?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type StudentPassCreateManyBusInput = {
		pass_id?: number;
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		stop_id: number;
	};

	export type StudentPassUpdateWithoutBusInput = {
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		stop?: StopUpdateOneRequiredWithoutPassesNestedInput;
	};

	export type StudentPassUncheckedUpdateWithoutBusInput = {
		pass_id?: IntFieldUpdateOperationsInput | number;
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		stop_id?: IntFieldUpdateOperationsInput | number;
	};

	export type StudentPassUncheckedUpdateManyWithoutBusInput = {
		pass_id?: IntFieldUpdateOperationsInput | number;
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		stop_id?: IntFieldUpdateOperationsInput | number;
	};

	export type StudentPassCreateManyStopInput = {
		pass_id?: number;
		issue_date: Date | string;
		valid_till: Date | string;
		amount: number;
		bus_id: number;
	};

	export type StudentPassUpdateWithoutStopInput = {
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		bus?: BusUpdateOneRequiredWithoutPassesNestedInput;
	};

	export type StudentPassUncheckedUpdateWithoutStopInput = {
		pass_id?: IntFieldUpdateOperationsInput | number;
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		bus_id?: IntFieldUpdateOperationsInput | number;
	};

	export type StudentPassUncheckedUpdateManyWithoutStopInput = {
		pass_id?: IntFieldUpdateOperationsInput | number;
		issue_date?: DateTimeFieldUpdateOperationsInput | Date | string;
		valid_till?: DateTimeFieldUpdateOperationsInput | Date | string;
		amount?: FloatFieldUpdateOperationsInput | number;
		bus_id?: IntFieldUpdateOperationsInput | number;
	};

	/**
	 * Batch Payload for updateMany & deleteMany & createMany
	 */

	export type BatchPayload = {
		count: number;
	};

	/**
	 * DMMF
	 */
	export const dmmf: runtime.BaseDMMF;
}
