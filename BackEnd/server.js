const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "access_check"
});

//registro residente
app.post("/create", (req, res) => {
  const {
    tipoDocumento,
    nombres,
    apellidos,
    numDoc,
    telefono,
    torre,
    apartamento,
    correo,
    contrasenia,
    vehiculo,
    tipoVehiculo,
    placa,
    modelo,
    color
  } = req.body;

    console.log("Contraseña a cifrar:", contrasenia);

    if (typeof contrasenia !== 'string' || contrasenia.trim() === '') {
        return res.status(400).send("La contraseña debe ser una cadena no vacía");
    }

    // Establecer el rol por defecto como 'Residente'
    const rol = 'Residente';

    bcrypt.hash(contrasenia, 10, (err, hash) => {
      if (err) {
        console.error("Error al cifrar la contraseña:", err);
        return res.status(500).send("Error al registrar el usuario");
      }

        // Continúa con la inserción en la base de datos
        db.query('INSERT INTO Usuario (tipoDocumento, rol, nombres, apellidos, numDoc, telefono, torre, apartamento, correo, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
          [tipoDocumento, 'Residente', nombres, apellidos, numDoc, telefono, torre, apartamento, correo, hash], 
          (err, result) => {
            if (err) {
              console.error("Error al registrar el usuario:", err);
              return res.status(500).send("Error al registrar el usuario");
            }
            
            const usuarioId = result.insertId;
            
            if (vehiculo === 'Si') {
              db.query('INSERT INTO Vehiculo (tipoVehiculo, placa, modelo, color, usuarioId) VALUES (?, ?, ?, ?, ?)', 
                [tipoVehiculo, placa, modelo, color, usuarioId], 
                (err) => {
                  if (err) {
                    console.error("Error al registrar el vehículo:", err);
                    return res.status(500).send("Error al registrar el vehículo");
                  }
                  res.send("Usuario y vehículo registrados con éxito");
                }
              );
            } else {
              res.send("Usuario registrado sin vehículo");
            }
          }
        );
    });
});

//crear un vigilante
app.post("/crear", (req, res) => {
  const {
      tipoDocumento,
      nombres,
      apellidos,
      numDoc,
      telefono,
      correo,
      contrasenia // Asegúrate de que esto sea un string
  } = req.body;

  console.log("Contraseña a cifrar:", contrasenia);

  if (typeof contrasenia !== 'string' || contrasenia.trim() === '') {
      return res.status(400).send("La contraseña debe ser una cadena no vacía");
  }

  // Cambiamos el rol por defecto a 'Vigilante'
  const rol = 'Vigilante';

  bcrypt.hash(contrasenia, 10, (err, hash) => {
      if (err) {
          console.error("Error al cifrar la contraseña:", err);
          return res.status(500).send("Error al registrar el vigilante");
      }

      // Continúa con la inserción en la base de datos, eliminando torre y apartamento
      db.query('INSERT INTO Usuario (tipoDocumento, rol, nombres, apellidos, numDoc, telefono, correo, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
          [tipoDocumento, rol, nombres, apellidos, numDoc, telefono, correo, hash], 
          (err, result) => {
              if (err) {
                  console.error("Error al registrar el vigilante:", err);
                  return res.status(500).send("Error al registrar el vigilante");
              }
              
              res.send("Vigilante registrado con éxito");
      });
  });
});

app.get("/Usuario", (req, res) => {
    const query = `
        SELECT U.*, V.tipoVehiculo, V.placa, V.modelo, V.color 
        FROM Usuario U
        LEFT JOIN Vehiculo V ON U.idUsuario = V.usuarioId
    `;
    
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            return res.status(500).send("Error al obtener usuarios");
        }
        res.send(result);
    });
});

app.put("/update", (req, res) => {
    const {
        idUsuario,
        tipoDocumento,
        nombres,
        apellidos,
        numDoc,
        telefono,
        torre,
        apartamento,
        correo,
        contrasenia,
        vehiculo,
        tipoVehiculo,
        placa,
        modelo,
        color
    } = req.body;

    // Definir una función para actualizar el usuario
    const updateUser  = (hash) => {
        db.query('UPDATE Usuario SET tipoDocumento=?, nombres=?, apellidos=?, numDoc=?, telefono=?, torre=?, apartamento=?, correo=?, contrasenia=? WHERE idUsuario=?', 
            [tipoDocumento, nombres, apellidos, numDoc, telefono, torre, apartamento, correo, hash, idUsuario], 
            (err) => {
                if (err) {
                    console.error("Error al actualizar el usuario:", err);
                    return res.status(500).send("Error al actualizar el usuario");
                }

                // Actualizar información del vehículo si es aplicable
                if (vehiculo === 'Si') {
                    db.query('INSERT INTO Vehiculo (tipoVehiculo, placa, modelo, color, usuarioId) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE tipoVehiculo=?, placa=?, modelo=?, color=?',
                        [tipoVehiculo, placa, modelo, color, idUsuario, tipoVehiculo, placa, modelo, color],
                        (err) => {
                            if (err) {
                                console.error("Error al actualizar el vehículo:", err);
                                return res.status(500).send("Error al actualizar el vehículo");
                            }
                            res.send("Usuario y vehículo actualizados con éxito");
                        }
                    );
                } else {
                    // Si no hay vehículo, eliminarlo de la base de datos
                    db.query('DELETE FROM Vehiculo WHERE usuarioId = ?', [idUsuario], (err) => {
                        if (err) {
                            console.error("Error al eliminar el vehículo:", err);
                            return res.status(500).send("Error al eliminar el vehículo");
                        }
                        res.send("Usuario actualizado sin vehículo");
                    });
                }
            });
    };

    // Comprobar si se proporciona la contraseña
    if (contrasenia && contrasenia.trim() !== '') {
        bcrypt.hash(contrasenia, 10, (err, hash) => {
            if (err) {
                console.error("Error al cifrar la contraseña:", err);
                return res.status(500).send("Error al actualizar el usuario");
            }
            updateUser (hash); // Actualizar usuario con la contraseña cifrada
        });
    } else {
        // Si no hay nueva contraseña, actualizar sin cambiar la contraseña
        updateUser (null); // Pasar null para indicar que no hay cambio de contraseña
    }
});
  
  app.listen(3001, () => {
      console.log("Corriendo en el puerto 3001");
  });