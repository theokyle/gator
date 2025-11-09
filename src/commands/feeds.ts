import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { createFeed, getFeeds } from "src/lib/db/queries/feeds";
import { Feed, User } from "src/lib/db/schema";
import { createFeedFollow } from "src/lib/db/queries/feed_follows";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const feedName = args[0].trim();
    const feedUrl = args[1].trim();

    const feed = await createFeed(feedName, feedUrl, user.id);

    if (!feed) {
        throw new Error("Failed to create feed")
    }

    const feed_follow = await createFeedFollow(user.id, feed.id);
    
    if (!feed_follow) {
        throw new Error("Failed to create feed_follow")
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
        console.log(`User: ${feed.userId.name}`)
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

