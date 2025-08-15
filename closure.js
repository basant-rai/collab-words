/**
 * 
 *  closures are often used in event handlers and callbacks to maintain state or access variables that were in scope when  the handler or callback was defined 
 * @returns 
 */
function calculation(...args) {

  console.log("👀 ~ calculation ~ args:", args)
  return function sum() {
    return args.reduce((a, b) => a + b, 0)
    // console.log(a + b)
  }
}

const sum = calculation(1, 10, 64)
console.log("👀 ~ sum:", sum())
// sum()


/*
Why use closures?
Using closures provide the following benefits:

Data encapsulation: Closures provide a way to create private variables and functions that can't be accessed from outside the closure. This is useful for hiding implementation details and maintaining state in an encapsulated way.
Functional programming: Closures are fundamental in functional programming paradigms, where they are used to create functions that can be passed around and invoked later, retaining access to the scope in which they were created, e.g. partial applications or currying.
Event handlers and callbacks: In JavaScript, closures are often used in event handlers and callbacks to maintain state or access variables that were in scope when the handler or callback was defined.
Module patterns: Closures enable the module pattern in JavaScript, allowing the creation of modules with private and public parts.
 */