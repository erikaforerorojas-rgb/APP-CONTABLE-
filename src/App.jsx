import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "creditos-daza-sistema-completo-v1";

const colors = {
  bg: "#f3f4f6",
  card: "#ffffff",
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  primary: "#0f172a",
  accent: "#facc15",
  success: "#16a34a",
  danger: "#dc2626",
  warning: "#d97706",
  info: "#2563eb",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: colors.bg,
    color: colors.text,
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: 18,
  },
  hero: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
    boxShadow: "0 16px 30px rgba(15,23,42,.18)",
  },
  heroRow: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  heroLeft: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
  },
  logo: {
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: 18,
    background: "white",
    padding: 6,
    boxSizing: "border-box",
  },
  title: { margin: 0, fontSize: 32, lineHeight: 1.05 },
  subtitle: { margin: "8px 0 0", color: "#dbeafe" },
  heroActions: { display: "flex", gap: 10, flexWrap: "wrap" },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  tab: {
    border: `1px solid ${colors.border}`,
    background: colors.card,
    padding: "10px 14px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
  },
  tabActive: {
    background: colors.primary,
    color: "white",
    border: `1px solid ${colors.primary}`,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    background: colors.card,
    borderRadius: 20,
    padding: 18,
    border: `1px solid ${colors.border}`,
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
  },
  statLabel: { fontSize: 13, color: colors.muted, marginBottom: 8 },
  statValue: { fontSize: 28, fontWeight: 800 },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 16,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 12,
  },
  card: {
    background: colors.card,
    borderRadius: 20,
    padding: 18,
    border: `1px solid ${colors.border}`,
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
  },
  sectionTitle: { margin: 0, fontSize: 24 },
  sectionText: { color: colors.muted, margin: "8px 0 16px" },
  label: { display: "block", marginBottom: 6, fontWeight: 700, fontSize: 13 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: "11px 12px",
    outline: "none",
    background: "white",
  },
  textarea: {
    width: "100%",
    minHeight: 86,
    boxSizing: "border-box",
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: "11px 12px",
    outline: "none",
    resize: "vertical",
  },
  button: {
    border: "none",
    background: colors.primary,
    color: "white",
    padding: "11px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 800,
  },
  buttonAccent: {
    border: "none",
    background: colors.accent,
    color: "#111827",
    padding: "11px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 800,
  },
  buttonSecondary: {
    border: `1px solid ${colors.border}`,
    background: "white",
    color: colors.text,
    padding: "11px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 800,
  },
  buttonDanger: {
    border: "none",
    background: colors.danger,
    color: "white",
    padding: "9px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  row: { display: "flex", gap: 10, flexWrap: "wrap" },
  tableWrap: {
    overflowX: "auto",
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
  },
  table: { width: "100%", borderCollapse: "collapse", background: "white" },
  th: {
    background: "#f9fafb",
    color: colors.muted,
    textAlign: "left",
    fontSize: 13,
    padding: 12,
    borderBottom: `1px solid ${colors.border}`,
  },
  td: { padding: 12, borderBottom: "1px solid #f3f4f6", fontSize: 14, verticalAlign: "top" },
  badge: {
    display: "inline-block",
    borderRadius: 999,
    padding: "5px 10px",
    fontSize: 12,
    fontWeight: 800,
  },
  listCard: {
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    padding: 14,
    background: "#fafafa",
  },
  divider: { border: 0, borderTop: `1px solid ${colors.border}`, margin: "14px 0" },
};

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const initialData = {
  business: {
    name: "Créditos Daza",
    phone: "3000000000",
    email: "creditosdaza@demo.com",
    address: "Colombia",
    invoicePrefix: "CD",
    lowStockThreshold: 5,
  },
  products: [
    { id: 1, name: "Sartén Antiadherente", category: "Cocina", price: 75000, cost: 45000, stock: 10 },
    { id: 2, name: "Licuadora", category: "Electrohogar", price: 220000, cost: 150000, stock: 6 },
  ],
  clients: [
    {
      id: 1,
      name: "Cliente Demo",
      phone: "3000000000",
      email: "cliente@demo.com",
      address: "Bogotá",
      doc: "1001001001",
    },
  ],
  suppliers: [
    { id: 1, name: "Proveedor Demo", phone: "3110000000", email: "proveedor@demo.com" },
  ],
  expenses: [],
  sales: [],
  creditPayments: [],
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function uid() {
  return Date.now() + Math.floor(Math.random() * 1000);
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

function badgeStyle(kind) {
  const map = {
    ok: { background: "#dcfce7", color: "#166534" },
    warn: { background: "#fef3c7", color: "#92400e" },
    danger: { background: "#fee2e2", color: "#991b1b" },
    info: { background: "#dbeafe", color: "#1d4ed8" },
  };
  return { ...styles.badge, ...(map[kind] || map.info) };
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
    <div style={styles.statCard}>
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
  const [clientForm, setClientForm] = useState({ name: "", phone: "", email: "", address: "", doc: "" });
  const [supplierForm, setSupplierForm] = useState({ name: "", phone: "", email: "" });
  const [expenseForm, setExpenseForm] = useState({ concept: "", amount: "", date: today() });

  const [saleClientId, setSaleClientId] = useState("1");
  const [saleItems, setSaleItems] = useState([{ productId: "1", quantity: 1 }]);
  const [salePaymentType, setSalePaymentType] = useState("Contado");
  const [saleDownPayment, setSaleDownPayment] = useState("0");
  const [saleInstallments, setSaleInstallments] = useState("4");
  const [saleFrequency, setSaleFrequency] = useState("Mensual");
  const [saleNotes, setSaleNotes] = useState("");
  const [selectedCreditId, setSelectedCreditId] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

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
    const inventoryValue = data.products.reduce((sum, p) => sum + p.cost * p.stock, 0);
    const grossProfit = data.sales.reduce((sum, item) => sum + item.profit, 0);
    const creditPortfolio = data.sales
      .filter((sale) => sale.paymentType === "Crédito")
      .reduce((sum, sale) => sum + sale.balanceDue, 0);
    const totalCollectedCredits = data.creditPayments.reduce((sum, p) => sum + p.amount, 0);
    const netProfit = grossProfit - expenses;
    return { sales, expenses, inventoryValue, grossProfit, creditPortfolio, totalCollectedCredits, netProfit };
  }, [data]);

  const lowStockProducts = useMemo(
    () => data.products.filter((p) => p.stock <= Number(data.business.lowStockThreshold || 5)),
    [data.products, data.business.lowStockThreshold]
  );

  const credits = useMemo(() => data.sales.filter((sale) => sale.paymentType === "Crédito"), [data.sales]);

  const overdueCredits = useMemo(
    () => credits.filter((c) => c.balanceDue > 0 && c.nextPaymentDate && c.nextPaymentDate < today()),
    [credits]
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
    const downPayment = Math.min(Number(saleDownPayment || 0), total);
    const balance = Math.max(total - downPayment, 0);
    const installments = Math.max(Number(saleInstallments || 1), 1);
    const installmentValue = balance / installments;

    return {
      items,
      total,
      totalCost,
      profit: total - totalCost,
      downPayment,
      balance,
      installmentValue,
      installments,
    };
  }, [saleItems, data.products, saleDownPayment, saleInstallments]);

  const selectedCredit = useMemo(
    () => data.sales.find((sale) => sale.id === selectedCreditId) || null,
    [data.sales, selectedCreditId]
  );

  const selectedCreditPayments = useMemo(
    () => data.creditPayments.filter((p) => p.saleId === selectedCreditId),
    [data.creditPayments, selectedCreditId]
  );

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
    setClientForm({ name: "", phone: "", email: "", address: "", doc: "" });
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

  const nextPaymentDateFromToday = () => {
    const date = new Date();
    if (saleFrequency === "Semanal") date.setDate(date.getDate() + 7);
    else if (saleFrequency === "Quincenal") date.setDate(date.getDate() + 15);
    else date.setMonth(date.getMonth() + 1);
    return date.toISOString().slice(0, 10);
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

    if (salePaymentType === "Crédito" && salePreview.installments < 1) {
      alert("Debes definir las cuotas del crédito");
      return;
    }

    const number = `${data.business.invoicePrefix}-${String(data.sales.length + 1).padStart(4, "0")}`;
    const baseSale = {
      id: uid(),
      number,
      clientId: client.id,
      client: client.name,
      clientPhone: client.phone,
      paymentType: salePaymentType,
      paymentMethod: salePaymentType === "Contado" ? paymentMethod : "Crédito",
      date: today(),
      items: salePreview.items,
      total: salePreview.total,
      totalCost: salePreview.totalCost,
      profit: salePreview.profit,
      notes: saleNotes,
    };

    const creditFields = salePaymentType === "Crédito"
      ? {
          downPayment: salePreview.downPayment,
          balanceDue: salePreview.balance,
          installments: salePreview.installments,
          installmentValue: salePreview.installmentValue,
          paidOnCredit: salePreview.downPayment,
          frequency: saleFrequency,
          status: salePreview.balance > 0 ? "Activo" : "Pagado",
          nextPaymentDate: salePreview.balance > 0 ? nextPaymentDateFromToday() : null,
        }
      : {
          downPayment: salePreview.total,
          balanceDue: 0,
          installments: 1,
          installmentValue: 0,
          paidOnCredit: salePreview.total,
          frequency: "N/A",
          status: "Pagado",
          nextPaymentDate: null,
        };

    const sale = { ...baseSale, ...creditFields };

    setData((prev) => ({
      ...prev,
      sales: [sale, ...prev.sales],
      products: prev.products.map((product) => {
        const sold = salePreview.items.find((item) => item.productId === product.id);
        return sold ? { ...product, stock: product.stock - sold.quantity } : product;
      }),
      creditPayments:
        salePaymentType === "Crédito" && salePreview.downPayment > 0
          ? [
              {
                id: uid(),
                saleId: sale.id,
                saleNumber: sale.number,
                client: sale.client,
                amount: salePreview.downPayment,
                method: "Cuota inicial",
                date: today(),
                note: "Pago inicial del crédito",
              },
              ...prev.creditPayments,
            ]
          : prev.creditPayments,
    }));

    setSaleItems([{ productId: String(data.products[0]?.id || ""), quantity: 1 }]);
    setSalePaymentType("Contado");
    setSaleDownPayment("0");
    setSaleInstallments("4");
    setSaleFrequency("Mensual");
    setSaleNotes("");
    alert("Venta registrada correctamente");
  };

  const registerCreditPayment = () => {
    if (!selectedCredit) return;
    const amount = Number(paymentAmount || 0);
    if (amount <= 0) return;
    if (amount > selectedCredit.balanceDue) {
      alert("El abono no puede ser mayor al saldo pendiente");
      return;
    }

    const updatedBalance = Math.max(selectedCredit.balanceDue - amount, 0);
    const updatedSale = {
      ...selectedCredit,
      balanceDue: updatedBalance,
      paidOnCredit: Number(selectedCredit.paidOnCredit || 0) + amount,
      status: updatedBalance === 0 ? "Pagado" : "Activo",
      nextPaymentDate: updatedBalance === 0 ? null : nextPaymentDateFromToday(),
    };

    setData((prev) => ({
      ...prev,
      sales: prev.sales.map((sale) => (sale.id === selectedCredit.id ? updatedSale : sale)),
      creditPayments: [
        {
          id: uid(),
          saleId: selectedCredit.id,
          saleNumber: selectedCredit.number,
          client: selectedCredit.client,
          amount,
          method: paymentMethod,
          date: today(),
          note: "Abono a crédito",
        },
        ...prev.creditPayments,
      ],
    }));

    setPaymentAmount("");
    setSelectedCreditId(updatedSale.id);
    alert("Abono registrado correctamente");
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "creditos-daza-respaldo.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const installApp = () => {
    alert("Abre el menú del navegador en tu celular y usa 'Agregar a pantalla de inicio' para instalar Créditos Daza.");
  };

  const renderDashboard = () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={styles.stats}>
        <Stat label="Ventas totales" value={currency.format(totals.sales)} helper="Total vendido" />
        <Stat label="Ganancia neta" value={currency.format(totals.netProfit)} helper="Ganancia menos gastos" />
        <Stat label="Cartera" value={currency.format(totals.creditPortfolio)} helper="Saldo por cobrar" />
        <Stat label="Abonos recibidos" value={currency.format(totals.totalCollectedCredits)} helper="Cobros de crédito" />
        <Stat label="Inventario" value={currency.format(totals.inventoryValue)} helper="Valor del stock" />
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Créditos vencidos</h3>
          <p style={styles.sectionText}>Clientes con cuota pendiente por fecha.</p>
          {overdueCredits.length ? overdueCredits.map((credit) => (
            <div key={credit.id} style={{ ...styles.listCard, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{credit.client}</strong>
                  <div style={{ color: colors.muted, marginTop: 6 }}>{credit.number} · Próximo pago {credit.nextPaymentDate}</div>
                </div>
                <span style={badgeStyle("danger")}>{currency.format(credit.balanceDue)}</span>
              </div>
            </div>
          )) : <div style={styles.listCard}>No hay créditos vencidos.</div>}
        </div>

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Stock bajo</h3>
          <p style={styles.sectionText}>Productos con inventario crítico.</p>
          {lowStockProducts.length ? lowStockProducts.map((p) => (
            <div key={p.id} style={{ ...styles.listCard, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{p.name}</strong>
                  <div style={{ color: colors.muted, marginTop: 6 }}>{p.category}</div>
                </div>
                <span style={badgeStyle(p.stock <= 1 ? "danger" : "warn")}>{p.stock} uds</span>
              </div>
            </div>
          )) : <div style={styles.listCard}>No hay alertas de inventario.</div>}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div style={styles.grid2}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Nuevo producto</h3>
        <p style={styles.sectionText}>Agrega artículos para el hogar con precio, costo y stock.</p>
        <div style={styles.grid3}>
          <Field label="Nombre"><input style={styles.input} value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} /></Field>
          <Field label="Categoría"><input style={styles.input} value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} /></Field>
          <Field label="Precio"><input style={styles.input} type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} /></Field>
          <Field label="Costo"><input style={styles.input} type="number" value={productForm.cost} onChange={(e) => setProductForm({ ...productForm, cost: e.target.value })} /></Field>
          <Field label="Stock"><input style={styles.input} type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}><button style={styles.button} onClick={addProduct}>Guardar producto</button></div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Inventario</h3>
        <p style={styles.sectionText}>Controla existencias y márgenes de utilidad.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Producto</th>
                <th style={styles.th}>Categoría</th>
                <th style={styles.th}>Precio</th>
                <th style={styles.th}>Costo</th>
                <th style={styles.th}>Margen</th>
                <th style={styles.th}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => {
                const margin = p.price > 0 ? Math.round(((p.price - p.cost) / p.price) * 100) : 0;
                return (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.category}</td>
                    <td style={styles.td}>{currency.format(p.price)}</td>
                    <td style={styles.td}>{currency.format(p.cost)}</td>
                    <td style={styles.td}>{margin}%</td>
                    <td style={styles.td}><span style={badgeStyle(p.stock <= data.business.lowStockThreshold ? "warn" : "ok")}>{p.stock}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClientsSuppliers = () => (
    <div style={styles.grid2}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Clientes</h3>
        <p style={styles.sectionText}>Registra clientes para ventas a contado y a crédito.</p>
        <div style={styles.grid3}>
          <Field label="Nombre"><input style={styles.input} value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} /></Field>
          <Field label="Teléfono"><input style={styles.input} value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} /></Field>
          <Field label="Correo"><input style={styles.input} value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} /></Field>
          <Field label="Dirección"><input style={styles.input} value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} /></Field>
          <Field label="Documento"><input style={styles.input} value={clientForm.doc} onChange={(e) => setClientForm({ ...clientForm, doc: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}><button style={styles.button} onClick={addClient}>Guardar cliente</button></div>
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          {data.clients.map((c) => (
            <div key={c.id} style={styles.listCard}>
              <strong>{c.name}</strong>
              <div style={{ color: colors.muted, marginTop: 6 }}>{c.phone} · {c.email}</div>
              <div style={{ color: colors.muted, marginTop: 4 }}>{c.address} · {c.doc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Proveedores</h3>
        <p style={styles.sectionText}>Guarda los datos de tus proveedores.</p>
        <div style={styles.grid3}>
          <Field label="Nombre"><input style={styles.input} value={supplierForm.name} onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })} /></Field>
          <Field label="Teléfono"><input style={styles.input} value={supplierForm.phone} onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })} /></Field>
          <Field label="Correo"><input style={styles.input} value={supplierForm.email} onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}><button style={styles.button} onClick={addSupplier}>Guardar proveedor</button></div>
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          {data.suppliers.map((s) => (
            <div key={s.id} style={styles.listCard}>
              <strong>{s.name}</strong>
              <div style={{ color: colors.muted, marginTop: 6 }}>{s.phone} · {s.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSalesCredits = () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={styles.grid2}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Nueva venta</h3>
          <p style={styles.sectionText}>Registra ventas de contado o a crédito con cuotas.</p>
          <div style={styles.grid3}>
            <Field label="Cliente">
              <select style={styles.input} value={saleClientId} onChange={(e) => setSaleClientId(e.target.value)}>
                {data.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Tipo de venta">
              <select style={styles.input} value={salePaymentType} onChange={(e) => setSalePaymentType(e.target.value)}>
                <option>Contado</option>
                <option>Crédito</option>
              </select>
            </Field>
            <Field label="Medio de pago">
              <select style={styles.input} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
                <option>Nequi</option>
              </select>
            </Field>
          </div>

          {salePaymentType === "Crédito" && (
            <div style={{ ...styles.grid3, marginTop: 12 }}>
              <Field label="Cuota inicial"><input style={styles.input} type="number" value={saleDownPayment} onChange={(e) => setSaleDownPayment(e.target.value)} /></Field>
              <Field label="Número de cuotas"><input style={styles.input} type="number" min="1" value={saleInstallments} onChange={(e) => setSaleInstallments(e.target.value)} /></Field>
              <Field label="Frecuencia">
                <select style={styles.input} value={saleFrequency} onChange={(e) => setSaleFrequency(e.target.value)}>
                  <option>Semanal</option>
                  <option>Quincenal</option>
                  <option>Mensual</option>
                </select>
              </Field>
            </div>
          )}

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            {saleItems.map((row, index) => (
              <div key={index} style={styles.listCard}>
                <div style={styles.grid3}>
                  <Field label="Producto">
                    <select style={styles.input} value={row.productId} onChange={(e) => updateSaleLine(index, "productId", e.target.value)}>
                      {data.products.map((p) => <option key={p.id} value={p.id}>{p.name} · stock {p.stock}</option>)}
                    </select>
                  </Field>
                  <Field label="Cantidad"><input style={styles.input} type="number" min="1" value={row.quantity} onChange={(e) => updateSaleLine(index, "quantity", e.target.value)} /></Field>
                  <Field label="Acción"><button style={styles.buttonSecondary} onClick={() => removeSaleLine(index)}>Quitar</button></Field>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <Field label="Notas"><textarea style={styles.textarea} value={saleNotes} onChange={(e) => setSaleNotes(e.target.value)} /></Field>
          </div>

          <div style={{ ...styles.row, marginTop: 12 }}>
            <button style={styles.buttonSecondary} onClick={addSaleLine}>Agregar línea</button>
            <button style={styles.buttonAccent} onClick={registerSale}>Guardar venta</button>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Resumen de la venta</h3>
          <p style={styles.sectionText}>Calcula total, costo, utilidad y plan de crédito.</p>
          <div style={styles.listCard}>
            {salePreview.items.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <span>{item.name} x {item.quantity}</span>
                <strong>{currency.format(item.subtotal)}</strong>
              </div>
            ))}
            <hr style={styles.divider} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Total</span><strong>{currency.format(salePreview.total)}</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Costo</span><strong>{currency.format(salePreview.totalCost)}</strong></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Ganancia</span><strong>{currency.format(salePreview.profit)}</strong></div>
            {salePaymentType === "Crédito" && (
              <>
                <hr style={styles.divider} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Cuota inicial</span><strong>{currency.format(salePreview.downPayment)}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span>Saldo</span><strong>{currency.format(salePreview.balance)}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Valor por cuota</span><strong>{currency.format(salePreview.installmentValue)}</strong></div>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Historial de ventas</h3>
          <p style={styles.sectionText}>Ventas de contado y crédito.</p>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Factura</th>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Tipo</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {data.sales.map((sale) => (
                  <tr key={sale.id}>
                    <td style={styles.td}>{sale.number}</td>
                    <td style={styles.td}>{sale.client}</td>
                    <td style={styles.td}>{sale.date}</td>
                    <td style={styles.td}><span style={badgeStyle(sale.paymentType === "Crédito" ? "warn" : "ok")}>{sale.paymentType}</span></td>
                    <td style={styles.td}>{currency.format(sale.total)}</td>
                    <td style={styles.td}>{currency.format(sale.balanceDue || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Cartera de créditos</h3>
          <p style={styles.sectionText}>Selecciona un crédito y registra abonos.</p>

          <Field label="Crédito seleccionado">
            <select style={styles.input} value={selectedCreditId || ""} onChange={(e) => setSelectedCreditId(Number(e.target.value) || null)}>
              <option value="">Selecciona un crédito</option>
              {credits.map((credit) => (
                <option key={credit.id} value={credit.id}>{credit.number} · {credit.client} · saldo {currency.format(credit.balanceDue)}</option>
              ))}
            </select>
          </Field>

          {selectedCredit && (
            <div style={{ marginTop: 14 }}>
              <div style={styles.listCard}>
                <div><strong>{selectedCredit.client}</strong></div>
                <div style={{ color: colors.muted, marginTop: 6 }}>{selectedCredit.number} · {selectedCredit.frequency}</div>
                <div style={{ color: colors.muted, marginTop: 4 }}>Total {currency.format(selectedCredit.total)} · Abonado {currency.format(selectedCredit.paidOnCredit || 0)}</div>
                <div style={{ marginTop: 8 }}><span style={badgeStyle(selectedCredit.balanceDue > 0 ? "warn" : "ok")}>Saldo {currency.format(selectedCredit.balanceDue)}</span></div>
              </div>

              <div style={{ ...styles.grid3, marginTop: 12 }}>
                <Field label="Valor del abono"><input style={styles.input} type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} /></Field>
                <Field label="Medio de pago">
                  <select style={styles.input} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option>Efectivo</option>
                    <option>Transferencia</option>
                    <option>Tarjeta</option>
                    <option>Nequi</option>
                  </select>
                </Field>
              </div>
              <div style={{ marginTop: 12 }}><button style={styles.button} onClick={registerCreditPayment}>Registrar abono</button></div>

              <div style={{ marginTop: 16 }}>
                <h4 style={{ margin: "0 0 10px" }}>Pagos realizados</h4>
                {selectedCreditPayments.length ? selectedCreditPayments.map((p) => (
                  <div key={p.id} style={{ ...styles.listCard, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <span>{p.date} · {p.method}</span>
                      <strong>{currency.format(p.amount)}</strong>
                    </div>
                  </div>
                )) : <div style={styles.listCard}>Todavía no hay pagos para este crédito.</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderExpensesReports = () => (
    <div style={styles.grid2}>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Gastos</h3>
        <p style={styles.sectionText}>Registra gastos para calcular ganancia real.</p>
        <div style={styles.grid3}>
          <Field label="Concepto"><input style={styles.input} value={expenseForm.concept} onChange={(e) => setExpenseForm({ ...expenseForm, concept: e.target.value })} /></Field>
          <Field label="Monto"><input style={styles.input} type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} /></Field>
          <Field label="Fecha"><input style={styles.input} type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 12 }}><button style={styles.button} onClick={addExpense}>Guardar gasto</button></div>

        <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
          {data.expenses.length ? data.expenses.map((expense) => (
            <div key={expense.id} style={styles.listCard}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span>{expense.concept} · {expense.date}</span>
                <strong>{currency.format(expense.amount)}</strong>
              </div>
            </div>
          )) : <div style={styles.listCard}>No hay gastos registrados.</div>}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Reportes rápidos</h3>
        <p style={styles.sectionText}>Resumen financiero del negocio.</p>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={styles.listCard}><strong>Ventas:</strong> {currency.format(totals.sales)}</div>
          <div style={styles.listCard}><strong>Ganancia bruta:</strong> {currency.format(totals.grossProfit)}</div>
          <div style={styles.listCard}><strong>Gastos:</strong> {currency.format(totals.expenses)}</div>
          <div style={styles.listCard}><strong>Ganancia neta:</strong> {currency.format(totals.netProfit)}</div>
          <div style={styles.listCard}><strong>Cartera pendiente:</strong> {currency.format(totals.creditPortfolio)}</div>
          <div style={styles.listCard}><strong>Inventario valorizado:</strong> {currency.format(totals.inventoryValue)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.heroRow}>
            <div style={styles.heroLeft}>
              <img src="/logo.png" alt="Créditos Daza" style={styles.logo} />
              <div>
                <h1 style={styles.title}>Créditos <span style={{ color: colors.accent }}>DAZA</span></h1>
                <div style={styles.subtitle}>Sistema completo de créditos para venta de artículos para el hogar</div>
              </div>
            </div>
            <div style={styles.heroActions}>
              <button style={styles.buttonAccent} onClick={installApp}>Instalar app</button>
              <button style={styles.buttonSecondary} onClick={exportBackup}>Respaldar datos</button>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          {[
            ["dashboard", "Resumen"],
            ["products", "Inventario"],
            ["clients", "Clientes y proveedores"],
            ["sales", "Ventas y créditos"],
            ["reports", "Gastos y reportes"],
          ].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ ...styles.tab, ...(tab === key ? styles.tabActive : {}) }}>{label}</button>
          ))}
        </div>

        {tab === "dashboard" && renderDashboard()}
        {tab === "products" && renderProducts()}
        {tab === "clients" && renderClientsSuppliers()}
        {tab === "sales" && renderSalesCredits()}
        {tab === "reports" && renderExpensesReports()}
      </div>
    </div>
  );
}
