from functions.database.queries import generalQuery
from functions.database.general import formatOneRow

# import json


def getClientes():
    query = "SELECT DISTINCT(cliente) FROM plantillas;"
    query_result = generalQuery(query)
    if query_result:
        return formatOneRow(query_result)
    return []


def getPlantillas():
    # query = "SELECT id,dataPlantilla,tipo,supervisorID,gestorID, FROM plantillas_result;"
    query = "SELECT * FROM plantillas;"
    result = generalQuery(query)
    data = []
    if result and len(result) > 0:
        tempObject = {}
        for res in result:
            # print(res[1])
            tempObject = {
                "id": res[0],
                "dataPlantilla": res[1],
                "tipo": res[2],
                "supervisorID": res[3],
                "gestorID": res[4],
                "isFinished": res[5],
                "cliente": res[6],
                "fecha": res[7],
                "ciudad": res[8],
                "puntoAtencion": res[9],
                "area": res[10],
                "estacion": res[11],
                "estado_plantilla": res[12],
                "coincide_video": res[13],
                "isVideoUpdated": res[14],
                "notaFinal": res[18],
            }
            data.append(tempObject)
            # print(tempObject)

    return data


def getPlantillasById():
    query = "SELECT id,dataPlantilla FROM plantillas;"


def getAddressPlantilla():
    query = "SELECT id,ciudad,provincia,pais,direccion FROM plantillas;"
    result = generalQuery(query)
    data = []
    if result != None:
        for res in result:
            tempObject = {
                # "id": res[0],
                "city": res[1],
                "state": res[2],
                "country": res[3],
                "address": res[4],
            }
            data.append(tempObject)
    return data


def getPlantillaById(idPlantilla: int):
    query = f"SELECT * FROM plantillas WHERE id = {idPlantilla};"
    result = generalQuery(query)
    data = {}
    if result and len(result) > 0:
        tempObject = {}
        for res in result:
            tempObject = {
                "id": res[0],
                "dataPlantilla": res[1],
                "tipo": res[2],
                "supervisorID": res[3],
                "gestorID": res[4],
                "isFinished": res[5],
                "cliente": res[6],
                "fecha": res[7],
                "ciudad": res[8],
                "puntoAtencion": res[9],
                "area": res[10],
                "estacion": res[11],
                "estado_plantilla": res[12],
                "coincide_video": res[13],
                "isVideoUpdated": res[14],
            }
            data = tempObject
    return data


def getAVGGradeClient():
    query = "SELECT cliente,AVG(notaFinal) FROM `plantillas` GROUP BY cliente"
    data = generalQuery(query)
    response = {"labels": [], "data": []}
    if data!=None:
        for res in data:
            response["labels"].append(res[0])
            response["data"].append(res[1])
    return response
