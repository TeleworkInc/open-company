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
if (typeof goog === 'undefined') {
  const polyfill = {
    define: (n, v) => v,
  };

  if (typeof global !== 'undefined') global.goog = polyfill;
  else if (typeof window !== 'undefined') window.goog = polyfill;
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
