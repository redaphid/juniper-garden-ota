#!/usr/bin/env fish
read -l -P "unplug esp pls"
ls /dev | grep tty > /tmp/detect-esp-before
read -l -P "ok now plug it in"
sleep 2
ls /dev | grep tty > /tmp/detect-esp-after
echo "alright, what I saw is:"
diff /tmp/detect-esp-before /tmp/detect-esp-after
