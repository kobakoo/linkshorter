"use client";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import toast, { Toaster } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function ExampleComponent() {
  const [urlBoolean, setUrlBoolean] = useState(false);
  const [text, setText] = useState("");
  const [randomText, setRandomText] = useState("");
  const [shorterLink, setShorterLink] = useState("");
  const pattern = /^(https?|ftp)(:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+)/;
  function setUrl(value) {
    setText(value);
    console.log(text);
    const result = pattern.test(value);
    setUrlBoolean(result);
  }

  // console.log(Math.random().toString(32).substring(2));
  function generateRandomText() {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var N = 8;
    const nowRandomText = Array.from(Array(N))
      .map(() => S[Math.floor(Math.random() * S.length)])
      .join("");
    setRandomText(nowRandomText);
    return nowRandomText;
  }

  async function urlShorter() {
    try {
      if (urlBoolean) {
        const docRef = doc(db, "urls", generateRandomText());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          generateRandomText();
        }
        await setDoc(doc(db, "urls", randomText), {
          url: text,
          id: randomText,
        });
        toast.success("リンクが変換されました!");
        setShorterLink(`https://link.kobakoo.com/${randomText}`);
      } else {
        toast.error("URLが入力されていないか、間違っています💦");
      }
    } catch (err) {
      toast.error("申し訳ありません🙇。もう一度試してみてください");
    }
    //  generateRandomText();
  }

  async function copyToClipboard() {
    await global.navigator.clipboard.writeText(shorterLink);
    toast.success("コピーされました！");
  }

  return (
    <div className="m-5 flex">
      <Toaster />
      <Tooltip id="my-tooltip" />
      <div className="lg:w-1/3 md:w-1/2 sm:mx-auto sm:w-9/12 w-full h-64 my-auto items-center justify-center">
        <TypeAnimation
          sequence={[
            "リンクを変換します", // Types 'One'
            1500, // Waits 1s
            "Link", // Deletes 'One' and types 'Two'
            2000, // Waits 2s
            "Link Shorter", // Types 'Three' without deleting 'Two'
            800, // Waits
            () => {
              console.log("Sequence completed");
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="lg:text-5xl sm:text-4xl text-4xl font-bold mx-auto w-min md:w-2/3 max-w-full"
        />
        <div className=" md:mt-4 sm:mt-3 mt-2">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {urlBoolean ? (
              <p className=" text-indigo-400">✅ URLが入力されました</p>
            ) : (
              <p className=" text-red-400">⚠️ URLが入力されていません</p>
            )}
          </label>
          <input
            id="first_name"
            className={
              urlBoolean
                ? `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500`
                : `bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 bg-red-600/50 border-red-500/50 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500`
            }
            placeholder="https://"
            value={text}
            onPaste={(e) => setUrl(e.target.value)}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            className="text-white bg-indigo-400 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 mt-4 transition"
            onClick={() => {
              urlShorter();
            }}
          >
            短縮する
          </button>
        </div>
        {shorterLink !== "" && (
          <div className="p-3 w-full bg-slate-100 border-slate-600/80 border-2 rounded-md flex justify-between">
            <a href={shorterLink} target="_blank" className="">
              {shorterLink}
            </a>
            <button
              className="w-3 h-3 mr-2"
              onClick={() => {
                copyToClipboard();
              }}
            >
              <a
                className=""
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Copy"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  className="p-0.5 hover:bg-gray-300 rounded-md"
                >
                  <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
