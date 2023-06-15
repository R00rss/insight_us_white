from decouple import config
import mysql.connector
from mysql.connector import Error

DB_HOST_I = config("DB_HOST_I")
DB_NAME_I = config("DB_NAME_I")
DB_USER_I = config("DB_USER_I")
DB_PASS_I = config("DB_PASS_I")
DB_PORT_I = config("DB_PORT_I")


def connect(typeDB=1):   
        try:
            return mysql.connector.connect(
                host=DB_HOST_I,
                user=DB_USER_I,
                password=DB_PASS_I,
                database=DB_NAME_I,
                port=DB_PORT_I,
            )
        except Error as e:
            print(e)
            return None


def closeConnection(connection):
    if connection.is_connected():
        connection.close()
