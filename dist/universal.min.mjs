/*
 MIT
*/
'use strict';class TestA{constructor(){console.log("Test A!")}}class TestB{constructor(){console.log("Test B!")}}class TestC{constructor(){console.log("Test C!")}}class TestDefault{constructor(){console.log("Look out, we've got a default over here!")}}const TEST_STRING="HELLO WORLD!";console.log("Boom, a side effect!");export{TEST_STRING,TestA,TestB,TestC,TestDefault};
