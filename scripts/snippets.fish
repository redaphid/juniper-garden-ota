truncate ota1.bin --size 1003104
mcconfig -d -m -p esp32/nodemcu -t build
esptool.py --port=/dev/ttyUSB0 erase_flash
cp /home/redaphid/Projects/moddable/build/bin/esp32/nodemcu/debug/juniper-gardens-twig-debug/bootloader.bin bin/ota1.bin
