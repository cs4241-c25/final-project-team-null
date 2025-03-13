import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import H1Component from "./components/TypographyComponents/H1Component.jsx";
import ProfileFormComponent from "./components/ProfileFormComponent.jsx";
function EditProfile({user}) {

    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        oldname: "",
        favorites: [],
        blacklist: [],
    });
    const location = useLocation();

    useEffect(() => {
        const {name} = location.state || {};
        console.log("name: ", name)
        axios.post("/editprofile/", JSON.stringify({name: name}))
            .then(res => {
                const newProfile = res.data;
                console.log(newProfile);
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
        minPlayerCount: 0,
        maxPlayerCount: 0,
    }]);


    useEffect(() => {
        axios.post("/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
            })
            .catch(err => console.log(err));
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Updated Profile:", profile);


        axios.post("/updateprofile", JSON.stringify(profile))
            .then(res => {
                console.log("res: ", res.data);
                navigate("/userprofiles");
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value})
    }

    function handleGameDelete(list, name, year) {
        let gameList;
        if(list === "favorites") {
            gameList = profile.favorites.filter(game => !(game.name === name));
        }
        else if(list === "blacklist") {
            gameList = profile.blacklist.filter(game => !(game.name === name));
        }
        else
        {
            return null;
        }
        setProfile({...profile, [list]: gameList})
    }

    function handleGameAdd(list, name, year) {
        let game;
        if(list === "favorites") {
            game = games.find(g => g.name === name);
            const newList = profile.favorites;
            newList.push(game);
            setProfile({...profile, favorites: newList})
        }
        else if(list === "blacklist") {
            game = games.find(g => g.name === name);
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
        <Container maxWidth="sm" className="flex flex-col justify-center items-center gap-4 my-8">
            <H1Component text={"Edit Profile"}/>
            <ProfileFormComponent profile={profile} games={games}
                                  functions={{handleChange: handleChange, handleSubmit: handleSubmit,
                                      handleGameAdd: handleGameAdd, handleGameDelete: handleGameDelete}}/>
        </Container>
    )

}

export default EditProfile
