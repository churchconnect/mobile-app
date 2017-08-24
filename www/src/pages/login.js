/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {UserService, MessageService} from "../services/index";

@inject(Router, UserService, MessageService)
export class Login {

    constructor(router, userService, messageService) {
        this.router = router
        this.userService = userService
        this.messageService = messageService

        if (this.userService.isAuthenticated) {
            this.router.navigate('home')
            return
        }

        this.user = this.userService.user
    }

    activate(params) {
        if (!params.token) return

        this.userService.loginWithToken(params.token)
        this.router.navigate('home')
    }

    attached() {
        this.emailSent = false
    }

    async login() {
        //await this.user.getValidation().validate()

        await this.userService.requestEmailLink(this.user.username)
        this.emailSent = true
    }

    reenterEmail() {
        this.emailSent = false
    }

}
