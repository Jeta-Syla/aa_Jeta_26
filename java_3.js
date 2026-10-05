

function sumRecursive(node) {
  if (node === null) return 0;
  return node.value + sumRecursive(node.left) + sumRecursive(node.right);
}

function sumIterative(root) {
  if (root === null) return 0;

  const stack = [root];
  let sum = 0;

  while (stack.length > 0) {
    const node = stack.pop();
    sum += node.value;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return sum;
}


function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

function fibIterative(n) {
  if (n <= 1) return n;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: null,
  },
  right: {
    value: 3,
    left: null,
    right: { value: 5, left: null, right: null },
  },
};

console.log("Shuma rekursive:", sumRecursive(tree));
console.log("Shuma iterative:", sumIterative(tree));
console.log("Fib rekursive:", fibRecursive(10));
console.log("Fib iterative:", fibIterative(10));