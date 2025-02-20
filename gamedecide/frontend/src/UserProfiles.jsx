
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import ProfileComponent from "./components/ProfileComponent.jsx";
import RedirectButtonComponent from "./components/RedirectButtonComponent.js";

function UserProfiles({user}) {

    const [userAcc, setUserAcc] = useState({
        username: "",
    });
    //props instead?

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        setUserAcc(user);
        axios.get("/getprofiles/" + userAcc.username) //Username?
            .then(res => {
                const data = res.data;
                setProfiles(data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <section>
                {profiles.map(item => (
                    <ProfileComponent key={item.username} profile={item}/>
                ))}
            </section>
            <RedirectButtonComponent link={"/createprofile"}/>
        </>
        //Map all Profiles
        //New User Button
    )

}

export default UserProfiles
