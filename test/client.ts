import syslog from "syslog-client";

const client = syslog.createClient("127.0.0.1");
client.log("test message");
