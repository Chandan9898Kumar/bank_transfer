import React, { useRef, useEffect, useState, useCallback } from "react";
import "./VirtualizedList.css";

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  getItemKey?: (item: T, index: number) => string | number;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
  className = "",
  getItemKey,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = window.innerWidth <= 768;

  const actualContainerHeight =
    containerHeight || (isMobile ? window.innerHeight * 0.6 : 400);
  const actualOverscan = isMobile ? Math.max(2, overscan) : overscan;

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(actualContainerHeight / itemHeight);
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - actualOverscan
  );
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount + actualOverscan * 2
  );
  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    height: actualContainerHeight,
    overflow: "auto",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    scrollBehavior: "smooth",
  };

  if (isMobile) {
    containerStyle.touchAction = "pan-y";
    containerStyle.WebkitTapHighlightColor = "transparent";
  }

  return (
    <div
      ref={containerRef}
      className={`virtualized-list ${className} ${
        isScrolling ? "scrolling" : ""
      }`}
      style={containerStyle}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            willChange: isScrolling ? "transform" : "auto",
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            const key = getItemKey
              ? getItemKey(item, actualIndex)
              : actualIndex;

            return (
              <div
                key={key}
                style={{
                  height: itemHeight,
                  position: "relative",
                  contain: "layout style paint",
                  margin: "5px auto",
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const VirtualizedListMemo = React.memo(
  VirtualizedList
) as typeof VirtualizedList;
