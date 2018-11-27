import syslog from "syslog-client";
import SyslogServer from "../src/server";

(async function test() {

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const server = new SyslogServer();

    server.on("message", (value: any) => {
        console.log(value.date);     // the date/time the message was received
        console.log(value.host);     // the IP address of the host that sent the message
        console.log(value.protocol); // the version of the IP protocol ("IPv4" or "IPv6")
        console.log(value.message);  // the syslog message
    });

    await server.start();
    const client = syslog.createClient("127.0.0.1");
    client.log("test message");
    await wait(1000);
    await server.stop();
})();
