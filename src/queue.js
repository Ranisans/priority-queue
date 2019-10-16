const MaxHeap = require("./max-heap.js");

class PriorityQueue {
  constructor(maxSize = 30) {
    this.maxSize = maxSize;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.heap.size() < this.maxSize) this.heap.push(data, priority);
    else throw Error();
  }

  shift() {
    if (this.heap.size() !== 0) return this.heap.pop();
    else throw Error();
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;

// let q = new PriorityQueue(3);
// q.push(0, 1);
// q.push(1, 2);
// q.push(2, 3);
// q.push(3, 4);
