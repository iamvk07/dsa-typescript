/**
 * DSA Library — TypeScript Data Structures & Algorithms
 * Author: Vedant Kadam
 * GitHub: github.com/iamvk07
 */

// ── STACK ─────────────────────────────────────────────────────────────────────

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }
}

// ── QUEUE ─────────────────────────────────────────────────────────────────────

export class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head++;
    // Compact array when head is too far ahead
    if (this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  front(): T | undefined {
    return this.items[this.head];
  }

  isEmpty(): boolean {
    return this.head >= this.items.length;
  }

  size(): number {
    return this.items.length - this.head;
  }
}

// ── LINKED LIST ───────────────────────────────────────────────────────────────

class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private _size = 0;

  append(value: T): void {
    const node = new ListNode(value);
    if (!this.head) { this.head = node; }
    else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this._size++;
  }

  prepend(value: T): void {
    this.head = new ListNode(value, this.head);
    this._size++;
  }

  delete(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) { this.head = this.head.next; this._size--; return true; }
    let curr = this.head;
    while (curr.next) {
      if (curr.next.value === value) { curr.next = curr.next.next; this._size--; return true; }
      curr = curr.next;
    }
    return false;
  }

  contains(value: T): boolean {
    let curr = this.head;
    while (curr) { if (curr.value === value) return true; curr = curr.next; }
    return false;
  }

  toArray(): T[] {
    const result: T[] = [];
    let curr = this.head;
    while (curr) { result.push(curr.value); curr = curr.next; }
    return result;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let curr = this.head;
    while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }
    this.head = prev;
  }

  size(): number { return this._size; }
}

// ── BINARY SEARCH TREE ────────────────────────────────────────────────────────

class BSTNode<T> {
  constructor(public value: T, public left: BSTNode<T> | null = null, public right: BSTNode<T> | null = null) {}
}

export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;

  insert(value: T): void {
    const node = new BSTNode(value);
    if (!this.root) { this.root = node; return; }
    let curr = this.root;
    while (true) {
      if (value < curr.value) {
        if (!curr.left) { curr.left = node; return; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; return; }
        curr = curr.right;
      }
    }
  }

  contains(value: T): boolean {
    let curr = this.root;
    while (curr) {
      if (value === curr.value) return true;
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false;
  }

  inOrder(): T[] {
    const result: T[] = [];
    const traverse = (node: BSTNode<T> | null) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  height(): number {
    const h = (node: BSTNode<T> | null): number =>
      !node ? 0 : 1 + Math.max(h(node.left), h(node.right));
    return h(this.root);
  }
}

// ── MIN HEAP ──────────────────────────────────────────────────────────────────

export class MinHeap {
  private heap: number[] = [];

  insert(val: number): void {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMin(): number | undefined {
    if (!this.heap.length) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length) { this.heap[0] = last; this._sinkDown(0); }
    return min;
  }

  peek(): number | undefined { return this.heap[0]; }
  size(): number { return this.heap.length; }

  private _bubbleUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  private _sinkDown(i: number): void {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2*i+1, r = 2*i+2;
      if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
      if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

// ── GRAPH ─────────────────────────────────────────────────────────────────────

export class Graph {
  private adjacency: Map<string, Set<string>> = new Map();
  private directed: boolean;

  constructor(directed = false) { this.directed = directed; }

  addVertex(v: string): void {
    if (!this.adjacency.has(v)) this.adjacency.set(v, new Set());
  }

  addEdge(u: string, v: string): void {
    this.addVertex(u); this.addVertex(v);
    this.adjacency.get(u)!.add(v);
    if (!this.directed) this.adjacency.get(v)!.add(u);
  }

  bfs(start: string): string[] {
    const visited = new Set<string>([start]);
    const queue = [start], result: string[] = [];
    while (queue.length) {
      const v = queue.shift()!;
      result.push(v);
      for (const neighbor of this.adjacency.get(v) || []) {
        if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
      }
    }
    return result;
  }

  dfs(start: string): string[] {
    const visited = new Set<string>(), result: string[] = [];
    const traverse = (v: string) => {
      visited.add(v); result.push(v);
      for (const n of this.adjacency.get(v) || [])
        if (!visited.has(n)) traverse(n);
    };
    traverse(start);
    return result;
  }

  hasPath(start: string, end: string): boolean {
    return this.bfs(start).includes(end);
  }

  vertices(): string[] { return [...this.adjacency.keys()]; }
}

// ── SORTING ALGORITHMS ────────────────────────────────────────────────────────

export const Sorting = {
  bubble<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = 0; i < a.length - 1; i++)
      for (let j = 0; j < a.length - i - 1; j++)
        if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];
    return a;
  },

  merge<T>(arr: T[]): T[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = Sorting.merge(arr.slice(0, mid));
    const right = Sorting.merge(arr.slice(mid));
    const result: T[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length)
      result.push(left[i] <= right[j] ? left[i++] : right[j++]);
    return [...result, ...left.slice(i), ...right.slice(j)];
  },

  quick<T>(arr: T[]): T[] {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const mid = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...Sorting.quick(left), ...mid, ...Sorting.quick(right)];
  },

  binary<T>(sortedArr: T[], target: T): number {
    let lo = 0, hi = sortedArr.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (sortedArr[mid] === target) return mid;
      sortedArr[mid] < target ? lo = mid + 1 : hi = mid - 1;
    }
    return -1;
  }
};
