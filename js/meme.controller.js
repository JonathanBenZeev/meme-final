'use strict'

var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initMeme() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners()
    renderMeme()
}


function renderMeme() {
    const meme = getMeme()
    const lines = meme.lines
    var img = new Image()
    img.src = `imgs/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        for (var i = 0; i < lines.length; i++) {
            drawText(lines[i].txt, lines[i].pos.x, lines[i].pos.y, lines[i].size, lines[i].align, lines[i].color, lines[i].font)
            drawRect(1, lines[i].pos.y - 25, lines[i].mark)
        }
    }
}

function onSwitchLines() {
    switchLines()
    renderMeme()
}

function onSetFont() {
    const font = document.querySelector('.font-by').value
    setFont(font)
    renderMeme()
}

function onMoveUp() {
    moveUp()
    renderMeme()
}

function onMoveDown() {
    moveDown()
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}

function onSetEmoji(value) {
    setEmoji(value)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onSetLineTxt() {
    const txt = document.querySelector('.txt-change').value
    setLineTxt(txt)
    renderMeme()
}

function onSetLineColor() {
    const color = document.querySelector('.color-change').value
    setLineColor(color)
    renderMeme()
}

function onSetAlign(value) {
    setAlign(value)
    renderMeme()
}

function onSetTxtSize(diff) {
    setTxtSize(diff)
    renderMeme()
}

function addListeners() {
    const meme = getMeme()
    const lines = meme.lines
    if (lines.length === 0) return
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    const meme = getMeme()
    const lines = meme.lines
    if (lines.length === 0) return
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // const meme = getMeme()
    // const lines = meme.lines
    // if (lines.length === 0) return
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isMemeClicked(pos)) return
    setMemeDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const lines = meme.lines
    // if (lines.length < 0) return
    if (!lines[meme.selectedLineIdx].isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveMeme(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setMemeDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function drawRect(x, y, color) {
    gCtx.fillStyle = color;
    gCtx.fillRect(x, y, 450, 50);
}

function drawText(txt, x, y, size, align, color, font) {
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.lineWidth = 2
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black'
    gCtx.strokeText(txt, x, y)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'My-Meme.jpg'
}

function resizeCanvas() {
    const elContainer = document.querySelector('#canvas')
    gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}