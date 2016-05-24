# Stryve
A self-hosted chat/messaging application, heavily inspired by [Discord](https://discordapp.com/) and [Slack](https://slack.com/). Stryve comes as both a browser-based and desktop (Windows, MacOS & Linux) application.

## Usage
Please see the [Gettting Started](https://github.com/nicklaw5/stryve/wiki/Getting-Started) tutorial for a full installation guide.
```bash
$ git clone https://github.com/nicklaw5/stryve.git      # clone the repo
$ npm install                                           # intsall dependencies
$ npm run server-dev                                    # start the socket.io server in debug mode
$ npm run w-app                                         # starts the web client on http://localhost:8080/
$ npm install nw -g                                     # (destkop app only) install node-webkit globally
$ npm run build                                         # (destkop app only) build the desktop app asset file
$ npm run d-app                                         # (destkop app only) starts the desktop app
```

## Getting Started
The getting started tutorial can be here - https://github.com/nicklaw5/stryve/wiki/Getting-Started

## Current Feature List
- User to user private messaging.
- Multi-user, channel messaging.
- Pin and unpin users to your contacts list.
- Each user can have unlimited servers.
- Each server can have unlimited channels.
- Users can be invited to another user's server via a unique token.
- Emoticons are supported ([full list found here](http://hassankhan.me/emojify.js/)).
- Hyperlinks are supported (open in new tab by default).
- Desktop notifications.
- Desktop App (supports Windows, MacOS & Linux).

## Current Limitations
- **Browser Support** - I have only tested the app on the latest version of Google Chrome. Other browsers have some CSS glitches that need to be rectified. Mobile devices are also unsupported in the app's current state.
- **Message Notifications** - At the moment there are no notifications that tell you when someone has sent you a private message or channel message. This is likely be rectified in the next release.
- I'm sure there's others I can't quite think of right now. Keep in mind the app is currently at a early alpha stage.

## In The Works
- **Desktop App Builds** - Currently working on the  both 32 & 64-bit builds for Windows, MacOS and Linux. Current using [NW.js](http://nwjs.io/), but now that [Electron](http://electron.atom.io/) is at a v1.0 state I may decide to switch. Any recommendations/suggestions for this?
- **Voice Communication** - To be a true alternative to Discord we obviously need voice communication. Now that the text chat feature is at a point where it works (though there are many improvements that can be made), we can start implementing the voice chat. I am not experienced with working with audio codecs, so this will be a learning curve for me personally.
- **User Permissions** - As is stands there are basically no permissions setup. This will be one the next major tasks. So that users that own a server can provide other users with permission to create/remove channels, ban users, adjust server settings, etc.
- **Notifications** - There are some desktop notifications currently configured, but there are many that still need to be implemented, including the playing of audio sounds when new notifications are received.
- **Code Snippets** - I personally would love to have this feature.
- **Online/Offline Users List** - Each server will show who is currently online/offline/away.
- Edit Messages - Users will have the option to edit their sent messages.
- **Image/Attachment Uploads** - This is also a necessity.
- Many many more. See full [feature list here](https://github.com/nicklaw5/stryve/issues?q=is%3Aissue+is%3Aopen+label%3A%22feature+request%22).

## Issues and PR's
Stryve is under development. Issues and pull requets are vey welcome. Please [report any issues here](https://github.com/nicklaw5/stryve//issues).
