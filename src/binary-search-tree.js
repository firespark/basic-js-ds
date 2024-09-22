const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	add(data, currentNode = this.rootNode) {
		if (!this.rootNode) {
			this.rootNode = new Node(data);
			currentNode = this.rootNode;
		}
		if (!currentNode) {
			currentNode = new Node(data);
		}
		if (currentNode.data === data) {
			return currentNode;
		}
		if (data < currentNode.data) {
			currentNode.left = this.add(data, currentNode.left);
		} else {
			currentNode.right = this.add(data, currentNode.right);
		}

		return currentNode;
	}

	has(data, currentNode = this.rootNode) {
		if (currentNode == null) {
			return false;
		}
		if (data === currentNode.data) {
			return true;
		}

		if (data < currentNode.data) {
			if (currentNode.left === null) {
				return false;
			} else {
				return this.has(data, currentNode.left);
			}
		} else {
			if (currentNode.right === null) {
				return false;
			} else {
				return this.has(data, currentNode.right);
			}
		}
	}

	find(data, currentNode = this.rootNode) {
		if (currentNode == null) {
			return null;
		}
		if (data === currentNode.data) {
			return currentNode;
		}

		if (data < currentNode.data) {
			if (currentNode.left === null) {
				return null;
			} else {
				return this.find(data, currentNode.left);
			}
		} else {
			if (currentNode.right === null) {
				return null;
			} else {
				return this.find(data, currentNode.right);
			}
		}
	}

	remove(data, currentNode = this.rootNode) {
		if (!currentNode) {
			return null;
		}

		if (data === currentNode.data) {

			if (!currentNode.left && !currentNode.right) {
				return null;
			}

			// Node has one child
			if (!currentNode.left) {
				return currentNode.right;
			}

			if (!currentNode.right) {
				return currentNode.left;
			}

			// Node has two children
			let successor = this.minNode(currentNode.right);
			currentNode.data = successor.data;
			currentNode.right = this.remove(successor.data, currentNode.right);
			return currentNode;
		} 
    else if (data < currentNode.data) {
			// Go left
			currentNode.left = this.remove(data, currentNode.left);
		} 
    else {
			// Go right
			currentNode.right = this.remove(data, currentNode.right);
		}

		return currentNode;
	}

	minNode(node = this.rootNode) {
		if (!node) {
			return null;
		}

		while (node.left !== null) {
			node = node.left;
		}
		return node;
	}

	min() {
		let minNode = this.minNode();
		return minNode ? minNode.data : null; 
	}

	maxNode(node = this.rootNode) {
		if (!node) {
			return null;
		}

		while (node.right !== null) {
			node = node.right;
		}

		return node;
	}


	max() {
		let maxNode = this.maxNode();

		return maxNode ? maxNode.data : null;
	}
}

module.exports = {
	BinarySearchTree,
};
