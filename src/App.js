import React, { useState, useEffect } from "react";
import { AWSService } from "./awsService";
import "./App.css";
import ListAlbums from "./components/ListAlbums";

const awsService = new AWSService();
const bucketFolder = "album1";

const App = () => {
  const [appState, setAppState] = useState({
    photoUrls: [],
    loading: false,
    error: false,
  });

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    awsService.viewAlbum(bucketFolder).then(
      (res) => {
        if (res) {
          setAppState((prevState) => ({
            ...prevState,
            photoUrls: res.photoUrls,
          }));
        }
        setAppState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      },
      (error) => {
        setAppState((prevState) => ({
          ...prevState,
          error: true,
        }));
      }
    );
  }, []);

  return (
    <div className="App">
      <ListAlbums appState={appState} />
    </div>
  );
};

export default App;
