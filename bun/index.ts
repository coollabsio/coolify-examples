const PORT = process.env.PORT || 3000;
Bun.serve({
    port: PORT,
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("Home page!");
        if (url.pathname === "/blog") return new Response("Blog!");
        if (url.pathname === "/about") return new Response("About!");
        if (url.pathname === "/x") return new Response("a");
        if (url.pathname === "/201") return new Response("201", { status: 201 });
        return new Response("404!");
    },
})
console.log(`Server running at http://localhost:${PORT}`);
