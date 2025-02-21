import React from "react";
import SubmitButtonComponent from "./SubmitButtonComponent.jsx";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import GameSearchComponent from "./GameSearchComponent.jsx";

function ProfileFormComponent({profile, filteredGames, search, handleChange, handleSubmit}) {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormTextFieldComponent id="profileName" name="profileName"
                                            label="Profile Name" value={profile.profileName} onChange={handleChange}/>
                </div>
                <div>
                    <GameSearchComponent id="addLibrary" games={filteredGames.library} label="Add Game to Library" search={search} name="library"/>

                </div>
                <div>
                    <GameSearchComponent id="addFavorite" games={filteredGames.favorites} label="Add Game to Favorites" search={search} name="favorite"/>

                </div>
                <div>
                    <GameSearchComponent id="addBlacklist" games={filteredGames.blacklist} label="Add Game to Blacklist" search={search} name="blacklist"/>

                </div>
                <SubmitButtonComponent/>
            </form>
        </>
    )

    //Search Bar
    //A way to display all current games
    //Allow you to remove games from list

    //Profile Name
    //Games Library
    //Fav Games
    //Blacklisted Games
    //Submit

    //Search Bar
    //Current Games
}

export default ProfileFormComponent