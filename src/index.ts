import SyslogServer from "./server";

const server = new SyslogServer();

server.on("message", (value: any) => {
    // value.date     : the date/time the message was received
    // value.host     : the IP address of the host that sent the message
    // value.protocol : the version of the IP protocol ("IPv4" or "IPv6")
    // value.message  : the syslog message
    console.log(`[${value.host}] ${value.message}`);
});

server.start();
