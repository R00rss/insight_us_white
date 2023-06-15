from pydantic import BaseModel


class filterDataModel(BaseModel):
    agencia: str = ""
    tipo_indicador: str = ""
    indicador: str = ""
    fecha: str = ""