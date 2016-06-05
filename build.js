require('shelljs/global')

const fs = require('fs')
    , path = require('path')
    , archiver = require('archiver')

const nwVersion = '0.15.0'    // The node webkit sdk version to build with
const distPath = 'dist'       // The folder that contains the webpack build files (don't change unless you know what you're doing)
const sorcePath = '.build'    // The temp folder that holds our platform build files
const buildPath = 'builds'    // The output directory our platform builds will be generated to
const platforms = ['win32', 'win64' , 'osx64', 'linux32', 'linux64']   // supported platforms: win32, win64, osx64, linux32, linux64

echo("\nStarting build process. Hold on to your butt!\n")

echo("Cleaning up old build files...\n")

// delete old build files/folders
if(test('-d', distPath)) rm('-rf', distPath)
if(test('-d', sorcePath)) rm('-rf', sorcePath)
if(test('-d', buildPath)) rm('-rf', buildPath)

echo("Copying emoticon assets...\n")

// copy emojify css and emoticons to src
if(!test('-f', 'src/assets/css/emojify.css'))
  cp('-f', 'node_modules/emojify.js/dist/css/basic/emojify.css', 'src/assets/css')
if(!test('-d', 'src/assets/img/emoticons'))
  cp('-rf', 'node_modules/emojify.js/dist/images/basic', 'src/assets/img/emoticons')

echo("Generating wepback assets...\n")

// run wepback build
if(exec('SET PROD_ENV=1 & webpack --progress --hide-modules').code !== 0) {
  echo("\nFailed to complete webpack build. Exiting...")
  exit(1)
}

echo("\nCopying neccessary build files...\n")

// re-create empty source folder
mkdir('-p', sorcePath)

// copy neccessary files and folders to source folder
cp('-rf', [distPath, 'index.html', 'package.json'], sorcePath)

// copy logo file source folder
mkdir('-p', sorcePath+'/src/assets/img')
cp('-f', 'src/assets/img/logo-100x100.png', sorcePath+'/src/assets/img')

// copy emoticons source folder
cp('-rf', 'src/assets/img/emoticons', sorcePath+'/src/assets/img/')

echo("Commencing platform builds...\n")

// run builds for specified platforms
const buildCommand = 'node node_modules/nwjs-builder/bin/nwb nwbuild -v '+nwVersion+'-sdk -p '+platforms.join()+' --output-name "{name}-v{version}-{target}" --win-ico favicon.ico --mac-icns favicon.icns -o '+buildPath+' '+sorcePath
if(exec(buildCommand).code !== 0) {
  echo("\nFailed to complete platform builds. Exiting...")
  rm('-rf', sorcePath)
  exit(1)
}

echo("\nPlatforms successfully built...")

echo("\nCompressing builds to ZIP...\n")

var buildDirs = getDirectories(__dirname + '/' + buildPath)

const dirCount = buildDirs.length
var count = 0

for(var i in buildDirs) {
  var output = fs.createWriteStream(__dirname + '/' + buildPath + '/' + buildDirs[i] + '.zip')
  var archive = archiver('zip');

  archive.on('end', function() {
    count++
    if(count === dirCount)
      cleanup()
  })

  archive.on('error', function(err) {
    throw err
  })

  archive.pipe(output)

  archive.bulk([
    { 
      expand: true,
      cwd: __dirname + '/' + buildPath + '/' + buildDirs[i],
      src: ['**/*']
    }
  ]);
  
  archive.finalize();
}

function cleanup() {
  echo("Removing temporary build files...")

  rm('-rf', sorcePath)
  for(var i in buildDirs) {
    rm('-rf', __dirname + '/' + buildPath + '/' + buildDirs[i])
  }
  
  echo("\nBuild process complete.\n")
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => {
    return fs.statSync(path.join(srcpath, file)).isDirectory()
  })
}