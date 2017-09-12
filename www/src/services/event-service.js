import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {ResourceService} from "./resource-service";
import {Event} from 'models/index'
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache)
export class EventService extends ResourceService {

    lastUpdated

    constructor(api, objectCache) {
        super(api, Event, objectCache)
        this.objectCache = objectCache

        setInterval(() => this.refreshCache(), 60000)
    }

    list() {
        if (this.objectCache.has(Event.domainClass)) {
            return this.objectCache.get(Event.domainClass)
        }

        let eventsList = super.list()

        this.cacheEventsList(eventsList)

        return eventsList
    }

    cacheEventsList(events) {
        events.promise.then((res) => {
            console.log("Updating Events Cache")
            this.objectCache.set(Event.domainClass, res)
            this.objectCache.traverse(res)
            this.lastUpdated = Date.now()
        })
    }

    refreshCache() {
        if (Date.now() - this.lastUpdated > 600000) {
            this.cacheEventsList(super.list())
        }
    }
}
