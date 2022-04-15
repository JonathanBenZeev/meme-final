'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
]


function onInit() {
    renderGallery()
}



function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    var strHTML = gImgs.map((img) => {
        return `<div class="img-select"><img onclick="onImgSelect(${img.id})" src="imgs/${img.id}.jpg" alt=""></div>`
    })
    elGallery.innerHTML = strHTML.join('')
}


function onImgSelect(url) {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')
    const elMeme = document.querySelector('.meme-editor')
    elMeme.classList.remove('hide')
    setImg(url)
    initMeme()
}

function onGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hide')
    const elMeme = document.querySelector('.meme-editor')
    elMeme.classList.add('hide')
}