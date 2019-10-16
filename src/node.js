class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left === null) this.left = node;
    else if (this.right === null) this.right = node;
    else return;

    node.setParent(this);
  }

  removeChild(node) {
    if (
      this.left &&
      (this.left.data === node.data && this.left.priority === node.priority)
    )
      this.left = null;
    else if (
      this.right &&
      (this.right.data === node.data && this.right.priority === node.priority)
    )
      this.right = null;
    else throw Error();

    node.setParent(null);
  }

  setParent(node) {
    this.parent = node;
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  updateChild(child, new_child) {
    if (this.left == child) this.left = new_child;
    else this.right = new_child;
  }

  swapWithParent() {
    if (this.parent) {
      if (this.parent.parent) this.parent.parent.updateChild(this.parent, this);

      const oldParent = this.parent;

      let left, right;
      if (this.parent.left == this) {
        left = this.parent;
        right = this.parent.right;
      } else {
        left = this.parent.left;
        right = this.parent;
      }

      [this.left, this.right] = [
        left,
        right,
        (this.parent.left = this.left),
        (this.parent.right = this.right)
      ];

      this.parent = this.parent.parent;

      this.updateChildrenParent();
      oldParent.updateChildrenParent();
    }
  }

  updateChildrenParent() {
    if (this.left) this.left.setParent(this);
    if (this.right) this.right.setParent(this);
  }
}

module.exports = Node;
