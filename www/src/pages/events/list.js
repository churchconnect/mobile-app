/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {EventService, NavigationService} from "../../services/index";
import {Router} from "aurelia-router";

@inject(EventService, Router, NavigationService)
export class EventsList {

    constructor(eventService, router, navigationService) {
        this.eventService = eventService
        this.router = router
        this.navigationService = navigationService
        this.events = eventService.list()
    }
}
