import { getData } from "@/actions/todoActions";
import { getAllUsers, getUser } from "@/actions/userActions";
import Todos from "@/components/Todos";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user : any = await currentUser()
  if (!user) return 
  const fetchData = await getUser(user?.id)
  console.log(fetchData)
  return (
    fetchData && (
    <main className="flex   items-center justify-between ">
      <Todos todos={fetchData[0].todos } user={fetchData[0]} />
    </main> )
  );
}
