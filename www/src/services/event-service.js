import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {ResourceService} from "./resource-service";
import {Event} from 'models/index'
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache)
export class EventService extends ResourceService {

    constructor(api, objectCache) {
        super(api, Event, objectCache)
    }

}
