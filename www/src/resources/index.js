export function configure(config) {
    config.globalResources([
        './date-value-converter',
        './markdown-value-converter',
        './limit-to-value-converter',
        './sort-value-converter',
        './group-to-value-converter',
        './trim-group-value-converter',
        './filter-out-past-items-value-converter'
    ]);
}
