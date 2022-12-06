
import WiFi from "wifi";
import { ssid, password } from './wifi-credentials'
trace('\n\n\n\n BEGIN \n');

// const connectToNetwork = ({ ssid, password }) => {
//   trace(`credentials: ${ssid} ${password}\n`);
//   let result = false;
//   const wifi = new WiFi({ ssid, password }, msg => {
//     trace(`WiFi Message Trace - ${msg}\n`);
//     switch (msg) {
//       case WiFi.gotIP:
//         trace(`connected\n`);
//         result = true
//         break;

//       case WiFi.disconnected:
//         trace(`disconnected\n`);
//         WiFi.reconnect();
//         break;

//       default:
//         trace(`unknown message: ${msg}\n`);
//         break;
//     }
//   });
//   trace(`about to connect`);P
//   WiFi.connect()
//   trace(`after connect`);
//   // return result
// }
let times = 0
const aps = [];
/*
WiFi.scan({}, ap => {
  if (ap) {
    if (!aps.find(value => ap.ssid == value)) {
      aps.push(ap.ssid);
      trace(` scan: ${ap.ssid}\n`);
    }
  }
});*/
let monitor = new WiFi({ ssid, password }, function (msg, code) {
  trace(`callback: msg ${msg} code ${code}, times: ${++times}\n`);
  switch (msg) {
    case "gotIP":
      trace(`IP address ${Net.get("IP")}\n`);

      monitor = monitor.close();
      return done();

    case "connect":
      trace(`Wi-Fi connected to "${Net.get("SSID")}"\n`);
      return

    case "disconnect":
      trace((-1 === code) ? "Wi-Fi password rejected\n" : "Wi-Fi disconnected\n");
      WiFi.connect({ssid,password});
      return
    default:
      trace(`idk what this is: ${msg}\n`);
  }
});
trace(`monitor is: ${monitor}\n`);
// connectToNetwork({ ssid, password });
