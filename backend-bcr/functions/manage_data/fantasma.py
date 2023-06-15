import pandas as pd
from os import path
import os
from functions.database.queries import generalQuery, updateQuery
import json


folder_path = path.dirname(__file__)

preguntas_path = "preguntas_fantasma_1.xlsx"
cajeros_path = "cajero_agencias.xlsx"

file_preguntas = path.abspath(path.join(folder_path, "../../docs/", preguntas_path))
file_cajeros = path.abspath(path.join(folder_path, "../../docs/", cajeros_path))


def generate_data_fantasma():
    try:
        if not (os.path.exists(file_preguntas) and os.path.exists(file_cajeros)):
            return "no existe"

        new_columns_names = {
            "EL PORTAL": "PORTAL SHOPPING",
            "EXPRESS JAPON MANTA": "SERVIP EXPRESS JAPON MANTA",
            "EXPRESS UNIVERSIDAD CENTRAL": "SERVP EXPRESS UNIVERSIDAD CENTRAL",
            "GRAN AKI DURAN": "GRAN AKI DURÁN",
            "MOLINEROS EXPRESS": "MOLINEROS",
        }
        # reading excel files
        df_cajeros = pd.read_excel(file_cajeros)
        df_preguntas = pd.read_excel(file_preguntas)
        # formatting dataFrames
        df_preguntas = df_preguntas.apply(lambda x: x.replace("-", 1))
        df_preguntas = df_preguntas.replace('"', "`", regex=True)
        df_preguntas = df_preguntas.rename(columns=new_columns_names)
        df_cajeros = df_cajeros.replace(new_columns_names)

        agencias = df_preguntas.keys().tolist()[1:]
        agencias.sort()

        preguntas = df_preguntas["PREGUNTA"].tolist()

        preguntas_actitud = preguntas[:7]
        preguntas_destrezas = preguntas[7:11]
        preguntas_imagen = preguntas[11:13]

        def generate_items(arr, arr_calf):
            items = []
            for i in range(len(arr)):
                obj_aux = {
                    "id": i + 1,
                    "question": arr[i],
                    "total": 100,
                    "correct": arr_calf[i] * 100,
                }
                items.append(obj_aux)
            return items

        def generate_plantilla(arr_calf):
            items_actitud = generate_items(preguntas_actitud, arr_calf)
            items_destrezas = generate_items(preguntas_destrezas, arr_calf)
            items_imagen = generate_items(preguntas_imagen, arr_calf)

            plantilla = {
                "actitud": {"display_name": "Actitud", "items": items_actitud},
                "destrezas_de_servicio": {
                    "display_name": "Destrezas de servicio",
                    "items": items_destrezas,
                },
                "imagen_y_orden": {
                    "display_name": "Imagen y orden",
                    "items": items_imagen,
                },
            }
            return plantilla

        query_str = "INSERT INTO plantillas_cliente_fantasma (medicion,zona,ciudad, agencia,tipo_agencia, cajero,fecha, ingresador_id, supervisor_id, items) VALUES "
        for agencia in agencias:
            arr_calf = df_preguntas[agencia].tolist()
            result = generalQuery(
                f"SELECT ZONA,CIUDAD,TIPO_AGENCIA FROM `gestionfinal` WHERE AGENCIA = '{agencia}' "
            )
            medicion = "M1"
            zona = result[0][0]
            ciudad = result[0][1]
            tipo_agencia = result[0][2]
            cajero = df_cajeros.loc[df_cajeros["AGENCIA"] == f"{agencia}"][
                "COLABORADOR"
            ].iloc[0]
            fecha = ""
            ingresador_id = 100
            supervisor_id = 100
            plantilla = generate_plantilla(arr_calf)
            encoded_JSON = json.dumps(plantilla, ensure_ascii=False)
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
                + f"{supervisor_id},"
                + f"'{encoded_JSON}'"
                + "),"
            )
            # return query_str[:-1]
            # return updateQuery(query_str[:-1])
        # return query_str[:-1]
        result_query = updateQuery(query_str[:-1])
        print(result_query)
        return result_query

    except Exception as e:
        print(e)
        return False
