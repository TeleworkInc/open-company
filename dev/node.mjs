/**
 * @license MIT
 */
/**
 * @fileoverview
 * Specify the commands for this project's CLI.
 */

/**
 * Say hello!
 *
 * @param {string} msg
 * The message to print.
 *
 * @return {void}
 */
const sayHello = (msg = 'Hello world!') => console.log(msg);

export { sayHello };
export default { sayHello };
