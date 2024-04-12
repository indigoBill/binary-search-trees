class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    root;

    constructor(array){
        this.array = array;
    }
    
    buildTree(array){
        const finArr = [];

        array.sort((a, b) => a - b);

        array.forEach((ele) => {
            if(!(finArr.includes(ele))) finArr.push(ele);
        });

        function sortedArrayToBST(arr, startIndex, endIndex){
            if(startIndex > endIndex) return null;

            const midIndex = Math.floor((startIndex + endIndex) / 2);
            const node = new Node(arr[midIndex]);

            node.left = sortedArrayToBST(arr, startIndex, midIndex - 1);
            node.right = sortedArrayToBST(arr, midIndex + 1, endIndex);

            return node;
        }

        this.root = sortedArrayToBST(finArr, finArr[0], finArr.length - 1);

        return this.root;
    }

    insert(value){
        if(value < this.root.data) recInsert(value, this.root.left);
        else recInsert(value, this.root.right);

        function recInsert(value, node){
            if(!node){
                node = new Node(value);
                return node;
            }

            if(value < node.data) node.left = recInsert(value, node.left);
            else node.right = recInsert(value, node.right);

            return node;
        }

        return this.root;
    }

    deleteItem(value){
        if(value < this.root.data){
            recDelete(value, this.root.left);
        }
        else if(value > this.root.data){
            recDelete(value, this.root.right);
        }
        else{
            recDelete(value, this.root);
        }

        function getNextLargestNode(node){
            let value;

            if(!(node.left)){
                value = node.data;
                node = node.right;
                return value;
            }

            value = getNextLargestNode(node.left);

            return value;
        }

        function updateNode(node){
            if(!(node.left)){
                node = node.right;
                return node;
            }
            
            node.left = updateNode(node.left);

            return node;
        }

        function recDelete(value, node){
            if(node.data === value){
                if(!(node.left) && !(node.right)){
                    return null;
                }else if(node.left && node.right){
                    node.data = getNextLargestNode(node.right);
                    node.right = updateNode(node.right);
                }else if(node.left || node.right){
                    if(node.left) return node.left;
                    else return node.right;
                }

                return node;
            }

            if(value < node.data) node.left = recDelete(value, node.left);
            else node.right = recDelete(value, node.right);

            return node;
        }

        return this.root;
    }

    find(value){
        const containerNode = recFind(value, this.root);

        function recFind(value, node){
            if(!node) return 'Value not in tree';

            if(node.data === value) return node;

            if(value < node.data){
                return recFind(value, node.left);
            }
            else{
                return recFind(value, node.right);
            }
        }

        return containerNode;
    }

    levelOrder(callback){
        const queue = [];
        const levelOrderArr = [];

        function addToQueue(node){
            if(node && !(queue.includes(node))) queue.push(node);

            if(queue.length === 0) return;

            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)

            levelOrderArr.push(queue.shift());

            addToQueue(queue[0]);
        }

        addToQueue(this.root);

        if(callback) return levelOrderArr.map(callback);
        else return levelOrderArr.map((node) => node.data);
    }

    preOrder(callback){
        const stack = [];
        const preorderArr = [];

        function addToStack(node){
            if(node && !(stack.includes(node))) stack.push(node);

            preorderArr.push(stack.pop());

            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);

            if(stack.length === 0) return;

            addToStack(stack[stack.length - 1]);
        }

        addToStack(this.root);

        if(callback) return preorderArr.map(callback);
        else return preorderArr.map((node) => node.data);
    }

    inOrder(callback){
        const stack = [];
        const inorderArr = [];

        function addToStack(node){
            if(node && !(stack.includes(node))) stack.push(node);

            if(node.left){
                stack.push(node.left);
                addToStack(node.left);
            }else{
                inorderArr.push(stack.pop());
            }

            if(node.right){
                stack.push(node.right);
                addToStack(node.right);
            }

            const strayNode = stack.pop();

            if(strayNode && !(inorderArr.includes(strayNode))) inorderArr.push(strayNode);
        }

        addToStack(this.root);

        if(callback) return inorderArr.map(callback);
        else return inorderArr.map((node) => node.data);
    }

    postOrder(callback){
        const stack = [];
        const postOrderArr = [];

        function addToStack(node){
            if(node && !(stack.includes(node))) stack.push(node);

            if(node.left) addToStack(node.left);

            if(node.right) addToStack(node.right);

            if(!node.left && !node.right){
                postOrderArr.push(stack.pop());
                return;
            }

            const strayNode = stack.pop();

            if(strayNode && !(postOrderArr.includes(strayNode))) postOrderArr.push(strayNode);
        }

        addToStack(this.root);

        if(callback) return postOrderArr.map(callback);
        else return postOrderArr.map((node) => node.data);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const build = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const insert = tree.insert(6);
// prettyPrint(insert);
const deleteNode = tree.deleteItem(8);
prettyPrint(deleteNode);
console.log(tree.levelOrder())
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());