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