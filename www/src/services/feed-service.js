import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {ResourceService} from "./resource-service";
import {Feed} from "models/index"
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache)
export class FeedService extends ResourceService {

    lastUpdated

    constructor(api, objectCache) {
        super(api, Feed)
        this.objectCache = objectCache

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
            console.log("updating the cache")
            this.objectCache.set(Feed.domainClass, res)
            this.objectCache.traverse(res)
            this.lastUpdated = Date.now()
        })
    }

    refreshCache() {
        if (Date.now() - this.lastUpdated > 600000) {
            this.cacheFeed(super.findOne())
        }
    }

}
