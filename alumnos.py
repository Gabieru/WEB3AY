import pandas as pd
import json
import random

"""
Extracción del archivo excel para dejarlo como lista con pandas.
"""
lista_alumnos_path = "lista.xlsx"
lista_alumnos = pd.read_excel(lista_alumnos_path, header=[1], usecols=[5])
lista_alumnos = lista_alumnos.values.tolist()

"""
Guardar los numeros de alumnos en un diccionario.
"""
def id_generator(size):
    """
    Función que genera un string aleatorio en base a un numero de caracteres

    input: tamaño del string que quiero generar
    output: String con caracteres aleatorios de tamaño size

    """
    chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return ''.join(random.choice(chars) for _ in range(size))

keys = {}
for elemento in lista_alumnos:
    keys[elemento[0]] = id_generator(16)


"""
Generador keys ayudantes hasta 9.
"""
def generador_ayudantes(cantidad=4, diccionario={}):
    if cantidad > 9:
        raise Exception ("Ingresa un numero menor a 10 :D")
    for i in range(cantidad):
        diccionario[f'KEYDEV_{i}'] = f"IIC1001DebugAY0{i}"
    return diccionario

generador_ayudantes(8, keys)
"""
Escritura del json de los numeros de alumnos.
"""
path_json_alumnos = "keys.json"
with open(path_json_alumnos, 'w') as json_file:
    json.dump(keys, json_file, indent=4)
