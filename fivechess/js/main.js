function creatAllChessBoard() {
    var div = document.createElement('div');
    div.className = 'chessBoard';
    div.style.position = 'absolute';
    div.style.height = '602px';
    div.style.width = '602px';
    div.style.border = '1px solid black';
    div.style.top = '20px';
    div.style.left = '20px';
    div.style.display = 'flex';
    div.style.justifyContent = 'flex-start';
    div.style.alignItems = 'flex-start';
    div.style.flexWrap = 'wrap';
    $('.gameSpace').append(div);
}
function creatEveryChessBoard() {
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            var div = document.createElement('div');
            div.style.width = 40 + 'px';
            div.style.height = 40 + 'px';
            div.style.border = '1px solid black';
            $('.chessBoard').append(div);
        }
    }
}
function creatAllClickArea() {
    var div = document.createElement('div');
    div.className = 'clickArea';
    div.style.position = 'absolute';
    div.style.width = '640px';
    div.style.height = '640px';
    div.style.zIndex = '100';
    div.style.display = 'flex';
    div.style.justifyContent = 'flex-start';
    div.style.alignItems = 'flex-start';
    div.style.flexWrap = 'wrap';
    $('.gameSpace').append(div);
}
function creatEveryClickArea() {
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            var blank = document.createElement('div');
            blank.className = 'chess';
            blank.style.width = 40 + 'px';
            blank.style.height = 40 + 'px';
            $('.clickArea').append(blank);
        }
    }
}
creatAllChessBoard();
creatEveryChessBoard();
creatAllClickArea();
creatEveryClickArea();