import dgram from "dgram";
import EventEmitter from "events";

export default class SyslogServer extends EventEmitter {

    private server: dgram.Socket;
    private status: boolean;

    constructor() {
        super();
        this.status = false;
        this.server = dgram.createSocket("udp4");
    }

    public start(options = { port: 514, address: "0.0.0.0", exclusive: true }, cb?: (error?: object) => void) {
        console.info(`starting Syslog Server with options: ${JSON.stringify(options)}`);

        return new Promise((resolve, reject) => {
            if (this.status === true) {
                const errorObj = this.createErrorObject(null, "NodeJS Syslog Server is already running!");
                if (cb) { return cb(errorObj); }
                return reject(errorObj);
            } else {

                // Socket listening handler
                this.server.on("listening", () => {
                    this.status = true;
                    this.emit("start");
                });

                // Socket error handler
                this.server.on("error", (err) => {
                    this.emit("error", err);
                });

                // Socket message handler
                this.server.on("message", (msg, remote) => {
                    const message = {
                        date: new Date(),
                        host: remote.address,
                        message: msg.toString("utf8"),
                        protocol: remote.family,
                    };
                    this.emit("message", message);
                });

                // Socket close handler
                this.server.on("close", () => {
                    this.status = false;
                    this.emit("stop");
                });

                this.server.bind(options, (err: Error) => {
                    if (err) {
                        const errorObj = this.createErrorObject(err, "Syslog Server failed to start!");
                        if (cb) { return cb(errorObj); }
                        return reject(errorObj);
                    } else {
                        if (cb) { return cb(); }
                        return resolve();
                    }
                });
            }
        });
    }

    public stop(cb?: (error?: object) => void) {
        console.info(`stopping Syslog Server..`);

        return new Promise((resolve, reject) => {
            try {
                this.server.close(() => {
                    if (cb) { return cb(); }
                    return resolve();
                });
            } catch (err) {
                const errorObj = this.createErrorObject(err, "Syslog Server is not running!");
                if (cb) { return cb(errorObj); }
                return reject(errorObj);
            }
        });
    }

    public isRunning() {
        return status;
    }

    private createErrorObject(err: Error | null, message: string) {
        return {
            date: new Date(),
            error: err,
            message,
        };
    }
}
