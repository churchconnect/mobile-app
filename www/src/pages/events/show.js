import {inject} from "aurelia-framework";
import {EventService, MessageService} from "../../services/index";
import {Router} from "aurelia-router";
import {App} from "../../app";

@inject(EventService, Router, MessageService, App)
export class EventsShow {

    constructor(eventService, router, messageService, app) {
        this.eventService = eventService
        this.router = router
        this.messageService = messageService
        this.app = app
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
