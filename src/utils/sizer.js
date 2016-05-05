const $ = require("jquery");
import * as helpers from './helpers'

let resizeElements  = function() {
	let screenH = helpers.getWindowHeight(),
		screenW = helpers.getWindowWidth(),
		serversListWidth = 80,
		channelsListWidth = 240,
		channelsListHeader = 55,
		channelUsersList = 240,
		channelHeader = 52,
		userInputSpacing = 80,
		userImputContainer = 80,
		userSettingsPanel = 55

	// console.log(screenW + ' - ' + screenH)

	// hide user list
	if(screenW < 1000) {
		$('#channel-users').hide();

		$('#server-list-container').css('height', screenH);
		$('#server-channels-container').css('height', screenH);
		$('#channel-messages-container').css('height', screenH);
		$('#channel-messages-container').css('width', (screenW - channelsListWidth - serversListWidth));

		$('#messages-container').css('height', screenH - userImputContainer - channelHeader);
		$('#messages-container').css('width', screenW - channelsListWidth - serversListWidth);

		$('#channel-messages').css('width', screenW - channelsListWidth - serversListWidth);
		$('#user-input').css('width', screenW - channelsListWidth - serversListWidth);
		$('#channel_message').css('width', screenW - channelsListWidth - serversListWidth - userInputSpacing);
		$('#contact_message').css('width', screenW - channelsListWidth - serversListWidth - userInputSpacing);

		$('#channel-users').css('height', screenH - channelHeader);

		// resize chat channel list
		$('#channels-list').css('height', (screenH - channelHeader - channelsListHeader - userSettingsPanel));
	} else {
		$('#channel-users').show();

		$('#server-list-container').css('height', screenH);
		$('#server-channels-container').css('height', screenH);
		$('#channel-messages-container').css('height', screenH);
		$('#channel-messages-container').css('width', (screenW - channelsListWidth - serversListWidth));

		$('#messages-container').css('height', screenH - userImputContainer - channelHeader);
		$('#messages-container').css('width', screenW - channelsListWidth - serversListWidth - channelUsersList);

		$('#channel-messages').css('width', screenW - channelsListWidth - serversListWidth - channelUsersList);
		$('#user-input').css('width', screenW - channelsListWidth - serversListWidth - channelUsersList);
		$('#channel_message').css('width', screenW - channelsListWidth - serversListWidth - channelUsersList - userInputSpacing);
		$('#contact_message').css('width', screenW - channelsListWidth - serversListWidth - channelUsersList - userInputSpacing);

		$('#channel-users').css('height', screenH - channelHeader);

		// resize chat channel list
		$('#channels-list').css('height', (screenH - channelHeader - channelsListHeader - userSettingsPanel));
	}
}

// resizeElements();

// resize elements on resize event
window.onresize = function(event) {
  	resizeElements();
};

// hide server menu when clicking away
// window.onclick = function(event) {
// 	if(event.target.parentElement.parentElement.id != 'channels-top'
// 		 && event.target.parentElement.id != 'channels-top'
// 		 && !isEmptyObject(app.chat_server)
// 		 && app.serverMenuIsOpen)
		
// 		// hide the server menu
// 		app.toggleServerMenu();
// }