import { create } from "domain";
import { relations } from "drizzle-orm";
import { integer, text, boolean, pgTable, timestamp , serial , bigint} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: bigint("id" , {mode : "number"}).primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  userId : integer("user_Id").notNull().references(() => users.id) , 
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  clerkId : text("clerkId").notNull(), 
  firstName : text("firstName").notNull() , 
  lastName : text("lastName").notNull() ,
  photo : text("photo").notNull(),
  email: text("email").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),

}) 



export const todosRelations = relations ( todos , ({one}) => ({ 
  user : one(users , {fields : [todos.userId] , references : [users.id]} )
})  ) 


export const userRelations = relations ( users , ({many}) => ({ 
  todos : many(todos)
})  )


