export class ArrayFormat {
    /**
     * Trims the array to the length provided to be the maximum length of the array.
     * @param arr - The array to trim the items from.
     * @param maxLength - The maximum length you wish to give to the provided array.
     * @returns The trim'd array.
     */
    public trim(arr: string[] | any[], maxLength: number = 10) {
        if (arr.length > maxLength) {
            const length = arr.length - maxLength;

            arr = arr.slice(0, maxLength);
            arr.push(`${length} more...`);
        }

        return arr;
    }

    /**
     * Removes duplicates from the provided array and returns an array with the .
     * @param arr - The array to remove duplicated items from.
     * @returns The array with the duplicated items removed.
     */
    public removeDuplicates(arr: string[] | any[]) {
        return [...new Set(arr)];
    }
}