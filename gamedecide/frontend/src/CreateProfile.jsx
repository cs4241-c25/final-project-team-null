
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import ProfileFormComponent from "./components/ProfileFormComponent.jsx";

function CreateProfile() {

    const [newProfile, setNewProfile] = useState({
        username: "",
        profileName: "",
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

    const [searchQuery, setSearchQuery] = useState({
        library: "",
        favorites: "",
        blacklist: ""
    })

    //Testing
    useEffect(() => {
        const data = [
                {name: "Pokemon Rejuvenation", year: 0, minPlayerCount: 0, maxPlayerCount: 0, platform: "", ownershipType: ""},
                {name: "Touhou 7: Perfect Cherry Blossom", year: 0, minPlayerCount: 0, maxPlayerCount: 0, platform: "", ownershipType: ""},
                {name: "Honkai: Star Rail", year: 0, minPlayerCount: 0, maxPlayerCount: 0, platform: "", ownershipType: ""},
                {name: "Miitopia", year: 0, minPlayerCount: 0, maxPlayerCount: 0, platform: "", ownershipType: ""},
                {name: "Warframe", year: 0, minPlayerCount: 0, maxPlayerCount: 0, platform: "", ownershipType: ""},
                {name: "Rivals of Aether", year: 0, minPlayerCount: 0, maxPlayerCount: 0, platform: "", ownershipType: ""}];
        setGames(data);
    }, [])

    useEffect(() => {
        console.log("search: ", searchQuery.library)
    }, [searchQuery.library])

    /*
    useEffect(() => {
        axios.get("/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
            })
            .catch(err => console.log(err));
    }, [])*/

    function handleSubmit(event) {
        event.preventDefault()
        console.log("New Profile:", newProfile);

        /*
        axios.post("/submitprofile", (newProfile))
            .then(res => {

            })
            .catch(err => console.log(err));*/
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewProfile({...newProfile, [name]: value})
    }

    return (
        <>
            <ProfileFormComponent profile={newProfile} games={games}
                                  handleChange={handleChange} handleSubmit={handleSubmit}/>
        </>
        //Form Component - send states as prop
        //Profile Name
        //Games Library
        //Fav Games
        //Blacklisted Games
        //Submit
    )
}

export default CreateProfile
