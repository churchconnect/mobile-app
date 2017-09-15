export class ConfigurationHolder {

    _properties = {}

    set(key, value) {
        this._properties[key] = value
    }

    get(key) {
        return this._properties.hasOwnProperty(key) ? this._properties[key] : null
    }
}
