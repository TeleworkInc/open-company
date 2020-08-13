/**
 * @license MIT
 *
 * @fileoverview
 * Test ESM imports for this project.
 */

import 'chai/register-expect.js';
import * as thisPackage from '../dist/node.mjs';

import * as devCli from '../dev/cli.mjs';
import * as distCli from '../dist/cli.mjs';

import * as devNode from '../dev/node.mjs';
import * as distNode from '../dist/node.mjs';

import * as devUniversal from '../dev/universal.mjs';
import * as distUniversal from '../dist/universal.mjs';

describe('ESM import', () => {
  it('should import this package', () => {
    expect(thisPackage.sayHello).to.be.a('function');
  });

  it('should import the uncompiled module [dev/node.mjs]', () => {
    expect(devNode.sayHello).to.be.a('function');
  });

  it('should import the compiled module [dist/node.mjs]', () => {
    expect(distNode.sayHello).to.be.a('function');
  });

  it('should not fail for uncompiled ESM [dev/cli.mjs]', () => {
    expect(() => devCli).to.not.throw();
  });

  it('should not fail for compiled ESM [dist/cli.mjs]', () => {
    expect(() => distCli).to.not.throw();
  });

  it('should import test classes from [dev/universal.mjs]', () => {
    expect(devUniversal.TEST_STRING).to.not.be.undefined;
  });

  it('should import test classes from [dist/universal.mjs]', () => {
    expect(distUniversal.TEST_STRING).to.not.be.undefined;
  });
});
