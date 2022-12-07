#!/usr/bin/env fish
source $IDF_PATH/export.fish
esptool.py --port=/dev/ttyUSB0 erase_flash
mcconfig -d -m -p esp32/nodemcu
