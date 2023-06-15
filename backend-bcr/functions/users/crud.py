from functions.database.queries import generalQuery, updateQuery
from functions.cryptography.cryptography import decryptionFromStr


def getUsers():
    query = "select * from usuarios;"
    query_result = generalQuery(query)
    result = []
    if query == None:
        return None
    # if(len(query_result[0]) ==10):
    for row in query_result:
        temp_user = {
            "id": row[0],
            "nombre_usuario": decryptionFromStr(row[1]),
            "contraseña": decryptionFromStr(row[2]),
            "estado": row[3],
            "tipo_usuario": row[4],
            "name": decryptionFromStr(row[5]),
            "cedula": decryptionFromStr(row[6]),
            "ciudad": row[7],
            "provincia": row[8],
            "sector": row[9],
            "email": decryptionFromStr(row[10]),
        }
        result.append(temp_user)
    return result


def generate_fake_random_password() -> str:
    import random
    import string

    special_characters = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "{",
        "}",
        "[",
        "]",
        "|",
        ";",
        ":",
        "<",
        ">",
        "?",
        "/",
        "~",
        "`",
    ]
    letters = string.ascii_lowercase
    letters = letters + letters.upper() + "".join(special_characters)
    length = 17
    result_str = "".join(random.choice(letters) for i in range(length))
    return result_str


def generate_users_excel():
    import pandas as pd

    # query_users = "select DISTINCT(id) from usuarios"
    # query_users_result = generalQuery(query_users)

    # for row in query_users_result:
    #     result_str = generate_fake_random_password()
    #     query_update = (
    #         f"update usuarios set contraseña = '{result_str}' where id = {row[0]}"
    #     )
    #     updateQuery(query_update)

    query = "select cedula,name,contraseña,agencia from usuarios;"
    query_result = generalQuery(query)
    data_filtrada_df = pd.DataFrame(query_result)
    data_filtrada_df = data_filtrada_df.rename(
        columns={
            0: "Cedula",
            1: "Nombres",
            2: "Contraseña",
            3: "Agencia/s",
        }
    )

    return data_filtrada_df


def generate_users():
    query = "select id,entidad,cedula,name,nombre_usuario,contraseña,email,tipo_usuario,zona,ciudad,agencia,estado from usuarios;"
    query_result = generalQuery(query)
    result = []
    if query_result == None:
        return None
    for row in query_result:
        temp_user = {
            "id": row[0],
            "entidad": row[1],
            "cedula": row[2],
            "name": row[3],
            "nombre_usuario": row[4],
            "contraseña": row[5],
            "email": row[6],
            "tipo_usuario": row[7],
            "zona": row[8],
            "ciudad": row[9],
            "agencia": row[10],
            "estado": row[11],
        }
        result.append(temp_user)
    # query_insert = f"insert into usuarios_metricas (id,entidad,cedula,name,nombre_usuario,contraseña,email,tipo_usuario,zona,ciudad,agencia,estado) values (%{},%{},%{},%{},%{},%{},%{},%{},%{},%{},%{},%{})"

    return result
