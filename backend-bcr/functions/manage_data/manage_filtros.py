from functions.database.queries import generalQuery


def filtro_periodos():  # test
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(PERIODO) FROM data_encuestas_final ORDER BY PERIODO DESC"
        "SELECT DISTINCT(PERIODO) FROM gestionfinal ORDER BY PERIODO DESC"
    )
    if zonas != None and len(zonas) > 0:
        for zona in zonas:
            result[f"{zona[0]}"] = {
                "status": True,
                "display_name": f"{zona[0]}",
                "selected_all": True,
            }
    return result


def filtro_zona_cuidad():  # test
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(ZONA) FROM data_encuestas_final ORDER BY PERIODO DESC"
        "SELECT DISTINCT(ZONA) FROM gestionfinal ORDER BY PERIODO DESC"
    )
    if zonas != None and len(zonas) > 0:
        for zona in zonas:
            ciudades_temp = generalQuery(
                # f"SELECT DISTINCT(CIUDAD) FROM data_encuestas_final WHERE ZONA = '{zona[0]}';"
                f"SELECT DISTINCT(CIUDAD) FROM gestionfinal WHERE ZONA = '{zona[0]}';"
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


def filtro_tipo_agencia_agencia():
    result = {}
    zonas = generalQuery(
        # "SELECT DISTINCT(TIPO_AGENCIA) FROM data_encuestas_final ORDER BY PERIODO DESC"
        "SELECT DISTINCT(TIPO_AGENCIA) FROM gestionfinal ORDER BY PERIODO DESC"
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
        # "SELECT DISTINCT(ZONA) FROM data_encuestas_final ORDER BY PERIODO DESC"
        "SELECT DISTINCT(ZONA) FROM gestionfinal ORDER BY PERIODO DESC"
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
