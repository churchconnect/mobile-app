import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {ResourceService} from "./resource-service";
import {Event} from 'models/index'

@inject(Endpoint.of('api'))
export class EventService extends ResourceService {

    constructor(api) {
        super(api, Event)
    }

}
