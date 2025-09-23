import React from "react";
import { Grid, AutoSizer, ColumnSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import "./ReactVirtualizedList.css";

interface cellRenderer {
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}

// Remove VirtualizedListItem and use a generic type for items
interface ReactVirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, rowIndex: number) => React.ReactNode;
  itemHeight: number;
  getItemKey: (item: T, rowIndex: number) => string;
  onItemClick?: (item: T) => void;
  className?: string;
  containerHeight?: number | string;
}
export function ReactVirtualizedList<T>({
  items,
  renderItem,
  itemHeight = 60,
  containerHeight,
  className = "",
  getItemKey,
}: ReactVirtualizedListProps<T>) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const cellRenderer = ({ key, rowIndex, style }: cellRenderer) => {
    const item = items[rowIndex];
    if (!item) return null;

    const itemKey = getItemKey ? getItemKey(item, rowIndex) : key;

    return (
      <div
        key={itemKey}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "4px 0",
        }}
      >
        {renderItem(item, rowIndex)}
      </div>
    );
  };

  return (
    <div
      className={`react-virtualized-list ${className}`}
      style={{ height: containerHeight || "100%" }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <ColumnSizer
            columnMaxWidth={width}
            columnMinWidth={width}
            columnCount={1}
            width={width}
          >
            {({ adjustedWidth, getColumnWidth, registerChild }) => (
              <Grid
                ref={registerChild}
                columnCount={1}
                columnWidth={getColumnWidth}
                height={height}
                rowCount={items.length}
                rowHeight={itemHeight}
                width={adjustedWidth}
                cellRenderer={cellRenderer}
                overscanRowCount={isMobile ? 2 : 5}
                scrollingResetTimeInterval={150}
                style={{
                  outline: "none",
                  overflowX: "hidden",
                }}
                containerStyle={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: isMobile ? "pan-y" : "auto",
                }}
              />
            )}
          </ColumnSizer>
        )}
      </AutoSizer>
    </div>
  );
}

export const ReactVirtualizedListMemo = React.memo(
  ReactVirtualizedList
) as typeof ReactVirtualizedList;
