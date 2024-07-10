from fastapi import FastAPI, HTTPException
from fastapi.openapi.docs import get_swagger_ui_html
from pydantic import BaseModel
import os
import yaml
import sentry_sdk

sentry_sdk.init(
    dsn="https://99469ea4c40e9fb99e2b1cf9ecfa8fa7@o4507554427895808.ingest.de.sentry.io/4507578012532816",
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)


app = FastAPI()

class TraefikConfig(BaseModel):
    domain: str
    port: int
    container_name: str

    class Config:
        schema_extra = {
            "example": {
                "domain": "newdomain.hostspacecloud.com",
                "port": 4000,
                "container_name": "myapp"
            }
        }

DYNAMIC_CONFIG_DIR = os.getenv("TRAEFIK_DYNAMIC_CONFIG_DIR", "/data/coolify/proxy/dynamic/")

def reload_traefik():
    os.system("docker restart coolify-proxy")

def add_domain_to_traefik(config: TraefikConfig):
    dynamic_config_path = os.path.join(DYNAMIC_CONFIG_DIR, f"{config.domain}.yaml")
    
    dynamic_config = {
        "http": {
            "middlewares": {
                "redirect-to-https": {
                    "redirectscheme": {
                        "scheme": "https"
                    }
                },
                "gzip": {
                    "compress": True
                }
            },
            "routers": {
                f"{config.container_name}-http": {
                    "middlewares": ["redirect-to-https"],
                    "entryPoints": ["http"],
                    "service": config.container_name,
                    "rule": f"Host(`{config.domain}`)"
                },
                f"{config.container_name}-https": {
                    "entryPoints": ["https"],
                    "service": config.container_name,
                    "rule": f"Host(`{config.domain}`)",
                    "tls": {
                        "certresolver": "letsencrypt"
                    }
                }
            },
            "services": {
                config.container_name: {
                    "loadBalancer": {
                        "servers": [
                            {"url": f"http://{config.container_name}:{config.port}"}
                        ]
                    }
                }
            }
        }
    }

    with open(dynamic_config_path, 'w') as f:
        yaml.dump(dynamic_config, f, default_flow_style=False)

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
    return get_swagger_ui_html(openapi_url=app.openapi_url, title="HostSpaceCloud Custom Domain Mapping")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
