import {inject, bindable} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Element, Router)
export class PagedContent {
    @bindable limitPerPage
    @bindable trimGroupLimit
    @bindable({changeHandler: 'contentBound'}) content
    @bindable sortBy
    @bindable sortDirection
    @bindable currentPageIndex
    @bindable sortedContentMap
    pageCount
    paramBase

    constructor(element, router) {
        this.router = router
        this.paramBase = '#'
        this.element = element
        this.currentPageIndex = 0
        this.trimGroupLimit = 2

        // Subscribe to the end of the trim group sort
        document.addEventListener("finishedTrimGroup", (e) => {
            this.sortedContentMap = e.detail.sortedMap
        })
    }

    contentBound() {
        if(this.content && this.content.length > 0) {
            this.pageCount = this.getPageCount()
        }
    }

    showPage(pageIndex) {
        this.currentPageIndex = pageIndex

        this.createEventAndDispatch("pagedContentShowPage", { pageIndex: pageIndex })
    }

    showNextPage() {
        let nextPageIndex = (this.currentPageIndex + 1 < this.getPageCount()) ? this.currentPageIndex + 1 : this.currentPageIndex

        this.createEventAndDispatch("pagedContentShowNext", { nextPageIndex: nextPageIndex })

        this.currentPageIndex = nextPageIndex
    }

    createEventAndDispatch(name, data) {
        // Dispatch the event
        document.dispatchEvent(new CustomEvent(name, {
            detail: {
                data: data
            }
        }))
    }

    showPreviousPage() {
        let previousPageIndex = (this.currentPageIndex - 1 > -1) ? this.currentPageIndex - 1 : this.currentPageIndex

        this.createEventAndDispatch("pagedContentShowPrevious", { previousPageIndex: previousPageIndex })

        this.currentPageIndex = previousPageIndex
    }

    getPageCount() {
        return Math.ceil(this.content.length / this.limitPerPage)
    }
}
