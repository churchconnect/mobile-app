import {
    Asset,
    BannerImage,
    ContentfulPerson,
    Event,
    Feed,
    Link,
    Post,
    PostGroup,
    PrayerRequest,
    SharingInfo,
    Song,
    SongList
} from 'models/index'

let models = [
    Asset,
    BannerImage,
    ContentfulPerson,
    Event,
    Feed,
    Link,
    Post,
    PostGroup,
    PrayerRequest,
    SharingInfo,
    Song,
    SongList
]

export class ResourceService {

    constructor(api, entityClass = Resource, objectCache = null) {
        this.api = api
        this.entityClass = entityClass
        this.objectCache = objectCache
    }

    save(object) {
        return this.post(object)
    }

    list() {
        return this.find()
    }

    find() {
        return this.convertRequestToResource(this.api.find(this.entityClass.endpoint), true)
    }

    findOne(id) {
        if (this.objectCache && this.objectCache.has(id)) {
            return this.objectCache.get(id)
        }

        return this.convertRequestToResource(this.api.find(this.entityClass.endpoint, id))
    }

    post(object) {
        return this.convertRequestToResource(this.api.post(this.entityClass.endpoint, object))
    }

    convertRequestToResource(request, isCollection = false) {
        let resource = (isCollection) ? new ResourceCollection() : new this.entityClass()

        resource.promise = new Promise((resolve, reject) => {
            // wait for this request to finish, then we'll add the response to the resource we created
            request.then(response => {
                resource = ResourceService.copyResponseDataToResource(response, resource, isCollection)
                resolve(resource)
            }).catch(error => {
                let message = {
                    error: error,
                    resource: resource
                }

                console.log(message)
                reject(message)
            })
        })

        return resource
    }

    static createModelFromObject(object) {
        if (!object) return object

        if (Array.isArray(object)) return object.map(item => ResourceService.createModelFromObject(item))

        if (!(object instanceof Object)) return object

        let Model = object.class ? models.find(model => model.domainClass === object.class) : null

        let model = (Model) ? new Model() : {}

        Object.keys(object).map(function (key, index) {
            model[key] = ResourceService.createModelFromObject(object[key])
        });

        return model
    }

    static copyResponseDataToResource(response, resource, isCollection = false) {
        if (isCollection) {
            response.map(item => {
                resource.push(ResourceService.createModelFromObject(item))
            })
        } else {
            let model = ResourceService.createModelFromObject(response)

            Object.assign(resource, model)
        }

        return resource
    }

}

export class ResourceCollection extends Array {

    constructor() {
        super()
    }

}

export class Resource {

    static endpoint = ''
}
