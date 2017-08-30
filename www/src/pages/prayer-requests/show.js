import {inject} from "aurelia-framework";
import {PrayerRequestService, MessageService, UserService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(PrayerRequestService, Router, MessageService, UserService, NavigationService)
export class PrayerRequestsShow {

    constructor(prayerRequestService, router, messageService, userService, navigationService) {
        this.prayerRequestService = prayerRequestService
        this.router = router
        this.messageService = messageService
        this.userService = userService
        this.navigationService = navigationService
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
