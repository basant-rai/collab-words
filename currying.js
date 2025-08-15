const curryUnaryFunction = (a) => (b) => (c) => a + b + c;

console.log(curryUnaryFunction(1));       // Returns: function (b) => ...
console.log(curryUnaryFunction(1)(2));    // Returns: function (c) => ...
console.log(curryUnaryFunction(1)(2)(3)); // Output: 6

// IIFE (Immediately Invoked Function Expression)
// RUN AS SOON AS IT IS DEFINED
(function () {
  var message = "IIFE";
  console.log(message);
})();


// unary function

// pure function: Does not change the struct of prev var eg:slice
// Impure function: DOes change the struct of prev and give eg: splice


const memoizeAddition = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Here, cache.value cannot be used as property name starts with the number which is not a valid JavaScript  identifier. Hence, can only be accessed using the square bracket notation.
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};
// returned function from memoizeAddition
const addition = memoizeAddition();
console.log(addition(20)); //output: 40 calculated
console.log(addition(20)); //output: 40 cached