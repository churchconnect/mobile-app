import {inject} from "aurelia-framework";
import {EventService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(EventService, Router, NavigationService)
export class EventsList {

    constructor(eventService, router, navigationService) {
        this.eventService = eventService
        this.router = router
        this.navigationService = navigationService
        this.events = eventService.list()
    }
}
