export class GroupToValueConverter {
    toView(array = [], countPerGroup) {
        let out = []
        let width = Math.ceil(array.length / countPerGroup)

        for(let i = 0; i < width; i++) {
            let column = []

            for(let g = 0; g < countPerGroup; g++) {
                let columnItem = array[(i * countPerGroup) + g]

                if(columnItem) {
                    column.push(columnItem)
                }
            }

            out.push(column)
        }

        return out
    }
}
