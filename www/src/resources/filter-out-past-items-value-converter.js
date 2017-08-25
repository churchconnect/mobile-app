export class FilterOutPastItemsValueConverter {
    toView(array = []) {
        let now = new Date()

        return array.filter((item) => new Date(item.startDate) >= now)
    }
}
