/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

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
