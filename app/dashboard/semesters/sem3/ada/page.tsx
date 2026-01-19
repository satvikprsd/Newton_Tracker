import SubjectDashboard from "../common/SubjectDashboard";

const topicOrder = [
  // Foundation - Start Here
  "Time and Space Complexity",
  
  // Basic Techniques
  "Recursion",
  "Binary Search",
  "Two Pointers",
  "Prefix Sum Technique",
  
  // Sorting
  "Quick Sort",
  
  // Tree Fundamentals
  "Binary Tree",
  "Preorder Traversal",
  "Inorder Traversal",
  
  // Binary Search Tree
  "Binary Search Tree",
  "Deletion In BST",
  
  // Basic Graph Theory
  "Graphs",
  "Graph",
  "Graph Traversal",
  
  // Graph Traversal Algorithms
  "Depth First Search (DFS)",
  "Breadth First Search (BFS)",
  
  // Greedy & Heaps
  "Greedy Algorithms",
  "Heaps",
  "Max Heap",
  
  // Advanced Recursion
  "Backtracking",
  
  // Advanced Graph Algorithms
  "Topological Sorting",
  "Shortest Paths",
  "Dijkstra",
  "Minimum spanning tree",
  
  // Dynamic Programming (Hardest)
  "Dynamic Programming",
  "1D Dynamic Programming (1D DP)",
  "2D Dynamic Programming (2D DP)"
];

const mustReviseKeywords = [
  // Arrays - Two Pointers & Sliding Window
  "First and Last position of Key in array",
  "Number of subarrays with sum equal to k - Medium Version",
  "Minimum size Subarray sum",
  "Score of Good Pairs (Medium)",
  
  // Sorting & Partitioning
  "Implementing Quick Sort",
  "Quicksort Partitioning",
  
  // Greedy Algorithms - Intervals
  "Merging Intervals",
  "Insert Interval",
  "Non-Overlapping Intervals",
  "Minimum Number of Arrows required to Burst Balloons",
  "N meetings in one room",
  "Minimum Platforms Required",
  
  // Greedy - Optimization
  "Gas Station",
  "Fractional Knapsack",
  "Task Scheduler",
  "Bag of Tokens",
  "Optimal Candy Allocation for Children",
  "Maximize Greatness of an Array",
  
  // Heap / Priority Queue
  "Kth largest element in an Array",
  "Implementation of Priority Queue",
  "Heap from Array",
  "Check MAX Heap",
  "Insert into Max-Heap",
  "Delete from Max-Heap",
  
  // Graph Representations
  "Adjacency Matrix to Adjacency List",
  "Edge List to Adjacency Matrix",
  "Adjacency List to Adjacency Matrix",
  
  // Graph - BFS
  "BFS (single source)",
  "Shortest Distance Between Source to Destination",
  "Knight Walk",
  "Number of Enclaves",
  "Shortest Path In Binary Matrix",
  
  // Graph - DFS
  "DFS of Graph",
  "Detect cycle in an undirected graph",
  "Detect cycle in a directed graph",
  "Find if Path Exists in Graph",
  "Largest connected component",
  
  // Topological Sort
  "Topolgical Sorting (BFS)",
  "Topo Sort (dfs)",
  "Course Schedule II",
  "Parallel Courses",
  "Find Eventual Safe States",
  "Alien Dictionary",
  
  // Shortest Path Algorithms
  "Dijkstra's Algorithm",
  "Shortest path in Directed Acyclic Graph",
  "Network Delay Time",
  "Path with Least Effort",
  "Cheapest Flights within K stops",
  
  // Minimum Spanning Tree
  "Min cost to connect all points",
  "Minimum Spanning Tree - Prim's Implementation",
  
  // Binary Tree Traversals
  "Binary Tree - DFS Traversals",
  "Iterative Preorder Traversal of a Binary Tree",
  "Zigzag level order traversal",
  "Right Side View of tree",
  
  // Binary Tree Problems
  "Is Height Balanced Binary Tree?",
  "Merge Two Binary Trees",
  "Binary Tree Pruning",
  "Subtree of Another Tree",
  "Print all root to leaf paths",
  
  // Binary Search Tree
  "Print BST in sorted order",
  "Two Sum - BST",
  "Insertion into BST",
  "Delete Node in a BST",
  "Lowest Common Ancestor in a BST",
  "Check for BST",
  "Find the k'th smallest element in BST",
  "Range Sum of BST",
  
  // Backtracking - Combinations & Permutations
  "Permutate",
  "Partial K Permutation",
  "Find Subsets",
  "Subsets (II)",
  "Combination sums",
  "Combination Sum II",
  "Print target sum subsets",
  
  // Backtracking - Classic Problems
  "N-Queens",
  "Suduko Solver",
  "Word Search",
  "Rat in Maze",
  "Palindrome Partitioning",
  
  // Dynamic Programming - 1D DP
  "Calculate Fibonacci Number",
  "Climbing Stairs",
  "Frog Jump (DP)",
  "House Robber (DP)",
  "Max Sum Non Adjacent Numbers",
  
  // DP - Stocks
  "Best Time to Buy and Sell Stock",
  "Best Time to Buy and Sell Stock II",
  "Best Time to Buy and Sell Stock III",
  "Best Time to Buy and Sell Stock IV",
  "Best Time to Buy and Sell Stock with Cooldown",
  
  // DP - Longest Increasing Subsequence
  "Longest Increasing Subsequence",
  "Print Longest Increasing Subsequence",
  "Number Of Longest Increasing Subsequence",
  "Longest Bitonic Subsequence",
  "Russian Doll Envelopes",
  
  // DP - Longest Common Subsequence
  "Longest Common Subsequences",
  "Print Longest Common Subsequences",
  "LCS - Substring",
  "Longest Palindromic Subsequence",
  "Edit Distance",
  "Distinct Subsequences",
  
  // DP - Grid/Matrix
  "Unique Paths",
  "Unique Paths with obstacles",
  "Minimum Path Sum",
  "Triangle Path Sum",
  "Dungeon Game",
  
  // DP - Knapsack
  "0/1 Knapsack",
  "Unbounded Knapsack Problem",
  "Equal Sum Partition",
  "Partitions with Given Difference",
  
  // DP - Coin Change
  "Coin Change Problem II",
  "Minimum Number of Coins - Coin Change"
];

export default function Page() {
  return <SubjectDashboard subjectName="ADA" courseTag="ADA" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
