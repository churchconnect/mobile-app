import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Element, Router)
export class FilterContent {

    @bindable context
    @bindable searchValue
    @bindable defaults = ["title", "summary", "content"]
    @bindable type
    @bindable({changeHandler: 'extraFieldsBound'}) extraFields
    @bindable({changeHandler: 'parsedExtraFieldsBound'}) parsedExtraFields
    @bindable({changeHandler: 'fieldsBound'}) fields
    @bindable({defaultBindingMode: bindingMode.twoWay}) data
    @bindable({defaultBindingMode: bindingMode.twoWay}) filteredPosts

    constructor(element, router) {
        this.router = router
        this.element = element
        this.extraFields = []
        this.type = "post-group";
    }

    extraFieldsBound() {
        let out = []

        if(this.extraFields.length > 0) {
            let extraFields = JSON.parse(this.extraFields).extraFields

            if(extraFields) {
                out = JSON.parse(this.extraFields).extraFields
            }
        }

        this.parsedExtraFields = out
    }

    parsedExtraFieldsBound() {
        let fields = new Map()

        this.defaults.forEach(defaultItem => {
            fields.set(defaultItem, defaultItem.charAt(0).toUpperCase() + defaultItem.slice(1))
        })

        if(this.parsedExtraFields.length > 0) {
            this.parsedExtraFields.forEach((parsedExtraField) => {
                if(parsedExtraField.showInFilter) {
                   fields.set(parsedExtraField.name, parsedExtraField.displayName)
                }
            })
        }

        this.fields = fields
    }

    fieldsBound() {
        let fieldTypeSelect = this.element.querySelector("#filter-type")
        fieldTypeSelect.innerHTML = ""

        this.fields.forEach((displayName, name) => {
            let option = document.createElement("option");
            option.value = name
            option.innerHTML = displayName

            fieldTypeSelect.appendChild(option)
        })
    }

    // TODO: We should really implement a Fuzzy search. This is stupid rigid
    filterBoxChange(searchValue) {
        let fieldTypeSelect = this.element.querySelector("#filter-type")
        let context = fieldTypeSelect.options[fieldTypeSelect.selectedIndex].value
        let posts = this.data.publishedPosts

        this.filteredPosts = this.filterPosts(searchValue, posts, context)
    }

    filterTypeChange(target) {
        let context = target.options[target.selectedIndex].value

        if(this.type !== 'events') {
            let searchValue = this.element.querySelector("#filter-box").value
            let posts = this.data.publishedPosts

            this.filteredPosts = this.filterPosts(searchValue, posts, context)
        } else {
            let events = this.data
            this.filteredPosts = this.filterEvents(events, context)
        }
    }

    filterEvents(events, selected) {
        let filteredEvents = []

        if(selected === "All Events") {
            filteredEvents = events
        } else {
            events.forEach((event) => {
                if(event.categories.indexOf(selected) !== -1) {
                    filteredEvents.push(event)
                }
            })
        }

        return filteredEvents
    }

    filterPosts(searchValue, posts, context) {
        let filteredPosts = []

        posts.forEach(post => {
            if(post[context]) {
                if(post[context].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                    filteredPosts.push(post)
                }
            } else {
                post.extraFields.forEach(extraField => {
                    if(extraField.name === context) {
                        if(extraField.attribute.targetValue.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                            filteredPosts.push(post)
                        }
                    }
                })
            }
        })

        return filteredPosts
    }
}
