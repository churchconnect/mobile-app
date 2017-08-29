export class TrimGroupValueConverter {
    viewSize
    currentIndex
    array

    // TODO: Refactor this entire ugly method
    toView(array = [], viewSize, currentIndex) {
        this.array = array
        this.viewSize = viewSize
        this.currentIndex = currentIndex

        let outMap = new Map()

        if(array.length > 0) {
            outMap = this.setLeft(outMap)
            outMap = this.setMiddle(outMap)
            outMap = this.setRight(outMap)
        }

        // Call finished trim event
        let finishedTrimGroupEvent = new CustomEvent("finishedTrimGroup", { detail: { sortedMap: outMap }})

        // Dispatch the event
        document.dispatchEvent(finishedTrimGroupEvent)

        return outMap
    }

    setLeft(outMap) {
        const start = 0;
        let left = this.currentIndex - this.viewSize

        // If we are beyond the start bounds
        if (left < start) {
            // Only get from the start to the middle
            let remainder = left + this.viewSize

            for (let i = 0; i < remainder; i++) {
                outMap.set(i, this.array[i])
            }
        } else {
            if (left > start) {
                outMap.set(start, this.array[start])
            }

            for (let i = 0; i < this.viewSize; i++) {
                let index = this.currentIndex - this.viewSize + i

                outMap.set(index, this.array[index])
            }
        }

        return outMap
    }

    setMiddle(outMap) {
        let middle = this.currentIndex

        outMap.set(middle, this.array[middle])

        return outMap
    }

    setRight(outMap) {
        const end = this.array.length - 1
        let right = this.currentIndex + this.viewSize

        // If we are beyond the end bounds
        if (right > end) {
            // Only get from the remainder till the end
            let remainder = end - this.currentIndex

            for (let i = 0; i < remainder; i++) {
                let index = this.currentIndex + i + 1

                outMap.set(index, this.array[index])
            }
        } else {
            for (let i = 0; i < this.viewSize; i++) {
                let index = this.currentIndex + i + 1

                outMap.set(index, this.array[index])
            }

            if (right < end) {
                outMap.set(end, this.array[end])
            }
        }

        return outMap
    }
}
