"use server";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {todos, users} from "@/db/schema"; 



export const getUser = async (userId: number) => {
const user = await db.query.users.findMany(
  {
    where : (users , {eq}) => eq(users.id , userId) , 
    with  : {
      todos: true,
    }
  }
)
return user

}

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};


export const addUser = async () => {
  await db.insert(users).values({ 
    name : "user1",
    email : "yassine@gmail.com",
  });
  revalidatePath("/");
};