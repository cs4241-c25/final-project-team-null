
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
    const [filteredGames, setFilteredGames] = useState({
        library: [{
            name: "",
            year: 0,
            minPlayerCount: 0,
            maxPlayerCount: 0,
            platform: "",
            ownershipType: ""
        }],
        favorites: [{
            name: "",
            year: 0,
            minPlayerCount: 0,
            maxPlayerCount: 0,
            platform: "",
            ownershipType: ""
        }],
        blacklist: [{
            name: "",
            year: 0,
            minPlayerCount: 0,
            maxPlayerCount: 0,
            platform: "",
            ownershipType: ""
        }]
    })

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
        setFilteredGames({library: data, favorites: data, blacklist: data});
    }, [])

    /*
    useEffect(() => {
        axios.get("/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
                setFilteredGames({library: data, favorites: data, blacklist: data});
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

    useEffect(() => {
        let updatedList = games;
        updatedList = updatedList.filter(game =>
            game.name.toLowerCase().includes(searchQuery.library.toLowerCase()) ||
            game.year.toString().includes(searchQuery.library)
        )
        setFilteredGames({...filteredGames, library: updatedList});
    }, [games, searchQuery.library]);

    useEffect(() => {
        let updatedList = games;
        updatedList = updatedList.filter(game =>
            game.name.toLowerCase().includes(searchQuery.favorites.toLowerCase()) ||
            game.year.toString().includes(searchQuery.favorites)
        )
        setFilteredGames({...filteredGames, favorites: updatedList});
    }, [games, searchQuery.favorites]);

    useEffect(() => {
        let updatedList = games;
        updatedList = updatedList.filter(game =>
            game.name.toLowerCase().includes(searchQuery.blacklist.toLowerCase()) ||
            game.year.toString().includes(searchQuery.blacklist)
        )
        setFilteredGames({...filteredGames, blacklist: updatedList});
    }, [games, searchQuery.blacklist]);

    const handleSearchChange = (e) => {
        const {name, value} = e.target;
        setSearchQuery({...searchQuery, [name]: value})
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewProfile({...newProfile, [name]: value})
    }

    return (
        <>
            <ProfileFormComponent profile={newProfile} filteredGames={filteredGames} search={handleSearchChange}
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
