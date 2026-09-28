let seedState = 1;

function seed(value) {
  seedState = value >>> 0;
}

function randint(min, max) {
  seedState = (1664525 * seedState + 1013904223) >>> 0;
  const unit = seedState / 4294967296;
  return min + Math.floor(unit * (max - min + 1));
}

function countConflicts(board) {
  let conflicts = 0;
  const n = board.length;

  for (let col1 = 0; col1 < n; col1++) {
    for (let col2 = col1 + 1; col2 < n; col2++) {
      const row1 = board[col1];
      const row2 = board[col2];

      const sameRow = row1 === row2;
      const sameDiagonal = Math.abs(row1 - row2) === Math.abs(col1 - col2);

      if (sameRow || sameDiagonal) {
        conflicts += 1;
      }
    }
  }

  return conflicts;
}

function hillClimbingNQueens(n, maxSteps = 1000) {
  let board = Array.from({ length: n }, () => randint(0, n - 1));

  for (let step = 0; step < maxSteps; step++) {
    const currentConflicts = countConflicts(board);

    if (currentConflicts === 0) {
      return { board, steps: step, solved: true };
    }

    let bestBoard = board.slice();
    let bestConflicts = currentConflicts;

    for (let col = 0; col < n; col++) {
      const originalRow = board[col];

      for (let row = 0; row < n; row++) {
        if (row === originalRow) {
          continue;
        }

        const candidate = board.slice();
        candidate[col] = row;
        const candidateConflicts = countConflicts(candidate);

        if (candidateConflicts < bestConflicts) {
          bestConflicts = candidateConflicts;
          bestBoard = candidate;
        }
      }
    }

    if (bestConflicts >= currentConflicts) {
      return { board, steps: step, solved: false };
    }

    board = bestBoard;
  }

  return { board, steps: maxSteps, solved: false };
}

function printNQueensBoard(board) {
  for (let row = 0; row < board.length; row++) {
    let line = "";
    for (let col = 0; col < board.length; col++) {
      line += board[col] === row ? "Q " : ". ";
    }
    console.log(line);
  }
}

function simplex(c, a, b) {
  const numberOfConstraints = a.length;
  const numberOfVariables = c.length;
  const tableau = [];

  for (let i = 0; i < numberOfConstraints; i++) {
    const row = a[i].slice();
    const slackVariables = Array(numberOfConstraints).fill(0);
    slackVariables[i] = 1;
    row.push(...slackVariables, b[i]);
    tableau.push(row);
  }

  const objectiveRow = c.map((value) => -value);
  objectiveRow.push(...Array(numberOfConstraints).fill(0), 0);
  tableau.push(objectiveRow);

  while (Math.min(...tableau[tableau.length - 1].slice(0, -1)) < 0) {
    const lastRow = tableau[tableau.length - 1].slice(0, -1);
    const pivotColumn = lastRow.indexOf(Math.min(...lastRow));

    const ratios = [];
    for (let i = 0; i < numberOfConstraints; i++) {
      const columnValue = tableau[i][pivotColumn];
      if (columnValue > 0) {
        ratios.push(tableau[i][tableau[i].length - 1] / columnValue);
      } else {
        ratios.push(Infinity);
      }
    }

    const pivotRow = ratios.indexOf(Math.min(...ratios));

    if (ratios[pivotRow] === Infinity) {
      throw new Error("The problem is unbounded.");
    }

    const pivotValue = tableau[pivotRow][pivotColumn];
    tableau[pivotRow] = tableau[pivotRow].map((value) => value / pivotValue);

    for (let i = 0; i < tableau.length; i++) {
      if (i === pivotRow) {
        continue;
      }

      const multiplier = tableau[i][pivotColumn];
      tableau[i] = tableau[i].map(
        (value, j) => value - multiplier * tableau[pivotRow][j]
      );
    }
  }

  const solution = Array(numberOfVariables).fill(0);

  for (let variableIndex = 0; variableIndex < numberOfVariables; variableIndex++) {
    const column = [];
    for (let row = 0; row < numberOfConstraints; row++) {
      column.push(tableau[row][variableIndex]);
    }

    const ones = column.filter((value) => value === 1).length;
    const zeros = column.filter((value) => value === 0).length;

    if (ones === 1 && zeros === numberOfConstraints - 1) {
      const rowIndex = column.indexOf(1);
      solution[variableIndex] = tableau[rowIndex][tableau[rowIndex].length - 1];
    }
  }

  const maximumValue = tableau[tableau.length - 1][tableau[tableau.length - 1].length - 1];
  return { solution, maximumValue };
}

function gcdEuclidean(a, b) {
  let steps = 0;

  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
    steps += 1;
  }

  return { result: a, steps };
}

function demoHillClimbing() {
  console.log("1. Hill Climbing for N-Queens");
  const { board, steps, solved } = hillClimbingNQueens(8);

  console.log("Solved:", solved);
  console.log("Steps:", steps);
  console.log("Conflicts:", countConflicts(board));
  printNQueensBoard(board);
  console.log();
}

function demoSimplex() {
  console.log("2. Simplex Algorithm");

  const c = [3, 5];
  const a = [
    [1, 0],
    [0, 2],
    [3, 2],
  ];
  const b = [4, 12, 18];

  const { solution, maximumValue } = simplex(c, a, b);

  console.log("x, y =", solution);
  console.log("Maximum value =", maximumValue);
  console.log();
}

function demoGcd() {
  console.log("3. Euclidean Algorithm for GCD");

  const examples = [
    [20, 10],
    [34, 21],
    [252, 105],
  ];

  for (const [a, b] of examples) {
    const { result, steps } = gcdEuclidean(a, b);
    console.log(`gcd(${a}, ${b}) = ${result}, steps = ${steps}`);
  }

  console.log();
}

seed(7);
demoHillClimbing();
demoSimplex();
demoGcd();