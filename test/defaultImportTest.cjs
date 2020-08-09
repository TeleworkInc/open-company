/**
 * @license MIT
 *
 * @fileoverview
 * Check that the default export is an object containing the named exports
 * (CJS).
 */

require('chai/register-expect');

const dev = require('../dev/node.cjs');
const { sayHello } = require('../dev/node.cjs');

describe('Default CJS import from [dev/node.cjs]', () => {
  it('should be non-null', () => {
    expect(dev).to.not.be.undefined;
  });
});

describe('Named CJS import from [dev/node.cjs]', () => {
  it('should be non-null', () => {
    expect(sayHello).to.not.be.undefined;
  });
});
