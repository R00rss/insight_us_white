import requests
import logging


def getCoordByAddress(addresses: list):
    data = []
    # API1
    # url = "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward"
    # headers = {
    #     "X-RapidAPI-Key": "5d216ce04bmshce31af539954fc2p1568dcjsnb7f75d97b313",
    #     "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    # }
    # EXAMPLE QUERY STRING = {
    #     "city": Quito,
    #     "country": Ecuador,
    #     "state": Pichincha,
    #     "street": Av. 6 de Diciembre,
    # }
    # API2
    url = "https://trueway-geocoding.p.rapidapi.com/Geocode"
    headers = {
        "X-RapidAPI-Key": "5d216ce04bmshce31af539954fc2p1568dcjsnb7f75d97b313",
        "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
    }
    # EXAMPLE QUERY STRING = {"address":"505 Howard St, San Francisco","language":"en"}

    for address in addresses:
        # querystring = { #for API1
        #     "city": address["city"],
        #     "country": address["country"],
        #     "state": address["state"],
        #     "street": address["address"],
        # }
        # querystring = address

        querystring = {  # for API2
            "address": address["city"]
            + ","
            + address["country"]
            + ","
            + address["state"]
            + ","
            + address["address"],
            "language": "es",
        }
        try:
            response = requests.request(
                "GET", url, headers=headers, params=querystring, timeout=1
            )
        except requests.exceptions.Timeout:
            response = None
            logging.error("timeout raised, recovering")
        if response != None:
            print("la respuesta es: ", response)
            if response.status_code == 200:
                response_temp = response.json()
                print("la respuesta es: ", response_temp)

                if len(response_temp) > 0:
                    res_temp = {
                        # "info": querystring,
                        # "res": response_temp,
                        # "lat": response_temp[0]["lat"], #for API1
                        # "lng": response_temp[0]["lon"],
                        "lat": response_temp["results"][0]["location"][
                            "lat"
                        ],  # for API2
                        "lng": response_temp["results"][0]["location"]["lng"],
                    }
                    data.append(res_temp)
            else:
                logging.error("error in response")
    return data
