/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {PostGroupService, MessageService, RssPostService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(PostGroupService, Router, MessageService, RssPostService, NavigationService)
export class PostGroupsShow {

    constructor(postGroupService, router, messageService, rssPostService, navigationService) {
        this.postGroupService = postGroupService
        this.router = router
        this.messageService = messageService
        this.rssPostService = rssPostService
        this.navigationService = navigationService
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.postGroup = this.postGroupService.findOne(params.id)
    }

    showPost(post) {
        this.navigationService.go(post);
    }
}
