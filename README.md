# callback-bender

A utility package for converting different kinds of javascript callbacks into various promise types. You can wrap functions that work with callbacks into functions that return promises and can be used with async/await.

## About Project

Working with javascript can be frustrating for many reasons, one of them is the callback hell. In addition to callbacks making code uglier and longer, they also make it hard to work with promises or async/await. The goal of this project is to provide wrapper functions that transform these functions into functions that return native promises.

## Most Common Use Cases

When working with NodeJS, you will encounter many Node API functions that work with callbacks. for example, many if not all functions in the 'fs' module use EFC style callbacks. You can easily wrap these functions to return promises.

## Why Callback Bender?

*   Uses standard, friendly syntax
*   Supports both **Continuation Passing callbacks** (normal) and **Error-First callbacks** (**EFC** or **node** style)
*   Supports wrapping callbacks that accept multiple/single/no argument(s)
*   Is pretty small
*   Provides many module formats (lib folder)
*   Provides types and a typescript version (lib folder)
*   Is tested and passing all tests

## Callback Types

There are mainly two types of callbacks, CP and EFC.

### CP:

Continuation Passing callbacks are callbacks that do not accept errors (at least not as the first parameter).

```javascript
// API code:
function foo(a, b, cb){
    .
    .
    .
    cb(a+b);
}

// your code:
foo(1,2,(res)=>{...});
```

### EFC:

Error-First callbacks are callbacks that accept error as their first parameter, this style is most commonly used in NodeJS.

```javascript
// API code:
function foo(a, b, cb){
    .
    .
    .
    if(error){
    cb(error);
    }else{
    cb(undefined, a+b);
    }
}

// your code:
foo(1,2,(err, res)=>{
    if(err){
    ...
    } else {
    ...
    }
});
```

## Getting Started

### npm : 

**note: the default file in the package uses CommonJS (require style, mainly for node), if you need ES6 Module version (try this if in doubt) or .mjs or IIFE (var name is callback\_bender) please import or use files from lib folder!**

```
npm i callback-bender
```

### Format:

```
<bend.callback_type.return_count>

example: bend.cp.multiple(...)
		 bend.efc.none(...)
```

**note:** CP is aliased as normal e.g. bend.normal.none(...) , EFC is aliased as node e.g. bend.node.none(...)

### Why are there different versions of return types?

A callback can accept more than one argument, e.g. (a,b,c) => {} but async/await format expects one return to store in your variable,  e.g. let foo = await something(); This is why we need to use different wrappers for different callbacks.

<table><tbody><tr><td>Argument count</td><td>CP</td><td>EFC</td><td>What you Should Use</td><td>Resolves to</td><td>example (efc)</td></tr><tr><td>0</td><td>()</td><td>(err)</td><td>none</td><td>void</td><td>bend.<i>efc</i>.none(myfunction)(1,&nbsp;2,&nbsp;3).then(()&nbsp;=&gt;&nbsp;{...});</td></tr><tr><td>1</td><td>(res)</td><td>(err, res)</td><td>single</td><td>res</td><td>bend.<i>efc</i>.single(myfunction)(1,&nbsp;2,&nbsp;3).then((res)&nbsp;=&gt;&nbsp;{...});</td></tr><tr><td>more than 1</td><td>(res1, res2)</td><td>(err, res1, res2)</td><td>multiple</td><td>object (can be named)</td><td><p>bend.<i>efc</i>.multiple(myfunction)(1,&nbsp;2,&nbsp;3).then(({1:res1,2:res2})&nbsp;=&gt;&nbsp;{...});</p><p>bend.<i>efc</i>.multiple(myfunction,['first','second'])(1,&nbsp;2,&nbsp;3).then(({first:res1,second:res2})&nbsp;=&gt;&nbsp;{...});</p></td></tr></tbody></table>

Now that we covered the basics, let's see **some examples**:

### import:

from the default file in package:

```
const bend = require('callback_bender');
// import bend from 'callback_bender/lib/cb.es6'; for es6 or browser
// <script src="callback_bender/lib/cb.iife.js"></script> you should use callback_bender.efc.none etc
// .ts file and .mjs file are also in the lib folder
```

Let's say we have a function as follows:

```
function ugly(efc) {
      // some code that will at some point call your callback with error or result
    };
```

Normally we would use this function as follows:

```
ugly((err, res)=>{ 
	if(err){ 
	handleError(err);
	} else{
	doSomething(res);
	}
 });
```

The callback is an **error first callback**, and takes **one other argument**. so we should use .efc.single() or .node.single():

```
// async/await style
try{
const res = await bend.efc.single(ugly)();
doSomething(res);
}catch(err){
handleError(err);
}

// promise style
bend.efc.single(ugly)().then(res => { doSomething(res); }).catch(err => { handleError(err); };
```

Let's see an example of none and CP, the API function would probably be something like:

```
function ugly(a, b, c, cp) => {
 // please note that a, b, c are not what we count as argument counts
      // this function calls cb() with no arguments or throws an error
    };
```

Normally we would use this function as follows:

```
ugly(()=>{ doSomething(); });
```

The callback is a **normal callback**, or **CP**, ( you can note that there is **no error checking in callback** ), and takes **zero arguments**. so we should use .cp.none() or .normal.none():

```
// async/await style
try{
await (bend.cp.none(ugly)(a,b,c,d));
doSomething();
}catch(err){ // the function might throw, so it's better to check
handleError(err);
}

// promise style
bend.cp.none(ugly)(a,b,c,d).then(() => { doSomething(); }).catch(err => { handleError(err); };
```

Let's see an example of multiple and efc, the API function would probably be something like:

```
function ugly(..., efc) {
 // function takes a callback
      // at some point the function will either call efc(err) or efc(undefined, res1, res2) so this callback will get more than one results
    };
```

Normally we would use this function as follows:

```
ugly((err, res1, res2)=>{ 
	if(err){ 
	handleError(err);
	} else{
	doSomething(res1);
	doStuff(res2);
	}
 });
```

The callback is an **error first callback**, and takes **more than** **one argument (error doesn't count)**. so we should use .efc.multiple() or .node.multiple():

```
// async/await style
try{
const obj = await bend.efc.multiple(ugly)();
doSomething(obj[1]); 
doStuff(obj[2]);
}catch(err){
handleError(err);
}

// promise style
bend.efc.multiple(ugly)().then(obj => { doSomething(obj[1]); doStuff(obj[2]); }).catch(err => { handleError(err); };
```

### Naming the .multiple object:

In the previous example, we can name the parameters on the object, by supplying an **optional string array**:

```
// async/await style
try{
const obj = await bend.efc.multiple(ugly,['first','second'])();
doSomething(obj.first); 
doStuff(obj.second);
}catch(err){
handleError(err);
}

// promise style
bend.efc.multiple(ugly,['first','second'])().then(obj => { doSomething(obj.first); doStuff(obj.second); }).catch(err => { handleError(err); };
```
