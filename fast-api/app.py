from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import yaml

app = FastAPI()

class TraefikConfig(BaseModel):
    domain: str
    port: int

    class Config:
        schema_extra = {
            "example": {
                "domain": "newdomain.hostspacecloud.com",
                "port": 4000
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
                "lb-http": {
                    "middlewares": ["redirect-to-https"],
                    "entryPoints": ["http"],
                    "service": "noop",
                    "rule": f"Host(`{config.domain}`)"
                },
                "lb-https": {
                    "middlewares": ["gzip"],
                    "entryPoints": ["https"],
                    "service": "lb-https",
                    "tls": {
                        "certResolver": "letsencrypt"
                    },
                    "rule": f"Host(`{config.domain}`)"
                }
            },
            "services": {
                "lb-https": {
                    "loadBalancer": {
                        "servers": [
                            {"url": f"http://127.0.0.1:{config.port}"}
                        ]
                    }
                },
                "noop": {
                    "loadBalancer": {
                        "servers": [
                            {"url": ""}
                        ]
                    }
                }
            }
        }
    }

    with open(dynamic_config_path, 'w') as f:
        yaml.dump(dynamic_config, f)

    reload_traefik()

@app.post("/add-domain/")
def add_domain(config: TraefikConfig):
    try:
        add_domain_to_traefik(config)
        return {"message": "Domain added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
