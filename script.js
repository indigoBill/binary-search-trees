class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    root;
    
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

        this.root = sortedArrayToBST(finArr, 0, finArr.length - 1);
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

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);

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

    height(node){
        const queue = [];
        let height = 0;

        if(!node.left && !node.right) return height;

        queue.push([node]);

        while(queue.length !== 0){
            const currLevelArr = [];

            queue[0].forEach((node) => {
                if(node.left || node.right){
                    if(node.left) currLevelArr.push(node.left);
                    if(node.right) currLevelArr.push(node.right);
                } 
            });

            if(currLevelArr.length !== 0){
                queue.push(currLevelArr);
                height++;
            }

            queue.shift();
        }

        return height;
    }

    depth(node){
        const queue = [];
        let depth = 0;

        if(node === this.root) return depth;

        queue.push([this.root]);

        while(queue.length !== 0){
            if(!queue[0].includes(node)){
                const currLevelArr = [];

                queue[0].forEach((nodeInArr) => {
                    if(nodeInArr.left || nodeInArr.right){
                        if(nodeInArr.left) currLevelArr.push(nodeInArr.left);
                        if(nodeInArr.right) currLevelArr.push(nodeInArr.right);
                    } 
                });
    
                if(currLevelArr.length !== 0){
                    queue.push(currLevelArr);
                    depth++;
                }
            }
            queue.shift();
        }
        return depth;
    }

    isBalanced(){
        let leftHeight = 0;
        let rightHeight = 0;
        let difference;

        if(this.root.left) leftHeight = this.height(this.root.left);
        if(this.root.right) rightHeight = this.height(this.root.right);

        difference = leftHeight - rightHeight;

        if(difference > 1 || difference < -1) return false;

        return true;
    }

    rebalance(){
        if(!(this.isBalanced())){
            const levelOrderArr = this.levelOrder();
            return this.buildTree(levelOrderArr);
        }else{
            return this.root;
        }
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

function createRandNumArray(){
    const arr = [];
    const arrLength = 15;
    const max = 100;
    const min = 0;

    for(let i = 0; i < arrLength; i++){
        const randNum = Math.floor(Math.random() * (max - min) + min);

        arr[i] = randNum;
    }

    return arr;
}

function unbalanceTree(node){
    const arr = [];
    const arrLength = 5;
    const min = 101;
    const max = 150;

    for(let i = 0; i < arrLength; i++){
        const randNum = Math.floor(Math.random() * (max - min) + min);

        arr[i] = randNum;
    }

    arr.map((num) => node.insert(num));

    return node.root;
}

const tree = new Tree();
prettyPrint(tree.buildTree(createRandNumArray()));
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
prettyPrint(unbalanceTree(tree));
console.log(tree.isBalanced());
prettyPrint(tree.rebalance());
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

