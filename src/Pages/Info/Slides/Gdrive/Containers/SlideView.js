import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  faEllipsisVertical,
  faCircleArrowDown,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const SlideView = ({ file }) => {
  const [uploader, setUploader] = useState({});
  const [selected, setSelected] = useState("");
  const [loadinguploader, setLoadingUploader] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoadingUploader(true);
      const result = await axios.get(
        `https://section-n-server.vercel.app/user/student/${file?.description}`
      );
      setUploader(result.data);
      setLoadingUploader(false);
    };
    getUser();
  }, [file]);

  return (
    <div
      key={file.id}
      className="relative rounded-t-md cursor-pointer w-48 h-52 md:h-full md:w-72 mb-5 flex flex-col items-center mx-auto"
    >
      <div className="relative w-full">
        <img
          referrerPolicy="no-referrer"
          src={`https://drive.google.com/thumbnail?sz=w400-h400&id=${file.id}`}
          alt=""
          className="w-full h-40 md:h-60 object-top object-cover select-none"
        />

        {loadinguploader ? (
          <span className="animate-pulse h-4 w-4 md:h-6 md:w-6 rounded-full bg-slate-700 absolute bottom-1 right-1 md:bottom-3 md:right-2 z-20"></span>
        ) : (
          <div
            className="tooltip absolute bottom-1 right-1 md:bottom-3 md:right-2 z-20"
            data-tip={uploader?.name}
          >
            <img
              className="h-4 w-4 md:h-6 md:w-6 rounded-full object-cover"
              src={uploader?.userData?.photoURL}
              alt="uploader"
            />
          </div>
        )}
      </div>

      <div className="bg-base-200 p-3 w-full h-full max-h-14 gap-2 flex items-center border rounded-b-md">
        <img className="my-auto" src={file.iconLink} alt="" />
        <p className="text-sm break-all">
          {file.name?.length > 30
            ? file.name.substring(0, 30) + "..."
            : file.name}
        </p>
        <FontAwesomeIcon
          className="ml-auto w-4 rounded-full p-1 active:bg-base-300"
          icon={faEllipsisVertical}
          onClick={() =>
            setSelected((prev) => (prev === file.id ? "" : file.id))
          }
        />
      </div>

      {selected === file.id && (
        <div
          className="shadow-md px-1 py-2 rounded-md w-44 absolute -bottom-16 z-10 -right-5 bg-base-100"
          onBlur={() => console.log("blurred")}
          onClick={() => setSelected("")}
        >
          <a href={file.webContentLink} target="_blank" rel="noreferrer">
            <p className="flex items-center hover:bg-base-300 my-1 px-3 py-1 rounded-md">
              <FontAwesomeIcon className="pr-2" icon={faCircleArrowDown} />
              Download
            </p>
          </a>
          <a href={file.webViewLink} target="_blank" rel="noreferrer">
            <p className="flex items-center hover:bg-base-300 my-1 px-3 py-1 rounded-md">
              <FontAwesomeIcon className="pr-2" icon={faEye} />
              Open
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

export default SlideView;
