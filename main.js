import ImprovWifi from "improv-wifi-mod";
let server = new ImprovWifi({
  deviceName: "M",
  onCredentialsRecieved: someHandleCredsFunction
});

function someHandleCredsFunction ({ ssid, password }) {
  // Handle the credentials here
}
