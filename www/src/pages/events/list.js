import {inject, bindable, bindingMode} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {EventService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";
import {ConfigurationHolder} from "../../resources/configuration-holder";

@inject(EventService, Router, NavigationService, ConfigurationHolder, EventAggregator)
export class EventsList {

    @bindable ({defaultBindingMode: bindingMode.twoWay}) filteredEvents = []

    constructor(eventService, router, navigationService, configurationHolder, EventAggregator) {
        this.eventService = eventService
        this.router = router
        this.navigationService = navigationService
        this.eventAggregator = EventAggregator

        this.eventsImageURL = configurationHolder.get('eventsImageURL')

        this.eventAggregator.subscribe('events.cache.updated', () => this.loadEvents())
        this.loadEvents()
    }

    loadEvents() {
        this.events = this.eventService.list()
        this.events.promise.then((events) => this.filteredEvents = events)
    }
}
