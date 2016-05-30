require('shelljs/global')

const nwVersion = '0.15.0'
const distPath = 'dist'
const sorcePath = '.build'
const buildPath = 'builds'
const platforms = 'win32,win64,osx64,linux32,linux64' // options: win32,win64,osx64,linux32,linux64

echo("\nStarting build process. Hold on to your butt!\n")

// delete dist folder if it exists
if(test('-d', distPath)) rm('-rf', distPath)

// delete source folder if it exists
if(test('-d', sorcePath)) rm('-rf', sorcePath)

// delete builds folder if it exists
if(test('-d', buildPath)) rm('-rf', buildPath)

// copy emojify css and emoticons
if(!test('-f', 'src/assets/css/emojify.css'))
  cp('-f', 'node_modules/emojify.js/dist/css/basic/emojify.css', 'src/assets/css')
if(!test('-d', 'src/assets/img/emoticons'))
  cp('-rf', 'node_modules/emojify.js/dist/images/basic', 'src/assets/img/emoticons')

// run wepback build
if(exec('webpack --progress --hide-modules').code !== 0) {
  echo("\nFailed to complete wepack build. Exiting...")
  // delete source folder
  rm('-rf', sorcePath)
  exit(1)
}

// re-create empty source folder
mkdir('-p', sorcePath)

// copy neccessary files and folders to source folder
cp('-rf', [distPath, 'index.html', 'package.json', 'favicon.ico'], sorcePath)

// run builds for specified platforms
if(exec('node node_modules/nwjs-builder/bin/nwb nwbuild -v '+nwVersion+'-sdk -p '+platforms+' --output-name "{name}-v{version}-{target}" --win-ico ./.build/favicon.ico -o '+buildPath+' '+sorcePath).code !== 0) {
  echo("\nFailed to complete target build process. Exiting...")
  // delete source folder
  rm('-rf', sorcePath)
  exit(1)
}

// remove source folder
rm('-rf', sorcePath)

echo("\nBuild Process Complete!\n")
