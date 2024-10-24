from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

# Ruta para recibir la ubicación desde el dispositivo
@app.route('/api/ubicacion', methods=['POST'])
def guardar_ubicacion():
    data = request.get_json()

    if 'lat' not in data or 'lon' not in data:
        return jsonify({"error": "Datos incompletos"}), 400

    # Guardar la ubicación en un archivo JSON
    with open('ubicacion.json', 'w') as file:
        json.dump(data, file)

    return jsonify({"message": "Ubicación actualizada"}), 200

# Ruta para obtener la última ubicación almacenada
@app.route('/ubicacion', methods=['GET'])
def obtener_ubicacion():
    try:
        # Leer la ubicación desde el archivo JSON
        with open('ubicacion.json', 'r') as file:
            data = json.load(file)
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"error": "No se ha encontrado ninguna ubicación."}), 404

# Ruta para cargar la página de envío de ubicación
@app.route('/enviar_ubicacion')
def enviar_ubicacion():
    return render_template('enviar_ubicacion.html')

# Ruta para cargar la página de visualización de ubicación
@app.route('/mostrar_ubicacion')
def mostrar_ubicacion():
    return render_template('mostrar_ubicacion.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
