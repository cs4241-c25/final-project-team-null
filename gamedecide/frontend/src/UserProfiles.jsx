
import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/RedirectButtonComponent.jsx";

function UserProfiles({user}) {

    const [profiles, setProfiles] = useState([]);

    useEffect(async () => {
        const username = user.username;
        axios.post("/getprofiles/", (username))
            .then(res => {
                setProfiles(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <h1>User Profiles</h1>
            <section>
                {profiles.map(item => (
                    <ProfileComponent key={item} profile={item}/>
                ))}
            </section>
            <RedirectButtonComponent link={"/createprofile"} text={"Create New Profile"}/>
        </>
    )

}

export default UserProfiles
