import axios from "axios";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './views/Landing';
import MusicPlayer from './views/MusicPlayer';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage'
import Chat from './components/Chat'
import Nav from "./components/Nav";
import ManipulatePlaylist from "./components/ManipulatePlaylist";
import UsersPlaylists from "./views/UsersPlaylists";
import ManipulateSong from "./components/ManipulateSong";

function App() {
  const [loggedUser, setLoggedUser] = useState({})
  // const [allJewelry, setAllJewelry] = useState([])

  // const getAllJewelry = () => {
  //   axios
  //     .get(`http://localhost:8000/api/jewelry`)
  //     .then((response) => {
  //       console.log("I am get all jewelry!!!")
  //       setAllJewelry(response.data.allJewelry)
  //     })
  //     .catch((err) => {
  //       console.log(err.response)
  //     })
  // }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then((res) => {
        setLoggedUser(res.data.user)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // getAllJewelry()
  }, [])

  return (
    <>
      <div className="App">
        <BrowserRouter>

        <Nav setLoggedUser={setLoggedUser}/>

          <Routes>

            // This will be music related once created & then the 404 on 18 will go away. 

            <Route 
            index element={<Landing 
              setLoggedUser={setLoggedUser} 
            />}/>

            <Route 
              path="/register" 
              element={<Register 
            />} />

            <Route
              path="/login"
              element={<Login 
              setLoggedUser={setLoggedUser} 
            />}/>

            <Route
              path="/homepage"
              element={<Homepage
              // allJewelry={allJewelry}
              // setAllJewelry={setAllJewelry}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              />}/>

            <Route
              path="/chat"
              element={<Chat 
              loggedUser={loggedUser} 
              // getAllJewelry={getAllJewelry} 
              />}/>

            <Route
              path="/music-player"
              element={<MusicPlayer
              loggedUser={loggedUser} 
              // getAllJewelry={getAllJewelry} 
              />}/>

            <Route
              path="/editPlaylist/:playlistId"
              element={<ManipulatePlaylist isEditMode={true}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              // getAllJewelry={getAllJewelry} 
              />}/>

            <Route
              path="/createPlaylist"
              element={<ManipulatePlaylist isEditMode={false}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              // getAllJewelry={getAllJewelry} 
              />}/>

            <Route
              path="/usersPlaylists"
              element={<UsersPlaylists
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              // getAllJewelry={getAllJewelry} 
              />}/>

             <Route
              path="/createSong"
              element={<ManipulateSong isEditMode={false}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              // getAllJewelry={getAllJewelry} 
              />}/>

             <Route
              path="/editSong/:songId"
              element={<ManipulateSong isEditMode={true}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              // getAllJewelry={getAllJewelry} 
              />}/>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
