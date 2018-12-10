# syslog-echo

just echo messages sent to syslog

## docker

Build image (alpine) `docker build --rm -f ".docker/alpine/Dockerfile" -t jlouros/syslog-echo:alpine -t jlouros/syslog-echo:latest .`

Build image (Nano Server) `docker build --rm -f ".docker/nanoserver/Dockerfile" -t jlouros/syslog-echo:nanoserver .`

Run container `docker run -it --rm -p 514:514/udp jlouros/syslog-echo`

## refernces

- [https://github.com/guithess/syslog-server](https://github.com/guithess/syslog-server)
- [https://basarat.gitbooks.io/typescript/content/docs/quick/nodejs.html](https://basarat.gitbooks.io/typescript/content/docs/quick/nodejs.html)
