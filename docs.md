How to install application:

1. Download all the files, and open the directory in VS Code.
2. Run "npm install"
3. Run the following package installations:
   a. npm install express
   b. npm install @supabase/supabase-db
   c. npm install body-parser
   d. npm install path

How to run the application on the server:<br>
Prerequisites:<br>
i. register the app on https://developer.spotify.com/<br>
ii. update the client_id and client_secret to the one assigned to your app<br>
iii. make the redirect uri localhost:8888/public/blendhome.html on both the spotify app configuration and in the blendjava.js file<br>
iv. update the endpoints from the root "https://blendify-pi.vercel.app/" to the root "localhost:8888/"<br>

1. In the command line, type "npm start"
2. Navigate to your browser and type "localhost:8888". You should be directed to the log in page.
3. From here, you will be redirected to the Spotify authentication page and should be able to freely work wtih the Spotify data on the client side.

APIs:
<b>API Calls</b>
<br> get/public/blendhome.html
<br> gets the home page
<br>
<br> get/public/blendabout.html
<br> gets the about page
<br>
<br> get/public/blendhelp.html
<br> gets the help page
<br>
<br> post/usertopartists
<br> posts the users top artists to the supabase
<br>
<br> get/usertopartists
<br> gets the top artists of all the users in the database
<br>
<br>
<b>JS Libraries</b>
<br> Picture Slider on about page
<br> Annyang Voice Commands, available on home page only

<b>Bugs</b>
<br>some of the recommend songs are repeated
<br>some of the genres don't have recommendations for them
<br>

<b>Errors</b>
<br>
<em>site marked as unsafe</em>
<br>we promsie we are not stealing your data!

<em>after log in and redirected to home page, error pops up</em>
<br>simply refresh your page, sometimes the authentication token is not stored correctly

<em>nothing is happening</em>
<br>check to make sure your ad blocker is off for spotify extensions, then log in again.

<em>the data is taking forever to load when I press the "generate genres" button</em>
<br>sometimes the data takes a while, try clicking around and seeing if other elements pop up!

<em>annyang voice commands not working:</em>
<br> ensure microphone is enabled for home page
<br> then refresh the page
<br>
<br>
<b>Future development</b>
<br> create a playlist for the user based on the recommended songs
<br> create a chart that shows the top artists
<br> expand app to be able to accept more than one spotify account to make one blend for several users
<br> use more than top artists data to create more curated blends
<br> expand annyang use to all app pages and integrate to interact with the spotify api more
