import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {ResourceService} from "./resource-service";
import {Feed} from "models/index"

@inject(Endpoint.of('api'))
export class FeedService extends ResourceService {

    constructor(api) {
        super(api, Feed)
    }

}
