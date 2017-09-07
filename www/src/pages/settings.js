import {inject} from 'aurelia-framework'
import {UserService} from '../services/index'

@inject(UserService)
export class Settings {

    constructor(UserService) {
        this.user = UserService.user
    }

}
