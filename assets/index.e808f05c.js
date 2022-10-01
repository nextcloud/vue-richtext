var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link2 of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link2);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link2) {
    if (link2.ep)
      return;
    link2.ep = true;
    const fetchOpts = getFetchOpts(link2);
    fetch(link2.href, fetchOpts);
  }
})();
/*!
 * Vue.js v2.7.8
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
var isArray$2 = Array.isArray;
function isUndef(v) {
  return v === void 0 || v === null;
}
function isDef(v) {
  return v !== void 0 && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
}
function isFunction$1(value) {
  return typeof value === "function";
}
function isObject$7(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
function isPlainObject$3(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
  return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString$8(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject$3(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap(str, expectsLowerCase) {
  var map = /* @__PURE__ */ Object.create(null);
  var list2 = str.split(",");
  for (var i = 0; i < list2.length; i++) {
    map[list2[i]] = true;
  }
  return expectsLowerCase ? function(val) {
    return map[val.toLowerCase()];
  } : function(val) {
    return map[val];
  };
}
makeMap("slot,component", true);
var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
function remove$2(arr, item) {
  if (arr.length) {
    var index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
function hasOwn$8(obj, key) {
  return hasOwnProperty$3.call(obj, key);
}
function cached(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cached(function(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
});
var capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}
var bind$4 = Function.prototype.bind ? nativeBind : polyfillBind;
function toArray$1(list2, start) {
  start = start || 0;
  var i = list2.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list2[i + start];
  }
  return ret;
}
function extend$2(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject$3(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend$2(res, arr[i]);
    }
  }
  return res;
}
function noop(a, b, c) {
}
var no = function(a, b, c) {
  return false;
};
var identity = function(_) {
  return _;
};
function looseEqual(a, b) {
  if (a === b)
    return true;
  var isObjectA = isObject$7(a);
  var isObjectB = isObject$7(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val))
      return i;
  }
  return -1;
}
function once(fn) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}
var SSR_ATTR = "data-server-rendered";
var ASSET_TYPES = ["component", "directive", "filter"];
var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch",
  "renderTracked",
  "renderTriggered"
];
var config = {
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  silent: false,
  productionTip: false,
  devtools: false,
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: /* @__PURE__ */ Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop,
  parsePlatformTagName: identity,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
};
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str) {
  var c = (str + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
function parsePath(path2) {
  if (bailRE.test(path2)) {
    return;
  }
  var segments = path2.split(".");
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj)
        return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
var hasProto = "__proto__" in {};
var inBrowser = typeof window !== "undefined";
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
var isEdge = UA && UA.indexOf("edge/") > 0;
UA && UA.indexOf("android") > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser) {
  try {
    var opts$1 = {};
    Object.defineProperty(opts$1, "passive", {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts$1);
  } catch (e) {
  }
}
var _isServer;
var isServerRendering = function() {
  if (_isServer === void 0) {
    if (!inBrowser && typeof global !== "undefined") {
      _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
var _Set;
if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = function() {
    function Set2() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    Set2.prototype.has = function(key) {
      return this.set[key] === true;
    };
    Set2.prototype.add = function(key) {
      this.set[key] = true;
    };
    Set2.prototype.clear = function() {
      this.set = /* @__PURE__ */ Object.create(null);
    };
    return Set2;
  }();
}
var currentInstance = null;
function setCurrentInstance(vm) {
  if (vm === void 0) {
    vm = null;
  }
  if (!vm)
    currentInstance && currentInstance._scope.off();
  currentInstance = vm;
  vm && vm._scope.on();
}
var VNode = function() {
  function VNode2(tag, data2, children, text2, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data2;
    this.children = children;
    this.text = text2;
    this.elm = elm;
    this.ns = void 0;
    this.context = context;
    this.fnContext = void 0;
    this.fnOptions = void 0;
    this.fnScopeId = void 0;
    this.key = data2 && data2.key;
    this.componentOptions = componentOptions;
    this.componentInstance = void 0;
    this.parent = void 0;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = void 0;
    this.isAsyncPlaceholder = false;
  }
  Object.defineProperty(VNode2.prototype, "child", {
    get: function() {
      return this.componentInstance;
    },
    enumerable: false,
    configurable: true
  });
  return VNode2;
}();
var createEmptyVNode = function(text2) {
  if (text2 === void 0) {
    text2 = "";
  }
  var node = new VNode();
  node.text = text2;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(void 0, void 0, void 0, String(val));
}
function cloneVNode(vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
var uid$2$1 = 0;
var Dep = function() {
  function Dep2() {
    this.id = uid$2$1++;
    this.subs = [];
  }
  Dep2.prototype.addSub = function(sub) {
    this.subs.push(sub);
  };
  Dep2.prototype.removeSub = function(sub) {
    remove$2(this.subs, sub);
  };
  Dep2.prototype.depend = function(info) {
    if (Dep2.target) {
      Dep2.target.addDep(this);
    }
  };
  Dep2.prototype.notify = function(info) {
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };
  return Dep2;
}();
Dep.target = null;
var targetStack = [];
function pushTarget(target2) {
  targetStack.push(target2);
  Dep.target = target2;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted)
      ob.observeArray(inserted);
    {
      ob.dep.notify();
    }
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var NO_INIITIAL_VALUE = {};
var shouldObserve = true;
function toggleObserving(value) {
  shouldObserve = value;
}
var mockDep = {
  notify: noop,
  depend: noop,
  addSub: noop,
  removeSub: noop
};
var Observer = function() {
  function Observer2(value, shallow, mock) {
    if (shallow === void 0) {
      shallow = false;
    }
    if (mock === void 0) {
      mock = false;
    }
    this.value = value;
    this.shallow = shallow;
    this.mock = mock;
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (isArray$2(value)) {
      if (!mock) {
        if (hasProto) {
          value.__proto__ = arrayMethods;
        } else {
          for (var i = 0, l = arrayKeys.length; i < l; i++) {
            var key = arrayKeys[i];
            def(value, key, arrayMethods[key]);
          }
        }
      }
      if (!shallow) {
        this.observeArray(value);
      }
    } else {
      var keys3 = Object.keys(value);
      for (var i = 0; i < keys3.length; i++) {
        var key = keys3[i];
        defineReactive(value, key, NO_INIITIAL_VALUE, void 0, shallow, mock);
      }
    }
  }
  Observer2.prototype.observeArray = function(value) {
    for (var i = 0, l = value.length; i < l; i++) {
      observe(value[i], false, this.mock);
    }
  };
  return Observer2;
}();
function observe(value, shallow, ssrMockReactivity) {
  if (!isObject$7(value) || isRef(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn$8(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray$2(value) || isPlainObject$3(value)) && Object.isExtensible(value) && !value.__v_skip) {
    ob = new Observer(value, shallow, ssrMockReactivity);
  }
  return ob;
}
function defineReactive(obj, key, val, customSetter, shallow, mock) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
    val = obj[key];
  }
  var childOb = !shallow && observe(val, false, mock);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        {
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
          if (isArray$2(value)) {
            dependArray(value);
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, false, mock);
      {
        dep.notify();
      }
    }
  });
  return dep;
}
function set$1(target2, key, val) {
  if (isReadonly(target2)) {
    return;
  }
  var ob = target2.__ob__;
  if (isArray$2(target2) && isValidArrayIndex(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true);
    }
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  if (target2._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val, void 0, ob.shallow, ob.mock);
  {
    ob.dep.notify();
  }
  return val;
}
function del(target2, key) {
  if (isArray$2(target2) && isValidArrayIndex(key)) {
    target2.splice(key, 1);
    return;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return;
  }
  if (isReadonly(target2)) {
    return;
  }
  if (!hasOwn$8(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  {
    ob.dep.notify();
  }
}
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    if (e && e.__ob__) {
      e.__ob__.dep.depend();
    }
    if (isArray$2(e)) {
      dependArray(e);
    }
  }
}
function shallowReactive(target2) {
  makeReactive(target2, true);
  def(target2, "__v_isShallow", true);
  return target2;
}
function makeReactive(target2, shallow) {
  if (!isReadonly(target2)) {
    observe(target2, shallow, isServerRendering());
  }
}
function isReadonly(value) {
  return !!(value && value.__v_isReadonly);
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function proxyWithRefUnwrap(target2, source, key) {
  Object.defineProperty(target2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      var val = source[key];
      if (isRef(val)) {
        return val.value;
      } else {
        var ob = val && val.__ob__;
        if (ob)
          ob.dep.depend();
        return val;
      }
    },
    set: function(value) {
      var oldValue = source[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
      } else {
        source[key] = value;
      }
    }
  });
}
var activeEffectScope;
var EffectScope = function() {
  function EffectScope2(detached) {
    if (detached === void 0) {
      detached = false;
    }
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  EffectScope2.prototype.run = function(fn) {
    if (this.active) {
      var currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  };
  EffectScope2.prototype.on = function() {
    activeEffectScope = this;
  };
  EffectScope2.prototype.off = function() {
    activeEffectScope = this.parent;
  };
  EffectScope2.prototype.stop = function(fromParent) {
    if (this.active) {
      var i = void 0, l = void 0;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].teardown();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        var last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  };
  return EffectScope2;
}();
function recordEffectScope(effect, scope) {
  if (scope === void 0) {
    scope = activeEffectScope;
  }
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function resolveProvided(vm) {
  var existing = vm._provided;
  var parentProvides = vm.$parent && vm.$parent._provided;
  if (parentProvides === existing) {
    return vm._provided = Object.create(parentProvides);
  } else {
    return existing;
  }
}
var normalizeEvent = cached(function(name) {
  var passive = name.charAt(0) === "&";
  name = passive ? name.slice(1) : name;
  var once2 = name.charAt(0) === "~";
  name = once2 ? name.slice(1) : name;
  var capture = name.charAt(0) === "!";
  name = capture ? name.slice(1) : name;
  return {
    name,
    once: once2,
    capture,
    passive
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var fns2 = invoker.fns;
    if (isArray$2(fns2)) {
      var cloned = fns2.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
      }
    } else {
      return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on, oldOn, add2, remove2, createOnceHandler2, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur))
      ;
    else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler2(event.name, cur, event.capture);
      }
      add2(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove2(event.name, oldOn[name], event.capture);
    }
  }
}
function mergeVNodeHook(def2, hookKey, hook) {
  if (def2 instanceof VNode) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  var invoker;
  var oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove$2(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    invoker = createFnInvoker([wrappedHook]);
  } else {
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData(data2, Ctor, tag) {
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs2 = data2.attrs, props2 = data2.props;
  if (isDef(attrs2) || isDef(props2)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn$8(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn$8(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (isArray$2(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : isArray$2(children) ? normalizeArrayChildren(children) : void 0;
}
function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === "boolean")
      continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (isArray$2(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
        }
        res.push(c);
      }
    }
  }
  return res;
}
function renderList(val, render5) {
  var ret = null, i, l, keys3, key;
  if (isArray$2(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render5(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render5(i + 1, i);
    }
  } else if (isObject$7(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render5(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys3 = Object.keys(val);
      ret = new Array(keys3.length);
      for (i = 0, l = keys3.length; i < l; i++) {
        key = keys3[i];
        ret[i] = render5(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot(name, fallbackRender, props2, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      props2 = extend$2(extend$2({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (isFunction$1(fallbackRender) ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name] || (isFunction$1(fallbackRender) ? fallbackRender() : fallbackRender);
  }
  var target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter(id2) {
  return resolveAsset(this.$options, "filters", id2) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (isArray$2(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps(data2, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject$7(value))
      ;
    else {
      if (isArray$2(value)) {
        value = toObject$3(value);
      }
      var hash = void 0;
      var _loop_1 = function(key2) {
        if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
          hash = data2;
        } else {
          var type = data2.attrs && data2.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key2) ? data2.domProps || (data2.domProps = {}) : data2.attrs || (data2.attrs = {});
        }
        var camelizedKey = camelize(key2);
        var hyphenatedKey = hyphenate(key2);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key2] = value[key2];
          if (isSync) {
            var on = data2.on || (data2.on = {});
            on["update:".concat(key2)] = function($event) {
              value[key2] = $event;
            };
          }
        }
      };
      for (var key in value) {
        _loop_1(key);
      }
    }
  }
  return data2;
}
function renderStatic(index2, isInFor) {
  var cached2 = this._staticTrees || (this._staticTrees = []);
  var tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(
    this._renderProxy,
    this._c,
    this
  );
  markStatic(tree, "__static__".concat(index2), false);
  return tree;
}
function markOnce(tree, index2, key) {
  markStatic(tree, "__once__".concat(index2).concat(key ? "_".concat(key) : ""), true);
  return tree;
}
function markStatic(tree, key, isOnce) {
  if (isArray$2(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data2, value) {
  if (value) {
    if (!isPlainObject$3(value))
      ;
    else {
      var on = data2.on = data2.on ? extend$2({}, data2.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data2;
}
function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (isArray$2(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    }
  }
  return baseObj;
}
function prependModifier(value, symbol) {
  return typeof value === "string" ? symbol + value : value;
}
function installRenderHelpers(target2) {
  target2._o = markOnce;
  target2._n = toNumber;
  target2._s = toString$8;
  target2._l = renderList;
  target2._t = renderSlot;
  target2._q = looseEqual;
  target2._i = looseIndexOf;
  target2._m = renderStatic;
  target2._f = resolveFilter;
  target2._k = checkKeyCodes;
  target2._b = bindObjectProps;
  target2._v = createTextVNode;
  target2._e = createEmptyVNode;
  target2._u = resolveScopedSlots;
  target2._g = bindObjectListeners;
  target2._d = bindDynamicKeys;
  target2._p = prependModifier;
}
function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data2 = child.data;
    if (data2 && data2.attrs && data2.attrs.slot) {
      delete data2.attrs.slot;
    }
    if ((child.context === context || child.fnContext === context) && data2 && data2.slot != null) {
      var name_1 = data2.slot;
      var slot = slots[name_1] || (slots[name_1] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  for (var name_2 in slots) {
    if (slots[name_2].every(isWhitespace)) {
      delete slots[name_2];
    }
  }
  return slots;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
  var key = scopedSlots && scopedSlots.$key;
  if (!scopedSlots) {
    res = {};
  } else if (scopedSlots._normalized) {
    return scopedSlots._normalized;
  } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
    return prevScopedSlots;
  } else {
    res = {};
    for (var key_1 in scopedSlots) {
      if (scopedSlots[key_1] && key_1[0] !== "$") {
        res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
      }
    }
  }
  for (var key_2 in normalSlots) {
    if (!(key_2 in res)) {
      res[key_2] = proxyNormalSlot(normalSlots, key_2);
    }
  }
  if (scopedSlots && Object.isExtensible(scopedSlots)) {
    scopedSlots._normalized = res;
  }
  def(res, "$stable", isStable);
  def(res, "$key", key);
  def(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
  var normalized = function() {
    var cur = currentInstance;
    setCurrentInstance(vm);
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === "object" && !isArray$2(res) ? [res] : normalizeChildren(res);
    var vnode = res && res[0];
    setCurrentInstance(cur);
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
  };
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots, key) {
  return function() {
    return slots[key];
  };
}
function initSetup(vm) {
  var options = vm.$options;
  var setup = options.setup;
  if (setup) {
    var ctx = vm._setupContext = createSetupContext(vm);
    setCurrentInstance(vm);
    pushTarget();
    var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
    popTarget();
    setCurrentInstance();
    if (isFunction$1(setupResult)) {
      options.render = setupResult;
    } else if (isObject$7(setupResult)) {
      vm._setupState = setupResult;
      if (!setupResult.__sfc) {
        for (var key in setupResult) {
          if (!isReserved(key)) {
            proxyWithRefUnwrap(vm, setupResult, key);
          }
        }
      } else {
        var proxy2 = vm._setupProxy = {};
        for (var key in setupResult) {
          if (key !== "__sfc") {
            proxyWithRefUnwrap(proxy2, setupResult, key);
          }
        }
      }
    } else
      ;
  }
}
function createSetupContext(vm) {
  return {
    get attrs() {
      if (!vm._attrsProxy) {
        var proxy2 = vm._attrsProxy = {};
        def(proxy2, "_v_attr_proxy", true);
        syncSetupProxy(proxy2, vm.$attrs, emptyObject, vm, "$attrs");
      }
      return vm._attrsProxy;
    },
    get listeners() {
      if (!vm._listenersProxy) {
        var proxy2 = vm._listenersProxy = {};
        syncSetupProxy(proxy2, vm.$listeners, emptyObject, vm, "$listeners");
      }
      return vm._listenersProxy;
    },
    get slots() {
      return initSlotsProxy(vm);
    },
    emit: bind$4(vm.$emit, vm),
    expose: function(exposed) {
      if (exposed) {
        Object.keys(exposed).forEach(function(key) {
          return proxyWithRefUnwrap(vm, exposed, key);
        });
      }
    }
  };
}
function syncSetupProxy(to, from, prev, instance, type) {
  var changed = false;
  for (var key in from) {
    if (!(key in to)) {
      changed = true;
      defineProxyAttr(to, key, instance, type);
    } else if (from[key] !== prev[key]) {
      changed = true;
    }
  }
  for (var key in to) {
    if (!(key in from)) {
      changed = true;
      delete to[key];
    }
  }
  return changed;
}
function defineProxyAttr(proxy2, key, instance, type) {
  Object.defineProperty(proxy2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return instance[type][key];
    }
  });
}
function initSlotsProxy(vm) {
  if (!vm._slotsProxy) {
    syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
  }
  return vm._slotsProxy;
}
function syncSetupSlots(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  for (var key in to) {
    if (!(key in from)) {
      delete to[key];
    }
  }
}
function initRender(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
  vm._c = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false);
  };
  vm.$createElement = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue2) {
  installRenderHelpers(Vue2.prototype);
  Vue2.prototype.$nextTick = function(fn) {
    return nextTick(fn, this);
  };
  Vue2.prototype._render = function() {
    var vm = this;
    var _a2 = vm.$options, render5 = _a2.render, _parentVnode = _a2._parentVnode;
    if (_parentVnode && vm._isMounted) {
      vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
      if (vm._slotsProxy) {
        syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
      }
    }
    vm.$vnode = _parentVnode;
    var vnode;
    try {
      setCurrentInstance(vm);
      currentRenderingInstance = vm;
      vnode = render5.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
      setCurrentInstance();
    }
    if (isArray$2(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base2) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject$7(comp) ? base2.extend(comp) : comp;
}
function createAsyncPlaceholder(factory2, data2, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory2;
  node.asyncMeta = { data: data2, context, children, tag };
  return node;
}
function resolveAsyncComponent(factory2, baseCtor) {
  if (isTrue(factory2.error) && isDef(factory2.errorComp)) {
    return factory2.errorComp;
  }
  if (isDef(factory2.resolved)) {
    return factory2.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef(factory2.owners) && factory2.owners.indexOf(owner) === -1) {
    factory2.owners.push(owner);
  }
  if (isTrue(factory2.loading) && isDef(factory2.loadingComp)) {
    return factory2.loadingComp;
  }
  if (owner && !isDef(factory2.owners)) {
    var owners_1 = factory2.owners = [owner];
    var sync_1 = true;
    var timerLoading_1 = null;
    var timerTimeout_1 = null;
    owner.$on("hook:destroyed", function() {
      return remove$2(owners_1, owner);
    });
    var forceRender_1 = function(renderCompleted) {
      for (var i = 0, l = owners_1.length; i < l; i++) {
        owners_1[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners_1.length = 0;
        if (timerLoading_1 !== null) {
          clearTimeout(timerLoading_1);
          timerLoading_1 = null;
        }
        if (timerTimeout_1 !== null) {
          clearTimeout(timerTimeout_1);
          timerTimeout_1 = null;
        }
      }
    };
    var resolve = once(function(res) {
      factory2.resolved = ensureCtor(res, baseCtor);
      if (!sync_1) {
        forceRender_1(true);
      } else {
        owners_1.length = 0;
      }
    });
    var reject_1 = once(function(reason) {
      if (isDef(factory2.errorComp)) {
        factory2.error = true;
        forceRender_1(true);
      }
    });
    var res_1 = factory2(resolve, reject_1);
    if (isObject$7(res_1)) {
      if (isPromise(res_1)) {
        if (isUndef(factory2.resolved)) {
          res_1.then(resolve, reject_1);
        }
      } else if (isPromise(res_1.component)) {
        res_1.component.then(resolve, reject_1);
        if (isDef(res_1.error)) {
          factory2.errorComp = ensureCtor(res_1.error, baseCtor);
        }
        if (isDef(res_1.loading)) {
          factory2.loadingComp = ensureCtor(res_1.loading, baseCtor);
          if (res_1.delay === 0) {
            factory2.loading = true;
          } else {
            timerLoading_1 = setTimeout(function() {
              timerLoading_1 = null;
              if (isUndef(factory2.resolved) && isUndef(factory2.error)) {
                factory2.loading = true;
                forceRender_1(false);
              }
            }, res_1.delay || 200);
          }
        }
        if (isDef(res_1.timeout)) {
          timerTimeout_1 = setTimeout(function() {
            timerTimeout_1 = null;
            if (isUndef(factory2.resolved)) {
              reject_1(null);
            }
          }, res_1.timeout);
        }
      }
    }
    sync_1 = false;
    return factory2.loading ? factory2.loadingComp : factory2.resolved;
  }
}
function getFirstComponentChild(children) {
  if (isArray$2(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function createElement$1(context, tag, data2, children, normalizationType, alwaysNormalize) {
  if (isArray$2(data2) || isPrimitive(data2)) {
    normalizationType = children;
    children = data2;
    data2 = void 0;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data2, children, normalizationType);
}
function _createElement(context, tag, data2, children, normalizationType) {
  if (isDef(data2) && isDef(data2.__ob__)) {
    return createEmptyVNode();
  }
  if (isDef(data2) && isDef(data2.is)) {
    tag = data2.is;
  }
  if (!tag) {
    return createEmptyVNode();
  }
  if (isArray$2(children) && isFunction$1(children[0])) {
    data2 = data2 || {};
    data2.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns2;
  if (typeof tag === "string") {
    var Ctor = void 0;
    ns2 = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data2, children, void 0, void 0, context);
    } else if ((!data2 || !data2.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
      vnode = createComponent(Ctor, data2, context, children, tag);
    } else {
      vnode = new VNode(tag, data2, children, void 0, void 0, context);
    }
  } else {
    vnode = createComponent(tag, data2, context, children);
  }
  if (isArray$2(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns2))
      applyNS(vnode, ns2);
    if (isDef(data2))
      registerDeepBindings(data2);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns2, force) {
  vnode.ns = ns2;
  if (vnode.tag === "foreignObject") {
    ns2 = void 0;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
        applyNS(child, ns2, force);
      }
    }
  }
}
function registerDeepBindings(data2) {
  if (isObject$7(data2.style)) {
    traverse(data2.style);
  }
  if (isObject$7(data2.class)) {
    traverse(data2.class);
  }
}
function handleError(err, vm, info) {
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (var i = 0; i < hooks2.length; i++) {
            try {
              var capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture)
                return;
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function(e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError(e);
      }
    }
  }
  logError(err);
}
function logError(err, vm, info) {
  if (inBrowser && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
var timerFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p_1 = Promise.resolve();
  timerFunc = function() {
    p_1.then(flushCallbacks);
    if (isIOS)
      setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  var counter_1 = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode_1 = document.createTextNode(String(counter_1));
  observer.observe(textNode_1, {
    characterData: true
  });
  timerFunc = function() {
    counter_1 = (counter_1 + 1) % 2;
    textNode_1.data = String(counter_1);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function() {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve) {
      _resolve = resolve;
    });
  }
}
var version$1 = "2.7.8";
var seenObjects = new _Set();
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
  return val;
}
function _traverse(val, seen) {
  var i, keys3;
  var isA = isArray$2(val);
  if (!isA && !isObject$7(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--)
      _traverse(val[i], seen);
  } else if (isRef(val)) {
    _traverse(val.value, seen);
  } else {
    keys3 = Object.keys(val);
    i = keys3.length;
    while (i--)
      _traverse(val[keys3[i]], seen);
  }
}
var uid$1$1 = 0;
var Watcher = function() {
  function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
    recordEffectScope(this, activeEffectScope || (vm ? vm._scope : void 0));
    if (this.vm = vm) {
      if (isRenderWatcher) {
        vm._watcher = this;
      }
    }
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$1$1;
    this.active = true;
    this.post = false;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = "";
    if (isFunction$1(expOrFn)) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    this.value = this.lazy ? void 0 : this.get();
  }
  Watcher2.prototype.get = function() {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
      } else {
        throw e;
      }
    } finally {
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  };
  Watcher2.prototype.addDep = function(dep) {
    var id2 = dep.id;
    if (!this.newDepIds.has(id2)) {
      this.newDepIds.add(id2);
      this.newDeps.push(dep);
      if (!this.depIds.has(id2)) {
        dep.addSub(this);
      }
    }
  };
  Watcher2.prototype.cleanupDeps = function() {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  Watcher2.prototype.update = function() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  Watcher2.prototype.run = function() {
    if (this.active) {
      var value = this.get();
      if (value !== this.value || isObject$7(value) || this.deep) {
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          var info = 'callback for watcher "'.concat(this.expression, '"');
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };
  Watcher2.prototype.evaluate = function() {
    this.value = this.get();
    this.dirty = false;
  };
  Watcher2.prototype.depend = function() {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
  Watcher2.prototype.teardown = function() {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove$2(this.vm._scope.effects, this);
    }
    if (this.active) {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  };
  return Watcher2;
}();
function initEvents(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
var target$1;
function add$1(event, fn) {
  target$1.$on(event, fn);
}
function remove$1(event, fn) {
  target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
  var _target = target$1;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners, oldListeners) {
  target$1 = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
  target$1 = void 0;
}
function eventsMixin(Vue2) {
  var hookRE = /^hook:/;
  Vue2.prototype.$on = function(event, fn) {
    var vm = this;
    if (isArray$2(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue2.prototype.$once = function(event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };
  Vue2.prototype.$off = function(event, fn) {
    var vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (isArray$2(event)) {
      for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
        vm.$off(event[i_1], fn);
      }
      return vm;
    }
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue2.prototype.$emit = function(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray$1(cbs) : cbs;
      var args = toArray$1(arguments, 1);
      var info = 'event handler for "'.concat(event, '"');
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function() {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._provided = parent ? parent._provided : /* @__PURE__ */ Object.create(null);
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue2) {
  Vue2.prototype._update = function(vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
  };
  Vue2.prototype.$forceUpdate = function() {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue2.prototype.$destroy = function() {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook$1(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$2(parent.$children, vm);
    }
    vm._scope.stop();
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook$1(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook$1(vm, "beforeMount");
  var updateComponent;
  {
    updateComponent = function() {
      vm._update(vm._render(), hydrating);
    };
  }
  var watcherOptions = {
    before: function() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "beforeUpdate");
      }
    }
  };
  new Watcher(vm, updateComponent, noop, watcherOptions, true);
  hydrating = false;
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run();
    }
  }
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$1(vm, "mounted");
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
  var prevVNode = vm.$vnode;
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  var attrs2 = parentVnode.data.attrs || emptyObject;
  if (vm._attrsProxy) {
    if (syncSetupProxy(vm._attrsProxy, attrs2, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
      needsForceUpdate = true;
    }
  }
  vm.$attrs = attrs2;
  listeners = listeners || emptyObject;
  var prevListeners = vm.$options._parentListeners;
  if (vm._listenersProxy) {
    syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
  }
  vm.$listeners = vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, prevListeners);
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props2 = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props;
      props2[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    vm.$options.propsData = propsData;
  }
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive)
      return true;
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "activated");
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "deactivated");
  }
}
function callHook$1(vm, hook, args, setContext) {
  if (setContext === void 0) {
    setContext = true;
  }
  pushTarget();
  var prev = currentInstance;
  setContext && setCurrentInstance(vm);
  var handlers2 = vm.$options[hook];
  var info = "".concat(hook, " hook");
  if (handlers2) {
    for (var i = 0, j = handlers2.length; i < j; i++) {
      invokeWithErrorHandling(handlers2[i], vm, args || null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  setContext && setCurrentInstance(prev);
  popTarget();
}
var queue = [];
var activatedChildren = [];
var has$1 = {};
var waiting = false;
var flushing = false;
var index$1 = 0;
function resetSchedulerState() {
  index$1 = queue.length = activatedChildren.length = 0;
  has$1 = {};
  waiting = flushing = false;
}
var currentFlushTimestamp = 0;
var getNow = Date.now;
if (inBrowser && !isIE) {
  var performance_1 = window.performance;
  if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
    getNow = function() {
      return performance_1.now();
    };
  }
}
var sortCompareFn = function(a, b) {
  if (a.post) {
    if (!b.post)
      return 1;
  } else if (b.post) {
    return -1;
  }
  return a.id - b.id;
};
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id2;
  queue.sort(sortCompareFn);
  for (index$1 = 0; index$1 < queue.length; index$1++) {
    watcher = queue[index$1];
    if (watcher.before) {
      watcher.before();
    }
    id2 = watcher.id;
    has$1[id2] = null;
    watcher.run();
  }
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState();
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
function callUpdatedHooks(queue2) {
  var i = queue2.length;
  while (i--) {
    var watcher = queue2[i];
    var vm = watcher.vm;
    if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook$1(vm, "updated");
    }
  }
}
function queueActivatedComponent(vm) {
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue2) {
  for (var i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent(queue2[i], true);
  }
}
function queueWatcher(watcher) {
  var id2 = watcher.id;
  if (has$1[id2] != null) {
    return;
  }
  if (watcher === Dep.target && watcher.noRecurse) {
    return;
  }
  has$1[id2] = true;
  if (!flushing) {
    queue.push(watcher);
  } else {
    var i = queue.length - 1;
    while (i > index$1 && queue[i].id > watcher.id) {
      i--;
    }
    queue.splice(i + 1, 0, watcher);
  }
  if (!waiting) {
    waiting = true;
    nextTick(flushSchedulerQueue);
  }
}
function initProvide(vm) {
  var provideOption = vm.$options.provide;
  if (provideOption) {
    var provided = isFunction$1(provideOption) ? provideOption.call(vm) : provideOption;
    if (!isObject$7(provided)) {
      return;
    }
    var source = resolveProvided(vm);
    var keys3 = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
    for (var i = 0; i < keys3.length; i++) {
      var key = keys3[i];
      Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
    }
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function(key) {
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject, vm) {
  if (inject) {
    var result = /* @__PURE__ */ Object.create(null);
    var keys3 = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
    for (var i = 0; i < keys3.length; i++) {
      var key = keys3[i];
      if (key === "__ob__")
        continue;
      var provideKey = inject[key].from;
      if (provideKey in vm._provided) {
        result[key] = vm._provided[provideKey];
      } else if ("default" in inject[key]) {
        var provideDefault = inject[key].default;
        result[key] = isFunction$1(provideDefault) ? provideDefault.call(vm) : provideDefault;
      } else
        ;
    }
    return result;
  }
}
function FunctionalRenderContext(data2, props2, children, parent, Ctor) {
  var _this = this;
  var options = Ctor.options;
  var contextVm;
  if (hasOwn$8(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data2;
  this.props = props2;
  this.children = children;
  this.parent = parent;
  this.listeners = data2.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function() {
    if (!_this.$slots) {
      normalizeScopedSlots(parent, data2.scopedSlots, _this.$slots = resolveSlots(children, parent));
    }
    return _this.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get: function() {
      return normalizeScopedSlots(parent, data2.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(parent, data2.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function(a, b, c, d) {
      var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
      if (vnode && !isArray$2(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function(a, b, c, d) {
      return createElement$1(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data2, contextVm, children) {
  var options = Ctor.options;
  var props2 = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props2[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data2.attrs))
      mergeProps(props2, data2.attrs);
    if (isDef(data2.props))
      mergeProps(props2, data2.props);
  }
  var renderContext = new FunctionalRenderContext(data2, props2, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data2, renderContext.parent, options);
  } else if (isArray$2(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data2, renderContext.parent, options);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data2, contextVm, options, renderContext) {
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data2.slot) {
    (clone.data || (clone.data = {})).slot = data2.slot;
  }
  return clone;
}
function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
function getComponentName(options) {
  return options.name || options.__name || options._componentTag;
}
var componentVNodeHooks = {
  init: function(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      var mountedNode = vnode;
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch: function(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData,
      options.listeners,
      vnode,
      options.children
    );
  },
  insert: function(vnode) {
    var context = vnode.context, componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$1(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true);
      }
    }
  },
  destroy: function(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true);
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data2, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  if (isObject$7(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder(asyncFactory, data2, context, children, tag);
    }
  }
  data2 = data2 || {};
  resolveConstructorOptions(Ctor);
  if (isDef(data2.model)) {
    transformModel(Ctor.options, data2);
  }
  var propsData = extractPropsFromVNodeData(data2, Ctor);
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data2, context, children);
  }
  var listeners = data2.on;
  data2.on = data2.nativeOn;
  if (isTrue(Ctor.options.abstract)) {
    var slot = data2.slot;
    data2 = {};
    if (slot) {
      data2.slot = slot;
    }
  }
  installComponentHooks(data2);
  var name = getComponentName(Ctor.options) || tag;
  var vnode = new VNode(
    "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
    data2,
    void 0,
    void 0,
    void 0,
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  );
  return vnode;
}
function createComponentInstanceForVnode(vnode, parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data2) {
  var hooks2 = data2.hook || (data2.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks2[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook(f1, f2) {
  var merged = function(a, b) {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel(options, data2) {
  var prop = options.model && options.model.prop || "value";
  var event = options.model && options.model.event || "input";
  (data2.attrs || (data2.attrs = {}))[prop] = data2.model.value;
  var on = data2.on || (data2.on = {});
  var existing = on[event];
  var callback = data2.model.callback;
  if (isDef(existing)) {
    if (isArray$2(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
var warn = noop;
var strats = config.optionMergeStrategies;
function mergeData(to, from) {
  if (!from)
    return to;
  var key, toVal, fromVal;
  var keys3 = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys3.length; i++) {
    key = keys3[i];
    if (key === "__ob__")
      continue;
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn$8(to, key)) {
      set$1(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject$3(toVal) && isPlainObject$3(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData(isFunction$1(childVal) ? childVal.call(this, this) : childVal, isFunction$1(parentVal) ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      var instanceData = isFunction$1(childVal) ? childVal.call(vm, vm) : childVal;
      var defaultData = isFunction$1(parentVal) ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}
strats.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
function mergeLifecycleHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$2(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  var res = [];
  for (var i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function(hook) {
  strats[hook] = mergeLifecycleHook;
});
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend$2(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function(type) {
  strats[type + "s"] = mergeAssets;
});
strats.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch)
    parentVal = void 0;
  if (childVal === nativeWatch)
    childVal = void 0;
  if (!childVal)
    return Object.create(parentVal || null);
  if (!parentVal)
    return childVal;
  var ret = {};
  extend$2(ret, parentVal);
  for (var key_1 in childVal) {
    var parent_1 = ret[key_1];
    var child = childVal[key_1];
    if (parent_1 && !isArray$2(parent_1)) {
      parent_1 = [parent_1];
    }
    ret[key_1] = parent_1 ? parent_1.concat(child) : isArray$2(child) ? child : [child];
  }
  return ret;
};
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
  if (childVal && false) {
    assertObjectType(key, childVal);
  }
  if (!parentVal)
    return childVal;
  var ret = /* @__PURE__ */ Object.create(null);
  extend$2(ret, parentVal);
  if (childVal)
    extend$2(ret, childVal);
  return ret;
};
strats.provide = mergeDataOrFn;
var defaultStrat = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function normalizeProps(options, vm) {
  var props2 = options.props;
  if (!props2)
    return;
  var res = {};
  var i, val, name;
  if (isArray$2(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name = camelize(val);
        res[name] = { type: null };
      }
    }
  } else if (isPlainObject$3(props2)) {
    for (var key in props2) {
      val = props2[key];
      name = camelize(key);
      res[name] = isPlainObject$3(val) ? val : { type: val };
    }
  } else
    ;
  options.props = res;
}
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject)
    return;
  var normalized = options.inject = {};
  if (isArray$2(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject$3(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject$3(val) ? extend$2({ from: key }, val) : { from: val };
    }
  } else
    ;
}
function normalizeDirectives$1(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def2 = dirs[key];
      if (isFunction$1(def2)) {
        dirs[key] = { bind: def2, update: def2 };
      }
    }
  }
}
function assertObjectType(name, value, vm) {
  if (!isPlainObject$3(value)) {
    warn('Invalid value for option "'.concat(name, '": expected an Object, ') + "but got ".concat(toRawType(value), "."));
  }
}
function mergeOptions(parent, child, vm) {
  if (isFunction$1(child)) {
    child = child.options;
  }
  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives$1(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn$8(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    var strat = strats[key2] || defaultStrat;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset(options, type, id2, warnMissing) {
  if (typeof id2 !== "string") {
    return;
  }
  var assets = options[type];
  if (hasOwn$8(assets, id2))
    return assets[id2];
  var camelizedId = camelize(id2);
  if (hasOwn$8(assets, camelizedId))
    return assets[camelizedId];
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn$8(assets, PascalCaseId))
    return assets[PascalCaseId];
  var res = assets[id2] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn$8(propsData, key);
  var value = propsData[key];
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn$8(prop, "default")) {
      value = false;
    } else if (value === "" || value === hyphenate(key)) {
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  if (value === void 0) {
    value = getPropDefaultValue(vm, prop, key);
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  return value;
}
function getPropDefaultValue(vm, prop, key) {
  if (!hasOwn$8(prop, "default")) {
    return void 0;
  }
  var def2 = prop.default;
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return isFunction$1(def2) && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
}
var functionTypeCheckRE = /^\s*function (\w+)/;
function getType(fn) {
  var match2 = fn && fn.toString().match(functionTypeCheckRE);
  return match2 ? match2[1] : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (!isArray$2(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target2, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function initState(vm) {
  var opts2 = vm.$options;
  if (opts2.props)
    initProps$1(vm, opts2.props);
  initSetup(vm);
  if (opts2.methods)
    initMethods(vm, opts2.methods);
  if (opts2.data) {
    initData(vm);
  } else {
    var ob = observe(vm._data = {});
    ob && ob.vmCount++;
  }
  if (opts2.computed)
    initComputed$1(vm, opts2.computed);
  if (opts2.watch && opts2.watch !== nativeWatch) {
    initWatch(vm, opts2.watch);
  }
}
function initProps$1(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props2 = vm._props = shallowReactive({});
  var keys3 = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving(false);
  }
  var _loop_1 = function(key2) {
    keys3.push(key2);
    var value = validateProp(key2, propsOptions, propsData, vm);
    {
      defineReactive(props2, key2, value);
    }
    if (!(key2 in vm)) {
      proxy(vm, "_props", key2);
    }
  };
  for (var key in propsOptions) {
    _loop_1(key);
  }
  toggleObserving(true);
}
function initData(vm) {
  var data2 = vm.$options.data;
  data2 = vm._data = isFunction$1(data2) ? getData(data2, vm) : data2 || {};
  if (!isPlainObject$3(data2)) {
    data2 = {};
  }
  var keys3 = Object.keys(data2);
  var props2 = vm.$options.props;
  vm.$options.methods;
  var i = keys3.length;
  while (i--) {
    var key = keys3[i];
    if (props2 && hasOwn$8(props2, key))
      ;
    else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  var ob = observe(data2);
  ob && ob.vmCount++;
}
function getData(data2, vm) {
  pushTarget();
  try {
    return data2.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = { lazy: true };
function initComputed$1(vm, computed) {
  var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = isFunction$1(userDef) ? userDef : userDef.get;
    if (!isSSR) {
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}
function defineComputed(target2, key, userDef) {
  var shouldCache = !isServerRendering();
  if (isFunction$1(userDef)) {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
function initMethods(vm, methods) {
  vm.$options.props;
  for (var key in methods) {
    vm[key] = typeof methods[key] !== "function" ? noop : bind$4(methods[key], vm);
  }
}
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (isArray$2(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject$3(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue2) {
  var dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  Object.defineProperty(Vue2.prototype, "$data", dataDef);
  Object.defineProperty(Vue2.prototype, "$props", propsDef);
  Vue2.prototype.$set = set$1;
  Vue2.prototype.$delete = del;
  Vue2.prototype.$watch = function(expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject$3(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
var uid$3 = 0;
function initMixin$1(Vue2) {
  Vue2.prototype._init = function(options) {
    var vm = this;
    vm._uid = uid$3++;
    vm._isVue = true;
    vm.__v_skip = true;
    vm._scope = new EffectScope(true);
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    {
      vm._renderProxy = vm;
    }
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook$1(vm, "beforeCreate", void 0, false);
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook$1(vm, "created");
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts2 = vm.$options = Object.create(vm.constructor.options);
  var parentVnode = options._parentVnode;
  opts2.parent = options.parent;
  opts2._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts2.propsData = vnodeComponentOptions.propsData;
  opts2._parentListeners = vnodeComponentOptions.listeners;
  opts2._renderChildren = vnodeComponentOptions.children;
  opts2._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts2.render = options.render;
    opts2.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      var modifiedOptions = resolveModifiedOptions(Ctor);
      if (modifiedOptions) {
        extend$2(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified)
        modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue(options) {
  this._init(options);
}
initMixin$1(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
function initUse(Vue2) {
  Vue2.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    var args = toArray$1(arguments, 1);
    args.unshift(this);
    if (isFunction$1(plugin.install)) {
      plugin.install.apply(plugin, args);
    } else if (isFunction$1(plugin)) {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin(Vue2) {
  Vue2.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue2) {
  Vue2.cid = 0;
  var cid = 1;
  Vue2.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name = getComponentName(extendOptions) || getComponentName(Super.options);
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps(Sub);
    }
    if (Sub.options.computed) {
      initComputed(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES.forEach(function(type) {
      Sub[type] = Super[type];
    });
    if (name) {
      Sub.options.components[name] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend$2({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps(Comp) {
  var props2 = Comp.options.props;
  for (var key in props2) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue2) {
  ASSET_TYPES.forEach(function(type) {
    Vue2[type] = function(id2, definition2) {
      if (!definition2) {
        return this.options[type + "s"][id2];
      } else {
        if (type === "component" && isPlainObject$3(definition2)) {
          definition2.name = definition2.name || id2;
          definition2 = this.options._base.extend(definition2);
        }
        if (type === "directive" && isFunction$1(definition2)) {
          definition2 = { bind: definition2, update: definition2 };
        }
        this.options[type + "s"][id2] = definition2;
        return definition2;
      }
    };
  });
}
function _getComponentName(opts2) {
  return opts2 && (getComponentName(opts2.Ctor.options) || opts2.tag);
}
function matches(pattern, name) {
  if (isArray$2(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache, keys3 = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var entry = cache[key];
    if (entry) {
      var name_1 = entry.name;
      if (name_1 && !filter(name_1)) {
        pruneCacheEntry(cache, key, keys3, _vnode);
      }
    }
  }
}
function pruneCacheEntry(cache, key, keys3, current) {
  var entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove$2(keys3, key);
}
var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function() {
      var _a2 = this, cache = _a2.cache, keys3 = _a2.keys, vnodeToCache = _a2.vnodeToCache, keyToCache = _a2.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance
        };
        keys3.push(keyToCache);
        if (this.max && keys3.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys3[0], keys3, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed: function() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function() {
    var _this = this;
    this.cacheVNode();
    this.$watch("include", function(val) {
      pruneCache(_this, function(name) {
        return matches(val, name);
      });
    });
    this.$watch("exclude", function(val) {
      pruneCache(_this, function(name) {
        return !matches(val, name);
      });
    });
  },
  updated: function() {
    this.cacheVNode();
  },
  render: function() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      var name_2 = _getComponentName(componentOptions);
      var _a2 = this, include = _a2.include, exclude = _a2.exclude;
      if (include && (!name_2 || !matches(include, name_2)) || exclude && name_2 && matches(exclude, name_2)) {
        return vnode;
      }
      var _b = this, cache = _b.cache, keys3 = _b.keys;
      var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "") : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove$2(keys3, key);
        keys3.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive
};
function initGlobalAPI(Vue2) {
  var configDef = {};
  configDef.get = function() {
    return config;
  };
  Object.defineProperty(Vue2, "config", configDef);
  Vue2.util = {
    warn,
    extend: extend$2,
    mergeOptions,
    defineReactive
  };
  Vue2.set = set$1;
  Vue2.delete = del;
  Vue2.nextTick = nextTick;
  Vue2.observable = function(obj) {
    observe(obj);
    return obj;
  };
  Vue2.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES.forEach(function(type) {
    Vue2.options[type + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue2.options._base = Vue2;
  extend$2(Vue2.options.components, builtInComponents);
  initUse(Vue2);
  initMixin(Vue2);
  initExtend(Vue2);
  initAssetRegisters(Vue2);
}
initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get: function() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});
Vue.version = version$1;
var isReservedAttr = makeMap("style,class");
var acceptValue = makeMap("input,textarea,option,select,progress");
var mustUseProp = function(tag, type, attr) {
  return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
var convertEnumeratedValue = function(key, value) {
  return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
};
var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
var xlinkNS = "http://www.w3.org/1999/xlink";
var isXlink = function(name) {
  return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
};
var getXlinkProp = function(name) {
  return isXlink(name) ? name.slice(6, name.length) : "";
};
var isFalsyAttrValue = function(val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data2 = vnode.data;
  var parentNode2 = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data2 = mergeClassData(childNode.data, data2);
    }
  }
  while (isDef(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data2 = mergeClassData(data2, parentNode2.data);
    }
  }
  return renderClass(data2.staticClass, data2.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat$2(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat$2(staticClass, stringifyClass(dynamicClass));
  }
  return "";
}
function concat$2(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject$7(value)) {
    return stringifyObject(value);
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
}
function stringifyArray(value) {
  var res = "";
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
      if (res)
        res += " ";
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value) {
  var res = "";
  for (var key in value) {
    if (value[key]) {
      if (res)
        res += " ";
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
var isReservedTag = function(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
var unknownElementCache = /* @__PURE__ */ Object.create(null);
function isUnknownElement(tag) {
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");
function query(el) {
  if (typeof el === "string") {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement$2(tagName2, vnode) {
  var elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS(namespace, tagName2) {
  return document.createElementNS(namespaceMap[namespace], tagName2);
}
function createTextNode(text2) {
  return document.createTextNode(text2);
}
function createComment(text2) {
  return document.createComment(text2);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text2) {
  node.textContent = text2;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createElement: createElement$2,
  createElementNS,
  createTextNode,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  setStyleScope
});
var ref = {
  create: function(_, vnode) {
    registerRef(vnode);
  },
  update: function(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function(vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var ref2 = vnode.data.ref;
  if (!isDef(ref2))
    return;
  var vm = vnode.context;
  var refValue = vnode.componentInstance || vnode.elm;
  var value = isRemoval ? null : refValue;
  var $refsValue = isRemoval ? void 0 : refValue;
  if (isFunction$1(ref2)) {
    invokeWithErrorHandling(ref2, vm, [value], vm, "template ref function");
    return;
  }
  var isFor = vnode.data.refInFor;
  var _isString = typeof ref2 === "string" || typeof ref2 === "number";
  var _isRef = isRef(ref2);
  var refs = vm.$refs;
  if (_isString || _isRef) {
    if (isFor) {
      var existing = _isString ? refs[ref2] : ref2.value;
      if (isRemoval) {
        isArray$2(existing) && remove$2(existing, refValue);
      } else {
        if (!isArray$2(existing)) {
          if (_isString) {
            refs[ref2] = [refValue];
            setSetupRef(vm, ref2, refs[ref2]);
          } else {
            ref2.value = [refValue];
          }
        } else if (!existing.includes(refValue)) {
          existing.push(refValue);
        }
      }
    } else if (_isString) {
      if (isRemoval && refs[ref2] !== refValue) {
        return;
      }
      refs[ref2] = $refsValue;
      setSetupRef(vm, ref2, value);
    } else if (_isRef) {
      if (isRemoval && ref2.value !== refValue) {
        return;
      }
      ref2.value = value;
    } else
      ;
  }
}
function setSetupRef(_a2, key, val) {
  var _setupState = _a2._setupState;
  if (_setupState && hasOwn$8(_setupState, key)) {
    if (isRef(_setupState[key])) {
      _setupState[key].value = val;
    } else {
      _setupState[key] = val;
    }
  }
}
var emptyNode = new VNode("", {}, []);
var hooks = ["create", "activate", "update", "remove", "destroy"];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== "input")
    return true;
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key))
      map[key] = i;
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules2 = backend.modules, nodeOps2 = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef(modules2[j][hooks[i]])) {
        cbs[hooks[i]].push(modules2[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners) {
    function remove2() {
      if (--remove2.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove2.listeners = listeners;
    return remove2;
  }
  function removeNode(el) {
    var parent = nodeOps2.parentNode(el);
    if (isDef(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data2 = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data2)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2 = vnode.data;
    if (isDef(i2)) {
      var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
      if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
        i2(vnode, false);
      }
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2;
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert(parentElm, vnode.elm, refElm);
  }
  function insert(parent, elm, ref2) {
    if (isDef(parent)) {
      if (isDef(ref2)) {
        if (nodeOps2.parentNode(ref2) === parent) {
          nodeOps2.insertBefore(parent, elm, ref2);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children, insertedVnodeQueue) {
    if (isArray$2(children)) {
      for (var i_1 = 0; i_1 < children.length; ++i_1) {
        createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
      cbs.create[i_2](emptyNode, vnode);
    }
    i = vnode.data.hook;
    if (isDef(i)) {
      if (isDef(i.create))
        i.create(emptyNode, vnode);
      if (isDef(i.insert))
        insertedVnodeQueue.push(vnode);
    }
  }
  function setScope(vnode) {
    var i2;
    if (isDef(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i2, j2;
    var data2 = vnode.data;
    if (isDef(data2)) {
      if (isDef(i2 = data2.hook) && isDef(i2 = i2.destroy))
        i2(vnode);
      for (i2 = 0; i2 < cbs.destroy.length; ++i2)
        cbs.destroy[i2](vnode);
    }
    if (isDef(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i_3;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        rm.listeners += listeners;
      } else {
        rm = createRmCb(vnode.elm, listeners);
      }
      if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
        removeAndInvokeRemoveHook(i_3, rm);
      }
      for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
        cbs.remove[i_3](vnode, rm);
      }
      if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
        i_3(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    var canMove = !removeOnly;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx))
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function findIdxInOld(node, oldCh, start, end) {
    for (var i_5 = start; i_5 < end; i_5++) {
      var c = oldCh[i_5];
      if (isDef(c) && sameVnode(node, c))
        return i_5;
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i2;
    var data2 = vnode.data;
    if (isDef(data2) && isDef(i2 = data2.hook) && isDef(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data2) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2)
        cbs.update[i2](oldVnode, vnode);
      if (isDef(i2 = data2.hook) && isDef(i2 = i2.update))
        i2(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text))
          nodeOps2.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef(data2)) {
      if (isDef(i2 = data2.hook) && isDef(i2 = i2.postpatch))
        i2(oldVnode, vnode);
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (var i_6 = 0; i_6 < queue2.length; ++i_6) {
        queue2[i_6].data.hook.insert(queue2[i_6]);
      }
    }
  }
  var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i2;
    var tag = vnode.tag, data2 = vnode.data, children = vnode.children;
    inVPre = inVPre || data2 && data2.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    if (isDef(data2)) {
      if (isDef(i2 = data2.hook) && isDef(i2 = i2.init))
        i2(vnode, true);
      if (isDef(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          if (isDef(i2 = data2) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              return false;
            }
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i_7 = 0; i_7 < children.length; i_7++) {
              if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              return false;
            }
          }
        }
      }
      if (isDef(data2)) {
        var fullInvoke = false;
        for (var key in data2) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data2["class"]) {
          traverse(data2["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode))
        invokeDestroyHook(oldVnode);
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps2.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps2.nextSibling(oldElm)
        );
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                cbs.create[i_9](emptyNode, ancestor);
              }
              var insert_1 = ancestor.data.hook.insert;
              if (insert_1.merged) {
                for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                  insert_1.fns[i_10]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, "postpatch", function() {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = /* @__PURE__ */ Object.create(null);
function normalizeDirectives(dirs, vm) {
  var res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    if (vm._setupState && vm._setupState.__sfc) {
      dir.def = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
    }
    dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name);
  }
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
    }
  }
}
var baseModules = [ref, directives];
function updateAttrs(oldVnode, vnode) {
  var opts2 = vnode.componentOptions;
  if (isDef(opts2) && opts2.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs2 = vnode.data.attrs || {};
  if (isDef(attrs2.__ob__) || isTrue(attrs2._v_attr_proxy)) {
    attrs2 = vnode.data.attrs = extend$2({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
    setAttr(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs2[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}
function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
      var blocker_1 = function(e) {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker_1);
      };
      el.addEventListener("input", blocker_1);
      el.__ieph = true;
    }
    el.setAttribute(key, value);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data2 = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data2.staticClass) && isUndef(data2.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat$2(cls, stringifyClass(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass = {
  create: updateClass,
  update: updateClass
};
var RANGE_TOKEN = "__r";
var CHECKBOX_RADIO_TOKEN = "__c";
function normalizeEvents(on) {
  if (isDef(on[RANGE_TOKEN])) {
    var event_1 = isIE ? "change" : "input";
    on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}
var target;
function createOnceHandler(event, handler, capture) {
  var _target = target;
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove(event, onceHandler, capture, _target);
    }
  };
}
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name, handler, capture, passive) {
  if (useMicrotaskFix) {
    var attachedTimestamp_1 = currentFlushTimestamp;
    var original_1 = handler;
    handler = original_1._wrapper = function(e) {
      if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp_1 || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
        return original_1.apply(this, arguments);
      }
    };
  }
  target.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
}
function remove(name, handler, capture, _target) {
  (_target || target).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target = vnode.elm || oldVnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
  target = void 0;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners,
  destroy: function(vnode) {
    return updateDOMListeners(vnode, emptyNode);
  }
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props2 = vnode.data.domProps || {};
  if (isDef(props2.__ob__) || isTrue(props2._v_attr_proxy)) {
    props2 = vnode.data.domProps = extend$2({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children)
        vnode.children.length = 0;
      if (cur === oldProps[key])
        continue;
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      var strCur = isUndef(cur) ? "" : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      svgContainer = svgContainer || document.createElement("div");
      svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
      var svg2 = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg2.firstChild) {
        elm.appendChild(svg2.firstChild);
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}
function isNotInFocusAndDirty(elm, checkVal) {
  var notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers;
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData(data2) {
  var style2 = normalizeStyleBinding(data2.style);
  return data2.staticStyle ? extend$2(data2.staticStyle, style2) : style2;
}
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject$3(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend$2(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend$2(res, styleData);
  }
  var parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
      extend$2(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function(el, name, val) {
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
  } else {
    var normalizedName = normalize$3(name);
    if (Array.isArray(val)) {
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ["Webkit", "Moz", "ms"];
var emptyStyle;
var normalize$3 = cached(function(prop) {
  emptyStyle = emptyStyle || document.createElement("div").style;
  prop = camelize(prop);
  if (prop !== "filter" && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name_1 = vendorNames[i] + capName;
    if (name_1 in emptyStyle) {
      return name_1;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data2 = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data2.staticStyle) && isUndef(data2.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style2 = normalizeStyleBinding(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend$2({}, style2) : style2;
  var newStyle = getStyle(vnode, true);
  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, "");
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      setProp(el, name, cur == null ? "" : cur);
    }
  }
}
var style = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE = /\s+/;
function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    var tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition(def2) {
  if (!def2) {
    return;
  }
  if (typeof def2 === "object") {
    var res = {};
    if (def2.css !== false) {
      extend$2(res, autoCssTransition(def2.name || "v"));
    }
    extend$2(res, def2);
    return res;
  } else if (typeof def2 === "string") {
    return autoCssTransition(def2);
  }
}
var autoCssTransition = cached(function(name) {
  return {
    enterClass: "".concat(name, "-enter"),
    enterToClass: "".concat(name, "-enter-to"),
    enterActiveClass: "".concat(name, "-enter-active"),
    leaveClass: "".concat(name, "-leave"),
    leaveToClass: "".concat(name, "-leave-to"),
    leaveActiveClass: "".concat(name, "-leave-active")
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = "transition";
var ANIMATION = "animation";
var transitionProp = "transition";
var transitionEndEvent = "transitionend";
var animationProp = "animation";
var animationEndEvent = "animationend";
if (hasTransition) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp = "WebkitTransition";
    transitionEndEvent = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp = "WebkitAnimation";
    animationEndEvent = "webkitAnimationEnd";
  }
}
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
  return fn();
};
function nextFrame(fn) {
  raf(function() {
    raf(fn);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove$2(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var _a2 = getTransitionInfo(el, expectedType), type = _a2.type, timeout = _a2.timeout, propCount = _a2.propCount;
  if (!type)
    return cb();
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function() {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
  var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
  var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function(d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data2 = resolveTransition(vnode.data.transition);
  if (isUndef(data2)) {
    return;
  }
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data2.css, type = data2.type, enterClass = data2.enterClass, enterToClass = data2.enterToClass, enterActiveClass = data2.enterActiveClass, appearClass = data2.appearClass, appearToClass = data2.appearToClass, appearActiveClass = data2.appearActiveClass, beforeEnter = data2.beforeEnter, enter2 = data2.enter, afterEnter = data2.afterEnter, enterCancelled = data2.enterCancelled, beforeAppear = data2.beforeAppear, appear = data2.appear, afterAppear = data2.afterAppear, appearCancelled = data2.appearCancelled, duration = data2.duration;
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? isFunction$1(appear) ? appear : enter2 : enter2;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject$7(duration) ? duration.enter : duration);
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function() {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook(vnode, "insert", function() {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function() {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data2 = resolveTransition(vnode.data.transition);
  if (isUndef(data2) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef(el._leaveCb)) {
    return;
  }
  var css = data2.css, type = data2.type, leaveClass = data2.leaveClass, leaveToClass = data2.leaveToClass, leaveActiveClass = data2.leaveActiveClass, beforeLeave = data2.beforeLeave, leave2 = data2.leave, afterLeave = data2.afterLeave, leaveCancelled = data2.leaveCancelled, delayLeave = data2.delayLeave, duration = data2.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave2);
  var explicitLeaveDuration = toNumber(isObject$7(duration) ? duration.leave : duration);
  var cb = el._leaveCb = once(function() {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function() {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function isValidDuration(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps, modules });
if (isIE9) {
  document.addEventListener("selectionchange", function() {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, "input");
    }
  });
}
var directive = {
  inserted: function(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, "postpatch", function() {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart);
        el.addEventListener("compositionend", onCompositionEnd);
        el.addEventListener("change", onCompositionEnd);
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected(el, binding, vnode.context);
      var prevOptions_1 = el._vOptions;
      var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions_1.some(function(o, i) {
        return !looseEqual(o, prevOptions_1[i]);
      })) {
        var needReset = el.multiple ? binding.value.some(function(v) {
          return hasNoMatchingOption(v, curOptions_1);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
        if (needReset) {
          trigger(el, "change");
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding);
  if (isIE || isEdge) {
    setTimeout(function() {
      actuallySetSelected(el, binding);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value, options) {
  return options.every(function(o) {
    return !looseEqual(o, value);
  });
}
function getValue(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  if (!e.target.composing)
    return;
  e.target.composing = false;
  trigger(e.target, "input");
}
function trigger(el, type) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function(el, _a2, vnode) {
    var value = _a2.value;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value && transition2) {
      vnode.data.show = true;
      enter(vnode, function() {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : "none";
    }
  },
  update: function(el, _a2, vnode) {
    var value = _a2.value, oldValue = _a2.oldValue;
    if (!value === !oldValue)
      return;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    if (transition2) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function() {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function() {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : "none";
    }
  },
  unbind: function(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show
};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data2 = {};
  var options = comp.$options;
  for (var key in options.propsData) {
    data2[key] = comp[key];
  }
  var listeners = options._parentListeners;
  for (var key in listeners) {
    data2[camelize(key)] = listeners[key];
  }
  return data2;
}
function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function(c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function(d) {
  return d.name === "show";
};
var Transition = {
  name: "transition",
  props: transitionProps,
  abstract: true,
  render: function(h) {
    var _this = this;
    var children = this.$slots.default;
    if (!children) {
      return;
    }
    children = children.filter(isNotTextNode);
    if (!children.length) {
      return;
    }
    var mode = this.mode;
    var rawChild = children[0];
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    var child = getRealChild(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    var id2 = "__transition-".concat(this._uid, "-");
    child.key = child.key == null ? child.isComment ? id2 + "comment" : id2 + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id2) === 0 ? child.key : id2 + child.key : child.key;
    var data2 = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      var oldData = oldChild.data.transition = extend$2({}, data2);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", function() {
          _this._leaving = false;
          _this.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave_1;
        var performLeave = function() {
          delayedLeave_1();
        };
        mergeVNodeHook(data2, "afterEnter", performLeave);
        mergeVNodeHook(data2, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", function(leave2) {
          delayedLeave_1 = leave2;
        });
      }
    }
    return rawChild;
  }
};
var props = extend$2({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props,
  beforeMount: function() {
    var _this = this;
    var update = this._update;
    this._update = function(vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(_this);
      _this.__patch__(
        _this._vnode,
        _this.kept,
        false,
        true
      );
      _this._vnode = _this.kept;
      restoreActiveInstance();
      update.call(_this, vnode, hydrating);
    };
  },
  render: function(h) {
    var tag = this.tag || this.$vnode.data.tag || "span";
    var map = /* @__PURE__ */ Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i = 0; i < prevChildren.length; i++) {
        var c = prevChildren[i];
        c.data.transition = transitionData;
        c.data.pos = c.elm.getBoundingClientRect();
        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children);
  },
  updated: function() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);
    this._reflow = document.body.offsetHeight;
    children.forEach(function(c) {
      if (c.data.moved) {
        var el_1 = c.elm;
        var s = el_1.style;
        addTransitionClass(el_1, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
          if (e && e.target !== el_1) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el_1.removeEventListener(transitionEndEvent, cb);
            el_1._moveCb = null;
            removeTransitionClass(el_1, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function(el, moveClass) {
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function(cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = "none";
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = "0s";
  }
}
var platformComponents = {
  Transition,
  TransitionGroup
};
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
extend$2(Vue.options.directives, platformDirectives);
extend$2(Vue.options.components, platformComponents);
Vue.prototype.__patch__ = inBrowser ? patch : noop;
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : void 0;
  return mountComponent(this, el, hydrating);
};
if (inBrowser) {
  setTimeout(function() {
    if (config.devtools) {
      if (devtools) {
        devtools.emit("init", Vue);
      }
    }
  }, 0);
}
const html$5 = `<h1>Vue component for rich content strings</h1>
<p><a href="https://www.npmjs.com/package/@nextcloud/vue-richtext"><img src="https://img.shields.io/npm/v/@nextcloud/vue-richtext.svg?style=flat-square" alt="npm last version"></a> <a href="https://dependabot.com"><img src="https://img.shields.io/badge/Dependabot-enabled-brightgreen.svg?longCache=true&amp;style=flat-square&amp;logo=dependabot" alt="Dependabot status"></a></p>
<p>This library provides a simple vue component to render text with rich placeholder replacements.
The parameters that are replaced can either be a string or an object that allows rendering any Vue component into the text.
Placeholders are wrapped in brackets, like <code>{placeholder}</code>.
Markdown can be used for basic text formatting.</p>
<h2>Installation</h2>
<pre><code class="language-sh">npm install --save @nextcloud/vue-richtext
</code></pre>
<h2>Usage</h2>
<h3>Importing the vue component</h3>
<pre><code>import { RichText } from '@nextcloud/vue-richtext'
</code></pre>
<h3>Importing the shipped stylesheets</h3>
<pre><code>@import '@nextcloud/vue-richtext/dist/style.css';

</code></pre>
<h2>Basic usage with simple text placeholders</h2>
<ul>
<li>Input string: <code>The file {file} was added\u2026</code></li>
<li>Arguments:
<ul>
<li>file: <code>'MyDocument'</code></li>
</ul>
</li>
<li>Renders: <code>The file 'MyDocument' was added\u2026</code></li>
</ul>
<h3>Example usage:</h3>
<pre><code>&lt;template&gt;
	&lt;RichText :text=&quot;text&quot; :arguments=&quot;args&quot; /&gt;
&lt;/template&gt;

&lt;script&gt;
import RichText from '@nextcloud/vue-richtext'
import UserBubble from './UserBubble'

export default {
    name: 'RichTextDemo',
	components: {
		RichText,
	},
    data: () =&gt; {
        return {
            text: 'The file {file} was added by {username}',
            args: {
                file: 'MyDocument.odt',
                username: {
                    component: UserBubble,
                    props: {
                        user: 'Jane Doe'
                    }
                }
            }
        }
    }
}
&lt;/script&gt;
</code></pre>
<h4>UserBubble.vue</h4>
<pre><code>&lt;template&gt;
    &lt;span class=&quot;user&quot;&gt;{{ user }}&lt;/span&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
	name: 'UserBubble',
	props: {
		user: {
			type: String,
			default: ''
		}
	}
}
&lt;/script&gt;

&lt;style scoped&gt;
.user {
	border-radius: 3px;
	background-color: #eee;
	padding: 3px;
}
&lt;/style&gt;
</code></pre>
<h2>Usage with vue components</h2>
<ul>
<li>Input string: <code>The file {file} was added by {username}</code></li>
<li>Arguments:
<ul>
<li>file: <code>'MyDocument'</code></li>
<li>username: <code>{ component: UserBubble, props: { username: 'Jane Doe' }</code></li>
</ul>
</li>
<li>Renders: <code>The file 'MyDocument' was added by &lt;UserBubble&gt;Jane Doe&lt;/UserBubble&gt;</code></li>
</ul>
<h2>Usage with markdown</h2>
<ul>
<li>Input string: <code>The **file** *{file}* was added by {username}</code></li>
<li>Arguments:
<ul>
<li>file: <code>'MyDocument'</code></li>
<li>username: <code>{ component: UserBubble, props: { username: 'Jane Doe' }</code></li>
</ul>
</li>
<li>Renders: <code>The &lt;strong&gt;file&lt;/strong&gt; &lt;i&gt;'MyDocument'&lt;/i&gt; was added by &lt;UserBubble&gt;Jane Doe&lt;/UserBubble&gt;</code></li>
</ul>
<h2>Reference rendering</h2>
<h2>Documentation</h2>
<p>A full example is shown in the <a href="https://nextcloud.github.io/vue-richtext/">documentation</a></p>
`;
function bail(error) {
  if (error) {
    throw error;
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer$2 = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
};
var hasOwn$7 = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty$2 = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray$1 = function isArray(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === "[object Array]";
};
var isPlainObject$2 = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== "[object Object]") {
    return false;
  }
  var hasOwnConstructor = hasOwn$7.call(obj, "constructor");
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn$7.call(obj.constructor.prototype, "isPrototypeOf");
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  var key;
  for (key in obj) {
  }
  return typeof key === "undefined" || hasOwn$7.call(obj, key);
};
var setProperty = function setProperty2(target2, options) {
  if (defineProperty$2 && options.name === "__proto__") {
    defineProperty$2(target2, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target2[options.name] = options.newValue;
  }
};
var getProperty = function getProperty2(obj, name) {
  if (name === "__proto__") {
    if (!hasOwn$7.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      return gOPD(obj, name).value;
    }
  }
  return obj[name];
};
var extend$1 = function extend() {
  var options, name, src, copy, copyIsArray, clone;
  var target2 = arguments[0];
  var i = 1;
  var length = arguments.length;
  var deep = false;
  if (typeof target2 === "boolean") {
    deep = target2;
    target2 = arguments[1] || {};
    i = 2;
  }
  if (target2 == null || typeof target2 !== "object" && typeof target2 !== "function") {
    target2 = {};
  }
  for (; i < length; ++i) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        src = getProperty(target2, name);
        copy = getProperty(options, name);
        if (target2 !== copy) {
          if (deep && copy && (isPlainObject$2(copy) || (copyIsArray = isArray$1(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray$1(src) ? src : [];
            } else {
              clone = src && isPlainObject$2(src) ? src : {};
            }
            setProperty(target2, { name, newValue: extend(deep, clone, copy) });
          } else if (typeof copy !== "undefined") {
            setProperty(target2, { name, newValue: copy });
          }
        }
      }
    }
  }
  return target2;
};
function isPlainObject$1(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype2 = Object.getPrototypeOf(value);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function trough() {
  const fns = [];
  const pipeline = { run, use: use2 };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap$1(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use2(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap$1(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = error;
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer$1 = function isBuffer2(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
};
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point$1(value);
  }
  return "";
}
function point$1(point2) {
  return index(point2 && point2.line) + ":" + index(point2 && point2.column);
}
function position(pos) {
  return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}
class VFileMessage extends Error {
  constructor(reason, place, origin) {
    const parts = [null, null];
    let position2 = {
      start: { line: null, column: null },
      end: { line: null, column: null }
    };
    super();
    if (typeof place === "string") {
      origin = place;
      place = void 0;
    }
    if (typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        parts[1] = origin;
      } else {
        parts[0] = origin.slice(0, index2);
        parts[1] = origin.slice(index2 + 1);
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position2 = place.position;
        }
      } else if ("start" in place || "end" in place) {
        position2 = place;
      } else if ("line" in place || "column" in place) {
        position2.start = place;
      }
    }
    this.name = stringifyPosition(place) || "1:1";
    this.message = typeof reason === "object" ? reason.message : reason;
    this.stack = typeof reason === "object" ? reason.stack : "";
    this.reason = this.message;
    this.fatal;
    this.line = position2.start.line;
    this.column = position2.start.column;
    this.source = parts[0];
    this.ruleId = parts[1];
    this.position = position2;
    this.actual;
    this.expected;
    this.file;
    this.url;
    this.note;
  }
}
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.fatal = null;
VFileMessage.prototype.column = null;
VFileMessage.prototype.line = null;
VFileMessage.prototype.source = null;
VFileMessage.prototype.ruleId = null;
VFileMessage.prototype.position = null;
const path = { basename, dirname, extname, join, sep: "/" };
function basename(path2, ext) {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath$1(path2);
  let start = 0;
  let end = -1;
  let index2 = path2.length;
  let seenNonSlash;
  if (ext === void 0 || ext.length === 0 || ext.length > path2.length) {
    while (index2--) {
      if (path2.charCodeAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else if (end < 0) {
        seenNonSlash = true;
        end = index2 + 1;
      }
    }
    return end < 0 ? "" : path2.slice(start, end);
  }
  if (ext === path2) {
    return "";
  }
  let firstNonSlashEnd = -1;
  let extIndex = ext.length - 1;
  while (index2--) {
    if (path2.charCodeAt(index2) === 47) {
      if (seenNonSlash) {
        start = index2 + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index2 + 1;
      }
      if (extIndex > -1) {
        if (path2.charCodeAt(index2) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            end = index2;
          }
        } else {
          extIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }
  if (start === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path2.length;
  }
  return path2.slice(start, end);
}
function dirname(path2) {
  assertPath$1(path2);
  if (path2.length === 0) {
    return ".";
  }
  let end = -1;
  let index2 = path2.length;
  let unmatchedSlash;
  while (--index2) {
    if (path2.charCodeAt(index2) === 47) {
      if (unmatchedSlash) {
        end = index2;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end < 0 ? path2.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path2.charCodeAt(0) === 47 ? "//" : path2.slice(0, end);
}
function extname(path2) {
  assertPath$1(path2);
  let index2 = path2.length;
  let end = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index2--) {
    const code2 = path2.charCodeAt(index2);
    if (code2 === 47) {
      if (unmatchedSlash) {
        startPart = index2 + 1;
        break;
      }
      continue;
    }
    if (end < 0) {
      unmatchedSlash = true;
      end = index2 + 1;
    }
    if (code2 === 46) {
      if (startDot < 0) {
        startDot = index2;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path2.slice(startDot, end);
}
function join(...segments) {
  let index2 = -1;
  let joined;
  while (++index2 < segments.length) {
    assertPath$1(segments[index2]);
    if (segments[index2]) {
      joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
    }
  }
  return joined === void 0 ? "." : normalize$2(joined);
}
function normalize$2(path2) {
  assertPath$1(path2);
  const absolute = path2.charCodeAt(0) === 47;
  let value = normalizeString(path2, !absolute);
  if (value.length === 0 && !absolute) {
    value = ".";
  }
  if (value.length > 0 && path2.charCodeAt(path2.length - 1) === 47) {
    value += "/";
  }
  return absolute ? "/" + value : value;
}
function normalizeString(path2, allowAboveRoot) {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index2 = -1;
  let code2;
  let lastSlashIndex;
  while (++index2 <= path2.length) {
    if (index2 < path2.length) {
      code2 = path2.charCodeAt(index2);
    } else if (code2 === 47) {
      break;
    } else {
      code2 = 47;
    }
    if (code2 === 47) {
      if (lastSlash === index2 - 1 || dots === 1)
        ;
      else if (lastSlash !== index2 - 1 && dots === 2) {
        if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = index2;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path2.slice(lastSlash + 1, index2);
        } else {
          result = path2.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (code2 === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath$1(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(path2)
    );
  }
}
const proc = { cwd };
function cwd() {
  return "/";
}
function isUrl(fileURLOrPath) {
  return fileURLOrPath !== null && typeof fileURLOrPath === "object" && fileURLOrPath.href && fileURLOrPath.origin;
}
function urlToPath(path2) {
  if (typeof path2 === "string") {
    path2 = new URL(path2);
  } else if (!isUrl(path2)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`"
    );
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  if (path2.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file");
    error.code = "ERR_INVALID_URL_SCHEME";
    throw error;
  }
  return getPathFromURLPosix(path2);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    error.code = "ERR_INVALID_FILE_URL_HOST";
    throw error;
  }
  const pathname = url.pathname;
  let index2 = -1;
  while (++index2 < pathname.length) {
    if (pathname.charCodeAt(index2) === 37 && pathname.charCodeAt(index2 + 1) === 50) {
      const third = pathname.charCodeAt(index2 + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError(
          "File URL path must not include encoded / characters"
        );
        error.code = "ERR_INVALID_FILE_URL_PATH";
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}
const order = ["history", "path", "basename", "stem", "extname", "dirname"];
class VFile {
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (typeof value === "string" || isBuffer$1(value)) {
      options = { value };
    } else if (isUrl(value)) {
      options = { path: value };
    } else {
      options = value;
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = proc.cwd();
    this.value;
    this.stored;
    this.result;
    this.map;
    let index2 = -1;
    while (++index2 < order.length) {
      const prop2 = order[index2];
      if (prop2 in options && options[prop2] !== void 0) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
      }
    }
    let prop;
    for (prop in options) {
      if (!order.includes(prop))
        this[prop] = options[prop];
    }
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(path2) {
    if (isUrl(path2)) {
      path2 = urlToPath(path2);
    }
    assertNonEmpty(path2, "path");
    if (this.path !== path2) {
      this.history.push(path2);
    }
  }
  get dirname() {
    return typeof this.path === "string" ? path.dirname(this.path) : void 0;
  }
  set dirname(dirname2) {
    assertPath(this.basename, "dirname");
    this.path = path.join(dirname2 || "", this.basename);
  }
  get basename() {
    return typeof this.path === "string" ? path.basename(this.path) : void 0;
  }
  set basename(basename2) {
    assertNonEmpty(basename2, "basename");
    assertPart(basename2, "basename");
    this.path = path.join(this.dirname || "", basename2);
  }
  get extname() {
    return typeof this.path === "string" ? path.extname(this.path) : void 0;
  }
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath(this.dirname, "extname");
    if (extname2) {
      if (extname2.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = path.join(this.dirname, this.stem + (extname2 || ""));
  }
  get stem() {
    return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
  }
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = path.join(this.dirname || "", stem + (this.extname || ""));
  }
  toString(encoding) {
    return (this.value || "").toString(encoding);
  }
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin);
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  info(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = null;
    return message;
  }
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = true;
    throw message;
  }
}
function assertPart(part, name) {
  if (part && part.includes(path.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + path.sep + "`"
    );
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath(path2, name) {
  if (!path2) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}
const unified = base().freeze();
const own$7 = {}.hasOwnProperty;
function base() {
  const transformers = trough();
  const attachers = [];
  let namespace = {};
  let frozen;
  let freezeIndex = -1;
  processor.data = data2;
  processor.Parser = void 0;
  processor.Compiler = void 0;
  processor.freeze = freeze;
  processor.attachers = attachers;
  processor.use = use2;
  processor.parse = parse2;
  processor.stringify = stringify2;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process2;
  processor.processSync = processSync;
  return processor;
  function processor() {
    const destination = base();
    let index2 = -1;
    while (++index2 < attachers.length) {
      destination.use(...attachers[index2]);
    }
    destination.data(extend$1(true, {}, namespace));
    return destination;
  }
  function data2(key, value) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen);
        namespace[key] = value;
        return processor;
      }
      return own$7.call(namespace, key) && namespace[key] || null;
    }
    if (key) {
      assertUnfrozen("data", frozen);
      namespace = key;
      return processor;
    }
    return namespace;
  }
  function freeze() {
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(processor, ...options);
      if (typeof transformer === "function") {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Number.POSITIVE_INFINITY;
    return processor;
  }
  function use2(value, ...options) {
    let settings;
    assertUnfrozen("use", frozen);
    if (value === null || value === void 0)
      ;
    else if (typeof value === "function") {
      addPlugin(value, ...options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings);
    }
    return processor;
    function add2(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...options2] = value2;
          addPlugin(plugin, ...options2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0)
        ;
      else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add2(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, value2) {
      let index2 = -1;
      let entry;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entry = attachers[index2];
          break;
        }
      }
      if (entry) {
        if (isPlainObject$1(entry[1]) && isPlainObject$1(value2)) {
          value2 = extend$1(true, entry[1], value2);
        }
        entry[1] = value2;
      } else {
        attachers.push([...arguments]);
      }
    }
  }
  function parse2(doc) {
    processor.freeze();
    const file = vfile(doc);
    const Parser = processor.Parser;
    assertParser("parse", Parser);
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file);
  }
  function stringify2(node, doc) {
    processor.freeze();
    const file = vfile(doc);
    const Compiler = processor.Compiler;
    assertCompiler("stringify", Compiler);
    assertNode(node);
    if (newable(Compiler, "compile")) {
      return new Compiler(node, file).compile();
    }
    return Compiler(node, file);
  }
  function run(node, doc, callback) {
    assertNode(node);
    processor.freeze();
    if (!callback && typeof doc === "function") {
      callback = doc;
      doc = void 0;
    }
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      transformers.run(node, vfile(doc), done);
      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          callback(null, tree, file);
        }
      }
    }
  }
  function runSync(node, file) {
    let result;
    let complete;
    processor.run(node, file, done);
    assertDone("runSync", "run", complete);
    return result;
    function done(error, tree) {
      bail(error);
      result = tree;
      complete = true;
    }
  }
  function process2(doc, callback) {
    processor.freeze();
    assertParser("process", processor.Parser);
    assertCompiler("process", processor.Compiler);
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      const file = vfile(doc);
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error);
        } else {
          const result = processor.stringify(tree, file2);
          if (result === void 0 || result === null)
            ;
          else if (looksLikeAVFileValue(result)) {
            file2.value = result;
          } else {
            file2.result = result;
          }
          done(error, file2);
        }
      });
      function done(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          callback(null, file2);
        }
      }
    }
  }
  function processSync(doc) {
    let complete;
    processor.freeze();
    assertParser("processSync", processor.Parser);
    assertCompiler("processSync", processor.Compiler);
    const file = vfile(doc);
    processor.process(file, done);
    assertDone("processSync", "process", complete);
    return file;
    function done(error) {
      complete = true;
      bail(error);
    }
  }
}
function newable(value, name) {
  return typeof value === "function" && value.prototype && (keys$1(value.prototype) || name in value.prototype);
}
function keys$1(value) {
  let key;
  for (key in value) {
    if (own$7.call(value, key)) {
      return true;
    }
  }
  return false;
}
function assertParser(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Parser`");
  }
}
function assertCompiler(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Compiler`");
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node) {
  if (!isPlainObject$1(node) || typeof node.type !== "string") {
    throw new TypeError("Expected node, got `" + node + "`");
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAVFileValue(value) {
  return typeof value === "string" || isBuffer$2(value);
}
if (!window._vue_richtext_widgets) {
  window._vue_richtext_widgets = {};
}
const isWidgetRegistered = (id2) => {
  return !!window._vue_richtext_widgets[id2];
};
const registerWidget = (id2, callback, onDestroy = (el) => {
}) => {
  if (window._vue_richtext_widgets[id2]) {
    console.error("Widget for id " + id2 + " already registered");
    return;
  }
  window._vue_richtext_widgets[id2] = {
    id: id2,
    callback,
    onDestroy
  };
};
const renderWidget = (el, { richObjectType, richObject, accessible }) => {
  if (richObjectType === "open-graph") {
    return;
  }
  if (!window._vue_richtext_widgets[richObjectType]) {
    console.error("Widget for rich object type " + richObjectType + " not registered");
    return;
  }
  window._vue_richtext_widgets[richObjectType].callback(el, { richObjectType, richObject, accessible });
};
const destroyWidget = (richObjectType, el) => {
  if (richObjectType === "open-graph") {
    return;
  }
  if (!window._vue_richtext_widgets[richObjectType]) {
    return;
  }
  window._vue_richtext_widgets[richObjectType].onDestroy(el);
};
window._registerWidget = registerWidget;
const ReferenceWidget_vue_vue_type_style_index_0_scoped_de8147ea_lang = "";
function normalizeComponent(scriptExports, render5, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render5) {
    options.render = render5;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(
        this,
        (options.functional ? this.parent : this).$root.$options.shadowRoot
      );
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const _sfc_main$4 = {
  name: "ReferenceWidget",
  props: {
    reference: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      compact: 3
    };
  },
  computed: {
    hasCustomWidget() {
      return isWidgetRegistered(this.reference.richObjectType);
    },
    noAccess() {
      return this.reference && !this.reference.accessible;
    },
    descriptionStyle() {
      if (this.compact === 0) {
        return {
          display: "none"
        };
      }
      const lineClamp = this.compact < 4 ? this.compact : 3;
      return {
        lineClamp,
        webkitLineClamp: lineClamp
      };
    },
    compactLink() {
      const link2 = this.reference.openGraphObject.link;
      if (!link2) {
        return "";
      }
      if (link2.startsWith("https://")) {
        return link2.substring(8);
      }
      if (link2.startsWith("http://")) {
        return link2.substring(7);
      }
      return link2;
    }
  },
  mounted() {
    this.renderWidget();
    this.observer = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width < 450) {
        this.compact = 0;
      } else if (entries[0].contentRect.width < 550) {
        this.compact = 1;
      } else if (entries[0].contentRect.width < 650) {
        this.compact = 2;
      } else {
        this.compact = 3;
      }
    });
    this.observer.observe(this.$el);
  },
  beforeDestroy() {
    this.observer.disconnect();
    destroyWidget(this.reference.richObjectType, this.$el);
  },
  methods: {
    renderWidget() {
      var _a2;
      if (this.$refs.customWidget) {
        this.$refs.customWidget.innerHTML = "";
      }
      if (((_a2 = this == null ? void 0 : this.reference) == null ? void 0 : _a2.richObjectType) === "open-graph") {
        return;
      }
      this.$nextTick(() => {
        renderWidget(this.$refs.customWidget, this.reference);
      });
    }
  }
};
var _sfc_render$4 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm.reference && _vm.hasCustomWidget ? _c("div", { staticClass: "widget-custom" }, [_c("div", { ref: "customWidget" })]) : !_vm.noAccess && _vm.reference && _vm.reference.openGraphObject && !_vm.hasCustomWidget ? _c("a", { staticClass: "widget-default", attrs: { "href": _vm.reference.openGraphObject.link, "rel": "noopener noreferrer", "target": "_blank" } }, [_vm.reference.openGraphObject.thumb ? _c("img", { staticClass: "widget-default--image", attrs: { "src": _vm.reference.openGraphObject.thumb } }) : _vm._e(), _c("div", { staticClass: "widget-default--details" }, [_c("p", { staticClass: "widget-default--title" }, [_vm._v(_vm._s(_vm.reference.openGraphObject.name))]), _c("p", { staticClass: "widget-default--description", style: _vm.descriptionStyle }, [_vm._v(_vm._s(_vm.reference.openGraphObject.description))]), _c("p", { staticClass: "widget-default--link" }, [_vm._v(_vm._s(_vm.compactLink))])])]) : _vm._e()]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  "de8147ea",
  null,
  null
);
const ReferenceWidget = __component__$4.exports;
var axios$2 = { exports: {} };
var axios$1 = { exports: {} };
var bind$3 = function bind(fn, thisArg) {
  return function wrap2() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$2 = bind$3;
var toString$7 = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString$7.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray2(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer3(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject$6(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject2(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString$7.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject$6(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString$7.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim$1(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray2(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge$1() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject2(result[key]) && isPlainObject2(val)) {
      result[key] = merge$1(result[key], val);
    } else if (isPlainObject2(val)) {
      result[key] = merge$1({}, val);
    } else if (isArray2(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend2(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$2(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content2) {
  if (content2.charCodeAt(0) === 65279) {
    content2 = content2.slice(1);
  }
  return content2;
}
function inherits(constructor, superConstructor, props2, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props2 && Object.assign(constructor.prototype, props2);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props2;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props2 = Object.getOwnPropertyNames(sourceObj);
    i = props2.length;
    while (i-- > 0) {
      prop = props2[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position2) {
  str = String(str);
  if (position2 === void 0 || position2 > str.length) {
    position2 = str.length;
  }
  position2 -= searchString.length;
  var lastIndex = str.indexOf(searchString, position2);
  return lastIndex !== -1 && lastIndex === position2;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$b = {
  isArray: isArray2,
  isArrayBuffer,
  isBuffer: isBuffer3,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject: isObject$6,
  isPlainObject: isPlainObject2,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge: merge$1,
  extend: extend2,
  trim: trim$1,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray,
  isFileList
};
var utils$a = utils$b;
function encode$2(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$a.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$a.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$a.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$a.forEach(val, function parseValue(v) {
        if (utils$a.isDate(v)) {
          v = v.toISOString();
        } else if (utils$a.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode$2(key) + "=" + encode$2(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$9 = utils$b;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id2) {
  if (this.handlers[id2]) {
    this.handlers[id2] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$9.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$8 = utils$b;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$8.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$7 = utils$b;
function AxiosError$2(message, code2, config2, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code2 && (this.code = code2);
  config2 && (this.config = config2);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$7.inherits(AxiosError$2, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$2.prototype;
var descriptors$1 = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code2) {
  descriptors$1[code2] = { value: code2 };
});
Object.defineProperties(AxiosError$2, descriptors$1);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$2.from = function(error, code2, config2, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$7.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$2.call(axiosError, error.message, code2, config2, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$2;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$6 = utils$b;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$6.isDate(value)) {
      return value.toISOString();
    }
    if (utils$6.isArrayBuffer(value) || utils$6.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$6.isPlainObject(data2) || utils$6.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$6.forEach(data2, function each(value, key) {
        if (utils$6.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$6.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$6.endsWith(key, "[]") && (arr = utils$6.toArray(value))) {
            arr.forEach(function(el) {
              !utils$6.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var AxiosError2 = AxiosError_1;
  settle = function settle2(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError2(
        "Request failed with status code " + response.status,
        [AxiosError2.ERR_BAD_REQUEST, AxiosError2.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var utils2 = utils$b;
  cookies = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path2, domain, secure) {
        var cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils2.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils2.isString(path2)) {
          cookie.push("path=" + path2);
        }
        if (utils2.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        var match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match2 ? decodeURIComponent(match2[3]) : null;
      },
      remove: function remove2(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove2() {
      }
    };
  }();
  return cookies;
}
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = utils$b;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = utils$b;
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }();
  return isURLSameOrigin;
}
var CanceledError_1;
var hasRequiredCanceledError;
function requireCanceledError() {
  if (hasRequiredCanceledError)
    return CanceledError_1;
  hasRequiredCanceledError = 1;
  var AxiosError2 = AxiosError_1;
  var utils2 = utils$b;
  function CanceledError2(message) {
    AxiosError2.call(this, message == null ? "canceled" : message, AxiosError2.ERR_CANCELED);
    this.name = "CanceledError";
  }
  utils2.inherits(CanceledError2, AxiosError2, {
    __CANCEL__: true
  });
  CanceledError_1 = CanceledError2;
  return CanceledError_1;
}
var parseProtocol;
var hasRequiredParseProtocol;
function requireParseProtocol() {
  if (hasRequiredParseProtocol)
    return parseProtocol;
  hasRequiredParseProtocol = 1;
  parseProtocol = function parseProtocol2(url) {
    var match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match2 && match2[1] || "";
  };
  return parseProtocol;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var utils2 = utils$b;
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL3 = buildURL$1;
  var buildFullPath3 = buildFullPath$1;
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var transitionalDefaults2 = transitional;
  var AxiosError2 = AxiosError_1;
  var CanceledError2 = requireCanceledError();
  var parseProtocol2 = requireParseProtocol();
  xhr = function xhrAdapter(config2) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config2.data;
      var requestHeaders = config2.headers;
      var responseType = config2.responseType;
      var onCanceled;
      function done() {
        if (config2.cancelToken) {
          config2.cancelToken.unsubscribe(onCanceled);
        }
        if (config2.signal) {
          config2.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils2.isFormData(requestData) && utils2.isStandardBrowserEnv()) {
        delete requestHeaders["Content-Type"];
      }
      var request2 = new XMLHttpRequest();
      if (config2.auth) {
        var username = config2.auth.username || "";
        var password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath3(config2.baseURL, config2.url);
      request2.open(config2.method.toUpperCase(), buildURL3(fullPath, config2.params, config2.paramsSerializer), true);
      request2.timeout = config2.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config: config2,
          request: request2
        };
        settle2(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(new AxiosError2("Request aborted", AxiosError2.ECONNABORTED, config2, request2));
        request2 = null;
      };
      request2.onerror = function handleError2() {
        reject(new AxiosError2("Network Error", AxiosError2.ERR_NETWORK, config2, request2, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded";
        var transitional3 = config2.transitional || transitionalDefaults2;
        if (config2.timeoutErrorMessage) {
          timeoutErrorMessage = config2.timeoutErrorMessage;
        }
        reject(new AxiosError2(
          timeoutErrorMessage,
          transitional3.clarifyTimeoutError ? AxiosError2.ETIMEDOUT : AxiosError2.ECONNABORTED,
          config2,
          request2
        ));
        request2 = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config2.withCredentials || isURLSameOrigin2(fullPath)) && config2.xsrfCookieName ? cookies2.read(config2.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config2.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request2) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request2.setRequestHeader(key, val);
          }
        });
      }
      if (!utils2.isUndefined(config2.withCredentials)) {
        request2.withCredentials = !!config2.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config2.responseType;
      }
      if (typeof config2.onDownloadProgress === "function") {
        request2.addEventListener("progress", config2.onDownloadProgress);
      }
      if (typeof config2.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", config2.onUploadProgress);
      }
      if (config2.cancelToken || config2.signal) {
        onCanceled = function(cancel) {
          if (!request2) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new CanceledError2() : cancel);
          request2.abort();
          request2 = null;
        };
        config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
        if (config2.signal) {
          config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      var protocol = parseProtocol2(fullPath);
      if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
        reject(new AxiosError2("Unsupported protocol " + protocol + ":", AxiosError2.ERR_BAD_REQUEST, config2));
        return;
      }
      request2.send(requestData);
    });
  };
  return xhr;
}
var _null;
var hasRequired_null;
function require_null() {
  if (hasRequired_null)
    return _null;
  hasRequired_null = 1;
  _null = null;
  return _null;
}
var utils$5 = utils$b;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = requireXhr();
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = requireXhr();
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$5.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$5.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$5.isFormData(data2) || utils$5.isArrayBuffer(data2) || utils$5.isBuffer(data2) || utils$5.isStream(data2) || utils$5.isFile(data2) || utils$5.isBlob(data2)) {
      return data2;
    }
    if (utils$5.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$5.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$5.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$5.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$5.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: require_null()
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$5.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$5.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$4 = utils$b;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$4.forEach(fns, function transform2(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel)
    return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}
var utils$3 = utils$b;
var transformData2 = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = defaults_1;
var CanceledError = requireCanceledError();
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested();
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError();
  }
}
var dispatchRequest$1 = function dispatchRequest(config2) {
  throwIfCancellationRequested(config2);
  config2.headers = config2.headers || {};
  config2.data = transformData2.call(
    config2,
    config2.data,
    config2.headers,
    config2.transformRequest
  );
  config2.headers = utils$3.merge(
    config2.headers.common || {},
    config2.headers[config2.method] || {},
    config2.headers
  );
  utils$3.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method) {
      delete config2.headers[method];
    }
  );
  var adapter = config2.adapter || defaults$1.adapter;
  return adapter(config2).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config2);
    response.data = transformData2.call(
      config2,
      response.data,
      response.headers,
      config2.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config2);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config2,
          reason.response.data,
          reason.response.headers,
          config2.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$2 = utils$b;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config3 = {};
  function getMergedValue(target2, source) {
    if (utils$2.isPlainObject(target2) && utils$2.isPlainObject(source)) {
      return utils$2.merge(target2, source);
    } else if (utils$2.isPlainObject(source)) {
      return utils$2.merge({}, source);
    } else if (utils$2.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$2.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
  });
  return config3;
};
var data$1;
var hasRequiredData;
function requireData() {
  if (hasRequiredData)
    return data$1;
  hasRequiredData = 1;
  data$1 = {
    "version": "0.27.2"
  };
  return data$1;
}
var VERSION = requireData().version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts2) {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts2) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys3 = Object.keys(options);
  var i = keys3.length;
  while (i-- > 0) {
    var opt = keys3[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$1 = utils$b;
var buildURL2 = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$1;
var validator = validator$1;
var validators = validator.validators;
function Axios$2(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$2.prototype.request = function request(configOrUrl, config2) {
  if (typeof configOrUrl === "string") {
    config2 = config2 || {};
    config2.url = configOrUrl;
  } else {
    config2 = configOrUrl || {};
  }
  config2 = mergeConfig$1(this.defaults, config2);
  if (config2.method) {
    config2.method = config2.method.toLowerCase();
  } else if (this.defaults.method) {
    config2.method = this.defaults.method.toLowerCase();
  } else {
    config2.method = "get";
  }
  var transitional3 = config2.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config2);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config2;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$2.prototype.getUri = function getUri(config2) {
  config2 = mergeConfig$1(this.defaults, config2);
  var fullPath = buildFullPath2(config2.baseURL, config2.url);
  return buildURL2(fullPath, config2.params, config2.paramsSerializer);
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$2.prototype[method] = function(url, config2) {
    return this.request(mergeConfig$1(config2 || {}, {
      method,
      url,
      data: (config2 || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config2) {
      return this.request(mergeConfig$1(config2 || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$2.prototype[method] = generateHTTPMethod();
  Axios$2.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$2;
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var CanceledError2 = requireCanceledError();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token2 = this;
    this.promise.then(function(cancel) {
      if (!token2._listeners)
        return;
      var i;
      var l = token2._listeners.length;
      for (i = 0; i < l; i++) {
        token2._listeners[i](cancel);
      }
      token2._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve) {
        token2.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token2.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token2.reason) {
        return;
      }
      token2.reason = new CanceledError2(message);
      resolvePromise(token2.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe2(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token2 = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token2,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread)
    return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap2(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError)
    return isAxiosError;
  hasRequiredIsAxiosError = 1;
  var utils2 = utils$b;
  isAxiosError = function isAxiosError2(payload) {
    return utils2.isObject(payload) && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var utils = utils$b;
var bind$1 = bind$3;
var Axios$1 = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios$1(defaultConfig);
  var instance = bind$1(Axios$1.prototype.request, context);
  utils.extend(instance, Axios$1.prototype, context);
  utils.extend(instance, context);
  instance.create = function create3(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = requireCanceledError();
axios.CancelToken = requireCancelToken();
axios.isCancel = requireIsCancel();
axios.VERSION = requireData().version;
axios.toFormData = toFormData_1;
axios.AxiosError = AxiosError_1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = requireSpread();
axios.isAxiosError = requireIsAxiosError();
axios$1.exports = axios;
axios$1.exports.default = axios;
(function(module) {
  module.exports = axios$1.exports;
})(axios$2);
const Axios = /* @__PURE__ */ getDefaultExportFromCjs(axios$2.exports);
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$2 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || 9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};
var re$2 = { exports: {} };
const debug$1 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
(function(module, exports) {
  const { MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2 } = constants;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const createToken = (name, value, isGlobal) => {
    const index2 = R++;
    debug2(name, index2, value);
    t2[name] = index2;
    src[index2] = value;
    re2[index2] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$2, re$2.exports);
const opts = ["includePrerelease", "loose", "rtl"];
const parseOptions$2 = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
  o[k] = true;
  return o;
}, {});
var parseOptions_1 = parseOptions$2;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants;
const { re: re$1, t: t$1 } = re$2.exports;
const parseOptions$1 = parseOptions_1;
const { compareIdentifiers } = identifiers;
class SemVer$2 {
  constructor(version2, options) {
    options = parseOptions$1(options);
    if (version2 instanceof SemVer$2) {
      if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
        return version2;
      } else {
        version2 = version2.version;
      }
    } else if (typeof version2 !== "string") {
      throw new TypeError(`Invalid Version: ${version2}`);
    }
    if (version2.length > MAX_LENGTH$1) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH$1} characters`
      );
    }
    debug("SemVer", version2, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version2.trim().match(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version2}`);
    }
    this.raw = version2;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id2) => {
        if (/^[0-9]+$/.test(id2)) {
          const num = +id2;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id2;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer$2)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer$2(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer$2)) {
      other = new SemVer$2(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer$2)) {
      other = new SemVer$2(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer$2)) {
      other = new SemVer$2(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.format();
    this.raw = this.version;
    return this;
  }
}
var semver = SemVer$2;
const { MAX_LENGTH } = constants;
const { re, t } = re$2.exports;
const SemVer$1 = semver;
const parseOptions = parseOptions_1;
const parse$4 = (version2, options) => {
  options = parseOptions(options);
  if (version2 instanceof SemVer$1) {
    return version2;
  }
  if (typeof version2 !== "string") {
    return null;
  }
  if (version2.length > MAX_LENGTH) {
    return null;
  }
  const r = options.loose ? re[t.LOOSE] : re[t.FULL];
  if (!r.test(version2)) {
    return null;
  }
  try {
    return new SemVer$1(version2, options);
  } catch (er) {
    return null;
  }
};
var parse_1 = parse$4;
const parse$3 = parse_1;
const valid$1 = (version2, options) => {
  const v = parse$3(version2, options);
  return v ? v.version : null;
};
var valid_1 = valid$1;
const SemVer = semver;
const major = (a, loose) => new SemVer(a, loose).major;
var major_1 = major;
class ProxyBus {
  constructor(bus2) {
    __publicField(this, "bus");
    if (typeof bus2.getVersion !== "function" || !valid_1(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (major_1(bus2.getVersion()) !== major_1(this.getVersion())) {
      console.warn("Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion());
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.0.0";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, event) {
    this.bus.emit(name, event);
  }
}
class SimpleBus {
  constructor() {
    __publicField(this, "handlers", /* @__PURE__ */ new Map());
  }
  getVersion() {
    return "3.0.0";
  }
  subscribe(name, handler) {
    this.handlers.set(name, (this.handlers.get(name) || []).concat(handler));
  }
  unsubscribe(name, handler) {
    this.handlers.set(name, (this.handlers.get(name) || []).filter((h) => h != handler));
  }
  emit(name, event) {
    (this.handlers.get(name) || []).forEach((h) => {
      try {
        h(event);
      } catch (e) {
        console.error("could not invoke event listener", e);
      }
    });
  }
}
function getBus() {
  if (typeof window.OC !== "undefined" && window.OC._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn("found old event bus instance at OC._eventBus. Update your version!");
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window._nc_event_bus !== "undefined") {
    return new ProxyBus(window._nc_event_bus);
  } else {
    return window._nc_event_bus = new SimpleBus();
  }
}
const bus = getBus();
function subscribe(name, handler) {
  bus.subscribe(name, handler);
}
const tokenElement = document.getElementsByTagName("head")[0];
let token = tokenElement ? tokenElement.getAttribute("data-requesttoken") : null;
const observers = [];
function getRequestToken() {
  return token;
}
function onRequestTokenUpdate(observer) {
  observers.push(observer);
}
subscribe("csrf-token-update", (e) => {
  token = e.token;
  observers.forEach((observer) => {
    try {
      observer(e.token);
    } catch (e2) {
      console.error("error updating CSRF token observer", e2);
    }
  });
});
const getAttribute = (el, attribute) => {
  if (el) {
    return el.getAttribute(attribute);
  }
  return null;
};
const head = document.getElementsByTagName("head")[0];
getAttribute(head, "data-user");
getAttribute(head, "data-user-displayname");
typeof OC === "undefined" ? false : OC.isUserAdmin();
const client = Axios.create({
  headers: {
    requesttoken: (_a = getRequestToken()) != null ? _a : ""
  }
});
const cancelableClient = Object.assign(client, {
  CancelToken: Axios.CancelToken,
  isCancel: Axios.isCancel
});
onRequestTokenUpdate((token2) => client.defaults.headers.requesttoken = token2);
var dist = {};
var fails$d = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$c = fails$d;
var functionBindNative = !fails$c(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$2 = functionBindNative;
var FunctionPrototype$2 = Function.prototype;
var apply$1 = FunctionPrototype$2.apply;
var call$8 = FunctionPrototype$2.call;
var functionApply = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND$2 ? call$8.bind(apply$1) : function() {
  return call$8.apply(apply$1, arguments);
});
var NATIVE_BIND$1 = functionBindNative;
var call$7 = Function.prototype.call;
var functionCall = NATIVE_BIND$1 ? call$7.bind(call$7) : function() {
  return call$7.apply(call$7, arguments);
};
var NATIVE_BIND = functionBindNative;
var FunctionPrototype$1 = Function.prototype;
var bind2 = FunctionPrototype$1.bind;
var call$6 = FunctionPrototype$1.call;
var uncurryThis$e = NATIVE_BIND && bind2.bind(call$6, call$6);
var functionUncurryThis = NATIVE_BIND ? function(fn) {
  return fn && uncurryThis$e(fn);
} : function(fn) {
  return fn && function() {
    return call$6.apply(fn, arguments);
  };
};
var check = function(it) {
  return it && it.Math == Math && it;
};
var global$d = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var objectGetOwnPropertyDescriptor = {};
var fails$b = fails$d;
var descriptors = !fails$b(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
});
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var createPropertyDescriptor$2 = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var uncurryThis$d = functionUncurryThis;
var toString$6 = uncurryThis$d({}.toString);
var stringSlice$4 = uncurryThis$d("".slice);
var classofRaw$1 = function(it) {
  return stringSlice$4(toString$6(it), 8, -1);
};
var uncurryThis$c = functionUncurryThis;
var fails$a = fails$d;
var classof$3 = classofRaw$1;
var $Object$3 = Object;
var split = uncurryThis$c("".split);
var indexedObject = fails$a(function() {
  return !$Object$3("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$3(it) == "String" ? split(it, "") : $Object$3(it);
} : $Object$3;
var isNullOrUndefined$3 = function(it) {
  return it === null || it === void 0;
};
var isNullOrUndefined$2 = isNullOrUndefined$3;
var $TypeError$6 = TypeError;
var requireObjectCoercible$4 = function(it) {
  if (isNullOrUndefined$2(it))
    throw $TypeError$6("Can't call method on " + it);
  return it;
};
var IndexedObject = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;
var toIndexedObject$4 = function(it) {
  return IndexedObject(requireObjectCoercible$3(it));
};
var documentAll$2 = typeof document == "object" && document.all;
var IS_HTMLDDA = typeof documentAll$2 == "undefined" && documentAll$2 !== void 0;
var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA
};
var $documentAll$1 = documentAll_1;
var documentAll$1 = $documentAll$1.all;
var isCallable$d = $documentAll$1.IS_HTMLDDA ? function(argument) {
  return typeof argument == "function" || argument === documentAll$1;
} : function(argument) {
  return typeof argument == "function";
};
var isCallable$c = isCallable$d;
var $documentAll = documentAll_1;
var documentAll = $documentAll.all;
var isObject$5 = $documentAll.IS_HTMLDDA ? function(it) {
  return typeof it == "object" ? it !== null : isCallable$c(it) || it === documentAll;
} : function(it) {
  return typeof it == "object" ? it !== null : isCallable$c(it);
};
var global$c = global$d;
var isCallable$b = isCallable$d;
var aFunction = function(argument) {
  return isCallable$b(argument) ? argument : void 0;
};
var getBuiltIn$4 = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$c[namespace]) : global$c[namespace] && global$c[namespace][method];
};
var uncurryThis$b = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$b({}.isPrototypeOf);
var getBuiltIn$3 = getBuiltIn$4;
var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";
var global$b = global$d;
var userAgent = engineUserAgent;
var process$1 = global$b.process;
var Deno = global$b.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match)
      version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION = engineV8Version;
var fails$9 = fails$d;
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$9(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$a = isCallable$d;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$2 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$2("Symbol");
  return isCallable$a($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
};
var $String$2 = String;
var tryToString$1 = function(argument) {
  try {
    return $String$2(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$9 = isCallable$d;
var tryToString = tryToString$1;
var $TypeError$5 = TypeError;
var aCallable$1 = function(argument) {
  if (isCallable$9(argument))
    return argument;
  throw $TypeError$5(tryToString(argument) + " is not a function");
};
var aCallable = aCallable$1;
var isNullOrUndefined$1 = isNullOrUndefined$3;
var getMethod$2 = function(V, P) {
  var func = V[P];
  return isNullOrUndefined$1(func) ? void 0 : aCallable(func);
};
var call$5 = functionCall;
var isCallable$8 = isCallable$d;
var isObject$4 = isObject$5;
var $TypeError$4 = TypeError;
var ordinaryToPrimitive$1 = function(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$8(fn = input.toString) && !isObject$4(val = call$5(fn, input)))
    return val;
  if (isCallable$8(fn = input.valueOf) && !isObject$4(val = call$5(fn, input)))
    return val;
  if (pref !== "string" && isCallable$8(fn = input.toString) && !isObject$4(val = call$5(fn, input)))
    return val;
  throw $TypeError$4("Can't convert object to primitive value");
};
var shared$4 = { exports: {} };
var global$a = global$d;
var defineProperty$1 = Object.defineProperty;
var defineGlobalProperty$3 = function(key, value) {
  try {
    defineProperty$1(global$a, key, { value, configurable: true, writable: true });
  } catch (error) {
    global$a[key] = value;
  }
  return value;
};
var global$9 = global$d;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$9[SHARED] || defineGlobalProperty$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$4.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.25.3",
  mode: "global",
  copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.25.3/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var requireObjectCoercible$2 = requireObjectCoercible$4;
var $Object$1 = Object;
var toObject$2 = function(argument) {
  return $Object$1(requireObjectCoercible$2(argument));
};
var uncurryThis$a = functionUncurryThis;
var toObject$1 = toObject$2;
var hasOwnProperty$2 = uncurryThis$a({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$2(toObject$1(it), key);
};
var uncurryThis$9 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$9(1 .toString);
var uid$2 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$5(++id + postfix, 36);
};
var global$8 = global$d;
var shared$3 = shared$4.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$3("wks");
var Symbol$1 = global$8.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$5 = function(name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};
var call$4 = functionCall;
var isObject$3 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod$1 = getMethod$2;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$4 = wellKnownSymbol$5;
var $TypeError$3 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$4("toPrimitive");
var toPrimitive$1 = function(input, pref) {
  if (!isObject$3(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$4(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result))
      return result;
    throw $TypeError$3("Can't convert object to primitive value");
  }
  if (pref === void 0)
    pref = "number";
  return ordinaryToPrimitive(input, pref);
};
var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;
var toPropertyKey$2 = function(argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};
var global$7 = global$d;
var isObject$2 = isObject$5;
var document$3 = global$7.document;
var EXISTS$1 = isObject$2(document$3) && isObject$2(document$3.createElement);
var documentCreateElement$1 = function(it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};
var DESCRIPTORS$7 = descriptors;
var fails$8 = fails$d;
var createElement = documentCreateElement$1;
var ie8DomDefine = !DESCRIPTORS$7 && !fails$8(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$6 = descriptors;
var call$3 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
    }
  if (hasOwn$5(O, P))
    return createPropertyDescriptor$1(!call$3(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$5 = descriptors;
var fails$7 = fails$d;
var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$7(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$1 = isObject$5;
var $String$1 = String;
var $TypeError$2 = TypeError;
var anObject$7 = function(argument) {
  if (isObject$1(argument))
    return argument;
  throw $TypeError$2($String$1(argument) + " is not an object");
};
var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$6 = anObject$7;
var toPropertyKey = toPropertyKey$2;
var $TypeError$1 = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$6(O);
  P = toPropertyKey(P);
  anObject$6(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty2(O, P, Attributes) {
  anObject$6(O);
  P = toPropertyKey(P);
  anObject$6(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw $TypeError$1("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$3 ? function(object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltIn$2 = { exports: {} };
var DESCRIPTORS$2 = descriptors;
var hasOwn$4 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$4(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || DESCRIPTORS$2 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$8 = functionUncurryThis;
var isCallable$7 = isCallable$d;
var store$1 = sharedStore;
var functionToString = uncurryThis$8(Function.toString);
if (!isCallable$7(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$1 = store$1.inspectSource;
var global$6 = global$d;
var isCallable$6 = isCallable$d;
var WeakMap$1 = global$6.WeakMap;
var weakMapBasicDetection = isCallable$6(WeakMap$1) && /native code/.test(String(WeakMap$1));
var shared$2 = shared$4.exports;
var uid = uid$2;
var keys = shared$2("keys");
var sharedKey$2 = function(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$5 = global$d;
var uncurryThis$7 = functionUncurryThis;
var isObject = isObject$5;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$3 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$1 = global$5.TypeError;
var WeakMap = global$5.WeakMap;
var set, get, has;
var enforce = function(it) {
  return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$7(store.get);
  var wmhas = uncurryThis$7(store.has);
  var wmset = uncurryThis$7(store.set);
  set = function(it, metadata) {
    if (wmhas(store, it))
      throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function(it) {
    return wmget(store, it) || {};
  };
  has = function(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$1("state");
  hiddenKeys$3[STATE] = true;
  set = function(it, metadata) {
    if (hasOwn$3(it, STATE))
      throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get = function(it) {
    return hasOwn$3(it, STATE) ? it[STATE] : {};
  };
  has = function(it) {
    return hasOwn$3(it, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var fails$6 = fails$d;
var isCallable$5 = isCallable$d;
var hasOwn$2 = hasOwnProperty_1;
var DESCRIPTORS$1 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;
var enforceInternalState = InternalStateModule.enforce;
var getInternalState$1 = InternalStateModule.get;
var defineProperty3 = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$6(function() {
  return defineProperty3(function() {
  }, "length", { value: 8 }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn$1 = makeBuiltIn$2.exports = function(value, name, options) {
  if (String(name).slice(0, 7) === "Symbol(") {
    name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
  }
  if (options && options.getter)
    name = "get " + name;
  if (options && options.setter)
    name = "set " + name;
  if (!hasOwn$2(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS$1)
      defineProperty3(value, "name", { value: name, configurable: true });
    else
      value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, "arity") && value.length !== options.arity) {
    defineProperty3(value, "length", { value: options.arity });
  }
  try {
    if (options && hasOwn$2(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$1)
        defineProperty3(value, "prototype", { writable: false });
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState(value);
  if (!hasOwn$2(state, "source")) {
    state.source = TEMPLATE.join(typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$5(this) && getInternalState$1(this).source || inspectSource(this);
}, "toString");
var isCallable$4 = isCallable$d;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$2 = function(O, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$4(value))
    makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple)
      O[key] = value;
    else
      defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe)
        delete O[key];
      else if (O[key])
        simple = true;
    } catch (error) {
    }
    if (simple)
      O[key] = value;
    else
      definePropertyModule$2.f(O, key, {
        value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
  }
  return O;
};
var objectGetOwnPropertyNames = {};
var ceil = Math.ceil;
var floor$1 = Math.floor;
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};
var trunc2 = mathTrunc;
var toIntegerOrInfinity$4 = function(argument) {
  var number2 = +argument;
  return number2 !== number2 || number2 === 0 ? 0 : trunc2(number2);
};
var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;
var max$1 = Math.max;
var min$2 = Math.min;
var toAbsoluteIndex$1 = function(index2, length) {
  var integer = toIntegerOrInfinity$3(index2);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};
var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;
var min$1 = Math.min;
var toLength$2 = function(argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$2(argument), 9007199254740991) : 0;
};
var toLength$1 = toLength$2;
var lengthOfArrayLike$1 = function(obj) {
  return toLength$1(obj.length);
};
var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;
var createMethod$1 = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = lengthOfArrayLike(O);
    var index2 = toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index2) {
        value = O[index2++];
        if (value != value)
          return true;
      }
    else
      for (; length > index2; index2++) {
        if ((IS_INCLUDES || index2 in O) && O[index2] === el)
          return IS_INCLUDES || index2 || 0;
      }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  includes: createMethod$1(true),
  indexOf: createMethod$1(false)
};
var uncurryThis$6 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push$2 = uncurryThis$6([].push);
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$2(result, key);
  while (names.length > i)
    if (hasOwn$1(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$2(result, key);
    }
  return result;
};
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$1 = getBuiltIn$4;
var uncurryThis$5 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$5 = anObject$7;
var concat$1 = uncurryThis$5([].concat);
var ownKeys$1 = getBuiltIn$1("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$5(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$1(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;
var copyConstructorProperties$1 = function(target2, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule$1.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn2(target2, key) && !(exceptions && hasOwn2(exceptions, key))) {
      defineProperty4(target2, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$5 = fails$d;
var isCallable$3 = isCallable$d;
var replacement = /#|\.prototype\./;
var isForced$1 = function(feature, detection) {
  var value = data[normalize$1(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$3(detection) ? fails$5(detection) : !!detection;
};
var normalize$1 = isForced$1.normalize = function(string2) {
  return String(string2).replace(replacement, ".").toLowerCase();
};
var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";
var isForced_1 = isForced$1;
var global$4 = global$d;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var defineBuiltIn$1 = defineBuiltIn$2;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target2, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target2 = global$4;
  } else if (STATIC) {
    target2 = global$4[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target2 = (global$4[TARGET] || {}).prototype;
  }
  if (target2)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor2(target2, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target2[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED && targetProperty !== void 0) {
        if (typeof sourceProperty == typeof targetProperty)
          continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$1(sourceProperty, "sham", true);
      }
      defineBuiltIn$1(target2, key, sourceProperty, options);
    }
};
var wellKnownSymbol$3 = wellKnownSymbol$5;
var TO_STRING_TAG$1 = wellKnownSymbol$3("toStringTag");
var test = {};
test[TO_STRING_TAG$1] = "z";
var toStringTagSupport = String(test) === "[object z]";
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$2 = isCallable$d;
var classofRaw = classofRaw$1;
var wellKnownSymbol$2 = wellKnownSymbol$5;
var TO_STRING_TAG = wellKnownSymbol$2("toStringTag");
var $Object = Object;
var CORRECT_ARGUMENTS = classofRaw(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable$2(O.callee) ? "Arguments" : result;
};
var classof$1 = classof$2;
var $String = String;
var toString$4 = function(argument) {
  if (classof$1(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return $String(argument);
};
var anObject$4 = anObject$7;
var regexpFlags$1 = function() {
  var that = anObject$4(this);
  var result = "";
  if (that.hasIndices)
    result += "d";
  if (that.global)
    result += "g";
  if (that.ignoreCase)
    result += "i";
  if (that.multiline)
    result += "m";
  if (that.dotAll)
    result += "s";
  if (that.unicode)
    result += "u";
  if (that.unicodeSets)
    result += "v";
  if (that.sticky)
    result += "y";
  return result;
};
var fails$4 = fails$d;
var global$3 = global$d;
var $RegExp$2 = global$3.RegExp;
var UNSUPPORTED_Y$1 = fails$4(function() {
  var re2 = $RegExp$2("a", "y");
  re2.lastIndex = 2;
  return re2.exec("abcd") != null;
});
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$4(function() {
  return !$RegExp$2("a", "y").sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$4(function() {
  var re2 = $RegExp$2("^r", "gy");
  re2.lastIndex = 2;
  return re2.exec("str") != null;
});
var regexpStickyHelpers = {
  BROKEN_CARET,
  MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};
var objectDefineProperties = {};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;
var objectKeys$1 = Object.keys || function keys2(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};
var DESCRIPTORS = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$3 = anObject$7;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$3(O);
  var props2 = toIndexedObject(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index2 = 0;
  var key;
  while (length > index2)
    definePropertyModule.f(O, key = keys3[index2++], props2[key]);
  return O;
};
var getBuiltIn = getBuiltIn$4;
var html$4 = getBuiltIn("document", "documentElement");
var anObject$2 = anObject$7;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$3 = html$4;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;
var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO = sharedKey("IE_PROTO");
var EmptyConstructor = function() {
};
var scriptTag = function(content2) {
  return LT + SCRIPT + GT + content2 + LT + "/" + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function(activeXDocument2) {
  activeXDocument2.write(scriptTag(""));
  activeXDocument2.close();
  var temp = activeXDocument2.parentWindow.Object;
  activeXDocument2 = null;
  return temp;
};
var NullProtoObjectViaIFrame = function() {
  var iframe = documentCreateElement("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html$3.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function() {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
  var length = enumBugKeys.length;
  while (length--)
    delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$2(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = O;
  } else
    result = NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var fails$3 = fails$d;
var global$2 = global$d;
var $RegExp$1 = global$2.RegExp;
var regexpUnsupportedDotAll = fails$3(function() {
  var re2 = $RegExp$1(".", "s");
  return !(re2.dotAll && re2.exec("\n") && re2.flags === "s");
});
var fails$2 = fails$d;
var global$1 = global$d;
var $RegExp = global$1.RegExp;
var regexpUnsupportedNcg = fails$2(function() {
  var re2 = $RegExp("(?<a>b)", "g");
  return re2.exec("b").groups.a !== "b" || "b".replace(re2, "$<a>c") !== "bc";
});
var call$2 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var toString$3 = toString$4;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create$1 = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$3 = uncurryThis$4("".charAt);
var indexOf = uncurryThis$4("".indexOf);
var replace$1 = uncurryThis$4("".replace);
var stringSlice$3 = uncurryThis$4("".slice);
var UPDATES_LAST_INDEX_WRONG = function() {
  var re1 = /a/;
  var re2 = /b*/g;
  call$2(nativeExec, re1, "a");
  call$2(nativeExec, re2, "a");
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();
var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
  patchedExec = function exec2(string2) {
    var re2 = this;
    var state = getInternalState(re2);
    var str = toString$3(string2);
    var raw = state.raw;
    var result, reCopy, lastIndex, match2, i, object, group;
    if (raw) {
      raw.lastIndex = re2.lastIndex;
      result = call$2(patchedExec, raw, str);
      re2.lastIndex = raw.lastIndex;
      return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re2.sticky;
    var flags = call$2(regexpFlags, re2);
    var source = re2.source;
    var charsAdded = 0;
    var strCopy = str;
    if (sticky) {
      flags = replace$1(flags, "y", "");
      if (indexOf(flags, "g") === -1) {
        flags += "g";
      }
      strCopy = stringSlice$3(str, re2.lastIndex);
      if (re2.lastIndex > 0 && (!re2.multiline || re2.multiline && charAt$3(str, re2.lastIndex - 1) !== "\n")) {
        source = "(?: " + source + ")";
        strCopy = " " + strCopy;
        charsAdded++;
      }
      reCopy = new RegExp("^(?:" + source + ")", flags);
    }
    if (NPCG_INCLUDED) {
      reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
    }
    if (UPDATES_LAST_INDEX_WRONG)
      lastIndex = re2.lastIndex;
    match2 = call$2(nativeExec, sticky ? reCopy : re2, strCopy);
    if (sticky) {
      if (match2) {
        match2.input = stringSlice$3(match2.input, charsAdded);
        match2[0] = stringSlice$3(match2[0], charsAdded);
        match2.index = re2.lastIndex;
        re2.lastIndex += match2[0].length;
      } else
        re2.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match2) {
      re2.lastIndex = re2.global ? match2.index + match2[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match2 && match2.length > 1) {
      call$2(nativeReplace, match2[0], reCopy, function() {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === void 0)
            match2[i] = void 0;
        }
      });
    }
    if (match2 && groups) {
      match2.groups = object = create$1(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match2[group[1]];
      }
    }
    return match2;
  };
}
var regexpExec$2 = patchedExec;
var $ = _export;
var exec = regexpExec$2;
$({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
  exec
});
var uncurryThis$3 = functionUncurryThis;
var defineBuiltIn = defineBuiltIn$2;
var regexpExec$1 = regexpExec$2;
var fails$1 = fails$d;
var wellKnownSymbol$1 = wellKnownSymbol$5;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var SPECIES = wellKnownSymbol$1("species");
var RegExpPrototype = RegExp.prototype;
var fixRegexpWellKnownSymbolLogic = function(KEY, exec2, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);
  var DELEGATES_TO_SYMBOL = !fails$1(function() {
    var O = {};
    O[SYMBOL] = function() {
      return 7;
    };
    return ""[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function() {
    var execCalled = false;
    var re2 = /a/;
    if (KEY === "split") {
      re2 = {};
      re2.constructor = {};
      re2.constructor[SPECIES] = function() {
        return re2;
      };
      re2.flags = "";
      re2[SYMBOL] = /./[SYMBOL];
    }
    re2.exec = function() {
      execCalled = true;
      return null;
    };
    re2[SYMBOL]("");
    return !execCalled;
  });
  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL]);
    var methods = exec2(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$3(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });
    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }
  if (SHAM)
    createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
};
var uncurryThis$2 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$2 = toString$4;
var requireObjectCoercible$1 = requireObjectCoercible$4;
var charAt$2 = uncurryThis$2("".charAt);
var charCodeAt = uncurryThis$2("".charCodeAt);
var stringSlice$2 = uncurryThis$2("".slice);
var createMethod = function(CONVERT_TO_STRING) {
  return function($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this));
    var position2 = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position2 < 0 || position2 >= size)
      return CONVERT_TO_STRING ? "" : void 0;
    first = charCodeAt(S, position2);
    return first < 55296 || first > 56319 || position2 + 1 === size || (second = charCodeAt(S, position2 + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt$2(S, position2) : first : CONVERT_TO_STRING ? stringSlice$2(S, position2, position2 + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
  };
};
var stringMultibyte = {
  codeAt: createMethod(false),
  charAt: createMethod(true)
};
var charAt$1 = stringMultibyte.charAt;
var advanceStringIndex$1 = function(S, index2, unicode) {
  return index2 + (unicode ? charAt$1(S, index2).length : 1);
};
var uncurryThis$1 = functionUncurryThis;
var toObject = toObject$2;
var floor = Math.floor;
var charAt = uncurryThis$1("".charAt);
var replace = uncurryThis$1("".replace);
var stringSlice$1 = uncurryThis$1("".slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
var getSubstitution$1 = function(matched, str, position2, captures, namedCaptures, replacement2) {
  var tailPos = position2 + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== void 0) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement2, symbols, function(match2, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case "$":
        return "$";
      case "&":
        return matched;
      case "`":
        return stringSlice$1(str, 0, position2);
      case "'":
        return stringSlice$1(str, tailPos);
      case "<":
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default:
        var n = +ch;
        if (n === 0)
          return match2;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0)
            return match2;
          if (f <= m)
            return captures[f - 1] === void 0 ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match2;
        }
        capture = captures[n - 1];
    }
    return capture === void 0 ? "" : capture;
  });
};
var call$1 = functionCall;
var anObject$1 = anObject$7;
var isCallable$1 = isCallable$d;
var classof = classofRaw$1;
var regexpExec = regexpExec$2;
var $TypeError = TypeError;
var regexpExecAbstract = function(R, S) {
  var exec2 = R.exec;
  if (isCallable$1(exec2)) {
    var result = call$1(exec2, R, S);
    if (result !== null)
      anObject$1(result);
    return result;
  }
  if (classof(R) === "RegExp")
    return call$1(regexpExec, R, S);
  throw $TypeError("RegExp#exec called on incompatible receiver");
};
var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails = fails$d;
var anObject = anObject$7;
var isCallable = isCallable$d;
var isNullOrUndefined = isNullOrUndefined$3;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString$1 = toString$4;
var requireObjectCoercible = requireObjectCoercible$4;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$2;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$5;
var REPLACE = wellKnownSymbol("replace");
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push$1 = uncurryThis([].push);
var stringIndexOf = uncurryThis("".indexOf);
var stringSlice = uncurryThis("".slice);
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
var REPLACE_KEEPS_$0 = function() {
  return "a".replace(/./, "$0") === "$0";
}();
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
  if (/./[REPLACE]) {
    return /./[REPLACE]("a", "$0") === "";
  }
  return false;
}();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
  var re2 = /./;
  re2.exec = function() {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  return "".replace(re2, "$<a>") !== "7";
});
fixRegExpWellKnownSymbolLogic("replace", function(_, nativeReplace2, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
  return [
    function replace2(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? void 0 : getMethod(searchValue, REPLACE);
      return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace2, toString$1(O), searchValue, replaceValue);
    },
    function(string2, replaceValue) {
      var rx = anObject(this);
      var S = toString$1(string2);
      if (typeof replaceValue == "string" && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, "$<") === -1) {
        var res = maybeCallNative(nativeReplace2, rx, S, replaceValue);
        if (res.done)
          return res.value;
      }
      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace)
        replaceValue = toString$1(replaceValue);
      var global2 = rx.global;
      if (global2) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null)
          break;
        push$1(results, result);
        if (!global2)
          break;
        var matchStr = toString$1(result[0]);
        if (matchStr === "")
          rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$1(result[0]);
        var position2 = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        for (var j = 1; j < result.length; j++)
          push$1(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position2, S);
          if (namedCaptures !== void 0)
            push$1(replacerArgs, namedCaptures);
          var replacement2 = toString$1(apply(replaceValue, void 0, replacerArgs));
        } else {
          replacement2 = getSubstitution(matched, S, position2, captures, namedCaptures, replaceValue);
        }
        if (position2 >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position2) + replacement2;
          nextSourcePosition = position2 + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
Object.defineProperty(dist, "__esModule", {
  value: true
});
dist.getRootUrl = dist.generateFilePath = dist.imagePath = dist.generateUrl = generateOcsUrl_1 = dist.generateOcsUrl = dist.generateRemoteUrl = dist.linkTo = void 0;
const linkTo = (app2, file) => generateFilePath(app2, "", file);
dist.linkTo = linkTo;
const linkToRemoteBase = (service) => getRootUrl() + "/remote.php/" + service;
const generateRemoteUrl = (service) => window.location.protocol + "//" + window.location.host + linkToRemoteBase(service);
dist.generateRemoteUrl = generateRemoteUrl;
const generateOcsUrl = (url, params, options) => {
  const allOptions = Object.assign({
    ocsVersion: 2
  }, options || {});
  const version2 = allOptions.ocsVersion === 1 ? 1 : 2;
  return window.location.protocol + "//" + window.location.host + getRootUrl() + "/ocs/v" + version2 + ".php" + _generateUrlPath(url, params, options);
};
var generateOcsUrl_1 = dist.generateOcsUrl = generateOcsUrl;
const _generateUrlPath = (url, params, options) => {
  const allOptions = Object.assign({
    escape: true
  }, options || {});
  const _build = function(text2, vars) {
    vars = vars || {};
    return text2.replace(/{([^{}]*)}/g, function(a, b) {
      var r = vars[b];
      if (allOptions.escape) {
        return typeof r === "string" || typeof r === "number" ? encodeURIComponent(r.toString()) : encodeURIComponent(a);
      } else {
        return typeof r === "string" || typeof r === "number" ? r.toString() : a;
      }
    });
  };
  if (url.charAt(0) !== "/") {
    url = "/" + url;
  }
  return _build(url, params || {});
};
const generateUrl = (url, params, options) => {
  const allOptions = Object.assign({
    noRewrite: false
  }, options || {});
  if (OC.config.modRewriteWorking === true && !allOptions.noRewrite) {
    return getRootUrl() + _generateUrlPath(url, params, options);
  }
  return getRootUrl() + "/index.php" + _generateUrlPath(url, params, options);
};
dist.generateUrl = generateUrl;
const imagePath = (app2, file) => {
  if (file.indexOf(".") === -1) {
    return generateFilePath(app2, "img", file + ".svg");
  }
  return generateFilePath(app2, "img", file);
};
dist.imagePath = imagePath;
const generateFilePath = (app2, type, file) => {
  const isCore = OC.coreApps.indexOf(app2) !== -1;
  let link2 = getRootUrl();
  if (file.substring(file.length - 3) === "php" && !isCore) {
    link2 += "/index.php/apps/" + app2;
    if (file !== "index.php") {
      link2 += "/";
      if (type) {
        link2 += encodeURI(type + "/");
      }
      link2 += file;
    }
  } else if (file.substring(file.length - 3) !== "php" && !isCore) {
    link2 = OC.appswebroots[app2];
    if (type) {
      link2 += "/" + type + "/";
    }
    if (link2.substring(link2.length - 1) !== "/") {
      link2 += "/";
    }
    link2 += file;
  } else {
    if ((app2 === "settings" || app2 === "core" || app2 === "search") && type === "ajax") {
      link2 += "/index.php/";
    } else {
      link2 += "/";
    }
    if (!isCore) {
      link2 += "apps/";
    }
    if (app2 !== "") {
      app2 += "/";
      link2 += app2;
    }
    if (type) {
      link2 += type + "/";
    }
    link2 += file;
  }
  return link2;
};
dist.generateFilePath = generateFilePath;
const getRootUrl = () => OC.webroot;
dist.getRootUrl = getRootUrl;
const URL_PATTERN = /(\s|^)(https?:\/\/)((?:[-A-Z0-9+_]+\.)+[-A-Z]+(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*)(\s|$)/ig;
const URL_PATTERN_AUTOLINK = /(\s|\(|^)((https?:\/\/)((?:[-A-Z0-9+_]+\.)+[-A-Z]+(?::[0-9]+)?(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*))(?=\s|\)|$)/ig;
const ReferenceList_vue_vue_type_style_index_0_scoped_5a4fd40e_lang = "";
const _sfc_main$3 = {
  name: "ReferenceList",
  components: { ReferenceWidget },
  props: {
    text: {
      type: String,
      default: ""
    },
    referenceData: {
      type: Object,
      default: null
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      references: null,
      loading: true
    };
  },
  computed: {
    values() {
      return this.referenceData ? this.referenceData : this.references ? Object.values(this.references) : [];
    },
    firstReference() {
      var _a2;
      return (_a2 = this.values[0]) != null ? _a2 : null;
    },
    displayedReferences() {
      return this.values.slice(0, this.limit);
    }
  },
  watch: {
    text: "fetch"
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      if (this.referenceData) {
        this.loading = false;
        return;
      }
      if (!new RegExp(URL_PATTERN).exec(this.text)) {
        this.loading = false;
        return;
      }
      this.resolve().then((response) => {
        this.references = response.data.ocs.data.references;
        this.loading = false;
      }).catch((error) => {
        console.error("Failed to extract references", error);
        this.loading = false;
      });
    },
    resolve() {
      const match2 = new RegExp(URL_PATTERN).exec(this.text.trim());
      if (this.limit === 1 && match2) {
        return cancelableClient.get(generateOcsUrl_1("references/resolve", 2) + `?reference=${encodeURIComponent(match2[0])}`);
      }
      return cancelableClient.post(generateOcsUrl_1("references/extract", 2), {
        text: this.text,
        resolve: true,
        limit: this.limit
      });
    }
  }
};
var _sfc_render$3 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "widgets--list", class: { "icon-loading": _vm.loading } }, _vm._l(_vm.displayedReferences, function(reference) {
    return _c("div", { key: reference.openGraphObject.id }, [_c("ReferenceWidget", { attrs: { "reference": reference } })], 1);
  }), 0);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  "5a4fd40e",
  null,
  null
);
const ReferenceList = __component__$3.exports;
function toString2(node, options) {
  var { includeImageAlt = true } = options || {};
  return one$1(node, includeImageAlt);
}
function one$1(node, includeImageAlt) {
  return node && typeof node === "object" && (node.value || (includeImageAlt ? node.alt : "") || "children" in node && all$1(node.children, includeImageAlt) || Array.isArray(node) && all$1(node, includeImageAlt)) || "";
}
function all$1(values, includeImageAlt) {
  var result = [];
  var index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one$1(values[index2], includeImageAlt);
  }
  return result.join("");
}
function splice(list2, start, remove2, items) {
  const end = list2.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove2 = remove2 > 0 ? remove2 : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove2);
    [].splice.apply(list2, parameters);
  } else {
    if (remove2)
      [].splice.apply(list2, [start, remove2]);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      [].splice.apply(list2, parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
function push(list2, items) {
  if (list2.length > 0) {
    splice(list2, list2.length, 0, items);
    return list2;
  }
  return items;
}
const hasOwnProperty$1 = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all3 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all3, extensions[index2]);
  }
  return all3;
}
function syntaxExtension(all3, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty$1.call(all3, hook) ? all3[hook] : void 0;
    const left = maybe || (all3[hook] = {});
    const right = extension2[hook];
    let code2;
    for (code2 in right) {
      if (!hasOwnProperty$1.call(left, code2))
        left[code2] = [];
      const value = right[code2];
      constructs(
        left[code2],
        Array.isArray(value) ? value : value ? [value] : []
      );
    }
  }
}
function constructs(existing, list2) {
  let index2 = -1;
  const before = [];
  while (++index2 < list2.length) {
    (list2[index2].add === "after" ? existing : before).push(list2[index2]);
  }
  splice(existing, 0, 0, before);
}
const unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code2) {
  return code2 !== null && (code2 < 32 || code2 === 127);
}
function markdownLineEndingOrSpace(code2) {
  return code2 !== null && (code2 < 0 || code2 === 32);
}
function markdownLineEnding(code2) {
  return code2 !== null && code2 < -2;
}
function markdownSpace(code2) {
  return code2 === -2 || code2 === -1 || code2 === 32;
}
const unicodeWhitespace = regexCheck(/\s/);
const unicodePunctuation = regexCheck(unicodePunctuationRegex);
function regexCheck(regex) {
  return check2;
  function check2(code2) {
    return code2 !== null && regex.test(String.fromCharCode(code2));
  }
}
function factorySpace(effects, ok2, type, max2) {
  const limit = max2 ? max2 - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code2) {
    if (markdownSpace(code2)) {
      effects.enter(type);
      return prefix(code2);
    }
    return ok2(code2);
  }
  function prefix(code2) {
    if (markdownSpace(code2) && size++ < limit) {
      effects.consume(code2);
      return prefix;
    }
    effects.exit(type);
    return ok2(code2);
  }
}
const content$1 = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  let previous2;
  return contentStart;
  function afterContentStartConstruct(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code2) {
    effects.enter("paragraph");
    return lineStart(code2);
  }
  function lineStart(code2) {
    const token2 = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2
    });
    if (previous2) {
      previous2.next = token2;
    }
    previous2 = token2;
    return data2(code2);
  }
  function data2(code2) {
    if (code2 === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code2);
      return;
    }
    if (markdownLineEnding(code2)) {
      effects.consume(code2);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code2);
    return data2;
  }
}
const document$2 = {
  tokenize: initializeDocument
};
const containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self2 = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code2) {
    if (continued < stack.length) {
      const item = stack[continued];
      self2.containerState = item[1];
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code2);
    }
    return checkNewContainers(code2);
  }
  function documentContinue(code2) {
    continued++;
    if (self2.containerState._closeFlow) {
      self2.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self2.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point2;
      while (indexBeforeFlow--) {
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          point2 = self2.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self2.events.length) {
        self2.events[index2][1].end = Object.assign({}, point2);
        index2++;
      }
      splice(
        self2.events,
        indexBeforeFlow + 1,
        0,
        self2.events.slice(indexBeforeExits)
      );
      self2.events.length = index2;
      return checkNewContainers(code2);
    }
    return start(code2);
  }
  function checkNewContainers(code2) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code2);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code2);
      }
      self2.interrupt = Boolean(
        childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
      );
    }
    self2.containerState = {};
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code2);
  }
  function thereIsANewContainer(code2) {
    if (childFlow)
      closeFlow();
    exitContainers(continued);
    return documentContinued(code2);
  }
  function thereIsNoNewContainer(code2) {
    self2.parser.lazy[self2.now().line] = continued !== stack.length;
    lineStartOffset = self2.now().offset;
    return flowStart(code2);
  }
  function documentContinued(code2) {
    self2.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code2);
  }
  function containerContinue(code2) {
    continued++;
    stack.push([self2.currentConstruct, self2.containerState]);
    return documentContinued(code2);
  }
  function flowStart(code2) {
    if (code2 === null) {
      if (childFlow)
        closeFlow();
      exitContainers(0);
      effects.consume(code2);
      return;
    }
    childFlow = childFlow || self2.parser.flow(self2.now());
    effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code2);
  }
  function flowContinue(code2) {
    if (code2 === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code2);
      return;
    }
    if (markdownLineEnding(code2)) {
      effects.consume(code2);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self2.interrupt = void 0;
      return start;
    }
    effects.consume(code2);
    return flowContinue;
  }
  function writeToChild(token2, eof) {
    const stream = self2.sliceStream(token2);
    if (eof)
      stream.push(null);
    token2.previous = childToken;
    if (childToken)
      childToken.next = token2;
    childToken = token2;
    childFlow.defineSkip(token2.start);
    childFlow.write(stream);
    if (self2.parser.lazy[token2.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (childFlow.events[index2][1].start.offset < lineStartOffset && (!childFlow.events[index2][1].end || childFlow.events[index2][1].end.offset > lineStartOffset)) {
          return;
        }
      }
      const indexBeforeExits = self2.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point2;
      while (indexBeforeFlow--) {
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point2 = self2.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self2.events.length) {
        self2.events[index2][1].end = Object.assign({}, point2);
        index2++;
      }
      splice(
        self2.events,
        indexBeforeFlow + 1,
        0,
        self2.events.slice(indexBeforeExits)
      );
      self2.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self2.containerState = entry[1];
      entry[0].exit.call(self2, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self2.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function classifyCharacter(code2) {
  if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
    return 1;
  }
  if (unicodePunctuation(code2)) {
    return 2;
  }
}
function resolveAll(constructs2, events2, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll;
    if (resolve && !called.includes(resolve)) {
      events2 = resolve(events2, context);
      called.push(resolve);
    }
  }
  return events2;
}
const attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};
function resolveAllAttention(events2, context) {
  let index2 = -1;
  let open;
  let group;
  let text2;
  let openingSequence;
  let closingSequence;
  let use2;
  let nextEvents;
  let offset;
  while (++index2 < events2.length) {
    if (events2[index2][0] === "enter" && events2[index2][1].type === "attentionSequence" && events2[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events2[open][0] === "exit" && events2[open][1].type === "attentionSequence" && events2[open][1]._open && context.sliceSerialize(events2[open][1]).charCodeAt(0) === context.sliceSerialize(events2[index2][1]).charCodeAt(0)) {
          if ((events2[open][1]._close || events2[index2][1]._open) && (events2[index2][1].end.offset - events2[index2][1].start.offset) % 3 && !((events2[open][1].end.offset - events2[open][1].start.offset + events2[index2][1].end.offset - events2[index2][1].start.offset) % 3)) {
            continue;
          }
          use2 = events2[open][1].end.offset - events2[open][1].start.offset > 1 && events2[index2][1].end.offset - events2[index2][1].start.offset > 1 ? 2 : 1;
          const start = Object.assign({}, events2[open][1].end);
          const end = Object.assign({}, events2[index2][1].start);
          movePoint(start, -use2);
          movePoint(end, use2);
          openingSequence = {
            type: use2 > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: Object.assign({}, events2[open][1].end)
          };
          closingSequence = {
            type: use2 > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events2[index2][1].start),
            end
          };
          text2 = {
            type: use2 > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events2[open][1].end),
            end: Object.assign({}, events2[index2][1].start)
          };
          group = {
            type: use2 > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          };
          events2[open][1].end = Object.assign({}, openingSequence.start);
          events2[index2][1].start = Object.assign({}, closingSequence.end);
          nextEvents = [];
          if (events2[open][1].end.offset - events2[open][1].start.offset) {
            nextEvents = push(nextEvents, [
              ["enter", events2[open][1], context],
              ["exit", events2[open][1], context]
            ]);
          }
          nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text2, context]
          ]);
          nextEvents = push(
            nextEvents,
            resolveAll(
              context.parser.constructs.insideSpan.null,
              events2.slice(open + 1, index2),
              context
            )
          );
          nextEvents = push(nextEvents, [
            ["exit", text2, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context]
          ]);
          if (events2[index2][1].end.offset - events2[index2][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [
              ["enter", events2[index2][1], context],
              ["exit", events2[index2][1], context]
            ]);
          } else {
            offset = 0;
          }
          splice(events2, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events2.length) {
    if (events2[index2][1].type === "attentionSequence") {
      events2[index2][1].type = "data";
    }
  }
  return events2;
}
function tokenizeAttention(effects, ok2) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous2 = this.previous;
  const before = classifyCharacter(previous2);
  let marker;
  return start;
  function start(code2) {
    effects.enter("attentionSequence");
    marker = code2;
    return sequence(code2);
  }
  function sequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return sequence;
    }
    const token2 = effects.exit("attentionSequence");
    const after = classifyCharacter(code2);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code2);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
    token2._open = Boolean(marker === 42 ? open : open && (before || !close));
    token2._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok2(code2);
  }
}
function movePoint(point2, offset) {
  point2.column += offset;
  point2.offset += offset;
  point2._bufferIndex += offset;
}
const autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok2, nok) {
  let size = 1;
  return start;
  function start(code2) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code2);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  function open(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return schemeOrEmailAtext;
    }
    return asciiAtext(code2) ? emailAtext(code2) : nok(code2);
  }
  function schemeOrEmailAtext(code2) {
    return code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2) ? schemeInsideOrEmailAtext(code2) : emailAtext(code2);
  }
  function schemeInsideOrEmailAtext(code2) {
    if (code2 === 58) {
      effects.consume(code2);
      return urlInside;
    }
    if ((code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) && size++ < 32) {
      effects.consume(code2);
      return schemeInsideOrEmailAtext;
    }
    return emailAtext(code2);
  }
  function urlInside(code2) {
    if (code2 === 62) {
      effects.exit("autolinkProtocol");
      return end(code2);
    }
    if (code2 === null || code2 === 32 || code2 === 60 || asciiControl(code2)) {
      return nok(code2);
    }
    effects.consume(code2);
    return urlInside;
  }
  function emailAtext(code2) {
    if (code2 === 64) {
      effects.consume(code2);
      size = 0;
      return emailAtSignOrDot;
    }
    if (asciiAtext(code2)) {
      effects.consume(code2);
      return emailAtext;
    }
    return nok(code2);
  }
  function emailAtSignOrDot(code2) {
    return asciiAlphanumeric(code2) ? emailLabel(code2) : nok(code2);
  }
  function emailLabel(code2) {
    if (code2 === 46) {
      effects.consume(code2);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code2 === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      return end(code2);
    }
    return emailValue(code2);
  }
  function emailValue(code2) {
    if ((code2 === 45 || asciiAlphanumeric(code2)) && size++ < 63) {
      effects.consume(code2);
      return code2 === 45 ? emailValue : emailLabel;
    }
    return nok(code2);
  }
  function end(code2) {
    effects.enter("autolinkMarker");
    effects.consume(code2);
    effects.exit("autolinkMarker");
    effects.exit("autolink");
    return ok2;
  }
}
const blankLine = {
  tokenize: tokenizeBlankLine,
  partial: true
};
function tokenizeBlankLine(effects, ok2, nok) {
  return factorySpace(effects, afterWhitespace, "linePrefix");
  function afterWhitespace(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
const blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit
};
function tokenizeBlockQuoteStart(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    if (code2 === 62) {
      const state = self2.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code2);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    if (markdownSpace(code2)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code2);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok2;
    }
    effects.exit("blockQuotePrefix");
    return ok2(code2);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(blockQuote, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function exit(effects) {
  effects.exit("blockQuote");
}
const characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code2);
    effects.exit("escapeMarker");
    return open;
  }
  function open(code2) {
    if (asciiPunctuation(code2)) {
      effects.enter("characterEscapeValue");
      effects.consume(code2);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok2;
    }
    return nok(code2);
  }
}
const element$1 = document.createElement("i");
function decodeNamedCharacterReference(value) {
  const characterReference2 = "&" + value + ";";
  element$1.innerHTML = characterReference2;
  const char = element$1.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
    return false;
  }
  return char === characterReference2 ? false : char;
}
const characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok2, nok) {
  const self2 = this;
  let size = 0;
  let max2;
  let test2;
  return start;
  function start(code2) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code2);
    effects.exit("characterReferenceMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code2);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric2;
    }
    effects.enter("characterReferenceValue");
    max2 = 31;
    test2 = asciiAlphanumeric;
    return value(code2);
  }
  function numeric2(code2) {
    if (code2 === 88 || code2 === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code2);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max2 = 6;
      test2 = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max2 = 7;
    test2 = asciiDigit;
    return value(code2);
  }
  function value(code2) {
    let token2;
    if (code2 === 59 && size) {
      token2 = effects.exit("characterReferenceValue");
      if (test2 === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token2))) {
        return nok(code2);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code2);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok2;
    }
    if (test2(code2) && size++ < max2) {
      effects.consume(code2);
      return value;
    }
    return nok(code2);
  }
}
const codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: true
};
function tokenizeCodeFenced(effects, ok2, nok) {
  const self2 = this;
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  const nonLazyLine = {
    tokenize: tokenizeNonLazyLine,
    partial: true
  };
  const tail = this.events[this.events.length - 1];
  const initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let sizeOpen = 0;
  let marker;
  return start;
  function start(code2) {
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    marker = code2;
    return sequenceOpen(code2);
  }
  function sequenceOpen(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeFencedFenceSequence");
    return sizeOpen < 3 ? nok(code2) : factorySpace(effects, infoOpen, "whitespace")(code2);
  }
  function infoOpen(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return openAfter(code2);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code2);
  }
  function info(code2) {
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, infoAfter, "whitespace")(code2);
    }
    if (code2 === 96 && code2 === marker)
      return nok(code2);
    effects.consume(code2);
    return info;
  }
  function infoAfter(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return openAfter(code2);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code2);
  }
  function meta(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return openAfter(code2);
    }
    if (code2 === 96 && code2 === marker)
      return nok(code2);
    effects.consume(code2);
    return meta;
  }
  function openAfter(code2) {
    effects.exit("codeFencedFence");
    return self2.interrupt ? ok2(code2) : contentStart(code2);
  }
  function contentStart(code2) {
    if (code2 === null) {
      return after(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(
        nonLazyLine,
        effects.attempt(
          closingFenceConstruct,
          after,
          initialPrefix ? factorySpace(
            effects,
            contentStart,
            "linePrefix",
            initialPrefix + 1
          ) : contentStart
        ),
        after
      )(code2);
    }
    effects.enter("codeFlowValue");
    return contentContinue(code2);
  }
  function contentContinue(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("codeFlowValue");
      return contentStart(code2);
    }
    effects.consume(code2);
    return contentContinue;
  }
  function after(code2) {
    effects.exit("codeFenced");
    return ok2(code2);
  }
  function tokenizeNonLazyLine(effects2, ok3, nok2) {
    const self3 = this;
    return start2;
    function start2(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self3.parser.lazy[self3.now().line] ? nok2(code2) : ok3(code2);
    }
  }
  function tokenizeClosingFence(effects2, ok3, nok2) {
    let size = 0;
    return factorySpace(
      effects2,
      closingSequenceStart,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function closingSequenceStart(code2) {
      effects2.enter("codeFencedFence");
      effects2.enter("codeFencedFenceSequence");
      return closingSequence(code2);
    }
    function closingSequence(code2) {
      if (code2 === marker) {
        effects2.consume(code2);
        size++;
        return closingSequence;
      }
      if (size < sizeOpen)
        return nok2(code2);
      effects2.exit("codeFencedFenceSequence");
      return factorySpace(effects2, closingSequenceEnd, "whitespace")(code2);
    }
    function closingSequenceEnd(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects2.exit("codeFencedFence");
        return ok3(code2);
      }
      return nok2(code2);
    }
  }
}
const codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
const indentedContent = {
  tokenize: tokenizeIndentedContent,
  partial: true
};
function tokenizeCodeIndented(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code2);
  }
  function afterStartPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? afterPrefix(code2) : nok(code2);
  }
  function afterPrefix(code2) {
    if (code2 === null) {
      return after(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(indentedContent, afterPrefix, after)(code2);
    }
    effects.enter("codeFlowValue");
    return content2(code2);
  }
  function content2(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("codeFlowValue");
      return afterPrefix(code2);
    }
    effects.consume(code2);
    return content2;
  }
  function after(code2) {
    effects.exit("codeIndented");
    return ok2(code2);
  }
}
function tokenizeIndentedContent(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    if (self2.parser.lazy[self2.now().line]) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return start;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
  }
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code2) : markdownLineEnding(code2) ? start(code2) : nok(code2);
  }
}
const codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
};
function resolveCodeText(events2) {
  let tailExitIndex = events2.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter2;
  if ((events2[headEnterIndex][1].type === "lineEnding" || events2[headEnterIndex][1].type === "space") && (events2[tailExitIndex][1].type === "lineEnding" || events2[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events2[index2][1].type === "codeTextData") {
        events2[headEnterIndex][1].type = "codeTextPadding";
        events2[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter2 === void 0) {
      if (index2 !== tailExitIndex && events2[index2][1].type !== "lineEnding") {
        enter2 = index2;
      }
    } else if (index2 === tailExitIndex || events2[index2][1].type === "lineEnding") {
      events2[enter2][1].type = "codeTextData";
      if (index2 !== enter2 + 2) {
        events2[enter2][1].end = events2[index2 - 1][1].end;
        events2.splice(enter2 + 2, index2 - enter2 - 2);
        tailExitIndex -= index2 - enter2 - 2;
        index2 = enter2 + 2;
      }
      enter2 = void 0;
    }
  }
  return events2;
}
function previous(code2) {
  return code2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok2, nok) {
  let sizeOpen = 0;
  let size;
  let token2;
  return start;
  function start(code2) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return openingSequence(code2);
  }
  function openingSequence(code2) {
    if (code2 === 96) {
      effects.consume(code2);
      sizeOpen++;
      return openingSequence;
    }
    effects.exit("codeTextSequence");
    return gap(code2);
  }
  function gap(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 96) {
      token2 = effects.enter("codeTextSequence");
      size = 0;
      return closingSequence(code2);
    }
    if (code2 === 32) {
      effects.enter("space");
      effects.consume(code2);
      effects.exit("space");
      return gap;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return gap;
    }
    effects.enter("codeTextData");
    return data2(code2);
  }
  function data2(code2) {
    if (code2 === null || code2 === 32 || code2 === 96 || markdownLineEnding(code2)) {
      effects.exit("codeTextData");
      return gap(code2);
    }
    effects.consume(code2);
    return data2;
  }
  function closingSequence(code2) {
    if (code2 === 96) {
      effects.consume(code2);
      size++;
      return closingSequence;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok2(code2);
    }
    token2.type = "codeTextData";
    return data2(code2);
  }
}
function subtokenize(events2) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  while (++index2 < events2.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events2[index2];
    if (index2 && event[1].type === "chunkFlow" && events2[index2 - 1][1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events2, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events2[otherIndex];
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events2[lineIndex][1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = Object.assign({}, events2[lineIndex][1].start);
        parameters = events2.slice(lineIndex, index2);
        parameters.unshift(event);
        splice(events2, lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  return !more;
}
function subcontent(events2, eventIndex) {
  const token2 = events2[eventIndex][1];
  const context = events2[eventIndex][2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  const tokenizer = token2._tokenizer || context.parser[token2.contentType](token2.start);
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous2;
  let index2 = -1;
  let current = token2;
  let adjust = 0;
  let start = 0;
  const breaks = [start];
  while (current) {
    while (events2[++startPosition][1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous2) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous2 = current;
    current = current.next;
  }
  current = token2;
  while (++index2 < childEvents.length) {
    if (childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line) {
      start = index2 + 1;
      breaks.push(start);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start2 = startPositions.pop();
    jumps.unshift([start2, start2 + slice.length - 1]);
    splice(events2, start2, 2, slice);
  }
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}
const content = {
  tokenize: tokenizeContent,
  resolve: resolveContent
};
const continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
};
function resolveContent(events2) {
  subtokenize(events2);
  return events2;
}
function tokenizeContent(effects, ok2) {
  let previous2;
  return start;
  function start(code2) {
    effects.enter("content");
    previous2 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return data2(code2);
  }
  function data2(code2) {
    if (code2 === null) {
      return contentEnd(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code2);
    }
    effects.consume(code2);
    return data2;
  }
  function contentEnd(code2) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok2(code2);
  }
  function contentContinue(code2) {
    effects.consume(code2);
    effects.exit("chunkContent");
    previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2
    });
    previous2 = previous2.next;
    return data2;
  }
}
function tokenizeContinuation(effects, ok2, nok) {
  const self2 = this;
  return startLookahead;
  function startLookahead(code2) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return nok(code2);
    }
    const tail = self2.events[self2.events.length - 1];
    if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok2(code2);
    }
    return effects.interrupt(self2.parser.constructs.flow, nok, ok2)(code2);
  }
}
function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max2) {
  const limit = max2 || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;
  function start(code2) {
    if (code2 === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code2);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore;
    }
    if (code2 === null || code2 === 41 || asciiControl(code2)) {
      return nok(code2);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationRaw(code2);
  }
  function destinationEnclosedBefore(code2) {
    if (code2 === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code2);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationEnclosed(code2);
  }
  function destinationEnclosed(code2) {
    if (code2 === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return destinationEnclosedBefore(code2);
    }
    if (code2 === null || code2 === 60 || markdownLineEnding(code2)) {
      return nok(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? destinationEnclosedEscape : destinationEnclosed;
  }
  function destinationEnclosedEscape(code2) {
    if (code2 === 60 || code2 === 62 || code2 === 92) {
      effects.consume(code2);
      return destinationEnclosed;
    }
    return destinationEnclosed(code2);
  }
  function destinationRaw(code2) {
    if (code2 === 40) {
      if (++balance > limit)
        return nok(code2);
      effects.consume(code2);
      return destinationRaw;
    }
    if (code2 === 41) {
      if (!balance--) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code2);
      }
      effects.consume(code2);
      return destinationRaw;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      if (balance)
        return nok(code2);
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok2(code2);
    }
    if (asciiControl(code2))
      return nok(code2);
    effects.consume(code2);
    return code2 === 92 ? destinationRawEscape : destinationRaw;
  }
  function destinationRawEscape(code2) {
    if (code2 === 40 || code2 === 41 || code2 === 92) {
      effects.consume(code2);
      return destinationRaw;
    }
    return destinationRaw(code2);
  }
}
function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
  const self2 = this;
  let size = 0;
  let data2;
  return start;
  function start(code2) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code2);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code2) {
    if (code2 === null || code2 === 91 || code2 === 93 && !data2 || code2 === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs || size > 999) {
      return nok(code2);
    }
    if (code2 === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return label(code2);
  }
  function label(code2) {
    if (code2 === null || code2 === 91 || code2 === 93 || markdownLineEnding(code2) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code2);
    }
    effects.consume(code2);
    data2 = data2 || !markdownSpace(code2);
    return code2 === 92 ? labelEscape : label;
  }
  function labelEscape(code2) {
    if (code2 === 91 || code2 === 92 || code2 === 93) {
      effects.consume(code2);
      size++;
      return label;
    }
    return label(code2);
  }
}
function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
  let marker;
  return start;
  function start(code2) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code2);
    effects.exit(markerType);
    marker = code2 === 40 ? 41 : code2;
    return atFirstTitleBreak;
  }
  function atFirstTitleBreak(code2) {
    if (code2 === marker) {
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    return atTitleBreak(code2);
  }
  function atTitleBreak(code2) {
    if (code2 === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker);
    }
    if (code2 === null) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, atTitleBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return title(code2);
  }
  function title(code2) {
    if (code2 === marker || code2 === null || markdownLineEnding(code2)) {
      effects.exit("chunkString");
      return atTitleBreak(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? titleEscape : title;
  }
  function titleEscape(code2) {
    if (code2 === marker || code2 === 92) {
      effects.consume(code2);
      return title;
    }
    return title(code2);
  }
}
function factoryWhitespace(effects, ok2) {
  let seen;
  return start;
  function start(code2) {
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code2)) {
      return factorySpace(
        effects,
        start,
        seen ? "linePrefix" : "lineSuffix"
      )(code2);
    }
    return ok2(code2);
  }
}
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
const titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};
function tokenizeDefinition(effects, ok2, nok) {
  const self2 = this;
  let identifier;
  return start;
  function start(code2) {
    effects.enter("definition");
    return factoryLabel.call(
      self2,
      effects,
      labelAfter,
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code2);
  }
  function labelAfter(code2) {
    identifier = normalizeIdentifier(
      self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1)
    );
    if (code2 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code2);
      effects.exit("definitionMarker");
      return factoryWhitespace(
        effects,
        factoryDestination(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace(effects, after, "whitespace"),
            factorySpace(effects, after, "whitespace")
          ),
          nok,
          "definitionDestination",
          "definitionDestinationLiteral",
          "definitionDestinationLiteralMarker",
          "definitionDestinationRaw",
          "definitionDestinationString"
        )
      );
    }
    return nok(code2);
  }
  function after(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("definition");
      if (!self2.parser.defined.includes(identifier)) {
        self2.parser.defined.push(identifier);
      }
      return ok2(code2);
    }
    return nok(code2);
  }
}
function tokenizeTitle(effects, ok2, nok) {
  return start;
  function start(code2) {
    return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, before)(code2) : nok(code2);
  }
  function before(code2) {
    if (code2 === 34 || code2 === 39 || code2 === 40) {
      return factoryTitle(
        effects,
        factorySpace(effects, after, "whitespace"),
        nok,
        "definitionTitle",
        "definitionTitleMarker",
        "definitionTitleString"
      )(code2);
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
const hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("hardBreakEscape");
    effects.enter("escapeMarker");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (markdownLineEnding(code2)) {
      effects.exit("escapeMarker");
      effects.exit("hardBreakEscape");
      return ok2(code2);
    }
    return nok(code2);
  }
}
const headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};
function resolveHeadingAtx(events2, context) {
  let contentEnd = events2.length - 2;
  let contentStart = 3;
  let content2;
  let text2;
  if (events2[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events2[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events2[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events2[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content2 = {
      type: "atxHeadingText",
      start: events2[contentStart][1].start,
      end: events2[contentEnd][1].end
    };
    text2 = {
      type: "chunkText",
      start: events2[contentStart][1].start,
      end: events2[contentEnd][1].end,
      contentType: "text"
    };
    splice(events2, contentStart, contentEnd - contentStart + 1, [
      ["enter", content2, context],
      ["enter", text2, context],
      ["exit", text2, context],
      ["exit", content2, context]
    ]);
  }
  return events2;
}
function tokenizeHeadingAtx(effects, ok2, nok) {
  const self2 = this;
  let size = 0;
  return start;
  function start(code2) {
    effects.enter("atxHeading");
    effects.enter("atxHeadingSequence");
    return fenceOpenInside(code2);
  }
  function fenceOpenInside(code2) {
    if (code2 === 35 && size++ < 6) {
      effects.consume(code2);
      return fenceOpenInside;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      effects.exit("atxHeadingSequence");
      return self2.interrupt ? ok2(code2) : headingBreak(code2);
    }
    return nok(code2);
  }
  function headingBreak(code2) {
    if (code2 === 35) {
      effects.enter("atxHeadingSequence");
      return sequence(code2);
    }
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("atxHeading");
      return ok2(code2);
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, headingBreak, "whitespace")(code2);
    }
    effects.enter("atxHeadingText");
    return data2(code2);
  }
  function sequence(code2) {
    if (code2 === 35) {
      effects.consume(code2);
      return sequence;
    }
    effects.exit("atxHeadingSequence");
    return headingBreak(code2);
  }
  function data2(code2) {
    if (code2 === null || code2 === 35 || markdownLineEndingOrSpace(code2)) {
      effects.exit("atxHeadingText");
      return headingBreak(code2);
    }
    effects.consume(code2);
    return data2;
  }
}
const htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
const htmlRawNames = ["pre", "script", "style", "textarea"];
const htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
const nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};
function resolveToHtmlFlow(events2) {
  let index2 = events2.length;
  while (index2--) {
    if (events2[index2][0] === "enter" && events2[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events2[index2 - 2][1].type === "linePrefix") {
    events2[index2][1].start = events2[index2 - 2][1].start;
    events2[index2 + 1][1].start = events2[index2 - 2][1].start;
    events2.splice(index2 - 2, 2);
  }
  return events2;
}
function tokenizeHtmlFlow(effects, ok2, nok) {
  const self2 = this;
  let kind;
  let startTag;
  let buffer;
  let index2;
  let marker;
  return start;
  function start(code2) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (code2 === 33) {
      effects.consume(code2);
      return declarationStart;
    }
    if (code2 === 47) {
      effects.consume(code2);
      return tagCloseStart;
    }
    if (code2 === 63) {
      effects.consume(code2);
      kind = 3;
      return self2.interrupt ? ok2 : continuationDeclarationInside;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      buffer = String.fromCharCode(code2);
      startTag = true;
      return tagName2;
    }
    return nok(code2);
  }
  function declarationStart(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      kind = 2;
      return commentOpenInside;
    }
    if (code2 === 91) {
      effects.consume(code2);
      kind = 5;
      buffer = "CDATA[";
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      kind = 4;
      return self2.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code2);
  }
  function commentOpenInside(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return self2.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code2);
  }
  function cdataOpenInside(code2) {
    if (code2 === buffer.charCodeAt(index2++)) {
      effects.consume(code2);
      return index2 === buffer.length ? self2.interrupt ? ok2 : continuation : cdataOpenInside;
    }
    return nok(code2);
  }
  function tagCloseStart(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      buffer = String.fromCharCode(code2);
      return tagName2;
    }
    return nok(code2);
  }
  function tagName2(code2) {
    if (code2 === null || code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
      if (code2 !== 47 && startTag && htmlRawNames.includes(buffer.toLowerCase())) {
        kind = 1;
        return self2.interrupt ? ok2(code2) : continuation(code2);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        kind = 6;
        if (code2 === 47) {
          effects.consume(code2);
          return basicSelfClosing;
        }
        return self2.interrupt ? ok2(code2) : continuation(code2);
      }
      kind = 7;
      return self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code2) : startTag ? completeAttributeNameBefore(code2) : completeClosingTagAfter(code2);
    }
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      buffer += String.fromCharCode(code2);
      return tagName2;
    }
    return nok(code2);
  }
  function basicSelfClosing(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return self2.interrupt ? ok2 : continuation;
    }
    return nok(code2);
  }
  function completeClosingTagAfter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeClosingTagAfter;
    }
    return completeEnd(code2);
  }
  function completeAttributeNameBefore(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return completeEnd;
    }
    if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
      effects.consume(code2);
      return completeAttributeName;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeNameBefore;
    }
    return completeEnd(code2);
  }
  function completeAttributeName(code2) {
    if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code2);
  }
  function completeAttributeNameAfter(code2) {
    if (code2 === 61) {
      effects.consume(code2);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code2);
  }
  function completeAttributeValueBefore(code2) {
    if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 34 || code2 === 39) {
      effects.consume(code2);
      marker = code2;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeValueBefore;
    }
    marker = null;
    return completeAttributeValueUnquoted(code2);
  }
  function completeAttributeValueQuoted(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return nok(code2);
    }
    if (code2 === marker) {
      effects.consume(code2);
      return completeAttributeValueQuotedAfter;
    }
    effects.consume(code2);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code2) {
    if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96 || markdownLineEndingOrSpace(code2)) {
      return completeAttributeNameAfter(code2);
    }
    effects.consume(code2);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code2) {
    if (code2 === 47 || code2 === 62 || markdownSpace(code2)) {
      return completeAttributeNameBefore(code2);
    }
    return nok(code2);
  }
  function completeEnd(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return completeAfter;
    }
    return nok(code2);
  }
  function completeAfter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAfter;
    }
    return code2 === null || markdownLineEnding(code2) ? continuation(code2) : nok(code2);
  }
  function continuation(code2) {
    if (code2 === 45 && kind === 2) {
      effects.consume(code2);
      return continuationCommentInside;
    }
    if (code2 === 60 && kind === 1) {
      effects.consume(code2);
      return continuationRawTagOpen;
    }
    if (code2 === 62 && kind === 4) {
      effects.consume(code2);
      return continuationClose;
    }
    if (code2 === 63 && kind === 3) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    if (code2 === 93 && kind === 5) {
      effects.consume(code2);
      return continuationCharacterDataInside;
    }
    if (markdownLineEnding(code2) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code2);
    }
    if (code2 === null || markdownLineEnding(code2)) {
      return continuationAtLineEnding(code2);
    }
    effects.consume(code2);
    return continuation;
  }
  function continuationAtLineEnding(code2) {
    effects.exit("htmlFlowData");
    return htmlContinueStart(code2);
  }
  function htmlContinueStart(code2) {
    if (code2 === null) {
      return done(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(
        {
          tokenize: htmlLineEnd,
          partial: true
        },
        htmlContinueStart,
        done
      )(code2);
    }
    effects.enter("htmlFlowData");
    return continuation(code2);
  }
  function htmlLineEnd(effects2, ok3, nok2) {
    return start2;
    function start2(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self2.parser.lazy[self2.now().line] ? nok2(code2) : ok3(code2);
    }
  }
  function continuationCommentInside(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationRawTagOpen(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      buffer = "";
      return continuationRawEndTag;
    }
    return continuation(code2);
  }
  function continuationRawEndTag(code2) {
    if (code2 === 62 && htmlRawNames.includes(buffer.toLowerCase())) {
      effects.consume(code2);
      return continuationClose;
    }
    if (asciiAlpha(code2) && buffer.length < 8) {
      effects.consume(code2);
      buffer += String.fromCharCode(code2);
      return continuationRawEndTag;
    }
    return continuation(code2);
  }
  function continuationCharacterDataInside(code2) {
    if (code2 === 93) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationDeclarationInside(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return continuationClose;
    }
    if (code2 === 45 && kind === 2) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationClose(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("htmlFlowData");
      return done(code2);
    }
    effects.consume(code2);
    return continuationClose;
  }
  function done(code2) {
    effects.exit("htmlFlow");
    return ok2(code2);
  }
}
function tokenizeNextBlank(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.exit("htmlFlowData");
    effects.enter("lineEndingBlank");
    effects.consume(code2);
    effects.exit("lineEndingBlank");
    return effects.attempt(blankLine, ok2, nok);
  }
}
const htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok2, nok) {
  const self2 = this;
  let marker;
  let buffer;
  let index2;
  let returnState;
  return start;
  function start(code2) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (code2 === 33) {
      effects.consume(code2);
      return declarationOpen;
    }
    if (code2 === 47) {
      effects.consume(code2);
      return tagCloseStart;
    }
    if (code2 === 63) {
      effects.consume(code2);
      return instruction;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return tagOpen;
    }
    return nok(code2);
  }
  function declarationOpen(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return commentOpen;
    }
    if (code2 === 91) {
      effects.consume(code2);
      buffer = "CDATA[";
      index2 = 0;
      return cdataOpen;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return declaration;
    }
    return nok(code2);
  }
  function commentOpen(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return commentStart;
    }
    return nok(code2);
  }
  function commentStart(code2) {
    if (code2 === null || code2 === 62) {
      return nok(code2);
    }
    if (code2 === 45) {
      effects.consume(code2);
      return commentStartDash;
    }
    return comment(code2);
  }
  function commentStartDash(code2) {
    if (code2 === null || code2 === 62) {
      return nok(code2);
    }
    return comment(code2);
  }
  function comment(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 45) {
      effects.consume(code2);
      return commentClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = comment;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return comment;
  }
  function commentClose(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return end;
    }
    return comment(code2);
  }
  function cdataOpen(code2) {
    if (code2 === buffer.charCodeAt(index2++)) {
      effects.consume(code2);
      return index2 === buffer.length ? cdata : cdataOpen;
    }
    return nok(code2);
  }
  function cdata(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 93) {
      effects.consume(code2);
      return cdataClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = cdata;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return cdata;
  }
  function cdataClose(code2) {
    if (code2 === 93) {
      effects.consume(code2);
      return cdataEnd;
    }
    return cdata(code2);
  }
  function cdataEnd(code2) {
    if (code2 === 62) {
      return end(code2);
    }
    if (code2 === 93) {
      effects.consume(code2);
      return cdataEnd;
    }
    return cdata(code2);
  }
  function declaration(code2) {
    if (code2 === null || code2 === 62) {
      return end(code2);
    }
    if (markdownLineEnding(code2)) {
      returnState = declaration;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return declaration;
  }
  function instruction(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 63) {
      effects.consume(code2);
      return instructionClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = instruction;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return instruction;
  }
  function instructionClose(code2) {
    return code2 === 62 ? end(code2) : instruction(code2);
  }
  function tagCloseStart(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return tagClose;
    }
    return nok(code2);
  }
  function tagClose(code2) {
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagClose;
    }
    return tagCloseBetween(code2);
  }
  function tagCloseBetween(code2) {
    if (markdownLineEnding(code2)) {
      returnState = tagCloseBetween;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagCloseBetween;
    }
    return end(code2);
  }
  function tagOpen(code2) {
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagOpen;
    }
    if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    return nok(code2);
  }
  function tagOpenBetween(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return end;
    }
    if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
      effects.consume(code2);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenBetween;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenBetween;
    }
    return end(code2);
  }
  function tagOpenAttributeName(code2) {
    if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code2);
  }
  function tagOpenAttributeNameAfter(code2) {
    if (code2 === 61) {
      effects.consume(code2);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code2);
  }
  function tagOpenAttributeValueBefore(code2) {
    if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 34 || code2 === 39) {
      effects.consume(code2);
      marker = code2;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code2);
    marker = void 0;
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code2 === null) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueQuotedAfter(code2) {
    if (code2 === 62 || code2 === 47 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    return nok(code2);
  }
  function tagOpenAttributeValueUnquoted(code2) {
    if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 62 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    effects.consume(code2);
    return tagOpenAttributeValueUnquoted;
  }
  function atLineEnding(code2) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(
      effects,
      afterPrefix,
      "linePrefix",
      self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function afterPrefix(code2) {
    effects.enter("htmlTextData");
    return returnState(code2);
  }
  function end(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok2;
    }
    return nok(code2);
  }
}
const labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
const resourceConstruct = {
  tokenize: tokenizeResource
};
const fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
const collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};
function resolveAllLabelEnd(events2) {
  let index2 = -1;
  let token2;
  while (++index2 < events2.length) {
    token2 = events2[index2][1];
    if (token2.type === "labelImage" || token2.type === "labelLink" || token2.type === "labelEnd") {
      events2.splice(index2 + 1, token2.type === "labelImage" ? 4 : 2);
      token2.type = "data";
      index2++;
    }
  }
  return events2;
}
function resolveToLabelEnd(events2, context) {
  let index2 = events2.length;
  let offset = 0;
  let token2;
  let open;
  let close;
  let media;
  while (index2--) {
    token2 = events2[index2][1];
    if (open) {
      if (token2.type === "link" || token2.type === "labelLink" && token2._inactive) {
        break;
      }
      if (events2[index2][0] === "enter" && token2.type === "labelLink") {
        token2._inactive = true;
      }
    } else if (close) {
      if (events2[index2][0] === "enter" && (token2.type === "labelImage" || token2.type === "labelLink") && !token2._balanced) {
        open = index2;
        if (token2.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token2.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events2[open][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events2[open][1].start),
    end: Object.assign({}, events2[events2.length - 1][1].end)
  };
  const label = {
    type: "label",
    start: Object.assign({}, events2[open][1].start),
    end: Object.assign({}, events2[close][1].end)
  };
  const text2 = {
    type: "labelText",
    start: Object.assign({}, events2[open + offset + 2][1].end),
    end: Object.assign({}, events2[close - 2][1].start)
  };
  media = [
    ["enter", group, context],
    ["enter", label, context]
  ];
  media = push(media, events2.slice(open + 1, open + offset + 3));
  media = push(media, [["enter", text2, context]]);
  media = push(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events2.slice(open + offset + 4, close - 3),
      context
    )
  );
  media = push(media, [
    ["exit", text2, context],
    events2[close - 2],
    events2[close - 1],
    ["exit", label, context]
  ]);
  media = push(media, events2.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events2, open, events2.length, media);
  return events2;
}
function tokenizeLabelEnd(effects, ok2, nok) {
  const self2 = this;
  let index2 = self2.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self2.events[index2][1].type === "labelImage" || self2.events[index2][1].type === "labelLink") && !self2.events[index2][1]._balanced) {
      labelStart = self2.events[index2][1];
      break;
    }
  }
  return start;
  function start(code2) {
    if (!labelStart) {
      return nok(code2);
    }
    if (labelStart._inactive)
      return balanced(code2);
    defined = self2.parser.defined.includes(
      normalizeIdentifier(
        self2.sliceSerialize({
          start: labelStart.end,
          end: self2.now()
        })
      )
    );
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code2);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return afterLabelEnd;
  }
  function afterLabelEnd(code2) {
    if (code2 === 40) {
      return effects.attempt(
        resourceConstruct,
        ok2,
        defined ? ok2 : balanced
      )(code2);
    }
    if (code2 === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok2,
        defined ? effects.attempt(collapsedReferenceConstruct, ok2, balanced) : balanced
      )(code2);
    }
    return defined ? ok2(code2) : balanced(code2);
  }
  function balanced(code2) {
    labelStart._balanced = true;
    return nok(code2);
  }
}
function tokenizeResource(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code2);
    effects.exit("resourceMarker");
    return factoryWhitespace(effects, open);
  }
  function open(code2) {
    if (code2 === 41) {
      return end(code2);
    }
    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(code2);
  }
  function destinationAfter(code2) {
    return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, between)(code2) : end(code2);
  }
  function between(code2) {
    if (code2 === 34 || code2 === 39 || code2 === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end),
        nok,
        "resourceTitle",
        "resourceTitleMarker",
        "resourceTitleString"
      )(code2);
    }
    return end(code2);
  }
  function end(code2) {
    if (code2 === 41) {
      effects.enter("resourceMarker");
      effects.consume(code2);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok2;
    }
    return nok(code2);
  }
}
function tokenizeFullReference(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    return factoryLabel.call(
      self2,
      effects,
      afterLabel,
      nok,
      "reference",
      "referenceMarker",
      "referenceString"
    )(code2);
  }
  function afterLabel(code2) {
    return self2.parser.defined.includes(
      normalizeIdentifier(
        self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1)
      )
    ) ? ok2(code2) : nok(code2);
  }
}
function tokenizeCollapsedReference(effects, ok2, nok) {
  return start;
  function start(code2) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code2);
    effects.exit("referenceMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 93) {
      effects.enter("referenceMarker");
      effects.consume(code2);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok2;
    }
    return nok(code2);
  }
}
const labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartImage(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code2);
    effects.exit("labelImageMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 91) {
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code2) : ok2(code2);
  }
}
const labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartLink(effects, ok2, nok) {
  const self2 = this;
  return start;
  function start(code2) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code2);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code2) {
    return code2 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code2) : ok2(code2);
  }
}
const lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok2) {
  return start;
  function start(code2) {
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, ok2, "linePrefix");
  }
}
const thematicBreak$1 = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok2, nok) {
  let size = 0;
  let marker;
  return start;
  function start(code2) {
    effects.enter("thematicBreak");
    marker = code2;
    return atBreak(code2);
  }
  function atBreak(code2) {
    if (code2 === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code2);
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, atBreak, "whitespace")(code2);
    }
    if (size < 3 || code2 !== null && !markdownLineEnding(code2)) {
      return nok(code2);
    }
    effects.exit("thematicBreak");
    return ok2(code2);
  }
  function sequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return atBreak(code2);
  }
}
const list$1 = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
const listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
const indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};
function tokenizeListStart(effects, ok2, nok) {
  const self2 = this;
  const tail = self2.events[self2.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;
  function start(code2) {
    const kind = self2.containerState.type || (code2 === 42 || code2 === 43 || code2 === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self2.containerState.marker || code2 === self2.containerState.marker : asciiDigit(code2)) {
      if (!self2.containerState.type) {
        self2.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code2 === 42 || code2 === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code2) : atMarker(code2);
      }
      if (!self2.interrupt || code2 === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code2);
      }
    }
    return nok(code2);
  }
  function inside(code2) {
    if (asciiDigit(code2) && ++size < 10) {
      effects.consume(code2);
      return inside;
    }
    if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code2 === self2.containerState.marker : code2 === 41 || code2 === 46)) {
      effects.exit("listItemValue");
      return atMarker(code2);
    }
    return nok(code2);
  }
  function atMarker(code2) {
    effects.enter("listItemMarker");
    effects.consume(code2);
    effects.exit("listItemMarker");
    self2.containerState.marker = self2.containerState.marker || code2;
    return effects.check(
      blankLine,
      self2.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    );
  }
  function onBlank(code2) {
    self2.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code2);
  }
  function otherPrefix(code2) {
    if (markdownSpace(code2)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code2);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code2);
  }
  function endOfPrefix(code2) {
    self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok2(code2);
  }
}
function tokenizeListContinuation(effects, ok2, nok) {
  const self2 = this;
  self2.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code2) {
    self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
    return factorySpace(
      effects,
      ok2,
      "listItemIndent",
      self2.containerState.size + 1
    )(code2);
  }
  function notBlank(code2) {
    if (self2.containerState.furtherBlankLines || !markdownSpace(code2)) {
      self2.containerState.furtherBlankLines = void 0;
      self2.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code2);
    }
    self2.containerState.furtherBlankLines = void 0;
    self2.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code2);
  }
  function notInCurrentItem(code2) {
    self2.containerState._closeFlow = true;
    self2.interrupt = void 0;
    return factorySpace(
      effects,
      effects.attempt(list$1, ok2, nok),
      "linePrefix",
      self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code2);
  }
}
function tokenizeIndent(effects, ok2, nok) {
  const self2 = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemIndent",
    self2.containerState.size + 1
  );
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self2.containerState.size ? ok2(code2) : nok(code2);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
  const self2 = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemPrefixWhitespace",
    self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function afterPrefix(code2) {
    const tail = self2.events[self2.events.length - 1];
    return !markdownSpace(code2) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code2) : nok(code2);
  }
}
const setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};
function resolveToSetextUnderline(events2, context) {
  let index2 = events2.length;
  let content2;
  let text2;
  let definition2;
  while (index2--) {
    if (events2[index2][0] === "enter") {
      if (events2[index2][1].type === "content") {
        content2 = index2;
        break;
      }
      if (events2[index2][1].type === "paragraph") {
        text2 = index2;
      }
    } else {
      if (events2[index2][1].type === "content") {
        events2.splice(index2, 1);
      }
      if (!definition2 && events2[index2][1].type === "definition") {
        definition2 = index2;
      }
    }
  }
  const heading2 = {
    type: "setextHeading",
    start: Object.assign({}, events2[text2][1].start),
    end: Object.assign({}, events2[events2.length - 1][1].end)
  };
  events2[text2][1].type = "setextHeadingText";
  if (definition2) {
    events2.splice(text2, 0, ["enter", heading2, context]);
    events2.splice(definition2 + 1, 0, ["exit", events2[content2][1], context]);
    events2[content2][1].end = Object.assign({}, events2[definition2][1].end);
  } else {
    events2[content2][1] = heading2;
  }
  events2.push(["exit", heading2, context]);
  return events2;
}
function tokenizeSetextUnderline(effects, ok2, nok) {
  const self2 = this;
  let index2 = self2.events.length;
  let marker;
  let paragraph2;
  while (index2--) {
    if (self2.events[index2][1].type !== "lineEnding" && self2.events[index2][1].type !== "linePrefix" && self2.events[index2][1].type !== "content") {
      paragraph2 = self2.events[index2][1].type === "paragraph";
      break;
    }
  }
  return start;
  function start(code2) {
    if (!self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph2)) {
      effects.enter("setextHeadingLine");
      effects.enter("setextHeadingLineSequence");
      marker = code2;
      return closingSequence(code2);
    }
    return nok(code2);
  }
  function closingSequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return closingSequence;
    }
    effects.exit("setextHeadingLineSequence");
    return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code2);
  }
  function closingSequenceEnd(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("setextHeadingLine");
      return ok2(code2);
    }
    return nok(code2);
  }
}
const flow$1 = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self2 = this;
  const initial = effects.attempt(
    blankLine,
    atBlankEnding,
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content, afterConstruct)
        ),
        "linePrefix"
      )
    )
  );
  return initial;
  function atBlankEnding(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code2);
    effects.exit("lineEndingBlank");
    self2.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    self2.currentConstruct = void 0;
    return initial;
  }
}
const resolver = {
  resolveAll: createResolver()
};
const string$1 = initializeFactory("string");
const text$3 = initializeFactory("text");
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === "text" ? resolveAllLineSuffixes : void 0
    )
  };
  function initializeText(effects) {
    const self2 = this;
    const constructs2 = this.parser.constructs[field];
    const text2 = effects.attempt(constructs2, start, notText);
    return start;
    function start(code2) {
      return atBreak(code2) ? text2(code2) : notText(code2);
    }
    function notText(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("data");
      effects.consume(code2);
      return data2;
    }
    function data2(code2) {
      if (atBreak(code2)) {
        effects.exit("data");
        return text2(code2);
      }
      effects.consume(code2);
      return data2;
    }
    function atBreak(code2) {
      if (code2 === null) {
        return true;
      }
      const list2 = constructs2[code2];
      let index2 = -1;
      if (list2) {
        while (++index2 < list2.length) {
          const item = list2[index2];
          if (!item.previous || item.previous.call(self2, self2.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events2, context) {
    let index2 = -1;
    let enter2;
    while (++index2 <= events2.length) {
      if (enter2 === void 0) {
        if (events2[index2] && events2[index2][1].type === "data") {
          enter2 = index2;
          index2++;
        }
      } else if (!events2[index2] || events2[index2][1].type !== "data") {
        if (index2 !== enter2 + 2) {
          events2[enter2][1].end = events2[index2 - 1][1].end;
          events2.splice(enter2 + 2, index2 - enter2 - 2);
          index2 = enter2 + 2;
        }
        enter2 = void 0;
      }
    }
    return extraResolver ? extraResolver(events2, context) : events2;
  }
}
function resolveAllLineSuffixes(events2, context) {
  let eventIndex = 0;
  while (++eventIndex <= events2.length) {
    if ((eventIndex === events2.length || events2[eventIndex][1].type === "lineEnding") && events2[eventIndex - 1][1].type === "data") {
      const data2 = events2[eventIndex - 1][1];
      const chunks = context.sliceStream(data2);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex)
            break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1)
          ;
        else {
          index2++;
          break;
        }
      }
      if (size) {
        const token2 = {
          type: eventIndex === events2.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: data2.end.line,
            column: data2.end.column - size,
            offset: data2.end.offset - size,
            _index: data2.start._index + index2,
            _bufferIndex: index2 ? bufferIndex : data2.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data2.end)
        };
        data2.end = Object.assign({}, token2.start);
        if (data2.start.offset === data2.end.offset) {
          Object.assign(data2, token2);
        } else {
          events2.splice(
            eventIndex,
            0,
            ["enter", token2, context],
            ["exit", token2, context]
          );
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events2;
}
function createTokenizer(parser, initialize, from) {
  let point2 = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter: enter2,
    exit: exit2,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token2, expandTabs) {
    return serializeChunks(sliceStream(token2), expandTabs);
  }
  function sliceStream(token2) {
    return sliceChunks(chunks, token2);
  }
  function now() {
    return Object.assign({}, point2);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point2._index < chunks.length) {
      const chunk = chunks[point2._index];
      if (typeof chunk === "string") {
        chunkIndex = point2._index;
        if (point2._bufferIndex < 0) {
          point2._bufferIndex = 0;
        }
        while (point2._index === chunkIndex && point2._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point2._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code2) {
    state = state(code2);
  }
  function consume(code2) {
    if (markdownLineEnding(code2)) {
      point2.line++;
      point2.column = 1;
      point2.offset += code2 === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code2 !== -1) {
      point2.column++;
      point2.offset++;
    }
    if (point2._bufferIndex < 0) {
      point2._index++;
    } else {
      point2._bufferIndex++;
      if (point2._bufferIndex === chunks[point2._index].length) {
        point2._bufferIndex = -1;
        point2._index++;
      }
    }
    context.previous = code2;
  }
  function enter2(type, fields) {
    const token2 = fields || {};
    token2.type = type;
    token2.start = now();
    context.events.push(["enter", token2, context]);
    stack.push(token2);
    return token2;
  }
  function exit2(type) {
    const token2 = stack.pop();
    token2.end = now();
    context.events.push(["exit", token2, context]);
    return token2;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map) {
        return start;
        function start(code2) {
          const def2 = code2 !== null && map[code2];
          const all3 = code2 !== null && map.null;
          const list2 = [
            ...Array.isArray(def2) ? def2 : def2 ? [def2] : [],
            ...Array.isArray(all3) ? all3 : all3 ? [all3] : []
          ];
          return handleListOfConstructs(list2)(code2);
        }
      }
      function handleListOfConstructs(list2) {
        listOfConstructs = list2;
        constructIndex = 0;
        if (list2.length === 0) {
          return bogusState;
        }
        return handleConstruct(list2[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code2) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok2,
            nok
          )(code2);
        }
      }
      function ok2(code2) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code2) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point2 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point2.line in columnStart && point2.column < 2) {
      point2.column = columnStart[point2.line];
      point2.offset += columnStart[point2.line] - 1;
    }
  }
}
function sliceChunks(chunks, token2) {
  const startIndex = token2.start._index;
  const startBufferIndex = token2.start._bufferIndex;
  const endIndex = token2.end._index;
  const endBufferIndex = token2.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}
const document$1 = {
  [42]: list$1,
  [43]: list$1,
  [45]: list$1,
  [48]: list$1,
  [49]: list$1,
  [50]: list$1,
  [51]: list$1,
  [52]: list$1,
  [53]: list$1,
  [54]: list$1,
  [55]: list$1,
  [56]: list$1,
  [57]: list$1,
  [62]: blockQuote
};
const contentInitial = {
  [91]: definition
};
const flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
const flow = {
  [35]: headingAtx,
  [42]: thematicBreak$1,
  [45]: [setextUnderline, thematicBreak$1],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak$1,
  [96]: codeFenced,
  [126]: codeFenced
};
const string = {
  [38]: characterReference,
  [92]: characterEscape
};
const text$2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
const insideSpan = {
  null: [attention, resolver]
};
const attentionMarkers = {
  null: [42, 95]
};
const disable = {
  null: []
};
const defaultConstructs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  document: document$1,
  contentInitial,
  flowInitial,
  flow,
  string,
  text: text$2,
  insideSpan,
  attentionMarkers,
  disable
}, Symbol.toStringTag, { value: "Module" }));
function parse$2(options = {}) {
  const constructs2 = combineExtensions(
    [defaultConstructs].concat(options.extensions || [])
  );
  const parser = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create3(content$1),
    document: create3(document$2),
    flow: create3(flow$1),
    string: create3(string$1),
    text: create3(text$3)
  };
  return parser;
  function create3(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}
const search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = "";
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match2;
    let next;
    let startPosition;
    let endPosition;
    let code2;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = "";
    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match2 = search.exec(value);
      endPosition = match2 && match2.index !== void 0 ? match2.index : value.length;
      code2 = value.charCodeAt(endPosition);
      if (!match2) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code2 === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code2) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next)
              chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn)
        chunks.push(-5);
      if (buffer)
        chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
}
function postprocess(events2) {
  while (!subtokenize(events2)) {
  }
  return events2;
}
function decodeNumericCharacterReference(value, base2) {
  const code2 = Number.parseInt(value, base2);
  if (code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 || code2 > 126 && code2 < 160 || code2 > 55295 && code2 < 57344 || code2 > 64975 && code2 < 65008 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534 || code2 > 1114111) {
    return "\uFFFD";
  }
  return String.fromCharCode(code2);
}
const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head2 = $2.charCodeAt(0);
  if (head2 === 35) {
    const head3 = $2.charCodeAt(1);
    const hex = head3 === 120 || head3 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}
const own$6 = {}.hasOwnProperty;
const fromMarkdown = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(
    postprocess(
      parse$2(options).document().write(preprocess()(value, encoding, true))
    )
  );
};
function compiler(options = {}) {
  const config2 = configure(
    {
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: opener(link2),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading2),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText2, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition2),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis2),
        hardBreakEscape: opener(hardBreak2),
        hardBreakTrailing: opener(hardBreak2),
        htmlFlow: opener(html2, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html2, buffer),
        htmlTextData: onenterdata,
        image: opener(image2),
        label: buffer,
        link: opener(link2),
        listItem: opener(listItem2),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list2, onenterlistordered),
        listUnordered: opener(list2),
        paragraph: opener(paragraph2),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading2),
        strong: opener(strong2),
        thematicBreak: opener(thematicBreak2)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    },
    options.mdastExtensions || []
  );
  const data2 = {};
  return compile;
  function compile(events2) {
    let tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const listStack = [];
    const context = {
      stack,
      tokenStack,
      config: config2,
      enter: enter2,
      exit: exit2,
      buffer,
      resume,
      setData,
      getData: getData2
    };
    let index2 = -1;
    while (++index2 < events2.length) {
      if (events2[index2][1].type === "listOrdered" || events2[index2][1].type === "listUnordered") {
        if (events2[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events2, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events2.length) {
      const handler = config2[events2[index2][0]];
      if (own$6.call(handler, events2[index2][1].type)) {
        handler[events2[index2][1].type].call(
          Object.assign(
            {
              sliceSerialize: events2[index2][2].sliceSerialize
            },
            context
          ),
          events2[index2][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(
        events2.length > 0 ? events2[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: point2(
        events2.length > 0 ? events2[events2.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    };
    index2 = -1;
    while (++index2 < config2.transforms.length) {
      tree = config2.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events2, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem3;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events2[index2];
      if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
        if (event[0] === "enter") {
          containerBalance++;
        } else {
          containerBalance--;
        }
        atMarker = void 0;
      } else if (event[1].type === "lineEndingBlank") {
        if (event[0] === "enter") {
          if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
            firstBlankLineIndex = index2;
          }
          atMarker = void 0;
        }
      } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace")
        ;
      else {
        atMarker = void 0;
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem3) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events2[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit")
                continue;
              if (lineIndex) {
                events2[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent")
              ;
            else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem3._spread = true;
          }
          listItem3.end = Object.assign(
            {},
            lineIndex ? events2[lineIndex][1].start : event[1].end
          );
          events2.splice(lineIndex || index2, 0, ["exit", listItem3, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          listItem3 = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start)
          };
          events2.splice(index2, 0, ["enter", listItem3, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events2[start][1]._spread = listSpread;
    return length;
  }
  function setData(key, value) {
    data2[key] = value;
  }
  function getData2(key) {
    return data2[key];
  }
  function point2(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function opener(create3, and) {
    return open;
    function open(token2) {
      enter2.call(this, create3(token2), token2);
      if (and)
        and.call(this, token2);
    }
  }
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter2(node, token2, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token2, errorHandler]);
    node.position = {
      start: point2(token2.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token2) {
      if (and)
        and.call(this, token2);
      exit2.call(this, token2);
    }
  }
  function exit2(token2, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token2.type + "` (" + stringifyPosition({
          start: token2.start,
          end: token2.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token2.type) {
      if (onExitError) {
        onExitError.call(this, token2, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token2, open[0]);
      }
    }
    node.position.end = point2(token2.end);
    return node;
  }
  function resume() {
    return toString2(this.stack.pop());
  }
  function onenterlistordered() {
    setData("expectingFirstListItemValue", true);
  }
  function onenterlistitemvalue(token2) {
    if (getData2("expectingFirstListItemValue")) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token2), 10);
      setData("expectingFirstListItemValue");
    }
  }
  function onexitcodefencedfenceinfo() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.lang = data3;
  }
  function onexitcodefencedfencemeta() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.meta = data3;
  }
  function onexitcodefencedfence() {
    if (getData2("flowCodeInside"))
      return;
    this.buffer();
    setData("flowCodeInside", true);
  }
  function onexitcodefenced() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data3.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    setData("flowCodeInside");
  }
  function onexitcodeindented() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data3.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token2) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token2)
    ).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.title = data3;
  }
  function onexitdefinitiondestinationstring() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.url = data3;
  }
  function onexitatxheadingsequence(token2) {
    const node = this.stack[this.stack.length - 1];
    if (!node.depth) {
      const depth = this.sliceSerialize(token2).length;
      node.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    setData("setextHeadingSlurpLineEnding", true);
  }
  function onexitsetextheadinglinesequence(token2) {
    const node = this.stack[this.stack.length - 1];
    node.depth = this.sliceSerialize(token2).charCodeAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    setData("setextHeadingSlurpLineEnding");
  }
  function onenterdata(token2) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text2();
      tail.position = {
        start: point2(token2.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token2) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token2);
    tail.position.end = point2(token2.end);
  }
  function onexitlineending(token2) {
    const context = this.stack[this.stack.length - 1];
    if (getData2("atHardBreak")) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token2.end);
      setData("atHardBreak");
      return;
    }
    if (!getData2("setextHeadingSlurpLineEnding") && config2.canContainEols.includes(context.type)) {
      onenterdata.call(this, token2);
      onexitdata.call(this, token2);
    }
  }
  function onexithardbreak() {
    setData("atHardBreak", true);
  }
  function onexithtmlflow() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data3;
  }
  function onexithtmltext() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data3;
  }
  function onexitcodetext() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data3;
  }
  function onexitlink() {
    const context = this.stack[this.stack.length - 1];
    if (getData2("inReference")) {
      context.type += "Reference";
      context.referenceType = getData2("referenceType") || "shortcut";
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
    }
    setData("referenceType");
  }
  function onexitimage() {
    const context = this.stack[this.stack.length - 1];
    if (getData2("inReference")) {
      context.type += "Reference";
      context.referenceType = getData2("referenceType") || "shortcut";
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
    }
    setData("referenceType");
  }
  function onexitlabeltext(token2) {
    const ancestor = this.stack[this.stack.length - 2];
    const string2 = this.sliceSerialize(token2);
    ancestor.label = decodeString(string2);
    ancestor.identifier = normalizeIdentifier(string2).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node = this.stack[this.stack.length - 1];
    setData("inReference", true);
    if (node.type === "link") {
      node.children = fragment.children;
    } else {
      node.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.url = data3;
  }
  function onexitresourcetitlestring() {
    const data3 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.title = data3;
  }
  function onexitresource() {
    setData("inReference");
  }
  function onenterreference() {
    setData("referenceType", "collapsed");
  }
  function onexitreferencestring(token2) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token2)
    ).toLowerCase();
    setData("referenceType", "full");
  }
  function onexitcharacterreferencemarker(token2) {
    setData("characterReferenceType", token2.type);
  }
  function onexitcharacterreferencevalue(token2) {
    const data3 = this.sliceSerialize(token2);
    const type = getData2("characterReferenceType");
    let value;
    if (type) {
      value = decodeNumericCharacterReference(
        data3,
        type === "characterReferenceMarkerNumeric" ? 10 : 16
      );
      setData("characterReferenceType");
    } else {
      value = decodeNamedCharacterReference(data3);
    }
    const tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point2(token2.end);
  }
  function onexitautolinkprotocol(token2) {
    onexitdata.call(this, token2);
    const node = this.stack[this.stack.length - 1];
    node.url = this.sliceSerialize(token2);
  }
  function onexitautolinkemail(token2) {
    onexitdata.call(this, token2);
    const node = this.stack[this.stack.length - 1];
    node.url = "mailto:" + this.sliceSerialize(token2);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis2() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading2() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function hardBreak2() {
    return {
      type: "break"
    };
  }
  function html2() {
    return {
      type: "html",
      value: ""
    };
  }
  function image2() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link2() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list2(token2) {
    return {
      type: "list",
      ordered: token2.type === "listOrdered",
      start: null,
      spread: token2._spread,
      children: []
    };
  }
  function listItem2(token2) {
    return {
      type: "listItem",
      spread: token2._spread,
      checked: null,
      children: []
    };
  }
  function paragraph2() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong2() {
    return {
      type: "strong",
      children: []
    };
  }
  function text2() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak2() {
    return {
      type: "thematicBreak"
    };
  }
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
  return combined;
}
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own$6.call(extension2, key)) {
      const list2 = key === "canContainEols" || key === "transforms";
      const maybe = own$6.call(combined, key) ? combined[key] : void 0;
      const left = maybe || (combined[key] = list2 ? [] : {});
      const right = extension2[key];
      if (right) {
        if (list2) {
          combined[key] = [...left, ...right];
        } else {
          Object.assign(left, right);
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}
function remarkParse(options) {
  const parser = (doc) => {
    const settings = this.data("settings");
    return fromMarkdown(
      doc,
      Object.assign({}, settings, options, {
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || []
      })
    );
  };
  Object.assign(this, { Parser: parser });
}
const convert$2 = function(test2) {
  if (test2 === void 0 || test2 === null) {
    return ok$1;
  }
  if (typeof test2 === "string") {
    return typeFactory$1(test2);
  }
  if (typeof test2 === "object") {
    return Array.isArray(test2) ? anyFactory$1(test2) : propsFactory(test2);
  }
  if (typeof test2 === "function") {
    return castFactory(test2);
  }
  throw new Error("Expected function, string, or object as test");
};
function anyFactory$1(tests) {
  const checks2 = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks2[index2] = convert$2(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks2.length) {
      if (checks2[index3].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check2) {
  return castFactory(all3);
  function all3(node) {
    let key;
    for (key in check2) {
      if (node[key] !== check2[key])
        return false;
    }
    return true;
  }
}
function typeFactory$1(check2) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check2;
  }
}
function castFactory(check2) {
  return assertion;
  function assertion(...parameters) {
    return Boolean(check2.call(this, ...parameters));
  }
}
function ok$1() {
  return true;
}
function color(d) {
  return d;
}
const CONTINUE$2 = true;
const SKIP$2 = "skip";
const EXIT$2 = false;
const visitParents$2 = function(tree, test2, visitor2, reverse) {
  if (typeof test2 === "function" && typeof visitor2 !== "function") {
    reverse = visitor2;
    visitor2 = test2;
    test2 = null;
  }
  const is = convert$2(test2);
  const step = reverse ? -1 : 1;
  factory2(tree, null, [])();
  function factory2(node, index2, parents) {
    const value = typeof node === "object" && node !== null ? node : {};
    let name;
    if (typeof value.type === "string") {
      name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = [];
      let subresult;
      let offset;
      let grandparents;
      if (!test2 || is(node, index2, parents[parents.length - 1] || null)) {
        result = toResult$1(visitor2(node, parents));
        if (result[0] === EXIT$2) {
          return result;
        }
      }
      if (node.children && result[0] !== SKIP$2) {
        offset = (reverse ? node.children.length : -1) + step;
        grandparents = parents.concat(node);
        while (offset > -1 && offset < node.children.length) {
          subresult = factory2(node.children[offset], offset, grandparents)();
          if (subresult[0] === EXIT$2) {
            return subresult;
          }
          offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
        }
      }
      return result;
    }
  }
};
function toResult$1(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE$2, value];
  }
  return [value];
}
const visit$2 = function(tree, test2, visitor2, reverse) {
  if (typeof test2 === "function" && typeof visitor2 !== "function") {
    reverse = visitor2;
    visitor2 = test2;
    test2 = null;
  }
  visitParents$2(tree, test2, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    return visitor2(
      node,
      parent ? parent.children.indexOf(node) : null,
      parent
    );
  }
};
const find$1 = /[\t ]*(?:\r?\n|\r)/g;
function remarkBreaks() {
  return (tree) => {
    visit$2(tree, "text", (node, index2, parent) => {
      const result = [];
      let start = 0;
      find$1.lastIndex = 0;
      let match2 = find$1.exec(node.value);
      while (match2) {
        const position2 = match2.index;
        if (start !== position2) {
          result.push({ type: "text", value: node.value.slice(start, position2) });
        }
        result.push({ type: "break" });
        start = position2 + match2[0].length;
        match2 = find$1.exec(node.value);
      }
      if (result.length > 0 && parent && typeof index2 === "number") {
        if (start < node.value.length) {
          result.push({ type: "text", value: node.value.slice(start) });
        }
        parent.children.splice(index2, 1, ...result);
        return index2 + result.length;
      }
    });
  };
}
var u = function(type, props2, value) {
  var node = { type: String(type) };
  if ((value === void 0 || value === null) && (typeof props2 === "string" || Array.isArray(props2))) {
    value = props2;
  } else {
    Object.assign(node, props2);
  }
  if (Array.isArray(value)) {
    node.children = value;
  } else if (value !== void 0 && value !== null) {
    node.value = String(value);
  }
  return node;
};
const own$5 = {}.hasOwnProperty;
function unknown(h, node) {
  const data2 = node.data || {};
  if ("value" in node && !(own$5.call(data2, "hName") || own$5.call(data2, "hProperties") || own$5.call(data2, "hChildren"))) {
    return h.augment(node, u("text", node.value));
  }
  return h(node, "div", all2(h, node));
}
function one(h, node, parent) {
  const type = node && node.type;
  let fn;
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }
  if (own$5.call(h.handlers, type)) {
    fn = h.handlers[type];
  } else if (h.passThrough && h.passThrough.includes(type)) {
    fn = returnNode;
  } else {
    fn = h.unknownHandler;
  }
  return (typeof fn === "function" ? fn : unknown)(h, node, parent);
}
function returnNode(h, node) {
  return "children" in node ? { ...node, children: all2(h, node) } : node;
}
function all2(h, parent) {
  const values = [];
  if ("children" in parent) {
    const nodes = parent.children;
    let index2 = -1;
    while (++index2 < nodes.length) {
      const result = one(h, nodes[index2], parent);
      if (result) {
        if (index2 && nodes[index2 - 1].type === "break") {
          if (!Array.isArray(result) && result.type === "text") {
            result.value = result.value.replace(/^\s+/, "");
          }
          if (!Array.isArray(result) && result.type === "element") {
            const head2 = result.children[0];
            if (head2 && head2.type === "text") {
              head2.value = head2.value.replace(/^\s+/, "");
            }
          }
        }
        if (Array.isArray(result)) {
          values.push(...result);
        } else {
          values.push(result);
        }
      }
    }
  }
  return values;
}
const pointStart = point("start");
const pointEnd = point("end");
function point(type) {
  return point2;
  function point2(node) {
    const point3 = node && node.position && node.position[type] || {};
    return {
      line: point3.line || null,
      column: point3.column || null,
      offset: point3.offset > -1 ? point3.offset : null
    };
  }
}
function generated(node) {
  return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}
const own$4 = {}.hasOwnProperty;
function definitions(node) {
  const cache = /* @__PURE__ */ Object.create(null);
  if (!node || !node.type) {
    throw new Error("mdast-util-definitions expected node");
  }
  visit$2(node, "definition", (definition3) => {
    const id2 = clean(definition3.identifier);
    if (id2 && !own$4.call(cache, id2)) {
      cache[id2] = definition3;
    }
  });
  return definition2;
  function definition2(identifier) {
    const id2 = clean(identifier);
    return id2 && own$4.call(cache, id2) ? cache[id2] : null;
  }
}
function clean(value) {
  return String(value || "").toUpperCase();
}
const characterReferences = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function encode$1(value) {
  return value.replace(/["&<>]/g, replace2);
  function replace2(value2) {
    return "&" + characterReferences[value2] + ";";
  }
}
function sanitizeUri(url, protocol) {
  const value = encode$1(normalizeUri(url || ""));
  if (!protocol) {
    return value;
  }
  const colon = value.indexOf(":");
  const questionMark = value.indexOf("?");
  const numberSign = value.indexOf("#");
  const slash = value.indexOf("/");
  if (colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign || protocol.test(value.slice(0, colon))) {
    return value;
  }
  return "";
}
function normalizeUri(value) {
  const result = [];
  let index2 = -1;
  let start = 0;
  let skip = 0;
  while (++index2 < value.length) {
    const code2 = value.charCodeAt(index2);
    let replace2 = "";
    if (code2 === 37 && asciiAlphanumeric(value.charCodeAt(index2 + 1)) && asciiAlphanumeric(value.charCodeAt(index2 + 2))) {
      skip = 2;
    } else if (code2 < 128) {
      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code2))) {
        replace2 = String.fromCharCode(code2);
      }
    } else if (code2 > 55295 && code2 < 57344) {
      const next = value.charCodeAt(index2 + 1);
      if (code2 < 56320 && next > 56319 && next < 57344) {
        replace2 = String.fromCharCode(code2, next);
        skip = 1;
      } else {
        replace2 = "\uFFFD";
      }
    } else {
      replace2 = String.fromCharCode(code2);
    }
    if (replace2) {
      result.push(value.slice(start, index2), encodeURIComponent(replace2));
      start = index2 + skip + 1;
      replace2 = "";
    }
    if (skip) {
      index2 += skip;
      skip = 0;
    }
  }
  return result.join("") + value.slice(start);
}
function wrap(nodes, loose) {
  const result = [];
  let index2 = -1;
  if (loose) {
    result.push(u("text", "\n"));
  }
  while (++index2 < nodes.length) {
    if (index2)
      result.push(u("text", "\n"));
    result.push(nodes[index2]);
  }
  if (loose && nodes.length > 0) {
    result.push(u("text", "\n"));
  }
  return result;
}
function footer(h) {
  let index2 = -1;
  const listItems = [];
  while (++index2 < h.footnoteOrder.length) {
    const def2 = h.footnoteById[h.footnoteOrder[index2].toUpperCase()];
    if (!def2) {
      continue;
    }
    const content2 = all2(h, def2);
    const id2 = String(def2.identifier);
    const safeId = sanitizeUri(id2.toLowerCase());
    let referenceIndex = 0;
    const backReferences = [];
    while (++referenceIndex <= h.footnoteCounts[id2]) {
      const backReference = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + h.clobberPrefix + "fnref-" + safeId + (referenceIndex > 1 ? "-" + referenceIndex : ""),
          dataFootnoteBackref: true,
          className: ["data-footnote-backref"],
          ariaLabel: h.footnoteBackLabel
        },
        children: [{ type: "text", value: "\u21A9" }]
      };
      if (referenceIndex > 1) {
        backReference.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(referenceIndex) }]
        });
      }
      if (backReferences.length > 0) {
        backReferences.push({ type: "text", value: " " });
      }
      backReferences.push(backReference);
    }
    const tail = content2[content2.length - 1];
    if (tail && tail.type === "element" && tail.tagName === "p") {
      const tailTail = tail.children[tail.children.length - 1];
      if (tailTail && tailTail.type === "text") {
        tailTail.value += " ";
      } else {
        tail.children.push({ type: "text", value: " " });
      }
      tail.children.push(...backReferences);
    } else {
      content2.push(...backReferences);
    }
    const listItem2 = {
      type: "element",
      tagName: "li",
      properties: { id: h.clobberPrefix + "fn-" + safeId },
      children: wrap(content2, true)
    };
    if (def2.position) {
      listItem2.position = def2.position;
    }
    listItems.push(listItem2);
  }
  if (listItems.length === 0) {
    return null;
  }
  return {
    type: "element",
    tagName: "section",
    properties: { dataFootnotes: true, className: ["footnotes"] },
    children: [
      {
        type: "element",
        tagName: h.footnoteLabelTagName,
        properties: JSON.parse(JSON.stringify(h.footnoteLabelProperties)),
        children: [u("text", h.footnoteLabel)]
      },
      { type: "text", value: "\n" },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: wrap(listItems, true)
      },
      { type: "text", value: "\n" }
    ]
  };
}
function blockquote(h, node) {
  return h(node, "blockquote", wrap(all2(h, node), true));
}
function hardBreak(h, node) {
  return [h(node, "br"), u("text", "\n")];
}
function code(h, node) {
  const value = node.value ? node.value + "\n" : "";
  const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
  const props2 = {};
  if (lang) {
    props2.className = ["language-" + lang];
  }
  const code2 = h(node, "code", props2, [u("text", value)]);
  if (node.meta) {
    code2.data = { meta: node.meta };
  }
  return h(node.position, "pre", [code2]);
}
function strikethrough(h, node) {
  return h(node, "del", all2(h, node));
}
function emphasis(h, node) {
  return h(node, "em", all2(h, node));
}
function footnoteReference(h, node) {
  const id2 = String(node.identifier);
  const safeId = sanitizeUri(id2.toLowerCase());
  const index2 = h.footnoteOrder.indexOf(id2);
  let counter;
  if (index2 === -1) {
    h.footnoteOrder.push(id2);
    h.footnoteCounts[id2] = 1;
    counter = h.footnoteOrder.length;
  } else {
    h.footnoteCounts[id2]++;
    counter = index2 + 1;
  }
  const reuseCounter = h.footnoteCounts[id2];
  return h(node, "sup", [
    h(
      node.position,
      "a",
      {
        href: "#" + h.clobberPrefix + "fn-" + safeId,
        id: h.clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
        dataFootnoteRef: true,
        ariaDescribedBy: "footnote-label"
      },
      [u("text", String(counter))]
    )
  ]);
}
function footnote(h, node) {
  const footnoteById = h.footnoteById;
  let no2 = 1;
  while (no2 in footnoteById)
    no2++;
  const identifier = String(no2);
  footnoteById[identifier] = {
    type: "footnoteDefinition",
    identifier,
    children: [{ type: "paragraph", children: node.children }],
    position: node.position
  };
  return footnoteReference(h, {
    type: "footnoteReference",
    identifier,
    position: node.position
  });
}
function heading(h, node) {
  return h(node, "h" + node.depth, all2(h, node));
}
function html$2(h, node) {
  return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
}
var encodeCache = {};
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = encodeCache[exclude] = [];
  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    if (/^[0-9a-z]$/i.test(ch)) {
      cache.push(ch);
    } else {
      cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
    }
  }
  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }
  return cache;
}
function encode(string2, exclude, keepEscaped) {
  var i, l, code2, nextCode, cache, result = "";
  if (typeof exclude !== "string") {
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }
  if (typeof keepEscaped === "undefined") {
    keepEscaped = true;
  }
  cache = getEncodeCache(exclude);
  for (i = 0, l = string2.length; i < l; i++) {
    code2 = string2.charCodeAt(i);
    if (keepEscaped && code2 === 37 && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string2.slice(i + 1, i + 3))) {
        result += string2.slice(i, i + 3);
        i += 2;
        continue;
      }
    }
    if (code2 < 128) {
      result += cache[code2];
      continue;
    }
    if (code2 >= 55296 && code2 <= 57343) {
      if (code2 >= 55296 && code2 <= 56319 && i + 1 < l) {
        nextCode = string2.charCodeAt(i + 1);
        if (nextCode >= 56320 && nextCode <= 57343) {
          result += encodeURIComponent(string2[i] + string2[i + 1]);
          i++;
          continue;
        }
      }
      result += "%EF%BF%BD";
      continue;
    }
    result += encodeURIComponent(string2[i]);
  }
  return result;
}
encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_1 = encode;
function revert(h, node) {
  const subtype = node.referenceType;
  let suffix = "]";
  if (subtype === "collapsed") {
    suffix += "[]";
  } else if (subtype === "full") {
    suffix += "[" + (node.label || node.identifier) + "]";
  }
  if (node.type === "imageReference") {
    return u("text", "![" + node.alt + suffix);
  }
  const contents = all2(h, node);
  const head2 = contents[0];
  if (head2 && head2.type === "text") {
    head2.value = "[" + head2.value;
  } else {
    contents.unshift(u("text", "["));
  }
  const tail = contents[contents.length - 1];
  if (tail && tail.type === "text") {
    tail.value += suffix;
  } else {
    contents.push(u("text", suffix));
  }
  return contents;
}
function imageReference(h, node) {
  const def2 = h.definition(node.identifier);
  if (!def2) {
    return revert(h, node);
  }
  const props2 = { src: encode_1(def2.url || ""), alt: node.alt };
  if (def2.title !== null && def2.title !== void 0) {
    props2.title = def2.title;
  }
  return h(node, "img", props2);
}
function image(h, node) {
  const props2 = { src: encode_1(node.url), alt: node.alt };
  if (node.title !== null && node.title !== void 0) {
    props2.title = node.title;
  }
  return h(node, "img", props2);
}
function inlineCode(h, node) {
  return h(node, "code", [u("text", node.value.replace(/\r?\n|\r/g, " "))]);
}
function linkReference(h, node) {
  const def2 = h.definition(node.identifier);
  if (!def2) {
    return revert(h, node);
  }
  const props2 = { href: encode_1(def2.url || "") };
  if (def2.title !== null && def2.title !== void 0) {
    props2.title = def2.title;
  }
  return h(node, "a", props2, all2(h, node));
}
function link(h, node) {
  const props2 = { href: encode_1(node.url) };
  if (node.title !== null && node.title !== void 0) {
    props2.title = node.title;
  }
  return h(node, "a", props2, all2(h, node));
}
function listItem(h, node, parent) {
  const result = all2(h, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props2 = {};
  const wrapped = [];
  if (typeof node.checked === "boolean") {
    let paragraph2;
    if (result[0] && result[0].type === "element" && result[0].tagName === "p") {
      paragraph2 = result[0];
    } else {
      paragraph2 = h(null, "p", []);
      result.unshift(paragraph2);
    }
    if (paragraph2.children.length > 0) {
      paragraph2.children.unshift(u("text", " "));
    }
    paragraph2.children.unshift(
      h(null, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props2.className = ["task-list-item"];
  }
  let index2 = -1;
  while (++index2 < result.length) {
    const child = result[index2];
    if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
      wrapped.push(u("text", "\n"));
    }
    if (child.type === "element" && child.tagName === "p" && !loose) {
      wrapped.push(...child.children);
    } else {
      wrapped.push(child);
    }
  }
  const tail = result[result.length - 1];
  if (tail && (loose || !("tagName" in tail) || tail.tagName !== "p")) {
    wrapped.push(u("text", "\n"));
  }
  return h(node, "li", props2, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  let index2 = -1;
  while (!loose && ++index2 < children.length) {
    loose = listItemLoose(children[index2]);
  }
  return Boolean(loose);
}
function listItemLoose(node) {
  const spread2 = node.spread;
  return spread2 === void 0 || spread2 === null ? node.children.length > 1 : spread2;
}
function list(h, node) {
  const props2 = {};
  const name = node.ordered ? "ol" : "ul";
  const items = all2(h, node);
  let index2 = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    props2.start = node.start;
  }
  while (++index2 < items.length) {
    const item = items[index2];
    if (item.type === "element" && item.tagName === "li" && item.properties && Array.isArray(item.properties.className) && item.properties.className.includes("task-list-item")) {
      props2.className = ["contains-task-list"];
      break;
    }
  }
  return h(node, name, props2, wrap(items, true));
}
function paragraph(h, node) {
  return h(node, "p", all2(h, node));
}
function root$1(h, node) {
  return h.augment(node, u("root", wrap(all2(h, node))));
}
function strong(h, node) {
  return h(node, "strong", all2(h, node));
}
function table(h, node) {
  const rows = node.children;
  let index2 = -1;
  const align = node.align || [];
  const result = [];
  while (++index2 < rows.length) {
    const row = rows[index2].children;
    const name = index2 === 0 ? "th" : "td";
    const out = [];
    let cellIndex = -1;
    const length = node.align ? align.length : row.length;
    while (++cellIndex < length) {
      const cell = row[cellIndex];
      out.push(
        h(cell, name, { align: align[cellIndex] }, cell ? all2(h, cell) : [])
      );
    }
    result[index2] = h(rows[index2], "tr", wrap(out, true));
  }
  return h(
    node,
    "table",
    wrap(
      [h(result[0].position, "thead", wrap([result[0]], true))].concat(
        result[1] ? h(
          {
            start: pointStart(result[1]),
            end: pointEnd(result[result.length - 1])
          },
          "tbody",
          wrap(result.slice(1), true)
        ) : []
      ),
      true
    )
  );
}
const tab = 9;
const space = 32;
function trimLines(value) {
  const source = String(value);
  const search2 = /\r?\n|\r/g;
  let match2 = search2.exec(source);
  let last = 0;
  const lines = [];
  while (match2) {
    lines.push(
      trimLine(source.slice(last, match2.index), last > 0, true),
      match2[0]
    );
    last = match2.index + match2[0].length;
    match2 = search2.exec(source);
  }
  lines.push(trimLine(source.slice(last), last > 0, false));
  return lines.join("");
}
function trimLine(value, start, end) {
  let startIndex = 0;
  let endIndex = value.length;
  if (start) {
    let code2 = value.codePointAt(startIndex);
    while (code2 === tab || code2 === space) {
      startIndex++;
      code2 = value.codePointAt(startIndex);
    }
  }
  if (end) {
    let code2 = value.codePointAt(endIndex - 1);
    while (code2 === tab || code2 === space) {
      endIndex--;
      code2 = value.codePointAt(endIndex - 1);
    }
  }
  return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}
function text$1(h, node) {
  return h.augment(node, u("text", trimLines(String(node.value))));
}
function thematicBreak(h, node) {
  return h(node, "hr");
}
const handlers = {
  blockquote,
  break: hardBreak,
  code,
  delete: strikethrough,
  emphasis,
  footnoteReference,
  footnote,
  heading,
  html: html$2,
  imageReference,
  image,
  inlineCode,
  linkReference,
  link,
  listItem,
  list,
  paragraph,
  root: root$1,
  strong,
  table,
  text: text$1,
  thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
};
function ignore() {
  return null;
}
const own$3 = {}.hasOwnProperty;
function factory(tree, options) {
  const settings = options || {};
  const dangerous = settings.allowDangerousHtml || false;
  const footnoteById = {};
  h.dangerous = dangerous;
  h.clobberPrefix = settings.clobberPrefix === void 0 || settings.clobberPrefix === null ? "user-content-" : settings.clobberPrefix;
  h.footnoteLabel = settings.footnoteLabel || "Footnotes";
  h.footnoteLabelTagName = settings.footnoteLabelTagName || "h2";
  h.footnoteLabelProperties = settings.footnoteLabelProperties || {
    id: "footnote-label",
    className: ["sr-only"]
  };
  h.footnoteBackLabel = settings.footnoteBackLabel || "Back to content";
  h.definition = definitions(tree);
  h.footnoteById = footnoteById;
  h.footnoteOrder = [];
  h.footnoteCounts = {};
  h.augment = augment;
  h.handlers = { ...handlers, ...settings.handlers };
  h.unknownHandler = settings.unknownHandler;
  h.passThrough = settings.passThrough;
  visit$2(tree, "footnoteDefinition", (definition2) => {
    const id2 = String(definition2.identifier).toUpperCase();
    if (!own$3.call(footnoteById, id2)) {
      footnoteById[id2] = definition2;
    }
  });
  return h;
  function augment(left, right) {
    if (left && "data" in left && left.data) {
      const data2 = left.data;
      if (data2.hName) {
        if (right.type !== "element") {
          right = {
            type: "element",
            tagName: "",
            properties: {},
            children: []
          };
        }
        right.tagName = data2.hName;
      }
      if (right.type === "element" && data2.hProperties) {
        right.properties = { ...right.properties, ...data2.hProperties };
      }
      if ("children" in right && right.children && data2.hChildren) {
        right.children = data2.hChildren;
      }
    }
    if (left) {
      const ctx = "type" in left ? left : { position: left };
      if (!generated(ctx)) {
        right.position = { start: pointStart(ctx), end: pointEnd(ctx) };
      }
    }
    return right;
  }
  function h(node, tagName2, props2, children) {
    if (Array.isArray(props2)) {
      children = props2;
      props2 = {};
    }
    return augment(node, {
      type: "element",
      tagName: tagName2,
      properties: props2 || {},
      children: children || []
    });
  }
}
function toHast(tree, options) {
  const h = factory(tree, options);
  const node = one(h, tree, null);
  const foot = footer(h);
  if (foot) {
    node.children.push(u("text", "\n"), foot);
  }
  return Array.isArray(node) ? { type: "root", children: node } : node;
}
const remarkRehype = function(destination, options) {
  return destination && "run" in destination ? bridge(destination, options) : mutate(destination || options);
};
const remark2rehype = remarkRehype;
function bridge(destination, options) {
  return (node, file, next) => {
    destination.run(toHast(node, options), file, (error) => {
      next(error);
    });
  };
}
function mutate(options) {
  return (node) => toHast(node, options);
}
class Schema {
  constructor(property, normal, space2) {
    this.property = property;
    this.normal = normal;
    if (space2) {
      this.space = space2;
    }
  }
}
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;
function merge(definitions2, space2) {
  const property = {};
  const normal = {};
  let index2 = -1;
  while (++index2 < definitions2.length) {
    Object.assign(property, definitions2[index2].property);
    Object.assign(normal, definitions2[index2].normal);
  }
  return new Schema(property, normal, space2);
}
function normalize(value) {
  return value.toLowerCase();
}
class Info {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
}
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;
let powers = 0;
const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
const types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean,
  booleanish,
  overloadedBoolean,
  number,
  spaceSeparated,
  commaSeparated,
  commaOrSpaceSeparated
}, Symbol.toStringTag, { value: "Module" }));
const checks = Object.keys(types);
class DefinedInfo extends Info {
  constructor(property, attribute, mask, space2) {
    let index2 = -1;
    super(property, attribute);
    mark(this, "space", space2);
    if (typeof mask === "number") {
      while (++index2 < checks.length) {
        const check2 = checks[index2];
        mark(this, checks[index2], (mask & types[check2]) === types[check2]);
      }
    }
  }
}
DefinedInfo.prototype.defined = true;
function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}
const own$2 = {}.hasOwnProperty;
function create2(definition2) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition2.properties) {
    if (own$2.call(definition2.properties, prop)) {
      const value = definition2.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition2.transform(definition2.attributes || {}, prop),
        value,
        definition2.space
      );
      if (definition2.mustUseProperty && definition2.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition2.space);
}
const xlink = create2({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});
const xml = create2({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
const xmlns = create2({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});
const aria = create2({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});
const html$1 = create2({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});
const svg$1 = create2({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});
const valid = /^data[-\w.:]+$/i;
const dash = /-[a-z]/g;
const cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
const hastToReact = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
};
const html = merge([xml, xlink, xmlns, aria, html$1], "html");
const svg = merge([xml, xlink, xmlns, aria, svg$1], "svg");
function stringify$1(values) {
  return values.join(" ").trim();
}
function stringify(values, options) {
  var settings = options || {};
  if (values[values.length - 1] === "") {
    values = values.concat("");
  }
  return values.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
var inlineStyleParser = function(style2, options) {
  if (typeof style2 !== "string") {
    throw new TypeError("First argument must be a string");
  }
  if (!style2)
    return [];
  options = options || {};
  var lineno = 1;
  var column = 1;
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines)
      lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }
  function position2() {
    var start = { line: lineno, column };
    return function(node) {
      node.position = new Position(start);
      whitespace2();
      return node;
    };
  }
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column };
    this.source = options.source;
  }
  Position.prototype.content = style2;
  function error(msg) {
    var err = new Error(
      options.source + ":" + lineno + ":" + column + ": " + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style2;
    if (options.silent)
      ;
    else {
      throw err;
    }
  }
  function match2(re2) {
    var m = re2.exec(style2);
    if (!m)
      return;
    var str = m[0];
    updatePosition(str);
    style2 = style2.slice(str.length);
    return m;
  }
  function whitespace2() {
    match2(WHITESPACE_REGEX);
  }
  function comments(rules) {
    var c;
    rules = rules || [];
    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }
  function comment() {
    var pos = position2();
    if (FORWARD_SLASH != style2.charAt(0) || ASTERISK != style2.charAt(1))
      return;
    var i = 2;
    while (EMPTY_STRING != style2.charAt(i) && (ASTERISK != style2.charAt(i) || FORWARD_SLASH != style2.charAt(i + 1))) {
      ++i;
    }
    i += 2;
    if (EMPTY_STRING === style2.charAt(i - 1)) {
      return error("End of comment missing");
    }
    var str = style2.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style2 = style2.slice(i);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  function declaration() {
    var pos = position2();
    var prop = match2(PROPERTY_REGEX);
    if (!prop)
      return;
    comment();
    if (!match2(COLON_REGEX))
      return error("property missing ':'");
    var val = match2(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    });
    match2(SEMICOLON_REGEX);
    return ret;
  }
  function declarations() {
    var decls = [];
    comments(decls);
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    return decls;
  }
  whitespace2();
  return declarations();
};
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
var parse$1 = inlineStyleParser;
function StyleToObject(style2, iterator) {
  var output = null;
  if (!style2 || typeof style2 !== "string") {
    return output;
  }
  var declaration;
  var declarations = parse$1(style2);
  var hasIterator = typeof iterator === "function";
  var property;
  var value;
  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;
    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }
  return output;
}
var styleToObject = StyleToObject;
const webNamespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
const ns = webNamespaces;
const toReact = hastToReact;
const own$1 = {}.hasOwnProperty;
const root = convert$2("root");
const element = convert$2("element");
const text = convert$2("text");
function toH(h, tree, options) {
  if (typeof h !== "function") {
    throw new TypeError("h is not a function");
  }
  const r = react(h);
  const v = vue(h);
  const vd = vdom(h);
  let prefix;
  let node;
  if (typeof options === "string" || typeof options === "boolean") {
    prefix = options;
    options = {};
  } else {
    if (!options)
      options = {};
    prefix = options.prefix;
  }
  if (root(tree)) {
    node = tree.children.length === 1 && element(tree.children[0]) ? tree.children[0] : {
      type: "element",
      tagName: "div",
      properties: {},
      children: tree.children
    };
  } else if (element(tree)) {
    node = tree;
  } else {
    throw new Error(
      "Expected root or element, not `" + (tree && tree.type || tree) + "`"
    );
  }
  return transform(h, node, {
    schema: options.space === "svg" ? svg : html,
    prefix: prefix === void 0 || prefix === null ? r || v || vd ? "h-" : null : typeof prefix === "string" ? prefix : prefix ? "h-" : null,
    key: 0,
    react: r,
    vue: v,
    vdom: vd,
    hyperscript: hyperscript(h)
  });
}
function transform(h, node, ctx) {
  const parentSchema = ctx.schema;
  let schema = parentSchema;
  let name = node.tagName;
  const attributes = {};
  const nodes = [];
  let index2 = -1;
  let key;
  if (parentSchema.space === "html" && name.toLowerCase() === "svg") {
    schema = svg;
    ctx.schema = schema;
  }
  for (key in node.properties) {
    if (node.properties && own$1.call(node.properties, key)) {
      addAttribute(attributes, key, node.properties[key], ctx, name);
    }
  }
  if (ctx.vdom) {
    if (schema.space === "html") {
      name = name.toUpperCase();
    } else if (schema.space) {
      attributes.namespace = ns[schema.space];
    }
  }
  if (ctx.prefix) {
    ctx.key++;
    attributes.key = ctx.prefix + ctx.key;
  }
  if (node.children) {
    while (++index2 < node.children.length) {
      const value = node.children[index2];
      if (element(value)) {
        nodes.push(transform(h, value, ctx));
      } else if (text(value)) {
        nodes.push(value.value);
      }
    }
  }
  ctx.schema = parentSchema;
  return nodes.length > 0 ? h.call(node, name, attributes, nodes) : h.call(node, name, attributes);
}
function addAttribute(props2, prop, value, ctx, name) {
  const info = find(ctx.schema, prop);
  let subprop;
  if (value === void 0 || value === null || typeof value === "number" && Number.isNaN(value) || value === false && (ctx.vue || ctx.vdom || ctx.hyperscript) || !value && info.boolean && (ctx.vue || ctx.vdom || ctx.hyperscript)) {
    return;
  }
  if (Array.isArray(value)) {
    value = info.commaSeparated ? stringify(value) : stringify$1(value);
  }
  if (info.boolean && ctx.hyperscript) {
    value = "";
  }
  if (info.property === "style" && typeof value === "string" && (ctx.react || ctx.vue || ctx.vdom)) {
    value = parseStyle(value, name);
  }
  if (ctx.vue) {
    if (info.property !== "style")
      subprop = "attrs";
  } else if (!info.mustUseProperty) {
    if (ctx.vdom) {
      if (info.property !== "style")
        subprop = "attributes";
    } else if (ctx.hyperscript) {
      subprop = "attrs";
    }
  }
  if (subprop) {
    props2[subprop] = Object.assign(props2[subprop] || {}, {
      [info.attribute]: value
    });
  } else if (info.space && ctx.react) {
    props2[toReact[info.property] || info.property] = value;
  } else {
    props2[info.attribute] = value;
  }
}
function react(h) {
  const node = h("div", {});
  return Boolean(
    node && ("_owner" in node || "_store" in node) && (node.key === void 0 || node.key === null)
  );
}
function hyperscript(h) {
  return "context" in h && "cleanup" in h;
}
function vdom(h) {
  const node = h("div", {});
  return node.type === "VirtualNode";
}
function vue(h) {
  const node = h("div", {});
  return Boolean(node && node.context && node.context._isVue);
}
function parseStyle(value, tagName2) {
  const result = {};
  try {
    styleToObject(value, (name, value2) => {
      if (name.slice(0, 4) === "-ms-")
        name = "ms-" + name.slice(4);
      result[name.replace(
        /-([a-z])/g,
        (_, $1) => $1.toUpperCase()
      )] = value2;
    });
  } catch (error) {
    error.message = tagName2 + "[style]" + error.message.slice("undefined".length);
    throw error;
  }
  return result;
}
var convert_1 = convert$1;
function convert$1(test2) {
  if (typeof test2 === "string") {
    return typeFactory(test2);
  }
  if (test2 === null || test2 === void 0) {
    return ok;
  }
  if (typeof test2 === "object") {
    return ("length" in test2 ? anyFactory : matchesFactory)(test2);
  }
  if (typeof test2 === "function") {
    return test2;
  }
  throw new Error("Expected function, string, or object as test");
}
function convertAll(tests) {
  var results = [];
  var length = tests.length;
  var index2 = -1;
  while (++index2 < length) {
    results[index2] = convert$1(tests[index2]);
  }
  return results;
}
function matchesFactory(test2) {
  return matches2;
  function matches2(node) {
    var key;
    for (key in test2) {
      if (node[key] !== test2[key]) {
        return false;
      }
    }
    return true;
  }
}
function anyFactory(tests) {
  var checks2 = convertAll(tests);
  var length = checks2.length;
  return matches2;
  function matches2() {
    var index2 = -1;
    while (++index2 < length) {
      if (checks2[index2].apply(this, arguments)) {
        return true;
      }
    }
    return false;
  }
}
function typeFactory(test2) {
  return type;
  function type(node) {
    return Boolean(node && node.type === test2);
  }
}
function ok() {
  return true;
}
var unistUtilVisitParents = visitParents$1;
var convert = convert_1;
var CONTINUE$1 = true;
var SKIP$1 = "skip";
var EXIT$1 = false;
visitParents$1.CONTINUE = CONTINUE$1;
visitParents$1.SKIP = SKIP$1;
visitParents$1.EXIT = EXIT$1;
function visitParents$1(tree, test2, visitor2, reverse) {
  var is;
  if (typeof test2 === "function" && typeof visitor2 !== "function") {
    reverse = visitor2;
    visitor2 = test2;
    test2 = null;
  }
  is = convert(test2);
  one2(tree, null, []);
  function one2(node, index2, parents) {
    var result = [];
    var subresult;
    if (!test2 || is(node, index2, parents[parents.length - 1] || null)) {
      result = toResult(visitor2(node, parents));
      if (result[0] === EXIT$1) {
        return result;
      }
    }
    if (node.children && result[0] !== SKIP$1) {
      subresult = toResult(all3(node.children, parents.concat(node)));
      return subresult[0] === EXIT$1 ? subresult : result;
    }
    return result;
  }
  function all3(children, parents) {
    var min2 = -1;
    var step = reverse ? -1 : 1;
    var index2 = (reverse ? children.length : min2) + step;
    var result;
    while (index2 > min2 && index2 < children.length) {
      result = one2(children[index2], index2, parents);
      if (result[0] === EXIT$1) {
        return result;
      }
      index2 = typeof result[1] === "number" ? result[1] : index2 + step;
    }
  }
}
function toResult(value) {
  if (value !== null && typeof value === "object" && "length" in value) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE$1, value];
  }
  return [value];
}
var unistUtilVisit = visit$1;
var visitParents = unistUtilVisitParents;
var CONTINUE = visitParents.CONTINUE;
var SKIP = visitParents.SKIP;
var EXIT = visitParents.EXIT;
visit$1.CONTINUE = CONTINUE;
visit$1.SKIP = SKIP;
visit$1.EXIT = EXIT;
function visit$1(tree, test2, visitor2, reverse) {
  if (typeof test2 === "function" && typeof visitor2 !== "function") {
    reverse = visitor2;
    visitor2 = test2;
    test2 = null;
  }
  visitParents(tree, test2, overload, reverse);
  function overload(node, parents) {
    var parent = parents[parents.length - 1];
    var index2 = parent ? parent.children.indexOf(node) : null;
    return visitor2(node, index2, parent);
  }
}
var visit = unistUtilVisit;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hastCssPropertyMap = {
  align: "text-align",
  valign: "vertical-align",
  height: "height",
  width: "width"
};
var hastUtilTableCellStyle = function tableCellStyle(node) {
  visit(node, "element", visitor);
  return node;
};
function visitor(node) {
  if (node.tagName !== "tr" && node.tagName !== "td" && node.tagName !== "th") {
    return;
  }
  var hastName;
  var cssName;
  for (hastName in hastCssPropertyMap) {
    if (!hasOwnProperty.call(hastCssPropertyMap, hastName) || node.properties[hastName] === void 0) {
      continue;
    }
    cssName = hastCssPropertyMap[hastName];
    appendStyle(node, cssName, node.properties[hastName]);
    delete node.properties[hastName];
  }
}
function appendStyle(node, property, value) {
  var prevStyle = (node.properties.style || "").trim();
  if (prevStyle && !/;\s*/.test(prevStyle)) {
    prevStyle += ";";
  }
  if (prevStyle) {
    prevStyle += " ";
  }
  var nextStyle = prevStyle + property + ": " + value + ";";
  node.properties.style = nextStyle;
}
const tableCellStyle2 = hastUtilTableCellStyle;
function whitespace(thing) {
  var value = thing && typeof thing === "object" && thing.type === "text" ? thing.value || "" : thing;
  return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
}
const own = {}.hasOwnProperty;
const tableElements = /* @__PURE__ */ new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td"
]);
function rehypeReact(options) {
  if (!options || typeof options.createElement !== "function") {
    throw new TypeError("createElement is not a function");
  }
  const createElement2 = options.createElement;
  Object.assign(this, { Compiler: compiler2 });
  function compiler2(node) {
    let result = toH(h, tableCellStyle2(node), options.prefix);
    if (node.type === "root") {
      result = result && typeof result === "object" && "type" in result && "props" in result && result.type === "div" && (node.children.length !== 1 || node.children[0].type !== "element") ? result.props.children : [result];
      return createElement2(options.Fragment || "div", {}, result);
    }
    return result;
  }
  function h(name, props2, children) {
    if (children && tableElements.has(name)) {
      children = children.filter((child) => !whitespace(child));
    }
    if (options.components && own.call(options.components, name)) {
      const component = options.components[name];
      if (options.passNode && typeof component === "function") {
        props2 = Object.assign({ node: this }, props2);
      }
      return createElement2(component, props2, children);
    }
    return createElement2(name, props2, children);
  }
}
function parse(value) {
  const input = String(value || "").trim();
  return input ? input.split(/[ \t\n\r\f]+/g) : [];
}
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\/;
function isAbsoluteUrl(url) {
  if (typeof url !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }
  if (WINDOWS_PATH_REGEX.test(url)) {
    return false;
  }
  return ABSOLUTE_URL_REGEX.test(url);
}
const defaultTarget = "_blank";
const defaultRel = ["nofollow", "noopener", "noreferrer"];
const defaultProtocols = ["http", "https"];
function remarkExternalLinks(options = {}) {
  const target2 = options.target;
  const rel = typeof options.rel === "string" ? parse(options.rel) : options.rel;
  const protocols = options.protocols || defaultProtocols;
  const content2 = options.content && !Array.isArray(options.content) ? [options.content] : options.content;
  const contentProperties = options.contentProperties || {};
  return (tree) => {
    const definition2 = definitions(tree);
    visit$2(tree, (node) => {
      if (node.type === "link" || node.type === "linkReference") {
        const ctx = node.type === "link" ? node : definition2(node.identifier);
        if (!ctx)
          return;
        const protocol = ctx.url.slice(0, ctx.url.indexOf(":"));
        if (isAbsoluteUrl(ctx.url) && protocols.includes(protocol)) {
          const data2 = node.data || (node.data = {});
          const props2 = data2.hProperties || (data2.hProperties = {});
          if (target2 !== false) {
            props2.target = target2 || defaultTarget;
          }
          if (rel !== false) {
            props2.rel = (rel || defaultRel).concat();
          }
          if (content2) {
            node.children.push({
              type: "fragment",
              children: [],
              data: {
                hName: "span",
                hProperties: extend$1(true, contentProperties),
                hChildren: extend$1(true, content2)
              }
            });
          }
        }
      }
    });
  };
}
const Link = {
  name: "Link",
  functional: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  render(h, { data: data2, props: props2 }) {
    return h("a", {
      attrs: {
        href: props2.href,
        rel: "noopener noreferrer",
        target: "_blank",
        class: "rich-text--external-link"
      }
    }, [props2.href.trim()]);
  }
};
const remarkAutolink = function({ autolink: autolink2, useMarkdown }) {
  return function(tree) {
    if (!useMarkdown || !autolink2) {
      return;
    }
    visit$2(tree, (node) => node.type === "text", (node, index2, parent) => {
      let parsed = parseUrl(node.value);
      parsed = parsed.map((n) => {
        if (typeof n === "string") {
          return u("text", n);
        }
        return u("link", {
          url: n.props.href
        }, [u("text", n.props.href)]);
      }).filter((x) => x);
      parent.children.splice(index2, 1, ...parsed.flat());
      return [SKIP$2, index2 + parsed.flat().length];
    });
  };
};
const parseUrl = (text2, linkComponent) => {
  let match2 = URL_PATTERN_AUTOLINK.exec(text2);
  const list2 = [];
  let start = 0;
  while (match2 !== null) {
    let href = match2[2];
    let textAfter;
    let textBefore = text2.substring(start, match2.index + match2[1].length);
    if (href[0] === " ") {
      textBefore += href[0];
      href = href.substring(1).trim();
    }
    const lastChar = href[href.length - 1];
    if (lastChar === "." || lastChar === "," || lastChar === ";" || match2[0][0] === "(" && lastChar === ")") {
      href = href.substring(0, href.length - 1);
      textAfter = lastChar;
    }
    list2.push(textBefore);
    list2.push({ component: Link, props: { href } });
    if (textAfter) {
      list2.push(textAfter);
    }
    start = match2.index + match2[0].length;
    match2 = URL_PATTERN_AUTOLINK.exec(text2);
  }
  list2.push(text2.substring(start));
  const joinedText = list2.map((item) => typeof item === "string" ? item : item.props.href).join("");
  if (text2 === joinedText) {
    return list2;
  }
  console.error("Failed to reassemble the chunked text: " + text2);
  return text2;
};
const remarkPlaceholder = function() {
  return function(ast) {
    visit$2(ast, (node) => node.type === "text", visitor2);
    function visitor2(node, index2, parent) {
      const placeholders = node.value.split(/(\{[a-z\-_.0-9]+\})/ig).map((entry, index3, list2) => {
        const matches2 = entry.match(/^\{([a-z\-_.0-9]+)\}$/i);
        if (!matches2) {
          return u("text", entry);
        }
        const [, component] = matches2;
        return u("element", {
          tagName: `#${component}`
        });
      });
      node = u("element", { tagName: "span" }, [
        ...placeholders
      ]);
      parent.children[index2] = node;
    }
  };
};
const prepareTextNode = ({ h, context }, text2) => {
  if (context.autolink) {
    text2 = parseUrl(text2);
  }
  if (Array.isArray(text2)) {
    return text2.map((entry) => {
      if (typeof entry === "string") {
        return entry;
      }
      const { component, props: props2 } = entry;
      return h(component, {
        props: props2,
        class: "rich-text--component"
      });
    });
  }
  return text2;
};
const RichText_vue_vue_type_style_index_0_scoped_a8ade67f_lang = "";
const _sfc_main$2 = {
  name: "RichText",
  components: {
    ReferenceList
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    arguments: {
      type: Object,
      default: () => {
        return {};
      }
    },
    referenceLimit: {
      type: Number,
      default: 0
    },
    references: {
      type: Object,
      default: null
    },
    markdownCssClasses: {
      type: Object,
      default: () => {
        return {
          a: "rich-text--external-link",
          ol: "rich-text--ordered-list",
          ul: "rich-text--un-ordered-list",
          li: "rich-text--list-item",
          strong: "rich-text--strong",
          em: "rich-text--italic",
          h1: "rich-text--heading rich-text--heading-1",
          h2: "rich-text--heading rich-text--heading-2",
          h3: "rich-text--heading rich-text--heading-3",
          h4: "rich-text--heading rich-text--heading-4",
          h5: "rich-text--heading rich-text--heading-5",
          h6: "rich-text--heading rich-text--heading-6",
          hr: "rich-text--hr",
          table: "rich-text--table",
          pre: "rich-text--pre",
          code: "rich-text--code",
          blockquote: "rich-text--blockquote"
        };
      }
    },
    useMarkdown: {
      type: Boolean,
      default: false
    },
    autolink: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    renderPlaintext(h) {
      const context = this;
      const placeholders = this.text.split(/(\{[a-z\-_.0-9]+\})/ig).map(function(entry, index2, list2) {
        const matches2 = entry.match(/^\{([a-z\-_.0-9]+)\}$/i);
        if (!matches2) {
          return prepareTextNode({ h, context }, entry);
        }
        const argumentId = matches2[1];
        const argument = context.arguments[argumentId];
        if (typeof argument === "object") {
          const { component, props: props2 } = argument;
          return h(component, {
            props: props2,
            class: "rich-text--component"
          });
        }
        if (argument) {
          return h("span", { class: "rich-text--fallback" }, argument);
        }
        return entry;
      });
      return h("div", { class: "rich-text--wrapper" }, [
        h("div", {}, placeholders.flat()),
        this.referenceLimit > 0 ? h("div", { class: "rich-text--reference-widget" }, [
          h(ReferenceList, { props: { text: this.text, referenceData: this.references } })
        ]) : null
      ]);
    },
    renderMarkdown(h) {
      const renderedMarkdown = unified().use(remarkParse).use(remarkAutolink, {
        autolink: this.autolink,
        useMarkdown: this.useMarkdown
      }).use(remarkExternalLinks, {
        target: "_blank",
        rel: ["noopener noreferrer"]
      }).use(remarkBreaks).use(remark2rehype, {
        handlers: {
          component(toHast2, node) {
            return toHast2(node, node.component, { value: node.value });
          }
        }
      }).use(remarkPlaceholder).use(rehypeReact, {
        createElement: (tag, attrs2, children) => {
          if (!tag.startsWith("#")) {
            return h(tag, attrs2, children);
          }
          const placeholder2 = this.arguments[tag.slice(1)];
          if (!placeholder2) {
            return h("span", { ...{ attrs: attrs2 }, ...{ class: "rich-text--fallback" } }, [`{${tag.slice(1)}}`]);
          }
          if (!placeholder2.component) {
            return h("span", attrs2, [placeholder2]);
          }
          return h(
            placeholder2.component,
            {
              attrs: attrs2,
              props: placeholder2.props,
              class: "rich-text--component"
            },
            children
          );
        },
        prefix: false
      }).processSync(this.text).result;
      return h("div", { class: "rich-text--wrapper" }, [
        renderedMarkdown,
        this.referenceLimit > 0 ? h("div", { class: "rich-text--reference-widget" }, [
          h(ReferenceList, { props: { text: this.text, referenceData: this.references } })
        ]) : null
      ]);
    }
  },
  render(h) {
    if (!this.useMarkdown) {
      return this.renderPlaintext(h);
    }
    return this.renderMarkdown(h);
  }
};
const _sfc_render$2 = null;
const _sfc_staticRenderFns$2 = null;
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  "a8ade67f",
  null,
  null
);
const RichText = __component__$2.exports;
const UserBubble_vue_vue_type_style_index_0_scoped_aa533d85_lang = "";
const _sfc_main$1 = {
  name: "UserBubble",
  props: {
    user: {
      type: String,
      default: ""
    }
  }
};
var _sfc_render$1 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "user" }, [_vm._v(_vm._s(_vm.user))]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "aa533d85",
  null,
  null
);
const UserBubble = __component__$1.exports;
const DemoPlayground_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "DemoPlayground",
  components: {
    RichText
  },
  data() {
    return {
      text: `Hello {username}. The file {file} was added by {username}. Go visit https://nextcloud.com

Some examples for markdown syntax: **bold text** *italic text* ~~strikethrough~~`,
      autolink: true,
      useMarkdown: false,
      args: {
        file: "MyDocument.odt",
        username: {
          component: UserBubble,
          props: {
            user: "Jane Doe"
          }
        }
      }
    };
  }
};
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("textarea", { directives: [{ name: "model", rawName: "v-model", value: _vm.text, expression: "text" }], domProps: { "value": _vm.text }, on: { "input": function($event) {
    if ($event.target.composing)
      return;
    _vm.text = $event.target.value;
  } } }), _c("p", [_c("label", { attrs: { "for": "autolink" } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.autolink, expression: "autolink" }], attrs: { "id": "autolink", "type": "checkbox" }, domProps: { "checked": Array.isArray(_vm.autolink) ? _vm._i(_vm.autolink, null) > -1 : _vm.autolink }, on: { "change": function($event) {
    var $$a = _vm.autolink, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = null, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.autolink = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.autolink = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.autolink = $$c;
    }
  } } }), _vm._v(" Autolink ")])]), _c("p", [_c("label", { attrs: { "for": "useMarkdown" } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.useMarkdown, expression: "useMarkdown" }], attrs: { "id": "useMarkdown", "type": "checkbox" }, domProps: { "checked": Array.isArray(_vm.useMarkdown) ? _vm._i(_vm.useMarkdown, null) > -1 : _vm.useMarkdown }, on: { "change": function($event) {
    var $$a = _vm.useMarkdown, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = null, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.useMarkdown = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.useMarkdown = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.useMarkdown = $$c;
    }
  } } }), _vm._v(" Use Markdown ")])]), _c("RichText", { attrs: { "text": _vm.text, "autolink": _vm.autolink, "arguments": _vm.args, "use-markdown": _vm.useMarkdown } })], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null,
  null,
  null
);
const DemoPlayground = __component__.exports;
document.getElementById("readme").innerHTML = html$5;
const app = new Vue({
  render: (h) => h("div", [
    h(DemoPlayground, {})
  ])
});
app.$mount("#app");