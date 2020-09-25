let newSet = new Set()
newSet.add(2)
newSet.add(5)
newSet.add(8)

console.log(newSet);

for(let item of newSet) console.log(item);

for(let item of newSet.keys()) console.log(item);

for(let item of newSet.values()) console.log(item);