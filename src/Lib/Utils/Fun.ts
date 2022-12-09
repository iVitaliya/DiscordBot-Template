import axios from "axios";


type GifType = "tickle" | "slap" | "poke" | "pat" | "neko" | "meow" | "lizard" | "kiss" | "hug" | "feed" | "cuddle" | "why" | "cat" | "fact" | "8ball" | "snug" | "waifu" | "avatar";
/** Check if status and such is valid. */
export async function getGIF(gifType: GifType) {
    const url = `https://nekos.life/api/v2/img/${gifType}`;
    const res = await axios.get(url);

    if (!res) return "Uknown";
    
    return res;
}
