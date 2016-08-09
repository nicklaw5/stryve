require('shelljs/global')
const pkg = require('../package.json')

const appVersion = pkg.version
const appName = pkg.name
const nwVersion = '0.15.0'    // The node webkit sdk version to build with
const distPath = 'dist'       // The folder that contains the webpack build files (don't change unless you know what you're doing)
const sourcePath = '.build'    // The temp folder that holds our platform build files
const buildPath = 'builds'    // The output directory our platform builds will be generated to
const platforms = ['win32', 'win64' , 'osx64', 'linux32', 'linux64']   // supported platforms: win32, win64, osx64, linux32, linux64

echo("\nStarting build process. Hold on to your butt!\n")

echo("Cleaning up old build files...\n")

// delete old build files/folders
if(test('-d', distPath)) rm('-rf', distPath)
if(test('-d', sourcePath)) rm('-rf', sourcePath)
if(test('-d', buildPath)) rm('-rf', buildPath)

echo("Generating wepback assets...\n")

// run wepback build
if(exec('SET PROD_ENV=1 & webpack --progress --hide-modules').code !== 0) {
  echo("\nFailed to complete webpack build. Exiting...")
  exit(1)
}

echo("\nCopying neccessary build files...\n")

// re-create empty source folder
mkdir('-p', sourcePath)

// copy neccessary files and folders to source folder
cp('-rf', [distPath, 'index.html', 'package.json'], sourcePath)

// copy logo file source folder
mkdir('-p', sourcePath+'/src/assets/img')
cp('-f', 'src/assets/img/logo-100x100.png', sourcePath+'/src/assets/img')

// copy emoticons source folder
cp('-rf', 'src/assets/img/emoticons', sourcePath+'/src/assets/img/')

echo("Commencing platform builds...\n")

// run builds for specified platforms
const buildCommand = 'node node_modules/nwjs-builder/bin/nwb nwbuild -v '+nwVersion+'-sdk -p '+platforms.join()+' --output-name "'+appName+'-v'+appVersion+'-{target}" --output-format ZIP --win-ico favicon.ico --mac-icns favicon.icns -o '+buildPath+' '+sourcePath
if(exec(buildCommand).code !== 0) {
  echo("\nFailed to complete platform builds. Exiting...")
  rm('-rf', sourcePath)
  exit(1)
}

// if(platforms.indexOf('linux32'))
//   addLinuxDeskopLauncher('linux-ia32')

// if(platforms.indexOf('linux64'))
//   addLinuxDeskopLauncher('linux-x64')

echo("\nPlatform(s) successfully built...")

echo("\nRemoving temporary build files...")

rm('-rf', sourcePath)

echo("\nBuild process complete.\n")

// function addLinuxDeskopLauncher(target) {
//   // stryve-v0.4.0-alpha-linux-x64.zip

//   String.prototype.capitalizeFirstLetter = function() {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   }

//   cp('-f', 'scripts/launcher.desktop.template', sourcePath+'/launcher.desktop')
//   sed('-i', '{version}', pkg.version, sourcePath+'/launcher.desktop')
//   sed('-i', '{name}', pkg.name.capitalizeFirstLetter(), sourcePath+'/launcher.desktop')
//   exec('chmod +x '+sourcePath+'/launcher.desktop')  

//   var fs = require('fs')

//   var archiver = require('archiver')

//   var output = fs.createWriteStream(buildPath + '/'+appName+'-v'+appVersion+'-'+target+'.zip')
//   var archive = archiver('zip')

//   output.on('close', function() {
//     console.log(archive.pointer() + ' total bytes')
//     console.log('archiver has been finalized and the output file descriptor has closed.')
//   })

//   archive.on('error', function(err) {
//     throw err
//   })

//   archive.pipe(output)

//   var file1 = sourcePath+'/launcher.desktop'
//   var file2 = 'src/assets/img/logo-100x100.png'

//   archive
//     .append(fs.createReadStream(file1), { name: 'launcher.desktop' })
//     .append(fs.createReadStream(file2), { name: 'logo-100x100.png' })
//     .finalize()
// }