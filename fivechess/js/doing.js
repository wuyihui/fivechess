$('.startbtn').on('click', function () {
    $('.startbtn').text('重新开始');
    $('.clickArea').remove();
    creatAllClickArea();
    creatEveryClickArea();
    isBlack = true;
    isOver = false;
    playGame();
    initGame();
})
var isBlack = true;
var isOver = false;
var chessMap = [];//chessMap[x][y] 值为0时表示没有棋子，值为1时表示黑棋，值为2时表示白棋
var wins = [];//wins[x][y][k] x表示横坐标，y表示纵坐标，k表示第k种赢法
var count = 0;//count代表所有赢法的总数
var playerWin = [];
var computerWin = [];
function initGame() {
    // 初始化chessMap
    for (var x = 0; x < 16; x++) {
        chessMap[x] = [];
        for (var y = 0; y < 16; y++) {
            chessMap[x][y] = 0;
        }
    }
    // 初始化playerWin
    for (var k = 0; k < count; k++) {
        playerWin[k] = 0;
    }
    // 初始化computerWin
    for (var k = 0; k < count; k++) {
        computerWin[k] = 0;
    }
}
// 初始化wins[]
for (var x = 0; x < 16; x++) {
    wins[x] = [];
    for (var y = 0; y < 16; y++) {
        wins[x][y] = [];
    }
}
// 横线赢法
for (var x = 0; x < 16; x++) {
    for (var y = 0; y < 12; y++) {
        for (var k = 0; k < 5; k++) {
            wins[x][y + k][count] = true;
        }
        count++;
    }
}
// 竖线赢法
for (var x = 0; x < 12; x++) {
    for (var y = 0; y < 16; y++) {
        for (var k = 0; k < 5; k++) {
            wins[x + k][y][count] = true;
        }
        count++;
    }
}
// 斜线赢法
for (var x = 0; x < 12; x++) {
    for (var y = 0; y < 12; y++) {
        for (var k = 0; k < 5; k++) {
            wins[x + k][y + k][count] = true;
        }
        count++;
    }
}
// 反斜线赢法
for (var x = 4; x < 16; x++) {
    for (var y = 0; y < 12; y++) {
        for (var k = 0; k < 5; k++) {
            wins[x - k][y + k][count] = true;
        }
        count++;
    }
}
function playGame() {
    for (var i = 0; i < $('.chess').length; i++) {
        $('.chess').eq(i).on('click', function (event) {
            var x = Math.floor($(this).position().top / 40);
            var y = Math.floor($(this).position().left / 40);
            if (isOver) {
                return;
            }
            if (chessMap[x][y] != 0) {
                return;
            }
            if (!isBlack) {
                return;
            }
            creatChess(x, y, isBlack);
            isBlack = false;
            chessMap[x][y] = 1;
            // 判断是否赢棋
            for (var k = 0; k < count; k++) {
                if (wins[x][y][k] == true) {
                    playerWin[k]++;
                    computerWin[k] == 6;
                    if (playerWin[k] == 5) {
                        alert('恭喜您获得胜利!')
                        isOver = true;
                    }
                }
            }
            if(!isOver){
                isBlack = false;
                computerAI();
            }
        })
    }
}
// 计算机人工智能
function computerAI() {
    var playerScore = [];
    var computerScore = [];
    var maxX = 0;
    var maxY = 0;
    var max = 0;
    var ruleCount = 0;
    // 初始化玩家分数
    for (var x = 0; x < 16; x++) {
        playerScore[x] = [];
        for (var y = 0; y < 16; y++) {
            playerScore[x][y] = 0;
        }
    }
    // 初始化电脑分数
    for (var x = 0; x < 16; x++) {
        computerScore[x] = [];
        for (var y = 0; y < 16; y++) {
            computerScore[x][y] = 0;
        }
    }
    for (var x = 0; x < 16; x++) {
        for (var y = 0; y < 16; y++) {
            if (chessMap[x][y] == 0) {
                // 黑棋得分
                if (upAspect(x, y, 1)) {
                    ruleCount++;
                } else if (downAspect(x, y, 1)) {
                    ruleCount++;
                } else if (leftAspect(x, y, 1)) {
                    ruleCount++;
                } else if (rightAspect(x, y, 1)) {
                    ruleCount++;
                } else if (leftUpAspect(x, y, 1)) {
                    ruleCount++;
                } else if (rightUpAspect(x, y, 1)) {
                    ruleCount++;
                } else if (leftDownAspect(x, y, 1)) {
                    ruleCount++;
                } else if (rightDownAspect(x, y, 1)) {
                    ruleCount++;
                }
                if (ruleCount == 2) {
                    playerScore[x][y] += 6000;
                    ruleCount = 0;
                } else {
                    ruleCount = 0;
                }
                // 白棋得分
                if (upAspect(x, y, 2)) {
                    ruleCount++;
                } else if (downAspect(x, y, 2)) {
                    ruleCount++;
                } else if (leftAspect(x, y, 2)) {
                    ruleCount++;
                } else if (rightAspect(x, y, 2)) {
                    ruleCount++;
                } else if (leftUpAspect(x, y, 2)) {
                    ruleCount++;
                } else if (rightUpAspect(x, y, 2)) {
                    ruleCount++;
                } else if (leftDownAspect(x, y, 2)) {
                    ruleCount++;
                } else if (rightDownAspect(x, y, 2)) {
                    ruleCount++;
                }
                if (ruleCount == 2) {
                    computerScore[x][y] += 8000;
                    ruleCount = 0;
                } else {
                    ruleCount = 0;
                }
                for (var k = 0; k < count; k++) {
                    if (wins[x][y][k] == true) {
                        if (playerWin[k] == 1) {
                            playerScore[x][y] += 200;
                        } else if (playerWin[k] == 2) {
                            playerScore[x][y] += 400;
                        } else if (playerWin[k] == 3) {
                            playerScore[x][y] += 2000;
                        } else if (playerWin[k] == 4) {
                            playerScore[x][y] += 10000;
                        }
                        if (computerWin[k] == 1) {
                            computerScore[x][y] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[x][y] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[x][y] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[x][y] += 20000;
                        }
                    }
                }
                if (playerScore[x][y] > max) {
                    max = playerScore[x][y];
                    maxX = x;
                    maxY = y;
                }else if(playerScore[x][y] == max){
                    if(computerScore[x][y] > computerScore[maxX][maxY]){
                        maxX = x;
                        maxY = y;
                    }
                }
                if (computerScore[x][y] > max) {
                    max = computerScore[x][y];
                    maxX = x;
                    maxY = y;
                }else if(computerScore[x][y] == max){
                    if(playerScore[x][y] > playerScore[maxX][maxY]){
                        maxX = x;
                        maxY = y;
                    }
                }
            }
        }
    }
    // console.log(maxX);
    // console.log(maxY);
    // console.log(playerScore[maxX][maxY]);
    // console.log(computerScore[maxX][maxY]);
    creatChess(maxX, maxY, isBlack);
    chessMap[maxX][maxY] = 2;
    isBlack = true;
    // 判断是否赢棋
    for (var k = 0; k < count; k++) {
        if (wins[maxX][maxY][k] == true) {
            computerWin[k]++;
            playerWin[k] == 6;
            if (computerWin[k] == 5) {
                alert('很遗憾，你输了');
                isOver = true;
            }
        }
    }
}
// 判断棋盘上一个点上方有多少个子
function upAspect(x, y, chessType) {
    var winCount;
    var thisX = x;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            x = thisX;
            for (var j = 0; j < comGain[i].length; j++) {
                if (x == -1) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    x--;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            x = thisX;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (x == -1) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    x--;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function downAspect(x, y, chessType) {
    var winCount;
    var thisX = x;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            x = thisX;
            for (var j = 0; j < comGain[i].length; j++) {
                if (x == 16) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    x++;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            x = thisX;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (x == 16) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    x++;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function leftAspect(x, y, chessType) {
    var winCount;
    var thisY = y;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            y = thisY;
            for (var j = 0; j < comGain[i].length; j++) {
                if (y == -1) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    y--;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            y = thisY;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (y == -1) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    y--;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function rightAspect(x, y, chessType) {
    var winCount;
    var thisY = y;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            y = thisY;
            for (var j = 0; j < comGain[i].length; j++) {
                if (y == 16) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    y++;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            y = thisY;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (y == 16) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    y++;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function leftUpAspect(x, y, chessType) {
    var winCount;
    var thisX = x;
    var thisY = y;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < comGain[i].length; j++) {
                if (x == -1 || y == -1) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    x--;
                    y--;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (x == -1 || y == -1) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    x--;
                    y--;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function rightUpAspect(x, y, chessType) {
    var winCount;
    var thisX = x;
    var thisY = y;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < comGain[i].length; j++) {
                if (x == 16 || y == -1) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    x++;
                    y--;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (x == 16 || y == -1) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    x++;
                    y--;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function leftDownAspect(x, y, chessType) {
    var winCount;
    var thisX = x;
    var thisY = y;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < comGain[i].length; j++) {
                if (x == -1 || y == 16) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    x--;
                    y++;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (x == -1 || y == 16) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    x--;
                    y++;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
function rightDownAspect(x, y, chessType) {
    var winCount;
    var thisX = x;
    var thisY = y;
    if (chessType == 2) {
        for (var i = 0; i < comGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < comGain[i].length; j++) {
                if (x == 16 || y == 16) {
                    return false;
                }
                if (chessMap[x][y] == comGain[i][j]) {
                    winCount++;
                    x++;
                    y++;
                }
                if (winCount == comGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        for (var i = 0; i < playerGain.length; i++) {
            winCount = 0;
            x = thisX;
            y = thisY;
            for (var j = 0; j < playerGain[i].length; j++) {
                if (x == 16 || y == 16) {
                    return false;
                }
                if (chessMap[x][y] == playerGain[i][j]) {
                    winCount++;
                    x++;
                    y++;
                }
                if (winCount == playerGain[i].length) {
                    return true;
                }
            }
        }
        return false;
    }
}
var creatChess = function (x, y, isBlack) {
    var chess = document.createElement('img');
    chess.style.display = 'block';
    chess.style.width = '40px';
    chess.style.height = '40px';
    if (isBlack) {
        chess.src = './image/black.png';
    } else {
        chess.src = './image/white.png';
        $('.chess').css('background-color','transparent');
        $('.chess').eq(x * 16 + y).css('background-color','lightblue');
    }
    $('.chess').eq(x * 16 + y).append(chess);
}
var playerGain = [
    [0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 1, 0]
]
var comGain = [
    [0, 2, 2, 0],
    [0, 2, 0, 2, 0],
    [0, 0, 1, 1, 0]
]