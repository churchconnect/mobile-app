import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class RssPostService {

    constructor(router) {
        this.router = router
    }

    clear() {
        this.rssPost = null;
    }

    get rssPost() {
        return this._rssPost
    }

    set rssPost(value) {
        this._rssPost = value
    }
}
