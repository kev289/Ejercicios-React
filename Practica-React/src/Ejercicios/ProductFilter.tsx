import { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const allProducts: Product[] = [
  { id: 1, name: "Laptop Pro", category: "Tecnología", price: 2500, stock: 5 },
  { id: 2, name: "Silla Ergonómica", category: "Muebles", price: 300, stock: 10 },
  { id: 3, name: "Teclado RGB", category: "Tecnología", price: 100, stock: 0 },
  { id: 4, name: "Escritorio Elevable", category: "Muebles", price: 600, stock: 2 },
  { id: 5, name: "Monitor 4K", category: "Tecnología", price: 800, stock: 15 },
  { id: 6, name: "Lámpara LED", category: "Hogar", price: 50, stock: 20 },
];

const ProductFilter = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const filteredProducts = useMemo(() => {
    console.log("Filtrando productos...");
    
    return allProducts
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter(p => category === "Todas" || p.category === category)
      .filter(p => !onlyInStock || p.stock > 0)
      .sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
  }, [search, category, sortOrder, onlyInStock]);

  return (
    <div className="exercise-container">
      <h2>8. Filtro de Productos (useMemo avanzado)</h2>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '20px', textAlign: 'left' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Todas">Todas las categorías</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Muebles">Muebles</option>
            <option value="Hogar">Hogar</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={onlyInStock} 
            onChange={(e) => setOnlyInStock(e.target.checked)} 
          />
          Solo productos con stock disponible
        </label>
      </div>

      <p style={{ textAlign: 'left', opacity: 0.7 }}>Resultados encontrados: {filteredProducts.length}</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Producto</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Categoría</th>
            <th style={{ textAlign: 'right', padding: '10px' }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ textAlign: 'left', padding: '10px' }}>
                {p.name} {p.stock === 0 && <span style={{ color: '#ff4646', fontSize: '0.7rem' }}>(Sin stock)</span>}
              </td>
              <td style={{ textAlign: 'left', padding: '10px' }}>{p.category}</td>
              <td style={{ textAlign: 'right', padding: '10px' }}>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredProducts.length === 0 && (
        <p style={{ marginTop: '20px', opacity: 0.5 }}>No hay productos que coincidan con los filtros.</p>
      )}
    </div>
  );
};

export default ProductFilter;
