import {inject} from 'aurelia-framework'
import {Endpoint} from 'aurelia-api'
import {ResourceService} from './resource-service'
import {PostGroup} from 'models/index'
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache)
export class PostGroupService extends ResourceService {

    constructor(api, objectCache) {
        super(api, PostGroup, objectCache)
    }

}
