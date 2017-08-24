/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {FeedService, RssPostService, PostGroupService, PostService, NavigationService} from "../services/index";
import {Router} from "aurelia-router";

@inject(FeedService, Router, RssPostService, PostGroupService, PostService, NavigationService)
export class Home {

    constructor(feedService, router, rssPostService, postGroupService, postService, navigationService) {
        this.router = router
        this.feedService = feedService
        this.rssPostService = rssPostService
        this.postGroupService = postGroupService
        this.postService = postService
        this.navigationService = navigationService

        this.sharingInfo = {
            giving: {
                title: "Donate to TRBC on your phone",
                message: "Did you know you can donate to TRBC from your phone?",
                url: 'https://pushpay.com/p/thomasroadbaptistchurch'
            },
            streaming: {
                title: "Watch TRBC's worship service live",
                message: "Looking forward to this week's worship service at TRBC Live", // not supported on some apps (Facebook, Instagram),
                url: 'https://trbc.org/live/',
            }
        }
    }

    attached() {
        this.feed = this.feedService.findOne()
    }

    give() {
        this.navigationService.go('https://pushpay.com/p/thomasroadbaptistchurch')
    }
}
