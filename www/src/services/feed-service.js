import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {Endpoint} from "aurelia-api";
import {ResourceService} from "./resource-service";
import {Feed} from "models/index"
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache, EventAggregator)
export class FeedService extends ResourceService {

    lastUpdated

    constructor(api, objectCache, EventAggregator) {
        super(api, Feed)
        this.objectCache = objectCache
        this.eventAggregator = EventAggregator

        setInterval(() => this.refreshCache(), 60000)
    }

    findOne(id) {
        if (this.objectCache.has(Feed.domainClass)) {
            return this.objectCache.get(Feed.domainClass)
        }

        let feed = super.findOne(id)

        this.cacheFeed(feed)

        return feed
    }


    cacheFeed(feed) {
        feed.promise.then((res) => {
            console.log("Updating Feed Cache")
            this.objectCache.set(Feed.domainClass, res)
            this.objectCache.traverse(res)
            this.lastUpdated = Date.now()
            this.eventAggregator.publish("feed.cache.updated")
        })
    }

    refreshCache() {
        console.log("Checking Feed Cache for freshness")
        if (Date.now() - this.lastUpdated > 30000) {
            console.log("Refreshing Feed")
            this.cacheFeed(super.findOne())
        }
    }

}
