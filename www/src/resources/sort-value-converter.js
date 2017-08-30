export class SortValueConverter {
    toView(array = [], propertyName, direction) {
        var factor = direction === 'ascending' ? 1 : -1;

        return array
            .slice(0)
            .sort((a, b) => {
                if (a[propertyName] == b[propertyName]) return 0;
                if (a[propertyName] < b[propertyName]) return -1 * factor;
                if (a[propertyName] > b[propertyName]) return factor;
            });
    }
}
