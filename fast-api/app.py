from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import yaml
import subprocess

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
DOCKER_NETWORK_IP = os.getenv("DOCKER_NETWORK_IP", "host.docker.internal")

def reload_traefik():
    os.system("docker restart coolify-proxy")

def generate_ssl_certificate(domain: str):
    command = [
        "certbot", "certonly", "--standalone", "--non-interactive", "--agree-tos",
        "--email", "cloud@hostspaceng.com", "-d", domain
    ]
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        raise Exception(f"Certbot failed: {result.stderr.decode()}")

def add_domain_to_traefik(config: TraefikConfig):
    # Generate SSL certificate for the domain
    try:
        generate_ssl_certificate(config.domain)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate SSL certificate: {e}")

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
                            {"url": f"http://{DOCKER_NETWORK_IP}:{config.port}"}
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

@app.get("/", include_in_schema=False)
async def root():
    return get_swagger_ui_html(openapi_url=app.openapi_url, title=app.title + " - Swagger UI")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
