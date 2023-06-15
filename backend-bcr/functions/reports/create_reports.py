import pandas as pd

def generate_report_VOC(data_filtrada):
    data_filtrada_df = pd.DataFrame(data_filtrada)
    data_filtrada_df = data_filtrada_df[['periodo','agencia','periodo','respuesta_ins','respuesta_ins_1','respuesta_nps','respuesta_nps_1','respuesta_ces','respuesta_ces_1','respuesta_amabilidad','respuesta_amabilidad_1','respuesta_agilidad','respuesta_agilidad_1']]
    data_filtrada_df = data_filtrada_df.rename(columns={'periodo': 'Periodo Encuesta', 'agencia': 'Agencia',
    'periodo': 'Fecha Transacción', 'respuesta_ins': 'Calificación INS', 'respuesta_ins_1': 'Motivo INS',
    'respuesta_nps': 'Calificación NPS', 'respuesta_nps_1': 'Motivo NPS', 'respuesta_ces': 'Calificación CES',
    'respuesta_ces_1': 'Motivo CES', 'respuesta_amabilidad': 'Calificación Amabilidad', 'respuesta_amabilidad_1': 'Motivo Amabilidad',
    })  
    return data_filtrada_df
def generate_report_encuesta_lealtad(data_filtrada):
    new_Data = []
    for row in data_filtrada:
        # print(row['promedios_keys'])
        # break
        obj_aux = {'id': row['id'], 'name': row['name']}
        for key, value in row['promedios_keys'].items():
            obj_aux[f'promedio_{key}'] = value
        new_Data.append(obj_aux)
    data_df = pd.DataFrame(new_Data)
    print(data_df)    
    print(data_df.keys())   
    return data_df
    data_filtrada_df = pd.DataFrame(data_filtrada)
    return data_filtrada_df