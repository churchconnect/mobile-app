import moment from "moment"

export class FilterOutPastItemsValueConverter {
    toView(array = []) {
        let now = moment()

        return array.filter((item) => moment(item.startDate).isSameOrAfter(now, 'minutes'))
    }
}
