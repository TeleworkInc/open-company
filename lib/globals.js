/**
 * @license MIT
 */
/**
 * @fileoverview
 * Some global const strings we might need throughout our package.
 */


/**
 * Override `goog` global when run outside of compiler.
 */
if (
  typeof goog === 'undefined' &&
  /** Use global for Node, window for browser. */
  (typeof global !== 'undefined' || typeof window !== 'undefined')
) {
  (window || global).goog = {
    define: (n, v) => v,
  };
}

/**
 * Compiler-level constant that informs CC whether or not to rename tag names.
 * Override in Closure Compiler with `--define='PRODUCTION=true'`.
 *
 * @define {boolean}
 */
export var PRODUCTION = goog.define('PRODUCTION', false);

/**
 * Whether or not to log debug messages. Compiler overrides to false.
 *
 * @define {boolean}
 */
export var DEBUG = goog.define('DEBUG', true);
