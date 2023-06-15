from functions.database.queries import generalQuery, updateQuery
import json
import random


def generate_fake_data_cliente_fantasma():
    default_data_items = {
        "actitud": {
            "display_name": "Actitud",
            "items": [
                {
                    "id": 1,
                    "question": "invita a pasar al cliente a la caja diciendo: `Siga por favor`,`Continue Señor(a)`",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 2,
                    "question": "Saluda al cliente con `Buenos días/tardes, bienvenido(a) a Servipagos`",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 3,
                    "question": "Mantiene contacto visual con el cliente",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 4,
                    "question": "Utiliza frases amables en la atención `Por favor`, `Gracias`,`Permítame`",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 5,
                    "question": "Durante la atención trata por el apellido al cliente",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 6,
                    "question": "Se despide del cliente diciendo `Que tenga un buen dia/tarde, Gracias por visitarnos`",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
            ],
        },
        "destrezas_de_servicio": {
            "display_name": "Destrezas de servicio",
            "items": [
                {
                    "id": 1,
                    "question": "Mantiene un buen conocimiento de los procesos que realiza",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 2,
                    "question": "Resuelve con claridad los requerimientos e inquietudes de los clientes",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 3,
                    "question": "Demuestra agilidad en la atención",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 4,
                    "question": "No interrumpe el servicio por conversaciones personales",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
            ],
        },
        "imagen_y_orden": {
            "display_name": "Imagen y orden",
            "items": [
                {
                    "id": 1,
                    "question": "Apariencia personal limpia y ordenada: uso de uniforme, elementos no llamativos, maquillaje, peinados sobrios",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
                {
                    "id": 2,
                    "question": "Escritorio limpio, papeles ordenados, no elementos decorativos personales, uso de material institucional",
                    "total": 100,
                    "correct": random.choice([100, 100, 100, 0]),
                },
            ],
        },
    }
    return default_data_items


default_zones = {
    "ZONA 1": {"selected": True, "display_name": "ZONA 1"},
    "ZONA 2": {"selected": True, "display_name": "ZONA 2"},
}
default_zones_cities = [
    {"id": 0, "selected": True, "name": "IBARRA", "zona": "ZONA 1"},
    {"id": 1, "selected": True, "name": "CUENCA", "zona": "ZONA 2"},
    {"id": 2, "selected": True, "name": "QUITO", "zona": "ZONA 1"},
    {"id": 3, "selected": True, "name": "SANTO DOMINGO", "zona": "ZONA 1"},
    {"id": 4, "selected": True, "name": "RIOBAMBA", "zona": "ZONA 1"},
    {"id": 5, "selected": True, "name": "ESMERALDAS", "zona": "ZONA 1"},
    {"id": 6, "selected": True, "name": "LOJA", "zona": "ZONA 2"},
    {"id": 7, "selected": True, "name": "QUEVEDO", "zona": "ZONA 2"},
    {"id": 8, "selected": True, "name": "GUAYAQUIL", "zona": "ZONA 2"},
    {"id": 9, "selected": True, "name": "AMBATO", "zona": "ZONA 1"},
    {"id": 10, "selected": True, "name": "MANTA", "zona": "ZONA 2"},
    {"id": 11, "selected": True, "name": "MACHALA", "zona": "ZONA 2"},
    {"id": 12, "selected": True, "name": "LATACUNGA", "zona": "ZONA 1"},
]
default_type_agencies = {
    "AGENCIA": {"selected": True, "display_name": "AGENCIA"},
    "EXPRESS": {"selected": True, "display_name": "EXPRESS"},
}
default_agencies = [
    {
        "id": 0,
        "selected": True,
        "name": "CAYAMBE",
        "zona": "ZONA 1",
        "ciudad": "IBARRA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 1,
        "selected": True,
        "name": "IBARRA",
        "zona": "ZONA 1",
        "ciudad": "IBARRA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 2,
        "selected": True,
        "name": "CUENCA",
        "zona": "ZONA 2",
        "ciudad": "CUENCA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 3,
        "selected": True,
        "name": "GUAMANI",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 4,
        "selected": True,
        "name": "SERVIP EXPRESS AKI SANTO DOMINGO",
        "zona": "ZONA 1",
        "ciudad": "SANTO DOMINGO",
        "tipo_agencia": "EXPRESS",
    },
    {
        "id": 5,
        "selected": True,
        "name": "RIOBAMBA",
        "zona": "ZONA 1",
        "ciudad": "RIOBAMBA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 6,
        "selected": True,
        "name": "SANTO DOMINGO",
        "zona": "ZONA 1",
        "ciudad": "SANTO DOMINGO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 7,
        "selected": True,
        "name": "SOLANDA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 8,
        "selected": True,
        "name": "FUNDACION VISTA PARA TODOS",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "EXPRESS",
    },
    {
        "id": 9,
        "selected": True,
        "name": "MALDONADO",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 10,
        "selected": True,
        "name": "SANGOLQUI",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 11,
        "selected": True,
        "name": "PORTAL SHOPPING",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 12,
        "selected": True,
        "name": "ESMERALDAS",
        "zona": "ZONA 1",
        "ciudad": "ESMERALDAS",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 13,
        "selected": True,
        "name": "QUITUMBE",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 14,
        "selected": True,
        "name": "PANAMERICANA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 15,
        "selected": True,
        "name": "PATRIA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 16,
        "selected": True,
        "name": "LOJA",
        "zona": "ZONA 2",
        "ciudad": "LOJA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 17,
        "selected": True,
        "name": "TUMBACO",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 18,
        "selected": True,
        "name": "QUEVEDO",
        "zona": "ZONA 2",
        "ciudad": "QUEVEDO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 19,
        "selected": True,
        "name": "EL FORTIN",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 20,
        "selected": True,
        "name": "MULTIPLAZA AKI",
        "zona": "ZONA 1",
        "ciudad": "AMBATO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 21,
        "selected": True,
        "name": "25 DE JULIO",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 22,
        "selected": True,
        "name": "ATAHUALPA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 23,
        "selected": True,
        "name": "GRAN AKI DURÁN",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 24,
        "selected": True,
        "name": "LA COMPAÑIA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 25,
        "selected": True,
        "name": "TOTORACOCHA EXPRESS",
        "zona": "ZONA 2",
        "ciudad": "CUENCA",
        "tipo_agencia": "EXPRESS",
    },
    {
        "id": 26,
        "selected": True,
        "name": "PLAZA ALEGRIA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 27,
        "selected": True,
        "name": "SERVIP MULTIPLAZA LOS CHILLOS",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 28,
        "selected": True,
        "name": "SUPER AKI SAN EDUARDO",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 29,
        "selected": True,
        "name": "CARCELEN",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 30,
        "selected": True,
        "name": "AMBATO",
        "zona": "ZONA 1",
        "ciudad": "AMBATO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 31,
        "selected": True,
        "name": "MOLINEROS",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 32,
        "selected": True,
        "name": "LABRADOR",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 33,
        "selected": True,
        "name": "CENTRUM EL BOSQUE",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 34,
        "selected": True,
        "name": "PUERTAS DEL SOL",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 35,
        "selected": True,
        "name": "LOS RIOS",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 36,
        "selected": True,
        "name": "POLICENTRO",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 37,
        "selected": True,
        "name": "PRENSA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 38,
        "selected": True,
        "name": "CALDERON",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 39,
        "selected": True,
        "name": "REINA VICTORIA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 40,
        "selected": True,
        "name": "CHILLOGALLO",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 41,
        "selected": True,
        "name": "SERVIP ORVE MANTA",
        "zona": "ZONA 2",
        "ciudad": "MANTA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 42,
        "selected": True,
        "name": "SERVIPAGOS EXPRESS BABAHOYO",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "EXPRESS",
    },
    {
        "id": 43,
        "selected": True,
        "name": "SERVIP EXPRESS AKI LOS SAUCES",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "EXPRESS",
    },
    {
        "id": 44,
        "selected": True,
        "name": "SAN FRANCISCO",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 45,
        "selected": True,
        "name": "MACHALA",
        "zona": "ZONA 2",
        "ciudad": "MACHALA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 46,
        "selected": True,
        "name": "AXXIS",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "EXPRESS",
    },
    {
        "id": 47,
        "selected": True,
        "name": "CUMBAYA",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 48,
        "selected": True,
        "name": "LATACUNGA",
        "zona": "ZONA 1",
        "ciudad": "LATACUNGA",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 49,
        "selected": True,
        "name": "LA LIBERTAD",
        "zona": "ZONA 2",
        "ciudad": "GUAYAQUIL",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 50,
        "selected": True,
        "name": "CARAPUNGO",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
    {
        "id": 51,
        "selected": True,
        "name": "SERVP EXPRESS UNIVERSIDAD CENTRAL",
        "zona": "ZONA 1",
        "ciudad": "QUITO",
        "tipo_agencia": "AGENCIA",
    },
]


mediciones = ["M1"]
zones = ["Zona1", "Zona2"]
cities = ["Quito", "Ambato"]
agencies = ["agencia1", "agencia2"]
cashiers = ["cajero1", "cajero2"]
dates = ["26-ene"]


def createPlantilla(
    ingresador_id,
    supervisor_id,
    medicion=None,
    zone=None,
    city=None,
    agency=None,
    cashier=None,
    date=None,
    items=None,
):
    try:
        result_query = generalQuery("SELECT DISTINCT(id) FROM usuarios")
        array_ids = []
        for id in result_query:
            array_ids.append(id[0])
        ingresador_id = random.choice(array_ids)
        supervisor_id = random.choice(array_ids)
        items = generate_fake_data_cliente_fantasma()
        medicion = random.choice(mediciones)
        zone = random.choice(list(default_zones.keys()))
        cities_with_selected_zone = [
            city for city in default_zones_cities if city["zona"] == zone
        ]
        city = random.choice(cities_with_selected_zone)["name"]
        type_agency = random.choice(list(default_type_agencies.keys()))
        agencies_with_selected_city_selected_zone = [
            agency
            for agency in default_agencies
            if agency["ciudad"] == city
            and agency["zona"] == zone
            and agency["tipo_agencia"] == type_agency
        ]
        agency = random.choice(agencies_with_selected_city_selected_zone)["name"]
        cashier = random.choice(cashiers)
        date = random.choice(dates)

        encoded_JSON = json.dumps(items, ensure_ascii=False)
        query_str = (
            "INSERT INTO plantillas_cliente_fantasma (medicion,zona,ciudad, agencia,tipo_agencia, cajero,fecha, ingresador_id, supervisor_id, items) VALUES ("
            + f"'{medicion}',"
            + f"'{zone}',"
            + f"'{city}',"
            + f"'{agency}',"
            + f"'{type_agency}',"
            + f"'{cashier}',"
            + f"'{date}',"
            + f"{ingresador_id},"
            + f"{supervisor_id},"
            + f"'{encoded_JSON}'"
            + ");"
        )
        # return query_str
        result_query = updateQuery(query_str)
        return result_query
    except Exception as e:
        print(e)
        return False


def get_data_total_fantasma():
    query_str = "SELECT items,plantillas_cliente_fantasma.id,medicion,plantillas_cliente_fantasma.zona,plantillas_cliente_fantasma.ciudad,plantillas_cliente_fantasma.agencia,cajero,fecha,estado_video,estado_plantilla,supervisor_id,ingresador_id,usuarios.name as ingresador_name,path_videos FROM plantillas_cliente_fantasma INNER JOIN usuarios on plantillas_cliente_fantasma.ingresador_id=usuarios.id"
    result_query = generalQuery(query_str)
    result = None
    if result_query != None:
        result = []
        for item in result_query:
            supervisor_user = getUsuario(item[10])
            obj_aux = {}
            obj_aux["id"] = item[1]
            obj_aux["medicion"] = item[2]
            obj_aux["zona"] = item[3]
            obj_aux["ciudad"] = item[4]
            obj_aux["agencia"] = item[5]
            obj_aux["cajero"] = item[6]
            obj_aux["fecha"] = item[7]
            obj_aux["estado_video"] = item[8]
            obj_aux["estado_plantilla"] = item[9]
            obj_aux["supervisor_id"] = item[10]
            obj_aux["supervisor_name"] = (
                supervisor_user["name"] if (supervisor_user != None) else "Sin datos"
            )
            obj_aux["ingresador_id"] = item[11]
            obj_aux["ingresador_name"] = item[12]
            obj_aux["path_videos"] = item[13]
            obj_aux["items"] = json.loads(item[0])
            result.append(obj_aux)
    return result


def filter_data_total_by_filters(
    mediciones: dict, zonas: dict, ciudades: list, agencias: list
):
    data_total = get_data_total_fantasma()
    if data_total != None:
        data_total_filtered = []
        list_mediciones = [
            key for key, value in mediciones.items() if value["selected"]
        ]
        list_zonas = [key for key, value in zonas.items() if value["selected"]]
        list_ciudades = [c["name"] for c in ciudades if c["selected"]]
        list_agencias = [a["name"] for a in agencias if a["selected"]]
        for item in data_total:
            if (
                item["medicion"] in list_mediciones
                and item["zona"] in list_zonas
                and item["ciudad"] in list_ciudades
                and item["agencia"] in list_agencias
            ):
                data_total_filtered.append(item)
        return data_total_filtered
    return None


def get_sub_promedio_fantasma(items: list) -> dict:
    total = 0
    for item in items:
        total += item["correct"]
    prom = total / len(items)
    return prom


def get_sub_prom_fantasmas_by_keys(items: list, keys: list) -> dict:
    promedio_platilla_agencia_aux = {}
    for key in keys:
        promedio_platilla_agencia_aux[key] = 0
        for item in items:
            promedio_platilla_agencia_aux[key] += get_sub_promedio_fantasma(
                item["items"][key]["items"]
            )
        # print(items)
        promedio_platilla_agencia_aux[key] /= len(items)
    # print(promedio_platilla_agencia_aux)
    return promedio_platilla_agencia_aux


def get_promedio_total_fantasma(data_filtered: list) -> dict:
    distinct_agencies = list(set([item["agencia"] for item in data_filtered]))
    distinct_meditions = list(set([item["medicion"] for item in data_filtered]))

    pesos_plantilla = {
        "actitud": 0.475,
        "destrezas_de_servicio": 0.475,
        "imagen_y_orden": 0.05,
    }
    keys = pesos_plantilla.keys()
    promedios_platilla_agencia = []
    for index, agency in enumerate(distinct_agencies):
        aux_list_data_filtered = [
            item for item in data_filtered if item["agencia"] == agency
        ]
        items = aux_list_data_filtered
        # print(items)
        # print(keys)
        proms_aux = get_sub_prom_fantasmas_by_keys(items, keys)
        # print(proms_aux)
        promedios_platilla_agencia.append(
            {
                "id": index + 1,
                "agencia": agency,
                "promedios_platilla": proms_aux,
            }
        )
    promedios_platilla_meditions = []
    for index, medition in enumerate(distinct_meditions):
        aux_list_data_filtered = [
            item for item in data_filtered if item["medicion"] == medition
        ]
        items = aux_list_data_filtered
        promedios_platilla_meditions.append(
            {
                "id": index + 1,
                "medicion": medition,
                "promedios_platilla": get_sub_prom_fantasmas_by_keys(items, keys),
            }
        )
    total = 0
    promedios_platilla_total = {
        "actitud": 0,
        "destrezas_de_servicio": 0,
        "imagen_y_orden": 0,
    }
    for key in keys:
        for item in data_filtered:
            promedios_platilla_total[key] += get_sub_promedio_fantasma(
                item["items"][key]["items"]
            )
        promedios_platilla_total[key] /= len(data_filtered)
        total += promedios_platilla_total[key] * pesos_plantilla[key]
    # print("--------------------------------------------------")
    return {
        "promedio_total_plantilla": total,
        "promedio_total_plantilla_per_attribute": promedios_platilla_total,
        "promedio_total_plantilla_per_agency": promedios_platilla_agencia,
        "promedio_total_plantilla_per_medition": promedios_platilla_meditions,
    }


def get_items_by_filters(medicion, zona, ciudad, agencia):
    query_str = f"SELECT items,plantillas_cliente_fantasma.id,medicion,plantillas_cliente_fantasma.zona,plantillas_cliente_fantasma.ciudad,plantillas_cliente_fantasma.agencia,cajero,fecha,estado_video,estado_plantilla,supervisor_id,ingresador_id,usuarios.name as ingresador_name,path_videos FROM plantillas_cliente_fantasma INNER JOIN usuarios on plantillas_cliente_fantasma.ingresador_id=usuarios.id WHERE medicion='{medicion}' AND plantillas_cliente_fantasma.zona='{zona}' AND plantillas_cliente_fantasma.ciudad='{ciudad}' AND plantillas_cliente_fantasma.agencia='{agencia}'"
    result_query = generalQuery(query_str)
    obj_aux = None
    if result_query != None and len(result_query) > 0:
        result_query = result_query[0]
        supervisor_user = getUsuario(result_query[10])
        obj_aux = {}
        obj_aux["id"] = result_query[1]
        obj_aux["medicion"] = result_query[2]
        obj_aux["zona"] = result_query[3]
        obj_aux["ciudad"] = result_query[4]
        obj_aux["agencia"] = result_query[5]
        obj_aux["cajero"] = result_query[6]
        obj_aux["fecha"] = result_query[7]
        obj_aux["estado_video"] = result_query[8]
        obj_aux["estado_plantilla"] = result_query[9]
        obj_aux["supervisor_id"] = result_query[10]
        obj_aux["supervisor_name"] = (
            supervisor_user["name"] if (supervisor_user != None) else "Sin datos"
        )
        obj_aux["ingresador_id"] = result_query[11]
        obj_aux["ingresador_name"] = result_query[12]
        obj_aux["path_videos"] = result_query[13]
        obj_aux["items"] = json.loads(result_query[0])
    return obj_aux


def getUsuario(id: int) -> dict | None:
    query_str = f"SELECT id,entidad,cedula,name,nombre_usuario,contraseña,email,tipo_usuario,zona,ciudad,agencia,estado FROM usuarios where id = {id}"
    result_query = generalQuery(query_str)
    obj_aux = None
    if result_query != None and result_query != []:
        result_query = result_query[0]
        obj_aux = {}
        obj_aux["id"] = result_query[0]
        obj_aux["entidad"] = result_query[1]
        obj_aux["cedula"] = result_query[2]
        obj_aux["name"] = result_query[3]
        obj_aux["nombre_usuario"] = result_query[4]
        obj_aux["contraseña"] = result_query[5]
        obj_aux["email"] = result_query[6]
        obj_aux["tipo_usuario"] = result_query[7]
        obj_aux["zona"] = result_query[8]
        obj_aux["ciudad"] = result_query[9]
        obj_aux["agencia"] = result_query[10]
        obj_aux["estado"] = result_query[11]
    return obj_aux


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
