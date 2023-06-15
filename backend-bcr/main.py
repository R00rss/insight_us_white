from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Body,
    HTTPException,
    Depends,
    Header,
    Form,
    Path,
)

import datetime
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.config import LOGGING_CONFIG
from fastapi.responses import FileResponse, StreamingResponse, HTMLResponse
import uvicorn
import shutil
import json
import os
import logging
import re
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from functions.reports.create_reports import (
    generate_report_VOC,
    generate_report_encuesta_lealtad,
)
from functions.manage_data.fantasma import generate_data_fantasma
import io
from functions.manage_data.CRUD.select import getDataTotal, getColumnsDataTotal

from functions.manage_data.manage_filtros2 import (
    generate_periodos,
    generate_zonas,
    generate_tipo_agencia,
    generate_agencias,
    generate_cities,
    generate_info_agencias,
)
from functions.manage_data.manage_filtros_plantilla import (
    generate_agencias_plantilla,
    generate_cities_plantilla,
    generate_medicion_plantilla,
    generate_tipo_agencia_plantilla,
    generate_zonas_plantilla,
    get_rest_data_plantilla,
)
from functions.manage_data.manage_filtros import (
    filtro_zona_cuidad,
    filtro_tipo_agencia_agencia,
    filtro_indicador_subindicador,
    filtro_periodos,
)

from functions.manageDataExcel.readData import (
    readReportsExcel,
    getCompaniesFromExcel,
    getInicialDataFromExcel,
    getIndicadoresByTipoIndicadorExcel,
    getDataFiltrada,
    getGlobalData,
    getClients,
    getContacts,
    generate_database_from_csv,
    csv_to_mysql,
)
from functions.manageDataExcel.readDataVOC import getDataVOCEncuestaFiltrada
from functions.manageDataExcel.readDataEncuestas import (
    getDataEncuestas,
    getInicialDataForFiltersEncuestas,
    getDataEncuestasTotal,
)
import requests
import urllib.parse
from os import path
from functions.auth.auth import authenticUser
from functions.auth.manageToken import decode_access_token, generate_access_token
from models.filterData import filterDataModel
from models.users import userAuthModel
from models.token import tokenModel
from models.clienteFantasma.plantillas import body_data_save_plantilla
from functions.plantillas.crud import savePlantilla
from functions.plantillas.info import (
    getPlantillas,
    getPlantillasById,
    getPlantillaById,
    getAddressPlantilla,
    getAVGGradeClient,
)
from services.geoLocation import getCoordByAddress
from functions.cryptography.cryptography import encryptionFromStr, decryptionFromStr
from functions.plantillas.manageVideo import saveVideo, getVideos, getVideo
from functions.plantillas.manage import (
    updateStatePlantilla,
    updateStateGestion,
    updateVideoStatePlantilla,
)
from functions.database.queries import updateQuery, generalQuery
from functions.users.crud import (
    getUsers,
    generate_users,
    generate_users_excel,
    generate_fake_random_password,
)
from functions.plantillas_fantasma.crud import (
    createPlantilla,
    get_data_total_fantasma,
    get_items_by_filters,
    filter_data_total_by_filters,
    get_promedio_total_fantasma,
)


import time

origins = [
    "*",
    "http://localhost:7003",
]


pathname = path.dirname(path.realpath(__file__))
# app = FastAPI()
app = FastAPI(
    ssl_keyfile="./ssl_certificado/produ/private.key",
    ssl_certfile="./ssl_certificado/produ/server.crt",
    # ssl_keyfile="./ssl_certificado/private.key",
    # ssl_certfile="./ssl_certificado/server.crt",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


templates = Jinja2Templates(directory="dist/")


async def validate_token_header(
    Authorization: str = Header(),
) -> str | None:
    try:
        authorization_token = Authorization.split(" ")[1]
        if authorization_token is None:
            raise HTTPException(status_code=400, detail="Token is missing")
        decodedT = decode_access_token(authorization_token)
        if not (decodedT["success"]):
            raise HTTPException(status_code=404, detail="No session found")
        return decodedT["payload"]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Token is missing")


# @app.get("/")
# async def root():
# data = generalQuery('select * from metricas.usuarios ;')
# return {"message": csv_to_mysql()}
# return {"message": "Hello World"}
# return {"message": generate_info_agencias(['REINA VICTORIA','PLAZA ALEGRIA'])}
# print(data)
# return {"message": readReportsExcel()}


@app.get("/api/testing_create_plantilla")
async def testing_create_plantilla():
    ingresador_id = 100
    supervisor_id = 100
    return {
        "message": createPlantilla(
            ingresador_id=ingresador_id, supervisor_id=supervisor_id
        )
    }


@app.get("/api/generate_users")
async def generate_users_route():
    return generate_users()


@app.post("/api/generate_access_token_PQR")
async def generate_access_token_PQR(
    datos: dict = Body(embed=True),
):
    token = generate_access_token(datos)
    print(datos, token)
    return token


@app.get("/api/users")
async def get_users():
    result_query = generalQuery(
        "select nombre_usuario,contraseña,agencia from metricas.usuarios;"
    )
    result = []
    for user in result_query:
        obj_aux = {}
        obj_aux["nombre_usuario"] = user[0]
        obj_aux["contraseña"] = user[1]
        obj_aux["agencia"] = user[2]
        result.append(obj_aux)
    return {"message": result}


@app.get("/api/items_plantilla")
async def items_plantilla() -> list | None:
    result = get_data_total_fantasma()
    if result != None:
        return result
    return []


@app.get("/api/export_users_test")
async def export_users_test():
    # return {"message": "Hello World"}
    df = generate_users_excel()
    buffer = io.BytesIO()
    df.to_excel(buffer, index=False)
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment;filename=data.xlsx"},
    )


@app.post("/api/plantilla_fantasma")
async def upload_file(
    current_user: dict = Depends(validate_token_header),
    datos_plantilla: dict = Body(...),
    plantilla_detalle: dict = Body(...),
):
    try:
        query_str = "INSERT INTO plantillas_cliente_fantasma (medicion,zona,ciudad, agencia,tipo_agencia, cajero,fecha, ingresador_id, video_name, items) VALUES "
        encoded_JSON = json.dumps(plantilla_detalle, ensure_ascii=False)
        medicion = datos_plantilla["medicion"]
        zona = datos_plantilla["zona"]
        ciudad = datos_plantilla["ciudad"]
        agencia = datos_plantilla["agencia"]
        tipo_agencia = datos_plantilla["tipo_agencia"]
        cajero = datos_plantilla["cajero"]
        fecha = datos_plantilla["fecha"]
        video_name = datos_plantilla["name_file"]
        ingresador_id = datos_plantilla["ingresador_id"]
        query_str += (
            "("
            + f"'{medicion}',"
            + f"'{zona}',"
            + f"'{ciudad}',"
            + f"'{agencia}',"
            + f"'{tipo_agencia}',"
            + f"'{cajero}',"
            + f"'{fecha}',"
            + f"{ingresador_id},"
            + f"'{video_name}',"
            + f"'{encoded_JSON}'"
            + ");"
        )
        res_update = updateQuery(query_str)
        if res_update["success"]:
            query_search = f"SELECT id FROM plantillas_cliente_fantasma WHERE medicion = '{medicion}' AND zona = '{zona}' AND ciudad = '{ciudad}' AND agencia = '{agencia}' AND tipo_agencia = '{tipo_agencia}' AND cajero = '{cajero}' AND fecha = '{fecha}' AND ingresador_id = {ingresador_id};"
            res = generalQuery(query_search)
            return {
                "message": "Plantilla creada correctamente",
                "id_plantilla": res[0][0],
            }
        raise HTTPException(status_code=500, detail="Error al guardar la plantilla")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.post("/api/plantilla_fantasma/video")
async def post_video(
    current_user: dict = Depends(validate_token_header),
    file: UploadFile = File(...),
    id_plantilla: str = Form(...),
):
    try:
        contents = await file.read()
        pathToSave = path.join(
            pathname,
            "uploads",
            "videos",
            f"plantilla_{id_plantilla}",
            file.filename,
        )
        if not path.exists(os.path.dirname(pathToSave)):
            os.makedirs(os.path.dirname(pathToSave))

        aux_file = open(pathToSave, "wb")
        aux_file.write(contents)
        aux_file.close()
        return {"message": "ok"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


def stream_video(video_path):
    try:
        with open(video_path, mode="rb") as file:
            while True:
                chunk = file.read(1024 * 1024)  # Read 1 MB at a time
                if not chunk:
                    break
                yield chunk
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.get("/api/plantilla_fantasma/video/{id_plantilla}")
def get_video(
    current_user: dict = Depends(validate_token_header),
    id_plantilla: str = Path(...),
):
    try:
        res = generalQuery(
            f"SELECT path_videos,video_name FROM plantillas_cliente_fantasma WHERE id = {id_plantilla};"
        )
        if not res and res[0] and res[0][1]:
            raise HTTPException(status_code=404, detail="No se encontró el video")
        #     return {"message": res[0][1]}
        # return id_plantilla
        pathFile = path.join(
            pathname,
            "uploads",
            "videos",
            # "plantilla_298",
            f"plantilla_{id_plantilla}",
            # res[0][1],
            # "heavy.mp4",
            # "test.mp4",
            # "light.mp4",
            f"{res[0][1]}",
        )
        # pathFile = path.join(pathname, "uploads", "videos", "test.webm")
        # print(pathFile)
        if not path.exists(pathFile):
            raise HTTPException(status_code=404, detail="No se encontró el video")
        # return StreamingResponse(stream_video(pathFile), media_type="video/mp4")
        return StreamingResponse(stream_video(pathFile), media_type="webm")

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server (video)")


@app.get("/api/generate_fake_password")
async def generate_fake_password():
    res = []
    for i in range(20):
        res.append(generate_fake_random_password())
    return res


# @app.get("/api/generate_data_fantasma")
# async def generate_data_fantasma_route():
#     return generate_data_fantasma()


@app.post("/api/export_report")
async def export_report(data_reporte=Body(Embed=True), report_type=Body(Embed=True)):
    if report_type == "voz_del_cliente":
        reporte_df = generate_report_VOC(data_reporte[report_type])
    elif report_type == "encuesta_lealtad":
        reporte_df = generate_report_encuesta_lealtad(data_reporte[report_type])
    else:
        raise HTTPException(status_code=400, detail="Invalid report type")
    buffer = io.BytesIO()
    reporte_df.to_excel(buffer, index=False)
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment;filename=data.xlsx"},
    )


@app.post("/api/agencies_for_filters")
async def agencies_for_filters(agencias: list = Body(Embed=True)):
    return generate_info_agencias(agencias)


@app.post("/api/test_post")
async def test_post(arg1: str = Body(embed=True), arg2: int = Body(embed=True)):
    return {"message": [arg1, arg2]}


@app.get("/api/generate_clientes")
async def generate_clientes_route():
    return getClients()


@app.get("/api/getColumnsDataTotal")
async def getColumnsRoute():
    return getColumnsDataTotal()


################################################################3
# GET DATA FOR FILTERS


@app.get("/api/filtro_data")
async def filtro_data():
    return {
        "payload": {
            "filtro_zona_cuidad": filtro_zona_cuidad(),
            "filtro_tipo_agencia_agencia": filtro_tipo_agencia_agencia(),
            "filtro_indicador_subindicador": filtro_indicador_subindicador(),
        },
        "success": True,
    }
    # return "this method should be used only for testing purposes"


@app.get("/api/getPlantillas")
async def getPlantillasEndPoint():
    plantillas = getPlantillas()
    return {"plantillas": plantillas}


@app.get("/api/avgGradeClient")
async def avgGradeClientRoute():
    data = getAVGGradeClient()
    return data


@app.get("/api/getCalfPlantillas")
async def getCalfPlantillasEndPoint():
    plantillas = getPlantillas()
    temp = json.loads(plantillas[0]["dataPlantilla"])
    return {"plantillas": plantillas}


@app.get("/api/getVideos")
async def getVideosRoute():
    return getVideos()


@app.get("/api/cancelTest")
async def cancelTestRoute():
    time.sleep(20)
    return {"message": "llego la petición"}


# @app.post("/api/getVideo")
# async def getVideoRoute(idVideo: int = Body(embed=True)):
#     video = getVideo(idVideo)
#     video_path = video[0]["path"]
#     # return video_path
#     if video_path:
#         return FileResponse(video_path)


@app.post("/api/getVideo")
def getVideoRoute(idVideo: int = Body(embed=True)):
    # response = {
    #     "status": {"success": False, "message": "Error al enviar el video"},
    #     "payload": None,
    # }
    # video = getVideo(idVideo)
    # video_path = video[0]["path"]
    video_path = "C:\\Users\\rgarcia\\Documents\\Proyectos\\brc-metrics\\backend-bcr\\files\\gestion\\videos\\testvideo1.mp4"

    def sendStreamingVide(path: str):
        with open(path, mode="rb") as file_like:  #
            yield from file_like  #

    return StreamingResponse(sendStreamingVide(video_path), media_type="video/mp4")


@app.post("/api/plantilla")
def getPlantillaInfo(idPlantilla: int = Body(embed=True)):
    return getPlantillasById(idPlantilla)


@app.get("/api/plantilla/{idPlantilla}")
def getPlantillaInfo(idPlantilla: int):
    return getPlantillaById(idPlantilla)


@app.post("/api/desencriptar_data")
async def testing(data: str = Body(embed=True)):
    decryptedData = decryptionFromStr(data)
    return {
        "decryptedData": decryptedData,
        "original_data": data,
    }


@app.get("/api/encriptar_data/{data}")
async def testing(data: str):
    encryptedData = encryptionFromStr(data)
    decryptedData = decryptionFromStr(encryptedData)
    return {
        "encryptedData": encryptedData,
        "decryptedData": decryptedData,
        "original_data": data,
    }


@app.get("/api/coordCiudades")
async def coordCiudadesRoute():
    addresses = getAddressPlantilla()
    res = getCoordByAddress(addresses)
    return res


@app.get("/api/companies")
async def getCompanies():
    companies = getCompaniesFromExcel()
    return {
        "message": "Éxito al obtener las compañías",
        "success": True,
        "payload": companies,
    }


@app.get("/api/indicador")
async def getIndicadores(tipo_indicador: str):
    # return tipo_indicador
    indicadores = getIndicadoresByTipoIndicadorExcel(tipo_indicador)
    return {
        "message": f"Éxito al obtener los indicadores con el tipo indicador {tipo_indicador}",
        "success": True,
        "payload": indicadores,
    }


@app.post("/api/getData")
async def getIndicadores(data: filterDataModel):
    payload = getDataFiltrada(data)
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
        "data_received": data,
    }


@app.post("/api/getDataVOC")
async def getIndicadores(data: filterDataModel):
    payload = getDataFiltrada(data)
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
        "data_received": data,
    }


@app.get("/api/getDataEncuestas")
async def getDataEncuestasRoute():
    payload = json.loads(getDataEncuestas())
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
    }


@app.get("/api/getDataTotalEncuestas")
async def getDataTotalEncuestasRoute():
    payload = getDataEncuestasTotal()
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
    }


@app.get("/api/getDataTotal")
async def getDataTotalRoute():
    payload = getDataTotal()
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
    }


@app.get("/api/getDataTotalEncuestas2")
async def getDataTotalRoute():
    return getDataTotal()


@app.post("/api/getDataVOCEncuesta")
async def getIndicadores(data: dict = Body(Embed=True)):
    payload = getDataVOCEncuestaFiltrada()
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
        "data_received": data,
    }


@app.post("/api/getGlobalData")
async def getIndicadores(data: filterDataModel):
    payload = getGlobalData(data)
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
        "data_received": data,
    }


@app.post("/api/getDataByFilterEncuesta")
async def getDataByFilterEncuesta(
    agencia: str = Body(Embed=True),
    periodo: str = Body(Embed=True),
    subindicador: str = Body(Embed=True),
    indicador: str = Body(Embed=True),
):
    # payload = json.loads(
    #     getDataEncuestas(
    #         {
    #             "PUNTO NOMBRE": Agencia,
    #             "PERIODO": Periodo,
    #         }
    #     )
    # )
    payload = getDataEncuestas(
        {
            "agencia": agencia,
            "periodo": periodo,
            "subindicador": subindicador,
            "indicador": indicador,
        }
    )
    return {
        "message": "Éxito al obtener los datos filtrados ",
        "success": True,
        "payload": payload,
    }


@app.get("/api/inicialData")
async def getInicialData():
    inicialData = getInicialDataFromExcel()
    return {
        "message": "Éxito al obtener las compañías",
        "success": True,
        "payload": inicialData,
    }


@app.get("/api/data_filter_general")
async def data_filter_general():
    return {
        "filtros": {
            "1": {
                "selected_all": True,
                "display_name": "Zonas",
                "display_name2": "Ciudades",
                "items": filtro_zona_cuidad(),
            },
            "2": {
                "selected_all": True,
                "display_name": "Tipo Agencias",
                "display_name2": "Agencias",
                "items": filtro_tipo_agencia_agencia(),
            },
            "3": {
                "selected_all": True,
                "display_name": "Indicadores",
                "display_name2": "Subindicadores",
                "items": filtro_indicador_subindicador(),
            },
            "4": {
                "selected_all": True,
                "display_name": "Periodos",
                "display_name2": "",
                "items": filtro_periodos(),
            },
        }
    }


@app.get("/api/data_filter_fantasma")
async def data_filter_fantasma(type: int = 1):
    return (
        generate_medicion_plantilla(type),
        generate_zonas_plantilla(type),
        generate_cities_plantilla(type),
        generate_agencias_plantilla(type),
    )


@app.post("/api/get_data_fantasma_filtered")
async def get_data_fantasma_filtered(
    mediciones: dict = Body(embed=True),
    zonas: dict = Body(embed=True),
    cities: list = Body(embed=True),
    agencias: list = Body(embed=True),
):
    # print("mediciones", mediciones)
    data_filter = filter_data_total_by_filters(mediciones, zonas, cities, agencias)
    promedios_total = None
    if data_filter != None and data_filter != []:
        promedios_total = get_promedio_total_fantasma(data_filter)
    return {"data_filtrada": data_filter, "promedio_total": promedios_total}


@app.post("/api/get_rest_data")
async def get_rest_data_route(
    info_data: dict = Body(embed=True),
):
    return get_rest_data_plantilla(info_data)


@app.post("/api/get_plantilla_fantasma")
async def get_rest_data_route(
    medicion: str = Body(embed=True),
    zona: str = Body(embed=True),
    ciudad: str = Body(embed=True),
    agencia: str = Body(embed=True),
):
    return get_items_by_filters(medicion, zona, ciudad, agencia)


@app.get("/api/data_filter_general2")
async def data_filter_general2():
    return (
        generate_zonas(),
        generate_cities(),
        generate_tipo_agencia(),
        generate_agencias(),
        generate_periodos(),
    )


@app.get("/api/generate_database_from_csv")
async def generate_database_from_csv_ROUTE():
    return generate_database_from_csv()


@app.get("/api/inicialDataEncuesta")
async def getInicialDataEncuesta():
    inicialData = getInicialDataForFiltersEncuestas()
    return {
        "message": "Éxito al obtener la data inicial para los filtros de encuestas",
        "success": True,
        "payload": inicialData,
    }


@app.get("/api/replaceTest/{test_data}")
async def replaceTest(test_data: str):
    # original_string="SERVIPAGOS QUITUMBE"
    # original_string2="SERVIP- AGENCIA  CHILLOGALLO"
    # pattern = r"SERVIPAGOS?SERVIP-?AGENCIA?"
    # replacement = ""
    # new_string = re.sub(pattern, replacement, original_string)
    my_string = "SERVIP- AGENCIA  CHILLOGALLO"
    replace_list = ["SERVIP", "SERVIPAGOS", "AGENCIA", " ", "-", "_", "."]

    for word in replace_list:
        my_string = my_string.replace(word, "")
    return my_string


@app.get("/api/users")
async def getInicialData():
    return getContacts()
    return getUsers(), getContacts()


@app.post("/api/auth")
async def authUser(userAuth: userAuthModel):
    return authenticUser(userAuth.username, userAuth.password)


@app.post("/api/savePlantillaFantasma")
async def savePlantillaFantasma(req: body_data_save_plantilla):
    return {
        "status": {
            "savePlantilla": False,
            "success": False,
        },
        "message": "Error al guardar la plantilla",
    }
    responseUpdateState = savePlantilla(
        req.data, req.typePlantilla, req.gestorID, req.infoPlantilla
    )
    response = {
        "status": {
            "savePlantilla": False,
            "success": False,
        },
        "message": "Error al guardar la plantilla",
    }
    if responseUpdateState["success"]:
        response["status"]["savePlantilla"] = True
        response["status"]["success"] = True
        response["message"] = "Éxito al cambiar el estado de la plantilla"
    else:
        response["message"] = responseUpdateState["message"]

    return response


@app.post("/api/validateToken")
async def validateToken(reqToken: tokenModel):
    decodeToken = decode_access_token(reqToken.token)
    return decodeToken


@app.post("/api/changeStatePlantilla")
async def changeStatePlantilla(
    plantillaID: int = Body(embed=True),
    newState: str = Body(embed=True),
    gestorID: int = Body(embed=True),
):
    response = {
        "status": {
            "changeNewState": False,
            "success": False,
        },
        "message": "Error al cambiar el estado de la plantilla",
        "message_error": "",
    }
    responseUpdateState = updateStatePlantilla(plantillaID, newState)
    if responseUpdateState["success"]:
        response["status"]["changeNewState"] = True
        response["status"]["success"] = True
        response["message"] = "Éxito al cambiar el estado de la plantilla"
    else:
        response["message_error"] = responseUpdateState["message"]
    return response


@app.post("/api/changeStateGestion")
async def changeStateGestion(
    plantillaID: int = Body(embed=True),
    newState: str = Body(embed=True),
    gestorID: int = Body(embed=True),
):
    response = {
        "status": {
            "changeNewState": False,
            "success": False,
        },
        "message": "Error al cambiar el estado de la plantilla",
        "message_error": "",
    }
    responseUpdateState = updateStateGestion(plantillaID, newState)
    if responseUpdateState["success"]:
        response["status"]["changeNewState"] = True
        response["status"]["success"] = True
        response["message"] = "Éxito al cambiar el estado de la plantilla"
    else:
        response["message_error"] = responseUpdateState["message"]
    return response


@app.post("/api/updateVideoGestion")
async def audioToTextRoute(
    plantillaID: int,
    payloadFile: UploadFile = File(...),
):
    response = {
        "status": {
            "saveFile": False,
            "savePathBD": False,
            "changeVideoStatus": False,
            "success": False,
        },
        "data": {},
        "message": "Error al procesar el archivo",
    }
    pathname = path.dirname(path.realpath(__file__))
    filename = payloadFile.filename
    pathToSave = path.join(pathname, "files", "gestion", "videos", str(plantillaID))
    if not path.exists(pathToSave):
        os.makedirs(pathToSave)
    pathOfVideo = path.join(pathToSave, filename)
    # TO DO: verify if video exist and tell to user
    try:
        with open(pathOfVideo, "wb") as buffer:
            shutil.copyfileobj(payloadFile.file, buffer)
        payloadFile.file.close()
        response["status"]["saveFile"] = True
    except Exception as e:
        response["message"] = "Error al guardar el video"
        print(e)
        return response

    response_saveVideo = saveVideo(pathOfVideo, plantillaID)
    if response_saveVideo["success"]:
        response["status"]["savePathBD"] = True
        response["message"] = "El video se guardó correctamente"
    else:
        response["message"] = "Error al guardar el video en la base de datos"
        return response
    response_update_state_video = updateVideoStatePlantilla(plantillaID, 1)
    if response_update_state_video["success"]:
        response["status"]["changeVideoStatus"] = True
        response["message"] = "Éxito al cambiar el estado del video de la plantilla"
    else:
        response["message_error"] = response_update_state_video["message"]
        return response

    response["status"]["success"] = (
        response["status"]["changeVideoStatus"]
        and response["status"]["savePathBD"]
        and response["status"]["saveFile"]
    )
    return response


# app.get('/home', response_class=HTMLResponse)


@app.get("/home")
# @app.get('/login')
async def frontend():
    return FileResponse("dist/index.html")


@app.get("/login")
async def frontend():
    return FileResponse("dist/index.html")
    # return FileResponse(templates.TemplateResponse('index.html'))


app.mount("/", StaticFiles(directory="dist/", html=True), name="dist")


if __name__ == "__main__":
    # uvicorn.run("main:app", host="0.0.0.0", port=443, reload=True)
    LOGGING_CONFIG["formatters"]["default"][
        "fmt"
    ] = "%(asctime)s [%(name)s] %(levelprefix)s %(message)s"
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=2003,
        reload=True,
        # ssl_keyfile="./ssl_certificado/produ/private.key",
        # ssl_certfile="./ssl_certificado/produ/server.crt",
        # ssl_keyfile="./ssl_certificado/private.key",
        # ssl_certfile="./ssl_certificado/server.crt",
    )

    # uvicorn.run("main:app", port=2002, reload=True)
# uvicorn main:app --port 8000 --ssl-keyfile ./ssl_certificado/private.key --ssl-certfile ./ssl_certificado/server.crt
# app = FastAPI(ssl_keyfile="./ssl_certificado/private.key", ssl_certfile="./ssl_certificado/server.crt")
