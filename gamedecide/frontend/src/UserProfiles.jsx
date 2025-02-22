import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/RedirectButtonComponent.jsx";

function UserProfiles({user}) {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        axios.post("/backend/getprofiles/", JSON.stringify({"username": user}))
            .then(res => {
                setProfiles(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="w-lg flex flex-col justify-start items-center gap-4">
            <h1>User Profiles</h1>
            <section>
                {profiles.map(item => (
                    <ProfileComponent key={item} profile={item}/>
                ))}
            </section>
            <RedirectButtonComponent link={"/createprofile"} text={"Create New Profile"}/>
        </div>
    )

}

export default UserProfiles
