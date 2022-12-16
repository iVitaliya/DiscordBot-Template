import moment from "moment";
import { Sleep } from "@lib";

export function countDown(start: number) {
    let s = start;
    Sleep(5 * 1000);

    return s - 5;
}

export const FooterTime = moment(Date.now()).format("[The] Do [of] MMMM YYYY [@] h:mm:ss A");