import re
import pandas as pd
from os import path
from os import listdir
from os.path import isfile, join
from models.filterData import filterDataModel
from functions.database.queries import updateQuery
from functions.cryptography.cryptography import encryptionFromStr, decryptionFromStr
import re

pathname = path.dirname(path.realpath(__file__))
pathData = path.join(pathname, "docs", "Base.csv")
pathDataLimpia = path.join(pathname, "docs", "base_encuestas.csv")
pathDataAgenciasCruda = path.join(pathname, "docs", "data_agencias_cruda.csv")


def str_to_number_nota(str):
    if(str.casefold() =='FÁCIL'.casefold()): return 9
    if(str.casefold() =='FACIL'.casefold()): return 9
    if(str.casefold() =='POCO FÁCIL'.casefold()): return 9
    if(str.casefold() =='MUY FÁCIL'.casefold()): return 10
    if(str.casefold() =='MUY FACIL'.casefold()): return 10
    if(str.casefold() =='MEDIO'.casefold()): return 8
    if(str.casefold() =='DIFÍCIL'.casefold()): return 3
    if(str.casefold() =='DIFICIL'.casefold()): return 3
    if(str.casefold() =='MUY DIFICIL'.casefold()): return 2
    if(str.casefold() =='MUY DIFÍCIL'.casefold()): return 2
    return 0

def getDataExcel2():
    pathData = path.join(pathname, "docs", "Base.csv")
def csv_to_mysql():
    # query = 'INSERT INTO data_encuestas_final (ZONA,CIUDAD,TIPO_AGENCIA,AGENCIA,PERIODO,PREGUNTA_INS,RESPUESTA_INS,RESPUESTA_INS_1,PREGUNTA_NPS,RESPUESTA_NPS,RESPUESTA_NPS_1,PREGUNTA_CES, RESPUESTA_CES,RESPUESTA_CES_1,PREGUNTA_AMABILIDAD,RESPUESTA_8,RESPUESTA_9,PREGUNTA_AGILIDAD,RESPUESTA_10,RESPUESTA_11) values'
    query = 'INSERT INTO data_encuestas_final (ZONA,CIUDAD,TIPO_AGENCIA,AGENCIA,PERIODO,PREGUNTA_INS,RESPUESTA_INS,RESPUESTA_INS_1,PREGUNTA_NPS,RESPUESTA_NPS,RESPUESTA_NPS_1,PREGUNTA_CES, RESPUESTA_CES,RESPUESTA_CES_1,PREGUNTA_AMABILIDAD,RESPUESTA_AMABILIDAD,RESPUESTA_AMABILIDAD_I,PREGUNTA_AGILIDAD,RESPUESTA_AGILIDAD,RESPUESTA_AGILIDAD_I) values'
    # query = 'INSERT INTO data_encuestas (cod_encuestas,tipo_encuesta,periodo,pais,punto_codigo,punto_nombre,seccion_codigo,seccion_nombre,fecha_encuesta pregunta_ins,respuesta_ins,respuesta_ins_detalle, respuesta_ins_detalle_2,pregunta_nps ,respuesta_nps,respuesta_nps_detalle,respuesta_nps_detalle_2,pregunta_ces,respuesta_ces ,respuesta_ces_detalle,respuesta_ces_detalle_2,pregunta_amabilidad,respuesta_amabilidad ,respuesta_amabilidad_detalle,respuesta_amabilidad_detalle_2,pregunta_agilidad,respuesta_agilidad ,respuesta_agilidad_detalle,respuesta_agilidad_detalle_2) VALUES ('
    df = pd.read_csv(pathDataLimpia, sep=";")
    df2 = pd.read_csv(pathDataAgenciasCruda, sep=";")
    print(df2.info())
    lista_agencias =  df2['AGENCIA'].unique().tolist()
    # return df2.keys().to_list()
    result_agencias_data = {}
    for agencia in lista_agencias:
        
        founded_data =df2[df2['AGENCIA']==agencia]
        tipo_agencia = founded_data['TIPO'].unique().tolist()[0]
        ciudad = founded_data['CIUDAD'].unique().tolist()[0]
        zona = founded_data['ZONA'].unique().tolist()[0]
        periodo = founded_data['MES'].unique().tolist()[0]

        # founded_data =df2[df2['AGENCIA']==agencia]
        # tipo_agencia = founded_data['TIPO'].unique().tolist()
        # ciudad = founded_data['CIUDAD'].unique().tolist()
        # zona = founded_data['ZONA'].unique().tolist()
        # periodo = founded_data['MES'].unique().tolist()


        result_agencias_data[agencia] = {
            "tipo_agencia":tipo_agencia,
            "ciudad":ciudad,
            "zona":zona,
            "periodo":periodo            
        }
    # return result_agencias_data
        # return f"{zona},{ciudad},{tipo_agencia},{agencia},{periodo}"
    # return result_agencias_data
    df.drop('COD. ENCUESTA',axis=1,inplace=True)
    df.drop('COD. ENCUESTA.1',axis=1,inplace=True)
    # df.drop('COD. ENCUESTA.2',axis=1,inplace=True)
    # print(df.isnull().sum())
    df.fillna("Sin registro", inplace=True)
    # print(df.info())
    # print(df.isnull().sum())
    # print(len(df.keys().to_list()))
    # print(df['EXPERIENCIA_ESFUERZO'].unique().tolist())
    # print(df[''].unique().tolist())
    # print(df['EXPERIENCIA_ESFUERZO_nota'].unique().tolist())
    # print(df['EXPERIENCIA_ESFUERZO'].unique().tolist())
    # print((df.keys().to_list()))
    # print(df['PERIODO'].unique().tolist())
    # print(df['PUNTO NOMBRE'].unique().tolist())
    # print(result_agencias_data.keys())
    x = df['PUNTO NOMBRE'].unique().tolist()
    y = list(result_agencias_data.keys())
    # return {'data1':df['PUNTO NOMBRE'].unique().tolist(),'data2':list(result_agencias_data.keys())}
    # for value in x:
    #     if(value not in y):
    #         print("value not in y",value)
    # for value in y:
    #     if(value not in x):
    #         print("value not in x",value)
    # return sorted(x)==sorted(y)
    # return len(x),len(y)
    for index, row in df.iterrows():
        # print(row.values)
        # return
        if(str(row.values[5]) in result_agencias_data):            
            # print(str(row.values[2]))
            # break
            periodo_aux= result_agencias_data[str(row.values[5])]['periodo']
            # periodo_aux =str(row.values[8])
            ciudad_aux= result_agencias_data[str(row.values[5])]['ciudad']
            zona_aux= result_agencias_data[str(row.values[5])]['zona']
            tipo_agencia_aux= result_agencias_data[str(row.values[5])]['tipo_agencia']
            query +=f'("{zona_aux}","{ciudad_aux}","{tipo_agencia_aux}","{str(row.values[5])}","{str(row.values[2])}","En una escala de 0 a 10, donde 0 es Nada satisfecho y 10 Muy satisfecho, por favor califique: ¿Su grado de satisfacción con la atención recibida en Servipagos?",'         #INS
            query +=f'{str(row.values[9])},"{str(row.values[10])}",'         #INS
            query +=f'"En una escala de 0 a 10 y con base en su experiencia, ¿en qué grado recomendaría Servipagos a un amigo, colega o familiar?, siendo 0 definitivamente no recomendaría y 10 sí recomendaría",'         #INS
            query +=f'{str(row.values[19])},"{str(row.values[20])}",'          #NPS
            query +=f'"¿Qué tan fácil o difícil fue realizar su transacción en Servipagos?",'         #INS
            query +=f'{str_to_number_nota(str(row.values[17]))},"{str(row.values[18])}",'         #CES
            query +=f'"Con la calidez o amabilidad demostrada por parte de la persona que lo atendió",'         #INS
            query +=f'{str(row.values[11])},"{str(row.values[12])}",'         #AMABILIDAD
            query +=f'"Con la agilidad demostrada por parte de la persona que lo atendió",'         #INS
            query +=f'{str(row.values[13])},"{str(row.values[14])}"),'        #AGILIDAD
            # query +=f'{str(row.values[0])},"{str(row.values[1])}","{str(row.values[2])}","{str(row.values[3])}","{str(row.values[4])}","{str(row.values[5])}",{str(row.values[6])}","{str(row.values[7])}","{str(row.values[8])}",'
        # return str(row.values[5])
        #7->9
        # print(f"{row.values[7]}")
        # query +=f'"{str(row.values[10])}",{str(row.values[9])},"sin datos","sin datos",'         #INS
        # query +=f'{str(row.values[0])},"{str(row.values[1])}","{str(row.values[2])}","{str(row.values[3])}","{str(row.values[4])}","{str(row.values[5])}",{str(row.values[6])}","{str(row.values[7])}","{str(row.values[8])}",'
        # query +=f'"{str(row.values[20])}",{str(row.values[19])},"sin datos","sin datos",'          #NPS
        # query +=f'"{str(row.values[18])}",{str(row.values[17])},"sin datos","sin datos",'         #CES
        # query +=f'"{str(row.values[12])}",{str(row.values[11])},"sin datos","sin datos",'         #AMABILIDAD
        # query +=f'"{str(row.values[14])}",{str(row.values[13])},"sin datos","sin datos",'         #AGILIDAD
        # query +=f"'{row.values[16]}',{row.values[15]},'sin datos','sin datos'"#RECOMPRA
        # print(row.values)
        # print(row.values[1])
        # query +='"'.join(str(v) for v in row.values).join('",')
        # break
    print(query[:-1])
    return (query[:-1])
    # return updateQuery(query[:-1])


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
            if indicador != "BIOSEGURIDAD" and indicador != 'RECOMPRA':
                temp = dfFecha[dfFecha["INDICADOR"] == indicador][
                    "CALCULO PB"
                ].to_list()
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
            if indicador != "BIOSEGURIDAD" and indicador != 'RECOMPRA':
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
        if indicador != "BIOSEGURIDAD" and indicador != 'RECOMPRA':
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
    print(data.tipo_indicador)
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
            if indicador != "BIOSEGURIDAD" and indicador != 'RECOMPRA':
                temp = dfFecha[dfFecha["INDICADOR"] == indicador][
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
                print(
                    totalAcc, tempAcc, tempAccInsatisfecho, tempAccSatisfecho, indicador
                )

                response["dataByDates"][fecha][indicador] = {
                    "total": tempAcc / totalAcc,
                    "insatisfecho": tempAccInsatisfecho / totalAcc,
                    "satisfecho": tempAccSatisfecho / totalAcc,
                }
    for company in companiesExcel:
        dfCompany = df[df["Agencia"] == company]
        response["dataByCompanies"][company] = {}

        for indicador in indicadoresExcel:
            if indicador != "BIOSEGURIDAD" and indicador != 'RECOMPRA':
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
                print(
                    totalAcc, tempAcc, tempAccInsatisfecho, tempAccSatisfecho, indicador
                )

                response["dataByCompanies"][company][indicador] = {
                    "total": tempAcc / totalAcc,
                    "insatisfecho": tempAccInsatisfecho / totalAcc,
                    "satisfecho": tempAccSatisfecho / totalAcc,
                }
    for indicador in indicadoresExcel:
        if indicador != "BIOSEGURIDAD" and indicador != 'RECOMPRA':
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

#     for indicador in indicadoresExcel: if(indicador != 'BIOSEGURIDAD'):
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

def generate_database_from_csv():
    pathData = path.join(pathname, "docs", "base_encuestas_limpia.csv")
    df = pd.read_csv(pathData, sep=";")
    return df.head(20).to_dict()


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
    replace_list = ["SERVIPAGOS", "AGENCIA", "SERVIP", " ", "-", "_", "."]
    pathContacts = path.join(
        pathname, "docs", "SupervisoresAgenciasServipagos(CONTACTOS).csv"
    )
    df = pd.read_csv(pathContacts, sep=";")
    str_query = "INSERT INTO usuarios (nombre_usuario,contraseña,tipo_usuario,name,cedula,ciudad,cargo,email) VALUES "
    lista_usuarios = df["LOGIN"].unique().tolist()
    res = []
    count = 0
    for usuario in lista_usuarios:
        aux_df = df[df["LOGIN"] == usuario]
        # aux_password = encryptionFromStr(f"{usuario}123@.")
        # aux_username = encryptionFromStr(usuario)
        aux_username = usuario
        aux_tipo_usuario = "cliente"
        aux_password = f"{usuario}123@."
        aux_name = aux_df["NOMBRE"].to_list()[count]
        aux_cedula = str(aux_df["CI"].to_list()[count])
        aux_ciudad = aux_df["Ciudad"].to_list()[count]
        aux_cargo = aux_df[" CARGO"].to_list()[count]
        aux_oficina = str(aux_df["OFICINA"].to_list()[count])
        for word in replace_list:
            aux_oficina = aux_oficina.replace(word, "")
        aux_mail = aux_df["MAIL_EMPRESARIAL"].to_list()[count]
        str_query += f"('{aux_username}','{aux_password}','{aux_tipo_usuario}','{aux_name}','{aux_cedula}','{aux_ciudad}','{aux_cargo}','{aux_oficina}','{aux_mail}'),"
        # count += len(aux_df["LOGIN"])
    # return res
    return str_query[:-1] + ";"
    # return df.value_counts().tolist()


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
