/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {PostGroupService, MessageService, NavigationService} from "../../services/index";
import {PagedContentResolver} from "../../resources/templates/paged-content-resolver"
import {PagedContentMemory} from "../../resources/templates/paged-content-memory"
import {Router} from "aurelia-router";

@inject(PostGroupService, Router, MessageService, NavigationService, PagedContentResolver.of(PagedContentMemory))
export class PostGroupsShow {

    pagedContentMemory

    constructor(postGroupService, router, messageService, navigationService, pagedContentResolver) {
        this.postGroupService = postGroupService
        this.router = router
        this.messageService = messageService
        this.navigationService = navigationService
        this.pagedContentResolver = pagedContentResolver
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.postGroupService.findOne(params.id).promise.then((res) => {
            this.postGroup = res
            this.pagedContentMemory = this.pagedContentResolver({ 'id': params.id })
            this.pagedContentMemory.setPage((params.page) ? parseInt(params.page) - 1 : 0)
        }, (err) => {
            this.messageService.error("Post Group not found", true)
            this.router.navigateBack()
        })
    }
}
