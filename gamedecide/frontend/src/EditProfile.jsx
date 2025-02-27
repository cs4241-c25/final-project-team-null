import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ProfileFormComponent from "./components/ProfileFormComponent.jsx";
function EditProfile({user}) {

    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        username: "",
        name: "",
        oldname: "",
        library: [],
        favorites: [],
        blacklist: [],
    });
    const location = useLocation();

    useEffect(() => {
        const {username, name} = location.state || {};
        console.log("username: ", username)
        console.log("name: ", name)
        axios.post("/backend/editprofile/", JSON.stringify({"username": user, "name": name}))
            .then(res => {
                const newProfile = res.data;
                newProfile.oldname = name;
                setProfile(newProfile);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log("profile: ", profile)
    }, [profile])

    const [games, setGames] = useState([{
        name: "",
        year: 0,
        minPlayerCount: 0,
        maxPlayerCount: 0,
        platform: "",
        ownershipType: ""
    }]);


    useEffect(() => {
        axios.post("/backend/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
            })
            .catch(err => console.log(err));
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Updated Profile:", profile);


        axios.post("/backend/updateprofile", JSON.stringify(profile))
            .then(res => {
                console.log("res: ", res.data);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value})
    }

    function handleGameDelete(list, name, year) {
        let gameList;
        if(list === "library") {
            gameList = profile.library.filter(game => !(game.name === name && game.year === year));
        }
        else if(list === "favorites") {
            gameList = profile.favorites.filter(game => !(game.name === name && game.year === year));
        }
        else if(list === "blacklist") {
            gameList = profile.blacklist.filter(game => !(game.name === name && game.year === year));
        }
        else
        {
            return null;
        }
        setProfile({...profile, [list]: gameList})
    }

    function handleGameAdd(list, name, year) {
        let game;
        if(list === "library") {
            game = games.find(g => g.name === name && g.year === year);
            const newList = profile.library;
            newList.push(game);
            setProfile({...profile, library: newList})
        }
        else if(list === "favorites") {
            game = games.find(g => g.name === name && g.year === year);
            const newList = profile.favorites;
            newList.push(game);
            setProfile({...profile, favorites: newList})
        }
        else if(list === "blacklist") {
            game = games.find(g => g.name === name && g.year === year);
            const newList = profile.blacklist;
            newList.push(game);
            setProfile({...profile, blacklist: newList})
        }
        else
        {
            return null;
        }
    }

    return (
        <Container maxWidth="sm" className="flex flex-col justify-start items-center gap-4">
            <H1Component text={"Edit Profile"}/>
            <ProfileFormComponent profile={profile} games={games}
                                  functions={{handleChange: handleChange, handleSubmit: handleSubmit,
                                      handleGameAdd: handleGameAdd, handleGameDelete: handleGameDelete}}/>
        </Container>
    )

}

export default EditProfile
