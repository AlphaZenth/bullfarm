import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Sprout,
  Beef,
  Home as HomeIcon,
  Moon,
  Heart,
  Rocket,
  Users,
  Coins,
  Copy,
  Check,
  Menu,
  X as XIcon,
  ExternalLink,
  Wheat,
  Sparkles,
} from "lucide-react";

const LOGO = "/assets/logo.jpeg";
const BANNER = "/assets/banner.jpeg";
const PUMP_URL = "https://pump.fun/coin/6MDR99FhSmhosYVf5sa3Ngthk1buxKuAASigUyAKpump";
const X_URL = "https://x.com";

// ---------- Ambient FX ----------
function Firefly({ i }: { i: number }) {
  const delay = (i * 0.6) % 4;
  const left = (i * 37) % 100;
  const top = 30 + ((i * 17) % 55);
  return (
    <motion.span
      className="absolute h-1.5 w-1.5 rounded-full bg-[color:var(--color-moon)] shadow-[0_0_12px_4px_rgba(255,220,120,0.6)]"
      style={{ left: `${left}%`, top: `${top}%` }}
      animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2], x: [0, 10, -10, 0] }}
      transition={{ duration: 5 + (i % 4), repeat: Infinity, delay }}
    />
  );
}

function FloatingLeaf({ i }: { i: number }) {
  const left = (i * 23) % 100;
  const duration = 12 + (i % 6);
  const delay = (i * 0.9) % 8;
  return (
    <motion.div
      className="pointer-events-none absolute -top-10 text-2xl"
      style={{ left: `${left}%` }}
      initial={{ y: -40, rotate: 0, opacity: 0 }}
      animate={{ y: "110vh", rotate: 360, opacity: [0, 1, 1, 0], x: [0, 40, -40, 20] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      🍃
    </motion.div>
  );
}

function Cloud({ top, delay, scale = 1 }: { top: string; delay: number; scale?: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-[-20%] opacity-80"
      style={{ top }}
      animate={{ x: ["0vw", "130vw"] }}
      transition={{ duration: 90, delay, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="rounded-full bg-white/70 blur-[1px]"
        style={{
          width: 180 * scale,
          height: 60 * scale,
          boxShadow:
            "40px -20px 0 -6px rgba(255,255,255,0.75), 90px -10px 0 -10px rgba(255,255,255,0.75), -30px -10px 0 -8px rgba(255,255,255,0.7)",
        }}
      />
    </motion.div>
  );
}

function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-white"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 90}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.1) % 3 }}
        />
      ))}
    </div>
  );
}

// ---------- Loading Screen ----------
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(t);
          setTimeout(onDone, 400);
          return 100;
        }
        return next;
      });
    }, 180);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center sky-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Stars />
      <motion.img
        src={LOGO}
        alt="Bullfarm"
        className="relative z-10 h-40 w-40 rounded-full border-4 border-[color:var(--color-gold)] shadow-2xl"
        animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="wood-panel relative z-10 mt-8 w-[300px] rounded-2xl p-4">
        <div className="mb-2 text-center font-display text-lg font-extrabold text-shadow-farm">
          Preparing the Farm...
        </div>
        <div className="h-4 overflow-hidden rounded-full border-2 border-[color:var(--color-wood-dark)] bg-black/30">
          <motion.div
            className="h-full bg-gradient-to-r from-[color:var(--color-wheat)] via-[color:var(--color-gold)] to-[color:var(--color-pumpkin)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="text-2xl"
          >
            🐂
          </motion.span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- Navbar ----------
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Gameplay", "#gameplay"],
    ["Token", "#token"],
    ["Roadmap", "#roadmap"],
    ["Community", "#community"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--color-wood-dark)]/70 border-b border-[color:var(--color-gold)]/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <motion.img
            src={LOGO}
            alt="Bullfarm logo"
            className="h-11 w-11 shrink-0 rounded-full border-2 border-[color:var(--color-gold)] shadow-lg"
            whileHover={{ rotate: 8, scale: 1.05 }}
          />
          <span className="truncate font-display text-2xl font-extrabold text-[color:var(--color-cream)] text-shadow-farm">
            Bullfarm
          </span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-display text-sm font-bold text-[color:var(--color-cream)]/90 transition hover:text-[color:var(--color-moon)]"
            >
              {label}
            </a>
          ))}
          <a href={PUMP_URL} target="_blank" rel="noreferrer" className="btn-farm text-sm">
            <Coins className="h-4 w-4" /> Buy
          </a>
        </nav>
        <button
          className="rounded-xl border-2 border-[color:var(--color-gold)]/60 bg-[color:var(--color-wood-dark)]/70 p-2 text-[color:var(--color-cream)] lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <XIcon /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[color:var(--color-wood-dark)]/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-display font-bold text-[color:var(--color-cream)] hover:bg-white/10"
                >
                  {label}
                </a>
              ))}
              <a
                href={PUMP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-farm mt-2 justify-center"
              >
                <Coins className="h-4 w-4" /> Buy on Pump.fun
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const yLogo = useTransform(scrollY, [0, 600], [0, -60]);
  return (
    <section id="home" className="relative min-h-screen overflow-hidden sky-bg pt-24">
      <Stars />
      {/* Moon glow */}
      <motion.div
        className="absolute right-[10%] top-[12%] h-56 w-56 rounded-full bg-[color:var(--color-moon)]"
        style={{
          boxShadow:
            "0 0 80px 40px rgba(255,230,150,0.35), 0 0 200px 80px rgba(255,220,140,0.2)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <Cloud top="14%" delay={0} />
      <Cloud top="26%" delay={20} scale={0.8} />
      <Cloud top="8%" delay={45} scale={1.2} />
      {Array.from({ length: 14 }).map((_, i) => (
        <Firefly key={i} i={i} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingLeaf key={i} i={i} />
      ))}

      {/* Banner parallax layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 bottom-0 h-[70%] opacity-70 mix-blend-screen"
      >
        <img
          src={BANNER}
          alt="Bullfarm banner"
          className="h-full w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--color-forest)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-8 text-center">
        <motion.img
          src={LOGO}
          alt="Bullfarm logo"
          className="h-52 w-52 rounded-full border-4 border-[color:var(--color-gold)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:h-64 sm:w-64 md:h-72 md:w-72"
          style={{ y: yLogo }}
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          whileHover={{ rotate: 4 }}
        />
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 font-display text-5xl font-extrabold leading-tight text-[color:var(--color-cream)] text-shadow-farm sm:text-6xl md:text-7xl"
        >
          Welcome to <span className="text-[color:var(--color-moon)]">Bullfarm</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 font-display text-2xl font-bold text-[color:var(--color-wheat)] sm:text-3xl"
        >
          Build. Harvest. Trade. Moon.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-cream)]/90 sm:text-lg"
        >
          Bullfarm is a cozy farming adventure inspired by Harvest Moon, bringing farming
          simulation into Web3. Built on Solana and launched through Pump.fun, Bullfarm
          combines adorable bull characters, community-driven growth, and the spirit of
          blockchain gaming into one unforgettable experience.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ y: 2, boxShadow: "0 2px 0 var(--color-wood-dark)" }}
            href={PUMP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-farm text-base"
          >
            <Rocket className="h-5 w-5" /> Buy on Pump.fun
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ y: 2 }}
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-farm-green text-base"
          >
            <XLogo /> Join X
          </motion.a>
        </motion.div>
      </div>

      {/* Grass ground */}
      <GrassStrip />
    </section>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M18.244 2H21l-6.52 7.45L22.5 22h-6.79l-4.72-6.16L5.4 22H2.64l6.98-7.98L1.5 2h6.94l4.27 5.66L18.244 2Zm-1.19 18.02h1.87L7.03 3.88H5.03l12.024 16.14Z" />
    </svg>
  );
}

function GrassStrip() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-forest)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex h-8 items-end">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="mx-[1px] w-2 origin-bottom rounded-t bg-gradient-to-t from-[color:var(--color-forest)] to-[color:var(--color-grass)]"
            style={{ height: 12 + (i % 5) * 4 }}
            animate={{ skewX: [-3, 3, -3] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 7) * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Section wrappers ----------
function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12 text-center"
    >
      <h2 className="font-display text-4xl font-extrabold text-[color:var(--color-wood-dark)] sm:text-5xl">
        {children}
      </h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-2xl text-lg text-[color:var(--color-wood)]/80">{sub}</p>
      )}
    </motion.div>
  );
}

// ---------- About ----------
function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[color:var(--color-cream)] py-24">
      <SunPattern />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ rotate: -3, y: 40, opacity: 0 }}
          whileInView={{ rotate: -1, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="wood-panel mx-auto mb-10 inline-block rounded-3xl px-10 py-5"
        >
          <h2 className="font-display text-4xl font-extrabold text-shadow-farm sm:text-5xl">
            🪧 About Bullfarm
          </h2>
        </motion.div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-[1fr_1.4fr]"
        >
          <motion.img
            src={LOGO}
            alt="Bullfarm mascot"
            whileHover={{ rotate: 4, scale: 1.03 }}
            className="mx-auto h-64 w-64 rounded-full border-4 border-[color:var(--color-wood)] shadow-2xl md:h-80 md:w-80"
          />
          <div className="space-y-4 text-lg leading-relaxed text-[color:var(--color-wood-dark)]">
            <p>
              Bullfarm is a farming-inspired Web3 project that captures the relaxing
              atmosphere of classic farming games while embracing the excitement of crypto
              culture.
            </p>
            <p>
              Players imagine themselves managing a peaceful farm alongside their loyal bull
              companion, growing crops, exploring nature, expanding their land, and building
              a thriving community.
            </p>
            <p>
              Built on Solana and launched through Pump.fun, Bullfarm represents patience,
              steady growth, and long-term community value. It is not just another meme
              token—it is a charming digital world where farming and blockchain meet.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SunPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-40">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, oklch(0.85 0.12 90) 0%, transparent 25%), radial-gradient(circle at 90% 30%, oklch(0.78 0.15 60) 0%, transparent 30%), radial-gradient(circle at 30% 90%, oklch(0.7 0.18 145 / 0.5) 0%, transparent 30%)",
        }}
      />
    </div>
  );
}

// ---------- Gameplay ----------
function Gameplay() {
  const cards = [
    {
      icon: <Sprout className="h-8 w-8" />,
      emoji: "🌾",
      title: "Farm Crops",
      desc: "Grow the future one harvest at a time.",
    },
    {
      icon: <Beef className="h-8 w-8" />,
      emoji: "🐂",
      title: "Raise Your Bull",
      desc: "Your strongest farming partner.",
    },
    {
      icon: <HomeIcon className="h-8 w-8" />,
      emoji: "🏡",
      title: "Expand Your Farm",
      desc: "Build the biggest ranch.",
    },
    {
      icon: <Moon className="h-8 w-8" />,
      emoji: "🌕",
      title: "Harvest Under Moonlight",
      desc: "Every harvest brings new opportunities.",
    },
  ];
  return (
    <section
      id="gameplay"
      className="relative overflow-hidden bg-[color:var(--color-forest)] py-24 text-[color:var(--color-cream)]"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 20px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitleDark sub="A world of cozy adventures for you and your bull.">
          🎮 Gameplay
        </SectionTitleDark>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: -1 }}
              className="wood-panel group rounded-3xl p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[color:var(--color-wheat)] text-3xl text-[color:var(--color-wood-dark)] shadow-inner">
                  {c.emoji}
                </div>
                <div className="text-[color:var(--color-moon)] opacity-70 transition group-hover:opacity-100">
                  {c.icon}
                </div>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-shadow-farm">
                {c.title}
              </h3>
              <p className="mt-2 text-[color:var(--color-cream)]/90">{c.desc}</p>
              <div className="mt-5 flex gap-1">
                {Array.from({ length: 12 }).map((_, k) => (
                  <motion.span
                    key={k}
                    className="h-3 w-1 origin-bottom rounded-t bg-[color:var(--color-grass)]"
                    animate={{ skewX: [-4, 4, -4] }}
                    transition={{ duration: 2 + (k % 3), repeat: Infinity, delay: k * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitleDark({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12 text-center"
    >
      <h2 className="font-display text-4xl font-extrabold text-[color:var(--color-moon)] text-shadow-farm sm:text-5xl">
        {children}
      </h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-2xl text-lg text-[color:var(--color-cream)]/80">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ---------- Why Bullfarm ----------
function Why() {
  const items = [
    { icon: <Heart className="h-6 w-6" />, title: "Cute Bull Mascot", desc: "A friendly face leading the herd." },
    { icon: <Moon className="h-6 w-6" />, title: "Harvest Moon Inspiration", desc: "Cozy vibes, timeless charm." },
    { icon: <Sparkles className="h-6 w-6" />, title: "Built on Solana", desc: "Fast, cheap, community-scale." },
    { icon: <Rocket className="h-6 w-6" />, title: "Pump.fun Launch", desc: "Fair, transparent, on-chain launch." },
    { icon: <Users className="h-6 w-6" />, title: "Community First", desc: "Neighbors, not numbers." },
    { icon: <Wheat className="h-6 w-6" />, title: "Long-term Vision", desc: "Growing season by season." },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-cream)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle sub="Six reasons the herd is growing.">🌻 Why Bullfarm</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border-4 border-[color:var(--color-wood)] bg-white p-6 shadow-[0_10px_0_var(--color-wood)]"
            >
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--color-wheat)] text-[color:var(--color-wood-dark)]">
                {it.icon}
              </div>
              <h3 className="font-display text-xl font-extrabold text-[color:var(--color-wood-dark)]">
                {it.title}
              </h3>
              <p className="mt-1 text-[color:var(--color-wood)]/85">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Token ----------
function Token() {
  const [copied, setCopied] = useState(false);
  const contract = "6MDR99FhSmhosYVf5sa3Ngthk1buxKuAASigUyAKpump";
  const copy = () => {
    navigator.clipboard?.writeText(contract);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const rows = [
    ["Token Name", "BULLFARM"],
    ["Ticker", "$BULLFARM"],
    ["Network", "Solana"],
    ["Launch", "Pump.fun"],
    ["Tax", "0%"],
    ["Supply", "TBA"],
  ];
  return (
    <section
      id="token"
      className="relative overflow-hidden bg-[color:var(--color-forest)] py-24"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${BANNER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
        }}
      />
      <div className="absolute inset-0 bg-[color:var(--color-forest)]/70" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionTitleDark sub="A humble seed. Fair launch on Pump.fun.">
          🪙 The $BULLFARM Token
        </SectionTitleDark>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="wood-panel rounded-[2rem] p-8 sm:p-10"
        >
          <div className="mb-6 flex items-center gap-4">
            <img
              src={LOGO}
              alt="Bullfarm token"
              className="h-16 w-16 shrink-0 rounded-full border-2 border-[color:var(--color-gold)]"
            />
            <div className="min-w-0">
              <div className="font-display text-2xl font-extrabold text-shadow-farm">
                $BULLFARM
              </div>
              <div className="text-sm text-[color:var(--color-cream)]/80">
                Cozy farming on Solana
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur"
              >
                <span className="font-display text-sm uppercase tracking-wide text-[color:var(--color-wheat)]">
                  {k}
                </span>
                <span className="font-display font-extrabold text-[color:var(--color-cream)]">
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur">
            <div className="mb-2 font-display text-xs uppercase tracking-wide text-[color:var(--color-wheat)]">
              Contract Address
            </div>
            <div className="flex items-center justify-between gap-3">
              <code className="truncate text-sm text-[color:var(--color-cream)]/90">
                {contract}
              </code>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-wheat)] px-3 py-1.5 text-sm font-bold text-[color:var(--color-wood-dark)] transition hover:scale-105"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={PUMP_URL} target="_blank" rel="noreferrer" className="btn-farm">
              <Rocket className="h-4 w-4" /> Buy on Pump.fun <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Roadmap ----------
function Roadmap() {
  const stops = [
    {
      title: "Seed Planting",
      emoji: "🌱",
      items: ["Website", "Brand", "Community", "Launch"],
    },
    {
      title: "Growing Season",
      emoji: "🌿",
      items: ["Marketing", "Memes", "Partnerships"],
    },
    {
      title: "Harvest Time",
      emoji: "🌾",
      items: ["Listings", "Expansion", "Events"],
    },
    {
      title: "Future Farm",
      emoji: "🌕",
      items: ["Game Ideas", "Community Governance", "More Utilities"],
    },
  ];
  return (
    <section id="roadmap" className="relative overflow-hidden bg-[color:var(--color-cream)] py-24">
      <SunPattern />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle sub="The path through the farm.">🛤️ Roadmap</SectionTitle>
        <div className="relative space-y-14">
          {/* Path */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="h-full w-24 rounded-full border-x-4 border-dashed border-[color:var(--color-wood)]/40 bg-gradient-to-b from-[color:var(--color-wheat)]/40 to-[color:var(--color-grass)]/30" />
          </div>
          {stops.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={s.title}
                initial={{ x: left ? -40 : 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className={`relative grid gap-6 md:grid-cols-2 ${
                  left ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div className={left ? "md:pr-16" : "md:pl-16"}>
                  <div className="wood-panel rounded-3xl p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-4xl">{s.emoji}</span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-wheat)]">
                          Milestone {i + 1}
                        </div>
                        <h3 className="font-display text-2xl font-extrabold text-shadow-farm">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-center gap-2 text-[color:var(--color-cream)]/90"
                        >
                          <Wheat className="h-4 w-4 text-[color:var(--color-wheat)]" /> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block" />
                {/* Footprint dot on path */}
                <div className="pointer-events-none absolute left-1/2 top-8 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[color:var(--color-wood-dark)] bg-[color:var(--color-wheat)] text-lg md:flex">
                  🐾
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Community ----------
function Community() {
  return (
    <section id="community" className="relative overflow-hidden py-28">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BANNER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-night)]/80 via-[color:var(--color-forest)]/70 to-[color:var(--color-forest)]/90" />
      {Array.from({ length: 10 }).map((_, i) => (
        <Firefly key={i} i={i} />
      ))}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.img
          src={LOGO}
          alt="Bullfarm"
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 h-28 w-28 rounded-full border-4 border-[color:var(--color-gold)] shadow-2xl"
        />
        <h2 className="font-display text-5xl font-extrabold text-[color:var(--color-cream)] text-shadow-farm sm:text-6xl">
          Join the Bullfarm Family
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[color:var(--color-cream)]/90">
          Where every harvest brings new opportunities. Come grow with us under the harvest
          moon.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={X_URL} target="_blank" rel="noreferrer" className="btn-farm-green">
            <XLogo /> Follow on X
          </a>
          <a href={PUMP_URL} target="_blank" rel="noreferrer" className="btn-farm">
            <Rocket className="h-4 w-4" /> Buy on Pump.fun
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="relative bg-[color:var(--color-wood-dark)] py-10 text-[color:var(--color-cream)]">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={LOGO}
            alt="Bullfarm"
            className="h-12 w-12 shrink-0 rounded-full border-2 border-[color:var(--color-gold)]"
          />
          <div className="min-w-0">
            <div className="truncate font-display text-xl font-extrabold">Bullfarm</div>
            <div className="text-xs text-[color:var(--color-cream)]/70">
              Built on Solana · Launched on Pump.fun
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-[color:var(--color-gold)]/60 transition hover:bg-white/10"
          >
            <XLogo />
          </a>
          <a
            href={PUMP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Pump.fun"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-[color:var(--color-gold)]/60 transition hover:bg-white/10"
          >
            <Rocket className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-[color:var(--color-cream)]/60">
        © {new Date().getFullYear()} Bullfarm. All rights reserved.
      </div>
    </footer>
  );
}

// ---------- Main ----------
export function BullfarmSite() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] font-body text-[color:var(--color-wood-dark)]">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gameplay />
        <Why />
        <Token />
        <Roadmap />
        <Community />
      </main>
      <Footer />
    </div>
  );
}