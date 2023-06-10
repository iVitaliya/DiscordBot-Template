export class StringFormat {
    /**
     * Capitalises the provided input.
     * @param input - The string to capitalise.
     * @returns The capitalised text.
     */
    public capitalise(input: string): string {
        return input.split(' ').map((str) => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
    }

    /**
     * Takes the provided bytes and returns them in a proper format.
     * @param input - The bytes to format.
     * @returns The bytes but in a prettier sort of format, how they're supposed to be displayed.
     */
    public bytes(input: number): string {
        if (input === 0) return '0 Bytes';

        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(input) / Math.log(1024));

        return `${parseFloat((input / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }
}