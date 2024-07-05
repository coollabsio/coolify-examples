from fastapi import FastAPI, HTTPException
from fastapi.openapi.docs import get_swagger_ui_html
from pydantic import BaseModel
import os

app = FastAPI()

class HAProxyConfig(BaseModel):
    domain: str
    backend_ip: str
    backend_port: int
    acl_condition: str = "hdr(host)"  # Default condition to match the host header
    bind_port: int = 80
    check_option: str = "check"  # Default health check option

    class Config:
        schema_extra = {
            "example": {
                "domain": "newdomain.hostspacecloud.com",
                "backend_ip": "127.0.0.1",
                "backend_port": 4000,
                "acl_condition": "hdr(host)",
                "bind_port": 80,
                "check_option": "check"
            }
        }

HAProxy_CFG = "/etc/haproxy/haproxy.cfg"

def reload_haproxy():
    os.system("sudo systemctl reload haproxy")

def add_domain_to_haproxy(config: HAProxyConfig):
    with open(HAProxy_CFG, "a") as f:
        f.write(f"\nfrontend {config.domain}_front\n")
        f.write(f"    bind *:{config.bind_port}\n")
        f.write(f"    acl host_{config.domain} {config.acl_condition} -i {config.domain}\n")
        f.write(f"    use_backend {config.domain}_backend if host_{config.domain}\n\n")
        f.write(f"backend {config.domain}_backend\n")
        f.write(f"    server {config.domain}_server {config.backend_ip}:{config.backend_port} {config.check_option}\n")
    reload_haproxy()

@app.post("/add-domain/")
def add_domain(config: HAProxyConfig):
    try:
        add_domain_to_haproxy(config)
        return {"message": "Domain added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/", include_in_schema=False)
async def root():
    return get_swagger_ui_html(openapi_url=app.openapi_url, title=app.title + " - Swagger UI")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
