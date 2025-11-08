import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { createFeed, getFeeds } from "src/lib/db/queries/feeds";
import { Feed, User } from "src/lib/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const config = readConfig()
    const user = await getUserByName(config.currentUserName);

    if (!user) {
        throw new Error(`User ${config.currentUserName} not found`)
    }

    const feedName = args[0];
    const feedUrl = args[1];

    const feed = await createFeed(feedName, feedName, user.id);

    if (!feed) {
        throw new Error("Failed to create feed")
    }

    console.log("Feed created successfully")
    printFeed(feed, user);
}

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    const feeds = await getFeeds();
    feeds.forEach((feed, index) => {
        console.log(`--- Feed #${index + 1} ---`)
        console.log(`Name: ${feed.name}`)
        console.log(`URL: ${feed.url}`)
        console.log(`User: ${feed.user_id.name}`)
        console.log()
    })
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

