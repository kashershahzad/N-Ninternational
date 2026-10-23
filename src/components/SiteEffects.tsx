"use client";

import { useEffect } from "react";

/** Mirrors the live Netlify site interactions: progress bar, sticky nav, menu, reveal, tilt. */
export function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = document.getElementById("nav");
    const bar = document.getElementById("bar");
    const topb = document.getElementById("topb");
    const burger = document.getElementById("burger");
    const links = document.getElementById("links");
    const year = document.getElementById("yr");

    if (year) year.textContent = String(new Date().getFullYear());

    let ticking = false;
    const ui = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const m =
          document.documentElement.scrollHeight - window.innerHeight;
        if (bar) {
          bar.style.transform = `scaleX(${m > 0 ? y / m : 0})`;
        }
        nav?.classList.toggle("s", y > 40);
        topb?.classList.toggle("show", y > 700);
        ticking = false;
      });
    };
    window.addEventListener("scroll", ui, { passive: true });
    ui();

    const onTop = () =>
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    topb?.addEventListener("click", onTop);

    const menu = (open: boolean) => {
      links?.classList.toggle("open", open);
      burger?.setAttribute("aria-expanded", String(open));
      burger?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    };

    const onBurger = () =>
      menu(burger?.getAttribute("aria-expanded") !== "true");
    const onLinksClick = (e: Event) => {
      if ((e.target as HTMLElement).closest("a")) menu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") menu(false);
    };
    burger?.addEventListener("click", onBurger);
    links?.addEventListener("click", onLinksClick);
    window.addEventListener("keydown", onKey);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".rv").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 3) * 80}ms`;
      io.observe(el);
    });

    const tilts: HTMLElement[] = [];
    const cleanups: Array<() => void> = [];
    if (!reduce && window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll(".tilt").forEach((node) => {
        const c = node as HTMLElement;
        tilts.push(c);
        const onMove = (e: PointerEvent) => {
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          c.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
          c.style.setProperty("--mx", `${e.clientX - r.left}px`);
          c.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        const onLeave = () => {
          c.style.transform = "";
        };
        c.addEventListener("pointermove", onMove);
        c.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          c.removeEventListener("pointermove", onMove);
          c.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", ui);
      topb?.removeEventListener("click", onTop);
      burger?.removeEventListener("click", onBurger);
      links?.removeEventListener("click", onLinksClick);
      window.removeEventListener("keydown", onKey);
      io.disconnect();
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
