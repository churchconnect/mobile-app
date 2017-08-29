/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject, bindable} from "aurelia-framework";
import {PostService, MessageService, RssPostService} from "../../services/index";
import {Router} from "aurelia-router";
import {App} from "../../app"

@inject(PostService, Router, MessageService, RssPostService, App)
export class PostsShow {

    @bindable iframeUrl

    constructor(postService, router, messageService, rssPostService, app) {
        this.postService = postService
        this.router = router
        this.messageService = messageService
        this.rssPostService = rssPostService
        this.app = app
    }

    activate(params) {
        // If the route has an rssPost that is not null. Simply display the RSS post
        if(this.rssPostService.rssPost) {
            this.post = this.rssPostService.rssPost
        // Else... assume that it is a contentful post and hit the API
        } else {
            if(!params.id) {
                this.postService.findOne(params.id).promise.then((res) => {
                    this.post = res

                    if(this.post.useIframe) {
                        this.iframeUrl = this.post.externalUrl
                        this.app.showFooter = false
                    }
                }, (err) => {
                    this.messageService.error("Post not found", true)
                    this.router.navigateBack()
                })
            }
        }
    }
}
