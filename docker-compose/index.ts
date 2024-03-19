const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0"
Bun.serve({
    hostname: HOSTNAME,
    port: PORT,
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("Home page pr!");
        if (url.pathname === "/envs") {
            return new Response(JSON.stringify(process.env, null, 2), {
                headers: { "content-type": "application/json" },
            });

        };
        return new Response("404!");
    },
})
console.log(`Server running at http://${HOSTNAME}:${PORT}`);
