# DSA Library — TypeScript

A clean TypeScript implementation of common data structures and algorithms. Fully typed, zero dependencies, 25+ test cases.

## Data Structures

| Structure | Operations |
|-----------|-----------|
| `Stack<T>` | push, pop, peek, isEmpty, size |
| `Queue<T>` | enqueue, dequeue, front, isEmpty, size |
| `LinkedList<T>` | append, prepend, delete, contains, reverse, toArray |
| `BinarySearchTree<T>` | insert, contains, inOrder, height |
| `MinHeap` | insert, extractMin, peek, size |
| `Graph` | addVertex, addEdge, bfs, dfs, hasPath |

## Algorithms

| Algorithm | Complexity |
|-----------|-----------|
| Bubble Sort | O(n²) |
| Merge Sort | O(n log n) |
| Quick Sort | O(n log n) avg |
| Binary Search | O(log n) |

## Usage

```typescript
import { Stack, Queue, LinkedList, BinarySearchTree, MinHeap, Graph, Sorting } from './src/index';

// Stack
const stack = new Stack<number>();
stack.push(1); stack.push(2);
console.log(stack.pop()); // 2

// Queue
const queue = new Queue<string>();
queue.enqueue("first"); queue.enqueue("second");
console.log(queue.dequeue()); // "first"

// Linked List
const list = new LinkedList<number>();
list.append(1); list.append(2); list.append(3);
list.reverse();
console.log(list.toArray()); // [3, 2, 1]

// Binary Search Tree
const bst = new BinarySearchTree<number>();
[5, 3, 7, 1, 4].forEach(n => bst.insert(n));
console.log(bst.inOrder()); // [1, 3, 4, 5, 7]

// Graph - BFS / DFS
const graph = new Graph();
graph.addEdge("A", "B"); graph.addEdge("B", "C");
console.log(graph.bfs("A")); // ["A", "B", "C"]
console.log(graph.hasPath("A", "C")); // true

// Sorting
console.log(Sorting.merge([5, 2, 8, 1])); // [1, 2, 5, 8]
console.log(Sorting.binary([1,2,3,4,5], 3)); // 2
```

## Run Tests

```bash
npm install
npm test
```

Output:
```
📦 DSA Library — Test Suite

Stack:
  ✓ push and peek
  ✓ pop returns last item
  ✓ isEmpty on empty stack
  ✓ size tracks correctly
...
────────────────────────────────────────
  ✓ 25 passed  ✗ 0 failed
────────────────────────────────────────
```

## Project Structure

```
dsa-typescript/
├── src/
│   └── index.ts       # All data structures & algorithms
├── tests/
│   └── index.test.ts  # 25 test cases
├── tsconfig.json
├── package.json
└── README.md
```

## Author

**Vedant Kadam** · UNB Computer Science
[github.com/iamvk07](https://github.com/iamvk07) · [linkedin.com/in/vedantkadam07](https://linkedin.com/in/vedantkadam07)
