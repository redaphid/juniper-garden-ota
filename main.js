
import WiFi from "wifi";
import {Request} from "http";
import { ssid, password } from './wifi-credentials'
trace('\n\n\n\n BEGIN \n');

const main = async () => {
  trace('main\n');
  await connectToNetwork({ ssid, password });
  trace('connected');
  let request = new Request({ host: "google.com", path: "/", response: String });
  request.callback = function (message, value, etc) {
    if (Request.responseComplete == message) {
      trace(value);
      trace("\n");
    }
  }
}

const connectToNetwork = ({ ssid, password }) => {
  let times = 0;
  return new Promise((resolve, reject) => {
    const monitor = new WiFi({ ssid, password }, function (msg, code) {
      trace(`callback: msg ${msg} code ${code}, times: ${++times}\n`);
      switch (msg) {
        case "gotIP":
          trace('gotIP\n');
          times = 0
          monitor.close();
          resolve(monitor);

        case "connect":
          trace(`Wi-Fi connected to "${ssid}"\n`);
          return

        case "disconnect":
          trace((-1 === code) ? "Wi-Fi password rejected\n" : "Wi-Fi disconnected\n");
          if (times > 10) {
            reject(new Error(`too many attempts`));
            return;
          }
          WiFi.connect({ ssid, password });
          return
        default:
          reject(new Error(`unknown message: ${msg}`));
      }
    });
  })
}

main().catch(err => {
  trace(`error: ${err.message}\n`);
  throw err
});
