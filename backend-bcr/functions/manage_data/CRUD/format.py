def format_data_total(data):
    result = []
    if len(data) > 0:
        for row in data:
            temp = {
                "vcc": row[0],
                "campaignid": row[1],
                "contactid": row[2],
                "contactname": row[3],
                "contactaddress": row[4],
                "interactionid": row[5],
                "importid": row[6],
                "agent": row[7],
                "resultlevel1": row[8],
                "resultlevel2": row[9],
                "resultlevel3": row[10],
                "managementresultcode": row[11],
                "managementresultdescription": row[12],
                "startedmanagement": row[13],
                "tmstmp": row[14],
                "intentos": row[15],
                "fechaagendamiento": row[16],
                "telefono2": row[17],
                "observaciones": row[18],
                "id": row[19],
                "identificacion": row[20],
                "nombre_cliente": row[21],
                "pais": row[22],
                "ciudad": row[23],
                "zona": row[24],
                "direccion": row[25],
                "entidad": row[26],
                "agencia": row[27],
                "seccion": row[28],
                "periodo": row[29],
                "area": row[30],
                "usuario": row[31],
                "transaccion": row[32],
                "genero": row[33],
                "fecha_atencion": row[34],
                "hora_atencion": row[35],
                "pregunta_nps": row[36],
                "pregunta_nps_1": row[37],
                "respuesta_nps": row[38],
                "respuesta_nps_1": row[39],
                "atributo_nps": row[40],
                "pregunta_ins": row[41],
                "pregunta_ins_1": row[42],
                "respuesta_ins": row[43],
                "respuesta_ins_1": row[44],
                "atributo_ins": row[45],
                "pregunta_ces": row[46],
                "pregunta_ces_1": row[47],
                "respuesta_ces": row[48],
                "respuesta_ces_1": row[49],
                "atributo_ces": row[50],
                "pregunta_4": row[51],
                "pregunta_4_1": row[52],
                "pregunta_5": row[53],
                "pregunta_5_1": row[54],
                "pregunta_6": row[55],
                "pregunta_6_1": row[56],
                "pregunta_7": row[57],
                "pregunta_7_1": row[58],
                "pregunta_8": row[59],
                "pregunta_8_1": row[60],
                "pregunta_9": row[61],
                "pregunta_9_1": row[62],
                "pregunta_10": row[63],
                "pregunta_10_1": row[64],
                "pregunta_11": row[65],
                "pregunta_11_1": row[66],
                "pregunta_12": row[67],
                "pregunta_12_1": row[68],
                "pregunta_13": row[69],
                "pregunta_13_1": row[70],
                "respuesta_4": row[71],
                "respuesta_4_1": row[72],
                "respuesta_5": row[73],
                "respuesta_5_1": row[74],
                "respuesta_6": row[75],
                "respuesta_6_1": row[76],
                "respuesta_7": row[77],
                "respuesta_7_1": row[78],
                "respuesta_8": row[79],
                "respuesta_8_1": row[80],
                "respuesta_9": row[81],
                "respuesta_9_1": row[82],
                "respuesta_10": row[83],
                "respuesta_10_1": row[84],
                "respuesta_11": row[85],
                "respuesta_11_1": row[86],
                "respuesta_12": row[87],
                "respuesta_12_1": row[88],
                "respuesta_13": row[89],
                "respuesta_13_1": row[90],
                "estado_auditoria": row[91],
                "tipo_agencia": row[92],
                "pregunta_agilidad": row[93],
                "pregunta_amabilidad": row[94],
                "respuesta_amabilidad": "sin datos"
                if (row[95] == None or row[95] == "")
                else str(row[95]),
                "respuesta_agilidad": "sin datos"
                if (row[96] == None or row[96] == "")
                else str(row[96]),
                # "respuesta_amabilidad_1":'sin datos' if(row[97]==None or row[97]=='') else str(row[97]),
                # "respuesta_agilidad_1":'sin datos' if(row[98]==None or row[98]=='') else str(row[98]),
                "respuesta_amabilidad_1": "sin datos",
                "respuesta_agilidad_1": "sin datos",
            }
            result.append(temp)

    return result
