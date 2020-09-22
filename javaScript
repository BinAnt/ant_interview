## JavaScript面试题

第1题：['1','2','3'].map(parseInt) what & why?

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

