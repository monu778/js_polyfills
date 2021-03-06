const modu = {
    x: 42,
    getX: function() {
      return this.x;
    }
  }
  
  const unboundGetX = modu.getX;
  console.log(unboundGetX()); // The function gets invoked at the global scope
  // expected output: undefined
  
  const boundGetX = unboundGetX.bind(modu);
  console.log(boundGetX());

polyfill for bind for function

// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
