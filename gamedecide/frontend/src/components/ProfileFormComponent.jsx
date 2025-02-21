import React from "react";
import SubmitButtonComponent from "./SubmitButtonComponent.jsx";
import FormTextFieldComponent from "./FormTextFieldComponent.jsx";

function ProfileFormComponent({profile, filteredGames, search, handleChange, handleSubmit}) {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormTextFieldComponent id="profileName" name="profileName"
                                            label="Profile Name" value={profile.profileName} onChange={handleChange}/>
                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                <SubmitButtonComponent/>
            </form>
        </>
    )

    //Profile Name
    //Games Library
    //Fav Games
    //Blacklisted Games
    //Submit

    //Search Bar
    //Current Games
}

export default ProfileFormComponent