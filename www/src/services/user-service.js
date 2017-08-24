/*
 * Copyright (c) 2016 by SharpTop Software, LLC
 * All rights reserved. No part of this software project may be used, reproduced, distributed, or transmitted in any
 * form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior
 * written permission of SharpTop Software, LLC. For permission requests, write to the author at info@sharptop.co.
 */

import {inject} from "aurelia-framework";
import {AuthService} from "aurelia-authentication";
import {Endpoint} from "aurelia-api";

@inject(AuthService, Endpoint.of('api'))
export class UserService {

    _isAuthenticated = false

    constructor(auth, api) {
        this.auth = auth
        this.api = api

        this.isAuthenticated = this.auth.isAuthenticated()
    }

    get user() {
        return this._user
    }

    set user(user) {
        this._user = user

        if (!this._user) this.isAuthenticated = false
    }

    get isAuthenticated() {
        return this._isAuthenticated
    }

    set isAuthenticated(isAuthenticated) {
        this._isAuthenticated = isAuthenticated
    }
    
    requestEmailLink(username) {
        this.api.post('authentication-tokens', {"service": "email", "token": username})
    }

    loginWithToken(token) {
        this.auth.setResponseObject({"access_token": token})
        this.isAuthenticated = this.auth.isAuthenticated()
    }

    logout() {
        this.user = null
        return this.auth.logout('#/')
    }

}
