import React from "react";
import SubmitButtonComponent from "./SubmitButtonComponent.jsx";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";
import GameSearchComponent from "./GameSearchComponent.jsx";
import GameSelectionComponent from "./GameSelectionComponent.jsx";

function ProfileFormComponent({profile, games, functions}) {

    return (
        <>
            <form className="flex flex-col justify-start items-center gap-4 w-full" onSubmit={functions.handleSubmit}>
                <div className="w-full m-4">
                    <FormTextFieldComponent id="name" name="name"
                                            label="Profile Name" value={profile.name} onChange={functions.handleChange}/>
                </div>
                <div className="flex flex-col gap-4 w-full m-4">
                    <GameSearchComponent id="addLibrary" games={games} label="Add Game to Library"
                                         list="library" currentList={profile.library} handleGameAdd={functions.handleGameAdd}/>
                    <h2 className="text-lg font-medium">Current Games in Library</h2>
                    <div className="flex flex-col gap-2">
                        {profile.library.map(game => (
                            <GameSelectionComponent key={game.name + " (" + game.year + ")"} list="library"
                                                    name={game.name} year={game.year}
                                                    handleGameDelete={functions.handleGameDelete}/>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full m-4">
                <GameSearchComponent id="addFavorite" games={games} label="Add Game to Favorites"
                                     list="favorites" currentList={profile.favorites} handleGameAdd={functions.handleGameAdd}/>
                    <h2 className="text-lg font-medium">Current Favorite Games</h2>
                    <div className="flex flex-col gap-2">
                        {profile.favorites.map(game => (
                            <GameSelectionComponent key={game.name + " (" + game.year + ")"} list="favorites"
                                                    name={game.name} year={game.year}
                                                    handleGameDelete={functions.handleGameDelete}/>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full m-4">
                    <GameSearchComponent id="addBlacklist" games={games} label="Add Game to Blacklist"
                                         list="blacklist" currentList={profile.blacklist} handleGameAdd={functions.handleGameAdd}/>
                    <h2 className="text-lg font-medium">Current Blacklisted Games</h2>
                    <div className="flex flex-col gap-2">
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