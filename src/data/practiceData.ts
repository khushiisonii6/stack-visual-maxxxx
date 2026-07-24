import { PracticeProblem } from '../types';

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'p-1',
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    statement: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets in the correct order.',
    inputExample: 's = "()[]{}"',
    outputExample: 'true',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses characters ()[]{} only.'
    ],
    hints: [
      'Use a Stack to keep track of opening brackets.',
      'When an opening bracket is encountered, push it onto the stack.',
      'When a closing bracket is encountered, check if the stack top matches its corresponding opening pair.'
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)'
    },
    solutions: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `#include <stack>
#include <unordered_map>
#include <string>

bool isValid(std::string s) {
    std::stack<char> st;
    std::unordered_map<char, char> pairs = {{')', '('}, {'}', '{'}, {']', '['}};
    for (char c : s) {
        if (pairs.count(c)) {
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}`,
      java: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
    }
  },
  {
    id: 'p-2',
    title: 'Reverse a Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    statement: 'Given the head of a singly linked list, reverse the list, and return the reversed list head.',
    inputExample: 'head = [1,2,3,4,5]',
    outputExample: '[5,4,3,2,1]',
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    hints: [
      'Maintain three pointers: prev (initially null), curr (initially head), and next_node.',
      'Iterate through the list, changing curr.next to point to prev.',
      'Advance prev and curr forward one step at a time.'
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    solutions: {
      python: `def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      cpp: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
    }
  },
  {
    id: 'p-3',
    title: 'Implement Queue using Stacks',
    category: 'Queue / Stack',
    difficulty: 'Medium',
    statement: 'Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support push, pop, peek, and empty operations.',
    inputExample: 'push(1), push(2), peek(), pop(), empty()',
    outputExample: '1, 1, false',
    constraints: [
      '1 <= x <= 9',
      'At most 100 calls will be made to push, pop, peek, and empty.'
    ],
    hints: [
      'Use an input stack (st1) for push operations.',
      'Use an output stack (st2) for pop and peek operations.',
      'When popping/peeking, if st2 is empty, transfer all elements from st1 to st2 to reverse their order.'
    ],
    complexity: {
      time: 'Amortized O(1) per operation',
      space: 'O(n)'
    },
    solutions: {
      python: `class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        self.s1.append(x)

    def pop(self) -> int:
        self.peek()
        return self.s2.pop()

    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        return not self.s1 and not self.s2`,
      cpp: `#include <stack>

class MyQueue {
    std::stack<int> s1, s2;
public:
    void push(int x) { s1.push(x); }
    int pop() {
        peek();
        int val = s2.top();
        s2.pop();
        return val;
    }
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }
    bool empty() { return s1.empty() && s2.empty(); }
};`,
      java: `import java.util.Stack;

class MyQueue {
    private Stack<Integer> s1 = new Stack<>();
    private Stack<Integer> s2 = new Stack<>();

    public void push(int x) { s1.push(x); }
    
    public int pop() {
        peek();
        return s2.pop();
    }
    
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }
    
    public boolean empty() { return s1.isEmpty() && s2.isEmpty(); }
}`
    }
  },
  {
    id: 'p-4',
    title: 'Lowest Common Ancestor in BST',
    category: 'Tree',
    difficulty: 'Medium',
    statement: 'Given a Binary Search Tree (BST) and two nodes `p` and `q`, find the lowest common ancestor (LCA) node of the two given nodes in the BST.',
    inputExample: 'root = [6,2,8,0,4,7,9], p = 2, q = 8',
    outputExample: '6',
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      'All Node.val are unique.',
      'p and q are guaranteed to exist in the BST.'
    ],
    hints: [
      'Leverage the BST property (left < root < right).',
      'If both p and q values are smaller than root, LCA must be in the left subtree.',
      'If both p and q values are larger than root, LCA must be in the right subtree.',
      'Otherwise, root is the split point (LCA).'
    ],
    complexity: {
      time: 'O(h) where h is tree height',
      space: 'O(1) iterative / O(h) recursive'
    },
    solutions: {
      python: `def lowestCommonAncestor(root, p, q):
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr`,
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    TreeNode* curr = root;
    while (curr) {
        if (p->val < curr->val && q->val < curr->val) curr = curr->left;
        else if (p->val > curr->val && q->val > curr->val) curr = curr->right;
        else return curr;
    }
    return nullptr;
}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode curr = root;
    while (curr != null) {
        if (p.val < curr.val && q.val < curr.val) curr = curr.left;
        else if (p.val > curr.val && q.val > curr.val) curr = curr.right;
        else return curr;
    }
    return null;
}`
    }
  },
  {
    id: 'p-5',
    title: 'Detect Cycle in an Undirected Graph',
    category: 'Graph',
    difficulty: 'Medium',
    statement: 'Given an undirected graph with `V` vertices and `E` edges, determine whether the graph contains any cycle.',
    inputExample: 'V = 5, E = 5, edges = [[0,1],[1,2],[2,0],[1,3],[3,4]]',
    outputExample: 'true',
    constraints: [
      '1 <= V, E <= 10^4',
      'Graph may be disconnected.'
    ],
    hints: [
      'Use BFS or DFS with a `visited` array and track parent nodes.',
      'During DFS from node `u`, if an adjacent visited node `v` is NOT the parent of `u`, a cycle exists.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    solutions: {
      python: `def isCycle(V, adj):
    visited = [False] * V

    def dfs(u, parent):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                if dfs(v, u): return True
            elif v != parent:
                return True
        return False

    for i in range(V):
        if not visited[i]:
            if dfs(i, -1): return True
    return False`,
      cpp: `bool dfs(int u, int parent, vector<bool>& visited, vector<int> adj[]) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            if (dfs(v, u, visited, adj)) return true;
        } else if (v != parent) return true;
    }
    return false;
}`,
      java: `public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
    boolean[] visited = new boolean[V];
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            if (dfs(i, -1, visited, adj)) return true;
        }
    }
    return false;
}`
    }
  },
  {
    id: 'p-6',
    title: 'Kth Largest Element in an Array',
    category: 'Heap',
    difficulty: 'Medium',
    statement: 'Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array.',
    inputExample: 'nums = [3,2,1,5,6,4], k = 2',
    outputExample: '5',
    constraints: [
      '1 <= k <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    hints: [
      'Use a Min-Heap of size `k`.',
      'Iterate through nums, pushing into heap. If heap size > k, pop the smallest element.',
      'The top of the min-heap at the end will be the k-th largest element.'
    ],
    complexity: {
      time: 'O(n log k)',
      space: 'O(k)'
    },
    solutions: {
      python: `import heapq

def findKthLargest(nums, k):
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]`,
      cpp: `#include <queue>
#include <vector>

int findKthLargest(std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
      java: `import java.util.PriorityQueue;

public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int num : nums) {
        minHeap.add(num);
        if (minHeap.size() > k) minHeap.poll();
    }
    return minHeap.peek();
}`
    }
  }
];
