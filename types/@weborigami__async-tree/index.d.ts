/**
 * Type declarations for @weborigami/async-tree v0.6.15
 *
 * The package ships an index.ts that re-exports from .js files with JSDoc
 * annotations, but TypeScript can't follow those imports in node_modules.
 * This file provides the full type surface as an ambient module declaration.
 */
declare module "@weborigami/async-tree" {
  // ---------------------------------------------------------------------------
  // Type aliases (from index.ts)
  // ---------------------------------------------------------------------------

  export type Invocable = Function | Maplike | Unpackable;

  export type KeyFn = (key: any, map: SyncOrAsyncMap) => any;

  export type HasString = {
    toString(): string;
  };

  export type MapExtensionOptions = {
    deep?: boolean;
    description?: string;
    extension?: string;
    needsSourceValue?: boolean;
    value?: ValueKeyFn;
  };

  export type Maplike =
    | any[]
    | Iterator<any>
    | Function
    | SyncOrAsyncMap
    | PlainObject
    | Set<any>;

  export type MapOptions = {
    deep?: boolean;
    description?: string;
    extension?: string;
    inverseKey?: KeyFn;
    key?: ValueKeyFn;
    keyNeedsSourceValue?: boolean;
    value?: ValueKeyFn;
  };

  export interface SyncTree<MapType> {
    child(key: any): MapType;
    parent: MapType | null;
    trailingSlashKeys: boolean;
  }

  export interface AsyncTree<MapType> {
    child(key: any): Promise<MapType>;
    parent: MapType | null;
    trailingSlashKeys: boolean;
  }

  export type Packed = (
    | ArrayBuffer
    | Buffer
    | ReadableStream
    | string
    | String
    | TypedArray
  ) & {
    parent?: SyncOrAsyncMap | null;
    unpack?(): Promise<any>;
  };

  export type PlainObject = {
    [key: string]: any;
  };

  export type ReduceFn = (
    mapped: Map<any, any>,
    source: SyncOrAsyncMap,
  ) => any | Promise<any>;

  export type Stringlike = string | HasString;

  export type SyncOrAsyncMap = Map<any, any> | AsyncMap;

  export type TypedArray =
    | Float32Array
    | Float64Array
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array;

  export type Unpackable = {
    unpack(): Promise<any>;
  };

  export type UnpackFunction = (input: Packed, options?: any) => any;

  export type ValueKeyFn = (value: any, key: any, map: SyncOrAsyncMap) => any;

  // ---------------------------------------------------------------------------
  // Classes
  // ---------------------------------------------------------------------------

  export class AsyncMap {
    _parent: AsyncMap | null;
    trailingSlashKeys: boolean;

    [Symbol.asyncIterator](): AsyncIterableIterator<[any, any]>;
    child(key: any): Promise<AsyncMap>;
    clear(): Promise<void>;
    delete(key: any): Promise<boolean>;
    entries(): AsyncIterableIterator<[any, any]>;
    forEach(
      callback: (value: any, key: any, thisArg: any) => Promise<void>,
      thisArg?: any,
    ): Promise<void>;
    get(key: any): Promise<any>;
    getOrInsert(key: any, defaultValue: any): Promise<any>;
    getOrInsertComputed(key: any, defaultValueFn: () => any): Promise<any>;
    has(key: any): Promise<boolean>;
    keys(): AsyncIterableIterator<any>;
    get parent(): AsyncMap | null;
    set parent(parent: AsyncMap | null);
    get readOnly(): boolean;
    set(key: any, value: any): Promise<AsyncMap>;
    get size(): Promise<number>;
    values(): AsyncIterableIterator<any>;

    static groupBy(
      iterable: Iterable<any> | AsyncIterable<any>,
      keyFn: (element: any, index: any) => Promise<any>,
    ): Promise<Map<any, any>>;
  }

  export class SyncMap extends Map<any, any> {
    trailingSlashKeys: boolean;

    constructor(iterable?: Iterable<[any, any]>);
    child(key: any): SyncMap;
    clear(): void;
    delete(key: any): boolean;
    entries(): IterableIterator<[any, any]>;
    forEach(
      callback: (value: any, key: any, thisArg: any) => void,
      thisArg?: any,
    ): void;
    get(key: any): any;
    getOrInsert(key: any, defaultValue: any): any;
    getOrInsertComputed(key: any, defaultValueFn: () => any): any;
    has(key: any): boolean;
    keys(): IterableIterator<any>;
    get parent(): SyncMap | null;
    set parent(parent: SyncMap | null);
    get readOnly(): boolean;
    set(key: any, value: any): this;
    get size(): number;
    [Symbol.iterator](): IterableIterator<[any, any]>;
    values(): IterableIterator<any>;
  }

  export class FileMap extends SyncMap {
    dirname: string;
    trailingSlashKeys: boolean;

    constructor(location: string | URL);
    child(key: any): FileMap;
    delete(key: any): boolean;
    get(key: any): any;
    keys(): IterableIterator<string>;
    get path(): string;
    set(key: any, value: any): this;
  }

  export class ObjectMap extends SyncMap {
    object: any;
    deep: boolean;
    trailingSlashKeys: boolean;

    constructor(object?: any, options?: { deep?: boolean });
    delete(key: any): boolean;
    get(key: any): any;
    isSubtree(value: any): boolean;
    keys(): IterableIterator<any>;
    set(key: any, value: any): this;
  }

  export class FunctionMap extends SyncMap {
    fn: Function;
    domain: any[];

    constructor(fn: Function, domain?: any[]);
    get(key: any): any;
    keys(): IterableIterator<any>;
  }

  export class SiteMap extends AsyncMap {
    href: string;
    trailingSlashKeys: boolean;

    constructor(href?: string);
    get(key: any): Promise<ArrayBuffer | string | undefined>;
    keys(): AsyncIterableIterator<string>;
    get path(): string;
    processResponse(
      response: Response,
    ): Promise<string> | Promise<ArrayBuffer> | undefined;
    get url(): URL;

    static mediaTypeIsText(mediaType: string): boolean;
  }

  export class ExplorableSiteMap extends SiteMap {
    trailingSlashKeys: boolean;

    constructor(href: string);
    getServerKeys(): Promise<string[]>;
    keys(): AsyncIterableIterator<string>;
    processResponse(response: Response): any;
  }

  export class SetMap extends SyncMap {
    constructor(set: Set<any>);
  }

  export class CalendarMap extends SyncMap {
    constructor(options?: {
      end?: string;
      start?: string;
      value?: (year: string, month: string, day: string) => any;
    });
    get(year: any): SyncMap | undefined;
    inRange(year: number): boolean;
    keys(): IterableIterator<number>;
  }

  export class ConstantMap extends SyncMap {
    trailingSlashKeys: boolean;

    constructor(constant: any);
    get(key: any): any;
    keys(): IterableIterator<never>;
  }

  export class TraverseError extends Error {
    name: string;
    cause: any;
    head: any;
    lastValue: any;
    keys: any;
    position: any;

    constructor(
      message: string,
      options?: {
        cause?: any;
        head?: any;
        lastValue?: any;
        keys?: any;
        position?: any;
      },
    );
  }

  // Deprecated alias classes
  /** @deprecated Use ObjectMap with { deep: true } instead */
  export class DeepObjectMap extends ObjectMap {
    constructor(object: any);
  }
  /** @deprecated Use ObjectMap instead */
  export class ObjectTree extends ObjectMap {
    constructor(...args: any[]);
  }
  /** @deprecated Use ObjectMap with { deep: true } instead */
  export class DeepObjectTree extends ObjectMap {
    constructor(object: any);
  }
  /** @deprecated Use ExplorableSiteMap instead */
  export class ExplorableSiteTree extends ExplorableSiteMap {
    constructor(href: string);
  }
  /** @deprecated Use FileMap instead */
  export class FileTree extends FileMap {
    constructor(...args: any[]);
  }
  /** @deprecated Use FunctionMap instead */
  export class FunctionTree extends FunctionMap {
    constructor(...args: any[]);
  }
  /** @deprecated Use SetMap instead */
  export class SetTree extends SetMap {
    constructor(set: Set<any>);
  }
  /** @deprecated Use SiteMap instead */
  export class SiteTree extends SiteMap {
    constructor(...args: any[]);
  }

  // ---------------------------------------------------------------------------
  // Tree namespace (operations from src/Tree.js)
  // ---------------------------------------------------------------------------

  export namespace Tree {
    // Core CRUD
    function assign(
      target: Maplike,
      source: Maplike,
    ): Promise<Map<any, any> | AsyncMap>;
    function clear(maplike: Maplike): Promise<Map<any, any> | AsyncMap>;
    function child(maplike: Maplike, key: any): Promise<any>;
    function set(maplike: Maplike, key: any, value: any): Promise<undefined>;

    // Accessors
    function entries(maplike: Maplike): Promise<Array<[any, any]>>;
    function first(maplike: Maplike): Promise<any>;
    function from(
      object: Maplike | object,
      options?: {
        deep?: boolean;
        parent?: Map<any, any> | AsyncMap | null;
      },
    ): Map<any, any> | AsyncMap;
    function has(maplike: Maplike, key: any): Promise<boolean>;
    function keys(maplike: Maplike): Promise<any[]>;
    function parent(maplike: Maplike): Promise<any>;
    function root(maplike: Maplike): Promise<any>;
    function size(maplike: Maplike): Promise<number>;
    function values(maplike: Maplike): Promise<any[]>;
    /** @deprecated Use size instead */
    function length(maplike: Maplike): Promise<number>;

    // Traversal
    function traverse(maplike: Maplike, ...keys: any[]): Promise<any>;
    function traverseOrThrow(maplike: Maplike, ...keys: any[]): Promise<any>;
    function traversePath(maplike: Maplike, path: string): Promise<any>;
    function forEach(
      maplike: Maplike,
      callbackFn: (value: any, key: any, map: any) => void,
    ): Promise<void>;
    function visit(source: Maplike): Promise<undefined>;

    // Transforms
    function map(
      maplike: Maplike,
      options: MapOptions | ValueKeyFn,
    ): Promise<AsyncMap>;
    function mapExtension(
      maplike: Maplike,
      arg2: string | MapExtensionOptions,
      arg3?: ValueKeyFn | MapExtensionOptions,
    ): Promise<AsyncMap>;
    function deepMap(
      maplike: Maplike,
      options: ValueKeyFn | MapOptions,
    ): Promise<AsyncMap>;
    function filter(
      maplike: Maplike,
      options:
        | ((value: any, key: any, map: any) => any)
        | { test: Function; deep?: boolean },
    ): Promise<AsyncMap>;
    function sort(
      maplike: Maplike,
      options?:
        | {
            compare?: (a: any, b: any) => number;
            sortKey?: ValueKeyFn;
          }
        | ValueKeyFn,
    ): Promise<AsyncMap>;
    function reverse(maplike: Maplike): Promise<AsyncMap>;
    function deepReverse(maplike: Maplike): Promise<AsyncMap>;
    function take(maplike: Maplike, count: number): Promise<AsyncMap>;
    function deepTake(
      maplike: Maplike,
      count: number,
    ): Promise<Map<any, any> | AsyncMap>;
    function shuffle(maplike: Maplike, reshuffle?: boolean): Promise<AsyncMap>;
    function addNextPrevious(maplike: Maplike): Promise<AsyncMap>;
    function withKeys(
      maplike: Maplike,
      keysMaplike: Maplike,
    ): Promise<AsyncMap>;
    function invokeFunctions(maplike: Maplike): Promise<AsyncMap>;

    // Merging / Combining
    function merge(...treelikes: Maplike[]): Promise<any>;
    function deepMerge(...maplikes: Maplike[]): Promise<AsyncMap>;
    function concat(...trees: (Maplike | null)[]): Promise<any[] | SyncMap>;
    function mask(aMaplike: Maplike, bMaplike: Maplike): Promise<AsyncMap>;

    // Deep operations
    function deepArrays(maplike: Maplike): Promise<Array<[any, any]>>;
    function deepEntries(maplike: Maplike): Promise<Array<[any, any]>>;
    function deepEntriesIterator(
      maplike: Maplike,
      options?: { depth?: number; expand?: boolean },
    ): AsyncGenerator<[any, any], void, undefined>;
    function deepValues(
      maplike: Maplike,
      options?: { expand?: boolean },
    ): Promise<any[]>;
    function deepValuesIterator(
      maplike: Maplike,
      options?: { depth?: number; expand?: boolean },
    ): AsyncGenerator<any, void, undefined>;
    function deepText(maplike: Maplike): Promise<string>;

    // Serialization / Conversion
    function json(maplike: Maplike): Promise<string>;
    function plain(maplike: Maplike): Promise<any>;
    function sync(source: Maplike): Promise<any>;
    function toFunction(maplike: Maplike): Promise<Function>;
    function text(
      strings: TemplateStringsArray,
      ...values: any[]
    ): Promise<string>;
    function indent(
      strings: TemplateStringsArray,
      ...values: any[]
    ): Promise<string>;

    // Structural
    function flat(maplike: Maplike, depth?: number): Promise<any[] | SyncMap>;
    function inners(maplike: Maplike): Promise<AsyncMap>;
    function paginate(maplike: Maplike, size?: number): Promise<AsyncMap>;
    function paths(
      maplike: Maplike,
      options?: { base?: string },
    ): Promise<string[]>;
    function deflatePaths(
      maplike: Maplike,
      basePath?: string,
    ): Promise<SyncMap>;
    function inflatePaths(maplike: Maplike): Promise<SyncMap>;
    function groupBy(
      maplike: Maplike,
      groupKeyFn: ValueKeyFn,
    ): Promise<SyncMap>;
    /** @deprecated Use groupBy instead */
    function group(maplike: Maplike, groupKeyFn: ValueKeyFn): Promise<SyncMap>;

    // Caching
    function cache(
      sourceMaplike: Maplike,
      cacheMaplike?: Maplike,
    ): Promise<SyncMap | AsyncMap>;

    // Pattern matching
    function match(
      pattern: string | RegExp,
      resultFn: Invocable,
      keys?: Maplike,
    ): AsyncMap;
    function globKeys(maplike: Maplike): Promise<AsyncMap>;
    function regExpKeys(maplike: Maplike): Promise<AsyncMap>;

    // Map/Reduce
    function reduce(maplike: Maplike, reduceFn: ReduceFn): Promise<any>;
    function mapReduce(
      source: Maplike,
      valueFn: ValueKeyFn | null,
      reduceFn: ReduceFn,
    ): Promise<any>;
    function scope(maplike: Maplike): Promise<AsyncMap>;

    // Calendar / Constants
    function calendar(...args: any[]): CalendarMap;
    function constant(value: any): ConstantMap;

    // Type checks
    function isMap(object: any): object is Map<any, any> | AsyncMap;
    function isMaplike(object: any): object is Maplike;
    function isReadOnlyMap(object: any): boolean;
    function isTraversable(object: any): boolean;
    /** @deprecated */
    function isAsyncTree(treelike: any): boolean;
    /** @deprecated */
    function isAsyncMutableTree(treelike: any): boolean;
    /** @deprecated */
    function isTreelike(treelike: any): boolean;
  }

  // ---------------------------------------------------------------------------
  // Namespace exports
  // ---------------------------------------------------------------------------

  export namespace extension {
    function extname(path: string): string;
    function match(key: any, ext: string): string | null;
    function replace(
      key: string,
      sourceExtension: string,
      resultExtension: string,
    ): string | null;
  }

  export namespace jsonKeys {
    function stringify(maplike: Maplike): Promise<string>;
  }

  export namespace symbols {
    const async: unique symbol;
    const deep: unique symbol;
    const keys: unique symbol;
    const parent: unique symbol;
  }

  export namespace trailingSlash {
    function add(key: any): any;
    function has(key: any): boolean;
    function remove(key: any): any;
    function toggle(key: any, force?: boolean): any;
  }

  export namespace args {
    function fn(
      arg: any,
      operation: string,
      options?: { position?: number },
    ): Function;
    function invocable(
      arg: Invocable,
      operation: string,
      options?: { position?: number },
    ): Function;
    function map(
      arg: Maplike | Unpackable,
      operation: string,
      options?: { deep?: boolean; position?: number },
    ): Promise<Map<any, any> | AsyncMap>;
    function number(
      arg: number,
      operation: string,
      options?: { position?: number },
    ): number;
    function string(
      arg: string,
      operation: string,
      options?: { position?: number },
    ): string;
    function stringlike(
      arg: Stringlike,
      operation: string,
      options?: { position?: number },
    ): string;
  }

  // ---------------------------------------------------------------------------
  // Utility function exports
  // ---------------------------------------------------------------------------

  export function reduce(maplike: Maplike, reduceFn: ReduceFn): Promise<any>;

  export function scope(maplike: Maplike): Promise<AsyncMap>;

  export function box(value: any): any;

  export function castArraylike(
    map: Map<any, any>,
    createFn?: (map: Map<any, any>) => any,
  ): any[] | object;

  export function getParent(
    packed: any,
    options?: { parent?: any },
  ): SyncOrAsyncMap | null;

  export function getRealmObjectPrototype(object: any): any | null;

  export const interop: {
    warn(...args: any[]): void;
  };

  export function isPacked(obj: any): obj is Packed;
  export function isPlainObject(obj: any): obj is PlainObject;
  export function isPrimitive(value: any): boolean;
  export function isStringlike(object: any): object is Stringlike;
  export function isUnpackable(obj: any): obj is Unpackable;

  export function keysFromPath(pathname: string): string[];
  export const naturalOrder: (a: string, b: string) => number;
  export function pathFromKeys(keys: string[]): string;
  export function setParent(child: any, parent: any): void;
  export function toPlainValue(input: any, reduceFn?: ReduceFn): Promise<any>;
  export function toString(object: any): string | null;
}
