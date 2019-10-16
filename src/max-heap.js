const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.length = 0;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
    this.length += 1;
  }

  pop() {
    if (!this.root) return;

    const root = this.detachRoot();

    this.restoreRootFromLastInsertedNode(root);

    this.shiftNodeDown(this.root);

    this.length -= 1;

    return root.data;
  }

  detachRoot() {
    const root = this.root;
    this.root = null;

    if (this.parentNodes.indexOf(root) > -1) this.parentNodes.shift();

    return root;
  }

  restoreRootFromLastInsertedNode(detached) {
    const new_root = this.parentNodes.pop();
    if (new_root !== undefined) {
      if (
        new_root.parent &&
        new_root.parent.right === new_root &&
        new_root.parent !== detached
      ) {
        this.parentNodes.unshift(new_root.parent);
      }
      // new_root.parent = null;
      new_root.left = detached.left === new_root ? null : detached.left;
      new_root.right = detached.right === new_root ? null : detached.right;
      new_root.remove();
      new_root.updateChildrenParent();
      this.root = new_root;

      if (!(this.root.left && this.root.right))
        this.parentNodes.unshift(this.root);
    } else this.root = null;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.length = 0;
  }

  insertNode(node) {
    this.parentNodes.push(node);

    if (this.root === null) {
      this.root = node;
    } else {
      const parent_node = this.parentNodes[0];
      parent_node.appendChild(node);
      if (parent_node.right !== null) {
        this.parentNodes.shift();
        this.childPushed = 0;
      }
    }
  }

  shiftNodeUp(node) {
    const modify_parentsNode = () => {
      const node_index = this.parentNodes.indexOf(node);
      const parent_index = this.parentNodes.indexOf(node.parent);
      if (node_index > -1) {
        this.parentNodes[node_index] = node.parent;
      }
      if (parent_index > -1) {
        this.parentNodes[parent_index] = node;
      }
    };

    if (node.parent && node.parent.priority < node.priority) {
      modify_parentsNode();
      node.swapWithParent();
      this.shiftNodeUp(node);
    }
    if (node.parent === null) this.root = node;
  }

  shiftNodeDown(node) {
    if (node) {
      let left = (node.left && node.left.priority) || 0;
      let right = (node.right && node.right.priority) || 0;

      if (left > right && left > node.priority) {
        this.shiftNodeUp(node.left);
        this.shiftNodeDown(node);
      } else if (left < right && right > node.priority) {
        this.shiftNodeUp(node.right);
        this.shiftNodeDown(node);
      }
    }
  }
}

module.exports = MaxHeap;
