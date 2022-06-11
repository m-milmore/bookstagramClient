import React, { useState, useEffect } from "react";
import { AWSService } from "./awsService";
import orderBy from "lodash.orderby";
import "./App.css";
import ListAlbum from "./components/ListAlbum";
import Books from "./components/Books";

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
            photoUrls: orderBy(res.photoUrls, ["lastModified"], ["asc"]),
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
      <h1>Books</h1>
      <ListAlbum appState={appState} />
      <Books />
    </div>
  );
};

export default App;
