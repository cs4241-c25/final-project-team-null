
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import ProfileFormComponent from "./components/ProfileFormComponent.jsx";

function CreateProfile({user}) {

    const [newProfile, setNewProfile] = useState({
        username: user,
        name: "",
        library: [],
        favorites: [],
        blacklist: [],
    });

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
        console.log("New Profile:", newProfile);


        axios.post("/backend/submitprofile", JSON.stringify(newProfile))
            .then(res => {
                console.log("res: ", res.data);
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewProfile({...newProfile, [name]: value})
    }

    function handleGameDelete(list, name, year) {
        let gameList;
        if(list === "library") {
            gameList = newProfile.library.filter(game => !(game.name === name && game.year === year));
        }
        else if(list === "favorites") {
            gameList = newProfile.favorites.filter(game => !(game.name === name && game.year === year));
        }
        else if(list === "blacklist") {
            gameList = newProfile.blacklist.filter(game => !(game.name === name && game.year === year));
        }
        else
        {
            return null;
        }
        setNewProfile({...newProfile, [list]: gameList})
    }

    function handleGameAdd(list, name, year) {
        let game;
        if(list === "library") {
            game = games.find(g => g.name === name && g.year === year);
            const newList = newProfile.library;
            newList.push(game);
            setNewProfile({...newProfile, library: newList})
        }
        else if(list === "favorites") {
            game = games.find(g => g.name === name && g.year === year);
            const newList = newProfile.favorites;
            newList.push(game);
            setNewProfile({...newProfile, favorites: newList})
        }
        else if(list === "blacklist") {
            game = games.find(g => g.name === name && g.year === year);
            const newList = newProfile.blacklist;
            newList.push(game);
            setNewProfile({...newProfile, blacklist: newList})
        }
        else
        {
            return null;
        }
    }

    return (
        <>
            <ProfileFormComponent profile={newProfile} games={games}
                                  functions={{handleChange: handleChange, handleSubmit: handleSubmit,
                                  handleGameAdd: handleGameAdd, handleGameDelete: handleGameDelete}}/>
        </>
    )
}

export default CreateProfile
