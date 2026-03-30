import { useState } from "react";

export default function App() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);

  const agregarProducto = () => {
    if (!producto || !precio || !cantidad) return;

    setProductos([
      ...productos,
      {
        nombre: producto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
      },
    ]);

    setProducto("");
    setPrecio("");
    setCantidad("");
  };

  const venderProducto = (index) => {
    const nuevos = [...productos];
    if (nuevos[index].cantidad <= 0) return;

    nuevos[index].cantidad -= 1;

    setVentas([
      ...ventas,
      {
        nombre: nuevos[index].nombre,
        precio: nuevos[index].precio,
      },
    ]);

    setProductos(nuevos);
  };

  const totalVentas = ventas.reduce((acc, v) => acc + v.precio, 0);

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <img src="/logo.png" style={styles.logo} />
        <div>
          <h1 style={styles.title}>
            Créditos <span style={{ color: "#facc15" }}>DAZA</span>
          </h1>
          <p style={styles.subtitle}>
            Venta de artículos para el hogar
          </p>
        </div>
      </div>

      {/* INVENTARIO */}
      <div style={styles.card}>
        <h2>📦 Inventario</h2>

        <div style={styles.inputs}>
          <input
            placeholder="Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Precio"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            style={styles.input}
          />
        </div>

        <button style={styles.button} onClick={agregarProducto}>
          ➕ Agregar producto
        </button>

        {productos.map((p, i) => (
          <div key={i} style={styles.item}>
            <div>
              <b>{p.nombre}</b>
              <p>${p.precio} | Stock: {p.cantidad}</p>
            </div>

            <button style={styles.sellBtn} onClick={() => venderProducto(i)}>
              Vender
            </button>
          </div>
        ))}
      </div>

      {/* VENTAS */}
      <div style={styles.card}>
        <h2>💰 Ventas</h2>

        {ventas.map((v, i) => (
          <p key={i}>
            {v.nombre} - ${v.precio}
          </p>
        ))}

        <h3>Total: ${totalVentas}</h3>
      </div>
    </div>
  );
}

/* 🎨 ESTILOS */
const styles = {
  container: {
    fontFamily: "Arial",
    background: "#f1f5f9",
    minHeight: "100vh",
    padding: 20,
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    background: "#0f172a",
    color: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    background: "white",
  },

  title: {
    margin: 0,
  },

  subtitle: {
    margin: 0,
    fontSize: 14,
    color: "#cbd5f5",
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  inputs: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },

  input: {
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: "100%",
  },

  button: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
    marginBottom: 10,
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f8fafc",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  sellBtn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },
};
