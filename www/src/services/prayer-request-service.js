import {inject} from 'aurelia-framework'
import {Endpoint} from 'aurelia-api'
import {ResourceService} from './resource-service'
import {PrayerRequest} from 'models/index'
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache)
export class PrayerRequestService extends ResourceService {

    constructor(api, objectCache) {
        super(api, PrayerRequest, objectCache)
    }

}
