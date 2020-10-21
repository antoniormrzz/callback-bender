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
