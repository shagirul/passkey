"use client";
import { useContext, useEffect, useState } from "react";
import Header from "../../header";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Hide from "../../assets/hide.svg";
import Show from "../../assets/show.svg";
import { decryptPassword, encryptPassword } from "@/utils/features";
import { Context } from "@/components/client";

export default function page({ params }) {
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [hidepassword, setHidePassword] = useState(true);
  const { user } = useContext(Context);

  const router = useRouter();

  const getHandleDetails = () => {
    fetch(`/api/handle/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          redirect("/"); // Redirect to homepage
          // return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          return; // Handle other cases where data is not available
        }
        if (!data.success) {
          toast.error(data.message);
        } else {
          setTitle(data.handle.title);
          setUid(data.handle.uid);
          const decoded = decryptPassword(data.handle.password, user.password);

          setPassword(decoded);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (params.id && user.password) {
      getHandleDetails();
    }
  }, [params.id]);

  if (!user.password) return redirect("/");

  const deleteHandler = async () => {
    try {
      const res = await fetch(`/api/handle/${params.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.push("/");

      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };
  const updateHandler = async () => {
    const encodedPassword = encryptPassword(password, user.password);

    try {
      const res = await fetch(`/api/handle/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          uid,
          password: encodedPassword,
        }),
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.push("/");

      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("Pasword copied to clipboard");
      })
      .catch((error) => {
        toast.error("Unable to copy text to clipboard:");
      });
  };
  return (
    <main className="flex w-full h-full grow  items-start justify-center pt-20  py-2 gap-5">
      <Header />

      <div className="w-full   px-5 ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4 md:space-y-6 ">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter the Platform Name
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="title"
              name="title"
              id="title"
              className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5     "
              placeholder="instagram, linkedIn, facebook"
              required=""
            ></input>
          </div>
          <div>
            <label
              htmlFor="uid"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter the UID for SignIn
            </label>
            <input
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              type="uid"
              name="uid"
              id="uid"
              className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5     "
              placeholder="e.g @jerry, 88897868908"
              required=""
            ></input>
          </div>
          <div>
            <span className="w-full flex justify-between">
              {" "}
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <p onClick={handleCopy} className="text-xs text-blue-600 font-medium ">Copy</p>
            </span>

            <div className="bg-gray-50 border focus:border-2  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black  w-full    flex ">
              <input
                value={password}
                type={hidepassword ? "password" : "text"}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent p-2.5 rounded-lg focus:outline-none   "
              ></input>
              <Image
                alt="hide/show"
                onClick={() => {
                  setHidePassword(!hidepassword);
                }}
                className="aspect-square mx-4"
                src={hidepassword ? Hide : Show}
              ></Image>
            </div>
          </div>
          <span className="w-full flex justify-between">
            <button
              onClick={deleteHandler}
              className="bg-red-500 text-white font-bold py-2 px-4 min-w-24 rounded "
              type="button"
            >
              Delete
            </button>
            <button
              onClick={updateHandler}
              className="bg-black text-white font-bold py-2 px-4 min-w-24 rounded "
              type="button"
            >
              update
            </button>
          </span>
        </form>
      </div>
    </main>
  );
}
