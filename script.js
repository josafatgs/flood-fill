const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.canvas.width = 500;
context.canvas.height = 500;
  

const makeMatrix = (length, ...restDimensionLengths) => Array.from(
    { length },
    () => restDimensionLengths.length ? makeMatrix(...restDimensionLengths) : Math.floor(Math.random() * 2) + 1
  );

let first = false;
let firstMatrix = [];
  
let matrix = makeMatrix(20, 20);

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] == 1) {
            context.fillStyle = 'black';
            context.fillRect(j * 25, i * 25, 25, 25);
        } else {
            if (!first) {
                firstMatrix.push(i);
                firstMatrix.push(j);
                context.fillStyle = 'red';
                context.fillRect(j * 25, i * 25, 25, 25);
                first = true;
            } else {
                context.fillStyle = 'white';
                context.fillRect(j * 25, i * 25, 25, 25);
            }
        }

    }
} 

console.log(firstMatrix);

function floodFill([i, j]) {
    if (j < 0 || i < 0 || j >= matrix[0].length || i >= matrix.length) {
        return;
    }
    if (matrix[i][j] != 2) {
        return;
    }

    matrix[i][j] = 3;
    context.fillStyle = 'red';
    context.fillRect(j * 25, i * 25, 25, 25);
    floodFill([i + 1, j]);
    floodFill([i - 1, j]);
    floodFill([i, j + 1]);
    floodFill([i, j - 1]);

    return;
}

const button = document.getElementById("start-button");
button.addEventListener("click", () => {
    floodFill(firstMatrix);
});

console.log(matrix);