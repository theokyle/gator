import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { createFeedFollow, deleteFeedFollow, getFeedFollowsForUser } from "src/lib/db/queries/feed_follows";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const feedUrl = args[0].trim();
    const feed = await getFeedByURL(feedUrl)

    if (!feed) {
        throw new Error(`Feed ${feedUrl} not found`)
    }

    const feed_follow = await createFeedFollow(user.id, feed.id);

    if (!feed_follow) {
        throw new Error("Failed to create feed_follow")
    }

    console.log(`User ${feed_follow.userName} successfully followed ${feed_follow.feedName}`)
}

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    const follows = await getFeedFollowsForUser(user.id);
    if (follows.length === 0) {
        console.log(`No feed follows for this user`)
        return;
    }

    console.log(`User ${follows[0].userName} is following...`)
    follows.forEach(follow => {
        console.log(`- ${follow.feedName}`)
    })
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const feedUrl = args[0];
    const feed = await getFeedByURL(feedUrl);
    if (!feed) {
        throw new Error(`failed to retrieve feed ${feedUrl}`)
    }

    const deleted = await deleteFeedFollow(user.id, feed.id)
    if (!deleted) {
        throw new Error(`failed to remove feed`)
    }

    console.log(`${feedUrl} unfollowed`)
}