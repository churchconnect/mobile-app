import {inject} from "aurelia-framework";
import {PostGroupService, MessageService, RssPostService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(PostGroupService, Router, MessageService, RssPostService, NavigationService)
export class PostGroupsShow {

    constructor(postGroupService, router, messageService, rssPostService, navigationService) {
        this.postGroupService = postGroupService
        this.router = router
        this.messageService = messageService
        this.rssPostService = rssPostService
        this.navigationService = navigationService
    }

    activate(params) {
        if (!params.id) {
            this.messageService.error("Internal Application Error", true)
            this.router.navigateBack()
            return
        }

        this.postGroup = this.postGroupService.findOne(params.id)
    }

    showPost(post) {
        this.navigationService.go(post);
    }
}
