import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/login")
  }

  redirect("/dashboard")
 
};

export default ProfilePage;