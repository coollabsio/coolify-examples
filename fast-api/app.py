from fastapi import FastAPI, HTTPException
from fastapi.openapi.docs import get_swagger_ui_html
from pydantic import BaseModel
import os
import json

app = FastAPI()

class TraefikConfig(BaseModel):
    domain: str
    backend_ip: str
    backend_port: int

    class Config:
        schema_extra = {
            "example": {
                "domain": "newdomain.hostspacecloud.com",
                "backend_ip": "127.0.0.1",
                "backend_port": 4000
            }
        }

DYNAMIC_CONFIG_DIR = "/data/coolify/proxy/dynamic/"

def reload_traefik():
    os.system("docker restart coolify-proxy")

def add_domain_to_traefik(config: TraefikConfig):
    dynamic_config_path = os.path.join(DYNAMIC_CONFIG_DIR, f"{config.domain}.json")
    
    dynamic_config = {
        "http": {
            "routers": {
                f"{config.domain}-router": {
                    "rule": f"Host(`{config.domain}`)",
                    "service": f"{config.domain}-service",
                    "entryPoints": ["http"]
                }
            },
            "services": {
                f"{config.domain}-service": {
                    "loadBalancer": {
                        "servers": [
                            {
                                "url": f"http://{config.backend_ip}:{config.backend_port}"
                            }
                        ]
                    }
                }
            }
        }
    }

    with open(dynamic_config_path, 'w') as f:
        json.dump(dynamic_config, f, indent=4)

    reload_traefik()

@app.post("/add-domain/")
def add_domain(config: TraefikConfig):
    try:
        add_domain_to_traefik(config)
        return {"message": "Domain added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/", include_in_schema=False)
async def root():
    return get_swagger_ui_html(openapi_url=app.openapi_url, title=app.title + " - Swagger UI")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
