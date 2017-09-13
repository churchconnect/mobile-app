import {inject, bindable} from "aurelia-framework";
import {AuthenticateStep, FetchConfig} from "aurelia-authentication";
import {EventAggregator} from "aurelia-event-aggregator";
import {F7, UserService, MessageService} from "./services/index";
import environment from "environment";
import {Endpoint} from "aurelia-api";
import $ from 'jquery';

@inject(F7, EventAggregator, UserService, Endpoint.of('api'), FetchConfig, MessageService)
export class App {

    @bindable showFooter

    constructor(F7, EventAggregator, UserService, api, FetchConfig, messageService) {
        this.f7 = F7
        this.events = EventAggregator
        this.userService = UserService
        this.messageService = messageService

        this.tabs = environment.tabs
        this.user = UserService.user
        this.api = api
        this.fetchConfig = FetchConfig
        this.showFooter = true

        if(window.MobileAccessibility){
            window.MobileAccessibility.usePreferredTextZoom(true);
        }
    }

    get isAuthenticated() {
        return this.userService.isAuthenticated
    }

    activate() {
        this.fetchConfig.configure()
        this.api.client.configure(fetchConfig => {
            fetchConfig
                .withBaseUrl(environment.apiUrl)
                .withInterceptor({
                    parent: this,
                    response(response) {
                        if (response.status == 401) {
                            this.parent.userService.logout()
                        }
                        return response
                    }
                })
                .withInterceptor({
                    parent: this,
                    request(req) {
                        this.parent.events.publish('request.start', req)
                        return req
                    },
                    requestError(req) {
                        this.parent.events.publish('request.complete')
                        return req
                    },
                    response(res) {
                        this.parent.events.publish('request.complete')
                        return res
                    },
                    responseError(response) {
                        this.parent.events.publish('request.complete')

                        if (response.statusCode === 400) {
                            throw response
                        }

                        if (response.statusCode === 401) {
                            this.parent.events.publish('request.unauthorized', response)
                            return response
                        }

                        if (response.statusCode === 403) {
                            this.parent.messageService.error('You do not have permissions to this resource', true)
                            return response
                        }

                        return response
                    },
                })
        })
    }

    configureRouter(config, router) {
        config.title = 'TRBC'
        config.addPipelineStep('authorize', AuthenticateStep)
        config.addPipelineStep('postcomplete', PostCompleteStep)
        config.mapUnknownRoutes({redirect: '#/home'})

        //TODO: move this into a Route class?
        //This enables us to specify the name of a route and expect that the params will be ignored in constructing the module id of that route.
        function stripParams(routeName) {
            return routeName.split('/').filter((it) => {
                return it[0] != ":"
            }).join('/')
        }

        config.map(environment.routes.map(route => {
            return {
                route: (route.name === 'home') ? ['', 'home'] : route.name,
                name: route.name,
                moduleId: `pages/${stripParams(route.name)}`,
                nav: route.nav ? route.nav : false,
                title: route.title,
                settings: {
                    icon: route.icon ? route.icon : null,
                },
                auth: route.auth,
            }
        }))

        this.events.subscribe('router:navigation:complete', () => this.closeNavigation())

        this.router = router

    }

    logout() {
        this.userService.logout()
    }

    closeNavigation() {
        this.f7.closePanel()
    }

}

class PostCompleteStep {
    run(routingContext, next) {
        // Doing document.querySelector(".page-content") doesn't work. For the life of me I can't understand why.
        // Go figure the jQuery selector works tho?!?!?
        $(".page-content").scrollTop(0)

        return next()
    }
}
