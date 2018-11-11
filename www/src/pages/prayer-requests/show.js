import {inject} from "aurelia-framework";
import {PrayerRequestService, MessageService, UserService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";
import {App} from "../../app";

@inject(PrayerRequestService, Router, MessageService, UserService, NavigationService, App)
export class PrayerRequestsShow {

    constructor(prayerRequestService, router, messageService, userService, navigationService, app) {
        this.prayerRequestService = prayerRequestService
        this.router = router
        this.messageService = messageService
        this.userService = userService
        this.navigationService = navigationService
        this.app = app
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.prayerRequest = this.prayerRequestService.findOne(params.id)
    }
}
