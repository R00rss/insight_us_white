import re
import pandas as pd
from os import path
from os import listdir
from os.path import isfile, join
from models.filterData import filterDataModel
from functions.database.queries import updateQuery
from functions.cryptography.cryptography import encryptionFromStr, decryptionFromStr


pathname = path.dirname(path.realpath(__file__))
pathData = path.join(pathname, "docs", "Base.csv")


def getCompaniesFromExcel():
    df = pd.read_csv(pathData, sep=";")
    return df["Agencia"].unique().tolist()


def getGlobalData(data: filterDataModel):
    df = pd.read_csv(pathData, sep=";")
    df = df.fillna("sin valor")
    indicadoresExcel = (
        df[df["TIPO INDICADOR"] == data.tipo_indicador]["INDICADOR"].unique().tolist()
    )
    print(indicadoresExcel)
    companiesExcel = df["Agencia"].unique().tolist()
    fechasExcel = df["PERIODO"].unique().tolist()
    response = {
        "dataGlobal": {},
        "dataByDates": {},
        "dataByCompanies": {},
    }

    for fecha in fechasExcel:
        dfFecha = df[df["PERIODO"] == fecha]
        response["dataByDates"][fecha] = {}
        for indicador in indicadoresExcel:
            temp = dfFecha[dfFecha["INDICADOR"] == indicador]["CALCULO PB"].to_list()
            tempAcc = 0
            tempAccInsatisfecho = 0
            tempAccSatisfecho = 0
            totalAcc = 1
            for i in range(len(temp)):
                if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
                    tempAcc += int(temp[i])
                    totalAcc += 1
                    if temp[i] == 0 or temp[i] == "0":
                        tempAccInsatisfecho += 1
                    elif temp[i] == 1 or temp[i] == "1":
                        tempAccSatisfecho += 1

            response["dataByDates"][fecha][indicador] = {
                "total": tempAcc / totalAcc,
                "insatisfecho": tempAccInsatisfecho / totalAcc,
                "satisfecho": tempAccSatisfecho / totalAcc,
            }
    for company in companiesExcel:
        dfCompany = df[df["Agencia"] == company]
        response["dataByCompanies"][company] = {}

        for indicador in indicadoresExcel:
            temp = dfCompany[dfCompany["INDICADOR"] == indicador][
                "CALCULO PB"
            ].to_list()
            tempAcc = 0
            tempAccInsatisfecho = 0
            tempAccSatisfecho = 0
            totalAcc = 1
            totalAccInsatisfecho = 1
            totalAccSatisfecho = 1
            for i in range(len(temp)):
                if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
                    tempAcc += int(temp[i])
                    totalAcc += 1
                    if temp[i] == 0 or temp[i] == "0":
                        tempAccInsatisfecho += 1
                    elif temp[i] == 1 or temp[i] == "1":
                        tempAccSatisfecho += 1

            response["dataByCompanies"][company][indicador] = {
                "total": tempAcc / totalAcc,
                "insatisfecho": tempAccInsatisfecho / totalAcc,
                "satisfecho": tempAccSatisfecho / totalAcc,
            }
    for indicador in indicadoresExcel:
        temp = df[df["INDICADOR"] == indicador]["CALCULO PB"].to_list()
        tempAcc = 0
        tempAccInsatisfecho = 0
        tempAccSatisfecho = 0
        totalAcc = 1
        totalAccInsatisfecho = 1
        totalAccSatisfecho = 1
        for i in range(len(temp)):
            if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
                tempAcc += int(temp[i])
                totalAcc += 1
                if temp[i] == 0 or temp[i] == "0":
                    tempAccInsatisfecho += 1
                elif temp[i] == 1 or temp[i] == "1":
                    tempAccSatisfecho += 1
        print(totalAcc, totalAccInsatisfecho, totalAccSatisfecho)

        response["dataGlobal"][indicador] = {
            "total": tempAcc / totalAcc,
            "insatisfecho": tempAccInsatisfecho / totalAcc,
            "satisfecho": tempAccSatisfecho / totalAcc,
        }
    return response


def getDataFiltrada(data: filterDataModel):
    flags = {
        "agencia": data.agencia != "",
        "tipo_indicador": data.tipo_indicador != "",
        "indicador": data.indicador != "",
        "periodo": data.fecha != "",
    }
    df = pd.read_csv(pathData, sep=";")
    df = df.fillna("sin valor")
    indicadoresExcel = (
        df[df["TIPO INDICADOR"] == data.tipo_indicador]["INDICADOR"].unique().tolist()
    )

    if flags["agencia"]:
        print("agencia")
        df = df[df["Agencia"] == data.agencia]
    if flags["tipo_indicador"]:
        print("tipo_indicador")
        df = df[df["TIPO INDICADOR"] == data.tipo_indicador]
    if flags["periodo"]:
        print("periodo")
        df = df[df["PERIODO"] == data.fecha]

    companiesExcel = df["Agencia"].unique().tolist()
    fechasExcel = df["PERIODO"].unique().tolist()
    response = {
        "dataFilter": {},
        "dataByDates": {},
        "dataByCompanies": {},
    }
    for fecha in fechasExcel:
        dfFecha = df[df["PERIODO"] == fecha]
        response["dataByDates"][fecha] = {}
        for indicador in indicadoresExcel:
            temp = dfFecha[dfFecha["INDICADOR"] == indicador]["CALCULO PB"].to_list()
            tempAcc = 0
            tempAccInsatisfecho = 0
            tempAccSatisfecho = 0
            totalAcc = 1
            totalAccInsatisfecho = 1
            totalAccSatisfecho = 1
            for i in range(len(temp)):
                if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
                    tempAcc += int(temp[i])
                    totalAcc += 1
                    if temp[i] == 0 or temp[i] == "0":
                        tempAccInsatisfecho += 1
                    elif temp[i] == 1 or temp[i] == "1":
                        tempAccSatisfecho += 1
            print(totalAcc, tempAcc, tempAccInsatisfecho, tempAccSatisfecho, indicador)

            response["dataByDates"][fecha][indicador] = {
                "total": tempAcc / totalAcc,
                "insatisfecho": tempAccInsatisfecho / totalAcc,
                "satisfecho": tempAccSatisfecho / totalAcc,
            }
    for company in companiesExcel:
        dfCompany = df[df["Agencia"] == company]
        response["dataByCompanies"][company] = {}

        for indicador in indicadoresExcel:
            temp = dfCompany[dfCompany["INDICADOR"] == indicador][
                "CALCULO PB"
            ].to_list()
            tempAcc = 0
            tempAccInsatisfecho = 0
            tempAccSatisfecho = 0
            totalAcc = 1
            totalAccInsatisfecho = 1
            totalAccSatisfecho = 1
            for i in range(len(temp)):
                if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
                    tempAcc += int(temp[i])
                    totalAcc += 1
                    if temp[i] == 0 or temp[i] == "0":
                        tempAccInsatisfecho += 1
                    elif temp[i] == 1 or temp[i] == "1":
                        tempAccSatisfecho += 1
            print(totalAcc, tempAcc, tempAccInsatisfecho, tempAccSatisfecho, indicador)

            response["dataByCompanies"][company][indicador] = {
                "total": tempAcc / totalAcc,
                "insatisfecho": tempAccInsatisfecho / totalAcc,
                "satisfecho": tempAccSatisfecho / totalAcc,
            }
    for indicador in indicadoresExcel:
        temp = df[df["INDICADOR"] == indicador]["CALCULO PB"].to_list()
        tempAcc = 0
        tempAccInsatisfecho = 0
        tempAccSatisfecho = 0
        totalAcc = 1
        totalAccInsatisfecho = 1
        totalAccSatisfecho = 1
        for i in range(len(temp)):
            if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
                tempAcc += int(temp[i])
                totalAcc += 1
                if temp[i] == 0 or temp[i] == "0":
                    tempAccInsatisfecho += 1
                elif temp[i] == 1 or temp[i] == "1":
                    tempAccSatisfecho += 1
        print(totalAcc, tempAcc, tempAccInsatisfecho, tempAccSatisfecho, indicador)
        response["dataFilter"][indicador] = {
            "total": tempAcc / totalAcc,
            "insatisfecho": tempAccInsatisfecho / totalAcc,
            "satisfecho": tempAccSatisfecho / totalAcc,
        }
    return response


# def getDataFiltrada(data: filterDataModel):
#     df = pd.read_csv(pathData, sep=";")
#     df = df.fillna("sin valor")
#     flags = {
#         "agencia": data.agencia != "",
#         "tipo_indicador": data.tipo_indicador != "",
#         "indicador": data.indicador != "",
#         "periodo": data.fecha != "",
#     }
#     indicadoresExcel = (
#         df[df["TIPO INDICADOR"] == data.tipo_indicador]["INDICADOR"].unique().tolist()
#     )
#     response = {
#         "dataFilter": {},
#         "dataByDates": {},
#         "dataByCompanies": {},
#     }

#     if flags["agencia"]:
#         print("agencia")
#         df = df[df["Agencia"] == data.agencia]
#     if flags["tipo_indicador"]:
#         print("tipo_indicador")
#         df = df[df["TIPO INDICADOR"] == data.tipo_indicador]
#     if flags["periodo"]:
#             print("periodo")
#             df = df[df["PERIODO"] == data.fecha]

#     for indicador in indicadoresExcel:
#         temp = df[df["INDICADOR"] == indicador]["CALCULO PB"].to_list()
#         tempAcc = 0
#         for i in range(len(temp)):
#             if temp[i] == 0 or temp[i] == 1 or temp[i] == "0" or temp[i] == "1":
#                 tempAcc += int(temp[i])
#                 if temp[i] == 0 or temp[i] == "0":
#                     tempAccInsatisfecho += 1
#                 else:
#                     tempAccSatisfecho += 1
#         response["dataFilter"][indicador] = tempAcc / len(temp)

#     # print(df.to_dict())
#     response["data"] = df.to_dict()
#     return response


def getIndicadoresByTipoIndicadorExcel(tipo_indicador: str):
    df = pd.read_csv(pathData, sep=";")
    return df[df["TIPO INDICADOR"] == tipo_indicador]["INDICADOR"].unique().tolist()


def getInicialDataFromExcel():
    df = pd.read_csv(pathData, sep=";")
    return {
        "companies": df["Agencia"].unique().tolist(),
        "tipo_indicador": df["TIPO INDICADOR"].unique().tolist(),
        "fechas": df["PERIODO"].unique().tolist(),
    }


def readReportsExcel():
    pathData = path.join(pathname, "docs", "Base.csv")
    df = pd.read_csv(pathData, sep=";")
    return df.keys().to_list()


def searchSpecificReport(id16, idContact):
    testNames = {
        "messages": path.join(
            pathname,
            "docs",
            "01 ENERO 2022",
            "CACPEG",
            "MENSAJES_CACPEG_01-01-2022 AL 31-01-2022.csv",
        ),
        "conversations": path.join(
            pathname,
            "docs",
            "01 ENERO 2022",
            "CACPEG",
            "CONVERSACIONES_CACPEG_01-01-2022 AL 31-01-2022.csv",
        ),
        "contacts": path.join(
            pathname,
            "docs",
            "01 ENERO 2022",
            "CACPEG",
            "CONTACTS_CACPEG_01-01-2022 AL 31-01-2022.csv",
        ),
    }
    result = {}
    dfArray = {}
    totalLens = {}
    for name in testNames.keys():
        dfArray[name] = pd.read_csv(
            testNames[name]
        )  # crea un df por cada key en testnames

    for name in dfArray.keys():
        if name == "messages":
            result[name] = dfArray[name][dfArray[name]["Message ID"] == id16]
        if name == "conversations":
            result[name] = dfArray[name][dfArray[name]["Conversation ID"] == id16]
        if name == "contacts":
            result[name] = dfArray[name][dfArray[name]["Contact ID"] == idContact]
    print(result)
    return totalLens


def getContacts():
    response = {}
    pathContacts = path.join(pathname, "docs", "contactos.csv")
    df = pd.read_csv(pathContacts)
    response["contacts"] = df.to_dict()
    return response


def getClients():

    # pathData = path.join(pathname, "docs", "coordinadores.csv")
    # df = pd.read_csv(pathData, sep=";", encoding="ISO-8859-1")
    # str_query = "INSERT INTO cliente (nombre_cliente) VALUES "
    # lista_agencias = df["AGENCIA"].unique()
    # for agencia in lista_agencias:
    #     str_query += f"('{agencia}'),"
    # return(str_query[:-1] + ";")

    pathData = path.join(pathname, "docs", "coordinadores.csv")
    df = pd.read_csv(pathData, sep=";", encoding="ISO-8859-1")
    str_query = "INSERT INTO usuarios (nombre_usuario,contraseña,tipo_usuario,name,cedula,ciudad,provincia,sector,email) VALUES "
    lista_usuarios = df["usuario"].unique().tolist()
    count = 0
    return lista_usuarios
    for usuario in lista_usuarios:
        aux = df[df["usuario"] == usuario].to_dict()
        # aux_username = encryptionFromStr(usuario)
        aux_username = usuario
        aux_cliente = "cliente"
        # aux_password = encryptionFromStr(f"{usuario}123@.")
        aux_password = f"{usuario}123@."
        # aux_name = encryptionFromStr(aux["COORDINADOR"][count])
        aux_name = aux["COORDINADOR"][count]
        aux_cedula = str(aux["Cedula"][count])
        # aux_cedula = encryptionFromStr(str(aux["Cedula"][count]))
        aux_ciudad = aux["CIUDAD"][count]
        aux_provincia = aux["PROVINCIA"][count]
        aux_sector = aux["SECTOR"][count]
        # aux_mail = encryptionFromStr(aux["mail "][count])
        aux_mail = aux["mail "][count]
        str_query += f"('{aux_username}','{aux_password}','{aux_cliente}','{aux_name}','{aux_cedula}','{aux_ciudad}','{aux_provincia}','{aux_sector}','{aux_mail}'),"
        count += len(aux["COORDINADOR"])
    return str_query[:-1] + ";"
    # return updateQuery(str_query[:-1] + ";")


def formatMessages(date: dict, coop: str, contact):
    folderName = "docs"
    response = {}
    pathContacts = path.join(pathname, folderName, "contactos.csv")
    pathFiles = path.join(pathname, folderName, date["year"], date["month"], coop)
    onlyFiles = [f for f in listdir(pathFiles) if isfile(join(pathFiles, f))]
    df = pd.read_csv(pathContacts)
    response["contacts"] = df.to_dict()
    return response

    for file in onlyFiles:
        if file.endswith(".csv"):
            print(file)
            if re.search("contactos", file):
                print("contactos!!!!!!!!!!!!")
                df = pd.read_csv(path.join(pathFiles, file))
                df["dateToSort"] = pd.to_datetime(df["DateTime Created"])
                response["contacto"] = (
                    df[df["Contact ID"] == 20497760].sort_values("dateToSort").to_dict()
                )
            if re.search("mensajes", file):
                print("mensajes!!!!!!!!!!!!")
                df = pd.read_csv(path.join(pathFiles, file))
                df["dateToSort"] = pd.to_datetime(df["Date & Time"])
                response["mensajes"] = (
                    df[df["Contact ID"] == 20497760].sort_values("dateToSort").to_dict()
                )

            if re.search("conversaciones", file):
                print("conversaciones!!!!!!!!!!!!")
                df = pd.read_csv(path.join(pathFiles, file))
                df["dateToSort"] = pd.to_datetime(df["DateTime Conversation Started"])
                response["conversaciones"] = (
                    df[df["Contact ID"] == 20497760].sort_values("dateToSort").to_dict()
                )
    return response


def readReports():
    result = {}
    testNames = {
        "messages": path.join(
            pathname,
            "docs",
            "01 ENERO 2022",
            "CACPEG",
            "MENSAJES_CACPEG_01-01-2022 AL 31-01-2022.csv",
        ),
        "conversations": path.join(
            pathname,
            "docs",
            "01 ENERO 2022",
            "CACPEG",
            "CONVERSACIONES_CACPEG_01-01-2022 AL 31-01-2022.csv",
        ),
        "contacts": path.join(
            pathname,
            "docs",
            "01 ENERO 2022",
            "CACPEG",
            "CONTACTS_CACPEG_01-01-2022 AL 31-01-2022.csv",
        ),
    }
    dfArray = {}
    totalLens = {}
    for name in testNames.keys():
        dfArray[name] = pd.read_csv(testNames[name])

    for name in dfArray.keys():
        obtainedLens = {}
        totalLens[name] = {}
        if name == "messages":
            result[name] = dfArray[name][
                dfArray[name]["Message ID"] == 1642622078057599
            ].to_dict()
            obtainedLens = {
                "Message ID": [],
                "Contact ID": [],
                "Channel ID": [],
                "Sender ID": [],
            }
        if name == "conversations":
            obtainedLens = {"Conversation ID": [], "Contact ID": [], "Assignee": []}
            result[name] = dfArray[name][
                dfArray[name]["Contact ID"] == 22253642
            ].to_dict()
        if name == "contacts":
            obtainedLens = {
                "Contact ID": [],
            }
            result[name] = dfArray[name][
                dfArray[name]["Contact ID"] == 22253642
            ].to_dict()

        for key in obtainedLens.keys():
            totalLens[name]["items"] = dfArray[name][key].unique().tolist()
            auxArrayKeys = dfArray[name][key].tolist()
            for item in auxArrayKeys:
                if str(item) != "nan":
                    auxLen = len(str(int(item)))
                    if auxLen not in obtainedLens[key]:
                        print(item, key, auxLen)
                        obtainedLens[key].append(auxLen)
            totalLens[name]["keys"] = obtainedLens
    return totalLens
    # return result


def getDataVOCEncuestaFiltrada():
    return "testing"
