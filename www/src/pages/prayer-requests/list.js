/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from 'aurelia-framework'
import {PrayerRequestService, NavigationService, MessageService} from '../../services/index'
import {Router} from "aurelia-router";
import {PagedContentResolver} from "../../resources/templates/paged-content-resolver"
import {PagedContentMemory} from "../../resources/templates/paged-content-memory"

@inject(PrayerRequestService, NavigationService, Router, MessageService, PagedContentResolver.of(PagedContentMemory))
export class PrayerRequestsList {

    pagedContentMemory

    constructor(prayerRequestService, navigationService, router, messageService, pagedContentResolver) {
        this.prayerRequestService = prayerRequestService
        this.navigationService = navigationService
        this.router = router
        this.messageService = messageService
        this.pagedContentResolver = pagedContentResolver
    }

    activate(params) {
        this.prayerRequestService.list().promise.then((res) => {
            this.prayerRequests = res
            this.pagedContentMemory = this.pagedContentResolver({})
            this.pagedContentMemory.setPage((params.page) ? parseInt(params.page) - 1 : 0)
        }, (err) => {
            this.messageService.error("Prayer Requests not found", true)
            this.router.navigateBack()
        })
    }
}
