https://gamedecide.onrender.com/

Game Decide is an app to help indecisive gamers figure out what to play. It allows users to make profiles
with their game preferences, make gaming groups, and generate a game that everybody will want to play.
The app contains a database of games that can be updated by the app's users. Each game has a name and year
used to identify it, player count limits, and a platform (either physical or digital). Some games are also
marked as "multiple owner", meaning everyone in the group has to own it to play it. This allows the app to be
used for both board games and video games.
Each instance of a logged-in user can create multiple profiles. Each profile has a name, a library of games they own,
a list of favorite games, and a list of blacklisted games the profile refuses to play.
Users can create and name groups of profiles that they have created.
When generating a game, the user must select a group, a library, and a platform. The library can be set to any, or to
that of a specific group member. The platform can be any, physical, or digital. Given this information, the app
uses weighted random generation to select a game with the correct player count and platform that is not on anyone's
blacklist, prioritizing games that are people's favorites.

Technologies:
React (vite): frontend development
Express: backend development
Axios: frontend & backend communication
MongoDB: data storage in database
MaterialUI & Tailwind: CSS Styling
Passport: Authentication via Github
Render: app deployment

We had a lot of trouble deploying our app. We originally attempted to deploy on Glitch, but found out it didn't support
the latest version of Node, which we were using. We then switched to Render. Render also gave us problems, since we
were using two ports: one for vite and one for the server. We attempted to use Render's solution, which involved
making separate render sites for the frontend and backend, but ran into issues with that too. We solved this problem
by using vite-express and having the server reference a static build of the frontend.
We also had trouble with code refactoring to improve modularity and readability, as well as synchronize Object structure.

Samuel Wilensky: Backend code, database interaction, deployment
Austin Hyatt: Group creation and editing, Game creation and editing
Justin Yip: CreateProfile (Frontend), EditProfile (Frontend), DeleteProfile, EditGame (Frontend), DeleteGame, 
    CreateProfile (Frontend), EditProfile (Frontend), DeleteProfile, Generate (Frontend), Router Setup, 
    Component Setup, Front End Styling, Home Page Hero Section
Nicholas Giangregorio: Authentication (Backend)

https://www.youtube.com/watch?v=BXi7Ktm-7ec