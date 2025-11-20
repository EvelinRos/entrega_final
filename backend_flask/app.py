from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from datetime import timedelta

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "clave-super-secreta"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

# Simulación base de datos en memoria
USERS = {}

@app.post("/registrar")
def registrar():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    nombre = data.get("nombre")
    pais = data.get("pais")

    if email in USERS:
        return jsonify({"message": "El usuario ya existe"}), 400

    USERS[email] = {
        "nombre": nombre,
        "email": email,
        "password": password,
        "pais": pais
    }

    return jsonify({"message": "Usuario registrado correctamente"}), 200


@app.post("/login")
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in USERS and USERS[email]["password"] == password:
        token = create_access_token(identity=email)
        return jsonify({"token": token}), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@app.get("/usuarios")
@jwt_required()
def obtener_usuarios():
    return jsonify(list(USERS.values())), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
