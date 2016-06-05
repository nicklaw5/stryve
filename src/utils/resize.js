import * as helpers from './helpers'
 
let resizeElements = function () {
  let screenH = helpers.getWindowHeight()
    , screenW = helpers.getWindowWidth()
    , serversListWidth = 80
    , channelsListWidth = 240
    , channelsListHeader = 55
    , channelUsersList = 240
    , channelHeader = 52
    , userInputSpacing = 80
    , userImputContainer = 80
    , userSettingsPanel = 55

    updateStyle('#messages-container', 'height', (screenH - userImputContainer - channelHeader))
    updateStyle('#messages-container', 'width', (screenW - channelsListWidth - serversListWidth))
    updateStyle('#messages-container.channels', 'width', (screenW - channelsListWidth - serversListWidth - channelUsersList))
 
    updateStyle('#contact_message', 'width', (screenW - channelsListWidth - serversListWidth - userInputSpacing))
    updateStyle('#channel-users', 'height', (screenH - channelHeader))
 
    updateStyle('#channels-list', 'height', (screenH - channelHeader - channelsListHeader - userSettingsPanel))
    updateStyle('#contacts-list', 'height', (screenH - channelHeader - userSettingsPanel))

    updateStyle('#server-list-container', 'height', screenH)
    updateStyle('#server-channels-container', 'height', screenH)
    updateStyle('#channel-messages-container', 'height', screenH)
    updateStyle('#channel-messages-container', 'width', screenW - channelsListWidth - serversListWidth)
 
    // hide user list
    if(screenW < 1000) {
      updateStyle('#channel-users', 'display', 'none')

      updateStyle('#channel-messages', 'width', (screenW - channelsListWidth - serversListWidth))
      updateStyle('#user-input', 'width', (screenW - channelsListWidth - serversListWidth))
      updateStyle('#channel_message', 'width', (screenW - channelsListWidth - serversListWidth - userInputSpacing))
      updateStyle('#messages-container.channels', 'width', '100%')
    } else {
      updateStyle('#channel-users', 'display', 'block')

      updateStyle('#channel-messages', 'width', (screenW - channelsListWidth - serversListWidth - channelUsersList))
      updateStyle('#user-input', 'width', (screenW - channelsListWidth - serversListWidth - channelUsersList))
      updateStyle('#user-input.contacts', 'width', (screenW - channelsListWidth - serversListWidth))
      updateStyle('#channel_message', 'width', (screenW - channelsListWidth - serversListWidth - channelUsersList - userInputSpacing))
    }
}

function updateStyle(selector, styleAttribute, value) {
  var element = document.querySelector(selector)
  if(typeof(element) != 'undefined' && element != null)
      element.style[styleAttribute] = value + ((typeof value == 'number')? 'px' : '')
}

// resize elements on resize event
window.onresize = function(event) {
    resizeElements()
}