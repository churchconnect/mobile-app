import {Router} from "aurelia-router";
import {inject, bindable} from "aurelia-framework";

@inject(Router)
export class PagedContentMemory {

    @bindable pagedIndex
    defaultData
    routeName

    constructor(router, defaultData) {
        this.router = router
        this.defaultData = defaultData
        this.routeName = this.router.currentInstruction.config.name
        this.registerEventListeners()
    }

    setPage(index) {
        this.pagedIndex = index
        this.defaultData.page = index + 1;

        this.router.navigateToRoute(
            this.routeName,
            this.defaultData,
            { trigger: false, replace: true }
        )
    }

    registerEventListeners() {
        document.addEventListener("pagedContentShowNext", this.showNextPage.bind(this))
        document.addEventListener("pagedContentShowPrevious", this.showPreviousPage.bind(this))
        document.addEventListener("pagedContentShowPage", this.showPage.bind(this))
    }

    showPage(data) {
        let pageIndex = parseInt(data.detail.data.pageIndex)

        this.setPage(pageIndex)
    }

    showNextPage(data) {
        let nextPageIndex = parseInt(data.detail.data.nextPageIndex)

        this.setPage(nextPageIndex)
    }

    showPreviousPage(data) {
        let previousPageIndex = parseInt(data.detail.data.previousPageIndex)

        this.setPage(previousPageIndex)
    }
}
