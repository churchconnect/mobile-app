/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

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
