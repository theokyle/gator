import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "src/lib/db/schema";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    const limit = args[0] ? parseInt(args[0]) : 2;
    
    const posts = await getPostsForUser(user.id, limit)

    console.log(`Found ${posts.length} for user...`)
    posts.forEach(post => {
        console.log(`${post.publishedAt} from ${post.feedName}`);
        console.log(`--- ${post.title} ---`);
        console.log(`    ${post.description}`);
        console.log(`Link: ${post.url}`);
        console.log(`=====================================`);
    })
}