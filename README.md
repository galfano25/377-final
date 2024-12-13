# 377-final

accessing blendify:
npm start
type "localhost:8888" into browser
press "log in with spotify"
accept conditions and log in
will be sent to blendhome
artist data should show in console
username of current user should show in console
URL should read as localhost:8888/public/blendhome.html

if URL includes a random string of numbers and letters, then make sure your ad blocker is disabled for both the spotify auth and the specific page (/public/blendhome.html)

if not/if error shows:
go to network tab and filter for "Fetch/XHR"
check if "token," "artists," and/or "me" went through
possible errors:
token expired, try logging in again (although should handle token refresh)
your ad blocker is enabled - disable for spotify API
