import React, { useState, useEffect } from "react";
import { AWSService } from "../../awsService";
import orderBy from "lodash.orderby";
import "./MainPage.css";
import Navbar from "../Navbar/Navbar";
import ListAlbum from "./ListAlbum";
import {BUCKET_FOLDER} from "../../constants";

const awsService = new AWSService();
const bucketFolder = BUCKET_FOLDER;

const MainPage = () => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    awsService.viewAlbum(bucketFolder).then(
      (res) => {
        if (res) {
          setPhotoUrls(orderBy(res.photoUrls, ["lastModified"], ["asc"]));
        }
        setLoading(false);
      },
      (error) => {
        setError(true);
      }
    );
  }, []);

  return (
    <div>
      <Navbar data={photoUrls} />
      <ListAlbum photos={photoUrls} loading={loading} error={error} />
    </div>
  );
};

export default MainPage;
