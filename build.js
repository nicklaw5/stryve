require('shelljs/global')

const nwVersion = '0.15.0'
const distPath = 'dist'
const sorcePath = '.build'
const buildPath = 'builds'
const platforms = 'win32,win64' // win32,win64,osx32,osx64,linux32,linux64

// delete dist folder if it exists
if (test('-d', distPath)) rm('-rf', distPath)

// delete source folder if it exists
if (test('-d', sorcePath)) rm('-rf', sorcePath)

// delete builds folder if it exists
if (test('-d', buildPath)) rm('-rf', buildPath)

// copy emojify css and emoticons
if(!test('-f', 'src/assets/css/emojify.css'))
  cp('-f', 'node_modules/emojify.js/dist/css/basic/emojify.css', 'src/assets/css')
if(!test('-d', 'src/assets/img/emoticons'))
  cp('-Rf', 'node_modules/emojify.js/dist/images/basic', 'src/assets/img/emoticons')

// run wepback build
if(exec('webpack --progress --hide-modules').code !== 0) {
  echo('Failed to execute wepack build.');
  exit(1);
}

// re-create empty source folder
mkdir('-p', sorcePath)

// copy neccessary files and folders to source folder
cp('-Rf', [distPath, 'index.html', 'package.json', 'favicon.ico'], sorcePath)

// run builds
if(exec('nwb nwbuild -v '+nwVersion+'-sdk -p '+platforms+' --win-ico ./favicon.ico -o '+buildPath+' '+sorcePath).code !== 0) {
  echo('Failed to execute builds.');
  exit(1);
}

// remove source folder
rm('-rf', sorcePath)

echo('Build Process Complete!')
