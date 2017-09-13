import {Router} from "aurelia-router";
import {inject, bindable} from "aurelia-framework";

@inject(Router)
export class FilterContentMemory {

    @bindable context
    @bindable searchValue
    defaultData
    routeName

    constructor(router, defaultData) {
        this.router = router
        this.defaultData = defaultData
        this.routeName = this.router.currentInstruction.config.name
    }

    setFilter(params) {
        for (let property in params) {
            if (params.hasOwnProperty(property)) {
                this.defaultData[property] = params[property]

                if(property === "context" || property === "searchValue") {
                    this[property] = params[property]
                }
            }
        }

        this.router.navigateToRoute(
            this.routeName,
            this.defaultData,
            { trigger: false, replace: true }
        )
    }
}
