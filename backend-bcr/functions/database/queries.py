from mysql.connector import Error
from functions.database.connect import connect, closeConnection


def generalQuery(query: str, typeDB=1):
    connection = connect(typeDB)
    if connection == None:
        return None
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            closeConnection(connection)
            # print("se cerro la conexión y la query fue exitosa")
            return result
    except Error as e:
        print("error in general query: ", e)
        closeConnection(connection)
        return None


def updateQuery(query: str):
    connection = connect()
    response = {"message": "", "success": True}
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            connection.commit()
            rowcount = cursor.rowcount
            response["message"] = "rowcount: {}".format(rowcount)
            closeConnection(connection)
            return response
    except Error as e:
        print("error in updateQuery: ", e)
        response["message"] = "error in updateQuery: {}".format(e)
        response["success"] = False
        closeConnection(connection)
        return response


def queryOptions(query: str, options: dict):
    connection = connect()
    response = {"message": "", "success": True, "result": []}
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            if options["fetchOption"] == "all":
                result = cursor.fetchall()
                response["result"] = result
            elif options["fetchOption"] == "one":
                result = cursor.fetchone()
                response["result"] = result
            closeConnection(connection)
            return response
    except Error as e:
        response["message"] = "error in updateQuery: {}".format(e)
        response["success"] = False
        closeConnection(connection)
        return response
