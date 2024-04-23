import toast from "react-hot-toast";
import { PasswordTile } from "../components/client";
import Header from "./header";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddIcon from "../public/add.svg"



export default async function Home() {

  const fetchMyHandle = async (token) => {
    try {
      const res = await fetch(`${process.env.URL}/api/myhandles`, {
        cache: "no-store",
        headers: {
          cookie: `token=${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) return [];

      return data.tasks;
    } catch (error) {
      toast.error(error);

      return [];
    }
  };

  const token = cookies().get("token")?.value;
  if (!token) return redirect("/login");
  const handles = await fetchMyHandle(token);

  return (
    <main className="flex w-full h-full grow  items-start pt-20  py-2 gap-5">
      <Header />
      <div className="fixed bottom-0 right-0 p-5">
        <Link
          href={"/addhandle"}
          className="bg-gray-800 text-white rounded-full aspect-square w-12 flex items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H7M7 7H13M7 7V13M7 7V1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      {handles.length <= 0 ? (
        <div className="w-full h-full flex flex-col grow justify-center items-center gap-5">
         <Image className="aspect-auto px-20" src={AddIcon} alt="Start Adding Handles"  ></Image>
         <p className="font-semibold text-xl text-gray-400">Start Adding Your Passwords</p>

        </div>
      ) : (
        <ul className="h-full overflow-y-scroll flex flex-col gap-2 w-full pb-16 px-5  mx-auto max-w-screen-xl">
          {handles.map((handle, index) => {
            return (
              <PasswordTile
                tileId={handle._id}
                key={index}
                Id={handle.uid}
                password={handle.password}
                title={handle.title}
              />
            );
          })}
        </ul>
      )}
    </main>
  );
}
