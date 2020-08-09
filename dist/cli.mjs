#!/usr/bin/env node
/*
 MIT
*/
'use strict';import commander from"commander";const sayHello=(msg="Hello world!")=>console.log(msg);const commands={sayHello};commander.command("say-hello [msg]").description("Say hello, or provide a special message instead.").action(commands.sayHello);try{commander.exitOverride();commander.parse(process.argv)}catch(e){}export default{};
