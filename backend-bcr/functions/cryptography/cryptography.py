from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from functions.cryptography.generateKeys import read_public, read_private
import base64
from os import path


def encryption(data, public_key):  # data has to be binary type
    encrypted = public_key.encrypt(
        data,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )
    return base64.b64encode(encrypted)  # encode in base 64


def encryption2(data, public_key):  # data has to be string
    encrypted = public_key.encrypt(
        data.encode("utf-8"),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )
    # return base64.b64encode(encrypted)  # encode in base 64
    return base64.b64encode(encrypted).decode("utf-8")  # return string


# def encryptionFromStr(data: str):  # data has to be string
#     pathPublicKeyName = path.join(
#         path.dirname(path.realpath(__file__)), "public_shared.pem"
#     )
#     public_key = read_public(pathPublicKeyName)

#     encrypted = public_key.encrypt(
#         data.encode("utf-8"),
#         padding.OAEP(
#             mgf=padding.MGF1(algorithm=hashes.SHA256()),
#             algorithm=hashes.SHA256(),
#             label=None,
#         ),
#     )
#     # return base64.b64encode(encrypted)  # encode in base 64
#     return base64.b64encode(encrypted).decode("utf-8")  # return string


def encryptionFromStr(data: str):  # data has to be string
    try:
        pathPublicKeyName = path.join(
            path.dirname(path.realpath(__file__)), "public_shared.pem"
        )
        public_key = read_public(pathPublicKeyName)
        encrypted = public_key.encrypt(
            data.encode("utf-8"),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )
    except:
        encrypted = None
    # return base64.b64encode(encrypted)  # encode in base 64
    if encrypted == None:
        return None
    return base64.b64encode(encrypted).decode("utf-8")  # return string


##############decryption#################################
def decryption(data, private_key):  # data needs to be b64 encrypted
    return private_key.decrypt(
        base64.b64decode(data),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )


def decryption2(data, private_key):  # data has to be string
    return private_key.decrypt(
        base64.b64decode(data.encode("utf-8")),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    ).decode("utf-8")


def decryptionFromStr(data: str):  # data has to be string
    try:
        pathPrivateKeyName = path.join(
            path.dirname(path.realpath(__file__)), "private_noshare.pem"
        )
        private_key = read_private(pathPrivateKeyName)
        result = private_key.decrypt(
            base64.b64decode(data.encode("utf-8")),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        ).decode("utf-8")
    except:
        result = None
    return result
