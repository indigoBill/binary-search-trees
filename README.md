# binary-search-trees

This project features a balanced binary search tree created using JavaScript.

## Binary Search Tree Methods

- `buildTree(array)` : takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed. The buildTree function should return the level-0 root node.
- `insert(value)` : inserts the given value into the tree.
- `deleteItem(value)` : removes the given value from the tree.
- `find(value)` : returns the node with the given value.
- `levelOrder(callback)` : This function that accepts an optional callback function as its parameter. `levelOrder` traverses the tree in breadth-first level order and provides each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. The method should return an array of values if no callback is given as an argument.
- `inOrder(callback)`, `preOrder(callback)`, `postOrder(callback)` : These functions also accept an optional callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided callback. The functions should return an array of values if no callback is given as an argument.
- `height(node)` : returns the given node’s height.
- `depth(node)` : returns the given node’s depth.
- `isBalanced` : checks if the tree is balanced. 
- `rebalance` : rebalances an unbalanced tree.