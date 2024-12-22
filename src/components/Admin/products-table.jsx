import React from "react";

export function ProductsTable({
  products,
  onEdit,
  onDelete,
  setIsEditModalOpen,
  toggleAvailability,
}) {
  console.log(products);

  const columns = [
    { key: "image", header: "Item Image" },
    { key: "name", header: "Name" },
    { key: "description", header: "Description" },
    {
      key: "price",
      header: "Price",
      render: (product) => {
        const price = parseFloat(product.price);
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);
      },
    },
    { key: "category", header: "Category" },
    {
      key: "isAvailable",
      header: "Availability",
      render: (product) => (
        <button
          onClick={() => toggleAvailability(product._id)}
          className={`btn btn-sm ${
            product.availability ? "btn-success" : "btn-danger"
          }`}
        >
          {product.availability ? "Available" : "Unavailable"}
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (product) => (
        <div className="actions">
          <button
            onClick={() => {
              console.log(product);

              onEdit(product);
              setIsEditModalOpen(true);
            }}
            className="btn btn-outline btn-sm"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="btn btn-outline btn-sm"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "image" ? (
                      // Render image in the table
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover"
                      />
                    ) : col.render ? (
                      col.render(product)
                    ) : (
                      product[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          overflow-x: auto;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-top: 1rem;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f9f9f9;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn {
          padding: 0.5rem;
          border: 1px solid #ccc;
          background-color: transparent;
          cursor: pointer;
        }
        .btn-sm {
          font-size: 0.8rem;
        }
        .btn-outline {
          color: #333;
        }
        .btn-outline:hover {
          background-color: #eee;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
        }
        .btn-danger {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
}
