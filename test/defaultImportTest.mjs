/**
 * @license MIT
 *
 * @fileoverview
 * Check that the default export is an object containing the named exports
 * (ESM).
 */

import 'chai/register-expect.js';
import devNode from '../dev/node.mjs';
import { sayHello } from '../dev/node.mjs';

describe('Default ESM import from [dev/node.mjs]', () => {
  it('should be non-null', () => {
    expect(devNode).to.not.be.undefined;
  });
});

describe('Named ESM import from [dev/node.mjs]', () => {
  it('should be non-null', () => {
    expect(sayHello).to.not.be.undefined;
  });
});
