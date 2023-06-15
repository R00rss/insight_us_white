from functions.database.queries import generalQuery


def generate_agencias_plantilla(type=1):
    result = []
    zonas = generalQuery(
        "SELECT DISTINCT(agencia),zona,ciudad,tipo_agencia FROM plantillas_cliente_fantasma;"
    )
    if zonas != None and len(zonas) > 0:
        for index, item in enumerate(zonas):
            if type == 1:
                result.append(
                    {
                        "id": index,
                        "selected": index == 0,
                        "name": f"{item[0]}",
                        "zona": f"{item[1]}",
                        "ciudad": f"{item[2]}",
                        "tipo_agencia": f"{item[3]}",
                    }
                )
            elif type == 2:
                result.append(
                    {
                        "id": index,
                        "selected": True,
                        "name": f"{item[0]}",
                        "zona": f"{item[1]}",
                        "ciudad": f"{item[2]}",
                        "tipo_agencia": f"{item[3]}",
                    }
                )
            else:
                result.append(
                    {
                        "id": index,
                        "selected": False,
                        "name": f"{item[0]}",
                        "zona": f"{item[1]}",
                        "ciudad": f"{item[2]}",
                        "tipo_agencia": f"{item[3]}",
                    }
                )
    return result


def generate_cities_plantilla(type=1):
    result = []
    zonas = generalQuery(
        "SELECT DISTINCT(CIUDAD),ZONA FROM plantillas_cliente_fantasma"
    )
    if zonas != None and len(zonas) > 0:
        for index, item in enumerate(zonas):
            if type == 1:
                result.append(
                    {
                        "id": index,
                        "selected": index == 0,
                        "name": f"{item[0]}",
                        "zona": f"{item[1]}",
                    }
                )
            elif type == 2:
                result.append(
                    {
                        "id": index,
                        "selected": True,
                        "name": f"{item[0]}",
                        "zona": f"{item[1]}",
                    }
                )
            else:
                result.append(
                    {
                        "id": index,
                        "selected": False,
                        "name": f"{item[0]}",
                        "zona": f"{item[1]}",
                    }
                )
    return result


def generate_zonas_plantilla(type=1):
    result = {}
    zonas = generalQuery("SELECT DISTINCT(ZONA) FROM plantillas_cliente_fantasma")
    if zonas != None and len(zonas) > 0:
        for index, item in enumerate(zonas):
            if type == 1:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": index == 0,
                    "display_name": f"{item[0]}",
                }
            elif type == 2:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": True,
                    "display_name": f"{item[0]}",
                }
            else:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": False,
                    "display_name": f"{item[0]}",
                }
    return result


def generate_medicion_plantilla(type=1):  #
    result = {}
    zonas = generalQuery("SELECT DISTINCT(medicion) FROM plantillas_cliente_fantasma")
    if zonas != None and len(zonas) > 0:
        for index, item in enumerate(zonas):
            if type == 1:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": index == 0,
                    "display_name": f"{item[0]}",
                }
            elif type == 2:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": True,
                    "display_name": f"{item[0]}",
                }
            else:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": False,
                    "display_name": f"{item[0]}",
                }
    return result


def generate_tipo_agencia_plantilla(type=1):  #
    result = {}
    zonas = generalQuery(
        "SELECT DISTINCT(TIPO_AGENCIA) FROM plantillas_cliente_fantasma"
    )
    if zonas != None and len(zonas) > 0:
        for index, item in enumerate(zonas):
            if type == 1:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": index == 0,
                    "display_name": f"{item[0]}",
                }
            elif type == 2:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": True,
                    "display_name": f"{item[0]}",
                }
            else:
                result[f"{item[0]}"] = {
                    "id": index,
                    "selected": False,
                    "display_name": f"{item[0]}",
                }
    return result


def get_rest_data_plantilla(info_data: dict):
    query_str = f"SELECT cajero,fecha FROM plantillas_cliente_fantasma where medicion = '{info_data['medicion']}' and agencia = '{info_data['agencia']}' and zona = '{info_data['zona']}' and ciudad = '{info_data['ciudad']}';"
    query_result = generalQuery(query_str)
    result = {"cajero": query_result[0][0], "fecha": query_result[0][1]}
    return result
