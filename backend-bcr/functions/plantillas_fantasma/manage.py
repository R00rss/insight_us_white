from functions.database.queries import updateQuery


def updateStatePlantilla(id: int, state: str):
    query = f"UPDATE plantillas SET estado_plantilla = '{state}' WHERE id = {id}"
    return updateQuery(query)


def updateVideoStatePlantilla(id: int, state: str):
    query = f"UPDATE plantillas SET isVideoUpdated = '{state}' WHERE id = {id}"
    return updateQuery(query)


def updateStateGestion(id: int, state: int):
    query = f"UPDATE plantillas SET coincide_video = {state} WHERE id = {id}"
    return updateQuery(query)
