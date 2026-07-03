"use client";

import { useEffect, useRef } from "react";

type Role = "china" | "africa" | "ambient";

type Particle = {
  fx: number; // free-drift home position (always integrating)
  fy: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  role: Role;
  si: number; // index into the role's silhouette point list
  tx: number; // resolved shape-target position
  ty: number;
};

type Shape = { pts: Array<[number, number]>; aspect: number };

// normalized Chinese-flag star centres within the map's bounding box (0..1),
// placed in the upper-left "canton" region. [x, y, sizeScale]
const FLAG_STARS: Array<[number, number, number]> = [
  [0.17, 0.25, 1], // large star
  [0.34, 0.12, 0.5],
  [0.41, 0.21, 0.5],
  [0.41, 0.35, 0.5],
  [0.34, 0.44, 0.5],
];
const FLAG_GOLD = "#FFDE59";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const shapes: { china: Shape | null; africa: Shape | null } = {
      china: null,
      africa: null,
    };
    // where each map is drawn (for target fitting + flag placement)
    let chinaBox = { x: 0, y: 0, w: 0, h: 0 };

    // pointer state
    let mx = -9999;
    let my = -9999;
    let inside = false;
    let chinaForm = 0; // 0..1 smoothed
    let africaForm = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const placeShape = (shape: Shape, centerX: number) => {
      const drawH = height * 0.62;
      const drawW = drawH * shape.aspect;
      const x = centerX - drawW / 2;
      const y = (height - drawH) / 2;
      return { x, y, w: drawW, h: drawH };
    };

    // resolve every roled particle's target from the loaded shapes + layout
    const placeAll = () => {
      if (shapes.china) chinaBox = placeShape(shapes.china, width * 0.24);
      const africaBox = shapes.africa
        ? placeShape(shapes.africa, width * 0.76)
        : null;
      for (const p of particles) {
        if (p.role === "china" && shapes.china) {
          const [nx, ny] = shapes.china.pts[p.si % shapes.china.pts.length];
          p.tx = chinaBox.x + nx * chinaBox.w;
          p.ty = chinaBox.y + ny * chinaBox.h;
        } else if (p.role === "africa" && africaBox && shapes.africa) {
          const [nx, ny] = shapes.africa.pts[p.si % shapes.africa.pts.length];
          p.tx = africaBox.x + nx * africaBox.w;
          p.ty = africaBox.y + ny * africaBox.h;
        }
      }
    };

    // assign roles once both counts are known (called after each shape loads)
    const assignRoles = () => {
      const cN = shapes.china ? Math.min(shapes.china.pts.length, 430) : 0;
      const aN = shapes.africa ? Math.min(shapes.africa.pts.length, 430) : 0;
      let ci = 0;
      let ai = 0;
      // shuffle particle order so shape members are spatially unbiased
      const order = particles.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      for (const idx of order) {
        const p = particles[idx];
        if (ci < cN) {
          p.role = "china";
          p.si = ci++;
        } else if (ai < aN) {
          p.role = "africa";
          p.si = ai++;
        } else {
          p.role = "ambient";
        }
      }
      placeAll();
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // dense field; enough for two ~430-pt maps + ambient stars
      const count = Math.min(
        Math.max(Math.round((width * height) / 1500), 1150),
        1500
      );
      particles = Array.from({ length: count }, () => ({
        fx: Math.random() * width,
        fy: Math.random() * height,
        vx: rand(-0.1, 0.1),
        vy: rand(-0.1, 0.1),
        radius: rand(0.5, 1.7),
        baseAlpha: rand(0.35, 0.95),
        twinkleSpeed: rand(0.4, 1.6),
        twinklePhase: rand(0, Math.PI * 2),
        role: "ambient" as Role,
        si: 0,
        tx: 0,
        ty: 0,
      }));
      assignRoles();
    };

    const drawStar = (
      cx: number,
      cy: number,
      outer: number,
      alpha: number
    ) => {
      const inner = outer * 0.42;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = FLAG_GOLD;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const draw = (t: number) => {
      const time = t / 1000;

      // smooth the two form factors toward their goals
      let cGoal = 0;
      let aGoal = 0;
      if (inside && !prefersReduced) {
        if (mx < width * 0.42) cGoal = 1;
        else if (mx > width * 0.58) aGoal = 1;
      }
      chinaForm += (cGoal - chinaForm) * 0.07;
      africaForm += (aGoal - africaForm) * 0.07;
      const anyForm = Math.max(chinaForm, africaForm);

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!prefersReduced) {
          p.fx += p.vx;
          p.fy += p.vy;
          if (p.fx < -2) p.fx = width + 2;
          else if (p.fx > width + 2) p.fx = -2;
          if (p.fy < -2) p.fy = height + 2;
          else if (p.fy > height + 2) p.fy = -2;
        }

        const form =
          p.role === "china"
            ? chinaForm
            : p.role === "africa"
            ? africaForm
            : 0;

        let x = p.fx;
        let y = p.fy;
        if (form > 0.001 && (p.role === "china" || p.role === "africa")) {
          x = p.fx + (p.tx - p.fx) * form;
          y = p.fy + (p.ty - p.fy) * form;
        }

        // cursor gravity: push nearby un-formed dots away (anti-gravity feel)
        if (inside && form < 0.9) {
          const dx = x - mx;
          const dy = y - my;
          const d2 = dx * dx + dy * dy;
          const R = 130;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = (1 - d / R) * 22 * (1 - form);
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
        }

        const twinkle = prefersReduced
          ? 1
          : 0.65 + 0.35 * Math.sin(time * p.twinkleSpeed + p.twinklePhase);
        let alpha = p.baseAlpha * twinkle;
        let radius = p.radius;
        if (p.role !== "ambient") {
          alpha = Math.max(alpha, form * 0.95);
          radius = p.radius * (1 - form) + 1.3 * form;
        } else {
          // ambient stars fade a touch while a map is held, to focus it
          alpha *= 1 - 0.5 * anyForm;
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      // Chinese flag stars inside the China silhouette
      if (chinaForm > 0.04 && chinaBox.w > 0) {
        const baseR = chinaBox.h * 0.05;
        for (const [nx, ny, s] of FLAG_STARS) {
          drawStar(
            chinaBox.x + nx * chinaBox.w,
            chinaBox.y + ny * chinaBox.h,
            baseR * s,
            chinaForm
          );
        }
      }

      if (running && !prefersReduced) rafId = requestAnimationFrame(draw);
    };

    // sample a silhouette SVG into normalized filled points
    const loadShape = (
      url: string,
      key: "china" | "africa",
      cap: number
    ) => {
      const img = new Image();
      img.onload = () => {
        const ow = 1200;
        const oh = Math.round((ow * img.height) / img.width) || 700;
        const off = document.createElement("canvas");
        off.width = ow;
        off.height = oh;
        const octx = off.getContext("2d");
        if (!octx) return;
        octx.drawImage(img, 0, 0, ow, oh);
        let data: Uint8ClampedArray;
        try {
          data = octx.getImageData(0, 0, ow, oh).data;
        } catch {
          return;
        }
        const filled = (px: number, py: number) =>
          data[(py * ow + px) * 4 + 3] > 40;
        let x0 = ow,
          y0 = oh,
          x1 = 0,
          y1 = 0;
        for (let py = 0; py < oh; py++)
          for (let px = 0; px < ow; px++)
            if (filled(px, py)) {
              if (px < x0) x0 = px;
              if (px > x1) x1 = px;
              if (py < y0) y0 = py;
              if (py > y1) y1 = py;
            }
        const bw = x1 - x0;
        const bh = y1 - y0;
        if (bw <= 0 || bh <= 0) return;
        const step = 4;
        const pts: Array<[number, number]> = [];
        for (let py = y0; py <= y1; py += step)
          for (let px = x0; px <= x1; px += step)
            if (filled(px, py)) pts.push([(px - x0) / bw, (py - y0) / bh]);
        if (pts.length > cap) {
          for (let i = pts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pts[i], pts[j]] = [pts[j], pts[i]];
          }
          pts.length = cap;
        }
        shapes[key] = { pts, aspect: bw / bh };
        assignRoles();
      };
      img.src = url;
    };

    build();
    loadShape("/china.svg", "china", 430);
    loadShape("/africa.svg", "africa", 430);
    rafId = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      inside = mx >= 0 && mx <= width && my >= 0 && my <= height;
    };
    const onLeave = () => {
      inside = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
