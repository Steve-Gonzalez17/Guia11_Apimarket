import { pool } from '../db.js';

// =========================
// USUARIOS
// =========================

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');

    res.json(result.rows);
  } catch (error) {
    console.error('ERROR EN getUsuarios:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Buscar usuario / Login
export const getUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM usuarios WHERE nombre = $1 AND clave = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      message: 'Encontrado',
      usuario: result.rows[0]
    });

  } catch (error) {
    console.error('ERROR EN LOGIN:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Crear usuario
export const postUsuarios = async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, clave) VALUES ($1, $2, $3) RETURNING id',
      [nombre, correo, clave]
    );

    res.status(201).json({
      message: 'Usuario agregado',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('ERROR EN postUsuarios:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Actualizar usuario
export const putUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, clave } = req.body;

    const result = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, correo = $2, clave = $3
       WHERE id = $4`,
      [nombre, correo, clave, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      message: 'Usuario actualizado'
    });

  } catch (error) {
    console.error('ERROR EN putUsuarios:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Eliminar usuario
export const deleteUsuarios = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      message: 'Usuario eliminado'
    });

  } catch (error) {
    console.error('ERROR EN deleteUsuarios:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// =========================
// PRODUCTOS
// =========================

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM productos'
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'No hay productos registrados'
      });
    }

    res.json(result.rows);

  } catch (error) {
    console.error('ERROR EN getProductos:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Obtener producto por ID
export const getProductosId = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM productos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'No hay productos registrados'
      });
    }

    res.json({
      productos: result.rows
    });

  } catch (error) {
    console.error('ERROR EN getProductosId:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Crear producto
export const postProductos = async (req, res) => {
  try {
    const {
      name,
      description,
      price_cost,
      price_sale,
      quantity,
      image
    } = req.body;

    const result = await pool.query(
      `INSERT INTO productos
      (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [
        name,
        description,
        price_cost,
        price_sale,
        quantity,
        image
      ]
    );

    res.status(201).json({
      message: 'Producto agregado',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('ERROR EN postProductos:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Versión anterior de crear producto
export const postProductos_version_001 = async (req, res) => {
  try {
    const {
      name,
      description,
      price_cost,
      price_sale,
      quantity,
      image
    } = req.body;

    const result = await pool.query(
      `INSERT INTO productos
      (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [
        name,
        description,
        price_cost,
        price_sale,
        quantity,
        image
      ]
    );

    res.status(201).json({
      message: 'Producto agregado',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('ERROR EN postProductos_version_001:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Actualizar producto
export const putProductos = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price_cost,
      price_sale,
      quantity,
      image
    } = req.body;

    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1,
           descripcion = $2,
           precio_costo = $3,
           precio_venta = $4,
           cantidad = $5,
           fotografia = $6
       WHERE id = $7`,
      [
        name,
        description,
        price_cost,
        price_sale,
        quantity,
        image,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.json({
      message: 'Producto actualizado'
    });

  } catch (error) {
    console.error('ERROR EN putProductos:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};


// Eliminar producto
export const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM productos WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.json({
      message: 'Producto eliminado'
    });

  } catch (error) {
    console.error('ERROR EN deleteProductos:', error);

    res.status(500).json({
      message: 'Algo salió mal',
      error: error.message
    });
  }
};
