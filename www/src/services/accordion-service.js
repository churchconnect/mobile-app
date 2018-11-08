import $ from 'jquery';

export class AccordionService {

    accordionTargetClass = ".accordion-target"
    accordionSearchClass = ".search-icon-wrap"

    setup() {
        $(this.accordionSearchClass).unbind('click')
        $(this.accordionSearchClass).on('click', () => $(this.accordionTargetClass).slideToggle(300))
    }
}
