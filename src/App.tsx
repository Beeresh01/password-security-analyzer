import { useState, type ReactNode } from "react";
import { analyzePassword } from "./utils/passwordAnalyzer";
import { generatePassword } from "./utils/passwordGenerator";
import CyberBackground from "./components/CyberBackground";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [generatorLength, setGeneratorLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const analysis = analyzePassword(password);

  const handleGeneratePassword = () => {
    const generated = generatePassword({
      length: generatorLength,
      uppercase: useUppercase,
      lowercase: useLowercase,
      numbers: useNumbers,
      symbols: useSymbols,
    });

    setPassword(generated);
    setShowPassword(false);
  };

  const handleCopy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      console.error("Unable to copy password");
    }
  };

  const getStrengthColor = () => {
    switch (analysis.strength) {
      case "Very Strong":
        return darkMode ? "text-emerald-400" : "text-emerald-600";

      case "Strong":
        return darkMode ? "text-green-400" : "text-green-600";

      case "Moderate":
        return darkMode ? "text-yellow-400" : "text-yellow-600";

      case "Weak":
        return darkMode ? "text-orange-400" : "text-orange-600";

      default:
        return darkMode ? "text-red-400" : "text-red-600";
    }
  };

  const getBarColor = () => {
    switch (analysis.strength) {
      case "Very Strong":
        return "bg-gradient-to-r from-emerald-500 to-cyan-400";

      case "Strong":
        return "bg-gradient-to-r from-green-500 to-emerald-400";

      case "Moderate":
        return "bg-gradient-to-r from-yellow-500 to-orange-400";

      case "Weak":
        return "bg-gradient-to-r from-orange-500 to-red-400";

      default:
        return "bg-gradient-to-r from-red-500 to-rose-400";
    }
  };

  const cardClass = darkMode
    ? "glass-dark text-slate-100"
    : "glass-light text-slate-800";

  const mutedText = darkMode ? "text-slate-400" : "text-slate-600";

  return (
    <div
      className={`relative isolate min-h-screen overflow-x-hidden transition-colors duration-500 ${
        darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* ========================================
          Animated Background
      ========================================= */}

      <CyberBackground darkMode={darkMode} />

      {/* ========================================
          Header
      ========================================= */}

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
          darkMode
            ? "border-slate-800/70 bg-slate-950/70"
            : "border-slate-200/80 bg-white/70"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
                <path d="M12 15v2" />
              </svg>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-sm font-bold tracking-tight sm:text-base">
                Password Security Analyzer
              </h1>

              <p className={`hidden text-xs sm:block ${mutedText}`}>
                Analyze • Generate • Stay Secure
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition ${
                darkMode
                  ? "text-white hover:text-blue-400"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition ${
                darkMode
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              About
            </a>

            <a
              href="#tips"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-medium transition ${
                darkMode
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Security Tips
            </a>

            <a
              href="https://github.com/Beeresh01/password-security-analyzer"
              target="_blank"
              rel="noreferrer"
              className={`text-sm font-medium transition ${
                darkMode
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              GitHub
            </a>
          </nav>
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className={`border-t px-4 pb-4 pt-3 md:hidden ${
              darkMode ? "border-slate-800/70" : "border-slate-200/80"
            }`}
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  darkMode ? "text-white hover:bg-slate-800" : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  darkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                About
              </a>
              <a
                href="#tips"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  darkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Security Tips
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  darkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                GitHub
              </a>
            </nav>
          </div>
        )}


          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border md:hidden ${
              darkMode
                ? "border-slate-700 bg-slate-800/70 hover:bg-slate-700"
                : "border-slate-200 bg-white hover:bg-slate-100"
            }`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              darkMode
                ? "border-slate-700 bg-slate-800/70 hover:bg-slate-700"
                : "border-slate-200 bg-white hover:bg-slate-100"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <svg
                className="h-5 w-5 text-yellow-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ========================================
          Main
      ========================================= */}

      <main
        id="home"
        className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-5 sm:pb-20 sm:pt-10 lg:px-8"
      >
        {/* Hero */}

        <section className="animate-fade-in-up motion-reduce:animate-none pb-8 pt-4 text-center sm:pb-10 sm:pt-6">
          <div
            className={`mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
              darkMode
                ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>

            100% Client-Side • Your password stays in your browser
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Stronger Passwords.
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Better Security.
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl px-2 text-sm leading-6 sm:mt-5 sm:px-0 sm:text-lg sm:leading-7 ${mutedText}`}
          >
            Analyze password strength, understand its security
            characteristics, and generate strong random passwords —
            entirely inside your browser.
          </p>
        </section>

        {/* Password Input */}

        <section
          className={`${cardClass} security-card animate-scale-in motion-reduce:animate-none rounded-3xl p-4 sm:p-7`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <div>
                <h3 className="font-bold">Enter your password</h3>

                <p className={`text-xs ${mutedText}`}>
                  Nothing is uploaded or stored
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`hidden items-center gap-2 text-sm sm:flex ${
                darkMode
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>
          </div>

          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
              darkMode
                ? "border-slate-700 bg-slate-900/60 focus-within:border-blue-500/50"
                : "border-slate-200 bg-white/80 focus-within:border-blue-400"
            }`}
          >
            <svg
              className={`h-5 w-5 flex-shrink-0 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>

            <label htmlFor="password-input" className="sr-only">
              Password to analyze
            </label>
            <input
              id="password-input"
              name="password"
              autoComplete="new-password"
              spellCheck={false}
              aria-label="Password to analyze"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here..."
              className={`min-w-0 flex-1 bg-transparent text-base outline-none ${
                darkMode
                  ? "text-white placeholder:text-slate-600"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`rounded-lg p-2 ${
                darkMode
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
            >
              <svg
                className={`h-5 w-5 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {showPassword ? (
                  <>
                    <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6S2 12 2 12z" />
                    <circle cx="12" cy="12" r="2" />
                  </>
                ) : (
                  <>
                    <path d="M3 3l18 18" />
                    <path d="M10.58 10.58a2 2 0 002.83 2.83" />
                    <path d="M9.88 5.09A10.94 10.94 0 0112 5c7 0 10 7 10 7a18.5 18.5 0 01-3.17 4.19" />
                    <path d="M6.61 6.61A18.5 18.5 0 002 12s3 7 10 7a10.94 10.94 0 004.91-1.16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </section>

        {/* Strength + Requirements */}

        <section className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Strength */}

          <div
            className={`${cardClass} security-card rounded-3xl p-5 sm:p-6`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    darkMode
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <h3 className="font-bold">Password Strength</h3>
              </div>

              <div className="text-right">
                <p className={`text-xs ${mutedText}`}>Score</p>

                <p className="font-bold">
                  {analysis.score}
                  <span className={`font-normal ${mutedText}`}>
                    /100
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span
                className={`text-3xl font-black ${getStrengthColor()}`}
              >
                {analysis.strength}
              </span>
            </div>

            <div
              className={`h-3 overflow-hidden rounded-full ${
                darkMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            >
              <div
                role="progressbar"
                aria-label="Password strength score"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={analysis.score}
                className={`h-full rounded-full transition-all duration-700 ${getBarColor()}`}
                style={{
                  width: `${analysis.score}%`,
                }}
              />
            </div>

            <p className={`mt-4 text-sm ${mutedText}`}>
              {password
                ? "Your password has been analyzed using local security heuristics."
                : "Enter a password to see its security analysis."}
            </p>
          </div>

          {/* Requirements */}

          <div
            className={`${cardClass} security-card rounded-3xl p-5 sm:p-6`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-cyan-50 text-cyan-600"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8 12 2.5 2.5L16 9" />
                </svg>
              </div>

              <h3 className="font-bold">Password Requirements</h3>
            </div>

            <div className="space-y-3">
              <Requirement
                text="At least 8 characters"
                met={analysis.hasMinLength}
                darkMode={darkMode}
              />

              <Requirement
                text="Contains uppercase letter (A-Z)"
                met={analysis.hasUppercase}
                darkMode={darkMode}
              />

              <Requirement
                text="Contains lowercase letter (a-z)"
                met={analysis.hasLowercase}
                darkMode={darkMode}
              />

              <Requirement
                text="Contains number (0-9)"
                met={analysis.hasNumber}
                darkMode={darkMode}
              />

              <Requirement
                text="Contains special character"
                met={analysis.hasSpecial}
                darkMode={darkMode}
              />
            </div>
          </div>
        </section>

        {/* ========================================
            Smart Security Analysis
        ========================================= */}

        <section className="mt-5">
          <div
            className={`${cardClass} security-card rounded-3xl p-6 sm:p-7`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    analysis.warnings.length === 0
                      ? darkMode
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                      : darkMode
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {analysis.warnings.length === 0 ? (
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Smart Security Analysis
                  </h3>

                  <p className={`text-sm ${mutedText}`}>
                    Checks for predictable password patterns
                  </p>
                </div>
              </div>

              {password && (
                <span
                  className={`hidden rounded-full px-3 py-1 text-xs font-semibold sm:block ${
                    analysis.warnings.length === 0
                      ? darkMode
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-700"
                      : darkMode
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {analysis.warnings.length === 0
                    ? "No obvious weaknesses"
                    : `${analysis.warnings.length} warning${
                        analysis.warnings.length === 1 ? "" : "s"
                      }`}
                </span>
              )}
            </div>

            {!password ? (
              <div
                className={`rounded-2xl border border-dashed p-6 text-center ${
                  darkMode
                    ? "border-slate-700 bg-slate-900/30"
                    : "border-slate-300 bg-slate-50/70"
                }`}
              >
                <svg
                  className={`mx-auto h-8 w-8 ${
                    darkMode ? "text-slate-600" : "text-slate-400"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 15v2" />
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path d="M8 11V8a4 4 0 018 0v3" />
                </svg>

                <p className={`mt-3 text-sm ${mutedText}`}>
                  Enter a password to check for predictable patterns
                  and common weaknesses.
                </p>
              </div>
            ) : analysis.warnings.length === 0 ? (
              <div
                className={`flex items-start gap-4 rounded-2xl border p-5 ${
                  darkMode
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-emerald-200 bg-emerald-50/70"
                }`}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>

                <div>
                  <h4
                    className={`font-semibold ${
                      darkMode
                        ? "text-emerald-400"
                        : "text-emerald-700"
                    }`}
                  >
                    No obvious predictable patterns detected
                  </h4>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    This password does not match the common patterns
                    checked by the analyzer.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {analysis.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 rounded-2xl border p-4 ${
                      darkMode
                        ? "border-amber-500/20 bg-amber-500/5"
                        : "border-amber-200 bg-amber-50/70"
                    }`}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <svg
                        className={`h-4 w-4 ${
                          darkMode
                            ? "text-amber-400"
                            : "text-amber-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                    </div>

                    <p
                      className={`text-sm leading-6 ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      {warning}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {password && analysis.warnings.length > 0 && (
              <div
                className={`mt-5 rounded-2xl p-4 text-sm ${
                  darkMode
                    ? "bg-slate-900/60 text-slate-400"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span className="font-semibold">Tip:</span>{" "}
                A password can contain uppercase letters, numbers and
                symbols while still being predictable. Length,
                uniqueness and unpredictability all matter.
              </div>
            )}
          </div>
        </section>

        {/* ========================================
            Step 9 - Security Score
        ========================================= */}

        <SecurityScore analysis={analysis} />

        {/* ========================================
            Character Analysis + Metrics
        ========================================= */}

        <section className="mt-5 grid gap-5 md:grid-cols-2">
          <div
            className={`${cardClass} security-card rounded-3xl p-5 sm:p-6`}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-violet-50 text-violet-600"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19V5" />
                  <path d="M4 19h16" />
                  <path d="M8 16v-5" />
                  <path d="M12 16V7" />
                  <path d="M16 16v-3" />
                </svg>
              </div>

              <h3 className="font-bold">Character Analysis</h3>
            </div>

            <div className="space-y-5">
              <CharacterRow
                label="Uppercase letters"
                value={analysis.uppercaseCount}
                max={Math.max(analysis.length, 1)}
                darkMode={darkMode}
              />

              <CharacterRow
                label="Lowercase letters"
                value={analysis.lowercaseCount}
                max={Math.max(analysis.length, 1)}
                darkMode={darkMode}
              />

              <CharacterRow
                label="Numbers"
                value={analysis.numberCount}
                max={Math.max(analysis.length, 1)}
                darkMode={darkMode}
              />

              <CharacterRow
                label="Special characters"
                value={analysis.specialCount}
                max={Math.max(analysis.length, 1)}
                darkMode={darkMode}
              />
            </div>
          </div>

          <div className="grid gap-5">
            {/* Entropy */}

            <div
              className={`${cardClass} security-card rounded-3xl p-5 sm:p-6`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    darkMode
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3v18" />
                    <path d="M3 12h18" />
                    <path d="m5 5 14 14" />
                    <path d="m19 5-14 14" />
                  </svg>
                </div>

                <h3 className="font-bold">Estimated Entropy</h3>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-3xl font-black">
                  {analysis.entropy.toFixed(1)}
                </span>

                <span className={`mb-1 ${mutedText}`}>bits</span>
              </div>

              <p className={`mt-2 text-sm ${mutedText}`}>
                Based on the estimated character pool and password
                length.
              </p>
            </div>

            {/* Character Pool */}

            <div
              className={`${cardClass} security-card rounded-3xl p-5 sm:p-6`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    darkMode
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-cyan-50 text-cyan-600"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="12" cy="18" r="2" />
                    <path d="M8 7l3 9" />
                    <path d="M16 7l-3 9" />
                  </svg>
                </div>

                <h3 className="font-bold">Character Pool</h3>
              </div>

              <div className="text-3xl font-black">
                {analysis.characterPool}
              </div>

              <p className={`mt-2 text-sm ${mutedText}`}>
                Possible characters considered for this password.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================
            Generator
        ========================================= */}

        <section
          className={`${cardClass} security-card mt-5 rounded-3xl p-6 sm:p-7`}
        >
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Generate Secure Password
                </h3>

                <p className={`text-sm ${mutedText}`}>
                  Create a random password locally in your browser.
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                darkMode
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              Cryptographically random
            </span>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">
                  Password length
                </span>

                <span className="font-bold text-blue-400">
                  {generatorLength}
                </span>
              </div>

              <input
                type="range"
                min="8"
                max="64"
                value={generatorLength}
                onChange={(e) =>
                  setGeneratorLength(Number(e.target.value))
                }
                className="w-full accent-blue-500"
              />

              <div
                className={`mt-2 flex justify-between text-xs ${mutedText}`}
              >
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <GeneratorOption
                label="Uppercase"
                checked={useUppercase}
                onChange={setUseUppercase}
                darkMode={darkMode}
              />

              <GeneratorOption
                label="Lowercase"
                checked={useLowercase}
                onChange={setUseLowercase}
                darkMode={darkMode}
              />

              <GeneratorOption
                label="Numbers"
                checked={useNumbers}
                onChange={setUseNumbers}
                darkMode={darkMode}
              />

              <GeneratorOption
                label="Symbols"
                checked={useSymbols}
                onChange={setUseSymbols}
                darkMode={darkMode}
              />
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 11a8.1 8.1 0 00-15.5-2" />
                <path d="M4 5v4h4" />
                <path d="M4 13a8.1 8.1 0 0015.5 2" />
                <path d="M20 19v-4h-4" />
              </svg>

              Generate Password
            </button>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!password}
              aria-label={copied ? "Password copied" : "Copy password"}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-5 py-3.5 font-semibold transition ${
                !password
                  ? "cursor-not-allowed opacity-40"
                  : darkMode
                    ? "border-slate-700 bg-slate-800/60 hover:bg-slate-700"
                    : "border-slate-200 bg-white hover:bg-slate-100"
              }`}
            >
              {copied ? (
                <>
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="11"
                      height="11"
                      rx="2"
                    />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>

                  Copy Password
                </>
              )}
            </button>
          </div>
        </section>

        {/* ========================================
            Privacy
        ========================================= */}

        <section
          className={`mt-5 rounded-3xl border p-7 text-center ${
            darkMode
              ? "border-blue-500/20 bg-blue-500/5"
              : "border-blue-200 bg-blue-50/70"
          }`}
        >
          <div
            className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
              darkMode
                ? "bg-blue-500/10 text-blue-400"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
          </div>

          <h3 className="text-lg font-bold">
            Your privacy comes first
          </h3>

          <p
            className={`mx-auto mt-2 max-w-xl text-sm ${mutedText}`}
          >
            Password analysis and generation happen locally in your
            browser. The application does not send your password to
            a server or database.
          </p>
        </section>

        {/* ========================================
            About
        ========================================= */}

        <section id="about" className="scroll-mt-24 pt-24">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About
            </p>

            <h2 className="mt-2 text-3xl font-black">
              What is Password Security Analyzer?
            </h2>
          </div>

          <div className={`${cardClass} rounded-3xl p-7`}>
            <p className={`leading-7 ${mutedText}`}>
              Password Security Analyzer is a browser-based security
              utility designed to help users understand password
              characteristics. It checks length, character types,
              estimated entropy, and other basic password properties.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <InfoCard
                title="Private"
                text="Passwords are processed locally in your browser."
                darkMode={darkMode}
              />

              <InfoCard
                title="Fast"
                text="Analysis happens instantly without network requests."
                darkMode={darkMode}
              />

              <InfoCard
                title="Free"
                text="No account, backend, database, or paid API is required."
                darkMode={darkMode}
              />
            </div>
          </div>
        </section>

        {/* ========================================
            Security Tips
        ========================================= */}

        <section id="tips" className="scroll-mt-24 pt-24">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Security Tips
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Build better password habits
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TipCard
              number="01"
              title="Use longer passwords"
              text="Password length is an important factor when evaluating resistance to guessing."
              darkMode={darkMode}
            />

            <TipCard
              number="02"
              title="Avoid predictable patterns"
              text="Names, dates, common words, repeated characters, and simple sequences can make passwords easier to guess."
              darkMode={darkMode}
            />

            <TipCard
              number="03"
              title="Use unique passwords"
              text="Avoid reusing the same password across multiple accounts."
              darkMode={darkMode}
            />

            <TipCard
              number="04"
              title="Consider a password manager"
              text="A password manager can help create and store unique passwords for different services."
              darkMode={darkMode}
            />
          </div>
        </section>
      </main>

      {/* ========================================
          Footer
      ========================================= */}

      <footer
        className={`relative z-10 border-t ${
          darkMode
            ? "border-slate-800 bg-slate-950/70"
            : "border-slate-200 bg-white/70"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-8">
          <div>
            <p className="font-bold">
              Password Security Analyzer
            </p>

            <p className={`mt-1 text-sm ${mutedText}`}>
              Built with React + TypeScript + Tailwind CSS
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className={`${mutedText} transition hover:text-blue-400`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className={`${mutedText} transition hover:text-blue-400`}
            >
              About
            </a>

            <a
              href="#tips"
              onClick={() => setMobileMenuOpen(false)}
              className={`${mutedText} transition hover:text-blue-400`}
            >
              Security Tips
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className={`${mutedText} transition hover:text-blue-400`}
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ========================================
   Security Score Dashboard
======================================== */

function SecurityScore({
  analysis,
}: {
  analysis: ReturnType<typeof analyzePassword>;
}) {
  const {
    score,
    strength,
    warnings,
    isCommonPassword,
    hasSequentialPattern,
    hasRepeatedCharacters,
    hasRepeatedPattern,
    hasKeyboardPattern,
    hasCommonSubstitution,
    length,
  } = analysis;

  const riskCount = [
    isCommonPassword,
    hasSequentialPattern,
    hasRepeatedCharacters,
    hasRepeatedPattern,
    hasKeyboardPattern,
    hasCommonSubstitution,
  ].filter(Boolean).length;

  const getScoreColor = () => {
    if (score < 25) return "text-red-500";
    if (score < 45) return "text-orange-500";
    if (score < 65) return "text-yellow-500";
    if (score < 85) return "text-green-500";
    return "text-emerald-400";
  };

  const getProgressColor = () => {
    if (score < 25) return "from-red-500 to-red-400";
    if (score < 45) return "from-orange-500 to-orange-400";
    if (score < 65) return "from-yellow-500 to-yellow-400";
    if (score < 85) return "from-green-500 to-green-400";
    return "from-emerald-500 to-emerald-400";
  };

  const getMessage = () => {
    if (score === 0) {
      return "Enter a password to begin the security analysis.";
    }
    if (score < 25) {
      return "This password needs significant improvement.";
    }
    if (score < 45) {
      return "This password has several security weaknesses.";
    }
    if (score < 65) {
      return "This password provides moderate protection.";
    }
    if (score < 85) {
      return "This password provides good protection.";
    }
    return "This password has a strong security profile.";
  };

  const getRecommendation = () => {
    if (!length) {
      return "Enter a password to receive personalized recommendations.";
    }

    if (length < 12) {
      return "Increase the password length to at least 12 characters.";
    }

    if (isCommonPassword) {
      return "Avoid commonly used passwords and choose something unique.";
    }

    if (hasKeyboardPattern) {
      return "Avoid keyboard patterns such as qwerty or asdfgh.";
    }

    if (hasSequentialPattern) {
      return "Replace sequential characters with less predictable combinations.";
    }

    if (hasRepeatedCharacters || hasRepeatedPattern) {
      return "Avoid repeating the same characters or character groups.";
    }

    if (hasCommonSubstitution) {
      return "Do not rely only on predictable substitutions such as @, 0, or 1.";
    }

    if (score < 65) {
      return "Add more length and character variety to improve the score.";
    }

    if (score < 85) {
      return "A longer, unique passphrase could provide even better protection.";
    }

    return "Your password has a strong combination of length and variety.";
  };

  return (
    <section className="mt-5">
      <div className="security-card rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-slate-800 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-black/20 sm:p-7">
        {/* Header */}
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-bold">Security Score</h3>
            <p className={`text-sm ${darkModeText(analysis)}`}>
              Combined strength and predictability analysis
            </p>
          </div>
        </div>

        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[230px_1fr]">
          {/* Score Circle */}
          <div className="flex justify-center">
            <div className="relative h-40 w-40 sm:h-48 sm:w-48">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-200 dark:text-slate-700"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * score) / 100}
                  className={getScoreColor()}
                  style={{
                    transition: "stroke-dashoffset 700ms ease",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-4xl font-black sm:text-5xl ${getScoreColor()}`}
                >
                  {score}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  / 100
                </span>
              </div>
            </div>
          </div>

          {/* Score Information */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Overall strength
              </span>

              <span
                className={`rounded-full bg-slate-100 px-3 py-1 text-sm font-bold dark:bg-slate-800 ${getScoreColor()}`}
              >
                {strength}
              </span>
            </div>

            <h4 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              {getMessage()}
            </h4>

            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              The score combines password length, character variety,
              and detected predictable patterns. It is an educational
              estimate and is not a guarantee against password cracking.
            </p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Security level
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {score}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  role="progressbar"
                  aria-label="Overall security score"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={score}
                  className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()}`}
                  style={{
                    width: `${score}%`,
                    transition: "width 700ms ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Password Length
              </span>
              <span className="text-xl">📏</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {length >= 12
                ? "Good length"
                : "Consider using 12+ characters"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Detected Risks
              </span>
              <span className="text-xl">⚠️</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {riskCount}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {riskCount === 0
                ? "No major patterns detected"
                : "Predictable patterns found"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Recommendations
              </span>
              <span className="text-xl">💡</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {warnings.length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {warnings.length === 0
                ? "No immediate issues"
                : "Suggestions available"}
            </p>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M8 14c-1.5-1.1-2.5-2.8-2.5-4.8A6.5 6.5 0 0112 3a6.5 6.5 0 016.5 6.2c0 2-.9 3.7-2.5 4.8-.8.6-1.2 1.4-1.3 2H9.3c-.1-.6-.5-1.4-1.3-2z" />
              </svg>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                Personalized Recommendation
              </h4>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {getRecommendation()}
              </p>
            </div>
          </div>
        </div>

        {/* Detected Risks */}
        {riskCount > 0 && (
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
              Detected Security Issues
            </h4>

            <div className="space-y-2">
              {isCommonPassword && (
                <ScoreRiskItem>
                  Common password detected
                </ScoreRiskItem>
              )}

              {hasSequentialPattern && (
                <ScoreRiskItem>
                  Sequential character pattern detected
                </ScoreRiskItem>
              )}

              {hasRepeatedCharacters && (
                <ScoreRiskItem>
                  Repeated characters detected
                </ScoreRiskItem>
              )}

              {hasRepeatedPattern && (
                <ScoreRiskItem>
                  Repeated pattern detected
                </ScoreRiskItem>
              )}

              {hasKeyboardPattern && (
                <ScoreRiskItem>
                  Keyboard pattern detected
                </ScoreRiskItem>
              )}

              {hasCommonSubstitution && (
                <ScoreRiskItem>
                  Predictable character substitution detected
                </ScoreRiskItem>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================
   Security Score Helpers
======================================== */

function darkModeText(
  analysis: ReturnType<typeof analyzePassword>
) {
  // This helper only provides the text class used by the
  // score component. Theme is inherited by the parent UI.
  void analysis;
  return "text-slate-500 dark:text-slate-400";
}

function ScoreRiskItem({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/20 dark:bg-red-500/5">
      <div className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
      <span className="text-sm text-red-700 dark:text-red-300">
        {children}
      </span>
    </div>
  );
}

/* ========================================
   Requirement
======================================== */

function Requirement({
  text,
  met,
  darkMode,
}: {
  text: string;
  met: boolean;
  darkMode: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          met
            ? "bg-emerald-500 text-white"
            : darkMode
              ? "bg-slate-800 text-slate-600"
              : "bg-slate-200 text-slate-400"
        }`}
      >
        {met ? (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </div>

      <span className={met ? "" : "text-slate-500"}>
        {text}
      </span>
    </div>
  );
}

/* ========================================
   Character Row
======================================== */

function CharacterRow({
  label,
  value,
  max,
  darkMode,
}: {
  label: string;
  value: number;
  max: number;
  darkMode: boolean;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span
          className={
            darkMode ? "text-slate-300" : "text-slate-600"
          }
        >
          {label}
        </span>

        <span className="font-semibold">{value}</span>
      </div>

      <div
        className={`h-2 overflow-hidden rounded-full ${
          darkMode ? "bg-slate-800" : "bg-slate-200"
        }`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ========================================
   Generator Option
======================================== */

function GeneratorOption({
  label,
  checked,
  onChange,
  darkMode,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  darkMode: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
        checked
          ? darkMode
            ? "border-blue-500/30 bg-blue-500/10"
            : "border-blue-200 bg-blue-50"
          : darkMode
            ? "border-slate-800 bg-slate-900/40"
            : "border-slate-200 bg-white/50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-blue-500"
      />

      <span>{label}</span>
    </label>
  );
}

/* ========================================
   Info Card
======================================== */

function InfoCard({
  title,
  text,
  darkMode,
}: {
  title: string;
  text: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        darkMode
          ? "border-slate-800 bg-slate-900/40"
          : "border-slate-200 bg-white/60"
      }`}
    >
      <h3 className="font-bold">{title}</h3>

      <p
        className={`mt-2 text-sm leading-6 ${
          darkMode ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

/* ========================================
   Tip Card
======================================== */

function TipCard({
  number,
  title,
  text,
  darkMode,
}: {
  number: string;
  title: string;
  text: string;
  darkMode: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        darkMode
          ? "border-slate-800 bg-slate-900/50"
          : "border-slate-200 bg-white/70"
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="text-sm font-bold text-blue-400">
          {number}
        </span>

        <div>
          <h3 className="font-bold">{title}</h3>

          <p
            className={`mt-2 text-sm leading-6 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;