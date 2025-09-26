'use client';

import { useEffect, useRef, useState } from 'react';

export function useNav() {
  const [expanded, setExpanded] = useState(false); // 펼침 상태
  const [hidden, setHidden] = useState(false); // 완전 숨김(스크롤 다운)
  const lastY = useRef(0);

  // 스크롤 방향 감지
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      lastY.current = y;

      if (y < 8) {
        // 맨 위 근처: 살짝 접은 상태 유지
        setHidden(false);
        setExpanded(false);
        return;
      }
      if (goingDown)
        setHidden(true); // 아래로: 숨김
      else setHidden(false); // 위로: 표시

      // 히어로가 화면에서 벗어나면 자동 펼침
      const hero = document.getElementById('hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const heroOffscreen = rect.bottom <= 0;
        setExpanded(heroOffscreen && !hidden);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hidden]);

  // 상단 호버 영역 진입 시 확장
  useEffect(() => {
    const zone = document.createElement('div');
    zone.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; height: 24px; z-index: 60;
      pointer-events: auto;
    `;
    const onEnter = () => setExpanded(true);
    const onLeave = () => setExpanded(false);
    zone.addEventListener('mouseenter', onEnter);
    zone.addEventListener('mouseleave', onLeave);
    document.body.appendChild(zone);
    return () => {
      zone.removeEventListener('mouseenter', onEnter);
      zone.removeEventListener('mouseleave', onLeave);
      document.body.removeChild(zone);
    };
  }, []);

  return { expanded, hidden, setExpanded };
}
