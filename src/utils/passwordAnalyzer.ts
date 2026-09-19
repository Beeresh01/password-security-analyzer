export interface PasswordAnalysis {
  length: number;

  uppercaseCount: number;
  lowercaseCount: number;
  numberCount: number;
  specialCount: number;

  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;

  characterPool: number;
  entropy: number;

  score: number;
  strength:
    | "Very Weak"
    | "Weak"
    | "Moderate"
    | "Strong"
    | "Very Strong";

  // Smart security detection
  isCommonPassword: boolean;
  hasSequentialPattern: boolean;
  hasRepeatedCharacters: boolean;
  hasRepeatedPattern: boolean;
  hasKeyboardPattern: boolean;
  hasCommonSubstitution: boolean;

  warnings: string[];
}

/* ========================================
   Common Passwords
======================================== */

const commonPasswords = new Set([
  "password",
  "password1",
  "password123",
  "123456",
  "1234567",
  "12345678",
  "123456789",
  "1234567890",

  "qwerty",
  "qwerty123",

  "abc123",
  "abcdef",
  "abcdefg",

  "admin",
  "admin123",
  "administrator",

  "welcome",
  "welcome123",
  "letmein",

  "monkey",
  "dragon",
  "football",
  "baseball",
  "iloveyou",
  "princess",
  "superman",
  "shadow",

  "login",
  "pass",
  "password!",
  "passw0rd",
  "p@ssword",
  "p@ssw0rd",

  "test",
  "test123",
  "guest",
  "root",
]);

/* ========================================
   Keyboard Patterns
======================================== */

const keyboardPatterns = [
  "qwerty",
  "qwertyuiop",
  "asdfgh",
  "asdfghjkl",
  "zxcvbn",
  "zxcvbnm",
  "qazwsx",
  "wsxedc",
  "1qaz",
  "2wsx",
  "3edc",
];

/* ========================================
   Normalize Password
======================================== */

function normalizePassword(password: string): string {
  return password.toLowerCase().trim();
}

/* ========================================
   Sequential Characters
======================================== */

function hasSequentialPattern(password: string): boolean {
  if (password.length < 3) {
    return false;
  }

  const normalized = password.toLowerCase();

  for (let i = 0; i < normalized.length - 2; i++) {
    const a = normalized.charCodeAt(i);
    const b = normalized.charCodeAt(i + 1);
    const c = normalized.charCodeAt(i + 2);

    // Increasing sequence
    if (b === a + 1 && c === b + 1) {
      return true;
    }

    // Decreasing sequence
    if (b === a - 1 && c === b - 1) {
      return true;
    }
  }

  return false;
}

/* ========================================
   Repeated Characters
======================================== */

function hasRepeatedCharacters(password: string): boolean {
  if (password.length < 4) {
    return false;
  }

  let repeatedCount = 1;

  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      repeatedCount++;

      if (repeatedCount >= 4) {
        return true;
      }
    } else {
      repeatedCount = 1;
    }
  }

  return false;
}

/* ========================================
   Repeated Pattern
======================================== */

function hasRepeatedPattern(password: string): boolean {
  if (password.length < 6) {
    return false;
  }

  const normalized = password.toLowerCase();

  // Check patterns from 1 to 4 characters
  for (let patternLength = 1; patternLength <= 4; patternLength++) {
    if (normalized.length % patternLength !== 0) {
      continue;
    }

    const pattern = normalized.slice(0, patternLength);

    let matches = true;

    for (
      let i = patternLength;
      i < normalized.length;
      i += patternLength
    ) {
      if (
        normalized.slice(i, i + patternLength) !== pattern
      ) {
        matches = false;
        break;
      }
    }

    if (
      matches &&
      normalized.length / patternLength >= 3
    ) {
      return true;
    }
  }

  return false;
}

/* ========================================
   Keyboard Pattern
======================================== */

function hasKeyboardPattern(password: string): boolean {
  const normalized = password.toLowerCase();

  return keyboardPatterns.some((pattern) =>
    normalized.includes(pattern)
  );
}

/* ========================================
   Common Substitution
======================================== */

function hasCommonSubstitution(password: string): boolean {
  const normalized = password.toLowerCase();

  const substitutions: Record<string, string> = {
    "@": "a",
    "4": "a",
    "3": "e",
    "1": "i",
    "!": "i",
    "0": "o",
    "$": "s",
    "5": "s",
    "7": "t",
  };

  let converted = "";

  for (const character of normalized) {
    converted += substitutions[character] ?? character;
  }

  const commonWords = [
    "password",
    "welcome",
    "admin",
    "letmein",
    "qwerty",
    "login",
    "pass",
  ];

  return commonWords.some((word) =>
    converted.includes(word)
  );
}

/* ========================================
   Common Password Detection
======================================== */

function isCommonPassword(password: string): boolean {
  const normalized = normalizePassword(password);

  if (commonPasswords.has(normalized)) {
    return true;
  }

  const substitutions: Record<string, string> = {
    "@": "a",
    "4": "a",
    "3": "e",
    "1": "i",
    "!": "i",
    "0": "o",
    "$": "s",
    "5": "s",
    "7": "t",
  };

  let converted = "";

  for (const character of normalized) {
    converted += substitutions[character] ?? character;
  }

  return commonPasswords.has(converted);
}

/* ========================================
   Character Pool
======================================== */

function calculateCharacterPool(
  password: string
): number {
  let pool = 0;

  if (/[a-z]/.test(password)) {
    pool += 26;
  }

  if (/[A-Z]/.test(password)) {
    pool += 26;
  }

  if (/[0-9]/.test(password)) {
    pool += 10;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    pool += 32;
  }

  return pool;
}

/* ========================================
   Generate Warnings
======================================== */

function generateWarnings(
  password: string,
  common: boolean,
  sequential: boolean,
  repeatedCharacters: boolean,
  repeatedPattern: boolean,
  keyboard: boolean,
  substitution: boolean,
  length: number,
  hasUppercase: boolean,
  hasLowercase: boolean,
  hasNumber: boolean,
  hasSpecial: boolean
): string[] {
  const warnings: string[] = [];

  if (!password) {
    return warnings;
  }

  if (common) {
    warnings.push(
      "Common password detected. This password may be easy to guess."
    );
  }

  if (sequential) {
    warnings.push(
      "Sequential characters detected. Avoid predictable sequences such as 123456 or abcdef."
    );
  }

  if (repeatedCharacters) {
    warnings.push(
      "Repeated characters detected. Long runs such as aaaa or 1111 reduce unpredictability."
    );
  }

  if (repeatedPattern) {
    warnings.push(
      "Repeated pattern detected. Repeating the same group of characters can make a password predictable."
    );
  }

  if (keyboard) {
    warnings.push(
      "Keyboard pattern detected. Patterns such as qwerty or asdfgh are commonly predictable."
    );
  }

  if (substitution) {
    warnings.push(
      "Common character substitution detected. Replacing letters with symbols does not necessarily make a predictable password strong."
    );
  }

  if (length < 8) {
    warnings.push(
      "Password is shorter than 8 characters. Consider using a longer password."
    );
  } else if (length < 12) {
    warnings.push(
      "Consider using at least 12 characters for better protection."
    );
  }

  const characterTypes = [
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  if (characterTypes === 1) {
    warnings.push(
      "Only one character category is being used."
    );
  }

  return warnings;
}

/* ========================================
   Main Analyzer
======================================== */

export function analyzePassword(
  password: string
): PasswordAnalysis {
  // Always work with a safe string
  const safePassword =
    typeof password === "string"
      ? password
      : "";

  const length = safePassword.length;

  /* ----------------------------------------
     Character Counts
  ---------------------------------------- */

  const uppercaseCount = (
    safePassword.match(/[A-Z]/g) || []
  ).length;

  const lowercaseCount = (
    safePassword.match(/[a-z]/g) || []
  ).length;

  const numberCount = (
    safePassword.match(/[0-9]/g) || []
  ).length;

  const specialCount = (
    safePassword.match(/[^A-Za-z0-9]/g) || []
  ).length;

  /* ----------------------------------------
     Requirements
  ---------------------------------------- */

  const hasMinLength = length >= 8;
  const hasUppercase = uppercaseCount > 0;
  const hasLowercase = lowercaseCount > 0;
  const hasNumber = numberCount > 0;
  const hasSpecial = specialCount > 0;

  /* ----------------------------------------
     Character Pool
  ---------------------------------------- */

  const characterPool =
    calculateCharacterPool(safePassword);

  /* ----------------------------------------
     Entropy Estimate
  ---------------------------------------- */

  const entropy =
    length > 0 && characterPool > 0
      ? length * Math.log2(characterPool)
      : 0;

  /* ----------------------------------------
     Smart Detection
  ---------------------------------------- */

  const common =
    isCommonPassword(safePassword);

  const sequential =
    hasSequentialPattern(safePassword);

  const repeatedCharacters =
    hasRepeatedCharacters(safePassword);

  const repeatedPattern =
    hasRepeatedPattern(safePassword);

  const keyboard =
    hasKeyboardPattern(safePassword);

  const substitution =
    hasCommonSubstitution(safePassword);

  /* ----------------------------------------
     Warnings
  ---------------------------------------- */

  const warnings = generateWarnings(
    safePassword,
    common,
    sequential,
    repeatedCharacters,
    repeatedPattern,
    keyboard,
    substitution,
    length,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial
  );

  /* ========================================
     Base Score
  ======================================== */

  let score = 0;

  // Length
  if (length >= 8) {
    score += 20;
  }

  if (length >= 12) {
    score += 10;
  }

  if (length >= 16) {
    score += 10;
  }

  if (length >= 20) {
    score += 5;
  }

  // Character variety
  if (hasUppercase) {
    score += 15;
  }

  if (hasLowercase) {
    score += 15;
  }

  if (hasNumber) {
    score += 15;
  }

  if (hasSpecial) {
    score += 15;
  }

  /* ========================================
     Smart Detection Penalties
  ======================================== */

  if (common) {
    score -= 40;
  }

  if (sequential) {
    score -= 15;
  }

  if (repeatedCharacters) {
    score -= 10;
  }

  if (repeatedPattern) {
    score -= 15;
  }

  if (keyboard) {
    score -= 20;
  }

  if (substitution) {
    score -= 15;
  }

  // Very short passwords should never score highly
  if (length < 4) {
    score = Math.min(score, 15);
  }

  // Keep score between 0 and 100
  score = Math.max(
    0,
    Math.min(100, score)
  );

  /* ========================================
     Strength
  ======================================== */

  let strength:
    | "Very Weak"
    | "Weak"
    | "Moderate"
    | "Strong"
    | "Very Strong";

  if (score < 25) {
    strength = "Very Weak";
  } else if (score < 45) {
    strength = "Weak";
  } else if (score < 65) {
    strength = "Moderate";
  } else if (score < 85) {
    strength = "Strong";
  } else {
    strength = "Very Strong";
  }

  /* ========================================
     Final Result
  ======================================== */

  return {
    length,

    uppercaseCount,
    lowercaseCount,
    numberCount,
    specialCount,

    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,

    characterPool,

    entropy:
      Math.round(entropy * 100) / 100,

    score,
    strength,

    isCommonPassword: common,
    hasSequentialPattern: sequential,
    hasRepeatedCharacters:
      repeatedCharacters,
    hasRepeatedPattern:
      repeatedPattern,
    hasKeyboardPattern: keyboard,
    hasCommonSubstitution:
      substitution,

    warnings,
  };
}