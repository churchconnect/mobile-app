export class PostGroup {

    static domainClass = 'co.sharptop.church.PostGroup'
    static endpoint = 'post-groups'

    publishedPosts = []

    get lastPost() {
        return this.publishedPosts[0]
    }

    hasOnePost() {
        return this.publishedPosts.length === 1
    }

}
