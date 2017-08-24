/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {PrayerRequestService, MessageService, UserService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(PrayerRequestService, Router, MessageService, UserService, NavigationService)
export class PrayerRequestsShow {

    constructor(prayerRequestService, router, messageService, userService, navigationService) {
        this.prayerRequestService = prayerRequestService
        this.router = router
        this.messageService = messageService
        this.userService = userService
        this.navigationService = navigationService
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.prayerRequest = this.prayerRequestService.findOne(params.id)
    }
}
