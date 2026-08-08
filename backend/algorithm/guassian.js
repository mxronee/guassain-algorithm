export function gaussianElimination(inputMatrix) {
    const matrix = inputMatrix.map(row => row.map(Number));

    const rows = matrix.length;
    const cols = matrix[0].length;

    const variableCount = cols - 1;
    const steps = [];

    let pivotRow = 0;

    for (
        let col = 0;
        col < variableCount && pivotRow < rows;
        col++
    ) {
        // หา pivot
        let maxRow = pivotRow;

        for (let row = pivotRow + 1; row < rows; row++) {
            if (
                Math.abs(matrix[row][col]) >
                Math.abs(matrix[maxRow][col])
            ) {
                maxRow = row;
            }
        }

        // ไม่มี pivot
        if (Math.abs(matrix[maxRow][col]) < 1e-10) {
            continue;
        }

        // สลับแถว
        if (maxRow !== pivotRow) {
            [matrix[pivotRow], matrix[maxRow]] =
                [matrix[maxRow], matrix[pivotRow]];

            steps.push({
                operation: `R${pivotRow + 1} ↔ R${maxRow + 1}`,
                matrix: copyMatrix(matrix)
            });
        }

        // กำจัดค่าด้านล่าง pivot
        for (let row = pivotRow + 1; row < rows; row++) {
            const factor =
                matrix[row][col] / matrix[pivotRow][col];

            if (Math.abs(factor) < 1e-10) {
                continue;
            }

            for (let j = col; j < cols; j++) {
                matrix[row][j] -=
                    factor * matrix[pivotRow][j];
            }

            cleanMatrix(matrix);

            steps.push({
                operation:
                    `R${row + 1} → R${row + 1} - (${formatNumber(factor)})R${pivotRow + 1}`,
                matrix: copyMatrix(matrix)
            });
        }

        pivotRow++;
    }

    const solution = solveByBackSubstitution(matrix);

    return {
        matrix,
        steps,
        solution
    };
}


// -------------------------
// Helper Functions
// -------------------------

function copyMatrix(matrix) {
    return matrix.map(row => [...row]);
}

function cleanMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (Math.abs(matrix[i][j]) < 1e-10) {
                matrix[i][j] = 0;
            }
        }
    }
}

function formatNumber(number) {
    return Number(number.toFixed(4));
}


// -------------------------
// Back Substitution
// -------------------------

function solveByBackSubstitution(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const variables = cols - 1;

    const solution = new Array(variables).fill(0);

    for (let i = rows - 1; i >= 0; i--) {

        let pivotColumn = -1;

        for (let j = 0; j < variables; j++) {
            if (Math.abs(matrix[i][j]) > 1e-10) {
                pivotColumn = j;
                break;
            }
        }

        // แถวไม่มี pivot
        if (pivotColumn === -1) {
            if (Math.abs(matrix[i][variables]) > 1e-10) {
                return {
                    type: "no-solution"
                };
            }

            continue;
        }

        let value = matrix[i][variables];

        for (
            let j = pivotColumn + 1;
            j < variables;
            j++
        ) {
            value -= matrix[i][j] * solution[j];
        }

        solution[pivotColumn] =
            value / matrix[i][pivotColumn];
    }

    return {
        type: "unique",
        values: solution
    };
}