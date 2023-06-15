from functions.database.queries import updateQuery, generalQuery


def saveVideo(path: str, idPlantilla: int):
    query = "INSERT INTO paths_videos (path, plantillaID) VALUES ('{}', '{}')".format(
        path,
        idPlantilla,
    )
    return updateQuery(query)


def getVideos():
    # query = "SELECT id,dataPlantilla,tipo,supervisorID,gestorID, FROM plantillas_result;"
    query = "SELECT * FROM paths_videos;"
    # print(query)
    result = generalQuery(query)
    # print(result)
    if result and len(result) > 0:
        data = []
        tempObject = {}
        for res in result:
            # print(res[1])
            tempObject = {
                "id": res[0],
                "path": res[1],
                "plantillaID": res[2],
                "createDate": res[3],
                "estado": res[4],
                "name_video": res[5],
            }
            data.append(tempObject)
            print(tempObject)

    return data


def getVideo(idVideo: int):
    # query = "SELECT id,dataPlantilla,tipo,supervisorID,gestorID, FROM plantillas_result;"
    query = f"SELECT * FROM paths_videos where id = {idVideo}"
    # print(query)
    result = generalQuery(query)
    # print(result)
    if result and len(result) > 0:
        data = []
        tempObject = {}
        for res in result:
            # print(res[1])
            tempObject = {
                "id": res[0],
                "path": res[1],
                "plantillaID": res[2],
                "createDate": res[3],
                "estado": res[4],
                "name_video": res[5],
            }
            data.append(tempObject)
    return data
