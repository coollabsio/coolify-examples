from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import json

app = FastAPI()

class TraefikConfig(BaseModel):
    domain: str
    backend_ips: list
    use_https: bool = True

    class Config:
        schema_extra = {
            "example": {
                "domain": "newdomain.hostspacecloud.com",
                "backend_ips": ["127.0.0.1:4000", "127.0.0.1:4001"],
                "use_https": True
            }
        }

DYNAMIC_CONFIG_DIR = "/data/coolify/proxy/dynamic/"

def reload_traefik():
    os.system("docker restart coolify-proxy")

def add_domain_to_traefik(config: TraefikConfig):
    dynamic_config_path = os.path.join(DYNAMIC_CONFIG_DIR, f"{config.domain}.yaml")
    
    routers_config = {
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
    }

    services_config = {
        "lb-https": {
            "loadBalancer": {
                "servers": [{"url": f"http://{ip}"} for ip in config.backend_ips]
            }
        },
        "noop": {
            "loadBalancer": {
                "servers": [{"url": ""}]
            }
        }
    }

    middlewares_config = {
        "redirect-to-https": {
            "redirectscheme": {
                "scheme": "https"
            }
        },
        "gzip": {
            "compress": True
        }
    }

    dynamic_config = {
        "http": {
            "middlewares": middlewares_config,
            "routers": routers_config,
            "services": services_config
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
    uvicorn.run(app, host="0.0.0.0", port=5555)
