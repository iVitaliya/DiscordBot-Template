export class ArrayFormat {
    public constructor() { }

    /** Trims an array with specified maximum length. */
    public trim(arr: string[] | any[], maxLength: number = 10): string[] | any[] {
        if (arr.length > maxLength) {
            const length = arr.length - maxLength;

            arr = arr.slice(0, maxLength);
            arr.push(`${length} more...`);
        }

        return arr;
    }

    /** Removes duplicates from an array if there are any and returns the new array. */
    public removeDuplicates(arr: string[] | any[]): any[] {
        return [...new Set(arr)];
    }
}