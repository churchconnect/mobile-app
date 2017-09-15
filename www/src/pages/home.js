import {inject} from "aurelia-framework";
import {FeedService, RssPostService, PostGroupService, PostService, NavigationService} from "../services/index";
import {Router} from "aurelia-router";
import {ConfigurationHolder} from "../resources/configuration-holder"

@inject(FeedService, Router, RssPostService, PostGroupService, PostService, NavigationService, ConfigurationHolder)
export class Home {

    constructor(feedService, router, rssPostService, postGroupService, postService, navigationService, ConfigurationHolder) {
        this.router = router
        this.feedService = feedService
        this.rssPostService = rssPostService
        this.postGroupService = postGroupService
        this.postService = postService
        this.navigationService = navigationService
        this.configurationHolder = ConfigurationHolder

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
        this.feed.promise.then(
            (res) => {
                this.configurationHolder.set('liveStreamLink', res.liveStreamLink)
                this.configurationHolder.set('prayerTimeImageURL', res.prayerTimeImageURL)
                this.configurationHolder.set('eventsImageURL', res.eventsImageURL)
            }
        )
    }

    give() {
        this.navigationService.go('https://pushpay.com/p/thomasroadbaptistchurch')
    }
}
