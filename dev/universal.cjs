'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @license MIT
 */
/**
 * @file
 * A test file.
 */

/** @ignore */
class TestA {
  /** @ignore */
  constructor() {
    console.log('Test A!');
  }
}
/** @ignore */
class TestB {
  /** @ignore */
  constructor() {
    console.log('Test B!');
  }
}

/* eslint-disable jsdoc/require-file-overview */
/* eslint-disable require-jsdoc */
class TestC {
  constructor() {
    console.log('Test C!');
  }
}

/* eslint-disable jsdoc/require-file-overview */
/* eslint-disable require-jsdoc */
class TestDefault {
  constructor() {
    console.log('Look out, we\'ve got a default over here!');
  }
}

/**
 * @license MIT
 */

const TEST_STRING = 'HELLO WORLD!';

/**
 * @license MIT
 */

console.log('Boom, a side effect!');

/**
 * @param {string} a
 * Test.
 */
// function test(a: String) {
//   console.log(a);
// }

// test('Hello world!');

exports.TEST_STRING = TEST_STRING;
exports.TestA = TestA;
exports.TestB = TestB;
exports.TestC = TestC;
exports.TestDefault = TestDefault;
