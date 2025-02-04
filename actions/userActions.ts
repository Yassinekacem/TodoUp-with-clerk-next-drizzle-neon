"use server";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {todos, users} from "@/db/schema"; 
import { clerkClient } from "@clerk/nextjs/server";



export const getUser = async (userId: any) => {
const user = await db.query.users.findMany(
  {
    where : (users , {eq}) => eq(users.clerkId , userId) , 
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


export const addUser = async (user : any) => {
  await db.insert(users).values({ 
    clerkId : user?.clerkId,
    email : user?.email,
    name : user?.name!,  
    firstName : user?.firstName,  
    lastName : user?.lastName,
    photo : user?.photo
  })
  .returning({clerkClientId : users?.clerkId})
  // revalidatePath("/");
};