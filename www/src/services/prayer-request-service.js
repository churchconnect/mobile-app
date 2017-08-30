import {inject} from 'aurelia-framework'
import {Endpoint} from 'aurelia-api'
import {ResourceService} from './resource-service'
import {PrayerRequest} from 'models/index'

@inject(Endpoint.of('api'))
export class PrayerRequestService extends ResourceService {

    constructor(api) {
        super(api, PrayerRequest)
    }

}
