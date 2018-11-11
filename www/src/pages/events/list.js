import {inject, bindable, bindingMode} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {EventService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";
import {FilterContent} from "../../resources/templates/filter-content/filter-content";
import {App} from "../../app";

@inject(EventService, Router, NavigationService, EventAggregator, App)
export class EventsList {

    @bindable ({defaultBindingMode: bindingMode.twoWay}) filteredEvents = []

    constructor(eventService, router, navigationService, EventAggregator, app) {
        this.eventService = eventService
        this.router = router
        this.navigationService = navigationService
        this.eventAggregator = EventAggregator
        this.defaultEventsFilter = "this_week";
        this.app = app;

        this.eventAggregator.subscribe('events.cache.updated', () => this.loadEvents())
        this.loadEvents()
    }

    loadEvents() {
        this.events = this.eventService.list()
        this.events.promise.then((events) => this.filteredEvents = FilterContent.filterEvents(events, false))
    }
}
