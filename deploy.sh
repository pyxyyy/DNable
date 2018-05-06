#!/usr/bin/bash
sudo systemctl status feat |  sed -n 's/.*Main PID: \(.*\)$/\1/g p' | cut -f1 -d' ' | xargs kill -HUP
