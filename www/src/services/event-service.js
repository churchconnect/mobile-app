import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {EventAggregator} from "aurelia-event-aggregator";
import {ResourceService} from "./resource-service";
import {Event} from 'models/index'
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache, EventAggregator)
export class EventService extends ResourceService {

    lastUpdated

    constructor(api, objectCache, EventAggregator) {
        super(api, Event, objectCache)
        this.objectCache = objectCache
        this.eventAggregator = EventAggregator

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
            this.eventAggregator.publish("events.cache.updated")
        })
    }

    refreshCache() {
        console.log("Checking Events List Cache for freshness")
        if (Date.now() - this.lastUpdated > 600000) {
            console.log("Refreshing Events List")
            this.cacheEventsList(super.list())
        }
    }
}
