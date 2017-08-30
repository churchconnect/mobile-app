import 'framework7'

export const F7 = new Framework7({
    swipePanel: 'right',
    swipePanelOnlyClose: true,
    pushState: true,
    hideNavbarOnPageScroll: true,
})

function initializeF7() {
    if (!isMainViewReady()) {
        setTimeout(initializeF7, 50)
        return
    }

    F7.addView('.view-main')
    F7.init()
}

function isMainViewReady() {
    return document.getElementsByClassName('view-main').length
}

initializeF7()
