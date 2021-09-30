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
        div.style.left = (180*x).toString()+'px'
        div.style.bottom = (180*y).toString()+'px'
        //div.textContent = Math.floor((Math.random()*100)).toString()
        div.id = x+','+y
        const background = document.getElementById('background')
        background.appendChild(div)
    }
}

addRandomTile()
addRandomTile()

function addRandomTile() {
    let tries = 0
    while(tries < 50) {
        tries++
        const x = getRndInteger(0,3)
        const y = getRndInteger(0,3)

        if(document.getElementById(x+','+y+"T") == null) {
            if(Math.random() > 0.35) {
                createTile(x,y,'2')
            } else {
                createTile(x,y,'4')
            }
            updateColors()
            break;
        }
    }
    if(tries>50) {
        alert('test')
    }
}

function createTile(x,y,number) {
    const exTile = document.getElementById(x+','+y+"T")
    if(exTile != null) {
        exTile.textContent = number.toString()
    } else {
        const div = document.createElement('div');
        div.className = "block unselectable move"
        div.style.left = (180*x).toString()+'px'
        div.style.bottom = (180*y).toString()+'px'
        div.textContent = number
        div.id = x+','+y+'T'
        const background = document.getElementById('background')
        background.appendChild(div)
    }
}

function GetTile(x,y) {
    const tile = document.getElementById(x+','+y+"T")
    if(tile!= null) {
        return tile
    }else {
        return null
    }
}

function updateColors() {
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
            const tile = GetTile(x,y)
            if(tile == null) {
                continue;
            }
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
    //for (i = 0; i < 10; i++) {
    for (i = 1; i < 10; i++) {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const tile = GetTile(x,y)
                if (tile !== null) {
                    const alteredPosX = x+xMain
                    const alteredPosY = y+yMain
                    const nextTile = GetTile(alteredPosX,alteredPosY)
                    const back = document.getElementById(alteredPosX+','+alteredPosY)
                    if(back != null ) {
                        if(nextTile == null) {
                            tile.style.left = back.style.left;
                            tile.style.bottom = back.style.bottom;
                            tile.id = alteredPosX+','+alteredPosY+'T'
                        } else if(nextTile.textContent === tile.textContent) {
                            tile.style.left = nextTile.style.left;
                            tile.style.bottom = nextTile.style.bottom;
                            tile.style.zIndex = "10"
                            tile.textContent = ((parseInt(nextTile.textContent))+(parseInt(tile.textContent))).toString()
                            tile.id = nextTile.id;
                            //doneList.push(nextTile)
                            tile.ontransitionend = () => {
                                //background.removeChild(nextTile)
                                nextTile.remove()
                                updateColors()
                            }
                        }
                    }
                }

                //moveTile(tile, x+xMain, y+yMain)
                //doneList.push(tile)
            }
        }
    }
    //}
    setTimeout(function() {
        addRandomTile()

    }, 50)
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

function Reset() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            GetTile(x,y)?.remove()
        }
        }
    addRandomTile()
    addRandomTile()
}
