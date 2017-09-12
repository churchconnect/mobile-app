import {inject} from "aurelia-framework";
import {EventService, MessageService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(EventService, Router, MessageService)
export class EventsShow {

    constructor(eventService, router, messageService) {
        this.eventService = eventService
        this.router = router
        this.messageService = messageService
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.event = this.eventService.findOne(params.id)
    }
}
