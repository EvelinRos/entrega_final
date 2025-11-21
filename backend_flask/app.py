import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "clave-super-secreta"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=5)

jwt = JWTManager(app)

DATABASE = "usuarios.db"

# Función para conectarse a SQLite
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Inicializar tablas si no existen
def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Tabla usuarios
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            pais TEXT NOT NULL
        )
    """)

    # Tabla reservas
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reservas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_email TEXT NOT NULL,
            destino TEXT NOT NULL,
            descripcion TEXT,
            fecha TEXT NOT NULL,
            viajeros INTEGER NOT NULL,
            total REAL NOT NULL,
            FOREIGN KEY (usuario_email) REFERENCES usuarios(email)
        )
    """)

    conn.commit()
    conn.close()

# DB al iniciar servidor
init_db()


# Registrar usuario
@app.post("/registrar")
def registrar():
    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")
    pais = data.get("pais")

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
    if cursor.fetchone():
        conn.close()
        return jsonify({"message": "El usuario ya existe"}), 400

    cursor.execute(
        "INSERT INTO usuarios (nombre, email, password, pais) VALUES (?, ?, ?, ?)",
        (nombre, email, password, pais)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Usuario registrado correctamente"}), 200

# Login
@app.post("/login")
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE email = ? AND password = ?", (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        token = create_access_token(identity=email)
        return jsonify({"token": token}), 200

    return jsonify({"message": "Credenciales incorrectas"}), 401

# Obtener usuarios (protegido)
@app.get("/usuarios")
@jwt_required()
def obtener_usuarios():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT nombre, email, pais FROM usuarios")
    datos = cursor.fetchall()
    conn.close()

    usuarios = [dict(row) for row in datos]
    return jsonify(usuarios), 200

# Registrar reserva (protegido)
@app.post("/reserva-modal")
@jwt_required()
def registrar_reserva():
    data = request.get_json()
    usuario_email = get_jwt_identity()
    destino = data.get("destino")
    descripcion = data.get("descripcion")
    fecha = data.get("fecha")
    viajeros = data.get("viajeros")
    total = data.get("total")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reservas (usuario_email, destino, descripcion, fecha, viajeros, total)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (usuario_email, destino, descripcion, fecha, viajeros, total))
    conn.commit()
    conn.close()

    return jsonify({"message": "Reserva registrada correctamente"}), 200

# Obtener reservas registradas (protegido)
@app.get("/reservas-registradas")
@jwt_required()
def obtener_reservas():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT usuario_email, destino, descripcion, fecha, viajeros, total FROM reservas")
    datos = cursor.fetchall()
    conn.close()

    reservas = [dict(row) for row in datos]
    return jsonify(reservas), 200

# Error 404
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Ruta no encontrada"}), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)
