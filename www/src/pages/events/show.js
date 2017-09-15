import {inject} from "aurelia-framework";
import {EventService, MessageService} from "../../services/index";
import {Router} from "aurelia-router";
import {ConfigurationHolder} from "../../resources/configuration-holder";

@inject(EventService, Router, MessageService, ConfigurationHolder)
export class EventsShow {

    constructor(eventService, router, messageService, configurationHolder) {
        this.eventService = eventService
        this.router = router
        this.messageService = messageService

        this.eventsImageURL = configurationHolder.get('eventsImageURL')
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.event = this.eventService.findOne(params.id);
        this.event.promise.then((event) => {
            event.location = event.location.replace(/\\/g, '');
        })
    }
}
