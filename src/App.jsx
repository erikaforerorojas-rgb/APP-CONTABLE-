import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "app-contable-pro-vite";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f3f4f6",
    color: "#111827",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  },
  hero: {
    background: "linear-gradient(135deg, #111827, #1f2937)",
    color: "white",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    marginBottom: 20,
  },
  heroTitle: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.1,
  },
  heroText: {
    marginTop: 10,
    color: "#d1d5db",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 14,
    marginBottom: 20,
  },
  card: {
    background: "white",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
  },
  statLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  tabButton: {
    border: "1px solid #d1d5db",
    background: "white",
    padding: "10px 16px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 600,
  },
  activeTab: {
    background: "#111827",
    color: "white",
    borderColor: "#111827",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 24,
  },
  sectionText: {
    color: "#6b7280",
    marginTop: 6,
    marginBottom: 16,
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 18,
  },
  gridThree: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
    outline: "none",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
  },
  button: {
    background: "#111827",
    color: "white",
    border: "none",
    padding: "11px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
  },
  buttonSecondary: {
    background: "white",
    color: "#111827",
    border: "1px solid #d1d5db",
    padding: "11px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
  },
  row: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  tableWrap: {
    overflowX: "auto",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
  },
  th: {
    textAlign: "left",
    fontSize: 13,
    color: "#6b7280",
    padding: 12,
    borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #f3f4f6",
    fontSize: 14,
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: "#e5e7eb",
  },
  badgeOk: {
    background: "#dcfce7",
    color: "#166534",
  },
  badgeWarn: {
    background: "#fef3c7",
    color: "#92400e",
  },
  badgeDanger: {
    background: "#fee2e2",
    color: "#991b1b",
  },
  invoiceBox: {
    background: "#f9fafb",
    borderRadius: 18,
    padding: 16,
    border: "1px solid #e5e7eb",
  },
};

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const initialData = {
  business: {
    name: "Mi Negocio",
    phone: "3000000000",
    email: "negocio@demo.com",
    address: "Colombia",
    invoicePrefix: "FV",
    lowStockThreshold: 5,
  },
  products: [
    { id: 1, name: "Producto A", category: "General", price: 28000, cost: 15000, stock: 12 },
    { id: 2, name: "Producto B", category: "General", price: 35000, cost: 20000, stock: 8 },
  ],
  clients: [
    { id: 1, name: "Cliente Demo", phone: "3000000000", email: "cliente@demo.com" },
  ],
  suppliers: [
    { id: 1, name: "Proveedor Demo", phone: "3110000000", email: "proveedor@demo.com" },
  ],
  expenses: [],
  sales: [],
  credits: [],
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  } catch {
    return initialData;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function uid() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function Field({ label, children }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function Stat({ label, value, helper }) {
  return (
    <div style={styles.card}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      <div style={{ ...styles.statLabel, marginTop: 6 }}>{helper}</div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("dashboard");

  const [productForm, setProductForm] = useState({ name: "", category: "", price: "", cost: "", stock: "" });
  const [clientForm, setClientForm] = useState({ name: "", phone: "", email: "" });
  const [supplierForm, setSupplierForm] = useState({ name: "", phone: "", email: "" });
  const [expenseForm, setExpenseForm] = useState({ concept: "", amount: "", date: today() });

  const [saleClientId, setSaleClientId] = useState("1");
  const [saleItems, setSaleItems] = useState([{ productId: "1", quantity: 1 }]);
  const [salePayment, setSalePayment] = useState("Efectivo");
  const [isCredit, setIsCredit] = useState(false);
  const [initialPayment, setInitialPayment] = useState("");
  const [installments, setInstallments] = useState("6");
  const [paymentForm, setPaymentForm] = useState({ creditId: "", amount: "", date: today() });

  useEffect(() => {
    const saved = loadData();
    setData(saved);
    if (saved.clients[0]) setSaleClientId(String(saved.clients[0].id));
    if (saved.products[0]) setSaleItems([{ productId: String(saved.products[0].id), quantity: 1 }]);
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const totals = useMemo(() => {
    const sales = data.sales.reduce((sum, item) => sum + item.total, 0);
    const expenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
    const stockValue = data.products.reduce((sum, p) => sum + p.cost * p.stock, 0);
    const grossProfit = data.sales.reduce((sum, item) => sum + item.profit, 0);
    const stockUnits = data.products.reduce((sum, p) => sum + p.stock, 0);
    return {
      sales,
      expenses,
      stockValue,
      grossProfit,
      netProfit: grossProfit - expenses,
      stockUnits,
    };
  }, [data]);

  const lowStockProducts = useMemo(
    () => data.products.filter((p) => p.stock <= Number(data.business.lowStockThreshold || 5)),
    [data.products, data.business.lowStockThreshold]
  );

  const salePreview = useMemo(() => {
    const items = saleItems
      .map((row) => {
        const product = data.products.find((p) => String(p.id) === row.productId);
        const quantity = Number(row.quantity || 0);
        if (!product || quantity <= 0) return null;
        return {
          productId: product.id,
          name: product.name,
          quantity,
          price: product.price,
          cost: product.cost,
          subtotal: product.price * quantity,
          totalCost: product.cost * quantity,
        };
      })
      .filter(Boolean);

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
    return { items, total, totalCost, profit: total - totalCost };
  }, [saleItems, data.products]);

  const addProduct = () => {
    if (!productForm.name) return;
    setData((prev) => ({
      ...prev,
      products: [
        {
          id: uid(),
          name: productForm.name,
          category: productForm.category || "General",
          price: Number(productForm.price || 0),
          cost: Number(productForm.cost || 0),
          stock: Number(productForm.stock || 0),
        },
        ...prev.products,
      ],
    }));
    setProductForm({ name: "", category: "", price: "", cost: "", stock: "" });
  };

  const addClient = () => {
    if (!clientForm.name) return;
    const newClient = { id: uid(), ...clientForm };
    setData((prev) => ({ ...prev, clients: [newClient, ...prev.clients] }));
    setClientForm({ name: "", phone: "", email: "" });
    setSaleClientId(String(newClient.id));
  };

  const addSupplier = () => {
    if (!supplierForm.name) return;
    setData((prev) => ({ ...prev, suppliers: [{ id: uid(), ...supplierForm }, ...prev.suppliers] }));
    setSupplierForm({ name: "", phone: "", email: "" });
  };

  const addExpense = () => {
    if (!expenseForm.concept || !expenseForm.amount) return;
    setData((prev) => ({
      ...prev,
      expenses: [
        { id: uid(), concept: expenseForm.concept, amount: Number(expenseForm.amount), date: expenseForm.date },
        ...prev.expenses,
      ],
    }));
    setExpenseForm({ concept: "", amount: "", date: today() });
  };

  const addSaleLine = () => {
    if (!data.products.length) return;
    setSaleItems((prev) => [...prev, { productId: String(data.products[0].id), quantity: 1 }]);
  };

  const updateSaleLine = (index, key, value) => {
    setSaleItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const removeSaleLine = (index) => {
    setSaleItems((prev) => prev.filter((_, i) => i !== index));
  };

  const registerSale = () => {
    const client = data.clients.find((c) => String(c.id) === saleClientId);
    if (!client || !salePreview.items.length) return;

    const stockProblem = salePreview.items.find((item) => {
      const product = data.products.find((p) => p.id === item.productId);
      return !product || product.stock < item.quantity;
    });

    if (stockProblem) {
      alert(`No hay stock suficiente para ${stockProblem.name}`);
      return;
    }

    const sale = {
      id: uid(),
      number: `${data.business.invoicePrefix}-${String(data.sales.length + 1).padStart(4, "0")}`,
      client: client.name,
      paymentMethod: isCredit ? "Crédito" : salePayment,
      date: today(),
      items: salePreview.items,
      total: salePreview.total,
      totalCost: salePreview.totalCost,
      profit: salePreview.profit,
    };

    const initialPay = Math.max(0, Number(initialPayment || 0));
    const creditBalance = Math.max(0, salePreview.total - initialPay);
    const creditInstallments = Math.max(1, Number(installments || 1));

    const credit = isCredit
      ? {
          id: uid(),
          saleId: sale.id,
          number: sale.number,
          client: client.name,
          date: today(),
          total: salePreview.total,
          initialPayment: initialPay,
          balance: creditBalance,
          installments: creditInstallments,
          installmentValue: Math.ceil(creditBalance / creditInstallments),
          payments: initialPay > 0 ? [{ id: uid(), amount: initialPay, date: today(), note: "Abono inicial" }] : [],
          status: creditBalance <= 0 ? "Pagado" : "Pendiente",
        }
      : null;

    setData((prev) => ({
      ...prev,
      sales: [sale, ...prev.sales],
      credits: credit ? [credit, ...(prev.credits || [])] : prev.credits || [],
      products: prev.products.map((product) => {
        const sold = salePreview.items.find((item) => item.productId === product.id);
        return sold ? { ...product, stock: product.stock - sold.quantity } : product;
      }),
    }));

    setSaleItems([{ productId: String(data.products[0]?.id || ""), quantity: 1 }]);
    setIsCredit(false);
    setInitialPayment("");
    setInstallments("6");
    alert("Venta registrada correctamente");
  };

  const registerCreditPayment = () => {
    const amount = Number(paymentForm.amount || 0);
    if (!paymentForm.creditId || amount <= 0) return;

    setData((prev) => ({
      ...prev,
      credits: (prev.credits || []).map((credit) => {
        if (String(credit.id) !== String(paymentForm.creditId)) return credit;

        const newBalance = Math.max(0, Number(credit.balance || 0) - amount);
        const newPayment = { id: uid(), amount, date: paymentForm.date, note: "Pago de cuota" };

        return {
          ...credit,
          balance: newBalance,
          payments: [newPayment, ...(credit.payments || [])],
          status: newBalance <= 0 ? "Pagado" : "Pendiente",
        };
      }),
    }));

    setPaymentForm({ creditId: "", amount: "", date: today() });
    alert("Pago registrado correctamente");
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "respaldo-app-contable.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const installApp = () => {
    alert("Tu app ya funciona en celular. Para instalarla, abre el menú del navegador y usa 'Agregar a pantalla de inicio'.");
  };

  const renderDashboard = () => (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={styles.statsGrid}>
        <Stat label="Ventas" value={currency.format(totals.sales)} helper="Total facturado" />
        <Stat label="Ganancia bruta" value={currency.format(totals.grossProfit)} helper="Ventas - costo" />
        <Stat label="Ganancia neta" value={currency.format(totals.netProfit)} helper="Ganancia - gastos" />
        <Stat label="Inventario" value={currency.format(totals.stockValue)} helper={`${totals.stockUnits} unidades`} />
      </div>

      <div style={styles.gridTwo}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Alertas de stock</h3>
          <p style={styles.sectionText}>Productos con inventario bajo.</p>
          {lowStockProducts.length ? lowStockProducts.map((p) => (
            <div key={p.id} style={{ ...styles.invoiceBox, marginBottom: 10 }}>
              <strong>{p.name}</strong>
              <div style={{ color: "#6b7280", marginTop: 6 }}>Stock actual: {p.stock}</div>
            </div>
          )) : <div style={styles.invoiceBox}>No hay productos con stock crítico.</div>}
        </div>

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Acciones rápidas</h3>
          <p style={styles.sectionText}>Gestiona tu negocio desde celular y PC.</p>
          <div style={styles.row}>
            <button style={styles.button} onClick={() => setTab("sales")}>Registrar venta</button>
            <button style={styles.buttonSecondary} onClick={() => setTab("products")}>Agregar producto</button>
            <button style={styles.buttonSecondary} onClick={exportBackup}>Respaldar datos</button>
            <button style={styles.buttonSecondary} onClick={installApp}>Instalar app</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div style={styles.gridTwo}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Nuevo producto</h3>
        <p style={styles.sectionText}>Precio, costo, cantidad y stock automático.</p>
        <div style={styles.gridThree}>
          <Field label="Nombre"><input style={styles.input} value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} /></Field>
          <Field label="Categoría"><input style={styles.input} value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} /></Field>
          <Field label="Precio"><input style={styles.input} type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} /></Field>
          <Field label="Costo"><input style={styles.input} type="number" value={productForm.cost} onChange={(e) => setProductForm({ ...productForm, cost: e.target.value })} /></Field>
          <Field label="Stock inicial"><input style={styles.input} type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}>
          <button style={styles.button} onClick={addProduct}>Guardar producto</button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Inventario</h3>
        <p style={styles.sectionText}>Control de precios, costos y existencias.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Producto</th>
                <th style={styles.th}>Categoría</th>
                <th style={styles.th}>Precio</th>
                <th style={styles.th}>Costo</th>
                <th style={styles.th}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.category}</td>
                  <td style={styles.td}>{currency.format(p.price)}</td>
                  <td style={styles.td}>{currency.format(p.cost)}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...(p.stock <= data.business.lowStockThreshold ? styles.badgeWarn : styles.badgeOk) }}>
                      {p.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div style={styles.gridTwo}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Registrar venta</h3>
        <p style={styles.sectionText}>Descuenta stock automáticamente y calcula ganancias.</p>
        <div style={styles.gridThree}>
          <Field label="Cliente">
            <select style={styles.input} value={saleClientId} onChange={(e) => setSaleClientId(e.target.value)}>
              {data.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Pago">
            <select style={styles.input} value={salePayment} onChange={(e) => setSalePayment(e.target.value)} disabled={isCredit}>
              <option>Efectivo</option>
              <option>Transferencia</option>
              <option>Tarjeta</option>
              <option>Nequi</option>
            </select>
          </Field>
          <Field label="¿Venta a crédito?">
            <select
              style={styles.input}
              value={isCredit ? "Si" : "No"}
              onChange={(e) => setIsCredit(e.target.value === "Si")}
            >
              <option>No</option>
              <option>Si</option>
            </select>
          </Field>
          {isCredit && (
            <>
              <Field label="Abono inicial">
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  max={salePreview.total}
                  value={initialPayment}
                  onChange={(e) => setInitialPayment(e.target.value)}
                />
              </Field>
              <Field label="Número de cuotas">
                <input
                  style={styles.input}
                  type="number"
                  min="1"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                />
              </Field>
            </>
          )}
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {saleItems.map((row, index) => (
            <div key={index} style={{ ...styles.invoiceBox }}>
              <div style={styles.gridThree}>
                <Field label="Producto">
                  <select style={styles.input} value={row.productId} onChange={(e) => updateSaleLine(index, "productId", e.target.value)}>
                    {data.products.map((p) => <option key={p.id} value={p.id}>{p.name} - stock {p.stock}</option>)}
                  </select>
                </Field>
                <Field label="Cantidad">
                  <input style={styles.input} type="number" min="1" value={row.quantity} onChange={(e) => updateSaleLine(index, "quantity", e.target.value)} />
                </Field>
                <Field label="Acción">
                  <button style={styles.buttonSecondary} onClick={() => removeSaleLine(index)}>Quitar</button>
                </Field>
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...styles.row, marginTop: 12 }}>
          <button style={styles.buttonSecondary} onClick={addSaleLine}>Agregar línea</button>
          <button style={styles.button} onClick={registerSale}>Guardar venta</button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Resumen de venta</h3>
        <p style={styles.sectionText}>Vista rápida de total y ganancia.</p>
        <div style={styles.invoiceBox}>
          {salePreview.items.map((item, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span>{item.name} x {item.quantity}</span>
              <strong>{currency.format(item.subtotal)}</strong>
            </div>
          ))}
          <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Total</span><strong>{currency.format(salePreview.total)}</strong></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Costo</span><strong>{currency.format(salePreview.totalCost)}</strong></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Ganancia</span><strong>{currency.format(salePreview.profit)}</strong></div>
          {isCredit && (
            <>
              <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Abono inicial</span>
                <strong>{currency.format(Number(initialPayment || 0))}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Saldo a crédito</span>
                <strong>{currency.format(Math.max(0, salePreview.total - Number(initialPayment || 0)))}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Valor por cuota</span>
                <strong>{currency.format(Math.ceil(Math.max(0, salePreview.total - Number(initialPayment || 0)) / Math.max(1, Number(installments || 1))))}</strong>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: 18 }}>
          <h4 style={{ marginBottom: 10 }}>Historial</h4>
          {data.sales.length ? data.sales.map((sale) => (
            <div key={sale.id} style={{ ...styles.invoiceBox, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{sale.number}</strong>
                  <div style={{ color: "#6b7280", marginTop: 6 }}>{sale.client} · {sale.date}</div>
                  <div style={{ color: "#6b7280", marginTop: 6 }}>Pago: {sale.paymentMethod}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>{currency.format(sale.total)}</strong>
                  <div style={{ color: "#16a34a", marginTop: 6 }}>Ganancia {currency.format(sale.profit)}</div>
                </div>
              </div>
            </div>
          )) : <div style={styles.invoiceBox}>Todavía no hay ventas registradas.</div>}
        </div>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div style={styles.gridTwo}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Registrar gasto</h3>
        <p style={styles.sectionText}>Controla tus gastos y calcula tu ganancia real.</p>
        <div style={styles.gridThree}>
          <Field label="Concepto"><input style={styles.input} value={expenseForm.concept} onChange={(e) => setExpenseForm({ ...expenseForm, concept: e.target.value })} /></Field>
          <Field label="Monto"><input style={styles.input} type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} /></Field>
          <Field label="Fecha"><input style={styles.input} type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}>
          <button style={styles.button} onClick={addExpense}>Guardar gasto</button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Historial de gastos</h3>
        <p style={styles.sectionText}>Gastos usados para calcular utilidad neta.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Concepto</th>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {data.expenses.map((e) => (
                <tr key={e.id}>
                  <td style={styles.td}>{e.concept}</td>
                  <td style={styles.td}>{e.date}</td>
                  <td style={styles.td}>{currency.format(e.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPeople = () => (
    <div style={styles.gridTwo}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Clientes</h3>
        <p style={styles.sectionText}>Registra clientes para tus ventas.</p>
        <div style={styles.gridThree}>
          <Field label="Nombre"><input style={styles.input} value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></Field>
          <Field label="Teléfono"><input style={styles.input} value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} /></Field>
          <Field label="Correo"><input style={styles.input} value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}><button style={styles.button} onClick={addClient}>Guardar cliente</button></div>
        <div style={{ marginTop: 16 }}>
          {data.clients.map((c) => (
            <div key={c.id} style={{ ...styles.invoiceBox, marginBottom: 10 }}>
              <strong>{c.name}</strong>
              <div style={{ color: "#6b7280", marginTop: 6 }}>{c.phone} · {c.email}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Proveedores</h3>
        <p style={styles.sectionText}>Registra proveedores para tu negocio.</p>
        <div style={styles.gridThree}>
          <Field label="Nombre"><input style={styles.input} value={supplierForm.name} onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })} /></Field>
          <Field label="Teléfono"><input style={styles.input} value={supplierForm.phone} onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })} /></Field>
          <Field label="Correo"><input style={styles.input} value={supplierForm.email} onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}><button style={styles.button} onClick={addSupplier}>Guardar proveedor</button></div>
        <div style={{ marginTop: 16 }}>
          {data.suppliers.map((s) => (
            <div key={s.id} style={{ ...styles.invoiceBox, marginBottom: 10 }}>
              <strong>{s.name}</strong>
              <div style={{ color: "#6b7280", marginTop: 6 }}>{s.phone} · {s.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCredits = () => {
    const credits = data.credits || [];
    const pendingCredits = credits.filter((credit) => credit.status !== "Pagado");
    const paidCredits = credits.filter((credit) => credit.status === "Pagado");
    const totalPending = pendingCredits.reduce((sum, credit) => sum + Number(credit.balance || 0), 0);

    return (
      <div style={{ display: "grid", gap: 18 }}>
        <div style={styles.statsGrid}>
          <Stat label="Saldo por cobrar" value={currency.format(totalPending)} helper={`${pendingCredits.length} créditos pendientes`} />
          <Stat label="Créditos pagados" value={paidCredits.length} helper="Clientes sin saldo pendiente" />
          <Stat label="Total créditos" value={credits.length} helper="Ventas financiadas registradas" />
        </div>

        <div style={styles.gridTwo}>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Registrar pago</h3>
            <p style={styles.sectionText}>Abona cuotas a un crédito y actualiza el saldo automáticamente.</p>
            <div style={styles.gridThree}>
              <Field label="Crédito">
                <select
                  style={styles.input}
                  value={paymentForm.creditId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, creditId: e.target.value })}
                >
                  <option value="">Seleccionar crédito</option>
                  {pendingCredits.map((credit) => (
                    <option key={credit.id} value={credit.id}>
                      {credit.number} - {credit.client} - {currency.format(credit.balance)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Valor del pago">
                <input
                  style={styles.input}
                  type="number"
                  min="1"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                />
              </Field>
              <Field label="Fecha">
                <input
                  style={styles.input}
                  type="date"
                  value={paymentForm.date}
                  onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })}
                />
              </Field>
            </div>
            <div style={{ marginTop: 12 }}>
              <button style={styles.button} onClick={registerCreditPayment}>Guardar pago</button>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Lista de créditos</h3>
            <p style={styles.sectionText}>Consulta cuotas, saldos y pagos realizados.</p>

            {credits.length ? credits.map((credit) => (
              <div key={credit.id} style={{ ...styles.invoiceBox, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <strong>{credit.number}</strong>
                    <div style={{ color: "#6b7280", marginTop: 6 }}>{credit.client} · {credit.date}</div>
                    <div style={{ color: "#6b7280", marginTop: 6 }}>
                      Total: {currency.format(credit.total)} · Abono inicial: {currency.format(credit.initialPayment || 0)}
                    </div>
                    <div style={{ color: "#6b7280", marginTop: 6 }}>
                      {credit.installments} cuotas de {currency.format(credit.installmentValue || 0)}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong>{currency.format(credit.balance || 0)}</strong>
                    <div style={{ color: "#6b7280", marginTop: 6 }}>Saldo pendiente</div>
                    <span style={{ ...styles.badge, ...(credit.status === "Pagado" ? styles.badgeOk : styles.badgeWarn), marginTop: 8 }}>
                      {credit.status}
                    </span>
                  </div>
                </div>

                {(credit.payments || []).length ? (
                  <div style={{ marginTop: 12 }}>
                    <strong>Pagos</strong>
                    {(credit.payments || []).map((payment) => (
                      <div key={payment.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6, color: "#6b7280" }}>
                        <span>{payment.date} · {payment.note}</span>
                        <strong>{currency.format(payment.amount)}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )) : (
              <div style={styles.invoiceBox}>Todavía no hay créditos registrados.</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>{data.business.name}</h1>
          <div style={styles.heroText}>
            App contable con inventario, ventas, gastos, clientes, proveedores y versión lista para usar desde celular y PC.
          </div>
          <div style={{ ...styles.row, marginTop: 14 }}>
            <button style={styles.button} onClick={installApp}>Instalar en celular</button>
            <button style={styles.buttonSecondary} onClick={exportBackup}>Respaldar datos</button>
          </div>
        </div>

        <div style={styles.tabs}>
          {[
            ["dashboard", "Resumen"],
            ["products", "Inventario"],
            ["sales", "Ventas"],
            ["expenses", "Gastos"],
            ["people", "Clientes y proveedores"],
            ["credits", "Créditos"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{ ...styles.tabButton, ...(tab === key ? styles.activeTab : {}) }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && renderDashboard()}
        {tab === "products" && renderProducts()}
        {tab === "sales" && renderSales()}
        {tab === "expenses" && renderExpenses()}
        {tab === "people" && renderPeople()}
        {tab === "credits" && renderCredits()}
      </div>
    </div>
  );
}
