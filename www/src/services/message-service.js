import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(EventAggregator)
export class MessageService {

    constructor(EventAggregator) {
        this.EventAggregator = EventAggregator
    }

    success(message, next = false) {
        this.show(message, 'flash-success', next)
    }

    error(message, next = false) {
        this.show(message, 'flash-error', next)
    }

    warning(message, next = false) {
        this.show(message, 'flash-warning', next)
    }

    show(message, type, next) {
        this.EventAggregator.publish('flash.message', {
            text: message,
            type: type,
            next: next,
        })
    }

}
