import {inject} from 'aurelia-framework'
import {Endpoint} from 'aurelia-api'
import {ResourceService} from './resource-service'
import {PostGroup} from 'models/index'

@inject(Endpoint.of('api'))
export class PostGroupService extends ResourceService {

    constructor(api) {
        super(api, PostGroup)
    }

}
