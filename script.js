var ms = 00;
var moves = 0;
var emptyx;
var emptyy;
var prevx;
var prevy;
var interval;
var firstMove = true;
const timeDiv = document.getElementById("time");
const board = document.getElementById("board");
var val = ["0vmin", "24vmin", "48vmin", "72vmin"];
var int = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var intcorrect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var x = [val[0], val[1], val[2], val[3], val[0], val[1], val[2], val[3], val[0], val[1], val[2], val[3], val[0], val[1], val[2], val[3]];
var y = [val[0], val[0], val[0], val[0], val[1], val[1], val[1], val[1], val[2], val[2], val[2], val[2], val[3], val[3], val[3], val[3]];
var markup = function(i) {
    return `<div class="block" id="block${i}">${i}</div>`
}
function shuffle(array) {
    var currentIndex = array.length,
    temporaryValue,
    randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
async function setblocks() {
    for (var i = 1; i < 16; i++) {
        board.innerHTML += markup(i);
    }
    shuffle(int);
    for (var i = 0; i < 15; i++) {
        var block = document.getElementById("block"+(i+1));
        block.style.top = y[int[i]];
        block.style.left = x[int[i]];
    }
    for (i = 0; i < 4; i++) {
        if (val[i] == x[int[15]]) {
            prevx = i;
        }
        if (val[i] == y[int[15]]) {
            prevy = i;
        }}
    setfunctions();
}
function setfunctions() {
    for (var i = 0; i < 15; i++) {
        var block = document.getElementById("block"+(i+1));
        block.addEventListener("swiped-left", function() {
            left(this)});
        block.addEventListener("swiped-up", function() {
            up(this)});
        block.addEventListener("swiped-right", function() {
            right(this)});
        block.addEventListener("swiped-down", function() {
            down(this)});
    }}
function timeStart() {
    timeupdate();
    firstMove=!firstMove;
}
function left(e) {
    var currentx;
    var currenty;
    for (var i = 0; i < 4; i++) {
        if (val[i] == e.style.left) {
            currentx = i;
        }
        if (val[i] == e.style.top) {
            currenty = i;
        }
    }
    currentx = currentx !== 0 ? currentx - 1: currentx;
    if (currentx == prevx && currenty == prevy) {
        e.style.left = val[currentx];
        prevx = currentx+1;
        moves += 1;
        check();
    }
};
function right(e) {
    var currentx;
    var currenty;
    for (var i = 0; i < 4; i++) {
        if (val[i] == e.style.left) {
            currentx = i;
        }
        if (val[i] == e.style.top) {
            currenty = i;
        }
    }
    currentx = currentx !== 3 ? currentx + 1: currentx;

    if (currentx == prevx && currenty == prevy) {
        e.style.left = val[currentx];
        prevx = currentx-1;
        moves += 1;
        check();
    }
};
function up(e) {
    var currentx;
    var currenty;
    for (var i = 0; i < 4; i++) {
        if (val[i] == e.style.left) {
            currentx = i;
        }
        if (val[i] == e.style.top) {
            currenty = i;
        }
    }
    currenty = currenty !== 0 ? currenty - 1: currenty;
    if (currentx == prevx && currenty == prevy) {
        e.style.top = val[currenty];
        prevy = currenty+1;
        moves += 1;
        check();
    }
};
function down(e) {
    var currentx;
    var currenty;
    for (var i = 0; i < 4; i++) {
        if (val[i] == e.style.left) {
            currentx = i;
        }
        if (val[i] == e.style.top) {
            currenty = i;
        }
    }
    currenty = currenty !== 3 ? currenty + 1: currenty;
    if (currentx == prevx && currenty == prevy) {
        e.style.top = val[currenty];
        prevy = currenty-1;
        moves += 1;
        check();
    }};
function check() {
    firstMove ? timeStart(): null;
    var count = 0;
    document.getElementById("moves").innerHTML = "Moves : "+moves;
    for (var i = 0; i < 15; i++) {
        var block = document.getElementById("block"+(i+1));
        var topval = block.style.top;
        var leftval = block.style.left;
        var correcty = y[intcorrect[i]];
        var correctx = x[intcorrect[i]];
        if (topval == correcty && leftval == correctx) {
            block.style.background = "var(--clr5)";
            count += 1;
        } else {
            block.style.background = "var(--clr3)";
        }
    }
    if (count == 15) {
        alert("done");
        clearInterval(interval);
    }
}
async function reset() {
    document.getElementById("moves").innerHTML = "Moves : 00";
    moves = 0;
    timeDiv.innerHTML = "00:00.00";
    int = intcorrect.slice();
    clearInterval(interval);
    board.innerHTML = "";
    setblocks();
    firstMove = true;
}
function timeupdate() {
    var startTime = Date.now();
    interval = setInterval(function() {
        var ms = Date.now() - startTime;
        var sec = Math.floor(ms/1000);
        var min = Math.floor(sec/60);
        ms = ms%1000;
        sec = sec%60;
        sec = sec < 10?"0"+sec: sec;
        min = min < 10?"0"+min: min;
        timeDiv.innerHTML = (min+":"+sec+"."+(ms < 100 ? ("0" + (ms < 10 ? "0" + ms: ms)): ms));
    },
        10);
}
setblocks();