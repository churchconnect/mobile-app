export class ObjectCache {

    _cache = {}

    set(key, value) {
        this._cache[key] = value
        return value
    }

    has(key) {
        return this._cache.hasOwnProperty(key)
    }

    get(key) {
        if (!this.has(key)) {
            return null
        }

        let value = this._cache[key]
        value.promise = new Promise((resolve, reject) => resolve(value))
        return value
    }

    /**
     * traverses an object tree recursively, caching any domain objects it finds
     * @param object
     */
    traverse(object) {
        if (!object) return

        if (Array.isArray(object)) {
            object.map(item => this.traverse(item))
            return
        }

        if (!(object instanceof Object)) return

        if (object.hasOwnProperty('class') && object.hasOwnProperty('id') && object.id) {
            this.set(object.id, object)
        }

        Object.keys(object).map((key, index) => {
            if (key == "promise") return
            this.traverse(object[key])
        })
    }
}

