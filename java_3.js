// ==========================================
// 1. SAME TIME PERFORMANCE - FACTORIAL
// ==========================================

// Iterative version
function factorialIterative(n) {
    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

// Recursive version
function factorialRecursive(n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorialRecursive(n - 1);
}


// ==========================================
// 2. RECURSION DEGRADES PERFORMANCE - FIBONACCI
// ==========================================

// Iterative version
function fibonacciIterative(n) {
    let a = 0;
    let b = 1;

    for (let i = 0; i < n; i++) {
        const next = a + b;
        a = b;
        b = next;
    }

    return a;
}

// Recursive version
function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    }

    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}


// ==========================================
// TEST
// ==========================================

console.log("FACTORIAL");
console.log("Iterative:", factorialIterative(10));
console.log("Recursive:", factorialRecursive(10));

console.log("\nFIBONACCI");
console.log("Iterative:", fibonacciIterative(10));
console.log("Recursive:", fibonacciRecursive(10));