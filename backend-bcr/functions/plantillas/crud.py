from functions.database.queries import generalQuery, updateQuery
import json


def savePlantilla(dataPlantilla: dict, tipo: str, gestorID: str, infoPlantilla: dict):
    calificación = calificarPlantilla(dataPlantilla["items"])
    calificación = round(calificación, 2)
    query = "INSERT INTO plantillas (dataPlantilla, tipo, gestorID,cliente,fecha,ciudad,puntoAtencion,area,estacion,notaFinal) VALUES ('{}', '{}', '{}','{}','{}','{}','{}','{}','{}',{})".format(
        json.dumps(dataPlantilla, ensure_ascii=False),
        tipo,
        gestorID,
        infoPlantilla["cliente"],
        infoPlantilla["fecha"],
        infoPlantilla["ciudad"],
        infoPlantilla["puntoAtencion"],
        infoPlantilla["area"],
        infoPlantilla["estacion"],
        calificación,
    )
    return updateQuery(query)


def calificarPlantilla(dataPlantilla: dict):
    acc_total = 0  # acumulador de la suma de los valores de cada item
    acc_nota = 0  # acumulador de la nota total
    for item in dataPlantilla:
        acc_total += item["percentage"]
        acc_nota += item["calf"]
    nota = (acc_nota * 100) / acc_total
    return nota


def finishPlantilla(supervisorID: int, isFinished: bool, plantillaID: int):
    query = "UPDATE plantillas_result SET supervisorID = {}, isFinished = {} WHERE id = '{}';".format(
        supervisorID, isFinished, plantillaID
    )
    return generalQuery(query)
