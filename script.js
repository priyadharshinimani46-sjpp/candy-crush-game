const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

const rows = 8;
const cols = 8;

const colors = ["red", "blue", "green", "yellow", "purple"];
let grid = [];

let firstTile = null;
let secondTile = null;
let score = 0;

// Create board
function createBoard() {
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("div");
            let color = randomColor();

            tile.classList.add("tile", color);
            tile.addEventListener("click", selectTile);

            board.appendChild(tile);
            grid[r][c] = tile;
        }
    }
}

// Random color
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Select tiles
function selectTile() {
    if (!firstTile) {
        firstTile = this;
    } else if (this !== firstTile) {
        secondTile = this;
        swapTiles();
    }
}

// Swap tiles
function swapTiles() {
    let temp = firstTile.className;
    firstTile.className = secondTile.className;
    secondTile.className = temp;

    checkMatches();

    firstTile = null;
    secondTile = null;
}

// Check matches
function checkMatches() {
    let matched = false;

    // Horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
            let t1 = grid[r][c];
            let t2 = grid[r][c + 1];
            let t3 = grid[r][c + 2];

            if (sameColor(t1, t2, t3)) {
                clearTile(t1);
                clearTile(t2);
                clearTile(t3);
                score += 10;
                matched = true;
            }
        }
    }

    // Vertical
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let t1 = grid[r][c];
            let t2 = grid[r + 1][c];
            let t3 = grid[r + 2][c];

            if (sameColor(t1, t2, t3)) {
                clearTile(t1);
                clearTile(t2);
                clearTile(t3);
                score += 10;
                matched = true;
            }
        }
    }

    scoreDisplay.innerText = score;

    if (matched) {
        setTimeout(dropTiles, 300);
    }
}

// Check same color
function sameColor(t1, t2, t3) {
    let c1 = getColor(t1);
    return c1 && c1 === getColor(t2) && c1 === getColor(t3);
}

// Get tile color
function getColor(tile) {
    return colors.find(c => tile.classList.contains(c));
}

// Clear tile
function clearTile(tile) {
    colors.forEach(c => tile.classList.remove(c));
}

// Drop tiles
function dropTiles() {
    for (let c = 0; c < cols; c++) {
        for (let r = rows - 1; r >= 0; r--) {
            if (!getColor(grid[r][c])) {
                for (let k = r; k > 0; k--) {
                    grid[k][c].className = grid[k - 1][c].className;
                }
                grid[0][c].className = "tile " + randomColor();
            }
        }
    }
}
createBoard();
