import { auth } from "@/auth";
import { API_BASE_URL } from "../config/api";
import Container from "../ui/Container/Container";
import UserProfileSidebar from "../ui/UserProfileSidebar/UserProfileSidebar";


async function getUser(id: number): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/auth/me/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data as any;
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params:any
}) {
  const token: any = await auth()
  const result = await getUser(token?.user?.id);
  let user_data=null
  if(result?.result){
    user_data=result?.data
  }

  return <Container>
    <div className="flex flex-col lg:flex-row gap-4 items-start py-[10px] md:py-[70px] flex-wrap ">
      <div className=" w-full lg:w-[250px] h-full ">
        <UserProfileSidebar user_data={user_data} verified={result?.data?.email_verified_at} />
      </div>
      <div className="content  flex-1 w-full ">
    

        {
          children
        }
      </div>

    </div>
  </Container>
}