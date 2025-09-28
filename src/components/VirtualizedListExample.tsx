import { ReactVirtualizedList } from "./ReactVirtualizedList";
import "./ReactVirtualizedList.css";

interface ExampleItem {
  id: number;
  name: string;
  amount: number;
  date: string;
}

// Example usage component
export function VirtualizedListExample() {
  // Sample data
  const items: ExampleItem[] = Array.from({ length: 1000 }, (_, index) => ({
    id: index,
    name: `Transaction ${index + 1}`,
    amount: Math.random() * 1000,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));

  const renderItem = (item: ExampleItem) => (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      borderBottom: "1px solid #eee",
      backgroundColor: "#f9f9f9",
    }}>
      <div>
        <div style={{ fontWeight: "bold" }}>{item.name}</div>
        <div style={{ fontSize: "12px", color: "#666" }}>{item.date}</div>
      </div>
      <div style={{ fontWeight: "bold", color: "#007bff" }}>
        ${item.amount.toFixed(2)}
      </div>
    </div>
  );

  const handleItemClick = (item: ExampleItem) => {
    console.log("Clicked item:", item);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Virtualized Transaction List</h2>
      <ReactVirtualizedList
        items={items}
        renderItem={renderItem}
        itemHeight={60}
        containerHeight={500}
        getItemKey={(item) => item.id.toString()}
        onItemClick={handleItemClick}
        className="transaction-list"
      />
    </div>
  );
}