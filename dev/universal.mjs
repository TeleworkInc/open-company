/**
 * @license MIT
 */
/**
 * @fileoverview
 * Some global const strings we might need throughout our package.
 */

const TEST_STRING = 'HELLO WORLD!';

/**
 * @license MIT
 */

/**
 * This is a side effect that won't get removed due to dead code elimination.
 */
const a = 10;
console.log(`a is ${a}`);

export { TEST_STRING };
export default { TEST_STRING };
