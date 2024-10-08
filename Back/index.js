import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())


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

app.get('/cliente', (req, res) => {
  connection.query('SELECT * FROM cliente', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

app.post('/cliente', (req, res) => {
  const { nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento } = req.body;
  connection.query(
      'INSERT INTO cliente (nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.put('/cliente', (req, res) => {
  const { nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento } = req.body;
  connection.query(
      'UPDATE cliente SET nombre=?, apellido=?, telefono=?, direccion=?, id_barrio=?, id_localidad=?, correo_electronico=?, id_tipo_cliente=?, id_tipo_documento=?, numero_documento=?, estado=? WHERE id_cliente=?',
      [nombre, apellido, telefono, direccion, id_barrio, id_localidad, correo_electronico, id_tipo_cliente, id_tipo_documento, numero_documento],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.get('/producto', (req, res) => {
  connection.query('SELECT * FROM producto', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

app.post('/producto', (req, res) => {
  const { nombre, volumen, stock, id_tipo_producto } = req.body;
  connection.query(
      'INSERT INTO producto (nombre, volumen, stock, id_tipo_producto) VALUES (?, ?, ?, ?)',
      [nombre, volumen, stock, id_tipo_producto],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.put('/producto', (req, res) => {
  const { nombre, volumen, stock, id_tipo_producto } = req.body;
  connection.query(
      'UPDATE producto SET nombre=?, volumen=?, stock=?, id_tipo_producto=?, estado=? WHERE id_producto=?',
      [nombre, volumen, stock, id_tipo_producto],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.get('/pedido', (req, res) => {
  connection.query('SELECT * FROM pedido', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

app.post('/pedido', (req, res) => {
  const { fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega } = req.body;
  connection.query(
      'INSERT INTO pedido (fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega) VALUES (?, ?)',
      [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.put('/pedido', (req, res) => {
  const { fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega } = req.body;
  connection.query(
      'UPDATE pedido SET fecha=?, id_cliente=?, fecha_estimada_entrega=?, fecha_real_entrega=?, estado=? WHERE id=?',
      [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.get('/productoxpedido', (req, res) => {
  connection.query('SELECT * FROM productoxpedido', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

app.post('/productoxpedido', (req, res) => {
  const { fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega } = req.body;
  connection.query(
      'INSERT INTO productoxpedido (id_producto, id_pedido, cantidad) VALUES (?, ?)',
      [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

app.put('/productoxpedido', (req, res) => {
  const { id_producto, id_pedido, cantidad } = req.body;
  connection.query(
      'UPDATE productoxpedido SET id_producto=?, id_pedido=?, cantidad=? WHERE id_producto=? AND id_pedido=?',
      [fecha, id_cliente, fecha_estimada_entrega, fecha_real_entrega],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: results.insertId });
      }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});