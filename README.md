# grade-tracker

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```
### Miscellaneous issues

If you are running this project in certain environments (some Linux distributions like Ubuntu) you may run into an issue that looks something like:

```
Error: ENOSPC: System limit for number of file watchers reached...
```

Basically, this project is bootstrapped using Create React App, and has system requirements for functionality like hot reloading to work.
To fix this, increase the watch limit for your system as follows:

Ubuntu:
```
$ sudo sysctl fs.inotify.max_user_watches=524288
$ sudo sysctl -p
```

For Debian/RedHat, modify `/etc/sysctl.conf`:
```
sudo echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
```

For Arch Linux, add a new file into `/etc/sysctl.d`:
```
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```