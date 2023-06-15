import re
import pandas as pd
from os import path
from os import listdir
from os.path import isfile, join
from models.filterData import filterDataModel
from functions.database.queries import updateQuery, generalQuery
from functions.cryptography.cryptography import encryptionFromStr, decryptionFromStr
import random

pathname = path.dirname(path.realpath(__file__))
pathData = path.join(pathname, "docs", "base_encuestas_limpia.csv")


def assign_random_attribute(x):
    random_attributes = [
        "Costos",
        "Acceso a Credito",
        "Cobertura",
        "Fecha de pago",
        "Tiempo de espera",
    ]
    return random.choice(random_attributes)


def getInicialDataForFiltersEncuestas():
    agencias = generalQuery(
        "SELECT DISTINCT AGENCIA FROM data_encuestas_final ORDER BY PERIODO DESC"
    )
    periodos = generalQuery(
        "SELECT DISTINCT PERIODO FROM data_encuestas_final ORDER BY PERIODO DESC"
    )
    ciudades = generalQuery(
        "SELECT DISTINCT CIUDAD FROM data_encuestas_final ORDER BY PERIODO DESC"
    )
    return {
        "periodos": [x[0] for x in periodos] if periodos != None else [],
        'tipos de agencia': ['servipagos','express'],
        "agencias": [x[0] for x in agencias] if agencias != None else [],
        "ciudades": [x[0] for x in ciudades] if agencias != None else [],
        "indicadores": ["promesa de servicio", "experiencia"],
        "subindicadores": {
            "promesa de servicio": ["agilidad", "amabilidad"],
            # "experiencia": ["esfuerzo", "recomendación", "satifacción general"],
            "experiencia": ["satifacción general", "recomendación", "esfuerzo"],
        },
        "zonas": ['La roldos',"las casas"],
    }


def getDataEncuestas(filters):
    DEFAULT_OPTION = "Todos"
    string_query_periodo = (
        f"'{filters['periodo']}'"
        if filters["periodo"].lower() != DEFAULT_OPTION.lower()
        else f"'%%'"
    )
    string_query_agencia = (
        f"'{filters['agencia']}';"
        if filters["agencia"].lower() != DEFAULT_OPTION.lower()
        else f"'%%'"
    )

    return generalQuery(
        f"SELECT * FROM data_encuestas_final WHERE PERIODO like {string_query_periodo} AND AGENCIA like {string_query_agencia}"
    )


def getDataEncuestasTotal():
    result = []
    query_result = generalQuery(
        "SELECT * FROM data_encuestas_final where ResultLevel1 like '%CU1%';"
    )
    # result = query_result
    if query_result != None:
        for row in query_result:
            result.append(
                {
                    "agencia": row[27],
                    "seccion": row[28],
                    "periodo": row[29],
                    "area": row[30],
                    "experiencia": {
                        "NPS": {
                            "preguntas": [
                                row[36],
                                row[37],
                            ],
                            "respuestas": [
                                row[38],
                                row[39],
                            ],
                        },
                        "INS": {
                            "preguntas": [
                                row[41],
                                row[42],
                            ],
                            "respuestas": [
                                row[43],
                                row[44],
                            ],
                        },
                        "CES": {
                            "preguntas": [
                                row[46],
                                row[47],
                            ],
                            "respuestas": [
                                row[48],
                                row[49],
                            ],
                        },
                    },
                    "promesa de servicio": {
                        "agilidad": {
                            "preguntas": [
                                row[51],
                                # row[51],
                            ],
                            "respuestas": [
                                row[71],
                                # row[71],
                            ],
                        },
                        "amabilidad": {
                            "preguntas": [
                                row[57],
                                # row[52],
                                # row[53],
                            ],
                            "respuestas": [
                                row[77],
                                # row[72],
                                # row[73],
                            ],
                        },
                    },
                }
            )
    return result

    # df = pd.read_csv(pathData, sep=";")
    # # df = df.fillna("Sin datos")
    # # df = df.drop(["COD. ENCUESTA", "COD. ENCUESTA.1", "COD. ENCUESTA.2"], axis=1)
    # print(df.isnull().sum())
    # # df["EXPERIENCIA_ESFUERZO"] = df["EXPERIENCIA_ESFUERZO"].apply(
    # #     assign_random_attribute
    # # )
    # # df.to_csv(path.join(pathname,'base_encuestas_limpia.csv'), sep=";", index=False) #una sola vez para generar el archivo
    # # print("old", df["PERIODO"].unique())

    # print("keys", df.keys())
    # new_df = df.loc[df["PERIODO"] == filters["PERIODO"]]
    # new_df = new_df.loc[df["PUNTO NOMBRE"] == filters["PUNTO NOMBRE"]]
    # # print("new", new_df["PERIODO"].unique())
    # # print("new", new_df.value_counts().to_json())
    # # print("old again", df["PERIODO"].unique())
    # return new_df.to_json()
    # # PUNTO NOMBRE->agencias
    # return df["SECCIÓN NOMBRE"].value_counts().to_json()
