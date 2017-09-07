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
