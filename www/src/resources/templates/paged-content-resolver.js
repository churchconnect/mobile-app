import {resolver} from "aurelia-dependency-injection"

@resolver
export class PagedContentResolver {
    constructor(type) {
        this.type = type;
    }

    get (container) {
        return function (...rest) {
            return container.invoke(this.type, rest);
        }.bind(this);
    }

    static of(type) {
        return new PagedContentResolver(type);
    }
}
