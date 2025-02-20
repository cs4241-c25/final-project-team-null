
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function CreateProfile() {

    const [newProfile, setNewProfile] = useState({
        username: "",
        profileName: "",
        library: {},
        favorites: {},
        blacklist: {},
    });
    const [games, setGames] = useState([]);
    const [gamesLibrary, setGamesLibrary] = useState([]);
    const [favoriteGames, setFavoriteGames] = useState([]);
    const [blacklistedGames, setBlacklistedGames] = useState([]);

    const [librarySearch, setLibrarySearch] = useState("");
    const [favoritesSearch, setFavoritesSearch] = useState("");
    const [blacklistSearch, setBlacklistSearch] = useState("");

    useEffect(() => {
        axios.get("/findgame")
            .then(res => {
                const data = res.data;
                setGames(data);
                setFavoriteGames(data);
                setBlacklistedGames(data);
            })
            .catch(err => console.log(err));
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        axios.post("/submitprofile", (newProfile))
            .then(res => {

            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        let updatedList = games;
        if(librarySearch) {
            updatedList = updatedList.filter(game =>
                game.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
                game.year.toString().includes(librarySearch)
            )
        }

        setGamesLibrary(updatedList);
    }, [gamesLibrary, librarySearch]);

    useEffect(() => {

    }, [favoriteGames, favoritesSearch]);

    useEffect(() => {

    }, [blacklistedGames, blacklistSearch]);

    const handleLibrarySearch = (e) => {
        setLibrarySearch(e.target.value);
    }

    const handleFavoritesSearch = (e) => {
        setFavoritesSearch(e.target.value);
    }

    const handleBlacklistSearch = (e) => {
        setBlacklistSearch(e.target.value);
    }

    return (
        <>
            <ProfileFormComponent profile={newProfile} gamesLibrary={gamesLibrary}
                                  favoriteGames={favoriteGames} blacklistedGames={blacklistedGames}
                                  librarySearch={handleLibrarySearch} favoritesSearch={handleFavoritesSearch}
                                  blacklistSearch={handleBlacklistSearch} action={handleSubmit}/>
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
