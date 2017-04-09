const gulp = require('gulp');
const fs = require('fs-extra');
const rmrf = require('rimraf');
const spawn = require('child_process').spawn;


const www = './www/';
const androidLocalToBuild = [{
  fileFrom: './src/platforms/android/AndroidManifest.xml',
  fileTo: './platforms/android/'
}];

let PLATFORM = {
  "1": "android",
  "2": "ios",
  "3": "windows",
  "android": "1",
  "ios": "2",
  "windows": "3"
};

let currentPlatform = PLATFORM.android;

errorCallback = (error) => {
  console.log(error);
}

processListener = (process) => {
  process.stdout.on('data', data => {
    process.stdout.write(`${data}`);
  });
  process.stderr.on('data', data => {
    process.stdout.write(`${data}`);
  });
  process.on('close', code => {
    process.stdout.write(`child process exited with code ${code}`);
  });
}

consoleStdOut = (data) => {
  process.stdout.write(`${data}`);
}

gulp.task('clean', function () {
  rmrf.sync(www);
  console.log('cleaning www');
  if (!fs.existsSync(www)) {
    fs.mkdirSync(www, 755);
    fs.closeSync(fs.openSync(www + '.placeholder', 'w'));
    console.log('preserving placeholder...');
  }
});

gulp.task('restore', function () {
  let command = process.platform === 'win32' ?
    spawn('cmd.exe', ['/C', 'ionic platform add android && ionic state restore --plugins']) :
    spawn('ionic', ['build', 'ionic', 'platform', 'add', 'android', '&&', 'ionic', 'state', 'restore', '--plugins']);

  command.stdout.on('data', consoleStdOut);
  command.stderr.on('data', consoleStdOut);
  command.on('close', consoleStdOut);
});

gulp.task('build', function () {
  let command = process.platform === 'win32' ?
    spawn('cmd.exe', ['/C', ['ionic build ' + PLATFORM[currentPlatform]]]) :
    spawn('ionic', ['build', PLATFORM[currentPlatform]]);
  command.stdout.on('data', consoleStdOut);
  command.stderr.on('data', consoleStdOut);
  command.on('close', consoleStdOut);
});

gulp.task('android', ['clean'], function () {
  return androidLocalToBuild.forEach(function (v, i) {
    try {
      let files = fs.readdirSync(v.fileTo)
      if (files.length > 0) {
        files.forEach(function (val, ind) {
          if (fs.statSync(v.fileTo + val).isFile()) {
            if (v.fileFrom.endsWith(val)) {
              fs.unlinkSync(v.fileTo + val);
              console.log('unlink existing file...');
              console.log('Copying file from ' + v.fileFrom + ' to ' + v.fileTo + val);
              fs.copySync(v.fileFrom, v.fileTo + val);
              console.log('Success...');
              currentPlatform = PLATFORM.android;
              gulp.start('build', function (err) {
                console.log(err);
              });
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

gulp.task('ios', ['clean'], function () {

});

gulp.task('windows', ['clean'], function () {

});
