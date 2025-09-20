console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
// const checkWin = ()=>{
//     let boxtext = document.getElementsByClassName('boxtext');
//     let wins = [
//         [0, 1, 2, 5, 5, 0],
//         [3, 4, 5, 5, 15, 0],
//         [6, 7, 8, 5, 25, 0],
//         [0, 3, 6, -5, 15, 90],
//         [1, 4, 7, 5, 15, 90],
//         [2, 5, 8, 15, 15, 90],
//         [0, 4, 8, 5, 15, 45],
//         [2, 4, 6, 5, 15, 135],
//     ]
//     wins.forEach(e =>{
//         if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
//             document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
//             isgameover = true
//             document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
//             document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
//             document.querySelector(".line").style.width = "20vw";
//         }
//     })
// }

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        // [a, b, c, x%, y%, angle, length%]
        [0, 1, 2, 50, 16.66, 0, 100],    // row 1
        [3, 4, 5, 50, 50, 0, 100],       // row 2
        [6, 7, 8, 50, 83.33, 0, 100],    // row 3
        [0, 3, 6, 16.66, 50, 90, 100],   // col 1
        [1, 4, 7, 50, 50, 90, 100],      // col 2
        [2, 5, 8, 83.33, 50, 90, 100],   // col 3
        [0, 4, 8, 50, 50, 45, 141.5],    // diag ↘
        [2, 4, 6, 50, 50, -45, 141.5]    // diag ↙
    ];
    let winFound = false;
    wins.forEach(e => {
        let [a, b, c, x, y, angle, length] = e;
        if (
            boxtext[a].innerText !== "" &&
            boxtext[a].innerText === boxtext[b].innerText &&
            boxtext[a].innerText === boxtext[c].innerText
        ) {
            document.querySelector('.info').innerText = boxtext[a].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox img').style.width = "200px";
            let line = document.querySelector('.line');
            line.style.display = 'block';
            line.style.width = length + '%';
            line.style.left = x + '%';
            line.style.top = y + '%';
            line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            winFound = true;
        }
    });
    // Check for draw if no win and all boxes filled
    if (!winFound && !isgameover) {
        let filled = Array.from(boxtext).every(box => box.innerText !== "");
        if (filled) {
            document.querySelector('.info').innerText = "Game is Draw";
            isgameover = true;
        }
    }
};


// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover ){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            } 
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    let line = document.querySelector(".line");
    line.style.width = "0";
    line.style.display = 'none';
    line.style.left = '50%';
    line.style.top = '50%';
    line.style.transform = 'translate(-50%, -50%)';
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})

