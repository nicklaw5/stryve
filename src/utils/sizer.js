var $ = require("jquery");

var resizeElementts  = function() {
	var screenH = $(window).height();
	var screenW = $(window).width();
	
	// console.log(screenW + ' - ' + screenH)

	// hide user list
	if(screenW < 1016) {
		$('#channel-users').hide();

		$('#server-list-container').css('height', screenH);
		$('#server-channels-container').css('height', screenH);
		$('#channel-messages-container').css('height', screenH);
		$('#channel-messages-container').css('min-width', (screenW - 80));

		$('#channel-messages > #messages-container').css('height', screenH - 80 - 52);
		$('#channel-messages > #messages-container').css('min-width', screenW - 80 - 240);

		$('#channel-messages > #user-input').css('min-width', screenW - 80 - 240);
		$('#channel-messages > #user-input > #user-input-inner > #user-input-container > #user-message-input > input').css('min-width', screenW - 240 - 80 - 240 - 40 -40);

		$('#channel-users').css('height', screenH - 52);
	} else {
		$('#channel-users').show();

		$('#server-list-container').css('height', screenH);
		$('#server-channels-container').css('height', screenH);
		$('#channel-messages-container').css('height', screenH);
		$('#channel-messages-container').css('min-width', (screenW - 240 - 80));

		$('#channel-messages > #messages-container').css('height', screenH - 80 - 52);
		$('#channel-messages > #messages-container').css('min-width', screenW - 240 - 80 - 240);

		$('#channel-messages').css('min-width', screenW - 240 - 80 - 240);
		$('#channel-messages > #user-input').css('min-width', screenW - 240 - 80 - 240);
		$('#channel-messages > #user-input > #user-input-inner > #user-input-container > #user-message-input > input').css('min-width', screenW - 240 - 80 - 240 - 40 -40);

		$('#channel-users').css('height', screenH - 52);

		// resize chat channel list
		$('#channels-list').css('height', (screenH - 52 - 55 - 55));
	}

	if (typeof app != 'undefined')
		if(!isEmptyObject(app.chat_channel))
			app.adjustEventsContainerHeight();
}

resizeElementts();

// resize elements on resize event
window.onresize = function(event) {
  	resizeElementts();
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