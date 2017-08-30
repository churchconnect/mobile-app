import {inject} from 'aurelia-framework'
import {PrayerRequestService, NavigationService} from '../../services/index'

@inject(PrayerRequestService, NavigationService)
export class PrayerRequestsList {

    constructor(prayerRequestService, navigationService) {
        this.prayerRequestService = prayerRequestService
        this.navigationService = navigationService
        this.prayerRequests = prayerRequestService.list()
    }

    show(prayerRequest) {
        this.navigationService.go(prayerRequest)
    }
}
