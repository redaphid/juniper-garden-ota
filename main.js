import ImprovWifi from "improv-wifi-mod";

let server = new ImprovWifi({
  deviceName: "M",
  onCredentialsRecieved: someHandleCredsFunction
});

function someHandleCredsFunction ({ ssid, password }) {
  console.log('o hi there');
  // Handle the credentials here
}
