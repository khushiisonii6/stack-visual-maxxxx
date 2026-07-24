/**
 * DataStruct Studio - Utility Helper Script
 * Provides core algorithmic helper functions for data structures, sorting, and complexity calculations.
 */

window.DataStructStudio = {
  version: "1.0.0",
  appName: "DataStruct Studio",
  
  // Quick Big-O Complexity Helper
  getComplexityInfo: function(dsName) {
    const matrix = {
      "Array": { access: "O(1)", search: "O(n)", insertion: "O(n)", deletion: "O(n)", space: "O(n)" },
      "Linked List": { access: "O(n)", search: "O(n)", insertion: "O(1)", deletion: "O(1)", space: "O(n)" },
      "Stack": { access: "O(n)", search: "O(n)", insertion: "O(1)", deletion: "O(1)", space: "O(n)" },
      "Queue": { access: "O(n)", search: "O(n)", insertion: "O(1)", deletion: "O(1)", space: "O(n)" },
      "Binary Search Tree": { access: "O(log n)", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)", space: "O(n)" },
      "Heap": { access: "N/A", search: "O(n)", insertion: "O(log n)", deletion: "O(log n)", space: "O(n)" },
      "Hash Table": { access: "N/A", search: "O(1)", insertion: "O(1)", deletion: "O(1)", space: "O(n)" },
      "Graph": { access: "N/A", search: "O(V + E)", insertion: "O(1)", deletion: "O(V + E)", space: "O(V + E)" }
    };
    return matrix[dsName] || { note: "Detailed complexity available in app matrix." };
  },

  // Sample Array Generator
  generateRandomArray: function(size = 8, min = 10, max = 99) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
  },

  // Simple Hash Function Example (Linear Probing helper)
  hashString: function(key, tableSize = 10) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % tableSize;
  }
};

console.log("🚀 DataStruct Studio script loaded successfully.");
