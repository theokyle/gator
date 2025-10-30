import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  return db.select().from(users).where(eq(users.name, name));
}

export async function getUsers() {
  return db.select().from(users)
}

export async function deleteUsers() {
  const res = await db.delete(users)
  return res;
}