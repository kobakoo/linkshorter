/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Loader from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebaseConfig";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [boolean, setBoolean] = useState(true);
  async function getData() {
    const docRef = doc(db, "urls", params.linkid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBoolean(true);
      router.push(docSnap.get("url"));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setBoolean(false);
    }
  }
  useEffect(() => {
    getData();
  });
  return (
    <>
      {boolean ? (
        // <Loader
        //   type="Puff"
        //   color="#000"
        //   height={100}
        //   width={100}
        //   timeout={3000} //3 secs
        // />
        <></>
      ) : (
        <div className="flex justify-center items-center justify-items-center my-auto">
          <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 my-auto">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0 my-auto">
              <div className="relative">
                <div className="absolute">
                  <div className="">
                    <h1 className="my-2 text-gray-800 font-bold text-2xl">
                      Looks like you have found the doorway to the great nothing
                    </h1>
                    <p className="my-2 text-gray-800">
                      Sorry about that! Please visit our hompage to get where
                      you need to go.
                    </p>
                    <button
                      className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      Back to home!
                    </button>
                  </div>
                </div>
                <div>
                  <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                </div>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
          </div>
        </div>
      )}
      {/* component */}
    </>
  );
}
