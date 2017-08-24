/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {PostService, MessageService, RssPostService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(PostService, Router, MessageService, RssPostService)
export class PostsShow {

    constructor(postService, router, messageService, rssPostService) {
        this.postService = postService
        this.router = router
        this.messageService = messageService
        this.rssPostService = rssPostService
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        // If the route has an rssPost that is not null. Simply display the RSS post
        if(this.rssPostService.rssPost) {
            this.post = this.rssPostService.rssPost
        // Else... assume that it is a contentful post and hit the API
        } else {
            this.post = this.postService.findOne(params.id)
        }

        // Clear the RSS Post if any.
        this.rssPostService.clear()
    }
}
