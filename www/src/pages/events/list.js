import {inject, bindable, bindingMode} from "aurelia-framework";
import {EventService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";
import {ConfigurationHolder} from "../../resources/configuration-holder";

@inject(EventService, Router, NavigationService, ConfigurationHolder)
export class EventsList {

    @bindable ({defaultBindingMode: bindingMode.twoWay}) filteredEvents = []

    constructor(eventService, router, navigationService, configurationHolder) {
        this.eventService = eventService
        this.router = router
        this.navigationService = navigationService
        this.events = eventService.list()
        this.events.promise.then((events) => this.filteredEvents = events)

        this.eventsImageURL = configurationHolder.get('eventsImageURL')
    }
}
