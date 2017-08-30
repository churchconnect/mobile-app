import {inject} from 'aurelia-framework'
import {Endpoint} from 'aurelia-api'
import {ResourceService} from './resource-service'
import {Post} from 'models/index'

@inject(Endpoint.of('api'))
export class PostService extends ResourceService {

    constructor(api) {
        super(api, Post)
    }

}
