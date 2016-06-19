require('shelljs/global')

echo("Copying emoticon assets...\n")

// copy emojify css and emoticons to src
if(!test('-f', 'src/assets/css/emojify.css'))
  cp('-f', 'node_modules/emojify.js/dist/css/basic/emojify.css', 'src/assets/css')
if(!test('-d', 'src/assets/img/emoticons'))
  cp('-rf', 'node_modules/emojify.js/dist/images/basic', 'src/assets/img/emoticons')

echo("Done\n")