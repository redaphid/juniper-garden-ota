
import WiFi from "wifi";
import { Request } from "http";
// import OTA from "ota";

import { ssid, password } from './wifi-credentials'
trace('\n\n\n\n BEGIN \n');

const main = async () => {
  trace('main\n');
  await connectToNetwork({ ssid, password });
  trace('connected\n');
  const firmware = await downloadOTAFirmware();
  trace('downloaded\n');
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

const downloadOTAFirmware = async () => {
  trace('downloadOTAFirmware\n');
  let ota = null;
  let byteLength = -1;
  let received = 0;

  return new Promise((resolve, reject) => {
    let request = new Request({ host: "192.168.1.103", port: 8080, path: "/" });
    request.callback = function (message, value, etc) {
      switch (message) {
        case Request.status:
          if (200 !== value)
            reject(Error("unexpected http status"))
          break;

        case Request.header:
          if ("content-length" === value) {
            try {
              byteLength = parseInt(etc);
              ota = new OTA({ byteLength });
              received = 0;
            }
            catch (e) {
              reject(new Error("unable to start OTA: " + e));
            }
          }
          break;

        case Request.responseFragment: {
          const bytes = read(ArrayBuffer);
          received += bytes.byteLength;
          ota.write(bytes);
          trace(`received ${received} of ${byteLength}\n`);
        } break;

        case Request.responseComplete:
          ota.complete();
          trace("ota complete\n");
          resolve();
          break;

        default:
          if (message < 0) {
            ota.cancel();
            reject(new Error("http error"));
          }
          break;
      }
    }
  })
}


main().catch(err => {
  trace(`error: ${err.message}\n`);
  throw err
});
