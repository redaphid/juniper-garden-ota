## Intro
Hello, and welcome to this mvp ota esp update project, with plenty of other tla's thrown in for good measure!
This was quite a challenge, but we have a half-working proof of concept, and we're excited to share it with whoever will look at it.

tl;dr OTA updates in this project work, but we don't yet know how to generate the ota image correctly, so we're using a random one we found online.
There is a way to tell that the OTA update is working, though, and we'll get to that later.

## Usage
1. create a file called `wifi-credentials.js` in the `src/` of the project
1. add the following code to the file:
```js
export const ssid = '<your-ssid>'
export const password = '<your-password>'
```
1. `npm i` (obviously, I guess :) )
1. `npm run serve-ota` to start serving that random ota binary we found. This keeps a hold of the terminal, so you'll need to open a new one for the next step.
1. `npm run upload` to upload the project to the esp32
1. run `esptool.py --port=/dev/ttyUSB0 erase_flash` to update the partition table on the esp32
1. Watch as the `serve-ota` thread serves up that `clock.update.current` binary.
1. Watch as the esp32 flashes the binary and reboots.
1. Watch how, after unplugging and plugging the esp32 back in, it doesn't contact the `serve-ota` server anymore, and instead is doing whatever that random binary wants it to do.
1. Be impressed at this new, fancy way to brick your esp32! (jk, you can flash it again with `npm run upload`)

## Next Steps
 * obviously we need to figure out how to generate the ota binary correctly
 * without any more research, we'd advocate using [this example ota project](https://blog.moddable.com/blog/clock-project/) as a starting point for the OTA architecture.

## Warnings!
* You may need to run `npm run clean` to fix some issues with the build process.
* you may need to run `esptool.py --port=/dev/ttyUSB0 erase_flash` after flashing the esp32 the first time, so the partition table gets written correctly.


# Links to Remember:
* [Example OTA Update Project](https://blog.moddable.com/blog/clock-project/)
* [Moddable SDK](https://github.com/Moddable-OpenSource/moddable)
* [improv wifi standard we're trying to implement](https://www.improv-wifi.com)
* [improv-wifi-mod that handles the improv handshake](https://github.com/juniper-garden/improv-wifi-mod)
* [static size check in the ble library that we need to comment out](https://github.com/Moddable-OpenSource/moddable/blob/7276ac7ba2d3d5e28301faf9e0a918ee415e2c57/modules/network/ble/btutils.js#L441)
* [primary repo for the esp](https://github.com/juniper-garden/twig_esp32_mod)
* [Chrome Bluetooth Inspector](chrome://bluetooth-internals)
* [gitter channel for moddable that's super responsive](https://gitter.im/embedded-javascript/moddable)
