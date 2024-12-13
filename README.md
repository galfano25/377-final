# 377-final

<b>accessing blendify:</b>
<br>npm start
<br>type "localhost:8888" into browser
<br>press "log in with spotify"
<br>accept conditions and log in
<br>will be sent to blendhome
<br>artist data should show in console
<br>username of current user should show in console
<br>URL should read as localhost:8888/public/blendhome.html

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
