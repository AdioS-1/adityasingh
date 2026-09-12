import React, { useEffect, useState, useRef } from 'react';

export interface CursorState {
  type: 'default' | 'pointer' | 'project' | 'text' | 'drag';
  label?: string;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch or reduced motion
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouchDevice(hasTouch || prefersReduced);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered elements for data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl) {
        const label = projectEl.getAttribute('data-cursor-label') || 'VIEW';
        setCursorState({ type: 'project', label });
        return;
      }

      const dragEl = target.closest('[data-cursor="drag"]');
      if (dragEl) {
        setCursorState({ type: 'drag', label: 'DRAG' });
        return;
      }

      const interactiveEl = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      if (interactiveEl) {
        setCursorState({ type: 'pointer' });
        return;
      }

      setCursorState({ type: 'default' });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  // Smooth lerp animation loop
  useEffect(() => {
    if (isTouchDevice) return;

    let currentX = pos.x;
    let currentY = pos.y;

    const loop = () => {
      const ease = cursorState.type === 'project' ? 0.18 : 0.24;
      currentX += (targetPos.x - currentX) * ease;
      currentY += (targetPos.y - currentY) * ease;

      setPos({ x: currentX, y: currentY });
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetPos, isTouchDevice, cursorState.type]);

  if (isTouchDevice || !isVisible) return null;

  const isProject = cursorState.type === 'project';
  const isPointer = cursorState.type === 'pointer';
  const isDrag = cursorState.type === 'drag';

  let size = 22;
  if (isPointer) size = 44;
  if (isProject) size = 74;
  if (isDrag) size = 56;

  return (
    <div
      id="custom-cursor"
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center rounded-full"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isProject
          ? 'rgba(0, 255, 224, 0.92)'
          : isPointer
          ? 'rgba(255, 168, 0, 0.18)'
          : 'rgba(244, 244, 242, 0.25)',
        border: isProject
          ? '1px solid #00FFE0'
          : isPointer
          ? '1px solid #FFA800'
          : '1px solid rgba(255, 255, 255, 0.4)',
        backdropFilter: isProject || isPointer ? 'blur(4px)' : 'none',
      }}
    >
      {isProject && (
        <span className="text-[#080B11] font-bold text-[11px] tracking-[0.18em] uppercase select-none animate-pulse">
          {cursorState.label || 'VIEW'}
        </span>
      )}
      {isDrag && (
        <span className="text-[#080B11] font-bold text-[10px] tracking-[0.14em] uppercase select-none">
          DRAG
        </span>
      )}
      {!isProject && !isDrag && (
        <div
          className={`rounded-full transition-all duration-200 ${
            isPointer ? 'w-1.5 h-1.5 bg-[#FFA800]' : 'w-1 h-1 bg-[#F4F4F2]'
          }`}
        />
      )}
    </div>
  );
};
