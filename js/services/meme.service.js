'use strict'

const STORAGE_KEY = 'memeDB'
var gSavedMemes = []

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    isSaved: false,
    lines: [
        {
            id: makeId(),
            font: 'Impact',
            txt: 'Change text',
            size: 30,
            pos: { x: 200, y: 50 },
            isDrag: false,
            mark: '#ffffff00',
            align: 'center',
            color: 'white'
        },
    ]
}


function getMeme() {
    return gMeme
}

function getLineIdxById(lineId) {
    const lines = getLine()
    const lineIdx = lines.findIndex(line => lineId === line.id)
    return lineIdx
}

function getLine() {
    const lines = gMeme.lines
    return lines
}

function moveUp() {
    setMark()
    const lines = getLine()
    lines[gMeme.selectedLineIdx].pos.y -= 5
}

function moveDown() {
    setMark()
    const lines = getLine()
    lines[gMeme.selectedLineIdx].pos.y += 5

}

function addLine() {
    const lines = getLine()
    if (!lines.length) {
        var pos = { x: 200, y: 50 }
        var line = _createLine('Change text', 30, pos)
        lines.push(line)
    }
    else if (lines.length === 1) {
        pos = { x: 200, y: 350 }
        var line = _createLine('Change text', 30, pos)
        lines.push(line)
        gMeme.selectedLineIdx = lines.length - 1
        lines[gMeme.selectedLineIdx - 1].mark = '#ffffff00'
    }
    else if (lines.length >= 2) {
        pos = { x: 200, y: getRandomIntInclusive(100, 400) }
        line = _createLine('Change text', 30, pos)
        lines.push(line)
        gMeme.selectedLineIdx = lines.length - 1
        lines[gMeme.selectedLineIdx - 1].mark = '#ffffff00'
    }

    setTimeout(() => {
        removeMark()
    }, 5000);

}

function setEmoji(value) {
    const lines = getLine()
    var pos = { x: 200, y: getRandomIntInclusive(100, 400) }
    var line = _createLine(value, 30, pos)
    lines.push(line)
    gMeme.selectedLineIdx = lines.length - 1
    lines[gMeme.selectedLineIdx - 1].mark = '#ffffff00'
    setTimeout(() => {
        removeMark()
    }, 5000);

}

function removeLine() {
    const lines = getLine()
    if (lines.length < 1) return
    lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = lines.length - 1
    if (gMeme.selectedLineIdx < 0) return
    lines[gMeme.selectedLineIdx].mark = '#ffffff10'

}

function setLineTxt(txt) {
    setMark()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt

}

function setImg(id) {
    gMeme.selectedImgId = id

}

function setAlign(value) {
    setMark()
    gMeme.lines[gMeme.selectedLineIdx].align = value

}

function setTxtSize(diff) {
    setMark()
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff < 10) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff

}

function setLineColor(color) {
    setMark()
    gMeme.lines[gMeme.selectedLineIdx].color = color

}

function switchLines() {
    const lines = getLine()
    gMeme.selectedLineIdx--
    lines[gMeme.selectedLineIdx + 1].mark = '#ffffff00'
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = lines.length - 1
    lines[gMeme.selectedLineIdx].mark = '#ffffff40'
}

function setFont(font) {
    setMark()
    gMeme.lines[gMeme.selectedLineIdx].font = font

}

function removeMark() {
    var memes = getMeme()
    var lines = memes.lines
    for (var i = 0; i < lines.length; i++) {
        lines[i].mark = '#ffffff00'
        renderMeme()
    }

}

function setMark() {
    gMeme.lines[gMeme.selectedLineIdx].mark = '#ffffff10'
}

function saveMeme() {
    let meme = JSON.parse(JSON.stringify(gMeme))
    gSavedMemes.push(meme)
    console.log('saved')
    _saveMemesToStorage()
    return gSavedMemes
}


function setMemeDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveMeme(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy

}

function isMemeClicked(clickedPos) {
    const lines = getLine()
    const lineIdx = lines.findIndex(line => Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2) <= line.size)
    if (lineIdx === -1) return
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[gMeme.selectedLineIdx].mark = '#ffffff30'
    setTimeout(() => {
        removeMark()
    }, 10000);

    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}

function _createLine(txt, size, pos) {
    return {
        id: makeId(),
        txt,
        size,
        pos,
        isDrag: false,
        font: 'Impact',
        mark: '#ffffff10',
        align: 'center',
        color: 'white'
    }
}



function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}
