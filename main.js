function someHandleCredsFunction ({ ssid, password }) {
  trace(`someHandleCredsFunction: ssid: ${ssid}, password: ${password} \n`);
  if(password === 'orangejuice') return true
  return false
}

import ImprovWifi from "improv-wifi-mod";
let server = new ImprovWifi({
  deviceName: "M",
  onCredentialsRecieved: someHandleCredsFunction
});
