var SkybondsComponents =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	if (!exports.React) {
	  exports.React = __webpack_require__(1);
	}
	if (!exports.ReactDOM) {
	  exports.ReactDOM = __webpack_require__(2);
	}
	if (!exports.rsvp) {
	  exports.rsvp = __webpack_require__(3);
	}
	if (!exports.Chart) {
	  exports.Chart = __webpack_require__(8);
	}
	if (!exports.ChartDocument) {
	  exports.ChartDocument = __webpack_require__(9);
	}
	if (!exports.Plugin) {
	  exports.Plugin = __webpack_require__(32);
	}
	if (!exports.DotsSetsPlugin) {
	  exports.DotsSetsPlugin = __webpack_require__(31);
	}
	if (!exports.TimeSeriesPlugin) {
	  exports.TimeSeriesPlugin = __webpack_require__(82);
	}
	if (!exports.CurvesPlugin) {
	  exports.CurvesPlugin = __webpack_require__(60);
	}
	if (!exports.SpreadsPlugin) {
	  exports.SpreadsPlugin = __webpack_require__(79);
	}
	if (!exports.DebugBoxesPlugin) {
	  exports.DebugBoxesPlugin = __webpack_require__(88);
	}
	if (!exports.DotCurveSpreadPlugin) {
	  exports.DotCurveSpreadPlugin = __webpack_require__(99);
	}
	if (!exports.DotCurveSpreadsPlugin) {
	  exports.DotCurveSpreadsPlugin = __webpack_require__(99);
	}
	if (!exports.ValueScannerPlugin) {
	  exports.ValueScannerPlugin = __webpack_require__(102);
	}
	if (!exports.FunctionCurvePlugin) {
	  exports.FunctionCurvePlugin = __webpack_require__(106);
	}
	if (!exports.CurrentValuePlugin) {
	  exports.CurrentValuePlugin = __webpack_require__(109);
	}
	if (!exports.RatingColorGenerator) {
	  exports.RatingColorGenerator = __webpack_require__(65);
	}
	if (!exports.CategoryColorGenerator) {
	  exports.CategoryColorGenerator = __webpack_require__(111);
	}
	if (!exports.ChartDevPage) {
	  exports.ChartDevPage = __webpack_require__(112);
	}
	if (!exports.BondDotAlone) {
	  exports.BondDotAlone = __webpack_require__(138);
	}
	if (!exports.React) {
	  exports.React = __webpack_require__(1);
	}
	if (!exports.ReactDOM) {
	  exports.ReactDOM = __webpack_require__(2);
	}
	if (!exports.Popup) {
	  exports.Popup = __webpack_require__(140);
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	}();

	;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDom;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {/*!
	 * @overview RSVP - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2016 Yehuda Katz, Tom Dale, Stefan Penner and contributors
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
	 * @version   3.3.3
	 */

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.RSVP = global.RSVP || {})));
	}(this, (function (exports) { 'use strict';

	function indexOf(callbacks, callback) {
	  for (var i = 0, l = callbacks.length; i < l; i++) {
	    if (callbacks[i] === callback) {
	      return i;
	    }
	  }

	  return -1;
	}

	function callbacksFor(object) {
	  var callbacks = object._promiseCallbacks;

	  if (!callbacks) {
	    callbacks = object._promiseCallbacks = {};
	  }

	  return callbacks;
	}

	/**
	  @class RSVP.EventTarget
	*/
	var EventTarget = {

	  /**
	    `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
	    Example:
	     ```javascript
	    let object = {};
	     RSVP.EventTarget.mixin(object);
	     object.on('finished', function(event) {
	      // handle event
	    });
	     object.trigger('finished', { detail: value });
	    ```
	     `EventTarget.mixin` also works with prototypes:
	     ```javascript
	    let Person = function() {};
	    RSVP.EventTarget.mixin(Person.prototype);
	     let yehuda = new Person();
	    let tom = new Person();
	     yehuda.on('poke', function(event) {
	      console.log('Yehuda says OW');
	    });
	     tom.on('poke', function(event) {
	      console.log('Tom says OW');
	    });
	     yehuda.trigger('poke');
	    tom.trigger('poke');
	    ```
	     @method mixin
	    @for RSVP.EventTarget
	    @private
	    @param {Object} object object to extend with EventTarget methods
	  */
	  mixin: function mixin(object) {
	    object['on'] = this['on'];
	    object['off'] = this['off'];
	    object['trigger'] = this['trigger'];
	    object._promiseCallbacks = undefined;
	    return object;
	  },

	  /**
	    Registers a callback to be executed when `eventName` is triggered
	     ```javascript
	    object.on('event', function(eventInfo){
	      // handle the event
	    });
	     object.trigger('event');
	    ```
	     @method on
	    @for RSVP.EventTarget
	    @private
	    @param {String} eventName name of the event to listen for
	    @param {Function} callback function to be called when the event is triggered.
	  */
	  on: function on(eventName, callback) {
	    if (typeof callback !== 'function') {
	      throw new TypeError('Callback must be a function');
	    }

	    var allCallbacks = callbacksFor(this),
	        callbacks = undefined;

	    callbacks = allCallbacks[eventName];

	    if (!callbacks) {
	      callbacks = allCallbacks[eventName] = [];
	    }

	    if (indexOf(callbacks, callback) === -1) {
	      callbacks.push(callback);
	    }
	  },

	  /**
	    You can use `off` to stop firing a particular callback for an event:
	     ```javascript
	    function doStuff() { // do stuff! }
	    object.on('stuff', doStuff);
	     object.trigger('stuff'); // doStuff will be called
	     // Unregister ONLY the doStuff callback
	    object.off('stuff', doStuff);
	    object.trigger('stuff'); // doStuff will NOT be called
	    ```
	     If you don't pass a `callback` argument to `off`, ALL callbacks for the
	    event will not be executed when the event fires. For example:
	     ```javascript
	    let callback1 = function(){};
	    let callback2 = function(){};
	     object.on('stuff', callback1);
	    object.on('stuff', callback2);
	     object.trigger('stuff'); // callback1 and callback2 will be executed.
	     object.off('stuff');
	    object.trigger('stuff'); // callback1 and callback2 will not be executed!
	    ```
	     @method off
	    @for RSVP.EventTarget
	    @private
	    @param {String} eventName event to stop listening to
	    @param {Function} callback optional argument. If given, only the function
	    given will be removed from the event's callback queue. If no `callback`
	    argument is given, all callbacks will be removed from the event's callback
	    queue.
	  */
	  off: function off(eventName, callback) {
	    var allCallbacks = callbacksFor(this),
	        callbacks = undefined,
	        index = undefined;

	    if (!callback) {
	      allCallbacks[eventName] = [];
	      return;
	    }

	    callbacks = allCallbacks[eventName];

	    index = indexOf(callbacks, callback);

	    if (index !== -1) {
	      callbacks.splice(index, 1);
	    }
	  },

	  /**
	    Use `trigger` to fire custom events. For example:
	     ```javascript
	    object.on('foo', function(){
	      console.log('foo event happened!');
	    });
	    object.trigger('foo');
	    // 'foo event happened!' logged to the console
	    ```
	     You can also pass a value as a second argument to `trigger` that will be
	    passed as an argument to all event listeners for the event:
	     ```javascript
	    object.on('foo', function(value){
	      console.log(value.name);
	    });
	     object.trigger('foo', { name: 'bar' });
	    // 'bar' logged to the console
	    ```
	     @method trigger
	    @for RSVP.EventTarget
	    @private
	    @param {String} eventName name of the event to be triggered
	    @param {*} options optional value to be passed to any event handlers for
	    the given `eventName`
	  */
	  trigger: function trigger(eventName, options, label) {
	    var allCallbacks = callbacksFor(this),
	        callbacks = undefined,
	        callback = undefined;

	    if (callbacks = allCallbacks[eventName]) {
	      // Don't cache the callbacks.length since it may grow
	      for (var i = 0; i < callbacks.length; i++) {
	        callback = callbacks[i];

	        callback(options, label);
	      }
	    }
	  }
	};

	var config = {
	  instrument: false
	};

	EventTarget['mixin'](config);

	function configure(name, value) {
	  if (name === 'onerror') {
	    // handle for legacy users that expect the actual
	    // error to be passed to their function added via
	    // `RSVP.configure('onerror', someFunctionHere);`
	    config['on']('error', value);
	    return;
	  }

	  if (arguments.length === 2) {
	    config[name] = value;
	  } else {
	    return config[name];
	  }
	}

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	function isMaybeThenable(x) {
	  return typeof x === 'object' && x !== null;
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	// Date.now is not available in browsers < IE9
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
	var now = Date.now || function () {
	  return new Date().getTime();
	};

	function F() {}

	var o_create = Object.create || function (o) {
	  if (arguments.length > 1) {
	    throw new Error('Second argument not supported');
	  }
	  if (typeof o !== 'object') {
	    throw new TypeError('Argument must be an object');
	  }
	  F.prototype = o;
	  return new F();
	};

	var queue = [];

	function scheduleFlush() {
	  setTimeout(function () {
	    for (var i = 0; i < queue.length; i++) {
	      var entry = queue[i];

	      var payload = entry.payload;

	      payload.guid = payload.key + payload.id;
	      payload.childGuid = payload.key + payload.childId;
	      if (payload.error) {
	        payload.stack = payload.error.stack;
	      }

	      config['trigger'](entry.name, entry.payload);
	    }
	    queue.length = 0;
	  }, 50);
	}
	function instrument(eventName, promise, child) {
	  if (1 === queue.push({
	    name: eventName,
	    payload: {
	      key: promise._guidKey,
	      id: promise._id,
	      eventName: eventName,
	      detail: promise._result,
	      childId: child && child._id,
	      label: promise._label,
	      timeStamp: now(),
	      error: config["instrument-with-stack"] ? new Error(promise._label) : null
	    } })) {
	    scheduleFlush();
	  }
	}

	/**
	  `RSVP.Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new RSVP.Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = RSVP.Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {*} object value that the returned promise will be resolved with
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object, label) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop, label);
	  resolve(promise, object);
	  return promise;
	}

	function withOwnPromise() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  config.async(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value, undefined);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    thenable._onError = null;
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      if (thenable !== value) {
	        resolve(promise, value, undefined);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && promise.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
	    fulfill(promise, value);
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onError) {
	    promise._onError(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length === 0) {
	    if (config.instrument) {
	      instrument('fulfilled', promise);
	    }
	  } else {
	    config.async(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	  config.async(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var subscribers = parent._subscribers;
	  var length = subscribers.length;

	  parent._onError = null;

	  subscribers[length] = child;
	  subscribers[length + FULFILLED] = onFulfillment;
	  subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    config.async(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (config.instrument) {
	    instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
	  }

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      reject(promise, withOwnPromise());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      resolve(promise, value);
	    } else if (failed) {
	      reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  var resolved = false;
	  try {
	    resolver(function (value) {
	      if (resolved) {
	        return;
	      }
	      resolved = true;
	      resolve(promise, value);
	    }, function (reason) {
	      if (resolved) {
	        return;
	      }
	      resolved = true;
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}

	function then(onFulfillment, onRejection, label) {
	  var _arguments = arguments;

	  var parent = this;
	  var state = parent._state;

	  if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
	    config.instrument && instrument('chained', parent, parent);
	    return parent;
	  }

	  parent._onError = null;

	  var child = new parent.constructor(noop, label);
	  var result = parent._result;

	  config.instrument && instrument('chained', parent, child);

	  if (state) {
	    (function () {
	      var callback = _arguments[state - 1];
	      config.async(function () {
	        return invokeCallback(state, child, callback, result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	function makeSettledResult(state, position, value) {
	  if (state === FULFILLED) {
	    return {
	      state: 'fulfilled',
	      value: value
	    };
	  } else {
	    return {
	      state: 'rejected',
	      reason: value
	    };
	  }
	}

	function Enumerator(Constructor, input, abortOnReject, label) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop, label);
	  this._abortOnReject = abortOnReject;

	  if (this._validateInput(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._init();

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    reject(this.promise, this._validationError());
	  }
	}

	Enumerator.prototype._validateInput = function (input) {
	  return isArray(input);
	};

	Enumerator.prototype._validationError = function () {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._init = function () {
	  this._result = new Array(this.length);
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var promise = this.promise;
	  var input = this._input;

	  for (var i = 0; promise._state === PENDING && i < length; i++) {
	    this._eachEntry(input[i], i);
	  }
	};

	Enumerator.prototype._settleMaybeThenable = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve = c.resolve;

	  if (resolve === resolve$1) {
	    var then$$ = getThen(entry);

	    if (then$$ === then && entry._state !== PENDING) {
	      entry._onError = null;
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof then$$ !== 'function') {
	      this._remaining--;
	      this._result[i] = this._makeResult(FULFILLED, i, entry);
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, then$$);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve) {
	        return resolve(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve(entry), i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  if (isMaybeThenable(entry)) {
	    this._settleMaybeThenable(entry, i);
	  } else {
	    this._remaining--;
	    this._result[i] = this._makeResult(FULFILLED, i, entry);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (this._abortOnReject && state === REJECTED) {
	      reject(promise, value);
	    } else {
	      this._result[i] = this._makeResult(state, i, value);
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._makeResult = function (state, i, value) {
	  return value;
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `RSVP.Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.resolve(2);
	  let promise3 = RSVP.resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  RSVP.Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `RSVP.all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.reject(new Error("2"));
	  let promise3 = RSVP.reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  RSVP.Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries, label) {
	  return new Enumerator(this, entries, true, /* abort on reject */label).promise;
	}

	/**
	  `RSVP.Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  RSVP.Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `RSVP.Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  RSVP.Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  RSVP.Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} entries array of promises to observe
	  @param {String} label optional string for describing the promise returned.
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries, label) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  var promise = new Constructor(noop, label);

	  if (!isArray(entries)) {
	    reject(promise, new TypeError('You must pass an array to race.'));
	    return promise;
	  }

	  for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
	    subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }

	  return promise;
	}

	/**
	  `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new RSVP.Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = RSVP.Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {*} reason value that the returned promise will be rejected with.
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason, label) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop, label);
	  reject(promise, reason);
	  return promise;
	}

	var guidKey = 'rsvp_' + now() + '-';
	var counter = 0;

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise’s eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class RSVP.Promise
	  @param {function} resolver
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver, label) {
	  this._id = counter++;
	  this._label = label;
	  this._state = undefined;
	  this._result = undefined;
	  this._subscribers = [];

	  config.instrument && instrument('created', this);

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.cast = resolve$1; // deprecated
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve$1;
	Promise.reject = reject$1;

	Promise.prototype = {
	  constructor: Promise,

	  _guidKey: guidKey,

	  _onError: function _onError(reason) {
	    var promise = this;
	    config.after(function () {
	      if (promise._onError) {
	        config['trigger']('error', reason, promise._label);
	      }
	    });
	  },

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we\'re unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfillment
	    @param {Function} onRejection
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn\'t find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection, label) {
	    return this.then(undefined, onRejection, label);
	  },

	  /**
	    `finally` will be invoked regardless of the promise's fate just as native
	    try/catch/finally behaves
	  
	    Synchronous example:
	  
	    ```js
	    findAuthor() {
	      if (Math.random() > 0.5) {
	        throw new Error();
	      }
	      return new Author();
	    }
	  
	    try {
	      return findAuthor(); // succeed or fail
	    } catch(error) {
	      return findOtherAuther();
	    } finally {
	      // always runs
	      // doesn't affect the return value
	    }
	    ```
	  
	    Asynchronous example:
	  
	    ```js
	    findAuthor().catch(function(reason){
	      return findOtherAuther();
	    }).finally(function(){
	      // author was either found, or not
	    });
	    ```
	  
	    @method finally
	    @param {Function} callback
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise}
	  */
	  'finally': function _finally(callback, label) {
	    var promise = this;
	    var constructor = promise.constructor;

	    return promise.then(function (value) {
	      return constructor.resolve(callback()).then(function () {
	        return value;
	      });
	    }, function (reason) {
	      return constructor.resolve(callback()).then(function () {
	        throw reason;
	      });
	    }, label);
	  }
	};

	function Result() {
	  this.value = undefined;
	}

	var ERROR = new Result();
	var GET_THEN_ERROR$1 = new Result();

	function getThen$1(obj) {
	  try {
	    return obj.then;
	  } catch (error) {
	    ERROR.value = error;
	    return ERROR;
	  }
	}

	function tryApply(f, s, a) {
	  try {
	    f.apply(s, a);
	  } catch (error) {
	    ERROR.value = error;
	    return ERROR;
	  }
	}

	function makeObject(_, argumentNames) {
	  var obj = {};
	  var length = _.length;
	  var args = new Array(length);

	  for (var x = 0; x < length; x++) {
	    args[x] = _[x];
	  }

	  for (var i = 0; i < argumentNames.length; i++) {
	    var _name = argumentNames[i];
	    obj[_name] = args[i + 1];
	  }

	  return obj;
	}

	function arrayResult(_) {
	  var length = _.length;
	  var args = new Array(length - 1);

	  for (var i = 1; i < length; i++) {
	    args[i - 1] = _[i];
	  }

	  return args;
	}

	function wrapThenable(_then, promise) {
	  return {
	    then: function then(onFulFillment, onRejection) {
	      return _then.call(promise, onFulFillment, onRejection);
	    }
	  };
	}

	/**
	  `RSVP.denodeify` takes a 'node-style' function and returns a function that
	  will return an `RSVP.Promise`. You can use `denodeify` in Node.js or the
	  browser when you'd prefer to use promises over using callbacks. For example,
	  `denodeify` transforms the following:

	  ```javascript
	  let fs = require('fs');

	  fs.readFile('myfile.txt', function(err, data){
	    if (err) return handleError(err);
	    handleData(data);
	  });
	  ```

	  into:

	  ```javascript
	  let fs = require('fs');
	  let readFile = RSVP.denodeify(fs.readFile);

	  readFile('myfile.txt').then(handleData, handleError);
	  ```

	  If the node function has multiple success parameters, then `denodeify`
	  just returns the first one:

	  ```javascript
	  let request = RSVP.denodeify(require('request'));

	  request('http://example.com').then(function(res) {
	    // ...
	  });
	  ```

	  However, if you need all success parameters, setting `denodeify`'s
	  second parameter to `true` causes it to return all success parameters
	  as an array:

	  ```javascript
	  let request = RSVP.denodeify(require('request'), true);

	  request('http://example.com').then(function(result) {
	    // result[0] -> res
	    // result[1] -> body
	  });
	  ```

	  Or if you pass it an array with names it returns the parameters as a hash:

	  ```javascript
	  let request = RSVP.denodeify(require('request'), ['res', 'body']);

	  request('http://example.com').then(function(result) {
	    // result.res
	    // result.body
	  });
	  ```

	  Sometimes you need to retain the `this`:

	  ```javascript
	  let app = require('express')();
	  let render = RSVP.denodeify(app.render.bind(app));
	  ```

	  The denodified function inherits from the original function. It works in all
	  environments, except IE 10 and below. Consequently all properties of the original
	  function are available to you. However, any properties you change on the
	  denodeified function won't be changed on the original function. Example:

	  ```javascript
	  let request = RSVP.denodeify(require('request')),
	      cookieJar = request.jar(); // <- Inheritance is used here

	  request('http://example.com', {jar: cookieJar}).then(function(res) {
	    // cookieJar.cookies holds now the cookies returned by example.com
	  });
	  ```

	  Using `denodeify` makes it easier to compose asynchronous operations instead
	  of using callbacks. For example, instead of:

	  ```javascript
	  let fs = require('fs');

	  fs.readFile('myfile.txt', function(err, data){
	    if (err) { ... } // Handle error
	    fs.writeFile('myfile2.txt', data, function(err){
	      if (err) { ... } // Handle error
	      console.log('done')
	    });
	  });
	  ```

	  you can chain the operations together using `then` from the returned promise:

	  ```javascript
	  let fs = require('fs');
	  let readFile = RSVP.denodeify(fs.readFile);
	  let writeFile = RSVP.denodeify(fs.writeFile);

	  readFile('myfile.txt').then(function(data){
	    return writeFile('myfile2.txt', data);
	  }).then(function(){
	    console.log('done')
	  }).catch(function(error){
	    // Handle error
	  });
	  ```

	  @method denodeify
	  @static
	  @for RSVP
	  @param {Function} nodeFunc a 'node-style' function that takes a callback as
	  its last argument. The callback expects an error to be passed as its first
	  argument (if an error occurred, otherwise null), and the value from the
	  operation as its second argument ('function(err, value){ }').
	  @param {Boolean|Array} [options] An optional paramter that if set
	  to `true` causes the promise to fulfill with the callback's success arguments
	  as an array. This is useful if the node function has multiple success
	  paramters. If you set this paramter to an array with names, the promise will
	  fulfill with a hash with these names as keys and the success parameters as
	  values.
	  @return {Function} a function that wraps `nodeFunc` to return an
	  `RSVP.Promise`
	  @static
	*/
	function denodeify(nodeFunc, options) {
	  var fn = function fn() {
	    var self = this;
	    var l = arguments.length;
	    var args = new Array(l + 1);
	    var promiseInput = false;

	    for (var i = 0; i < l; ++i) {
	      var arg = arguments[i];

	      if (!promiseInput) {
	        // TODO: clean this up
	        promiseInput = needsPromiseInput(arg);
	        if (promiseInput === GET_THEN_ERROR$1) {
	          var p = new Promise(noop);
	          reject(p, GET_THEN_ERROR$1.value);
	          return p;
	        } else if (promiseInput && promiseInput !== true) {
	          arg = wrapThenable(promiseInput, arg);
	        }
	      }
	      args[i] = arg;
	    }

	    var promise = new Promise(noop);

	    args[l] = function (err, val) {
	      if (err) reject(promise, err);else if (options === undefined) resolve(promise, val);else if (options === true) resolve(promise, arrayResult(arguments));else if (isArray(options)) resolve(promise, makeObject(arguments, options));else resolve(promise, val);
	    };

	    if (promiseInput) {
	      return handlePromiseInput(promise, args, nodeFunc, self);
	    } else {
	      return handleValueInput(promise, args, nodeFunc, self);
	    }
	  };

	  fn.__proto__ = nodeFunc;

	  return fn;
	}

	function handleValueInput(promise, args, nodeFunc, self) {
	  var result = tryApply(nodeFunc, self, args);
	  if (result === ERROR) {
	    reject(promise, result.value);
	  }
	  return promise;
	}

	function handlePromiseInput(promise, args, nodeFunc, self) {
	  return Promise.all(args).then(function (args) {
	    var result = tryApply(nodeFunc, self, args);
	    if (result === ERROR) {
	      reject(promise, result.value);
	    }
	    return promise;
	  });
	}

	function needsPromiseInput(arg) {
	  if (arg && typeof arg === 'object') {
	    if (arg.constructor === Promise) {
	      return true;
	    } else {
	      return getThen$1(arg);
	    }
	  } else {
	    return false;
	  }
	}

	/**
	  This is a convenient alias for `RSVP.Promise.all`.

	  @method all
	  @static
	  @for RSVP
	  @param {Array} array Array of promises.
	  @param {String} label An optional label. This is useful
	  for tooling.
	*/
	function all$1(array, label) {
	  return Promise.all(array, label);
	}

	function AllSettled(Constructor, entries, label) {
	  this._superConstructor(Constructor, entries, false, /* don't abort on reject */label);
	}

	AllSettled.prototype = o_create(Enumerator.prototype);
	AllSettled.prototype._superConstructor = Enumerator;
	AllSettled.prototype._makeResult = makeSettledResult;
	AllSettled.prototype._validationError = function () {
	  return new Error('allSettled must be called with an array');
	};

	/**
	  `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
	  a fail-fast method, it waits until all the promises have returned and
	  shows you all the results. This is useful if you want to handle multiple
	  promises' failure states together as a set.

	  Returns a promise that is fulfilled when all the given promises have been
	  settled. The return promise is fulfilled with an array of the states of
	  the promises passed into the `promises` array argument.

	  Each state object will either indicate fulfillment or rejection, and
	  provide the corresponding value or reason. The states will take one of
	  the following formats:

	  ```javascript
	  { state: 'fulfilled', value: value }
	    or
	  { state: 'rejected', reason: reason }
	  ```

	  Example:

	  ```javascript
	  let promise1 = RSVP.Promise.resolve(1);
	  let promise2 = RSVP.Promise.reject(new Error('2'));
	  let promise3 = RSVP.Promise.reject(new Error('3'));
	  let promises = [ promise1, promise2, promise3 ];

	  RSVP.allSettled(promises).then(function(array){
	    // array == [
	    //   { state: 'fulfilled', value: 1 },
	    //   { state: 'rejected', reason: Error },
	    //   { state: 'rejected', reason: Error }
	    // ]
	    // Note that for the second item, reason.message will be '2', and for the
	    // third item, reason.message will be '3'.
	  }, function(error) {
	    // Not run. (This block would only be called if allSettled had failed,
	    // for instance if passed an incorrect argument type.)
	  });
	  ```

	  @method allSettled
	  @static
	  @for RSVP
	  @param {Array} entries
	  @param {String} label - optional string that describes the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled with an array of the settled
	  states of the constituent promises.
	*/
	function allSettled(entries, label) {
	  return new AllSettled(Promise, entries, label).promise;
	}

	/**
	  This is a convenient alias for `RSVP.Promise.race`.

	  @method race
	  @static
	  @for RSVP
	  @param {Array} array Array of promises.
	  @param {String} label An optional label. This is useful
	  for tooling.
	 */
	function race$1(array, label) {
	  return Promise.race(array, label);
	}

	function PromiseHash(Constructor, object, label) {
	  this._superConstructor(Constructor, object, true, label);
	}

	PromiseHash.prototype = o_create(Enumerator.prototype);
	PromiseHash.prototype._superConstructor = Enumerator;
	PromiseHash.prototype._init = function () {
	  this._result = {};
	};

	PromiseHash.prototype._validateInput = function (input) {
	  return input && typeof input === 'object';
	};

	PromiseHash.prototype._validationError = function () {
	  return new Error('Promise.hash must be called with an object');
	};

	PromiseHash.prototype._enumerate = function () {
	  var enumerator = this;
	  var promise = enumerator.promise;
	  var input = enumerator._input;
	  var results = [];

	  for (var key in input) {
	    if (promise._state === PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
	      results.push({
	        position: key,
	        entry: input[key]
	      });
	    }
	  }

	  var length = results.length;
	  enumerator._remaining = length;
	  var result = undefined;

	  for (var i = 0; promise._state === PENDING && i < length; i++) {
	    result = results[i];
	    enumerator._eachEntry(result.entry, result.position);
	  }
	};

	/**
	  `RSVP.hash` is similar to `RSVP.all`, but takes an object instead of an array
	  for its `promises` argument.

	  Returns a promise that is fulfilled when all the given promises have been
	  fulfilled, or rejected if any of them become rejected. The returned promise
	  is fulfilled with a hash that has the same key names as the `promises` object
	  argument. If any of the values in the object are not promises, they will
	  simply be copied over to the fulfilled object.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.resolve(1),
	    yourPromise: RSVP.resolve(2),
	    theirPromise: RSVP.resolve(3),
	    notAPromise: 4
	  };

	  RSVP.hash(promises).then(function(hash){
	    // hash here is an object that looks like:
	    // {
	    //   myPromise: 1,
	    //   yourPromise: 2,
	    //   theirPromise: 3,
	    //   notAPromise: 4
	    // }
	  });
	  ````

	  If any of the `promises` given to `RSVP.hash` are rejected, the first promise
	  that is rejected will be given as the reason to the rejection handler.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.resolve(1),
	    rejectedPromise: RSVP.reject(new Error('rejectedPromise')),
	    anotherRejectedPromise: RSVP.reject(new Error('anotherRejectedPromise')),
	  };

	  RSVP.hash(promises).then(function(hash){
	    // Code here never runs because there are rejected promises!
	  }, function(reason) {
	    // reason.message === 'rejectedPromise'
	  });
	  ```

	  An important note: `RSVP.hash` is intended for plain JavaScript objects that
	  are just a set of keys and values. `RSVP.hash` will NOT preserve prototype
	  chains.

	  Example:

	  ```javascript
	  function MyConstructor(){
	    this.example = RSVP.resolve('Example');
	  }

	  MyConstructor.prototype = {
	    protoProperty: RSVP.resolve('Proto Property')
	  };

	  let myObject = new MyConstructor();

	  RSVP.hash(myObject).then(function(hash){
	    // protoProperty will not be present, instead you will just have an
	    // object that looks like:
	    // {
	    //   example: 'Example'
	    // }
	    //
	    // hash.hasOwnProperty('protoProperty'); // false
	    // 'undefined' === typeof hash.protoProperty
	  });
	  ```

	  @method hash
	  @static
	  @for RSVP
	  @param {Object} object
	  @param {String} label optional string that describes the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all properties of `promises`
	  have been fulfilled, or rejected if any of them become rejected.
	*/
	function hash(object, label) {
	  return new PromiseHash(Promise, object, label).promise;
	}

	function HashSettled(Constructor, object, label) {
	  this._superConstructor(Constructor, object, false, label);
	}

	HashSettled.prototype = o_create(PromiseHash.prototype);
	HashSettled.prototype._superConstructor = Enumerator;
	HashSettled.prototype._makeResult = makeSettledResult;

	HashSettled.prototype._validationError = function () {
	  return new Error('hashSettled must be called with an object');
	};

	/**
	  `RSVP.hashSettled` is similar to `RSVP.allSettled`, but takes an object
	  instead of an array for its `promises` argument.

	  Unlike `RSVP.all` or `RSVP.hash`, which implement a fail-fast method,
	  but like `RSVP.allSettled`, `hashSettled` waits until all the
	  constituent promises have returned and then shows you all the results
	  with their states and values/reasons. This is useful if you want to
	  handle multiple promises' failure states together as a set.

	  Returns a promise that is fulfilled when all the given promises have been
	  settled, or rejected if the passed parameters are invalid.

	  The returned promise is fulfilled with a hash that has the same key names as
	  the `promises` object argument. If any of the values in the object are not
	  promises, they will be copied over to the fulfilled object and marked with state
	  'fulfilled'.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.Promise.resolve(1),
	    yourPromise: RSVP.Promise.resolve(2),
	    theirPromise: RSVP.Promise.resolve(3),
	    notAPromise: 4
	  };

	  RSVP.hashSettled(promises).then(function(hash){
	    // hash here is an object that looks like:
	    // {
	    //   myPromise: { state: 'fulfilled', value: 1 },
	    //   yourPromise: { state: 'fulfilled', value: 2 },
	    //   theirPromise: { state: 'fulfilled', value: 3 },
	    //   notAPromise: { state: 'fulfilled', value: 4 }
	    // }
	  });
	  ```

	  If any of the `promises` given to `RSVP.hash` are rejected, the state will
	  be set to 'rejected' and the reason for rejection provided.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.Promise.resolve(1),
	    rejectedPromise: RSVP.Promise.reject(new Error('rejection')),
	    anotherRejectedPromise: RSVP.Promise.reject(new Error('more rejection')),
	  };

	  RSVP.hashSettled(promises).then(function(hash){
	    // hash here is an object that looks like:
	    // {
	    //   myPromise:              { state: 'fulfilled', value: 1 },
	    //   rejectedPromise:        { state: 'rejected', reason: Error },
	    //   anotherRejectedPromise: { state: 'rejected', reason: Error },
	    // }
	    // Note that for rejectedPromise, reason.message == 'rejection',
	    // and for anotherRejectedPromise, reason.message == 'more rejection'.
	  });
	  ```

	  An important note: `RSVP.hashSettled` is intended for plain JavaScript objects that
	  are just a set of keys and values. `RSVP.hashSettled` will NOT preserve prototype
	  chains.

	  Example:

	  ```javascript
	  function MyConstructor(){
	    this.example = RSVP.Promise.resolve('Example');
	  }

	  MyConstructor.prototype = {
	    protoProperty: RSVP.Promise.resolve('Proto Property')
	  };

	  let myObject = new MyConstructor();

	  RSVP.hashSettled(myObject).then(function(hash){
	    // protoProperty will not be present, instead you will just have an
	    // object that looks like:
	    // {
	    //   example: { state: 'fulfilled', value: 'Example' }
	    // }
	    //
	    // hash.hasOwnProperty('protoProperty'); // false
	    // 'undefined' === typeof hash.protoProperty
	  });
	  ```

	  @method hashSettled
	  @for RSVP
	  @param {Object} object
	  @param {String} label optional string that describes the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when when all properties of `promises`
	  have been settled.
	  @static
	*/
	function hashSettled(object, label) {
	  return new HashSettled(Promise, object, label).promise;
	}

	function rethrow(reason) {
	  setTimeout(function () {
	    throw reason;
	  });
	  throw reason;
	}

	/**
	  `RSVP.defer` returns an object similar to jQuery's `$.Deferred`.
	  `RSVP.defer` should be used when porting over code reliant on `$.Deferred`'s
	  interface. New code should use the `RSVP.Promise` constructor instead.

	  The object returned from `RSVP.defer` is a plain object with three properties:

	  * promise - an `RSVP.Promise`.
	  * reject - a function that causes the `promise` property on this object to
	    become rejected
	  * resolve - a function that causes the `promise` property on this object to
	    become fulfilled.

	  Example:

	   ```javascript
	   let deferred = RSVP.defer();

	   deferred.resolve("Success!");

	   deferred.promise.then(function(value){
	     // value here is "Success!"
	   });
	   ```

	  @method defer
	  @static
	  @for RSVP
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Object}
	 */
	function defer(label) {
	  var deferred = { resolve: undefined, reject: undefined };

	  deferred.promise = new Promise(function (resolve, reject) {
	    deferred.resolve = resolve;
	    deferred.reject = reject;
	  }, label);

	  return deferred;
	}

	/**
	 `RSVP.map` is similar to JavaScript's native `map` method, except that it
	  waits for all promises to become fulfilled before running the `mapFn` on
	  each item in given to `promises`. `RSVP.map` returns a promise that will
	  become fulfilled with the result of running `mapFn` on the values the promises
	  become fulfilled with.

	  For example:

	  ```javascript

	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.resolve(2);
	  let promise3 = RSVP.resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  let mapFn = function(item){
	    return item + 1;
	  };

	  RSVP.map(promises, mapFn).then(function(result){
	    // result is [ 2, 3, 4 ]
	  });
	  ```

	  If any of the `promises` given to `RSVP.map` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promise's
	  rejection handler. For example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.reject(new Error('2'));
	  let promise3 = RSVP.reject(new Error('3'));
	  let promises = [ promise1, promise2, promise3 ];

	  let mapFn = function(item){
	    return item + 1;
	  };

	  RSVP.map(promises, mapFn).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(reason) {
	    // reason.message === '2'
	  });
	  ```

	  `RSVP.map` will also wait if a promise is returned from `mapFn`. For example,
	  say you want to get all comments from a set of blog posts, but you need
	  the blog posts first because they contain a url to those comments.

	  ```javscript

	  let mapFn = function(blogPost){
	    // getComments does some ajax and returns an RSVP.Promise that is fulfilled
	    // with some comments data
	    return getComments(blogPost.comments_url);
	  };

	  // getBlogPosts does some ajax and returns an RSVP.Promise that is fulfilled
	  // with some blog post data
	  RSVP.map(getBlogPosts(), mapFn).then(function(comments){
	    // comments is the result of asking the server for the comments
	    // of all blog posts returned from getBlogPosts()
	  });
	  ```

	  @method map
	  @static
	  @for RSVP
	  @param {Array} promises
	  @param {Function} mapFn function to be called on each fulfilled promise.
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled with the result of calling
	  `mapFn` on each fulfilled promise or value when they become fulfilled.
	   The promise will be rejected if any of the given `promises` become rejected.
	  @static
	*/
	function map(promises, mapFn, label) {
	  return Promise.all(promises, label).then(function (values) {
	    if (!isFunction(mapFn)) {
	      throw new TypeError("You must pass a function as map's second argument.");
	    }

	    var length = values.length;
	    var results = new Array(length);

	    for (var i = 0; i < length; i++) {
	      results[i] = mapFn(values[i]);
	    }

	    return Promise.all(results, label);
	  });
	}

	/**
	  This is a convenient alias for `RSVP.Promise.resolve`.

	  @method resolve
	  @static
	  @for RSVP
	  @param {*} value value that the returned promise will be resolved with
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$2(value, label) {
	  return Promise.resolve(value, label);
	}

	/**
	  This is a convenient alias for `RSVP.Promise.reject`.

	  @method reject
	  @static
	  @for RSVP
	  @param {*} reason value that the returned promise will be rejected with.
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$2(reason, label) {
	  return Promise.reject(reason, label);
	}

	/**
	 `RSVP.filter` is similar to JavaScript's native `filter` method, except that it
	  waits for all promises to become fulfilled before running the `filterFn` on
	  each item in given to `promises`. `RSVP.filter` returns a promise that will
	  become fulfilled with the result of running `filterFn` on the values the
	  promises become fulfilled with.

	  For example:

	  ```javascript

	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.resolve(2);
	  let promise3 = RSVP.resolve(3);

	  let promises = [promise1, promise2, promise3];

	  let filterFn = function(item){
	    return item > 1;
	  };

	  RSVP.filter(promises, filterFn).then(function(result){
	    // result is [ 2, 3 ]
	  });
	  ```

	  If any of the `promises` given to `RSVP.filter` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promise's
	  rejection handler. For example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.reject(new Error('2'));
	  let promise3 = RSVP.reject(new Error('3'));
	  let promises = [ promise1, promise2, promise3 ];

	  let filterFn = function(item){
	    return item > 1;
	  };

	  RSVP.filter(promises, filterFn).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(reason) {
	    // reason.message === '2'
	  });
	  ```

	  `RSVP.filter` will also wait for any promises returned from `filterFn`.
	  For instance, you may want to fetch a list of users then return a subset
	  of those users based on some asynchronous operation:

	  ```javascript

	  let alice = { name: 'alice' };
	  let bob   = { name: 'bob' };
	  let users = [ alice, bob ];

	  let promises = users.map(function(user){
	    return RSVP.resolve(user);
	  });

	  let filterFn = function(user){
	    // Here, Alice has permissions to create a blog post, but Bob does not.
	    return getPrivilegesForUser(user).then(function(privs){
	      return privs.can_create_blog_post === true;
	    });
	  };
	  RSVP.filter(promises, filterFn).then(function(users){
	    // true, because the server told us only Alice can create a blog post.
	    users.length === 1;
	    // false, because Alice is the only user present in `users`
	    users[0] === bob;
	  });
	  ```

	  @method filter
	  @static
	  @for RSVP
	  @param {Array} promises
	  @param {Function} filterFn - function to be called on each resolved value to
	  filter the final results.
	  @param {String} label optional string describing the promise. Useful for
	  tooling.
	  @return {Promise}
	*/

	function resolveAll(promises, label) {
	  return Promise.all(promises, label);
	}

	function resolveSingle(promise, label) {
	  return Promise.resolve(promise, label).then(function (promises) {
	    return resolveAll(promises, label);
	  });
	}
	function filter(promises, filterFn, label) {
	  var promise = isArray(promises) ? resolveAll(promises, label) : resolveSingle(promises, label);
	  return promise.then(function (values) {
	    if (!isFunction(filterFn)) {
	      throw new TypeError("You must pass a function as filter's second argument.");
	    }

	    var length = values.length;
	    var filtered = new Array(length);

	    for (var i = 0; i < length; i++) {
	      filtered[i] = filterFn(values[i]);
	    }

	    return resolveAll(filtered, label).then(function (filtered) {
	      var results = new Array(length);
	      var newLength = 0;

	      for (var i = 0; i < length; i++) {
	        if (filtered[i]) {
	          results[newLength] = values[i];
	          newLength++;
	        }
	      }

	      results.length = newLength;

	      return results;
	    });
	  });
	}

	var len = 0;
	var vertxNext = undefined;
	function asap(callback, arg) {
	  queue$1[len] = callback;
	  queue$1[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 1, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    scheduleFlush$1();
	  }
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  var nextTick = process.nextTick;
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // setImmediate should be used instead instead
	  var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	  if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	    nextTick = setImmediate;
	  }
	  return function () {
	    return nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }
	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    return node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  return function () {
	    return setTimeout(flush, 1);
	  };
	}

	var queue$1 = new Array(1000);

	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue$1[i];
	    var arg = queue$1[i + 1];

	    callback(arg);

	    queue$1[i] = undefined;
	    queue$1[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertex() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(7);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush$1 = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush$1 = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush$1 = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush$1 = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush$1 = attemptVertex();
	} else {
	  scheduleFlush$1 = useSetTimeout();
	}

	var platform = undefined;

	/* global self */
	if (typeof self === 'object') {
	  platform = self;

	  /* global global */
	} else if (typeof global === 'object') {
	    platform = global;
	  } else {
	    throw new Error('no global: `self` or `global` found');
	  }

	var _async$filter;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// defaults

	// the default export here is for backwards compat:
	//   https://github.com/tildeio/rsvp.js/issues/434
	config.async = asap;
	config.after = function (cb) {
	  return setTimeout(cb, 0);
	};
	var cast = resolve$2;

	var async = function async(callback, arg) {
	  return config.async(callback, arg);
	};

	function on() {
	  config['on'].apply(config, arguments);
	}

	function off() {
	  config['off'].apply(config, arguments);
	}

	// Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
	if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
	  var callbacks = window['__PROMISE_INSTRUMENTATION__'];
	  configure('instrument', true);
	  for (var eventName in callbacks) {
	    if (callbacks.hasOwnProperty(eventName)) {
	      on(eventName, callbacks[eventName]);
	    }
	  }
	}var rsvp = (_async$filter = {
	  cast: cast,
	  Promise: Promise,
	  EventTarget: EventTarget,
	  all: all$1,
	  allSettled: allSettled,
	  race: race$1,
	  hash: hash,
	  hashSettled: hashSettled,
	  rethrow: rethrow,
	  defer: defer,
	  denodeify: denodeify,
	  configure: configure,
	  on: on,
	  off: off,
	  resolve: resolve$2,
	  reject: reject$2,
	  map: map
	}, _defineProperty(_async$filter, 'async', async), _defineProperty(_async$filter, 'filter', // babel seems to error if async isn't a computed prop here...
	filter), _async$filter);

	exports['default'] = rsvp;
	exports.cast = cast;
	exports.Promise = Promise;
	exports.EventTarget = EventTarget;
	exports.all = all$1;
	exports.allSettled = allSettled;
	exports.race = race$1;
	exports.hash = hash;
	exports.hashSettled = hashSettled;
	exports.rethrow = rethrow;
	exports.defer = defer;
	exports.denodeify = denodeify;
	exports.configure = configure;
	exports.on = on;
	exports.off = off;
	exports.resolve = resolve$2;
	exports.reject = reject$2;
	exports.map = map;
	exports.async = async;
	exports.filter = filter;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));
	//# sourceMappingURL=rsvp.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5).setImmediate, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(6);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Chart, Document, React;

	React = __webpack_require__(1);

	Document = __webpack_require__(9);

	Chart = React.createClass({
	  propTypes: {
	    document: React.PropTypes.instanceOf(Document).isRequired
	  },
	  componentWillMount: function() {
	    return this.props.document.on('change', this.documentChangeHandler);
	  },
	  componentWillUnmount: function() {
	    return this.props.document.off('change', this.documentChangeHandler);
	  },
	  documentChangeHandler: function() {
	    return this.forceUpdate();
	  },
	  render: __webpack_require__(90)
	});

	module.exports = Chart;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var ApplyAxesLimits, Box, CalculateExtents, Chart, CurvesPlugin, DebugBoxesPlugin, DocumentAbstract, DotsSetsPlugin, FixZoomLimits, GenerateScaleByAxis, GenerateZoomObject, GenerateZoomTranslate, ObjectDiffers, RoundTo, SpreadsPlugin, TimeSeriesPlugin, UniqueId, ZoomExtents, ZoomLimitsReached, clampBigNumbers, d3, getValidDate, halfPixel, lodash, reasonablyBigNumber,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;

	d3 = __webpack_require__(10);

	lodash = __webpack_require__(11);

	DocumentAbstract = __webpack_require__(12);

	Box = __webpack_require__(14);

	CalculateExtents = __webpack_require__(15);

	ApplyAxesLimits = __webpack_require__(16);

	ZoomLimitsReached = __webpack_require__(17);

	FixZoomLimits = __webpack_require__(18);

	GenerateZoomTranslate = __webpack_require__(19);

	GenerateZoomObject = __webpack_require__(20);

	ZoomExtents = __webpack_require__(22);

	UniqueId = __webpack_require__(23);

	RoundTo = __webpack_require__(24);

	ObjectDiffers = __webpack_require__(25);

	GenerateScaleByAxis = __webpack_require__(26);

	DotsSetsPlugin = __webpack_require__(31);

	CurvesPlugin = __webpack_require__(60);

	SpreadsPlugin = __webpack_require__(79);

	TimeSeriesPlugin = __webpack_require__(82);

	DebugBoxesPlugin = __webpack_require__(88);

	halfPixel = RoundTo(0.5);

	reasonablyBigNumber = 10e6;

	clampBigNumbers = d3.scale.linear().domain([-reasonablyBigNumber, reasonablyBigNumber]).range([-reasonablyBigNumber, reasonablyBigNumber]).clamp(true);

	getValidDate = function(dateString) {
	  var d;
	  d = new Date(dateString);
	  if (Object.prototype.toString.call(d) === '[object Date]') {
	    if (!isNaN(d.getTime())) {
	      return d;
	    }
	  }
	  return dateString;
	};

	module.exports = Chart = (function(superClass) {
	  extend(Chart, superClass);

	  function Chart() {
	    return Chart.__super__.constructor.apply(this, arguments);
	  }

	  Chart.prototype._init = function() {
	    this.zoomBehavior = d3.behavior.zoom().on('zoom', (function(_this) {
	      return function() {
	        return _this.onZoom();
	      };
	    })(this));
	    this.prevRenderContext = {};
	    this.areAxesDiffer = ObjectDiffers();
	    this.areAxesLimitsDiffer = ObjectDiffers();
	    this.on('pluginBroadcast', (function(_this) {
	      return function() {
	        var args, i, len, plugin, ref;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        ref = _this.props.plugins;
	        for (i = 0, len = ref.length; i < len; i++) {
	          plugin = ref[i];
	          plugin.emit.apply(plugin, args);
	        }
	      };
	    })(this));
	    this.props = {
	      paddingCoefficient: .15,
	      localRegressionBandwidth: .9,
	      maxZoom: 24,
	      backgroundColor: '#fff',
	      labelStyle: {
	        color: '#000',
	        fontSize: '10px',
	        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
	        textHeight: 11,
	        textPadding: 2,
	        opacity: .85
	      },
	      margin: {
	        top: 30,
	        right: 30,
	        bottom: 30,
	        left: 30
	      },
	      chartId: UniqueId(),
	      axesLimits: {
	        x: [-2e308, 2e308],
	        y: [-2e308, 2e308]
	      },
	      dataBuildCache: {}
	    };
	    this.props.buildData = (function(_this) {
	      return function(key) {
	        var cached, date, isin, ref, result;
	        cached = _this.props.dataBuildCache[key];
	        if (cached) {
	          return cached;
	        }
	        ref = key.split('@'), isin = ref[0], date = ref[1];
	        result = _this.props.buildDailyData(isin, date);
	        result.date = getValidDate(date);
	        return _this.props.dataBuildCache[key] = result;
	      };
	    })(this);
	  };

	  Chart.prototype.zoomLimitsReached = function() {
	    var axesLimits, scales;
	    scales = {
	      x: this.zoomXScale,
	      y: this.zoomYScale
	    };
	    axesLimits = this.props.axesLimits;
	    return ZoomLimitsReached({
	      scales: scales,
	      axesLimits: axesLimits
	    });
	  };

	  Chart.prototype.fixZoomLimits = function() {
	    var axesLimits, scales;
	    scales = {
	      x: this.zoomXScale,
	      y: this.zoomYScale
	    };
	    axesLimits = this.props.axesLimits;
	    FixZoomLimits({
	      scales: scales,
	      axesLimits: axesLimits
	    });
	    if (this.zoomLimitsReached()) {
	      console.warn("Chart: zoom limits aren't fixed, please check what's going on");
	    }
	  };

	  Chart.prototype.buildZoomObject = function() {
	    return GenerateZoomObject(this.zoomBehavior.scale(), this.fullXScale, this.fullYScale, this.zoomXScale, this.zoomYScale);
	  };

	  Chart.prototype.applyZoom = function() {
	    var translate;
	    this.zoomXScale = this.fullXScale.copy();
	    this.zoomYScale = this.fullYScale.copy();
	    translate = GenerateZoomTranslate(this.fullXScale, this.fullYScale, this.props.zoom);
	    this.zoomBehavior.x(this.zoomXScale).y(this.zoomYScale).scale(this.props.zoom.scale).translate(translate).scaleExtent([1, this.props.maxZoom]);
	    if (this.zoomLimitsReached()) {
	      this.fixZoomLimits();
	      return this.props.zoom = this.buildZoomObject();
	    }
	  };

	  Chart.prototype.onZoom = function() {
	    if (this.zoomLimitsReached()) {
	      this.fixZoomLimits();
	    }
	    return this.update({
	      zoom: this.buildZoomObject()
	    });
	  };

	  Chart.prototype.pluginRequiresRender = function() {
	    return this.apply();
	  };

	  Chart.prototype._apply = function() {
	    var areAxesLimitsUpdated, areAxesUpdated, axes, bondsValues, chart, curves, dotsSets, height, pluginDataUpdated, plugins, rebuildRequired, spreads, timeSeries, width, zoomedExtents;
	    if (!this.props.zoom) {
	      return;
	    }
	    chart = this;
	    this.renderContext = {
	      boxes: [],
	      curvesLabels: []
	    };
	    dotsSets = this.props.dotsSets || [];
	    curves = this.props.curves || [];
	    spreads = this.props.spreads || [];
	    timeSeries = this.props.timeSeries || [];
	    if (this.props.updatePlugins) {
	      this.props.plugins[0].update({
	        dotsSets: dotsSets
	      });
	      this.props.plugins[1].update({
	        curves: curves
	      });
	      this.props.plugins[2].update({
	        spreads: spreads
	      });
	      this.props.plugins[3].update({
	        timeSeries: timeSeries
	      });
	    }
	    if (!this.props.plugins) {
	      console.warn('Chart: please provide "plugins" property with a list of plugins');
	      this.props.plugins = [
	        new DotsSetsPlugin({
	          dotsSets: dotsSets
	        }), new CurvesPlugin({
	          curves: curves
	        }), new SpreadsPlugin({
	          spreads: spreads
	        }), new TimeSeriesPlugin({
	          timeSeries: timeSeries
	        })
	      ];
	      this.props.updatePlugins = true;
	      if (this.props.debugBoxes) {
	        this.props.plugins.push(new DebugBoxesPlugin());
	      }
	    }
	    plugins = this.props.plugins;
	    plugins.forEach((function(_this) {
	      return function(plugin) {
	        plugin.off('requireRender');
	        plugin.on('requireRender', function() {
	          return _this.pluginRequiresRender();
	        });
	        plugin.off('chartEmit');
	        plugin.on('chartEmit', function() {
	          var args;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          return _this.emit.apply(_this, args);
	        });
	      };
	    })(this));
	    axes = this.props.axes;
	    areAxesUpdated = this.areAxesDiffer(axes);
	    areAxesLimitsUpdated = this.areAxesLimitsDiffer(this.props.axesLimits);
	    pluginDataUpdated = function() {
	      var checkDataUpdated;
	      checkDataUpdated = function(plugin) {
	        return plugin.isDataUpdated();
	      };
	      return plugins.map(checkDataUpdated).some(Boolean);
	    };
	    rebuildRequired = areAxesUpdated || areAxesLimitsUpdated || pluginDataUpdated();
	    if (rebuildRequired) {
	      this.props.dataBuildCache = {};
	      if (this.prevRenderContext) {
	        this.props.zoom = {
	          scale: 1,
	          center: {
	            x: 0.5,
	            y: 0.5
	          }
	        };
	      }
	      bondsValues = plugins.map(function(plugin) {
	        return plugin.buildBondsValues(chart.props);
	      });
	      bondsValues = lodash.flatten(bondsValues);
	      this.renderContext.extents = CalculateExtents(this.props.paddingCoefficient, bondsValues);
	      this.renderContext.extents = ApplyAxesLimits(this.renderContext.extents, this.props.axesLimits);
	    } else {
	      this.renderContext.extents = this.prevRenderContext.extents;
	    }
	    width = this.props.width || 300;
	    height = this.props.height || 150;
	    this.margin = this.props.margin;
	    this.renderContext.chartWidth = width - this.margin.left - this.margin.right;
	    this.renderContext.chartHeight = height - this.margin.top - this.margin.bottom;
	    this.renderContext.graphBox = new Box({
	      left: 0,
	      top: 0,
	      width: this.renderContext.chartWidth,
	      height: this.renderContext.chartHeight
	    });
	    this.fullXScale = d3.scale.linear().domain(this.renderContext.extents.x).range([0, this.renderContext.chartWidth]);
	    this.fullYScale = d3.scale.linear().domain(this.renderContext.extents.y).range([this.renderContext.chartHeight, 0]);
	    if (!this.props.disableZoom) {
	      this.applyZoom();
	    }
	    zoomedExtents = ZoomExtents(this.renderContext.extents, this.props.zoom);
	    this.zoomedXScale = GenerateScaleByAxis(axes.x).domain(zoomedExtents.x).range([0, this.renderContext.chartWidth]);
	    this.zoomedYScale = GenerateScaleByAxis(axes.y).domain(zoomedExtents.y).range([this.renderContext.chartHeight, 0]);
	    this.renderContext.chartId = this.props.chartId;
	    this.renderContext.zoomedXScale = this.zoomedXScale;
	    this.renderContext.zoomedYScale = this.zoomedYScale;
	    this.renderContext.bondToDot = function(bond, alternative) {
	      var x, y;
	      if (alternative == null) {
	        alternative = {};
	      }
	      x = alternative.x || axes.x;
	      y = alternative.y || axes.y;
	      return {
	        x: clampBigNumbers(halfPixel(chart.zoomedXScale(bond[x]))),
	        y: clampBigNumbers(halfPixel(chart.zoomedYScale(bond[y])))
	      };
	    };
	    this.renderContext.invertDot = function(dot) {
	      return {
	        x: chart.zoomedXScale.invert(dot.x),
	        y: chart.zoomedYScale.invert(dot.y)
	      };
	    };
	    plugins.forEach((function(_this) {
	      return function(plugin) {
	        plugin.willRender(_this.props, _this.renderContext);
	      };
	    })(this));
	    plugins.forEach((function(_this) {
	      return function(plugin) {
	        plugin.placeLabels(_this.renderContext);
	      };
	    })(this));
	    this.prevRenderContext = this.renderContext;
	  };

	  return Chart;

	})(DocumentAbstract);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function() {
	  var d3 = {
	    version: "3.5.17"
	  };
	  var d3_arraySlice = [].slice, d3_array = function(list) {
	    return d3_arraySlice.call(list);
	  };
	  var d3_document = this.document;
	  function d3_documentElement(node) {
	    return node && (node.ownerDocument || node.document || node).documentElement;
	  }
	  function d3_window(node) {
	    return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
	  }
	  if (d3_document) {
	    try {
	      d3_array(d3_document.documentElement.childNodes)[0].nodeType;
	    } catch (e) {
	      d3_array = function(list) {
	        var i = list.length, array = new Array(i);
	        while (i--) array[i] = list[i];
	        return array;
	      };
	    }
	  }
	  if (!Date.now) Date.now = function() {
	    return +new Date();
	  };
	  if (d3_document) {
	    try {
	      d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
	    } catch (error) {
	      var d3_element_prototype = this.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = this.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
	      d3_element_prototype.setAttribute = function(name, value) {
	        d3_element_setAttribute.call(this, name, value + "");
	      };
	      d3_element_prototype.setAttributeNS = function(space, local, value) {
	        d3_element_setAttributeNS.call(this, space, local, value + "");
	      };
	      d3_style_prototype.setProperty = function(name, value, priority) {
	        d3_style_setProperty.call(this, name, value + "", priority);
	      };
	    }
	  }
	  d3.ascending = d3_ascending;
	  function d3_ascending(a, b) {
	    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	  }
	  d3.descending = function(a, b) {
	    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	  };
	  d3.min = function(array, f) {
	    var i = -1, n = array.length, a, b;
	    if (arguments.length === 1) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) {
	        a = b;
	        break;
	      }
	      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	    } else {
	      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
	        a = b;
	        break;
	      }
	      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
	    }
	    return a;
	  };
	  d3.max = function(array, f) {
	    var i = -1, n = array.length, a, b;
	    if (arguments.length === 1) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) {
	        a = b;
	        break;
	      }
	      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	    } else {
	      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
	        a = b;
	        break;
	      }
	      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
	    }
	    return a;
	  };
	  d3.extent = function(array, f) {
	    var i = -1, n = array.length, a, b, c;
	    if (arguments.length === 1) {
	      while (++i < n) if ((b = array[i]) != null && b >= b) {
	        a = c = b;
	        break;
	      }
	      while (++i < n) if ((b = array[i]) != null) {
	        if (a > b) a = b;
	        if (c < b) c = b;
	      }
	    } else {
	      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
	        a = c = b;
	        break;
	      }
	      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
	        if (a > b) a = b;
	        if (c < b) c = b;
	      }
	    }
	    return [ a, c ];
	  };
	  function d3_number(x) {
	    return x === null ? NaN : +x;
	  }
	  function d3_numeric(x) {
	    return !isNaN(x);
	  }
	  d3.sum = function(array, f) {
	    var s = 0, n = array.length, a, i = -1;
	    if (arguments.length === 1) {
	      while (++i < n) if (d3_numeric(a = +array[i])) s += a;
	    } else {
	      while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
	    }
	    return s;
	  };
	  d3.mean = function(array, f) {
	    var s = 0, n = array.length, a, i = -1, j = n;
	    if (arguments.length === 1) {
	      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) s += a; else --j;
	    } else {
	      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) s += a; else --j;
	    }
	    if (j) return s / j;
	  };
	  d3.quantile = function(values, p) {
	    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
	    return e ? v + e * (values[h] - v) : v;
	  };
	  d3.median = function(array, f) {
	    var numbers = [], n = array.length, a, i = -1;
	    if (arguments.length === 1) {
	      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) numbers.push(a);
	    } else {
	      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) numbers.push(a);
	    }
	    if (numbers.length) return d3.quantile(numbers.sort(d3_ascending), .5);
	  };
	  d3.variance = function(array, f) {
	    var n = array.length, m = 0, a, d, s = 0, i = -1, j = 0;
	    if (arguments.length === 1) {
	      while (++i < n) {
	        if (d3_numeric(a = d3_number(array[i]))) {
	          d = a - m;
	          m += d / ++j;
	          s += d * (a - m);
	        }
	      }
	    } else {
	      while (++i < n) {
	        if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
	          d = a - m;
	          m += d / ++j;
	          s += d * (a - m);
	        }
	      }
	    }
	    if (j > 1) return s / (j - 1);
	  };
	  d3.deviation = function() {
	    var v = d3.variance.apply(this, arguments);
	    return v ? Math.sqrt(v) : v;
	  };
	  function d3_bisector(compare) {
	    return {
	      left: function(a, x, lo, hi) {
	        if (arguments.length < 3) lo = 0;
	        if (arguments.length < 4) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) < 0) lo = mid + 1; else hi = mid;
	        }
	        return lo;
	      },
	      right: function(a, x, lo, hi) {
	        if (arguments.length < 3) lo = 0;
	        if (arguments.length < 4) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) > 0) hi = mid; else lo = mid + 1;
	        }
	        return lo;
	      }
	    };
	  }
	  var d3_bisect = d3_bisector(d3_ascending);
	  d3.bisectLeft = d3_bisect.left;
	  d3.bisect = d3.bisectRight = d3_bisect.right;
	  d3.bisector = function(f) {
	    return d3_bisector(f.length === 1 ? function(d, x) {
	      return d3_ascending(f(d), x);
	    } : f);
	  };
	  d3.shuffle = function(array, i0, i1) {
	    if ((m = arguments.length) < 3) {
	      i1 = array.length;
	      if (m < 2) i0 = 0;
	    }
	    var m = i1 - i0, t, i;
	    while (m) {
	      i = Math.random() * m-- | 0;
	      t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
	    }
	    return array;
	  };
	  d3.permute = function(array, indexes) {
	    var i = indexes.length, permutes = new Array(i);
	    while (i--) permutes[i] = array[indexes[i]];
	    return permutes;
	  };
	  d3.pairs = function(array) {
	    var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
	    while (i < n) pairs[i] = [ p0 = p1, p1 = array[++i] ];
	    return pairs;
	  };
	  d3.transpose = function(matrix) {
	    if (!(n = matrix.length)) return [];
	    for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m; ) {
	      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n; ) {
	        row[j] = matrix[j][i];
	      }
	    }
	    return transpose;
	  };
	  function d3_transposeLength(d) {
	    return d.length;
	  }
	  d3.zip = function() {
	    return d3.transpose(arguments);
	  };
	  d3.keys = function(map) {
	    var keys = [];
	    for (var key in map) keys.push(key);
	    return keys;
	  };
	  d3.values = function(map) {
	    var values = [];
	    for (var key in map) values.push(map[key]);
	    return values;
	  };
	  d3.entries = function(map) {
	    var entries = [];
	    for (var key in map) entries.push({
	      key: key,
	      value: map[key]
	    });
	    return entries;
	  };
	  d3.merge = function(arrays) {
	    var n = arrays.length, m, i = -1, j = 0, merged, array;
	    while (++i < n) j += arrays[i].length;
	    merged = new Array(j);
	    while (--n >= 0) {
	      array = arrays[n];
	      m = array.length;
	      while (--m >= 0) {
	        merged[--j] = array[m];
	      }
	    }
	    return merged;
	  };
	  var abs = Math.abs;
	  d3.range = function(start, stop, step) {
	    if (arguments.length < 3) {
	      step = 1;
	      if (arguments.length < 2) {
	        stop = start;
	        start = 0;
	      }
	    }
	    if ((stop - start) / step === Infinity) throw new Error("infinite range");
	    var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
	    start *= k, stop *= k, step *= k;
	    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
	    return range;
	  };
	  function d3_range_integerScale(x) {
	    var k = 1;
	    while (x * k % 1) k *= 10;
	    return k;
	  }
	  function d3_class(ctor, properties) {
	    for (var key in properties) {
	      Object.defineProperty(ctor.prototype, key, {
	        value: properties[key],
	        enumerable: false
	      });
	    }
	  }
	  d3.map = function(object, f) {
	    var map = new d3_Map();
	    if (object instanceof d3_Map) {
	      object.forEach(function(key, value) {
	        map.set(key, value);
	      });
	    } else if (Array.isArray(object)) {
	      var i = -1, n = object.length, o;
	      if (arguments.length === 1) while (++i < n) map.set(i, object[i]); else while (++i < n) map.set(f.call(object, o = object[i], i), o);
	    } else {
	      for (var key in object) map.set(key, object[key]);
	    }
	    return map;
	  };
	  function d3_Map() {
	    this._ = Object.create(null);
	  }
	  var d3_map_proto = "__proto__", d3_map_zero = "\x00";
	  d3_class(d3_Map, {
	    has: d3_map_has,
	    get: function(key) {
	      return this._[d3_map_escape(key)];
	    },
	    set: function(key, value) {
	      return this._[d3_map_escape(key)] = value;
	    },
	    remove: d3_map_remove,
	    keys: d3_map_keys,
	    values: function() {
	      var values = [];
	      for (var key in this._) values.push(this._[key]);
	      return values;
	    },
	    entries: function() {
	      var entries = [];
	      for (var key in this._) entries.push({
	        key: d3_map_unescape(key),
	        value: this._[key]
	      });
	      return entries;
	    },
	    size: d3_map_size,
	    empty: d3_map_empty,
	    forEach: function(f) {
	      for (var key in this._) f.call(this, d3_map_unescape(key), this._[key]);
	    }
	  });
	  function d3_map_escape(key) {
	    return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
	  }
	  function d3_map_unescape(key) {
	    return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
	  }
	  function d3_map_has(key) {
	    return d3_map_escape(key) in this._;
	  }
	  function d3_map_remove(key) {
	    return (key = d3_map_escape(key)) in this._ && delete this._[key];
	  }
	  function d3_map_keys() {
	    var keys = [];
	    for (var key in this._) keys.push(d3_map_unescape(key));
	    return keys;
	  }
	  function d3_map_size() {
	    var size = 0;
	    for (var key in this._) ++size;
	    return size;
	  }
	  function d3_map_empty() {
	    for (var key in this._) return false;
	    return true;
	  }
	  d3.nest = function() {
	    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
	    function map(mapType, array, depth) {
	      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
	      var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
	      while (++i < n) {
	        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
	          values.push(object);
	        } else {
	          valuesByKey.set(keyValue, [ object ]);
	        }
	      }
	      if (mapType) {
	        object = mapType();
	        setter = function(keyValue, values) {
	          object.set(keyValue, map(mapType, values, depth));
	        };
	      } else {
	        object = {};
	        setter = function(keyValue, values) {
	          object[keyValue] = map(mapType, values, depth);
	        };
	      }
	      valuesByKey.forEach(setter);
	      return object;
	    }
	    function entries(map, depth) {
	      if (depth >= keys.length) return map;
	      var array = [], sortKey = sortKeys[depth++];
	      map.forEach(function(key, keyMap) {
	        array.push({
	          key: key,
	          values: entries(keyMap, depth)
	        });
	      });
	      return sortKey ? array.sort(function(a, b) {
	        return sortKey(a.key, b.key);
	      }) : array;
	    }
	    nest.map = function(array, mapType) {
	      return map(mapType, array, 0);
	    };
	    nest.entries = function(array) {
	      return entries(map(d3.map, array, 0), 0);
	    };
	    nest.key = function(d) {
	      keys.push(d);
	      return nest;
	    };
	    nest.sortKeys = function(order) {
	      sortKeys[keys.length - 1] = order;
	      return nest;
	    };
	    nest.sortValues = function(order) {
	      sortValues = order;
	      return nest;
	    };
	    nest.rollup = function(f) {
	      rollup = f;
	      return nest;
	    };
	    return nest;
	  };
	  d3.set = function(array) {
	    var set = new d3_Set();
	    if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
	    return set;
	  };
	  function d3_Set() {
	    this._ = Object.create(null);
	  }
	  d3_class(d3_Set, {
	    has: d3_map_has,
	    add: function(key) {
	      this._[d3_map_escape(key += "")] = true;
	      return key;
	    },
	    remove: d3_map_remove,
	    values: d3_map_keys,
	    size: d3_map_size,
	    empty: d3_map_empty,
	    forEach: function(f) {
	      for (var key in this._) f.call(this, d3_map_unescape(key));
	    }
	  });
	  d3.behavior = {};
	  function d3_identity(d) {
	    return d;
	  }
	  d3.rebind = function(target, source) {
	    var i = 1, n = arguments.length, method;
	    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
	    return target;
	  };
	  function d3_rebind(target, source, method) {
	    return function() {
	      var value = method.apply(source, arguments);
	      return value === source ? target : value;
	    };
	  }
	  function d3_vendorSymbol(object, name) {
	    if (name in object) return name;
	    name = name.charAt(0).toUpperCase() + name.slice(1);
	    for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
	      var prefixName = d3_vendorPrefixes[i] + name;
	      if (prefixName in object) return prefixName;
	    }
	  }
	  var d3_vendorPrefixes = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
	  function d3_noop() {}
	  d3.dispatch = function() {
	    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
	    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
	    return dispatch;
	  };
	  function d3_dispatch() {}
	  d3_dispatch.prototype.on = function(type, listener) {
	    var i = type.indexOf("."), name = "";
	    if (i >= 0) {
	      name = type.slice(i + 1);
	      type = type.slice(0, i);
	    }
	    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
	    if (arguments.length === 2) {
	      if (listener == null) for (type in this) {
	        if (this.hasOwnProperty(type)) this[type].on(name, null);
	      }
	      return this;
	    }
	  };
	  function d3_dispatch_event(dispatch) {
	    var listeners = [], listenerByName = new d3_Map();
	    function event() {
	      var z = listeners, i = -1, n = z.length, l;
	      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
	      return dispatch;
	    }
	    event.on = function(name, listener) {
	      var l = listenerByName.get(name), i;
	      if (arguments.length < 2) return l && l.on;
	      if (l) {
	        l.on = null;
	        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
	        listenerByName.remove(name);
	      }
	      if (listener) listeners.push(listenerByName.set(name, {
	        on: listener
	      }));
	      return dispatch;
	    };
	    return event;
	  }
	  d3.event = null;
	  function d3_eventPreventDefault() {
	    d3.event.preventDefault();
	  }
	  function d3_eventSource() {
	    var e = d3.event, s;
	    while (s = e.sourceEvent) e = s;
	    return e;
	  }
	  function d3_eventDispatch(target) {
	    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
	    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
	    dispatch.of = function(thiz, argumentz) {
	      return function(e1) {
	        try {
	          var e0 = e1.sourceEvent = d3.event;
	          e1.target = target;
	          d3.event = e1;
	          dispatch[e1.type].apply(thiz, argumentz);
	        } finally {
	          d3.event = e0;
	        }
	      };
	    };
	    return dispatch;
	  }
	  d3.requote = function(s) {
	    return s.replace(d3_requote_re, "\\$&");
	  };
	  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
	  var d3_subclass = {}.__proto__ ? function(object, prototype) {
	    object.__proto__ = prototype;
	  } : function(object, prototype) {
	    for (var property in prototype) object[property] = prototype[property];
	  };
	  function d3_selection(groups) {
	    d3_subclass(groups, d3_selectionPrototype);
	    return groups;
	  }
	  var d3_select = function(s, n) {
	    return n.querySelector(s);
	  }, d3_selectAll = function(s, n) {
	    return n.querySelectorAll(s);
	  }, d3_selectMatches = function(n, s) {
	    var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
	    d3_selectMatches = function(n, s) {
	      return d3_selectMatcher.call(n, s);
	    };
	    return d3_selectMatches(n, s);
	  };
	  if (typeof Sizzle === "function") {
	    d3_select = function(s, n) {
	      return Sizzle(s, n)[0] || null;
	    };
	    d3_selectAll = Sizzle;
	    d3_selectMatches = Sizzle.matchesSelector;
	  }
	  d3.selection = function() {
	    return d3.select(d3_document.documentElement);
	  };
	  var d3_selectionPrototype = d3.selection.prototype = [];
	  d3_selectionPrototype.select = function(selector) {
	    var subgroups = [], subgroup, subnode, group, node;
	    selector = d3_selection_selector(selector);
	    for (var j = -1, m = this.length; ++j < m; ) {
	      subgroups.push(subgroup = []);
	      subgroup.parentNode = (group = this[j]).parentNode;
	      for (var i = -1, n = group.length; ++i < n; ) {
	        if (node = group[i]) {
	          subgroup.push(subnode = selector.call(node, node.__data__, i, j));
	          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
	        } else {
	          subgroup.push(null);
	        }
	      }
	    }
	    return d3_selection(subgroups);
	  };
	  function d3_selection_selector(selector) {
	    return typeof selector === "function" ? selector : function() {
	      return d3_select(selector, this);
	    };
	  }
	  d3_selectionPrototype.selectAll = function(selector) {
	    var subgroups = [], subgroup, node;
	    selector = d3_selection_selectorAll(selector);
	    for (var j = -1, m = this.length; ++j < m; ) {
	      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
	        if (node = group[i]) {
	          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
	          subgroup.parentNode = node;
	        }
	      }
	    }
	    return d3_selection(subgroups);
	  };
	  function d3_selection_selectorAll(selector) {
	    return typeof selector === "function" ? selector : function() {
	      return d3_selectAll(selector, this);
	    };
	  }
	  var d3_nsXhtml = "http://www.w3.org/1999/xhtml";
	  var d3_nsPrefix = {
	    svg: "http://www.w3.org/2000/svg",
	    xhtml: d3_nsXhtml,
	    xlink: "http://www.w3.org/1999/xlink",
	    xml: "http://www.w3.org/XML/1998/namespace",
	    xmlns: "http://www.w3.org/2000/xmlns/"
	  };
	  d3.ns = {
	    prefix: d3_nsPrefix,
	    qualify: function(name) {
	      var i = name.indexOf(":"), prefix = name;
	      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	      return d3_nsPrefix.hasOwnProperty(prefix) ? {
	        space: d3_nsPrefix[prefix],
	        local: name
	      } : name;
	    }
	  };
	  d3_selectionPrototype.attr = function(name, value) {
	    if (arguments.length < 2) {
	      if (typeof name === "string") {
	        var node = this.node();
	        name = d3.ns.qualify(name);
	        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
	      }
	      for (value in name) this.each(d3_selection_attr(value, name[value]));
	      return this;
	    }
	    return this.each(d3_selection_attr(name, value));
	  };
	  function d3_selection_attr(name, value) {
	    name = d3.ns.qualify(name);
	    function attrNull() {
	      this.removeAttribute(name);
	    }
	    function attrNullNS() {
	      this.removeAttributeNS(name.space, name.local);
	    }
	    function attrConstant() {
	      this.setAttribute(name, value);
	    }
	    function attrConstantNS() {
	      this.setAttributeNS(name.space, name.local, value);
	    }
	    function attrFunction() {
	      var x = value.apply(this, arguments);
	      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
	    }
	    function attrFunctionNS() {
	      var x = value.apply(this, arguments);
	      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
	    }
	    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
	  }
	  function d3_collapse(s) {
	    return s.trim().replace(/\s+/g, " ");
	  }
	  d3_selectionPrototype.classed = function(name, value) {
	    if (arguments.length < 2) {
	      if (typeof name === "string") {
	        var node = this.node(), n = (name = d3_selection_classes(name)).length, i = -1;
	        if (value = node.classList) {
	          while (++i < n) if (!value.contains(name[i])) return false;
	        } else {
	          value = node.getAttribute("class");
	          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
	        }
	        return true;
	      }
	      for (value in name) this.each(d3_selection_classed(value, name[value]));
	      return this;
	    }
	    return this.each(d3_selection_classed(name, value));
	  };
	  function d3_selection_classedRe(name) {
	    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
	  }
	  function d3_selection_classes(name) {
	    return (name + "").trim().split(/^|\s+/);
	  }
	  function d3_selection_classed(name, value) {
	    name = d3_selection_classes(name).map(d3_selection_classedName);
	    var n = name.length;
	    function classedConstant() {
	      var i = -1;
	      while (++i < n) name[i](this, value);
	    }
	    function classedFunction() {
	      var i = -1, x = value.apply(this, arguments);
	      while (++i < n) name[i](this, x);
	    }
	    return typeof value === "function" ? classedFunction : classedConstant;
	  }
	  function d3_selection_classedName(name) {
	    var re = d3_selection_classedRe(name);
	    return function(node, value) {
	      if (c = node.classList) return value ? c.add(name) : c.remove(name);
	      var c = node.getAttribute("class") || "";
	      if (value) {
	        re.lastIndex = 0;
	        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
	      } else {
	        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
	      }
	    };
	  }
	  d3_selectionPrototype.style = function(name, value, priority) {
	    var n = arguments.length;
	    if (n < 3) {
	      if (typeof name !== "string") {
	        if (n < 2) value = "";
	        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
	        return this;
	      }
	      if (n < 2) {
	        var node = this.node();
	        return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
	      }
	      priority = "";
	    }
	    return this.each(d3_selection_style(name, value, priority));
	  };
	  function d3_selection_style(name, value, priority) {
	    function styleNull() {
	      this.style.removeProperty(name);
	    }
	    function styleConstant() {
	      this.style.setProperty(name, value, priority);
	    }
	    function styleFunction() {
	      var x = value.apply(this, arguments);
	      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
	    }
	    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
	  }
	  d3_selectionPrototype.property = function(name, value) {
	    if (arguments.length < 2) {
	      if (typeof name === "string") return this.node()[name];
	      for (value in name) this.each(d3_selection_property(value, name[value]));
	      return this;
	    }
	    return this.each(d3_selection_property(name, value));
	  };
	  function d3_selection_property(name, value) {
	    function propertyNull() {
	      delete this[name];
	    }
	    function propertyConstant() {
	      this[name] = value;
	    }
	    function propertyFunction() {
	      var x = value.apply(this, arguments);
	      if (x == null) delete this[name]; else this[name] = x;
	    }
	    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
	  }
	  d3_selectionPrototype.text = function(value) {
	    return arguments.length ? this.each(typeof value === "function" ? function() {
	      var v = value.apply(this, arguments);
	      this.textContent = v == null ? "" : v;
	    } : value == null ? function() {
	      this.textContent = "";
	    } : function() {
	      this.textContent = value;
	    }) : this.node().textContent;
	  };
	  d3_selectionPrototype.html = function(value) {
	    return arguments.length ? this.each(typeof value === "function" ? function() {
	      var v = value.apply(this, arguments);
	      this.innerHTML = v == null ? "" : v;
	    } : value == null ? function() {
	      this.innerHTML = "";
	    } : function() {
	      this.innerHTML = value;
	    }) : this.node().innerHTML;
	  };
	  d3_selectionPrototype.append = function(name) {
	    name = d3_selection_creator(name);
	    return this.select(function() {
	      return this.appendChild(name.apply(this, arguments));
	    });
	  };
	  function d3_selection_creator(name) {
	    function create() {
	      var document = this.ownerDocument, namespace = this.namespaceURI;
	      return namespace === d3_nsXhtml && document.documentElement.namespaceURI === d3_nsXhtml ? document.createElement(name) : document.createElementNS(namespace, name);
	    }
	    function createNS() {
	      return this.ownerDocument.createElementNS(name.space, name.local);
	    }
	    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? createNS : create;
	  }
	  d3_selectionPrototype.insert = function(name, before) {
	    name = d3_selection_creator(name);
	    before = d3_selection_selector(before);
	    return this.select(function() {
	      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
	    });
	  };
	  d3_selectionPrototype.remove = function() {
	    return this.each(d3_selectionRemove);
	  };
	  function d3_selectionRemove() {
	    var parent = this.parentNode;
	    if (parent) parent.removeChild(this);
	  }
	  d3_selectionPrototype.data = function(value, key) {
	    var i = -1, n = this.length, group, node;
	    if (!arguments.length) {
	      value = new Array(n = (group = this[0]).length);
	      while (++i < n) {
	        if (node = group[i]) {
	          value[i] = node.__data__;
	        }
	      }
	      return value;
	    }
	    function bind(group, groupData) {
	      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
	      if (key) {
	        var nodeByKeyValue = new d3_Map(), keyValues = new Array(n), keyValue;
	        for (i = -1; ++i < n; ) {
	          if (node = group[i]) {
	            if (nodeByKeyValue.has(keyValue = key.call(node, node.__data__, i))) {
	              exitNodes[i] = node;
	            } else {
	              nodeByKeyValue.set(keyValue, node);
	            }
	            keyValues[i] = keyValue;
	          }
	        }
	        for (i = -1; ++i < m; ) {
	          if (!(node = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i], i)))) {
	            enterNodes[i] = d3_selection_dataNode(nodeData);
	          } else if (node !== true) {
	            updateNodes[i] = node;
	            node.__data__ = nodeData;
	          }
	          nodeByKeyValue.set(keyValue, true);
	        }
	        for (i = -1; ++i < n; ) {
	          if (i in keyValues && nodeByKeyValue.get(keyValues[i]) !== true) {
	            exitNodes[i] = group[i];
	          }
	        }
	      } else {
	        for (i = -1; ++i < n0; ) {
	          node = group[i];
	          nodeData = groupData[i];
	          if (node) {
	            node.__data__ = nodeData;
	            updateNodes[i] = node;
	          } else {
	            enterNodes[i] = d3_selection_dataNode(nodeData);
	          }
	        }
	        for (;i < m; ++i) {
	          enterNodes[i] = d3_selection_dataNode(groupData[i]);
	        }
	        for (;i < n; ++i) {
	          exitNodes[i] = group[i];
	        }
	      }
	      enterNodes.update = updateNodes;
	      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
	      enter.push(enterNodes);
	      update.push(updateNodes);
	      exit.push(exitNodes);
	    }
	    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
	    if (typeof value === "function") {
	      while (++i < n) {
	        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
	      }
	    } else {
	      while (++i < n) {
	        bind(group = this[i], value);
	      }
	    }
	    update.enter = function() {
	      return enter;
	    };
	    update.exit = function() {
	      return exit;
	    };
	    return update;
	  };
	  function d3_selection_dataNode(data) {
	    return {
	      __data__: data
	    };
	  }
	  d3_selectionPrototype.datum = function(value) {
	    return arguments.length ? this.property("__data__", value) : this.property("__data__");
	  };
	  d3_selectionPrototype.filter = function(filter) {
	    var subgroups = [], subgroup, group, node;
	    if (typeof filter !== "function") filter = d3_selection_filter(filter);
	    for (var j = 0, m = this.length; j < m; j++) {
	      subgroups.push(subgroup = []);
	      subgroup.parentNode = (group = this[j]).parentNode;
	      for (var i = 0, n = group.length; i < n; i++) {
	        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
	          subgroup.push(node);
	        }
	      }
	    }
	    return d3_selection(subgroups);
	  };
	  function d3_selection_filter(selector) {
	    return function() {
	      return d3_selectMatches(this, selector);
	    };
	  }
	  d3_selectionPrototype.order = function() {
	    for (var j = -1, m = this.length; ++j < m; ) {
	      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
	        if (node = group[i]) {
	          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	          next = node;
	        }
	      }
	    }
	    return this;
	  };
	  d3_selectionPrototype.sort = function(comparator) {
	    comparator = d3_selection_sortComparator.apply(this, arguments);
	    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
	    return this.order();
	  };
	  function d3_selection_sortComparator(comparator) {
	    if (!arguments.length) comparator = d3_ascending;
	    return function(a, b) {
	      return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
	    };
	  }
	  d3_selectionPrototype.each = function(callback) {
	    return d3_selection_each(this, function(node, i, j) {
	      callback.call(node, node.__data__, i, j);
	    });
	  };
	  function d3_selection_each(groups, callback) {
	    for (var j = 0, m = groups.length; j < m; j++) {
	      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
	        if (node = group[i]) callback(node, i, j);
	      }
	    }
	    return groups;
	  }
	  d3_selectionPrototype.call = function(callback) {
	    var args = d3_array(arguments);
	    callback.apply(args[0] = this, args);
	    return this;
	  };
	  d3_selectionPrototype.empty = function() {
	    return !this.node();
	  };
	  d3_selectionPrototype.node = function() {
	    for (var j = 0, m = this.length; j < m; j++) {
	      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
	        var node = group[i];
	        if (node) return node;
	      }
	    }
	    return null;
	  };
	  d3_selectionPrototype.size = function() {
	    var n = 0;
	    d3_selection_each(this, function() {
	      ++n;
	    });
	    return n;
	  };
	  function d3_selection_enter(selection) {
	    d3_subclass(selection, d3_selection_enterPrototype);
	    return selection;
	  }
	  var d3_selection_enterPrototype = [];
	  d3.selection.enter = d3_selection_enter;
	  d3.selection.enter.prototype = d3_selection_enterPrototype;
	  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
	  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
	  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
	  d3_selection_enterPrototype.call = d3_selectionPrototype.call;
	  d3_selection_enterPrototype.size = d3_selectionPrototype.size;
	  d3_selection_enterPrototype.select = function(selector) {
	    var subgroups = [], subgroup, subnode, upgroup, group, node;
	    for (var j = -1, m = this.length; ++j < m; ) {
	      upgroup = (group = this[j]).update;
	      subgroups.push(subgroup = []);
	      subgroup.parentNode = group.parentNode;
	      for (var i = -1, n = group.length; ++i < n; ) {
	        if (node = group[i]) {
	          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
	          subnode.__data__ = node.__data__;
	        } else {
	          subgroup.push(null);
	        }
	      }
	    }
	    return d3_selection(subgroups);
	  };
	  d3_selection_enterPrototype.insert = function(name, before) {
	    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
	    return d3_selectionPrototype.insert.call(this, name, before);
	  };
	  function d3_selection_enterInsertBefore(enter) {
	    var i0, j0;
	    return function(d, i, j) {
	      var group = enter[j].update, n = group.length, node;
	      if (j != j0) j0 = j, i0 = 0;
	      if (i >= i0) i0 = i + 1;
	      while (!(node = group[i0]) && ++i0 < n) ;
	      return node;
	    };
	  }
	  d3.select = function(node) {
	    var group;
	    if (typeof node === "string") {
	      group = [ d3_select(node, d3_document) ];
	      group.parentNode = d3_document.documentElement;
	    } else {
	      group = [ node ];
	      group.parentNode = d3_documentElement(node);
	    }
	    return d3_selection([ group ]);
	  };
	  d3.selectAll = function(nodes) {
	    var group;
	    if (typeof nodes === "string") {
	      group = d3_array(d3_selectAll(nodes, d3_document));
	      group.parentNode = d3_document.documentElement;
	    } else {
	      group = d3_array(nodes);
	      group.parentNode = null;
	    }
	    return d3_selection([ group ]);
	  };
	  d3_selectionPrototype.on = function(type, listener, capture) {
	    var n = arguments.length;
	    if (n < 3) {
	      if (typeof type !== "string") {
	        if (n < 2) listener = false;
	        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
	        return this;
	      }
	      if (n < 2) return (n = this.node()["__on" + type]) && n._;
	      capture = false;
	    }
	    return this.each(d3_selection_on(type, listener, capture));
	  };
	  function d3_selection_on(type, listener, capture) {
	    var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
	    if (i > 0) type = type.slice(0, i);
	    var filter = d3_selection_onFilters.get(type);
	    if (filter) type = filter, wrap = d3_selection_onFilter;
	    function onRemove() {
	      var l = this[name];
	      if (l) {
	        this.removeEventListener(type, l, l.$);
	        delete this[name];
	      }
	    }
	    function onAdd() {
	      var l = wrap(listener, d3_array(arguments));
	      onRemove.call(this);
	      this.addEventListener(type, this[name] = l, l.$ = capture);
	      l._ = listener;
	    }
	    function removeAll() {
	      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
	      for (var name in this) {
	        if (match = name.match(re)) {
	          var l = this[name];
	          this.removeEventListener(match[1], l, l.$);
	          delete this[name];
	        }
	      }
	    }
	    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
	  }
	  var d3_selection_onFilters = d3.map({
	    mouseenter: "mouseover",
	    mouseleave: "mouseout"
	  });
	  if (d3_document) {
	    d3_selection_onFilters.forEach(function(k) {
	      if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
	    });
	  }
	  function d3_selection_onListener(listener, argumentz) {
	    return function(e) {
	      var o = d3.event;
	      d3.event = e;
	      argumentz[0] = this.__data__;
	      try {
	        listener.apply(this, argumentz);
	      } finally {
	        d3.event = o;
	      }
	    };
	  }
	  function d3_selection_onFilter(listener, argumentz) {
	    var l = d3_selection_onListener(listener, argumentz);
	    return function(e) {
	      var target = this, related = e.relatedTarget;
	      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
	        l.call(target, e);
	      }
	    };
	  }
	  var d3_event_dragSelect, d3_event_dragId = 0;
	  function d3_event_dragSuppress(node) {
	    var name = ".dragsuppress-" + ++d3_event_dragId, click = "click" + name, w = d3.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
	    if (d3_event_dragSelect == null) {
	      d3_event_dragSelect = "onselectstart" in node ? false : d3_vendorSymbol(node.style, "userSelect");
	    }
	    if (d3_event_dragSelect) {
	      var style = d3_documentElement(node).style, select = style[d3_event_dragSelect];
	      style[d3_event_dragSelect] = "none";
	    }
	    return function(suppressClick) {
	      w.on(name, null);
	      if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
	      if (suppressClick) {
	        var off = function() {
	          w.on(click, null);
	        };
	        w.on(click, function() {
	          d3_eventPreventDefault();
	          off();
	        }, true);
	        setTimeout(off, 0);
	      }
	    };
	  }
	  d3.mouse = function(container) {
	    return d3_mousePoint(container, d3_eventSource());
	  };
	  var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
	  function d3_mousePoint(container, e) {
	    if (e.changedTouches) e = e.changedTouches[0];
	    var svg = container.ownerSVGElement || container;
	    if (svg.createSVGPoint) {
	      var point = svg.createSVGPoint();
	      if (d3_mouse_bug44083 < 0) {
	        var window = d3_window(container);
	        if (window.scrollX || window.scrollY) {
	          svg = d3.select("body").append("svg").style({
	            position: "absolute",
	            top: 0,
	            left: 0,
	            margin: 0,
	            padding: 0,
	            border: "none"
	          }, "important");
	          var ctm = svg[0][0].getScreenCTM();
	          d3_mouse_bug44083 = !(ctm.f || ctm.e);
	          svg.remove();
	        }
	      }
	      if (d3_mouse_bug44083) point.x = e.pageX, point.y = e.pageY; else point.x = e.clientX, 
	      point.y = e.clientY;
	      point = point.matrixTransform(container.getScreenCTM().inverse());
	      return [ point.x, point.y ];
	    }
	    var rect = container.getBoundingClientRect();
	    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
	  }
	  d3.touch = function(container, touches, identifier) {
	    if (arguments.length < 3) identifier = touches, touches = d3_eventSource().changedTouches;
	    if (touches) for (var i = 0, n = touches.length, touch; i < n; ++i) {
	      if ((touch = touches[i]).identifier === identifier) {
	        return d3_mousePoint(container, touch);
	      }
	    }
	  };
	  d3.behavior.drag = function() {
	    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d3.mouse, d3_window, "mousemove", "mouseup"), touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, "touchmove", "touchend");
	    function drag() {
	      this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
	    }
	    function dragstart(id, position, subject, move, end) {
	      return function() {
	        var that = this, target = d3.event.target.correspondingElement || d3.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(), dragName = ".drag" + (dragId == null ? "" : "-" + dragId), dragOffset, dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended), dragRestore = d3_event_dragSuppress(target), position0 = position(parent, dragId);
	        if (origin) {
	          dragOffset = origin.apply(that, arguments);
	          dragOffset = [ dragOffset.x - position0[0], dragOffset.y - position0[1] ];
	        } else {
	          dragOffset = [ 0, 0 ];
	        }
	        dispatch({
	          type: "dragstart"
	        });
	        function moved() {
	          var position1 = position(parent, dragId), dx, dy;
	          if (!position1) return;
	          dx = position1[0] - position0[0];
	          dy = position1[1] - position0[1];
	          dragged |= dx | dy;
	          position0 = position1;
	          dispatch({
	            type: "drag",
	            x: position1[0] + dragOffset[0],
	            y: position1[1] + dragOffset[1],
	            dx: dx,
	            dy: dy
	          });
	        }
	        function ended() {
	          if (!position(parent, dragId)) return;
	          dragSubject.on(move + dragName, null).on(end + dragName, null);
	          dragRestore(dragged);
	          dispatch({
	            type: "dragend"
	          });
	        }
	      };
	    }
	    drag.origin = function(x) {
	      if (!arguments.length) return origin;
	      origin = x;
	      return drag;
	    };
	    return d3.rebind(drag, event, "on");
	  };
	  function d3_behavior_dragTouchId() {
	    return d3.event.changedTouches[0].identifier;
	  }
	  d3.touches = function(container, touches) {
	    if (arguments.length < 2) touches = d3_eventSource().touches;
	    return touches ? d3_array(touches).map(function(touch) {
	      var point = d3_mousePoint(container, touch);
	      point.identifier = touch.identifier;
	      return point;
	    }) : [];
	  };
	  var ε = 1e-6, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, d3_radians = π / 180, d3_degrees = 180 / π;
	  function d3_sgn(x) {
	    return x > 0 ? 1 : x < 0 ? -1 : 0;
	  }
	  function d3_cross2d(a, b, c) {
	    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
	  }
	  function d3_acos(x) {
	    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
	  }
	  function d3_asin(x) {
	    return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
	  }
	  function d3_sinh(x) {
	    return ((x = Math.exp(x)) - 1 / x) / 2;
	  }
	  function d3_cosh(x) {
	    return ((x = Math.exp(x)) + 1 / x) / 2;
	  }
	  function d3_tanh(x) {
	    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	  }
	  function d3_haversin(x) {
	    return (x = Math.sin(x / 2)) * x;
	  }
	  var ρ = Math.SQRT2, ρ2 = 2, ρ4 = 4;
	  d3.interpolateZoom = function(p0, p1) {
	    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
	    if (d2 < ε2) {
	      S = Math.log(w1 / w0) / ρ;
	      i = function(t) {
	        return [ ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * t * S) ];
	      };
	    } else {
	      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1), b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	      S = (r1 - r0) / ρ;
	      i = function(t) {
	        var s = t * S, coshr0 = d3_cosh(r0), u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
	        return [ ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0) ];
	      };
	    }
	    i.duration = S * 1e3;
	    return i;
	  };
	  d3.behavior.zoom = function() {
	    var view = {
	      x: 0,
	      y: 0,
	      k: 1
	    }, translate0, center0, center, size = [ 960, 500 ], scaleExtent = d3_behavior_zoomInfinity, duration = 250, zooming = 0, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", mousewheelTimer, touchstart = "touchstart.zoom", touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"), x0, x1, y0, y1;
	    if (!d3_behavior_zoomWheel) {
	      d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
	        return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
	      }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
	        return d3.event.wheelDelta;
	      }, "mousewheel") : (d3_behavior_zoomDelta = function() {
	        return -d3.event.detail;
	      }, "MozMousePixelScroll");
	    }
	    function zoom(g) {
	      g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
	    }
	    zoom.event = function(g) {
	      g.each(function() {
	        var dispatch = event.of(this, arguments), view1 = view;
	        if (d3_transitionInheritId) {
	          d3.select(this).transition().each("start.zoom", function() {
	            view = this.__chart__ || {
	              x: 0,
	              y: 0,
	              k: 1
	            };
	            zoomstarted(dispatch);
	          }).tween("zoom:zoom", function() {
	            var dx = size[0], dy = size[1], cx = center0 ? center0[0] : dx / 2, cy = center0 ? center0[1] : dy / 2, i = d3.interpolateZoom([ (cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k ], [ (cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k ]);
	            return function(t) {
	              var l = i(t), k = dx / l[2];
	              this.__chart__ = view = {
	                x: cx - l[0] * k,
	                y: cy - l[1] * k,
	                k: k
	              };
	              zoomed(dispatch);
	            };
	          }).each("interrupt.zoom", function() {
	            zoomended(dispatch);
	          }).each("end.zoom", function() {
	            zoomended(dispatch);
	          });
	        } else {
	          this.__chart__ = view;
	          zoomstarted(dispatch);
	          zoomed(dispatch);
	          zoomended(dispatch);
	        }
	      });
	    };
	    zoom.translate = function(_) {
	      if (!arguments.length) return [ view.x, view.y ];
	      view = {
	        x: +_[0],
	        y: +_[1],
	        k: view.k
	      };
	      rescale();
	      return zoom;
	    };
	    zoom.scale = function(_) {
	      if (!arguments.length) return view.k;
	      view = {
	        x: view.x,
	        y: view.y,
	        k: null
	      };
	      scaleTo(+_);
	      rescale();
	      return zoom;
	    };
	    zoom.scaleExtent = function(_) {
	      if (!arguments.length) return scaleExtent;
	      scaleExtent = _ == null ? d3_behavior_zoomInfinity : [ +_[0], +_[1] ];
	      return zoom;
	    };
	    zoom.center = function(_) {
	      if (!arguments.length) return center;
	      center = _ && [ +_[0], +_[1] ];
	      return zoom;
	    };
	    zoom.size = function(_) {
	      if (!arguments.length) return size;
	      size = _ && [ +_[0], +_[1] ];
	      return zoom;
	    };
	    zoom.duration = function(_) {
	      if (!arguments.length) return duration;
	      duration = +_;
	      return zoom;
	    };
	    zoom.x = function(z) {
	      if (!arguments.length) return x1;
	      x1 = z;
	      x0 = z.copy();
	      view = {
	        x: 0,
	        y: 0,
	        k: 1
	      };
	      return zoom;
	    };
	    zoom.y = function(z) {
	      if (!arguments.length) return y1;
	      y1 = z;
	      y0 = z.copy();
	      view = {
	        x: 0,
	        y: 0,
	        k: 1
	      };
	      return zoom;
	    };
	    function location(p) {
	      return [ (p[0] - view.x) / view.k, (p[1] - view.y) / view.k ];
	    }
	    function point(l) {
	      return [ l[0] * view.k + view.x, l[1] * view.k + view.y ];
	    }
	    function scaleTo(s) {
	      view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
	    }
	    function translateTo(p, l) {
	      l = point(l);
	      view.x += p[0] - l[0];
	      view.y += p[1] - l[1];
	    }
	    function zoomTo(that, p, l, k) {
	      that.__chart__ = {
	        x: view.x,
	        y: view.y,
	        k: view.k
	      };
	      scaleTo(Math.pow(2, k));
	      translateTo(center0 = p, l);
	      that = d3.select(that);
	      if (duration > 0) that = that.transition().duration(duration);
	      that.call(zoom.event);
	    }
	    function rescale() {
	      if (x1) x1.domain(x0.range().map(function(x) {
	        return (x - view.x) / view.k;
	      }).map(x0.invert));
	      if (y1) y1.domain(y0.range().map(function(y) {
	        return (y - view.y) / view.k;
	      }).map(y0.invert));
	    }
	    function zoomstarted(dispatch) {
	      if (!zooming++) dispatch({
	        type: "zoomstart"
	      });
	    }
	    function zoomed(dispatch) {
	      rescale();
	      dispatch({
	        type: "zoom",
	        scale: view.k,
	        translate: [ view.x, view.y ]
	      });
	    }
	    function zoomended(dispatch) {
	      if (!--zooming) dispatch({
	        type: "zoomend"
	      }), center0 = null;
	    }
	    function mousedowned() {
	      var that = this, dispatch = event.of(that, arguments), dragged = 0, subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended), location0 = location(d3.mouse(that)), dragRestore = d3_event_dragSuppress(that);
	      d3_selection_interrupt.call(that);
	      zoomstarted(dispatch);
	      function moved() {
	        dragged = 1;
	        translateTo(d3.mouse(that), location0);
	        zoomed(dispatch);
	      }
	      function ended() {
	        subject.on(mousemove, null).on(mouseup, null);
	        dragRestore(dragged);
	        zoomended(dispatch);
	      }
	    }
	    function touchstarted() {
	      var that = this, dispatch = event.of(that, arguments), locations0 = {}, distance0 = 0, scale0, zoomName = ".zoom-" + d3.event.changedTouches[0].identifier, touchmove = "touchmove" + zoomName, touchend = "touchend" + zoomName, targets = [], subject = d3.select(that), dragRestore = d3_event_dragSuppress(that);
	      started();
	      zoomstarted(dispatch);
	      subject.on(mousedown, null).on(touchstart, started);
	      function relocate() {
	        var touches = d3.touches(that);
	        scale0 = view.k;
	        touches.forEach(function(t) {
	          if (t.identifier in locations0) locations0[t.identifier] = location(t);
	        });
	        return touches;
	      }
	      function started() {
	        var target = d3.event.target;
	        d3.select(target).on(touchmove, moved).on(touchend, ended);
	        targets.push(target);
	        var changed = d3.event.changedTouches;
	        for (var i = 0, n = changed.length; i < n; ++i) {
	          locations0[changed[i].identifier] = null;
	        }
	        var touches = relocate(), now = Date.now();
	        if (touches.length === 1) {
	          if (now - touchtime < 500) {
	            var p = touches[0];
	            zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
	            d3_eventPreventDefault();
	          }
	          touchtime = now;
	        } else if (touches.length > 1) {
	          var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
	          distance0 = dx * dx + dy * dy;
	        }
	      }
	      function moved() {
	        var touches = d3.touches(that), p0, l0, p1, l1;
	        d3_selection_interrupt.call(that);
	        for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
	          p1 = touches[i];
	          if (l1 = locations0[p1.identifier]) {
	            if (l0) break;
	            p0 = p1, l0 = l1;
	          }
	        }
	        if (l1) {
	          var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1, scale1 = distance0 && Math.sqrt(distance1 / distance0);
	          p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
	          l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
	          scaleTo(scale1 * scale0);
	        }
	        touchtime = null;
	        translateTo(p0, l0);
	        zoomed(dispatch);
	      }
	      function ended() {
	        if (d3.event.touches.length) {
	          var changed = d3.event.changedTouches;
	          for (var i = 0, n = changed.length; i < n; ++i) {
	            delete locations0[changed[i].identifier];
	          }
	          for (var identifier in locations0) {
	            return void relocate();
	          }
	        }
	        d3.selectAll(targets).on(zoomName, null);
	        subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
	        dragRestore();
	        zoomended(dispatch);
	      }
	    }
	    function mousewheeled() {
	      var dispatch = event.of(this, arguments);
	      if (mousewheelTimer) clearTimeout(mousewheelTimer); else d3_selection_interrupt.call(this), 
	      translate0 = location(center0 = center || d3.mouse(this)), zoomstarted(dispatch);
	      mousewheelTimer = setTimeout(function() {
	        mousewheelTimer = null;
	        zoomended(dispatch);
	      }, 50);
	      d3_eventPreventDefault();
	      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.k);
	      translateTo(center0, translate0);
	      zoomed(dispatch);
	    }
	    function dblclicked() {
	      var p = d3.mouse(this), k = Math.log(view.k) / Math.LN2;
	      zoomTo(this, p, location(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
	    }
	    return d3.rebind(zoom, event, "on");
	  };
	  var d3_behavior_zoomInfinity = [ 0, Infinity ], d3_behavior_zoomDelta, d3_behavior_zoomWheel;
	  d3.color = d3_color;
	  function d3_color() {}
	  d3_color.prototype.toString = function() {
	    return this.rgb() + "";
	  };
	  d3.hsl = d3_hsl;
	  function d3_hsl(h, s, l) {
	    return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
	  }
	  var d3_hslPrototype = d3_hsl.prototype = new d3_color();
	  d3_hslPrototype.brighter = function(k) {
	    k = Math.pow(.7, arguments.length ? k : 1);
	    return new d3_hsl(this.h, this.s, this.l / k);
	  };
	  d3_hslPrototype.darker = function(k) {
	    k = Math.pow(.7, arguments.length ? k : 1);
	    return new d3_hsl(this.h, this.s, k * this.l);
	  };
	  d3_hslPrototype.rgb = function() {
	    return d3_hsl_rgb(this.h, this.s, this.l);
	  };
	  function d3_hsl_rgb(h, s, l) {
	    var m1, m2;
	    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
	    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
	    l = l < 0 ? 0 : l > 1 ? 1 : l;
	    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
	    m1 = 2 * l - m2;
	    function v(h) {
	      if (h > 360) h -= 360; else if (h < 0) h += 360;
	      if (h < 60) return m1 + (m2 - m1) * h / 60;
	      if (h < 180) return m2;
	      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
	      return m1;
	    }
	    function vv(h) {
	      return Math.round(v(h) * 255);
	    }
	    return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
	  }
	  d3.hcl = d3_hcl;
	  function d3_hcl(h, c, l) {
	    return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
	  }
	  var d3_hclPrototype = d3_hcl.prototype = new d3_color();
	  d3_hclPrototype.brighter = function(k) {
	    return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
	  };
	  d3_hclPrototype.darker = function(k) {
	    return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
	  };
	  d3_hclPrototype.rgb = function() {
	    return d3_hcl_lab(this.h, this.c, this.l).rgb();
	  };
	  function d3_hcl_lab(h, c, l) {
	    if (isNaN(h)) h = 0;
	    if (isNaN(c)) c = 0;
	    return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
	  }
	  d3.lab = d3_lab;
	  function d3_lab(l, a, b) {
	    return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
	  }
	  var d3_lab_K = 18;
	  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
	  var d3_labPrototype = d3_lab.prototype = new d3_color();
	  d3_labPrototype.brighter = function(k) {
	    return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
	  };
	  d3_labPrototype.darker = function(k) {
	    return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
	  };
	  d3_labPrototype.rgb = function() {
	    return d3_lab_rgb(this.l, this.a, this.b);
	  };
	  function d3_lab_rgb(l, a, b) {
	    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
	    x = d3_lab_xyz(x) * d3_lab_X;
	    y = d3_lab_xyz(y) * d3_lab_Y;
	    z = d3_lab_xyz(z) * d3_lab_Z;
	    return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
	  }
	  function d3_lab_hcl(l, a, b) {
	    return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
	  }
	  function d3_lab_xyz(x) {
	    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
	  }
	  function d3_xyz_lab(x) {
	    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
	  }
	  function d3_xyz_rgb(r) {
	    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
	  }
	  d3.rgb = d3_rgb;
	  function d3_rgb(r, g, b) {
	    return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
	  }
	  function d3_rgbNumber(value) {
	    return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
	  }
	  function d3_rgbString(value) {
	    return d3_rgbNumber(value) + "";
	  }
	  var d3_rgbPrototype = d3_rgb.prototype = new d3_color();
	  d3_rgbPrototype.brighter = function(k) {
	    k = Math.pow(.7, arguments.length ? k : 1);
	    var r = this.r, g = this.g, b = this.b, i = 30;
	    if (!r && !g && !b) return new d3_rgb(i, i, i);
	    if (r && r < i) r = i;
	    if (g && g < i) g = i;
	    if (b && b < i) b = i;
	    return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
	  };
	  d3_rgbPrototype.darker = function(k) {
	    k = Math.pow(.7, arguments.length ? k : 1);
	    return new d3_rgb(k * this.r, k * this.g, k * this.b);
	  };
	  d3_rgbPrototype.hsl = function() {
	    return d3_rgb_hsl(this.r, this.g, this.b);
	  };
	  d3_rgbPrototype.toString = function() {
	    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
	  };
	  function d3_rgb_hex(v) {
	    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
	  }
	  function d3_rgb_parse(format, rgb, hsl) {
	    var r = 0, g = 0, b = 0, m1, m2, color;
	    m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
	    if (m1) {
	      m2 = m1[2].split(",");
	      switch (m1[1]) {
	       case "hsl":
	        {
	          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
	        }

	       case "rgb":
	        {
	          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
	        }
	      }
	    }
	    if (color = d3_rgb_names.get(format)) {
	      return rgb(color.r, color.g, color.b);
	    }
	    if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
	      if (format.length === 4) {
	        r = (color & 3840) >> 4;
	        r = r >> 4 | r;
	        g = color & 240;
	        g = g >> 4 | g;
	        b = color & 15;
	        b = b << 4 | b;
	      } else if (format.length === 7) {
	        r = (color & 16711680) >> 16;
	        g = (color & 65280) >> 8;
	        b = color & 255;
	      }
	    }
	    return rgb(r, g, b);
	  }
	  function d3_rgb_hsl(r, g, b) {
	    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
	    if (d) {
	      s = l < .5 ? d / (max + min) : d / (2 - max - min);
	      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
	      h *= 60;
	    } else {
	      h = NaN;
	      s = l > 0 && l < 1 ? 0 : h;
	    }
	    return new d3_hsl(h, s, l);
	  }
	  function d3_rgb_lab(r, g, b) {
	    r = d3_rgb_xyz(r);
	    g = d3_rgb_xyz(g);
	    b = d3_rgb_xyz(b);
	    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
	    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
	  }
	  function d3_rgb_xyz(r) {
	    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
	  }
	  function d3_rgb_parseNumber(c) {
	    var f = parseFloat(c);
	    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
	  }
	  var d3_rgb_names = d3.map({
	    aliceblue: 15792383,
	    antiquewhite: 16444375,
	    aqua: 65535,
	    aquamarine: 8388564,
	    azure: 15794175,
	    beige: 16119260,
	    bisque: 16770244,
	    black: 0,
	    blanchedalmond: 16772045,
	    blue: 255,
	    blueviolet: 9055202,
	    brown: 10824234,
	    burlywood: 14596231,
	    cadetblue: 6266528,
	    chartreuse: 8388352,
	    chocolate: 13789470,
	    coral: 16744272,
	    cornflowerblue: 6591981,
	    cornsilk: 16775388,
	    crimson: 14423100,
	    cyan: 65535,
	    darkblue: 139,
	    darkcyan: 35723,
	    darkgoldenrod: 12092939,
	    darkgray: 11119017,
	    darkgreen: 25600,
	    darkgrey: 11119017,
	    darkkhaki: 12433259,
	    darkmagenta: 9109643,
	    darkolivegreen: 5597999,
	    darkorange: 16747520,
	    darkorchid: 10040012,
	    darkred: 9109504,
	    darksalmon: 15308410,
	    darkseagreen: 9419919,
	    darkslateblue: 4734347,
	    darkslategray: 3100495,
	    darkslategrey: 3100495,
	    darkturquoise: 52945,
	    darkviolet: 9699539,
	    deeppink: 16716947,
	    deepskyblue: 49151,
	    dimgray: 6908265,
	    dimgrey: 6908265,
	    dodgerblue: 2003199,
	    firebrick: 11674146,
	    floralwhite: 16775920,
	    forestgreen: 2263842,
	    fuchsia: 16711935,
	    gainsboro: 14474460,
	    ghostwhite: 16316671,
	    gold: 16766720,
	    goldenrod: 14329120,
	    gray: 8421504,
	    green: 32768,
	    greenyellow: 11403055,
	    grey: 8421504,
	    honeydew: 15794160,
	    hotpink: 16738740,
	    indianred: 13458524,
	    indigo: 4915330,
	    ivory: 16777200,
	    khaki: 15787660,
	    lavender: 15132410,
	    lavenderblush: 16773365,
	    lawngreen: 8190976,
	    lemonchiffon: 16775885,
	    lightblue: 11393254,
	    lightcoral: 15761536,
	    lightcyan: 14745599,
	    lightgoldenrodyellow: 16448210,
	    lightgray: 13882323,
	    lightgreen: 9498256,
	    lightgrey: 13882323,
	    lightpink: 16758465,
	    lightsalmon: 16752762,
	    lightseagreen: 2142890,
	    lightskyblue: 8900346,
	    lightslategray: 7833753,
	    lightslategrey: 7833753,
	    lightsteelblue: 11584734,
	    lightyellow: 16777184,
	    lime: 65280,
	    limegreen: 3329330,
	    linen: 16445670,
	    magenta: 16711935,
	    maroon: 8388608,
	    mediumaquamarine: 6737322,
	    mediumblue: 205,
	    mediumorchid: 12211667,
	    mediumpurple: 9662683,
	    mediumseagreen: 3978097,
	    mediumslateblue: 8087790,
	    mediumspringgreen: 64154,
	    mediumturquoise: 4772300,
	    mediumvioletred: 13047173,
	    midnightblue: 1644912,
	    mintcream: 16121850,
	    mistyrose: 16770273,
	    moccasin: 16770229,
	    navajowhite: 16768685,
	    navy: 128,
	    oldlace: 16643558,
	    olive: 8421376,
	    olivedrab: 7048739,
	    orange: 16753920,
	    orangered: 16729344,
	    orchid: 14315734,
	    palegoldenrod: 15657130,
	    palegreen: 10025880,
	    paleturquoise: 11529966,
	    palevioletred: 14381203,
	    papayawhip: 16773077,
	    peachpuff: 16767673,
	    peru: 13468991,
	    pink: 16761035,
	    plum: 14524637,
	    powderblue: 11591910,
	    purple: 8388736,
	    rebeccapurple: 6697881,
	    red: 16711680,
	    rosybrown: 12357519,
	    royalblue: 4286945,
	    saddlebrown: 9127187,
	    salmon: 16416882,
	    sandybrown: 16032864,
	    seagreen: 3050327,
	    seashell: 16774638,
	    sienna: 10506797,
	    silver: 12632256,
	    skyblue: 8900331,
	    slateblue: 6970061,
	    slategray: 7372944,
	    slategrey: 7372944,
	    snow: 16775930,
	    springgreen: 65407,
	    steelblue: 4620980,
	    tan: 13808780,
	    teal: 32896,
	    thistle: 14204888,
	    tomato: 16737095,
	    turquoise: 4251856,
	    violet: 15631086,
	    wheat: 16113331,
	    white: 16777215,
	    whitesmoke: 16119285,
	    yellow: 16776960,
	    yellowgreen: 10145074
	  });
	  d3_rgb_names.forEach(function(key, value) {
	    d3_rgb_names.set(key, d3_rgbNumber(value));
	  });
	  function d3_functor(v) {
	    return typeof v === "function" ? v : function() {
	      return v;
	    };
	  }
	  d3.functor = d3_functor;
	  d3.xhr = d3_xhrType(d3_identity);
	  function d3_xhrType(response) {
	    return function(url, mimeType, callback) {
	      if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
	      mimeType = null;
	      return d3_xhr(url, mimeType, response, callback);
	    };
	  }
	  function d3_xhr(url, mimeType, response, callback) {
	    var xhr = {}, dispatch = d3.dispatch("beforesend", "progress", "load", "error"), headers = {}, request = new XMLHttpRequest(), responseType = null;
	    if (this.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
	    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
	      request.readyState > 3 && respond();
	    };
	    function respond() {
	      var status = request.status, result;
	      if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
	        try {
	          result = response.call(xhr, request);
	        } catch (e) {
	          dispatch.error.call(xhr, e);
	          return;
	        }
	        dispatch.load.call(xhr, result);
	      } else {
	        dispatch.error.call(xhr, request);
	      }
	    }
	    request.onprogress = function(event) {
	      var o = d3.event;
	      d3.event = event;
	      try {
	        dispatch.progress.call(xhr, request);
	      } finally {
	        d3.event = o;
	      }
	    };
	    xhr.header = function(name, value) {
	      name = (name + "").toLowerCase();
	      if (arguments.length < 2) return headers[name];
	      if (value == null) delete headers[name]; else headers[name] = value + "";
	      return xhr;
	    };
	    xhr.mimeType = function(value) {
	      if (!arguments.length) return mimeType;
	      mimeType = value == null ? null : value + "";
	      return xhr;
	    };
	    xhr.responseType = function(value) {
	      if (!arguments.length) return responseType;
	      responseType = value;
	      return xhr;
	    };
	    xhr.response = function(value) {
	      response = value;
	      return xhr;
	    };
	    [ "get", "post" ].forEach(function(method) {
	      xhr[method] = function() {
	        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
	      };
	    });
	    xhr.send = function(method, data, callback) {
	      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
	      request.open(method, url, true);
	      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
	      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
	      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
	      if (responseType != null) request.responseType = responseType;
	      if (callback != null) xhr.on("error", callback).on("load", function(request) {
	        callback(null, request);
	      });
	      dispatch.beforesend.call(xhr, request);
	      request.send(data == null ? null : data);
	      return xhr;
	    };
	    xhr.abort = function() {
	      request.abort();
	      return xhr;
	    };
	    d3.rebind(xhr, dispatch, "on");
	    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
	  }
	  function d3_xhr_fixCallback(callback) {
	    return callback.length === 1 ? function(error, request) {
	      callback(error == null ? request : null);
	    } : callback;
	  }
	  function d3_xhrHasResponse(request) {
	    var type = request.responseType;
	    return type && type !== "text" ? request.response : request.responseText;
	  }
	  d3.dsv = function(delimiter, mimeType) {
	    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
	    function dsv(url, row, callback) {
	      if (arguments.length < 3) callback = row, row = null;
	      var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
	      xhr.row = function(_) {
	        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
	      };
	      return xhr;
	    }
	    function response(request) {
	      return dsv.parse(request.responseText);
	    }
	    function typedResponse(f) {
	      return function(request) {
	        return dsv.parse(request.responseText, f);
	      };
	    }
	    dsv.parse = function(text, f) {
	      var o;
	      return dsv.parseRows(text, function(row, i) {
	        if (o) return o(row, i - 1);
	        var a = new Function("d", "return {" + row.map(function(name, i) {
	          return JSON.stringify(name) + ": d[" + i + "]";
	        }).join(",") + "}");
	        o = f ? function(row, i) {
	          return f(a(row), i);
	        } : a;
	      });
	    };
	    dsv.parseRows = function(text, f) {
	      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
	      function token() {
	        if (I >= N) return EOF;
	        if (eol) return eol = false, EOL;
	        var j = I;
	        if (text.charCodeAt(j) === 34) {
	          var i = j;
	          while (i++ < N) {
	            if (text.charCodeAt(i) === 34) {
	              if (text.charCodeAt(i + 1) !== 34) break;
	              ++i;
	            }
	          }
	          I = i + 2;
	          var c = text.charCodeAt(i + 1);
	          if (c === 13) {
	            eol = true;
	            if (text.charCodeAt(i + 2) === 10) ++I;
	          } else if (c === 10) {
	            eol = true;
	          }
	          return text.slice(j + 1, i).replace(/""/g, '"');
	        }
	        while (I < N) {
	          var c = text.charCodeAt(I++), k = 1;
	          if (c === 10) eol = true; else if (c === 13) {
	            eol = true;
	            if (text.charCodeAt(I) === 10) ++I, ++k;
	          } else if (c !== delimiterCode) continue;
	          return text.slice(j, I - k);
	        }
	        return text.slice(j);
	      }
	      while ((t = token()) !== EOF) {
	        var a = [];
	        while (t !== EOL && t !== EOF) {
	          a.push(t);
	          t = token();
	        }
	        if (f && (a = f(a, n++)) == null) continue;
	        rows.push(a);
	      }
	      return rows;
	    };
	    dsv.format = function(rows) {
	      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
	      var fieldSet = new d3_Set(), fields = [];
	      rows.forEach(function(row) {
	        for (var field in row) {
	          if (!fieldSet.has(field)) {
	            fields.push(fieldSet.add(field));
	          }
	        }
	      });
	      return [ fields.map(formatValue).join(delimiter) ].concat(rows.map(function(row) {
	        return fields.map(function(field) {
	          return formatValue(row[field]);
	        }).join(delimiter);
	      })).join("\n");
	    };
	    dsv.formatRows = function(rows) {
	      return rows.map(formatRow).join("\n");
	    };
	    function formatRow(row) {
	      return row.map(formatValue).join(delimiter);
	    }
	    function formatValue(text) {
	      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
	    }
	    return dsv;
	  };
	  d3.csv = d3.dsv(",", "text/csv");
	  d3.tsv = d3.dsv("	", "text/tab-separated-values");
	  var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function(callback) {
	    setTimeout(callback, 17);
	  };
	  d3.timer = function() {
	    d3_timer.apply(this, arguments);
	  };
	  function d3_timer(callback, delay, then) {
	    var n = arguments.length;
	    if (n < 2) delay = 0;
	    if (n < 3) then = Date.now();
	    var time = then + delay, timer = {
	      c: callback,
	      t: time,
	      n: null
	    };
	    if (d3_timer_queueTail) d3_timer_queueTail.n = timer; else d3_timer_queueHead = timer;
	    d3_timer_queueTail = timer;
	    if (!d3_timer_interval) {
	      d3_timer_timeout = clearTimeout(d3_timer_timeout);
	      d3_timer_interval = 1;
	      d3_timer_frame(d3_timer_step);
	    }
	    return timer;
	  }
	  function d3_timer_step() {
	    var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
	    if (delay > 24) {
	      if (isFinite(delay)) {
	        clearTimeout(d3_timer_timeout);
	        d3_timer_timeout = setTimeout(d3_timer_step, delay);
	      }
	      d3_timer_interval = 0;
	    } else {
	      d3_timer_interval = 1;
	      d3_timer_frame(d3_timer_step);
	    }
	  }
	  d3.timer.flush = function() {
	    d3_timer_mark();
	    d3_timer_sweep();
	  };
	  function d3_timer_mark() {
	    var now = Date.now(), timer = d3_timer_queueHead;
	    while (timer) {
	      if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
	      timer = timer.n;
	    }
	    return now;
	  }
	  function d3_timer_sweep() {
	    var t0, t1 = d3_timer_queueHead, time = Infinity;
	    while (t1) {
	      if (t1.c) {
	        if (t1.t < time) time = t1.t;
	        t1 = (t0 = t1).n;
	      } else {
	        t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
	      }
	    }
	    d3_timer_queueTail = t0;
	    return time;
	  }
	  function d3_format_precision(x, p) {
	    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
	  }
	  d3.round = function(x, n) {
	    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
	  };
	  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
	  d3.formatPrefix = function(value, precision) {
	    var i = 0;
	    if (value = +value) {
	      if (value < 0) value *= -1;
	      if (precision) value = d3.round(value, d3_format_precision(value, precision));
	      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
	      i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
	    }
	    return d3_formatPrefixes[8 + i / 3];
	  };
	  function d3_formatPrefix(d, i) {
	    var k = Math.pow(10, abs(8 - i) * 3);
	    return {
	      scale: i > 8 ? function(d) {
	        return d / k;
	      } : function(d) {
	        return d * k;
	      },
	      symbol: d
	    };
	  }
	  function d3_locale_numberFormat(locale) {
	    var locale_decimal = locale.decimal, locale_thousands = locale.thousands, locale_grouping = locale.grouping, locale_currency = locale.currency, formatGroup = locale_grouping && locale_thousands ? function(value, width) {
	      var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0;
	      while (i > 0 && g > 0) {
	        if (length + g + 1 > width) g = Math.max(1, width - length);
	        t.push(value.substring(i -= g, i + g));
	        if ((length += g + 1) > width) break;
	        g = locale_grouping[j = (j + 1) % locale_grouping.length];
	      }
	      return t.reverse().join(locale_thousands);
	    } : d3_identity;
	    return function(specifier) {
	      var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "-", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, prefix = "", suffix = "", integer = false, exponent = true;
	      if (precision) precision = +precision.substring(1);
	      if (zfill || fill === "0" && align === "=") {
	        zfill = fill = "0";
	        align = "=";
	      }
	      switch (type) {
	       case "n":
	        comma = true;
	        type = "g";
	        break;

	       case "%":
	        scale = 100;
	        suffix = "%";
	        type = "f";
	        break;

	       case "p":
	        scale = 100;
	        suffix = "%";
	        type = "r";
	        break;

	       case "b":
	       case "o":
	       case "x":
	       case "X":
	        if (symbol === "#") prefix = "0" + type.toLowerCase();

	       case "c":
	        exponent = false;

	       case "d":
	        integer = true;
	        precision = 0;
	        break;

	       case "s":
	        scale = -1;
	        type = "r";
	        break;
	      }
	      if (symbol === "$") prefix = locale_currency[0], suffix = locale_currency[1];
	      if (type == "r" && !precision) type = "g";
	      if (precision != null) {
	        if (type == "g") precision = Math.max(1, Math.min(21, precision)); else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
	      }
	      type = d3_format_types.get(type) || d3_format_typeDefault;
	      var zcomma = zfill && comma;
	      return function(value) {
	        var fullSuffix = suffix;
	        if (integer && value % 1) return "";
	        var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign === "-" ? "" : sign;
	        if (scale < 0) {
	          var unit = d3.formatPrefix(value, precision);
	          value = unit.scale(value);
	          fullSuffix = unit.symbol + suffix;
	        } else {
	          value *= scale;
	        }
	        value = type(value, precision);
	        var i = value.lastIndexOf("."), before, after;
	        if (i < 0) {
	          var j = exponent ? value.lastIndexOf("e") : -1;
	          if (j < 0) before = value, after = ""; else before = value.substring(0, j), after = value.substring(j);
	        } else {
	          before = value.substring(0, i);
	          after = locale_decimal + value.substring(i + 1);
	        }
	        if (!zfill && comma) before = formatGroup(before, Infinity);
	        var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
	        if (zcomma) before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
	        negative += prefix;
	        value = before + after;
	        return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
	      };
	    };
	  }
	  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
	  var d3_format_types = d3.map({
	    b: function(x) {
	      return x.toString(2);
	    },
	    c: function(x) {
	      return String.fromCharCode(x);
	    },
	    o: function(x) {
	      return x.toString(8);
	    },
	    x: function(x) {
	      return x.toString(16);
	    },
	    X: function(x) {
	      return x.toString(16).toUpperCase();
	    },
	    g: function(x, p) {
	      return x.toPrecision(p);
	    },
	    e: function(x, p) {
	      return x.toExponential(p);
	    },
	    f: function(x, p) {
	      return x.toFixed(p);
	    },
	    r: function(x, p) {
	      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
	    }
	  });
	  function d3_format_typeDefault(x) {
	    return x + "";
	  }
	  var d3_time = d3.time = {}, d3_date = Date;
	  function d3_date_utc() {
	    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
	  }
	  d3_date_utc.prototype = {
	    getDate: function() {
	      return this._.getUTCDate();
	    },
	    getDay: function() {
	      return this._.getUTCDay();
	    },
	    getFullYear: function() {
	      return this._.getUTCFullYear();
	    },
	    getHours: function() {
	      return this._.getUTCHours();
	    },
	    getMilliseconds: function() {
	      return this._.getUTCMilliseconds();
	    },
	    getMinutes: function() {
	      return this._.getUTCMinutes();
	    },
	    getMonth: function() {
	      return this._.getUTCMonth();
	    },
	    getSeconds: function() {
	      return this._.getUTCSeconds();
	    },
	    getTime: function() {
	      return this._.getTime();
	    },
	    getTimezoneOffset: function() {
	      return 0;
	    },
	    valueOf: function() {
	      return this._.valueOf();
	    },
	    setDate: function() {
	      d3_time_prototype.setUTCDate.apply(this._, arguments);
	    },
	    setDay: function() {
	      d3_time_prototype.setUTCDay.apply(this._, arguments);
	    },
	    setFullYear: function() {
	      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
	    },
	    setHours: function() {
	      d3_time_prototype.setUTCHours.apply(this._, arguments);
	    },
	    setMilliseconds: function() {
	      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
	    },
	    setMinutes: function() {
	      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
	    },
	    setMonth: function() {
	      d3_time_prototype.setUTCMonth.apply(this._, arguments);
	    },
	    setSeconds: function() {
	      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
	    },
	    setTime: function() {
	      d3_time_prototype.setTime.apply(this._, arguments);
	    }
	  };
	  var d3_time_prototype = Date.prototype;
	  function d3_time_interval(local, step, number) {
	    function round(date) {
	      var d0 = local(date), d1 = offset(d0, 1);
	      return date - d0 < d1 - date ? d0 : d1;
	    }
	    function ceil(date) {
	      step(date = local(new d3_date(date - 1)), 1);
	      return date;
	    }
	    function offset(date, k) {
	      step(date = new d3_date(+date), k);
	      return date;
	    }
	    function range(t0, t1, dt) {
	      var time = ceil(t0), times = [];
	      if (dt > 1) {
	        while (time < t1) {
	          if (!(number(time) % dt)) times.push(new Date(+time));
	          step(time, 1);
	        }
	      } else {
	        while (time < t1) times.push(new Date(+time)), step(time, 1);
	      }
	      return times;
	    }
	    function range_utc(t0, t1, dt) {
	      try {
	        d3_date = d3_date_utc;
	        var utc = new d3_date_utc();
	        utc._ = t0;
	        return range(utc, t1, dt);
	      } finally {
	        d3_date = Date;
	      }
	    }
	    local.floor = local;
	    local.round = round;
	    local.ceil = ceil;
	    local.offset = offset;
	    local.range = range;
	    var utc = local.utc = d3_time_interval_utc(local);
	    utc.floor = utc;
	    utc.round = d3_time_interval_utc(round);
	    utc.ceil = d3_time_interval_utc(ceil);
	    utc.offset = d3_time_interval_utc(offset);
	    utc.range = range_utc;
	    return local;
	  }
	  function d3_time_interval_utc(method) {
	    return function(date, k) {
	      try {
	        d3_date = d3_date_utc;
	        var utc = new d3_date_utc();
	        utc._ = date;
	        return method(utc, k)._;
	      } finally {
	        d3_date = Date;
	      }
	    };
	  }
	  d3_time.year = d3_time_interval(function(date) {
	    date = d3_time.day(date);
	    date.setMonth(0, 1);
	    return date;
	  }, function(date, offset) {
	    date.setFullYear(date.getFullYear() + offset);
	  }, function(date) {
	    return date.getFullYear();
	  });
	  d3_time.years = d3_time.year.range;
	  d3_time.years.utc = d3_time.year.utc.range;
	  d3_time.day = d3_time_interval(function(date) {
	    var day = new d3_date(2e3, 0);
	    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
	    return day;
	  }, function(date, offset) {
	    date.setDate(date.getDate() + offset);
	  }, function(date) {
	    return date.getDate() - 1;
	  });
	  d3_time.days = d3_time.day.range;
	  d3_time.days.utc = d3_time.day.utc.range;
	  d3_time.dayOfYear = function(date) {
	    var year = d3_time.year(date);
	    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
	  };
	  [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ].forEach(function(day, i) {
	    i = 7 - i;
	    var interval = d3_time[day] = d3_time_interval(function(date) {
	      (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
	      return date;
	    }, function(date, offset) {
	      date.setDate(date.getDate() + Math.floor(offset) * 7);
	    }, function(date) {
	      var day = d3_time.year(date).getDay();
	      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
	    });
	    d3_time[day + "s"] = interval.range;
	    d3_time[day + "s"].utc = interval.utc.range;
	    d3_time[day + "OfYear"] = function(date) {
	      var day = d3_time.year(date).getDay();
	      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7);
	    };
	  });
	  d3_time.week = d3_time.sunday;
	  d3_time.weeks = d3_time.sunday.range;
	  d3_time.weeks.utc = d3_time.sunday.utc.range;
	  d3_time.weekOfYear = d3_time.sundayOfYear;
	  function d3_locale_timeFormat(locale) {
	    var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_days = locale.days, locale_shortDays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
	    function d3_time_format(template) {
	      var n = template.length;
	      function format(date) {
	        var string = [], i = -1, j = 0, c, p, f;
	        while (++i < n) {
	          if (template.charCodeAt(i) === 37) {
	            string.push(template.slice(j, i));
	            if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
	            if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
	            string.push(c);
	            j = i + 1;
	          }
	        }
	        string.push(template.slice(j, i));
	        return string.join("");
	      }
	      format.parse = function(string) {
	        var d = {
	          y: 1900,
	          m: 0,
	          d: 1,
	          H: 0,
	          M: 0,
	          S: 0,
	          L: 0,
	          Z: null
	        }, i = d3_time_parse(d, template, string, 0);
	        if (i != string.length) return null;
	        if ("p" in d) d.H = d.H % 12 + d.p * 12;
	        var localZ = d.Z != null && d3_date !== d3_date_utc, date = new (localZ ? d3_date_utc : d3_date)();
	        if ("j" in d) date.setFullYear(d.y, 0, d.j); else if ("W" in d || "U" in d) {
	          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	          date.setFullYear(d.y, 0, 1);
	          date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
	        } else date.setFullYear(d.y, d.m, d.d);
	        date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
	        return localZ ? date._ : date;
	      };
	      format.toString = function() {
	        return template;
	      };
	      return format;
	    }
	    function d3_time_parse(date, template, string, j) {
	      var c, p, t, i = 0, n = template.length, m = string.length;
	      while (i < n) {
	        if (j >= m) return -1;
	        c = template.charCodeAt(i++);
	        if (c === 37) {
	          t = template.charAt(i++);
	          p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
	          if (!p || (j = p(date, string, j)) < 0) return -1;
	        } else if (c != string.charCodeAt(j++)) {
	          return -1;
	        }
	      }
	      return j;
	    }
	    d3_time_format.utc = function(template) {
	      var local = d3_time_format(template);
	      function format(date) {
	        try {
	          d3_date = d3_date_utc;
	          var utc = new d3_date();
	          utc._ = date;
	          return local(utc);
	        } finally {
	          d3_date = Date;
	        }
	      }
	      format.parse = function(string) {
	        try {
	          d3_date = d3_date_utc;
	          var date = local.parse(string);
	          return date && date._;
	        } finally {
	          d3_date = Date;
	        }
	      };
	      format.toString = local.toString;
	      return format;
	    };
	    d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
	    var d3_time_periodLookup = d3.map(), d3_time_dayRe = d3_time_formatRe(locale_days), d3_time_dayLookup = d3_time_formatLookup(locale_days), d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays), d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays), d3_time_monthRe = d3_time_formatRe(locale_months), d3_time_monthLookup = d3_time_formatLookup(locale_months), d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths), d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
	    locale_periods.forEach(function(p, i) {
	      d3_time_periodLookup.set(p.toLowerCase(), i);
	    });
	    var d3_time_formats = {
	      a: function(d) {
	        return locale_shortDays[d.getDay()];
	      },
	      A: function(d) {
	        return locale_days[d.getDay()];
	      },
	      b: function(d) {
	        return locale_shortMonths[d.getMonth()];
	      },
	      B: function(d) {
	        return locale_months[d.getMonth()];
	      },
	      c: d3_time_format(locale_dateTime),
	      d: function(d, p) {
	        return d3_time_formatPad(d.getDate(), p, 2);
	      },
	      e: function(d, p) {
	        return d3_time_formatPad(d.getDate(), p, 2);
	      },
	      H: function(d, p) {
	        return d3_time_formatPad(d.getHours(), p, 2);
	      },
	      I: function(d, p) {
	        return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
	      },
	      j: function(d, p) {
	        return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
	      },
	      L: function(d, p) {
	        return d3_time_formatPad(d.getMilliseconds(), p, 3);
	      },
	      m: function(d, p) {
	        return d3_time_formatPad(d.getMonth() + 1, p, 2);
	      },
	      M: function(d, p) {
	        return d3_time_formatPad(d.getMinutes(), p, 2);
	      },
	      p: function(d) {
	        return locale_periods[+(d.getHours() >= 12)];
	      },
	      S: function(d, p) {
	        return d3_time_formatPad(d.getSeconds(), p, 2);
	      },
	      U: function(d, p) {
	        return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
	      },
	      w: function(d) {
	        return d.getDay();
	      },
	      W: function(d, p) {
	        return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
	      },
	      x: d3_time_format(locale_date),
	      X: d3_time_format(locale_time),
	      y: function(d, p) {
	        return d3_time_formatPad(d.getFullYear() % 100, p, 2);
	      },
	      Y: function(d, p) {
	        return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
	      },
	      Z: d3_time_zone,
	      "%": function() {
	        return "%";
	      }
	    };
	    var d3_time_parsers = {
	      a: d3_time_parseWeekdayAbbrev,
	      A: d3_time_parseWeekday,
	      b: d3_time_parseMonthAbbrev,
	      B: d3_time_parseMonth,
	      c: d3_time_parseLocaleFull,
	      d: d3_time_parseDay,
	      e: d3_time_parseDay,
	      H: d3_time_parseHour24,
	      I: d3_time_parseHour24,
	      j: d3_time_parseDayOfYear,
	      L: d3_time_parseMilliseconds,
	      m: d3_time_parseMonthNumber,
	      M: d3_time_parseMinutes,
	      p: d3_time_parseAmPm,
	      S: d3_time_parseSeconds,
	      U: d3_time_parseWeekNumberSunday,
	      w: d3_time_parseWeekdayNumber,
	      W: d3_time_parseWeekNumberMonday,
	      x: d3_time_parseLocaleDate,
	      X: d3_time_parseLocaleTime,
	      y: d3_time_parseYear,
	      Y: d3_time_parseFullYear,
	      Z: d3_time_parseZone,
	      "%": d3_time_parseLiteralPercent
	    };
	    function d3_time_parseWeekdayAbbrev(date, string, i) {
	      d3_time_dayAbbrevRe.lastIndex = 0;
	      var n = d3_time_dayAbbrevRe.exec(string.slice(i));
	      return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	    }
	    function d3_time_parseWeekday(date, string, i) {
	      d3_time_dayRe.lastIndex = 0;
	      var n = d3_time_dayRe.exec(string.slice(i));
	      return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	    }
	    function d3_time_parseMonthAbbrev(date, string, i) {
	      d3_time_monthAbbrevRe.lastIndex = 0;
	      var n = d3_time_monthAbbrevRe.exec(string.slice(i));
	      return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	    }
	    function d3_time_parseMonth(date, string, i) {
	      d3_time_monthRe.lastIndex = 0;
	      var n = d3_time_monthRe.exec(string.slice(i));
	      return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
	    }
	    function d3_time_parseLocaleFull(date, string, i) {
	      return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
	    }
	    function d3_time_parseLocaleDate(date, string, i) {
	      return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
	    }
	    function d3_time_parseLocaleTime(date, string, i) {
	      return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
	    }
	    function d3_time_parseAmPm(date, string, i) {
	      var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
	      return n == null ? -1 : (date.p = n, i);
	    }
	    return d3_time_format;
	  }
	  var d3_time_formatPads = {
	    "-": "",
	    _: " ",
	    "0": "0"
	  }, d3_time_numberRe = /^\s*\d+/, d3_time_percentRe = /^%/;
	  function d3_time_formatPad(value, fill, width) {
	    var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
	    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	  }
	  function d3_time_formatRe(names) {
	    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
	  }
	  function d3_time_formatLookup(names) {
	    var map = new d3_Map(), i = -1, n = names.length;
	    while (++i < n) map.set(names[i].toLowerCase(), i);
	    return map;
	  }
	  function d3_time_parseWeekdayNumber(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 1));
	    return n ? (date.w = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseWeekNumberSunday(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i));
	    return n ? (date.U = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseWeekNumberMonday(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i));
	    return n ? (date.W = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseFullYear(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 4));
	    return n ? (date.y = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseYear(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
	    return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
	  }
	  function d3_time_parseZone(date, string, i) {
	    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, 
	    i + 5) : -1;
	  }
	  function d3_time_expandYear(d) {
	    return d + (d > 68 ? 1900 : 2e3);
	  }
	  function d3_time_parseMonthNumber(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
	    return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
	  }
	  function d3_time_parseDay(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
	    return n ? (date.d = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseDayOfYear(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
	    return n ? (date.j = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseHour24(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
	    return n ? (date.H = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseMinutes(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
	    return n ? (date.M = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseSeconds(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
	    return n ? (date.S = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_parseMilliseconds(date, string, i) {
	    d3_time_numberRe.lastIndex = 0;
	    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
	    return n ? (date.L = +n[0], i + n[0].length) : -1;
	  }
	  function d3_time_zone(d) {
	    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = abs(z) / 60 | 0, zm = abs(z) % 60;
	    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
	  }
	  function d3_time_parseLiteralPercent(date, string, i) {
	    d3_time_percentRe.lastIndex = 0;
	    var n = d3_time_percentRe.exec(string.slice(i, i + 1));
	    return n ? i + n[0].length : -1;
	  }
	  function d3_time_formatMulti(formats) {
	    var n = formats.length, i = -1;
	    while (++i < n) formats[i][0] = this(formats[i][0]);
	    return function(date) {
	      var i = 0, f = formats[i];
	      while (!f[1](date)) f = formats[++i];
	      return f[0](date);
	    };
	  }
	  d3.locale = function(locale) {
	    return {
	      numberFormat: d3_locale_numberFormat(locale),
	      timeFormat: d3_locale_timeFormat(locale)
	    };
	  };
	  var d3_locale_enUS = d3.locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [ 3 ],
	    currency: [ "$", "" ],
	    dateTime: "%a %b %e %X %Y",
	    date: "%m/%d/%Y",
	    time: "%H:%M:%S",
	    periods: [ "AM", "PM" ],
	    days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
	    shortDays: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
	    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
	    shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	  });
	  d3.format = d3_locale_enUS.numberFormat;
	  d3.geo = {};
	  function d3_adder() {}
	  d3_adder.prototype = {
	    s: 0,
	    t: 0,
	    add: function(y) {
	      d3_adderSum(y, this.t, d3_adderTemp);
	      d3_adderSum(d3_adderTemp.s, this.s, this);
	      if (this.s) this.t += d3_adderTemp.t; else this.s = d3_adderTemp.t;
	    },
	    reset: function() {
	      this.s = this.t = 0;
	    },
	    valueOf: function() {
	      return this.s;
	    }
	  };
	  var d3_adderTemp = new d3_adder();
	  function d3_adderSum(a, b, o) {
	    var x = o.s = a + b, bv = x - a, av = x - bv;
	    o.t = a - av + (b - bv);
	  }
	  d3.geo.stream = function(object, listener) {
	    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
	      d3_geo_streamObjectType[object.type](object, listener);
	    } else {
	      d3_geo_streamGeometry(object, listener);
	    }
	  };
	  function d3_geo_streamGeometry(geometry, listener) {
	    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
	      d3_geo_streamGeometryType[geometry.type](geometry, listener);
	    }
	  }
	  var d3_geo_streamObjectType = {
	    Feature: function(feature, listener) {
	      d3_geo_streamGeometry(feature.geometry, listener);
	    },
	    FeatureCollection: function(object, listener) {
	      var features = object.features, i = -1, n = features.length;
	      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
	    }
	  };
	  var d3_geo_streamGeometryType = {
	    Sphere: function(object, listener) {
	      listener.sphere();
	    },
	    Point: function(object, listener) {
	      object = object.coordinates;
	      listener.point(object[0], object[1], object[2]);
	    },
	    MultiPoint: function(object, listener) {
	      var coordinates = object.coordinates, i = -1, n = coordinates.length;
	      while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2]);
	    },
	    LineString: function(object, listener) {
	      d3_geo_streamLine(object.coordinates, listener, 0);
	    },
	    MultiLineString: function(object, listener) {
	      var coordinates = object.coordinates, i = -1, n = coordinates.length;
	      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
	    },
	    Polygon: function(object, listener) {
	      d3_geo_streamPolygon(object.coordinates, listener);
	    },
	    MultiPolygon: function(object, listener) {
	      var coordinates = object.coordinates, i = -1, n = coordinates.length;
	      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
	    },
	    GeometryCollection: function(object, listener) {
	      var geometries = object.geometries, i = -1, n = geometries.length;
	      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
	    }
	  };
	  function d3_geo_streamLine(coordinates, listener, closed) {
	    var i = -1, n = coordinates.length - closed, coordinate;
	    listener.lineStart();
	    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
	    listener.lineEnd();
	  }
	  function d3_geo_streamPolygon(coordinates, listener) {
	    var i = -1, n = coordinates.length;
	    listener.polygonStart();
	    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
	    listener.polygonEnd();
	  }
	  d3.geo.area = function(object) {
	    d3_geo_areaSum = 0;
	    d3.geo.stream(object, d3_geo_area);
	    return d3_geo_areaSum;
	  };
	  var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
	  var d3_geo_area = {
	    sphere: function() {
	      d3_geo_areaSum += 4 * π;
	    },
	    point: d3_noop,
	    lineStart: d3_noop,
	    lineEnd: d3_noop,
	    polygonStart: function() {
	      d3_geo_areaRingSum.reset();
	      d3_geo_area.lineStart = d3_geo_areaRingStart;
	    },
	    polygonEnd: function() {
	      var area = 2 * d3_geo_areaRingSum;
	      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
	      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
	    }
	  };
	  function d3_geo_areaRingStart() {
	    var λ00, φ00, λ0, cosφ0, sinφ0;
	    d3_geo_area.point = function(λ, φ) {
	      d3_geo_area.point = nextPoint;
	      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
	      sinφ0 = Math.sin(φ);
	    };
	    function nextPoint(λ, φ) {
	      λ *= d3_radians;
	      φ = φ * d3_radians / 2 + π / 4;
	      var dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u = cosφ0 * cosφ + k * Math.cos(adλ), v = k * sdλ * Math.sin(adλ);
	      d3_geo_areaRingSum.add(Math.atan2(v, u));
	      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
	    }
	    d3_geo_area.lineEnd = function() {
	      nextPoint(λ00, φ00);
	    };
	  }
	  function d3_geo_cartesian(spherical) {
	    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
	    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
	  }
	  function d3_geo_cartesianDot(a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	  }
	  function d3_geo_cartesianCross(a, b) {
	    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
	  }
	  function d3_geo_cartesianAdd(a, b) {
	    a[0] += b[0];
	    a[1] += b[1];
	    a[2] += b[2];
	  }
	  function d3_geo_cartesianScale(vector, k) {
	    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
	  }
	  function d3_geo_cartesianNormalize(d) {
	    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
	    d[0] /= l;
	    d[1] /= l;
	    d[2] /= l;
	  }
	  function d3_geo_spherical(cartesian) {
	    return [ Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2]) ];
	  }
	  function d3_geo_sphericalEqual(a, b) {
	    return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
	  }
	  d3.geo.bounds = function() {
	    var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
	    var bound = {
	      point: point,
	      lineStart: lineStart,
	      lineEnd: lineEnd,
	      polygonStart: function() {
	        bound.point = ringPoint;
	        bound.lineStart = ringStart;
	        bound.lineEnd = ringEnd;
	        dλSum = 0;
	        d3_geo_area.polygonStart();
	      },
	      polygonEnd: function() {
	        d3_geo_area.polygonEnd();
	        bound.point = point;
	        bound.lineStart = lineStart;
	        bound.lineEnd = lineEnd;
	        if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90); else if (dλSum > ε) φ1 = 90; else if (dλSum < -ε) φ0 = -90;
	        range[0] = λ0, range[1] = λ1;
	      }
	    };
	    function point(λ, φ) {
	      ranges.push(range = [ λ0 = λ, λ1 = λ ]);
	      if (φ < φ0) φ0 = φ;
	      if (φ > φ1) φ1 = φ;
	    }
	    function linePoint(λ, φ) {
	      var p = d3_geo_cartesian([ λ * d3_radians, φ * d3_radians ]);
	      if (p0) {
	        var normal = d3_geo_cartesianCross(p0, p), equatorial = [ normal[1], -normal[0], 0 ], inflection = d3_geo_cartesianCross(equatorial, normal);
	        d3_geo_cartesianNormalize(inflection);
	        inflection = d3_geo_spherical(inflection);
	        var dλ = λ - λ_, s = dλ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = abs(dλ) > 180;
	        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
	          var φi = inflection[1] * d3_degrees;
	          if (φi > φ1) φ1 = φi;
	        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
	          var φi = -inflection[1] * d3_degrees;
	          if (φi < φ0) φ0 = φi;
	        } else {
	          if (φ < φ0) φ0 = φ;
	          if (φ > φ1) φ1 = φ;
	        }
	        if (antimeridian) {
	          if (λ < λ_) {
	            if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
	          } else {
	            if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
	          }
	        } else {
	          if (λ1 >= λ0) {
	            if (λ < λ0) λ0 = λ;
	            if (λ > λ1) λ1 = λ;
	          } else {
	            if (λ > λ_) {
	              if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
	            } else {
	              if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
	            }
	          }
	        }
	      } else {
	        point(λ, φ);
	      }
	      p0 = p, λ_ = λ;
	    }
	    function lineStart() {
	      bound.point = linePoint;
	    }
	    function lineEnd() {
	      range[0] = λ0, range[1] = λ1;
	      bound.point = point;
	      p0 = null;
	    }
	    function ringPoint(λ, φ) {
	      if (p0) {
	        var dλ = λ - λ_;
	        dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
	      } else λ__ = λ, φ__ = φ;
	      d3_geo_area.point(λ, φ);
	      linePoint(λ, φ);
	    }
	    function ringStart() {
	      d3_geo_area.lineStart();
	    }
	    function ringEnd() {
	      ringPoint(λ__, φ__);
	      d3_geo_area.lineEnd();
	      if (abs(dλSum) > ε) λ0 = -(λ1 = 180);
	      range[0] = λ0, range[1] = λ1;
	      p0 = null;
	    }
	    function angle(λ0, λ1) {
	      return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
	    }
	    function compareRanges(a, b) {
	      return a[0] - b[0];
	    }
	    function withinRange(x, range) {
	      return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
	    }
	    return function(feature) {
	      φ1 = λ1 = -(λ0 = φ0 = Infinity);
	      ranges = [];
	      d3.geo.stream(feature, bound);
	      var n = ranges.length;
	      if (n) {
	        ranges.sort(compareRanges);
	        for (var i = 1, a = ranges[0], b, merged = [ a ]; i < n; ++i) {
	          b = ranges[i];
	          if (withinRange(b[0], a) || withinRange(b[1], a)) {
	            if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
	            if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
	          } else {
	            merged.push(a = b);
	          }
	        }
	        var best = -Infinity, dλ;
	        for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
	          b = merged[i];
	          if ((dλ = angle(a[1], b[0])) > best) best = dλ, λ0 = b[0], λ1 = a[1];
	        }
	      }
	      ranges = range = null;
	      return λ0 === Infinity || φ0 === Infinity ? [ [ NaN, NaN ], [ NaN, NaN ] ] : [ [ λ0, φ0 ], [ λ1, φ1 ] ];
	    };
	  }();
	  d3.geo.centroid = function(object) {
	    d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
	    d3.geo.stream(object, d3_geo_centroid);
	    var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
	    if (m < ε2) {
	      x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
	      if (d3_geo_centroidW1 < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
	      m = x * x + y * y + z * z;
	      if (m < ε2) return [ NaN, NaN ];
	    }
	    return [ Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees ];
	  };
	  var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
	  var d3_geo_centroid = {
	    sphere: d3_noop,
	    point: d3_geo_centroidPoint,
	    lineStart: d3_geo_centroidLineStart,
	    lineEnd: d3_geo_centroidLineEnd,
	    polygonStart: function() {
	      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
	    },
	    polygonEnd: function() {
	      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
	    }
	  };
	  function d3_geo_centroidPoint(λ, φ) {
	    λ *= d3_radians;
	    var cosφ = Math.cos(φ *= d3_radians);
	    d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
	  }
	  function d3_geo_centroidPointXYZ(x, y, z) {
	    ++d3_geo_centroidW0;
	    d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
	    d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
	    d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
	  }
	  function d3_geo_centroidLineStart() {
	    var x0, y0, z0;
	    d3_geo_centroid.point = function(λ, φ) {
	      λ *= d3_radians;
	      var cosφ = Math.cos(φ *= d3_radians);
	      x0 = cosφ * Math.cos(λ);
	      y0 = cosφ * Math.sin(λ);
	      z0 = Math.sin(φ);
	      d3_geo_centroid.point = nextPoint;
	      d3_geo_centroidPointXYZ(x0, y0, z0);
	    };
	    function nextPoint(λ, φ) {
	      λ *= d3_radians;
	      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
	      d3_geo_centroidW1 += w;
	      d3_geo_centroidX1 += w * (x0 + (x0 = x));
	      d3_geo_centroidY1 += w * (y0 + (y0 = y));
	      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
	      d3_geo_centroidPointXYZ(x0, y0, z0);
	    }
	  }
	  function d3_geo_centroidLineEnd() {
	    d3_geo_centroid.point = d3_geo_centroidPoint;
	  }
	  function d3_geo_centroidRingStart() {
	    var λ00, φ00, x0, y0, z0;
	    d3_geo_centroid.point = function(λ, φ) {
	      λ00 = λ, φ00 = φ;
	      d3_geo_centroid.point = nextPoint;
	      λ *= d3_radians;
	      var cosφ = Math.cos(φ *= d3_radians);
	      x0 = cosφ * Math.cos(λ);
	      y0 = cosφ * Math.sin(λ);
	      z0 = Math.sin(φ);
	      d3_geo_centroidPointXYZ(x0, y0, z0);
	    };
	    d3_geo_centroid.lineEnd = function() {
	      nextPoint(λ00, φ00);
	      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
	      d3_geo_centroid.point = d3_geo_centroidPoint;
	    };
	    function nextPoint(λ, φ) {
	      λ *= d3_radians;
	      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
	      d3_geo_centroidX2 += v * cx;
	      d3_geo_centroidY2 += v * cy;
	      d3_geo_centroidZ2 += v * cz;
	      d3_geo_centroidW1 += w;
	      d3_geo_centroidX1 += w * (x0 + (x0 = x));
	      d3_geo_centroidY1 += w * (y0 + (y0 = y));
	      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
	      d3_geo_centroidPointXYZ(x0, y0, z0);
	    }
	  }
	  function d3_geo_compose(a, b) {
	    function compose(x, y) {
	      return x = a(x, y), b(x[0], x[1]);
	    }
	    if (a.invert && b.invert) compose.invert = function(x, y) {
	      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
	    };
	    return compose;
	  }
	  function d3_true() {
	    return true;
	  }
	  function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
	    var subject = [], clip = [];
	    segments.forEach(function(segment) {
	      if ((n = segment.length - 1) <= 0) return;
	      var n, p0 = segment[0], p1 = segment[n];
	      if (d3_geo_sphericalEqual(p0, p1)) {
	        listener.lineStart();
	        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
	        listener.lineEnd();
	        return;
	      }
	      var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true), b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
	      a.o = b;
	      subject.push(a);
	      clip.push(b);
	      a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
	      b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
	      a.o = b;
	      subject.push(a);
	      clip.push(b);
	    });
	    clip.sort(compare);
	    d3_geo_clipPolygonLinkCircular(subject);
	    d3_geo_clipPolygonLinkCircular(clip);
	    if (!subject.length) return;
	    for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
	      clip[i].e = entry = !entry;
	    }
	    var start = subject[0], points, point;
	    while (1) {
	      var current = start, isSubject = true;
	      while (current.v) if ((current = current.n) === start) return;
	      points = current.z;
	      listener.lineStart();
	      do {
	        current.v = current.o.v = true;
	        if (current.e) {
	          if (isSubject) {
	            for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1]);
	          } else {
	            interpolate(current.x, current.n.x, 1, listener);
	          }
	          current = current.n;
	        } else {
	          if (isSubject) {
	            points = current.p.z;
	            for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1]);
	          } else {
	            interpolate(current.x, current.p.x, -1, listener);
	          }
	          current = current.p;
	        }
	        current = current.o;
	        points = current.z;
	        isSubject = !isSubject;
	      } while (!current.v);
	      listener.lineEnd();
	    }
	  }
	  function d3_geo_clipPolygonLinkCircular(array) {
	    if (!(n = array.length)) return;
	    var n, i = 0, a = array[0], b;
	    while (++i < n) {
	      a.n = b = array[i];
	      b.p = a;
	      a = b;
	    }
	    a.n = b = array[0];
	    b.p = a;
	  }
	  function d3_geo_clipPolygonIntersection(point, points, other, entry) {
	    this.x = point;
	    this.z = points;
	    this.o = other;
	    this.e = entry;
	    this.v = false;
	    this.n = this.p = null;
	  }
	  function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
	    return function(rotate, listener) {
	      var line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
	      var clip = {
	        point: point,
	        lineStart: lineStart,
	        lineEnd: lineEnd,
	        polygonStart: function() {
	          clip.point = pointRing;
	          clip.lineStart = ringStart;
	          clip.lineEnd = ringEnd;
	          segments = [];
	          polygon = [];
	        },
	        polygonEnd: function() {
	          clip.point = point;
	          clip.lineStart = lineStart;
	          clip.lineEnd = lineEnd;
	          segments = d3.merge(segments);
	          var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
	          if (segments.length) {
	            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
	            d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
	          } else if (clipStartInside) {
	            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
	            listener.lineStart();
	            interpolate(null, null, 1, listener);
	            listener.lineEnd();
	          }
	          if (polygonStarted) listener.polygonEnd(), polygonStarted = false;
	          segments = polygon = null;
	        },
	        sphere: function() {
	          listener.polygonStart();
	          listener.lineStart();
	          interpolate(null, null, 1, listener);
	          listener.lineEnd();
	          listener.polygonEnd();
	        }
	      };
	      function point(λ, φ) {
	        var point = rotate(λ, φ);
	        if (pointVisible(λ = point[0], φ = point[1])) listener.point(λ, φ);
	      }
	      function pointLine(λ, φ) {
	        var point = rotate(λ, φ);
	        line.point(point[0], point[1]);
	      }
	      function lineStart() {
	        clip.point = pointLine;
	        line.lineStart();
	      }
	      function lineEnd() {
	        clip.point = point;
	        line.lineEnd();
	      }
	      var segments;
	      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygonStarted = false, polygon, ring;
	      function pointRing(λ, φ) {
	        ring.push([ λ, φ ]);
	        var point = rotate(λ, φ);
	        ringListener.point(point[0], point[1]);
	      }
	      function ringStart() {
	        ringListener.lineStart();
	        ring = [];
	      }
	      function ringEnd() {
	        pointRing(ring[0][0], ring[0][1]);
	        ringListener.lineEnd();
	        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
	        ring.pop();
	        polygon.push(ring);
	        ring = null;
	        if (!n) return;
	        if (clean & 1) {
	          segment = ringSegments[0];
	          var n = segment.length - 1, i = -1, point;
	          if (n > 0) {
	            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
	            listener.lineStart();
	            while (++i < n) listener.point((point = segment[i])[0], point[1]);
	            listener.lineEnd();
	          }
	          return;
	        }
	        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
	        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
	      }
	      return clip;
	    };
	  }
	  function d3_geo_clipSegmentLength1(segment) {
	    return segment.length > 1;
	  }
	  function d3_geo_clipBufferListener() {
	    var lines = [], line;
	    return {
	      lineStart: function() {
	        lines.push(line = []);
	      },
	      point: function(λ, φ) {
	        line.push([ λ, φ ]);
	      },
	      lineEnd: d3_noop,
	      buffer: function() {
	        var buffer = lines;
	        lines = [];
	        line = null;
	        return buffer;
	      },
	      rejoin: function() {
	        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
	      }
	    };
	  }
	  function d3_geo_clipSort(a, b) {
	    return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1]);
	  }
	  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [ -π, -π / 2 ]);
	  function d3_geo_clipAntimeridianLine(listener) {
	    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
	    return {
	      lineStart: function() {
	        listener.lineStart();
	        clean = 1;
	      },
	      point: function(λ1, φ1) {
	        var sλ1 = λ1 > 0 ? π : -π, dλ = abs(λ1 - λ0);
	        if (abs(dλ - π) < ε) {
	          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ);
	          listener.point(sλ0, φ0);
	          listener.lineEnd();
	          listener.lineStart();
	          listener.point(sλ1, φ0);
	          listener.point(λ1, φ0);
	          clean = 0;
	        } else if (sλ0 !== sλ1 && dλ >= π) {
	          if (abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
	          if (abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
	          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
	          listener.point(sλ0, φ0);
	          listener.lineEnd();
	          listener.lineStart();
	          listener.point(sλ1, φ0);
	          clean = 0;
	        }
	        listener.point(λ0 = λ1, φ0 = φ1);
	        sλ0 = sλ1;
	      },
	      lineEnd: function() {
	        listener.lineEnd();
	        λ0 = φ0 = NaN;
	      },
	      clean: function() {
	        return 2 - clean;
	      }
	    };
	  }
	  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
	    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
	    return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
	  }
	  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
	    var φ;
	    if (from == null) {
	      φ = direction * halfπ;
	      listener.point(-π, φ);
	      listener.point(0, φ);
	      listener.point(π, φ);
	      listener.point(π, 0);
	      listener.point(π, -φ);
	      listener.point(0, -φ);
	      listener.point(-π, -φ);
	      listener.point(-π, 0);
	      listener.point(-π, φ);
	    } else if (abs(from[0] - to[0]) > ε) {
	      var s = from[0] < to[0] ? π : -π;
	      φ = direction * s / 2;
	      listener.point(-s, φ);
	      listener.point(0, φ);
	      listener.point(s, φ);
	    } else {
	      listener.point(to[0], to[1]);
	    }
	  }
	  function d3_geo_pointInPolygon(point, polygon) {
	    var meridian = point[0], parallel = point[1], meridianNormal = [ Math.sin(meridian), -Math.cos(meridian), 0 ], polarAngle = 0, winding = 0;
	    d3_geo_areaRingSum.reset();
	    for (var i = 0, n = polygon.length; i < n; ++i) {
	      var ring = polygon[i], m = ring.length;
	      if (!m) continue;
	      var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;
	      while (true) {
	        if (j === m) j = 0;
	        point = ring[j];
	        var λ = point[0], φ = point[1] / 2 + π / 4, sinφ = Math.sin(φ), cosφ = Math.cos(φ), dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, antimeridian = adλ > π, k = sinφ0 * sinφ;
	        d3_geo_areaRingSum.add(Math.atan2(k * sdλ * Math.sin(adλ), cosφ0 * cosφ + k * Math.cos(adλ)));
	        polarAngle += antimeridian ? dλ + sdλ * τ : dλ;
	        if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
	          var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
	          d3_geo_cartesianNormalize(arc);
	          var intersection = d3_geo_cartesianCross(meridianNormal, arc);
	          d3_geo_cartesianNormalize(intersection);
	          var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
	          if (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) {
	            winding += antimeridian ^ dλ >= 0 ? 1 : -1;
	          }
	        }
	        if (!j++) break;
	        λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
	      }
	    }
	    return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < -ε) ^ winding & 1;
	  }
	  function d3_geo_clipCircle(radius) {
	    var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
	    return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [ 0, -radius ] : [ -π, radius - π ]);
	    function visible(λ, φ) {
	      return Math.cos(λ) * Math.cos(φ) > cr;
	    }
	    function clipLine(listener) {
	      var point0, c0, v0, v00, clean;
	      return {
	        lineStart: function() {
	          v00 = v0 = false;
	          clean = 1;
	        },
	        point: function(λ, φ) {
	          var point1 = [ λ, φ ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
	          if (!point0 && (v00 = v0 = v)) listener.lineStart();
	          if (v !== v0) {
	            point2 = intersect(point0, point1);
	            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
	              point1[0] += ε;
	              point1[1] += ε;
	              v = visible(point1[0], point1[1]);
	            }
	          }
	          if (v !== v0) {
	            clean = 0;
	            if (v) {
	              listener.lineStart();
	              point2 = intersect(point1, point0);
	              listener.point(point2[0], point2[1]);
	            } else {
	              point2 = intersect(point0, point1);
	              listener.point(point2[0], point2[1]);
	              listener.lineEnd();
	            }
	            point0 = point2;
	          } else if (notHemisphere && point0 && smallRadius ^ v) {
	            var t;
	            if (!(c & c0) && (t = intersect(point1, point0, true))) {
	              clean = 0;
	              if (smallRadius) {
	                listener.lineStart();
	                listener.point(t[0][0], t[0][1]);
	                listener.point(t[1][0], t[1][1]);
	                listener.lineEnd();
	              } else {
	                listener.point(t[1][0], t[1][1]);
	                listener.lineEnd();
	                listener.lineStart();
	                listener.point(t[0][0], t[0][1]);
	              }
	            }
	          }
	          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
	            listener.point(point1[0], point1[1]);
	          }
	          point0 = point1, v0 = v, c0 = c;
	        },
	        lineEnd: function() {
	          if (v0) listener.lineEnd();
	          point0 = null;
	        },
	        clean: function() {
	          return clean | (v00 && v0) << 1;
	        }
	      };
	    }
	    function intersect(a, b, two) {
	      var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
	      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
	      if (!determinant) return !two && a;
	      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
	      d3_geo_cartesianAdd(A, B);
	      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
	      if (t2 < 0) return;
	      var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
	      d3_geo_cartesianAdd(q, A);
	      q = d3_geo_spherical(q);
	      if (!two) return q;
	      var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
	      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
	      var δλ = λ1 - λ0, polar = abs(δλ - π) < ε, meridian = polar || δλ < ε;
	      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;
	      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
	        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
	        d3_geo_cartesianAdd(q1, A);
	        return [ q, d3_geo_spherical(q1) ];
	      }
	    }
	    function code(λ, φ) {
	      var r = smallRadius ? radius : π - radius, code = 0;
	      if (λ < -r) code |= 1; else if (λ > r) code |= 2;
	      if (φ < -r) code |= 4; else if (φ > r) code |= 8;
	      return code;
	    }
	  }
	  function d3_geom_clipLine(x0, y0, x1, y1) {
	    return function(line) {
	      var a = line.a, b = line.b, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
	      r = x0 - ax;
	      if (!dx && r > 0) return;
	      r /= dx;
	      if (dx < 0) {
	        if (r < t0) return;
	        if (r < t1) t1 = r;
	      } else if (dx > 0) {
	        if (r > t1) return;
	        if (r > t0) t0 = r;
	      }
	      r = x1 - ax;
	      if (!dx && r < 0) return;
	      r /= dx;
	      if (dx < 0) {
	        if (r > t1) return;
	        if (r > t0) t0 = r;
	      } else if (dx > 0) {
	        if (r < t0) return;
	        if (r < t1) t1 = r;
	      }
	      r = y0 - ay;
	      if (!dy && r > 0) return;
	      r /= dy;
	      if (dy < 0) {
	        if (r < t0) return;
	        if (r < t1) t1 = r;
	      } else if (dy > 0) {
	        if (r > t1) return;
	        if (r > t0) t0 = r;
	      }
	      r = y1 - ay;
	      if (!dy && r < 0) return;
	      r /= dy;
	      if (dy < 0) {
	        if (r > t1) return;
	        if (r > t0) t0 = r;
	      } else if (dy > 0) {
	        if (r < t0) return;
	        if (r < t1) t1 = r;
	      }
	      if (t0 > 0) line.a = {
	        x: ax + t0 * dx,
	        y: ay + t0 * dy
	      };
	      if (t1 < 1) line.b = {
	        x: ax + t1 * dx,
	        y: ay + t1 * dy
	      };
	      return line;
	    };
	  }
	  var d3_geo_clipExtentMAX = 1e9;
	  d3.geo.clipExtent = function() {
	    var x0, y0, x1, y1, stream, clip, clipExtent = {
	      stream: function(output) {
	        if (stream) stream.valid = false;
	        stream = clip(output);
	        stream.valid = true;
	        return stream;
	      },
	      extent: function(_) {
	        if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
	        clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
	        if (stream) stream.valid = false, stream = null;
	        return clipExtent;
	      }
	    };
	    return clipExtent.extent([ [ 0, 0 ], [ 960, 500 ] ]);
	  };
	  function d3_geo_clipExtent(x0, y0, x1, y1) {
	    return function(listener) {
	      var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), segments, polygon, ring;
	      var clip = {
	        point: point,
	        lineStart: lineStart,
	        lineEnd: lineEnd,
	        polygonStart: function() {
	          listener = bufferListener;
	          segments = [];
	          polygon = [];
	          clean = true;
	        },
	        polygonEnd: function() {
	          listener = listener_;
	          segments = d3.merge(segments);
	          var clipStartInside = insidePolygon([ x0, y1 ]), inside = clean && clipStartInside, visible = segments.length;
	          if (inside || visible) {
	            listener.polygonStart();
	            if (inside) {
	              listener.lineStart();
	              interpolate(null, null, 1, listener);
	              listener.lineEnd();
	            }
	            if (visible) {
	              d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
	            }
	            listener.polygonEnd();
	          }
	          segments = polygon = ring = null;
	        }
	      };
	      function insidePolygon(p) {
	        var wn = 0, n = polygon.length, y = p[1];
	        for (var i = 0; i < n; ++i) {
	          for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
	            b = v[j];
	            if (a[1] <= y) {
	              if (b[1] > y && d3_cross2d(a, b, p) > 0) ++wn;
	            } else {
	              if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn;
	            }
	            a = b;
	          }
	        }
	        return wn !== 0;
	      }
	      function interpolate(from, to, direction, listener) {
	        var a = 0, a1 = 0;
	        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
	          do {
	            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
	          } while ((a = (a + direction + 4) % 4) !== a1);
	        } else {
	          listener.point(to[0], to[1]);
	        }
	      }
	      function pointVisible(x, y) {
	        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
	      }
	      function point(x, y) {
	        if (pointVisible(x, y)) listener.point(x, y);
	      }
	      var x__, y__, v__, x_, y_, v_, first, clean;
	      function lineStart() {
	        clip.point = linePoint;
	        if (polygon) polygon.push(ring = []);
	        first = true;
	        v_ = false;
	        x_ = y_ = NaN;
	      }
	      function lineEnd() {
	        if (segments) {
	          linePoint(x__, y__);
	          if (v__ && v_) bufferListener.rejoin();
	          segments.push(bufferListener.buffer());
	        }
	        clip.point = point;
	        if (v_) listener.lineEnd();
	      }
	      function linePoint(x, y) {
	        x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
	        y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
	        var v = pointVisible(x, y);
	        if (polygon) ring.push([ x, y ]);
	        if (first) {
	          x__ = x, y__ = y, v__ = v;
	          first = false;
	          if (v) {
	            listener.lineStart();
	            listener.point(x, y);
	          }
	        } else {
	          if (v && v_) listener.point(x, y); else {
	            var l = {
	              a: {
	                x: x_,
	                y: y_
	              },
	              b: {
	                x: x,
	                y: y
	              }
	            };
	            if (clipLine(l)) {
	              if (!v_) {
	                listener.lineStart();
	                listener.point(l.a.x, l.a.y);
	              }
	              listener.point(l.b.x, l.b.y);
	              if (!v) listener.lineEnd();
	              clean = false;
	            } else if (v) {
	              listener.lineStart();
	              listener.point(x, y);
	              clean = false;
	            }
	          }
	        }
	        x_ = x, y_ = y, v_ = v;
	      }
	      return clip;
	    };
	    function corner(p, direction) {
	      return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
	    }
	    function compare(a, b) {
	      return comparePoints(a.x, b.x);
	    }
	    function comparePoints(a, b) {
	      var ca = corner(a, 1), cb = corner(b, 1);
	      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
	    }
	  }
	  function d3_geo_conic(projectAt) {
	    var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
	    p.parallels = function(_) {
	      if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
	      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
	    };
	    return p;
	  }
	  function d3_geo_conicEqualArea(φ0, φ1) {
	    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
	    function forward(λ, φ) {
	      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
	      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
	    }
	    forward.invert = function(x, y) {
	      var ρ0_y = ρ0 - y;
	      return [ Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
	    };
	    return forward;
	  }
	  (d3.geo.conicEqualArea = function() {
	    return d3_geo_conic(d3_geo_conicEqualArea);
	  }).raw = d3_geo_conicEqualArea;
	  d3.geo.albers = function() {
	    return d3.geo.conicEqualArea().rotate([ 96, 0 ]).center([ -.6, 38.7 ]).parallels([ 29.5, 45.5 ]).scale(1070);
	  };
	  d3.geo.albersUsa = function() {
	    var lower48 = d3.geo.albers();
	    var alaska = d3.geo.conicEqualArea().rotate([ 154, 0 ]).center([ -2, 58.5 ]).parallels([ 55, 65 ]);
	    var hawaii = d3.geo.conicEqualArea().rotate([ 157, 0 ]).center([ -3, 19.9 ]).parallels([ 8, 18 ]);
	    var point, pointStream = {
	      point: function(x, y) {
	        point = [ x, y ];
	      }
	    }, lower48Point, alaskaPoint, hawaiiPoint;
	    function albersUsa(coordinates) {
	      var x = coordinates[0], y = coordinates[1];
	      point = null;
	      (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
	      return point;
	    }
	    albersUsa.invert = function(coordinates) {
	      var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
	      return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
	    };
	    albersUsa.stream = function(stream) {
	      var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
	      return {
	        point: function(x, y) {
	          lower48Stream.point(x, y);
	          alaskaStream.point(x, y);
	          hawaiiStream.point(x, y);
	        },
	        sphere: function() {
	          lower48Stream.sphere();
	          alaskaStream.sphere();
	          hawaiiStream.sphere();
	        },
	        lineStart: function() {
	          lower48Stream.lineStart();
	          alaskaStream.lineStart();
	          hawaiiStream.lineStart();
	        },
	        lineEnd: function() {
	          lower48Stream.lineEnd();
	          alaskaStream.lineEnd();
	          hawaiiStream.lineEnd();
	        },
	        polygonStart: function() {
	          lower48Stream.polygonStart();
	          alaskaStream.polygonStart();
	          hawaiiStream.polygonStart();
	        },
	        polygonEnd: function() {
	          lower48Stream.polygonEnd();
	          alaskaStream.polygonEnd();
	          hawaiiStream.polygonEnd();
	        }
	      };
	    };
	    albersUsa.precision = function(_) {
	      if (!arguments.length) return lower48.precision();
	      lower48.precision(_);
	      alaska.precision(_);
	      hawaii.precision(_);
	      return albersUsa;
	    };
	    albersUsa.scale = function(_) {
	      if (!arguments.length) return lower48.scale();
	      lower48.scale(_);
	      alaska.scale(_ * .35);
	      hawaii.scale(_);
	      return albersUsa.translate(lower48.translate());
	    };
	    albersUsa.translate = function(_) {
	      if (!arguments.length) return lower48.translate();
	      var k = lower48.scale(), x = +_[0], y = +_[1];
	      lower48Point = lower48.translate(_).clipExtent([ [ x - .455 * k, y - .238 * k ], [ x + .455 * k, y + .238 * k ] ]).stream(pointStream).point;
	      alaskaPoint = alaska.translate([ x - .307 * k, y + .201 * k ]).clipExtent([ [ x - .425 * k + ε, y + .12 * k + ε ], [ x - .214 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
	      hawaiiPoint = hawaii.translate([ x - .205 * k, y + .212 * k ]).clipExtent([ [ x - .214 * k + ε, y + .166 * k + ε ], [ x - .115 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
	      return albersUsa;
	    };
	    return albersUsa.scale(1070);
	  };
	  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
	    point: d3_noop,
	    lineStart: d3_noop,
	    lineEnd: d3_noop,
	    polygonStart: function() {
	      d3_geo_pathAreaPolygon = 0;
	      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
	    },
	    polygonEnd: function() {
	      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
	      d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
	    }
	  };
	  function d3_geo_pathAreaRingStart() {
	    var x00, y00, x0, y0;
	    d3_geo_pathArea.point = function(x, y) {
	      d3_geo_pathArea.point = nextPoint;
	      x00 = x0 = x, y00 = y0 = y;
	    };
	    function nextPoint(x, y) {
	      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
	      x0 = x, y0 = y;
	    }
	    d3_geo_pathArea.lineEnd = function() {
	      nextPoint(x00, y00);
	    };
	  }
	  var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
	  var d3_geo_pathBounds = {
	    point: d3_geo_pathBoundsPoint,
	    lineStart: d3_noop,
	    lineEnd: d3_noop,
	    polygonStart: d3_noop,
	    polygonEnd: d3_noop
	  };
	  function d3_geo_pathBoundsPoint(x, y) {
	    if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
	    if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
	    if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
	    if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
	  }
	  function d3_geo_pathBuffer() {
	    var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
	    var stream = {
	      point: point,
	      lineStart: function() {
	        stream.point = pointLineStart;
	      },
	      lineEnd: lineEnd,
	      polygonStart: function() {
	        stream.lineEnd = lineEndPolygon;
	      },
	      polygonEnd: function() {
	        stream.lineEnd = lineEnd;
	        stream.point = point;
	      },
	      pointRadius: function(_) {
	        pointCircle = d3_geo_pathBufferCircle(_);
	        return stream;
	      },
	      result: function() {
	        if (buffer.length) {
	          var result = buffer.join("");
	          buffer = [];
	          return result;
	        }
	      }
	    };
	    function point(x, y) {
	      buffer.push("M", x, ",", y, pointCircle);
	    }
	    function pointLineStart(x, y) {
	      buffer.push("M", x, ",", y);
	      stream.point = pointLine;
	    }
	    function pointLine(x, y) {
	      buffer.push("L", x, ",", y);
	    }
	    function lineEnd() {
	      stream.point = point;
	    }
	    function lineEndPolygon() {
	      buffer.push("Z");
	    }
	    return stream;
	  }
	  function d3_geo_pathBufferCircle(radius) {
	    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
	  }
	  var d3_geo_pathCentroid = {
	    point: d3_geo_pathCentroidPoint,
	    lineStart: d3_geo_pathCentroidLineStart,
	    lineEnd: d3_geo_pathCentroidLineEnd,
	    polygonStart: function() {
	      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
	    },
	    polygonEnd: function() {
	      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
	      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
	      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
	    }
	  };
	  function d3_geo_pathCentroidPoint(x, y) {
	    d3_geo_centroidX0 += x;
	    d3_geo_centroidY0 += y;
	    ++d3_geo_centroidZ0;
	  }
	  function d3_geo_pathCentroidLineStart() {
	    var x0, y0;
	    d3_geo_pathCentroid.point = function(x, y) {
	      d3_geo_pathCentroid.point = nextPoint;
	      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
	    };
	    function nextPoint(x, y) {
	      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
	      d3_geo_centroidX1 += z * (x0 + x) / 2;
	      d3_geo_centroidY1 += z * (y0 + y) / 2;
	      d3_geo_centroidZ1 += z;
	      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
	    }
	  }
	  function d3_geo_pathCentroidLineEnd() {
	    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
	  }
	  function d3_geo_pathCentroidRingStart() {
	    var x00, y00, x0, y0;
	    d3_geo_pathCentroid.point = function(x, y) {
	      d3_geo_pathCentroid.point = nextPoint;
	      d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
	    };
	    function nextPoint(x, y) {
	      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
	      d3_geo_centroidX1 += z * (x0 + x) / 2;
	      d3_geo_centroidY1 += z * (y0 + y) / 2;
	      d3_geo_centroidZ1 += z;
	      z = y0 * x - x0 * y;
	      d3_geo_centroidX2 += z * (x0 + x);
	      d3_geo_centroidY2 += z * (y0 + y);
	      d3_geo_centroidZ2 += z * 3;
	      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
	    }
	    d3_geo_pathCentroid.lineEnd = function() {
	      nextPoint(x00, y00);
	    };
	  }
	  function d3_geo_pathContext(context) {
	    var pointRadius = 4.5;
	    var stream = {
	      point: point,
	      lineStart: function() {
	        stream.point = pointLineStart;
	      },
	      lineEnd: lineEnd,
	      polygonStart: function() {
	        stream.lineEnd = lineEndPolygon;
	      },
	      polygonEnd: function() {
	        stream.lineEnd = lineEnd;
	        stream.point = point;
	      },
	      pointRadius: function(_) {
	        pointRadius = _;
	        return stream;
	      },
	      result: d3_noop
	    };
	    function point(x, y) {
	      context.moveTo(x + pointRadius, y);
	      context.arc(x, y, pointRadius, 0, τ);
	    }
	    function pointLineStart(x, y) {
	      context.moveTo(x, y);
	      stream.point = pointLine;
	    }
	    function pointLine(x, y) {
	      context.lineTo(x, y);
	    }
	    function lineEnd() {
	      stream.point = point;
	    }
	    function lineEndPolygon() {
	      context.closePath();
	    }
	    return stream;
	  }
	  function d3_geo_resample(project) {
	    var δ2 = .5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
	    function resample(stream) {
	      return (maxDepth ? resampleRecursive : resampleNone)(stream);
	    }
	    function resampleNone(stream) {
	      return d3_geo_transformPoint(stream, function(x, y) {
	        x = project(x, y);
	        stream.point(x[0], x[1]);
	      });
	    }
	    function resampleRecursive(stream) {
	      var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
	      var resample = {
	        point: point,
	        lineStart: lineStart,
	        lineEnd: lineEnd,
	        polygonStart: function() {
	          stream.polygonStart();
	          resample.lineStart = ringStart;
	        },
	        polygonEnd: function() {
	          stream.polygonEnd();
	          resample.lineStart = lineStart;
	        }
	      };
	      function point(x, y) {
	        x = project(x, y);
	        stream.point(x[0], x[1]);
	      }
	      function lineStart() {
	        x0 = NaN;
	        resample.point = linePoint;
	        stream.lineStart();
	      }
	      function linePoint(λ, φ) {
	        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
	        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
	        stream.point(x0, y0);
	      }
	      function lineEnd() {
	        resample.point = point;
	        stream.lineEnd();
	      }
	      function ringStart() {
	        lineStart();
	        resample.point = ringPoint;
	        resample.lineEnd = ringEnd;
	      }
	      function ringPoint(λ, φ) {
	        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
	        resample.point = linePoint;
	      }
	      function ringEnd() {
	        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
	        resample.lineEnd = lineEnd;
	        lineEnd();
	      }
	      return resample;
	    }
	    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
	      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
	      if (d2 > 4 * δ2 && depth--) {
	        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
	        if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
	          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
	          stream.point(x2, y2);
	          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
	        }
	      }
	    }
	    resample.precision = function(_) {
	      if (!arguments.length) return Math.sqrt(δ2);
	      maxDepth = (δ2 = _ * _) > 0 && 16;
	      return resample;
	    };
	    return resample;
	  }
	  d3.geo.path = function() {
	    var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
	    function path(object) {
	      if (object) {
	        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
	        if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
	        d3.geo.stream(object, cacheStream);
	      }
	      return contextStream.result();
	    }
	    path.area = function(object) {
	      d3_geo_pathAreaSum = 0;
	      d3.geo.stream(object, projectStream(d3_geo_pathArea));
	      return d3_geo_pathAreaSum;
	    };
	    path.centroid = function(object) {
	      d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
	      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
	      return d3_geo_centroidZ2 ? [ d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2 ] : d3_geo_centroidZ1 ? [ d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1 ] : d3_geo_centroidZ0 ? [ d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0 ] : [ NaN, NaN ];
	    };
	    path.bounds = function(object) {
	      d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
	      d3.geo.stream(object, projectStream(d3_geo_pathBounds));
	      return [ [ d3_geo_pathBoundsX0, d3_geo_pathBoundsY0 ], [ d3_geo_pathBoundsX1, d3_geo_pathBoundsY1 ] ];
	    };
	    path.projection = function(_) {
	      if (!arguments.length) return projection;
	      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
	      return reset();
	    };
	    path.context = function(_) {
	      if (!arguments.length) return context;
	      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
	      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
	      return reset();
	    };
	    path.pointRadius = function(_) {
	      if (!arguments.length) return pointRadius;
	      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
	      return path;
	    };
	    function reset() {
	      cacheStream = null;
	      return path;
	    }
	    return path.projection(d3.geo.albersUsa()).context(null);
	  };
	  function d3_geo_pathProjectStream(project) {
	    var resample = d3_geo_resample(function(x, y) {
	      return project([ x * d3_degrees, y * d3_degrees ]);
	    });
	    return function(stream) {
	      return d3_geo_projectionRadians(resample(stream));
	    };
	  }
	  d3.geo.transform = function(methods) {
	    return {
	      stream: function(stream) {
	        var transform = new d3_geo_transform(stream);
	        for (var k in methods) transform[k] = methods[k];
	        return transform;
	      }
	    };
	  };
	  function d3_geo_transform(stream) {
	    this.stream = stream;
	  }
	  d3_geo_transform.prototype = {
	    point: function(x, y) {
	      this.stream.point(x, y);
	    },
	    sphere: function() {
	      this.stream.sphere();
	    },
	    lineStart: function() {
	      this.stream.lineStart();
	    },
	    lineEnd: function() {
	      this.stream.lineEnd();
	    },
	    polygonStart: function() {
	      this.stream.polygonStart();
	    },
	    polygonEnd: function() {
	      this.stream.polygonEnd();
	    }
	  };
	  function d3_geo_transformPoint(stream, point) {
	    return {
	      point: point,
	      sphere: function() {
	        stream.sphere();
	      },
	      lineStart: function() {
	        stream.lineStart();
	      },
	      lineEnd: function() {
	        stream.lineEnd();
	      },
	      polygonStart: function() {
	        stream.polygonStart();
	      },
	      polygonEnd: function() {
	        stream.polygonEnd();
	      }
	    };
	  }
	  d3.geo.projection = d3_geo_projection;
	  d3.geo.projectionMutator = d3_geo_projectionMutator;
	  function d3_geo_projection(project) {
	    return d3_geo_projectionMutator(function() {
	      return project;
	    })();
	  }
	  function d3_geo_projectionMutator(projectAt) {
	    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
	      x = project(x, y);
	      return [ x[0] * k + δx, δy - x[1] * k ];
	    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
	    function projection(point) {
	      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
	      return [ point[0] * k + δx, δy - point[1] * k ];
	    }
	    function invert(point) {
	      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
	      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
	    }
	    projection.stream = function(output) {
	      if (stream) stream.valid = false;
	      stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
	      stream.valid = true;
	      return stream;
	    };
	    projection.clipAngle = function(_) {
	      if (!arguments.length) return clipAngle;
	      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
	      return invalidate();
	    };
	    projection.clipExtent = function(_) {
	      if (!arguments.length) return clipExtent;
	      clipExtent = _;
	      postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
	      return invalidate();
	    };
	    projection.scale = function(_) {
	      if (!arguments.length) return k;
	      k = +_;
	      return reset();
	    };
	    projection.translate = function(_) {
	      if (!arguments.length) return [ x, y ];
	      x = +_[0];
	      y = +_[1];
	      return reset();
	    };
	    projection.center = function(_) {
	      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
	      λ = _[0] % 360 * d3_radians;
	      φ = _[1] % 360 * d3_radians;
	      return reset();
	    };
	    projection.rotate = function(_) {
	      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
	      δλ = _[0] % 360 * d3_radians;
	      δφ = _[1] % 360 * d3_radians;
	      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
	      return reset();
	    };
	    d3.rebind(projection, projectResample, "precision");
	    function reset() {
	      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
	      var center = project(λ, φ);
	      δx = x - center[0] * k;
	      δy = y + center[1] * k;
	      return invalidate();
	    }
	    function invalidate() {
	      if (stream) stream.valid = false, stream = null;
	      return projection;
	    }
	    return function() {
	      project = projectAt.apply(this, arguments);
	      projection.invert = project.invert && invert;
	      return reset();
	    };
	  }
	  function d3_geo_projectionRadians(stream) {
	    return d3_geo_transformPoint(stream, function(x, y) {
	      stream.point(x * d3_radians, y * d3_radians);
	    });
	  }
	  function d3_geo_equirectangular(λ, φ) {
	    return [ λ, φ ];
	  }
	  (d3.geo.equirectangular = function() {
	    return d3_geo_projection(d3_geo_equirectangular);
	  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
	  d3.geo.rotation = function(rotate) {
	    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
	    function forward(coordinates) {
	      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
	      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
	    }
	    forward.invert = function(coordinates) {
	      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
	      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
	    };
	    return forward;
	  };
	  function d3_geo_identityRotation(λ, φ) {
	    return [ λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ ];
	  }
	  d3_geo_identityRotation.invert = d3_geo_equirectangular;
	  function d3_geo_rotation(δλ, δφ, δγ) {
	    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation;
	  }
	  function d3_geo_forwardRotationλ(δλ) {
	    return function(λ, φ) {
	      return λ += δλ, [ λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ ];
	    };
	  }
	  function d3_geo_rotationλ(δλ) {
	    var rotation = d3_geo_forwardRotationλ(δλ);
	    rotation.invert = d3_geo_forwardRotationλ(-δλ);
	    return rotation;
	  }
	  function d3_geo_rotationφγ(δφ, δγ) {
	    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
	    function rotation(λ, φ) {
	      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
	      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ) ];
	    }
	    rotation.invert = function(λ, φ) {
	      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
	      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ) ];
	    };
	    return rotation;
	  }
	  d3.geo.circle = function() {
	    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
	    function circle() {
	      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
	      interpolate(null, null, 1, {
	        point: function(x, y) {
	          ring.push(x = rotate(x, y));
	          x[0] *= d3_degrees, x[1] *= d3_degrees;
	        }
	      });
	      return {
	        type: "Polygon",
	        coordinates: [ ring ]
	      };
	    }
	    circle.origin = function(x) {
	      if (!arguments.length) return origin;
	      origin = x;
	      return circle;
	    };
	    circle.angle = function(x) {
	      if (!arguments.length) return angle;
	      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
	      return circle;
	    };
	    circle.precision = function(_) {
	      if (!arguments.length) return precision;
	      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
	      return circle;
	    };
	    return circle.angle(90);
	  };
	  function d3_geo_circleInterpolate(radius, precision) {
	    var cr = Math.cos(radius), sr = Math.sin(radius);
	    return function(from, to, direction, listener) {
	      var step = direction * precision;
	      if (from != null) {
	        from = d3_geo_circleAngle(cr, from);
	        to = d3_geo_circleAngle(cr, to);
	        if (direction > 0 ? from < to : from > to) from += direction * τ;
	      } else {
	        from = radius + direction * τ;
	        to = radius - .5 * step;
	      }
	      for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
	        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
	      }
	    };
	  }
	  function d3_geo_circleAngle(cr, point) {
	    var a = d3_geo_cartesian(point);
	    a[0] -= cr;
	    d3_geo_cartesianNormalize(a);
	    var angle = d3_acos(-a[1]);
	    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
	  }
	  d3.geo.distance = function(a, b) {
	    var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
	    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
	  };
	  d3.geo.graticule = function() {
	    var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
	    function graticule() {
	      return {
	        type: "MultiLineString",
	        coordinates: lines()
	      };
	    }
	    function lines() {
	      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
	        return abs(x % DX) > ε;
	      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
	        return abs(y % DY) > ε;
	      }).map(y));
	    }
	    graticule.lines = function() {
	      return lines().map(function(coordinates) {
	        return {
	          type: "LineString",
	          coordinates: coordinates
	        };
	      });
	    };
	    graticule.outline = function() {
	      return {
	        type: "Polygon",
	        coordinates: [ X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1)) ]
	      };
	    };
	    graticule.extent = function(_) {
	      if (!arguments.length) return graticule.minorExtent();
	      return graticule.majorExtent(_).minorExtent(_);
	    };
	    graticule.majorExtent = function(_) {
	      if (!arguments.length) return [ [ X0, Y0 ], [ X1, Y1 ] ];
	      X0 = +_[0][0], X1 = +_[1][0];
	      Y0 = +_[0][1], Y1 = +_[1][1];
	      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
	      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
	      return graticule.precision(precision);
	    };
	    graticule.minorExtent = function(_) {
	      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
	      x0 = +_[0][0], x1 = +_[1][0];
	      y0 = +_[0][1], y1 = +_[1][1];
	      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
	      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
	      return graticule.precision(precision);
	    };
	    graticule.step = function(_) {
	      if (!arguments.length) return graticule.minorStep();
	      return graticule.majorStep(_).minorStep(_);
	    };
	    graticule.majorStep = function(_) {
	      if (!arguments.length) return [ DX, DY ];
	      DX = +_[0], DY = +_[1];
	      return graticule;
	    };
	    graticule.minorStep = function(_) {
	      if (!arguments.length) return [ dx, dy ];
	      dx = +_[0], dy = +_[1];
	      return graticule;
	    };
	    graticule.precision = function(_) {
	      if (!arguments.length) return precision;
	      precision = +_;
	      x = d3_geo_graticuleX(y0, y1, 90);
	      y = d3_geo_graticuleY(x0, x1, precision);
	      X = d3_geo_graticuleX(Y0, Y1, 90);
	      Y = d3_geo_graticuleY(X0, X1, precision);
	      return graticule;
	    };
	    return graticule.majorExtent([ [ -180, -90 + ε ], [ 180, 90 - ε ] ]).minorExtent([ [ -180, -80 - ε ], [ 180, 80 + ε ] ]);
	  };
	  function d3_geo_graticuleX(y0, y1, dy) {
	    var y = d3.range(y0, y1 - ε, dy).concat(y1);
	    return function(x) {
	      return y.map(function(y) {
	        return [ x, y ];
	      });
	    };
	  }
	  function d3_geo_graticuleY(x0, x1, dx) {
	    var x = d3.range(x0, x1 - ε, dx).concat(x1);
	    return function(y) {
	      return x.map(function(x) {
	        return [ x, y ];
	      });
	    };
	  }
	  function d3_source(d) {
	    return d.source;
	  }
	  function d3_target(d) {
	    return d.target;
	  }
	  d3.geo.greatArc = function() {
	    var source = d3_source, source_, target = d3_target, target_;
	    function greatArc() {
	      return {
	        type: "LineString",
	        coordinates: [ source_ || source.apply(this, arguments), target_ || target.apply(this, arguments) ]
	      };
	    }
	    greatArc.distance = function() {
	      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
	    };
	    greatArc.source = function(_) {
	      if (!arguments.length) return source;
	      source = _, source_ = typeof _ === "function" ? null : _;
	      return greatArc;
	    };
	    greatArc.target = function(_) {
	      if (!arguments.length) return target;
	      target = _, target_ = typeof _ === "function" ? null : _;
	      return greatArc;
	    };
	    greatArc.precision = function() {
	      return arguments.length ? greatArc : 0;
	    };
	    return greatArc;
	  };
	  d3.geo.interpolate = function(source, target) {
	    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
	  };
	  function d3_geo_interpolate(x0, y0, x1, y1) {
	    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
	    var interpolate = d ? function(t) {
	      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
	      return [ Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees ];
	    } : function() {
	      return [ x0 * d3_degrees, y0 * d3_degrees ];
	    };
	    interpolate.distance = d;
	    return interpolate;
	  }
	  d3.geo.length = function(object) {
	    d3_geo_lengthSum = 0;
	    d3.geo.stream(object, d3_geo_length);
	    return d3_geo_lengthSum;
	  };
	  var d3_geo_lengthSum;
	  var d3_geo_length = {
	    sphere: d3_noop,
	    point: d3_noop,
	    lineStart: d3_geo_lengthLineStart,
	    lineEnd: d3_noop,
	    polygonStart: d3_noop,
	    polygonEnd: d3_noop
	  };
	  function d3_geo_lengthLineStart() {
	    var λ0, sinφ0, cosφ0;
	    d3_geo_length.point = function(λ, φ) {
	      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
	      d3_geo_length.point = nextPoint;
	    };
	    d3_geo_length.lineEnd = function() {
	      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
	    };
	    function nextPoint(λ, φ) {
	      var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
	      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
	      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
	    }
	  }
	  function d3_geo_azimuthal(scale, angle) {
	    function azimuthal(λ, φ) {
	      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
	      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
	    }
	    azimuthal.invert = function(x, y) {
	      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
	      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
	    };
	    return azimuthal;
	  }
	  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
	    return Math.sqrt(2 / (1 + cosλcosφ));
	  }, function(ρ) {
	    return 2 * Math.asin(ρ / 2);
	  });
	  (d3.geo.azimuthalEqualArea = function() {
	    return d3_geo_projection(d3_geo_azimuthalEqualArea);
	  }).raw = d3_geo_azimuthalEqualArea;
	  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
	    var c = Math.acos(cosλcosφ);
	    return c && c / Math.sin(c);
	  }, d3_identity);
	  (d3.geo.azimuthalEquidistant = function() {
	    return d3_geo_projection(d3_geo_azimuthalEquidistant);
	  }).raw = d3_geo_azimuthalEquidistant;
	  function d3_geo_conicConformal(φ0, φ1) {
	    var cosφ0 = Math.cos(φ0), t = function(φ) {
	      return Math.tan(π / 4 + φ / 2);
	    }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
	    if (!n) return d3_geo_mercator;
	    function forward(λ, φ) {
	      if (F > 0) {
	        if (φ < -halfπ + ε) φ = -halfπ + ε;
	      } else {
	        if (φ > halfπ - ε) φ = halfπ - ε;
	      }
	      var ρ = F / Math.pow(t(φ), n);
	      return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
	    }
	    forward.invert = function(x, y) {
	      var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
	      return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ ];
	    };
	    return forward;
	  }
	  (d3.geo.conicConformal = function() {
	    return d3_geo_conic(d3_geo_conicConformal);
	  }).raw = d3_geo_conicConformal;
	  function d3_geo_conicEquidistant(φ0, φ1) {
	    var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
	    if (abs(n) < ε) return d3_geo_equirectangular;
	    function forward(λ, φ) {
	      var ρ = G - φ;
	      return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
	    }
	    forward.invert = function(x, y) {
	      var ρ0_y = G - y;
	      return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
	    };
	    return forward;
	  }
	  (d3.geo.conicEquidistant = function() {
	    return d3_geo_conic(d3_geo_conicEquidistant);
	  }).raw = d3_geo_conicEquidistant;
	  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
	    return 1 / cosλcosφ;
	  }, Math.atan);
	  (d3.geo.gnomonic = function() {
	    return d3_geo_projection(d3_geo_gnomonic);
	  }).raw = d3_geo_gnomonic;
	  function d3_geo_mercator(λ, φ) {
	    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
	  }
	  d3_geo_mercator.invert = function(x, y) {
	    return [ x, 2 * Math.atan(Math.exp(y)) - halfπ ];
	  };
	  function d3_geo_mercatorProjection(project) {
	    var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
	    m.scale = function() {
	      var v = scale.apply(m, arguments);
	      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
	    };
	    m.translate = function() {
	      var v = translate.apply(m, arguments);
	      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
	    };
	    m.clipExtent = function(_) {
	      var v = clipExtent.apply(m, arguments);
	      if (v === m) {
	        if (clipAuto = _ == null) {
	          var k = π * scale(), t = translate();
	          clipExtent([ [ t[0] - k, t[1] - k ], [ t[0] + k, t[1] + k ] ]);
	        }
	      } else if (clipAuto) {
	        v = null;
	      }
	      return v;
	    };
	    return m.clipExtent(null);
	  }
	  (d3.geo.mercator = function() {
	    return d3_geo_mercatorProjection(d3_geo_mercator);
	  }).raw = d3_geo_mercator;
	  var d3_geo_orthographic = d3_geo_azimuthal(function() {
	    return 1;
	  }, Math.asin);
	  (d3.geo.orthographic = function() {
	    return d3_geo_projection(d3_geo_orthographic);
	  }).raw = d3_geo_orthographic;
	  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
	    return 1 / (1 + cosλcosφ);
	  }, function(ρ) {
	    return 2 * Math.atan(ρ);
	  });
	  (d3.geo.stereographic = function() {
	    return d3_geo_projection(d3_geo_stereographic);
	  }).raw = d3_geo_stereographic;
	  function d3_geo_transverseMercator(λ, φ) {
	    return [ Math.log(Math.tan(π / 4 + φ / 2)), -λ ];
	  }
	  d3_geo_transverseMercator.invert = function(x, y) {
	    return [ -y, 2 * Math.atan(Math.exp(x)) - halfπ ];
	  };
	  (d3.geo.transverseMercator = function() {
	    var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator), center = projection.center, rotate = projection.rotate;
	    projection.center = function(_) {
	      return _ ? center([ -_[1], _[0] ]) : (_ = center(), [ _[1], -_[0] ]);
	    };
	    projection.rotate = function(_) {
	      return _ ? rotate([ _[0], _[1], _.length > 2 ? _[2] + 90 : 90 ]) : (_ = rotate(), 
	      [ _[0], _[1], _[2] - 90 ]);
	    };
	    return rotate([ 0, 0, 90 ]);
	  }).raw = d3_geo_transverseMercator;
	  d3.geom = {};
	  function d3_geom_pointX(d) {
	    return d[0];
	  }
	  function d3_geom_pointY(d) {
	    return d[1];
	  }
	  d3.geom.hull = function(vertices) {
	    var x = d3_geom_pointX, y = d3_geom_pointY;
	    if (arguments.length) return hull(vertices);
	    function hull(data) {
	      if (data.length < 3) return [];
	      var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
	      for (i = 0; i < n; i++) {
	        points.push([ +fx.call(this, data[i], i), +fy.call(this, data[i], i), i ]);
	      }
	      points.sort(d3_geom_hullOrder);
	      for (i = 0; i < n; i++) flippedPoints.push([ points[i][0], -points[i][1] ]);
	      var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
	      var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
	      for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
	      for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
	      return polygon;
	    }
	    hull.x = function(_) {
	      return arguments.length ? (x = _, hull) : x;
	    };
	    hull.y = function(_) {
	      return arguments.length ? (y = _, hull) : y;
	    };
	    return hull;
	  };
	  function d3_geom_hullUpper(points) {
	    var n = points.length, hull = [ 0, 1 ], hs = 2;
	    for (var i = 2; i < n; i++) {
	      while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;
	      hull[hs++] = i;
	    }
	    return hull.slice(0, hs);
	  }
	  function d3_geom_hullOrder(a, b) {
	    return a[0] - b[0] || a[1] - b[1];
	  }
	  d3.geom.polygon = function(coordinates) {
	    d3_subclass(coordinates, d3_geom_polygonPrototype);
	    return coordinates;
	  };
	  var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
	  d3_geom_polygonPrototype.area = function() {
	    var i = -1, n = this.length, a, b = this[n - 1], area = 0;
	    while (++i < n) {
	      a = b;
	      b = this[i];
	      area += a[1] * b[0] - a[0] * b[1];
	    }
	    return area * .5;
	  };
	  d3_geom_polygonPrototype.centroid = function(k) {
	    var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
	    if (!arguments.length) k = -1 / (6 * this.area());
	    while (++i < n) {
	      a = b;
	      b = this[i];
	      c = a[0] * b[1] - b[0] * a[1];
	      x += (a[0] + b[0]) * c;
	      y += (a[1] + b[1]) * c;
	    }
	    return [ x * k, y * k ];
	  };
	  d3_geom_polygonPrototype.clip = function(subject) {
	    var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
	    while (++i < n) {
	      input = subject.slice();
	      subject.length = 0;
	      b = this[i];
	      c = input[(m = input.length - closed) - 1];
	      j = -1;
	      while (++j < m) {
	        d = input[j];
	        if (d3_geom_polygonInside(d, a, b)) {
	          if (!d3_geom_polygonInside(c, a, b)) {
	            subject.push(d3_geom_polygonIntersect(c, d, a, b));
	          }
	          subject.push(d);
	        } else if (d3_geom_polygonInside(c, a, b)) {
	          subject.push(d3_geom_polygonIntersect(c, d, a, b));
	        }
	        c = d;
	      }
	      if (closed) subject.push(subject[0]);
	      a = b;
	    }
	    return subject;
	  };
	  function d3_geom_polygonInside(p, a, b) {
	    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
	  }
	  function d3_geom_polygonIntersect(c, d, a, b) {
	    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
	    return [ x1 + ua * x21, y1 + ua * y21 ];
	  }
	  function d3_geom_polygonClosed(coordinates) {
	    var a = coordinates[0], b = coordinates[coordinates.length - 1];
	    return !(a[0] - b[0] || a[1] - b[1]);
	  }
	  var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
	  function d3_geom_voronoiBeach() {
	    d3_geom_voronoiRedBlackNode(this);
	    this.edge = this.site = this.circle = null;
	  }
	  function d3_geom_voronoiCreateBeach(site) {
	    var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
	    beach.site = site;
	    return beach;
	  }
	  function d3_geom_voronoiDetachBeach(beach) {
	    d3_geom_voronoiDetachCircle(beach);
	    d3_geom_voronoiBeaches.remove(beach);
	    d3_geom_voronoiBeachPool.push(beach);
	    d3_geom_voronoiRedBlackNode(beach);
	  }
	  function d3_geom_voronoiRemoveBeach(beach) {
	    var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
	      x: x,
	      y: y
	    }, previous = beach.P, next = beach.N, disappearing = [ beach ];
	    d3_geom_voronoiDetachBeach(beach);
	    var lArc = previous;
	    while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
	      previous = lArc.P;
	      disappearing.unshift(lArc);
	      d3_geom_voronoiDetachBeach(lArc);
	      lArc = previous;
	    }
	    disappearing.unshift(lArc);
	    d3_geom_voronoiDetachCircle(lArc);
	    var rArc = next;
	    while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
	      next = rArc.N;
	      disappearing.push(rArc);
	      d3_geom_voronoiDetachBeach(rArc);
	      rArc = next;
	    }
	    disappearing.push(rArc);
	    d3_geom_voronoiDetachCircle(rArc);
	    var nArcs = disappearing.length, iArc;
	    for (iArc = 1; iArc < nArcs; ++iArc) {
	      rArc = disappearing[iArc];
	      lArc = disappearing[iArc - 1];
	      d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
	    }
	    lArc = disappearing[0];
	    rArc = disappearing[nArcs - 1];
	    rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
	    d3_geom_voronoiAttachCircle(lArc);
	    d3_geom_voronoiAttachCircle(rArc);
	  }
	  function d3_geom_voronoiAddBeach(site) {
	    var x = site.x, directrix = site.y, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
	    while (node) {
	      dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
	      if (dxl > ε) node = node.L; else {
	        dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
	        if (dxr > ε) {
	          if (!node.R) {
	            lArc = node;
	            break;
	          }
	          node = node.R;
	        } else {
	          if (dxl > -ε) {
	            lArc = node.P;
	            rArc = node;
	          } else if (dxr > -ε) {
	            lArc = node;
	            rArc = node.N;
	          } else {
	            lArc = rArc = node;
	          }
	          break;
	        }
	      }
	    }
	    var newArc = d3_geom_voronoiCreateBeach(site);
	    d3_geom_voronoiBeaches.insert(lArc, newArc);
	    if (!lArc && !rArc) return;
	    if (lArc === rArc) {
	      d3_geom_voronoiDetachCircle(lArc);
	      rArc = d3_geom_voronoiCreateBeach(lArc.site);
	      d3_geom_voronoiBeaches.insert(newArc, rArc);
	      newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
	      d3_geom_voronoiAttachCircle(lArc);
	      d3_geom_voronoiAttachCircle(rArc);
	      return;
	    }
	    if (!rArc) {
	      newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
	      return;
	    }
	    d3_geom_voronoiDetachCircle(lArc);
	    d3_geom_voronoiDetachCircle(rArc);
	    var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
	      x: (cy * hb - by * hc) / d + ax,
	      y: (bx * hc - cx * hb) / d + ay
	    };
	    d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
	    newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
	    rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
	    d3_geom_voronoiAttachCircle(lArc);
	    d3_geom_voronoiAttachCircle(rArc);
	  }
	  function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
	    var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
	    if (!pby2) return rfocx;
	    var lArc = arc.P;
	    if (!lArc) return -Infinity;
	    site = lArc.site;
	    var lfocx = site.x, lfocy = site.y, plby2 = lfocy - directrix;
	    if (!plby2) return lfocx;
	    var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
	    if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
	    return (rfocx + lfocx) / 2;
	  }
	  function d3_geom_voronoiRightBreakPoint(arc, directrix) {
	    var rArc = arc.N;
	    if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
	    var site = arc.site;
	    return site.y === directrix ? site.x : Infinity;
	  }
	  function d3_geom_voronoiCell(site) {
	    this.site = site;
	    this.edges = [];
	  }
	  d3_geom_voronoiCell.prototype.prepare = function() {
	    var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
	    while (iHalfEdge--) {
	      edge = halfEdges[iHalfEdge].edge;
	      if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
	    }
	    halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
	    return halfEdges.length;
	  };
	  function d3_geom_voronoiCloseCells(extent) {
	    var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
	    while (iCell--) {
	      cell = cells[iCell];
	      if (!cell || !cell.prepare()) continue;
	      halfEdges = cell.edges;
	      nHalfEdges = halfEdges.length;
	      iHalfEdge = 0;
	      while (iHalfEdge < nHalfEdges) {
	        end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
	        start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
	        if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
	          halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
	            x: x0,
	            y: abs(x2 - x0) < ε ? y2 : y1
	          } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
	            x: abs(y2 - y1) < ε ? x2 : x1,
	            y: y1
	          } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
	            x: x1,
	            y: abs(x2 - x1) < ε ? y2 : y0
	          } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
	            x: abs(y2 - y0) < ε ? x2 : x0,
	            y: y0
	          } : null), cell.site, null));
	          ++nHalfEdges;
	        }
	      }
	    }
	  }
	  function d3_geom_voronoiHalfEdgeOrder(a, b) {
	    return b.angle - a.angle;
	  }
	  function d3_geom_voronoiCircle() {
	    d3_geom_voronoiRedBlackNode(this);
	    this.x = this.y = this.arc = this.site = this.cy = null;
	  }
	  function d3_geom_voronoiAttachCircle(arc) {
	    var lArc = arc.P, rArc = arc.N;
	    if (!lArc || !rArc) return;
	    var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
	    if (lSite === rSite) return;
	    var bx = cSite.x, by = cSite.y, ax = lSite.x - bx, ay = lSite.y - by, cx = rSite.x - bx, cy = rSite.y - by;
	    var d = 2 * (ax * cy - ay * cx);
	    if (d >= -ε2) return;
	    var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x = (cy * ha - ay * hc) / d, y = (ax * hc - cx * ha) / d, cy = y + by;
	    var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
	    circle.arc = arc;
	    circle.site = cSite;
	    circle.x = x + bx;
	    circle.y = cy + Math.sqrt(x * x + y * y);
	    circle.cy = cy;
	    arc.circle = circle;
	    var before = null, node = d3_geom_voronoiCircles._;
	    while (node) {
	      if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
	        if (node.L) node = node.L; else {
	          before = node.P;
	          break;
	        }
	      } else {
	        if (node.R) node = node.R; else {
	          before = node;
	          break;
	        }
	      }
	    }
	    d3_geom_voronoiCircles.insert(before, circle);
	    if (!before) d3_geom_voronoiFirstCircle = circle;
	  }
	  function d3_geom_voronoiDetachCircle(arc) {
	    var circle = arc.circle;
	    if (circle) {
	      if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
	      d3_geom_voronoiCircles.remove(circle);
	      d3_geom_voronoiCirclePool.push(circle);
	      d3_geom_voronoiRedBlackNode(circle);
	      arc.circle = null;
	    }
	  }
	  function d3_geom_voronoiClipEdges(extent) {
	    var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
	    while (i--) {
	      e = edges[i];
	      if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) {
	        e.a = e.b = null;
	        edges.splice(i, 1);
	      }
	    }
	  }
	  function d3_geom_voronoiConnectEdge(edge, extent) {
	    var vb = edge.b;
	    if (vb) return true;
	    var va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
	    if (ry === ly) {
	      if (fx < x0 || fx >= x1) return;
	      if (lx > rx) {
	        if (!va) va = {
	          x: fx,
	          y: y0
	        }; else if (va.y >= y1) return;
	        vb = {
	          x: fx,
	          y: y1
	        };
	      } else {
	        if (!va) va = {
	          x: fx,
	          y: y1
	        }; else if (va.y < y0) return;
	        vb = {
	          x: fx,
	          y: y0
	        };
	      }
	    } else {
	      fm = (lx - rx) / (ry - ly);
	      fb = fy - fm * fx;
	      if (fm < -1 || fm > 1) {
	        if (lx > rx) {
	          if (!va) va = {
	            x: (y0 - fb) / fm,
	            y: y0
	          }; else if (va.y >= y1) return;
	          vb = {
	            x: (y1 - fb) / fm,
	            y: y1
	          };
	        } else {
	          if (!va) va = {
	            x: (y1 - fb) / fm,
	            y: y1
	          }; else if (va.y < y0) return;
	          vb = {
	            x: (y0 - fb) / fm,
	            y: y0
	          };
	        }
	      } else {
	        if (ly < ry) {
	          if (!va) va = {
	            x: x0,
	            y: fm * x0 + fb
	          }; else if (va.x >= x1) return;
	          vb = {
	            x: x1,
	            y: fm * x1 + fb
	          };
	        } else {
	          if (!va) va = {
	            x: x1,
	            y: fm * x1 + fb
	          }; else if (va.x < x0) return;
	          vb = {
	            x: x0,
	            y: fm * x0 + fb
	          };
	        }
	      }
	    }
	    edge.a = va;
	    edge.b = vb;
	    return true;
	  }
	  function d3_geom_voronoiEdge(lSite, rSite) {
	    this.l = lSite;
	    this.r = rSite;
	    this.a = this.b = null;
	  }
	  function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
	    var edge = new d3_geom_voronoiEdge(lSite, rSite);
	    d3_geom_voronoiEdges.push(edge);
	    if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
	    if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
	    d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
	    d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
	    return edge;
	  }
	  function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
	    var edge = new d3_geom_voronoiEdge(lSite, null);
	    edge.a = va;
	    edge.b = vb;
	    d3_geom_voronoiEdges.push(edge);
	    return edge;
	  }
	  function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
	    if (!edge.a && !edge.b) {
	      edge.a = vertex;
	      edge.l = lSite;
	      edge.r = rSite;
	    } else if (edge.l === rSite) {
	      edge.b = vertex;
	    } else {
	      edge.a = vertex;
	    }
	  }
	  function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
	    var va = edge.a, vb = edge.b;
	    this.edge = edge;
	    this.site = lSite;
	    this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
	  }
	  d3_geom_voronoiHalfEdge.prototype = {
	    start: function() {
	      return this.edge.l === this.site ? this.edge.a : this.edge.b;
	    },
	    end: function() {
	      return this.edge.l === this.site ? this.edge.b : this.edge.a;
	    }
	  };
	  function d3_geom_voronoiRedBlackTree() {
	    this._ = null;
	  }
	  function d3_geom_voronoiRedBlackNode(node) {
	    node.U = node.C = node.L = node.R = node.P = node.N = null;
	  }
	  d3_geom_voronoiRedBlackTree.prototype = {
	    insert: function(after, node) {
	      var parent, grandpa, uncle;
	      if (after) {
	        node.P = after;
	        node.N = after.N;
	        if (after.N) after.N.P = node;
	        after.N = node;
	        if (after.R) {
	          after = after.R;
	          while (after.L) after = after.L;
	          after.L = node;
	        } else {
	          after.R = node;
	        }
	        parent = after;
	      } else if (this._) {
	        after = d3_geom_voronoiRedBlackFirst(this._);
	        node.P = null;
	        node.N = after;
	        after.P = after.L = node;
	        parent = after;
	      } else {
	        node.P = node.N = null;
	        this._ = node;
	        parent = null;
	      }
	      node.L = node.R = null;
	      node.U = parent;
	      node.C = true;
	      after = node;
	      while (parent && parent.C) {
	        grandpa = parent.U;
	        if (parent === grandpa.L) {
	          uncle = grandpa.R;
	          if (uncle && uncle.C) {
	            parent.C = uncle.C = false;
	            grandpa.C = true;
	            after = grandpa;
	          } else {
	            if (after === parent.R) {
	              d3_geom_voronoiRedBlackRotateLeft(this, parent);
	              after = parent;
	              parent = after.U;
	            }
	            parent.C = false;
	            grandpa.C = true;
	            d3_geom_voronoiRedBlackRotateRight(this, grandpa);
	          }
	        } else {
	          uncle = grandpa.L;
	          if (uncle && uncle.C) {
	            parent.C = uncle.C = false;
	            grandpa.C = true;
	            after = grandpa;
	          } else {
	            if (after === parent.L) {
	              d3_geom_voronoiRedBlackRotateRight(this, parent);
	              after = parent;
	              parent = after.U;
	            }
	            parent.C = false;
	            grandpa.C = true;
	            d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
	          }
	        }
	        parent = after.U;
	      }
	      this._.C = false;
	    },
	    remove: function(node) {
	      if (node.N) node.N.P = node.P;
	      if (node.P) node.P.N = node.N;
	      node.N = node.P = null;
	      var parent = node.U, sibling, left = node.L, right = node.R, next, red;
	      if (!left) next = right; else if (!right) next = left; else next = d3_geom_voronoiRedBlackFirst(right);
	      if (parent) {
	        if (parent.L === node) parent.L = next; else parent.R = next;
	      } else {
	        this._ = next;
	      }
	      if (left && right) {
	        red = next.C;
	        next.C = node.C;
	        next.L = left;
	        left.U = next;
	        if (next !== right) {
	          parent = next.U;
	          next.U = node.U;
	          node = next.R;
	          parent.L = node;
	          next.R = right;
	          right.U = next;
	        } else {
	          next.U = parent;
	          parent = next;
	          node = next.R;
	        }
	      } else {
	        red = node.C;
	        node = next;
	      }
	      if (node) node.U = parent;
	      if (red) return;
	      if (node && node.C) {
	        node.C = false;
	        return;
	      }
	      do {
	        if (node === this._) break;
	        if (node === parent.L) {
	          sibling = parent.R;
	          if (sibling.C) {
	            sibling.C = false;
	            parent.C = true;
	            d3_geom_voronoiRedBlackRotateLeft(this, parent);
	            sibling = parent.R;
	          }
	          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
	            if (!sibling.R || !sibling.R.C) {
	              sibling.L.C = false;
	              sibling.C = true;
	              d3_geom_voronoiRedBlackRotateRight(this, sibling);
	              sibling = parent.R;
	            }
	            sibling.C = parent.C;
	            parent.C = sibling.R.C = false;
	            d3_geom_voronoiRedBlackRotateLeft(this, parent);
	            node = this._;
	            break;
	          }
	        } else {
	          sibling = parent.L;
	          if (sibling.C) {
	            sibling.C = false;
	            parent.C = true;
	            d3_geom_voronoiRedBlackRotateRight(this, parent);
	            sibling = parent.L;
	          }
	          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
	            if (!sibling.L || !sibling.L.C) {
	              sibling.R.C = false;
	              sibling.C = true;
	              d3_geom_voronoiRedBlackRotateLeft(this, sibling);
	              sibling = parent.L;
	            }
	            sibling.C = parent.C;
	            parent.C = sibling.L.C = false;
	            d3_geom_voronoiRedBlackRotateRight(this, parent);
	            node = this._;
	            break;
	          }
	        }
	        sibling.C = true;
	        node = parent;
	        parent = parent.U;
	      } while (!node.C);
	      if (node) node.C = false;
	    }
	  };
	  function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
	    var p = node, q = node.R, parent = p.U;
	    if (parent) {
	      if (parent.L === p) parent.L = q; else parent.R = q;
	    } else {
	      tree._ = q;
	    }
	    q.U = parent;
	    p.U = q;
	    p.R = q.L;
	    if (p.R) p.R.U = p;
	    q.L = p;
	  }
	  function d3_geom_voronoiRedBlackRotateRight(tree, node) {
	    var p = node, q = node.L, parent = p.U;
	    if (parent) {
	      if (parent.L === p) parent.L = q; else parent.R = q;
	    } else {
	      tree._ = q;
	    }
	    q.U = parent;
	    p.U = q;
	    p.L = q.R;
	    if (p.L) p.L.U = p;
	    q.R = p;
	  }
	  function d3_geom_voronoiRedBlackFirst(node) {
	    while (node.L) node = node.L;
	    return node;
	  }
	  function d3_geom_voronoi(sites, bbox) {
	    var site = sites.sort(d3_geom_voronoiVertexOrder).pop(), x0, y0, circle;
	    d3_geom_voronoiEdges = [];
	    d3_geom_voronoiCells = new Array(sites.length);
	    d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree();
	    d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree();
	    while (true) {
	      circle = d3_geom_voronoiFirstCircle;
	      if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
	        if (site.x !== x0 || site.y !== y0) {
	          d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
	          d3_geom_voronoiAddBeach(site);
	          x0 = site.x, y0 = site.y;
	        }
	        site = sites.pop();
	      } else if (circle) {
	        d3_geom_voronoiRemoveBeach(circle.arc);
	      } else {
	        break;
	      }
	    }
	    if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
	    var diagram = {
	      cells: d3_geom_voronoiCells,
	      edges: d3_geom_voronoiEdges
	    };
	    d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
	    return diagram;
	  }
	  function d3_geom_voronoiVertexOrder(a, b) {
	    return b.y - a.y || b.x - a.x;
	  }
	  d3.geom.voronoi = function(points) {
	    var x = d3_geom_pointX, y = d3_geom_pointY, fx = x, fy = y, clipExtent = d3_geom_voronoiClipExtent;
	    if (points) return voronoi(points);
	    function voronoi(data) {
	      var polygons = new Array(data.length), x0 = clipExtent[0][0], y0 = clipExtent[0][1], x1 = clipExtent[1][0], y1 = clipExtent[1][1];
	      d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
	        var edges = cell.edges, site = cell.site, polygon = polygons[i] = edges.length ? edges.map(function(e) {
	          var s = e.start();
	          return [ s.x, s.y ];
	        }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [ [ x0, y1 ], [ x1, y1 ], [ x1, y0 ], [ x0, y0 ] ] : [];
	        polygon.point = data[i];
	      });
	      return polygons;
	    }
	    function sites(data) {
	      return data.map(function(d, i) {
	        return {
	          x: Math.round(fx(d, i) / ε) * ε,
	          y: Math.round(fy(d, i) / ε) * ε,
	          i: i
	        };
	      });
	    }
	    voronoi.links = function(data) {
	      return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
	        return edge.l && edge.r;
	      }).map(function(edge) {
	        return {
	          source: data[edge.l.i],
	          target: data[edge.r.i]
	        };
	      });
	    };
	    voronoi.triangles = function(data) {
	      var triangles = [];
	      d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
	        var site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
	        while (++j < m) {
	          e0 = e1;
	          s0 = s1;
	          e1 = edges[j].edge;
	          s1 = e1.l === site ? e1.r : e1.l;
	          if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
	            triangles.push([ data[i], data[s0.i], data[s1.i] ]);
	          }
	        }
	      });
	      return triangles;
	    };
	    voronoi.x = function(_) {
	      return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
	    };
	    voronoi.y = function(_) {
	      return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
	    };
	    voronoi.clipExtent = function(_) {
	      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
	      clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
	      return voronoi;
	    };
	    voronoi.size = function(_) {
	      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
	      return voronoi.clipExtent(_ && [ [ 0, 0 ], _ ]);
	    };
	    return voronoi;
	  };
	  var d3_geom_voronoiClipExtent = [ [ -1e6, -1e6 ], [ 1e6, 1e6 ] ];
	  function d3_geom_voronoiTriangleArea(a, b, c) {
	    return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
	  }
	  d3.geom.delaunay = function(vertices) {
	    return d3.geom.voronoi().triangles(vertices);
	  };
	  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
	    var x = d3_geom_pointX, y = d3_geom_pointY, compat;
	    if (compat = arguments.length) {
	      x = d3_geom_quadtreeCompatX;
	      y = d3_geom_quadtreeCompatY;
	      if (compat === 3) {
	        y2 = y1;
	        x2 = x1;
	        y1 = x1 = 0;
	      }
	      return quadtree(points);
	    }
	    function quadtree(data) {
	      var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
	      if (x1 != null) {
	        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
	      } else {
	        x2_ = y2_ = -(x1_ = y1_ = Infinity);
	        xs = [], ys = [];
	        n = data.length;
	        if (compat) for (i = 0; i < n; ++i) {
	          d = data[i];
	          if (d.x < x1_) x1_ = d.x;
	          if (d.y < y1_) y1_ = d.y;
	          if (d.x > x2_) x2_ = d.x;
	          if (d.y > y2_) y2_ = d.y;
	          xs.push(d.x);
	          ys.push(d.y);
	        } else for (i = 0; i < n; ++i) {
	          var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
	          if (x_ < x1_) x1_ = x_;
	          if (y_ < y1_) y1_ = y_;
	          if (x_ > x2_) x2_ = x_;
	          if (y_ > y2_) y2_ = y_;
	          xs.push(x_);
	          ys.push(y_);
	        }
	      }
	      var dx = x2_ - x1_, dy = y2_ - y1_;
	      if (dx > dy) y2_ = y1_ + dx; else x2_ = x1_ + dy;
	      function insert(n, d, x, y, x1, y1, x2, y2) {
	        if (isNaN(x) || isNaN(y)) return;
	        if (n.leaf) {
	          var nx = n.x, ny = n.y;
	          if (nx != null) {
	            if (abs(nx - x) + abs(ny - y) < .01) {
	              insertChild(n, d, x, y, x1, y1, x2, y2);
	            } else {
	              var nPoint = n.point;
	              n.x = n.y = n.point = null;
	              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
	              insertChild(n, d, x, y, x1, y1, x2, y2);
	            }
	          } else {
	            n.x = x, n.y = y, n.point = d;
	          }
	        } else {
	          insertChild(n, d, x, y, x1, y1, x2, y2);
	        }
	      }
	      function insertChild(n, d, x, y, x1, y1, x2, y2) {
	        var xm = (x1 + x2) * .5, ym = (y1 + y2) * .5, right = x >= xm, below = y >= ym, i = below << 1 | right;
	        n.leaf = false;
	        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
	        if (right) x1 = xm; else x2 = xm;
	        if (below) y1 = ym; else y2 = ym;
	        insert(n, d, x, y, x1, y1, x2, y2);
	      }
	      var root = d3_geom_quadtreeNode();
	      root.add = function(d) {
	        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
	      };
	      root.visit = function(f) {
	        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
	      };
	      root.find = function(point) {
	        return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
	      };
	      i = -1;
	      if (x1 == null) {
	        while (++i < n) {
	          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
	        }
	        --i;
	      } else data.forEach(root.add);
	      xs = ys = data = d = null;
	      return root;
	    }
	    quadtree.x = function(_) {
	      return arguments.length ? (x = _, quadtree) : x;
	    };
	    quadtree.y = function(_) {
	      return arguments.length ? (y = _, quadtree) : y;
	    };
	    quadtree.extent = function(_) {
	      if (!arguments.length) return x1 == null ? null : [ [ x1, y1 ], [ x2, y2 ] ];
	      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], 
	      y2 = +_[1][1];
	      return quadtree;
	    };
	    quadtree.size = function(_) {
	      if (!arguments.length) return x1 == null ? null : [ x2 - x1, y2 - y1 ];
	      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
	      return quadtree;
	    };
	    return quadtree;
	  };
	  function d3_geom_quadtreeCompatX(d) {
	    return d.x;
	  }
	  function d3_geom_quadtreeCompatY(d) {
	    return d.y;
	  }
	  function d3_geom_quadtreeNode() {
	    return {
	      leaf: true,
	      nodes: [],
	      point: null,
	      x: null,
	      y: null
	    };
	  }
	  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
	    if (!f(node, x1, y1, x2, y2)) {
	      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
	      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
	      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
	      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
	      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
	    }
	  }
	  function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
	    var minDistance2 = Infinity, closestPoint;
	    (function find(node, x1, y1, x2, y2) {
	      if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;
	      if (point = node.point) {
	        var point, dx = x - node.x, dy = y - node.y, distance2 = dx * dx + dy * dy;
	        if (distance2 < minDistance2) {
	          var distance = Math.sqrt(minDistance2 = distance2);
	          x0 = x - distance, y0 = y - distance;
	          x3 = x + distance, y3 = y + distance;
	          closestPoint = point;
	        }
	      }
	      var children = node.nodes, xm = (x1 + x2) * .5, ym = (y1 + y2) * .5, right = x >= xm, below = y >= ym;
	      for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
	        if (node = children[i & 3]) switch (i & 3) {
	         case 0:
	          find(node, x1, y1, xm, ym);
	          break;

	         case 1:
	          find(node, xm, y1, x2, ym);
	          break;

	         case 2:
	          find(node, x1, ym, xm, y2);
	          break;

	         case 3:
	          find(node, xm, ym, x2, y2);
	          break;
	        }
	      }
	    })(root, x0, y0, x3, y3);
	    return closestPoint;
	  }
	  d3.interpolateRgb = d3_interpolateRgb;
	  function d3_interpolateRgb(a, b) {
	    a = d3.rgb(a);
	    b = d3.rgb(b);
	    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
	    return function(t) {
	      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
	    };
	  }
	  d3.interpolateObject = d3_interpolateObject;
	  function d3_interpolateObject(a, b) {
	    var i = {}, c = {}, k;
	    for (k in a) {
	      if (k in b) {
	        i[k] = d3_interpolate(a[k], b[k]);
	      } else {
	        c[k] = a[k];
	      }
	    }
	    for (k in b) {
	      if (!(k in a)) {
	        c[k] = b[k];
	      }
	    }
	    return function(t) {
	      for (k in i) c[k] = i[k](t);
	      return c;
	    };
	  }
	  d3.interpolateNumber = d3_interpolateNumber;
	  function d3_interpolateNumber(a, b) {
	    a = +a, b = +b;
	    return function(t) {
	      return a * (1 - t) + b * t;
	    };
	  }
	  d3.interpolateString = d3_interpolateString;
	  function d3_interpolateString(a, b) {
	    var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
	    a = a + "", b = b + "";
	    while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
	      if ((bs = bm.index) > bi) {
	        bs = b.slice(bi, bs);
	        if (s[i]) s[i] += bs; else s[++i] = bs;
	      }
	      if ((am = am[0]) === (bm = bm[0])) {
	        if (s[i]) s[i] += bm; else s[++i] = bm;
	      } else {
	        s[++i] = null;
	        q.push({
	          i: i,
	          x: d3_interpolateNumber(am, bm)
	        });
	      }
	      bi = d3_interpolate_numberB.lastIndex;
	    }
	    if (bi < b.length) {
	      bs = b.slice(bi);
	      if (s[i]) s[i] += bs; else s[++i] = bs;
	    }
	    return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
	      return b(t) + "";
	    }) : function() {
	      return b;
	    } : (b = q.length, function(t) {
	      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    });
	  }
	  var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
	  d3.interpolate = d3_interpolate;
	  function d3_interpolate(a, b) {
	    var i = d3.interpolators.length, f;
	    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
	    return f;
	  }
	  d3.interpolators = [ function(a, b) {
	    var t = typeof b;
	    return (t === "string" ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
	  } ];
	  d3.interpolateArray = d3_interpolateArray;
	  function d3_interpolateArray(a, b) {
	    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
	    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
	    for (;i < na; ++i) c[i] = a[i];
	    for (;i < nb; ++i) c[i] = b[i];
	    return function(t) {
	      for (i = 0; i < n0; ++i) c[i] = x[i](t);
	      return c;
	    };
	  }
	  var d3_ease_default = function() {
	    return d3_identity;
	  };
	  var d3_ease = d3.map({
	    linear: d3_ease_default,
	    poly: d3_ease_poly,
	    quad: function() {
	      return d3_ease_quad;
	    },
	    cubic: function() {
	      return d3_ease_cubic;
	    },
	    sin: function() {
	      return d3_ease_sin;
	    },
	    exp: function() {
	      return d3_ease_exp;
	    },
	    circle: function() {
	      return d3_ease_circle;
	    },
	    elastic: d3_ease_elastic,
	    back: d3_ease_back,
	    bounce: function() {
	      return d3_ease_bounce;
	    }
	  });
	  var d3_ease_mode = d3.map({
	    "in": d3_identity,
	    out: d3_ease_reverse,
	    "in-out": d3_ease_reflect,
	    "out-in": function(f) {
	      return d3_ease_reflect(d3_ease_reverse(f));
	    }
	  });
	  d3.ease = function(name) {
	    var i = name.indexOf("-"), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : "in";
	    t = d3_ease.get(t) || d3_ease_default;
	    m = d3_ease_mode.get(m) || d3_identity;
	    return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
	  };
	  function d3_ease_clamp(f) {
	    return function(t) {
	      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
	    };
	  }
	  function d3_ease_reverse(f) {
	    return function(t) {
	      return 1 - f(1 - t);
	    };
	  }
	  function d3_ease_reflect(f) {
	    return function(t) {
	      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
	    };
	  }
	  function d3_ease_quad(t) {
	    return t * t;
	  }
	  function d3_ease_cubic(t) {
	    return t * t * t;
	  }
	  function d3_ease_cubicInOut(t) {
	    if (t <= 0) return 0;
	    if (t >= 1) return 1;
	    var t2 = t * t, t3 = t2 * t;
	    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
	  }
	  function d3_ease_poly(e) {
	    return function(t) {
	      return Math.pow(t, e);
	    };
	  }
	  function d3_ease_sin(t) {
	    return 1 - Math.cos(t * halfπ);
	  }
	  function d3_ease_exp(t) {
	    return Math.pow(2, 10 * (t - 1));
	  }
	  function d3_ease_circle(t) {
	    return 1 - Math.sqrt(1 - t * t);
	  }
	  function d3_ease_elastic(a, p) {
	    var s;
	    if (arguments.length < 2) p = .45;
	    if (arguments.length) s = p / τ * Math.asin(1 / a); else a = 1, s = p / 4;
	    return function(t) {
	      return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
	    };
	  }
	  function d3_ease_back(s) {
	    if (!s) s = 1.70158;
	    return function(t) {
	      return t * t * ((s + 1) * t - s);
	    };
	  }
	  function d3_ease_bounce(t) {
	    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
	  }
	  d3.interpolateHcl = d3_interpolateHcl;
	  function d3_interpolateHcl(a, b) {
	    a = d3.hcl(a);
	    b = d3.hcl(b);
	    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
	    if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
	    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
	    return function(t) {
	      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
	    };
	  }
	  d3.interpolateHsl = d3_interpolateHsl;
	  function d3_interpolateHsl(a, b) {
	    a = d3.hsl(a);
	    b = d3.hsl(b);
	    var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
	    if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
	    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
	    return function(t) {
	      return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
	    };
	  }
	  d3.interpolateLab = d3_interpolateLab;
	  function d3_interpolateLab(a, b) {
	    a = d3.lab(a);
	    b = d3.lab(b);
	    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
	    return function(t) {
	      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
	    };
	  }
	  d3.interpolateRound = d3_interpolateRound;
	  function d3_interpolateRound(a, b) {
	    b -= a;
	    return function(t) {
	      return Math.round(a + b * t);
	    };
	  }
	  d3.transform = function(string) {
	    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
	    return (d3.transform = function(string) {
	      if (string != null) {
	        g.setAttribute("transform", string);
	        var t = g.transform.baseVal.consolidate();
	      }
	      return new d3_transform(t ? t.matrix : d3_transformIdentity);
	    })(string);
	  };
	  function d3_transform(m) {
	    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
	    if (r0[0] * r1[1] < r1[0] * r0[1]) {
	      r0[0] *= -1;
	      r0[1] *= -1;
	      kx *= -1;
	      kz *= -1;
	    }
	    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
	    this.translate = [ m.e, m.f ];
	    this.scale = [ kx, ky ];
	    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
	  }
	  d3_transform.prototype.toString = function() {
	    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
	  };
	  function d3_transformDot(a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	  }
	  function d3_transformNormalize(a) {
	    var k = Math.sqrt(d3_transformDot(a, a));
	    if (k) {
	      a[0] /= k;
	      a[1] /= k;
	    }
	    return k;
	  }
	  function d3_transformCombine(a, b, k) {
	    a[0] += k * b[0];
	    a[1] += k * b[1];
	    return a;
	  }
	  var d3_transformIdentity = {
	    a: 1,
	    b: 0,
	    c: 0,
	    d: 1,
	    e: 0,
	    f: 0
	  };
	  d3.interpolateTransform = d3_interpolateTransform;
	  function d3_interpolateTransformPop(s) {
	    return s.length ? s.pop() + "," : "";
	  }
	  function d3_interpolateTranslate(ta, tb, s, q) {
	    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
	      var i = s.push("translate(", null, ",", null, ")");
	      q.push({
	        i: i - 4,
	        x: d3_interpolateNumber(ta[0], tb[0])
	      }, {
	        i: i - 2,
	        x: d3_interpolateNumber(ta[1], tb[1])
	      });
	    } else if (tb[0] || tb[1]) {
	      s.push("translate(" + tb + ")");
	    }
	  }
	  function d3_interpolateRotate(ra, rb, s, q) {
	    if (ra !== rb) {
	      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
	      q.push({
	        i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
	        x: d3_interpolateNumber(ra, rb)
	      });
	    } else if (rb) {
	      s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
	    }
	  }
	  function d3_interpolateSkew(wa, wb, s, q) {
	    if (wa !== wb) {
	      q.push({
	        i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
	        x: d3_interpolateNumber(wa, wb)
	      });
	    } else if (wb) {
	      s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
	    }
	  }
	  function d3_interpolateScale(ka, kb, s, q) {
	    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
	      var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
	      q.push({
	        i: i - 4,
	        x: d3_interpolateNumber(ka[0], kb[0])
	      }, {
	        i: i - 2,
	        x: d3_interpolateNumber(ka[1], kb[1])
	      });
	    } else if (kb[0] !== 1 || kb[1] !== 1) {
	      s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
	    }
	  }
	  function d3_interpolateTransform(a, b) {
	    var s = [], q = [];
	    a = d3.transform(a), b = d3.transform(b);
	    d3_interpolateTranslate(a.translate, b.translate, s, q);
	    d3_interpolateRotate(a.rotate, b.rotate, s, q);
	    d3_interpolateSkew(a.skew, b.skew, s, q);
	    d3_interpolateScale(a.scale, b.scale, s, q);
	    a = b = null;
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  }
	  function d3_uninterpolateNumber(a, b) {
	    b = (b -= a = +a) || 1 / b;
	    return function(x) {
	      return (x - a) / b;
	    };
	  }
	  function d3_uninterpolateClamp(a, b) {
	    b = (b -= a = +a) || 1 / b;
	    return function(x) {
	      return Math.max(0, Math.min(1, (x - a) / b));
	    };
	  }
	  d3.layout = {};
	  d3.layout.bundle = function() {
	    return function(links) {
	      var paths = [], i = -1, n = links.length;
	      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
	      return paths;
	    };
	  };
	  function d3_layout_bundlePath(link) {
	    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
	    while (start !== lca) {
	      start = start.parent;
	      points.push(start);
	    }
	    var k = points.length;
	    while (end !== lca) {
	      points.splice(k, 0, end);
	      end = end.parent;
	    }
	    return points;
	  }
	  function d3_layout_bundleAncestors(node) {
	    var ancestors = [], parent = node.parent;
	    while (parent != null) {
	      ancestors.push(node);
	      node = parent;
	      parent = parent.parent;
	    }
	    ancestors.push(node);
	    return ancestors;
	  }
	  function d3_layout_bundleLeastCommonAncestor(a, b) {
	    if (a === b) return a;
	    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
	    while (aNode === bNode) {
	      sharedNode = aNode;
	      aNode = aNodes.pop();
	      bNode = bNodes.pop();
	    }
	    return sharedNode;
	  }
	  d3.layout.chord = function() {
	    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
	    function relayout() {
	      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
	      chords = [];
	      groups = [];
	      k = 0, i = -1;
	      while (++i < n) {
	        x = 0, j = -1;
	        while (++j < n) {
	          x += matrix[i][j];
	        }
	        groupSums.push(x);
	        subgroupIndex.push(d3.range(n));
	        k += x;
	      }
	      if (sortGroups) {
	        groupIndex.sort(function(a, b) {
	          return sortGroups(groupSums[a], groupSums[b]);
	        });
	      }
	      if (sortSubgroups) {
	        subgroupIndex.forEach(function(d, i) {
	          d.sort(function(a, b) {
	            return sortSubgroups(matrix[i][a], matrix[i][b]);
	          });
	        });
	      }
	      k = (τ - padding * n) / k;
	      x = 0, i = -1;
	      while (++i < n) {
	        x0 = x, j = -1;
	        while (++j < n) {
	          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
	          subgroups[di + "-" + dj] = {
	            index: di,
	            subindex: dj,
	            startAngle: a0,
	            endAngle: a1,
	            value: v
	          };
	        }
	        groups[di] = {
	          index: di,
	          startAngle: x0,
	          endAngle: x,
	          value: groupSums[di]
	        };
	        x += padding;
	      }
	      i = -1;
	      while (++i < n) {
	        j = i - 1;
	        while (++j < n) {
	          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
	          if (source.value || target.value) {
	            chords.push(source.value < target.value ? {
	              source: target,
	              target: source
	            } : {
	              source: source,
	              target: target
	            });
	          }
	        }
	      }
	      if (sortChords) resort();
	    }
	    function resort() {
	      chords.sort(function(a, b) {
	        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
	      });
	    }
	    chord.matrix = function(x) {
	      if (!arguments.length) return matrix;
	      n = (matrix = x) && matrix.length;
	      chords = groups = null;
	      return chord;
	    };
	    chord.padding = function(x) {
	      if (!arguments.length) return padding;
	      padding = x;
	      chords = groups = null;
	      return chord;
	    };
	    chord.sortGroups = function(x) {
	      if (!arguments.length) return sortGroups;
	      sortGroups = x;
	      chords = groups = null;
	      return chord;
	    };
	    chord.sortSubgroups = function(x) {
	      if (!arguments.length) return sortSubgroups;
	      sortSubgroups = x;
	      chords = null;
	      return chord;
	    };
	    chord.sortChords = function(x) {
	      if (!arguments.length) return sortChords;
	      sortChords = x;
	      if (chords) resort();
	      return chord;
	    };
	    chord.chords = function() {
	      if (!chords) relayout();
	      return chords;
	    };
	    chord.groups = function() {
	      if (!groups) relayout();
	      return groups;
	    };
	    return chord;
	  };
	  d3.layout.force = function() {
	    var force = {}, event = d3.dispatch("start", "tick", "end"), timer, size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = .1, theta2 = .64, nodes = [], links = [], distances, strengths, charges;
	    function repulse(node) {
	      return function(quad, x1, _, x2) {
	        if (quad.point !== node) {
	          var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
	          if (dw * dw / theta2 < dn) {
	            if (dn < chargeDistance2) {
	              var k = quad.charge / dn;
	              node.px -= dx * k;
	              node.py -= dy * k;
	            }
	            return true;
	          }
	          if (quad.point && dn && dn < chargeDistance2) {
	            var k = quad.pointCharge / dn;
	            node.px -= dx * k;
	            node.py -= dy * k;
	          }
	        }
	        return !quad.charge;
	      };
	    }
	    force.tick = function() {
	      if ((alpha *= .99) < .005) {
	        timer = null;
	        event.end({
	          type: "end",
	          alpha: alpha = 0
	        });
	        return true;
	      }
	      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
	      for (i = 0; i < m; ++i) {
	        o = links[i];
	        s = o.source;
	        t = o.target;
	        x = t.x - s.x;
	        y = t.y - s.y;
	        if (l = x * x + y * y) {
	          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
	          x *= l;
	          y *= l;
	          t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : .5);
	          t.y -= y * k;
	          s.x += x * (k = 1 - k);
	          s.y += y * k;
	        }
	      }
	      if (k = alpha * gravity) {
	        x = size[0] / 2;
	        y = size[1] / 2;
	        i = -1;
	        if (k) while (++i < n) {
	          o = nodes[i];
	          o.x += (x - o.x) * k;
	          o.y += (y - o.y) * k;
	        }
	      }
	      if (charge) {
	        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
	        i = -1;
	        while (++i < n) {
	          if (!(o = nodes[i]).fixed) {
	            q.visit(repulse(o));
	          }
	        }
	      }
	      i = -1;
	      while (++i < n) {
	        o = nodes[i];
	        if (o.fixed) {
	          o.x = o.px;
	          o.y = o.py;
	        } else {
	          o.x -= (o.px - (o.px = o.x)) * friction;
	          o.y -= (o.py - (o.py = o.y)) * friction;
	        }
	      }
	      event.tick({
	        type: "tick",
	        alpha: alpha
	      });
	    };
	    force.nodes = function(x) {
	      if (!arguments.length) return nodes;
	      nodes = x;
	      return force;
	    };
	    force.links = function(x) {
	      if (!arguments.length) return links;
	      links = x;
	      return force;
	    };
	    force.size = function(x) {
	      if (!arguments.length) return size;
	      size = x;
	      return force;
	    };
	    force.linkDistance = function(x) {
	      if (!arguments.length) return linkDistance;
	      linkDistance = typeof x === "function" ? x : +x;
	      return force;
	    };
	    force.distance = force.linkDistance;
	    force.linkStrength = function(x) {
	      if (!arguments.length) return linkStrength;
	      linkStrength = typeof x === "function" ? x : +x;
	      return force;
	    };
	    force.friction = function(x) {
	      if (!arguments.length) return friction;
	      friction = +x;
	      return force;
	    };
	    force.charge = function(x) {
	      if (!arguments.length) return charge;
	      charge = typeof x === "function" ? x : +x;
	      return force;
	    };
	    force.chargeDistance = function(x) {
	      if (!arguments.length) return Math.sqrt(chargeDistance2);
	      chargeDistance2 = x * x;
	      return force;
	    };
	    force.gravity = function(x) {
	      if (!arguments.length) return gravity;
	      gravity = +x;
	      return force;
	    };
	    force.theta = function(x) {
	      if (!arguments.length) return Math.sqrt(theta2);
	      theta2 = x * x;
	      return force;
	    };
	    force.alpha = function(x) {
	      if (!arguments.length) return alpha;
	      x = +x;
	      if (alpha) {
	        if (x > 0) {
	          alpha = x;
	        } else {
	          timer.c = null, timer.t = NaN, timer = null;
	          event.end({
	            type: "end",
	            alpha: alpha = 0
	          });
	        }
	      } else if (x > 0) {
	        event.start({
	          type: "start",
	          alpha: alpha = x
	        });
	        timer = d3_timer(force.tick);
	      }
	      return force;
	    };
	    force.start = function() {
	      var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
	      for (i = 0; i < n; ++i) {
	        (o = nodes[i]).index = i;
	        o.weight = 0;
	      }
	      for (i = 0; i < m; ++i) {
	        o = links[i];
	        if (typeof o.source == "number") o.source = nodes[o.source];
	        if (typeof o.target == "number") o.target = nodes[o.target];
	        ++o.source.weight;
	        ++o.target.weight;
	      }
	      for (i = 0; i < n; ++i) {
	        o = nodes[i];
	        if (isNaN(o.x)) o.x = position("x", w);
	        if (isNaN(o.y)) o.y = position("y", h);
	        if (isNaN(o.px)) o.px = o.x;
	        if (isNaN(o.py)) o.py = o.y;
	      }
	      distances = [];
	      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
	      strengths = [];
	      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
	      charges = [];
	      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
	      function position(dimension, size) {
	        if (!neighbors) {
	          neighbors = new Array(n);
	          for (j = 0; j < n; ++j) {
	            neighbors[j] = [];
	          }
	          for (j = 0; j < m; ++j) {
	            var o = links[j];
	            neighbors[o.source.index].push(o.target);
	            neighbors[o.target.index].push(o.source);
	          }
	        }
	        var candidates = neighbors[i], j = -1, l = candidates.length, x;
	        while (++j < l) if (!isNaN(x = candidates[j][dimension])) return x;
	        return Math.random() * size;
	      }
	      return force.resume();
	    };
	    force.resume = function() {
	      return force.alpha(.1);
	    };
	    force.stop = function() {
	      return force.alpha(0);
	    };
	    force.drag = function() {
	      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
	      if (!arguments.length) return drag;
	      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
	    };
	    function dragmove(d) {
	      d.px = d3.event.x, d.py = d3.event.y;
	      force.resume();
	    }
	    return d3.rebind(force, event, "on");
	  };
	  function d3_layout_forceDragstart(d) {
	    d.fixed |= 2;
	  }
	  function d3_layout_forceDragend(d) {
	    d.fixed &= ~6;
	  }
	  function d3_layout_forceMouseover(d) {
	    d.fixed |= 4;
	    d.px = d.x, d.py = d.y;
	  }
	  function d3_layout_forceMouseout(d) {
	    d.fixed &= ~4;
	  }
	  function d3_layout_forceAccumulate(quad, alpha, charges) {
	    var cx = 0, cy = 0;
	    quad.charge = 0;
	    if (!quad.leaf) {
	      var nodes = quad.nodes, n = nodes.length, i = -1, c;
	      while (++i < n) {
	        c = nodes[i];
	        if (c == null) continue;
	        d3_layout_forceAccumulate(c, alpha, charges);
	        quad.charge += c.charge;
	        cx += c.charge * c.cx;
	        cy += c.charge * c.cy;
	      }
	    }
	    if (quad.point) {
	      if (!quad.leaf) {
	        quad.point.x += Math.random() - .5;
	        quad.point.y += Math.random() - .5;
	      }
	      var k = alpha * charges[quad.point.index];
	      quad.charge += quad.pointCharge = k;
	      cx += k * quad.point.x;
	      cy += k * quad.point.y;
	    }
	    quad.cx = cx / quad.charge;
	    quad.cy = cy / quad.charge;
	  }
	  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistance2 = Infinity;
	  d3.layout.hierarchy = function() {
	    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
	    function hierarchy(root) {
	      var stack = [ root ], nodes = [], node;
	      root.depth = 0;
	      while ((node = stack.pop()) != null) {
	        nodes.push(node);
	        if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
	          var n, childs, child;
	          while (--n >= 0) {
	            stack.push(child = childs[n]);
	            child.parent = node;
	            child.depth = node.depth + 1;
	          }
	          if (value) node.value = 0;
	          node.children = childs;
	        } else {
	          if (value) node.value = +value.call(hierarchy, node, node.depth) || 0;
	          delete node.children;
	        }
	      }
	      d3_layout_hierarchyVisitAfter(root, function(node) {
	        var childs, parent;
	        if (sort && (childs = node.children)) childs.sort(sort);
	        if (value && (parent = node.parent)) parent.value += node.value;
	      });
	      return nodes;
	    }
	    hierarchy.sort = function(x) {
	      if (!arguments.length) return sort;
	      sort = x;
	      return hierarchy;
	    };
	    hierarchy.children = function(x) {
	      if (!arguments.length) return children;
	      children = x;
	      return hierarchy;
	    };
	    hierarchy.value = function(x) {
	      if (!arguments.length) return value;
	      value = x;
	      return hierarchy;
	    };
	    hierarchy.revalue = function(root) {
	      if (value) {
	        d3_layout_hierarchyVisitBefore(root, function(node) {
	          if (node.children) node.value = 0;
	        });
	        d3_layout_hierarchyVisitAfter(root, function(node) {
	          var parent;
	          if (!node.children) node.value = +value.call(hierarchy, node, node.depth) || 0;
	          if (parent = node.parent) parent.value += node.value;
	        });
	      }
	      return root;
	    };
	    return hierarchy;
	  };
	  function d3_layout_hierarchyRebind(object, hierarchy) {
	    d3.rebind(object, hierarchy, "sort", "children", "value");
	    object.nodes = object;
	    object.links = d3_layout_hierarchyLinks;
	    return object;
	  }
	  function d3_layout_hierarchyVisitBefore(node, callback) {
	    var nodes = [ node ];
	    while ((node = nodes.pop()) != null) {
	      callback(node);
	      if ((children = node.children) && (n = children.length)) {
	        var n, children;
	        while (--n >= 0) nodes.push(children[n]);
	      }
	    }
	  }
	  function d3_layout_hierarchyVisitAfter(node, callback) {
	    var nodes = [ node ], nodes2 = [];
	    while ((node = nodes.pop()) != null) {
	      nodes2.push(node);
	      if ((children = node.children) && (n = children.length)) {
	        var i = -1, n, children;
	        while (++i < n) nodes.push(children[i]);
	      }
	    }
	    while ((node = nodes2.pop()) != null) {
	      callback(node);
	    }
	  }
	  function d3_layout_hierarchyChildren(d) {
	    return d.children;
	  }
	  function d3_layout_hierarchyValue(d) {
	    return d.value;
	  }
	  function d3_layout_hierarchySort(a, b) {
	    return b.value - a.value;
	  }
	  function d3_layout_hierarchyLinks(nodes) {
	    return d3.merge(nodes.map(function(parent) {
	      return (parent.children || []).map(function(child) {
	        return {
	          source: parent,
	          target: child
	        };
	      });
	    }));
	  }
	  d3.layout.partition = function() {
	    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
	    function position(node, x, dx, dy) {
	      var children = node.children;
	      node.x = x;
	      node.y = node.depth * dy;
	      node.dx = dx;
	      node.dy = dy;
	      if (children && (n = children.length)) {
	        var i = -1, n, c, d;
	        dx = node.value ? dx / node.value : 0;
	        while (++i < n) {
	          position(c = children[i], x, d = c.value * dx, dy);
	          x += d;
	        }
	      }
	    }
	    function depth(node) {
	      var children = node.children, d = 0;
	      if (children && (n = children.length)) {
	        var i = -1, n;
	        while (++i < n) d = Math.max(d, depth(children[i]));
	      }
	      return 1 + d;
	    }
	    function partition(d, i) {
	      var nodes = hierarchy.call(this, d, i);
	      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
	      return nodes;
	    }
	    partition.size = function(x) {
	      if (!arguments.length) return size;
	      size = x;
	      return partition;
	    };
	    return d3_layout_hierarchyRebind(partition, hierarchy);
	  };
	  d3.layout.pie = function() {
	    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = τ, padAngle = 0;
	    function pie(data) {
	      var n = data.length, values = data.map(function(d, i) {
	        return +value.call(pie, d, i);
	      }), a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle), da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a, p = Math.min(Math.abs(da) / n, +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle)), pa = p * (da < 0 ? -1 : 1), sum = d3.sum(values), k = sum ? (da - n * pa) / sum : 0, index = d3.range(n), arcs = [], v;
	      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
	        return values[j] - values[i];
	      } : function(i, j) {
	        return sort(data[i], data[j]);
	      });
	      index.forEach(function(i) {
	        arcs[i] = {
	          data: data[i],
	          value: v = values[i],
	          startAngle: a,
	          endAngle: a += v * k + pa,
	          padAngle: p
	        };
	      });
	      return arcs;
	    }
	    pie.value = function(_) {
	      if (!arguments.length) return value;
	      value = _;
	      return pie;
	    };
	    pie.sort = function(_) {
	      if (!arguments.length) return sort;
	      sort = _;
	      return pie;
	    };
	    pie.startAngle = function(_) {
	      if (!arguments.length) return startAngle;
	      startAngle = _;
	      return pie;
	    };
	    pie.endAngle = function(_) {
	      if (!arguments.length) return endAngle;
	      endAngle = _;
	      return pie;
	    };
	    pie.padAngle = function(_) {
	      if (!arguments.length) return padAngle;
	      padAngle = _;
	      return pie;
	    };
	    return pie;
	  };
	  var d3_layout_pieSortByValue = {};
	  d3.layout.stack = function() {
	    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
	    function stack(data, index) {
	      if (!(n = data.length)) return data;
	      var series = data.map(function(d, i) {
	        return values.call(stack, d, i);
	      });
	      var points = series.map(function(d) {
	        return d.map(function(v, i) {
	          return [ x.call(stack, v, i), y.call(stack, v, i) ];
	        });
	      });
	      var orders = order.call(stack, points, index);
	      series = d3.permute(series, orders);
	      points = d3.permute(points, orders);
	      var offsets = offset.call(stack, points, index);
	      var m = series[0].length, n, i, j, o;
	      for (j = 0; j < m; ++j) {
	        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
	        for (i = 1; i < n; ++i) {
	          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
	        }
	      }
	      return data;
	    }
	    stack.values = function(x) {
	      if (!arguments.length) return values;
	      values = x;
	      return stack;
	    };
	    stack.order = function(x) {
	      if (!arguments.length) return order;
	      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
	      return stack;
	    };
	    stack.offset = function(x) {
	      if (!arguments.length) return offset;
	      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
	      return stack;
	    };
	    stack.x = function(z) {
	      if (!arguments.length) return x;
	      x = z;
	      return stack;
	    };
	    stack.y = function(z) {
	      if (!arguments.length) return y;
	      y = z;
	      return stack;
	    };
	    stack.out = function(z) {
	      if (!arguments.length) return out;
	      out = z;
	      return stack;
	    };
	    return stack;
	  };
	  function d3_layout_stackX(d) {
	    return d.x;
	  }
	  function d3_layout_stackY(d) {
	    return d.y;
	  }
	  function d3_layout_stackOut(d, y0, y) {
	    d.y0 = y0;
	    d.y = y;
	  }
	  var d3_layout_stackOrders = d3.map({
	    "inside-out": function(data) {
	      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
	        return max[a] - max[b];
	      }), top = 0, bottom = 0, tops = [], bottoms = [];
	      for (i = 0; i < n; ++i) {
	        j = index[i];
	        if (top < bottom) {
	          top += sums[j];
	          tops.push(j);
	        } else {
	          bottom += sums[j];
	          bottoms.push(j);
	        }
	      }
	      return bottoms.reverse().concat(tops);
	    },
	    reverse: function(data) {
	      return d3.range(data.length).reverse();
	    },
	    "default": d3_layout_stackOrderDefault
	  });
	  var d3_layout_stackOffsets = d3.map({
	    silhouette: function(data) {
	      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
	      for (j = 0; j < m; ++j) {
	        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
	        if (o > max) max = o;
	        sums.push(o);
	      }
	      for (j = 0; j < m; ++j) {
	        y0[j] = (max - sums[j]) / 2;
	      }
	      return y0;
	    },
	    wiggle: function(data) {
	      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
	      y0[0] = o = o0 = 0;
	      for (j = 1; j < m; ++j) {
	        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
	        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
	          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
	            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
	          }
	          s2 += s3 * data[i][j][1];
	        }
	        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
	        if (o < o0) o0 = o;
	      }
	      for (j = 0; j < m; ++j) y0[j] -= o0;
	      return y0;
	    },
	    expand: function(data) {
	      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
	      for (j = 0; j < m; ++j) {
	        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
	        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
	      }
	      for (j = 0; j < m; ++j) y0[j] = 0;
	      return y0;
	    },
	    zero: d3_layout_stackOffsetZero
	  });
	  function d3_layout_stackOrderDefault(data) {
	    return d3.range(data.length);
	  }
	  function d3_layout_stackOffsetZero(data) {
	    var j = -1, m = data[0].length, y0 = [];
	    while (++j < m) y0[j] = 0;
	    return y0;
	  }
	  function d3_layout_stackMaxIndex(array) {
	    var i = 1, j = 0, v = array[0][1], k, n = array.length;
	    for (;i < n; ++i) {
	      if ((k = array[i][1]) > v) {
	        j = i;
	        v = k;
	      }
	    }
	    return j;
	  }
	  function d3_layout_stackReduceSum(d) {
	    return d.reduce(d3_layout_stackSum, 0);
	  }
	  function d3_layout_stackSum(p, d) {
	    return p + d[1];
	  }
	  d3.layout.histogram = function() {
	    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
	    function histogram(data, i) {
	      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
	      while (++i < m) {
	        bin = bins[i] = [];
	        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
	        bin.y = 0;
	      }
	      if (m > 0) {
	        i = -1;
	        while (++i < n) {
	          x = values[i];
	          if (x >= range[0] && x <= range[1]) {
	            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
	            bin.y += k;
	            bin.push(data[i]);
	          }
	        }
	      }
	      return bins;
	    }
	    histogram.value = function(x) {
	      if (!arguments.length) return valuer;
	      valuer = x;
	      return histogram;
	    };
	    histogram.range = function(x) {
	      if (!arguments.length) return ranger;
	      ranger = d3_functor(x);
	      return histogram;
	    };
	    histogram.bins = function(x) {
	      if (!arguments.length) return binner;
	      binner = typeof x === "number" ? function(range) {
	        return d3_layout_histogramBinFixed(range, x);
	      } : d3_functor(x);
	      return histogram;
	    };
	    histogram.frequency = function(x) {
	      if (!arguments.length) return frequency;
	      frequency = !!x;
	      return histogram;
	    };
	    return histogram;
	  };
	  function d3_layout_histogramBinSturges(range, values) {
	    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
	  }
	  function d3_layout_histogramBinFixed(range, n) {
	    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
	    while (++x <= n) f[x] = m * x + b;
	    return f;
	  }
	  function d3_layout_histogramRange(values) {
	    return [ d3.min(values), d3.max(values) ];
	  }
	  d3.layout.pack = function() {
	    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ], radius;
	    function pack(d, i) {
	      var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
	        return radius;
	      };
	      root.x = root.y = 0;
	      d3_layout_hierarchyVisitAfter(root, function(d) {
	        d.r = +r(d.value);
	      });
	      d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
	      if (padding) {
	        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
	        d3_layout_hierarchyVisitAfter(root, function(d) {
	          d.r += dr;
	        });
	        d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
	        d3_layout_hierarchyVisitAfter(root, function(d) {
	          d.r -= dr;
	        });
	      }
	      d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
	      return nodes;
	    }
	    pack.size = function(_) {
	      if (!arguments.length) return size;
	      size = _;
	      return pack;
	    };
	    pack.radius = function(_) {
	      if (!arguments.length) return radius;
	      radius = _ == null || typeof _ === "function" ? _ : +_;
	      return pack;
	    };
	    pack.padding = function(_) {
	      if (!arguments.length) return padding;
	      padding = +_;
	      return pack;
	    };
	    return d3_layout_hierarchyRebind(pack, hierarchy);
	  };
	  function d3_layout_packSort(a, b) {
	    return a.value - b.value;
	  }
	  function d3_layout_packInsert(a, b) {
	    var c = a._pack_next;
	    a._pack_next = b;
	    b._pack_prev = a;
	    b._pack_next = c;
	    c._pack_prev = b;
	  }
	  function d3_layout_packSplice(a, b) {
	    a._pack_next = b;
	    b._pack_prev = a;
	  }
	  function d3_layout_packIntersects(a, b) {
	    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
	    return .999 * dr * dr > dx * dx + dy * dy;
	  }
	  function d3_layout_packSiblings(node) {
	    if (!(nodes = node.children) || !(n = nodes.length)) return;
	    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
	    function bound(node) {
	      xMin = Math.min(node.x - node.r, xMin);
	      xMax = Math.max(node.x + node.r, xMax);
	      yMin = Math.min(node.y - node.r, yMin);
	      yMax = Math.max(node.y + node.r, yMax);
	    }
	    nodes.forEach(d3_layout_packLink);
	    a = nodes[0];
	    a.x = -a.r;
	    a.y = 0;
	    bound(a);
	    if (n > 1) {
	      b = nodes[1];
	      b.x = b.r;
	      b.y = 0;
	      bound(b);
	      if (n > 2) {
	        c = nodes[2];
	        d3_layout_packPlace(a, b, c);
	        bound(c);
	        d3_layout_packInsert(a, c);
	        a._pack_prev = c;
	        d3_layout_packInsert(c, b);
	        b = a._pack_next;
	        for (i = 3; i < n; i++) {
	          d3_layout_packPlace(a, b, c = nodes[i]);
	          var isect = 0, s1 = 1, s2 = 1;
	          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
	            if (d3_layout_packIntersects(j, c)) {
	              isect = 1;
	              break;
	            }
	          }
	          if (isect == 1) {
	            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
	              if (d3_layout_packIntersects(k, c)) {
	                break;
	              }
	            }
	          }
	          if (isect) {
	            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
	            i--;
	          } else {
	            d3_layout_packInsert(a, c);
	            b = c;
	            bound(c);
	          }
	        }
	      }
	    }
	    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
	    for (i = 0; i < n; i++) {
	      c = nodes[i];
	      c.x -= cx;
	      c.y -= cy;
	      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
	    }
	    node.r = cr;
	    nodes.forEach(d3_layout_packUnlink);
	  }
	  function d3_layout_packLink(node) {
	    node._pack_next = node._pack_prev = node;
	  }
	  function d3_layout_packUnlink(node) {
	    delete node._pack_next;
	    delete node._pack_prev;
	  }
	  function d3_layout_packTransform(node, x, y, k) {
	    var children = node.children;
	    node.x = x += k * node.x;
	    node.y = y += k * node.y;
	    node.r *= k;
	    if (children) {
	      var i = -1, n = children.length;
	      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
	    }
	  }
	  function d3_layout_packPlace(a, b, c) {
	    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
	    if (db && (dx || dy)) {
	      var da = b.r + c.r, dc = dx * dx + dy * dy;
	      da *= da;
	      db *= db;
	      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
	      c.x = a.x + x * dx + y * dy;
	      c.y = a.y + x * dy - y * dx;
	    } else {
	      c.x = a.x + db;
	      c.y = a.y;
	    }
	  }
	  d3.layout.tree = function() {
	    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = null;
	    function tree(d, i) {
	      var nodes = hierarchy.call(this, d, i), root0 = nodes[0], root1 = wrapTree(root0);
	      d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
	      d3_layout_hierarchyVisitBefore(root1, secondWalk);
	      if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode); else {
	        var left = root0, right = root0, bottom = root0;
	        d3_layout_hierarchyVisitBefore(root0, function(node) {
	          if (node.x < left.x) left = node;
	          if (node.x > right.x) right = node;
	          if (node.depth > bottom.depth) bottom = node;
	        });
	        var tx = separation(left, right) / 2 - left.x, kx = size[0] / (right.x + separation(right, left) / 2 + tx), ky = size[1] / (bottom.depth || 1);
	        d3_layout_hierarchyVisitBefore(root0, function(node) {
	          node.x = (node.x + tx) * kx;
	          node.y = node.depth * ky;
	        });
	      }
	      return nodes;
	    }
	    function wrapTree(root0) {
	      var root1 = {
	        A: null,
	        children: [ root0 ]
	      }, queue = [ root1 ], node1;
	      while ((node1 = queue.pop()) != null) {
	        for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
	          queue.push((children[i] = child = {
	            _: children[i],
	            parent: node1,
	            children: (child = children[i].children) && child.slice() || [],
	            A: null,
	            a: null,
	            z: 0,
	            m: 0,
	            c: 0,
	            s: 0,
	            t: null,
	            i: i
	          }).a = child);
	        }
	      }
	      return root1.children[0];
	    }
	    function firstWalk(v) {
	      var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
	      if (children.length) {
	        d3_layout_treeShift(v);
	        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
	        if (w) {
	          v.z = w.z + separation(v._, w._);
	          v.m = v.z - midpoint;
	        } else {
	          v.z = midpoint;
	        }
	      } else if (w) {
	        v.z = w.z + separation(v._, w._);
	      }
	      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
	    }
	    function secondWalk(v) {
	      v._.x = v.z + v.parent.m;
	      v.m += v.parent.m;
	    }
	    function apportion(v, w, ancestor) {
	      if (w) {
	        var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
	        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
	          vom = d3_layout_treeLeft(vom);
	          vop = d3_layout_treeRight(vop);
	          vop.a = v;
	          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
	          if (shift > 0) {
	            d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
	            sip += shift;
	            sop += shift;
	          }
	          sim += vim.m;
	          sip += vip.m;
	          som += vom.m;
	          sop += vop.m;
	        }
	        if (vim && !d3_layout_treeRight(vop)) {
	          vop.t = vim;
	          vop.m += sim - sop;
	        }
	        if (vip && !d3_layout_treeLeft(vom)) {
	          vom.t = vip;
	          vom.m += sip - som;
	          ancestor = v;
	        }
	      }
	      return ancestor;
	    }
	    function sizeNode(node) {
	      node.x *= size[0];
	      node.y = node.depth * size[1];
	    }
	    tree.separation = function(x) {
	      if (!arguments.length) return separation;
	      separation = x;
	      return tree;
	    };
	    tree.size = function(x) {
	      if (!arguments.length) return nodeSize ? null : size;
	      nodeSize = (size = x) == null ? sizeNode : null;
	      return tree;
	    };
	    tree.nodeSize = function(x) {
	      if (!arguments.length) return nodeSize ? size : null;
	      nodeSize = (size = x) == null ? null : sizeNode;
	      return tree;
	    };
	    return d3_layout_hierarchyRebind(tree, hierarchy);
	  };
	  function d3_layout_treeSeparation(a, b) {
	    return a.parent == b.parent ? 1 : 2;
	  }
	  function d3_layout_treeLeft(v) {
	    var children = v.children;
	    return children.length ? children[0] : v.t;
	  }
	  function d3_layout_treeRight(v) {
	    var children = v.children, n;
	    return (n = children.length) ? children[n - 1] : v.t;
	  }
	  function d3_layout_treeMove(wm, wp, shift) {
	    var change = shift / (wp.i - wm.i);
	    wp.c -= change;
	    wp.s += shift;
	    wm.c += change;
	    wp.z += shift;
	    wp.m += shift;
	  }
	  function d3_layout_treeShift(v) {
	    var shift = 0, change = 0, children = v.children, i = children.length, w;
	    while (--i >= 0) {
	      w = children[i];
	      w.z += shift;
	      w.m += shift;
	      shift += w.s + (change += w.c);
	    }
	  }
	  function d3_layout_treeAncestor(vim, v, ancestor) {
	    return vim.a.parent === v.parent ? vim.a : ancestor;
	  }
	  d3.layout.cluster = function() {
	    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
	    function cluster(d, i) {
	      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
	      d3_layout_hierarchyVisitAfter(root, function(node) {
	        var children = node.children;
	        if (children && children.length) {
	          node.x = d3_layout_clusterX(children);
	          node.y = d3_layout_clusterY(children);
	        } else {
	          node.x = previousNode ? x += separation(node, previousNode) : 0;
	          node.y = 0;
	          previousNode = node;
	        }
	      });
	      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
	      d3_layout_hierarchyVisitAfter(root, nodeSize ? function(node) {
	        node.x = (node.x - root.x) * size[0];
	        node.y = (root.y - node.y) * size[1];
	      } : function(node) {
	        node.x = (node.x - x0) / (x1 - x0) * size[0];
	        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
	      });
	      return nodes;
	    }
	    cluster.separation = function(x) {
	      if (!arguments.length) return separation;
	      separation = x;
	      return cluster;
	    };
	    cluster.size = function(x) {
	      if (!arguments.length) return nodeSize ? null : size;
	      nodeSize = (size = x) == null;
	      return cluster;
	    };
	    cluster.nodeSize = function(x) {
	      if (!arguments.length) return nodeSize ? size : null;
	      nodeSize = (size = x) != null;
	      return cluster;
	    };
	    return d3_layout_hierarchyRebind(cluster, hierarchy);
	  };
	  function d3_layout_clusterY(children) {
	    return 1 + d3.max(children, function(child) {
	      return child.y;
	    });
	  }
	  function d3_layout_clusterX(children) {
	    return children.reduce(function(x, child) {
	      return x + child.x;
	    }, 0) / children.length;
	  }
	  function d3_layout_clusterLeft(node) {
	    var children = node.children;
	    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
	  }
	  function d3_layout_clusterRight(node) {
	    var children = node.children, n;
	    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
	  }
	  d3.layout.treemap = function() {
	    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
	    function scale(children, k) {
	      var i = -1, n = children.length, child, area;
	      while (++i < n) {
	        area = (child = children[i]).value * (k < 0 ? 0 : k);
	        child.area = isNaN(area) || area <= 0 ? 0 : area;
	      }
	    }
	    function squarify(node) {
	      var children = node.children;
	      if (children && children.length) {
	        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
	        scale(remaining, rect.dx * rect.dy / node.value);
	        row.area = 0;
	        while ((n = remaining.length) > 0) {
	          row.push(child = remaining[n - 1]);
	          row.area += child.area;
	          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
	            remaining.pop();
	            best = score;
	          } else {
	            row.area -= row.pop().area;
	            position(row, u, rect, false);
	            u = Math.min(rect.dx, rect.dy);
	            row.length = row.area = 0;
	            best = Infinity;
	          }
	        }
	        if (row.length) {
	          position(row, u, rect, true);
	          row.length = row.area = 0;
	        }
	        children.forEach(squarify);
	      }
	    }
	    function stickify(node) {
	      var children = node.children;
	      if (children && children.length) {
	        var rect = pad(node), remaining = children.slice(), child, row = [];
	        scale(remaining, rect.dx * rect.dy / node.value);
	        row.area = 0;
	        while (child = remaining.pop()) {
	          row.push(child);
	          row.area += child.area;
	          if (child.z != null) {
	            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
	            row.length = row.area = 0;
	          }
	        }
	        children.forEach(stickify);
	      }
	    }
	    function worst(row, u) {
	      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
	      while (++i < n) {
	        if (!(r = row[i].area)) continue;
	        if (r < rmin) rmin = r;
	        if (r > rmax) rmax = r;
	      }
	      s *= s;
	      u *= u;
	      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
	    }
	    function position(row, u, rect, flush) {
	      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
	      if (u == rect.dx) {
	        if (flush || v > rect.dy) v = rect.dy;
	        while (++i < n) {
	          o = row[i];
	          o.x = x;
	          o.y = y;
	          o.dy = v;
	          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
	        }
	        o.z = true;
	        o.dx += rect.x + rect.dx - x;
	        rect.y += v;
	        rect.dy -= v;
	      } else {
	        if (flush || v > rect.dx) v = rect.dx;
	        while (++i < n) {
	          o = row[i];
	          o.x = x;
	          o.y = y;
	          o.dx = v;
	          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
	        }
	        o.z = false;
	        o.dy += rect.y + rect.dy - y;
	        rect.x += v;
	        rect.dx -= v;
	      }
	    }
	    function treemap(d) {
	      var nodes = stickies || hierarchy(d), root = nodes[0];
	      root.x = root.y = 0;
	      if (root.value) root.dx = size[0], root.dy = size[1]; else root.dx = root.dy = 0;
	      if (stickies) hierarchy.revalue(root);
	      scale([ root ], root.dx * root.dy / root.value);
	      (stickies ? stickify : squarify)(root);
	      if (sticky) stickies = nodes;
	      return nodes;
	    }
	    treemap.size = function(x) {
	      if (!arguments.length) return size;
	      size = x;
	      return treemap;
	    };
	    treemap.padding = function(x) {
	      if (!arguments.length) return padding;
	      function padFunction(node) {
	        var p = x.call(treemap, node, node.depth);
	        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
	      }
	      function padConstant(node) {
	        return d3_layout_treemapPad(node, x);
	      }
	      var type;
	      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
	      padConstant) : padConstant;
	      return treemap;
	    };
	    treemap.round = function(x) {
	      if (!arguments.length) return round != Number;
	      round = x ? Math.round : Number;
	      return treemap;
	    };
	    treemap.sticky = function(x) {
	      if (!arguments.length) return sticky;
	      sticky = x;
	      stickies = null;
	      return treemap;
	    };
	    treemap.ratio = function(x) {
	      if (!arguments.length) return ratio;
	      ratio = x;
	      return treemap;
	    };
	    treemap.mode = function(x) {
	      if (!arguments.length) return mode;
	      mode = x + "";
	      return treemap;
	    };
	    return d3_layout_hierarchyRebind(treemap, hierarchy);
	  };
	  function d3_layout_treemapPadNull(node) {
	    return {
	      x: node.x,
	      y: node.y,
	      dx: node.dx,
	      dy: node.dy
	    };
	  }
	  function d3_layout_treemapPad(node, padding) {
	    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
	    if (dx < 0) {
	      x += dx / 2;
	      dx = 0;
	    }
	    if (dy < 0) {
	      y += dy / 2;
	      dy = 0;
	    }
	    return {
	      x: x,
	      y: y,
	      dx: dx,
	      dy: dy
	    };
	  }
	  d3.random = {
	    normal: function(µ, σ) {
	      var n = arguments.length;
	      if (n < 2) σ = 1;
	      if (n < 1) µ = 0;
	      return function() {
	        var x, y, r;
	        do {
	          x = Math.random() * 2 - 1;
	          y = Math.random() * 2 - 1;
	          r = x * x + y * y;
	        } while (!r || r > 1);
	        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
	      };
	    },
	    logNormal: function() {
	      var random = d3.random.normal.apply(d3, arguments);
	      return function() {
	        return Math.exp(random());
	      };
	    },
	    bates: function(m) {
	      var random = d3.random.irwinHall(m);
	      return function() {
	        return random() / m;
	      };
	    },
	    irwinHall: function(m) {
	      return function() {
	        for (var s = 0, j = 0; j < m; j++) s += Math.random();
	        return s;
	      };
	    }
	  };
	  d3.scale = {};
	  function d3_scaleExtent(domain) {
	    var start = domain[0], stop = domain[domain.length - 1];
	    return start < stop ? [ start, stop ] : [ stop, start ];
	  }
	  function d3_scaleRange(scale) {
	    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
	  }
	  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
	    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
	    return function(x) {
	      return i(u(x));
	    };
	  }
	  function d3_scale_nice(domain, nice) {
	    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
	    if (x1 < x0) {
	      dx = i0, i0 = i1, i1 = dx;
	      dx = x0, x0 = x1, x1 = dx;
	    }
	    domain[i0] = nice.floor(x0);
	    domain[i1] = nice.ceil(x1);
	    return domain;
	  }
	  function d3_scale_niceStep(step) {
	    return step ? {
	      floor: function(x) {
	        return Math.floor(x / step) * step;
	      },
	      ceil: function(x) {
	        return Math.ceil(x / step) * step;
	      }
	    } : d3_scale_niceIdentity;
	  }
	  var d3_scale_niceIdentity = {
	    floor: d3_identity,
	    ceil: d3_identity
	  };
	  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
	    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
	    if (domain[k] < domain[0]) {
	      domain = domain.slice().reverse();
	      range = range.slice().reverse();
	    }
	    while (++j <= k) {
	      u.push(uninterpolate(domain[j - 1], domain[j]));
	      i.push(interpolate(range[j - 1], range[j]));
	    }
	    return function(x) {
	      var j = d3.bisect(domain, x, 1, k) - 1;
	      return i[j](u[j](x));
	    };
	  }
	  d3.scale.linear = function() {
	    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3_interpolate, false);
	  };
	  function d3_scale_linear(domain, range, interpolate, clamp) {
	    var output, input;
	    function rescale() {
	      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
	      output = linear(domain, range, uninterpolate, interpolate);
	      input = linear(range, domain, uninterpolate, d3_interpolate);
	      return scale;
	    }
	    function scale(x) {
	      return output(x);
	    }
	    scale.invert = function(y) {
	      return input(y);
	    };
	    scale.domain = function(x) {
	      if (!arguments.length) return domain;
	      domain = x.map(Number);
	      return rescale();
	    };
	    scale.range = function(x) {
	      if (!arguments.length) return range;
	      range = x;
	      return rescale();
	    };
	    scale.rangeRound = function(x) {
	      return scale.range(x).interpolate(d3_interpolateRound);
	    };
	    scale.clamp = function(x) {
	      if (!arguments.length) return clamp;
	      clamp = x;
	      return rescale();
	    };
	    scale.interpolate = function(x) {
	      if (!arguments.length) return interpolate;
	      interpolate = x;
	      return rescale();
	    };
	    scale.ticks = function(m) {
	      return d3_scale_linearTicks(domain, m);
	    };
	    scale.tickFormat = function(m, format) {
	      return d3_scale_linearTickFormat(domain, m, format);
	    };
	    scale.nice = function(m) {
	      d3_scale_linearNice(domain, m);
	      return rescale();
	    };
	    scale.copy = function() {
	      return d3_scale_linear(domain, range, interpolate, clamp);
	    };
	    return rescale();
	  }
	  function d3_scale_linearRebind(scale, linear) {
	    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
	  }
	  function d3_scale_linearNice(domain, m) {
	    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
	    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
	    return domain;
	  }
	  function d3_scale_linearTickRange(domain, m) {
	    if (m == null) m = 10;
	    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
	    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
	    extent[0] = Math.ceil(extent[0] / step) * step;
	    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
	    extent[2] = step;
	    return extent;
	  }
	  function d3_scale_linearTicks(domain, m) {
	    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
	  }
	  function d3_scale_linearTickFormat(domain, m, format) {
	    var range = d3_scale_linearTickRange(domain, m);
	    if (format) {
	      var match = d3_format_re.exec(format);
	      match.shift();
	      if (match[8] === "s") {
	        var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
	        if (!match[7]) match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
	        match[8] = "f";
	        format = d3.format(match.join(""));
	        return function(d) {
	          return format(prefix.scale(d)) + prefix.symbol;
	        };
	      }
	      if (!match[7]) match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
	      format = match.join("");
	    } else {
	      format = ",." + d3_scale_linearPrecision(range[2]) + "f";
	    }
	    return d3.format(format);
	  }
	  var d3_scale_linearFormatSignificant = {
	    s: 1,
	    g: 1,
	    p: 1,
	    r: 1,
	    e: 1
	  };
	  function d3_scale_linearPrecision(value) {
	    return -Math.floor(Math.log(value) / Math.LN10 + .01);
	  }
	  function d3_scale_linearFormatPrecision(type, range) {
	    var p = d3_scale_linearPrecision(range[2]);
	    return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2;
	  }
	  d3.scale.log = function() {
	    return d3_scale_log(d3.scale.linear().domain([ 0, 1 ]), 10, true, [ 1, 10 ]);
	  };
	  function d3_scale_log(linear, base, positive, domain) {
	    function log(x) {
	      return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
	    }
	    function pow(x) {
	      return positive ? Math.pow(base, x) : -Math.pow(base, -x);
	    }
	    function scale(x) {
	      return linear(log(x));
	    }
	    scale.invert = function(x) {
	      return pow(linear.invert(x));
	    };
	    scale.domain = function(x) {
	      if (!arguments.length) return domain;
	      positive = x[0] >= 0;
	      linear.domain((domain = x.map(Number)).map(log));
	      return scale;
	    };
	    scale.base = function(_) {
	      if (!arguments.length) return base;
	      base = +_;
	      linear.domain(domain.map(log));
	      return scale;
	    };
	    scale.nice = function() {
	      var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
	      linear.domain(niced);
	      domain = niced.map(pow);
	      return scale;
	    };
	    scale.ticks = function() {
	      var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
	      if (isFinite(j - i)) {
	        if (positive) {
	          for (;i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
	          ticks.push(pow(i));
	        } else {
	          ticks.push(pow(i));
	          for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
	        }
	        for (i = 0; ticks[i] < u; i++) {}
	        for (j = ticks.length; ticks[j - 1] > v; j--) {}
	        ticks = ticks.slice(i, j);
	      }
	      return ticks;
	    };
	    scale.tickFormat = function(n, format) {
	      if (!arguments.length) return d3_scale_logFormat;
	      if (arguments.length < 2) format = d3_scale_logFormat; else if (typeof format !== "function") format = d3.format(format);
	      var k = Math.max(1, base * n / scale.ticks().length);
	      return function(d) {
	        var i = d / pow(Math.round(log(d)));
	        if (i * base < base - .5) i *= base;
	        return i <= k ? format(d) : "";
	      };
	    };
	    scale.copy = function() {
	      return d3_scale_log(linear.copy(), base, positive, domain);
	    };
	    return d3_scale_linearRebind(scale, linear);
	  }
	  var d3_scale_logFormat = d3.format(".0e"), d3_scale_logNiceNegative = {
	    floor: function(x) {
	      return -Math.ceil(-x);
	    },
	    ceil: function(x) {
	      return -Math.floor(-x);
	    }
	  };
	  d3.scale.pow = function() {
	    return d3_scale_pow(d3.scale.linear(), 1, [ 0, 1 ]);
	  };
	  function d3_scale_pow(linear, exponent, domain) {
	    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
	    function scale(x) {
	      return linear(powp(x));
	    }
	    scale.invert = function(x) {
	      return powb(linear.invert(x));
	    };
	    scale.domain = function(x) {
	      if (!arguments.length) return domain;
	      linear.domain((domain = x.map(Number)).map(powp));
	      return scale;
	    };
	    scale.ticks = function(m) {
	      return d3_scale_linearTicks(domain, m);
	    };
	    scale.tickFormat = function(m, format) {
	      return d3_scale_linearTickFormat(domain, m, format);
	    };
	    scale.nice = function(m) {
	      return scale.domain(d3_scale_linearNice(domain, m));
	    };
	    scale.exponent = function(x) {
	      if (!arguments.length) return exponent;
	      powp = d3_scale_powPow(exponent = x);
	      powb = d3_scale_powPow(1 / exponent);
	      linear.domain(domain.map(powp));
	      return scale;
	    };
	    scale.copy = function() {
	      return d3_scale_pow(linear.copy(), exponent, domain);
	    };
	    return d3_scale_linearRebind(scale, linear);
	  }
	  function d3_scale_powPow(e) {
	    return function(x) {
	      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
	    };
	  }
	  d3.scale.sqrt = function() {
	    return d3.scale.pow().exponent(.5);
	  };
	  d3.scale.ordinal = function() {
	    return d3_scale_ordinal([], {
	      t: "range",
	      a: [ [] ]
	    });
	  };
	  function d3_scale_ordinal(domain, ranger) {
	    var index, range, rangeBand;
	    function scale(x) {
	      return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
	    }
	    function steps(start, step) {
	      return d3.range(domain.length).map(function(i) {
	        return start + step * i;
	      });
	    }
	    scale.domain = function(x) {
	      if (!arguments.length) return domain;
	      domain = [];
	      index = new d3_Map();
	      var i = -1, n = x.length, xi;
	      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
	      return scale[ranger.t].apply(scale, ranger.a);
	    };
	    scale.range = function(x) {
	      if (!arguments.length) return range;
	      range = x;
	      rangeBand = 0;
	      ranger = {
	        t: "range",
	        a: arguments
	      };
	      return scale;
	    };
	    scale.rangePoints = function(x, padding) {
	      if (arguments.length < 2) padding = 0;
	      var start = x[0], stop = x[1], step = domain.length < 2 ? (start = (start + stop) / 2, 
	      0) : (stop - start) / (domain.length - 1 + padding);
	      range = steps(start + step * padding / 2, step);
	      rangeBand = 0;
	      ranger = {
	        t: "rangePoints",
	        a: arguments
	      };
	      return scale;
	    };
	    scale.rangeRoundPoints = function(x, padding) {
	      if (arguments.length < 2) padding = 0;
	      var start = x[0], stop = x[1], step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 
	      0) : (stop - start) / (domain.length - 1 + padding) | 0;
	      range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
	      rangeBand = 0;
	      ranger = {
	        t: "rangeRoundPoints",
	        a: arguments
	      };
	      return scale;
	    };
	    scale.rangeBands = function(x, padding, outerPadding) {
	      if (arguments.length < 2) padding = 0;
	      if (arguments.length < 3) outerPadding = padding;
	      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
	      range = steps(start + step * outerPadding, step);
	      if (reverse) range.reverse();
	      rangeBand = step * (1 - padding);
	      ranger = {
	        t: "rangeBands",
	        a: arguments
	      };
	      return scale;
	    };
	    scale.rangeRoundBands = function(x, padding, outerPadding) {
	      if (arguments.length < 2) padding = 0;
	      if (arguments.length < 3) outerPadding = padding;
	      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
	      range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
	      if (reverse) range.reverse();
	      rangeBand = Math.round(step * (1 - padding));
	      ranger = {
	        t: "rangeRoundBands",
	        a: arguments
	      };
	      return scale;
	    };
	    scale.rangeBand = function() {
	      return rangeBand;
	    };
	    scale.rangeExtent = function() {
	      return d3_scaleExtent(ranger.a[0]);
	    };
	    scale.copy = function() {
	      return d3_scale_ordinal(domain, ranger);
	    };
	    return scale.domain(domain);
	  }
	  d3.scale.category10 = function() {
	    return d3.scale.ordinal().range(d3_category10);
	  };
	  d3.scale.category20 = function() {
	    return d3.scale.ordinal().range(d3_category20);
	  };
	  d3.scale.category20b = function() {
	    return d3.scale.ordinal().range(d3_category20b);
	  };
	  d3.scale.category20c = function() {
	    return d3.scale.ordinal().range(d3_category20c);
	  };
	  var d3_category10 = [ 2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175 ].map(d3_rgbString);
	  var d3_category20 = [ 2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725 ].map(d3_rgbString);
	  var d3_category20b = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654 ].map(d3_rgbString);
	  var d3_category20c = [ 3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081 ].map(d3_rgbString);
	  d3.scale.quantile = function() {
	    return d3_scale_quantile([], []);
	  };
	  function d3_scale_quantile(domain, range) {
	    var thresholds;
	    function rescale() {
	      var k = 0, q = range.length;
	      thresholds = [];
	      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
	      return scale;
	    }
	    function scale(x) {
	      if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)];
	    }
	    scale.domain = function(x) {
	      if (!arguments.length) return domain;
	      domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
	      return rescale();
	    };
	    scale.range = function(x) {
	      if (!arguments.length) return range;
	      range = x;
	      return rescale();
	    };
	    scale.quantiles = function() {
	      return thresholds;
	    };
	    scale.invertExtent = function(y) {
	      y = range.indexOf(y);
	      return y < 0 ? [ NaN, NaN ] : [ y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1] ];
	    };
	    scale.copy = function() {
	      return d3_scale_quantile(domain, range);
	    };
	    return rescale();
	  }
	  d3.scale.quantize = function() {
	    return d3_scale_quantize(0, 1, [ 0, 1 ]);
	  };
	  function d3_scale_quantize(x0, x1, range) {
	    var kx, i;
	    function scale(x) {
	      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
	    }
	    function rescale() {
	      kx = range.length / (x1 - x0);
	      i = range.length - 1;
	      return scale;
	    }
	    scale.domain = function(x) {
	      if (!arguments.length) return [ x0, x1 ];
	      x0 = +x[0];
	      x1 = +x[x.length - 1];
	      return rescale();
	    };
	    scale.range = function(x) {
	      if (!arguments.length) return range;
	      range = x;
	      return rescale();
	    };
	    scale.invertExtent = function(y) {
	      y = range.indexOf(y);
	      y = y < 0 ? NaN : y / kx + x0;
	      return [ y, y + 1 / kx ];
	    };
	    scale.copy = function() {
	      return d3_scale_quantize(x0, x1, range);
	    };
	    return rescale();
	  }
	  d3.scale.threshold = function() {
	    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
	  };
	  function d3_scale_threshold(domain, range) {
	    function scale(x) {
	      if (x <= x) return range[d3.bisect(domain, x)];
	    }
	    scale.domain = function(_) {
	      if (!arguments.length) return domain;
	      domain = _;
	      return scale;
	    };
	    scale.range = function(_) {
	      if (!arguments.length) return range;
	      range = _;
	      return scale;
	    };
	    scale.invertExtent = function(y) {
	      y = range.indexOf(y);
	      return [ domain[y - 1], domain[y] ];
	    };
	    scale.copy = function() {
	      return d3_scale_threshold(domain, range);
	    };
	    return scale;
	  }
	  d3.scale.identity = function() {
	    return d3_scale_identity([ 0, 1 ]);
	  };
	  function d3_scale_identity(domain) {
	    function identity(x) {
	      return +x;
	    }
	    identity.invert = identity;
	    identity.domain = identity.range = function(x) {
	      if (!arguments.length) return domain;
	      domain = x.map(identity);
	      return identity;
	    };
	    identity.ticks = function(m) {
	      return d3_scale_linearTicks(domain, m);
	    };
	    identity.tickFormat = function(m, format) {
	      return d3_scale_linearTickFormat(domain, m, format);
	    };
	    identity.copy = function() {
	      return d3_scale_identity(domain);
	    };
	    return identity;
	  }
	  d3.svg = {};
	  function d3_zero() {
	    return 0;
	  }
	  d3.svg.arc = function() {
	    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, cornerRadius = d3_zero, padRadius = d3_svg_arcAuto, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle, padAngle = d3_svg_arcPadAngle;
	    function arc() {
	      var r0 = Math.max(0, +innerRadius.apply(this, arguments)), r1 = Math.max(0, +outerRadius.apply(this, arguments)), a0 = startAngle.apply(this, arguments) - halfπ, a1 = endAngle.apply(this, arguments) - halfπ, da = Math.abs(a1 - a0), cw = a0 > a1 ? 0 : 1;
	      if (r1 < r0) rc = r1, r1 = r0, r0 = rc;
	      if (da >= τε) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
	      var rc, cr, rp, ap, p0 = 0, p1 = 0, x0, y0, x1, y1, x2, y2, x3, y3, path = [];
	      if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
	        rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
	        if (!cw) p1 *= -1;
	        if (r1) p1 = d3_asin(rp / r1 * Math.sin(ap));
	        if (r0) p0 = d3_asin(rp / r0 * Math.sin(ap));
	      }
	      if (r1) {
	        x0 = r1 * Math.cos(a0 + p1);
	        y0 = r1 * Math.sin(a0 + p1);
	        x1 = r1 * Math.cos(a1 - p1);
	        y1 = r1 * Math.sin(a1 - p1);
	        var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;
	        if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
	          var h1 = (a0 + a1) / 2;
	          x0 = r1 * Math.cos(h1);
	          y0 = r1 * Math.sin(h1);
	          x1 = y1 = null;
	        }
	      } else {
	        x0 = y0 = 0;
	      }
	      if (r0) {
	        x2 = r0 * Math.cos(a1 - p0);
	        y2 = r0 * Math.sin(a1 - p0);
	        x3 = r0 * Math.cos(a0 + p0);
	        y3 = r0 * Math.sin(a0 + p0);
	        var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;
	        if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
	          var h0 = (a0 + a1) / 2;
	          x2 = r0 * Math.cos(h0);
	          y2 = r0 * Math.sin(h0);
	          x3 = y3 = null;
	        }
	      } else {
	        x2 = y2 = 0;
	      }
	      if (da > ε && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > .001) {
	        cr = r0 < r1 ^ cw ? 0 : 1;
	        var rc1 = rc, rc0 = rc;
	        if (da < π) {
	          var oc = x3 == null ? [ x2, y2 ] : x1 == null ? [ x0, y0 ] : d3_geom_polygonIntersect([ x0, y0 ], [ x3, y3 ], [ x1, y1 ], [ x2, y2 ]), ax = x0 - oc[0], ay = y0 - oc[1], bx = x1 - oc[0], by = y1 - oc[1], kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2), lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
	          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
	        }
	        if (x1 != null) {
	          var t30 = d3_svg_arcCornerTangents(x3 == null ? [ x2, y2 ] : [ x3, y3 ], [ x0, y0 ], r1, rc1, cw), t12 = d3_svg_arcCornerTangents([ x1, y1 ], [ x2, y2 ], r1, rc1, cw);
	          if (rc === rc1) {
	            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
	          } else {
	            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
	          }
	        } else {
	          path.push("M", x0, ",", y0);
	        }
	        if (x3 != null) {
	          var t03 = d3_svg_arcCornerTangents([ x0, y0 ], [ x3, y3 ], r0, -rc0, cw), t21 = d3_svg_arcCornerTangents([ x2, y2 ], x1 == null ? [ x0, y0 ] : [ x1, y1 ], r0, -rc0, cw);
	          if (rc === rc0) {
	            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
	          } else {
	            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
	          }
	        } else {
	          path.push("L", x2, ",", y2);
	        }
	      } else {
	        path.push("M", x0, ",", y0);
	        if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
	        path.push("L", x2, ",", y2);
	        if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
	      }
	      path.push("Z");
	      return path.join("");
	    }
	    function circleSegment(r1, cw) {
	      return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
	    }
	    arc.innerRadius = function(v) {
	      if (!arguments.length) return innerRadius;
	      innerRadius = d3_functor(v);
	      return arc;
	    };
	    arc.outerRadius = function(v) {
	      if (!arguments.length) return outerRadius;
	      outerRadius = d3_functor(v);
	      return arc;
	    };
	    arc.cornerRadius = function(v) {
	      if (!arguments.length) return cornerRadius;
	      cornerRadius = d3_functor(v);
	      return arc;
	    };
	    arc.padRadius = function(v) {
	      if (!arguments.length) return padRadius;
	      padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
	      return arc;
	    };
	    arc.startAngle = function(v) {
	      if (!arguments.length) return startAngle;
	      startAngle = d3_functor(v);
	      return arc;
	    };
	    arc.endAngle = function(v) {
	      if (!arguments.length) return endAngle;
	      endAngle = d3_functor(v);
	      return arc;
	    };
	    arc.padAngle = function(v) {
	      if (!arguments.length) return padAngle;
	      padAngle = d3_functor(v);
	      return arc;
	    };
	    arc.centroid = function() {
	      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
	      return [ Math.cos(a) * r, Math.sin(a) * r ];
	    };
	    return arc;
	  };
	  var d3_svg_arcAuto = "auto";
	  function d3_svg_arcInnerRadius(d) {
	    return d.innerRadius;
	  }
	  function d3_svg_arcOuterRadius(d) {
	    return d.outerRadius;
	  }
	  function d3_svg_arcStartAngle(d) {
	    return d.startAngle;
	  }
	  function d3_svg_arcEndAngle(d) {
	    return d.endAngle;
	  }
	  function d3_svg_arcPadAngle(d) {
	    return d && d.padAngle;
	  }
	  function d3_svg_arcSweep(x0, y0, x1, y1) {
	    return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
	  }
	  function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
	    var x01 = p0[0] - p1[0], y01 = p0[1] - p1[1], lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x1 = p0[0] + ox, y1 = p0[1] + oy, x2 = p1[0] + ox, y2 = p1[1] + oy, x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, r = r1 - rc, D = x1 * y2 - x2 * y1, d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x3, dy0 = cy0 - y3, dx1 = cx1 - x3, dy1 = cy1 - y3;
	    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	    return [ [ cx0 - ox, cy0 - oy ], [ cx0 * r1 / r, cy0 * r1 / r ] ];
	  }
	  function d3_svg_line(projection) {
	    var x = d3_geom_pointX, y = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
	    function line(data) {
	      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
	      function segment() {
	        segments.push("M", interpolate(projection(points), tension));
	      }
	      while (++i < n) {
	        if (defined.call(this, d = data[i], i)) {
	          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
	        } else if (points.length) {
	          segment();
	          points = [];
	        }
	      }
	      if (points.length) segment();
	      return segments.length ? segments.join("") : null;
	    }
	    line.x = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return line;
	    };
	    line.y = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return line;
	    };
	    line.defined = function(_) {
	      if (!arguments.length) return defined;
	      defined = _;
	      return line;
	    };
	    line.interpolate = function(_) {
	      if (!arguments.length) return interpolateKey;
	      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
	      return line;
	    };
	    line.tension = function(_) {
	      if (!arguments.length) return tension;
	      tension = _;
	      return line;
	    };
	    return line;
	  }
	  d3.svg.line = function() {
	    return d3_svg_line(d3_identity);
	  };
	  var d3_svg_lineInterpolators = d3.map({
	    linear: d3_svg_lineLinear,
	    "linear-closed": d3_svg_lineLinearClosed,
	    step: d3_svg_lineStep,
	    "step-before": d3_svg_lineStepBefore,
	    "step-after": d3_svg_lineStepAfter,
	    basis: d3_svg_lineBasis,
	    "basis-open": d3_svg_lineBasisOpen,
	    "basis-closed": d3_svg_lineBasisClosed,
	    bundle: d3_svg_lineBundle,
	    cardinal: d3_svg_lineCardinal,
	    "cardinal-open": d3_svg_lineCardinalOpen,
	    "cardinal-closed": d3_svg_lineCardinalClosed,
	    monotone: d3_svg_lineMonotone
	  });
	  d3_svg_lineInterpolators.forEach(function(key, value) {
	    value.key = key;
	    value.closed = /-closed$/.test(key);
	  });
	  function d3_svg_lineLinear(points) {
	    return points.length > 1 ? points.join("L") : points + "Z";
	  }
	  function d3_svg_lineLinearClosed(points) {
	    return points.join("L") + "Z";
	  }
	  function d3_svg_lineStep(points) {
	    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
	    while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
	    if (n > 1) path.push("H", p[0]);
	    return path.join("");
	  }
	  function d3_svg_lineStepBefore(points) {
	    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
	    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
	    return path.join("");
	  }
	  function d3_svg_lineStepAfter(points) {
	    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
	    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
	    return path.join("");
	  }
	  function d3_svg_lineCardinalOpen(points, tension) {
	    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
	  }
	  function d3_svg_lineCardinalClosed(points, tension) {
	    return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
	    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
	  }
	  function d3_svg_lineCardinal(points, tension) {
	    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
	  }
	  function d3_svg_lineHermite(points, tangents) {
	    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
	      return d3_svg_lineLinear(points);
	    }
	    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
	    if (quad) {
	      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
	      p0 = points[1];
	      pi = 2;
	    }
	    if (tangents.length > 1) {
	      t = tangents[1];
	      p = points[pi];
	      pi++;
	      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
	      for (var i = 2; i < tangents.length; i++, pi++) {
	        p = points[pi];
	        t = tangents[i];
	        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
	      }
	    }
	    if (quad) {
	      var lp = points[pi];
	      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
	    }
	    return path;
	  }
	  function d3_svg_lineCardinalTangents(points, tension) {
	    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
	    while (++i < n) {
	      p0 = p1;
	      p1 = p2;
	      p2 = points[i];
	      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
	    }
	    return tangents;
	  }
	  function d3_svg_lineBasis(points) {
	    if (points.length < 3) return d3_svg_lineLinear(points);
	    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
	    points.push(points[n - 1]);
	    while (++i <= n) {
	      pi = points[i];
	      px.shift();
	      px.push(pi[0]);
	      py.shift();
	      py.push(pi[1]);
	      d3_svg_lineBasisBezier(path, px, py);
	    }
	    points.pop();
	    path.push("L", pi);
	    return path.join("");
	  }
	  function d3_svg_lineBasisOpen(points) {
	    if (points.length < 4) return d3_svg_lineLinear(points);
	    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
	    while (++i < 3) {
	      pi = points[i];
	      px.push(pi[0]);
	      py.push(pi[1]);
	    }
	    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
	    --i;
	    while (++i < n) {
	      pi = points[i];
	      px.shift();
	      px.push(pi[0]);
	      py.shift();
	      py.push(pi[1]);
	      d3_svg_lineBasisBezier(path, px, py);
	    }
	    return path.join("");
	  }
	  function d3_svg_lineBasisClosed(points) {
	    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
	    while (++i < 4) {
	      pi = points[i % n];
	      px.push(pi[0]);
	      py.push(pi[1]);
	    }
	    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
	    --i;
	    while (++i < m) {
	      pi = points[i % n];
	      px.shift();
	      px.push(pi[0]);
	      py.shift();
	      py.push(pi[1]);
	      d3_svg_lineBasisBezier(path, px, py);
	    }
	    return path.join("");
	  }
	  function d3_svg_lineBundle(points, tension) {
	    var n = points.length - 1;
	    if (n) {
	      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
	      while (++i <= n) {
	        p = points[i];
	        t = i / n;
	        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
	        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
	      }
	    }
	    return d3_svg_lineBasis(points);
	  }
	  function d3_svg_lineDot4(a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	  }
	  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
	  function d3_svg_lineBasisBezier(path, x, y) {
	    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
	  }
	  function d3_svg_lineSlope(p0, p1) {
	    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
	  }
	  function d3_svg_lineFiniteDifferences(points) {
	    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
	    while (++i < j) {
	      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
	    }
	    m[i] = d;
	    return m;
	  }
	  function d3_svg_lineMonotoneTangents(points) {
	    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
	    while (++i < j) {
	      d = d3_svg_lineSlope(points[i], points[i + 1]);
	      if (abs(d) < ε) {
	        m[i] = m[i + 1] = 0;
	      } else {
	        a = m[i] / d;
	        b = m[i + 1] / d;
	        s = a * a + b * b;
	        if (s > 9) {
	          s = d * 3 / Math.sqrt(s);
	          m[i] = s * a;
	          m[i + 1] = s * b;
	        }
	      }
	    }
	    i = -1;
	    while (++i <= j) {
	      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
	      tangents.push([ s || 0, m[i] * s || 0 ]);
	    }
	    return tangents;
	  }
	  function d3_svg_lineMonotone(points) {
	    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
	  }
	  d3.svg.line.radial = function() {
	    var line = d3_svg_line(d3_svg_lineRadial);
	    line.radius = line.x, delete line.x;
	    line.angle = line.y, delete line.y;
	    return line;
	  };
	  function d3_svg_lineRadial(points) {
	    var point, i = -1, n = points.length, r, a;
	    while (++i < n) {
	      point = points[i];
	      r = point[0];
	      a = point[1] - halfπ;
	      point[0] = r * Math.cos(a);
	      point[1] = r * Math.sin(a);
	    }
	    return points;
	  }
	  function d3_svg_area(projection) {
	    var x0 = d3_geom_pointX, x1 = d3_geom_pointX, y0 = 0, y1 = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
	    function area(data) {
	      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
	        return x;
	      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
	        return y;
	      } : d3_functor(y1), x, y;
	      function segment() {
	        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
	      }
	      while (++i < n) {
	        if (defined.call(this, d = data[i], i)) {
	          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
	          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
	        } else if (points0.length) {
	          segment();
	          points0 = [];
	          points1 = [];
	        }
	      }
	      if (points0.length) segment();
	      return segments.length ? segments.join("") : null;
	    }
	    area.x = function(_) {
	      if (!arguments.length) return x1;
	      x0 = x1 = _;
	      return area;
	    };
	    area.x0 = function(_) {
	      if (!arguments.length) return x0;
	      x0 = _;
	      return area;
	    };
	    area.x1 = function(_) {
	      if (!arguments.length) return x1;
	      x1 = _;
	      return area;
	    };
	    area.y = function(_) {
	      if (!arguments.length) return y1;
	      y0 = y1 = _;
	      return area;
	    };
	    area.y0 = function(_) {
	      if (!arguments.length) return y0;
	      y0 = _;
	      return area;
	    };
	    area.y1 = function(_) {
	      if (!arguments.length) return y1;
	      y1 = _;
	      return area;
	    };
	    area.defined = function(_) {
	      if (!arguments.length) return defined;
	      defined = _;
	      return area;
	    };
	    area.interpolate = function(_) {
	      if (!arguments.length) return interpolateKey;
	      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
	      interpolateReverse = interpolate.reverse || interpolate;
	      L = interpolate.closed ? "M" : "L";
	      return area;
	    };
	    area.tension = function(_) {
	      if (!arguments.length) return tension;
	      tension = _;
	      return area;
	    };
	    return area;
	  }
	  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
	  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
	  d3.svg.area = function() {
	    return d3_svg_area(d3_identity);
	  };
	  d3.svg.area.radial = function() {
	    var area = d3_svg_area(d3_svg_lineRadial);
	    area.radius = area.x, delete area.x;
	    area.innerRadius = area.x0, delete area.x0;
	    area.outerRadius = area.x1, delete area.x1;
	    area.angle = area.y, delete area.y;
	    area.startAngle = area.y0, delete area.y0;
	    area.endAngle = area.y1, delete area.y1;
	    return area;
	  };
	  d3.svg.chord = function() {
	    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
	    function chord(d, i) {
	      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
	      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
	    }
	    function subgroup(self, f, d, i) {
	      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) - halfπ, a1 = endAngle.call(self, subgroup, i) - halfπ;
	      return {
	        r: r,
	        a0: a0,
	        a1: a1,
	        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
	        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
	      };
	    }
	    function equals(a, b) {
	      return a.a0 == b.a0 && a.a1 == b.a1;
	    }
	    function arc(r, p, a) {
	      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
	    }
	    function curve(r0, p0, r1, p1) {
	      return "Q 0,0 " + p1;
	    }
	    chord.radius = function(v) {
	      if (!arguments.length) return radius;
	      radius = d3_functor(v);
	      return chord;
	    };
	    chord.source = function(v) {
	      if (!arguments.length) return source;
	      source = d3_functor(v);
	      return chord;
	    };
	    chord.target = function(v) {
	      if (!arguments.length) return target;
	      target = d3_functor(v);
	      return chord;
	    };
	    chord.startAngle = function(v) {
	      if (!arguments.length) return startAngle;
	      startAngle = d3_functor(v);
	      return chord;
	    };
	    chord.endAngle = function(v) {
	      if (!arguments.length) return endAngle;
	      endAngle = d3_functor(v);
	      return chord;
	    };
	    return chord;
	  };
	  function d3_svg_chordRadius(d) {
	    return d.radius;
	  }
	  d3.svg.diagonal = function() {
	    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
	    function diagonal(d, i) {
	      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
	        x: p0.x,
	        y: m
	      }, {
	        x: p3.x,
	        y: m
	      }, p3 ];
	      p = p.map(projection);
	      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
	    }
	    diagonal.source = function(x) {
	      if (!arguments.length) return source;
	      source = d3_functor(x);
	      return diagonal;
	    };
	    diagonal.target = function(x) {
	      if (!arguments.length) return target;
	      target = d3_functor(x);
	      return diagonal;
	    };
	    diagonal.projection = function(x) {
	      if (!arguments.length) return projection;
	      projection = x;
	      return diagonal;
	    };
	    return diagonal;
	  };
	  function d3_svg_diagonalProjection(d) {
	    return [ d.x, d.y ];
	  }
	  d3.svg.diagonal.radial = function() {
	    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
	    diagonal.projection = function(x) {
	      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
	    };
	    return diagonal;
	  };
	  function d3_svg_diagonalRadialProjection(projection) {
	    return function() {
	      var d = projection.apply(this, arguments), r = d[0], a = d[1] - halfπ;
	      return [ r * Math.cos(a), r * Math.sin(a) ];
	    };
	  }
	  d3.svg.symbol = function() {
	    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
	    function symbol(d, i) {
	      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
	    }
	    symbol.type = function(x) {
	      if (!arguments.length) return type;
	      type = d3_functor(x);
	      return symbol;
	    };
	    symbol.size = function(x) {
	      if (!arguments.length) return size;
	      size = d3_functor(x);
	      return symbol;
	    };
	    return symbol;
	  };
	  function d3_svg_symbolSize() {
	    return 64;
	  }
	  function d3_svg_symbolType() {
	    return "circle";
	  }
	  function d3_svg_symbolCircle(size) {
	    var r = Math.sqrt(size / π);
	    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
	  }
	  var d3_svg_symbols = d3.map({
	    circle: d3_svg_symbolCircle,
	    cross: function(size) {
	      var r = Math.sqrt(size / 5) / 2;
	      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
	    },
	    diamond: function(size) {
	      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
	      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
	    },
	    square: function(size) {
	      var r = Math.sqrt(size) / 2;
	      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
	    },
	    "triangle-down": function(size) {
	      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
	      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
	    },
	    "triangle-up": function(size) {
	      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
	      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
	    }
	  });
	  d3.svg.symbolTypes = d3_svg_symbols.keys();
	  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
	  d3_selectionPrototype.transition = function(name) {
	    var id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], subgroup, node, transition = d3_transitionInherit || {
	      time: Date.now(),
	      ease: d3_ease_cubicInOut,
	      delay: 0,
	      duration: 250
	    };
	    for (var j = -1, m = this.length; ++j < m; ) {
	      subgroups.push(subgroup = []);
	      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
	        if (node = group[i]) d3_transitionNode(node, i, ns, id, transition);
	        subgroup.push(node);
	      }
	    }
	    return d3_transition(subgroups, ns, id);
	  };
	  d3_selectionPrototype.interrupt = function(name) {
	    return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
	  };
	  var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());
	  function d3_selection_interruptNS(ns) {
	    return function() {
	      var lock, activeId, active;
	      if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
	        active.timer.c = null;
	        active.timer.t = NaN;
	        if (--lock.count) delete lock[activeId]; else delete this[ns];
	        lock.active += .5;
	        active.event && active.event.interrupt.call(this, this.__data__, active.index);
	      }
	    };
	  }
	  function d3_transition(groups, ns, id) {
	    d3_subclass(groups, d3_transitionPrototype);
	    groups.namespace = ns;
	    groups.id = id;
	    return groups;
	  }
	  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
	  d3_transitionPrototype.call = d3_selectionPrototype.call;
	  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
	  d3_transitionPrototype.node = d3_selectionPrototype.node;
	  d3_transitionPrototype.size = d3_selectionPrototype.size;
	  d3.transition = function(selection, name) {
	    return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
	  };
	  d3.transition.prototype = d3_transitionPrototype;
	  d3_transitionPrototype.select = function(selector) {
	    var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
	    selector = d3_selection_selector(selector);
	    for (var j = -1, m = this.length; ++j < m; ) {
	      subgroups.push(subgroup = []);
	      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
	        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
	          if ("__data__" in node) subnode.__data__ = node.__data__;
	          d3_transitionNode(subnode, i, ns, id, node[ns][id]);
	          subgroup.push(subnode);
	        } else {
	          subgroup.push(null);
	        }
	      }
	    }
	    return d3_transition(subgroups, ns, id);
	  };
	  d3_transitionPrototype.selectAll = function(selector) {
	    var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
	    selector = d3_selection_selectorAll(selector);
	    for (var j = -1, m = this.length; ++j < m; ) {
	      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
	        if (node = group[i]) {
	          transition = node[ns][id];
	          subnodes = selector.call(node, node.__data__, i, j);
	          subgroups.push(subgroup = []);
	          for (var k = -1, o = subnodes.length; ++k < o; ) {
	            if (subnode = subnodes[k]) d3_transitionNode(subnode, k, ns, id, transition);
	            subgroup.push(subnode);
	          }
	        }
	      }
	    }
	    return d3_transition(subgroups, ns, id);
	  };
	  d3_transitionPrototype.filter = function(filter) {
	    var subgroups = [], subgroup, group, node;
	    if (typeof filter !== "function") filter = d3_selection_filter(filter);
	    for (var j = 0, m = this.length; j < m; j++) {
	      subgroups.push(subgroup = []);
	      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
	        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
	          subgroup.push(node);
	        }
	      }
	    }
	    return d3_transition(subgroups, this.namespace, this.id);
	  };
	  d3_transitionPrototype.tween = function(name, tween) {
	    var id = this.id, ns = this.namespace;
	    if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
	    return d3_selection_each(this, tween == null ? function(node) {
	      node[ns][id].tween.remove(name);
	    } : function(node) {
	      node[ns][id].tween.set(name, tween);
	    });
	  };
	  function d3_transition_tween(groups, name, value, tween) {
	    var id = groups.id, ns = groups.namespace;
	    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
	      node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
	    } : (value = tween(value), function(node) {
	      node[ns][id].tween.set(name, value);
	    }));
	  }
	  d3_transitionPrototype.attr = function(nameNS, value) {
	    if (arguments.length < 2) {
	      for (value in nameNS) this.attr(value, nameNS[value]);
	      return this;
	    }
	    var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
	    function attrNull() {
	      this.removeAttribute(name);
	    }
	    function attrNullNS() {
	      this.removeAttributeNS(name.space, name.local);
	    }
	    function attrTween(b) {
	      return b == null ? attrNull : (b += "", function() {
	        var a = this.getAttribute(name), i;
	        return a !== b && (i = interpolate(a, b), function(t) {
	          this.setAttribute(name, i(t));
	        });
	      });
	    }
	    function attrTweenNS(b) {
	      return b == null ? attrNullNS : (b += "", function() {
	        var a = this.getAttributeNS(name.space, name.local), i;
	        return a !== b && (i = interpolate(a, b), function(t) {
	          this.setAttributeNS(name.space, name.local, i(t));
	        });
	      });
	    }
	    return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
	  };
	  d3_transitionPrototype.attrTween = function(nameNS, tween) {
	    var name = d3.ns.qualify(nameNS);
	    function attrTween(d, i) {
	      var f = tween.call(this, d, i, this.getAttribute(name));
	      return f && function(t) {
	        this.setAttribute(name, f(t));
	      };
	    }
	    function attrTweenNS(d, i) {
	      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
	      return f && function(t) {
	        this.setAttributeNS(name.space, name.local, f(t));
	      };
	    }
	    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
	  };
	  d3_transitionPrototype.style = function(name, value, priority) {
	    var n = arguments.length;
	    if (n < 3) {
	      if (typeof name !== "string") {
	        if (n < 2) value = "";
	        for (priority in name) this.style(priority, name[priority], value);
	        return this;
	      }
	      priority = "";
	    }
	    function styleNull() {
	      this.style.removeProperty(name);
	    }
	    function styleString(b) {
	      return b == null ? styleNull : (b += "", function() {
	        var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
	        return a !== b && (i = d3_interpolate(a, b), function(t) {
	          this.style.setProperty(name, i(t), priority);
	        });
	      });
	    }
	    return d3_transition_tween(this, "style." + name, value, styleString);
	  };
	  d3_transitionPrototype.styleTween = function(name, tween, priority) {
	    if (arguments.length < 3) priority = "";
	    function styleTween(d, i) {
	      var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
	      return f && function(t) {
	        this.style.setProperty(name, f(t), priority);
	      };
	    }
	    return this.tween("style." + name, styleTween);
	  };
	  d3_transitionPrototype.text = function(value) {
	    return d3_transition_tween(this, "text", value, d3_transition_text);
	  };
	  function d3_transition_text(b) {
	    if (b == null) b = "";
	    return function() {
	      this.textContent = b;
	    };
	  }
	  d3_transitionPrototype.remove = function() {
	    var ns = this.namespace;
	    return this.each("end.transition", function() {
	      var p;
	      if (this[ns].count < 2 && (p = this.parentNode)) p.removeChild(this);
	    });
	  };
	  d3_transitionPrototype.ease = function(value) {
	    var id = this.id, ns = this.namespace;
	    if (arguments.length < 1) return this.node()[ns][id].ease;
	    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
	    return d3_selection_each(this, function(node) {
	      node[ns][id].ease = value;
	    });
	  };
	  d3_transitionPrototype.delay = function(value) {
	    var id = this.id, ns = this.namespace;
	    if (arguments.length < 1) return this.node()[ns][id].delay;
	    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
	      node[ns][id].delay = +value.call(node, node.__data__, i, j);
	    } : (value = +value, function(node) {
	      node[ns][id].delay = value;
	    }));
	  };
	  d3_transitionPrototype.duration = function(value) {
	    var id = this.id, ns = this.namespace;
	    if (arguments.length < 1) return this.node()[ns][id].duration;
	    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
	      node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
	    } : (value = Math.max(1, value), function(node) {
	      node[ns][id].duration = value;
	    }));
	  };
	  d3_transitionPrototype.each = function(type, listener) {
	    var id = this.id, ns = this.namespace;
	    if (arguments.length < 2) {
	      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
	      try {
	        d3_transitionInheritId = id;
	        d3_selection_each(this, function(node, i, j) {
	          d3_transitionInherit = node[ns][id];
	          type.call(node, node.__data__, i, j);
	        });
	      } finally {
	        d3_transitionInherit = inherit;
	        d3_transitionInheritId = inheritId;
	      }
	    } else {
	      d3_selection_each(this, function(node) {
	        var transition = node[ns][id];
	        (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
	      });
	    }
	    return this;
	  };
	  d3_transitionPrototype.transition = function() {
	    var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
	    for (var j = 0, m = this.length; j < m; j++) {
	      subgroups.push(subgroup = []);
	      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
	        if (node = group[i]) {
	          transition = node[ns][id0];
	          d3_transitionNode(node, i, ns, id1, {
	            time: transition.time,
	            ease: transition.ease,
	            delay: transition.delay + transition.duration,
	            duration: transition.duration
	          });
	        }
	        subgroup.push(node);
	      }
	    }
	    return d3_transition(subgroups, ns, id1);
	  };
	  function d3_transitionNamespace(name) {
	    return name == null ? "__transition__" : "__transition_" + name + "__";
	  }
	  function d3_transitionNode(node, i, ns, id, inherit) {
	    var lock = node[ns] || (node[ns] = {
	      active: 0,
	      count: 0
	    }), transition = lock[id], time, timer, duration, ease, tweens;
	    function schedule(elapsed) {
	      var delay = transition.delay;
	      timer.t = delay + time;
	      if (delay <= elapsed) return start(elapsed - delay);
	      timer.c = start;
	    }
	    function start(elapsed) {
	      var activeId = lock.active, active = lock[activeId];
	      if (active) {
	        active.timer.c = null;
	        active.timer.t = NaN;
	        --lock.count;
	        delete lock[activeId];
	        active.event && active.event.interrupt.call(node, node.__data__, active.index);
	      }
	      for (var cancelId in lock) {
	        if (+cancelId < id) {
	          var cancel = lock[cancelId];
	          cancel.timer.c = null;
	          cancel.timer.t = NaN;
	          --lock.count;
	          delete lock[cancelId];
	        }
	      }
	      timer.c = tick;
	      d3_timer(function() {
	        if (timer.c && tick(elapsed || 1)) {
	          timer.c = null;
	          timer.t = NaN;
	        }
	        return 1;
	      }, 0, time);
	      lock.active = id;
	      transition.event && transition.event.start.call(node, node.__data__, i);
	      tweens = [];
	      transition.tween.forEach(function(key, value) {
	        if (value = value.call(node, node.__data__, i)) {
	          tweens.push(value);
	        }
	      });
	      ease = transition.ease;
	      duration = transition.duration;
	    }
	    function tick(elapsed) {
	      var t = elapsed / duration, e = ease(t), n = tweens.length;
	      while (n > 0) {
	        tweens[--n].call(node, e);
	      }
	      if (t >= 1) {
	        transition.event && transition.event.end.call(node, node.__data__, i);
	        if (--lock.count) delete lock[id]; else delete node[ns];
	        return 1;
	      }
	    }
	    if (!transition) {
	      time = inherit.time;
	      timer = d3_timer(schedule, 0, time);
	      transition = lock[id] = {
	        tween: new d3_Map(),
	        time: time,
	        timer: timer,
	        delay: inherit.delay,
	        duration: inherit.duration,
	        ease: inherit.ease,
	        index: i
	      };
	      inherit = null;
	      ++lock.count;
	    }
	  }
	  d3.svg.axis = function() {
	    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_;
	    function axis(g) {
	      g.each(function() {
	        var g = d3.select(this);
	        var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy();
	        var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g.selectAll(".tick").data(ticks, scale1), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε), tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(), tickUpdate = d3.transition(tick.order()).style("opacity", 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
	        var range = d3_scaleRange(scale1), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
	        d3.transition(path));
	        tickEnter.append("line");
	        tickEnter.append("text");
	        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text"), sign = orient === "top" || orient === "left" ? -1 : 1, x1, x2, y1, y2;
	        if (orient === "bottom" || orient === "top") {
	          tickTransform = d3_svg_axisX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
	          text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
	          pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize);
	        } else {
	          tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
	          text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
	          pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize);
	        }
	        lineEnter.attr(y2, sign * innerTickSize);
	        textEnter.attr(y1, sign * tickSpacing);
	        lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
	        textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
	        if (scale1.rangeBand) {
	          var x = scale1, dx = x.rangeBand() / 2;
	          scale0 = scale1 = function(d) {
	            return x(d) + dx;
	          };
	        } else if (scale0.rangeBand) {
	          scale0 = scale1;
	        } else {
	          tickExit.call(tickTransform, scale1, scale0);
	        }
	        tickEnter.call(tickTransform, scale0, scale1);
	        tickUpdate.call(tickTransform, scale1, scale1);
	      });
	    }
	    axis.scale = function(x) {
	      if (!arguments.length) return scale;
	      scale = x;
	      return axis;
	    };
	    axis.orient = function(x) {
	      if (!arguments.length) return orient;
	      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
	      return axis;
	    };
	    axis.ticks = function() {
	      if (!arguments.length) return tickArguments_;
	      tickArguments_ = d3_array(arguments);
	      return axis;
	    };
	    axis.tickValues = function(x) {
	      if (!arguments.length) return tickValues;
	      tickValues = x;
	      return axis;
	    };
	    axis.tickFormat = function(x) {
	      if (!arguments.length) return tickFormat_;
	      tickFormat_ = x;
	      return axis;
	    };
	    axis.tickSize = function(x) {
	      var n = arguments.length;
	      if (!n) return innerTickSize;
	      innerTickSize = +x;
	      outerTickSize = +arguments[n - 1];
	      return axis;
	    };
	    axis.innerTickSize = function(x) {
	      if (!arguments.length) return innerTickSize;
	      innerTickSize = +x;
	      return axis;
	    };
	    axis.outerTickSize = function(x) {
	      if (!arguments.length) return outerTickSize;
	      outerTickSize = +x;
	      return axis;
	    };
	    axis.tickPadding = function(x) {
	      if (!arguments.length) return tickPadding;
	      tickPadding = +x;
	      return axis;
	    };
	    axis.tickSubdivide = function() {
	      return arguments.length && axis;
	    };
	    return axis;
	  };
	  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
	    top: 1,
	    right: 1,
	    bottom: 1,
	    left: 1
	  };
	  function d3_svg_axisX(selection, x0, x1) {
	    selection.attr("transform", function(d) {
	      var v0 = x0(d);
	      return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)";
	    });
	  }
	  function d3_svg_axisY(selection, y0, y1) {
	    selection.attr("transform", function(d) {
	      var v0 = y0(d);
	      return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")";
	    });
	  }
	  d3.svg.brush = function() {
	    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, xExtent = [ 0, 0 ], yExtent = [ 0, 0 ], xExtentDomain, yExtentDomain, xClamp = true, yClamp = true, resizes = d3_svg_brushResizes[0];
	    function brush(g) {
	      g.each(function() {
	        var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
	        var background = g.selectAll(".background").data([ 0 ]);
	        background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
	        g.selectAll(".extent").data([ 0 ]).enter().append("rect").attr("class", "extent").style("cursor", "move");
	        var resize = g.selectAll(".resize").data(resizes, d3_identity);
	        resize.exit().remove();
	        resize.enter().append("g").attr("class", function(d) {
	          return "resize " + d;
	        }).style("cursor", function(d) {
	          return d3_svg_brushCursor[d];
	        }).append("rect").attr("x", function(d) {
	          return /[ew]$/.test(d) ? -3 : null;
	        }).attr("y", function(d) {
	          return /^[ns]/.test(d) ? -3 : null;
	        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
	        resize.style("display", brush.empty() ? "none" : null);
	        var gUpdate = d3.transition(g), backgroundUpdate = d3.transition(background), range;
	        if (x) {
	          range = d3_scaleRange(x);
	          backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
	          redrawX(gUpdate);
	        }
	        if (y) {
	          range = d3_scaleRange(y);
	          backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
	          redrawY(gUpdate);
	        }
	        redraw(gUpdate);
	      });
	    }
	    brush.event = function(g) {
	      g.each(function() {
	        var event_ = event.of(this, arguments), extent1 = {
	          x: xExtent,
	          y: yExtent,
	          i: xExtentDomain,
	          j: yExtentDomain
	        }, extent0 = this.__chart__ || extent1;
	        this.__chart__ = extent1;
	        if (d3_transitionInheritId) {
	          d3.select(this).transition().each("start.brush", function() {
	            xExtentDomain = extent0.i;
	            yExtentDomain = extent0.j;
	            xExtent = extent0.x;
	            yExtent = extent0.y;
	            event_({
	              type: "brushstart"
	            });
	          }).tween("brush:brush", function() {
	            var xi = d3_interpolateArray(xExtent, extent1.x), yi = d3_interpolateArray(yExtent, extent1.y);
	            xExtentDomain = yExtentDomain = null;
	            return function(t) {
	              xExtent = extent1.x = xi(t);
	              yExtent = extent1.y = yi(t);
	              event_({
	                type: "brush",
	                mode: "resize"
	              });
	            };
	          }).each("end.brush", function() {
	            xExtentDomain = extent1.i;
	            yExtentDomain = extent1.j;
	            event_({
	              type: "brush",
	              mode: "resize"
	            });
	            event_({
	              type: "brushend"
	            });
	          });
	        } else {
	          event_({
	            type: "brushstart"
	          });
	          event_({
	            type: "brush",
	            mode: "resize"
	          });
	          event_({
	            type: "brushend"
	          });
	        }
	      });
	    };
	    function redraw(g) {
	      g.selectAll(".resize").attr("transform", function(d) {
	        return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")";
	      });
	    }
	    function redrawX(g) {
	      g.select(".extent").attr("x", xExtent[0]);
	      g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0]);
	    }
	    function redrawY(g) {
	      g.select(".extent").attr("y", yExtent[0]);
	      g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0]);
	    }
	    function brushstart() {
	      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(target), center, origin = d3.mouse(target), offset;
	      var w = d3.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);
	      if (d3.event.changedTouches) {
	        w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
	      } else {
	        w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
	      }
	      g.interrupt().selectAll("*").interrupt();
	      if (dragging) {
	        origin[0] = xExtent[0] - origin[0];
	        origin[1] = yExtent[0] - origin[1];
	      } else if (resizing) {
	        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
	        offset = [ xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1] ];
	        origin[0] = xExtent[ex];
	        origin[1] = yExtent[ey];
	      } else if (d3.event.altKey) center = origin.slice();
	      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
	      d3.select("body").style("cursor", eventTarget.style("cursor"));
	      event_({
	        type: "brushstart"
	      });
	      brushmove();
	      function keydown() {
	        if (d3.event.keyCode == 32) {
	          if (!dragging) {
	            center = null;
	            origin[0] -= xExtent[1];
	            origin[1] -= yExtent[1];
	            dragging = 2;
	          }
	          d3_eventPreventDefault();
	        }
	      }
	      function keyup() {
	        if (d3.event.keyCode == 32 && dragging == 2) {
	          origin[0] += xExtent[1];
	          origin[1] += yExtent[1];
	          dragging = 0;
	          d3_eventPreventDefault();
	        }
	      }
	      function brushmove() {
	        var point = d3.mouse(target), moved = false;
	        if (offset) {
	          point[0] += offset[0];
	          point[1] += offset[1];
	        }
	        if (!dragging) {
	          if (d3.event.altKey) {
	            if (!center) center = [ (xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2 ];
	            origin[0] = xExtent[+(point[0] < center[0])];
	            origin[1] = yExtent[+(point[1] < center[1])];
	          } else center = null;
	        }
	        if (resizingX && move1(point, x, 0)) {
	          redrawX(g);
	          moved = true;
	        }
	        if (resizingY && move1(point, y, 1)) {
	          redrawY(g);
	          moved = true;
	        }
	        if (moved) {
	          redraw(g);
	          event_({
	            type: "brush",
	            mode: dragging ? "move" : "resize"
	          });
	        }
	      }
	      function move1(point, scale, i) {
	        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0], min, max;
	        if (dragging) {
	          r0 -= position;
	          r1 -= size + position;
	        }
	        min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
	        if (dragging) {
	          max = (min += position) + size;
	        } else {
	          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
	          if (position < min) {
	            max = min;
	            min = position;
	          } else {
	            max = position;
	          }
	        }
	        if (extent[0] != min || extent[1] != max) {
	          if (i) yExtentDomain = null; else xExtentDomain = null;
	          extent[0] = min;
	          extent[1] = max;
	          return true;
	        }
	      }
	      function brushend() {
	        brushmove();
	        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
	        d3.select("body").style("cursor", null);
	        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
	        dragRestore();
	        event_({
	          type: "brushend"
	        });
	      }
	    }
	    brush.x = function(z) {
	      if (!arguments.length) return x;
	      x = z;
	      resizes = d3_svg_brushResizes[!x << 1 | !y];
	      return brush;
	    };
	    brush.y = function(z) {
	      if (!arguments.length) return y;
	      y = z;
	      resizes = d3_svg_brushResizes[!x << 1 | !y];
	      return brush;
	    };
	    brush.clamp = function(z) {
	      if (!arguments.length) return x && y ? [ xClamp, yClamp ] : x ? xClamp : y ? yClamp : null;
	      if (x && y) xClamp = !!z[0], yClamp = !!z[1]; else if (x) xClamp = !!z; else if (y) yClamp = !!z;
	      return brush;
	    };
	    brush.extent = function(z) {
	      var x0, x1, y0, y1, t;
	      if (!arguments.length) {
	        if (x) {
	          if (xExtentDomain) {
	            x0 = xExtentDomain[0], x1 = xExtentDomain[1];
	          } else {
	            x0 = xExtent[0], x1 = xExtent[1];
	            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
	            if (x1 < x0) t = x0, x0 = x1, x1 = t;
	          }
	        }
	        if (y) {
	          if (yExtentDomain) {
	            y0 = yExtentDomain[0], y1 = yExtentDomain[1];
	          } else {
	            y0 = yExtent[0], y1 = yExtent[1];
	            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
	            if (y1 < y0) t = y0, y0 = y1, y1 = t;
	          }
	        }
	        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
	      }
	      if (x) {
	        x0 = z[0], x1 = z[1];
	        if (y) x0 = x0[0], x1 = x1[0];
	        xExtentDomain = [ x0, x1 ];
	        if (x.invert) x0 = x(x0), x1 = x(x1);
	        if (x1 < x0) t = x0, x0 = x1, x1 = t;
	        if (x0 != xExtent[0] || x1 != xExtent[1]) xExtent = [ x0, x1 ];
	      }
	      if (y) {
	        y0 = z[0], y1 = z[1];
	        if (x) y0 = y0[1], y1 = y1[1];
	        yExtentDomain = [ y0, y1 ];
	        if (y.invert) y0 = y(y0), y1 = y(y1);
	        if (y1 < y0) t = y0, y0 = y1, y1 = t;
	        if (y0 != yExtent[0] || y1 != yExtent[1]) yExtent = [ y0, y1 ];
	      }
	      return brush;
	    };
	    brush.clear = function() {
	      if (!brush.empty()) {
	        xExtent = [ 0, 0 ], yExtent = [ 0, 0 ];
	        xExtentDomain = yExtentDomain = null;
	      }
	      return brush;
	    };
	    brush.empty = function() {
	      return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
	    };
	    return d3.rebind(brush, event, "on");
	  };
	  var d3_svg_brushCursor = {
	    n: "ns-resize",
	    e: "ew-resize",
	    s: "ns-resize",
	    w: "ew-resize",
	    nw: "nwse-resize",
	    ne: "nesw-resize",
	    se: "nwse-resize",
	    sw: "nesw-resize"
	  };
	  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
	  var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
	  var d3_time_formatUtc = d3_time_format.utc;
	  var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
	  d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
	  function d3_time_formatIsoNative(date) {
	    return date.toISOString();
	  }
	  d3_time_formatIsoNative.parse = function(string) {
	    var date = new Date(string);
	    return isNaN(date) ? null : date;
	  };
	  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
	  d3_time.second = d3_time_interval(function(date) {
	    return new d3_date(Math.floor(date / 1e3) * 1e3);
	  }, function(date, offset) {
	    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
	  }, function(date) {
	    return date.getSeconds();
	  });
	  d3_time.seconds = d3_time.second.range;
	  d3_time.seconds.utc = d3_time.second.utc.range;
	  d3_time.minute = d3_time_interval(function(date) {
	    return new d3_date(Math.floor(date / 6e4) * 6e4);
	  }, function(date, offset) {
	    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
	  }, function(date) {
	    return date.getMinutes();
	  });
	  d3_time.minutes = d3_time.minute.range;
	  d3_time.minutes.utc = d3_time.minute.utc.range;
	  d3_time.hour = d3_time_interval(function(date) {
	    var timezone = date.getTimezoneOffset() / 60;
	    return new d3_date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
	  }, function(date, offset) {
	    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
	  }, function(date) {
	    return date.getHours();
	  });
	  d3_time.hours = d3_time.hour.range;
	  d3_time.hours.utc = d3_time.hour.utc.range;
	  d3_time.month = d3_time_interval(function(date) {
	    date = d3_time.day(date);
	    date.setDate(1);
	    return date;
	  }, function(date, offset) {
	    date.setMonth(date.getMonth() + offset);
	  }, function(date) {
	    return date.getMonth();
	  });
	  d3_time.months = d3_time.month.range;
	  d3_time.months.utc = d3_time.month.utc.range;
	  function d3_time_scale(linear, methods, format) {
	    function scale(x) {
	      return linear(x);
	    }
	    scale.invert = function(x) {
	      return d3_time_scaleDate(linear.invert(x));
	    };
	    scale.domain = function(x) {
	      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
	      linear.domain(x);
	      return scale;
	    };
	    function tickMethod(extent, count) {
	      var span = extent[1] - extent[0], target = span / count, i = d3.bisect(d3_time_scaleSteps, target);
	      return i == d3_time_scaleSteps.length ? [ methods.year, d3_scale_linearTickRange(extent.map(function(d) {
	        return d / 31536e6;
	      }), count)[2] ] : !i ? [ d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2] ] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
	    }
	    scale.nice = function(interval, skip) {
	      var domain = scale.domain(), extent = d3_scaleExtent(domain), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
	      if (method) interval = method[0], skip = method[1];
	      function skipped(date) {
	        return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
	      }
	      return scale.domain(d3_scale_nice(domain, skip > 1 ? {
	        floor: function(date) {
	          while (skipped(date = interval.floor(date))) date = d3_time_scaleDate(date - 1);
	          return date;
	        },
	        ceil: function(date) {
	          while (skipped(date = interval.ceil(date))) date = d3_time_scaleDate(+date + 1);
	          return date;
	        }
	      } : interval));
	    };
	    scale.ticks = function(interval, skip) {
	      var extent = d3_scaleExtent(scale.domain()), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [ {
	        range: interval
	      }, skip ];
	      if (method) interval = method[0], skip = method[1];
	      return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
	    };
	    scale.tickFormat = function() {
	      return format;
	    };
	    scale.copy = function() {
	      return d3_time_scale(linear.copy(), methods, format);
	    };
	    return d3_scale_linearRebind(scale, linear);
	  }
	  function d3_time_scaleDate(t) {
	    return new Date(t);
	  }
	  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
	  var d3_time_scaleLocalMethods = [ [ d3_time.second, 1 ], [ d3_time.second, 5 ], [ d3_time.second, 15 ], [ d3_time.second, 30 ], [ d3_time.minute, 1 ], [ d3_time.minute, 5 ], [ d3_time.minute, 15 ], [ d3_time.minute, 30 ], [ d3_time.hour, 1 ], [ d3_time.hour, 3 ], [ d3_time.hour, 6 ], [ d3_time.hour, 12 ], [ d3_time.day, 1 ], [ d3_time.day, 2 ], [ d3_time.week, 1 ], [ d3_time.month, 1 ], [ d3_time.month, 3 ], [ d3_time.year, 1 ] ];
	  var d3_time_scaleLocalFormat = d3_time_format.multi([ [ ".%L", function(d) {
	    return d.getMilliseconds();
	  } ], [ ":%S", function(d) {
	    return d.getSeconds();
	  } ], [ "%I:%M", function(d) {
	    return d.getMinutes();
	  } ], [ "%I %p", function(d) {
	    return d.getHours();
	  } ], [ "%a %d", function(d) {
	    return d.getDay() && d.getDate() != 1;
	  } ], [ "%b %d", function(d) {
	    return d.getDate() != 1;
	  } ], [ "%B", function(d) {
	    return d.getMonth();
	  } ], [ "%Y", d3_true ] ]);
	  var d3_time_scaleMilliseconds = {
	    range: function(start, stop, step) {
	      return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
	    },
	    floor: d3_identity,
	    ceil: d3_identity
	  };
	  d3_time_scaleLocalMethods.year = d3_time.year;
	  d3_time.scale = function() {
	    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
	  };
	  var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
	    return [ m[0].utc, m[1] ];
	  });
	  var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([ [ ".%L", function(d) {
	    return d.getUTCMilliseconds();
	  } ], [ ":%S", function(d) {
	    return d.getUTCSeconds();
	  } ], [ "%I:%M", function(d) {
	    return d.getUTCMinutes();
	  } ], [ "%I %p", function(d) {
	    return d.getUTCHours();
	  } ], [ "%a %d", function(d) {
	    return d.getUTCDay() && d.getUTCDate() != 1;
	  } ], [ "%b %d", function(d) {
	    return d.getUTCDate() != 1;
	  } ], [ "%B", function(d) {
	    return d.getUTCMonth();
	  } ], [ "%Y", d3_true ] ]);
	  d3_time_scaleUtcMethods.year = d3_time.year.utc;
	  d3_time.scale.utc = function() {
	    return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
	  };
	  d3.text = d3_xhrType(function(request) {
	    return request.responseText;
	  });
	  d3.json = function(url, callback) {
	    return d3_xhr(url, "application/json", d3_json, callback);
	  };
	  function d3_json(request) {
	    return JSON.parse(request.responseText);
	  }
	  d3.html = function(url, callback) {
	    return d3_xhr(url, "text/html", d3_html, callback);
	  };
	  function d3_html(request) {
	    var range = d3_document.createRange();
	    range.selectNode(d3_document.body);
	    return range.createContextualFragment(request.responseText);
	  }
	  d3.xml = d3_xhrType(function(request) {
	    return request.responseXML;
	  });
	  if (true) this.d3 = d3, !(__WEBPACK_AMD_DEFINE_FACTORY__ = (d3), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else if (typeof module === "object" && module.exports) module.exports = d3; else this.d3 = d3;
	}();

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var DocumentAbstract, EventEmitter, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;

	lodash = __webpack_require__(11);

	EventEmitter = __webpack_require__(13);

	module.exports = DocumentAbstract = (function(superClass) {
	  extend(DocumentAbstract, superClass);

	  function DocumentAbstract() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this.init.apply(this, args);
	  }

	  DocumentAbstract.prototype.init = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this.props = {};
	    this._init.apply(this, args);
	    return this.update.apply(this, args);
	  };

	  DocumentAbstract.prototype._init = function() {};

	  DocumentAbstract.prototype._apply = function() {};

	  DocumentAbstract.prototype._update = function(data) {
	    if (data == null) {
	      data = {};
	    }
	    return this.props = lodash.assign(this.props, data);
	  };

	  DocumentAbstract.prototype.update = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this._update.apply(this, args);
	    return this.apply();
	  };

	  DocumentAbstract.prototype.apply = function() {
	    this._apply();
	    return this.emit('change');
	  };

	  return DocumentAbstract;

	})(EventEmitter);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter, lodash,
	  slice = [].slice;

	lodash = __webpack_require__(11);

	module.exports = EventEmitter = (function() {
	  function EventEmitter() {}

	  EventEmitter.prototype._getEventListeners = function(event) {
	    var base;
	    return (base = (this._listeners != null ? this._listeners : this._listeners = {}))[event] != null ? base[event] : base[event] = [];
	  };

	  EventEmitter.prototype.emit = function() {
	    var args, error, event, i, len, listener, listeners;
	    event = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    listeners = this._getEventListeners(event).slice(0);
	    for (i = 0, len = listeners.length; i < len; i++) {
	      listener = listeners[i];
	      try {
	        if (typeof listener === "function") {
	          listener.apply(null, args);
	        }
	      } catch (error1) {
	        error = error1;
	        console.error(error);
	      }
	    }
	  };

	  EventEmitter.prototype.on = function(event, listener) {
	    this._getEventListeners(event).push(listener);
	  };

	  EventEmitter.prototype.off = function(event, listener) {
	    var index, listeners;
	    listeners = this._getEventListeners(event);
	    if (listener) {
	      index = listeners.indexOf(listener);
	      if (index >= 0) {
	        listeners.splice(index, 1);
	      }
	    } else {
	      listeners.length = 0;
	    }
	  };

	  return EventEmitter;

	})();


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Box, lodash;

	lodash = __webpack_require__(11);

	module.exports = Box = (function() {
	  function Box(args) {
	    var bottom, height, left, right, top, width;
	    left = args.left, top = args.top, width = args.width, height = args.height, right = args.right, bottom = args.bottom;
	    if (!((left != null) && (top != null))) {
	      throw 'provide "left" and "top" to Box constructor';
	    }
	    if ((width != null) && (height != null)) {
	      right = left + width;
	      bottom = top + height;
	    } else if ((right != null) && (bottom != null)) {
	      width = right - left;
	      height = bottom - top;
	    } else {
	      throw 'provide "width" and "height" or "right" and "bottom" to Box constructor';
	    }
	    lodash.assign(this, {
	      left: left,
	      top: top,
	      width: width,
	      height: height,
	      right: right,
	      bottom: bottom
	    });
	  }

	  return Box;

	})();


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var CalculateExtents, addExtentPadding, calculateExtent, d3;

	d3 = __webpack_require__(10);

	addExtentPadding = function(paddingCoefficient, extent) {
	  var difference, padding;
	  if (typeof extent[0] !== 'number') {
	    return extent;
	  }
	  difference = extent[1] - extent[0];
	  if (difference === 0) {
	    return [extent[0] * (1 - paddingCoefficient), extent[1] * (1 + paddingCoefficient)];
	  } else {
	    padding = difference * paddingCoefficient;
	    return [extent[0] - padding, extent[1] + padding];
	  }
	};

	calculateExtent = function(paddingCoefficient, coordinates, axis) {
	  return addExtentPadding(paddingCoefficient, d3.extent(coordinates, function(d) {
	    return d[axis];
	  }));
	};

	CalculateExtents = function(paddingCoefficient, coordinates) {
	  return {
	    x: calculateExtent(paddingCoefficient, coordinates, 'x'),
	    y: calculateExtent(paddingCoefficient, coordinates, 'y')
	  };
	};

	module.exports = CalculateExtents;


/***/ },
/* 16 */
/***/ function(module, exports) {

	var ApplyAxesLimits, applyAxisLimit, nanLimit;

	nanLimit = function(e) {
	  return isNaN(e) && e !== void 0;
	};

	applyAxisLimit = function(extent, limit) {
	  if (extent.some(nanLimit)) {
	    console.warn("ApplyAxesLimits: can't apply axis limit, extent contains NaNs:", extent);
	    return extent;
	  }
	  return [Math.max(extent[0], limit[0]), Math.min(extent[1], limit[1])];
	};

	ApplyAxesLimits = function(extents, axesLimits) {
	  return {
	    x: applyAxisLimit(extents.x, axesLimits.x),
	    y: applyAxisLimit(extents.y, axesLimits.y)
	  };
	};

	module.exports = ApplyAxesLimits;


/***/ },
/* 17 */
/***/ function(module, exports) {

	var ZoomLimitsReached;

	ZoomLimitsReached = function(arg) {
	  var axesLimits, scales, x, xDomain, y, yDomain;
	  scales = arg.scales, axesLimits = arg.axesLimits;
	  xDomain = scales.x.domain();
	  yDomain = scales.y.domain();
	  x = axesLimits.x, y = axesLimits.y;
	  return xDomain[0] < x[0] || xDomain[1] > x[1] || yDomain[0] < y[0] || yDomain[1] > y[1];
	};

	module.exports = ZoomLimitsReached;


/***/ },
/* 18 */
/***/ function(module, exports) {

	var FixZoomLimits;

	FixZoomLimits = function(arg) {
	  var axesLimits, scales;
	  scales = arg.scales, axesLimits = arg.axesLimits;
	  ['x', 'y'].forEach(function(key) {
	    var diff, domain, limit, scale;
	    scale = scales[key];
	    limit = axesLimits[key];
	    domain = scale.domain();
	    if (domain[0] < limit[0]) {
	      diff = limit[0] - domain[0];
	      domain[1] += diff;
	      domain[0] = limit[0];
	    } else if (domain[1] > limit[1]) {
	      diff = limit[1] - domain[1];
	      domain[1] = limit[1];
	      domain[0] += diff;
	    }
	    scale.domain(domain);
	  });
	};

	module.exports = FixZoomLimits;


/***/ },
/* 19 */
/***/ function(module, exports) {

	var GenerateTranslate, diff;

	diff = function(arg) {
	  var a, b;
	  a = arg[0], b = arg[1];
	  return Math.abs(b - a);
	};

	GenerateTranslate = function(xScale, yScale, zoom) {
	  var half, height, part, ref, scale, width, x, y;
	  scale = zoom.scale;
	  width = diff(xScale.range());
	  height = diff(yScale.range());
	  ref = zoom.center, x = ref.x, y = ref.y;
	  part = 1 / scale;
	  half = part / 2;
	  return [-scale * width * (x - half), -scale * height * ((1 - y) - half)];
	};

	module.exports = GenerateTranslate;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var GenerateZoomCenter, GenerateZoomObject;

	GenerateZoomCenter = __webpack_require__(21);

	GenerateZoomObject = function(scale, fullXScale, fullYScale, partialXScale, partialYScale) {
	  return {
	    scale: scale,
	    center: {
	      x: GenerateZoomCenter(fullXScale, partialXScale, scale),
	      y: GenerateZoomCenter(fullYScale, partialYScale, scale)
	    }
	  };
	};

	module.exports = GenerateZoomObject;


/***/ },
/* 21 */
/***/ function(module, exports) {

	var GenerateZoomCenter, diff;

	diff = function(arg) {
	  var a, b;
	  a = arg[0], b = arg[1];
	  return Math.abs(b - a);
	};

	GenerateZoomCenter = function(fullScale, partialScale, scale) {
	  var domainDiff, fullDomain, partDomain;
	  fullDomain = fullScale.domain();
	  partDomain = partialScale.domain();
	  domainDiff = diff(fullDomain);
	  return (partDomain[0] - fullDomain[0]) / domainDiff + 0.5 / scale;
	};

	module.exports = GenerateZoomCenter;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var ZoomExtents, d3, zoomExtent;

	d3 = __webpack_require__(10);

	zoomExtent = function(extents, zoom, axis) {
	  var axisCenter, center, extent, halfSize, scale, zoomScale;
	  extent = extents[axis];
	  scale = zoom.scale, center = zoom.center;
	  axisCenter = center[axis];
	  zoomScale = d3.scale.linear().range(extent);
	  halfSize = .5 / scale;
	  return [axisCenter - halfSize, axisCenter + halfSize].map(zoomScale);
	};

	ZoomExtents = function(extents, zoom) {
	  return {
	    x: zoomExtent(extents, zoom, 'x'),
	    y: zoomExtent(extents, zoom, 'y')
	  };
	};

	module.exports = ZoomExtents;


/***/ },
/* 23 */
/***/ function(module, exports) {

	var UniqueId;

	UniqueId = function() {
	  return (Date.now() + Math.random()).toString(36);
	};

	module.exports = UniqueId;


/***/ },
/* 24 */
/***/ function(module, exports) {

	var RoundTo;

	RoundTo = function(precision) {
	  var basicRound, fixed, fixedRound, log2;
	  basicRound = function(value) {
	    return precision * Math.round(value / precision);
	  };
	  log2 = Math.log2(precision);
	  if (log2 < 0 && Math.floor(log2) !== Math.ceil(log2)) {
	    fixed = precision.toString().length - 2;
	    fixedRound = function(value) {
	      return parseFloat(basicRound(value).toFixed(fixed));
	    };
	    return fixedRound;
	  }
	  return basicRound;
	};

	module.exports = RoundTo;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectDiffers, isEmpty, lodash;

	lodash = __webpack_require__(11);

	isEmpty = function(o) {
	  if (o === null) {
	    return true;
	  }
	  if (o === void 0) {
	    return true;
	  }
	  if ((typeof o) === 'object' && Object.keys(o).length === 0) {
	    return true;
	  }
	  return false;
	};

	ObjectDiffers = function() {
	  var prev;
	  prev = null;
	  return function(current) {
	    var differs, prevAndCurrentAreEmpty, prevAndCurrentAreEqual;
	    prevAndCurrentAreEmpty = isEmpty(prev) && isEmpty(current);
	    prevAndCurrentAreEqual = lodash.isEqual(prev, current);
	    differs = !(prevAndCurrentAreEmpty || prevAndCurrentAreEqual);
	    prev = current;
	    return differs;
	  };
	};

	module.exports = ObjectDiffers;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var GenerateScaleByAxis, ModifiedDateScale, ModifiedLinearScale, d3;

	d3 = __webpack_require__(10);

	ModifiedLinearScale = __webpack_require__(27);

	ModifiedDateScale = __webpack_require__(30);

	GenerateScaleByAxis = function(axis) {
	  if (axis === 'date') {
	    return ModifiedDateScale();
	  } else {
	    return ModifiedLinearScale();
	  }
	};

	module.exports = GenerateScaleByAxis;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var LastOf, ModifiedLinearScale, RoundTo, Wrap, d3, filterJitter, filterTicks, formatTicks, limitLength;

	d3 = __webpack_require__(10);

	Wrap = __webpack_require__(28);

	RoundTo = __webpack_require__(24);

	LastOf = __webpack_require__(29);

	filterJitter = RoundTo(1e-6);

	limitLength = function(limit) {
	  return function(tick) {
	    var fraction, tickString;
	    tickString = filterJitter(tick).toString();
	    if (-1 !== tickString.indexOf('e')) {
	      return true;
	    }
	    if (-1 === tickString.indexOf('.')) {
	      return true;
	    }
	    fraction = LastOf(tickString.split('.'));
	    return fraction.length <= limit;
	  };
	};

	filterTicks = function(ticks) {
	  return ticks.filter(limitLength(2));
	};

	formatTicks = function(fn) {
	  var siFormat, testValue;
	  testValue = fn(0.001);
	  if (testValue.length < 4 || testValue === '0.00') {

	    /*
	      TODO
	      - we need more tick filtering
	      - k → K
	      - replace 200k with 0.2M somehow
	      - 2s does not limits for two numbers :-(
	     */
	    siFormat = d3.format('.2s');
	    return function(v) {
	      if (v >= 1000) {
	        return siFormat(v);
	      } else {
	        return fn(v);
	      }
	    };
	  } else {
	    return d3.format(',.2f');
	  }
	};

	ModifiedLinearScale = function() {
	  var scale;
	  scale = d3.scale.linear();
	  Wrap(scale, 'ticks', filterTicks);
	  Wrap(scale, 'tickFormat', formatTicks);
	  return scale;
	};

	module.exports = ModifiedLinearScale;


/***/ },
/* 28 */
/***/ function(module, exports) {

	var Wrap;

	Wrap = function(object, prop, wrapper) {
	  var value;
	  value = object[prop];
	  object[prop] = function() {
	    var result;
	    result = value.apply(this, arguments);
	    return wrapper(result);
	  };
	};

	module.exports = Wrap;


/***/ },
/* 29 */
/***/ function(module, exports) {

	var LastOf;

	LastOf = function(array) {
	  if (!(array && array.length)) {
	    return;
	  }
	  return array[array.length - 1];
	};

	module.exports = LastOf;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var ModifiedDateScale, Wrap, d3, d3_time_formatMulti, filterTicks, midnight;

	d3 = __webpack_require__(10);

	Wrap = __webpack_require__(28);

	d3_time_formatMulti = function(formats) {
	  var i, n;
	  n = formats.length;
	  i = -1;
	  while (++i < n) {
	    formats[i][0] = d3.time.format(formats[i][0]);
	  }
	  return function(date) {
	    var f, j;
	    j = 0;
	    f = formats[j];
	    while (!f[1](date)) {
	      f = formats[++j];
	    }
	    return f[0](date);
	  };
	};

	midnight = function(tick) {
	  return [tick.getHours() === 0, tick.getMinutes() === 0, tick.getSeconds() === 0].every(Boolean);
	};

	filterTicks = function(ticks) {
	  return ticks.filter(midnight);
	};

	ModifiedDateScale = function() {
	  var scale;
	  scale = d3.time.scale();
	  scale.tickFormat = function() {
	    return d3_time_formatMulti([
	      [
	        '', function(d) {
	          return d.getHours() || d.getMinutes() || d.getSeconds();
	        }
	      ], [
	        '%b %d', function(d) {
	          return d.getMonth() > 0 || d.getDate() > 1;
	        }
	      ], [
	        '%Y', function() {
	          return true;
	        }
	      ]
	    ]);
	  };
	  Wrap(scale, 'ticks', filterTicks);
	  return scale;
	};

	module.exports = ModifiedDateScale;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var BondDotsFactory, CheckBondData, DotsSetPlugin, Plugin, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	lodash = __webpack_require__(11);

	Plugin = __webpack_require__(32);

	CheckBondData = __webpack_require__(34);

	BondDotsFactory = __webpack_require__(35);

	module.exports = DotsSetPlugin = (function(superClass) {
	  extend(DotsSetPlugin, superClass);

	  function DotsSetPlugin() {
	    return DotsSetPlugin.__super__.constructor.apply(this, arguments);
	  }

	  DotsSetPlugin.prototype.getPropsKeys = function() {
	    return ['dotsSets'];
	  };

	  DotsSetPlugin.prototype.build = function(arg) {
	    var axes, buildData, dotsSets;
	    buildData = arg.buildData, axes = arg.axes;
	    dotsSets = this.props.dotsSets;
	    this.builtDotsSets = dotsSets.map(function(dotsSet) {
	      var alternatives, bonds;
	      bonds = dotsSet.isins.map(function(isin) {
	        return buildData(isin + '@' + dotsSet.date);
	      }).filter(function(bond) {
	        return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	      });
	      alternatives = dotsSet.alternatives || [
	        {
	          style: 'default'
	        }
	      ];
	      return {
	        highlight: dotsSet.highlight,
	        selected: dotsSet.selected,
	        opacity: dotsSet.opacity,
	        alternatives: alternatives,
	        getRadius: dotsSet.getRadius,
	        date: dotsSet.date,
	        bonds: bonds,
	        axes: axes
	      };
	    });
	  };

	  DotsSetPlugin.prototype.getBondsLists = function() {
	    var result;
	    this.hoverDot = null;
	    result = [];
	    this.builtDotsSets.forEach(function(arg) {
	      var alternatives, axes, bonds;
	      bonds = arg.bonds, axes = arg.axes, alternatives = arg.alternatives;
	      return alternatives.forEach(function(alternative) {
	        var imitateBond;
	        imitateBond = function(bond) {
	          var altBond, x, y;
	          x = bond[alternative.x || axes.x];
	          y = bond[alternative.y || axes.y];
	          altBond = {};
	          altBond[axes.x] = x;
	          altBond[axes.y] = y;
	          return altBond;
	        };
	        return result.push(bonds.map(imitateBond));
	      });
	    });
	    return result;
	  };

	  DotsSetPlugin.prototype.willRender = function(arg, renderContext) {
	    var alternative, alternatives, backgroundColor, bond, bondDot, bondToDot, bondsFactory, boxes, chartId, date, dotsSet, getRadius, graphBox, highlight, i, isHighlighted, isHover, isSelected, j, k, labelStyle, len, len1, len2, opacity, ref, ref1, ref2;
	    labelStyle = arg.labelStyle, backgroundColor = arg.backgroundColor;
	    this.dots = [];
	    graphBox = renderContext.graphBox, bondToDot = renderContext.bondToDot, boxes = renderContext.boxes, chartId = renderContext.chartId;
	    bondsFactory = new BondDotsFactory({
	      labelStyle: labelStyle,
	      backgroundColor: backgroundColor,
	      graphBox: graphBox,
	      chartId: chartId
	    });
	    this.highlightedDots = [];
	    this.selectedDot = null;
	    ref = this.builtDotsSets;
	    for (i = 0, len = ref.length; i < len; i++) {
	      dotsSet = ref[i];
	      highlight = dotsSet.highlight, date = dotsSet.date, opacity = dotsSet.opacity, alternatives = dotsSet.alternatives, getRadius = dotsSet.getRadius;
	      if (highlight) {
	        if (!Array.isArray(highlight)) {
	          highlight = [highlight];
	        }
	      } else {
	        highlight = [];
	      }
	      if (opacity === void 0) {
	        opacity = 1;
	      }
	      ref1 = dotsSet.bonds;
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        bond = ref1[j];
	        for (k = 0, len2 = alternatives.length; k < len2; k++) {
	          alternative = alternatives[k];
	          isHighlighted = (ref2 = bond.isin, indexOf.call(highlight, ref2) >= 0);
	          isSelected = bond.isin === dotsSet.selected;
	          isHover = this.hoverDot && this.hoverDot.date === date && this.hoverDot.isin === bond.isin;
	          bondDot = bondsFactory.buildDot({
	            bond: bond,
	            alternative: alternative,
	            opacity: opacity,
	            date: date,
	            isHighlighted: isHighlighted,
	            isSelected: isSelected,
	            isHover: isHover,
	            bondToDot: bondToDot,
	            getRadius: getRadius,
	            isInPortfolio: bond.quantity > 0
	          });
	          this.listenDotEvents(bondDot);
	          if (this.hoverDot && this.hoverDot.date === date && this.hoverDot.isin === bond.isin) {
	            this.hoverDot = bondDot;
	          }
	          if (isHighlighted) {
	            this.highlightedDots.push(bondDot);
	          }
	          if (isSelected) {
	            this.selectedDot = bondDot;
	          }
	          if (!bondDot.isOutOfSight) {
	            boxes.push(bondDot.dotBox);
	          }
	          this.dots.push(bondDot);
	        }
	      }
	    }
	    this.dots = lodash.sortBy(this.dots, 'x').reverse();
	  };

	  DotsSetPlugin.prototype.placeLabels = function(renderContext) {
	    var boxes, placeLabel, prevBoxes;
	    boxes = renderContext.boxes;
	    placeLabel = function(bondDot) {
	      bondDot.placeLabelWithin(boxes);
	      if (bondDot.labelBox) {
	        boxes.push(bondDot.labelBox);
	      }
	    };
	    if (this.highlightedDots) {
	      this.highlightedDots.forEach(placeLabel);
	    }
	    if (this.selectedDot) {
	      placeLabel(this.selectedDot);
	    }
	    if (this.hoverDot) {
	      prevBoxes = boxes.slice();
	      this.dots.forEach(placeLabel);
	      if (this.hoverDot.label.hidden) {
	        this.dots.forEach(function(dot) {
	          dot.label = null;
	        });
	        renderContext.boxes = boxes = prevBoxes;
	        placeLabel(this.hoverDot);
	        this.hoverDot.label.hidden = false;
	      }
	    }
	    this.dots.forEach(placeLabel);
	  };

	  DotsSetPlugin.prototype.setHoverDot = function(dot) {
	    this.hoverDot = dot;
	    this.emit('requireRender');
	  };

	  DotsSetPlugin.prototype.listenDotEvents = function(bondDot) {
	    bondDot.on('mouseEnter', (function(_this) {
	      return function() {
	        _this.setHoverDot(bondDot);
	      };
	    })(this));
	    bondDot.on('mouseLeave', (function(_this) {
	      return function() {
	        _this.setHoverDot(null);
	      };
	    })(this));
	    return bondDot.on('bondDotClick', (function(_this) {
	      return function() {
	        _this.emit('chartEmit', 'bondDotClick', bondDot.isin);
	      };
	    })(this));
	  };

	  DotsSetPlugin.prototype.render = __webpack_require__(54);

	  return DotsSetPlugin;

	})(Plugin);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var DocumentAbstract, GenerateAxesValues, ObjectDiffers, Plugin,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	DocumentAbstract = __webpack_require__(12);

	GenerateAxesValues = __webpack_require__(33);

	ObjectDiffers = __webpack_require__(25);

	module.exports = Plugin = (function(superClass) {
	  extend(Plugin, superClass);

	  function Plugin() {
	    return Plugin.__super__.constructor.apply(this, arguments);
	  }

	  Plugin.prototype._init = function() {
	    var keys;
	    this.isDataDiffers = {};
	    keys = this.getPropsKeys();
	    return keys.forEach((function(_this) {
	      return function(key) {
	        _this.isDataDiffers[key] = ObjectDiffers();
	      };
	    })(this));
	  };

	  Plugin.prototype.isDataUpdated = function() {
	    var keys, keysDiffers;
	    keys = this.getPropsKeys();
	    keysDiffers = keys.map((function(_this) {
	      return function(key) {
	        return _this.isDataDiffers[key](_this.props[key]);
	      };
	    })(this));
	    return keysDiffers.some(Boolean);
	  };

	  Plugin.prototype.buildBondsValues = function(props) {
	    this.build(props);
	    return GenerateAxesValues(this.getBondsLists(), props.axes);
	  };

	  Plugin.prototype.getPropsKeys = function() {
	    return [];
	  };

	  Plugin.prototype.build = function(props) {};

	  Plugin.prototype.getBondsLists = function() {
	    return [];
	  };

	  Plugin.prototype.willRender = function(props, renderContext) {};

	  Plugin.prototype.placeLabels = function(renderContext) {};

	  Plugin.prototype.render = function() {
	    return [];
	  };

	  return Plugin;

	})(DocumentAbstract);


/***/ },
/* 33 */
/***/ function(module, exports) {

	var GenerateAxesValues;

	GenerateAxesValues = function(bondsLists, axes) {
	  var coordinates, pushValue;
	  pushValue = function(bond) {
	    coordinates.push({
	      x: bond[axes.x],
	      y: bond[axes.y]
	    });
	  };
	  coordinates = [];
	  bondsLists.forEach(function(bondsList) {
	    bondsList.forEach(pushValue);
	  });
	  return coordinates;
	};

	module.exports = GenerateAxesValues;


/***/ },
/* 34 */
/***/ function(module, exports) {

	var CheckBondData, paramIsInBond;

	paramIsInBond = function(bond) {
	  return function(param) {
	    var value;
	    value = bond[param];
	    return (value != null) && value === value;
	  };
	};

	CheckBondData = function(bond, params) {
	  if (!bond) {
	    return false;
	  }
	  return params.every(paramIsInBond(bond));
	};

	module.exports = CheckBondData;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var BondDot, BondDotsFactory, lodash;

	lodash = __webpack_require__(11);

	BondDot = __webpack_require__(36);

	module.exports = BondDotsFactory = (function() {
	  function BondDotsFactory(args) {
	    lodash.assign(this, args);
	  }

	  BondDotsFactory.prototype.buildDot = function(args) {
	    var alternative, bond, bondToDot;
	    bondToDot = args.bondToDot, bond = args.bond, alternative = args.alternative;
	    lodash.assign(args, this, bondToDot(bond, alternative));
	    return new BondDot(args);
	  };

	  return BondDotsFactory;

	})();


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var BondDot, BondDotOutOfSight, BoxOverlapsBox, EventEmitter, GenerateDotBox, GenerateDotSymbol, GenerateDotTypeIconData, GenerateLabel, GenerateLabelBoxes, LiquidityRadius, MergeColors, RatingColor, SelectLabelBox, d3, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	lodash = __webpack_require__(11);

	EventEmitter = __webpack_require__(13);

	LiquidityRadius = __webpack_require__(37);

	GenerateDotSymbol = __webpack_require__(38);

	RatingColor = __webpack_require__(39);

	GenerateDotBox = __webpack_require__(40);

	GenerateDotTypeIconData = __webpack_require__(41);

	BoxOverlapsBox = __webpack_require__(42);

	BondDotOutOfSight = __webpack_require__(43);

	GenerateLabelBoxes = __webpack_require__(46);

	SelectLabelBox = __webpack_require__(49);

	GenerateLabel = __webpack_require__(52);

	MergeColors = __webpack_require__(53);

	d3 = __webpack_require__(10);

	module.exports = BondDot = (function(superClass) {
	  extend(BondDot, superClass);

	  function BondDot(args) {
	    var backgroundColor, bond, getRadius, graphBox, hasNaNs, isInPortfolio, opacity, pureColor, ref, x, y;
	    lodash.assign(this, args);
	    ref = this, bond = ref.bond, x = ref.x, y = ref.y, graphBox = ref.graphBox, opacity = ref.opacity, backgroundColor = ref.backgroundColor, isInPortfolio = ref.isInPortfolio, getRadius = ref.getRadius;
	    this.isin = bond.isin;
	    this.name = bond.name;
	    this.liquidity = bond['liquidity'];
	    this.symbolRadius = getRadius ? getRadius(bond) : LiquidityRadius(this.liquidity);
	    this.d = GenerateDotSymbol(this);
	    pureColor = RatingColor(bond.ratingGroup);
	    this.color = MergeColors(pureColor, backgroundColor, opacity);
	    this.dotBox = GenerateDotBox(x, y, this.symbolRadius);
	    this.typeIconData = GenerateDotTypeIconData(this);
	    this.margin = isInPortfolio ? 4 * this.symbolRadius / LiquidityRadius('very high') : 0;
	    hasNaNs = [this.dotBox.top, this.dotBox.left, this.dotBox.bottom, this.dotBox.right].map(isNaN).some(Boolean);
	    if (hasNaNs) {
	      console.warn('DotBox has NaN parameters, please check it', this);
	    }
	    this.isOutOfSight = !BoxOverlapsBox(this.dotBox, graphBox);
	    if (this.isOutOfSight && !hasNaNs) {
	      this.outOfSight = new BondDotOutOfSight({
	        dotBox: this.dotBox,
	        graphBox: graphBox
	      });
	    }
	  }

	  BondDot.prototype.placeLabelWithin = function(otherBoxes) {
	    var backgroundColor, dotBox, graphBox, hidden, isHighlighted, isHover, isSelected, labelBox, labelBoxes, labelStyle, name, opacity, ref, ref1, symbolRadius, x, y;
	    if (this.label) {
	      return;
	    }
	    ref = this, name = ref.name, x = ref.x, y = ref.y, labelStyle = ref.labelStyle, symbolRadius = ref.symbolRadius, dotBox = ref.dotBox, graphBox = ref.graphBox, backgroundColor = ref.backgroundColor, isHighlighted = ref.isHighlighted, isSelected = ref.isSelected, isHover = ref.isHover, opacity = ref.opacity;
	    labelBoxes = GenerateLabelBoxes(['right', 'left'], name, labelStyle, x, y, symbolRadius + 0.5);
	    otherBoxes = lodash.without(otherBoxes, dotBox);
	    ref1 = SelectLabelBox(labelBoxes, otherBoxes, graphBox), labelBox = ref1.labelBox, hidden = ref1.hidden;
	    if (isHighlighted || isSelected) {
	      hidden = false;
	    }
	    if (!hidden) {
	      this.labelBox = labelBox;
	    }
	    if (isHover) {
	      opacity = 1;
	    }
	    this.label = GenerateLabel({
	      text: this.name,
	      labelStyle: labelStyle,
	      box: labelBox,
	      hidden: hidden,
	      textColor: MergeColors(labelStyle.color, backgroundColor, opacity),
	      backgroundColor: backgroundColor
	    });
	  };

	  BondDot.prototype.onClick = function() {
	    return this.emit('bondDotClick');
	  };

	  BondDot.prototype.onMouseEnter = function() {
	    return this.emit('mouseEnter');
	  };

	  BondDot.prototype.onMouseLeave = function() {
	    return this.emit('mouseLeave');
	  };

	  return BondDot;

	})(EventEmitter);


/***/ },
/* 37 */
/***/ function(module, exports) {

	var LiquidityRadius, liquidityRadiusMap, unknownLiquidityRadius;

	liquidityRadiusMap = {
	  'non-liquid': 4.5,
	  'low': 6.5,
	  'average': 8,
	  'high': 11,
	  'very high': 13.2
	};

	unknownLiquidityRadius = 4.5;

	LiquidityRadius = function(liquidity) {
	  var radius;
	  radius = liquidityRadiusMap[liquidity];
	  if (!radius) {
	    return unknownLiquidityRadius;
	  }
	  return radius;
	};

	module.exports = LiquidityRadius;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var GenerateDotSymbol, d3, symbol;

	d3 = __webpack_require__(10);

	symbol = d3.svg.symbol();

	GenerateDotSymbol = function(arg) {
	  var alternative, isInPortfolio, symbolRadius, symbolSize, symbolType;
	  isInPortfolio = arg.isInPortfolio, symbolRadius = arg.symbolRadius, alternative = arg.alternative;
	  alternative || (alternative = {});
	  if (alternative.style === 'empty') {
	    symbolRadius -= 1;
	  }
	  symbolSize = Math.PI * Math.pow(symbolRadius, 2);
	  symbolType = void 0;
	  if (isInPortfolio) {
	    symbolSize *= .75;
	    symbolType = 'triangle-up';
	  } else {
	    symbolType = 'circle';
	  }
	  return symbol.type(symbolType).size(symbolSize)();
	};

	module.exports = GenerateDotSymbol;


/***/ },
/* 39 */
/***/ function(module, exports) {

	var RatingColor, ratingGroupColors, ratingGroupFromRating, unknownRatingColor;

	ratingGroupColors = {
	  AAA: '#61BEFA',
	  AA: '#EF8537',
	  A: '#A63DCE',
	  BBB: '#00963F',
	  BB: '#47599D',
	  B: '#FF6E7E',
	  CCC: '#F0C000',
	  CC: '#CF7730',
	  C: '#B42004',
	  NR: '#CCC'
	};

	unknownRatingColor = '#333333';

	ratingGroupFromRating = function(rating) {
	  return rating.replace(/[+-]/, '');
	};

	RatingColor = function(rating) {
	  var color, ratingGroup;
	  ratingGroup = ratingGroupFromRating(rating);
	  color = ratingGroupColors[ratingGroup];
	  return color || unknownRatingColor;
	};

	module.exports = RatingColor;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Box, GenerateDotBox, debugBoxOpacity;

	Box = __webpack_require__(14);

	debugBoxOpacity = 0.05;

	GenerateDotBox = function(x, y, symbolRadius) {
	  var box;
	  box = new Box({
	    left: x - symbolRadius,
	    top: y - symbolRadius,
	    width: symbolRadius * 2,
	    height: symbolRadius * 2
	  });
	  box.debugFill = "rgba(0, 0, 0, " + debugBoxOpacity + ")";
	  return box;
	};

	module.exports = GenerateDotBox;


/***/ },
/* 41 */
/***/ function(module, exports) {

	var GenerateBondDotTypeIconData, deltaY, fontSize, symbol;

	deltaY = function(bond, isInPortfolio) {
	  var dy, isFloater, liquidity;
	  liquidity = bond['liquidity'];
	  isFloater = bond.isFloater;
	  dy = !isInPortfolio ? 0 : liquidity === 'non-liquid' ? isFloater ? 0.5 : 1.5 : liquidity === 'low' ? 2 : liquidity === 'average' ? 2 : liquidity === 'high' ? 3 : 4;
	  if (isFloater) {
	    dy++;
	  }
	  return dy;
	};

	fontSize = function(bond, isInPortfolio) {
	  var liquidity;
	  liquidity = bond['liquidity'];
	  if (liquidity === 'non-liquid') {
	    if (isInPortfolio) {
	      return 5;
	    } else {
	      return 7;
	    }
	  } else if (liquidity === 'low') {
	    return 8;
	  } else if (liquidity === 'average') {
	    if (isInPortfolio) {
	      return 8;
	    } else {
	      return 10;
	    }
	  } else if (liquidity === 'high') {
	    return 10;
	  } else {
	    if (isInPortfolio) {
	      return 10;
	    } else {
	      return 12;
	    }
	  }
	};

	symbol = function(bond) {
	  if (bond.isFloater) {
	    return '~';
	  } else if (bond.isConvertible) {
	    return '↔';
	  } else if (bond.isSubordinated) {
	    return 's';
	  } else {
	    return '';
	  }
	};

	GenerateBondDotTypeIconData = function(bondDot) {
	  var bond, isInPortfolio;
	  bond = bondDot.bond;
	  isInPortfolio = bondDot.isInPortfolio;
	  return {
	    symbol: symbol(bond),
	    dy: deltaY(bond, isInPortfolio),
	    fontSize: fontSize(bond, isInPortfolio)
	  };
	};

	module.exports = GenerateBondDotTypeIconData;


/***/ },
/* 42 */
/***/ function(module, exports) {

	var BoxOverlap;

	BoxOverlap = function(box1, box2) {
	  return box1.right >= box2.left && box1.left <= box2.right && box1.bottom >= box2.top && box1.top <= box2.bottom;
	};

	module.exports = BoxOverlap;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var BondDotOutOfSight, GeneratePath, OutOfSightZones, d3, lodash;

	d3 = __webpack_require__(10);

	lodash = __webpack_require__(11);

	OutOfSightZones = __webpack_require__(44);

	GeneratePath = __webpack_require__(45);

	module.exports = BondDotOutOfSight = (function() {
	  function BondDotOutOfSight(boxes) {
	    var dotBox, graphBox, points, transform, zones;
	    dotBox = boxes.dotBox, graphBox = boxes.graphBox;
	    zones = OutOfSightZones(dotBox, graphBox);
	    if (zones.right && zones.top) {
	      points = [
	        {
	          x: -dotBox.width / 2,
	          y: 0
	        }, {
	          x: 0,
	          y: 0
	        }, {
	          x: 0,
	          y: dotBox.height / 2
	        }
	      ];
	      transform = graphBox.width + ",0";
	    } else if (zones.right && zones.bottom) {
	      points = [
	        {
	          x: 0,
	          y: -dotBox.height / 2
	        }, {
	          x: 0,
	          y: 0
	        }, {
	          x: -dotBox.width / 2,
	          y: 0
	        }
	      ];
	      transform = graphBox.width + "," + graphBox.height;
	    } else if (zones.left && zones.bottom) {
	      points = [
	        {
	          x: dotBox.width / 2,
	          y: 0
	        }, {
	          x: 0,
	          y: 0
	        }, {
	          x: 0,
	          y: -dotBox.height / 2
	        }
	      ];
	      transform = "0," + graphBox.height;
	    } else if (zones.left && zones.top) {
	      points = [
	        {
	          x: 0,
	          y: dotBox.height / 2
	        }, {
	          x: 0,
	          y: 0
	        }, {
	          x: dotBox.width / 2,
	          y: 0
	        }
	      ];
	      transform = "0,0";
	    } else if (zones.top || zones.bottom) {
	      points = [
	        {
	          x: 0,
	          y: 0
	        }, {
	          x: dotBox.width,
	          y: 0
	        }
	      ];
	      transform = zones.top ? dotBox.left + ",0" : dotBox.left + "," + graphBox.height;
	    } else if (zones.left || zones.right) {
	      points = [
	        {
	          x: 0,
	          y: 0
	        }, {
	          x: 0,
	          y: dotBox.height
	        }
	      ];
	      transform = zones.left ? "0," + dotBox.top : graphBox.width + "," + dotBox.top;
	    } else {
	      throw 'Dot is not out of sight: ' + JSON.stringify(dotBox);
	    }
	    lodash.assign(this, transform = "translate(" + transform + ")", {
	      d: GeneratePath(points),
	      transform: transform
	    });
	  }

	  return BondDotOutOfSight;

	})();


/***/ },
/* 44 */
/***/ function(module, exports) {

	var OutOfSightZones;

	OutOfSightZones = function(dotBox, graphBox) {
	  return {
	    left: dotBox.right < graphBox.left,
	    right: dotBox.left > graphBox.right,
	    top: dotBox.bottom < graphBox.top,
	    bottom: dotBox.top > graphBox.bottom
	  };
	};

	module.exports = OutOfSightZones;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var GeneratePath, d3, failOnBadValues, fails, path,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	d3 = __webpack_require__(10);

	fails = [
	  function(d, key, value) {
	    if (indexOf.call(value.toString(), 'e') >= 0) {
	      return "exponential value.";
	    }
	  }, function(d, key, value) {
	    if (Math.abs(value) > GeneratePath.BIG_NUMBER) {
	      return "big number (> " + GeneratePath.BIG_NUMBER + ").";
	    }
	  }, function(d, key, value) {
	    if (value === void 0 || isNaN(value)) {
	      return "NaN.";
	    }
	  }
	];

	failOnBadValues = function(keys) {
	  return function(d) {
	    return keys.every(function(key) {
	      var value;
	      value = d[key];
	      return fails.every(function(fail) {
	        var failed;
	        failed = fail(d, key, value);
	        if (failed) {
	          console.warn("GeneratePath: Please check dot:", d, "This dot won't be rendered due to", failed);
	        }
	        return !failed;
	      });
	    });
	  };
	};

	path = d3.svg.line().defined(failOnBadValues(['x', 'y'])).x(function(d) {
	  return d.x;
	}).y(function(d) {
	  return d.y;
	});

	GeneratePath = function(data, applyRegression) {
	  path.interpolate(applyRegression ? 'basis' : 'linear');
	  return path(data);
	};

	GeneratePath.BIG_NUMBER = 100000;

	module.exports = GeneratePath;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var GenerateLabelBox, GenerateLabelBoxes,
	  slice = [].slice;

	GenerateLabelBox = __webpack_require__(47);

	GenerateLabelBoxes = function() {
	  var args, types;
	  types = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	  return types.map(function(type) {
	    return GenerateLabelBox.apply(null, [type].concat(slice.call(args)));
	  });
	};

	module.exports = GenerateLabelBoxes;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Box, GenerateLabelBox, MeasureTextWidth, debugBoxOpacity;

	debugBoxOpacity = 0.05;

	MeasureTextWidth = __webpack_require__(48);

	Box = __webpack_require__(14);

	GenerateLabelBox = function(type, text, labelStyle, x, y, symbolRadius) {
	  var box, height, textHeight, textPadding, textWidth, width;
	  textWidth = MeasureTextWidth(text, labelStyle);
	  textHeight = labelStyle.textHeight;
	  textPadding = labelStyle.textPadding;
	  width = textWidth + textPadding;
	  height = textHeight + textPadding;
	  switch (type) {
	    case 'right':
	      box = new Box({
	        left: x + symbolRadius,
	        top: y - height / 2,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(0, 0, 200, " + debugBoxOpacity + ")";
	      break;
	    case 'left':
	      box = new Box({
	        left: x - symbolRadius - width,
	        top: y - height / 2,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(150, 0, 0, " + debugBoxOpacity + ")";
	      break;
	    case 'top':
	      box = new Box({
	        left: x - width / 2,
	        top: y - height / 2,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(0, 100, 0, " + debugBoxOpacity + ")";
	      break;
	    case 'bottom':
	      box = new Box({
	        left: x - width / 2,
	        top: y + symbolRadius,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(0, 80, 40, " + debugBoxOpacity + ")";
	      break;
	    case 'top-left':
	      box = new Box({
	        left: x - symbolRadius - textPadding / 2,
	        top: y - symbolRadius - height,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(20, 90, 0, " + debugBoxOpacity + ")";
	      break;
	    case 'bottom-left':
	      box = new Box({
	        left: x - symbolRadius - textPadding / 2,
	        top: y + symbolRadius,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(10, 80, 30, " + debugBoxOpacity + ")";
	      break;
	    case 'start-after-edge':
	      box = new Box({
	        left: x - symbolRadius - textPadding / 2,
	        top: y - symbolRadius - height,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(20, 90, 0, " + debugBoxOpacity + ")";
	      break;
	    case 'start-before-edge':
	      box = new Box({
	        left: x - symbolRadius - textPadding / 2,
	        top: y + symbolRadius,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(10, 80, 30, " + debugBoxOpacity + ")";
	      break;
	    case 'end-after-edge':
	      box = new Box({
	        left: x - symbolRadius - width + textPadding / 2,
	        top: y - symbolRadius - height,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(20, 90, 0, " + debugBoxOpacity + ")";
	      break;
	    case 'end-before-edge':
	      box = new Box({
	        left: x - symbolRadius - width + textPadding / 2,
	        top: y + symbolRadius,
	        width: width,
	        height: height
	      });
	      box.debugFill = "rgba(10, 80, 30, " + debugBoxOpacity + ")";
	      break;
	    default:
	      box = new Box({
	        left: 0,
	        top: 0,
	        width: 0,
	        height: 0
	      });
	      box.debugFill = '';
	  }
	  box.type = type;
	  return box;
	};

	module.exports = GenerateLabelBox;


/***/ },
/* 48 */
/***/ function(module, exports) {

	var MeasureTextWidth, canvas, ctx;

	canvas = document.createElement('canvas');

	ctx = canvas.getContext('2d');

	MeasureTextWidth = function(text, arg) {
	  var fontFamily, fontSize, fontWeight, width;
	  fontSize = arg.fontSize, fontFamily = arg.fontFamily, fontWeight = arg.fontWeight;
	  ctx.font = [fontWeight, fontSize, fontFamily].filter(Boolean).join(' ');
	  width = ctx.measureText(text).width;
	  return Math.round(width);
	};

	module.exports = MeasureTextWidth;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var BoxOverlapsBox, BoxWithinBox, FirstOf, SelectLabelBox, boxNotIntersectsOthers, selectNonEmpty;

	FirstOf = __webpack_require__(50);

	BoxWithinBox = __webpack_require__(51);

	BoxOverlapsBox = __webpack_require__(42);

	boxNotIntersectsOthers = function(labelBox, otherBoxes) {
	  return otherBoxes.every(function(box) {
	    return !BoxOverlapsBox(box, labelBox);
	  });
	};

	selectNonEmpty = function(arrays) {
	  return arrays.reduce(function(a, b) {
	    if (a.length > 0) {
	      return a;
	    }
	    return b;
	  });
	};

	SelectLabelBox = function(labelBoxes, otherBoxes, graphBox) {
	  var boxesWithinGraph, goodBoxes, hidden, labelBox;
	  boxesWithinGraph = labelBoxes.filter(function(labelBox) {
	    return BoxWithinBox(labelBox, graphBox);
	  });
	  goodBoxes = boxesWithinGraph.filter(function(labelBox) {
	    return boxNotIntersectsOthers(labelBox, otherBoxes);
	  });
	  labelBox = FirstOf(selectNonEmpty([goodBoxes, boxesWithinGraph, labelBoxes]));
	  hidden = goodBoxes.length === 0;
	  return {
	    labelBox: labelBox,
	    hidden: hidden
	  };
	};

	module.exports = SelectLabelBox;


/***/ },
/* 50 */
/***/ function(module, exports) {

	var FirstOf;

	FirstOf = function(array) {
	  if (!array) {
	    return;
	  }
	  return array[0];
	};

	module.exports = FirstOf;


/***/ },
/* 51 */
/***/ function(module, exports) {

	var BoxWithinBox;

	BoxWithinBox = function(box, outerBox) {
	  return box.left >= outerBox.left && box.right <= outerBox.right && box.bottom <= outerBox.bottom && box.top >= outerBox.top;
	};

	module.exports = BoxWithinBox;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var GenerateLabel, MeasureTextWidth;

	MeasureTextWidth = __webpack_require__(48);

	GenerateLabel = function(arg) {
	  var backgroundColor, box, hidden, labelStyle, text, textColor, textWidth;
	  text = arg.text, labelStyle = arg.labelStyle, box = arg.box, hidden = arg.hidden, textColor = arg.textColor, backgroundColor = arg.backgroundColor;
	  textWidth = MeasureTextWidth(text, labelStyle);
	  return {
	    hidden: hidden,
	    x: box.left,
	    y: box.top,
	    text: {
	      string: text,
	      color: textColor,
	      style: labelStyle,
	      dx: labelStyle.textPadding / 2,
	      dy: labelStyle.textPadding / 2 - 1
	    },
	    back: {
	      width: textWidth + labelStyle.textPadding,
	      height: labelStyle.textHeight + labelStyle.textPadding,
	      backgroundColor: backgroundColor,
	      r: labelStyle.cornerRadius || labelStyle.textPadding
	    }
	  };
	};

	module.exports = GenerateLabel;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var MergeColors, d3;

	d3 = __webpack_require__(10);

	MergeColors = function(color, background, opacity) {
	  return d3.scale.linear().range([background, color])(opacity);
	};

	module.exports = MergeColors;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var BondDot, Label, Not, React,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	React = __webpack_require__(1);

	BondDot = __webpack_require__(55);

	Label = __webpack_require__(57);

	Not = __webpack_require__(59);

	module.exports = function(arg) {
	  var basicDots, chartId, dots, highlightedDots, hoverDot, isOpaque, pureDots, ref, renderLabel, result, selectedDot, tonedDots;
	  chartId = arg.chartId;
	  ref = this, dots = ref.dots, highlightedDots = ref.highlightedDots, hoverDot = ref.hoverDot, selectedDot = ref.selectedDot;
	  isOpaque = function(d) {
	    return d.opacity === 1;
	  };
	  basicDots = dots.filter(function(dot) {
	    return [indexOf.call(highlightedDots, dot) < 0, dot !== hoverDot, dot !== selectedDot].every(Boolean);
	  });
	  pureDots = basicDots.filter(isOpaque);
	  tonedDots = basicDots.filter(Not(isOpaque));
	  renderLabel = function(dot) {
	    var alternative, date, isin, label, onClick, onMouseEnter, onMouseLeave;
	    isin = dot.isin, date = dot.date, label = dot.label, alternative = dot.alternative;
	    onClick = function() {
	      return dot.onClick();
	    };
	    onMouseEnter = function() {
	      return dot.onMouseEnter();
	    };
	    onMouseLeave = function() {
	      return dot.onMouseLeave();
	    };
	    return React.createElement("g", {
	      "key": isin + '-' + date + '-' + alternative.style,
	      "onClick": onClick,
	      "onMouseEnter": onMouseEnter,
	      "onMouseLeave": onMouseLeave
	    }, React.createElement(Label, {
	      "label": label
	    }));
	  };
	  result = [
	    {
	      type: 'tonedDotsSets',
	      zIndex: 'toned dot',
	      render: React.createElement("g", null, tonedDots.map(function(dot) {
	        return React.createElement(BondDot, {
	          "key": dot.isin + '-' + dot.date + '-' + dot.alternative.style,
	          "dot": dot
	        });
	      }))
	    }, {
	      type: 'tonedDotsLabels',
	      zIndex: 'toned dot label',
	      render: React.createElement("g", null, tonedDots.map(renderLabel))
	    }, {
	      type: 'pureDotsSets',
	      zIndex: 'dot',
	      render: React.createElement("g", null, pureDots.map(function(dot) {
	        return React.createElement(BondDot, {
	          "key": dot.isin + '-' + dot.date + '-' + dot.alternative.style,
	          "dot": dot
	        });
	      }))
	    }, {
	      type: 'pureDotsLabels',
	      zIndex: 'dot label',
	      render: React.createElement("g", null, pureDots.map(renderLabel))
	    }, {
	      type: 'dotsDefs',
	      zIndex: 'defs',
	      group: 'back',
	      render: React.createElement("g", null, React.createElement("defs", null, React.createElement("pattern", {
	        "id": chartId + ".checkers-pattern",
	        "width": "1",
	        "height": "1",
	        "patternUnits": "userSpaceOnUse",
	        "patternTransform": "scale(4)"
	      }, React.createElement("rect", {
	        "x": "0",
	        "y": "0",
	        "width": ".5",
	        "height": ".5",
	        "fill": "#fff"
	      }), React.createElement("rect", {
	        "x": ".5",
	        "y": ".5",
	        "width": ".5",
	        "height": ".5",
	        "fill": "#fff"
	      })), React.createElement("mask", {
	        "id": chartId + ".checkers-mask"
	      }, React.createElement("rect", {
	        "x": "-100%",
	        "y": "-100%",
	        "width": "200%",
	        "height": "200%",
	        "fill": "url(#" + chartId + ".checkers-pattern)"
	      })), React.createElement("pattern", {
	        "id": chartId + ".diagonal-pattern",
	        "width": "1",
	        "height": "1",
	        "patternUnits": "userSpaceOnUse",
	        "patternTransform": "rotate(45 0 0)scale(3)"
	      }, React.createElement("rect", {
	        "fill": "#fff",
	        "width": ".55",
	        "height": "1"
	      })), React.createElement("mask", {
	        "id": chartId + ".diagonal-mask"
	      }, React.createElement("rect", {
	        "x": "-100%",
	        "y": "-100%",
	        "width": "200%",
	        "height": "200%",
	        "fill": "url(#" + chartId + ".diagonal-pattern)"
	      })), React.createElement("filter", {
	        "id": chartId + ".drop-shadow",
	        "x": "-100%",
	        "y": "-100%",
	        "width": "300%",
	        "height": "300%"
	      }, React.createElement("feGaussianBlur", {
	        "result": "blurOut",
	        "in": "SourceGraphic",
	        "stdDeviation": "5"
	      }), React.createElement("feMerge", null, React.createElement("feMergeNode", {
	        "in": "blurOut"
	      }), React.createElement("feMergeNode", {
	        "in": "blurOut"
	      }), React.createElement("feMergeNode", {
	        "in": "blurOut"
	      }), React.createElement("feMergeNode", {
	        "in": "blurOut"
	      }), React.createElement("feMergeNode", {
	        "in": "SourceGraphic"
	      })))), React.createElement("g", null, React.createElement("rect", {
	        "mask": "url(#" + chartId + ".checkers-mask)",
	        "x": "-1000",
	        "y": "-1000",
	        "width": "10",
	        "height": "10"
	      }), React.createElement("rect", {
	        "mask": "url(#" + chartId + ".diagonal-mask)",
	        "x": "-1000",
	        "y": "-1000",
	        "width": "10",
	        "height": "10"
	      })))
	    }
	  ];
	  highlightedDots = highlightedDots.filter(function(dot) {
	    return dot !== hoverDot && dot !== selectedDot;
	  });
	  if (highlightedDots) {
	    result.push({
	      type: 'dotsSetsHighlight',
	      zIndex: 'highlighted dot',
	      render: highlightedDots.map(function(dot) {
	        return React.createElement(BondDot, {
	          "key": dot.isin + '-' + dot.date + '-' + dot.alternative.style,
	          "dot": dot
	        });
	      })
	    });
	    result.push({
	      type: 'highlightDotLabel',
	      zIndex: 'highlighted dot label',
	      render: highlightedDots.map(renderLabel)
	    });
	  }
	  if (hoverDot) {
	    result.push({
	      type: 'dotsSetsHover',
	      zIndex: 'hovered dot',
	      render: React.createElement(BondDot, {
	        "dot": hoverDot
	      })
	    });
	    result.push({
	      type: 'hoverDotLabel',
	      zIndex: 'hovered dot label',
	      render: renderLabel(hoverDot)
	    });
	  }
	  if (selectedDot) {
	    result.push({
	      type: 'dotsSetsSelected',
	      zIndex: 'selected dot',
	      render: React.createElement(BondDot, {
	        "dot": selectedDot
	      })
	    });
	    result.push({
	      type: 'selectedDotLabel',
	      zIndex: 'selected dot label',
	      render: renderLabel(selectedDot)
	    });
	  }
	  return result;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var BondDot, React, ReactDOM;

	React = __webpack_require__(1);

	ReactDOM = __webpack_require__(2);

	BondDot = React.createClass({
	  propTypes: {
	    dot: React.PropTypes.object.isRequired
	  },
	  preventZoomDrag: function() {
	    var node;
	    node = ReactDOM.findDOMNode(this);
	    return node.addEventListener('mousedown', function(event) {
	      return event.stopPropagation();
	    });
	  },
	  componentDidMount: function() {
	    return this.preventZoomDrag();
	  },
	  render: __webpack_require__(56)
	});

	module.exports = BondDot;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var React, d3, hiddenStyle, typeIconStyle, visibleStyle;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	hiddenStyle = {
	  display: 'none'
	};

	visibleStyle = {};

	typeIconStyle = {
	  textAnchor: 'middle',
	  dominantBaseline: 'middle'
	};

	module.exports = function() {
	  var backgroundColor, bg, chartId, color, d, dot, dotStyle, dotTransform, fillColor, inSightStyle, isOutOfSight, isin, margin, mask, onClick, onMouseEnter, onMouseLeave, outOfSight, outOfSightG, outOfSightStyle, rgbaBg, strokeColor, typeIconColor, typeIconData, x, y, yTranslate;
	  dot = this.props.dot;
	  isin = dot.isin, d = dot.d, color = dot.color, backgroundColor = dot.backgroundColor, typeIconData = dot.typeIconData, isOutOfSight = dot.isOutOfSight, margin = dot.margin, outOfSight = dot.outOfSight, x = dot.x, y = dot.y, chartId = dot.chartId;
	  onClick = function() {
	    return dot.onClick();
	  };
	  onMouseEnter = function() {
	    return dot.onMouseEnter();
	  };
	  onMouseLeave = function() {
	    return dot.onMouseLeave();
	  };
	  yTranslate = y - margin;
	  dotTransform = "translate(" + x + ", " + yTranslate + ")";
	  if (isOutOfSight && outOfSight) {
	    inSightStyle = hiddenStyle;
	    outOfSightStyle = visibleStyle;
	    outOfSightG = React.createElement("g", {
	      "className": "dot-out-of-sight",
	      "style": outOfSightStyle,
	      "transform": outOfSight.transform
	    }, React.createElement("path", {
	      "d": outOfSight.d,
	      "fill": color,
	      "stroke": color,
	      "strokeWidth": 4
	    }));
	  } else {
	    inSightStyle = visibleStyle;
	    outOfSightStyle = hiddenStyle;
	    outOfSightG = null;
	  }
	  dotStyle = dot.isHighlighted ? {
	    filter: "url(#" + chartId + ".drop-shadow)"
	  } : dot.isSelected ? {
	    stroke: dot.label.text.color
	  } : {};
	  typeIconColor = dot.alternative.style === 'empty' ? color : backgroundColor;
	  strokeColor = dot.alternative.style === 'empty' ? color : backgroundColor;
	  bg = d3.rgb(backgroundColor);
	  rgbaBg = "rgba(" + bg.r + ", " + bg.g + ", " + bg.b + ", " + 0.5 + ")";
	  fillColor = dot.alternative.style === 'empty' ? rgbaBg : color;
	  mask = (function() {
	    switch (dot.alternative.style) {
	      case 'checkers':
	        return "url(#" + chartId + ".checkers-mask)";
	      case 'diagonal':
	        return "url(#" + chartId + ".diagonal-mask)";
	      default:
	        return null;
	    }
	  })();
	  return React.createElement("g", {
	    "className": "dot",
	    "data-isin": isin
	  }, React.createElement("g", {
	    "className": "dot-in-sight",
	    "style": inSightStyle,
	    "onClick": onClick,
	    "onMouseEnter": onMouseEnter,
	    "onMouseLeave": onMouseLeave
	  }, React.createElement("g", {
	    "transform": dotTransform
	  }, React.createElement("path", {
	    "d": d,
	    "fill": fillColor,
	    "stroke": strokeColor,
	    "strokeWidth": 1,
	    "style": dotStyle,
	    "mask": mask
	  }), React.createElement("text", {
	    "className": "bond-type-icon",
	    "style": typeIconStyle,
	    "fill": strokeColor,
	    "dy": typeIconData.dy,
	    "fontSize": typeIconData.fontSize
	  }, typeIconData.symbol))), outOfSightG);
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var FilterBackgroundColor, FirstOf, React, d3, hiddenStyle, visibleStyle;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	FirstOf = __webpack_require__(50);

	FilterBackgroundColor = __webpack_require__(58);

	hiddenStyle = {
	  display: 'none'
	};

	visibleStyle = {};

	module.exports = function(arg) {
	  var back, bg, fontFamily, fontSize, fontWeight, hidden, i, label, labelStyle, ref, rgbaBg, separator, styleGenerator, text, transform, tspan, tspans, x, y;
	  label = arg.label;
	  x = label.x, y = label.y, back = label.back, text = label.text, hidden = label.hidden;
	  transform = "translate(" + x + ", " + y + ")";
	  labelStyle = hidden ? hiddenStyle : visibleStyle;
	  ref = text.style, fontSize = ref.fontSize, fontFamily = ref.fontFamily, fontWeight = ref.fontWeight, separator = ref.separator;
	  styleGenerator = function(c) {
	    return {
	      fontSize: fontSize,
	      fontFamily: fontFamily,
	      fontWeight: fontWeight,
	      fill: c,
	      dominantBaseline: 'text-before-edge',
	      cursor: 'default'
	    };
	  };
	  text.color = FilterBackgroundColor(back.backgroundColor)(text.color);
	  if (text.color instanceof Array) {
	    tspans = text.color.map(function(c, i) {
	      return {
	        style: styleGenerator(c),
	        text: text.string.split(separator)[i]
	      };
	    });
	    tspans.splice(1, 0, {
	      style: styleGenerator(text.style.color),
	      text: separator
	    });
	  } else {
	    tspans = [
	      {
	        style: styleGenerator(text.color),
	        text: text.string
	      }
	    ];
	  }
	  bg = d3.rgb(back.backgroundColor);
	  rgbaBg = "rgba(" + bg.r + ", " + bg.g + ", " + bg.b + ", " + text.style.opacity + ")";
	  return React.createElement("g", {
	    "className": "label",
	    "transform": transform,
	    "style": labelStyle
	  }, React.createElement("rect", {
	    "fill": rgbaBg,
	    "width": back.width,
	    "height": back.height,
	    "rx": back.r,
	    "ry": back.r
	  }), React.createElement("text", {
	    "dx": text.dx,
	    "dy": text.dy
	  }, (function() {
	    var j, len, results;
	    results = [];
	    for (i = j = 0, len = tspans.length; j < len; i = ++j) {
	      tspan = tspans[i];
	      results.push(React.createElement("tspan", {
	        "key": i,
	        "style": tspan.style
	      }, tspan.text));
	    }
	    return results;
	  })()));
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var FilterBackgroundColor, FirstOf, Not, d3;

	d3 = __webpack_require__(10);

	FirstOf = __webpack_require__(50);

	Not = __webpack_require__(59);

	FilterBackgroundColor = function(backgroundColor) {
	  var isBackgroundColor;
	  isBackgroundColor = function(c) {
	    var s1, s2;
	    s1 = d3.rgb(c).toString();
	    s2 = d3.rgb(backgroundColor).toString();
	    return s1 === s2;
	  };
	  return function(color) {
	    var haveToFilter;
	    haveToFilter = color instanceof Array && color.some(isBackgroundColor);
	    if (haveToFilter) {
	      color = FirstOf(color.filter(Not(isBackgroundColor)));
	    }
	    return color;
	  };
	};

	module.exports = FilterBackgroundColor;


/***/ },
/* 59 */
/***/ function(module, exports) {

	var Not,
	  slice = [].slice;

	Not = function(fn) {
	  return function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return !fn.apply(null, args);
	  };
	};

	module.exports = Not;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var BondsCurvesFactory, CheckBondData, CurvesPlugin, Plugin, RegressCurve, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	lodash = __webpack_require__(11);

	Plugin = __webpack_require__(32);

	BondsCurvesFactory = __webpack_require__(61);

	CheckBondData = __webpack_require__(34);

	RegressCurve = __webpack_require__(70);

	module.exports = CurvesPlugin = (function(superClass) {
	  extend(CurvesPlugin, superClass);

	  function CurvesPlugin() {
	    return CurvesPlugin.__super__.constructor.apply(this, arguments);
	  }

	  CurvesPlugin.prototype.getPropsKeys = function() {
	    return ['curves'];
	  };

	  CurvesPlugin.prototype.build = function(arg) {
	    var applyLocalRegression, applyRegression, axes, bonds, buildData, color, curve, curves, date, extrapolation, isins, label, legendHeader, legendId, legendIndex, localRegressionBandwidth, opacity, regression, showsLegend, speculation, width;
	    buildData = arg.buildData, axes = arg.axes, localRegressionBandwidth = arg.localRegressionBandwidth;
	    curves = this.props.curves;
	    this.builtCurves = (function() {
	      var i, len, results;
	      results = [];
	      for (i = 0, len = curves.length; i < len; i++) {
	        curve = curves[i];
	        applyLocalRegression = curve.applyLocalRegression, applyRegression = curve.applyRegression, regression = curve.regression, date = curve.date, isins = curve.isins, color = curve.color, opacity = curve.opacity, label = curve.label, width = curve.width, extrapolation = curve.extrapolation, speculation = curve.speculation, legendId = curve.legendId, showsLegend = curve.showsLegend, legendIndex = curve.legendIndex, legendHeader = curve.legendHeader;
	        if (opacity === void 0) {
	          opacity = 1;
	        }
	        bonds = isins.map(function(isin) {
	          return buildData(isin + '@' + date);
	        }).filter(function(bond) {
	          return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	        });
	        bonds = RegressCurve({
	          bonds: bonds,
	          axes: axes,
	          applyLocalRegression: applyLocalRegression,
	          applyRegression: applyRegression,
	          localRegressionBandwidth: localRegressionBandwidth,
	          regression: regression
	        });
	        results.push({
	          date: date,
	          isins: isins,
	          color: color,
	          opacity: opacity,
	          label: label,
	          width: width,
	          bonds: bonds,
	          applyRegression: applyRegression || applyLocalRegression,
	          extrapolation: extrapolation,
	          speculation: speculation,
	          legendId: legendId,
	          showsLegend: showsLegend,
	          legendIndex: legendIndex,
	          legendHeader: legendHeader
	        });
	      }
	      return results;
	    })();
	  };

	  CurvesPlugin.prototype.getBondsLists = function() {
	    return this.builtCurves.map(function(curve) {
	      return curve.bonds;
	    });
	  };

	  CurvesPlugin.prototype.willRender = function(arg, arg1) {
	    var axes, backgroundColor, bondToDot, boxes, curve, curveDoc, curvesFactory, curvesLabels, graphBox, i, labelStyle, legends, len, ref, ref1, samples, zoomedXScale;
	    labelStyle = arg.labelStyle, backgroundColor = arg.backgroundColor, axes = arg.axes;
	    bondToDot = arg1.bondToDot, boxes = arg1.boxes, curvesLabels = arg1.curvesLabels, zoomedXScale = arg1.zoomedXScale, graphBox = arg1.graphBox;
	    this.curves = [];
	    curvesFactory = new BondsCurvesFactory({
	      labelStyle: labelStyle,
	      backgroundColor: backgroundColor,
	      curvesLabels: curvesLabels,
	      builtCurves: this.builtCurves,
	      graphBox: graphBox,
	      boxes: boxes
	    });
	    ref = this.builtCurves;
	    for (i = 0, len = ref.length; i < len; i++) {
	      curve = ref[i];
	      if (curve.bonds.length === 0) {
	        continue;
	      }
	      curveDoc = curvesFactory.buildCurve({
	        curve: curve,
	        bondToDot: bondToDot,
	        xExtent: zoomedXScale.domain(),
	        axes: axes
	      });
	      this.curves.push(curveDoc);
	      if (curveDoc.labelBox) {
	        boxes.push(curveDoc.labelBox);
	      }
	    }
	    ref1 = curvesFactory.placeLegends(this.curves), legends = ref1.legends, samples = ref1.samples;
	    this.legends = legends;
	    this.samples = samples;
	  };

	  CurvesPlugin.prototype.render = __webpack_require__(75);

	  return CurvesPlugin;

	})(Plugin);


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var BondsCurvesFactory, Box, CalculateSampleWidth, FirstOf, GenerateLabel, GenerateLabelBox, GenerateLegend, GeneratePath, GenerateSampleForLabel, GetDominatingRating, GetE11nDot, LastOf, MergeColors, RatingColorGenerator, SelectLabelBox, WrapBoxes, d3, fontWeightScale, getYLocation, lodash, placeLabel;

	lodash = __webpack_require__(11);

	d3 = __webpack_require__(10);

	FirstOf = __webpack_require__(50);

	LastOf = __webpack_require__(29);

	MergeColors = __webpack_require__(53);

	GeneratePath = __webpack_require__(45);

	GetDominatingRating = __webpack_require__(62);

	GetE11nDot = __webpack_require__(63);

	RatingColorGenerator = __webpack_require__(65);

	GenerateLabel = __webpack_require__(52);

	GenerateLabelBox = __webpack_require__(47);

	SelectLabelBox = __webpack_require__(49);

	WrapBoxes = __webpack_require__(66);

	GenerateLegend = __webpack_require__(67);

	GenerateSampleForLabel = __webpack_require__(68);

	CalculateSampleWidth = __webpack_require__(69);

	Box = __webpack_require__(14);

	getYLocation = function(labelDot, directionDot) {
	  if (directionDot.y > labelDot.y) {
	    return 'after';
	  } else {
	    return 'before';
	  }
	};

	placeLabel = function(dots, direction) {
	  var directionDot, labelDot, xLocation, yLocation;
	  if (direction === 'left') {
	    labelDot = FirstOf(dots);
	    directionDot = FirstOf(dots.slice(1));
	    xLocation = 'start';
	  } else {
	    labelDot = LastOf(dots);
	    directionDot = LastOf(dots.slice(0, dots.length - 1));
	    xLocation = 'end';
	  }
	  yLocation = getYLocation(labelDot, directionDot);
	  return {
	    xLocation: xLocation,
	    yLocation: yLocation,
	    labelDot: labelDot
	  };
	};

	fontWeightScale = d3.scale.threshold().domain([1, 3]).range([400, 500, 600]);

	module.exports = BondsCurvesFactory = (function() {
	  function BondsCurvesFactory(args) {
	    this.ratingColorGenerator = RatingColorGenerator();
	    lodash.assign(this, args);
	  }

	  BondsCurvesFactory.prototype.buildCurve = function(arg) {
	    var applyRegression, axes, backgroundColor, bondToDot, bonds, color, curve, curvesLabels, d, direction, dots, extrapolation, label, labelBox, labelDot, labelStyle, legendEnabled, legendHeader, legendId, legendIndex, opacity, ratingGroups, ref, ref1, showsLegend, speculation, width, xExtent, xLocation, yLocation;
	    curve = arg.curve, bondToDot = arg.bondToDot, xExtent = arg.xExtent, axes = arg.axes;
	    ref = this, labelStyle = ref.labelStyle, backgroundColor = ref.backgroundColor, curvesLabels = ref.curvesLabels;
	    color = curve.color, opacity = curve.opacity, width = curve.width, label = curve.label, bonds = curve.bonds, applyRegression = curve.applyRegression, extrapolation = curve.extrapolation, speculation = curve.speculation, legendId = curve.legendId, showsLegend = curve.showsLegend, legendIndex = curve.legendIndex, legendHeader = curve.legendHeader;
	    dots = bonds.map(bondToDot);
	    d = GeneratePath(dots, applyRegression);
	    if (opacity !== void 0) {
	      color = MergeColors(color, backgroundColor, opacity);
	    }
	    if (!color) {
	      console.warn('BondsCurvesFactory: Curve color is undefined, please provide it via "color" property. Using most frequent rating to calculate color.');
	      ratingGroups = lodash.map(bonds, 'ratingGroup');
	      color = this.ratingColorGenerator(GetDominatingRating(ratingGroups), curve.isins.join(''));
	    }
	    if (opacity === void 0) {
	      opacity = 1;
	    }
	    curve = {
	      d: d,
	      color: color,
	      opacity: opacity,
	      width: width,
	      backgroundColor: backgroundColor,
	      backgroundOpacity: labelStyle.opacity,
	      speculation: speculation
	    };
	    if (label && dots.length > 1) {
	      direction = curvesLabels.length % 2 === 0 ? 'left' : 'right';
	      ref1 = placeLabel(dots, direction), xLocation = ref1.xLocation, yLocation = ref1.yLocation, labelDot = ref1.labelDot;
	      legendEnabled = lodash.isNumber(legendId);
	      labelStyle = lodash.clone(labelStyle);
	      if (legendEnabled) {
	        labelStyle.opacity = 0;
	        labelStyle.fontWeight = fontWeightScale(0.9);
	      } else {
	        labelStyle.fontWeight = fontWeightScale(width);
	      }
	      labelBox = GenerateLabelBox(xLocation + "-" + yLocation + "-edge", label, labelStyle, labelDot.x, labelDot.y, 0);
	      curve.label = GenerateLabel({
	        text: label,
	        textColor: color,
	        labelStyle: labelStyle,
	        box: labelBox,
	        backgroundColor: backgroundColor
	      });
	      curve.labelBox = labelBox;
	      curve.legendId = legendId;
	      curve.showsLegend = showsLegend;
	      curve.legendIndex = legendIndex;
	      curve.legendHeader = legendHeader;
	      curve.labelLocation = {
	        x: xLocation,
	        y: yLocation,
	        dot: labelDot
	      };
	      curve.dots = dots;
	      curvesLabels.push(curve);
	    }
	    if (extrapolation) {
	      [
	        {
	          side: 'left',
	          dotFn: FirstOf
	        }, {
	          side: 'right',
	          dotFn: LastOf
	        }
	      ].forEach(function(arg1) {
	        var dotFn, side;
	        side = arg1.side, dotFn = arg1.dotFn;
	        if (!extrapolation[side]) {
	          return;
	        }
	        return curve[side + 'E11n'] = GeneratePath([dotFn(dots), bondToDot(GetE11nDot(side, extrapolation, bonds, xExtent, axes))], applyRegression);
	      });
	    }
	    return curve;
	  };

	  BondsCurvesFactory.prototype.placeLegends = function(curves) {
	    var backgroundColor, boxes, generateLegendBox, graphBox, groups, headerStyle, labelHeight, labelStyle, legends, oneCurve, oneLabelBox, ref, sampleWidth, samples, textHeight, textPadding;
	    curves = curves.filter(function(curve) {
	      return lodash.isNumber(curve.legendId);
	    });
	    if (curves.length === 0) {
	      return {
	        legends: [],
	        samples: []
	      };
	    }
	    ref = this, labelStyle = ref.labelStyle, backgroundColor = ref.backgroundColor, graphBox = ref.graphBox, boxes = ref.boxes;
	    textPadding = labelStyle.textPadding, textHeight = labelStyle.textHeight;
	    oneCurve = FirstOf(curves);
	    oneLabelBox = oneCurve.labelBox;
	    labelHeight = oneLabelBox.height;
	    sampleWidth = CalculateSampleWidth(labelHeight, textPadding);
	    headerStyle = lodash.clone(labelStyle);
	    headerStyle.opacity = 0;
	    headerStyle.fontWeight = fontWeightScale(2);
	    groups = lodash.groupBy(curves, 'legendId');
	    legends = [];
	    samples = [];
	    generateLegendBox = function(curveGroup) {
	      var maxWidth, possibleBoxes;
	      maxWidth = d3.max(curveGroup, function(curve) {
	        return curve.labelBox.width;
	      });
	      possibleBoxes = lodash.flatten(curveGroup.map(function(arg) {
	        var dots, labelLocations;
	        dots = arg.dots;
	        labelLocations = [placeLabel(dots, 'left'), placeLabel(dots, 'right')];
	        return labelLocations.map(function(labelLocation) {
	          var labelDot, left, yOffset;
	          labelDot = labelLocation.labelDot;
	          left = labelLocation.x === 'end' ? labelDot.x - maxWidth - sampleWidth : labelDot.x;
	          yOffset = labelLocation.y === 'after' ? -curveGroup.length * labelHeight : 0;
	          return new Box({
	            left: left,
	            top: labelDot.y + yOffset,
	            width: sampleWidth + maxWidth,
	            height: (curveGroup.length + 1) * labelHeight
	          });
	        });
	      }));
	      possibleBoxes = lodash.sortBy(possibleBoxes, 'left');
	      return SelectLabelBox(possibleBoxes, boxes, graphBox);
	    };
	    Object.keys(groups).forEach(function(key) {
	      var curveGroup, firstCurve, firstLabelBox, headerLabel, legend, legendBox, legendToned, yStep;
	      curveGroup = groups[key];
	      lodash.sortBy(curveGroup, 'legendIndex');
	      curveGroup.map(function(arg) {
	        var i, labelBox;
	        labelBox = arg.labelBox;
	        i = boxes.indexOf(labelBox);
	        if (i !== Number(i)) {
	          return;
	        }
	        boxes.splice(i, 1);
	      });
	      legendBox = generateLegendBox(curveGroup).labelBox;
	      firstCurve = FirstOf(curveGroup);
	      firstLabelBox = firstCurve.labelBox;
	      yStep = function(curve) {
	        return (curve.legendIndex + 1) * labelHeight;
	      };
	      legendToned = curveGroup.some(function(curve) {
	        return curve.opacity !== 1;
	      });
	      curveGroup.forEach(function(curve) {
	        var sample;
	        sample = GenerateSampleForLabel(textPadding, textHeight, curve)(new Box({
	          left: legendBox.left + sampleWidth,
	          top: legendBox.top + yStep(curve),
	          width: 0,
	          height: firstLabelBox.height
	        }));
	        curve.label.x = legendBox.left + sampleWidth;
	        curve.label.y = legendBox.top + yStep(curve);
	        curve.labelBox = null;
	        sample.toned = legendToned;
	        samples.push(sample);
	      });
	      headerLabel = GenerateLabel({
	        text: firstCurve.legendHeader,
	        textColor: firstCurve.color,
	        labelStyle: headerStyle,
	        box: legendBox,
	        backgroundColor: backgroundColor
	      });
	      legend = GenerateLegend({
	        labelStyle: labelStyle,
	        box: legendBox,
	        backgroundColor: backgroundColor
	      });
	      legend.label = headerLabel;
	      legend.toned = legendToned;
	      boxes.push(legendBox);
	      legends.push(legend);
	    });
	    return {
	      legends: legends,
	      samples: samples
	    };
	  };

	  return BondsCurvesFactory;

	})();


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var FirstOf, GetDominatingRating, lodash;

	lodash = __webpack_require__(11);

	FirstOf = __webpack_require__(50);

	GetDominatingRating = function(ratingGroups) {
	  var keys, ratingsCounts;
	  ratingGroups = ratingGroups.map(function(rating) {
	    return rating.replace(/[+-]/, '');
	  });
	  ratingsCounts = lodash.countBy(ratingGroups);
	  keys = Object.keys(ratingsCounts);
	  keys.sort(function(a, b) {
	    return ratingsCounts[b] - ratingsCounts[a];
	  });
	  return FirstOf(keys);
	};

	module.exports = GetDominatingRating;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var FirstOf, GetE11nDot, Interp, LastOf;

	FirstOf = __webpack_require__(50);

	LastOf = __webpack_require__(29);

	Interp = __webpack_require__(64);

	GetE11nDot = function(side, extrapolation, bonds, extent, axes) {
	  var dot, e, extremeBond, x, xValues, yValues;
	  e = extrapolation[side];
	  x = extent[side === 'left' ? 0 : 1];
	  xValues = [];
	  yValues = [];
	  dot = {};
	  if (e === true) {
	    xValues = bonds.map(function(b) {
	      return b[axes.x];
	    });
	    yValues = bonds.map(function(b) {
	      return b[axes.y];
	    });
	  } else {
	    extremeBond = side === 'left' ? FirstOf(bonds) : LastOf(bonds);
	    if (!extremeBond) {
	      return {};
	    }
	    xValues = [e[axes.x], extremeBond[axes.x]];
	    yValues = [e[axes.y], extremeBond[axes.y]];
	  }
	  dot[axes.x] = x;
	  dot[axes.y] = Interp(xValues, yValues, x);
	  return dot;
	};

	module.exports = GetE11nDot;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var Interp, d3;

	d3 = __webpack_require__(10);

	Interp = function(xValues, yValues, x) {
	  var s;
	  s = d3.scale.linear().domain(xValues).range(yValues);
	  return s(x);
	};

	module.exports = Interp;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var RatingColorGenerator, d3, ratingGroupFromRating, unknownRatingColor;

	d3 = __webpack_require__(10);

	unknownRatingColor = '#333333';

	ratingGroupFromRating = function(rating) {
	  return rating.replace(/[+-]/, '');
	};

	RatingColorGenerator = function() {
	  var ratingGroupColors;
	  ratingGroupColors = {
	    AAA: d3.scale.ordinal().range(["#61BEFA", "#509CCD", "#61DEFA", "#91D0F9", "#0EA0FE"]),
	    AA: d3.scale.ordinal().range(["#EF8537", "#FFBB00", "#B74E01", "#FF6E00"]),
	    A: d3.scale.ordinal().range(["#A63DCE", "#E805FE", "#8100FF", "#C977E8", "#690A8D"]),
	    BBB: d3.scale.ordinal().range(["#00963F", "#10D161", "#217142", "#72C018", "#149564"]),
	    BB: d3.scale.ordinal().range(["#47599D", "#3477E7", "#2915F0", "#7D8ABD", "#0671D0"]),
	    B: d3.scale.ordinal().range(["#FF6E7E", "#E93246", "#A64953", "#D05984", "#F797A2"]),
	    CCC: d3.scale.ordinal().range(["#F0C000", "#F0A300", "#C3B001"]),
	    CC: d3.scale.ordinal().range(["#CF7730", "#ECB990", "#934607", "#C29169"]),
	    C: d3.scale.ordinal().range(["#B42004", "#E92703", "#671100"]),
	    NR: d3.scale.ordinal().range(["#CCC", "#9EA3B7", "#868686", "#C8BBA4", "#AAA"])
	  };
	  return function(rating, key) {
	    var color, ratingGroup;
	    ratingGroup = ratingGroupFromRating(rating);
	    color = ratingGroupColors[ratingGroup](key);
	    return color || unknownRatingColor;
	  };
	};

	module.exports = RatingColorGenerator;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Box, WrapBoxes, d3, get;

	d3 = __webpack_require__(10);

	Box = __webpack_require__(14);

	get = function(attr) {
	  return function(object) {
	    return object[attr];
	  };
	};

	WrapBoxes = function(boxes) {
	  return new Box({
	    left: d3.min(boxes, get('left')),
	    top: d3.min(boxes, get('top')),
	    right: d3.max(boxes, get('right')),
	    bottom: d3.max(boxes, get('bottom'))
	  });
	};

	module.exports = WrapBoxes;


/***/ },
/* 67 */
/***/ function(module, exports) {

	var GenerateLegend;

	GenerateLegend = function(arg) {
	  var backgroundColor, box, labelStyle;
	  labelStyle = arg.labelStyle, box = arg.box, backgroundColor = arg.backgroundColor;
	  return {
	    x: box.left,
	    y: box.top,
	    opacity: labelStyle.opacity,
	    back: {
	      width: box.width,
	      height: box.height,
	      backgroundColor: backgroundColor,
	      r: labelStyle.cornerRadius || labelStyle.textPadding
	    }
	  };
	};

	module.exports = GenerateLegend;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var Box, CalculateSampleWidth, GeneratePath, GenerateSampleForLabel;

	GeneratePath = __webpack_require__(45);

	CalculateSampleWidth = __webpack_require__(69);

	Box = __webpack_require__(14);

	GenerateSampleForLabel = function(padding, textHeight, arg) {
	  var color, speculation, width;
	  width = arg.width, color = arg.color, speculation = arg.speculation;
	  return function(arg1) {
	    var dots, height, left, sampleWidth, size, top, y;
	    left = arg1.left, top = arg1.top;
	    size = CalculateSampleWidth(textHeight, padding);
	    y = top + textHeight - width / 2 - padding / 2;
	    sampleWidth = size + padding * 2;
	    height = padding + textHeight;
	    dots = [
	      {
	        x: left - size - padding / 2,
	        y: y
	      }, {
	        x: left - padding,
	        y: y
	      }
	    ];
	    return {
	      width: width,
	      color: color,
	      speculation: speculation,
	      d: GeneratePath(dots),
	      box: new Box({
	        left: left - sampleWidth,
	        top: top,
	        width: sampleWidth,
	        height: height
	      }),
	      actualLength: size + padding / 2
	    };
	  };
	};

	module.exports = GenerateSampleForLabel;


/***/ },
/* 69 */
/***/ function(module, exports) {

	var CalculateSampleWidth;

	CalculateSampleWidth = function(textHeight, padding) {
	  return padding + textHeight;
	};

	module.exports = CalculateSampleWidth;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var CustomRegression, LocalRegression, RegressCurve, lodash;

	lodash = __webpack_require__(11);

	LocalRegression = __webpack_require__(71);

	CustomRegression = __webpack_require__(74);

	RegressCurve = function(arg) {
	  var applyLocalRegression, applyRegression, axes, bonds, localRegressionBandwidth, regression;
	  bonds = arg.bonds, axes = arg.axes, applyLocalRegression = arg.applyLocalRegression, applyRegression = arg.applyRegression, localRegressionBandwidth = arg.localRegressionBandwidth, regression = arg.regression;
	  bonds = lodash.sortBy(bonds, axes.x);
	  if (applyLocalRegression && !applyRegression) {
	    console.warn('RegressCurve: Please use applyRegression instead of applyLocalRegression.');
	  }
	  if (applyLocalRegression || applyRegression) {
	    if (regression) {
	      bonds = CustomRegression(bonds, axes, regression);
	    } else {
	      bonds = LocalRegression(bonds, axes, localRegressionBandwidth);
	    }
	  }
	  return bonds;
	};

	module.exports = RegressCurve;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var LocalRegression, lodash, loess, science;

	lodash = __webpack_require__(11);

	science = __webpack_require__(72);

	loess = science.stats.loess();

	LocalRegression = function(bonds, axes, bandwidth) {
	  var e, loessValues, xValues, yValues;
	  loess.bandwidth(bandwidth);
	  xValues = lodash.map(bonds, axes.x);
	  yValues = lodash.map(bonds, axes.y);
	  try {
	    if (bonds.length === 0) {
	      return [];
	    }
	    loessValues = loess(xValues, yValues);
	    bonds = bonds.map(function(bond, i) {
	      bond = lodash.clone(bond);
	      bond[axes.y] = loessValues[i];
	      return bond;
	    });
	  } catch (error) {
	    e = error;
	    console.error('local regression computation error', e);
	  }
	  return bonds;
	};

	module.exports = LocalRegression;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73);


/***/ },
/* 73 */
/***/ function(module, exports) {

	var science;
	(function(exports){
	science = {version: "1.9.3"}; // semver
	science.ascending = function(a, b) {
	  return a - b;
	};
	// Euler's constant.
	science.EULER = .5772156649015329;
	// Compute exp(x) - 1 accurately for small x.
	science.expm1 = function(x) {
	  return (x < 1e-5 && x > -1e-5) ? x + .5 * x * x : Math.exp(x) - 1;
	};
	science.functor = function(v) {
	  return typeof v === "function" ? v : function() { return v; };
	};
	// Based on:
	// http://www.johndcook.com/blog/2010/06/02/whats-so-hard-about-finding-a-hypotenuse/
	science.hypot = function(x, y) {
	  x = Math.abs(x);
	  y = Math.abs(y);
	  var max,
	      min;
	  if (x > y) { max = x; min = y; }
	  else       { max = y; min = x; }
	  var r = min / max;
	  return max * Math.sqrt(1 + r * r);
	};
	science.quadratic = function() {
	  var complex = false;

	  function quadratic(a, b, c) {
	    var d = b * b - 4 * a * c;
	    if (d > 0) {
	      d = Math.sqrt(d) / (2 * a);
	      return complex
	        ? [{r: -b - d, i: 0}, {r: -b + d, i: 0}]
	        : [-b - d, -b + d];
	    } else if (d === 0) {
	      d = -b / (2 * a);
	      return complex ? [{r: d, i: 0}] : [d];
	    } else {
	      if (complex) {
	        d = Math.sqrt(-d) / (2 * a);
	        return [
	          {r: -b, i: -d},
	          {r: -b, i: d}
	        ];
	      }
	      return [];
	    }
	  }

	  quadratic.complex = function(x) {
	    if (!arguments.length) return complex;
	    complex = x;
	    return quadratic;
	  };

	  return quadratic;
	};
	// Constructs a multi-dimensional array filled with zeroes.
	science.zeroes = function(n) {
	  var i = -1,
	      a = [];
	  if (arguments.length === 1)
	    while (++i < n)
	      a[i] = 0;
	  else
	    while (++i < n)
	      a[i] = science.zeroes.apply(
	        this, Array.prototype.slice.call(arguments, 1));
	  return a;
	};
	})(this);
	(function(exports){
	science.lin = {};
	science.lin.decompose = function() {

	  function decompose(A) {
	    var n = A.length, // column dimension
	        V = [],
	        d = [],
	        e = [];

	    for (var i = 0; i < n; i++) {
	      V[i] = [];
	      d[i] = [];
	      e[i] = [];
	    }

	    var symmetric = true;
	    for (var j = 0; j < n; j++) {
	      for (var i = 0; i < n; i++) {
	        if (A[i][j] !== A[j][i]) {
	          symmetric = false;
	          break;
	        }
	      }
	    }

	    if (symmetric) {
	      for (var i = 0; i < n; i++) V[i] = A[i].slice();

	      // Tridiagonalize.
	      science_lin_decomposeTred2(d, e, V);

	      // Diagonalize.
	      science_lin_decomposeTql2(d, e, V);
	    } else {
	      var H = [];
	      for (var i = 0; i < n; i++) H[i] = A[i].slice();

	      // Reduce to Hessenberg form.
	      science_lin_decomposeOrthes(H, V);

	      // Reduce Hessenberg to real Schur form.
	      science_lin_decomposeHqr2(d, e, H, V);
	    }

	    var D = [];
	    for (var i = 0; i < n; i++) {
	      var row = D[i] = [];
	      for (var j = 0; j < n; j++) row[j] = i === j ? d[i] : 0;
	      D[i][e[i] > 0 ? i + 1 : i - 1] = e[i];
	    }
	    return {D: D, V: V};
	  }

	  return decompose;
	};

	// Symmetric Householder reduction to tridiagonal form.
	function science_lin_decomposeTred2(d, e, V) {
	  // This is derived from the Algol procedures tred2 by
	  // Bowdler, Martin, Reinsch, and Wilkinson, Handbook for
	  // Auto. Comp., Vol.ii-Linear Algebra, and the corresponding
	  // Fortran subroutine in EISPACK.

	  var n = V.length;

	  for (var j = 0; j < n; j++) d[j] = V[n - 1][j];

	  // Householder reduction to tridiagonal form.
	  for (var i = n - 1; i > 0; i--) {
	    // Scale to avoid under/overflow.

	    var scale = 0,
	        h = 0;
	    for (var k = 0; k < i; k++) scale += Math.abs(d[k]);
	    if (scale === 0) {
	      e[i] = d[i - 1];
	      for (var j = 0; j < i; j++) {
	        d[j] = V[i - 1][j];
	        V[i][j] = 0;
	        V[j][i] = 0;
	      }
	    } else {
	      // Generate Householder vector.
	      for (var k = 0; k < i; k++) {
	        d[k] /= scale;
	        h += d[k] * d[k];
	      }
	      var f = d[i - 1];
	      var g = Math.sqrt(h);
	      if (f > 0) g = -g;
	      e[i] = scale * g;
	      h = h - f * g;
	      d[i - 1] = f - g;
	      for (var j = 0; j < i; j++) e[j] = 0;

	      // Apply similarity transformation to remaining columns.

	      for (var j = 0; j < i; j++) {
	        f = d[j];
	        V[j][i] = f;
	        g = e[j] + V[j][j] * f;
	        for (var k = j+1; k <= i - 1; k++) {
	          g += V[k][j] * d[k];
	          e[k] += V[k][j] * f;
	        }
	        e[j] = g;
	      }
	      f = 0;
	      for (var j = 0; j < i; j++) {
	        e[j] /= h;
	        f += e[j] * d[j];
	      }
	      var hh = f / (h + h);
	      for (var j = 0; j < i; j++) e[j] -= hh * d[j];
	      for (var j = 0; j < i; j++) {
	        f = d[j];
	        g = e[j];
	        for (var k = j; k <= i - 1; k++) V[k][j] -= (f * e[k] + g * d[k]);
	        d[j] = V[i - 1][j];
	        V[i][j] = 0;
	      }
	    }
	    d[i] = h;
	  }

	  // Accumulate transformations.
	  for (var i = 0; i < n - 1; i++) {
	    V[n - 1][i] = V[i][i];
	    V[i][i] = 1.0;
	    var h = d[i + 1];
	    if (h != 0) {
	      for (var k = 0; k <= i; k++) d[k] = V[k][i + 1] / h;
	      for (var j = 0; j <= i; j++) {
	        var g = 0;
	        for (var k = 0; k <= i; k++) g += V[k][i + 1] * V[k][j];
	        for (var k = 0; k <= i; k++) V[k][j] -= g * d[k];
	      }
	    }
	    for (var k = 0; k <= i; k++) V[k][i + 1] = 0;
	  }
	  for (var j = 0; j < n; j++) {
	    d[j] = V[n - 1][j];
	    V[n - 1][j] = 0;
	  }
	  V[n - 1][n - 1] = 1;
	  e[0] = 0;
	}

	// Symmetric tridiagonal QL algorithm.
	function science_lin_decomposeTql2(d, e, V) {
	  // This is derived from the Algol procedures tql2, by
	  // Bowdler, Martin, Reinsch, and Wilkinson, Handbook for
	  // Auto. Comp., Vol.ii-Linear Algebra, and the corresponding
	  // Fortran subroutine in EISPACK.

	  var n = V.length;

	  for (var i = 1; i < n; i++) e[i - 1] = e[i];
	  e[n - 1] = 0;

	  var f = 0;
	  var tst1 = 0;
	  var eps = 1e-12;
	  for (var l = 0; l < n; l++) {
	    // Find small subdiagonal element
	    tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	    var m = l;
	    while (m < n) {
	      if (Math.abs(e[m]) <= eps*tst1) { break; }
	      m++;
	    }

	    // If m == l, d[l] is an eigenvalue,
	    // otherwise, iterate.
	    if (m > l) {
	      var iter = 0;
	      do {
	        iter++;  // (Could check iteration count here.)

	        // Compute implicit shift
	        var g = d[l];
	        var p = (d[l + 1] - g) / (2 * e[l]);
	        var r = science.hypot(p, 1);
	        if (p < 0) r = -r;
	        d[l] = e[l] / (p + r);
	        d[l + 1] = e[l] * (p + r);
	        var dl1 = d[l + 1];
	        var h = g - d[l];
	        for (var i = l+2; i < n; i++) d[i] -= h;
	        f += h;

	        // Implicit QL transformation.
	        p = d[m];
	        var c = 1;
	        var c2 = c;
	        var c3 = c;
	        var el1 = e[l + 1];
	        var s = 0;
	        var s2 = 0;
	        for (var i = m - 1; i >= l; i--) {
	          c3 = c2;
	          c2 = c;
	          s2 = s;
	          g = c * e[i];
	          h = c * p;
	          r = science.hypot(p,e[i]);
	          e[i + 1] = s * r;
	          s = e[i] / r;
	          c = p / r;
	          p = c * d[i] - s * g;
	          d[i + 1] = h + s * (c * g + s * d[i]);

	          // Accumulate transformation.
	          for (var k = 0; k < n; k++) {
	            h = V[k][i + 1];
	            V[k][i + 1] = s * V[k][i] + c * h;
	            V[k][i] = c * V[k][i] - s * h;
	          }
	        }
	        p = -s * s2 * c3 * el1 * e[l] / dl1;
	        e[l] = s * p;
	        d[l] = c * p;

	        // Check for convergence.
	      } while (Math.abs(e[l]) > eps*tst1);
	    }
	    d[l] = d[l] + f;
	    e[l] = 0;
	  }

	  // Sort eigenvalues and corresponding vectors.
	  for (var i = 0; i < n - 1; i++) {
	    var k = i;
	    var p = d[i];
	    for (var j = i + 1; j < n; j++) {
	      if (d[j] < p) {
	        k = j;
	        p = d[j];
	      }
	    }
	    if (k != i) {
	      d[k] = d[i];
	      d[i] = p;
	      for (var j = 0; j < n; j++) {
	        p = V[j][i];
	        V[j][i] = V[j][k];
	        V[j][k] = p;
	      }
	    }
	  }
	}

	// Nonsymmetric reduction to Hessenberg form.
	function science_lin_decomposeOrthes(H, V) {
	  // This is derived from the Algol procedures orthes and ortran,
	  // by Martin and Wilkinson, Handbook for Auto. Comp.,
	  // Vol.ii-Linear Algebra, and the corresponding
	  // Fortran subroutines in EISPACK.

	  var n = H.length;
	  var ort = [];

	  var low = 0;
	  var high = n - 1;

	  for (var m = low + 1; m < high; m++) {
	    // Scale column.
	    var scale = 0;
	    for (var i = m; i <= high; i++) scale += Math.abs(H[i][m - 1]);

	    if (scale !== 0) {
	      // Compute Householder transformation.
	      var h = 0;
	      for (var i = high; i >= m; i--) {
	        ort[i] = H[i][m - 1] / scale;
	        h += ort[i] * ort[i];
	      }
	      var g = Math.sqrt(h);
	      if (ort[m] > 0) g = -g;
	      h = h - ort[m] * g;
	      ort[m] = ort[m] - g;

	      // Apply Householder similarity transformation
	      // H = (I-u*u'/h)*H*(I-u*u')/h)
	      for (var j = m; j < n; j++) {
	        var f = 0;
	        for (var i = high; i >= m; i--) f += ort[i] * H[i][j];
	        f /= h;
	        for (var i = m; i <= high; i++) H[i][j] -= f * ort[i];
	      }

	      for (var i = 0; i <= high; i++) {
	        var f = 0;
	        for (var j = high; j >= m; j--) f += ort[j] * H[i][j];
	        f /= h;
	        for (var j = m; j <= high; j++) H[i][j] -= f * ort[j];
	      }
	      ort[m] = scale * ort[m];
	      H[m][m - 1] = scale * g;
	    }
	  }

	  // Accumulate transformations (Algol's ortran).
	  for (var i = 0; i < n; i++) {
	    for (var j = 0; j < n; j++) V[i][j] = i === j ? 1 : 0;
	  }

	  for (var m = high-1; m >= low+1; m--) {
	    if (H[m][m - 1] !== 0) {
	      for (var i = m + 1; i <= high; i++) ort[i] = H[i][m - 1];
	      for (var j = m; j <= high; j++) {
	        var g = 0;
	        for (var i = m; i <= high; i++) g += ort[i] * V[i][j];
	        // Double division avoids possible underflow
	        g = (g / ort[m]) / H[m][m - 1];
	        for (var i = m; i <= high; i++) V[i][j] += g * ort[i];
	      }
	    }
	  }
	}

	// Nonsymmetric reduction from Hessenberg to real Schur form.
	function science_lin_decomposeHqr2(d, e, H, V) {
	  // This is derived from the Algol procedure hqr2,
	  // by Martin and Wilkinson, Handbook for Auto. Comp.,
	  // Vol.ii-Linear Algebra, and the corresponding
	  // Fortran subroutine in EISPACK.

	  var nn = H.length,
	      n = nn - 1,
	      low = 0,
	      high = nn - 1,
	      eps = 1e-12,
	      exshift = 0,
	      p = 0,
	      q = 0,
	      r = 0,
	      s = 0,
	      z = 0,
	      t,
	      w,
	      x,
	      y;

	  // Store roots isolated by balanc and compute matrix norm
	  var norm = 0;
	  for (var i = 0; i < nn; i++) {
	    if (i < low || i > high) {
	      d[i] = H[i][i];
	      e[i] = 0;
	    }
	    for (var j = Math.max(i - 1, 0); j < nn; j++) norm += Math.abs(H[i][j]);
	  }

	  // Outer loop over eigenvalue index
	  var iter = 0;
	  while (n >= low) {
	    // Look for single small sub-diagonal element
	    var l = n;
	    while (l > low) {
	      s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	      if (s === 0) s = norm;
	      if (Math.abs(H[l][l - 1]) < eps * s) break;
	      l--;
	    }

	    // Check for convergence
	    // One root found
	    if (l === n) {
	      H[n][n] = H[n][n] + exshift;
	      d[n] = H[n][n];
	      e[n] = 0;
	      n--;
	      iter = 0;

	    // Two roots found
	    } else if (l === n - 1) {
	      w = H[n][n - 1] * H[n - 1][n];
	      p = (H[n - 1][n - 1] - H[n][n]) / 2;
	      q = p * p + w;
	      z = Math.sqrt(Math.abs(q));
	      H[n][n] = H[n][n] + exshift;
	      H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	      x = H[n][n];

	      // Real pair
	      if (q >= 0) {
	        z = p + (p >= 0 ? z : -z);
	        d[n - 1] = x + z;
	        d[n] = d[n - 1];
	        if (z !== 0) d[n] = x - w / z;
	        e[n - 1] = 0;
	        e[n] = 0;
	        x = H[n][n - 1];
	        s = Math.abs(x) + Math.abs(z);
	        p = x / s;
	        q = z / s;
	        r = Math.sqrt(p * p+q * q);
	        p /= r;
	        q /= r;

	        // Row modification
	        for (var j = n - 1; j < nn; j++) {
	          z = H[n - 1][j];
	          H[n - 1][j] = q * z + p * H[n][j];
	          H[n][j] = q * H[n][j] - p * z;
	        }

	        // Column modification
	        for (var i = 0; i <= n; i++) {
	          z = H[i][n - 1];
	          H[i][n - 1] = q * z + p * H[i][n];
	          H[i][n] = q * H[i][n] - p * z;
	        }

	        // Accumulate transformations
	        for (var i = low; i <= high; i++) {
	          z = V[i][n - 1];
	          V[i][n - 1] = q * z + p * V[i][n];
	          V[i][n] = q * V[i][n] - p * z;
	        }

	        // Complex pair
	      } else {
	        d[n - 1] = x + p;
	        d[n] = x + p;
	        e[n - 1] = z;
	        e[n] = -z;
	      }
	      n = n - 2;
	      iter = 0;

	      // No convergence yet
	    } else {

	      // Form shift
	      x = H[n][n];
	      y = 0;
	      w = 0;
	      if (l < n) {
	        y = H[n - 1][n - 1];
	        w = H[n][n - 1] * H[n - 1][n];
	      }

	      // Wilkinson's original ad hoc shift
	      if (iter == 10) {
	        exshift += x;
	        for (var i = low; i <= n; i++) {
	          H[i][i] -= x;
	        }
	        s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n-2]);
	        x = y = 0.75 * s;
	        w = -0.4375 * s * s;
	      }

	      // MATLAB's new ad hoc shift
	      if (iter == 30) {
	        s = (y - x) / 2.0;
	        s = s * s + w;
	        if (s > 0) {
	          s = Math.sqrt(s);
	          if (y < x) {
	            s = -s;
	          }
	          s = x - w / ((y - x) / 2.0 + s);
	          for (var i = low; i <= n; i++) {
	            H[i][i] -= s;
	          }
	          exshift += s;
	          x = y = w = 0.964;
	        }
	      }

	      iter++;   // (Could check iteration count here.)

	      // Look for two consecutive small sub-diagonal elements
	      var m = n-2;
	      while (m >= l) {
	        z = H[m][m];
	        r = x - z;
	        s = y - z;
	        p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	        q = H[m + 1][m + 1] - z - r - s;
	        r = H[m+2][m + 1];
	        s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	        p = p / s;
	        q = q / s;
	        r = r / s;
	        if (m == l) break;
	        if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) <
	          eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) +
	          Math.abs(H[m + 1][m + 1])))) {
	            break;
	        }
	        m--;
	      }

	      for (var i = m+2; i <= n; i++) {
	        H[i][i-2] = 0;
	        if (i > m+2) H[i][i-3] = 0;
	      }

	      // Double QR step involving rows l:n and columns m:n
	      for (var k = m; k <= n - 1; k++) {
	        var notlast = (k != n - 1);
	        if (k != m) {
	          p = H[k][k - 1];
	          q = H[k + 1][k - 1];
	          r = (notlast ? H[k + 2][k - 1] : 0);
	          x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	          if (x != 0) {
	            p /= x;
	            q /= x;
	            r /= x;
	          }
	        }
	        if (x == 0) break;
	        s = Math.sqrt(p * p + q * q + r * r);
	        if (p < 0) { s = -s; }
	        if (s != 0) {
	          if (k != m) H[k][k - 1] = -s * x;
	          else if (l != m) H[k][k - 1] = -H[k][k - 1];
	          p += s;
	          x = p / s;
	          y = q / s;
	          z = r / s;
	          q /= p;
	          r /= p;

	          // Row modification
	          for (var j = k; j < nn; j++) {
	            p = H[k][j] + q * H[k + 1][j];
	            if (notlast) {
	              p = p + r * H[k + 2][j];
	              H[k + 2][j] = H[k + 2][j] - p * z;
	            }
	            H[k][j] = H[k][j] - p * x;
	            H[k + 1][j] = H[k + 1][j] - p * y;
	          }

	          // Column modification
	          for (var i = 0; i <= Math.min(n, k + 3); i++) {
	            p = x * H[i][k] + y * H[i][k + 1];
	            if (notlast) {
	              p += z * H[i][k + 2];
	              H[i][k + 2] = H[i][k + 2] - p * r;
	            }
	            H[i][k] = H[i][k] - p;
	            H[i][k + 1] = H[i][k + 1] - p * q;
	          }

	          // Accumulate transformations
	          for (var i = low; i <= high; i++) {
	            p = x * V[i][k] + y * V[i][k + 1];
	            if (notlast) {
	              p = p + z * V[i][k + 2];
	              V[i][k + 2] = V[i][k + 2] - p * r;
	            }
	            V[i][k] = V[i][k] - p;
	            V[i][k + 1] = V[i][k + 1] - p * q;
	          }
	        }  // (s != 0)
	      }  // k loop
	    }  // check convergence
	  }  // while (n >= low)

	  // Backsubstitute to find vectors of upper triangular form
	  if (norm == 0) { return; }

	  for (n = nn - 1; n >= 0; n--) {
	    p = d[n];
	    q = e[n];

	    // Real vector
	    if (q == 0) {
	      var l = n;
	      H[n][n] = 1.0;
	      for (var i = n - 1; i >= 0; i--) {
	        w = H[i][i] - p;
	        r = 0;
	        for (var j = l; j <= n; j++) { r = r + H[i][j] * H[j][n]; }
	        if (e[i] < 0) {
	          z = w;
	          s = r;
	        } else {
	          l = i;
	          if (e[i] === 0) {
	            H[i][n] = -r / (w !== 0 ? w : eps * norm);
	          } else {
	            // Solve real equations
	            x = H[i][i + 1];
	            y = H[i + 1][i];
	            q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	            t = (x * s - z * r) / q;
	            H[i][n] = t;
	            if (Math.abs(x) > Math.abs(z)) {
	              H[i + 1][n] = (-r - w * t) / x;
	            } else {
	              H[i + 1][n] = (-s - y * t) / z;
	            }
	          }

	          // Overflow control
	          t = Math.abs(H[i][n]);
	          if ((eps * t) * t > 1) {
	            for (var j = i; j <= n; j++) H[j][n] = H[j][n] / t;
	          }
	        }
	      }
	    // Complex vector
	    } else if (q < 0) {
	      var l = n - 1;

	      // Last vector component imaginary so matrix is triangular
	      if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	        H[n - 1][n - 1] = q / H[n][n - 1];
	        H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	      } else {
	        var zz = science_lin_decomposeCdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	        H[n - 1][n - 1] = zz[0];
	        H[n - 1][n] = zz[1];
	      }
	      H[n][n - 1] = 0;
	      H[n][n] = 1;
	      for (var i = n-2; i >= 0; i--) {
	        var ra = 0,
	            sa = 0,
	            vr,
	            vi;
	        for (var j = l; j <= n; j++) {
	          ra = ra + H[i][j] * H[j][n - 1];
	          sa = sa + H[i][j] * H[j][n];
	        }
	        w = H[i][i] - p;

	        if (e[i] < 0) {
	          z = w;
	          r = ra;
	          s = sa;
	        } else {
	          l = i;
	          if (e[i] == 0) {
	            var zz = science_lin_decomposeCdiv(-ra,-sa,w,q);
	            H[i][n - 1] = zz[0];
	            H[i][n] = zz[1];
	          } else {
	            // Solve complex equations
	            x = H[i][i + 1];
	            y = H[i + 1][i];
	            vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	            vi = (d[i] - p) * 2.0 * q;
	            if (vr == 0 & vi == 0) {
	              vr = eps * norm * (Math.abs(w) + Math.abs(q) +
	                Math.abs(x) + Math.abs(y) + Math.abs(z));
	            }
	            var zz = science_lin_decomposeCdiv(x*r-z*ra+q*sa,x*s-z*sa-q*ra,vr,vi);
	            H[i][n - 1] = zz[0];
	            H[i][n] = zz[1];
	            if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	              H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	              H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	            } else {
	              var zz = science_lin_decomposeCdiv(-r-y*H[i][n - 1],-s-y*H[i][n],z,q);
	              H[i + 1][n - 1] = zz[0];
	              H[i + 1][n] = zz[1];
	            }
	          }

	          // Overflow control
	          t = Math.max(Math.abs(H[i][n - 1]),Math.abs(H[i][n]));
	          if ((eps * t) * t > 1) {
	            for (var j = i; j <= n; j++) {
	              H[j][n - 1] = H[j][n - 1] / t;
	              H[j][n] = H[j][n] / t;
	            }
	          }
	        }
	      }
	    }
	  }

	  // Vectors of isolated roots
	  for (var i = 0; i < nn; i++) {
	    if (i < low || i > high) {
	      for (var j = i; j < nn; j++) V[i][j] = H[i][j];
	    }
	  }

	  // Back transformation to get eigenvectors of original matrix
	  for (var j = nn - 1; j >= low; j--) {
	    for (var i = low; i <= high; i++) {
	      z = 0;
	      for (var k = low; k <= Math.min(j, high); k++) z += V[i][k] * H[k][j];
	      V[i][j] = z;
	    }
	  }
	}

	// Complex scalar division.
	function science_lin_decomposeCdiv(xr, xi, yr, yi) {
	  if (Math.abs(yr) > Math.abs(yi)) {
	    var r = yi / yr,
	        d = yr + r * yi;
	    return [(xr + r * xi) / d, (xi - r * xr) / d];
	  } else {
	    var r = yr / yi,
	        d = yi + r * yr;
	    return [(r * xr + xi) / d, (r * xi - xr) / d];
	  }
	}
	science.lin.cross = function(a, b) {
	  // TODO how to handle non-3D vectors?
	  // TODO handle 7D vectors?
	  return [
	    a[1] * b[2] - a[2] * b[1],
	    a[2] * b[0] - a[0] * b[2],
	    a[0] * b[1] - a[1] * b[0]
	  ];
	};
	science.lin.dot = function(a, b) {
	  var s = 0,
	      i = -1,
	      n = Math.min(a.length, b.length);
	  while (++i < n) s += a[i] * b[i];
	  return s;
	};
	science.lin.length = function(p) {
	  return Math.sqrt(science.lin.dot(p, p));
	};
	science.lin.normalize = function(p) {
	  var length = science.lin.length(p);
	  return p.map(function(d) { return d / length; });
	};
	// 4x4 matrix determinant.
	science.lin.determinant = function(matrix) {
	  var m = matrix[0].concat(matrix[1]).concat(matrix[2]).concat(matrix[3]);
	  return (
	    m[12] * m[9]  * m[6]  * m[3]  - m[8] * m[13] * m[6]  * m[3]  -
	    m[12] * m[5]  * m[10] * m[3]  + m[4] * m[13] * m[10] * m[3]  +
	    m[8]  * m[5]  * m[14] * m[3]  - m[4] * m[9]  * m[14] * m[3]  -
	    m[12] * m[9]  * m[2]  * m[7]  + m[8] * m[13] * m[2]  * m[7]  +
	    m[12] * m[1]  * m[10] * m[7]  - m[0] * m[13] * m[10] * m[7]  -
	    m[8]  * m[1]  * m[14] * m[7]  + m[0] * m[9]  * m[14] * m[7]  +
	    m[12] * m[5]  * m[2]  * m[11] - m[4] * m[13] * m[2]  * m[11] -
	    m[12] * m[1]  * m[6]  * m[11] + m[0] * m[13] * m[6]  * m[11] +
	    m[4]  * m[1]  * m[14] * m[11] - m[0] * m[5]  * m[14] * m[11] -
	    m[8]  * m[5]  * m[2]  * m[15] + m[4] * m[9]  * m[2]  * m[15] +
	    m[8]  * m[1]  * m[6]  * m[15] - m[0] * m[9]  * m[6]  * m[15] -
	    m[4]  * m[1]  * m[10] * m[15] + m[0] * m[5]  * m[10] * m[15]);
	};
	// Performs in-place Gauss-Jordan elimination.
	//
	// Based on Jarno Elonen's Python version (public domain):
	// http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
	science.lin.gaussjordan = function(m, eps) {
	  if (!eps) eps = 1e-10;

	  var h = m.length,
	      w = m[0].length,
	      y = -1,
	      y2,
	      x;

	  while (++y < h) {
	    var maxrow = y;

	    // Find max pivot.
	    y2 = y; while (++y2 < h) {
	      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
	        maxrow = y2;
	    }

	    // Swap.
	    var tmp = m[y];
	    m[y] = m[maxrow];
	    m[maxrow] = tmp;

	    // Singular?
	    if (Math.abs(m[y][y]) <= eps) return false;

	    // Eliminate column y.
	    y2 = y; while (++y2 < h) {
	      var c = m[y2][y] / m[y][y];
	      x = y - 1; while (++x < w) {
	        m[y2][x] -= m[y][x] * c;
	      }
	    }
	  }

	  // Backsubstitute.
	  y = h; while (--y >= 0) {
	    var c = m[y][y];
	    y2 = -1; while (++y2 < y) {
	      x = w; while (--x >= y) {
	        m[y2][x] -=  m[y][x] * m[y2][y] / c;
	      }
	    }
	    m[y][y] /= c;
	    // Normalize row y.
	    x = h - 1; while (++x < w) {
	      m[y][x] /= c;
	    }
	  }
	  return true;
	};
	// Find matrix inverse using Gauss-Jordan.
	science.lin.inverse = function(m) {
	  var n = m.length,
	      i = -1;

	  // Check if the matrix is square.
	  if (n !== m[0].length) return;

	  // Augment with identity matrix I to get AI.
	  m = m.map(function(row, i) {
	    var identity = new Array(n),
	        j = -1;
	    while (++j < n) identity[j] = i === j ? 1 : 0;
	    return row.concat(identity);
	  });

	  // Compute IA^-1.
	  science.lin.gaussjordan(m);

	  // Remove identity matrix I to get A^-1.
	  while (++i < n) {
	    m[i] = m[i].slice(n);
	  }

	  return m;
	};
	science.lin.multiply = function(a, b) {
	  var m = a.length,
	      n = b[0].length,
	      p = b.length,
	      i = -1,
	      j,
	      k;
	  if (p !== a[0].length) throw {"error": "columns(a) != rows(b); " + a[0].length + " != " + p};
	  var ab = new Array(m);
	  while (++i < m) {
	    ab[i] = new Array(n);
	    j = -1; while(++j < n) {
	      var s = 0;
	      k = -1; while (++k < p) s += a[i][k] * b[k][j];
	      ab[i][j] = s;
	    }
	  }
	  return ab;
	};
	science.lin.transpose = function(a) {
	  var m = a.length,
	      n = a[0].length,
	      i = -1,
	      j,
	      b = new Array(n);
	  while (++i < n) {
	    b[i] = new Array(m);
	    j = -1; while (++j < m) b[i][j] = a[j][i];
	  }
	  return b;
	};
	/**
	 * Solves tridiagonal systems of linear equations.
	 *
	 * Source: http://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm
	 *
	 * @param {number[]} a
	 * @param {number[]} b
	 * @param {number[]} c
	 * @param {number[]} d
	 * @param {number[]} x
	 * @param {number} n
	 */
	science.lin.tridag = function(a, b, c, d, x, n) {
	  var i,
	      m;
	  for (i = 1; i < n; i++) {
	    m = a[i] / b[i - 1];
	    b[i] -= m * c[i - 1];
	    d[i] -= m * d[i - 1];
	  }
	  x[n - 1] = d[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; i--) {
	    x[i] = (d[i] - c[i] * x[i + 1]) / b[i];
	  }
	};
	})(this);
	(function(exports){
	science.stats = {};
	// Bandwidth selectors for Gaussian kernels.
	// Based on R's implementations in `stats.bw`.
	science.stats.bandwidth = {

	  // Silverman, B. W. (1986) Density Estimation. London: Chapman and Hall.
	  nrd0: function(x) {
	    var hi = Math.sqrt(science.stats.variance(x));
	    var lo;
	    if (!(lo = Math.min(hi, science.stats.iqr(x) / 1.34)))
	      (lo = hi) || (lo = Math.abs(x[1])) || (lo = 1);
	    return .9 * lo * Math.pow(x.length, -.2);
	  },

	  // Scott, D. W. (1992) Multivariate Density Estimation: Theory, Practice, and
	  // Visualization. Wiley.
	  nrd: function(x) {
	    var h = science.stats.iqr(x) / 1.34;
	    return 1.06 * Math.min(Math.sqrt(science.stats.variance(x)), h)
	      * Math.pow(x.length, -1/5);
	  }
	};
	science.stats.distance = {
	  euclidean: function(a, b) {
	    var n = a.length,
	        i = -1,
	        s = 0,
	        x;
	    while (++i < n) {
	      x = a[i] - b[i];
	      s += x * x;
	    }
	    return Math.sqrt(s);
	  },
	  manhattan: function(a, b) {
	    var n = a.length,
	        i = -1,
	        s = 0;
	    while (++i < n) s += Math.abs(a[i] - b[i]);
	    return s;
	  },
	  minkowski: function(p) {
	    return function(a, b) {
	      var n = a.length,
	          i = -1,
	          s = 0;
	      while (++i < n) s += Math.pow(Math.abs(a[i] - b[i]), p);
	      return Math.pow(s, 1 / p);
	    };
	  },
	  chebyshev: function(a, b) {
	    var n = a.length,
	        i = -1,
	        max = 0,
	        x;
	    while (++i < n) {
	      x = Math.abs(a[i] - b[i]);
	      if (x > max) max = x;
	    }
	    return max;
	  },
	  hamming: function(a, b) {
	    var n = a.length,
	        i = -1,
	        d = 0;
	    while (++i < n) if (a[i] !== b[i]) d++;
	    return d;
	  },
	  jaccard: function(a, b) {
	    var n = a.length,
	        i = -1,
	        s = 0;
	    while (++i < n) if (a[i] === b[i]) s++;
	    return s / n;
	  },
	  braycurtis: function(a, b) {
	    var n = a.length,
	        i = -1,
	        s0 = 0,
	        s1 = 0,
	        ai,
	        bi;
	    while (++i < n) {
	      ai = a[i];
	      bi = b[i];
	      s0 += Math.abs(ai - bi);
	      s1 += Math.abs(ai + bi);
	    }
	    return s0 / s1;
	  }
	};
	// Based on implementation in http://picomath.org/.
	science.stats.erf = function(x) {
	  var a1 =  0.254829592,
	      a2 = -0.284496736,
	      a3 =  1.421413741,
	      a4 = -1.453152027,
	      a5 =  1.061405429,
	      p  =  0.3275911;

	  // Save the sign of x
	  var sign = x < 0 ? -1 : 1;
	  if (x < 0) {
	    sign = -1;
	    x = -x;
	  }

	  // A&S formula 7.1.26
	  var t = 1 / (1 + p * x);
	  return sign * (
	    1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1)
	    * t * Math.exp(-x * x));
	};
	science.stats.phi = function(x) {
	  return .5 * (1 + science.stats.erf(x / Math.SQRT2));
	};
	// See <http://en.wikipedia.org/wiki/Kernel_(statistics)>.
	science.stats.kernel = {
	  uniform: function(u) {
	    if (u <= 1 && u >= -1) return .5;
	    return 0;
	  },
	  triangular: function(u) {
	    if (u <= 1 && u >= -1) return 1 - Math.abs(u);
	    return 0;
	  },
	  epanechnikov: function(u) {
	    if (u <= 1 && u >= -1) return .75 * (1 - u * u);
	    return 0;
	  },
	  quartic: function(u) {
	    if (u <= 1 && u >= -1) {
	      var tmp = 1 - u * u;
	      return (15 / 16) * tmp * tmp;
	    }
	    return 0;
	  },
	  triweight: function(u) {
	    if (u <= 1 && u >= -1) {
	      var tmp = 1 - u * u;
	      return (35 / 32) * tmp * tmp * tmp;
	    }
	    return 0;
	  },
	  gaussian: function(u) {
	    return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * u * u);
	  },
	  cosine: function(u) {
	    if (u <= 1 && u >= -1) return Math.PI / 4 * Math.cos(Math.PI / 2 * u);
	    return 0;
	  }
	};
	// http://exploringdata.net/den_trac.htm
	science.stats.kde = function() {
	  var kernel = science.stats.kernel.gaussian,
	      sample = [],
	      bandwidth = science.stats.bandwidth.nrd;

	  function kde(points, i) {
	    var bw = bandwidth.call(this, sample);
	    return points.map(function(x) {
	      var i = -1,
	          y = 0,
	          n = sample.length;
	      while (++i < n) {
	        y += kernel((x - sample[i]) / bw);
	      }
	      return [x, y / bw / n];
	    });
	  }

	  kde.kernel = function(x) {
	    if (!arguments.length) return kernel;
	    kernel = x;
	    return kde;
	  };

	  kde.sample = function(x) {
	    if (!arguments.length) return sample;
	    sample = x;
	    return kde;
	  };

	  kde.bandwidth = function(x) {
	    if (!arguments.length) return bandwidth;
	    bandwidth = science.functor(x);
	    return kde;
	  };

	  return kde;
	};
	// Based on figue implementation by Jean-Yves Delort.
	// http://code.google.com/p/figue/
	science.stats.kmeans = function() {
	  var distance = science.stats.distance.euclidean,
	      maxIterations = 1000,
	      k = 1;

	  function kmeans(vectors) {
	    var n = vectors.length,
	        assignments = [],
	        clusterSizes = [],
	        repeat = 1,
	        iterations = 0,
	        centroids = science_stats_kmeansRandom(k, vectors),
	        newCentroids,
	        i,
	        j,
	        x,
	        d,
	        min,
	        best;

	    while (repeat && iterations < maxIterations) {
	      // Assignment step.
	      j = -1; while (++j < k) {
	        clusterSizes[j] = 0;
	      }

	      i = -1; while (++i < n) {
	        x = vectors[i];
	        min = Infinity;
	        j = -1; while (++j < k) {
	          d = distance.call(this, centroids[j], x);
	          if (d < min) {
	            min = d;
	            best = j;
	          }
	        }
	        clusterSizes[assignments[i] = best]++;
	      }

	      // Update centroids step.
	      newCentroids = [];
	      i = -1; while (++i < n) {
	        x = assignments[i];
	        d = newCentroids[x];
	        if (d == null) newCentroids[x] = vectors[i].slice();
	        else {
	          j = -1; while (++j < d.length) {
	            d[j] += vectors[i][j];
	          }
	        }
	      }
	      j = -1; while (++j < k) {
	        x = newCentroids[j];
	        d = 1 / clusterSizes[j];
	        i = -1; while (++i < x.length) x[i] *= d;
	      }

	      // Check convergence.
	      repeat = 0;
	      j = -1; while (++j < k) {
	        if (!science_stats_kmeansCompare(newCentroids[j], centroids[j])) {
	          repeat = 1;
	          break;
	        }
	      }
	      centroids = newCentroids;
	      iterations++;
	    }
	    return {assignments: assignments, centroids: centroids};
	  }

	  kmeans.k = function(x) {
	    if (!arguments.length) return k;
	    k = x;
	    return kmeans;
	  };

	  kmeans.distance = function(x) {
	    if (!arguments.length) return distance;
	    distance = x;
	    return kmeans;
	  };

	  return kmeans;
	};

	function science_stats_kmeansCompare(a, b) {
	  if (!a || !b || a.length !== b.length) return false;
	  var n = a.length,
	      i = -1;
	  while (++i < n) if (a[i] !== b[i]) return false;
	  return true;
	}

	// Returns an array of k distinct vectors randomly selected from the input
	// array of vectors. Returns null if k > n or if there are less than k distinct
	// objects in vectors.
	function science_stats_kmeansRandom(k, vectors) {
	  var n = vectors.length;
	  if (k > n) return null;
	  
	  var selected_vectors = [];
	  var selected_indices = [];
	  var tested_indices = {};
	  var tested = 0;
	  var selected = 0;
	  var i,
	      vector,
	      select;

	  while (selected < k) {
	    if (tested === n) return null;
	    
	    var random_index = Math.floor(Math.random() * n);
	    if (random_index in tested_indices) continue;
	    
	    tested_indices[random_index] = 1;
	    tested++;
	    vector = vectors[random_index];
	    select = true;
	    for (i = 0; i < selected; i++) {
	      if (science_stats_kmeansCompare(vector, selected_vectors[i])) {
	        select = false;
	        break;
	      }
	    }
	    if (select) {
	      selected_vectors[selected] = vector;
	      selected_indices[selected] = random_index;
	      selected++;
	    }
	  }
	  return selected_vectors;
	}
	science.stats.hcluster = function() {
	  var distance = science.stats.distance.euclidean,
	      linkage = "single"; // single, complete or average

	  function hcluster(vectors) {
	    var n = vectors.length,
	        dMin = [],
	        cSize = [],
	        distMatrix = [],
	        clusters = [],
	        c1,
	        c2,
	        c1Cluster,
	        c2Cluster,
	        p,
	        root,
	        i,
	        j;

	    // Initialise distance matrix and vector of closest clusters.
	    i = -1; while (++i < n) {
	      dMin[i] = 0;
	      distMatrix[i] = [];
	      j = -1; while (++j < n) {
	        distMatrix[i][j] = i === j ? Infinity : distance(vectors[i] , vectors[j]);
	        if (distMatrix[i][dMin[i]] > distMatrix[i][j]) dMin[i] = j;
	      }
	    }

	    // create leaves of the tree
	    i = -1; while (++i < n) {
	      clusters[i] = [];
	      clusters[i][0] = {
	        left: null,
	        right: null,
	        dist: 0,
	        centroid: vectors[i],
	        size: 1,
	        depth: 0
	      };
	      cSize[i] = 1;
	    }

	    // Main loop
	    for (p = 0; p < n-1; p++) {
	      // find the closest pair of clusters
	      c1 = 0;
	      for (i = 0; i < n; i++) {
	        if (distMatrix[i][dMin[i]] < distMatrix[c1][dMin[c1]]) c1 = i;
	      }
	      c2 = dMin[c1];

	      // create node to store cluster info 
	      c1Cluster = clusters[c1][0];
	      c2Cluster = clusters[c2][0];

	      var newCluster = {
	        left: c1Cluster,
	        right: c2Cluster,
	        dist: distMatrix[c1][c2],
	        centroid: calculateCentroid(c1Cluster.size, c1Cluster.centroid,
	          c2Cluster.size, c2Cluster.centroid),
	        size: c1Cluster.size + c2Cluster.size,
	        depth: 1 + Math.max(c1Cluster.depth, c2Cluster.depth)
	      };
	      clusters[c1].splice(0, 0, newCluster);
	      cSize[c1] += cSize[c2];

	      // overwrite row c1 with respect to the linkage type
	      for (j = 0; j < n; j++) {
	        switch (linkage) {
	          case "single":
	            if (distMatrix[c1][j] > distMatrix[c2][j])
	              distMatrix[j][c1] = distMatrix[c1][j] = distMatrix[c2][j];
	            break;
	          case "complete":
	            if (distMatrix[c1][j] < distMatrix[c2][j])
	              distMatrix[j][c1] = distMatrix[c1][j] = distMatrix[c2][j];
	            break;
	          case "average":
	            distMatrix[j][c1] = distMatrix[c1][j] = (cSize[c1] * distMatrix[c1][j] + cSize[c2] * distMatrix[c2][j]) / (cSize[c1] + cSize[j]);
	            break;
	        }
	      }
	      distMatrix[c1][c1] = Infinity;

	      // infinity ­out old row c2 and column c2
	      for (i = 0; i < n; i++)
	        distMatrix[i][c2] = distMatrix[c2][i] = Infinity;

	      // update dmin and replace ones that previous pointed to c2 to point to c1
	      for (j = 0; j < n; j++) {
	        if (dMin[j] == c2) dMin[j] = c1;
	        if (distMatrix[c1][j] < distMatrix[c1][dMin[c1]]) dMin[c1] = j;
	      }

	      // keep track of the last added cluster
	      root = newCluster;
	    }

	    return root;
	  }

	  hcluster.distance = function(x) {
	    if (!arguments.length) return distance;
	    distance = x;
	    return hcluster;
	  };

	  return hcluster;
	};

	function calculateCentroid(c1Size, c1Centroid, c2Size, c2Centroid) {
	  var newCentroid = [],
	      newSize = c1Size + c2Size,
	      n = c1Centroid.length,
	      i = -1;
	  while (++i < n) {
	    newCentroid[i] = (c1Size * c1Centroid[i] + c2Size * c2Centroid[i]) / newSize;
	  }
	  return newCentroid;
	}
	science.stats.iqr = function(x) {
	  var quartiles = science.stats.quantiles(x, [.25, .75]);
	  return quartiles[1] - quartiles[0];
	};
	// Based on org.apache.commons.math.analysis.interpolation.LoessInterpolator
	// from http://commons.apache.org/math/
	science.stats.loess = function() {
	  var bandwidth = .3,
	      robustnessIters = 2,
	      accuracy = 1e-12;

	  function smooth(xval, yval, weights) {
	    var n = xval.length,
	        i;

	    if (n !== yval.length) throw {error: "Mismatched array lengths"};
	    if (n == 0) throw {error: "At least one point required."};

	    if (arguments.length < 3) {
	      weights = [];
	      i = -1; while (++i < n) weights[i] = 1;
	    }

	    science_stats_loessFiniteReal(xval);
	    science_stats_loessFiniteReal(yval);
	    science_stats_loessFiniteReal(weights);
	    science_stats_loessStrictlyIncreasing(xval);

	    if (n == 1) return [yval[0]];
	    if (n == 2) return [yval[0], yval[1]];

	    var bandwidthInPoints = Math.floor(bandwidth * n);

	    if (bandwidthInPoints < 2) throw {error: "Bandwidth too small."};

	    var res = [],
	        residuals = [],
	        robustnessWeights = [];

	    // Do an initial fit and 'robustnessIters' robustness iterations.
	    // This is equivalent to doing 'robustnessIters+1' robustness iterations
	    // starting with all robustness weights set to 1.
	    i = -1; while (++i < n) {
	      res[i] = 0;
	      residuals[i] = 0;
	      robustnessWeights[i] = 1;
	    }

	    var iter = -1;
	    while (++iter <= robustnessIters) {
	      var bandwidthInterval = [0, bandwidthInPoints - 1];
	      // At each x, compute a local weighted linear regression
	      var x;
	      i = -1; while (++i < n) {
	        x = xval[i];

	        // Find out the interval of source points on which
	        // a regression is to be made.
	        if (i > 0) {
	          science_stats_loessUpdateBandwidthInterval(xval, weights, i, bandwidthInterval);
	        }

	        var ileft = bandwidthInterval[0],
	            iright = bandwidthInterval[1];

	        // Compute the point of the bandwidth interval that is
	        // farthest from x
	        var edge = (xval[i] - xval[ileft]) > (xval[iright] - xval[i]) ? ileft : iright;

	        // Compute a least-squares linear fit weighted by
	        // the product of robustness weights and the tricube
	        // weight function.
	        // See http://en.wikipedia.org/wiki/Linear_regression
	        // (section "Univariate linear case")
	        // and http://en.wikipedia.org/wiki/Weighted_least_squares
	        // (section "Weighted least squares")
	        var sumWeights = 0,
	            sumX = 0,
	            sumXSquared = 0,
	            sumY = 0,
	            sumXY = 0,
	            denom = Math.abs(1 / (xval[edge] - x));

	        for (var k = ileft; k <= iright; ++k) {
	          var xk   = xval[k],
	              yk   = yval[k],
	              dist = k < i ? x - xk : xk - x,
	              w    = science_stats_loessTricube(dist * denom) * robustnessWeights[k] * weights[k],
	              xkw  = xk * w;
	          sumWeights += w;
	          sumX += xkw;
	          sumXSquared += xk * xkw;
	          sumY += yk * w;
	          sumXY += yk * xkw;
	        }

	        var meanX = sumX / sumWeights,
	            meanY = sumY / sumWeights,
	            meanXY = sumXY / sumWeights,
	            meanXSquared = sumXSquared / sumWeights;

	        var beta = (Math.sqrt(Math.abs(meanXSquared - meanX * meanX)) < accuracy)
	            ? 0 : ((meanXY - meanX * meanY) / (meanXSquared - meanX * meanX));

	        var alpha = meanY - beta * meanX;

	        res[i] = beta * x + alpha;
	        residuals[i] = Math.abs(yval[i] - res[i]);
	      }

	      // No need to recompute the robustness weights at the last
	      // iteration, they won't be needed anymore
	      if (iter === robustnessIters) {
	        break;
	      }

	      // Recompute the robustness weights.

	      // Find the median residual.
	      var medianResidual = science.stats.median(residuals);

	      if (Math.abs(medianResidual) < accuracy)
	        break;

	      var arg,
	          w;
	      i = -1; while (++i < n) {
	        arg = residuals[i] / (6 * medianResidual);
	        robustnessWeights[i] = (arg >= 1) ? 0 : ((w = 1 - arg * arg) * w);
	      }
	    }

	    return res;
	  }

	  smooth.bandwidth = function(x) {
	    if (!arguments.length) return x;
	    bandwidth = x;
	    return smooth;
	  };

	  smooth.robustnessIterations = function(x) {
	    if (!arguments.length) return x;
	    robustnessIters = x;
	    return smooth;
	  };

	  smooth.accuracy = function(x) {
	    if (!arguments.length) return x;
	    accuracy = x;
	    return smooth;
	  };

	  return smooth;
	};

	function science_stats_loessFiniteReal(values) {
	  var n = values.length,
	      i = -1;

	  while (++i < n) if (!isFinite(values[i])) return false;

	  return true;
	}

	function science_stats_loessStrictlyIncreasing(xval) {
	  var n = xval.length,
	      i = 0;

	  while (++i < n) if (xval[i - 1] >= xval[i]) return false;

	  return true;
	}

	// Compute the tricube weight function.
	// http://en.wikipedia.org/wiki/Local_regression#Weight_function
	function science_stats_loessTricube(x) {
	  return (x = 1 - x * x * x) * x * x;
	}

	// Given an index interval into xval that embraces a certain number of
	// points closest to xval[i-1], update the interval so that it embraces
	// the same number of points closest to xval[i], ignoring zero weights.
	function science_stats_loessUpdateBandwidthInterval(
	  xval, weights, i, bandwidthInterval) {

	  var left = bandwidthInterval[0],
	      right = bandwidthInterval[1];

	  // The right edge should be adjusted if the next point to the right
	  // is closer to xval[i] than the leftmost point of the current interval
	  var nextRight = science_stats_loessNextNonzero(weights, right);
	  if ((nextRight < xval.length) && (xval[nextRight] - xval[i]) < (xval[i] - xval[left])) {
	    var nextLeft = science_stats_loessNextNonzero(weights, left);
	    bandwidthInterval[0] = nextLeft;
	    bandwidthInterval[1] = nextRight;
	  }
	}

	function science_stats_loessNextNonzero(weights, i) {
	  var j = i + 1;
	  while (j < weights.length && weights[j] === 0) j++;
	  return j;
	}
	// Welford's algorithm.
	science.stats.mean = function(x) {
	  var n = x.length;
	  if (n === 0) return NaN;
	  var m = 0,
	      i = -1;
	  while (++i < n) m += (x[i] - m) / (i + 1);
	  return m;
	};
	science.stats.median = function(x) {
	  return science.stats.quantiles(x, [.5])[0];
	};
	science.stats.mode = function(x) {
	  var counts = {},
	      mode = [],
	      max = 0,
	      n = x.length,
	      i = -1,
	      d,
	      k;
	  while (++i < n) {
	    k = counts.hasOwnProperty(d = x[i]) ? ++counts[d] : counts[d] = 1;
	    if (k === max) mode.push(d);
	    else if (k > max) {
	      max = k;
	      mode = [d];
	    }
	  }
	  if (mode.length === 1) return mode[0];
	};
	// Uses R's quantile algorithm type=7.
	science.stats.quantiles = function(d, quantiles) {
	  d = d.slice().sort(science.ascending);
	  var n_1 = d.length - 1;
	  return quantiles.map(function(q) {
	    if (q === 0) return d[0];
	    else if (q === 1) return d[n_1];

	    var index = 1 + q * n_1,
	        lo = Math.floor(index),
	        h = index - lo,
	        a = d[lo - 1];

	    return h === 0 ? a : a + h * (d[lo] - a);
	  });
	};
	// Unbiased estimate of a sample's variance.
	// Also known as the sample variance, where the denominator is n - 1.
	science.stats.variance = function(x) {
	  var n = x.length;
	  if (n < 1) return NaN;
	  if (n === 1) return 0;
	  var mean = science.stats.mean(x),
	      i = -1,
	      s = 0;
	  while (++i < n) {
	    var v = x[i] - mean;
	    s += v * v;
	  }
	  return s / (n - 1);
	};
	science.stats.distribution = {
	};
	// From http://www.colingodsey.com/javascript-gaussian-random-number-generator/
	// Uses the Box-Muller Transform.

	var science_stats_distribution_gaussianConstant = 1 / Math.sqrt(2 * Math.PI);

	science.stats.distribution.gaussian = function() {
	  var random = Math.random,
	      mean = 0,
	      sigma = 1,
	      variance = 1;

	  function gaussian() {
	    var x1,
	        x2,
	        rad,
	        y1;

	    do {
	      x1 = 2 * random() - 1;
	      x2 = 2 * random() - 1;
	      rad = x1 * x1 + x2 * x2;
	    } while (rad >= 1 || rad === 0);

	    return mean + sigma * x1 * Math.sqrt(-2 * Math.log(rad) / rad);
	  }

	  gaussian.pdf = function(x) {
	    x = (x - mean) / sigma;
	    return science_stats_distribution_gaussianConstant * Math.exp(-.5 * x * x) / sigma;
	  };

	  gaussian.cdf = function(x) {
	    x = (x - mean) / sigma;
	    return .5 * (1 + science.stats.erf(x / Math.SQRT2));
	  };

	  gaussian.mean = function(x) {
	    if (!arguments.length) return mean;
	    mean = +x;
	    return gaussian;
	  };

	  gaussian.variance = function(x) {
	    if (!arguments.length) return variance;
	    sigma = Math.sqrt(variance = +x);
	    return gaussian;
	  };

	  gaussian.random = function(x) {
	    if (!arguments.length) return random;
	    random = x;
	    return gaussian;
	  };

	  return gaussian;
	};

	})(this);
	if (typeof module !== "undefined" && typeof module.exports !== "undefined") module.exports = science; else window.science = science;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var CustomRegression, lodash;

	lodash = __webpack_require__(11);

	CustomRegression = function(bonds, axes, regression) {
	  var e, rValues, xValues, yValues;
	  xValues = lodash.map(bonds, axes.x);
	  yValues = lodash.map(bonds, axes.y);
	  try {
	    if (bonds.length === 0) {
	      return [];
	    }
	    rValues = regression(xValues, yValues);
	    bonds = bonds.map(function(bond, i) {
	      bond = lodash.clone(bond);
	      bond[axes.y] = rValues[i];
	      return bond;
	    });
	  } catch (error) {
	    e = error;
	    console.error('custom regression computation error', e);
	  }
	  return bonds;
	};

	module.exports = CustomRegression;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var BondsCurve, Label, LegendBackground, LineSample, Not, React;

	React = __webpack_require__(1);

	BondsCurve = __webpack_require__(76);

	Label = __webpack_require__(57);

	LegendBackground = __webpack_require__(77);

	LineSample = __webpack_require__(78);

	Not = __webpack_require__(59);

	module.exports = function() {
	  var isOpaque, isToned, pureCurves, pureLegends, pureSamples, tonedCurves, tonedLegends, tonedSamples;
	  isToned = function(l) {
	    return l.toned;
	  };
	  isOpaque = function(c) {
	    return c.opacity === 1;
	  };
	  pureLegends = this.legends.filter(Not(isToned));
	  tonedLegends = this.legends.filter(isToned);
	  pureSamples = this.samples.filter(Not(isToned));
	  tonedSamples = this.samples.filter(isToned);
	  pureCurves = this.curves.filter(isOpaque);
	  tonedCurves = this.curves.filter(Not(isOpaque));
	  return [
	    {
	      type: 'tonedCurves',
	      zIndex: 'toned curve',
	      render: React.createElement("g", null, (tonedCurves.sort(function(a, b) {
	        return a.width - b.width;
	      }), tonedCurves.map(function(curve, index) {
	        return React.createElement(BondsCurve, {
	          "key": index,
	          "curve": curve
	        });
	      })))
	    }, {
	      type: 'tonedCurvesLabels',
	      zIndex: 'toned curve label',
	      render: React.createElement("g", null, tonedLegends.map(function(legend, i) {
	        return React.createElement("g", {
	          "key": i
	        }, React.createElement(LegendBackground, {
	          "legend": legend
	        }), React.createElement(Label, {
	          "label": legend.label
	        }));
	      }), tonedSamples.map(function(sample, i) {
	        return React.createElement(LineSample, {
	          "sample": sample,
	          "key": i
	        });
	      }), tonedCurves.map(function(arg, index) {
	        var label;
	        label = arg.label;
	        if (label) {
	          return React.createElement(Label, {
	            "key": index,
	            "label": label
	          });
	        } else {
	          return null;
	        }
	      }))
	    }, {
	      type: 'pureCurves',
	      zIndex: 'curve',
	      render: React.createElement("g", null, (pureCurves.sort(function(a, b) {
	        return a.width - b.width;
	      }), pureCurves.map(function(curve, index) {
	        return React.createElement(BondsCurve, {
	          "key": index,
	          "curve": curve
	        });
	      })))
	    }, {
	      type: 'pureCurvesLabels',
	      zIndex: 'curve label',
	      render: React.createElement("g", null, pureLegends.map(function(legend, i) {
	        return React.createElement("g", {
	          "key": i
	        }, React.createElement(LegendBackground, {
	          "legend": legend
	        }), React.createElement(Label, {
	          "label": legend.label
	        }));
	      }), pureSamples.map(function(sample, i) {
	        return React.createElement(LineSample, {
	          "sample": sample,
	          "key": i
	        });
	      }), pureCurves.map(function(arg, index) {
	        var label;
	        label = arg.label;
	        if (label) {
	          return React.createElement(Label, {
	            "key": index,
	            "label": label
	          });
	        } else {
	          return null;
	        }
	      }))
	    }
	  ];
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var React, d3;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	module.exports = function(arg) {
	  var backgroundColor, backgroundData, backgroundOpacity, bg, color, curve, d, getDash, getE11nPath, getSpeculationDash, i, isDashed, leftE11n, linecap, path, paths, rgbaBg, rightE11n, speculation, width;
	  curve = arg.curve;
	  d = curve.d, color = curve.color, backgroundColor = curve.backgroundColor, backgroundOpacity = curve.backgroundOpacity, width = curve.width, leftE11n = curve.leftE11n, rightE11n = curve.rightE11n, speculation = curve.speculation;
	  backgroundData = d;
	  if (leftE11n) {
	    backgroundData = leftE11n + backgroundData;
	  }
	  if (rightE11n) {
	    backgroundData = backgroundData + rightE11n;
	  }

	  /*
	    Notation here:
	    - A is color of the first curve;
	    - B is color of the second curve;
	    - * is transparent pixel.
	   */
	  getDash = function(index) {
	    if (!index) {
	      return "15,0";
	    }
	    return "7.5,7.5";
	  };
	  getSpeculationDash = function(index) {
	    if (!index) {
	      return "4.5,3";
	    }
	    return "4.5,10.5";
	  };
	  getE11nPath = function(path, d) {
	    if (!d) {
	      return null;
	    }
	    return React.createElement("path", {
	      "className": "dotted-curve",
	      "d": d,
	      "stroke": path.color,
	      "fill": "none",
	      "strokeWidth": width,
	      "strokeDasharray": getSpeculationDash(path.index)
	    });
	  };
	  paths = color instanceof Array ? color.map(function(c, i) {
	    return {
	      color: c,
	      dash: getDash(i),
	      index: i
	    };
	  }) : speculation ? [
	    {
	      color: color,
	      dash: getSpeculationDash()
	    }
	  ] : [
	    {
	      color: color
	    }
	  ];
	  isDashed = function(p) {
	    return p.dash;
	  };
	  linecap = paths.some(isDashed) ? "butt" : "round";
	  bg = d3.rgb(backgroundColor);
	  rgbaBg = "rgba(" + bg.r + ", " + bg.g + ", " + bg.b + ", " + backgroundOpacity + ")";
	  return React.createElement("g", {
	    "className": "curve"
	  }, React.createElement("path", {
	    "className": "background-curve",
	    "d": backgroundData,
	    "stroke": rgbaBg,
	    "fill": "none",
	    "strokeWidth": width + 2,
	    "strokeLinecap": linecap
	  }), (function() {
	    var j, len, results;
	    results = [];
	    for (i = j = 0, len = paths.length; j < len; i = ++j) {
	      path = paths[i];
	      results.push(React.createElement("g", {
	        "key": path.color + '-' + i
	      }, React.createElement("path", {
	        "className": "main-curve",
	        "d": d,
	        "stroke": path.color,
	        "fill": "none",
	        "strokeWidth": width,
	        "strokeDasharray": path.dash,
	        "strokeLinecap": linecap
	      }), getE11nPath(path, leftE11n), getE11nPath(path, rightE11n)));
	    }
	    return results;
	  })());
	};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var React, d3;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	module.exports = function(arg) {
	  var back, bg, legend, opacity, rgbaBg, transform, x, y;
	  legend = arg.legend;
	  x = legend.x, y = legend.y, back = legend.back, opacity = legend.opacity;
	  transform = "translate(" + x + ", " + y + ")";
	  bg = d3.rgb(back.backgroundColor);
	  rgbaBg = "rgba(" + bg.r + ", " + bg.g + ", " + bg.b + ", " + opacity + ")";
	  return React.createElement("rect", {
	    "className": "legend",
	    "fill": rgbaBg,
	    "transform": transform,
	    "width": back.width,
	    "height": back.height,
	    "rx": back.r,
	    "ry": back.r
	  });
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function(arg) {
	  var actualLength, color, d, getDash, i, path, paths, sample, speculation, width;
	  sample = arg.sample;
	  width = sample.width, d = sample.d, color = sample.color, actualLength = sample.actualLength, speculation = sample.speculation;
	  getDash = function(i) {
	    if (i === 1) {
	      return "7.5,7.5";
	    }
	    return "";
	  };
	  paths = color instanceof Array ? color.map(function(c, i) {
	    return {
	      color: c,
	      dash: getDash(i),
	      index: i
	    };
	  }) : speculation ? [
	    {
	      dash: '4.5,3',
	      color: color
	    }
	  ] : [
	    {
	      color: color
	    }
	  ];
	  return React.createElement("g", {
	    "className": "line-sample"
	  }, (function() {
	    var j, len, results;
	    results = [];
	    for (i = j = 0, len = paths.length; j < len; i = ++j) {
	      path = paths[i];
	      results.push(React.createElement("g", {
	        "key": path.color + '-' + i
	      }, React.createElement("path", {
	        "d": d,
	        "stroke": path.color,
	        "fill": "none",
	        "strokeWidth": width,
	        "strokeDasharray": path.dash
	      })));
	    }
	    return results;
	  })());
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var BondsCurvesFactory, CheckBondData, GenerateSpreadDots, GetDominatingRating, GetE11nDot, MergeColors, Plugin, RatingColorGenerator, RegressCurve, SpreadsPlugin, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	lodash = __webpack_require__(11);

	Plugin = __webpack_require__(32);

	BondsCurvesFactory = __webpack_require__(61);

	RatingColorGenerator = __webpack_require__(65);

	GetDominatingRating = __webpack_require__(62);

	MergeColors = __webpack_require__(53);

	CheckBondData = __webpack_require__(34);

	RegressCurve = __webpack_require__(70);

	GenerateSpreadDots = __webpack_require__(80);

	GetE11nDot = __webpack_require__(63);

	module.exports = SpreadsPlugin = (function(superClass) {
	  extend(SpreadsPlugin, superClass);

	  function SpreadsPlugin() {
	    SpreadsPlugin.__super__.constructor.call(this);
	    this.ratingColorGenerator = RatingColorGenerator();
	    return;
	  }

	  SpreadsPlugin.prototype.getPropsKeys = function() {
	    return ['spreads'];
	  };

	  SpreadsPlugin.prototype.build = function(arg) {
	    var applyRegression, axes, bonds, buildCurve, buildData, builtCurves, color, curves, extrapolation, label, localRegressionBandwidth, opacities, spread, spreads, width;
	    buildData = arg.buildData, axes = arg.axes, localRegressionBandwidth = arg.localRegressionBandwidth;
	    spreads = this.props.spreads;
	    buildCurve = function(curve) {
	      var applyLocalRegression, applyRegression, bonds, date, extrapolation, isins, regression;
	      applyLocalRegression = curve.applyLocalRegression, applyRegression = curve.applyRegression, regression = curve.regression, date = curve.date, isins = curve.isins, extrapolation = curve.extrapolation;
	      bonds = isins.map(function(isin) {
	        return buildData(isin + '@' + date);
	      }).filter(function(bond) {
	        return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	      });
	      bonds = RegressCurve({
	        bonds: bonds,
	        axes: axes,
	        applyLocalRegression: applyLocalRegression,
	        applyRegression: applyRegression,
	        localRegressionBandwidth: localRegressionBandwidth,
	        regression: regression
	      });
	      return {
	        bonds: bonds,
	        extrapolation: extrapolation,
	        applyRegression: applyRegression || applyLocalRegression
	      };
	    };
	    this.builtSpreads = (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = spreads.length; j < len; j++) {
	        spread = spreads[j];
	        label = spread.label, width = spread.width, curves = spread.curves, extrapolation = spread.extrapolation;
	        color = lodash.map(curves, 'color');
	        opacities = lodash.map(curves, 'opacity');
	        builtCurves = curves.map((function(_this) {
	          return function(curve, i) {
	            var builtCurve, ratingGroups;
	            builtCurve = buildCurve(curve);
	            if (color[i] === void 0) {
	              console.warn('SpreadsPlugin: Curve color is undefined, please provide it via "color" property. Using most frequent rating to calculate color.');
	              ratingGroups = lodash.map(builtCurve.bonds, 'ratingGroup');
	              color[i] = _this.ratingColorGenerator(GetDominatingRating(ratingGroups), curve.isins.join(''));
	            }
	            return builtCurve;
	          };
	        })(this));
	        bonds = GenerateSpreadDots(builtCurves, axes);
	        applyRegression = builtCurves.some(function(c) {
	          return c.applyRegression;
	        });
	        results.push({
	          label: label,
	          width: width,
	          color: color,
	          opacities: opacities,
	          bonds: bonds,
	          applyRegression: applyRegression,
	          extrapolation: extrapolation,
	          curves: curves
	        });
	      }
	      return results;
	    }).call(this);
	  };

	  SpreadsPlugin.prototype.getBondsLists = function() {
	    return this.builtSpreads.map(function(spread) {
	      return spread.bonds;
	    });
	  };

	  SpreadsPlugin.prototype.willRender = function(arg, arg1) {
	    var axes, backgroundColor, bondToDot, boxes, curve1Dot, curve1Extrapolation, curve2Dot, curve2Extrapolation, curvesFactory, curvesLabels, j, labelStyle, len, opacities, ref, spread, spreadDoc, toned, zoomedXScale;
	    labelStyle = arg.labelStyle, backgroundColor = arg.backgroundColor, axes = arg.axes;
	    bondToDot = arg1.bondToDot, boxes = arg1.boxes, curvesLabels = arg1.curvesLabels, zoomedXScale = arg1.zoomedXScale;
	    this.spreads = [];
	    curvesFactory = new BondsCurvesFactory({
	      labelStyle: labelStyle,
	      backgroundColor: backgroundColor,
	      curvesLabels: curvesLabels
	    });
	    ref = this.builtSpreads;
	    for (j = 0, len = ref.length; j < len; j++) {
	      spread = ref[j];
	      if (spread.bonds.length === 0) {
	        continue;
	      }
	      opacities = spread.opacities;
	      toned = false;
	      spread.color = spread.color.map(function(c, i) {
	        var opacity;
	        if (!c) {
	          console.warn('SpreadsPlugin: Spread contains curves without color');
	          return c;
	        }
	        opacity = opacities[i];
	        if (opacity === void 0) {
	          opacity = 1;
	        }
	        if (opacity < 1) {
	          toned = true;
	        }
	        return MergeColors(c, backgroundColor, opacity);
	      });
	      curve1Extrapolation = spread.curves[0].extrapolation;
	      curve2Extrapolation = spread.curves[1].extrapolation;
	      if (curve1Extrapolation && curve2Extrapolation) {
	        curve1Dot = GetE11nDot('left', curve1Extrapolation, spread.curves[0].bonds, zoomedXScale.domain(), axes);
	        curve2Dot = GetE11nDot('left', curve2Extrapolation, spread.curves[1].bonds, zoomedXScale.domain(), axes);
	        spread.extrapolation.left = {};
	        spread.extrapolation.left[axes.x] = curve1Dot[axes.x];
	        spread.extrapolation.left[axes.y] = curve1Dot[axes.y] - curve2Dot[axes.y];
	      }
	      spreadDoc = curvesFactory.buildCurve({
	        curve: spread,
	        bondToDot: bondToDot,
	        xExtent: zoomedXScale.domain(),
	        axes: axes
	      });
	      spreadDoc.toned = toned;
	      this.spreads.push(spreadDoc);
	      if (spreadDoc.labelBox) {
	        boxes.push(spreadDoc.labelBox);
	      }
	    }
	  };

	  SpreadsPlugin.prototype.render = __webpack_require__(81);

	  return SpreadsPlugin;

	})(Plugin);


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var FirstOf, GenerateSpreadDots, LastOf, d3, lodash;

	lodash = __webpack_require__(11);

	d3 = __webpack_require__(10);

	FirstOf = __webpack_require__(50);

	LastOf = __webpack_require__(29);

	GenerateSpreadDots = function(curves, axes) {
	  var bonds, curve1, curve2, maxX, minX, scale1, scale2, xs, xs1, xs2, ys1, ys2;
	  bonds = [];
	  curve1 = lodash.sortBy(curves[0].bonds, axes.x);
	  xs1 = lodash.map(curve1, axes.x);
	  ys1 = lodash.map(curve1, axes.y);
	  curve2 = lodash.sortBy(curves[1].bonds, axes.x);
	  xs2 = lodash.map(curve2, axes.x);
	  ys2 = lodash.map(curve2, axes.y);
	  minX = Math.min(FirstOf(xs1), FirstOf(xs2));
	  maxX = Math.min(LastOf(xs1), LastOf(xs2));
	  if (FirstOf(xs1) < FirstOf(xs2)) {
	    if (curves[1].extrapolation && 'object' === typeof curves[1].extrapolation.left) {
	      xs2.unshift(curves[1].extrapolation.left[axes.x]);
	      ys2.unshift(curves[1].extrapolation.left[axes.y]);
	    }
	  } else if (FirstOf(xs1) > FirstOf(xs2)) {
	    if (curves[0].extrapolation && 'object' === typeof curves[0].extrapolation.left) {
	      xs1.unshift(curves[0].extrapolation.left[axes.x]);
	      ys1.unshift(curves[0].extrapolation.left[axes.y]);
	    }
	  }
	  scale1 = d3.scale.linear().domain(xs1).range(ys1);
	  scale2 = d3.scale.linear().domain(xs2).range(ys2);
	  xs = xs1.slice().concat(xs2);
	  xs = lodash.uniq(lodash.sortBy(xs)).filter(function(x) {
	    return (minX <= x && x <= maxX);
	  });
	  bonds = xs.map(function(x) {
	    var result;
	    result = {};
	    result[axes.x] = x;
	    result[axes.y] = scale1(x) - scale2(x);
	    return result;
	  });
	  return bonds;
	};

	module.exports = GenerateSpreadDots;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var BondsCurve, Label, Not, React;

	React = __webpack_require__(1);

	BondsCurve = __webpack_require__(76);

	Label = __webpack_require__(57);

	Not = __webpack_require__(59);

	module.exports = function() {
	  var isToned, pureSpreads, tonedSpreads;
	  isToned = function(l) {
	    return l.toned;
	  };
	  pureSpreads = this.spreads.filter(Not(isToned));
	  tonedSpreads = this.spreads.filter(isToned);
	  return [
	    {
	      type: 'tonedSpreads',
	      zIndex: 'toned spread',
	      render: React.createElement("g", null, (tonedSpreads.sort(function(a, b) {
	        return a.width - b.width;
	      }), tonedSpreads.map(function(spread, index) {
	        return React.createElement(BondsCurve, {
	          "key": index,
	          "curve": spread
	        });
	      })))
	    }, {
	      type: 'tonedSpreadsLabels',
	      zIndex: 'toned spread label',
	      render: React.createElement("g", null, tonedSpreads.map(function(arg, index) {
	        var label;
	        label = arg.label;
	        if (label) {
	          return React.createElement(Label, {
	            "key": index,
	            "label": label
	          });
	        } else {
	          return null;
	        }
	      }))
	    }, {
	      type: 'pureSpreads',
	      zIndex: 'spread',
	      render: React.createElement("g", null, (pureSpreads.sort(function(a, b) {
	        return a.width - b.width;
	      }), pureSpreads.map(function(spread, index) {
	        return React.createElement(BondsCurve, {
	          "key": index,
	          "curve": spread
	        });
	      })))
	    }, {
	      type: 'pureSpreadsLabels',
	      zIndex: 'spread label',
	      render: React.createElement("g", null, pureSpreads.map(function(arg, index) {
	        var label;
	        label = arg.label;
	        if (label) {
	          return React.createElement(Label, {
	            "key": index,
	            "label": label
	          });
	        } else {
	          return null;
	        }
	      }))
	    }
	  ];
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var CheckBondData, GenerateLegend, MeasureTextWidth, Plugin, TimeSeriesFactory, TimeSeriesPlugin, WrapBoxes, d3, getLabelWidth, hasLabel, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	lodash = __webpack_require__(11);

	d3 = __webpack_require__(10);

	Plugin = __webpack_require__(32);

	WrapBoxes = __webpack_require__(66);

	CheckBondData = __webpack_require__(34);

	TimeSeriesFactory = __webpack_require__(83);

	MeasureTextWidth = __webpack_require__(48);

	GenerateLegend = __webpack_require__(67);

	hasLabel = function(ts) {
	  return ts.label != null;
	};

	getLabelWidth = function(arg) {
	  var labelStyle;
	  labelStyle = arg.labelStyle;
	  return function(arg1) {
	    var label;
	    label = arg1.label;
	    return MeasureTextWidth(label, labelStyle);
	  };
	};

	module.exports = TimeSeriesPlugin = (function(superClass) {
	  extend(TimeSeriesPlugin, superClass);

	  function TimeSeriesPlugin() {
	    return TimeSeriesPlugin.__super__.constructor.apply(this, arguments);
	  }

	  TimeSeriesPlugin.prototype.getPropsKeys = function() {
	    return ['timeSeries'];
	  };

	  TimeSeriesPlugin.prototype.build = function(arg) {
	    var axes, buildData, timeSeries;
	    buildData = arg.buildData, axes = arg.axes;
	    timeSeries = this.props.timeSeries;
	    this.builtTimeSeries = timeSeries.map(function(timeSeries) {
	      var bonds;
	      bonds = timeSeries.dates.map(function(date) {
	        return buildData(timeSeries.isin + '@' + date);
	      }).filter(function(bond) {
	        return CheckBondData(bond, [axes.y]);
	      });
	      return {
	        color: timeSeries.color,
	        width: timeSeries.width,
	        label: timeSeries.label,
	        isin: timeSeries.isin,
	        isActive: timeSeries.isActive,
	        bonds: bonds
	      };
	    });
	  };

	  TimeSeriesPlugin.prototype.getBondsLists = function() {
	    this.hoverTs = null;
	    this.clickedTs = [];
	    return this.builtTimeSeries.map(function(dotsSet) {
	      return dotsSet.bonds;
	    });
	  };

	  TimeSeriesPlugin.prototype.willRender = function(props, renderContext) {
	    var backgroundColor, bondToDot, box, boxes, i, labelBoxes, labelStyle, labelWidths, len, maxLabelWidth, ref, samples, timeSeries, timeSeriesDoc, timeSeriesFactory;
	    this.timeSeries = [];
	    bondToDot = renderContext.bondToDot;
	    timeSeriesFactory = new TimeSeriesFactory(props, renderContext, {
	      hoverTs: this.hoverTs,
	      clickedTs: this.clickedTs
	    });
	    labelWidths = this.builtTimeSeries.filter(hasLabel).map(getLabelWidth(props));
	    maxLabelWidth = d3.max(labelWidths);
	    timeSeriesFactory.setMaxLabelWidth(maxLabelWidth);
	    ref = this.builtTimeSeries;
	    for (i = 0, len = ref.length; i < len; i++) {
	      timeSeries = ref[i];
	      if (timeSeries.bonds.length === 0) {
	        continue;
	      }
	      timeSeriesDoc = timeSeriesFactory.buildTimeSeries({
	        timeSeries: timeSeries,
	        bondToDot: bondToDot
	      });
	      this.listenTimeSeriesEvents(timeSeriesDoc);
	      if (this.hoverTs && this.hoverTs.isin === timeSeriesDoc.isin) {
	        this.hoverTs = timeSeriesDoc;
	      }
	      this.clickedTs = this.clickedTs.map(function(ts) {
	        if (ts.isin === timeSeriesDoc.isin) {
	          return timeSeriesDoc;
	        }
	        return ts;
	      });
	      this.timeSeries.push(timeSeriesDoc);
	    }
	    labelStyle = props.labelStyle, backgroundColor = props.backgroundColor;
	    labelBoxes = timeSeriesFactory.labelBoxes, samples = timeSeriesFactory.samples;
	    if (labelBoxes.length > 0 && samples.length > 0) {
	      boxes = lodash.flatten([labelBoxes, lodash.map(samples, 'box')]);
	      box = WrapBoxes(boxes);
	      this.samples = samples;
	      this.legend = GenerateLegend({
	        labelStyle: labelStyle,
	        box: box,
	        backgroundColor: backgroundColor
	      });
	    } else {
	      this.samples = [];
	      this.legend = null;
	    }
	  };

	  TimeSeriesPlugin.prototype.listenTimeSeriesEvents = function(timeSeries) {
	    timeSeries.on('mouseEnter', (function(_this) {
	      return function() {
	        _this.hoverTs = timeSeries;
	        _this.emit('requireRender');
	      };
	    })(this));
	    timeSeries.on('mouseLeave', (function(_this) {
	      return function() {
	        _this.hoverTs = null;
	        _this.emit('requireRender');
	      };
	    })(this));
	    return timeSeries.on('click', (function(_this) {
	      return function() {
	        _this.emit('chartEmit', 'timeSeriesClick', timeSeries.isin);
	        return;
	        if (indexOf.call(_this.clickedTs, timeSeries) >= 0) {
	          _this.clickedTs = _this.clickedTs.filter(function(ts) {
	            return ts !== timeSeries;
	          });
	        } else {
	          _this.clickedTs.push(timeSeries);
	        }
	        _this.emit('requireRender');
	      };
	    })(this));
	  };

	  TimeSeriesPlugin.prototype.render = __webpack_require__(86);

	  return TimeSeriesPlugin;

	})(Plugin);


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var Box, FilterBackgroundColor, FirstOf, GenerateLabel, GenerateLabelBox, GenerateMaturityMark, GeneratePath, GenerateSampleForLabel, MergeColors, TimeSeries, TimeSeriesFactory, lodash,
	  slice = [].slice;

	lodash = __webpack_require__(11);

	GeneratePath = __webpack_require__(45);

	GenerateMaturityMark = __webpack_require__(84);

	FirstOf = __webpack_require__(50);

	TimeSeries = __webpack_require__(85);

	GenerateLabel = __webpack_require__(52);

	GenerateLabelBox = __webpack_require__(47);

	GenerateSampleForLabel = __webpack_require__(68);

	MergeColors = __webpack_require__(53);

	Box = __webpack_require__(14);

	FilterBackgroundColor = __webpack_require__(58);

	module.exports = TimeSeriesFactory = (function() {
	  function TimeSeriesFactory() {
	    var arg, args, i, len;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    for (i = 0, len = args.length; i < len; i++) {
	      arg = args[i];
	      lodash.assign(this, arg);
	    }
	    this.labelCounter = 0;
	    this.labelBoxes = [];
	    this.samples = [];
	    return;
	  }

	  TimeSeriesFactory.prototype.setMaxLabelWidth = function(w) {
	    this.maxLabelWidth = w;
	  };

	  TimeSeriesFactory.prototype.buildTimeSeries = function(arg1) {
	    var axes, backgroundColor, bondToDot, bonds, clickedTs, color, d, dots, hoverTs, isActive, isClicked, isHover, isin, label, labelBox, labelHeight, labelStyle, markColor, maturityBond, maturityBonds, maturityMark, padding, ref, timeSeries, width, x, y;
	    timeSeries = arg1.timeSeries, bondToDot = arg1.bondToDot;
	    ref = this, backgroundColor = ref.backgroundColor, axes = ref.axes, labelStyle = ref.labelStyle, hoverTs = ref.hoverTs, clickedTs = ref.clickedTs;
	    color = timeSeries.color, width = timeSeries.width, bonds = timeSeries.bonds, label = timeSeries.label, isin = timeSeries.isin, isActive = timeSeries.isActive;
	    dots = bonds.map(bondToDot);
	    d = GeneratePath(dots);
	    maturityBonds = bonds.filter(function(b) {
	      return b.maturity === 0;
	    });
	    if (maturityBonds.length > 0) {
	      maturityBond = FirstOf(maturityBonds);
	      markColor = FilterBackgroundColor(backgroundColor)(color);
	      maturityMark = GenerateMaturityMark(bondToDot(maturityBond), markColor, width);
	    } else {
	      maturityMark = null;
	    }
	    timeSeries = new TimeSeries;
	    isHover = hoverTs && hoverTs.isin === isin;
	    isClicked = clickedTs.some(function(ts) {
	      return ts.isin === isin;
	    });
	    isActive = isActive || isHover || isClicked;
	    if (!isActive && (hoverTs || clickedTs.length)) {
	      if (color instanceof Array) {
	        color = color.map(function(c) {
	          return MergeColors(backgroundColor, c, 0.5);
	        });
	      } else {
	        color = MergeColors(backgroundColor, color, 0.5);
	      }
	    }
	    lodash.assign(timeSeries, {
	      d: d,
	      axes: axes,
	      dots: dots,
	      bonds: bonds,
	      color: color,
	      width: width,
	      backgroundColor: backgroundColor,
	      isin: isin,
	      isActive: isActive,
	      maturityMark: maturityMark
	    });
	    if (label) {
	      padding = labelStyle.textPadding;
	      labelHeight = labelStyle.textHeight + padding;
	      x = this.chartWidth - this.maxLabelWidth - padding;
	      y = padding / 2 + labelHeight * (this.labelCounter + 0.5);
	      labelBox = GenerateLabelBox('right', label, labelStyle, x, y, 0);
	      this.samples.push(GenerateSampleForLabel(padding, labelStyle.textHeight, {
	        width: width,
	        color: color
	      })(labelBox));
	      this.labelBoxes.push(labelBox);
	      labelStyle = lodash.clone(labelStyle);
	      labelStyle.opacity = 0;
	      timeSeries.label = GenerateLabel({
	        text: label,
	        textColor: color,
	        labelStyle: labelStyle,
	        box: labelBox,
	        backgroundColor: backgroundColor
	      });
	      this.labelCounter++;
	    }
	    return timeSeries;
	  };

	  return TimeSeriesFactory;

	})();


/***/ },
/* 84 */
/***/ function(module, exports) {

	var GenerateMaturityMark;

	GenerateMaturityMark = function(dot, color, width) {
	  var d, s, x, y;
	  x = dot.x, y = dot.y;
	  s = width * 3;
	  d = "M-" + s + " " + s + "L" + s + " -" + s + "M" + s + " " + s + "L-" + s + " -" + s;
	  return {
	    d: d,
	    x: x,
	    y: y,
	    color: color,
	    width: width
	  };
	};

	module.exports = GenerateMaturityMark;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter, GenerateLabel, TimeSeries,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	EventEmitter = __webpack_require__(13);

	GenerateLabel = __webpack_require__(52);

	module.exports = TimeSeries = (function(superClass) {
	  extend(TimeSeries, superClass);

	  function TimeSeries() {
	    return TimeSeries.__super__.constructor.apply(this, arguments);
	  }

	  TimeSeries.prototype.onClick = function() {
	    return this.emit('click');
	  };

	  TimeSeries.prototype.onMouseEnter = function() {
	    return this.emit('mouseEnter');
	  };

	  TimeSeries.prototype.onMouseLeave = function() {
	    return this.emit('mouseLeave');
	  };

	  return TimeSeries;

	})(EventEmitter);


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var Label, LegendBackground, LineSample, Not, React, TimeSeries;

	React = __webpack_require__(1);

	TimeSeries = __webpack_require__(87);

	Label = __webpack_require__(57);

	LegendBackground = __webpack_require__(77);

	LineSample = __webpack_require__(78);

	Not = __webpack_require__(59);

	module.exports = function() {
	  var isActive, maxLabelWidth, ref, renderLabel, result, timeSeries;
	  ref = this, timeSeries = ref.timeSeries, maxLabelWidth = ref.maxLabelWidth;
	  isActive = function(ts) {
	    return ts.isActive;
	  };
	  renderLabel = function(ts) {
	    var isin, label, onClick, onMouseEnter, onMouseLeave;
	    label = ts.label, isin = ts.isin;
	    onClick = function() {
	      return ts.onClick();
	    };
	    onMouseEnter = function() {
	      return ts.onMouseEnter();
	    };
	    onMouseLeave = function() {
	      return ts.onMouseLeave();
	    };
	    return React.createElement("g", {
	      "key": isin,
	      "onClick": onClick,
	      "onMouseEnter": onMouseEnter,
	      "onMouseLeave": onMouseLeave
	    }, React.createElement(Label, {
	      "label": label
	    }));
	  };
	  result = [
	    {
	      type: 'timeSeries',
	      zIndex: 'time-series',
	      render: React.createElement("g", null, timeSeries.filter(Not(isActive)).map(function(timeSeries) {
	        return React.createElement(TimeSeries, {
	          "key": timeSeries.isin,
	          "timeSeries": timeSeries
	        });
	      }))
	    }, {
	      type: 'timeSeriesActive',
	      zIndex: 'time-series active',
	      render: React.createElement("g", null, timeSeries.filter(isActive).map(function(timeSeries) {
	        return React.createElement(TimeSeries, {
	          "key": timeSeries.isin,
	          "timeSeries": timeSeries
	        });
	      }))
	    }, {
	      type: 'timeSeriesLabels',
	      zIndex: 'time-series label',
	      group: 'front',
	      render: React.createElement("g", null, (this.legend ? React.createElement(LegendBackground, {
	        "legend": this.legend
	      }) : null), this.samples.map(function(sample, i) {
	        return React.createElement(LineSample, {
	          "sample": sample,
	          "key": i
	        });
	      }), this.timeSeries.map(function(ts) {
	        if (ts.label) {
	          return renderLabel(ts);
	        } else {
	          return null;
	        }
	      }))
	    }
	  ];
	  return result;
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var FirstOf, Label, LastOf, React, d3, hiddenStyle, renderMaturityMark, visibleStyle;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	Label = __webpack_require__(57);

	FirstOf = __webpack_require__(50);

	LastOf = __webpack_require__(29);

	hiddenStyle = {
	  display: 'none'
	};

	visibleStyle = {};

	renderMaturityMark = function(mark) {
	  var color, d, transform, width, x, y;
	  if (!mark) {
	    return null;
	  }
	  d = mark.d, x = mark.x, y = mark.y, color = mark.color, width = mark.width;
	  transform = "translate(" + x + ", " + y + ")";
	  return React.createElement("g", {
	    "transform": transform
	  }, React.createElement("path", {
	    "d": d,
	    "stroke": color,
	    "strokeWidth": width,
	    "fill": "none"
	  }));
	};

	module.exports = function(arg) {
	  var Hint, axes, backgroundColor, bonds, color, d, dots, getDash, hints, i, isActive, linecap, maturityMark, onClick, onMouseEnter, onMouseLeave, path, paths, step, timeSeries, tsWidth, width;
	  timeSeries = arg.timeSeries;
	  axes = timeSeries.axes, d = timeSeries.d, dots = timeSeries.dots, bonds = timeSeries.bonds, color = timeSeries.color, backgroundColor = timeSeries.backgroundColor, width = timeSeries.width, isActive = timeSeries.isActive, maturityMark = timeSeries.maturityMark;
	  onClick = function() {
	    return timeSeries.onClick();
	  };
	  onMouseEnter = function() {
	    return timeSeries.onMouseEnter();
	  };
	  onMouseLeave = function() {
	    return timeSeries.onMouseLeave();
	  };
	  getDash = function(i) {
	    if (i === 1) {
	      return "5,5";
	    }
	    return "";
	  };
	  if (color instanceof Array) {
	    paths = color.map(function(c, i) {
	      return {
	        color: c,
	        dash: getDash(i),
	        index: i
	      };
	    });
	    linecap = "butt";
	  } else {
	    paths = [
	      {
	        color: color
	      }
	    ];
	    linecap = "round";
	  }
	  maturityMark = renderMaturityMark(maturityMark);
	  hints = isActive ? (tsWidth = LastOf(dots).x - FirstOf(dots).x, hints = tsWidth / 26, step = Math.ceil(dots.length / hints), Hint = function(arg1) {
	    var dot, transform, value;
	    value = arg1.value, dot = arg1.dot;
	    transform = "translate(" + dot.x + "," + dot.y + ")";
	    return React.createElement("g", {
	      "className": "hint",
	      "transform": transform
	    }, React.createElement("circle", {
	      "className": "hint-circle",
	      "fill": color,
	      "r": "2"
	    }), React.createElement("g", {
	      "className": "hint-text"
	    }, React.createElement("rect", {
	      "width": "26",
	      "height": "14",
	      "x": "-13",
	      "y": "-17",
	      "opacity": "0.7",
	      "fill": backgroundColor
	    }), React.createElement("text", {
	      "textAnchor": "middle",
	      "dominantBaseline": "ideographic",
	      "fontSize": "10px",
	      "dy": "-4"
	    }, value.toFixed(2))));
	  }, React.createElement("g", {
	    "className": "hints"
	  }, bonds.map(function(bond, index) {
	    var date, dot, value;
	    if (index % step > 0) {
	      return null;
	    }
	    dot = dots[index];
	    value = bond[axes.y];
	    date = bond[axes.x];
	    return React.createElement(Hint, {
	      "key": date + '-' + value,
	      "value": value,
	      "dot": dot
	    });
	  }))) : null;
	  return React.createElement("g", {
	    "className": "time-series",
	    "onClick": onClick,
	    "onMouseEnter": onMouseEnter,
	    "onMouseLeave": onMouseLeave
	  }, (function() {
	    var j, len, results;
	    results = [];
	    for (i = j = 0, len = paths.length; j < len; i = ++j) {
	      path = paths[i];
	      results.push(React.createElement("g", {
	        "key": path.color + '-' + i
	      }, React.createElement("path", {
	        "d": d,
	        "stroke": path.color,
	        "fill": "none",
	        "strokeWidth": width,
	        "strokeDasharray": path.dash,
	        "strokeLinecap": linecap
	      })));
	    }
	    return results;
	  })(), hints, maturityMark);
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var DebugBoxesPlugin, Plugin,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Plugin = __webpack_require__(32);

	module.exports = DebugBoxesPlugin = (function(superClass) {
	  extend(DebugBoxesPlugin, superClass);

	  function DebugBoxesPlugin() {
	    return DebugBoxesPlugin.__super__.constructor.apply(this, arguments);
	  }

	  DebugBoxesPlugin.prototype.render = __webpack_require__(89);

	  return DebugBoxesPlugin;

	})(Plugin);


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function(arg) {
	  var boxes, style;
	  boxes = arg.boxes;
	  style = {
	    pointerEvents: 'none'
	  };
	  return [
	    {
	      type: 'debugBoxes',
	      zIndex: 'debug',
	      render: React.createElement("g", null, boxes.map(function(box, index) {
	        return React.createElement("rect", {
	          "style": style,
	          "key": index,
	          "x": box.left,
	          "y": box.top,
	          "width": box.width,
	          "height": box.height,
	          "fill": box.debugFill
	        });
	      }))
	    }
	  ];
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var Axis, FillParentSvg, Margin, React, ZOrder, ZoomableG, baseZIndex, calcZIndex, lodash, zIndices;

	React = __webpack_require__(1);

	lodash = __webpack_require__(11);

	ZOrder = __webpack_require__(91);

	Axis = __webpack_require__(92);

	Margin = __webpack_require__(93);

	FillParentSvg = __webpack_require__(94);

	ZoomableG = __webpack_require__(96);

	zIndices = __webpack_require__(98);

	calcZIndex = zIndices({
	  debug: 1000,
	  'current-value': 200,
	  'dot-curve-spread': 150,
	  'function-curve': 101,
	  label: 100,
	  active: 10,
	  hovered: 10,
	  selected: 10,
	  highlighted: 5,
	  hands: 1,
	  spread: 1,
	  curve: 1,
	  dot: 0,
	  'time-series': 0,
	  'value-scanner': 0,
	  defs: 0,
	  toned: -200
	});

	baseZIndex = 1000;

	module.exports = function() {
	  var allLayers, borderStyle, chart, chartBack, chartBody, chartFront, chartHeight, chartId, chartWidth, chartWrapped, layersGroups, margin, props, renderContext, renderedPlugins, wrapLayers, zoomBehavior, zoomedXScale, zoomedYScale;
	  chart = this.props.document;
	  if (!chart.margin) {
	    return React.createElement("svg", null);
	  }
	  renderContext = chart.renderContext, props = chart.props, zoomBehavior = chart.zoomBehavior, margin = chart.margin, zoomedXScale = chart.zoomedXScale, zoomedYScale = chart.zoomedYScale;
	  chartWidth = renderContext.chartWidth, chartHeight = renderContext.chartHeight, chartId = renderContext.chartId;
	  borderStyle = {
	    fill: 'none',
	    pointerEvents: 'none'
	  };
	  renderedPlugins = props.plugins.map(function(plugin) {
	    return plugin.render(renderContext);
	  });
	  allLayers = lodash.flatten(renderedPlugins);
	  layersGroups = lodash.groupBy(allLayers, function(layer) {
	    return layer.group || 'chart';
	  });
	  wrapLayers = function(layers) {
	    if (!layers) {
	      return;
	    }
	    return React.createElement(ZOrder, null, layers.map(function(arg) {
	      var id, render, type, zIndex;
	      type = arg.type, render = arg.render, zIndex = arg.zIndex;
	      switch (typeof zIndex) {
	        case 'number':
	          console.warn('Chart: use array of strings to set zIndex of ${type} layer');
	          break;
	        case 'string':
	          zIndex = zIndex.split(' ');
	          zIndex = baseZIndex + calcZIndex(zIndex);
	          break;
	        case 'object':
	          zIndex = baseZIndex + calcZIndex(zIndex);
	      }
	      id = type + '-' + zIndex;
	      return React.createElement("g", {
	        "data-layer": id,
	        "key": id,
	        "z": zIndex
	      }, render);
	    }));
	  };
	  chartBody = wrapLayers(layersGroups.chart);
	  chartBack = wrapLayers(layersGroups.back);
	  chartFront = wrapLayers(layersGroups.front);
	  chartWrapped = props.disableZoom ? React.createElement("g", null, chartBody) : React.createElement(ZoomableG, {
	    "zoomBehavior": zoomBehavior,
	    "width": chartWidth,
	    "height": chartHeight
	  }, chartBody);
	  return React.createElement(FillParentSvg, {
	    "document": chart
	  }, React.createElement(Margin, {
	    "left": margin.left,
	    "top": margin.top
	  }, React.createElement("defs", null, React.createElement("clipPath", {
	    "id": chartId + ".clip"
	  }, React.createElement("rect", {
	    "width": chartWidth,
	    "height": chartHeight
	  }))), chartBack, React.createElement(Axis, {
	    "scale": zoomedXScale,
	    "width": chartWidth,
	    "height": chartHeight,
	    "outerTickSize": 0,
	    "innerTickSize": -chartHeight,
	    "tickPadding": 10,
	    "orientation": "bottom"
	  }), React.createElement(Axis, {
	    "scale": zoomedYScale,
	    "width": chartWidth,
	    "height": chartHeight,
	    "outerTickSize": 0,
	    "innerTickSize": -chartWidth,
	    "orientation": "left"
	  }), React.createElement("rect", {
	    "className": "graph-borders",
	    "style": borderStyle,
	    "width": chartWidth,
	    "height": chartHeight
	  }), React.createElement("g", {
	    "clipPath": "url(#" + chartId + ".clip)"
	  }, chartWrapped), chartFront));
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.ReactZOrder=t():e.ReactZOrder=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){var t=e.children,n=t&&d(t)>0,r=n?o(t):null;return f["default"].createElement("g",null,r)}function o(e){return v(e).sort(i).map(a)}function i(e,t){return e.props.z-t.props.z}function a(e){var t=e.props,n=t.z,r=s(t,["z"]);if(!u(n))throw new Error("Every child in ZOrder container must have `z` property which must be valid Number.");return c({},e,{props:r})}function u(e){return Number(e)===e}var c=n(22)["default"],s=n(24)["default"],l=n(23)["default"];Object.defineProperty(t,"__esModule",{value:!0});var p=n(51),f=l(p),d=p.Children.count,v=p.Children.toArray;t["default"]=r,e.exports=t["default"]},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function i(e){if(p===clearTimeout)return clearTimeout(e);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{return p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}function a(){y&&d&&(y=!1,d.length?v=d.concat(v):m=-1,v.length&&u())}function u(){if(!y){var e=o(a);y=!0;for(var t=v.length;t;){for(d=v,v=[];++m<t;)d&&d[m].run();m=-1,t=v.length}d=null,y=!1,i(e)}}function c(e,t){this.fun=e,this.array=t}function s(){}var l,p,f=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(e){p=r}}();var d,v=[],y=!1,m=-1;f.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];v.push(new c(e,t)),1!==v.length||y||o(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=s,f.addListener=s,f.once=s,f.off=s,f.removeListener=s,f.removeAllListeners=s,f.emit=s,f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(e,t,n){(function(t){"use strict";var r=n(8),o=r;"production"!==t.env.NODE_ENV&&!function(){var e=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];var o=0,i="Warning: "+e.replace(/%s/g,function(){return n[o++]});"undefined"!=typeof console&&console.error(i);try{throw new Error(i)}catch(a){}};o=function(t,n){if(void 0===n)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==n.indexOf("Failed Composite propType: ")&&!t){for(var r=arguments.length,o=Array(r>2?r-2:0),i=2;r>i;i++)o[i-2]=arguments[i];e.apply(void 0,[n].concat(o))}}}(),e.exports=o}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function n(e,n,r,o,i,a,u,c){if("production"!==t.env.NODE_ENV&&void 0===n)throw new Error("invariant requires an error message argument");if(!e){var s;if(void 0===n)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[r,o,i,a,u,c],p=0;s=new Error(n.replace(/%s/g,function(){return l[p++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}e.exports=n}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e){if("production"!==t.env.NODE_ENV&&d.call(e,"ref")){var n=Object.getOwnPropertyDescriptor(e,"ref").get;if(n&&n.isReactWarning)return!1}return void 0!==e.ref}function o(e){if("production"!==t.env.NODE_ENV&&d.call(e,"key")){var n=Object.getOwnPropertyDescriptor(e,"key").get;if(n&&n.isReactWarning)return!1}return void 0!==e.key}function i(e,n){var r=function(){u||(u=!0,"production"!==t.env.NODE_ENV?p(!1,"%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",n):void 0)};r.isReactWarning=!0,Object.defineProperty(e,"key",{get:r,configurable:!0})}function a(e,n){var r=function(){c||(c=!0,"production"!==t.env.NODE_ENV?p(!1,"%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",n):void 0)};r.isReactWarning=!0,Object.defineProperty(e,"ref",{get:r,configurable:!0})}var u,c,s=n(7),l=n(6),p=n(2),f=n(14),d=Object.prototype.hasOwnProperty,v="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,y={key:!0,ref:!0,__self:!0,__source:!0},m=function(e,n,r,o,i,a,u){var c={$$typeof:v,type:e,key:n,ref:r,props:u,_owner:a};if("production"!==t.env.NODE_ENV){c._store={};var s=Array.isArray(u.children)?u.children.slice(0):u.children;f?(Object.defineProperty(c._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(c,"_self",{configurable:!1,enumerable:!1,writable:!1,value:o}),Object.defineProperty(c,"_shadowChildren",{configurable:!1,enumerable:!1,writable:!1,value:s}),Object.defineProperty(c,"_source",{configurable:!1,enumerable:!1,writable:!1,value:i})):(c._store.validated=!1,c._self=o,c._shadowChildren=s,c._source=i),Object.freeze&&(Object.freeze(c.props),Object.freeze(c))}return c};m.createElement=function(e,n,u){var c,s={},p=null,f=null,h=null,g=null;if(null!=n){r(n)&&(f=n.ref),o(n)&&(p=""+n.key),h=void 0===n.__self?null:n.__self,g=void 0===n.__source?null:n.__source;for(c in n)d.call(n,c)&&!y.hasOwnProperty(c)&&(s[c]=n[c])}var E=arguments.length-2;if(1===E)s.children=u;else if(E>1){for(var b=Array(E),N=0;E>N;N++)b[N]=arguments[N+2];s.children=b}if(e&&e.defaultProps){var _=e.defaultProps;for(c in _)void 0===s[c]&&(s[c]=_[c])}if("production"!==t.env.NODE_ENV&&(p||f)&&("undefined"==typeof s.$$typeof||s.$$typeof!==v)){var O="function"==typeof e?e.displayName||e.name||"Unknown":e;p&&i(s,O),f&&a(s,O)}return m(e,p,f,h,g,l.current,s)},m.createFactory=function(e){var t=m.createElement.bind(null,e);return t.type=e,t},m.cloneAndReplaceKey=function(e,t){var n=m(e.type,t,e.ref,e._self,e._source,e._owner,e.props);return n},m.cloneElement=function(e,t,n){var i,a=s({},e.props),u=e.key,c=e.ref,p=e._self,f=e._source,v=e._owner;if(null!=t){r(t)&&(c=t.ref,v=l.current),o(t)&&(u=""+t.key);var h;e.type&&e.type.defaultProps&&(h=e.type.defaultProps);for(i in t)d.call(t,i)&&!y.hasOwnProperty(i)&&(void 0===t[i]&&void 0!==h?a[i]=h[i]:a[i]=t[i])}var g=arguments.length-2;if(1===g)a.children=n;else if(g>1){for(var E=Array(g),b=0;g>b;b++)E[b]=arguments[b+2];a.children=E}return m(e.type,u,c,p,f,v,a)},m.isValidElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===v},m.REACT_ELEMENT_TYPE=v,e.exports=m}).call(t,n(1))},function(e,t){"use strict";function n(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;t>r;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(n);throw o.name="Invariant Violation",o.framesToPop=1,o}e.exports=n},function(e,t){"use strict";var n={current:null};e.exports=n},function(e,t){"use strict";function n(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function r(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;10>n;n++)t["_"+String.fromCharCode(n)]=n;var r=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==r.join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(e){o[e]=e}),"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},o)).join("")?!1:!0}catch(i){return!1}}var o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=r()?Object.assign:function(e,t){for(var r,a,u=n(e),c=1;c<arguments.length;c++){r=Object(arguments[c]);for(var s in r)o.call(r,s)&&(u[s]=r[s]);if(Object.getOwnPropertySymbols){a=Object.getOwnPropertySymbols(r);for(var l=0;l<a.length;l++)i.call(r,a[l])&&(u[a[l]]=r[a[l]])}}return u}},function(e,t){"use strict";function n(e){return function(){return e}}var r=function(){};r.thatReturns=n,r.thatReturnsFalse=n(!1),r.thatReturnsTrue=n(!0),r.thatReturnsNull=n(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){(function(t){"use strict";var n={};"production"!==t.env.NODE_ENV&&Object.freeze(n),e.exports=n}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e,t,n){this.props=e,this.context=t,this.refs=u,this.updater=n||i}var o=n(5),i=n(12),a=n(14),u=n(9),c=n(3),s=n(2);if(r.prototype.isReactComponent={},r.prototype.setState=function(e,n){"object"!=typeof e&&"function"!=typeof e&&null!=e?"production"!==t.env.NODE_ENV?c(!1,"setState(...): takes an object of state variables to update or a function which returns an object of state variables."):o("85"):void 0,this.updater.enqueueSetState(this,e),n&&this.updater.enqueueCallback(this,n,"setState")},r.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this),e&&this.updater.enqueueCallback(this,e,"forceUpdate")},"production"!==t.env.NODE_ENV){var l={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},p=function(e,n){a&&Object.defineProperty(r.prototype,e,{get:function(){return void("production"!==t.env.NODE_ENV?s(!1,"%s(...) is deprecated in plain JavaScript React classes. %s",n[0],n[1]):void 0)}})};for(var f in l)l.hasOwnProperty(f)&&p(f,l[f])}e.exports=r}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e){var t=Function.prototype.toString,n=Object.prototype.hasOwnProperty,r=RegExp("^"+t.call(n).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");try{var o=t.call(e);return r.test(o)}catch(i){return!1}}function o(e){return"."+e}function i(e){return parseInt(e.substr(1),10)}function a(e){if(w)return h.get(e);var t=o(e);return E[t]}function u(e){if(w)h["delete"](e);else{var t=o(e);delete E[t]}}function c(e,t,n){var r={element:t,parentID:n,text:null,childIDs:[],isMounted:!1,updateCount:0};if(w)h.set(e,r);else{var i=o(e);E[i]=r}}function s(e){if(w)g.add(e);else{var t=o(e);b[t]=!0}}function l(e){if(w)g["delete"](e);else{var t=o(e);delete b[t]}}function p(){return w?Array.from(h.keys()):Object.keys(E).map(i)}function f(){return w?Array.from(g.keys()):Object.keys(b).map(i)}function d(e){var t=a(e);if(t){var n=t.childIDs;u(e),n.forEach(d)}}function v(e,t,n){return"\n    in "+e+(t?" (at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+")":n?" (created by "+n+")":"")}function y(e){return null==e?"#empty":"string"==typeof e||"number"==typeof e?"#text":"string"==typeof e.type?e.type:e.type.displayName||e.type.name||"Unknown"}function m(e){var n,r=P.getDisplayName(e),o=P.getElement(e),i=P.getOwnerID(e);return i&&(n=P.getDisplayName(i)),"production"!==t.env.NODE_ENV?D(o,"ReactComponentTreeHook: Missing React element for debugID %s when building stack",e):void 0,v(r,o&&o._source,n)}var h,g,E,b,N=n(5),_=n(6),O=n(3),D=n(2),w="function"==typeof Array.from&&"function"==typeof Map&&r(Map)&&null!=Map.prototype&&"function"==typeof Map.prototype.keys&&r(Map.prototype.keys)&&"function"==typeof Set&&r(Set)&&null!=Set.prototype&&"function"==typeof Set.prototype.keys&&r(Set.prototype.keys);w?(h=new Map,g=new Set):(E={},b={});var x=[],P={onSetChildren:function(e,n){var r=a(e);r.childIDs=n;for(var o=0;o<n.length;o++){var i=n[o],u=a(i);u?void 0:"production"!==t.env.NODE_ENV?O(!1,"Expected hook events to fire for the child before its parent includes it in onSetChildren()."):N("140"),null==u.childIDs&&"object"==typeof u.element&&null!=u.element?"production"!==t.env.NODE_ENV?O(!1,"Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren()."):N("141"):void 0,u.isMounted?void 0:"production"!==t.env.NODE_ENV?O(!1,"Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren()."):N("71"),null==u.parentID&&(u.parentID=e),u.parentID!==e?"production"!==t.env.NODE_ENV?O(!1,"Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).",i,u.parentID,e):N("142",i,u.parentID,e):void 0}},onBeforeMountComponent:function(e,t,n){c(e,t,n)},onBeforeUpdateComponent:function(e,t){var n=a(e);n&&n.isMounted&&(n.element=t)},onMountComponent:function(e){var t=a(e);t.isMounted=!0;var n=0===t.parentID;n&&s(e)},onUpdateComponent:function(e){var t=a(e);t&&t.isMounted&&t.updateCount++},onUnmountComponent:function(e){var t=a(e);if(t){t.isMounted=!1;var n=0===t.parentID;n&&l(e)}x.push(e)},purgeUnmountedComponents:function(){if(!P._preventPurging){for(var e=0;e<x.length;e++){var t=x[e];d(t)}x.length=0}},isMounted:function(e){var t=a(e);return t?t.isMounted:!1},getCurrentStackAddendum:function(e){var t="";if(e){var n=e.type,r="function"==typeof n?n.displayName||n.name:n,o=e._owner;t+=v(r||"Unknown",e._source,o&&o.getName())}var i=_.current,a=i&&i._debugID;return t+=P.getStackAddendumByID(a)},getStackAddendumByID:function(e){for(var t="";e;)t+=m(e),e=P.getParentID(e);return t},getChildIDs:function(e){var t=a(e);return t?t.childIDs:[]},getDisplayName:function(e){var t=P.getElement(e);return t?y(t):null},getElement:function(e){var t=a(e);return t?t.element:null},getOwnerID:function(e){var t=P.getElement(e);return t&&t._owner?t._owner._debugID:null},getParentID:function(e){var t=a(e);return t?t.parentID:null},getSource:function(e){var t=a(e),n=t?t.element:null,r=null!=n?n._source:null;return r},getText:function(e){var t=P.getElement(e);return"string"==typeof t?t:"number"==typeof t?""+t:null},getUpdateCount:function(e){var t=a(e);return t?t.updateCount:0},getRegisteredIDs:p,getRootIDs:f};e.exports=P}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e,n){if("production"!==t.env.NODE_ENV){var r=e.constructor;"production"!==t.env.NODE_ENV?o(!1,"%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op. Please check the code for the %s component.",n,n,r&&(r.displayName||r.name)||"ReactClass"):void 0}}var o=n(2),i={isMounted:function(e){return!1},enqueueCallback:function(e,t){},enqueueForceUpdate:function(e){r(e,"forceUpdate")},enqueueReplaceState:function(e,t){r(e,"replaceState")},enqueueSetState:function(e,t){r(e,"setState")}};e.exports=i}).call(t,n(1))},function(e,t,n){(function(t){"use strict";var n={};"production"!==t.env.NODE_ENV&&(n={prop:"prop",context:"context",childContext:"child context"}),e.exports=n}).call(t,n(1))},function(e,t,n){(function(t){"use strict";var n=!1;if("production"!==t.env.NODE_ENV)try{Object.defineProperty({},"x",{get:function(){}}),n=!0}catch(r){}e.exports=n}).call(t,n(1))},function(e,t){"use strict";function n(e){var t=e&&(r&&e[r]||e[o]);return"function"==typeof t?t:void 0}var r="function"==typeof Symbol&&Symbol.iterator,o="@@iterator";e.exports=n},function(e,t){var n=e.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(e,t,n){(function(t){"use strict";var r=n(3),o=function(e){var n,o={};e instanceof Object&&!Array.isArray(e)?void 0:"production"!==t.env.NODE_ENV?r(!1,"keyMirror(...): Argument must be an object."):r(!1);for(n in e)e.hasOwnProperty(n)&&(o[n]=n);return o};e.exports=o}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(){if(c.current){var e=c.current.getName();if(e)return" Check the render method of `"+e+"`."}return""}function o(e){var t=r();if(!t){var n="string"==typeof e?e:e.displayName||e.name;n&&(t=" Check the top-level render call using <"+n+">.")}return t}function i(e,n){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var r=m.uniqueKey||(m.uniqueKey={}),i=o(n);if(!r[i]){r[i]=!0;var a="";e&&e._owner&&e._owner!==c.current&&(a=" It was passed a child from "+e._owner.getName()+"."),"production"!==t.env.NODE_ENV?y(!1,'Each child in an array or iterator should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.%s',i,a,s.getCurrentStackAddendum(e)):void 0}}}function a(e,t){if("object"==typeof e)if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];l.isValidElement(r)&&i(r,t)}else if(l.isValidElement(e))e._store&&(e._store.validated=!0);else if(e){var o=v(e);if(o&&o!==e.entries)for(var a,u=o.call(e);!(a=u.next()).done;)l.isValidElement(a.value)&&i(a.value,t)}}function u(e){var n=e.type;if("function"==typeof n){var r=n.displayName||n.name;n.propTypes&&f(n.propTypes,e.props,p.prop,r,e,null),"function"==typeof n.getDefaultProps&&("production"!==t.env.NODE_ENV?y(n.getDefaultProps.isReactClassApproved,"getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead."):void 0)}}var c=n(6),s=n(11),l=n(4),p=n(19),f=n(48),d=n(14),v=n(15),y=n(2),m={},h={createElement:function(e,n,o){var i="string"==typeof e||"function"==typeof e;i||("production"!==t.env.NODE_ENV?y(!1,"React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components).%s",r()):void 0);var c=l.createElement.apply(this,arguments);if(null==c)return c;if(i)for(var s=2;s<arguments.length;s++)a(arguments[s],e);return u(c),c},createFactory:function(e){var n=h.createElement.bind(null,e);return n.type=e,"production"!==t.env.NODE_ENV&&d&&Object.defineProperty(n,"type",{enumerable:!1,get:function(){return"production"!==t.env.NODE_ENV?y(!1,"Factory.type is deprecated. Access the class directly before passing it to createFactory."):void 0,Object.defineProperty(this,"type",{value:e}),e}}),n},cloneElement:function(e,t,n){for(var r=l.cloneElement.apply(this,arguments),o=2;o<arguments.length;o++)a(arguments[o],r.type);return u(r),r}};e.exports=h}).call(t,n(1))},function(e,t,n){"use strict";var r=n(17),o=r({prop:null,context:null,childContext:null});e.exports=o},function(e,t){"use strict";var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=n},function(e,t,n){e.exports={"default":n(25),__esModule:!0}},function(e,t,n){"use strict";var r=n(21)["default"];t["default"]=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.__esModule=!0},function(e,t){"use strict";t["default"]=function(e){return e&&e.__esModule?e:{"default":e}},t.__esModule=!0},function(e,t){"use strict";t["default"]=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},t.__esModule=!0},function(e,t,n){n(37),e.exports=n(16).Object.assign},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(26);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(32),o=n(16),i=n(28),a="prototype",u=function(e,t,n){var c,s,l,p=e&u.F,f=e&u.G,d=e&u.S,v=e&u.P,y=e&u.B,m=e&u.W,h=f?o:o[t]||(o[t]={}),g=f?r:d?r[t]:(r[t]||{})[a];f&&(n=t);for(c in n)s=!p&&g&&c in g,s&&c in h||(l=s?g[c]:n[c],h[c]=f&&"function"!=typeof g[c]?n[c]:y&&s?i(l,r):m&&g[c]==l?function(e){var t=function(t){return this instanceof e?new e(t):e(t)};return t[a]=e[a],t}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((h[a]||(h[a]={}))[c]=l))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,e.exports=u},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){var r=n(27);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t){var n=Object;e.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(e,t,n){var r=n(34),o=n(36),i=n(33);e.exports=n(31)(function(){var e=Object.assign,t={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return t[r]=7,o.split("").forEach(function(e){n[e]=e}),7!=e({},t)[r]||Object.keys(e({},n)).join("")!=o})?function(e,t){for(var n=o(e),a=arguments,u=a.length,c=1,s=r.getKeys,l=r.getSymbols,p=r.isEnum;u>c;)for(var f,d=i(a[c++]),v=l?s(d).concat(l(d)):s(d),y=v.length,m=0;y>m;)p.call(d,f=v[m++])&&(n[f]=d[f]);return n}:Object.assign},function(e,t,n){var r=n(29);e.exports=function(e){return Object(r(e))}},function(e,t,n){var r=n(30);r(r.S+r.F,"Object",{assign:n(35)})},function(e,t){"use strict";var n=function(e){var t;for(t in e)if(e.hasOwnProperty(t))return t;return null};e.exports=n},function(e,t){"use strict";function n(e){var t=/[=:]/g,n={"=":"=0",":":"=2"},r=(""+e).replace(t,function(e){return n[e]});return"$"+r}function r(e){var t=/(=0|=2)/g,n={"=0":"=","=2":":"},r="."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1);return(""+r).replace(t,function(e){return n[e]})}var o={escape:n,unescape:r};e.exports=o},function(e,t,n){(function(t){"use strict";var r=n(5),o=n(3),i=function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)},a=function(e,t){var n=this;if(n.instancePool.length){var r=n.instancePool.pop();return n.call(r,e,t),r}return new n(e,t)},u=function(e,t,n){var r=this;if(r.instancePool.length){var o=r.instancePool.pop();return r.call(o,e,t,n),o}return new r(e,t,n)},c=function(e,t,n,r){var o=this;if(o.instancePool.length){var i=o.instancePool.pop();return o.call(i,e,t,n,r),i}return new o(e,t,n,r)},s=function(e,t,n,r,o){var i=this;if(i.instancePool.length){var a=i.instancePool.pop();return i.call(a,e,t,n,r,o),a}return new i(e,t,n,r,o)},l=function(e){var n=this;e instanceof n?void 0:"production"!==t.env.NODE_ENV?o(!1,"Trying to release an instance into a pool of a different type."):r("25"),e.destructor(),n.instancePool.length<n.poolSize&&n.instancePool.push(e)},p=10,f=i,d=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||f,n.poolSize||(n.poolSize=p),n.release=l,n},v={addPoolingTo:d,oneArgumentPooler:i,twoArgumentPooler:a,threeArgumentPooler:u,fourArgumentPooler:c,fiveArgumentPooler:s};e.exports=v}).call(t,n(1))},function(e,t,n){(function(t){"use strict";var r=n(7),o=n(42),i=n(10),a=n(46),u=n(43),c=n(44),s=n(4),l=n(45),p=n(47),f=n(49),d=n(2),v=s.createElement,y=s.createFactory,m=s.cloneElement;if("production"!==t.env.NODE_ENV){var h=n(18);v=h.createElement,y=h.createFactory,m=h.cloneElement}var g=r;if("production"!==t.env.NODE_ENV){var E=!1;g=function(){return"production"!==t.env.NODE_ENV?d(E,"React.__spread is deprecated and should not be used. Use Object.assign directly or another helper function with similar semantics. You may be seeing this warning due to your compiler. See https://fb.me/react-spread-deprecation for more details."):void 0,E=!0,r.apply(null,arguments)}}var b={Children:{map:o.map,forEach:o.forEach,count:o.count,toArray:o.toArray,only:f},Component:i,PureComponent:a,createElement:v,cloneElement:m,isValidElement:s.isValidElement,PropTypes:l,createClass:u.createClass,createFactory:y,createMixin:function(e){return e},DOM:c,version:p,__spread:g};e.exports=b}).call(t,n(1))},function(e,t,n){"use strict";function r(e){return(""+e).replace(b,"$&/")}function o(e,t){this.func=e,this.context=t,this.count=0}function i(e,t,n){var r=e.func,o=e.context;r.call(o,t,e.count++)}function a(e,t,n){if(null==e)return e;var r=o.getPooled(t,n);h(e,i,r),o.release(r)}function u(e,t,n,r){this.result=e,this.keyPrefix=t,this.func=n,this.context=r,this.count=0}function c(e,t,n){var o=e.result,i=e.keyPrefix,a=e.func,u=e.context,c=a.call(u,t,e.count++);Array.isArray(c)?s(c,o,n,m.thatReturnsArgument):null!=c&&(y.isValidElement(c)&&(c=y.cloneAndReplaceKey(c,i+(!c.key||t&&t.key===c.key?"":r(c.key)+"/")+n)),o.push(c))}function s(e,t,n,o,i){var a="";null!=n&&(a=r(n)+"/");var s=u.getPooled(t,a,o,i);h(e,c,s),u.release(s)}function l(e,t,n){if(null==e)return e;var r=[];return s(e,r,null,t,n),r}function p(e,t,n){return null}function f(e,t){return h(e,p,null)}function d(e){var t=[];return s(e,t,null,m.thatReturnsArgument),t}var v=n(40),y=n(4),m=n(8),h=n(50),g=v.twoArgumentPooler,E=v.fourArgumentPooler,b=/\/+/g;o.prototype.destructor=function(){this.func=null,this.context=null,this.count=0},v.addPoolingTo(o,g),u.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},v.addPoolingTo(u,E);var N={forEach:a,map:l,mapIntoWithKeyPrefixInternal:s,count:f,toArray:d};e.exports=N},function(e,t,n){(function(t){"use strict";function r(e,n,r){for(var o in n)n.hasOwnProperty(o)&&("production"!==t.env.NODE_ENV?O("function"==typeof n[o],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",e.displayName||"ReactClass",h[r],o):void 0)}function o(e,n){var r=P.hasOwnProperty(n)?P[n]:null;I.hasOwnProperty(n)&&(r!==w.OVERRIDE_BASE?"production"!==t.env.NODE_ENV?b(!1,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",n):f("73",n):void 0),e&&(r!==w.DEFINE_MANY&&r!==w.DEFINE_MANY_MERGED?"production"!==t.env.NODE_ENV?b(!1,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",n):f("74",n):void 0)}function i(e,n){if(n){"function"==typeof n?"production"!==t.env.NODE_ENV?b(!1,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."):f("75"):void 0,y.isValidElement(n)?"production"!==t.env.NODE_ENV?b(!1,"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object."):f("76"):void 0;var r=e.prototype,i=r.__reactAutoBindPairs;n.hasOwnProperty(D)&&j.mixins(e,n.mixins);for(var a in n)if(n.hasOwnProperty(a)&&a!==D){var u=n[a],l=r.hasOwnProperty(a);if(o(l,a),j.hasOwnProperty(a))j[a](e,u);else{var p=P.hasOwnProperty(a),d="function"==typeof u,v=d&&!p&&!l&&n.autobind!==!1;if(v)i.push(a,u),r[a]=u;else if(l){var m=P[a];!p||m!==w.DEFINE_MANY_MERGED&&m!==w.DEFINE_MANY?"production"!==t.env.NODE_ENV?b(!1,"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",m,a):f("77",m,a):void 0,m===w.DEFINE_MANY_MERGED?r[a]=c(r[a],u):m===w.DEFINE_MANY&&(r[a]=s(r[a],u))}else r[a]=u,"production"!==t.env.NODE_ENV&&"function"==typeof u&&n.displayName&&(r[a].displayName=n.displayName+"_"+a)}}}else if("production"!==t.env.NODE_ENV){var h=typeof n,g="object"===h&&null!==n;"production"!==t.env.NODE_ENV?O(g,"%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.",e.displayName||"ReactClass",null===n?null:h):void 0}}function a(e,n){if(n)for(var r in n){var o=n[r];if(n.hasOwnProperty(r)){var i=r in j;i?"production"!==t.env.NODE_ENV?b(!1,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',r):f("78",r):void 0;var a=r in e;a?"production"!==t.env.NODE_ENV?b(!1,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",r):f("79",r):void 0,e[r]=o}}}function u(e,n){e&&n&&"object"==typeof e&&"object"==typeof n?void 0:"production"!==t.env.NODE_ENV?b(!1,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."):f("80");for(var r in n)n.hasOwnProperty(r)&&(void 0!==e[r]?"production"!==t.env.NODE_ENV?b(!1,"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",r):f("81",r):void 0,e[r]=n[r]);return e}function c(e,t){return function(){var n=e.apply(this,arguments),r=t.apply(this,arguments);if(null==n)return r;if(null==r)return n;var o={};return u(o,n),u(o,r),o}}function s(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function l(e,n){var r=n.bind(e);if("production"!==t.env.NODE_ENV){r.__reactBoundContext=e,r.__reactBoundMethod=n,r.__reactBoundArguments=null;var o=e.constructor.displayName,i=r.bind;r.bind=function(a){for(var u=arguments.length,c=Array(u>1?u-1:0),s=1;u>s;s++)c[s-1]=arguments[s];if(a!==e&&null!==a)"production"!==t.env.NODE_ENV?O(!1,"bind(): React component methods may only be bound to the component instance. See %s",o):void 0;else if(!c.length)return"production"!==t.env.NODE_ENV?O(!1,"bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s",o):void 0,r;var l=i.apply(r,arguments);return l.__reactBoundContext=e,l.__reactBoundMethod=n,l.__reactBoundArguments=c,l}}return r}function p(e){for(var t=e.__reactAutoBindPairs,n=0;n<t.length;n+=2){var r=t[n],o=t[n+1];e[r]=l(e,o)}}var f=n(5),d=n(7),v=n(10),y=n(4),m=n(19),h=n(13),g=n(12),E=n(9),b=n(3),N=n(17),_=n(38),O=n(2),D=_({mixins:null}),w=N({DEFINE_ONCE:null,DEFINE_MANY:null,OVERRIDE_BASE:null,DEFINE_MANY_MERGED:null}),x=[],P={mixins:w.DEFINE_MANY,statics:w.DEFINE_MANY,propTypes:w.DEFINE_MANY,contextTypes:w.DEFINE_MANY,childContextTypes:w.DEFINE_MANY,getDefaultProps:w.DEFINE_MANY_MERGED,getInitialState:w.DEFINE_MANY_MERGED,getChildContext:w.DEFINE_MANY_MERGED,render:w.DEFINE_ONCE,componentWillMount:w.DEFINE_MANY,componentDidMount:w.DEFINE_MANY,componentWillReceiveProps:w.DEFINE_MANY,shouldComponentUpdate:w.DEFINE_ONCE,componentWillUpdate:w.DEFINE_MANY,componentDidUpdate:w.DEFINE_MANY,componentWillUnmount:w.DEFINE_MANY,updateComponent:w.OVERRIDE_BASE},j={displayName:function(e,t){e.displayName=t},mixins:function(e,t){if(t)for(var n=0;n<t.length;n++)i(e,t[n])},childContextTypes:function(e,n){"production"!==t.env.NODE_ENV&&r(e,n,m.childContext),e.childContextTypes=d({},e.childContextTypes,n)},contextTypes:function(e,n){"production"!==t.env.NODE_ENV&&r(e,n,m.context),e.contextTypes=d({},e.contextTypes,n)},getDefaultProps:function(e,t){e.getDefaultProps?e.getDefaultProps=c(e.getDefaultProps,t):e.getDefaultProps=t},propTypes:function(e,n){"production"!==t.env.NODE_ENV&&r(e,n,m.prop),e.propTypes=d({},e.propTypes,n)},statics:function(e,t){a(e,t)},autobind:function(){}},I={replaceState:function(e,t){this.updater.enqueueReplaceState(this,e),t&&this.updater.enqueueCallback(this,t,"replaceState");
	},isMounted:function(){return this.updater.isMounted(this)}},k=function(){};d(k.prototype,v.prototype,I);var R={createClass:function(e){var n=function(e,r,o){"production"!==t.env.NODE_ENV&&("production"!==t.env.NODE_ENV?O(this instanceof n,"Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"):void 0),this.__reactAutoBindPairs.length&&p(this),this.props=e,this.context=r,this.refs=E,this.updater=o||g,this.state=null;var i=this.getInitialState?this.getInitialState():null;"production"!==t.env.NODE_ENV&&void 0===i&&this.getInitialState._isMockFunction&&(i=null),"object"!=typeof i||Array.isArray(i)?"production"!==t.env.NODE_ENV?b(!1,"%s.getInitialState(): must return an object or null",n.displayName||"ReactCompositeComponent"):f("82",n.displayName||"ReactCompositeComponent"):void 0,this.state=i};n.prototype=new k,n.prototype.constructor=n,n.prototype.__reactAutoBindPairs=[],x.forEach(i.bind(null,n)),i(n,e),n.getDefaultProps&&(n.defaultProps=n.getDefaultProps()),"production"!==t.env.NODE_ENV&&(n.getDefaultProps&&(n.getDefaultProps.isReactClassApproved={}),n.prototype.getInitialState&&(n.prototype.getInitialState.isReactClassApproved={})),n.prototype.render?void 0:"production"!==t.env.NODE_ENV?b(!1,"createClass(...): Class specification must implement a `render` method."):f("83"),"production"!==t.env.NODE_ENV&&("production"!==t.env.NODE_ENV?O(!n.prototype.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",e.displayName||"A component"):void 0,"production"!==t.env.NODE_ENV?O(!n.prototype.componentWillRecieveProps,"%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",e.displayName||"A component"):void 0);for(var r in P)n.prototype[r]||(n.prototype[r]=null);return n},injection:{injectMixin:function(e){x.push(e)}}};e.exports=R}).call(t,n(1))},function(e,t,n){(function(t){"use strict";var r=n(4),o=r.createFactory;if("production"!==t.env.NODE_ENV){var i=n(18);o=i.createFactory}var a={a:o("a"),abbr:o("abbr"),address:o("address"),area:o("area"),article:o("article"),aside:o("aside"),audio:o("audio"),b:o("b"),base:o("base"),bdi:o("bdi"),bdo:o("bdo"),big:o("big"),blockquote:o("blockquote"),body:o("body"),br:o("br"),button:o("button"),canvas:o("canvas"),caption:o("caption"),cite:o("cite"),code:o("code"),col:o("col"),colgroup:o("colgroup"),data:o("data"),datalist:o("datalist"),dd:o("dd"),del:o("del"),details:o("details"),dfn:o("dfn"),dialog:o("dialog"),div:o("div"),dl:o("dl"),dt:o("dt"),em:o("em"),embed:o("embed"),fieldset:o("fieldset"),figcaption:o("figcaption"),figure:o("figure"),footer:o("footer"),form:o("form"),h1:o("h1"),h2:o("h2"),h3:o("h3"),h4:o("h4"),h5:o("h5"),h6:o("h6"),head:o("head"),header:o("header"),hgroup:o("hgroup"),hr:o("hr"),html:o("html"),i:o("i"),iframe:o("iframe"),img:o("img"),input:o("input"),ins:o("ins"),kbd:o("kbd"),keygen:o("keygen"),label:o("label"),legend:o("legend"),li:o("li"),link:o("link"),main:o("main"),map:o("map"),mark:o("mark"),menu:o("menu"),menuitem:o("menuitem"),meta:o("meta"),meter:o("meter"),nav:o("nav"),noscript:o("noscript"),object:o("object"),ol:o("ol"),optgroup:o("optgroup"),option:o("option"),output:o("output"),p:o("p"),param:o("param"),picture:o("picture"),pre:o("pre"),progress:o("progress"),q:o("q"),rp:o("rp"),rt:o("rt"),ruby:o("ruby"),s:o("s"),samp:o("samp"),script:o("script"),section:o("section"),select:o("select"),small:o("small"),source:o("source"),span:o("span"),strong:o("strong"),style:o("style"),sub:o("sub"),summary:o("summary"),sup:o("sup"),table:o("table"),tbody:o("tbody"),td:o("td"),textarea:o("textarea"),tfoot:o("tfoot"),th:o("th"),thead:o("thead"),time:o("time"),title:o("title"),tr:o("tr"),track:o("track"),u:o("u"),ul:o("ul"),"var":o("var"),video:o("video"),wbr:o("wbr"),circle:o("circle"),clipPath:o("clipPath"),defs:o("defs"),ellipse:o("ellipse"),g:o("g"),image:o("image"),line:o("line"),linearGradient:o("linearGradient"),mask:o("mask"),path:o("path"),pattern:o("pattern"),polygon:o("polygon"),polyline:o("polyline"),radialGradient:o("radialGradient"),rect:o("rect"),stop:o("stop"),svg:o("svg"),text:o("text"),tspan:o("tspan")};e.exports=a}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t}function o(e){this.message=e,this.stack=""}function i(e){function n(n,i,a,u,c,s,l){if(u=u||P,s=s||a,"production"!==t.env.NODE_ENV&&l!==O&&"undefined"!=typeof console){var p=u+":"+a;r[p]||("production"!==t.env.NODE_ENV?x(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will not work in the next major version. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",s,u):void 0,r[p]=!0)}if(null==i[a]){var f=_[c];return n?new o("Required "+f+" `"+s+"` was not specified in "+("`"+u+"`.")):null}return e(i,a,u,c,s)}if("production"!==t.env.NODE_ENV)var r={};var i=n.bind(null,!1);return i.isRequired=n.bind(null,!0),i}function a(e){function t(t,n,r,i,a,u){var c=t[n],s=g(c);if(s!==e){var l=_[i],p=E(c);return new o("Invalid "+l+" `"+a+"` of type "+("`"+p+"` supplied to `"+r+"`, expected ")+("`"+e+"`."))}return null}return i(t)}function u(){return i(D.thatReturns(null))}function c(e){function t(t,n,r,i,a){if("function"!=typeof e)return new o("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=t[n];if(!Array.isArray(u)){var c=_[i],s=g(u);return new o("Invalid "+c+" `"+a+"` of type "+("`"+s+"` supplied to `"+r+"`, expected an array."))}for(var l=0;l<u.length;l++){var p=e(u,l,r,i,a+"["+l+"]",O);if(p instanceof Error)return p}return null}return i(t)}function s(){function e(e,t,n,r,i){var a=e[t];if(!N.isValidElement(a)){var u=_[r],c=g(a);return new o("Invalid "+u+" `"+i+"` of type "+("`"+c+"` supplied to `"+n+"`, expected a single ReactElement."))}return null}return i(e)}function l(e){function t(t,n,r,i,a){if(!(t[n]instanceof e)){var u=_[i],c=e.name||P,s=b(t[n]);return new o("Invalid "+u+" `"+a+"` of type "+("`"+s+"` supplied to `"+r+"`, expected ")+("instance of `"+c+"`."))}return null}return i(t)}function p(e){function n(t,n,i,a,u){for(var c=t[n],s=0;s<e.length;s++)if(r(c,e[s]))return null;var l=_[a],p=JSON.stringify(e);return new o("Invalid "+l+" `"+u+"` of value `"+c+"` "+("supplied to `"+i+"`, expected one of "+p+"."))}return Array.isArray(e)?i(n):("production"!==t.env.NODE_ENV?x(!1,"Invalid argument supplied to oneOf, expected an instance of array."):void 0,D.thatReturnsNull)}function f(e){function t(t,n,r,i,a){if("function"!=typeof e)return new o("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=t[n],c=g(u);if("object"!==c){var s=_[i];return new o("Invalid "+s+" `"+a+"` of type "+("`"+c+"` supplied to `"+r+"`, expected an object."))}for(var l in u)if(u.hasOwnProperty(l)){var p=e(u,l,r,i,a+"."+l,O);if(p instanceof Error)return p}return null}return i(t)}function d(e){function n(t,n,r,i,a){for(var u=0;u<e.length;u++){var c=e[u];if(null==c(t,n,r,i,a,O))return null}var s=_[i];return new o("Invalid "+s+" `"+a+"` supplied to "+("`"+r+"`."))}return Array.isArray(e)?i(n):("production"!==t.env.NODE_ENV?x(!1,"Invalid argument supplied to oneOfType, expected an instance of array."):void 0,D.thatReturnsNull)}function v(){function e(e,t,n,r,i){if(!m(e[t])){var a=_[r];return new o("Invalid "+a+" `"+i+"` supplied to "+("`"+n+"`, expected a ReactNode."))}return null}return i(e)}function y(e){function t(t,n,r,i,a){var u=t[n],c=g(u);if("object"!==c){var s=_[i];return new o("Invalid "+s+" `"+a+"` of type `"+c+"` "+("supplied to `"+r+"`, expected `object`."))}for(var l in e){var p=e[l];if(p){var f=p(u,l,r,i,a+"."+l,O);if(f)return f}}return null}return i(t)}function m(e){switch(typeof e){case"number":case"string":case"undefined":return!0;case"boolean":return!e;case"object":if(Array.isArray(e))return e.every(m);if(null===e||N.isValidElement(e))return!0;var t=w(e);if(!t)return!1;var n,r=t.call(e);if(t!==e.entries){for(;!(n=r.next()).done;)if(!m(n.value))return!1}else for(;!(n=r.next()).done;){var o=n.value;if(o&&!m(o[1]))return!1}return!0;default:return!1}}function h(e,t){return"symbol"===e?!0:"Symbol"===t["@@toStringTag"]?!0:"function"==typeof Symbol&&t instanceof Symbol?!0:!1}function g(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":h(t,e)?"symbol":t}function E(e){var t=g(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function b(e){return e.constructor&&e.constructor.name?e.constructor.name:P}var N=n(4),_=n(13),O=n(20),D=n(8),w=n(15),x=n(2),P="<<anonymous>>",j={array:a("array"),bool:a("boolean"),func:a("function"),number:a("number"),object:a("object"),string:a("string"),symbol:a("symbol"),any:u(),arrayOf:c,element:s(),instanceOf:l,node:v(),objectOf:f,oneOf:p,oneOfType:d,shape:y};o.prototype=Error.prototype,e.exports=j}).call(t,n(1))},function(e,t,n){"use strict";function r(e,t,n){this.props=e,this.context=t,this.refs=c,this.updater=n||u}function o(){}var i=n(7),a=n(10),u=n(12),c=n(9);o.prototype=a.prototype,r.prototype=new o,r.prototype.constructor=r,i(r.prototype,a.prototype),r.prototype.isPureReactComponent=!0,e.exports=r},function(e,t){"use strict";e.exports="15.3.2"},function(e,t,n){(function(t){"use strict";function r(e,r,p,f,d,v){for(var y in e)if(e.hasOwnProperty(y)){var m;try{"function"!=typeof e[y]?"production"!==t.env.NODE_ENV?c(!1,"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",f||"React class",a[p],y):i("84",f||"React class",a[p],y):void 0,m=e[y](r,y,f,p,null,u)}catch(h){m=h}if("production"!==t.env.NODE_ENV?s(!m||m instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",f||"React class",a[p],y,typeof m):void 0,m instanceof Error&&!(m.message in l)){l[m.message]=!0;var g="";"production"!==t.env.NODE_ENV&&(o||(o=n(11)),null!==v?g=o.getStackAddendumByID(v):null!==d&&(g=o.getCurrentStackAddendum(d))),"production"!==t.env.NODE_ENV?s(!1,"Failed %s type: %s%s",p,m.message,g):void 0}}}var o,i=n(5),a=n(13),u=n(20),c=n(3),s=n(2);"undefined"!=typeof t&&t.env&&"test"===t.env.NODE_ENV&&(o=n(11));var l={};e.exports=r}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e){return i.isValidElement(e)?void 0:"production"!==t.env.NODE_ENV?a(!1,"React.Children.only expected to receive a single React element child."):o("143"),e}var o=n(5),i=n(4),a=n(3);e.exports=r}).call(t,n(1))},function(e,t,n){(function(t){"use strict";function r(e,t){return e&&"object"==typeof e&&null!=e.key?p.escape(e.key):t.toString(36)}function o(e,n,i,m){var h=typeof e;if(("undefined"===h||"boolean"===h)&&(e=null),null===e||"string"===h||"number"===h||c.isValidElement(e))return i(m,e,""===n?d+r(e,0):n),1;var g,E,b=0,N=""===n?d:n+v;if(Array.isArray(e))for(var _=0;_<e.length;_++)g=e[_],E=N+r(g,_),b+=o(g,E,i,m);else{var O=s(e);if(O){var D,w=O.call(e);if(O!==e.entries)for(var x=0;!(D=w.next()).done;)g=D.value,E=N+r(g,x++),b+=o(g,E,i,m);else{if("production"!==t.env.NODE_ENV){var P="";if(u.current){var j=u.current.getName();j&&(P=" Check the render method of `"+j+"`.")}"production"!==t.env.NODE_ENV?f(y,"Using Maps as children is not yet fully supported. It is an experimental feature that might be removed. Convert it to a sequence / iterable of keyed ReactElements instead.%s",P):void 0,y=!0}for(;!(D=w.next()).done;){var I=D.value;I&&(g=I[1],E=N+p.escape(I[0])+v+r(g,0),b+=o(g,E,i,m))}}}else if("object"===h){var k="";if("production"!==t.env.NODE_ENV&&(k=" If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.",e._isReactElement&&(k=" It looks like you're using an element created by a different version of React. Make sure to use only one copy of React."),u.current)){var R=u.current.getName();R&&(k+=" Check the render method of `"+R+"`.")}var A=String(e);"production"!==t.env.NODE_ENV?l(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===A?"object with keys {"+Object.keys(e).join(", ")+"}":A,k):a("31","[object Object]"===A?"object with keys {"+Object.keys(e).join(", ")+"}":A,k)}}return b}function i(e,t,n){return null==e?0:o(e,"",t,n)}var a=n(5),u=n(6),c=n(4),s=n(15),l=n(3),p=n(39),f=n(2),d=".",v=":",y=!1;e.exports=i}).call(t,n(1))},function(e,t,n){"use strict";e.exports=n(41)}])});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var d3 = __webpack_require__(10);

	var Axis = React.createClass({
	    displayName: "Axis",

	    propTypes: {
	        tickArguments: React.PropTypes.array,
	        tickValues: React.PropTypes.array,
	        tickFormat: React.PropTypes.func,
	        innerTickSize: React.PropTypes.number,
	        tickPadding: React.PropTypes.number,
	        outerTickSize: React.PropTypes.number,
	        scale: React.PropTypes.func.isRequired,
	        className: React.PropTypes.string,
	        zero: React.PropTypes.number,
	        orientation: React.PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
	        label: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            tickArguments: [10],
	            tickValues: null,
	            tickFormat: null,
	            innerTickSize: 6,
	            tickPadding: 3,
	            outerTickSize: 6,
	            className: "axis",
	            zero: 0,
	            label: ""
	        };
	    },

	    _getTranslateString: function _getTranslateString() {
	        var _props = this.props;
	        var orientation = _props.orientation;
	        var height = _props.height;
	        var width = _props.width;
	        var zero = _props.zero;

	        if (orientation === "top") {
	            return "translate(0, " + zero + ")";
	        } else if (orientation === "bottom") {
	            return "translate(0, " + (zero == 0 ? height : zero) + ")";
	        } else if (orientation === "left") {
	            return "translate(" + zero + ", 0)";
	        } else if (orientation === "right") {
	            return "translate(" + (zero == 0 ? width : zero) + ", 0)";
	        } else {
	            return "";
	        }
	    },

	    render: function render() {
	        var _props = this.props;
	        var height = _props.height;
	        var width = _props.width;
	        var tickArguments = _props.tickArguments;
	        var tickValues = _props.tickValues;
	        var tickFormat = _props.tickFormat;
	        var innerTickSize = _props.innerTickSize;
	        var tickPadding = _props.tickPadding;
	        var outerTickSize = _props.outerTickSize;
	        var scale = _props.scale;
	        var orientation = _props.orientation;
	        var className = _props.className;
	        var zero = _props.zero;
	        var label = _props.label;

	        var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues;

	        if (!tickFormat) {
	            if (scale.tickFormat) {
	                tickFormat = scale.tickFormat.apply(scale, tickArguments);
	            } else {
	                tickFormat = function (x) {
	                    return x;
	                };
	            }
	        }

	        // TODO: is there a cleaner way? removes the 0 tick if axes are crossing
	        if (zero != height && zero != width && zero != 0) {
	            ticks = ticks.filter(function (element, index, array) {
	                return element == 0 ? false : true;
	            });
	        }

	        var tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

	        var sign = orientation === "top" || orientation === "left" ? -1 : 1;

	        var range = this._d3_scaleRange(scale);

	        var activeScale = scale.rangeBand ? function (e) {
	            return scale(e) + scale.rangeBand() / 2;
	        } : scale;

	        var transform = undefined,
	            x = undefined,
	            y = undefined,
	            x2 = undefined,
	            y2 = undefined,
	            dy = undefined,
	            textAnchor = undefined,
	            d = undefined,
	            labelElement = undefined;
	        if (orientation === "bottom" || orientation === "top") {
	            transform = "translate({}, 0)";
	            x = 0;
	            y = sign * tickSpacing;
	            x2 = 0;
	            y2 = sign * innerTickSize;
	            dy = sign < 0 ? "0em" : ".71em";
	            textAnchor = "middle";
	            d = "M" + range[0] + ", " + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;

	            labelElement = React.createElement(
	                "text",
	                { className: "" + className + " label", textAnchor: "end", x: width, y: -6 },
	                label
	            );
	        } else {
	            transform = "translate(0, {})";
	            x = sign * tickSpacing;
	            y = 0;
	            x2 = sign * innerTickSize;
	            y2 = 0;
	            dy = ".32em";
	            textAnchor = sign < 0 ? "end" : "start";
	            d = "M" + sign * outerTickSize + ", " + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;

	            labelElement = React.createElement(
	                "text",
	                { className: "" + className + " label", textAnchor: "end", y: 6, dy: ".75em", transform: "rotate(-90)" },
	                label
	            );
	        }

	        var tickElements = ticks.map(function (tick, index) {
	            var position = activeScale(tick);
	            var translate = transform.replace("{}", position);
	            return React.createElement(
	                "g",
	                { key: "" + tick + "." + index, className: "tick", transform: translate },
	                React.createElement("line", { x2: x2, y2: y2, stroke: "#aaa" }),
	                React.createElement(
	                    "text",
	                    { x: x, y: y, dy: dy, textAnchor: textAnchor },
	                    tickFormat(tick)
	                )
	            );
	        });

	        var pathElement = React.createElement("path", { className: "domain", d: d, fill: "none", stroke: "#aaa" });

	        var axisBackground = React.createElement("rect", { className: "axis-background", fill: "none" });

	        return React.createElement(
	            "g",
	            { ref: "axis", className: className, transform: this._getTranslateString(), style: { shapeRendering: "crispEdges" } },
	            axisBackground,
	            tickElements,
	            pathElement,
	            labelElement
	        );
	    },

	    _d3_scaleExtent: function _d3_scaleExtent(domain) {
	        var start = domain[0],
	            stop = domain[domain.length - 1];
	        return start < stop ? [start, stop] : [stop, start];
	    },

	    _d3_scaleRange: function _d3_scaleRange(scale) {
	        return scale.rangeExtent ? scale.rangeExtent() : this._d3_scaleExtent(scale.range());
	    }
	});

	module.exports = Axis;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function(arg) {
	  var children, left, top, transform;
	  left = arg.left, top = arg.top, children = arg.children;
	  transform = "translate(" + left + "," + top + ")";
	  return React.createElement("g", {
	    "transform": transform
	  }, children);
	};


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var DocumentAbstract, FillParentSvg, React, ReactDOM;

	React = __webpack_require__(1);

	ReactDOM = __webpack_require__(2);

	DocumentAbstract = __webpack_require__(12);

	FillParentSvg = React.createClass({
	  propTypes: {
	    document: React.PropTypes.instanceOf(DocumentAbstract).isRequired
	  },
	  handleResize: function() {
	    var node;
	    node = ReactDOM.findDOMNode(this);
	    return this.props.document.update({
	      width: node.clientWidth,
	      height: node.clientHeight
	    });
	  },
	  prepareEvent: function(event) {
	    var left, node, ref, top;
	    node = ReactDOM.findDOMNode(this);
	    ref = node.getBoundingClientRect(), top = ref.top, left = ref.left;
	    return {
	      top: event.clientY - top,
	      left: event.clientX - left
	    };
	  },
	  handleMouseMove: function(event) {
	    return this.props.document.emit('pluginBroadcast', 'chartMouseMove', this.prepareEvent(event));
	  },
	  handleMouseEnter: function(event) {
	    return this.props.document.emit('pluginBroadcast', 'chartMouseEnter');
	  },
	  handleMouseLeave: function(event) {
	    return this.props.document.emit('pluginBroadcast', 'chartMouseLeave');
	  },
	  handleMouseUp: function(event) {
	    return this.props.document.emit('pluginBroadcast', 'chartMouseUp');
	  },
	  componentDidMount: function() {
	    window.addEventListener('resize', this.handleResize);
	    return this.handleResize();
	  },
	  componentWillUnmount: function() {
	    return window.removeEventListener('resize', this.handleResize);
	  },
	  render: __webpack_require__(95)
	});

	module.exports = FillParentSvg;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function() {
	  var style;
	  style = {
	    width: "100%",
	    height: "100%"
	  };
	  return React.createElement("svg", {
	    "style": style,
	    "onMouseMove": this.handleMouseMove,
	    "onMouseEnter": this.handleMouseEnter,
	    "onMouseLeave": this.handleMouseLeave,
	    "onMouseUp": this.handleMouseUp
	  }, this.props.children);
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var React, ReactDOM, ZoomableG, d3;

	React = __webpack_require__(1);

	ReactDOM = __webpack_require__(2);

	d3 = __webpack_require__(10);

	ZoomableG = React.createClass({
	  propTypes: {
	    zoomBehavior: React.PropTypes.instanceOf(Function).isRequired,
	    width: React.PropTypes.number.isRequired,
	    height: React.PropTypes.number.isRequired
	  },
	  initZoom: function() {
	    var d3node, node;
	    node = ReactDOM.findDOMNode(this);
	    d3node = d3.select(node);
	    return d3node.call(this.props.zoomBehavior);
	  },
	  componentDidMount: function() {
	    return this.initZoom();
	  },
	  render: __webpack_require__(97)
	});

	module.exports = ZoomableG;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function() {
	  var overlayStyle;
	  overlayStyle = {
	    fill: 'none',
	    pointerEvents: 'all'
	  };
	  return React.createElement("g", null, React.createElement("rect", {
	    "width": this.props.width,
	    "height": this.props.height,
	    "style": overlayStyle
	  }), this.props.children);
	};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.ZIndices=t():e.ZIndices=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=function(t){return e[t]};return function(e){return e.map(t).reduce(r,0)}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var r=function(e,t){return e+t};e.exports=t["default"]}])});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var CheckBondData, DotCurveSpreadPlugin, GenerateLabel, GeneratePath, GetE11nDot, GetYbyX, Plugin, RegressCurve, RoundTo, d3, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	lodash = __webpack_require__(11);

	d3 = __webpack_require__(10);

	Plugin = __webpack_require__(32);

	RoundTo = __webpack_require__(24);

	CheckBondData = __webpack_require__(34);

	GeneratePath = __webpack_require__(45);

	RegressCurve = __webpack_require__(70);

	GenerateLabel = __webpack_require__(52);

	GetE11nDot = __webpack_require__(63);

	GetYbyX = __webpack_require__(100).GetYbyX;

	module.exports = DotCurveSpreadPlugin = (function(superClass) {
	  var getYPoint;

	  extend(DotCurveSpreadPlugin, superClass);

	  function DotCurveSpreadPlugin() {
	    return DotCurveSpreadPlugin.__super__.constructor.apply(this, arguments);
	  }

	  DotCurveSpreadPlugin.prototype.getPropsKeys = function() {
	    return ['dotCurveSpreads'];
	  };

	  DotCurveSpreadPlugin.prototype.build = function(arg) {
	    var axes, buildData, dotCurveSpreads, localRegressionBandwidth;
	    buildData = arg.buildData, axes = arg.axes, localRegressionBandwidth = arg.localRegressionBandwidth;
	    dotCurveSpreads = this.props.dotCurveSpreads;
	    this.builtSpreads = dotCurveSpreads.map(function(spread) {
	      var applyLocalRegression, applyRegression, bond, bonds, curve, date, dot, extrapolation, isins, regression;
	      date = spread.date, dot = spread.dot, curve = spread.curve;
	      isins = curve.isins, applyLocalRegression = curve.applyLocalRegression, applyRegression = curve.applyRegression, regression = curve.regression, extrapolation = curve.extrapolation;
	      bond = buildData(dot + '@' + date);
	      bonds = isins.map(function(isin) {
	        return buildData(isin + '@' + date);
	      }).filter(function(bond) {
	        return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	      });
	      bonds = RegressCurve({
	        bonds: bonds,
	        axes: axes,
	        applyLocalRegression: applyLocalRegression,
	        applyRegression: applyRegression,
	        localRegressionBandwidth: localRegressionBandwidth,
	        regression: regression
	      });
	      return {
	        date: date,
	        bond: bond,
	        bonds: bonds,
	        regression: regression,
	        applyLocalRegression: applyLocalRegression,
	        applyRegression: applyRegression,
	        localRegressionBandwidth: localRegressionBandwidth,
	        extrapolation: extrapolation
	      };
	    });
	  };

	  getYPoint = function(spread, x, bondToDot, axes, xExtent) {
	    var applyRegression, bonds, extrapolation, getY;
	    bonds = spread.bonds, applyRegression = spread.applyRegression, extrapolation = spread.extrapolation;
	    getY = function(bonds, applyRegression) {
	      var dots, maxX, minX;
	      dots = bonds.map(function(b) {
	        return bondToDot(b);
	      });
	      minX = d3.min(dots, function(d) {
	        return d.x;
	      });
	      maxX = d3.max(dots, function(d) {
	        return d.x;
	      });
	      if (x >= minX && x <= maxX) {
	        return GetYbyX(GeneratePath(dots, applyRegression), x, 0.00001);
	      }
	    };
	    getY(bonds, applyRegression);
	    if (extrapolation) {
	      ['left', 'right'].forEach(function(side) {
	        var extBond;
	        if (!extrapolation[side]) {
	          return;
	        }
	        extBond = GetE11nDot(side, extrapolation, bonds, xExtent, axes);
	        if (side === 'left') {
	          return bonds.unshift(extBond);
	        } else {
	          return bonds.push(extBond);
	        }
	      });
	      return getY(bonds, false);
	    }
	  };

	  DotCurveSpreadPlugin.prototype.willRender = function(arg, renderContext) {
	    var axes, backgroundColor, bond, bondToDot, bonds, dot, i, invertDot, label, labelStyle, len, lineDot, lineHeight, minHeight, ref, spread, spreadValue, y, zoomedXScale;
	    labelStyle = arg.labelStyle, backgroundColor = arg.backgroundColor, axes = arg.axes;
	    minHeight = 10;
	    this.spreads = [];
	    bondToDot = renderContext.bondToDot, invertDot = renderContext.invertDot, zoomedXScale = renderContext.zoomedXScale;
	    ref = this.builtSpreads;
	    for (i = 0, len = ref.length; i < len; i++) {
	      spread = ref[i];
	      bond = spread.bond;
	      bonds = spread.bonds;
	      dot = bondToDot(bond);
	      y = dot.y;
	      if (bonds.length > 0) {
	        y = getYPoint(spread, dot.x, bondToDot, axes, zoomedXScale.domain());
	      }
	      lineDot = {
	        x: dot.x,
	        y: y
	      };
	      lineHeight = Math.abs(y - dot.y);
	      if (lineHeight > minHeight) {
	        spreadValue = invertDot(lineDot).y;
	        label = GenerateLabel({
	          text: (bond[axes.y] - spreadValue).toFixed(2),
	          labelStyle: labelStyle,
	          box: {
	            left: dot.x + 5,
	            top: (dot.y + y) / 2
	          },
	          hidden: false,
	          color: labelStyle.color,
	          backgroundColor: backgroundColor
	        });
	        label.y -= label.back.height / 2;
	        label.hidden = lineHeight < label.back.height;
	        this.spreads.push({
	          path: GeneratePath([dot, lineDot]),
	          label: label
	        });
	      }
	    }
	  };

	  DotCurveSpreadPlugin.prototype.render = __webpack_require__(101);

	  return DotCurveSpreadPlugin;

	})(Plugin);


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var GeneratePath, GetXbyY, GetYbyX, calculateXbyY, calculateYbyX, d3, d3Path, path;

	d3 = __webpack_require__(10);

	GeneratePath = __webpack_require__(45);

	path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

	d3Path = d3.select(path);

	calculateYbyX = function(x, eps) {
	  var a, b, c, p;
	  a = 0;
	  b = path.getTotalLength();
	  c = (a + b) / 2;
	  p = path.getPointAtLength(c);
	  while (b - a > eps) {
	    if (p.x >= x) {
	      b = c;
	    } else {
	      a = c;
	    }
	    c = (a + b) / 2;
	    p = path.getPointAtLength(c);
	  }
	  return p.y;
	};

	calculateXbyY = function(y, eps) {
	  var a, b, c, isIncFunc, p;
	  a = 0;
	  b = path.getTotalLength();
	  c = (a + b) / 2;
	  p = path.getPointAtLength(c);
	  isIncFunc = p.y >= (path.getPointAtLength(a)).y;
	  while (b - a > eps) {
	    if (isIncFunc && p.y >= y || !isIncFunc && p.y <= y) {
	      b = c;
	    } else {
	      a = c;
	    }
	    c = (a + b) / 2;
	    p = path.getPointAtLength(c);
	  }
	  return p.x;
	};

	GetYbyX = function(path, x, eps) {
	  d3Path.attr('d', path);
	  return calculateYbyX(x, eps);
	};

	GetXbyY = function(path, y, eps) {
	  d3Path.attr('d', path);
	  return calculateXbyY(y, eps);
	};

	module.exports = {
	  GetYbyX: GetYbyX,
	  GetXbyY: GetXbyY
	};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Label, React;

	React = __webpack_require__(1);

	Label = __webpack_require__(57);

	module.exports = function() {
	  return [
	    {
	      type: 'dotCurveSpread',
	      zIndex: 'dot-curve-spread',
	      render: React.createElement("g", null, this.spreads.map(function(spread, index) {
	        return React.createElement("path", {
	          "key": index,
	          "d": spread.path,
	          "stroke": '#333',
	          "fill": 'none',
	          "strokeWidth": 0.5
	        });
	      }))
	    }, {
	      type: 'dotCurveLabels',
	      zIndex: 'dot-curve-spread label',
	      render: React.createElement("g", null, this.spreads.map(function(arg, index) {
	        var label;
	        label = arg.label;
	        if (label) {
	          return React.createElement(Label, {
	            "key": index,
	            "label": label
	          });
	        } else {
	          return null;
	        }
	      }))
	    }
	  ];
	};


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var CheckBondData, GenerateLabel, GeneratePath, GenerateSpreadDots, GenerateSpreadLabel, GetE11nDot, GetYbyX, LiquidityRadius, Plugin, RegressCurve, TimeSeriesFactory, ValueScannerPlugin, d3, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	d3 = __webpack_require__(10);

	lodash = __webpack_require__(11);

	Plugin = __webpack_require__(32);

	GeneratePath = __webpack_require__(45);

	GenerateLabel = __webpack_require__(52);

	GenerateSpreadLabel = __webpack_require__(103);

	CheckBondData = __webpack_require__(34);

	RegressCurve = __webpack_require__(70);

	GetE11nDot = __webpack_require__(63);

	GenerateSpreadDots = __webpack_require__(80);

	TimeSeriesFactory = __webpack_require__(83);

	LiquidityRadius = __webpack_require__(37);

	GetYbyX = __webpack_require__(100).GetYbyX;

	module.exports = ValueScannerPlugin = (function(superClass) {
	  var chartBox, getSpreadToCurve, getYPoint, monthNames, mouseInDot;

	  extend(ValueScannerPlugin, superClass);

	  function ValueScannerPlugin() {
	    return ValueScannerPlugin.__super__.constructor.apply(this, arguments);
	  }

	  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	  ValueScannerPlugin.prototype._init = function() {
	    ValueScannerPlugin.__super__._init.call(this);
	    this.on('chartMouseMove', (function(_this) {
	      return function(event) {
	        var x;
	        _this.y = event.top - chartBox.top;
	        x = event.left - chartBox.left;
	        if (_this.y >= 0 && _this.y <= chartBox.height && x >= 0 && x <= chartBox.width) {
	          _this.x = x;
	        } else {
	          _this.x = null;
	        }
	        _this.emit('requireRender');
	      };
	    })(this));
	    return this.on('chartMouseLeave', (function(_this) {
	      return function() {
	        _this.x = null;
	        _this.emit('requireRender');
	      };
	    })(this));
	  };

	  ValueScannerPlugin.prototype.getPropsKeys = function() {
	    return ['dotsSets', 'curves', 'spreads', 'timeSeries'];
	  };

	  ValueScannerPlugin.prototype.build = function(arg) {
	    var axes, bonds, buildCurve, buildData, curve, curves, dotsSets, extrapolation, localRegressionBandwidth, ref, spread, spreads, timeSeries;
	    buildData = arg.buildData, axes = arg.axes, localRegressionBandwidth = arg.localRegressionBandwidth;
	    ref = this.props, dotsSets = ref.dotsSets, curves = ref.curves, spreads = ref.spreads, timeSeries = ref.timeSeries;
	    if (dotsSets) {
	      this.builtDotsSets = dotsSets.map(function(dotsSet) {
	        var bonds;
	        bonds = dotsSet.isins.map(function(isin) {
	          return buildData(isin + '@' + dotsSet.date);
	        }).filter(function(bond) {
	          return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	        });
	        return {
	          bonds: bonds,
	          getRadius: dotsSet.getRadius
	        };
	      });
	    }
	    buildCurve = function(curve) {
	      var applyRegression, bonds, date, extrapolation, isins, regression;
	      applyRegression = curve.applyRegression, regression = curve.regression, date = curve.date, isins = curve.isins, extrapolation = curve.extrapolation;
	      bonds = isins.map(function(isin) {
	        return buildData(isin + '@' + date);
	      }).filter(function(bond) {
	        return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	      });
	      bonds = RegressCurve({
	        bonds: bonds,
	        axes: axes,
	        applyRegression: applyRegression,
	        localRegressionBandwidth: localRegressionBandwidth,
	        regression: regression
	      });
	      return {
	        bonds: bonds,
	        extrapolation: extrapolation,
	        applyRegression: applyRegression
	      };
	    };
	    if (curves) {
	      this.builtCurves = (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = curves.length; i < len; i++) {
	          curve = curves[i];
	          results.push(buildCurve(curve));
	        }
	        return results;
	      })();
	    }
	    if (spreads) {
	      this.builtSpreads = (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = spreads.length; i < len; i++) {
	          spread = spreads[i];
	          curves = spread.curves, extrapolation = spread.extrapolation;
	          curves = curves.map(function(curve) {
	            return buildCurve(curve);
	          });
	          bonds = GenerateSpreadDots(curves, axes);
	          results.push({
	            bonds: bonds,
	            extrapolation: extrapolation,
	            applyRegression: curves.some(function(c) {
	              return c.applyRegression;
	            })
	          });
	        }
	        return results;
	      })();
	    }
	    if (timeSeries) {
	      this.builtTimeSeries = timeSeries.map(function(ts) {
	        bonds = ts.dates.map(function(date) {
	          return buildData(ts.isin + '@' + date);
	        }).filter(function(bond) {
	          return CheckBondData(bond, [axes.y]);
	        });
	        return {
	          bonds: bonds
	        };
	      });
	    }
	  };

	  getYPoint = function(curve, x, bondToDot, axes, xExtent) {
	    var applyRegression, bonds, extBonds, extrapolation, getY;
	    bonds = curve.bonds, applyRegression = curve.applyRegression, extrapolation = curve.extrapolation;
	    getY = function(bonds, applyRegression) {
	      var dots, maxX, minX, y;
	      dots = bonds.map(function(b) {
	        return bondToDot(b);
	      });
	      minX = d3.min(dots, function(d) {
	        return d.x;
	      });
	      maxX = d3.max(dots, function(d) {
	        return d.x;
	      });
	      if (x >= minX && x <= maxX) {
	        y = GetYbyX(GeneratePath(dots, applyRegression), x, 0.00001);
	        if (y >= 0 && y <= chartBox.height) {
	          return y;
	        }
	      }
	    };
	    if (extrapolation) {
	      extBonds = lodash.clone(bonds);
	      ['left', 'right'].forEach(function(side) {
	        var extBond;
	        if (!extrapolation[side]) {
	          return;
	        }
	        extBond = GetE11nDot(side, extrapolation, extBonds, xExtent, axes);
	        if (side === 'left') {
	          if (extBond[axes.x] <= extBonds[0][axes.x] && extBonds[0][axes.x] >= xExtent[0]) {
	            return extBonds.unshift(extBond);
	          }
	        } else {
	          return extBonds.push(extBond);
	        }
	      });
	      return getY(extBonds, false);
	    } else {
	      return getY(bonds, applyRegression);
	    }
	  };

	  mouseInDot = function(bond, dot, x, y) {
	    var radius;
	    radius = bond.getRadius ? bond.getRadius(bond) : LiquidityRadius(bond['liquidity']);
	    return Math.sqrt((x - dot.x) * (x - dot.x) + (y - dot.y) * (y - dot.y)) <= radius;
	  };

	  getSpreadToCurve = function(y, value) {
	    var spread;
	    if (y === value) {
	      return;
	    }
	    spread = y - value;
	    return (spread > 0 ? '+ ' : '− ') + Math.abs(spread.toFixed(2));
	  };

	  chartBox = void 0;

	  ValueScannerPlugin.prototype.willRender = function(props, renderContext) {
	    var axes, backgroundColor, bond, bondToDot, chartHeight, chartWidth, curve, digits, domain, dot, dotsSet, i, index, invertDot, j, k, l, label, labelStyle, len, len1, len2, len3, len4, len5, len6, m, margin, n, o, p, p1, p2, point, ref, ref1, ref2, ref3, ref4, ref5, ref6, showSpread, sprValue, spread, spreadValue, timeSeries, timeSeriesFactory, ts, value, visibleLabel, x, y, zoomedXScale;
	    backgroundColor = props.backgroundColor, labelStyle = props.labelStyle, margin = props.margin, axes = props.axes;
	    bondToDot = renderContext.bondToDot, invertDot = renderContext.invertDot, zoomedXScale = renderContext.zoomedXScale, chartWidth = renderContext.chartWidth, chartHeight = renderContext.chartHeight;
	    chartBox = {
	      top: margin.top,
	      left: margin.left,
	      width: chartWidth,
	      height: chartHeight
	    };
	    if (!this.x) {
	      this.path = '';
	      if (this.xValue) {
	        this.xValue.hidden = true;
	      }
	      this.points = this.labels = [];
	      return;
	    }
	    p1 = {
	      x: this.x,
	      y: 0
	    };
	    p2 = {
	      x: this.x,
	      y: chartHeight
	    };
	    this.path = GeneratePath([p1, p2]);
	    value = '';
	    if (axes.x === 'date') {
	      x = invertDot(p1).x;
	      value = x.getDate() + ' ' + monthNames[x.getMonth()] + ' ' + x.getFullYear();
	    } else {
	      domain = zoomedXScale.domain();
	      digits = Math.floor(Math.log(domain[1] - domain[0]) / Math.log(10));
	      n = 0;
	      if (digits >= 1) {
	        n = 1;
	      } else {
	        n = Math.abs(digits) + 2;
	      }
	      value = invertDot(p1).x.toFixed(n);
	    }
	    this.xValue = GenerateLabel({
	      text: value,
	      labelStyle: labelStyle,
	      box: {
	        left: this.x,
	        top: chartHeight + 6
	      },
	      hidden: false,
	      color: labelStyle.color,
	      backgroundColor: backgroundColor
	    });
	    this.xValue.x -= this.xValue.back.width / 2;
	    this.points = [];
	    this.spreadLabels = [];
	    if (this.builtDotsSets) {
	      ref = this.builtDotsSets;
	      for (i = 0, len = ref.length; i < len; i++) {
	        dotsSet = ref[i];
	        ref1 = dotsSet.bonds;
	        for (j = 0, len1 = ref1.length; j < len1; j++) {
	          bond = ref1[j];
	          dot = bondToDot(bond);
	          if (this.x >= dot.x - 2 && this.x <= dot.x + 2 || mouseInDot(bond, dot, this.x, this.y)) {
	            point = {
	              x: dot.x,
	              y: dot.y
	            };
	            this.points.push(point);
	          }
	        }
	      }
	    }
	    showSpread = false;
	    if (this.builtCurves && this.builtCurves.length === 1 && (!this.builtSpreads || this.builtSpreads.length === 0) || this.builtSpreads && this.builtSpreads.length === 1 && (!this.builtCurves || this.builtCurves.length === 0)) {
	      showSpread = true;
	    }
	    spreadValue = void 0;
	    if (this.builtCurves) {
	      ref2 = this.builtCurves;
	      for (k = 0, len2 = ref2.length; k < len2; k++) {
	        curve = ref2[k];
	        if (curve.bonds.length > 0) {
	          y = getYPoint(curve, this.x, bondToDot, axes, zoomedXScale.domain());
	          if (y) {
	            point = {
	              x: this.x,
	              y: y
	            };
	            if (showSpread) {
	              spreadValue = invertDot(point).y;
	            }
	            this.points.push(point);
	          }
	        }
	      }
	    }
	    if (this.builtSpreads) {
	      ref3 = this.builtSpreads;
	      for (l = 0, len3 = ref3.length; l < len3; l++) {
	        spread = ref3[l];
	        if (spread.bonds.length > 0) {
	          y = getYPoint(spread, this.x, bondToDot, axes, zoomedXScale.domain());
	          if (showSpread) {
	            spreadValue = invertDot(y).y;
	          }
	          if (y) {
	            point = {
	              x: this.x,
	              y: y
	            };
	            if (showSpread) {
	              spreadValue = invertDot(point).y;
	            }
	            this.points.push(point);
	          }
	        }
	      }
	    }
	    if (this.builtTimeSeries) {
	      timeSeriesFactory = new TimeSeriesFactory(props, {
	        clickedTs: []
	      });
	      ref4 = this.builtTimeSeries;
	      for (m = 0, len4 = ref4.length; m < len4; m++) {
	        timeSeries = ref4[m];
	        if (timeSeries.bonds.length === 0) {
	          continue;
	        }
	        ts = timeSeriesFactory.buildTimeSeries({
	          timeSeries: timeSeries,
	          bondToDot: bondToDot
	        });
	        y = GetYbyX(ts.d, this.x, 0.00001);
	        if (y) {
	          this.points.push({
	            x: this.x,
	            y: y
	          });
	        }
	      }
	    }
	    this.labels = [];
	    ref5 = this.points;
	    for (o = 0, len5 = ref5.length; o < len5; o++) {
	      point = ref5[o];
	      y = invertDot(point).y;
	      sprValue = showSpread && spreadValue ? getSpreadToCurve(y, spreadValue) : void 0;
	      label = GenerateSpreadLabel({
	        text: y.toFixed(2),
	        spreadText: sprValue,
	        labelStyle: labelStyle,
	        box: {
	          left: point.x + 3,
	          top: point.y
	        },
	        hidden: false,
	        textColor: labelStyle.color,
	        spreadColor: "rgba(102,102,102,1)",
	        backgroundColor: backgroundColor
	      });
	      label.y -= label.back.height * 1.5 - 2;
	      if (point.x + label.back.width > chartBox.width) {
	        label.x = point.x - label.back.width - 2;
	      }
	      this.labels.push(label);
	    }
	    if (this.labels.length > 1) {
	      this.labels = lodash.sortBy(this.labels, 'y');
	      visibleLabel = this.labels[0];
	      ref6 = this.labels;
	      for (index = p = 0, len6 = ref6.length; p < len6; index = ++p) {
	        label = ref6[index];
	        if (index > 0) {
	          if (!(label.y === visibleLabel.y && label.x !== visibleLabel.x)) {
	            if (label.y > visibleLabel.y + visibleLabel.back.height) {
	              visibleLabel = label;
	            } else {
	              label.hidden = true;
	            }
	          }
	        }
	      }
	    }
	  };

	  ValueScannerPlugin.prototype.render = __webpack_require__(104);

	  return ValueScannerPlugin;

	})(Plugin);


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var GenerateSpreadLabel, MeasureTextWidth;

	MeasureTextWidth = __webpack_require__(48);

	GenerateSpreadLabel = function(arg) {
	  var backgroundColor, box, hidden, labelStyle, padding, spreadColor, spreadText, spreadWidth, text, textColor, textWidth;
	  text = arg.text, spreadText = arg.spreadText, labelStyle = arg.labelStyle, box = arg.box, hidden = arg.hidden, textColor = arg.textColor, spreadColor = arg.spreadColor, backgroundColor = arg.backgroundColor;
	  textWidth = MeasureTextWidth(text, labelStyle);
	  spreadWidth = spreadText ? MeasureTextWidth(spreadText, labelStyle) : 0;
	  padding = spreadText ? labelStyle.textPadding * 1.5 : labelStyle.textPadding;
	  return {
	    hidden: hidden,
	    x: box.left,
	    y: box.top,
	    text: {
	      string: text,
	      color: textColor,
	      style: labelStyle,
	      dx: labelStyle.textPadding / 2,
	      dy: labelStyle.textPadding / 2 - 1
	    },
	    spread: {
	      string: spreadText,
	      color: spreadColor,
	      style: labelStyle,
	      dx: textWidth + labelStyle.textPadding,
	      dy: labelStyle.textPadding / 2 - 1
	    },
	    back: {
	      width: textWidth + spreadWidth + padding,
	      height: labelStyle.textHeight + labelStyle.textPadding,
	      backgroundColor: backgroundColor,
	      r: labelStyle.cornerRadius || labelStyle.textPadding
	    }
	  };
	};

	module.exports = GenerateSpreadLabel;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var Label, React, SpreadLabel;

	React = __webpack_require__(1);

	Label = __webpack_require__(57);

	SpreadLabel = __webpack_require__(105);

	module.exports = function() {
	  var renderPoint, style;
	  style = {
	    pointerEvents: 'none'
	  };
	  renderPoint = function(point, index) {
	    return React.createElement("circle", {
	      "key": index,
	      "cx": point.x,
	      "cy": point.y,
	      "r": 2,
	      "fill": '#333'
	    });
	  };
	  return [
	    {
	      type: 'valueScanner',
	      zIndex: 'value-scanner',
	      group: 'front',
	      render: React.createElement("g", {
	        "style": style
	      }, React.createElement("g", null, React.createElement("path", {
	        "key": 'line',
	        "d": this.path,
	        "stroke": '#333',
	        "fill": 'none',
	        "strokeWidth": 0.5
	      })), React.createElement("g", null, (this.xValue ? React.createElement(Label, {
	        "key": 'label',
	        "label": this.xValue
	      }) : void 0)), React.createElement("g", null, (this.points ? this.points.map(function(point, index) {
	        return renderPoint(point, index);
	      }) : void 0)), React.createElement("g", null, (this.labels ? this.labels.map(function(label, index) {
	        return React.createElement(SpreadLabel, {
	          "key": index,
	          "label": label
	        });
	      }) : void 0)))
	    }
	  ];
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var React, d3, hiddenStyle, visibleStyle;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	hiddenStyle = {
	  display: 'none'
	};

	visibleStyle = {};

	module.exports = function(arg) {
	  var back, bg, fontFamily, fontSize, hidden, label, ref, ref1, rgbaBg, spread, spreadStyle, style, text, textStyle, transform, x, y;
	  label = arg.label;
	  x = label.x, y = label.y, back = label.back, text = label.text, spread = label.spread, hidden = label.hidden;
	  transform = "translate(" + x + ", " + y + ")";
	  style = hidden ? hiddenStyle : visibleStyle;
	  ref = text.style, fontSize = ref.fontSize, fontFamily = ref.fontFamily;
	  textStyle = {
	    fontSize: fontSize,
	    fontFamily: fontFamily,
	    fill: text.color,
	    dominantBaseline: 'text-before-edge'
	  };
	  ref1 = spread.style, fontSize = ref1.fontSize, fontFamily = ref1.fontFamily;
	  spreadStyle = {
	    fontSize: fontSize,
	    fontFamily: fontFamily,
	    fill: spread.color,
	    dominantBaseline: 'text-before-edge'
	  };
	  bg = d3.rgb(back.backgroundColor);
	  rgbaBg = "rgba(" + bg.r + ", " + bg.g + ", " + bg.b + ", " + text.style.opacity + ")";
	  return React.createElement("g", {
	    "className": "label",
	    "transform": transform,
	    "style": style
	  }, React.createElement("rect", {
	    "fill": rgbaBg,
	    "width": back.width,
	    "height": back.height,
	    "rx": back.r,
	    "ry": back.r
	  }), React.createElement("text", {
	    "style": textStyle,
	    "dx": text.dx,
	    "dy": text.dy
	  }, text.string), React.createElement("text", {
	    "style": spreadStyle,
	    "dx": spread.dx,
	    "dy": spread.dy
	  }, spread.string));
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var FunctionCurvePlugin, GeneratePath, GetPointsFromFunction, Plugin, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	lodash = __webpack_require__(11);

	Plugin = __webpack_require__(32);

	GeneratePath = __webpack_require__(45);

	GetPointsFromFunction = __webpack_require__(107);

	module.exports = FunctionCurvePlugin = (function(superClass) {
	  extend(FunctionCurvePlugin, superClass);

	  function FunctionCurvePlugin() {
	    return FunctionCurvePlugin.__super__.constructor.apply(this, arguments);
	  }

	  FunctionCurvePlugin.prototype.getPropsKeys = function() {
	    return ['functionCurves'];
	  };

	  FunctionCurvePlugin.prototype.build = function(arg) {
	    var axes, functionCurves;
	    axes = arg.axes;
	    functionCurves = this.props.functionCurves;
	    this.builtFuncCurves = functionCurves.map(function(funcCurve) {
	      var color, domain, func, points, width;
	      func = funcCurve.func, domain = funcCurve.domain, color = funcCurve.color, width = funcCurve.width;
	      points = GetPointsFromFunction(func, domain, 1000, axes);
	      return {
	        points: points,
	        color: color,
	        width: width
	      };
	    });
	  };

	  FunctionCurvePlugin.prototype.getBondsLists = function() {
	    return this.builtFuncCurves.map(function(curve) {
	      return curve.points;
	    });
	  };

	  FunctionCurvePlugin.prototype.willRender = function(arg, renderContext) {
	    var axes, bondToDot, color, dots, func, funcCurve, i, len, path, points, ref, width;
	    axes = arg.axes;
	    bondToDot = renderContext.bondToDot;
	    this.functionCurves = [];
	    ref = this.builtFuncCurves;
	    for (i = 0, len = ref.length; i < len; i++) {
	      funcCurve = ref[i];
	      func = funcCurve.func, points = funcCurve.points, color = funcCurve.color, width = funcCurve.width;
	      dots = points.map(function(p) {
	        return bondToDot(p);
	      });
	      path = GeneratePath(dots);
	      this.functionCurves.push({
	        path: path,
	        color: color,
	        width: width
	      });
	    }
	  };

	  FunctionCurvePlugin.prototype.render = __webpack_require__(108);

	  return FunctionCurvePlugin;

	})(Plugin);


/***/ },
/* 107 */
/***/ function(module, exports) {

	var GetPointsFromFunction;

	GetPointsFromFunction = function(func, domain, n, axes) {
	  var dx, i, j, point, points, ref, x;
	  points = [];
	  dx = (domain[1] - domain[0]) / n;
	  for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	    x = domain[0] + dx * i;
	    point = {};
	    point[axes.x] = x;
	    point[axes.y] = func(x);
	    points.push(point);
	  }
	  return points;
	};

	module.exports = GetPointsFromFunction;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function() {
	  return [
	    {
	      type: 'functionCurve',
	      zIndex: 'function-curve',
	      render: React.createElement("g", null, this.functionCurves.map(function(funcCurve, index) {
	        return React.createElement("path", {
	          "key": index,
	          "d": funcCurve.path,
	          "stroke": funcCurve.color,
	          "strokeWidth": funcCurve.width,
	          "fill": 'none'
	        });
	      }))
	    }
	  ];
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var BondsCurvesFactory, CheckBondData, CurrentValuePlugin, GenerateLabel, GeneratePath, GenerateSpreadDots, GetE11nDot, GetPointsFromFunction, GetXbyY, GetYbyX, Plugin, RegressCurve, d3, lodash, ref,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	lodash = __webpack_require__(11);

	d3 = __webpack_require__(10);

	Plugin = __webpack_require__(32);

	BondsCurvesFactory = __webpack_require__(61);

	GeneratePath = __webpack_require__(45);

	GenerateLabel = __webpack_require__(52);

	GetPointsFromFunction = __webpack_require__(107);

	ref = __webpack_require__(100), GetYbyX = ref.GetYbyX, GetXbyY = ref.GetXbyY;

	CheckBondData = __webpack_require__(34);

	GetE11nDot = __webpack_require__(63);

	RegressCurve = __webpack_require__(70);

	GenerateSpreadDots = __webpack_require__(80);

	module.exports = CurrentValuePlugin = (function(superClass) {
	  var chartBox, correctLabelPosition, formatString, handDimensions, handMoveStarted;

	  extend(CurrentValuePlugin, superClass);

	  function CurrentValuePlugin() {
	    return CurrentValuePlugin.__super__.constructor.apply(this, arguments);
	  }

	  CurrentValuePlugin.movingHand = void 0;

	  chartBox = void 0;

	  handMoveStarted = true;

	  handDimensions = {
	    width: 5,
	    height: 22
	  };

	  CurrentValuePlugin.prototype._init = function() {
	    CurrentValuePlugin.__super__._init.call(this);
	    this.on('chartMouseMove', (function(_this) {
	      return function(event) {
	        var x, y;
	        if (_this.movingHand) {
	          if (handMoveStarted) {
	            handMoveStarted = false;
	            _this.emit('chartEmit', 'startMovingHand');
	          }
	          if (_this.movingHand.y === null) {
	            x = event.left - chartBox.left;
	            if (x >= 0 && x <= chartBox.width) {
	              _this.movingHand.x = x;
	            }
	          } else if (_this.movingHand.x === null) {
	            y = event.top - chartBox.top;
	            if (y >= 0 && y <= chartBox.height) {
	              _this.movingHand.y = y;
	            }
	          }
	          _this.emit('requireRender');
	        }
	      };
	    })(this));
	    return this.on('chartMouseUp', (function(_this) {
	      return function() {
	        handMoveStarted = true;
	        _this.emit('chartEmit', 'stopMovingHand', _this.movingHand);
	        _this.movingHand = void 0;
	      };
	    })(this));
	  };

	  formatString = function() {
	    var i, j, ref1, reg, s;
	    s = arguments[0];
	    for (i = j = 0, ref1 = arguments.length - 1; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
	      reg = new RegExp('\\{' + i + '\\}', 'gm');
	      s = s.replace(reg, arguments[i + 1]);
	    }
	    return s;
	  };

	  CurrentValuePlugin.prototype.getPropsKeys = function() {
	    return ['currentValues'];
	  };

	  CurrentValuePlugin.prototype.build = function(arg) {
	    var axes, buildCurve, buildData, buildSpread, currentValues, localRegressionBandwidth;
	    buildData = arg.buildData, axes = arg.axes, localRegressionBandwidth = arg.localRegressionBandwidth;
	    currentValues = this.props.currentValues;
	    buildCurve = function(curve) {
	      var applyRegression, bonds, date, extrapolation, isins, regression;
	      applyRegression = curve.applyRegression, regression = curve.regression, date = curve.date, isins = curve.isins, extrapolation = curve.extrapolation;
	      bonds = isins.map(function(isin) {
	        return buildData(isin + '@' + date);
	      }).filter(function(bond) {
	        return CheckBondData(bond, ['liquidity', axes.x, axes.y]);
	      });
	      bonds = RegressCurve({
	        bonds: bonds,
	        axes: axes,
	        applyRegression: applyRegression,
	        localRegressionBandwidth: localRegressionBandwidth,
	        regression: regression
	      });
	      return {
	        bonds: bonds,
	        extrapolation: extrapolation,
	        applyRegression: applyRegression
	      };
	    };
	    buildSpread = function(spread) {
	      var bonds, curves, extrapolation;
	      curves = spread.curves, extrapolation = spread.extrapolation;
	      curves = curves.map(function(curve) {
	        return buildCurve(curve);
	      });
	      bonds = GenerateSpreadDots(curves, axes);
	      return {
	        bonds: bonds,
	        extrapolation: extrapolation,
	        applyRegression: curves.some(function(c) {
	          return c.applyRegression;
	        })
	      };
	    };
	    this.builtCurrentValues = currentValues.map(function(value, index) {
	      var changeVertical, curve, curves, format, offset, rCurves, radius, showXValue, x;
	      x = value.x, radius = value.radius, curves = value.curves, curve = value.curve, format = value.format, changeVertical = value.changeVertical, offset = value.offset, showXValue = value.showXValue;
	      if (!offset) {
	        offset = 0;
	      }
	      if (!curve && !curves) {
	        console.warn('CurrentValuePlugin: please provide "curves" property to show points');
	        curves = [];
	      }
	      if (curve) {
	        console.warn('CurrentValuePlugin: please use "curves" as an array of curves instead of one curve');
	        if (!curves) {
	          curves = [curve];
	        }
	      }
	      rCurves = curves.map(function(curve) {
	        var color, curveData, data, domain, func, properties, spreadData;
	        func = curve.func, domain = curve.domain, curveData = curve.curveData, spreadData = curve.spreadData, properties = curve.properties, color = curve.color;
	        data = void 0;
	        if (curveData) {
	          data = buildCurve(curveData);
	        } else if (spreadData) {
	          data = buildSpread(spreadData);
	        } else {
	          data = GetPointsFromFunction(func, domain, 1000, axes);
	        }
	        return {
	          data: data,
	          color: color,
	          properties: properties
	        };
	      });
	      return {
	        x: x,
	        radius: radius,
	        format: format,
	        changeVertical: changeVertical,
	        rCurves: rCurves,
	        offset: offset,
	        showXValue: showXValue
	      };
	    });
	  };

	  correctLabelPosition = function(label, offset, chartBox) {
	    if (label.x + label.back.width > chartBox.width) {
	      label.x -= label.back.width + 2 * offset;
	      if (label.y + label.back.height > chartBox.height) {
	        label.y -= label.back.height;
	      }
	    } else {
	      if (label.y + label.back.height > chartBox.height) {
	        label.y -= label.back.height;
	      } else if (label.y - label.back.height / 2 >= 0) {
	        label.y -= label.back.height / 2;
	      }
	    }
	  };

	  CurrentValuePlugin.prototype.willRender = function(props, renderContext) {
	    var addHand, axes, backgroundColor, bondToDot, cValue, changeVertical, chartHeight, chartWidth, connectedItems, curve, curveIndex, dot, dots, format, getCoordinateFromData, getYPoint, handIndex, index, invertDot, j, k, l, label, labelStyle, len, len1, margin, offset, onClick, point, rCurves, radius, ref1, ref2, showXValue, value, vx, vy, x, y, zoomedXScale;
	    backgroundColor = props.backgroundColor, labelStyle = props.labelStyle, margin = props.margin, axes = props.axes;
	    bondToDot = renderContext.bondToDot, invertDot = renderContext.invertDot, chartWidth = renderContext.chartWidth, chartHeight = renderContext.chartHeight, zoomedXScale = renderContext.zoomedXScale;
	    chartBox = {
	      top: margin.top,
	      left: margin.left,
	      width: chartWidth,
	      height: chartHeight
	    };
	    this.currentValues = [];
	    this.currentLabels = [];
	    this.changingHands = [];
	    this.valueLabels = [];
	    getYPoint = function(curve, x) {
	      var applyRegression, bonds, extrapolation, getY;
	      bonds = curve.bonds, applyRegression = curve.applyRegression, extrapolation = curve.extrapolation;
	      getY = function(bonds, applyRegression) {
	        var dots, maxX, minX, y;
	        dots = bonds.map(function(b) {
	          return bondToDot(b);
	        });
	        minX = d3.min(dots, function(d) {
	          return d.x;
	        });
	        maxX = d3.max(dots, function(d) {
	          return d.x;
	        });
	        if (x >= minX && x <= maxX) {
	          y = GetYbyX(GeneratePath(dots, applyRegression), x, 0.00001);
	          if (y >= 0 && y <= chartBox.height) {
	            return y;
	          }
	        }
	      };
	      getY(bonds, applyRegression);
	      if (extrapolation) {
	        ['left', 'right'].forEach(function(side) {
	          var extBond;
	          if (!extrapolation[side]) {
	            return;
	          }
	          extBond = GetE11nDot(side, extrapolation, bonds, zoomedXScale.domain(), axes);
	          if (side === 'left') {
	            return bonds.unshift(extBond);
	          } else {
	            return bonds.push(extBond);
	          }
	        });
	        return getY(bonds, false);
	      }
	    };
	    getCoordinateFromData = function(arg) {
	      var data, path, x, y;
	      data = arg.data, x = arg.x, y = arg.y;
	      if (Array.isArray(data)) {
	        path = GeneratePath(data.map(function(p) {
	          return bondToDot(p);
	        }));
	        if (x) {
	          return GetYbyX(path, x, .00001);
	        }
	        if (y) {
	          return GetXbyY(path, y, .00001);
	        }
	      } else {
	        return getYPoint(data, x);
	      }
	    };
	    if (this.movingHand) {
	      handIndex = this.movingHand.handIndex;
	      cValue = this.builtCurrentValues[handIndex];
	      for (index = j = 0, ref1 = cValue.rCurves.length; 0 <= ref1 ? j < ref1 : j > ref1; index = 0 <= ref1 ? ++j : --j) {
	        if (this.movingHand.x) {
	          x = this.movingHand.x;
	          y = getCoordinateFromData({
	            data: cValue.rCurves[index].data,
	            x: x
	          });
	        } else {
	          y = this.movingHand.y;
	          x = getCoordinateFromData({
	            data: cValue.rCurves[index].data,
	            y: y
	          });
	        }
	        point = invertDot({
	          x: x,
	          y: y
	        });
	        if (this.movingHand.x) {
	          this.movingHand.realX = point.x;
	        }
	        if (this.movingHand.y) {
	          this.movingHand.realY = point.y;
	        }
	        cValue.x = point.x;
	        cValue.rCurves[index].y = point.y;
	      }
	      this.emit('chartEmit', 'changeDotValue', point);
	    }
	    ref2 = this.builtCurrentValues;
	    for (index = k = 0, len = ref2.length; k < len; index = ++k) {
	      value = ref2[index];
	      x = value.x, radius = value.radius, format = value.format, rCurves = value.rCurves, changeVertical = value.changeVertical, offset = value.offset, showXValue = value.showXValue;
	      if (value.x > zoomedXScale.domain()[1]) {
	        return;
	      }
	      dots = [];
	      for (curveIndex = l = 0, len1 = rCurves.length; l < len1; curveIndex = ++l) {
	        curve = rCurves[curveIndex];
	        point = {};
	        point[axes.x] = x;
	        point[axes.y] = 0;
	        y = curve.y;
	        if (!y) {
	          if (curveIndex === 0) {
	            y = 2;
	          }
	          if (curveIndex === 1) {
	            y = Math.sin(2);
	          }
	          vx = bondToDot(point).x;
	          vy = getCoordinateFromData({
	            data: curve.data,
	            x: vx
	          });
	          y = invertDot({
	            x: 0,
	            y: vy
	          }).y;
	        }
	        if (y) {
	          point[axes.y] = y;
	          dot = bondToDot(point);
	          dots.push(dot);
	          this.currentValues.push({
	            x: dot.x,
	            y: dot.y,
	            radius: radius,
	            color: curve.color
	          });
	          label = GenerateLabel({
	            text: formatString(format, x.toFixed(2), y.toFixed(2)),
	            labelStyle: labelStyle,
	            box: {
	              left: dot.x + radius,
	              top: dot.y
	            },
	            hidden: false,
	            textColor: labelStyle.color,
	            backgroundColor: backgroundColor
	          });
	          correctLabelPosition(label, radius, chartBox);
	          this.currentLabels.push(label);
	          if (showXValue) {
	            label = GenerateLabel({
	              text: x.toFixed(1),
	              labelStyle: labelStyle,
	              box: {
	                left: dot.x + handDimensions.width * .5 + 1,
	                top: chartHeight + offset + handDimensions.height * .5 + labelStyle.textHeight * .5
	              },
	              hidden: false,
	              textColor: labelStyle.color,
	              backgroundColor: backgroundColor
	            });
	            correctLabelPosition(label, handDimensions.width + 1, chartBox);
	            this.valueLabels.push(label);
	          }
	        }
	      }
	      onClick = (function(_this) {
	        return function(position, isVertical, handIndex, connectedItems) {
	          var d3document;
	          d3document = d3.select(window.document);
	          d3document.on('mouseup', function() {
	            d3document.on('mouseup', null);
	            _this.emit('chartMouseUp');
	          });
	          if (position) {
	            if (isVertical) {
	              _this.movingHand = {
	                handIndex: handIndex,
	                y: position.y,
	                x: null,
	                connectedItems: connectedItems
	              };
	            } else {
	              _this.movingHand = {
	                handIndex: handIndex,
	                x: position.x,
	                y: null,
	                connectedItems: connectedItems
	              };
	            }
	          } else {
	            _this.movingHand = void 0;
	          }
	        };
	      })(this);
	      addHand = function(position, isVertical, handIndex, connectedItems) {
	        var startPoint;
	        startPoint = void 0;
	        if (changeVertical) {
	          startPoint = dots[0];
	        } else {
	          startPoint = {
	            x: dots[0].x,
	            y: 0
	          };
	        }
	        return {
	          path: GeneratePath([startPoint, position]),
	          position: position,
	          isVertical: isVertical,
	          handIndex: handIndex,
	          connectedItems: connectedItems,
	          handler: onClick
	        };
	      };
	      connectedItems = rCurves.map(function(c) {
	        return c.properties;
	      });
	      this.changingHands.push(addHand({
	        x: dot.x,
	        y: chartHeight + offset
	      }, false, index, connectedItems));
	      if (changeVertical) {
	        this.changingHands.push(addHand({
	          x: -offset,
	          y: dot.y
	        }, true, index, connectedItems));
	      }
	    }
	  };

	  CurrentValuePlugin.prototype.render = __webpack_require__(110);

	  return CurrentValuePlugin;

	})(Plugin);


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Label, React;

	React = __webpack_require__(1);

	Label = __webpack_require__(57);

	module.exports = function() {
	  var renderHand, style;
	  style = {
	    pointerEvents: 'none'
	  };
	  renderHand = function(arg, index) {
	    var connectedItems, handIndex, handler, isVertical, onMouseDown, path, position;
	    path = arg.path, position = arg.position, handler = arg.handler, isVertical = arg.isVertical, handIndex = arg.handIndex, connectedItems = arg.connectedItems;
	    onMouseDown = function(event) {
	      if (event.stopPropagation) {
	        event.stopPropagation();
	      }
	      if (event.preventDefault) {
	        event.preventDefault();
	      }
	      event.cancelBubble = true;
	      event.returnValue = false;
	      return handler(position, isVertical, handIndex, connectedItems);
	    };
	    if (isVertical) {
	      return React.createElement("g", {
	        "key": index,
	        "onMouseDown": onMouseDown
	      }, React.createElement("path", {
	        "d": path,
	        "stroke": '#333',
	        "fill": 'none',
	        "strokeWidth": 1,
	        "opacity": 0.5
	      }), React.createElement("rect", {
	        "transform": "translate(" + (position.x - 22) + "," + (position.y - 10) + ")",
	        "width": 22,
	        "height": 20,
	        "fill": '#fff',
	        "stroke": 'none',
	        "opacity": 0
	      }), React.createElement("g", {
	        "transform": "translate(355.000000, -20.000000)"
	      }, React.createElement("path", {
	        "transform": "translate(" + (position.x - 22) + "," + (position.y - 2.5) + ") rotate(90)",
	        "fill": '#333',
	        "opacity": 0.5,
	        "d": "M23,333 L22,333 L20,339 L20,352.5 C20,353.874911 21.1192881,355 22.5,355 C23.8903379,355 25,353.880712 25,352.5 L25,339 L23,333 Z"
	      })));
	    } else {
	      return React.createElement("g", {
	        "key": index,
	        "onMouseDown": onMouseDown
	      }, React.createElement("path", {
	        "d": path,
	        "stroke": '#333',
	        "fill": 'none',
	        "strokeWidth": 1,
	        "opacity": 0.5
	      }), React.createElement("rect", {
	        "transform": "translate(" + (position.x - 10) + "," + position.y + ")",
	        "width": 20,
	        "height": 22,
	        "fill": '#fff',
	        "stroke": 'none',
	        "opacity": 0
	      }), React.createElement("g", {
	        "transform": "translate(-20.000000, -333.000000)"
	      }, React.createElement("path", {
	        "transform": "translate(" + (position.x - 2.5) + "," + position.y + ")",
	        "fill": '#333',
	        "opacity": 0.5,
	        "d": "M23,333 L22,333 L20,339 L20,352.5 C20,353.874911 21.1192881,355 22.5,355 C23.8903379,355 25,353.880712 25,352.5 L25,339 L23,333 Z"
	      })));
	    }
	  };
	  return [
	    {
	      type: 'currentValues',
	      zIndex: 'current-value',
	      render: React.createElement("g", null, this.currentValues.map(function(value, index) {
	        return React.createElement("circle", {
	          "style": style,
	          "key": index,
	          "cx": value.x,
	          "cy": value.y,
	          "r": value.radius,
	          "fill": value.color
	        });
	      }))
	    }, {
	      type: 'currentLabels',
	      zIndex: 'current-value label',
	      render: React.createElement("g", null, this.currentLabels.map(function(label, index) {
	        return React.createElement(Label, {
	          "style": style,
	          "key": index,
	          "label": label
	        });
	      }))
	    }, {
	      type: 'valueLabels',
	      zIndex: 'label',
	      group: 'front',
	      render: React.createElement("g", null, this.valueLabels.map(function(label, index) {
	        return React.createElement(Label, {
	          "style": style,
	          "key": index,
	          "label": label
	        });
	      }))
	    }, {
	      type: 'currentHands',
	      zIndex: 'label hands',
	      group: 'front',
	      render: React.createElement("g", null, this.changingHands.map(function(hand, index) {
	        return renderHand(hand, index);
	      }))
	    }
	  ];
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var CategoryColorGenerator, d3, unknownRatingColor;

	d3 = __webpack_require__(10);

	unknownRatingColor = '#333333';

	CategoryColorGenerator = function() {
	  var colors;
	  colors = d3.scale.ordinal().range(['#ff7f0e', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#1f77b4', '#2ca02c', '#ffbb78', '#ff9896', '#c5b0d5', '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5', '#aec7e8', '#98df8a']);
	  return function(key) {
	    var color;
	    color = colors(key);
	    return color || unknownRatingColor;
	  };
	};

	module.exports = CategoryColorGenerator;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var BondProvider, ChartDocument, CurrentValuePlugin, CurvesPlugin, DebugBoxesPlugin, DotCurveSpreadsPlugin, DotsSetsPlugin, FirstOf, LastOf, Page, React, SpreadsPlugin, TimeSeriesPlugin, ValueScannerPlugin, currentValuePlugin, curvesPlugin, d3, debugBoxesPlugin, dotCurveSpreadsPlugin, dotsSetsPlugin, lodash, spreadsPlugin, store, timeSeriesPlugin, timeSeriesValueScannerPlugin, valueScannerPlugin;

	React = __webpack_require__(1);

	d3 = __webpack_require__(10);

	lodash = __webpack_require__(11);

	store = __webpack_require__(113);

	ChartDocument = __webpack_require__(9);

	BondProvider = __webpack_require__(114);

	FirstOf = __webpack_require__(50);

	LastOf = __webpack_require__(29);

	DotsSetsPlugin = __webpack_require__(31);

	CurvesPlugin = __webpack_require__(60);

	SpreadsPlugin = __webpack_require__(79);

	TimeSeriesPlugin = __webpack_require__(82);

	DotCurveSpreadsPlugin = __webpack_require__(99);

	ValueScannerPlugin = __webpack_require__(102);

	DebugBoxesPlugin = __webpack_require__(88);

	CurrentValuePlugin = __webpack_require__(109);

	dotsSetsPlugin = new DotsSetsPlugin;

	curvesPlugin = new CurvesPlugin;

	spreadsPlugin = new SpreadsPlugin;

	dotCurveSpreadsPlugin = new DotCurveSpreadsPlugin;

	valueScannerPlugin = new ValueScannerPlugin;

	timeSeriesPlugin = new TimeSeriesPlugin;

	timeSeriesValueScannerPlugin = new ValueScannerPlugin;

	debugBoxesPlugin = new DebugBoxesPlugin;

	currentValuePlugin = new CurrentValuePlugin;

	currentValuePlugin.update({
	  currentValues: []
	});

	Page = React.createClass({
	  componentWillMount: function() {
	    var plugins, ref, tsPlugins;
	    this.settings = (ref = store.get('settings')) != null ? ref : {
	      portfolio: 'scb',
	      bonds: 'RU000A0JTK38 RU000A0JS3W6 XS0559915961 XS0643183220 US912828L575',
	      y: 'yield',
	      x: 'duration',
	      date: '12 nov 2015',
	      maxZoom: 24,
	      chartZoom: {
	        scale: 1,
	        center: {
	          x: 0.5,
	          y: 0.5
	        }
	      },
	      tsZoom: {
	        scale: 1,
	        center: {
	          x: 0.5,
	          y: 0.5
	        }
	      }
	    };
	    plugins = [dotsSetsPlugin, curvesPlugin, spreadsPlugin, dotCurveSpreadsPlugin, valueScannerPlugin, currentValuePlugin];
	    this.chartDocument = new ChartDocument({
	      plugins: plugins
	    });
	    this.chartDocument.on('change', (function(_this) {
	      return function() {
	        _this.settings.chartZoom = _this.chartDocument.props.zoom;
	        return store.set('settings', _this.settings);
	      };
	    })(this));
	    this.chartDocument.on('bondDotClick', function(isin) {
	      return console.log('clicked on bond', isin);
	    });
	    tsPlugins = [timeSeriesPlugin, timeSeriesValueScannerPlugin];
	    this.tsDocument = new ChartDocument({
	      plugins: tsPlugins
	    });
	    this.tsDocument.on('change', (function(_this) {
	      return function() {
	        _this.settings.tsZoom = _this.tsDocument.props.zoom;
	        return store.set('settings', _this.settings);
	      };
	    })(this));
	    this.refreshChart();
	    return this.bondsAloneList = [this.genAloneBond(), this.genAloneBond(), this.genAloneBond(), this.genAloneBond(), this.genAloneBond()];
	  },
	  genAloneBond: function() {
	    return {
	      isin: ['A', 'B', 'C', 'D', 'E', 'F'][lodash.random(6)] + (lodash.random(99999)),
	      name: ['A', 'B', 'C', 'D', 'E', 'F'][lodash.random(6)],
	      liquidity: ['non-liquid', 'low', 'average', 'high', 'very high'][lodash.random(4)],
	      ratingGroup: ['A', 'AA', 'AAA', 'B', 'BB', 'BBB'][lodash.random(5)],
	      isFloater: lodash.random(1) === 1,
	      isConvertible: lodash.random(1) === 1,
	      isSubordinated: lodash.random(1) === 1
	    };
	  },
	  refreshChart: function() {
	    var Component, axes, axesLimits, backgroundColor, buildDataBuilder, dates, isins, labelStyle, localRegressionBandwidth, maxZoom, paddingCoefficient, portfolio, portfolios, tsAxes, tsAxesLimits, tsColors, tsDates, tsStep, tsSteps, yFromLimit, zoom;
	    store.set('settings', this.settings);
	    Component = this;
	    buildDataBuilder = function(bonds, portfolios) {
	      return function(isin, date) {
	        var bond, daily, dailyPortfolio, portfolio, quantities, quantity, result;
	        bond = bonds[isin];
	        daily = bond.daily[date];
	        portfolio = Component.settings.portfolio;
	        quantities = portfolios.map(function(p) {
	          var ref, ref1;
	          return (p != null) && ((ref = bond.portfolio[p]) != null ? (ref1 = ref[date]) != null ? ref1.quantity : void 0 : void 0);
	        }).filter(Number);
	        quantity = Math.max.apply(Math, quantities);
	        result = {
	          isin: isin,
	          quantity: quantity
	        };
	        result = lodash.assign(result, bond["static"], daily);
	        dailyPortfolio = (portfolio != null) && bond.portfolio[portfolio][date].daily;
	        if (dailyPortfolio) {
	          result = lodash.assign(result, dailyPortfolio);
	        }
	        result.tr = result["yield"] + 3;
	        return result;
	      };
	    };
	    isins = this.settings.bonds.split(/[^0-9A-Z]+/i).filter(function(isin) {
	      return isin;
	    });
	    dates = this.settings.date.split(/[^0-9\s\w\/.-]+/).map(function(date) {
	      return new Date(date);
	    }).filter(function(date) {
	      return String(date) !== 'Invalid Date';
	    });
	    tsStep = 10;
	    tsSteps = 2;
	    tsDates = d3.range(0, tsStep * tsSteps + 1, tsStep).map(function(day) {
	      return new Date(2015, 11, day);
	    });
	    portfolio = this.settings.portfolio;
	    portfolios = [portfolio];
	    axes = {
	      x: this.settings.x,
	      y: this.settings.y
	    };
	    tsAxes = {
	      x: 'date',
	      y: axes.y
	    };
	    yFromLimit = axes.y === 'yield' ? -2 : -2e308;
	    axesLimits = {
	      x: [0, 2e308],
	      y: [yFromLimit, 2e308]
	    };
	    tsAxesLimits = {
	      x: [-2e308, 2e308],
	      y: axesLimits.y
	    };
	    backgroundColor = '#ffffff';
	    labelStyle = {
	      color: 'black',
	      fontSize: '10px',
	      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
	      textHeight: 11,
	      textPadding: 2,
	      opacity: 0.85
	    };
	    paddingCoefficient = 0.15;
	    tsColors = d3.scale.category10();
	    localRegressionBandwidth = 0.9;
	    zoom = this.settings.chartZoom;
	    maxZoom = this.settings.maxZoom;
	    console.log('isins:', isins, 'dates:', dates, 'portfolios:', portfolios, 'axes:', axes, 'axesLimits:', axesLimits, 'zoom:', zoom, 'maxZoom:', maxZoom, 'backgroundColor:', backgroundColor, 'labelStyle:', labelStyle);
	    if (dates.length === 0 || portfolios.length === 0) {
	      return;
	    }
	    (new BondProvider).getFullPreformedBonds(isins, dates, portfolios).then((function(_this) {
	      return function(bonds) {
	        var buildDailyData, currentValues, curveIsins, curveIsins1, curveIsins2, curves, date, dotCurveSpreads, dotsSets, functionCurves, mid, set, spreads;
	        dotsSets = (function() {
	          var k, len, results;
	          results = [];
	          for (k = 0, len = dates.length; k < len; k++) {
	            date = dates[k];
	            set = {
	              isins: isins,
	              date: date,
	              highlight: isins[0],
	              selected: isins[10]
	            };
	            if (axes.y === 'yield') {
	              set.alternatives = [
	                {
	                  style: 'diagonal',
	                  y: 'tr'
	                }, {
	                  style: 'default'
	                }
	              ];
	            }
	            results.push(set);
	          }
	          return results;
	        })();
	        curveIsins = isins.slice(0, -1);
	        mid = Math.round(curveIsins.length / 2);
	        curveIsins1 = curveIsins.slice(0, mid);
	        curveIsins2 = curveIsins.slice(mid);
	        curves = lodash.flatten([curveIsins1, curveIsins2].map(function(isins, j) {
	          return dates.map(function(date, i) {
	            var extrapolation, getCurveWidth;
	            getCurveWidth = function(i, dates) {
	              var widths;
	              widths = {
	                1: [3.6],
	                2: [3.6, 1.6],
	                3: [3.6, 2.1, 0.6],
	                4: [3.6, 2.6, 1.6, 0.6]
	              };
	              return widths[dates.length][i];
	            };
	            extrapolation = axes.x === 'duration' && axes.y === 'yield' ? {
	              left: {
	                duration: 0,
	                "yield": 10
	              },
	              right: true
	            } : void 0;
	            return {
	              label: 'Regressed',
	              date: date,
	              isins: isins,
	              width: getCurveWidth(i, dates),
	              applyRegression: true,
	              extrapolation: extrapolation,
	              legendId: 0,
	              showsLegend: i + j === 0,
	              legendIndex: j * dates.length + i,
	              legendHeader: 'All curves'
	            };
	          });
	        }));
	        spreads = [
	          {
	            label: 'Spread',
	            width: 2,
	            curves: [curves[0], curves[1]],
	            extrapolation: axes.x === 'duration' && axes.y === 'yield' ? {
	              left: {
	                duration: 0,
	                "yield": 0
	              },
	              right: true
	            } : void 0
	          }
	        ];
	        dotCurveSpreads = [
	          {
	            date: dates[0],
	            dot: isins[isins.length - 1],
	            curve: curves[0]
	          }
	        ];
	        buildDailyData = buildDataBuilder(bonds, portfolios);
	        dotsSetsPlugin.update({
	          dotsSets: dotsSets
	        });
	        curvesPlugin.update({
	          curves: curves
	        });
	        spreadsPlugin.update({
	          spreads: spreads
	        });
	        dotCurveSpreadsPlugin.update({
	          dotCurveSpreads: dotCurveSpreads
	        });
	        valueScannerPlugin.update({
	          dotsSets: dotsSets,
	          curves: curves,
	          spreads: spreads
	        });
	        functionCurves = [
	          {
	            func: function(x) {
	              return Math.sin(x);
	            },
	            domain: [0, 20],
	            color: 'green',
	            width: 2
	          }
	        ];
	        currentValues = [
	          {
	            curve: functionCurves[0],
	            x: 5,
	            y: Math.sin(5),
	            radius: 4,
	            format: '[{0}, {1}]'
	          }, {
	            curve: functionCurves[0],
	            x: 13,
	            y: Math.sin(13),
	            radius: 4,
	            format: '[{0}, {1}]'
	          }
	        ];
	        currentValuePlugin.update({
	          currentValues: currentValues
	        });
	        return _this.chartDocument.update({
	          buildDailyData: buildDailyData,
	          axes: axes,
	          axesLimits: axesLimits,
	          zoom: zoom,
	          maxZoom: maxZoom,
	          backgroundColor: backgroundColor,
	          paddingCoefficient: paddingCoefficient,
	          localRegressionBandwidth: localRegressionBandwidth,
	          labelStyle: labelStyle
	        });
	      };
	    })(this));
	    return (new BondProvider).getFullPreformedBonds(isins, tsDates, portfolios).then((function(_this) {
	      return function(bonds) {
	        var buildDailyData, timeSeries;
	        buildDailyData = buildDataBuilder(bonds, portfolios);
	        timeSeries = isins.map(function(isin, index) {
	          return {
	            isin: isin,
	            label: bonds[isin]["static"].name,
	            width: 1.2,
	            color: tsColors(isin),
	            dates: tsDates,
	            isActive: index < 3
	          };
	        });
	        timeSeriesPlugin.update({
	          timeSeries: timeSeries
	        });
	        timeSeriesValueScannerPlugin.update({
	          timeSeries: timeSeries
	        });
	        return _this.tsDocument.update({
	          buildDailyData: buildDailyData,
	          axes: tsAxes,
	          axesLimits: tsAxesLimits,
	          zoom: _this.settings.tsZoom,
	          maxZoom: maxZoom,
	          backgroundColor: backgroundColor,
	          paddingCoefficient: paddingCoefficient,
	          localRegressionBandwidth: localRegressionBandwidth,
	          labelStyle: labelStyle
	        });
	      };
	    })(this));
	  },
	  applyClickHandler: function() {
	    return this.refreshChart();
	  },
	  resetZoomHandler: function() {
	    this.settings.chartZoom = {
	      scale: 1,
	      center: {
	        x: 0.5,
	        y: 0.5
	      }
	    };
	    this.settings.tsZoom = {
	      scale: 1,
	      center: {
	        x: 0.5,
	        y: 0.5
	      }
	    };
	    return this.refreshChart();
	  },
	  zoomInHandler: function() {
	    this.settings.chartZoom.scale = Math.min(this.settings.chartZoom.scale + 1, this.settings.maxZoom);
	    return this.refreshChart();
	  },
	  zoomOutHandler: function() {
	    this.settings.chartZoom.scale = Math.max(this.settings.chartZoom.scale - 1, 1);
	    return this.refreshChart();
	  },
	  portfolioChangeHandler: function(event) {
	    return this.settings.portfolio = event.target.value;
	  },
	  bondsChangeHandler: function(event) {
	    return this.settings.bonds = event.target.value;
	  },
	  dateChangeHandler: function(event) {
	    return this.settings.date = event.target.value;
	  },
	  xChangeHandler: function(event) {
	    return this.settings.x = event.target.value;
	  },
	  yChangeHandler: function(event) {
	    return this.settings.y = event.target.value;
	  },
	  render: __webpack_require__(137)
	});

	module.exports = Page;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict"
	// Module export pattern from
	// https://github.com/umdjs/umd/blob/master/returnExports.js
	;(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.store = factory();
	  }
	}(this, function () {
		
		// Store.js
		var store = {},
			win = (typeof window != 'undefined' ? window : global),
			doc = win.document,
			localStorageName = 'localStorage',
			scriptTag = 'script',
			storage

		store.disabled = false
		store.version = '1.3.20'
		store.set = function(key, value) {}
		store.get = function(key, defaultVal) {}
		store.has = function(key) { return store.get(key) !== undefined }
		store.remove = function(key) {}
		store.clear = function() {}
		store.transact = function(key, defaultVal, transactionFn) {
			if (transactionFn == null) {
				transactionFn = defaultVal
				defaultVal = null
			}
			if (defaultVal == null) {
				defaultVal = {}
			}
			var val = store.get(key, defaultVal)
			transactionFn(val)
			store.set(key, val)
		}
		store.getAll = function() {}
		store.forEach = function() {}

		store.serialize = function(value) {
			return JSON.stringify(value)
		}
		store.deserialize = function(value) {
			if (typeof value != 'string') { return undefined }
			try { return JSON.parse(value) }
			catch(e) { return value || undefined }
		}

		// Functions to encapsulate questionable FireFox 3.6.13 behavior
		// when about.config::dom.storage.enabled === false
		// See https://github.com/marcuswestin/store.js/issues#issue/13
		function isLocalStorageNameSupported() {
			try { return (localStorageName in win && win[localStorageName]) }
			catch(err) { return false }
		}

		if (isLocalStorageNameSupported()) {
			storage = win[localStorageName]
			store.set = function(key, val) {
				if (val === undefined) { return store.remove(key) }
				storage.setItem(key, store.serialize(val))
				return val
			}
			store.get = function(key, defaultVal) {
				var val = store.deserialize(storage.getItem(key))
				return (val === undefined ? defaultVal : val)
			}
			store.remove = function(key) { storage.removeItem(key) }
			store.clear = function() { storage.clear() }
			store.getAll = function() {
				var ret = {}
				store.forEach(function(key, val) {
					ret[key] = val
				})
				return ret
			}
			store.forEach = function(callback) {
				for (var i=0; i<storage.length; i++) {
					var key = storage.key(i)
					callback(key, store.get(key))
				}
			}
		} else if (doc && doc.documentElement.addBehavior) {
			var storageOwner,
				storageContainer
			// Since #userData storage applies only to specific paths, we need to
			// somehow link our data to a specific path.  We choose /favicon.ico
			// as a pretty safe option, since all browsers already make a request to
			// this URL anyway and being a 404 will not hurt us here.  We wrap an
			// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
			// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
			// since the iframe access rules appear to allow direct access and
			// manipulation of the document element, even for a 404 page.  This
			// document can be used instead of the current document (which would
			// have been limited to the current path) to perform #userData storage.
			try {
				storageContainer = new ActiveXObject('htmlfile')
				storageContainer.open()
				storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
				storageContainer.close()
				storageOwner = storageContainer.w.frames[0].document
				storage = storageOwner.createElement('div')
			} catch(e) {
				// somehow ActiveXObject instantiation failed (perhaps some special
				// security settings or otherwse), fall back to per-path storage
				storage = doc.createElement('div')
				storageOwner = doc.body
			}
			var withIEStorage = function(storeFunction) {
				return function() {
					var args = Array.prototype.slice.call(arguments, 0)
					args.unshift(storage)
					// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
					// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
					storageOwner.appendChild(storage)
					storage.addBehavior('#default#userData')
					storage.load(localStorageName)
					var result = storeFunction.apply(store, args)
					storageOwner.removeChild(storage)
					return result
				}
			}

			// In IE7, keys cannot start with a digit or contain certain chars.
			// See https://github.com/marcuswestin/store.js/issues/40
			// See https://github.com/marcuswestin/store.js/issues/83
			var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
			var ieKeyFix = function(key) {
				return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
			}
			store.set = withIEStorage(function(storage, key, val) {
				key = ieKeyFix(key)
				if (val === undefined) { return store.remove(key) }
				storage.setAttribute(key, store.serialize(val))
				storage.save(localStorageName)
				return val
			})
			store.get = withIEStorage(function(storage, key, defaultVal) {
				key = ieKeyFix(key)
				var val = store.deserialize(storage.getAttribute(key))
				return (val === undefined ? defaultVal : val)
			})
			store.remove = withIEStorage(function(storage, key) {
				key = ieKeyFix(key)
				storage.removeAttribute(key)
				storage.save(localStorageName)
			})
			store.clear = withIEStorage(function(storage) {
				var attributes = storage.XMLDocument.documentElement.attributes
				storage.load(localStorageName)
				for (var i=attributes.length-1; i>=0; i--) {
					storage.removeAttribute(attributes[i].name)
				}
				storage.save(localStorageName)
			})
			store.getAll = function(storage) {
				var ret = {}
				store.forEach(function(key, val) {
					ret[key] = val
				})
				return ret
			}
			store.forEach = withIEStorage(function(storage, callback) {
				var attributes = storage.XMLDocument.documentElement.attributes
				for (var i=0, attr; attr=attributes[i]; ++i) {
					callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
				}
			})
		}

		try {
			var testKey = '__storejs__'
			store.set(testKey, testKey)
			if (store.get(testKey) != testKey) { store.disabled = true }
			store.remove(testKey)
		} catch(e) {
			store.disabled = true
		}
		store.enabled = !store.disabled
		
		return store
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var BondProvider, BondSource, Entity, EntityCollection, PortfolioSource, Promise, lodash;

	BondSource = __webpack_require__(115);

	PortfolioSource = __webpack_require__(134);

	Entity = __webpack_require__(135);

	EntityCollection = __webpack_require__(136);

	lodash = __webpack_require__(11);

	Promise = (__webpack_require__(120)).Promise;

	module.exports = BondProvider = (function() {
	  function BondProvider() {}

	  BondProvider.prototype.getIsins = function() {
	    var source;
	    source = new BondSource;
	    return source.getIsins();
	  };

	  BondProvider.prototype.getFullPreformedBonds = function(isins, dates, portfolios) {
	    var bonds, promises;
	    bonds = this.peekBonds(isins);
	    promises = [];
	    promises.push(this.preformStaticData(bonds));
	    promises.push(this.preformMarketData(bonds));
	    promises.push(this.preformDailyData(bonds, dates));
	    promises.push(this.preformPortfolioQuantityData(bonds, portfolios, dates));
	    promises.push(this.preformPortfolioDailyData(bonds, portfolios, dates));
	    return Promise.all(promises).then(function() {
	      return bonds;
	    })["catch"](function(error) {
	      return console.error(error);
	    });
	  };

	  BondProvider.prototype.peekBonds = function(isins) {
	    var bonds;
	    bonds = new EntityCollection(isins.map(function(isin) {
	      return new Entity({
	        isin: isin,
	        daily: new EntityCollection,
	        portfolio: new EntityCollection
	      });
	    }));
	    bonds.indexBy('isin');
	    return bonds;
	  };

	  BondProvider.prototype.preformStaticData = function(bonds) {
	    var source;
	    source = new BondSource;
	    return source.getInfo(lodash.map(bonds, 'isin')).then(function(list) {
	      var bond, i, item, len;
	      for (i = 0, len = list.length; i < len; i++) {
	        item = list[i];
	        if (!((bond = bonds[item.isin]) != null)) {
	          continue;
	        }
	        if (bond["static"] == null) {
	          bond["static"] = new Entity;
	        }
	        bond["static"].assign(item.data);
	      }
	      return bonds;
	    });
	  };

	  BondProvider.prototype.preformMarketData = function(bonds) {
	    var source;
	    source = new BondSource;
	    return source.getMarket(lodash.map(bonds, 'isin')).then(function(list) {
	      var bond, i, item, len;
	      for (i = 0, len = list.length; i < len; i++) {
	        item = list[i];
	        if (!((bond = bonds[item.isin]) != null)) {
	          continue;
	        }
	        if (bond.market == null) {
	          bond.market = new Entity;
	        }
	        bond.market.assign(item.data);
	      }
	      return bonds;
	    });
	  };

	  BondProvider.prototype.preformDailyData = function(bonds, dates) {
	    var promise, result, source;
	    source = new BondSource;
	    result = function(list) {
	      var bond, daily, i, item, len, results;
	      results = [];
	      for (i = 0, len = list.length; i < len; i++) {
	        item = list[i];
	        if ((bond = bonds[item.isin]) != null) {
	          if (bond.daily[item.data.date]) {
	            results.push(bond.daily[item.data.date].assign(item.data));
	          } else {
	            bond.daily.push((daily = new Entity(item.data)));
	            results.push(bond.daily.addToIndex(daily, 'date'));
	          }
	        }
	      }
	      return results;
	    };
	    if (bonds.length > dates.length) {
	      promise = Promise.all(dates.map(function(date) {
	        return source.getDaily(lodash.map(bonds, 'isin'), date).then(result);
	      }));
	    } else {
	      promise = Promise.all(bonds.map(function(bond) {
	        return source.getTimeSeries(bond.isin, dates).then(result);
	      }));
	    }
	    return promise.then(function() {
	      var bond, i, len;
	      for (i = 0, len = bonds.length; i < len; i++) {
	        bond = bonds[i];
	        bond.daily.sortBy('date');
	        bond.daily.indexBy('date');
	      }
	      return bonds;
	    });
	  };

	  BondProvider.prototype._ensurePortfolio = function(bonds, portfolios) {
	    var bond, i, j, len, len1, name, portfolio, results;
	    results = [];
	    for (i = 0, len = bonds.length; i < len; i++) {
	      bond = bonds[i];
	      for (j = 0, len1 = portfolios.length; j < len1; j++) {
	        name = portfolios[j];
	        if (!(!bond.portfolio[name])) {
	          continue;
	        }
	        portfolio = new EntityCollection;
	        portfolio.assign({
	          name: name,
	          "static": null,
	          values: null
	        });
	        bond.portfolio.push(portfolio);
	      }
	      results.push(bond.portfolio.indexBy('name'));
	    }
	    return results;
	  };

	  BondProvider.prototype._ensurePortfolioDaily = function(bonds, portfolios, dates) {
	    var bond, date, i, len, name, portfolio, results;
	    this._ensurePortfolio(bonds, portfolios);
	    results = [];
	    for (i = 0, len = bonds.length; i < len; i++) {
	      bond = bonds[i];
	      results.push((function() {
	        var j, k, len1, len2, results1;
	        results1 = [];
	        for (j = 0, len1 = portfolios.length; j < len1; j++) {
	          name = portfolios[j];
	          portfolio = bond.portfolio[name];
	          for (k = 0, len2 = dates.length; k < len2; k++) {
	            date = dates[k];
	            if (!portfolio[date]) {
	              portfolio.push(new Entity({
	                date: date,
	                quantity: null,
	                info: null,
	                limits: null
	              }));
	            }
	          }
	          results1.push(portfolio.indexBy('date'));
	        }
	        return results1;
	      })());
	    }
	    return results;
	  };

	  BondProvider.prototype.preformPortfolioStaticData = function(bonds, portfolios) {
	    var i, len, name, promises, source;
	    this._ensurePortfolio(bonds, portfolios);
	    source = new PortfolioSource;
	    promises = [];
	    for (i = 0, len = portfolios.length; i < len; i++) {
	      name = portfolios[i];
	      promises.push(source.getStatic(name, lodash.map(bonds, 'isin')).then(function(list) {
	        var item, j, len1, results;
	        results = [];
	        for (j = 0, len1 = list.length; j < len1; j++) {
	          item = list[j];
	          if (item.data != null) {
	            results.push(bonds[item.isin].portfolio[name]["static"] = new Entity(item.data));
	          }
	        }
	        return results;
	      }));
	    }
	    return Promise.all(promises);
	  };

	  BondProvider.prototype.preformPortfolioValuesData = function(bonds, portfolios) {
	    var i, len, name, promises, source;
	    this._ensurePortfolio(bonds, portfolios);
	    source = new PortfolioSource;
	    promises = [];
	    for (i = 0, len = portfolios.length; i < len; i++) {
	      name = portfolios[i];
	      promises.push(source.getValues(name, lodash.map(bonds, 'isin')).then(function(list) {
	        var item, j, len1, results;
	        results = [];
	        for (j = 0, len1 = list.length; j < len1; j++) {
	          item = list[j];
	          if (item.data != null) {
	            results.push(bonds[item.isin].portfolio[name].values = new Entity(item.data));
	          }
	        }
	        return results;
	      }));
	    }
	    return Promise.all(promises);
	  };

	  BondProvider.prototype.preformPortfolioQuantityData = function(bonds, portfolios, dates) {
	    var date, i, j, len, len1, name, promises, source;
	    this._ensurePortfolioDaily(bonds, portfolios, dates);
	    source = new PortfolioSource;
	    promises = [];
	    for (i = 0, len = portfolios.length; i < len; i++) {
	      name = portfolios[i];
	      for (j = 0, len1 = dates.length; j < len1; j++) {
	        date = dates[j];
	        promises.push(source.getQuantity(name, date, lodash.map(bonds, 'isin')).then(function(list) {
	          var item, k, len2, results;
	          results = [];
	          for (k = 0, len2 = list.length; k < len2; k++) {
	            item = list[k];
	            results.push(bonds[item.isin].portfolio[name][date].quantity = item.quantity);
	          }
	          return results;
	        }));
	      }
	    }
	    return Promise.all(promises);
	  };

	  BondProvider.prototype.preformPortfolioDailyInfoData = function(bonds, portfolios, dates) {
	    var date, i, j, len, len1, name, promises, source;
	    this._ensurePortfolioDaily(bonds, portfolios, dates);
	    source = new PortfolioSource;
	    promises = [];
	    for (i = 0, len = portfolios.length; i < len; i++) {
	      name = portfolios[i];
	      for (j = 0, len1 = dates.length; j < len1; j++) {
	        date = dates[j];
	        promises.push(source.getInfo(name, date, lodash.map(bonds, 'isin')).then(function(list) {
	          var item, k, len2, results;
	          results = [];
	          for (k = 0, len2 = list.length; k < len2; k++) {
	            item = list[k];
	            results.push(bonds[item.isin].portfolio[name][date].info = new Entity(item.data));
	          }
	          return results;
	        }));
	      }
	    }
	    return Promise.all(promises);
	  };

	  BondProvider.prototype.preformPortfolioDailyLimitsData = function(bonds, portfolios, dates) {
	    var date, i, j, len, len1, name, promises, source;
	    this._ensurePortfolioDaily(bonds, portfolios, dates);
	    source = new PortfolioSource;
	    promises = [];
	    for (i = 0, len = portfolios.length; i < len; i++) {
	      name = portfolios[i];
	      for (j = 0, len1 = dates.length; j < len1; j++) {
	        date = dates[j];
	        promises.push(source.getLimits(name, date, lodash.map(bonds, 'isin')).then(function(list) {
	          var item, k, len2, results;
	          results = [];
	          for (k = 0, len2 = list.length; k < len2; k++) {
	            item = list[k];
	            results.push(bonds[item.isin].portfolio[name][date].limits = new Entity(item.data));
	          }
	          return results;
	        }));
	      }
	    }
	    return Promise.all(promises);
	  };

	  BondProvider.prototype.preformPortfolioDailyData = function(bonds, portfolios, dates) {
	    var date, i, j, len, len1, name, promises, source;
	    this._ensurePortfolioDaily(bonds, portfolios, dates);
	    source = new PortfolioSource;
	    promises = [];
	    for (i = 0, len = portfolios.length; i < len; i++) {
	      name = portfolios[i];
	      for (j = 0, len1 = dates.length; j < len1; j++) {
	        date = dates[j];
	        promises.push(source.getDaily(name, date, lodash.map(bonds, 'isin')).then(function(list) {
	          var item, k, len2, results;
	          results = [];
	          for (k = 0, len2 = list.length; k < len2; k++) {
	            item = list[k];
	            results.push(bonds[item.isin].portfolio[name][date].daily = new Entity(item.data));
	          }
	          return results;
	        }));
	      }
	    }
	    return Promise.all(promises);
	  };

	  return BondProvider;

	})();


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var BondSource, CollectionFormatter, DateFormatter, ObjectCaster, SourceAbstract, config, path,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	SourceAbstract = __webpack_require__(116);

	DateFormatter = __webpack_require__(124);

	CollectionFormatter = __webpack_require__(125);

	path = __webpack_require__(117);

	config = __webpack_require__(126);

	ObjectCaster = __webpack_require__(127);

	module.exports = BondSource = (function(superClass) {
	  extend(BondSource, superClass);

	  function BondSource() {
	    BondSource.__super__.constructor.call(this, path.join(config.dataApi, 'bonds'));
	  }

	  BondSource.prototype.getIsins = function() {
	    return this._get('isins').then(function(items) {
	      var i, item, len, results;
	      results = [];
	      for (i = 0, len = items.length; i < len; i++) {
	        item = items[i];
	        results.push(item.isin);
	      }
	      return results;
	    });
	  };

	  BondSource.prototype.getInfo = function(isins) {
	    isins = CollectionFormatter(isins);
	    return this._post('info', isins).then(function(data) {
	      var i, item, len, result;
	      result = [];
	      for (i = 0, len = data.length; i < len; i++) {
	        item = data[i];
	        if ((item != null ? item.isin : void 0) && item.data) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.bond["static"])
	          });
	        }
	      }
	      return result;
	    });
	  };

	  BondSource.prototype.getDaily = function(isins, date) {
	    date = DateFormatter(date);
	    isins = CollectionFormatter(isins);
	    return this._post('daily/:date', isins, {
	      date: date
	    }).then(function(data) {
	      var i, item, len, ref, result;
	      result = [];
	      for (i = 0, len = data.length; i < len; i++) {
	        item = data[i];
	        if ((item != null ? item.isin : void 0) && ((ref = item.data) != null ? ref.date : void 0)) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.bond.daily)
	          });
	        }
	      }
	      return result;
	    });
	  };

	  BondSource.prototype.getTimeSeries = function(isin, dates) {
	    dates = CollectionFormatter(dates);
	    dates = dates.map(DateFormatter);
	    return this._post('timeseries/:isin', dates, {
	      isin: isin
	    }).then(function(data) {
	      var i, item, len, ref, result;
	      result = [];
	      if (data != null ? data.isin : void 0) {
	        ref = data != null ? data.data : void 0;
	        for (i = 0, len = ref.length; i < len; i++) {
	          item = ref[i];
	          if (item != null ? item.date : void 0) {
	            result.push({
	              isin: data != null ? data.isin : void 0,
	              data: ObjectCaster(item, config.schemas.bond.daily)
	            });
	          }
	        }
	      }
	      return result;
	    });
	  };

	  BondSource.prototype.getMarket = function(isins) {
	    isins = CollectionFormatter(isins);
	    return this._post('market', isins).then(function(data) {
	      var i, item, len, result;
	      result = [];
	      for (i = 0, len = data.length; i < len; i++) {
	        item = data[i];
	        if ((item != null ? item.isin : void 0) && item.data) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.bond.market)
	          });
	        }
	      }
	      return result;
	    });
	  };

	  return BondSource;

	})(SourceAbstract);


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var SourceAbstract, lodash, path, request,
	  slice = [].slice;

	path = __webpack_require__(117);

	request = __webpack_require__(118);

	lodash = __webpack_require__(11);

	module.exports = SourceAbstract = (function() {
	  function SourceAbstract(baseUrl) {
	    this._setBaseUrl(baseUrl);
	  }

	  SourceAbstract.prototype._setBaseUrl = function(_baseUrl) {
	    this._baseUrl = _baseUrl;
	  };

	  SourceAbstract.prototype._transformParams = function(params) {
	    return lodash.cloneDeep(params);
	  };

	  SourceAbstract.prototype._transformData = function(data) {
	    return lodash.cloneDeep(data);
	  };

	  SourceAbstract.prototype._getResolvedUrl = function(url) {
	    if (url && (String(url)).trim().charAt(0) === '/') {
	      return url;
	    }
	    return path.join(this._baseUrl, url);
	  };

	  SourceAbstract.prototype._isUrlPattern = function(url) {
	    return /:[^\/]/.test(url);
	  };

	  SourceAbstract.prototype._getResolvedUrlPattern = function() {
	    var bags, cache, hasTailParam, url;
	    url = arguments[0], bags = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    cache = {};
	    hasTailParam = /:([^\/]+)$/.test(url);
	    url = url.replace(/:([^\/]+)/g, function(match, name) {
	      if (!cache.hasOwnProperty(name)) {
	        bags.some(function(bag) {
	          if (bag == null) {
	            return;
	          }
	          if (bag.hasOwnProperty(name)) {
	            cache[name] = bag[name];
	            delete bag[name];
	            return true;
	          }
	        });
	      }
	      return cache[name] || '';
	    }).replace('//', '/');
	    if (hasTailParam && url.length > 1 && url.slice(-1) === '/') {
	      url = url.slice(0, -1);
	    }
	    return url;
	  };

	  SourceAbstract.prototype._post = function(url, data, params) {
	    data = this._transformData(data);
	    params = this._transformParams(params);
	    if (this._isUrlPattern(url)) {
	      url = this._getResolvedUrlPattern(url, params, data);
	    }
	    return request.post(this._getResolvedUrl(url), data, params).then(function(response) {
	      return response.body;
	    });
	  };

	  SourceAbstract.prototype._get = function(url, params) {
	    params = this._transformParams(params);
	    if (this._isUrlPattern(url)) {
	      url = this._getResolvedUrlPattern(url, params);
	    }
	    return request.get(this._getResolvedUrl(url), params).then(function(response) {
	      return response.body;
	    });
	  };

	  return SourceAbstract;

	})();


/***/ },
/* 117 */
/***/ function(module, exports) {

	var slice = [].slice;

	module.exports = {
	  join: function() {
	    var pieces;
	    pieces = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (pieces.length === 0) {
	      return '';
	    }
	    return pieces.map(function(piece) {
	      return (String(piece || '')).trim();
	    }).reduce(function(left, right) {
	      var counter, index;
	      index = left.length - 1;
	      counter = 0;
	      while (index >= 0 && left[index] === '/') {
	        counter++;
	        index--;
	      }
	      while (counter > 0 && right.length > 0 && right[0] === '/') {
	        right = right.slice(1);
	        counter--;
	      }
	      if (left && right && left[left.length - 1] !== '/' && right[0] !== '/') {
	        left += '/';
	      }
	      return left + right;
	    });
	  }
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var Promise, http;

	http = __webpack_require__(119);

	Promise = (__webpack_require__(120)).Promise;

	module.exports = {
	  get: function(url, params) {
	    return new Promise(function(resolve, reject) {
	      return http.get({
	        url: url,
	        qs: params,
	        json: true
	      }, function(error, response) {
	        if (error) {
	          return reject(response);
	        } else {
	          return resolve(response);
	        }
	      });
	    });
	  },
	  post: function(url, data, params) {
	    return new Promise(function(resolve, reject) {
	      return http.post({
	        url: url,
	        body: data,
	        qs: params,
	        json: true
	      }, function(error, response) {
	        if (error) {
	          return reject(response);
	        } else {
	          return resolve(response);
	        }
	      });
	    });
	  }
	};


/***/ },
/* 119 */
/***/ function(module, exports) {

	// Browser Request
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//     http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.

	var XHR = XMLHttpRequest
	if (!XHR) throw new Error('missing XMLHttpRequest')
	request.log = {
	  'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
	}

	var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

	//
	// request
	//

	function request(options, callback) {
	  // The entry-point to the API: prep the options object and pass the real work to run_xhr.
	  if(typeof callback !== 'function')
	    throw new Error('Bad callback given: ' + callback)

	  if(!options)
	    throw new Error('No options given')

	  var options_onResponse = options.onResponse; // Save this for later.

	  if(typeof options === 'string')
	    options = {'uri':options};
	  else
	    options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

	  options.onResponse = options_onResponse // And put it back.

	  if (options.verbose) request.log = getLogger();

	  if(options.url) {
	    options.uri = options.url;
	    delete options.url;
	  }

	  if(!options.uri && options.uri !== "")
	    throw new Error("options.uri is a required argument");

	  if(typeof options.uri != "string")
	    throw new Error("options.uri must be a string");

	  var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
	  for (var i = 0; i < unsupported_options.length; i++)
	    if(options[ unsupported_options[i] ])
	      throw new Error("options." + unsupported_options[i] + " is not supported")

	  options.callback = callback
	  options.method = options.method || 'GET';
	  options.headers = options.headers || {};
	  options.body    = options.body || null
	  options.timeout = options.timeout || request.DEFAULT_TIMEOUT

	  if(options.headers.host)
	    throw new Error("Options.headers.host is not supported");

	  if(options.json) {
	    options.headers.accept = options.headers.accept || 'application/json'
	    if(options.method !== 'GET')
	      options.headers['content-type'] = 'application/json'

	    if(typeof options.json !== 'boolean')
	      options.body = JSON.stringify(options.json)
	    else if(typeof options.body !== 'string')
	      options.body = JSON.stringify(options.body)
	  }
	  
	  //BEGIN QS Hack
	  var serialize = function(obj) {
	    var str = [];
	    for(var p in obj)
	      if (obj.hasOwnProperty(p)) {
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	      }
	    return str.join("&");
	  }
	  
	  if(options.qs){
	    var qs = (typeof options.qs == 'string')? options.qs : serialize(options.qs);
	    if(options.uri.indexOf('?') !== -1){ //no get params
	        options.uri = options.uri+'&'+qs;
	    }else{ //existing get params
	        options.uri = options.uri+'?'+qs;
	    }
	  }
	  //END QS Hack
	  
	  //BEGIN FORM Hack
	  var multipart = function(obj) {
	    //todo: support file type (useful?)
	    var result = {};
	    result.boundry = '-------------------------------'+Math.floor(Math.random()*1000000000);
	    var lines = [];
	    for(var p in obj){
	        if (obj.hasOwnProperty(p)) {
	            lines.push(
	                '--'+result.boundry+"\n"+
	                'Content-Disposition: form-data; name="'+p+'"'+"\n"+
	                "\n"+
	                obj[p]+"\n"
	            );
	        }
	    }
	    lines.push( '--'+result.boundry+'--' );
	    result.body = lines.join('');
	    result.length = result.body.length;
	    result.type = 'multipart/form-data; boundary='+result.boundry;
	    return result;
	  }
	  
	  if(options.form){
	    if(typeof options.form == 'string') throw('form name unsupported');
	    if(options.method === 'POST'){
	        var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
	        options.headers['content-type'] = encoding;
	        switch(encoding){
	            case 'application/x-www-form-urlencoded':
	                options.body = serialize(options.form).replace(/%20/g, "+");
	                break;
	            case 'multipart/form-data':
	                var multi = multipart(options.form);
	                //options.headers['content-length'] = multi.length;
	                options.body = multi.body;
	                options.headers['content-type'] = multi.type;
	                break;
	            default : throw new Error('unsupported encoding:'+encoding);
	        }
	    }
	  }
	  //END FORM Hack

	  // If onResponse is boolean true, call back immediately when the response is known,
	  // not when the full request is complete.
	  options.onResponse = options.onResponse || noop
	  if(options.onResponse === true) {
	    options.onResponse = callback
	    options.callback = noop
	  }

	  // XXX Browsers do not like this.
	  //if(options.body)
	  //  options.headers['content-length'] = options.body.length;

	  // HTTP basic authentication
	  if(!options.headers.authorization && options.auth)
	    options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

	  return run_xhr(options)
	}

	var req_seq = 0
	function run_xhr(options) {
	  var xhr = new XHR
	    , timed_out = false
	    , is_cors = is_crossDomain(options.uri)
	    , supports_cors = ('withCredentials' in xhr)

	  req_seq += 1
	  xhr.seq_id = req_seq
	  xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
	  xhr._id = xhr.id // I know I will type "_id" from habit all the time.

	  if(is_cors && !supports_cors) {
	    var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
	    cors_err.cors = 'unsupported'
	    return options.callback(cors_err, xhr)
	  }

	  xhr.timeoutTimer = setTimeout(too_late, options.timeout)
	  function too_late() {
	    timed_out = true
	    var er = new Error('ETIMEDOUT')
	    er.code = 'ETIMEDOUT'
	    er.duration = options.timeout

	    request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
	    return options.callback(er, xhr)
	  }

	  // Some states can be skipped over, so remember what is still incomplete.
	  var did = {'response':false, 'loading':false, 'end':false}

	  xhr.onreadystatechange = on_state_change
	  xhr.open(options.method, options.uri, true) // asynchronous
	  if(is_cors)
	    xhr.withCredentials = !! options.withCredentials
	  xhr.send(options.body)
	  return xhr

	  function on_state_change(event) {
	    if(timed_out)
	      return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})

	    request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})

	    if(xhr.readyState === XHR.OPENED) {
	      request.log.debug('Request started', {'id':xhr.id})
	      for (var key in options.headers)
	        xhr.setRequestHeader(key, options.headers[key])
	    }

	    else if(xhr.readyState === XHR.HEADERS_RECEIVED)
	      on_response()

	    else if(xhr.readyState === XHR.LOADING) {
	      on_response()
	      on_loading()
	    }

	    else if(xhr.readyState === XHR.DONE) {
	      on_response()
	      on_loading()
	      on_end()
	    }
	  }

	  function on_response() {
	    if(did.response)
	      return

	    did.response = true
	    request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
	    clearTimeout(xhr.timeoutTimer)
	    xhr.statusCode = xhr.status // Node request compatibility

	    // Detect failed CORS requests.
	    if(is_cors && xhr.statusCode == 0) {
	      var cors_err = new Error('CORS request rejected: ' + options.uri)
	      cors_err.cors = 'rejected'

	      // Do not process this request further.
	      did.loading = true
	      did.end = true

	      return options.callback(cors_err, xhr)
	    }

	    options.onResponse(null, xhr)
	  }

	  function on_loading() {
	    if(did.loading)
	      return

	    did.loading = true
	    request.log.debug('Response body loading', {'id':xhr.id})
	    // TODO: Maybe simulate "data" events by watching xhr.responseText
	  }

	  function on_end() {
	    if(did.end)
	      return

	    did.end = true
	    request.log.debug('Request done', {'id':xhr.id})

	    xhr.body = xhr.responseText
	    if(options.json) {
	      try        { xhr.body = JSON.parse(xhr.responseText) }
	      catch (er) { return options.callback(er, xhr)        }
	    }

	    options.callback(null, xhr, xhr.body)
	  }

	} // request

	request.withCredentials = false;
	request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

	//
	// defaults
	//

	request.defaults = function(options, requester) {
	  var def = function (method) {
	    var d = function (params, callback) {
	      if(typeof params === 'string')
	        params = {'uri': params};
	      else {
	        params = JSON.parse(JSON.stringify(params));
	      }
	      for (var i in options) {
	        if (params[i] === undefined) params[i] = options[i]
	      }
	      return method(params, callback)
	    }
	    return d
	  }
	  var de = def(request)
	  de.get = def(request.get)
	  de.post = def(request.post)
	  de.put = def(request.put)
	  de.head = def(request.head)
	  return de
	}

	//
	// HTTP method shortcuts
	//

	var shortcuts = [ 'get', 'put', 'post', 'head' ];
	shortcuts.forEach(function(shortcut) {
	  var method = shortcut.toUpperCase();
	  var func   = shortcut.toLowerCase();

	  request[func] = function(opts) {
	    if(typeof opts === 'string')
	      opts = {'method':method, 'uri':opts};
	    else {
	      opts = JSON.parse(JSON.stringify(opts));
	      opts.method = method;
	    }

	    var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
	    return request.apply(this, args);
	  }
	})

	//
	// CouchDB shortcut
	//

	request.couch = function(options, callback) {
	  if(typeof options === 'string')
	    options = {'uri':options}

	  // Just use the request API to do JSON.
	  options.json = true
	  if(options.body)
	    options.json = options.body
	  delete options.body

	  callback = callback || noop

	  var xhr = request(options, couch_handler)
	  return xhr

	  function couch_handler(er, resp, body) {
	    if(er)
	      return callback(er, resp, body)

	    if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
	      // The body is a Couch JSON object indicating the error.
	      er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
	      for (var key in body)
	        er[key] = body[key]
	      return callback(er, resp, body);
	    }

	    return callback(er, resp, body);
	  }
	}

	//
	// Utility
	//

	function noop() {}

	function getLogger() {
	  var logger = {}
	    , levels = ['trace', 'debug', 'info', 'warn', 'error']
	    , level, i

	  for(i = 0; i < levels.length; i++) {
	    level = levels[i]

	    logger[level] = noop
	    if(typeof console !== 'undefined' && console && console[level])
	      logger[level] = formatted(console, level)
	  }

	  return logger
	}

	function formatted(obj, method) {
	  return formatted_logger

	  function formatted_logger(str, context) {
	    if(typeof context === 'object')
	      str += ' ' + JSON.stringify(context)

	    return obj[method].call(obj, str)
	  }
	}

	// Return whether a URL is a cross-domain request.
	function is_crossDomain(url) {
	  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

	  // jQuery #8138, IE may throw an exception when accessing
	  // a field from window.location if document.domain has been set
	  var ajaxLocation
	  try { ajaxLocation = location.href }
	  catch (e) {
	    // Use the href attribute of an A element since IE will modify it given document.location
	    ajaxLocation = document.createElement( "a" );
	    ajaxLocation.href = "";
	    ajaxLocation = ajaxLocation.href;
	  }

	  var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
	    , parts = rurl.exec(url.toLowerCase() )

	  var result = !!(
	    parts &&
	    (  parts[1] != ajaxLocParts[1]
	    || parts[2] != ajaxLocParts[2]
	    || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
	    )
	  )

	  //console.debug('is_crossDomain('+url+') -> ' + result)
	  return result
	}

	// MIT License from http://phpjs.org/functions/base64_encode:358
	function b64_enc (data) {
	    // Encodes string using MIME base64 algorithm
	    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

	    if (!data) {
	        return data;
	    }

	    // assume utf8 data
	    // data = this.utf8_encode(data+'');

	    do { // pack three octets into four hexets
	        o1 = data.charCodeAt(i++);
	        o2 = data.charCodeAt(i++);
	        o3 = data.charCodeAt(i++);

	        bits = o1<<16 | o2<<8 | o3;

	        h1 = bits>>18 & 0x3f;
	        h2 = bits>>12 & 0x3f;
	        h3 = bits>>6 & 0x3f;
	        h4 = bits & 0x3f;

	        // use hexets to index into b64, and append result to encoded string
	        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	    } while (i < data.length);

	    enc = tmp_arr.join('');

	    switch (data.length % 3) {
	        case 1:
	            enc = enc.slice(0, -2) + '==';
	        break;
	        case 2:
	            enc = enc.slice(0, -1) + '=';
	        break;
	    }

	    return enc;
	}
	module.exports = request;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate, global, module) {/*!
	 * @overview RSVP - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
	 * @version   3.1.0
	 */

	(function() {
	    "use strict";
	    function lib$rsvp$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$rsvp$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$rsvp$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$rsvp$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$rsvp$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$rsvp$utils$$_isArray = Array.isArray;
	    }

	    var lib$rsvp$utils$$isArray = lib$rsvp$utils$$_isArray;

	    var lib$rsvp$utils$$now = Date.now || function() { return new Date().getTime(); };

	    function lib$rsvp$utils$$F() { }

	    var lib$rsvp$utils$$o_create = (Object.create || function (o) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (typeof o !== 'object') {
	        throw new TypeError('Argument must be an object');
	      }
	      lib$rsvp$utils$$F.prototype = o;
	      return new lib$rsvp$utils$$F();
	    });
	    function lib$rsvp$events$$indexOf(callbacks, callback) {
	      for (var i=0, l=callbacks.length; i<l; i++) {
	        if (callbacks[i] === callback) { return i; }
	      }

	      return -1;
	    }

	    function lib$rsvp$events$$callbacksFor(object) {
	      var callbacks = object._promiseCallbacks;

	      if (!callbacks) {
	        callbacks = object._promiseCallbacks = {};
	      }

	      return callbacks;
	    }

	    var lib$rsvp$events$$default = {

	      /**
	        `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
	        Example:

	        ```javascript
	        var object = {};

	        RSVP.EventTarget.mixin(object);

	        object.on('finished', function(event) {
	          // handle event
	        });

	        object.trigger('finished', { detail: value });
	        ```

	        `EventTarget.mixin` also works with prototypes:

	        ```javascript
	        var Person = function() {};
	        RSVP.EventTarget.mixin(Person.prototype);

	        var yehuda = new Person();
	        var tom = new Person();

	        yehuda.on('poke', function(event) {
	          console.log('Yehuda says OW');
	        });

	        tom.on('poke', function(event) {
	          console.log('Tom says OW');
	        });

	        yehuda.trigger('poke');
	        tom.trigger('poke');
	        ```

	        @method mixin
	        @for RSVP.EventTarget
	        @private
	        @param {Object} object object to extend with EventTarget methods
	      */
	      'mixin': function(object) {
	        object['on']      = this['on'];
	        object['off']     = this['off'];
	        object['trigger'] = this['trigger'];
	        object._promiseCallbacks = undefined;
	        return object;
	      },

	      /**
	        Registers a callback to be executed when `eventName` is triggered

	        ```javascript
	        object.on('event', function(eventInfo){
	          // handle the event
	        });

	        object.trigger('event');
	        ```

	        @method on
	        @for RSVP.EventTarget
	        @private
	        @param {String} eventName name of the event to listen for
	        @param {Function} callback function to be called when the event is triggered.
	      */
	      'on': function(eventName, callback) {
	        if (typeof callback !== 'function') {
	          throw new TypeError('Callback must be a function');
	        }

	        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks;

	        callbacks = allCallbacks[eventName];

	        if (!callbacks) {
	          callbacks = allCallbacks[eventName] = [];
	        }

	        if (lib$rsvp$events$$indexOf(callbacks, callback) === -1) {
	          callbacks.push(callback);
	        }
	      },

	      /**
	        You can use `off` to stop firing a particular callback for an event:

	        ```javascript
	        function doStuff() { // do stuff! }
	        object.on('stuff', doStuff);

	        object.trigger('stuff'); // doStuff will be called

	        // Unregister ONLY the doStuff callback
	        object.off('stuff', doStuff);
	        object.trigger('stuff'); // doStuff will NOT be called
	        ```

	        If you don't pass a `callback` argument to `off`, ALL callbacks for the
	        event will not be executed when the event fires. For example:

	        ```javascript
	        var callback1 = function(){};
	        var callback2 = function(){};

	        object.on('stuff', callback1);
	        object.on('stuff', callback2);

	        object.trigger('stuff'); // callback1 and callback2 will be executed.

	        object.off('stuff');
	        object.trigger('stuff'); // callback1 and callback2 will not be executed!
	        ```

	        @method off
	        @for RSVP.EventTarget
	        @private
	        @param {String} eventName event to stop listening to
	        @param {Function} callback optional argument. If given, only the function
	        given will be removed from the event's callback queue. If no `callback`
	        argument is given, all callbacks will be removed from the event's callback
	        queue.
	      */
	      'off': function(eventName, callback) {
	        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, index;

	        if (!callback) {
	          allCallbacks[eventName] = [];
	          return;
	        }

	        callbacks = allCallbacks[eventName];

	        index = lib$rsvp$events$$indexOf(callbacks, callback);

	        if (index !== -1) { callbacks.splice(index, 1); }
	      },

	      /**
	        Use `trigger` to fire custom events. For example:

	        ```javascript
	        object.on('foo', function(){
	          console.log('foo event happened!');
	        });
	        object.trigger('foo');
	        // 'foo event happened!' logged to the console
	        ```

	        You can also pass a value as a second argument to `trigger` that will be
	        passed as an argument to all event listeners for the event:

	        ```javascript
	        object.on('foo', function(value){
	          console.log(value.name);
	        });

	        object.trigger('foo', { name: 'bar' });
	        // 'bar' logged to the console
	        ```

	        @method trigger
	        @for RSVP.EventTarget
	        @private
	        @param {String} eventName name of the event to be triggered
	        @param {*} options optional value to be passed to any event handlers for
	        the given `eventName`
	      */
	      'trigger': function(eventName, options, label) {
	        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, callback;

	        if (callbacks = allCallbacks[eventName]) {
	          // Don't cache the callbacks.length since it may grow
	          for (var i=0; i<callbacks.length; i++) {
	            callback = callbacks[i];

	            callback(options, label);
	          }
	        }
	      }
	    };

	    var lib$rsvp$config$$config = {
	      instrument: false
	    };

	    lib$rsvp$events$$default['mixin'](lib$rsvp$config$$config);

	    function lib$rsvp$config$$configure(name, value) {
	      if (name === 'onerror') {
	        // handle for legacy users that expect the actual
	        // error to be passed to their function added via
	        // `RSVP.configure('onerror', someFunctionHere);`
	        lib$rsvp$config$$config['on']('error', value);
	        return;
	      }

	      if (arguments.length === 2) {
	        lib$rsvp$config$$config[name] = value;
	      } else {
	        return lib$rsvp$config$$config[name];
	      }
	    }

	    var lib$rsvp$instrument$$queue = [];

	    function lib$rsvp$instrument$$scheduleFlush() {
	      setTimeout(function() {
	        var entry;
	        for (var i = 0; i < lib$rsvp$instrument$$queue.length; i++) {
	          entry = lib$rsvp$instrument$$queue[i];

	          var payload = entry.payload;

	          payload.guid = payload.key + payload.id;
	          payload.childGuid = payload.key + payload.childId;
	          if (payload.error) {
	            payload.stack = payload.error.stack;
	          }

	          lib$rsvp$config$$config['trigger'](entry.name, entry.payload);
	        }
	        lib$rsvp$instrument$$queue.length = 0;
	      }, 50);
	    }

	    function lib$rsvp$instrument$$instrument(eventName, promise, child) {
	      if (1 === lib$rsvp$instrument$$queue.push({
	        name: eventName,
	        payload: {
	          key: promise._guidKey,
	          id:  promise._id,
	          eventName: eventName,
	          detail: promise._result,
	          childId: child && child._id,
	          label: promise._label,
	          timeStamp: lib$rsvp$utils$$now(),
	          error: lib$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
	        }})) {
	          lib$rsvp$instrument$$scheduleFlush();
	        }
	      }
	    var lib$rsvp$instrument$$default = lib$rsvp$instrument$$instrument;

	    function  lib$rsvp$$internal$$withOwnPromise() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$rsvp$$internal$$noop() {}

	    var lib$rsvp$$internal$$PENDING   = void 0;
	    var lib$rsvp$$internal$$FULFILLED = 1;
	    var lib$rsvp$$internal$$REJECTED  = 2;

	    var lib$rsvp$$internal$$GET_THEN_ERROR = new lib$rsvp$$internal$$ErrorObject();

	    function lib$rsvp$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$rsvp$$internal$$GET_THEN_ERROR.error = error;
	        return lib$rsvp$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$rsvp$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$rsvp$$internal$$handleForeignThenable(promise, thenable, then) {
	      lib$rsvp$config$$config.async(function(promise) {
	        var sealed = false;
	        var error = lib$rsvp$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$rsvp$$internal$$resolve(promise, value);
	          } else {
	            lib$rsvp$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$rsvp$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$rsvp$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$rsvp$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$rsvp$$internal$$FULFILLED) {
	        lib$rsvp$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$rsvp$$internal$$REJECTED) {
	        thenable._onError = null;
	        lib$rsvp$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$rsvp$$internal$$subscribe(thenable, undefined, function(value) {
	          if (thenable !== value) {
	            lib$rsvp$$internal$$resolve(promise, value);
	          } else {
	            lib$rsvp$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          lib$rsvp$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$rsvp$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$rsvp$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$rsvp$$internal$$getThen(maybeThenable);

	        if (then === lib$rsvp$$internal$$GET_THEN_ERROR) {
	          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$rsvp$utils$$isFunction(then)) {
	          lib$rsvp$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$rsvp$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$rsvp$$internal$$fulfill(promise, value);
	      } else if (lib$rsvp$utils$$objectOrFunction(value)) {
	        lib$rsvp$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$rsvp$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$rsvp$$internal$$publishRejection(promise) {
	      if (promise._onError) {
	        promise._onError(promise._result);
	      }

	      lib$rsvp$$internal$$publish(promise);
	    }

	    function lib$rsvp$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$rsvp$$internal$$FULFILLED;

	      if (promise._subscribers.length === 0) {
	        if (lib$rsvp$config$$config.instrument) {
	          lib$rsvp$instrument$$default('fulfilled', promise);
	        }
	      } else {
	        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, promise);
	      }
	    }

	    function lib$rsvp$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }
	      promise._state = lib$rsvp$$internal$$REJECTED;
	      promise._result = reason;
	      lib$rsvp$config$$config.async(lib$rsvp$$internal$$publishRejection, promise);
	    }

	    function lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onError = null;

	      subscribers[length] = child;
	      subscribers[length + lib$rsvp$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$rsvp$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, parent);
	      }
	    }

	    function lib$rsvp$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (lib$rsvp$config$$config.instrument) {
	        lib$rsvp$instrument$$default(settled === lib$rsvp$$internal$$FULFILLED ? 'fulfilled' : 'rejected', promise);
	      }

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$rsvp$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$rsvp$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$rsvp$$internal$$TRY_CATCH_ERROR = new lib$rsvp$$internal$$ErrorObject();

	    function lib$rsvp$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$rsvp$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$rsvp$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$rsvp$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$rsvp$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$rsvp$$internal$$tryCatch(callback, detail);

	        if (value === lib$rsvp$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$withOwnPromise());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$rsvp$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$rsvp$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$rsvp$$internal$$reject(promise, error);
	      } else if (settled === lib$rsvp$$internal$$FULFILLED) {
	        lib$rsvp$$internal$$fulfill(promise, value);
	      } else if (settled === lib$rsvp$$internal$$REJECTED) {
	        lib$rsvp$$internal$$reject(promise, value);
	      }
	    }

	    function lib$rsvp$$internal$$initializePromise(promise, resolver) {
	      var resolved = false;
	      try {
	        resolver(function resolvePromise(value){
	          if (resolved) { return; }
	          resolved = true;
	          lib$rsvp$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          if (resolved) { return; }
	          resolved = true;
	          lib$rsvp$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$rsvp$$internal$$reject(promise, e);
	      }
	    }

	    function lib$rsvp$enumerator$$makeSettledResult(state, position, value) {
	      if (state === lib$rsvp$$internal$$FULFILLED) {
	        return {
	          state: 'fulfilled',
	          value: value
	        };
	      } else {
	         return {
	          state: 'rejected',
	          reason: value
	        };
	      }
	    }

	    function lib$rsvp$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$rsvp$$internal$$noop, label);
	      enumerator._abortOnReject = abortOnReject;

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$rsvp$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$rsvp$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$rsvp$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    var lib$rsvp$enumerator$$default = lib$rsvp$enumerator$$Enumerator;

	    lib$rsvp$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$rsvp$utils$$isArray(input);
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;
	      var length     = enumerator.length;
	      var promise    = enumerator.promise;
	      var input      = enumerator._input;

	      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;
	      if (lib$rsvp$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$rsvp$$internal$$PENDING) {
	          entry._onError = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = enumerator._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
	      }
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$rsvp$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (enumerator._abortOnReject && state === lib$rsvp$$internal$$REJECTED) {
	          lib$rsvp$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = enumerator._makeResult(state, i, value);
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$rsvp$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
	      return value;
	    };

	    lib$rsvp$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$rsvp$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$rsvp$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$rsvp$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$rsvp$promise$all$$all(entries, label) {
	      return new lib$rsvp$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
	    }
	    var lib$rsvp$promise$all$$default = lib$rsvp$promise$all$$all;
	    function lib$rsvp$promise$race$$race(entries, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$rsvp$$internal$$noop, label);

	      if (!lib$rsvp$utils$$isArray(entries)) {
	        lib$rsvp$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$rsvp$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$rsvp$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
	        lib$rsvp$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$rsvp$promise$race$$default = lib$rsvp$promise$race$$race;
	    function lib$rsvp$promise$resolve$$resolve(object, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
	      lib$rsvp$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$rsvp$promise$resolve$$default = lib$rsvp$promise$resolve$$resolve;
	    function lib$rsvp$promise$reject$$reject(reason, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
	      lib$rsvp$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$rsvp$promise$reject$$default = lib$rsvp$promise$reject$$reject;

	    var lib$rsvp$promise$$guidKey = 'rsvp_' + lib$rsvp$utils$$now() + '-';
	    var lib$rsvp$promise$$counter = 0;

	    function lib$rsvp$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$rsvp$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    function lib$rsvp$promise$$Promise(resolver, label) {
	      var promise = this;

	      promise._id = lib$rsvp$promise$$counter++;
	      promise._label = label;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];

	      if (lib$rsvp$config$$config.instrument) {
	        lib$rsvp$instrument$$default('created', promise);
	      }

	      if (lib$rsvp$$internal$$noop !== resolver) {
	        if (!lib$rsvp$utils$$isFunction(resolver)) {
	          lib$rsvp$promise$$needsResolver();
	        }

	        if (!(promise instanceof lib$rsvp$promise$$Promise)) {
	          lib$rsvp$promise$$needsNew();
	        }

	        lib$rsvp$$internal$$initializePromise(promise, resolver);
	      }
	    }

	    var lib$rsvp$promise$$default = lib$rsvp$promise$$Promise;

	    // deprecated
	    lib$rsvp$promise$$Promise.cast = lib$rsvp$promise$resolve$$default;
	    lib$rsvp$promise$$Promise.all = lib$rsvp$promise$all$$default;
	    lib$rsvp$promise$$Promise.race = lib$rsvp$promise$race$$default;
	    lib$rsvp$promise$$Promise.resolve = lib$rsvp$promise$resolve$$default;
	    lib$rsvp$promise$$Promise.reject = lib$rsvp$promise$reject$$default;

	    lib$rsvp$promise$$Promise.prototype = {
	      constructor: lib$rsvp$promise$$Promise,

	      _guidKey: lib$rsvp$promise$$guidKey,

	      _onError: function (reason) {
	        var promise = this;
	        lib$rsvp$config$$config.after(function() {
	          if (promise._onError) {
	            lib$rsvp$config$$config['trigger']('error', reason, promise._label);
	          }
	        });
	      },

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfillment
	      @param {Function} onRejection
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection, label) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$rsvp$$internal$$FULFILLED && !onFulfillment || state === lib$rsvp$$internal$$REJECTED && !onRejection) {
	          if (lib$rsvp$config$$config.instrument) {
	            lib$rsvp$instrument$$default('chained', parent, parent);
	          }
	          return parent;
	        }

	        parent._onError = null;

	        var child = new parent.constructor(lib$rsvp$$internal$$noop, label);
	        var result = parent._result;

	        if (lib$rsvp$config$$config.instrument) {
	          lib$rsvp$instrument$$default('chained', parent, child);
	        }

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$rsvp$config$$config.async(function(){
	            lib$rsvp$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection, label) {
	        return this.then(undefined, onRejection, label);
	      },

	    /**
	      `finally` will be invoked regardless of the promise's fate just as native
	      try/catch/finally behaves

	      Synchronous example:

	      ```js
	      findAuthor() {
	        if (Math.random() > 0.5) {
	          throw new Error();
	        }
	        return new Author();
	      }

	      try {
	        return findAuthor(); // succeed or fail
	      } catch(error) {
	        return findOtherAuther();
	      } finally {
	        // always runs
	        // doesn't affect the return value
	      }
	      ```

	      Asynchronous example:

	      ```js
	      findAuthor().catch(function(reason){
	        return findOtherAuther();
	      }).finally(function(){
	        // author was either found, or not
	      });
	      ```

	      @method finally
	      @param {Function} callback
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      'finally': function(callback, label) {
	        var promise = this;
	        var constructor = promise.constructor;

	        return promise.then(function(value) {
	          return constructor.resolve(callback()).then(function(){
	            return value;
	          });
	        }, function(reason) {
	          return constructor.resolve(callback()).then(function(){
	            throw reason;
	          });
	        }, label);
	      }
	    };

	    function lib$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
	      this._superConstructor(Constructor, entries, false /* don't abort on reject */, label);
	    }

	    lib$rsvp$all$settled$$AllSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
	    lib$rsvp$all$settled$$AllSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
	    lib$rsvp$all$settled$$AllSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;
	    lib$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
	      return new Error('allSettled must be called with an array');
	    };

	    function lib$rsvp$all$settled$$allSettled(entries, label) {
	      return new lib$rsvp$all$settled$$AllSettled(lib$rsvp$promise$$default, entries, label).promise;
	    }
	    var lib$rsvp$all$settled$$default = lib$rsvp$all$settled$$allSettled;
	    function lib$rsvp$all$$all(array, label) {
	      return lib$rsvp$promise$$default.all(array, label);
	    }
	    var lib$rsvp$all$$default = lib$rsvp$all$$all;
	    var lib$rsvp$asap$$len = 0;
	    var lib$rsvp$asap$$toString = {}.toString;
	    var lib$rsvp$asap$$vertxNext;
	    function lib$rsvp$asap$$asap(callback, arg) {
	      lib$rsvp$asap$$queue[lib$rsvp$asap$$len] = callback;
	      lib$rsvp$asap$$queue[lib$rsvp$asap$$len + 1] = arg;
	      lib$rsvp$asap$$len += 2;
	      if (lib$rsvp$asap$$len === 2) {
	        // If len is 1, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        lib$rsvp$asap$$scheduleFlush();
	      }
	    }

	    var lib$rsvp$asap$$default = lib$rsvp$asap$$asap;

	    var lib$rsvp$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$rsvp$asap$$browserGlobal = lib$rsvp$asap$$browserWindow || {};
	    var lib$rsvp$asap$$BrowserMutationObserver = lib$rsvp$asap$$browserGlobal.MutationObserver || lib$rsvp$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$rsvp$asap$$isNode = typeof self === 'undefined' &&
	      typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$rsvp$asap$$useNextTick() {
	      var nextTick = process.nextTick;
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // setImmediate should be used instead instead
	      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	        nextTick = setImmediate;
	      }
	      return function() {
	        nextTick(lib$rsvp$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$rsvp$asap$$useVertxTimer() {
	      return function() {
	        lib$rsvp$asap$$vertxNext(lib$rsvp$asap$$flush);
	      };
	    }

	    function lib$rsvp$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$rsvp$asap$$BrowserMutationObserver(lib$rsvp$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$rsvp$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$rsvp$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$rsvp$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$rsvp$asap$$flush, 1);
	      };
	    }

	    var lib$rsvp$asap$$queue = new Array(1000);
	    function lib$rsvp$asap$$flush() {
	      for (var i = 0; i < lib$rsvp$asap$$len; i+=2) {
	        var callback = lib$rsvp$asap$$queue[i];
	        var arg = lib$rsvp$asap$$queue[i+1];

	        callback(arg);

	        lib$rsvp$asap$$queue[i] = undefined;
	        lib$rsvp$asap$$queue[i+1] = undefined;
	      }

	      lib$rsvp$asap$$len = 0;
	    }

	    function lib$rsvp$asap$$attemptVertex() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(122);
	        lib$rsvp$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$rsvp$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$rsvp$asap$$useSetTimeout();
	      }
	    }

	    var lib$rsvp$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$rsvp$asap$$isNode) {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useNextTick();
	    } else if (lib$rsvp$asap$$BrowserMutationObserver) {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMutationObserver();
	    } else if (lib$rsvp$asap$$isWorker) {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMessageChannel();
	    } else if (lib$rsvp$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$attemptVertex();
	    } else {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useSetTimeout();
	    }
	    function lib$rsvp$defer$$defer(label) {
	      var deferred = {};

	      deferred['promise'] = new lib$rsvp$promise$$default(function(resolve, reject) {
	        deferred['resolve'] = resolve;
	        deferred['reject'] = reject;
	      }, label);

	      return deferred;
	    }
	    var lib$rsvp$defer$$default = lib$rsvp$defer$$defer;
	    function lib$rsvp$filter$$filter(promises, filterFn, label) {
	      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
	        if (!lib$rsvp$utils$$isFunction(filterFn)) {
	          throw new TypeError("You must pass a function as filter's second argument.");
	        }

	        var length = values.length;
	        var filtered = new Array(length);

	        for (var i = 0; i < length; i++) {
	          filtered[i] = filterFn(values[i]);
	        }

	        return lib$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
	          var results = new Array(length);
	          var newLength = 0;

	          for (var i = 0; i < length; i++) {
	            if (filtered[i]) {
	              results[newLength] = values[i];
	              newLength++;
	            }
	          }

	          results.length = newLength;

	          return results;
	        });
	      });
	    }
	    var lib$rsvp$filter$$default = lib$rsvp$filter$$filter;

	    function lib$rsvp$promise$hash$$PromiseHash(Constructor, object, label) {
	      this._superConstructor(Constructor, object, true, label);
	    }

	    var lib$rsvp$promise$hash$$default = lib$rsvp$promise$hash$$PromiseHash;

	    lib$rsvp$promise$hash$$PromiseHash.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
	    lib$rsvp$promise$hash$$PromiseHash.prototype._superConstructor = lib$rsvp$enumerator$$default;
	    lib$rsvp$promise$hash$$PromiseHash.prototype._init = function() {
	      this._result = {};
	    };

	    lib$rsvp$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
	      return input && typeof input === 'object';
	    };

	    lib$rsvp$promise$hash$$PromiseHash.prototype._validationError = function() {
	      return new Error('Promise.hash must be called with an object');
	    };

	    lib$rsvp$promise$hash$$PromiseHash.prototype._enumerate = function() {
	      var enumerator = this;
	      var promise    = enumerator.promise;
	      var input      = enumerator._input;
	      var results    = [];

	      for (var key in input) {
	        if (promise._state === lib$rsvp$$internal$$PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
	          results.push({
	            position: key,
	            entry: input[key]
	          });
	        }
	      }

	      var length = results.length;
	      enumerator._remaining = length;
	      var result;

	      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
	        result = results[i];
	        enumerator._eachEntry(result.entry, result.position);
	      }
	    };

	    function lib$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
	      this._superConstructor(Constructor, object, false, label);
	    }

	    lib$rsvp$hash$settled$$HashSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$promise$hash$$default.prototype);
	    lib$rsvp$hash$settled$$HashSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
	    lib$rsvp$hash$settled$$HashSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;

	    lib$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
	      return new Error('hashSettled must be called with an object');
	    };

	    function lib$rsvp$hash$settled$$hashSettled(object, label) {
	      return new lib$rsvp$hash$settled$$HashSettled(lib$rsvp$promise$$default, object, label).promise;
	    }
	    var lib$rsvp$hash$settled$$default = lib$rsvp$hash$settled$$hashSettled;
	    function lib$rsvp$hash$$hash(object, label) {
	      return new lib$rsvp$promise$hash$$default(lib$rsvp$promise$$default, object, label).promise;
	    }
	    var lib$rsvp$hash$$default = lib$rsvp$hash$$hash;
	    function lib$rsvp$map$$map(promises, mapFn, label) {
	      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
	        if (!lib$rsvp$utils$$isFunction(mapFn)) {
	          throw new TypeError("You must pass a function as map's second argument.");
	        }

	        var length = values.length;
	        var results = new Array(length);

	        for (var i = 0; i < length; i++) {
	          results[i] = mapFn(values[i]);
	        }

	        return lib$rsvp$promise$$default.all(results, label);
	      });
	    }
	    var lib$rsvp$map$$default = lib$rsvp$map$$map;

	    function lib$rsvp$node$$Result() {
	      this.value = undefined;
	    }

	    var lib$rsvp$node$$ERROR = new lib$rsvp$node$$Result();
	    var lib$rsvp$node$$GET_THEN_ERROR = new lib$rsvp$node$$Result();

	    function lib$rsvp$node$$getThen(obj) {
	      try {
	       return obj.then;
	      } catch(error) {
	        lib$rsvp$node$$ERROR.value= error;
	        return lib$rsvp$node$$ERROR;
	      }
	    }


	    function lib$rsvp$node$$tryApply(f, s, a) {
	      try {
	        f.apply(s, a);
	      } catch(error) {
	        lib$rsvp$node$$ERROR.value = error;
	        return lib$rsvp$node$$ERROR;
	      }
	    }

	    function lib$rsvp$node$$makeObject(_, argumentNames) {
	      var obj = {};
	      var name;
	      var i;
	      var length = _.length;
	      var args = new Array(length);

	      for (var x = 0; x < length; x++) {
	        args[x] = _[x];
	      }

	      for (i = 0; i < argumentNames.length; i++) {
	        name = argumentNames[i];
	        obj[name] = args[i + 1];
	      }

	      return obj;
	    }

	    function lib$rsvp$node$$arrayResult(_) {
	      var length = _.length;
	      var args = new Array(length - 1);

	      for (var i = 1; i < length; i++) {
	        args[i - 1] = _[i];
	      }

	      return args;
	    }

	    function lib$rsvp$node$$wrapThenable(then, promise) {
	      return {
	        then: function(onFulFillment, onRejection) {
	          return then.call(promise, onFulFillment, onRejection);
	        }
	      };
	    }

	    function lib$rsvp$node$$denodeify(nodeFunc, options) {
	      var fn = function() {
	        var self = this;
	        var l = arguments.length;
	        var args = new Array(l + 1);
	        var arg;
	        var promiseInput = false;

	        for (var i = 0; i < l; ++i) {
	          arg = arguments[i];

	          if (!promiseInput) {
	            // TODO: clean this up
	            promiseInput = lib$rsvp$node$$needsPromiseInput(arg);
	            if (promiseInput === lib$rsvp$node$$GET_THEN_ERROR) {
	              var p = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
	              lib$rsvp$$internal$$reject(p, lib$rsvp$node$$GET_THEN_ERROR.value);
	              return p;
	            } else if (promiseInput && promiseInput !== true) {
	              arg = lib$rsvp$node$$wrapThenable(promiseInput, arg);
	            }
	          }
	          args[i] = arg;
	        }

	        var promise = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);

	        args[l] = function(err, val) {
	          if (err)
	            lib$rsvp$$internal$$reject(promise, err);
	          else if (options === undefined)
	            lib$rsvp$$internal$$resolve(promise, val);
	          else if (options === true)
	            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$arrayResult(arguments));
	          else if (lib$rsvp$utils$$isArray(options))
	            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$makeObject(arguments, options));
	          else
	            lib$rsvp$$internal$$resolve(promise, val);
	        };

	        if (promiseInput) {
	          return lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
	        } else {
	          return lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
	        }
	      };

	      fn.__proto__ = nodeFunc;

	      return fn;
	    }

	    var lib$rsvp$node$$default = lib$rsvp$node$$denodeify;

	    function lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
	      var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
	      if (result === lib$rsvp$node$$ERROR) {
	        lib$rsvp$$internal$$reject(promise, result.value);
	      }
	      return promise;
	    }

	    function lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self){
	      return lib$rsvp$promise$$default.all(args).then(function(args){
	        var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
	        if (result === lib$rsvp$node$$ERROR) {
	          lib$rsvp$$internal$$reject(promise, result.value);
	        }
	        return promise;
	      });
	    }

	    function lib$rsvp$node$$needsPromiseInput(arg) {
	      if (arg && typeof arg === 'object') {
	        if (arg.constructor === lib$rsvp$promise$$default) {
	          return true;
	        } else {
	          return lib$rsvp$node$$getThen(arg);
	        }
	      } else {
	        return false;
	      }
	    }
	    var lib$rsvp$platform$$platform;

	    /* global self */
	    if (typeof self === 'object') {
	      lib$rsvp$platform$$platform = self;

	    /* global global */
	    } else if (typeof global === 'object') {
	      lib$rsvp$platform$$platform = global;
	    } else {
	      throw new Error('no global: `self` or `global` found');
	    }

	    var lib$rsvp$platform$$default = lib$rsvp$platform$$platform;
	    function lib$rsvp$race$$race(array, label) {
	      return lib$rsvp$promise$$default.race(array, label);
	    }
	    var lib$rsvp$race$$default = lib$rsvp$race$$race;
	    function lib$rsvp$reject$$reject(reason, label) {
	      return lib$rsvp$promise$$default.reject(reason, label);
	    }
	    var lib$rsvp$reject$$default = lib$rsvp$reject$$reject;
	    function lib$rsvp$resolve$$resolve(value, label) {
	      return lib$rsvp$promise$$default.resolve(value, label);
	    }
	    var lib$rsvp$resolve$$default = lib$rsvp$resolve$$resolve;
	    function lib$rsvp$rethrow$$rethrow(reason) {
	      setTimeout(function() {
	        throw reason;
	      });
	      throw reason;
	    }
	    var lib$rsvp$rethrow$$default = lib$rsvp$rethrow$$rethrow;

	    // defaults
	    lib$rsvp$config$$config.async = lib$rsvp$asap$$default;
	    lib$rsvp$config$$config.after = function(cb) {
	      setTimeout(cb, 0);
	    };
	    var lib$rsvp$$cast = lib$rsvp$resolve$$default;
	    function lib$rsvp$$async(callback, arg) {
	      lib$rsvp$config$$config.async(callback, arg);
	    }

	    function lib$rsvp$$on() {
	      lib$rsvp$config$$config['on'].apply(lib$rsvp$config$$config, arguments);
	    }

	    function lib$rsvp$$off() {
	      lib$rsvp$config$$config['off'].apply(lib$rsvp$config$$config, arguments);
	    }

	    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
	    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
	      var lib$rsvp$$callbacks = window['__PROMISE_INSTRUMENTATION__'];
	      lib$rsvp$config$$configure('instrument', true);
	      for (var lib$rsvp$$eventName in lib$rsvp$$callbacks) {
	        if (lib$rsvp$$callbacks.hasOwnProperty(lib$rsvp$$eventName)) {
	          lib$rsvp$$on(lib$rsvp$$eventName, lib$rsvp$$callbacks[lib$rsvp$$eventName]);
	        }
	      }
	    }

	    var lib$rsvp$umd$$RSVP = {
	      'race': lib$rsvp$race$$default,
	      'Promise': lib$rsvp$promise$$default,
	      'allSettled': lib$rsvp$all$settled$$default,
	      'hash': lib$rsvp$hash$$default,
	      'hashSettled': lib$rsvp$hash$settled$$default,
	      'denodeify': lib$rsvp$node$$default,
	      'on': lib$rsvp$$on,
	      'off': lib$rsvp$$off,
	      'map': lib$rsvp$map$$default,
	      'filter': lib$rsvp$filter$$default,
	      'resolve': lib$rsvp$resolve$$default,
	      'reject': lib$rsvp$reject$$default,
	      'all': lib$rsvp$all$$default,
	      'rethrow': lib$rsvp$rethrow$$default,
	      'defer': lib$rsvp$defer$$default,
	      'EventTarget': lib$rsvp$events$$default,
	      'configure': lib$rsvp$config$$configure,
	      'async': lib$rsvp$$async
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(123)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$rsvp$umd$$RSVP; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$rsvp$umd$$RSVP;
	    } else if (typeof lib$rsvp$platform$$default !== 'undefined') {
	      lib$rsvp$platform$$default['RSVP'] = lib$rsvp$umd$$RSVP;
	    }
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5).setImmediate, (function() { return this; }()), __webpack_require__(121)(module)))

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 122 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  if (!(value instanceof Date)) {
	    value = new Date(value);
	  }
	  return value.getFullYear() + (("0" + (value.getMonth() + 1)).slice(-2)) + (("0" + (value.getDate())).slice(-2));
	};


/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  if (!(value instanceof Array)) {
	    if (value != null) {
	      return [value];
	    } else {
	      return [];
	    }
	  } else {
	    return value;
	  }
	};


/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = {
	  dataApi: '/api/',
	  schemas: {
	    bond: {
	      "static": {
	        ccy: 'String',
	        country: 'String',
	        domestic: 'String',
	        ratingGroup: 'String',
	        name: 'String',
	        sector: 'String',
	        issuer: 'String',
	        market: 'String',
	        fitchDate: 'DateDay',
	        issueDate: 'DateDay',
	        maturityDate: 'DateDay',
	        moodysDate: 'DateDay',
	        spDate: 'DateDay',
	        timestamp: 'Date',
	        isAmortizing: 'Boolean',
	        isConvertible: 'Boolean',
	        isFloater: 'Boolean',
	        isSubordinated: 'Boolean',
	        link139: 'String',
	        linkCbondsIssue: 'String',
	        linkCbondsTS: 'String',
	        amountOutstandingLC: 'Number',
	        conversionTerms: 'Any',
	        fitch: 'Any',
	        floatingRateFormula: 'Any',
	        moodys: 'Any',
	        sp: 'Any'
	      },
	      market: {
	        timestamp: 'Date',
	        lastDateTradeMain: 'DateDay',
	        lastDateTradeRPS: 'DateDay',
	        daysSinceLastDateTradeMain: 'Number',
	        daysSinceLastDateTradeRPS: 'Number',
	        isLiquid: 'Boolean',
	        lastPriceMain: 'Number',
	        lastPriceRPS: 'Number'
	      },
	      daily: {
	        date: 'DateDay',
	        duration: 'Number',
	        price: 'Number',
	        "yield": 'Percent',
	        rollDown: 'Number',
	        coupon: 'Number',
	        haircutWeek: 'Percent',
	        haircut: 'Percent',
	        haircutMonth: 'Percent',
	        haircutYear: 'Percent',
	        ask: 'Number',
	        askYield: 'Percent',
	        bid: 'Number',
	        bidAskPriceSpread: 'Number',
	        bidAskYieldSpread: 'Number',
	        bidYield: 'Percent',
	        totalAskSize: 'Number',
	        totalBidSize: 'Number',
	        principal: 'Number',
	        turnoverUSD: 'Number',
	        priceType: 'String',
	        quoteType: 'String',
	        accruedCoupon: 'Number',
	        spreadToBMK: 'Number',
	        fairPrice: 'Number',
	        daysSinceLastCoupon: 'Number',
	        liquidity: 'String',
	        spreadToUST: 'Number',
	        turnoverLcy: 'Number'
	      }
	    },
	    portfolio: {
	      quantity: {
	        isin: 'String',
	        quantity: 'Number'
	      },
	      "static": {
	        type: 'String',
	        yieldInitial: 'Percent',
	        repoRate: 'Percent',
	        depositsRate: 'Number',
	        schedule2014q4: 'Number',
	        schedule2015q1: 'Number',
	        schedule2015q2: 'Number',
	        schedule2015q3: 'Number',
	        schedule2015q4: 'Number',
	        schedule2016q1: 'Number',
	        schedule2016q2: 'Number',
	        schedule2016q3: 'Number',
	        schedule2016q4: 'Number',
	        schedule2017: 'Number'
	      },
	      values: {
	        assetValueLcy: 'Number',
	        assetValueCcy: 'Number'
	      },
	      info: {
	        type: 'String',
	        yieldInitial: 'Percent',
	        repoRate: 'Percent',
	        depositsRate: 'Number',
	        schedule2014q4: 'Number',
	        schedule2015q1: 'Number',
	        schedule2015q2: 'Number',
	        schedule2015q3: 'Number',
	        schedule2015q4: 'Number',
	        schedule2016q1: 'Number',
	        schedule2016q2: 'Number',
	        schedule2016q3: 'Number',
	        schedule2016q4: 'Number',
	        schedule2017: 'Number',
	        currentInvestmentsEUR: 'Number',
	        currentInvestmentsRUB: 'Number',
	        currentInvestmentsUSD: 'Number',
	        currentInvestmentsEquivalent: 'Number',
	        lastPrice: 'Number',
	        priceRevaluation: 'Number',
	        profit: 'Number',
	        profitWithoutHedge: 'Number',
	        sharePct: 'Number',
	        swapIncome: 'Number',
	        swapRevaluationSecondLeg: 'Number',
	        totalProfit: 'Number',
	        valuationError: 'Number',
	        incomeRevaluation: 'Number'
	      },
	      limits: {
	        ccy: 'String',
	        decisionEndDate: 'DateDay',
	        decisionStartDate: 'DateDay',
	        group: 'String',
	        groupLimitCcy: 'Number',
	        groupLimitLcy: 'Number',
	        issuer: 'String',
	        issuerLimitCcy: 'Number',
	        issuerLimitLcy: 'Number',
	        purpose: 'String'
	      },
	      daily: {
	        date: 'DateDay',
	        marketRisk: 'Percent',
	        creditRisk: 'Percent',
	        minimumRiskType: 'String',
	        equityInvest: 'Percent',
	        equityTrade: 'Percent',
	        equityPart: 'Percent',
	        repoPart: 'Percent',
	        depositsPart: 'Percent',
	        fundingCost: 'Percent',
	        roe: 'Percent',
	        askRoe: 'Percent',
	        bidRoe: 'Percent',
	        tr: 'Percent',
	        roeFromTr: 'Percent',
	        mtr: 'Number',
	        mtrFromTr: 'Number',
	        specialIr: 'Percent',
	        minRisk: 'Number',
	        usedRisk: 'String',
	        minRiskType: 'String'
	      }
	    }
	  }
	};


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var AnyCaster, BooleanCaster, DateCaster, NumberCaster, PercentCaster, StringCaster;

	AnyCaster = __webpack_require__(128);

	BooleanCaster = __webpack_require__(129);

	DateCaster = __webpack_require__(130);

	NumberCaster = __webpack_require__(131);

	PercentCaster = __webpack_require__(132);

	StringCaster = __webpack_require__(133);

	module.exports = function(value, schema) {
	  var prop, ref, result, rule;
	  value || (value = {});
	  result = {};
	  ref = schema || {};
	  for (prop in ref) {
	    rule = ref[prop];
	    switch (true) {
	      case /(\?|Any)/.test(rule):
	        result[prop] = AnyCaster(value[prop]);
	        break;
	      case /Boolean/i.test(rule):
	        result[prop] = BooleanCaster(value[prop]);
	        break;
	      case /Date/i.test(rule):
	        result[prop] = DateCaster(value[prop]);
	        break;
	      case /Number/i.test(rule):
	        result[prop] = NumberCaster(value[prop]);
	        break;
	      case /Percent/i.test(rule):
	        result[prop] = PercentCaster(value[prop]);
	        break;
	      case /String/i.test(rule):
	        result[prop] = StringCaster(value[prop]);
	    }
	  }
	  return result;
	};


/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  if (value === '-' || value === null || value === (void 0)) {
	    return null;
	  }
	  return value;
	};


/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  if (value === '-' || value === null || value === (void 0)) {
	    return null;
	  }
	  if (typeof value === 'string' && (String(value)).toLowerCase() === 'false') {
	    return false;
	  }
	  return Boolean(value);
	};


/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  var match;
	  if (value === '' || value === '-' || value === null || value === (void 0)) {
	    return null;
	  }
	  if (typeof value === 'string' && (match = /^(\d{4})(\d{2})(\d{2})$/.exec(value))) {
	    value = new Date(parseInt(match[1]), (parseInt(match[2])) - 1, parseInt(match[3]));
	  } else {
	    value = new Date(value);
	  }
	  if ((String(value)) === 'Invalid Date') {
	    return null;
	  }
	  return value;
	};


/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  var num;
	  if (value === '' || value === '-' || value === null || value === (void 0)) {
	    return null;
	  }
	  num = Number(value);
	  if (isNaN(num)) {
	    return null;
	  }
	  return num;
	};


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var NumberCaster;

	NumberCaster = __webpack_require__(131);

	module.exports = function(value) {
	  value = NumberCaster(value);
	  if (value != null) {
	    value *= 100;
	  }
	  return value;
	};


/***/ },
/* 133 */
/***/ function(module, exports) {

	module.exports = function(value) {
	  if (value === '-' || value === null || value === (void 0)) {
	    return null;
	  }
	  return String(value);
	};


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var CollectionFormatter, DateFormatter, ObjectCaster, PortfolioSource, Promise, SourceAbstract, config, path,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	SourceAbstract = __webpack_require__(116);

	DateFormatter = __webpack_require__(124);

	CollectionFormatter = __webpack_require__(125);

	Promise = (__webpack_require__(120)).Promise;

	path = __webpack_require__(117);

	config = __webpack_require__(126);

	ObjectCaster = __webpack_require__(127);

	module.exports = PortfolioSource = (function(superClass) {
	  extend(PortfolioSource, superClass);

	  function PortfolioSource() {
	    PortfolioSource.__super__.constructor.call(this, path.join(config.dataApi, 'portfolio'));
	  }

	  PortfolioSource.prototype.getQuantity = function(id, date, isins) {
	    var i, isin, len, map;
	    date = DateFormatter(date);
	    isins = CollectionFormatter(isins);
	    map = {};
	    for (i = 0, len = isins.length; i < len; i++) {
	      isin = isins[i];
	      map[isin] = true;
	    }
	    return this._get(':id/bonds/:date', {
	      id: id,
	      date: date
	    }).then(function(data) {
	      var item, j, len1, preformed, result;
	      result = [];
	      preformed = {};
	      for (j = 0, len1 = data.length; j < len1; j++) {
	        item = data[j];
	        if (!((item != null ? item.isin : void 0) && map[item.isin] === true)) {
	          continue;
	        }
	        preformed[item.isin] = true;
	        result.push(ObjectCaster(item, config.schemas.portfolio.quantity));
	      }
	      for (isin in map) {
	        if (!(!preformed.hasOwnProperty(isin))) {
	          continue;
	        }
	        item = {
	          isin: isin,
	          quantity: 0
	        };
	        result.push(ObjectCaster(item, config.schemas.portfolio.quantity));
	      }
	      return result;
	    });
	  };

	  PortfolioSource.prototype.getStatic = function(id, isins) {
	    isins = CollectionFormatter(isins);
	    return Promise.all(isins.map((function(_this) {
	      return function(isin) {
	        return _this._get(':id/bond/:isin/info', {
	          id: id,
	          isin: isin
	        });
	      };
	    })(this))).then(function(data) {
	      var i, item, len, result;
	      result = [];
	      for (i = 0, len = data.length; i < len; i++) {
	        item = data[i];
	        if (item.data) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.portfolio["static"])
	          });
	        }
	      }
	      return result;
	    });
	  };

	  PortfolioSource.prototype.getValues = function(id, isins) {
	    var i, isin, len, map;
	    isins = CollectionFormatter(isins);
	    map = {};
	    for (i = 0, len = isins.length; i < len; i++) {
	      isin = isins[i];
	      map[isin] = true;
	    }
	    return this._get(':id/value/current', {
	      id: id
	    }).then(function(data) {
	      var item, j, len1, result;
	      result = [];
	      for (j = 0, len1 = data.length; j < len1; j++) {
	        item = data[j];
	        if ((item != null ? item.isin : void 0) && map[item.isin] === true) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item, config.schemas.portfolio.values)
	          });
	        }
	      }
	      return result;
	    });
	  };

	  PortfolioSource.prototype.getInfo = function(id, date, isins) {
	    var i, isin, len, map;
	    date = DateFormatter(date);
	    isins = CollectionFormatter(isins);
	    map = {};
	    for (i = 0, len = isins.length; i < len; i++) {
	      isin = isins[i];
	      map[isin] = true;
	    }
	    return this._get(':id/bonds/:date/info', {
	      id: id,
	      date: date
	    }).then(function(data) {
	      var item, j, len1, result;
	      result = [];
	      for (j = 0, len1 = data.length; j < len1; j++) {
	        item = data[j];
	        if ((item != null ? item.isin : void 0) && (item != null ? item.data : void 0) && map[item.isin] === true) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.portfolio.info)
	          });
	        }
	      }
	      return result;
	    });
	  };

	  PortfolioSource.prototype.getLimits = function(id, date, isins) {
	    var i, isin, len, map;
	    date = DateFormatter(date);
	    isins = CollectionFormatter(isins);
	    map = {};
	    for (i = 0, len = isins.length; i < len; i++) {
	      isin = isins[i];
	      map[isin] = true;
	    }
	    return this._get(':id/bonds/:date/limit', {
	      id: id,
	      date: date
	    }).then(function(data) {
	      var item, j, len1, result;
	      result = [];
	      for (j = 0, len1 = data.length; j < len1; j++) {
	        item = data[j];
	        if ((item != null ? item.isin : void 0) && (item != null ? item.data : void 0) && map[item.isin] === true) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.portfolio.limits)
	          });
	        }
	      }
	      return result;
	    });
	  };

	  PortfolioSource.prototype.getDaily = function(id, date, isins) {
	    var i, isin, len, map;
	    date = DateFormatter(date);
	    isins = CollectionFormatter(isins);
	    map = {};
	    for (i = 0, len = isins.length; i < len; i++) {
	      isin = isins[i];
	      map[isin] = true;
	    }
	    return this._post(':id/daily/:date', isins, {
	      id: id,
	      date: date
	    }).then(function(data) {
	      var item, j, len1, result;
	      result = [];
	      for (j = 0, len1 = data.length; j < len1; j++) {
	        item = data[j];
	        if ((item != null ? item.isin : void 0) && (item != null ? item.data : void 0) && map[item.isin] === true) {
	          result.push({
	            isin: item.isin,
	            data: ObjectCaster(item.data, config.schemas.portfolio.daily)
	          });
	        }
	      }
	      return result;
	    });
	  };

	  return PortfolioSource;

	})(SourceAbstract);


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var Entity, lodash;

	lodash = __webpack_require__(11);

	module.exports = Entity = (function() {
	  function Entity(value) {
	    this.assign(value);
	  }

	  Entity.prototype.assign = function(value) {
	    return lodash.assign(this, value || {});
	  };

	  return Entity;

	})();


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var EntityCollection, lodash,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;

	lodash = __webpack_require__(11);

	module.exports = EntityCollection = (function(superClass) {
	  extend(EntityCollection, superClass);

	  function EntityCollection(value) {
	    this.reset(value);
	  }

	  EntityCollection.prototype.assign = function(value) {
	    return lodash.assign(this, value || {});
	  };

	  EntityCollection.prototype.reset = function(value) {
	    if (!(value instanceof Array)) {
	      value = value != null ? [value] : [];
	    }
	    return this.splice.apply(this, [0, this.length].concat(slice.call(value)));
	  };

	  EntityCollection.prototype.indexBy = function(prop) {
	    var i, j, key, len, len1, ref, ref1, results, value;
	    ref = this._index || [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      key = ref[i];
	      delete this[key];
	    }
	    this._index = [];
	    ref1 = this;
	    results = [];
	    for (j = 0, len1 = ref1.length; j < len1; j++) {
	      value = ref1[j];
	      if (!(value != null)) {
	        continue;
	      }
	      key = value[prop];
	      this._index.push(String(key));
	      results.push(this[key] = value);
	    }
	    return results;
	  };

	  EntityCollection.prototype.addToIndex = function(value, prop) {
	    var key;
	    if (value) {
	      key = value[prop];
	      (this._index || (this._index = [])).push(String(key));
	      return this[key] = value;
	    }
	  };

	  EntityCollection.prototype.sortBy = function(prop) {
	    return this.sort(function(left, right) {
	      if ((left != null ? left[prop] : void 0) > (right != null ? right[prop] : void 0)) {
	        return 1;
	      }
	      if ((left != null ? left[prop] : void 0) < (right != null ? right[prop] : void 0)) {
	        return -1;
	      }
	      return 0;
	    });
	  };

	  return EntityCollection;

	})(Array);


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var BondDotAlone, Chart, React;

	React = __webpack_require__(1);

	Chart = __webpack_require__(8);

	BondDotAlone = __webpack_require__(138);

	module.exports = function() {
	  var bond, i;
	  return React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
	    "rowSpan": 2
	  }, React.createElement("div", null, (function() {
	    var j, len, ref, results;
	    ref = this.bondsAloneList;
	    results = [];
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      bond = ref[i];
	      results.push(React.createElement(BondDotAlone, {
	        "key": i,
	        "bond": bond
	      }));
	    }
	    return results;
	  }).call(this)), React.createElement("table", {
	    "className": "settings"
	  }, React.createElement("tbody", null, React.createElement("tr", {
	    "className": "date"
	  }, React.createElement("td", null, "date"), React.createElement("td", null, React.createElement("input", {
	    "defaultValue": this.settings.date,
	    "onChange": this.dateChangeHandler
	  }))), React.createElement("tr", {
	    "className": "portfolio"
	  }, React.createElement("td", null, "portfolio"), React.createElement("td", null, React.createElement("input", {
	    "defaultValue": this.settings.portfolio,
	    "onChange": this.portfolioChangeHandler
	  }))), React.createElement("tr", {
	    "className": "bonds"
	  }, React.createElement("td", null, "bonds"), React.createElement("td", null, React.createElement("textarea", {
	    "defaultValue": this.settings.bonds,
	    "onChange": this.bondsChangeHandler
	  }))), React.createElement("tr", {
	    "className": "y"
	  }, React.createElement("td", null, "Y"), React.createElement("td", null, React.createElement("select", {
	    "defaultValue": this.settings.y,
	    "onChange": this.yChangeHandler
	  }, React.createElement("option", {
	    "value": "price"
	  }, "Price"), React.createElement("option", {
	    "value": "yield"
	  }, "Yield"), React.createElement("option", {
	    "value": "roe"
	  }, "ROE")))), React.createElement("tr", {
	    "className": "x"
	  }, React.createElement("td", null, "X"), React.createElement("td", null, React.createElement("select", {
	    "defaultValue": this.settings.x,
	    "onChange": this.xChangeHandler
	  }, React.createElement("option", {
	    "value": "duration"
	  }, "Duration"), React.createElement("option", {
	    "value": "mtr"
	  }, "Month To Recovery")))), React.createElement("tr", {
	    "className": "apply"
	  }, React.createElement("td", {
	    "colSpan": "2"
	  }, React.createElement("button", {
	    "onClick": this.applyClickHandler
	  }, "Apply"))), React.createElement("tr", {
	    "className": "zoom"
	  }, React.createElement("td", null, "zoom"), React.createElement("td", null, React.createElement("button", {
	    "onClick": this.resetZoomHandler
	  }, "Reset"), React.createElement("button", {
	    "onClick": this.zoomInHandler
	  }, "+"), React.createElement("button", {
	    "onClick": this.zoomOutHandler
	  }, "−")))))), React.createElement("td", {
	    "className": "chart"
	  }, React.createElement(Chart, {
	    "document": this.chartDocument
	  }))), React.createElement("tr", null, React.createElement("td", {
	    "className": "chart"
	  }, React.createElement(Chart, {
	    "document": this.tsDocument
	  })))));
	};


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var BondDotAlone, GenerateDotBox, GenerateDotSymbol, GenerateDotTypeIconData, LiquidityRadius, RatingColor, React, ReactDOM;

	React = __webpack_require__(1);

	ReactDOM = __webpack_require__(2);

	LiquidityRadius = __webpack_require__(37);

	GenerateDotSymbol = __webpack_require__(38);

	RatingColor = __webpack_require__(39);

	GenerateDotBox = __webpack_require__(40);

	GenerateDotTypeIconData = __webpack_require__(41);

	BondDotAlone = React.createClass({
	  propTypes: {
	    className: React.PropTypes.string,
	    bond: React.PropTypes.object.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      className: ''
	    };
	  },
	  componentWillMount: function() {
	    var backgroundColor, bond, color, dotBox, dotTransform, getRadius, icon, isInPortfolio, isin, path, svgStyle, symbolRadius;
	    bond = this.props.bond;
	    isInPortfolio = bond.isInPortfolio;
	    getRadius = this.props.getRadius;
	    isin = bond.isin;
	    backgroundColor = '#FFF';
	    color = RatingColor(bond.ratingGroup);
	    icon = GenerateDotTypeIconData({
	      bond: bond,
	      isInPortfolio: isInPortfolio
	    });
	    icon.style = {
	      textAnchor: 'middle',
	      dominantBaseline: 'middle'
	    };
	    symbolRadius = getRadius ? getRadius(bond) : LiquidityRadius(bond['liquidity']);
	    path = GenerateDotSymbol({
	      symbolRadius: symbolRadius,
	      isInPortfolio: isInPortfolio
	    });
	    dotBox = GenerateDotBox(0, 0, symbolRadius);
	    svgStyle = {
	      width: dotBox.width,
	      height: dotBox.height
	    };
	    dotTransform = "translate(" + dotBox.bottom + ", " + dotBox.right + ")";
	    return this.setState({
	      isin: isin,
	      path: path,
	      color: color,
	      backgroundColor: backgroundColor,
	      icon: icon,
	      svgStyle: svgStyle,
	      dotTransform: dotTransform
	    });
	  },
	  render: __webpack_require__(139)
	});

	module.exports = BondDotAlone;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var React;

	React = __webpack_require__(1);

	module.exports = function() {
	  var P, S;
	  P = this.props;
	  S = this.state;
	  return React.createElement("svg", {
	    "style": S.svgStyle,
	    "className": P.className
	  }, React.createElement("g", {
	    "className": "dot",
	    "data-isin": S.isin
	  }, React.createElement("g", {
	    "className": "dot-in-sight"
	  }, React.createElement("g", {
	    "transform": S.dotTransform
	  }, React.createElement("path", {
	    "d": S.path,
	    "fill": S.color,
	    "strokeWidth": 1,
	    "stroke": S.backgroundColor
	  }), React.createElement("text", {
	    "className": "bond-type-icon",
	    "style": S.icon.style,
	    "fill": S.backgroundColor,
	    "dy": S.icon.dy,
	    "fontSize": S.icon.fontSize
	  }, S.icon.symbol)))));
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var $, Popup, React, _;

	_ = __webpack_require__(11);

	$ = __webpack_require__(141);

	React = __webpack_require__(1);

	Popup = React.createClass({
	  propTypes: {
	    node: React.PropTypes.instanceOf(Node),
	    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
	    isSmooth: React.PropTypes.bool,
	    offset: React.PropTypes.string,
	    position: React.PropTypes.string.isRequired,
	    constraints: React.PropTypes.any,
	    width: React.PropTypes.number,
	    hight: React.PropTypes.number,
	    isOpen: React.PropTypes.bool,
	    alignVertical: React.PropTypes.bool,
	    onRequestClose: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      width: 0,
	      hight: 0,
	      isOpen: false,
	      isSmooth: false,
	      offset: '0 0',
	      position: 'bottom left',
	      alignVertical: true,
	      viewportOffset: [30, 30],
	      arrowPosition: '50%',
	      constraints: [
	        {
	          to: 'window',
	          attachment: 'together',
	          pin: true
	        }
	      ],
	      arrowSize: [12, 6],
	      onRequestClose: function() {}
	    };
	  },
	  getInitialState: function() {
	    return {
	      attachment: '',
	      targetAttachment: '',
	      targetOffset: this.props.offset,
	      maxWidth: 0,
	      maxHeight: 0,
	      isShow: false,
	      arrow: {
	        top: 0,
	        left: 0
	      }
	    };
	  },
	  componentWillUnmount: function() {
	    return this.closePopup();
	  },
	  componentWillMount: function() {
	    return this.update(this.props);
	  },
	  componentWillReceiveProps: function(nextProps) {
	    return this.update(nextProps);
	  },
	  update: function(props) {
	    if (props.isOpen && this.state.isShow) {
	      return;
	    }
	    if (!props.isOpen && !this.state.isShow) {
	      return;
	    }
	    if (!props.isOpen && this.state.isShow) {
	      return this.closePopup();
	    }
	  },
	  openPopup: function(targetSize) {
	    var arrow, attachment, elementBounds, maxHeight, maxWidth, targetAttachment, viewport;
	    viewport = {
	      width: $(window).width(),
	      height: $(window).height()
	    };
	    elementBounds = this.getElementBounds(this.props.node);
	    targetAttachment = this.getAttachment(viewport, elementBounds, targetSize);
	    attachment = this.getElementAttachment(targetAttachment);
	    maxWidth = this.getTargetMaxWidth(viewport, targetAttachment, elementBounds, targetSize);
	    maxHeight = this.getTargetMaxHeight(viewport, targetAttachment, elementBounds, targetSize);
	    arrow = this.getArrow(targetAttachment, targetSize, elementBounds);
	    return this.setState({
	      attachment: attachment,
	      targetAttachment: targetAttachment,
	      maxWidth: maxWidth,
	      maxHeight: maxHeight,
	      arrow: arrow,
	      isShow: true
	    });
	  },
	  getAttachment: function(viewport, elementBounds, targetSize) {
	    if (this.props.alignVertical) {
	      if (this.props.position.indexOf('left') >= 0 && elementBounds.left >= targetSize.width && viewport.width - elementBounds.right < targetSize.width) {
	        return this.props.position.replace('left', 'right');
	      }
	      if (this.props.position.indexOf('right') >= 0 && elementBounds.left < targetSize.width && viewport.width - elementBounds.right >= targetSize.width) {
	        return this.props.position.replace('right', 'left');
	      }
	    }
	    return this.props.position;
	  },
	  getTargetMaxHeight: function(viewport, targetAttachment, elementBounds, targetSize) {
	    if (targetAttachment.indexOf('top') >= 0) {
	      return elementBounds.top - this.props.viewportOffset[1];
	    }
	    if (targetAttachment.indexOf('bottom') >= 0) {
	      return viewport.height - this.props.viewportOffset[1] - elementBounds.bottom;
	    }
	    return viewport.height - this.props.viewportOffset[1];
	  },
	  getTargetMaxWidth: function(viewport, targetAttachment, elementBounds, targetSize) {
	    if (targetAttachment.indexOf('left') >= 0) {
	      return viewport.width - this.props.viewportOffset[0] - elementBounds.left;
	    }
	    if (targetAttachment.indexOf('right') >= 0) {
	      return elementBounds.right - this.props.viewportOffset[1];
	    }
	    return viewport.width - this.props.viewportOffset[1];
	  },
	  getElementBounds: function(node) {
	    var bounds, scrollLeft, scrollTop;
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	    bounds = node.getBoundingClientRect();
	    bounds.top += scrollTop;
	    bounds.bottom += scrollTop;
	    bounds.left += scrollLeft;
	    bounds.right += scrollLeft;
	    return bounds;
	  },
	  getArrow: function(targetAttachment, targetSize, elementBounds) {
	    var left, top;
	    left = top = 0;
	    if (this.props.isSmooth) {
	      return {
	        top: top,
	        left: left
	      };
	    }
	    if (targetAttachment.indexOf('bottom') >= 0) {
	      top = 0;
	    }
	    if (targetAttachment.indexOf('top') >= 0) {
	      top = targetSize.height - this.props.arrowSize[1];
	    }
	    if (targetAttachment.indexOf('left') >= 0) {
	      left = Math.floor(this.getArrowOffset(elementBounds.width) - (this.props.arrowSize[0] / 2));
	    }
	    if (targetAttachment.indexOf('center') >= 0) {
	      left = Math.floor((targetSize.width / 2) - (this.props.arrowSize[0] / 2));
	    }
	    if (targetAttachment.indexOf('right') >= 0) {
	      left = Math.floor(targetSize.width - elementBounds.width + this.getArrowOffset(elementBounds.width) - (this.props.arrowSize[0] / 2));
	    }
	    return {
	      top: top,
	      left: left
	    };
	    if (type) {
	      this.arrowNode = document.createElement('div');
	      this.arrowNode.className = this.getArrowClass(targetAttachment);
	      this.arrowNode.style.top = top + "px";
	      this.arrowNode.style.left = left + "px";
	      return document.body.appendChild(this.arrowNode);
	    }
	  },
	  getArrowOffset: function(width) {
	    var pos;
	    pos = this.props.arrowPosition;
	    if (pos.substr(-1) === '%') {
	      return width * (parseInt(pos.substr(0, pos.length - 1)) / 100);
	    }
	    if (pos[0] === '-') {
	      return width - parseInt(pos.substr(1));
	    }
	    return parseInt(pos);
	  },
	  closePopup: function() {
	    this.setState({
	      isShow: false
	    });
	    return this.stopCatchingClicks(this.targetNode);
	  },
	  onTargetRender: function(node) {
	    this.targetNode = node;
	    return this.startCatchingClicks(this.targetNode, this.props.onRequestClose);
	  },
	  startCatchingClicks: function(node, callback) {
	    var key, skip;
	    if (!node) {
	      return;
	    }
	    if (!node.getAttribute('data-clickcatchkey')) {
	      node.setAttribute('data-clickcatchkey', _.uniqueId('clickcatchkey'));
	    }
	    key = node.getAttribute('data-clickcatchkey');
	    skip = false;
	    $(node).on("click." + key, function(e) {
	      skip = true;
	      return true;
	    });
	    return $(document).on("click." + key, function(e) {
	      if (!skip) {
	        callback();
	      }
	      skip = false;
	      return true;
	    });
	  },
	  stopCatchingClicks: function(node) {
	    var key;
	    if (!node) {
	      return;
	    }
	    key = node.getAttribute('data-clickcatchkey');
	    $(node).off("click." + key);
	    return $(document).off("click." + key);
	  },
	  getElementAttachment: function(targetAttachment) {
	    if (this.props.alignVertical) {
	      return {
	        'top left': 'bottom left',
	        'top center': 'bottom center',
	        'top right': 'bottom right',
	        'middle left': 'middle right',
	        'middle center': 'middle center',
	        'middle right': 'middle left',
	        'bottom left': 'top left',
	        'bottom center': 'top center',
	        'bottom right': 'top right'
	      }[targetAttachment];
	    }
	    return {
	      'top left': 'top right',
	      'top center': 'top center',
	      'top right': 'top left',
	      'middle left': 'middle right',
	      'middle center': 'middle center',
	      'middle right': 'middle left',
	      'bottom left': 'bottom right',
	      'bottom center': 'bottom center',
	      'bottom right': 'bottom left'
	    }[targetAttachment];
	  },
	  renderMarginTop: function() {
	    if (this.props.isSmooth) {
	      return 0;
	    }
	    return this.props.arrowSize[1];
	  },
	  renderMarginBottom: function() {
	    if (this.props.isSmooth) {
	      return 0;
	    }
	    return this.props.arrowSize[1];
	  },
	  renderArrowClass: function() {
	    if (this.state.targetAttachment.indexOf('top') >= 0) {
	      return 'popup--arrow-bottom';
	    }
	    if (this.state.targetAttachment.indexOf('bottom') >= 0) {
	      return 'popup--arrow-top';
	    }
	    return 'popup--arrow';
	  },
	  render: __webpack_require__(142)
	});

	module.exports = Popup;


/***/ },
/* 141 */
/***/ function(module, exports) {

	/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */

	var Zepto = (function() {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,

	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }

	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }

	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }

	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }

	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }

	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }

	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }

	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'

	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }

	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }

	    return dom
	  }

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function(dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }

	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	      slice.call(
	        isSimple && !maybeID ?
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }

	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className,
	        svg   = klass && klass.baseVal !== undefined

	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    var num
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }

	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject

	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }

	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }

	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }

	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }

	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }

	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }

	    return elements
	  }

	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }

	  if (window.JSON) $.parseJSON = JSON.parse

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },

	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = []
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1

	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this[0].textContent : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)

	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }

	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var element = this[0], computedStyle = getComputedStyle(element, '')
	        if(!element) return
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(isArray(property) ? property: [property], function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }

	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }

	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return

	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })

	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append

	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this

	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null

	        var parentInDocument = $.contains(document.documentElement, parent)

	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()

	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })

	  zepto.Z.prototype = $.fn

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto

	  return $
	})()

	module.exports = Zepto

	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }

	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }

	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }

	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }

	  $.event = { add: add, remove: remove }

	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }

	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }

	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }

	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)

	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })

	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }

	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	    return compatible(proxy, event)
	  }

	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }

	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }

	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (isFunction(data) || data === false)
	      callback = data, data = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }

	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }

	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }

	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // items in the collection might not be DOM elements
	      if('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }

	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }

	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return callback ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })

	  ;['focus', 'blur'].forEach(function(name) {
	    $.fn[name] = function(callback) {
	      if (callback) this.bind(name, callback)
	      else this.each(function(){
	        try { this[name]() }
	        catch(e) {}
	      })
	      return this
	    }
	  })

	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }

	})(Zepto)

	;(function($){
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/

	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName)
	    $(context).trigger(event, data)
	    return !event.isDefaultPrevented()
	  }

	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data)
	  }

	  // Number of active Ajax requests
	  $.active = 0

	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	  }
	  function ajaxStop(settings) {
	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	  }

	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context
	    if (settings.beforeSend.call(context, xhr, settings) === false ||
	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
	      return false

	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context, status = 'success'
	    settings.success.call(context, data, status, xhr)
	    if (deferred) deferred.resolveWith(context, [data, status, xhr])
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
	    ajaxComplete(status, xhr, settings)
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context
	    settings.error.call(context, xhr, type, error)
	    if (deferred) deferred.rejectWith(context, [xhr, type, error])
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
	    ajaxComplete(type, xhr, settings)
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context
	    settings.complete.call(context, xhr, status)
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
	    ajaxStop(settings)
	  }

	  // Empty function, used as default callback
	  function empty() {}

	  $.ajaxJSONP = function(options, deferred){
	    if (!('type' in options)) return $.ajax(options)

	    var _callbackName = options.jsonpCallback,
	      callbackName = ($.isFunction(_callbackName) ?
	        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	      script = document.createElement('script'),
	      originalCallback = window[callbackName],
	      responseData,
	      abort = function(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort')
	      },
	      xhr = { abort: abort }, abortTimeout

	    if (deferred) deferred.promise(xhr)

	    $(script).on('load error', function(e, errorType){
	      clearTimeout(abortTimeout)
	      $(script).off().remove()

	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred)
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred)
	      }

	      window[callbackName] = originalCallback
	      if (responseData && $.isFunction(originalCallback))
	        originalCallback(responseData[0])

	      originalCallback = responseData = undefined
	    })

	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort')
	      return xhr
	    }

	    window[callbackName] = function(){
	      responseData = arguments
	    }

	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	    document.head.appendChild(script)

	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
	      abort('timeout')
	    }, options.timeout)

	    return xhr
	  }

	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function () {
	      return new window.XMLHttpRequest()
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json:   jsonType,
	      xml:    'application/xml, text/xml',
	      html:   htmlType,
	      text:   'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  }

	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0]
	    return mime && ( mime == htmlType ? 'html' :
	      mime == jsonType ? 'json' :
	      scriptTypeRE.test(mime) ? 'script' :
	      xmlTypeRE.test(mime) && 'xml' ) || 'text'
	  }

	  function appendQuery(url, query) {
	    if (query == '') return url
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	  }

	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string")
	      options.data = $.param(options.data, options.traditional)
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	      options.url = appendQuery(options.url, options.data), options.data = undefined
	  }

	  $.ajax = function(options){
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred()
	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

	    ajaxStart(settings)

	    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
	      RegExp.$2 != window.location.host

	    if (!settings.url) settings.url = window.location.toString()
	    serializeData(settings)

	    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	    if (hasPlaceholder) dataType = 'jsonp'

	    if (settings.cache === false || (
	         (!options || options.cache !== true) &&
	         ('script' == dataType || 'jsonp' == dataType)
	        ))
	      settings.url = appendQuery(settings.url, '_=' + Date.now())

	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder)
	        settings.url = appendQuery(settings.url,
	          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	      return $.ajaxJSONP(settings, deferred)
	    }

	    var mime = settings.accepts[dataType],
	        headers = { },
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout

	    if (deferred) deferred.promise(xhr)

	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    setHeader('Accept', mime || '*/*')
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	      xhr.overrideMimeType && xhr.overrideMimeType(mime)
	    }
	    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	    xhr.setRequestHeader = setHeader

	    xhr.onreadystatechange = function(){
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty
	        clearTimeout(abortTimeout)
	        var result, error = false
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
	          result = xhr.responseText

	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script')    (1,eval)(result)
	            else if (dataType == 'xml')  result = xhr.responseXML
	            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	          } catch (e) { error = e }

	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	          else ajaxSuccess(result, xhr, settings, deferred)
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	        }
	      }
	    }

	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort()
	      ajaxError(null, 'abort', xhr, settings, deferred)
	      return xhr
	    }

	    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

	    var async = 'async' in settings ? settings.async : true
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

	    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	        xhr.onreadystatechange = empty
	        xhr.abort()
	        ajaxError(null, 'timeout', xhr, settings, deferred)
	      }, settings.timeout)

	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null)
	    return xhr
	  }

	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined
	    if (!$.isFunction(success)) dataType = success, success = undefined
	    return {
	      url: url
	    , data: data
	    , success: success
	    , dataType: dataType
	    }
	  }

	  $.get = function(/* url, data, success, dataType */){
	    return $.ajax(parseArguments.apply(null, arguments))
	  }

	  $.post = function(/* url, data, success, dataType */){
	    var options = parseArguments.apply(null, arguments)
	    options.type = 'POST'
	    return $.ajax(options)
	  }

	  $.getJSON = function(/* url, data, success */){
	    var options = parseArguments.apply(null, arguments)
	    options.dataType = 'json'
	    return $.ajax(options)
	  }

	  $.fn.load = function(url, data, success){
	    if (!this.length) return this
	    var self = this, parts = url.split(/\s/), selector,
	        options = parseArguments(url, data, success),
	        callback = options.success
	    if (parts.length > 1) options.url = parts[0], selector = parts[1]
	    options.success = function(response){
	      self.html(selector ?
	        $('<div>').html(response.replace(rscript, "")).find(selector)
	        : response)
	      callback && callback.apply(self, arguments)
	    }
	    $.ajax(options)
	    return this
	  }

	  var escape = encodeURIComponent

	  function serialize(params, obj, traditional, scope){
	    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	    $.each(obj, function(key, value) {
	      type = $.type(value)
	      if (scope) key = traditional ? scope :
	        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value)
	      // recurse into nested objects
	      else if (type == "array" || (!traditional && type == "object"))
	        serialize(params, value, traditional, key)
	      else params.add(key, value)
	    })
	  }

	  $.param = function(obj, traditional){
	    var params = []
	    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
	    serialize(params, obj, traditional)
	    return params.join('&').replace(/%20/g, '+')
	  }
	})(Zepto)

	;(function($){
	  $.fn.serializeArray = function() {
	    var result = [], el
	    $([].slice.call(this.get(0).elements)).each(function(){
	      el = $(this)
	      var type = el.attr('type')
	      if (this.nodeName.toLowerCase() != 'fieldset' &&
	        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
	        ((type != 'radio' && type != 'checkbox') || this.checked))
	        result.push({
	          name: el.attr('name'),
	          value: el.val()
	        })
	    })
	    return result
	  }

	  $.fn.serialize = function(){
	    var result = []
	    this.serializeArray().forEach(function(elm){
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
	    })
	    return result.join('&')
	  }

	  $.fn.submit = function(callback) {
	    if (callback) this.bind('submit', callback)
	    else if (this.length) {
	      var event = $.Event('submit')
	      this.eq(0).trigger(event)
	      if (!event.isDefaultPrevented()) this.get(0).submit()
	    }
	    return this
	  }

	})(Zepto)

	;(function($){
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function(dom, selector){
	        dom = dom || []
	        $.extend(dom, $.fn)
	        dom.selector = selector || ''
	        dom.__Z = true
	        return dom
	      },
	      // this is a kludge but works
	      isZ: function(object){
	        return $.type(object) === 'array' && '__Z' in object
	      }
	    })
	  }

	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})(Zepto)


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var NodeSize, React, Tether;

	React = __webpack_require__(1);

	Tether = __webpack_require__(143);

	NodeSize = __webpack_require__(145);

	module.exports = function() {
	  var P, S;
	  S = this.state;
	  P = this.props;
	  if (!P.isOpen) {
	    return null;
	  }
	  if (!S.isShow) {
	    return React.createElement(NodeSize, {
	      "onGetSize": this.openPopup
	    }, React.createElement("div", {
	      "className": "popup",
	      "style": {
	        marginTop: this.renderMarginTop(),
	        marginBottom: this.renderMarginBottom()
	      }
	    }, React.createElement("div", {
	      "className": "popup--content"
	    }, this.props.children)));
	  }
	  return React.createElement(Tether, {
	    "classPrefix": "popup-",
	    "target": this.props.node,
	    "targetOffset": S.targetOffset,
	    "attachment": S.attachment,
	    "targetAttachment": S.targetAttachment,
	    "constraints": P.constraints,
	    "onTargetRender": this.onTargetRender
	  }, React.createElement("div", {
	    "className": "popup",
	    "style": {
	      marginTop: this.renderMarginTop(),
	      marginBottom: this.renderMarginBottom()
	    }
	  }, (!P.isSmooth ? React.createElement("div", {
	    "className": this.renderArrowClass(),
	    "style": {
	      top: S.arrow.top,
	      left: S.arrow.left
	    }
	  }) : void 0), React.createElement("div", {
	    "className": "popup--content",
	    "style": {
	      maxWidth: S.maxWidth,
	      maxHeight: S.maxHeight
	    }
	  }, this.props.children)));
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var React, ReactDOM, Tether, _, attachmentPositions, childrenPropType;

	_ = __webpack_require__(11);

	React = __webpack_require__(1);

	ReactDOM = __webpack_require__(2);

	Tether = __webpack_require__(144);

	childrenPropType = function(prop, propName, componentName) {
	  var childCount;
	  childCount = React.Children.count(prop.children);
	  if (childCount <= 0) {
	    return new Error(componentName + " expects at least one child to use as the target element.");
	  } else if (childCount > 2) {
	    return new Error("Only a max of two children allowed in " + componentName + ".");
	  }
	};

	attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

	module.exports = React.createClass({
	  displayName: 'TetherComponent',
	  propTypes: {
	    target: React.PropTypes.instanceOf(Node),
	    attachment: React.PropTypes.oneOf(attachmentPositions).isRequired,
	    children: childrenPropType,
	    className: React.PropTypes.string,
	    classPrefix: React.PropTypes.string,
	    classes: React.PropTypes.object,
	    constraints: React.PropTypes.array,
	    enabled: React.PropTypes.bool,
	    id: React.PropTypes.string,
	    offset: React.PropTypes.string,
	    optimizations: React.PropTypes.object,
	    renderElementTag: React.PropTypes.string,
	    renderElementTo: React.PropTypes.any,
	    style: React.PropTypes.object,
	    targetAttachment: React.PropTypes.oneOf(attachmentPositions),
	    targetModifier: React.PropTypes.string,
	    targetOffset: React.PropTypes.string,
	    onTargetRender: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      renderElementTag: 'div',
	      renderElementTo: null,
	      onTargetRender: function() {}
	    };
	  },
	  componentDidMount: function() {
	    this.targetNode = this.props.target;
	    return this.update();
	  },
	  componentDidUpdate: function() {
	    return this.update();
	  },
	  componentWillUnmount: function() {
	    return this.destroy();
	  },
	  disable: function() {
	    return this.tether.disable();
	  },
	  enable: function() {
	    return this.tether.enable();
	  },
	  position: function() {
	    return this.tether.position();
	  },
	  destroy: function() {
	    if (this.elementParentNode) {
	      ReactDOM.unmountComponentAtNode(this.elementParentNode);
	      this.elementParentNode.parentNode.removeChild(this.elementParentNode);
	    }
	    if (this.tether) {
	      this.tether.destroy();
	    }
	    this.elementParentNode = null;
	    return this.tether = null;
	  },
	  update: function() {
	    var elementComponent, ref, renderElementTag, renderElementTo, renderTo;
	    ref = this.props, renderElementTag = ref.renderElementTag, renderElementTo = ref.renderElementTo;
	    elementComponent = this.props.children;
	    if (!elementComponent) {
	      if (this.tether) {
	        this.destroy();
	      }
	      return;
	    }
	    if (!this.elementParentNode) {
	      this.elementParentNode = document.createElement(renderElementTag);
	      renderTo = renderElementTo || document.body;
	      renderTo.appendChild(this.elementParentNode);
	    }
	    return ReactDOM.unstable_renderSubtreeIntoContainer(this, elementComponent, this.elementParentNode, (function(_this) {
	      return function() {
	        _this.updateTether();
	        return _this.props.onTargetRender(_this.elementParentNode);
	      };
	    })(this));
	  },
	  updateTether: function() {
	    var options;
	    options = _.assign({
	      target: this.targetNode,
	      element: this.elementParentNode
	    }, this.props);
	    if (!this.tether) {
	      this.tether = new Tether(options);
	    } else {
	      this.tether.setOptions(options);
	    }
	    return this.tether.position();
	  },
	  render: function() {
	    return null;
	  }
	});


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	var zeroElement = null;

	// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
	// if the element lies within a nested document (<frame> or <iframe>-like).
	function getActualBoundingClientRect(node) {
	  var boundingRect = node.getBoundingClientRect();

	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = {};
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }

	  if (node.ownerDocument !== document) {
	    var _frameElement = node.ownerDocument.defaultView.frameElement;
	    if (_frameElement) {
	      var frameRect = getActualBoundingClientRect(_frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }

	  return rect;
	}

	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];

	  if (position === 'fixed') {
	    return [el];
	  }

	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }

	  parents.push(el.ownerDocument.body);

	  // If the node is within a frame, account for the parent window scroll
	  if (el.ownerDocument !== document) {
	    parents.push(el.ownerDocument.defaultView);
	  }

	  return parents;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node || !document.body.contains(node)) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    document.body.appendChild(node);

	    zeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = getActualBoundingClientRect(node);

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = getActualBoundingClientRect(el);

	  var origin = getOrigin();

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	var _scrollBarSize = null;
	function getScrollBarSize() {
	  if (_scrollBarSize) {
	    return _scrollBarSize;
	  }
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  _scrollBarSize = { width: width, height: width };
	  return _scrollBarSize;
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
	  // completely separately SVGAnimatedString base classes
	  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getActualBoundingClientRect: getActualBoundingClientRect,
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);

	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;

	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      this.scrollParents.forEach(function (parent) {
	        if (parent !== _this3.target.ownerDocument) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;

	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });

	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }

	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var doc = this.target.ownerDocument;
	      var win = doc.defaultView;

	      var scrollbarSize = undefined;
	      if (win.innerHeight > doc.documentElement.clientHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (win.innerWidth > doc.documentElement.clientWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = doc.body.scrollHeight - top - height;
	        next.page.right = doc.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          if (window.matchMedia) {
	            // HubSpot/tether#207
	            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
	            if (!retina) {
	              xPos = Math.round(xPos);
	              yPos = Math.round(yPos);
	            }
	          }

	          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });

	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        if (this.options.bodyElement) {
	          this.options.bodyElement.appendChild(this.element);
	        } else {
	          var offsetParentIsBody = true;
	          var currentNode = this.element.parentNode;
	          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	            if (getComputedStyle(currentNode).position !== 'static') {
	              offsetParentIsBody = false;
	              break;
	            }

	            currentNode = currentNode.parentNode;
	          }

	          if (!offsetParentIsBody) {
	            this.element.parentNode.removeChild(this.element);
	            this.element.ownerDocument.body.appendChild(this.element);
	          }
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	          _this8.trigger('repositioned');
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})(Evented);

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var node = to;
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      // Account any parent Frames scroll offset
	      if (node.ownerDocument !== document) {
	        var win = node.ownerDocument.defaultView;
	        to[0] += win.pageXOffset;
	        to[1] += win.pageYOffset;
	        to[2] += win.pageXOffset;
	        to[3] += win.pageYOffset;
	      }

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';

	            eAttachment.top = 'bottom';
	          }
	        }

	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';

	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var React, ReactDOM, RenderInBody;

	React = __webpack_require__(1);

	ReactDOM = __webpack_require__(2);

	RenderInBody = React.createClass({
	  onGetSize: React.PropTypes.func.isRequired,
	  getDefaultProps: function() {
	    return {
	      renderElementTag: 'div'
	    };
	  },
	  componentDidMount: function() {
	    return this.update();
	  },
	  componentWillUnmount: function() {
	    return this.unmount();
	  },
	  unmount: function() {
	    if (this.parentNode) {
	      ReactDOM.unmountComponentAtNode(this.parentNode);
	      this.parentNode.parentNode.removeChild(this.parentNode);
	    }
	    return this.parentNode = null;
	  },
	  update: function() {
	    if (!this.props.children) {
	      return;
	    }
	    if (!this.parentNode) {
	      this.parentNode = document.createElement('div');
	      this.parentNode.style.position = 'absolute';
	      this.parentNode.style.display = 'inline-block';
	      this.parentNode.style.visibility = 'hidden';
	      document.body.appendChild(this.parentNode);
	    }
	    return ReactDOM.unstable_renderSubtreeIntoContainer(this, this.props.children, this.parentNode, (function(_this) {
	      return function() {
	        return _this.props.onGetSize({
	          width: _this.parentNode.clientWidth,
	          height: _this.parentNode.clientHeight
	        });
	      };
	    })(this));
	  },
	  render: function() {
	    return null;
	  }
	});

	module.exports = RenderInBody;


/***/ }
/******/ ]);