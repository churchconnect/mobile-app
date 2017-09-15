import {inject, NewInstance} from 'aurelia-framework'
import {ValidationRules, ValidationController} from 'aurelia-validation';
import {PrayerRequestService, MessageService} from '../../services/index'
import {Router} from 'aurelia-router'
import {PrayerRequest} from "../../models/prayer-request";


ValidationRules
    .ensure('title').required().withMessage("Summary is required")
    .ensure('author').required().withMessage("Name is required")
    .ensure('description').required().withMessage("Prayer Request is required")
    .on(PrayerRequest)

@inject(PrayerRequestService, NewInstance.of(ValidationController), MessageService, Router)
export class PrayerRequestsForm {

    constructor(prayerRequestService, validationController, messageService, router) {
        this.prayerRequestService = prayerRequestService
        this.validationController = validationController
        this.messageService = messageService
        this.router = router

        this.prayerRequest = new PrayerRequest()
        this.submitting = false
    }

    async validate() {
        let errors = await this.validationController.validate()
        return errors.length == 0
    }

    async submitForm() {
        if (!await this.validate()) {
            return
        }

        this.submitting = true
        this.prayerRequestService.save(this.prayerRequest).promise.then(res => {
            this.messageService.success('Your prayer request was submitted successfully', true)
            this.router.navigateBack()
            this.submitting = false
        }).catch(err => {
            this.messageService.error('An error occurred while submitting your prayer request')
            this.submitting = false
        })
    }

}
