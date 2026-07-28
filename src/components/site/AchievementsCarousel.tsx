import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Theme-aware chart colors pulled from CSS variables at render time
const PRIMARY = "var(--primary)";
const PRIMARY_PALETTE = [
  "color-mix(in oklab, var(--primary) 95%, white 5%)",
  "color-mix(in oklab, var(--primary) 80%, white 20%)",
  "var(--primary)",
  "color-mix(in oklab, var(--primary) 70%, black 30%)",
  "color-mix(in oklab, var(--primary) 50%, black 50%)",
];

const areaData = [
  { name: "Phase 1", v: 30 },
  { name: "Phase 2", v: 40 },
  { name: "Phase 3", v: 65 },
  { name: "Phase 4", v: 98 },
];

const pieData = [
  { name: "Product 1", value: 6.9 },
  { name: "Product 2", value: 20.7 },
  { name: "Product 3", value: 13.8 },
  { name: "Product 4", value: 27.6 },
  { name: "Product 5", value: 31 },
];

const barData = [
  { name: "FY23", v: 295 },
  { name: "M1", v: 315 },
  { name: "M2", v: 345 },
  { name: "M3", v: 385 },
  { name: "M4", v: 370 },
  { name: "M5", v: 372 },
];

// Mounts the visual with play=false on first paint, then flips to play=true on the next frame.
// This guarantees CSS transitions fire (initial state must differ from final state).
function VisualSlot({ active, render }: { active: boolean; render: (play: boolean) => React.ReactNode }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (!active) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPlay(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active]);
  return <div className="h-[260px] md:h-[340px]">{render(play)}</div>;
}

// Animated ERP diagram with central hub and 4 satellite modules wiring in
function ErpDiagram({ play }: { play: boolean }) {
  const modules = [
    { label: "Inventory", x: 50, y: 18 },
    { label: "Orders", x: 82, y: 50 },
    { label: "Finance", x: 50, y: 82 },
    { label: "People", x: 18, y: 50 },
  ];
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/[0.08] blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.9" />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connector lines drawing in */}
        {modules.map((m, i) => (
          <line
            key={`l-${i}`}
            x1="50"
            y1="50"
            x2={m.x}
            y2={m.y}
            stroke={PRIMARY}
            strokeWidth="0.4"
            strokeDasharray="60"
            strokeDashoffset={play ? 0 : 60}
            style={{
              transition: `stroke-dashoffset 800ms ease-out ${300 + i * 150}ms`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Pulsing hub */}
        <circle cx="50" cy="50" r="14" fill="url(#hubGlow)" />
        <circle
          cx="50"
          cy="50"
          r={play ? 7 : 0}
          fill={PRIMARY}
          style={{ transition: "r 600ms cubic-bezier(0.34,1.56,0.64,1) 100ms" }}
        />
        <text x="50" y="51.5" textAnchor="middle" fontSize="3.2" fill="#fff" fontWeight="600" style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 700ms" }}>
          ERP
        </text>

        {/* Satellite nodes */}
        {modules.map((m, i) => (
          <g
            key={`m-${i}`}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "scale(1)" : "scale(0)",
              transformOrigin: `${m.x}px ${m.y}px`,
              transition: `opacity 400ms ease-out ${800 + i * 150}ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${800 + i * 150}ms`,
            }}
          >
            <circle cx={m.x} cy={m.y} r="6" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.6" />
            <text x={m.x} y={m.y + 11} textAnchor="middle" fontSize="3" fill="#fff" opacity="0.85">
              {m.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Animated ESG diagram with carbon meter sweeping from red to net positive
function EsgDiagram({ play }: { play: boolean }) {
  // Arc from -120deg to +120deg (240deg sweep)
  const start = -120;
  const end = 120;
  const targetDeg = play ? end : start;
  const polar = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: 50 + r * Math.sin(rad), y: 50 - r * Math.cos(rad) };
  };
  const arcPath = (from: number, to: number, r: number) => {
    const a = polar(from, r);
    const b = polar(to, r);
    const large = to - from > 180 ? 1 : 0;
    return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        {/* Track */}
        <path d={arcPath(start, end, 38)} fill="none" stroke="#ffffff15" strokeWidth="6" strokeLinecap="round" />
        {/* Coloured arc */}
        <path
          d={arcPath(start, end, 38)}
          fill="none"
          stroke={PRIMARY}
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={play ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1600ms cubic-bezier(0.65,0,0.35,1) 200ms" }}
        />
        {/* Tick markers */}
        {[-120, -60, 0, 60, 120].map((d) => {
          const a = polar(d, 32);
          const b = polar(d, 28);
          return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#ffffff40" strokeWidth="0.5" />;
        })}
        {/* Needle */}
        <g
          style={{
            transform: `rotate(${targetDeg}deg)`,
            transformOrigin: "50px 50px",
            transition: "transform 1600ms cubic-bezier(0.65,0,0.35,1) 200ms",
          }}
        >
          <line x1="50" y1="50" x2="50" y2="18" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="50" cy="18" r="2" fill={PRIMARY} />
        </g>
        <circle cx="50" cy="50" r="3.5" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.6" />
        {/* Labels */}
        <text x="14" y="78" fontSize="3" fill="#ffffff60">High emissions</text>
        <text x="86" y="78" textAnchor="end" fontSize="3" fill={PRIMARY} fontWeight="600" style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 1600ms" }}>
          Net positive
        </text>
        {/* Centre readout */}
        <text x="50" y="62" textAnchor="middle" fontSize="3" fill="#ffffff70">CARBON</text>
        <text x="50" y="72" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="300" style={{ opacity: play ? 1 : 0, transition: "opacity 500ms 1700ms" }}>
          +
        </text>
      </svg>
    </div>
  );
}

// Animated bar chart where bars grow one at a time, left to right
function GrowthArea({ play }: { play: boolean }) {
  const W = 100;
  const H = 60;
  const padL = 10;
  const padR = 4;
  const padT = 6;
  const padB = 8;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const yMax = 100;
  const scaleY = (v: number) => (v / yMax) * chartH;
  const stepX = chartW / (areaData.length - 1);
  const points = areaData.map((d, i) => ({
    x: padL + i * stepX,
    y: padT + chartH - scaleY(d.v),
    ...d,
  }));
  // Smooth path via cubic bezier
  const linePath = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      return `C ${cx1} ${prev.y} ${cx2} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;
  const ticks = [0, 25, 50, 75, 100];
  const sweep = 1600; // ms
  const clipId = "growthAreaClip";

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="growthAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.9} />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.1} />
          </linearGradient>
          <clipPath id={clipId}>
            <rect
              x={padL}
              y={0}
              width={play ? chartW : 0}
              height={H}
              style={{ transition: `width ${sweep}ms cubic-bezier(0.22,1,0.36,1)` }}
            />
          </clipPath>
        </defs>

        {/* Gridlines + Y labels */}
        {ticks.map((t) => {
          const y = padT + chartH - scaleY(t);
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#ffffff10" strokeWidth="0.2" />
              <text x={padL - 1} y={y + 1} textAnchor="end" fontSize="2.4" fill="#ffffff70">
                {t}
              </text>
            </g>
          );
        })}

        {/* Area + line clipped left-to-right */}
        <g clipPath={`url(#${clipId})`}>
          <path d={areaPath} fill="url(#growthAreaFill)" />
          <path d={linePath} fill="none" stroke={PRIMARY} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* X-axis labels reveal as sweep passes them */}
        {points.map((p, i) => {
          const progress = i / (points.length - 1);
          const delay = progress * sweep * 0.9;
          return (
            <text
              key={p.name}
              x={p.x}
              y={padT + chartH + 4}
              textAnchor="middle"
              fontSize="2.4"
              fill="#ffffff70"
              style={{
                opacity: play ? 1 : 0,
                transition: `opacity 300ms ease-out ${delay}ms`,
              }}
            >
              {p.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function GrowthBars({ play }: { play: boolean }) {
  // SVG coordinate system
  const W = 100;
  const H = 60;
  const padL = 10;
  const padR = 4;
  const padT = 8;
  const padB = 10;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const yMin = 260;
  const yMax = 410;
  const scaleY = (v: number) => ((v - yMin) / (yMax - yMin)) * chartH;
  const barW = chartW / barData.length;
  const innerBarW = barW * 0.55;
  const stagger = 220; // ms between bar starts
  const grow = 650; // ms per bar growth
  // Y-axis ticks
  const ticks = [260, 300, 340, 410];

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="growthBarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.95} />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.35} />
          </linearGradient>
        </defs>

        {/* Gridlines + Y labels */}
        {ticks.map((t) => {
          const y = padT + chartH - scaleY(t);
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#ffffff10" strokeWidth="0.2" />
              <text x={padL - 1} y={y + 1} textAnchor="end" fontSize="2.4" fill="#ffffff70">
                {t}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {barData.map((d, i) => {
          const x = padL + i * barW + (barW - innerBarW) / 2;
          const fullH = scaleY(d.v);
          const y = padT + chartH - fullH;
          const delay = play ? i * stagger : 0;
          return (
            <g key={d.name}>
              {/* Bar */}
              <rect
                x={x}
                y={play ? y : padT + chartH}
                width={innerBarW}
                height={play ? fullH : 0}
                rx={1}
                fill="url(#growthBarFill)"
                style={{
                  transition: `y ${grow}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, height ${grow}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                }}
              />
              {/* Value label */}
              <text
                x={x + innerBarW / 2}
                y={(play ? y : padT + chartH) - 1.2}
                textAnchor="middle"
                fontSize="2.4"
                fill="#ffffffcc"
                fontWeight="600"
                style={{
                  opacity: play ? 1 : 0,
                  transition: `opacity 300ms ease-out ${delay + grow - 150}ms, y ${grow}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                }}
              >
                {d.v}
              </text>
              {/* X-axis label */}
              <text
                x={x + innerBarW / 2}
                y={padT + chartH + 4}
                textAnchor="middle"
                fontSize="2.4"
                fill="#ffffff70"
              >
                {d.name}
              </text>
            </g>
          );
        })}

        {/* Trend arrow sweeping over bar tops */}
        <path
          d={barData
            .map((d, i) => {
              const x = padL + i * barW + barW / 2;
              const y = padT + chartH - scaleY(d.v);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset={play ? 0 : 120}
          style={{
            transition: `stroke-dashoffset 1100ms ease-out ${barData.length * stagger + 100}ms`,
          }}
        />
      </svg>
    </div>
  );
}

// Animated Agentic AI Sales Assistant with central AI hub, knowledge sources, and chat reply
function ChatAgentDiagram({ play }: { play: boolean }) {
  const sources = [
    { label: "Product DB", y: 22 },
    { label: "Pricing", y: 50 },
    { label: "Specs", y: 78 },
  ];
  const reply = "Stock: 1,240 units · 14d lead";
  const charsShown = play ? reply.length : 0;
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <defs>
          <radialGradient id="aiHubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.9" />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Source pills on left */}
        {sources.map((s, i) => (
          <g
            key={s.label}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "translateX(0)" : "translateX(-6px)",
              transition: `opacity 400ms ease-out ${150 + i * 120}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${150 + i * 120}ms`,
            }}
          >
            <rect x="4" y={s.y - 4} width="22" height="8" rx="4" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.5" opacity="0.95" />
            <text x="15" y={s.y + 1.2} textAnchor="middle" fontSize="2.6" fill="#fff" opacity="0.9">{s.label}</text>
          </g>
        ))}

        {/* Streaming dots from each source to hub */}
        {sources.map((s, i) => (
          <circle
            key={`d-${i}`}
            r="1.2"
            fill={PRIMARY}
            style={{
              opacity: play ? 1 : 0,
              transition: `opacity 200ms ${600 + i * 120}ms`,
            }}
          >
            <animate
              attributeName="cx"
              from="26"
              to="44"
              dur="1.4s"
              begin={`${0.6 + i * 0.25}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              from={s.y}
              to="50"
              dur="1.4s"
              begin={`${0.6 + i * 0.25}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Connector lines */}
        {sources.map((s, i) => (
          <line
            key={`l-${i}`}
            x1="26"
            y1={s.y}
            x2="44"
            y2="50"
            stroke={PRIMARY}
            strokeOpacity="0.25"
            strokeWidth="0.3"
            strokeDasharray="40"
            strokeDashoffset={play ? 0 : 40}
            style={{ transition: `stroke-dashoffset 700ms ease-out ${300 + i * 120}ms` }}
          />
        ))}

        {/* AI hub */}
        <circle cx="50" cy="50" r="14" fill="url(#aiHubGlow)" />
        <circle
          cx="50"
          cy="50"
          r={play ? 7 : 0}
          fill={PRIMARY}
          style={{ transition: "r 600ms cubic-bezier(0.34,1.56,0.64,1) 200ms" }}
        />
        <text x="50" y="51.6" textAnchor="middle" fontSize="3" fill="#fff" fontWeight="700" style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 800ms" }}>
          AI
        </text>

        {/* Outgoing chat bubble */}
        <g
          style={{
            opacity: play ? 1 : 0,
            transform: play ? "translateX(0)" : "translateX(8px)",
            transition: "opacity 500ms 1100ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 1100ms",
          }}
        >
          <path
            d="M 60 38 H 95 a 2 2 0 0 1 2 2 v 16 a 2 2 0 0 1 -2 2 H 66 l -4 4 v -4 H 60 a 2 2 0 0 1 -2 -2 V 40 a 2 2 0 0 1 2 -2 z"
            fill="#0d0d0d"
            stroke={PRIMARY}
            strokeWidth="0.5"
          />
          <text x="62" y="46" fontSize="2.3" fill={PRIMARY} fontWeight="600">SALES BOT</text>
          <text x="62" y="52" fontSize="2.5" fill="#fff" opacity="0.92">
            {reply.slice(0, charsShown)}
            <tspan fill={PRIMARY} style={{ opacity: play ? 1 : 0 }}>{play ? "▍" : ""}</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

// Animated Invoice 3-Way Match where three docs slide in and lock with a check seal
function InvoiceMatchDiagram({ play }: { play: boolean }) {
  const docs = [
    { label: "INVOICE", x: 14, fromX: -10, delay: 100 },
    { label: "P.O.", x: 40, fromX: 0, delay: 250 },
    { label: "GRN", x: 66, fromX: 10, delay: 400 },
  ];
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        {/* Three documents */}
        {docs.map((d) => (
          <g
            key={d.label}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "translateX(0)" : `translateX(${d.fromX}px)`,
              transition: `opacity 500ms ease-out ${d.delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${d.delay}ms`,
            }}
          >
            <rect x={d.x} y="22" width="20" height="28" rx="1.5" fill="#fafaf6" stroke={PRIMARY} strokeWidth="0.4" />
            {/* Doc lines */}
            <rect x={d.x + 2.5} y="26" width="15" height="1" rx="0.5" fill="#0d0d0d" opacity="0.5" />
            <rect x={d.x + 2.5} y="29" width="11" height="1" rx="0.5" fill="#0d0d0d" opacity="0.3" />
            <rect x={d.x + 2.5} y="32" width="13" height="1" rx="0.5" fill="#0d0d0d" opacity="0.3" />
            <rect x={d.x + 2.5} y="35" width="9" height="1" rx="0.5" fill="#0d0d0d" opacity="0.3" />
            {/* Header tag */}
            <rect x={d.x + 2.5} y="40" width="15" height="6" rx="1" fill={PRIMARY} opacity="0.9" />
            <text x={d.x + 10} y="44.2" textAnchor="middle" fontSize="2.4" fill="#0d0d0d" fontWeight="700">
              {d.label}
            </text>
          </g>
        ))}

        {/* Match lines linking them */}
        {[
          { x1: 34, x2: 40 },
          { x1: 60, x2: 66 },
        ].map((seg, i) => (
          <line
            key={i}
            x1={seg.x1}
            y1="36"
            x2={seg.x2}
            y2="36"
            stroke={PRIMARY}
            strokeWidth="0.6"
            strokeDasharray="8"
            strokeDashoffset={play ? 0 : 8}
            style={{ transition: `stroke-dashoffset 500ms ease-out ${700 + i * 150}ms` }}
          />
        ))}

        {/* Approval seal stamping in */}
        <g
          style={{
            opacity: play ? 1 : 0,
            transform: play ? "scale(1) rotate(-8deg)" : "scale(0.2) rotate(-8deg)",
            transformOrigin: "50px 72px",
            transition: "opacity 300ms 1100ms, transform 600ms cubic-bezier(0.34,1.56,0.64,1) 1100ms",
          }}
        >
          <circle cx="50" cy="72" r="11" fill="none" stroke={PRIMARY} strokeWidth="1" />
          <circle cx="50" cy="72" r="9" fill="none" stroke={PRIMARY} strokeWidth="0.4" />
          <text x="50" y="70" textAnchor="middle" fontSize="2.2" fill={PRIMARY} fontWeight="700" letterSpacing="0.4">MATCHED</text>
          <path d="M 45.5 73.5 L 49 77 L 55 70.5" fill="none" stroke={PRIMARY} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Counter readout */}
        <text x="50" y="92" textAnchor="middle" fontSize="2.6" fill="#ffffff80" letterSpacing="0.4">
          LINE ITEMS RECONCILED · 100%
        </text>
      </svg>
    </div>
  );
}

// Animated Email Automation where inbox stack funnels into a sorter that splits to 3 lanes
function EmailFlowDiagram({ play }: { play: boolean }) {
  const lanes = [
    { label: "AUTO-REPLY", y: 30, pct: 62 },
    { label: "ROUTE", y: 50, pct: 28 },
    { label: "ESCALATE", y: 70, pct: 10 },
  ];
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        {/* Inbox stack on left */}
        {[0, 1, 2, 3].map((i) => (
          <g
            key={i}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "translateX(0)" : "translateX(-8px)",
              transition: `opacity 350ms ${100 + i * 100}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 100}ms`,
            }}
          >
            <rect x={6 + i * 1.5} y={36 + i * 2} width="16" height="11" rx="1" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.4" opacity={1 - i * 0.18} />
            <path d={`M ${6 + i * 1.5} ${36 + i * 2} L ${14 + i * 1.5} ${42 + i * 2} L ${22 + i * 1.5} ${36 + i * 2}`} fill="none" stroke={PRIMARY} strokeWidth="0.4" opacity={0.7 - i * 0.15} />
          </g>
        ))}

        {/* Flow lines into prism */}
        <line x1="24" y1="44" x2="44" y2="50" stroke={PRIMARY} strokeOpacity="0.4" strokeWidth="0.4" strokeDasharray="30" strokeDashoffset={play ? 0 : 30} style={{ transition: "stroke-dashoffset 600ms 600ms" }} />

        {/* Sorting prism (triangle) */}
        <g
          style={{
            opacity: play ? 1 : 0,
            transform: play ? "scale(1)" : "scale(0.5)",
            transformOrigin: "48px 50px",
            transition: "opacity 400ms 700ms, transform 600ms cubic-bezier(0.34,1.56,0.64,1) 700ms",
          }}
        >
          <path d="M 44 38 L 56 50 L 44 62 Z" fill={PRIMARY} fillOpacity="0.15" stroke={PRIMARY} strokeWidth="0.6" />
          <text x="50" y="51.5" textAnchor="middle" fontSize="2.3" fill={PRIMARY} fontWeight="700">AI</text>
        </g>

        {/* Lanes */}
        {lanes.map((ln, i) => (
          <g key={ln.label}>
            {/* Connector */}
            <line
              x1="56"
              y1="50"
              x2="62"
              y2={ln.y}
              stroke={PRIMARY}
              strokeOpacity="0.3"
              strokeWidth="0.4"
              strokeDasharray="20"
              strokeDashoffset={play ? 0 : 20}
              style={{ transition: `stroke-dashoffset 500ms ${1100 + i * 120}ms` }}
            />
            {/* Lane label */}
            <text x="62" y={ln.y - 2.5} fontSize="2.3" fill="#ffffffaa" fontWeight="600" letterSpacing="0.3" style={{ opacity: play ? 1 : 0, transition: `opacity 350ms ${1300 + i * 120}ms` }}>
              {ln.label}
            </text>
            {/* Bar track */}
            <rect x="62" y={ln.y - 0.5} width="32" height="2.4" rx="1.2" fill="#ffffff10" />
            {/* Filled bar */}
            <rect
              x="62"
              y={ln.y - 0.5}
              width={play ? (32 * ln.pct) / 100 : 0}
              height="2.4"
              rx="1.2"
              fill={PRIMARY}
              style={{ transition: `width 900ms cubic-bezier(0.22,1,0.36,1) ${1400 + i * 150}ms` }}
            />
            {/* % label */}
            <text x="94" y={ln.y + 1.3} textAnchor="end" fontSize="2.3" fill="#fff" fontWeight="600" style={{ opacity: play ? 1 : 0, transition: `opacity 400ms ${1600 + i * 150}ms` }}>
              {ln.pct}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Animated Logistics GTM with three product lanes moving through four GTM stages
const logisticsLanes = [
  { label: "PROD 01", y: 32 },
  { label: "PROD 02", y: 52 },
  { label: "PROD 03", y: 72 },
];

const gtmStages = [
  { label: "ICP", x: 40 },
  { label: "OUTREACH", x: 56 },
  { label: "PIPELINE", x: 72 },
  { label: "CLOSED", x: 88 },
];

function LogisticsGtmDiagram({ play }: { play: boolean }) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/[0.08] blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <defs>
          <radialGradient id="gtmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.6" />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Lane pills on left */}
        {logisticsLanes.map((lane, i) => (
          <g
            key={lane.label}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "translateX(0)" : "translateX(-6px)",
              transition: `opacity 380ms ease-out ${150 + i * 120}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${150 + i * 120}ms`,
            }}
          >
            <rect x="2" y={lane.y - 4} width="22" height="8" rx="4" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.5" opacity="0.95" />
            <text x="13" y={lane.y + 1.2} textAnchor="middle" fontSize="2.6" fill="#fff" opacity="0.9">{lane.label}</text>
          </g>
        ))}

        {/* Stage column headers */}
        {gtmStages.map((stage, j) => (
          <text
            key={stage.label}
            x={stage.x}
            y="20"
            textAnchor="middle"
            fontSize="2.6"
            fill={PRIMARY}
            fontWeight="600"
            letterSpacing="0.2"
            style={{
              opacity: play ? 1 : 0,
              transition: `opacity 350ms ease-out ${350 + j * 80}ms`,
            }}
          >
            {stage.label}
          </text>
        ))}

        {/* Track lines from pill edge to last stage */}
        {logisticsLanes.map((lane, i) => (
          <line
            key={`track-${i}`}
            x1="24"
            y1={lane.y}
            x2="96"
            y2={lane.y}
            stroke={PRIMARY}
            strokeOpacity="0.2"
            strokeWidth="0.4"
            strokeDasharray="80"
            strokeDashoffset={play ? 0 : 80}
            style={{ transition: `stroke-dashoffset 400ms ease-out 500ms` }}
          />
        ))}

        {/* Stage nodes at each lane × stage intersection */}
        {logisticsLanes.map((lane, i) =>
          gtmStages.map((stage, j) => (
            <circle
              key={`node-${i}-${j}`}
              cx={stage.x}
              cy={lane.y}
              r={play ? 3.5 : 0}
              fill={PRIMARY}
              fillOpacity={j === gtmStages.length - 1 ? 1 : 0.55}
              style={{
                transition: `r 500ms cubic-bezier(0.34,1.56,0.64,1) ${700 + i * 400 + j * 120}ms`,
              }}
            />
          ))
        )}

        {/* Footer text */}
        <text
          x="50"
          y="92"
          textAnchor="middle"
          fontSize="2.6"
          fill="#ffffff80"
          letterSpacing="0.4"
          style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 2000ms" }}
        >
          PIPELINE BUILT · 3 PRODUCTS
        </text>
      </svg>
    </div>
  );
}

// Animated Omnichannel where five channels converge into a single unified inbox
function OmnichannelDiagram({ play }: { play: boolean }) {
  const channels = [
    { label: "WhatsApp", y: 14 },
    { label: "Instagram", y: 32 },
    { label: "Messenger", y: 50 },
    { label: "Email", y: 68 },
    { label: "SMS", y: 86 },
  ];
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <defs>
          <radialGradient id="inboxGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.85" />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Channel pills on left */}
        {channels.map((c, i) => (
          <g
            key={c.label}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "translateX(0)" : "translateX(-6px)",
              transition: `opacity 380ms ${100 + i * 90}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 90}ms`,
            }}
          >
            <circle cx="9" cy={c.y} r="3.2" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.5" />
            <circle cx="9" cy={c.y} r="1.4" fill={PRIMARY} opacity="0.85" />
            <text x="14" y={c.y + 1} fontSize="2.6" fill="#fff" opacity="0.92">{c.label}</text>
          </g>
        ))}

        {/* Curved connector paths from each channel to central hub */}
        {channels.map((c, i) => {
          const path = `M 12 ${c.y} C 35 ${c.y}, 45 50, 62 50`;
          return (
            <path
              key={`p-${i}`}
              d={path}
              fill="none"
              stroke={PRIMARY}
              strokeOpacity="0.28"
              strokeWidth="0.4"
              strokeDasharray="80"
              strokeDashoffset={play ? 0 : 80}
              style={{ transition: `stroke-dashoffset 900ms ease-out ${500 + i * 100}ms` }}
            />
          );
        })}

        {/* Animated message dots travelling along each path */}
        {channels.map((c, i) => (
          <circle
            key={`d-${i}`}
            r="1.3"
            fill={PRIMARY}
            style={{ opacity: play ? 1 : 0, transition: `opacity 200ms ${900 + i * 100}ms` }}
          >
            <animateMotion
              dur={`${2 + i * 0.15}s`}
              begin={`${0.9 + i * 0.18}s`}
              repeatCount="indefinite"
              path={`M 12 ${c.y} C 35 ${c.y}, 45 50, 62 50`}
            />
          </circle>
        ))}

        {/* Unified inbox hub */}
        <circle cx="68" cy="50" r="16" fill="url(#inboxGlow)" />
        <g
          style={{
            opacity: play ? 1 : 0,
            transform: play ? "scale(1)" : "scale(0.5)",
            transformOrigin: "68px 50px",
            transition: "opacity 400ms 700ms, transform 600ms cubic-bezier(0.34,1.56,0.64,1) 700ms",
          }}
        >
          <rect x="58" y="42" width="20" height="16" rx="2" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.6" />
          <path d="M 58 42 L 68 51 L 78 42" fill="none" stroke={PRIMARY} strokeWidth="0.6" />
          <text x="68" y="55.5" textAnchor="middle" fontSize="2.4" fill={PRIMARY} fontWeight="700" letterSpacing="0.3">INBOX</text>
        </g>

        {/* Outgoing unified stream */}
        <line
          x1="78"
          y1="50"
          x2="96"
          y2="50"
          stroke={PRIMARY}
          strokeWidth="0.7"
          strokeDasharray="20"
          strokeDashoffset={play ? 0 : 20}
          style={{ transition: "stroke-dashoffset 700ms ease-out 1400ms" }}
        />
        <circle cx="96" cy="50" r={play ? 1.8 : 0} fill={PRIMARY} style={{ transition: "r 400ms cubic-bezier(0.34,1.56,0.64,1) 1900ms" }} />
        <text x="92" y="46" textAnchor="end" fontSize="2.3" fill="#ffffff80" style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 2000ms" }}>
          ONE WORKSPACE
        </text>
      </svg>
    </div>
  );
}

type Slide = {
  title: string;
  headline: string;
  body: string;
  timeline: string;
  visual: (play: boolean) => React.ReactNode;
};

const slides: Slide[] = [
  {
    title: "B2B Sales Team",
    headline: "30 Hours Saved Monthly",
    body: "Built an agentic AI assistant that answers salespeople's queries on internal product details, pricing, specs and stock, replacing manual lookups across siloed systems with instant, sourced responses delivered in chat.",
    timeline: "Project Timeline: 2 Months",
    visual: (play) => <ChatAgentDiagram play={play} />,
  },
  {
    title: "Listed FMCG Market Leader",
    headline: "Time Saved by 98.2%",
    body: "Developed a regional automation solution streamlining six hours of daily work into several minutes whilst employing Lean principles and practices.",
    timeline: "Project Timeline: 3 Months",
    visual: (play) => <GrowthArea play={play} />,
  },
  {
    title: "Fortune 500 MNC",
    headline: "Savings of 500,000 USD",
    body: "Developed a sourcing strategy built on robust analysis and a bespoke calculation methodology.",
    timeline: "Project Timeline: 2 Months",
    visual: (play) => (
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius="55%"
              outerRadius="88%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              label={({ value }) => `${value}%`}
              labelLine={false}
              style={{ fontSize: 11, fill: "#fff" }}
              isAnimationActive={play}
              animationDuration={1200}
              animationBegin={150}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PRIMARY_PALETTE[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-white/60">Total</span>
          <span className="text-2xl font-light text-white" style={{ opacity: play ? 1 : 0, transition: "opacity 500ms 1100ms" }}>100%</span>
        </div>
      </div>
    ),
  },
  {
    title: "UK Home & Living Company",
    headline: "Software Development",
    body: "Developed an ERP from scratch, overhauling the resource planning system, leading to cost and time savings.",
    timeline: "Project Timeline: 5 Months",
    visual: (play) => <ErpDiagram play={play} />,
  },
  {
    title: "National Energy Company",
    headline: "Net Positive Carbon Rating",
    body: "Brought a national company with no prior ESG knowledge to a net positive carbon rating.",
    timeline: "Project Timeline: 5 Months",
    visual: (play) => <EsgDiagram play={play} />,
  },
  {
    title: "F&B Startup",
    headline: "Sales Growth of 30%",
    body: "Developed and implemented a new route to market strategy alongside a data-driven sales plan leading to 30% sales growth.",
    timeline: "Project Timeline: 3 Months",
    visual: (play) => <GrowthBars play={play} />,
  },
  {
    title: "Mid-Market Finance Operation",
    headline: "50 Hours Saved Monthly",
    body: "Deployed AI-powered PDF parsing and three-way matching across invoices, purchase orders, and goods-received notes, auto-approving clean matches, flagging exceptions, and removing the back-office bottleneck.",
    timeline: "Project Timeline: 3 Months",
    visual: (play) => <InvoiceMatchDiagram play={play} />,
  },
  {
    title: "Logistics Operator",
    headline: "30 Hours Saved Monthly",
    body: "An LLM-powered triage and reply engine that classifies inbound mail, drafts contextual responses, and routes edge cases to humans, clearing the inbox while the team sleeps.",
    timeline: "Project Timeline: 6 Weeks",
    visual: (play) => <EmailFlowDiagram play={play} />,
  },
  {
    title: "Consumer Brand Customer Care",
    headline: "Unified Customer Outreach",
    body: "Engineered a single chat platform consolidating WhatsApp, Instagram, Messenger, email, and SMS into one agent workspace, with shared context, SLA tracking, and AI-suggested replies across every channel.",
    timeline: "Project Timeline: 4 Months",
    visual: (play) => <OmnichannelDiagram play={play} />,
  },
  {
    title: "B2B Logistics",
    headline: "3 Products to Market",
    body: "Defined ICP segments and buyer personas for three distinct logistics products, built lead generation infrastructure, automated outreach sequences, CRM pipeline workflows, and supporting marketing collaterals from scratch, then took each offering from zero market presence to active, measurable commercial motion.",
    timeline: "Project Timeline: 4 Months",
    visual: (play) => <LogisticsGtmDiagram play={play} />,
  },
];

export function AchievementsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Watch when the carousel scrolls into view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setInView(true);
          else setInView(false);
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Re-trigger visual animation when active slide changes (while in view)
  useEffect(() => {
    if (inView) setPlayKey((k) => k + 1);
  }, [current, inView]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || !inView) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 6500);
    return () => clearInterval(id);
  }, [api, paused, inView]);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent>
          {slides.map((s, i) => {
            const isActive = current === i && inView;
            return (
              <CarouselItem key={i}>
                <div className="group relative rounded-3xl bg-primary-flow border border-white/10 p-6 md:p-12 shadow-2xl shadow-black/40 overflow-hidden">
                  {/* Glow */}
                  <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/[0.06] blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/[0.04] blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
                        Case Study {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-light text-white tracking-tight">
                      {s.title}
                    </h3>
                    <div className="h-[2px] w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent mt-4 mb-8" />

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:min-h-[320px]">
                      <VisualSlot key={`${i}-${isActive ? playKey : "idle"}`} active={isActive} render={s.visual} />
                      <div className="text-left">
                        <h4 className="text-2xl md:text-3xl font-light text-white leading-tight mb-5">
                          {s.headline}
                        </h4>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
                          {s.body}
                        </p>
                      </div>
                    </div>

                    <p className="text-right italic text-white/60 text-sm mt-8">
                      {s.timeline}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8" role="group" aria-label="Carousel controls">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous slide"
          className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
              aria-current={current === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === i ? "w-8 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next slide"
          className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
