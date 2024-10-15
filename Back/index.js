import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())


const connection = mysql2.createConnection({
host: 'localhost',
user: 'root',
password: 'Teo2024Lp',
database: 'soderia'
});

connection.connect((err) => {
if (err) {
console.error('Error conectando a la base de datos:', err);
return;
}
console.log('Conectado a la base de datos MySQL');
});


app.get('/', (req, res) => {
  res.send('API Funcionando OK');
});

app.get('/clientes/:busqueda?', (req, res) => {
  connection.query('SELECT c.*, b.nombre as nombre_barrio, l.nombre as nombre_localidad, t.nombre as nombre_tipo_cliente, td.nombre as nombre_tipo_documento FROM cliente as c inner join barrio as b on b.id_barrio = c.id_barrio inner join localidad as l on l.id_localidad = c.id_localidad inner join tipocliente as t on t.id_tipo_cliente = c.id_tipo_cliente inner join tipodocumento as td on td.id_tipo_documento = c.id_tipo_documento WHERE c.estado=1 ORDER BY c.nombre asc', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
  });
});


app.get('/localidades', (req, res) => {
  connection.query('SELECT id_localidad, nombre FROM localidad ORDER BY nombre asc', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
  });
});

app.get('/barrios/:id_localidad', (req, res) => {
  const id_localidad = req.params.id_localidad;

  connection.query(`SELECT id_barrio, nombre FROM barrio WHERE id_localidad = ${id_localidad} ORDER BY nombre asc`, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
  });
});

app.get('/tipos_documento', (req, res) => {
  connection.query('SELECT id_tipo_documento, nombre FROM tipodocumento', (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
});
});

app.get('/tipos_iva', (req, res) => {
  connection.query('SELECT id_condicion, nombre FROM condicioniva', (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
});
});

app.get('/tipos_cliente', (req, res) => {
  connection.query('SELECT id_tipo_cliente, nombre FROM tipocliente', (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
});
});

app.post('/clientes', (req, res) => {
  // Capturo datos del formulario
  const { nombre, apellido, telefono, calle, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento, estado, numero_dir, piso, departamento, id_condicion } = req.body;

  // consulta a la base de datos
  connection.query(`SELECT estado, id_cliente FROM cliente WHERE numero_documento = ${numero_documento}`, (err, results) => {
    // si da error
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      //si devuelve un resultado y estado es 1 (estado1 = activo)
      if (results.length > 0 && results[0].estado == 1) {

        return res.status(409).json({ error: "Este cliente ya existe con el DNI ingresado" });
      } 
      //si devuelve resultado y estado es 0 (estado 0 = eliminado)
      else if (results.length > 0 && results[0].estado == 0) {
        //envia los datos a la base de datos
        connection.query(
          `UPDATE cliente SET nombre = ?, apellido = ?, telefono = ?, calle = ?, id_barrio = ?, id_localidad = ?, correo_electronico = ?, id_tipo_cliente = ?, id_tipo_documento = ?, numero_documento = ?, estado = ?, numero_dir = ?, piso = ?, departamento = ?, id_condicion = ?
      WHERE id_cliente = ?`,
          [nombre, apellido, telefono, calle, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento, estado, numero_dir, piso, departamento, id_condicion, results[0].id_cliente],
          (err, results) => {
              if (err) {
                  return res.status(500).json({ error: err.message });
              }
              return res.status(201).json({ id: results.insertId });
          }
      );
      } else {
        // si no devuelve nada envia a la base de datos
      connection.query(
        'INSERT INTO cliente (nombre, apellido, telefono, calle, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento, estado, numero_dir, piso, departamento, id_condicion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, telefono, calle, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento, estado, numero_dir, piso, departamento, id_condicion],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ message: "Cliente guardado con éxito", id: results.insertId });
        }
    );
      }
      
  });
  
  
});

app.delete('/clientes/:id_cliente', (req, res) => {
  const id_cliente = req.params.id_cliente;

  connection.query(`UPDATE cliente set estado=0 WHERE id_cliente=${id_cliente}`, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
  });
})

app.get('/clientes/:id', (req, res) => {
  const id_cliente = req.params.id;

  connection.query(`SELECT c.*, b.id_barrio, l.id_localidad, t.id_tipo_cliente, td.id_tipo_documento FROM cliente as c inner join barrio as b on b.id_barrio = c.id_barrio inner join localidad as l on l.id_localidad = c.id_localidad inner join tipocliente as t on t.id_tipo_cliente = c.id_tipo_cliente inner join tipodocumento as td on td.id_tipo_documento = c.id_tipo_documento WHERE c.id_cliente= ${id_cliente}`, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results[0]);
  });
});

app.put('/clientes/:id_cliente', (req, res) => {
  const id_cliente = req.params.id_cliente;

  const { nombre, apellido, telefono, calle, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento, estado, numero_dir, piso, departamento, id_condicion } = req.body;
  
  
  connection.query(
      `UPDATE cliente SET nombre = ?, apellido = ?, telefono = ?, calle = ?, id_barrio = ?, id_localidad = ?, correo_electronico = ?, id_tipo_cliente = ?, id_tipo_documento = ?, numero_documento = ?, estado = ?, numero_dir = ?, piso = ?, departamento = ?, id_condicion = ?
  WHERE id_cliente = ?`,
      [nombre, apellido, telefono, calle, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento, estado, numero_dir, piso, departamento, id_condicion, id_cliente],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          return res.status(201).json({ message:"Cliente modificado con éxito",id: results.insertId });
      }
  );
});

app.get('/clientes/:dni', (req, res) => {
  const numero_documento = req.params.dni;

  connection.query(`SELECT estado FROM cliente WHERE numero_documento = ${numero_documento}`, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results[0]);
  });
});


app.get('/pedidos', (req, res) => {
  connection.query(`SELECT p.*, CONCAT(c.nombre, ' ', c.apellido) as nombre_cliente FROM pedido as p INNER JOIN cliente as c on p.id_cliente = c.id_cliente ORDER BY p.id_pedido desc`, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
  });
});

// app.put('/cliente', (req, res) => {
//   const { nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento } = req.body;
//   connection.query(
//       'UPDATE cliente SET nombre=?, apellido=?, telefono=?, direccion=?, id_barrio=?, id_localidad=?, correo_electronico=?, id_tipo_cliente=?, id_tipo_documento=?, numero_documento=?, estado=? WHERE id_cliente=?',
//       [nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

// app.get('/producto', (req, res) => {
//   connection.query('SELECT * FROM producto', (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: err.message });
//       }
//       res.json(results);
//   });
// });

// app.post('/producto', (req, res) => {
//   const { nombre, volumen, stock, id_tipo_producto } = req.body;
//   connection.query(
//       'INSERT INTO producto (nombre, volumen, stock, id_tipo_producto) VALUES (?, ?, ?, ?)',
//       [nombre, volumen, stock, id_tipo_producto],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

// app.put('/producto', (req, res) => {
//   const { nombre, volumen, stock, id_tipo_producto } = req.body;
//   connection.query(
//       'UPDATE producto SET nombre=?, volumen=?, stock=?, id_tipo_producto=?, estado=? WHERE id_producto=?',
//       [nombre, volumen, stock, id_tipo_producto],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

// app.get('/pedido', (req, res) => {
//   connection.query('SELECT * FROM pedido', (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: err.message });
//       }
//       res.json(results);
//   });
// });

// app.post('/pedido', (req, res) => {
//   const { fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega } = req.body;
//   connection.query(
//       'INSERT INTO pedido (fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega) VALUES (?, ?)',
//       [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

// app.put('/pedido', (req, res) => {
//   const { fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega } = req.body;
//   connection.query(
//       'UPDATE pedido SET fecha=?, id_cliente=?, fecha_estimada_entrega=?, fecha_real_entrega=?, estado=? WHERE id=?',
//       [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

// app.get('/productoxpedido', (req, res) => {
//   connection.query('SELECT * FROM productoxpedido', (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: err.message });
//       }
//       res.json(results);
//   });
// });

// app.post('/productoxpedido', (req, res) => {
//   const { fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega } = req.body;
//   connection.query(
//       'INSERT INTO productoxpedido (id_producto, id_pedido, cantidad) VALUES (?, ?)',
//       [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

// app.put('/productoxpedido', (req, res) => {
//   const { id_producto, id_pedido, cantidad } = req.body;
//   connection.query(
//       'UPDATE productoxpedido SET id_producto=?, id_pedido=?, cantidad=? WHERE id_producto=? AND id_pedido=?',
//       [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: err.message });
//           }
//           res.status(201).json({ id: results.insertId });
//       }
//   );
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});