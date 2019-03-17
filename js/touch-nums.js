'use strict'



var gStartTimer = 0;
var gTimer = 0;
var gCounter = 0;

var gGameLevel = 0;
var gNums = []


var gTimeInterval;


function makeNumsArray(nums) {
    gGameLevel = nums;
    console.log(gGameLevel)
    for (var i = 0; i < nums; i++) {
        gNums.push(i)
    }
    hideElements()
    shuffle(gNums)
}

function nextNumber() {
    var nextNum = document.querySelector('.nextNumber')
    nextNum.innerText = `Next number: ${gCounter + 1}`;
}

function hideElements() {
    var elEasyButton = document.querySelector('.easy')
    var elMidButton = document.querySelector('.mid')
    var elHardButton = document.querySelector('.hard')
    var elNextNumber = document.querySelector('.nextNumber')
    // console.log(elButton)    
    elNextNumber.classList.toggle("hide")
    elEasyButton.classList.toggle("hide")
    elMidButton.classList.toggle("hide")
    elHardButton.classList.toggle("hide")
}

function shuffle(nums) {
    // debugger
    for (let i = nums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
        // console.log(nums)
    }
    createBoard(nums)
}

function createBoard(nums) {
    console.log(nums)
    // debugger;
    var temp = Math.sqrt(nums.length)
    var board = [];
    for (var i = 0; i < temp; i++) {
        board.push([])
        for (var j = 0; j < temp; j++) {
            board[i][j] = nums.shift()
        }
    }
    renderBoard(board)
    findMin(board)
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var item = board[i][j]
            strHTML +=
                `<td data-(${i},${j}) onclick="cellClicked(this)">
            ${item}
            </td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    // console.log(...board)
}

function findMin(board) {
    var min = 500;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] < min) {
                min = board[i][j]
            }
        }
    }
}

function cellClicked(elClickedCell) {
    // debugger;
    var cell = elClickedNum.innerText;
    num = parseInt(num)
    console.log(elClickedNum)
    if (num === 0) {
        gStartTimer = Date.now()
        startTimer()
        nextNumber()
    }
    if (num === gCounter) {
        gCounter++
        elClickedNum.style.background = 'red'
    }
    if (gCounter === gGameLevel) {
        var elNextNumber = document.querySelector('.nextNumber')
        elNextNumber.classList.toggle("hide")
        clearInterval(gTimeInterval)
        setTimeout(winner, 1500)

    }
}

function winner() {
    var game = confirm('play a new game?')
    if (game) {
        newgame()
    }
    else {
        byebye()
    }
}

function byebye() {
    document.querySelector('body').innerHTML = `<img src="img/bye.png" alt="">`
    alert('yeah, you better run!')
}

function newgame() {
    hideElements()
    gCounter = 0;
    gTimer = 0;
    document.querySelector('.timer').innerHTML = gTimer
}


function startTimer() {
    gTimeInterval = setInterval(function () {
        gTimer = Date.now() - gStartTimer
        gTimer /= 1000
        console.log(gTimer)
        document.querySelector('.timer').innerHTML = gTimer
    }, 1000)
}


