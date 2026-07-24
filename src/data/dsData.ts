import { DSTheory } from '../types';

export const DS_THEORY_DATA: Record<string, DSTheory> = {
  stack: {
    id: 'stack',
    name: 'Stack',
    category: 'Linear',
    icon: 'Layers',
    shortDesc: 'Last-In, First-Out (LIFO) linear data structure where insertion and deletion occur at the same end.',
    definition: 'A Stack is a linear data structure that follows the Last-In, First-Out (LIFO) principle. The last element added to the stack is the first one to be removed. All insertions (push) and deletions (pop) happen at the top of the stack.',
    realLifeExample: 'A stack of dinner plates, browser back/forward button history, or undo/redo mechanisms in text editors.',
    applications: [
      'Function Call Stack / Recursion Management in compilers',
      'Expression Parsing and Evaluation (Infix to Postfix/Prefix)',
      'Undo/Redo operations in text editors and graphics tools',
      'Backtracking algorithms (Maze solving, N-Queens)'
    ],
    advantages: [
      'Simple and easy to implement using Arrays or Linked Lists',
      'Constant time O(1) insertion and deletion at the top',
      'Prevents memory fragmentation by strictly organizing memory execution'
    ],
    disadvantages: [
      'Fixed capacity when implemented using contiguous arrays',
      'No random access to elements (must pop upper elements to access lower ones)',
      'Risk of Stack Overflow if size limits are breached in recursion'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(1)',
      delete: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, val):
        self.items.append(val)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Pop from empty stack")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)`,

      c: `#include <stdio.h>
#include <stdlib.h>
#define MAX 100

typedef struct {
    int items[MAX];
    int top;
} Stack;

void init(Stack* s) { s->top = -1; }
int isFull(Stack* s) { return s->top == MAX - 1; }
int isEmpty(Stack* s) { return s->top == -1; }

void push(Stack* s, int val) {
    if (isFull(s)) return;
    s->items[++(s->top)] = val;
}

int pop(Stack* s) {
    if (isEmpty(s)) return -1;
    return s->items[(s->top)--];
}

int peek(Stack* s) {
    if (isEmpty(s)) return -1;
    return s->items[s->top];
}`,

      cpp: `#include <iostream>
#include <vector>
#include <stdexcept>

template <typename T>
class Stack {
private:
    std::vector<T> items;
public:
    void push(T val) { items.push_back(val); }
    
    T pop() {
        if (isEmpty()) throw std::out_of_range("Stack is empty");
        T topVal = items.back();
        items.pop_back();
        return topVal;
    }

    T peek() const {
        if (isEmpty()) throw std::out_of_range("Stack is empty");
        return items.back();
    }

    bool isEmpty() const { return items.empty(); }
    size_t size() const { return items.size(); }
};`,

      java: `import java.util.ArrayList;
import java.util.EmptyStackException;

public class Stack<T> {
    private ArrayList<T> items = new ArrayList<>();

    public void push(T val) {
        items.add(val);
    }

    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return items.remove(items.size() - 1);
    }

    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return items.get(items.size() - 1);
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public int size() {
        return items.size();
    }
}`
    },
    quiz: [
      {
        id: 'st-1',
        question: 'Which principle does a Stack follow?',
        options: ['FIFO (First In First Out)', 'LIFO (Last In First Out)', 'LILO (Last In Last Out)', 'Random Access'],
        correctAnswer: 1,
        explanation: 'A Stack follows the Last-In First-Out (LIFO) principle, meaning the item added last is removed first.'
      },
      {
        id: 'st-2',
        question: 'What is the time complexity of Push and Pop operations in a stack?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Push and Pop operations only modify the top pointer/index, taking constant time O(1).'
      },
      {
        id: 'st-3',
        question: 'Which condition occurs if we attempt to push an item onto a full array-based stack?',
        options: ['Underflow', 'Overflow', 'Garbage Collection', 'Null Pointer Exception'],
        correctAnswer: 1,
        explanation: 'Stack Overflow occurs when an attempt is made to push an element into a stack that is already full.'
      },
      {
        id: 'st-4',
        question: 'Which data structure is primarily used for function call stacks and recursion in compilers?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 1,
        explanation: 'Compilers use the Call Stack to track return addresses, local variables, and active function execution frames.'
      },
      {
        id: 'st-5',
        question: 'How do you check the top element of a stack without removing it?',
        options: ['pop()', 'push()', 'peek() or top()', 'isEmpty()'],
        correctAnswer: 2,
        explanation: 'peek() (or top()) returns the element at the top of the stack without popping it.'
      }
    ]
  },

  queue: {
    id: 'queue',
    name: 'Queue',
    category: 'Linear',
    icon: 'ArrowRightLeft',
    shortDesc: 'First-In, First-Out (FIFO) data structure where items enter at the Rear and exit at the Front.',
    definition: 'A Queue is a linear data structure following the First-In, First-Out (FIFO) rule. The element inserted first is processed and deleted first. Insertions occur at the Rear, while deletions occur at the Front.',
    realLifeExample: 'A ticket counter line, print job spooling queue, or customer service call center queue.',
    applications: [
      'CPU Process and Task Scheduling in Operating Systems',
      'Breadth-First Search (BFS) graph traversal',
      'Asynchronous Data Buffers (e.g. IO Buffers, Audio/Video Streaming)',
      'Printer spooling systems'
    ],
    advantages: [
      'Fair and deterministic sequential processing (FIFO)',
      'Efficient data transfer between asynchronous processes'
    ],
    disadvantages: [
      'Standard array implementation suffers from memory waste (false overflow) unless circular pointers are used',
      'No random access to middle elements'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(1)',
      delete: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, val):
        self.items.append(val)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        raise IndexError("Dequeue from empty queue")

    def front(self):
        return self.items[0] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0`,

      c: `#include <stdio.h>
#define MAX 100

typedef struct {
    int items[MAX];
    int front, rear;
} Queue;

void init(Queue* q) { q->front = 0; q->rear = -1; }

void enqueue(Queue* q, int val) {
    if (q->rear == MAX - 1) return;
    q->items[++(q->rear)] = val;
}

int dequeue(Queue* q) {
    if (q->front > q->rear) return -1;
    return q->items[(q->front)++];
}`,

      cpp: `#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;
    q.push(10); // Enqueue
    q.push(20);
    
    std::cout << "Front: " << q.front() << "\\n";
    q.pop(); // Dequeue
    return 0;
}`,

      java: `import java.util.LinkedList;
import java.util.Queue;

public class QueueDemo {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.add(10); // Enqueue
        q.add(20);
        int front = q.poll(); // Dequeue
        System.out.println("Dequeued: " + front);
    }
}`
    },
    quiz: [
      {
        id: 'qu-1',
        question: 'Which order does a Queue enforce?',
        options: ['LIFO', 'FIFO', 'Random', 'Priority-based only'],
        correctAnswer: 1,
        explanation: 'A Queue enforces First-In First-Out (FIFO) ordering.'
      },
      {
        id: 'qu-2',
        question: 'Where are elements added and removed in a queue?',
        options: ['Added at Front, removed at Rear', 'Added at Rear, removed at Front', 'Both added & removed at Front', 'Both added & removed at Rear'],
        correctAnswer: 1,
        explanation: 'In a queue, Enqueue adds to the Rear, and Dequeue removes from the Front.'
      },
      {
        id: 'qu-3',
        question: 'Which graph algorithm heavily relies on a Queue?',
        options: ['DFS', 'BFS', 'Dijkstra', 'Kruskal'],
        correctAnswer: 1,
        explanation: 'Breadth-First Search (BFS) uses a Queue to explore vertices layer-by-layer.'
      },
      {
        id: 'qu-4',
        question: 'What is the time complexity to Enqueue and Dequeue?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Enqueue and Dequeue take constant time O(1) when using a pointer-based queue or deque.'
      },
      {
        id: 'qu-5',
        question: 'What happens when you Dequeue from an empty queue?',
        options: ['Queue Overflow', 'Queue Underflow', 'Deadlock', 'Memory Leak'],
        correctAnswer: 1,
        explanation: 'Attempting to dequeue an empty queue results in Queue Underflow.'
      }
    ]
  },

  'circular-queue': {
    id: 'circular-queue',
    name: 'Circular Queue',
    category: 'Linear',
    icon: 'Repeat',
    shortDesc: 'Ring buffer data structure where the last position connects back to the first position to reuse space.',
    definition: 'A Circular Queue (or Ring Buffer) is an extension of the linear queue where the last position is connected back to the first position to form a circle. It efficiently reuses empty slots created by dequeue operations.',
    realLifeExample: 'Traffic lights cycling through colors, audio/video streaming circular buffers, or memory allocation ring buffers.',
    applications: [
      'Traffic light timing controllers',
      'Memory management and ring buffers in kernel drivers',
      'Audio streaming buffers for continuous sound playback'
    ],
    advantages: [
      'Eliminates memory waste (false overflow) of simple array-based queues',
      'Constant time O(1) enqueue and dequeue operations'
    ],
    disadvantages: [
      'Complex pointer arithmetic modulo logic (`(rear + 1) % size`)',
      'Fixed capacity unless dynamically resized'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(1)',
      delete: 'O(1)'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class CircularQueue:
    def __init__(self, k: int):
        self.capacity = k
        self.queue = [None] * k
        self.head = -1
        self.tail = -1

    def enqueue(self, value: int) -> bool:
        if self.is_full():
            return False
        if self.is_empty():
            self.head = 0
        self.tail = (self.tail + 1) % self.capacity
        self.queue[self.tail] = value
        return True

    def dequeue(self) -> bool:
        if self.is_empty():
            return False
        if self.head == self.tail:
            self.head = -1
            self.tail = -1
        else:
            self.head = (self.head + 1) % self.capacity
        return True

    def is_empty(self) -> bool:
        return self.head == -1

    def is_full(self) -> bool:
        return (self.tail + 1) % self.capacity == self.head`,

      c: `#include <stdio.h>
#define SIZE 5

typedef struct {
    int items[SIZE];
    int front, rear;
} CircularQueue;

void init(CircularQueue* q) { q->front = -1; q->rear = -1; }
int isFull(CircularQueue* q) { return (q->rear + 1) % SIZE == q->front; }
int isEmpty(CircularQueue* q) { return q->front == -1; }`,

      cpp: `// Circular Queue C++ implementation using modulo arithmetic
#include <vector>

class CircularQueue {
    int front, rear, size;
    std::vector<int> arr;
public:
    CircularQueue(int n) : size(n), front(-1), rear(-1), arr(n) {}
};`,

      java: `public class CircularQueue {
    private int[] data;
    private int head = -1, tail = -1, size;

    public CircularQueue(int k) {
        size = k;
        data = new int[k];
    }
}`
    },
    quiz: [
      {
        id: 'cq-1',
        question: 'What formula advances the tail pointer in a Circular Queue of size N?',
        options: ['tail = tail + 1', 'tail = (tail + 1) % N', 'tail = (tail - 1) % N', 'tail = tail * 2'],
        correctAnswer: 1,
        explanation: 'Modulo arithmetic `(tail + 1) % N` wraps the pointer back to index 0 when it exceeds array boundaries.'
      },
      {
        id: 'cq-2',
        question: 'When is a Circular Queue considered full?',
        options: ['head == tail', '(tail + 1) % N == head', 'head == 0', 'tail == N'],
        correctAnswer: 1,
        explanation: 'A Circular Queue is full when the next position of the tail pointer matches the head pointer.'
      },
      {
        id: 'cq-3',
        question: 'What main problem of linear queues does a circular queue solve?',
        options: ['Slow search speed', 'Memory waste from unreleased front slots', 'Stack overflow', 'Lack of pointer support'],
        correctAnswer: 1,
        explanation: 'In linear queues, dequeuing leaves unused empty spaces at the front. Circular queues reuse these slots.'
      },
      {
        id: 'cq-4',
        question: 'What is the time complexity of Enqueue in a Circular Queue?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Enqueue involves simple modulo increment and array assignment, executing in O(1) time.'
      },
      {
        id: 'cq-5',
        question: 'What happens when front == rear in a non-empty circular queue?',
        options: ['Queue is full', 'Queue contains exactly 1 element', 'Queue is empty', 'Undefined state'],
        correctAnswer: 1,
        explanation: 'When front and rear point to the same index (and neither is -1), the circular queue contains exactly one element.'
      }
    ]
  },

  'priority-queue': {
    id: 'priority-queue',
    name: 'Priority Queue',
    category: 'Linear',
    icon: 'ListOrdered',
    shortDesc: 'Queue where each element has an associated priority; highest priority elements are dequeued first.',
    definition: 'A Priority Queue is an abstract data type similar to a regular queue or stack, but where each element additionally has a priority assigned. Elements with higher priority are served before elements with lower priority.',
    realLifeExample: 'Hospital Emergency Room triage (critical patients treated first), airline VIP check-in, or OS process scheduling.',
    applications: [
      'Dijkstra Shortest Path Algorithm & A* Search Algorithm',
      'Huffman Data Compression Coding',
      'Bandwidth Management & Packet Prioritization in Routers',
      'Task execution engines (e.g., Celery/RabbitMQ priority queues)'
    ],
    advantages: [
      'Allows dynamic prioritization rather than strict FIFO ordering',
      'Efficient O(log n) insertions and deletions when backed by a Binary Heap'
    ],
    disadvantages: [
      'More complex implementation than standard FIFO queues',
      'Possibility of low-priority task starvation if high-priority items keep arriving'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(log n)',
      delete: 'O(log n)'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `import heapq

class PriorityQueue:
    def __init__(self):
        self._queue = []

    def push(self, item, priority):
        # Python heapq is a min-heap by default
        heapq.heappush(self._queue, (priority, item))

    def pop(self):
        if self._queue:
            return heapq.heappop(self._queue)[1]
        raise IndexError("Pop from empty Priority Queue")`,

      c: `// Priority Queue using Heap structure in C
#include <stdio.h>

typedef struct {
    int value;
    int priority;
} Node;

// Heapify and priority queue helper function implementation...`,

      cpp: `#include <iostream>
#include <queue>

int main() {
    // Max Priority Queue
    std::priority_queue<int> pq;
    pq.push(30);
    pq.push(10);
    pq.push(50);

    std::cout << "Highest priority: " << pq.top() << std::endl; // 50
    pq.pop();
    return 0;
}`,

      java: `import java.util.PriorityQueue;

public class PQDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(30);
        pq.add(10);
        pq.add(50);

        System.out.println("Min priority item: " + pq.peek()); // 10
    }
}`
    },
    quiz: [
      {
        id: 'pq-1',
        question: 'Which underlying structure yields the most efficient O(log n) Priority Queue?',
        options: ['Unsorted Array', 'Sorted Array', 'Binary Heap', 'Singly Linked List'],
        correctAnswer: 2,
        explanation: 'A Binary Heap provides O(log n) time complexity for both insertion and extraction of min/max elements.'
      },
      {
        id: 'pq-2',
        question: 'Which graph algorithm relies heavily on a Priority Queue?',
        options: ['Dijkstra Algorithm', 'Depth First Search', 'Bellman-Ford', 'Tarjan SCC'],
        correctAnswer: 0,
        explanation: 'Dijkstra shortest path algorithm uses a Priority Queue (min-heap) to greedily select the unvisited vertex with smallest distance.'
      },
      {
        id: 'pq-3',
        question: 'What is the risk associated with low-priority elements in a priority queue?',
        options: ['Memory Leak', 'Starvation', 'Stack Overflow', 'Deadlock'],
        correctAnswer: 1,
        explanation: 'Starvation occurs if high-priority items continuously enter the queue, causing low-priority items to wait indefinitely.'
      },
      {
        id: 'pq-4',
        question: 'What is the time complexity to insert an element into a Heap-based Priority Queue?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Inserting an element into a heap requires floating up the element, which takes at most logarithmic time O(log n).'
      },
      {
        id: 'pq-5',
        question: 'In a Min-Priority Queue, which element is retrieved first?',
        options: ['Element with smallest priority value', 'Element with largest priority value', 'Element inserted first', 'Element inserted last'],
        correctAnswer: 0,
        explanation: 'In a Min-Priority Queue, the element with the minimum numerical priority value is retrieved first.'
      }
    ]
  },

  'singly-linked-list': {
    id: 'singly-linked-list',
    name: 'Singly Linked List',
    category: 'Linear',
    icon: 'GitCommit',
    shortDesc: 'Linear sequence of nodes where each node stores data and a pointer to the next node.',
    definition: 'A Singly Linked List is a linear data structure consisting of nodes. Each node contains a data field and a reference (`next`) link to the subsequent node in the sequence. The list ends with a node pointing to `NULL`.',
    realLifeExample: 'Train cars attached head-to-tail, music playlist next-song traversal.',
    applications: [
      'Dynamic memory management (e.g. dynamic stacks and queues)',
      'Symbol table management in compilers',
      'Polynomial arithmetic representation'
    ],
    advantages: [
      'Dynamic size (allocates memory on demand without pre-allocation)',
      'Efficient O(1) insertion and deletion at the head'
    ],
    disadvantages: [
      'Sequential access only (no constant time random index access)',
      'Extra memory overhead for storing pointer links'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(1) at head, O(n) at index',
      delete: 'O(1) at head, O(n) at index'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node`,

      c: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertHead(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}`,

      cpp: `#include <iostream>

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};`,

      java: `class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`
    },
    quiz: [
      {
        id: 'sll-1',
        question: 'What does each node in a Singly Linked List store?',
        options: ['Data only', 'Data + Pointer to Next Node', 'Data + Prev & Next Pointers', 'Array Index'],
        correctAnswer: 1,
        explanation: 'Each singly linked list node contains its data payload and a pointer reference to the next node.'
      },
      {
        id: 'sll-2',
        question: 'What is the time complexity to insert a new node at the HEAD of a linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Inserting at head requires updating two pointers, executing in O(1) constant time.'
      },
      {
        id: 'sll-3',
        question: 'What value does the `next` pointer of the last node in a linear Singly Linked List hold?',
        options: ['Head pointer', 'NULL / None', 'Self reference', 'Garbage address'],
        correctAnswer: 1,
        explanation: 'The terminal node points to NULL to signify the end of the list sequence.'
      },
      {
        id: 'sll-4',
        question: 'What is a drawback of Linked Lists compared to Arrays?',
        options: ['Fixed capacity', 'Extra memory overhead for pointers & no random access', 'Expensive insertion at head', 'Difficult stack conversion'],
        correctAnswer: 1,
        explanation: 'Linked lists require pointer storage for every element and do not support O(1) indexed random access.'
      },
      {
        id: 'sll-5',
        question: 'How do you reverse a Singly Linked List in iterative O(n) time?',
        options: ['Using 3 pointers (prev, current, next)', 'Using binary search', 'By swapping array elements', 'It cannot be reversed iteratively'],
        correctAnswer: 0,
        explanation: 'Reversing a linked list iteratively involves managing 3 traversal pointers (`prev`, `curr`, `next`).'
      }
    ]
  },

  'doubly-linked-list': {
    id: 'doubly-linked-list',
    name: 'Doubly Linked List',
    category: 'Linear',
    icon: 'ArrowLeftRight',
    shortDesc: 'Sequence of nodes where each node contains references to both previous and next nodes.',
    definition: 'A Doubly Linked List (DLL) is a linear data structure in which nodes contain data and two pointers: `prev` pointing to the preceding node, and `next` pointing to the subsequent node.',
    realLifeExample: 'Browser history (Back and Forward buttons), music player previous/next track controls, LRU Cache implementation.',
    applications: [
      'LRU (Least Recently Used) Cache implementation',
      'Navigation systems supporting bidirectional history traversal',
      'Deque (Double-Ended Queue) implementation'
    ],
    advantages: [
      'Bidirectional traversal (can traverse forward and backward)',
      'O(1) time deletion when node pointer is given directly'
    ],
    disadvantages: [
      'Extra memory for storing two pointer fields (`prev` and `next`)',
      'More complex pointer management during insertions and deletions'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(1) at ends',
      delete: 'O(1) if node reference known'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class DLLNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def insert_head(self, data):
        new_node = DLLNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node`,

      c: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};`,

      cpp: `struct DLLNode {
    int data;
    DLLNode* prev;
    DLLNode* next;
    DLLNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};`,

      java: `class DLLNode {
    int data;
    DLLNode prev;
    DLLNode next;

    DLLNode(int data) {
        this.data = data;
    }
}`
    },
    quiz: [
      {
        id: 'dll-1',
        question: 'How many pointer fields does a node in a Doubly Linked List have?',
        options: ['1', '2', '3', '0'],
        correctAnswer: 1,
        explanation: 'Each DLL node contains 2 pointers: `prev` and `next`.'
      },
      {
        id: 'dll-2',
        question: 'Which of the following operations is easier in a DLL than in a Singly Linked List?',
        options: ['Deleting a node given its exact memory address', 'Random indexed access', 'Memory usage reduction', 'Binary search'],
        correctAnswer: 0,
        explanation: 'In DLL, given a node pointer, deletion takes O(1) because we can access `node->prev` immediately without traversing from head.'
      },
      {
        id: 'dll-3',
        question: 'What is the `prev` pointer of the Head node in a Doubly Linked List?',
        options: ['Tail pointer', 'NULL', 'Head pointer', 'Garbage'],
        correctAnswer: 1,
        explanation: 'The `prev` pointer of the Head node is NULL because no node precedes it.'
      },
      {
        id: 'dll-4',
        question: 'Which caching algorithm heavily uses a Doubly Linked List combined with a Hash Map?',
        options: ['LRU (Least Recently Used) Cache', 'FIFO Cache', 'Random Replacement Cache', 'LFU Cache'],
        correctAnswer: 0,
        explanation: 'LRU Cache uses a Hash Map for O(1) lookup and a Doubly Linked List for O(1) node relocation.'
      },
      {
        id: 'dll-5',
        question: 'What is the time complexity to traverse a Doubly Linked List backwards?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Traversing n nodes in reverse from tail to head takes O(n) linear time.'
      }
    ]
  },

  'circular-linked-list': {
    id: 'circular-linked-list',
    name: 'Circular Linked List',
    category: 'Linear',
    icon: 'RotateCw',
    shortDesc: 'Linked list where the last node points back to the head node, forming a continuous circle.',
    definition: 'A Circular Linked List is a sequence of elements where all nodes are connected to form a circle. There is no `NULL` at the end; the last node points back to the first node.',
    realLifeExample: 'Multiplayer board games cycling turns between players, operating system task scheduling round-robin timers.',
    applications: [
      'Round-Robin CPU Process Scheduling',
      'Continuous media playback loops (e.g. repeat-playlist)',
      'Multiplayer game turn management'
    ],
    advantages: [
      'Any node can serve as a starting point for full list traversal',
      'No NULL checking required during traversal'
    ],
    disadvantages: [
      'Risk of infinite loops if traversal conditions are improperly written',
      'Slightly more complex edge case management for single-node operations'
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insert: 'O(1) with tail pointer',
      delete: 'O(1) at head with tail pointer'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            new_node.next = self.head
            return
        curr = self.head
        while curr.next != self.head:
            curr = curr.next
        curr.next = new_node
        new_node.next = self.head`,

      c: `// Circular Linked List insertion in C
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};`,

      cpp: `// Circular Linked List implementation in C++
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};`,

      java: `public class CircularLinkedList {
    class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }
}`
    },
    quiz: [
      {
        id: 'cll-1',
        question: 'What does the `next` pointer of the last node point to in a Circular Linked List?',
        options: ['NULL', 'The Head node', 'Self', 'Tail node'],
        correctAnswer: 1,
        explanation: 'In a Circular Linked List, the terminal node points back to the Head node.'
      },
      {
        id: 'cll-2',
        question: 'Which CPU scheduling algorithm commonly uses a Circular Linked List?',
        options: ['First Come First Served', 'Round Robin', 'Shortest Job First', 'Priority Scheduling'],
        correctAnswer: 1,
        explanation: 'Round Robin CPU scheduling uses a Circular Linked List to allocate time slices continuously among active processes.'
      },
      {
        id: 'cll-3',
        question: 'What traversal precaution must be taken in a Circular Linked List?',
        options: ['Check for NULL pointers', 'Store starting reference to avoid infinite loop', 'Only move backwards', 'Delete head first'],
        correctAnswer: 1,
        explanation: 'Because there is no NULL pointer, traversal loops must check when current node equals the starting reference to avoid infinite loops.'
      },
      {
        id: 'cll-4',
        question: 'What is the time complexity to insert at the head of a Circular Linked List if we maintain a `tail` pointer?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'With a tail pointer, inserting at head takes O(1) time because `tail->next` can be updated directly.'
      },
      {
        id: 'cll-5',
        question: 'Can a Circular Linked List be constructed using Doubly Linked Nodes?',
        options: ['Yes (Circular Doubly Linked List)', 'No', 'Only with 3 pointers', 'Only in Java'],
        correctAnswer: 0,
        explanation: 'Yes! In a Circular Doubly Linked List, `head->prev` points to `tail`, and `tail->next` points to `head`.'
      }
    ]
  },

  'binary-search-tree': {
    id: 'binary-search-tree',
    name: 'Binary Search Tree (BST)',
    category: 'Non-Linear',
    icon: 'Network',
    shortDesc: 'Node-based tree where left child < root < right child for fast logarithmic search.',
    definition: 'A Binary Search Tree (BST) is a hierarchical tree structure where each node has at most two children. For any given node: elements in the left subtree are strictly smaller, and elements in the right subtree are strictly larger.',
    realLifeExample: 'File system hierarchy searching, auto-complete dictionary indexing, database indexing trees.',
    applications: [
      'Database Indexing (B-Trees / BST variants)',
      'In-order traversal produces sorted data',
      'Expression evaluation trees',
      'Lookup tables and dynamic sets'
    ],
    advantages: [
      'Average O(log n) time complexity for Search, Insert, and Delete',
      'In-order traversal yields keys in sorted ascending order'
    ],
    disadvantages: [
      'Worst-case time complexity degrades to O(n) if the tree becomes skewed (unbalanced line)'
    ],
    timeComplexity: {
      access: 'O(log n) avg / O(n) worst',
      search: 'O(log n) avg / O(n) worst',
      insert: 'O(log n) avg / O(n) worst',
      delete: 'O(log n) avg / O(n) worst'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def insert(self, root, val):
        if not root:
            return TreeNode(val)
        if val < root.val:
            root.left = self.insert(root.left, val)
        elif val > root.val:
            root.right = self.insert(root.right, val)
        return root

    def search(self, root, val):
        if not root or root.val == val:
            return root
        if val < root.val:
            return self.search(root.left, val)
        return self.search(root.right, val)`,

      c: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->key = item;
    temp->left = temp->right = NULL;
    return temp;
}`,

      cpp: `#include <iostream>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};`,

      java: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) {
        this.val = val;
    }
}`
    },
    quiz: [
      {
        id: 'bst-1',
        question: 'Which property holds true for every node in a Binary Search Tree?',
        options: ['Left subtree < Node < Right subtree', 'Left subtree > Node > Right subtree', 'Left subtree == Right subtree', 'Parent < Left child'],
        correctAnswer: 0,
        explanation: 'In a BST, all keys in the left subtree are smaller than the node, and all keys in the right subtree are larger.'
      },
      {
        id: 'bst-2',
        question: 'Which tree traversal mode visits BST keys in sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswer: 1,
        explanation: 'In-order traversal (Left, Root, Right) visits keys in sorted ascending numerical order.'
      },
      {
        id: 'bst-3',
        question: 'What is the worst-case search time complexity for a degraded/skewed BST with N elements?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'If items are inserted in sorted order, the BST degrades into a linked list, taking O(n) search time.'
      },
      {
        id: 'bst-4',
        question: 'How do you delete a BST node with two children?',
        options: ['Replace node with its Inorder Successor (or Predecessor) and delete that successor', 'Set node to NULL', 'Delete left child only', 'Rebuild entire tree'],
        correctAnswer: 0,
        explanation: 'To delete a node with 2 children, swap its value with its Inorder Successor (smallest node in right subtree) and recursively delete successor.'
      },
      {
        id: 'bst-5',
        question: 'What is the maximum number of children any node can have in a Binary Tree?',
        options: ['1', '2', '3', 'Unlimited'],
        correctAnswer: 1,
        explanation: 'A Binary Tree restricts every node to at most 2 children (Left and Right).'
      }
    ]
  },

  'avl-tree': {
    id: 'avl-tree',
    name: 'AVL Tree',
    category: 'Non-Linear',
    icon: 'GitBranch',
    shortDesc: 'Self-balancing BST where heights of child subtrees differ by at most 1.',
    definition: 'An AVL Tree is a self-balancing Binary Search Tree named after inventors Adelson-Velsky and Landis. For every node, the height difference between left and right subtrees (Balance Factor) is strictly -1, 0, or +1.',
    realLifeExample: 'High-frequency read-heavy database indexing tables requiring guaranteed O(log n) lookups.',
    applications: [
      'In-memory sets and maps requiring strict guaranteed lookup bounds',
      'Read-intensive database indexing'
    ],
    advantages: [
      'Guaranteed strictly balanced tree height of O(log n)',
      'Fast O(log n) lookups with no risk of worst-case linear O(n) degradation'
    ],
    disadvantages: [
      'More rebalancing rotations during insertions and deletions',
      'Requires storing height/balance factor in every node'
    ],
    timeComplexity: {
      access: 'O(log n)',
      search: 'O(log n)',
      insert: 'O(log n)',
      delete: 'O(log n)'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def get_height(self, node):
        return node.height if node else 0

    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0

    def right_rotate(self, y):
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1
        return x`,

      c: `// AVL Tree Rotations in C
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
    int height;
};`,

      cpp: `// AVL Tree implementation snippet
int getBalance(Node *N) {
    if (N == NULL) return 0;
    return height(N->left) - height(N->right);
}`,

      java: `public class AVLTree {
    class Node {
        int key, height;
        Node left, right;
        Node(int d) { key = d; height = 1; }
    }
}`
    },
    quiz: [
      {
        id: 'avl-1',
        question: 'What is the maximum allowed height difference (Balance Factor) in an AVL Tree node?',
        options: ['0', '1 (Balance Factor in {-1, 0, 1})', '2', 'Unlimited'],
        correctAnswer: 1,
        explanation: 'An AVL tree maintains a balance factor of height(left) - height(right) within {-1, 0, +1}.'
      },
      {
        id: 'avl-2',
        question: 'Which rotations fix an Left-Right (LR) imbalance in an AVL tree?',
        options: ['Single Left Rotation', 'Single Right Rotation', 'Left Rotation on left child, then Right Rotation on root', 'Right Rotation on left child, then Left Rotation on root'],
        correctAnswer: 2,
        explanation: 'A Left-Right (LR) imbalance is resolved by performing a Left Rotation on the left child followed by a Right Rotation on the parent.'
      },
      {
        id: 'avl-3',
        question: 'What is the worst-case search time complexity in an AVL Tree with N nodes?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Because AVL trees are strictly height-balanced, search is strictly O(log n) even in worst-case scenarios.'
      },
      {
        id: 'avl-4',
        question: 'Who invented the AVL Tree?',
        options: ['Adelson-Velsky and Landis', 'Alan Turing and von Neumann', 'Dijkstra and Floyd', 'Knuth and Cormen'],
        correctAnswer: 0,
        explanation: 'AVL trees were invented in 1962 by Soviet mathematicians Georgy Adelson-Velsky and Evgenii Landis.'
      },
      {
        id: 'avl-5',
        question: 'Which tree balances more aggressively: Red-Black Tree or AVL Tree?',
        options: ['Red-Black Tree', 'AVL Tree', 'Both are identical', 'Neither'],
        correctAnswer: 1,
        explanation: 'AVL Trees balance more strictly than Red-Black trees, making lookups faster in AVL trees but insertions faster in Red-Black trees.'
      }
    ]
  },

  'max-heap': {
    id: 'max-heap',
    name: 'Max Heap / Min Heap',
    category: 'Non-Linear',
    icon: 'Pyramid',
    shortDesc: 'Complete binary tree where parent key is always greater/smaller than or equal to its children.',
    definition: 'A Binary Heap is a complete binary tree stored compactly in an array. In a Max Heap, every parent node is greater than or equal to its children (root is maximum). In a Min Heap, every parent is less than or equal to its children (root is minimum).',
    realLifeExample: 'Hospital Emergency Room triage system, Heap Sort algorithm, event-driven simulation clocks.',
    applications: [
      'Priority Queue implementation',
      'Heap Sort algorithm O(n log n)',
      'Finding Kth smallest/largest element in an array',
      'Dijkstra Shortest Path algorithm'
    ],
    advantages: [
      'Root element (Min or Max) retrieved in O(1) constant time',
      'Space efficient: stored as a simple array without pointer overhead'
    ],
    disadvantages: [
      'Searching for arbitrary non-root keys takes O(n) linear time'
    ],
    timeComplexity: {
      access: 'O(1) for root, O(n) for rest',
      search: 'O(n)',
      insert: 'O(log n)',
      delete: 'O(log n) for extract-max/min'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class MaxHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, i): return (i - 1) // 2
    def _left(self, i): return 2 * i + 1
    def _right(self, i): return 2 * i + 2

    def insert(self, key):
        self.heap.append(key)
        self._sift_up(len(self.heap) - 1)

    def _sift_up(self, i):
        while i > 0 and self.heap[self._parent(i)] < self.heap[i]:
            p = self._parent(i)
            self.heap[p], self.heap[i] = self.heap[i], self.heap[p]
            i = p

    def extract_max(self):
        if not self.heap: return None
        max_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        if self.heap: self._sift_down(0)
        return max_val`,

      c: `// Max Heap array math in C
// Parent index: (i - 1) / 2
// Left child: 2 * i + 1
// Right child: 2 * i + 2`,

      cpp: `#include <vector>
#include <algorithm>

class MaxHeap {
    std::vector<int> heap;
public:
    void push(int val) {
        heap.push_back(val);
        std::push_heap(heap.begin(), heap.end());
    }
};`,

      java: `import java.util.Collections;
import java.util.PriorityQueue;

public class HeapDemo {
    public static void main(String[] args) {
        // Max Heap in Java
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.add(10);
        maxHeap.add(40);
        System.out.println("Max: " + maxHeap.poll()); // 40
    }
}`
    },
    quiz: [
      {
        id: 'hp-1',
        question: 'For a node at index `i` in an array-backed heap, what is the index of its left child?',
        options: ['2*i', '2*i + 1', '2*i + 2', 'i / 2'],
        correctAnswer: 1,
        explanation: 'In 0-indexed array representations, left child index is `2*i + 1` and right child is `2*i + 2`.'
      },
      {
        id: 'hp-2',
        question: 'What is the property of a Max Heap?',
        options: ['Parent >= Children', 'Parent <= Children', 'Root is always smallest', 'Left child > Right child always'],
        correctAnswer: 0,
        explanation: 'In a Max Heap, every parent key is greater than or equal to the keys of its children.'
      },
      {
        id: 'hp-3',
        question: 'What is the time complexity to build a heap from an unsorted array of N elements using Floyd Heapify?',
        options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Floyd Heapify algorithm builds a heap bottom-up in O(n) linear time.'
      },
      {
        id: 'hp-4',
        question: 'What is the time complexity to extract the Max/Min element from a heap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Extracting min/max places the last element at root and sifts down, taking O(log n) time.'
      },
      {
        id: 'hp-5',
        question: 'Which tree structure must a Binary Heap satisfy?',
        options: ['Full Binary Tree', 'Complete Binary Tree', 'Degraded Binary Tree', 'Threaded Binary Tree'],
        correctAnswer: 1,
        explanation: 'A Heap is a Complete Binary Tree where every level is completely filled except possibly the last level.'
      }
    ]
  },

  graph: {
    id: 'graph',
    name: 'Graph',
    category: 'Non-Linear',
    icon: 'Share2',
    shortDesc: 'Non-linear network of vertices (nodes) connected by edges (directed/undirected, weighted/unweighted).',
    definition: 'A Graph is a non-linear data structure consisting of a set of Vertices (Nodes) V and Edges E connecting pairs of vertices. Graphs can be directed/undirected and weighted/unweighted.',
    realLifeExample: 'Social network friendships (Facebook/LinkedIn), Google Maps road navigation networks, World Wide Web hyperlinks.',
    applications: [
      'Social network connections and friend recommendations',
      'GPS Navigation and Routing (Shortest path algorithms)',
      'Web Page ranking (PageRank algorithm)',
      'Dependency resolution in package managers (npm, pip)'
    ],
    advantages: [
      'Models real-world complex interconnected networks perfectly',
      'Rich algorithmic ecosystem (BFS, DFS, Dijkstra, Prim, Kruskal, PageRank)'
    ],
    disadvantages: [
      'Adjacency matrix representation can consume O(V²) space for sparse graphs',
      'Graph traversals can encounter infinite loops if cycles are unhandled'
    ],
    timeComplexity: {
      access: 'O(V + E) for BFS/DFS',
      search: 'O(V + E)',
      insert: 'O(1) vertex / O(1) edge in list',
      delete: 'O(V + E)'
    },
    spaceComplexity: 'O(V + E) list / O(V²) matrix',
    code: {
      python: `from collections import defaultdict, deque

class Graph:
    def __init__(self):
        self.adj = defaultdict(list)

    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.adj[v].append(u) # Undirected

    def bfs(self, start):
        visited = set([start])
        queue = deque([start])
        order = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in self.adj[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return order`,

      c: `// Adjacency Matrix representation in C
#define MAX_VERTICES 10
int adjMatrix[MAX_VERTICES][MAX_VERTICES];

void addEdge(int u, int v) {
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1;
}`,

      cpp: `#include <iostream>
#include <vector>

class Graph {
    int V;
    std::vector<std::vector<int>> adj;
public:
    Graph(int V) : V(V), adj(V) {}
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
};`,

      java: `import java.util.*;

public class Graph {
    private Map<Integer, List<Integer>> adj = new HashMap<>();

    public void addEdge(int u, int v) {
        adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        adj.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }
}`
    },
    quiz: [
      {
        id: 'gr-1',
        question: 'Which traversal algorithm explores a graph level-by-level using a Queue?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra Algorithm', 'Floyd-Warshall'],
        correctAnswer: 1,
        explanation: 'BFS explores vertices layer-by-layer using a Queue.'
      },
      {
        id: 'gr-2',
        question: 'Which traversal algorithm explores deep along branches using a Stack or Recursion?',
        options: ['BFS', 'DFS', 'Kruskal', 'Binary Search'],
        correctAnswer: 1,
        explanation: 'DFS uses a Stack (or function call recursion stack) to visit nodes as deep as possible before backtracking.'
      },
      {
        id: 'gr-3',
        question: 'What is the space complexity of an Adjacency Matrix representation of a graph with V vertices?',
        options: ['O(V)', 'O(V + E)', 'O(V²)', 'O(E log V)'],
        correctAnswer: 2,
        explanation: 'An Adjacency Matrix allocates a V x V 2D grid, consuming O(V²) space.'
      },
      {
        id: 'gr-4',
        question: 'What type of graph has directed edges and contains no cycles?',
        options: ['Complete Graph', 'DAG (Directed Acyclic Graph)', 'Bipartite Graph', 'Eulerian Graph'],
        correctAnswer: 1,
        explanation: 'A DAG (Directed Acyclic Graph) has directed edges with no directed cycles, enabling topological sorting.'
      },
      {
        id: 'gr-5',
        question: 'Which algorithm finds the single-source shortest path in a weighted graph with non-negative edge weights?',
        options: ['BFS', 'DFS', 'Dijkstra Algorithm', 'Prim Algorithm'],
        correctAnswer: 2,
        explanation: 'Dijkstra algorithm computes single-source shortest paths in graphs with non-negative weights.'
      }
    ]
  },

  'hash-table': {
    id: 'hash-table',
    name: 'Hash Table',
    category: 'Non-Linear',
    icon: 'Hash',
    shortDesc: 'Key-value map structure using a hash function for near O(1) average lookup, insert, and delete.',
    definition: 'A Hash Table (or Hash Map) maps key-value pairs using a Hash Function to compute an array index where the target value is stored. Collisions are handled via Chaining (linked lists) or Open Addressing (probing).',
    realLifeExample: 'Phone book directory (Name -> Phone number), compiler symbol table, database indexing maps, user session tokens.',
    applications: [
      'Database indexing and fast key lookups',
      'Caching mechanisms (Redis, memcached)',
      'Counting frequencies of elements (Two Sum problem)',
      'Uniqueness validation & set deduplication'
    ],
    advantages: [
      'Average O(1) constant time complexity for Search, Insert, and Delete',
      'Flexible key types (Strings, Numbers, Objects)'
    ],
    disadvantages: [
      'Worst-case O(n) performance if hash collisions flood a single bucket',
      'Does not preserve element ordering (keys are unsorted)'
    ],
    timeComplexity: {
      access: 'O(1) avg / O(n) worst',
      search: 'O(1) avg / O(n) worst',
      insert: 'O(1) avg / O(n) worst',
      delete: 'O(1) avg / O(n) worst'
    },
    spaceComplexity: 'O(n)',
    code: {
      python: `class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        bucket = self.buckets[self._hash(key)]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        bucket = self.buckets[self._hash(key)]
        for k, v in bucket:
            if k == key:
                return v
        return None`,

      c: `// Hash function example in C
unsigned int hash(const char *key, int table_size) {
    unsigned int hash_val = 0;
    while (*key) {
        hash_val = (hash_val << 5) + *key++;
    }
    return hash_val % table_size;
}`,

      cpp: `#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> map;
    map["Alice"] = 95;
    map["Bob"] = 88;

    std::cout << "Alice's score: " << map["Alice"] << std::endl;
    return 0;
}`,

      java: `import java.util.HashMap;

public class HashDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Rahul", 15);
        map.put("Ankit", 22);

        System.out.println("Rahul: " + map.get("Rahul"));
    }
}`
    },
    quiz: [
      {
        id: 'ht-1',
        question: 'What is a collision in a Hash Table?',
        options: ['When two distinct keys hash to the same bucket index', 'When the hash table runs out of memory', 'When keys are deleted', 'When hash code is negative'],
        correctAnswer: 0,
        explanation: 'A collision occurs when two different keys generate the exact same hash index via the hash function.'
      },
      {
        id: 'ht-2',
        question: 'Which technique handles collisions by storing multiple key-value pairs in a linked list at each bucket?',
        options: ['Linear Probing', 'Separate Chaining', 'Double Hashing', 'Quadratic Probing'],
        correctAnswer: 1,
        explanation: 'Separate Chaining maintains a linked list (or dynamic bucket) at each hash index to store colliding entries.'
      },
      {
        id: 'ht-3',
        question: 'What is the average time complexity for searching a key in a well-balanced Hash Table?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'With a uniform hash distribution, key search runs in O(1) average constant time.'
      },
      {
        id: 'ht-4',
        question: 'What ratio triggers resizing (rehash) in a Hash Table when `number_of_items / capacity` gets high?',
        options: ['Balance Factor', 'Load Factor', 'Collision Ratio', 'Probing Index'],
        correctAnswer: 1,
        explanation: 'The Load Factor (n/k) determines when a hash table expands and rehashes elements to preserve O(1) lookups.'
      },
      {
        id: 'ht-5',
        question: 'What is an Open Addressing collision resolution strategy?',
        options: ['Linear Probing', 'Separate Chaining', 'Trees in buckets', 'Garbage collection'],
        correctAnswer: 0,
        explanation: 'Linear Probing is an Open Addressing technique that searches for the next available array slot when a collision occurs.'
      }
    ]
  }
};
