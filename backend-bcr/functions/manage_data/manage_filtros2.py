from functions.database.queries import generalQuery


def generate_agencias():
    result = []
    zonas = generalQuery(
        # "SELECT DISTINCT(AGENCIA),ZONA,CIUDAD,TIPO_AGENCIA FROM data_encuestas_final;"
        "SELECT DISTINCT(AGENCIA),ZONA,CIUDAD,TIPO_AGENCIA FROM gestionfinal;"
    )
    if zonas != None and len(zonas) > 0:
        count = 0
        for zona in zonas:
            result.append(
                {
                    "id": count,
                    "selected": True,
                    "name": f"{zona[0]}",
                    "zona": f"{zona[1]}",
                    "ciudad": f"{zona[2]}",
                    "tipo_agencia": f"{zona[3]}",
                }
            )
            count += 1
    return result


def generate_info_agencia(agencia: str):
    agencia_info = generalQuery(
        # f"SELECT DISTINCT(AGENCIA),ZONA,CIUDAD,TIPO_AGENCIA FROM data_encuestas_final where AGENCIA = {agencia};"
        f"SELECT DISTINCT(AGENCIA),ZONA,CIUDAD,TIPO_AGENCIA FROM gestionfinal where AGENCIA = {agencia};"
    )
    if agencia_info != None and len(agencia_info) > 0:
        return {
            "id": 0,
            "selected": True,
            "name": f"{agencia_info[0][0]}",
            "zona": f"{agencia_info[0][1]}",
            "ciudad": f"{agencia_info[0][2]}",
            "tipo_agencia": f"{agencia_info[0][3]}",
        }
    return None


def generate_info_agencias(agencias: list):
    result = []
    # query = "SELECT DISTINCT(AGENCIA),ZONA,CIUDAD,TIPO_AGENCIA FROM data_encuestas_final where AGENCIA in ('" + "','".join(agencias) + "');"
    query = (
        "SELECT DISTINCT(AGENCIA),ZONA,CIUDAD,TIPO_AGENCIA FROM gestionfinal where AGENCIA in ('"
        + "','".join(agencias)
        + "');"
    )

    agencias_info = generalQuery(query)
    if agencias_info != None and len(agencias_info) > 0:
        count = 0
        for agencia_info in agencias_info:
            result.append(
                {
                    "id": count,
                    "selected": True,
                    "name": f"{agencia_info[0]}",
                    "zona": f"{agencia_info[1]}",
                    "ciudad": f"{agencia_info[2]}",
                    "tipo_agencia": f"{agencia_info[3]}",
                }
            )
            count += 1
    return result


def generate_cities():
    result = []
    zonas = generalQuery(
        # "SELECT DISTINCT(CIUDAD),ZONA FROM data_encuestas_final"
        "SELECT DISTINCT(CIUDAD),ZONA FROM gestionfinal"
    )
    if zonas != None and len(zonas) > 0:
        count = 0
        for zona in zonas:
            result.append(
                {
                    "id": count,
                    "selected": True,
                    "name": f"{zona[0]}",
                    "zona": f"{zona[1]}",
                }
            )
            count += 1
    return result


def generate_periodos():
    result = []
    zonas = generalQuery(
        # "SELECT DISTINCT(PERIODO) FROM data_encuestas_final"
        "SELECT DISTINCT(PERIODO) FROM gestionfinal ORDER BY TmStmp"
    )
    if zonas != None and len(zonas) > 0:
        count = 0
        for zona in zonas:
            result.append(
                {
                    "id": count,
                    "selected": True,
                    "name": f"{zona[0]}",
                }
            )
            count += 1
    return result


def generate_zonas():  # test
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(ZONA) FROM data_encuestas_final"
        "SELECT DISTINCT(ZONA) FROM gestionfinal"
    )
    if zonas != None and len(zonas) > 0:
        count = 0
        for zona in zonas:
            result[f"{zona[0]}"] = {
                "selected": True,
                "display_name": f"{zona[0]}",
            }
            count += 1
    return result


def generate_tipo_agencia():  # test
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(TIPO_AGENCIA) FROM data_encuestas_final"
        "SELECT DISTINCT(TIPO_AGENCIA) FROM gestionfinal"
    )
    if zonas != None and len(zonas) > 0:
        count = 0
        for zona in zonas:
            result[f"{zona[0]}"] = {
                "selected": True,
                "display_name": f"{zona[0]}",
            }
            count += 1
    return result


def filtro_tipo_agencia_agencia():
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(TIPO_AGENCIA) FROM data_encuestas_final"
        "SELECT DISTINCT(TIPO_AGENCIA) FROM gestionfinal"
    )
    if zonas != None and len(zonas) > 0:
        for zona in zonas:
            ciudades_temp = generalQuery(
                # f"SELECT DISTINCT(AGENCIA) FROM data_encuestas_final WHERE TIPO_AGENCIA = '{zona[0]}';"
                f"SELECT DISTINCT(AGENCIA) FROM gestionfinal WHERE TIPO_AGENCIA = '{zona[0]}';"
            )
            resul2 = {}
            for ciudad in ciudades_temp:
                resul2[f"{ciudad[0]}"] = {
                    "status": True,
                    "display_name": f"{ciudad[0]}",
                }
            result[f"{zona[0]}"] = {
                "status": True,
                "display_name": f"{zona[0]}",
                "items": resul2,
                "selected_all": True,
            }
    return result


def filtro_indicador_subindicador():
    data = {
        "promesa de servicio": ["esfuerzo", "recomendacion", "satisfaccion"],
        "experiencia": ["amabilidad", "agilidad"],
    }
    result = {}
    zonas = ["promesa de servicio", "experiencia"]
    if zonas != None and len(zonas) > 0:
        for zona in zonas:
            ciudades_temp = data[f"{zona}"]
            resul2 = {}
            for ciudad in ciudades_temp:
                resul2[f"{ciudad}"] = {
                    "status": True,
                    "display_name": f"{ciudad}",
                }
            result[f"{zona}"] = {
                "status": True,
                "display_name": f"{zona}",
                "items": resul2,
            }
    return result


def filtro_ciudad():  # test
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(ZONA) FROM data_encuestas_final"
        "SELECT DISTINCT(ZONA) FROM gestionfinal"
    )
    if zonas != None and len(zonas) > 0:
        for zona in zonas:
            ciudades_temp = generalQuery(
                # f"SELECT DISTINCT(CIUDAD) FROM data_encuestas_final WHERE ZONA = '{zona[0]}';"
                f"SELECT DISTINCT(CIUDAD) FROM gestionfinal WHERE ZONA = '{zona[0]}';"
            )
            for ciudad in ciudades_temp:
                result[f"{ciudad[0]}"] = {
                    "status": True,
                    "display_name": f"{ciudad[0]}",
                    "type": f"{zona[0]}",
                }

    return result
