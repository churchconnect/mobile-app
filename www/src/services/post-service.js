import {inject} from 'aurelia-framework'
import {Endpoint} from 'aurelia-api'
import {ResourceService} from './resource-service'
import {Post} from 'models/index'
import {ObjectCache} from "./object-cache"

@inject(Endpoint.of('api'), ObjectCache)
export class PostService extends ResourceService {

    constructor(api, objectCache) {
        super(api, Post, objectCache)
    }

}
