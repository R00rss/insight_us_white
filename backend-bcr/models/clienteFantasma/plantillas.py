from pydantic import BaseModel


class body_data_save_plantilla(BaseModel):
    data: dict = {}
    typePlantilla: str = ""
    gestorID: str = ""
    infoPlantilla: dict = {}
