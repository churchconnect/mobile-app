import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {RssPostService, PostGroupService, PostService, NavigationService} from "../services/index";
import {Router} from "aurelia-router";
import {App} from "../app";

@inject(Router, RssPostService, PostGroupService, PostService, NavigationService, EventAggregator, App)
export class Home {

    constructor(router, rssPostService, postGroupService, postService, navigationService, EventAggregator, app) {
        this.router = router
        this.rssPostService = rssPostService
        this.postGroupService = postGroupService
        this.postService = postService
        this.navigationService = navigationService
        this.eventAggregator = EventAggregator
        this.app = app
    }

    givingSharingInfo() {
        return {
            title: `Donate to ${this.app.feed.settings.appName} on your phone`,
            message: `Did you know you can donate to ${this.app.feed.settings.appName} from your phone?`,
            url: this.app.feed.settings.givingLink.url
        }
    }

    streamingSharingInfo() {
        return {
            title: `Watch ${this.app.feed.settings.appName}'s worship service live`,
            message: `Looking forward to this week's worship service at ${this.app.feed.settings.appName} Live`,
            url: this.app.feed.settings.liveStreamLink.post.externalUrl
        }
    }

    give() {
        this.navigationService.go(this.app.feed.settings.givingLink.url)
    }
}
