# 377-final

# Blendify
<b>accessing blendify:</b>
<br>npm start
<br>type "localhost:8888" into browser
<br>press "log in with spotify"
<br>accept conditions and log in
<br>will be sent to blendhome
<br>artist data should show in console
<br>username of current user should show in console
<br>URL should read as localhost:8888/public/blendhome.html
<br>upon page load, <b><em>your data will upload to supabase</em></b>, so make sure to check that to ensure your data loaded correctly
<br>there will be a button that allows us to get your top artists 
<br>after that button is pressed there will be two new buttons. 
<br>one that is a dropdown that lets you select the genre of music you want based on your top artists
<br>from there you can generate recommended songs based on those genres. 
<br>the recommended songs will apear on a table below the buttons.

<b>errors</b>
<br>
<em>nothing showing on console:</em>
<br>go to network tab and filter for "Fetch/XHR"
<br>check if "token," "artists," and/or "me" went through
<br>token expired, try logging in again (although should handle token refresh)
<br>your ad blocker is enabled - disable for spotify API
<br>
<em>url includes anything other than /public/blendhome.html:</em>
<br>make sure your ad blocker is disabled for the spotifyapi and in the spotify auth page
<br>
<em>annyang voice commands not working:</em>
<br> ensure microphone is enabled for home page
<br> then refresh the page

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
<b>Bugs
<br>some of the recommend songs are repeated 
<br>some of the genres don't have recommendations for them 
<br>
<br>
<b>Future development 
<br> create a playlist for the user based on the recommended songs 
<br> create a chart that shows the top artists 
<br> expand app to be able to accept more than one spotify account to make one blend for several users
<br> use more than top artists data to create more curated blends
<br> expand annyang use to all app pages and integrate to interact with the spotify api more
