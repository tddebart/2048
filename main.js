colors = [
    '#eee4da',//2
    '#ede0c8',//4
    '#f2b179',//8
    '#f59563',//16
    '#f67c5f',//32
    '#f65e3b',//64
    '#edcf72',//128
    '#edcc61',//256
    '#edc850',//512
    '#edc53f',//1024
    '#edc22e',//2048
]

for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
        const div = document.createElement('div');
        div.className = "block unselectable"
        div.style.left = (175*x).toString()+'px'
        div.style.bottom = (175*y).toString()+'px'
        //div.textContent = Math.floor((Math.random()*100)).toString()
        div.id = x+','+y
        const background = document.getElementById('background')
        background.appendChild(div)
    }
}

addRandomTile()

function addRandomTile() {
    let tries = 0
    while(tries < 50) {
        tries++
        const x = getRndInteger(0,3)
        const y = getRndInteger(0,3)

        const tile = document.getElementById(x+','+y)
        if(tile.textContent === "") {
            if(Math.random() > 0.35) {
                tile.textContent = "2"
            } else {
                tile.textContent = "4"
            }
            //tile.style.background = colors[2]
            updateColors()
            break;
        }
    }
    if(tries>50) {
        alert('test')
    }
}

function createTile(x,y,number) {

}

function updateColors() {
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
            const tile = document.getElementById(x+','+y)
            if(tile.textContent === "") {
                tile.style.background = ""
            }
            let number = 2
            for (let i = 0; i < 10; i++) {
                if(tile.textContent === number.toString()) {
                    tile.style.background = colors[i]
                }
                number += number
            }
        }
    }
}

function move(xMain,yMain){
        for (i = 0; i < 4; i++) {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    const tile = document.getElementById(x+','+y)
                    if (tile.textContent !== "") {
                        moveTile(tile, x+xMain, y+yMain)
                    }
                }
            }
        }
    addRandomTile()
}

function moveTile(tile, x,y) {
    const nextTile = document.getElementById((x)+','+(y))
    if(nextTile != null && nextTile.textContent === "") {
        nextTile.textContent = tile.textContent
        tile.textContent = ""
    } else if(nextTile != null && nextTile.textContent === tile.textContent) {
        nextTile.textContent = ((parseInt(nextTile.textContent))+(parseInt(tile.textContent))).toString()
        tile.textContent = ""
    }
    updateColors()
}

document.onkeydown = function (e) {
    if(e.key === "ArrowRight") {
        move (1,0)
    } else if(e.key === "ArrowLeft") {
        move (-1,0)
    } else if(e.key === "ArrowDown") {
        move (0,-1)
    } else if(e.key === "ArrowUp") {
        move (0,1)
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
