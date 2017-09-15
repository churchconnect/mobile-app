import {inject} from 'aurelia-framework'
import {PrayerRequestService, NavigationService, MessageService} from 'services/index'
import {Router} from "aurelia-router";
import {PagedContentResolver} from "resources/templates/paged-content/paged-content-resolver"
import {PagedContentMemory} from "resources/templates/paged-content/paged-content-memory"
import {ConfigurationHolder} from "../../resources/configuration-holder"

@inject(PrayerRequestService, NavigationService, Router, MessageService, PagedContentResolver.of(PagedContentMemory), ConfigurationHolder)
export class PrayerRequestsList {

    pagedContentMemory

    constructor(prayerRequestService, navigationService, router, messageService, pagedContentResolver, configurationHolder) {
        this.prayerRequestService = prayerRequestService
        this.navigationService = navigationService
        this.router = router
        this.messageService = messageService
        this.pagedContentResolver = pagedContentResolver

        this.prayerTimeImageURL = configurationHolder.get('prayerTimeImageURL')
    }

    activate(params) {
        this.prayerRequestService.list().promise.then((res) => {
            this.prayerRequests = res
            this.pagedContentMemory = this.pagedContentResolver({})
            this.pagedContentMemory.setPage((params.page) ? parseInt(params.page) - 1 : 0)
        }, (err) => {
            this.messageService.error("Prayer Requests not found", true)
            this.router.navigateBack()
        })
    }
}
