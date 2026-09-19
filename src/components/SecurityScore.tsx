import type { PasswordAnalysis } from "../utils/passwordAnalyzer";

interface SecurityScoreProps {
  analysis: PasswordAnalysis;
}

export default function SecurityScore({
  analysis,
}: SecurityScoreProps) {
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

  const getScoreMessage = () => {
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

  const getScoreColor = () => {
    if (score < 25) {
      return "text-red-500";
    }

    if (score < 45) {
      return "text-orange-500";
    }

    if (score < 65) {
      return "text-yellow-500";
    }

    if (score < 85) {
      return "text-green-500";
    }

    return "text-emerald-400";
  };

  const getProgressColor = () => {
    if (score < 25) {
      return "from-red-500 to-red-400";
    }

    if (score < 45) {
      return "from-orange-500 to-orange-400";
    }

    if (score < 65) {
      return "from-yellow-500 to-yellow-400";
    }

    if (score < 85) {
      return "from-green-500 to-green-400";
    }

    return "from-emerald-500 to-emerald-400";
  };

  const getRecommendation = () => {
    if (!analysis.length) {
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
      return "Don't rely only on predictable substitutions such as @, 0, or 1.";
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
    <section
      id="security-score"
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200/70
        dark:border-slate-700/60
        bg-white/80
        dark:bg-slate-900/70
        backdrop-blur-xl
        shadow-xl
        shadow-slate-900/5
        dark:shadow-black/20
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-slate-200/70 dark:border-slate-700/60">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-indigo-500/10
              dark:bg-indigo-400/10
              text-indigo-600
              dark:text-indigo-400
            "
          >
            <svg
              width="22"
              height="22"
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
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Security Score
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              A combined analysis of strength and predictability
            </p>
          </div>
        </div>
      </div>

      {/* Main Score */}
      <div className="p-6 sm:p-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-center">
          {/* Score Circle */}
          <div className="flex justify-center">
            <div className="relative h-48 w-48">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 120 120"
              >
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-200 dark:text-slate-700"
                />

                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset={
                    314 - (314 * score) / 100
                  }
                  className={getScoreColor()}
                  style={{
                    transition:
                      "stroke-dashoffset 700ms ease",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-5xl font-black ${getScoreColor()}`}
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
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Overall strength
              </span>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-sm
                  font-bold
                  bg-slate-100
                  dark:bg-slate-800
                  ${getScoreColor()}
                `}
              >
                {strength}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {getScoreMessage()}
            </h3>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 max-w-2xl">
              The score combines password length, character
              variety, and detected predictable patterns. It is
              an educational estimate and should not be treated
              as a guarantee against password cracking.
            </p>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Security level
                </span>

                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {score}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${getProgressColor()}
                  `}
                  style={{
                    width: `${score}%`,
                    transition: "width 700ms ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Length */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-5">
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

          {/* Risks */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-5">
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

          {/* Warnings */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-5">
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

        {/* Personalized Recommendation */}
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-indigo-200
            dark:border-indigo-500/20
            bg-indigo-50/70
            dark:bg-indigo-500/5
            p-5
          "
        >
          <div className="flex gap-4">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
              "
            >
              <svg
                width="20"
                height="20"
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
              <h3 className="font-bold text-slate-900 dark:text-white">
                Personalized Recommendation
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {getRecommendation()}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Details */}
        {riskCount > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Detected Security Issues
            </h3>

            <div className="space-y-2">
              {isCommonPassword && (
                <RiskItem>
                  Common password detected
                </RiskItem>
              )}

              {hasSequentialPattern && (
                <RiskItem>
                  Sequential character pattern detected
                </RiskItem>
              )}

              {hasRepeatedCharacters && (
                <RiskItem>
                  Repeated characters detected
                </RiskItem>
              )}

              {hasRepeatedPattern && (
                <RiskItem>
                  Repeated pattern detected
                </RiskItem>
              )}

              {hasKeyboardPattern && (
                <RiskItem>
                  Keyboard pattern detected
                </RiskItem>
              )}

              {hasCommonSubstitution && (
                <RiskItem>
                  Predictable character substitution detected
                </RiskItem>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================
   Risk Item
======================================== */

function RiskItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-red-200
        dark:border-red-500/20
        bg-red-50
        dark:bg-red-500/5
        px-4
        py-3
      "
    >
      <div
        className="
          h-2
          w-2
          shrink-0
          rounded-full
          bg-red-500
        "
      />

      <span className="text-sm text-red-700 dark:text-red-300">
        {children}
      </span>
    </div>
  );
}