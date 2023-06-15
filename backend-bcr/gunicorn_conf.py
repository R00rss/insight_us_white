from multiprocessing import cpu_count
from os import path

pathname = path.dirname(path.realpath(__file__))

# Socket Path
# path_project = (
#     "/home/ron/servers/produbanco/servipagos_v1_0_1/proyecto_metricas/backend-bcr"
# )
path_project = pathname

bind = f"unix:{path_project}/gunicorn.sock"


# Worker Options

workers = cpu_count() + 1

worker_class = "uvicorn.workers.UvicornWorker"


# Logging Options

loglevel = "debug"

accesslog = f"{path_project}/access_log"

errorlog = f"{path_project}/error_log"
