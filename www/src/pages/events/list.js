import {inject, bindable, bindingMode} from "aurelia-framework";
import {EventService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(EventService, Router, NavigationService)
export class EventsList {

    @bindable ({defaultBindingMode: bindingMode.twoWay}) filteredEvents = []

    constructor(eventService, router, navigationService) {
        this.eventService = eventService
        this.router = router
        this.navigationService = navigationService
        this.events = eventService.list()
        this.events.promise.then((events) => this.filteredEvents = events)
    }
}
