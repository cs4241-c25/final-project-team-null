import React from "react";
import SubmitButtonComponent from "./SubmitButtonComponent.jsx";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import GameSearchComponent from "./GameSearchComponent.jsx";
import GameSelectionComponent from "./GameSelectionComponent.jsx";

function ProfileFormComponent({profile, games, functions}) {

    return (
        <>
            <form onSubmit={functions.handleSubmit}>
                <div>
                    <FormTextFieldComponent id="profileName" name="profileName"
                                            label="Profile Name" value={profile.profileName} onChange={functions.handleChange}/>
                </div>
                <div>
                    <GameSearchComponent id="addLibrary" games={games} label="Add Game to Library"
                                         list="library" currentList={profile.library} handleGameAdd={functions.handleGameAdd}/>
                    <h2>Current Games in Library</h2>
                    <div>
                        {profile.library.map(game => (
                            <GameSelectionComponent key={game.name + " (" + game.year + ")"} list="library"
                                                    name={game.name} year={game.year}
                                                    handleGameDelete={functions.handleGameDelete}/>
                        ))}
                    </div>
                </div>
                <div>
                <GameSearchComponent id="addFavorite" games={games} label="Add Game to Favorites"
                                     list="favorites" currentList={profile.favorites} handleGameAdd={functions.handleGameAdd}/>
                    <h2>Current Favorite Games</h2>
                    <div>
                        <h2></h2>
                        {profile.favorites.map(game => (
                            <GameSelectionComponent key={game.name + " (" + game.year + ")"} list="favorites"
                                                    name={game.name} year={game.year}
                                                    handleGameDelete={functions.handleGameDelete}/>
                        ))}
                    </div>
                </div>
                <div>
                    <GameSearchComponent id="addBlacklist" games={games} label="Add Game to Blacklist"
                                         list="blacklist" currentList={profile.blacklist} handleGameAdd={functions.handleGameAdd}/>
                    <h2>Current Blacklisted Games</h2>
                    <div>
                        {profile.blacklist.map(game => (
                            <GameSelectionComponent key={game.name + " (" + game.year + ")"} list="blacklist"
                                                    name={game.name} year={game.year}
                                                    handleGameDelete={functions.handleGameDelete}/>
                        ))}
                    </div>
                </div>
                <SubmitButtonComponent/>
            </form>
        </>
    )
}

export default ProfileFormComponent