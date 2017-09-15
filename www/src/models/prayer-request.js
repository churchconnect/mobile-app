export class PrayerRequest {

    title = ""
    author = ""
    description = ""
    secret = true

    static domainClass = 'co.sharptop.church.PrayerRequest'
    static endpoint = 'prayer-requests'
}
