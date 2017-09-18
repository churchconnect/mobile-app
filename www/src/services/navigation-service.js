import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {RssPostService} from "./rss-post-service";
import { Event, Link, Post, PostGroup, PrayerRequest } from 'models/index'


@inject(Router, RssPostService)
export class NavigationService {

    constructor(router, rssPostService) {
        this.router = router
        this.rssPostService = rssPostService
    }

    go(where) {
        if(typeof where === "string") {
            this.goToStringLink(where)
        } else {
            this.goToObjectLink(where)
        }
    }

    getPostGroupDestination(postGroup) {
        if(postGroup.postGroups.length > 0 || !postGroup.hasOnePost()) {
            this.go(postGroup)
        } else {
            this.go(postGroup.lastPost)
        }
    }

    goToStringLink(link) {
        if (this.isInternalUrl(link)) {
            this.router.navigate(link)
        } else {
            this.goToUrl(link)
        }
    }

    goToObjectLink(object) {
        if (object instanceof Link) {
            this.goToLink(object)
        } else if (object instanceof PostGroup) {
            this.goToPostGroup(object)

        } else if (object instanceof Event) {
            this.goToEvent(object)

        } else if (object instanceof PrayerRequest) {
            this.goToPrayerRequest(object)

        } else if (object instanceof Post) {
            this.goToPost(object)

        } else {
            console.log("Cannot navigate to", object)
        }
    }

    isInternalUrl(where) {
        return where.substring(0, 2).toLowerCase() === '#/'
    }

    /**
     * Navigates to a Link object
     * @param link
     */
    goToLink(link) {
        if (link.url) {
            this.goToUrl(link.url)
        } else if (link.post) {
            this.goToPost(link.post)
        } else {
            console.log("Cannot navigate to", object)
        }
    }

    goToEvent(event) {
        this.router.navigate(`#/events/show/${event.id}`)
    }

    goToPrayerRequest(prayerRequest) {
        this.router.navigate(`#/prayer-requests/show/${prayerRequest.id}`)
    }

    goToPost(post) {
        if (post.externalUrl) {
            if(post.useIframe) {
                this.goToContentfulPost(post)
            } else {
                this.goToUrl(post.externalUrl)
            }
        } else {
            if (post.isRssPost()) {
                this.goToRssPost(post)

            } else {
                this.goToContentfulPost(post)
            }
        }
    }

    goToRssPost(post) {
        this.rssPostService.rssPost = post
        this.navigateToPost(post)
    }

    goToContentfulPost(post) {
        this.rssPostService.clear()
        this.navigateToPost(post)
    }

    goToPostGroup(postGroup) {
        this.router.navigate(`#/post-groups/show/${postGroup.id}`)
    }

    goToUrl(url) {
        window.open(url, '_system')
    }

    navigateToPost(post) {
        this.router.navigate(`#/posts/show/${post.id}`)
    }
}
