/**
 * Tests for DSA Library
 * Run: npx ts-node tests/index.test.ts
 */

import { Stack, Queue, LinkedList, BinarySearchTree, MinHeap, Graph, Sorting } from '../src/index';

let passed = 0, failed = 0;

function test(name: string, fn: () => void) {
  try { fn(); console.log(`  ✓ ${name}`); passed++; }
  catch(e: any) { console.log(`  ✗ ${name}: ${e.message}`); failed++; }
}

function expect(actual: any) {
  return {
    toBe: (expected: any) => { if(actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`); },
    toEqual: (expected: any) => { if(JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`); },
    toBeTrue: () => { if(!actual) throw new Error(`Expected true, got ${actual}`); },
    toBeFalse: () => { if(actual) throw new Error(`Expected false, got ${actual}`); },
  };
}

console.log('\n📦 DSA Library — Test Suite\n');

// Stack
console.log('Stack:');
test('push and peek', () => { const s = new Stack<number>(); s.push(1); s.push(2); expect(s.peek()).toBe(2); });
test('pop returns last item', () => { const s = new Stack<number>(); s.push(5); expect(s.pop()).toBe(5); });
test('isEmpty on empty stack', () => { const s = new Stack(); expect(s.isEmpty()).toBeTrue(); });
test('size tracks correctly', () => { const s = new Stack<string>(); s.push('a'); s.push('b'); expect(s.size()).toBe(2); });

// Queue
console.log('\nQueue:');
test('enqueue and dequeue FIFO', () => { const q = new Queue<number>(); q.enqueue(1); q.enqueue(2); expect(q.dequeue()).toBe(1); });
test('front without dequeue', () => { const q = new Queue<number>(); q.enqueue(99); expect(q.front()).toBe(99); expect(q.size()).toBe(1); });
test('isEmpty check', () => { const q = new Queue(); expect(q.isEmpty()).toBeTrue(); });

// LinkedList
console.log('\nLinkedList:');
test('append and toArray', () => { const l = new LinkedList<number>(); l.append(1); l.append(2); expect(l.toArray()).toEqual([1,2]); });
test('prepend', () => { const l = new LinkedList<number>(); l.append(2); l.prepend(1); expect(l.toArray()).toEqual([1,2]); });
test('contains', () => { const l = new LinkedList<number>(); l.append(5); expect(l.contains(5)).toBeTrue(); expect(l.contains(99)).toBeFalse(); });
test('delete node', () => { const l = new LinkedList<number>(); l.append(1); l.append(2); l.delete(1); expect(l.toArray()).toEqual([2]); });
test('reverse', () => { const l = new LinkedList<number>(); [1,2,3].forEach(n=>l.append(n)); l.reverse(); expect(l.toArray()).toEqual([3,2,1]); });

// BST
console.log('\nBinarySearchTree:');
test('insert and contains', () => { const b = new BinarySearchTree<number>(); b.insert(5); expect(b.contains(5)).toBeTrue(); });
test('inOrder returns sorted', () => { const b = new BinarySearchTree<number>(); [5,3,7,1].forEach(n=>b.insert(n)); expect(b.inOrder()).toEqual([1,3,5,7]); });
test('height', () => { const b = new BinarySearchTree<number>(); [5,3,7].forEach(n=>b.insert(n)); expect(b.height()).toBe(2); });

// MinHeap
console.log('\nMinHeap:');
test('extractMin returns smallest', () => { const h = new MinHeap(); [5,1,3].forEach(n=>h.insert(n)); expect(h.extractMin()).toBe(1); });
test('peek without extract', () => { const h = new MinHeap(); h.insert(10); h.insert(2); expect(h.peek()).toBe(2); });

// Graph
console.log('\nGraph:');
test('BFS traversal', () => { const g = new Graph(); g.addEdge('A','B'); g.addEdge('A','C'); const r = g.bfs('A'); expect(r[0]).toBe('A'); });
test('DFS traversal', () => { const g = new Graph(); g.addEdge('A','B'); g.addEdge('B','C'); const r = g.dfs('A'); expect(r.includes('C')).toBeTrue(); });
test('hasPath', () => { const g = new Graph(); g.addEdge('A','B'); g.addEdge('B','C'); expect(g.hasPath('A','C')).toBeTrue(); expect(g.hasPath('C','A')).toBeFalse(); });

// Sorting
console.log('\nSorting:');
test('bubble sort', () => { expect(Sorting.bubble([3,1,2])).toEqual([1,2,3]); });
test('merge sort', () => { expect(Sorting.merge([5,2,8,1])).toEqual([1,2,5,8]); });
test('quick sort', () => { expect(Sorting.quick([9,3,7,1])).toEqual([1,3,7,9]); });
test('binary search found', () => { expect(Sorting.binary([1,2,3,4,5], 3)).toBe(2); });
test('binary search not found', () => { expect(Sorting.binary([1,2,3], 99)).toBe(-1); });

console.log(`\n${'─'.repeat(40)}`);
console.log(`  ✓ ${passed} passed  ✗ ${failed} failed`);
console.log(`${'─'.repeat(40)}\n`);
if(failed > 0) process.exit(1);
