function someHandleCredsFunction ({ ssid, password }) {
  trace(`ssid: ${ssid}, password: ${password}`);
}

import ImprovWifi from "improv-wifi-mod";
let server = new ImprovWifi({
  deviceName: "M",
  onCredentialsRecieved: someHandleCredsFunction
});
