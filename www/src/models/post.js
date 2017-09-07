export class Post {

    static domainClass = 'co.sharptop.church.Post'
    static endpoint = 'posts'

    isRssPost() {
        return this.id.length === 32
    }

}
