import OTA from "ota";

// Request definition: /home/redaphid/Projects/moddable/modules/network/http/http.js
import {Request} from "http";

const host = "http://192.168.1.103:8080";
const path = "/YOUR/PATH/HERE.bin"

const request = new Request({host, path});
trace(`requesting ${host}${path}\n`);
request.callback = function(message, value, etc) {
  trace(`message: ${message}, value: ${value}, etc: ${etc}\n`);
	switch (message) {
		case Request.status:
			if (200 !== value)
				throw new Error("unexpected http status");
			break;

		case Request.header:
			if ("content-length" === value) {
				try {
					this.byteLength = parseInt(etc);
					this.ota = new OTA({byteLength: this.byteLength});
					this.received = 0;
				}
				catch (e) {
					throw new Error("unable to start OTA: " + e);
				}
			}
			break;

		case Request.responseFragment: {
			const bytes = this.read(ArrayBuffer);
			this.received += bytes.byteLength;
			this.ota.write(bytes);
			trace(`received ${this.received} of ${this.byteLength}\n`);
			} break;

		case Request.responseComplete:
			this.ota.complete();
			trace("ota complete\n");
			break;

		default:
			if (message < 0) {
				this.ota.cancel();
				throw new Error("http error");
			}
			break;
	}
}
