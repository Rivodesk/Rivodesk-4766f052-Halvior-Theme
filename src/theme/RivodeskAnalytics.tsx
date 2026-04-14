'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ENDPOINT = 'https://dwsmlslisyvfusvokrhi.supabase.co/functions/v1/storefront-track';
const THEME_ID = '197d428d-13fa-43ed-bd93-7ffd8d42bb28';

function getDevice(): 'desktop' | 'mobile' | 'tablet' {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|windows phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function RivodeskAnalytics() {
  const pathname = usePathname();
  const sid = useRef<string | null>(null);
  const vid = useRef<string | null>(null);
  const pageStart = useRef(Date.now());

  useEffect(() => {
    let s = sessionStorage.getItem('_rd_sid');
    if (!s) { s = crypto.randomUUID(); sessionStorage.setItem('_rd_sid', s); }
    let v = localStorage.getItem('_rd_vid');
    if (!v) { v = crypto.randomUUID(); localStorage.setItem('_rd_vid', v); }
    sid.current = s; vid.current = v;
  }, []);

  useEffect(() => {
    if (!sid.current || !vid.current) return;
    pageStart.current = Date.now();
    const payload = {
      theme_id: THEME_ID, session_id: sid.current, visitor_id: vid.current,
      event_type: 'pageview', page_path: pathname,
      referrer: document.referrer || null,
      device_type: getDevice(), screen_width: window.screen.width,
    };
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
    const onLeave = () => {
      const lp = { ...payload, event_type: 'pageleave', duration_ms: Date.now() - pageStart.current };
      navigator.sendBeacon ? navigator.sendBeacon(ENDPOINT, JSON.stringify(lp))
        : fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lp), keepalive: true }).catch(() => {});
    };
    document.addEventListener('visibilitychange', onLeave);
    return () => document.removeEventListener('visibilitychange', onLeave);
  }, [pathname]);
  return null;
}