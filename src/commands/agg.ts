import { fetchFeed } from "src/lib/rss/fetchFeed";

export async function handlerAgg(cmdName: string, ...args: string[]) {
    const feed = await fetchFeed("https://www.wagslane.dev/index.xml")
    console.log(feed);
    feed.channel.item.forEach(item => {
        console.log(item)
    })
}