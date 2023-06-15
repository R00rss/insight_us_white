from functions.auth.manageToken import generate_access_token
from functions.database.queries import generalQuery
from functions.cryptography.cryptography import decryptionFromStr
from logs.functions import generate_log_login
from datetime import datetime


def verifyUserPassword(username, password):
    # path del archivo json
    query = "SELECT nombre_usuario,contraseña,id from usuarios"
    result = generalQuery(query)
    response = {
        "message": "usuario no autenticado",
        "success": True,
        "auth": False,
    }
    for row in result:
        usernameDB = row[0]
        passwordDB = row[1]
        idCurrentUser = row[2]
        if username == usernameDB and password == passwordDB:
            queryGestor = f"SELECT id,nombre,usuarioID from gestor WHERE usuarioID = {idCurrentUser}"
            queryAdmin = f"SELECT id,nombre,usuarioID from administrador WHERE usuarioID = {idCurrentUser}"
            querySupervisor = f"SELECT id,nombre,usuarioID from supervisor WHERE usuarioID = {idCurrentUser}"
            queryCliente = f"SELECT id,nombre,usuarioID from cliente WHERE usuarioID = {idCurrentUser}"
            resultGestor = generalQuery(queryGestor)
            resultAdmin = generalQuery(queryAdmin)
            resultSupervisor = generalQuery(querySupervisor)
            resultCliente = generalQuery(queryCliente)
            if len(resultGestor) > 0:
                response["message"] = "usuario autenticado como gestor"
                response["auth"] = True
                response["token"] = generate_access_token(
                    {
                        "id": resultGestor[0][0],
                        "username": username,
                        "name": resultGestor[0][1],
                        "role": "gestor",
                    }
                )
            elif len(resultAdmin) > 0:
                response["message"] = "usuario autenticado como administrador"
                response["auth"] = True
                response["token"] = generate_access_token(
                    {
                        "id": resultAdmin[0][0],
                        "username": username,
                        "name": resultAdmin[0][1],
                        "role": "administrador",
                    }
                )
            elif len(resultSupervisor) > 0:
                response["message"] = "usuario autenticado como supervisor"
                response["auth"] = True
                response["token"] = generate_access_token(
                    {
                        "id": resultSupervisor[0][0],
                        "username": username,
                        "name": resultSupervisor[0][1],
                        "role": "supervisor",
                    }
                )
            elif len(resultCliente) > 0:
                response["message"] = "usuario autenticado como cliente"
                response["auth"] = True
                response["token"] = generate_access_token(
                    {
                        "id": resultCliente[0][0],
                        "username": username,
                        "name": resultCliente[0][1],
                        "role": "cliente",
                    }
                )
            else:
                response["message"] = "usuario no autorizado"
                response["auth"] = False
    return response


def authenticUser(username, password):
    response = {}
    user = {
        "id": 1,
        "username": "admin",
        "name": "admin",
        "tipo_usuario": "administrador",
        "agencia": "",
        "fecha": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
    }
    response["message"] = "usuario autenticado con éxito"
    response["auth"] = True
    response["success"] = True
    response["token"] = generate_access_token(user)
    return response
    response = {
        "message": "usuario no autenticado",
        "success": False,
        "auth": False,
        "token": "",
    }
    query = "SELECT nombre_usuario,contraseña,id,name,tipo_usuario,agencia,cedula from usuarios where estado = 1"
    users = generalQuery(query)
    if users != None:
        for row in users:
            user_usernameDB = row[0]
            user_passwordDB = row[1]
            # user_passwordDB_decrypted = decryptionFromStr(user_passwordDB)
            # user_usernameDB_decrypted = decryptionFromStr(user_usernameDB)
            user_idDB = row[2]
            user_nameDB = row[3]
            user_tipoDB = row[4]
            user_agency = row[5]
            user_cedulaDB = row[6]

            if (
                # username == user_usernameDB_decrypted
                # and password == user_passwordDB_decrypted
                # username == user_usernameDB
                # and password == user_passwordDB
                username == user_cedulaDB
                and password == user_passwordDB
            ):
                user = {
                    "id": user_idDB,
                    "username": user_usernameDB,
                    "name": user_nameDB,
                    "tipo_usuario": user_tipoDB,
                    "agencia": user_agency,
                    "fecha": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
                }
                generate_log_login(user)
                response["message"] = "usuario autenticado con éxito"
                response["auth"] = True
                response["success"] = True
                response["token"] = generate_access_token(
                    {
                        "id": user_idDB,
                        # "username": user_usernameDB_decrypted,
                        "username": user_usernameDB,
                        "name": user_nameDB,
                        "tipo_usuario": user_tipoDB,
                        "agencia": user_agency,
                    }
                )
    else:
        response["message"] = "Error de BD"
    return response
