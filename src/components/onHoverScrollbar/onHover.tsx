import React, { useState, useCallback, useRef, useEffect } from "react";
import "./onHover.css";

const SCROLL_BOX_MIN_HEIGHT = 20;

export default function CustomScrollDiv({ children, className, ...restProps  }: any) {
  const [hovering, setHovering] = useState(false);
  const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT);
  const [scrollBoxTop, setScrollBoxTop] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);

  const scrollHostRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = useCallback(() => {
    !hovering && setHovering(true);
  }, [hovering]);

  const handleMouseLeave = useCallback(() => {
    !!hovering && setHovering(false);
  }, [hovering]);

  const handleDocumentMouseUp = useCallback(
    (    e: { preventDefault: () => void; }) => {
      if (isDragging) {
        e.preventDefault();
        setDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
    (e: any) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        if (scrollHostRef.current) {
          const scrollHostElement = scrollHostRef.current;
          const { scrollHeight, offsetHeight } = scrollHostElement;

          let deltaY = e.clientY - lastScrollThumbPosition;
          let percentage = deltaY * (scrollHeight / offsetHeight);

          setScrollThumbPosition(e.clientY);
          setScrollBoxTop(
            Math.min(
              Math.max(0, scrollBoxTop + deltaY),
              offsetHeight - scrollBoxHeight
            )
          );
          scrollHostElement.scrollTop = Math.min(
            scrollHostElement.scrollTop + percentage,
            scrollHeight - offsetHeight
          );
        }
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

  const handleScrollThumbMouseDown = useCallback((e: { preventDefault: () => void; stopPropagation: () => void; clientY: React.SetStateAction<number>; }) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    if (scrollHostRef.current) {
      const scrollHostElement = scrollHostRef.current;
      const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;
  
      let newTop = (scrollTop / scrollHeight) * offsetHeight;
      newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
      setScrollBoxTop(newTop);
    }
  }, []);

  useEffect(() => {
    if (scrollHostRef.current) {
      const scrollHostElement = scrollHostRef.current;
      const { clientHeight, scrollHeight } = scrollHostElement;
      const scrollThumbPercentage = clientHeight / scrollHeight;
      const scrollThumbHeight = Math.max(
        scrollThumbPercentage * clientHeight,
        SCROLL_BOX_MIN_HEIGHT
      );
      setScrollBoxHeight(scrollThumbHeight);
      scrollHostElement.addEventListener("scroll", handleScroll, true);
      return function cleanup() {
        scrollHostElement.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [scrollHostRef.current?.scrollHeight]);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <div
      className={"scrollhost-container"}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={scrollHostRef} className={`scrollhost ${className}`} {...restProps}>
        {children}
      </div>
      <div className={"scroll-bar"} style={{ opacity: hovering ? 1 : 0 }}>
        <div
          className={"scroll-thumb"}
          style={{ height: scrollBoxHeight, top: scrollBoxTop }}
          onMouseDown={handleScrollThumbMouseDown}
        />
      </div>
    </div>
  );
}