## JavaScript面试题

#### 第1题：['1','2','3'].map(parseInt) what & why?

~~~~text
// 1. 首先是一个数组，调用一个数组的遍历方法map
// map的执行过程为 arr.map((val, key) => {})
// 2. parseInt 是一次同时需要两个参数
// 第一个参数为需要转成整数的字符串
// 第二个参数为指数 指数的取值范围为 2 - 36
所以在执行中parseInt的执行为：
'1' 0
'2' 1
'3' 2

parseInt('1', 0) 得到1，在javascript文档中说当radix 是undefined，0或未指定的时候，JavaScript会假定一些情况，这里radix是等于0，会被假定为8进制或10进制  所以这里返回1

parseInt('2', 1) radix 不在2-36范围内，也不是上面提到的特殊值，就返回NaN

parseInt('3', 2) 除了“0、1”外，其它数字都不是有效二进制数字 也返回NaN

所以这个题答案为 [1, NaN, NaN]

~~~~

#### 第2题：什么是防抖和节流？有什么区别？怎么实现？

> 防抖（debounce）：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
>
> 生活总的事例：如果有人进入电梯（触发事件），电梯默认会在10秒后自动关闭，如果在这10秒内又有人进入，那么又触发了事件，重新计时

~~~~js
function debounce(fn, wait) {
    let timer = null;
    return function() {
        var context = this;
        var args = arguments
        if(timer) {
            clearTimeout(timer)
            timer - null
        }

        timer = setTimeout(function(){
            fn.apply(context, args)
        }, wait)
    }
}

var fn = function() {
    console.log('1111');
}

setInterval(debounce(fn, 1000), 2000);
~~~~



> 节流（throttle）：规定的一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内事件被多次触发，只有一次能生效。

~~~~js
function throttle(fn, gapTime) {
    let _lastTime = null;
    return function() {
        let _nowTime = + new Date();
        if(_nowTime - _lastTime > gapTime || !_lastTime) {
            fn()
            _lastTime = _nowTime
        }
    }
}

setInterval(throttle(fn, 1000), 2000);
~~~~

**总结**：

* 防抖和节流都是都是防止一个时间事件频繁触发，但是他们处理的机制不一样
* 函数防抖是某个时间段内只执行一次，函数节流是间隔多久执行一次

**应用场景**

* 防抖
  * search输入搜索框关键字的时候，不是及时触发请求
  * window的resize的时候，会不断触发这个事件，可以控制在某个时间内只执行一次
* 节流
  * 用户快速点击按钮的时候，单位时间内只触发一次

#### 第三题：介绍下Set、Map和WeakSet及WeakMap的区别

1. ==Set==是ES6新增的数据结构，它类似于数组，但是成员值都是唯一的，没有重复的。
2. ==Map==对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个值或一个键。
3. ==WeakSet==对象允许你将弱保持对象存储在一个集合中。是一些对象的集合，并且其中每个对象都只能出现一次，在==WeakSet==中是唯一的。
   * 和Set的区别是：
     * ==WeakSet==只能是**对象的集合**，而不能是任何类型的任意值。
4. ==WeakMap==对象是一组键/值对的集合，其中的键是弱引用的，其键必须是对象，而值可以是任意的。

#### 第4题：ES5/ES6的继承除了写法不同之外，还有什么区别

#### 第5题：介绍下模块化发展历程，可以从IIFE、AMD、CMD、CommonJS、UMD、webpack（require.ensure）、ES Module、<script type='module'>这几个角度考虑

#### 第6题：关于const和let声明的变量不在window上

在ES5中规定全局变量和顶层对象的属性是等价的，即var和function声明的全局变量

~~~~js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}
~~~~

在ES6中var和function中任然是全局变量，是顶层对象的属性，但是新规定==let==和==const==定义的变量并没有在顶层对象中，只是在块级作用域中