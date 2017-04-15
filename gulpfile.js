// const gulp = require('gulp');
// const fs = require('fs-extra');
// const rmrf = require('rimraf');
// const spawn = require('child_process').spawn;
// const yargs = require('yargs');


// const www = './www/';
// const androidLocalToBuild = [{
//   fileFrom: './src/platforms/android/AndroidManifest.xml',
//   fileTo: './platforms/android/'
// }, {
//   fileFrom: './src/platforms/android/MainActivity.java',
//   fileTo: './platforms/android/src/com/karedianoorsil/todogrocery/'
// }];

// let PLATFORM = {
//   "1": "android",
//   "2": "ios",
//   "3": "windows",
//   "android": "1",
//   "ios": "2",
//   "windows": "3"
// };

// let currentPlatform = PLATFORM.android;

// errorCallback = (error) => {
//   console.log(error);
// }

// processListener = (process) => {
//   process.stdout.on('data', data => {
//     process.stdout.write(`${data}`);
//   });
//   process.stderr.on('data', data => {
//     process.stdout.write(`${data}`);
//   });
//   process.on('close', code => {
//     process.stdout.write(`child process exited with code ${code}`);
//   });
// }

// consoleStdOut = (data) => {
//   process.stdout.write(`${data}`);
// }

// getBuildType = () => {
//   return yargs.argv.deploy ? 'run ' : 'build ';
// }

// gulp.task('clean', function () {
//   rmrf.sync(www);
//   console.log('cleaning www');
//   let oldMask = process.umask(0);
//   if (!fs.existsSync(www)) {
//     fs.mkdirSync(www, 0777);
//     process.umask(oldMask);
//     fs.closeSync(fs.openSync(www + '.placeholder', 'w'));
//     console.log('preserving placeholder...');
//   }
// });

// gulp.task('restore', function () {
//   let command = process.platform === 'win32' ?
//     spawn('cmd.exe', ['/C', 'ionic platform add android && ionic state restore --plugins']):
//     spawn('/bin/sh', ['-c', 'ionic platform add android && ionic state restore --plugins']);

//   command.stdout.on('data', consoleStdOut);
//   command.stderr.on('data', consoleStdOut);
//   command.on('close', consoleStdOut);
// });

// gulp.task('build', function () {
//   let command = process.platform === 'win32' ?
//     spawn('cmd.exe', ['/C', ['ionic ' + getBuildType() + PLATFORM[currentPlatform]]]) :
//     spawn('/bin/sh', ['-c', ['ionic ' + getBuildType() + PLATFORM[currentPlatform]]])
//   command.stdout.on('data', consoleStdOut);
//   command.stderr.on('data', consoleStdOut);
//   command.on('close', consoleStdOut);
//   console.log('nk--args' + yargs.argv.deploy);
// });

// gulp.task('android', ['clean'], function () {
//   try {
//     androidLocalToBuild.forEach(function (v, i) {
//       let files = fs.readdirSync(v.fileTo)
//       if (files.length > 0) {
//         files.forEach(function (val, ind) {
//           if (fs.statSync(v.fileTo + val).isFile()) {
//             if (v.fileFrom.endsWith(val)) {
//               fs.unlinkSync(v.fileTo + val);
//               console.log('unlink existing file...');
//               console.log('Copying file from ' + v.fileFrom + ' to ' + v.fileTo + val);
//               fs.copySync(v.fileFrom, v.fileTo + val);
//               console.log('Success...');
//             }
//           }
//         });
//       }
//     });
//     currentPlatform = PLATFORM.android;
//     gulp.start('build', function (err) {
//       console.log(err);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// gulp.task('ios', ['clean'], function () {

// });

// gulp.task('windows', ['clean'], function () {

// });
