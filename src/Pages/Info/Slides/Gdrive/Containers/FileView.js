import React, { useEffect, useState } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// import NoFile from '../../../../images/time-animated.gif'
import axios from "axios";

const FileView = ({ data, link }) => {
  const navigate = useNavigate();
  const [uploader, setUploader] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const result = await axios.get(
        `https://section-n-server.vercel.app/user/student/${data?.description}`
      );
      setUploader(result.data);
    };
    getUser();
  }, [data]);

  return (
    <div
      className="w-16 md:w-32 cursor-pointer mx-auto mx"
      onClick={() => navigate(link + `${data.name}/` + data.id)}
    >
      <div className="relative w-full h-20 md:h-28 md:w-28">
        <FontAwesomeIcon
          className="w-full h-20 md:h-28 md:w-28"
          icon={faFolder}
        />
        {uploader?.userData && (
          <div
            className="tooltip absolute bottom-4 right-1 md:bottom-3 md:right-2 z-20"
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
      <p className="text-xs md:text-sm text-center">{data.name}</p>
    </div>
  );
};

export default FileView;
