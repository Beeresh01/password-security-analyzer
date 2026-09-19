export type PasswordStrength =
  | "Very Weak"
  | "Weak"
  | "Moderate"
  | "Strong"
  | "Very Strong";

export interface PasswordAnalysis {
  length: number;

  uppercase: number;
  lowercase: number;
  numbers: number;
  special: number;

  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;

  characterPool: number;
  entropy: number;

  score: number;
  strength: PasswordStrength;
}

export function analyzePassword(password: string): PasswordAnalysis {
  let uppercase = 0;
  let lowercase = 0;
  let numbers = 0;
  let special = 0;

  for (const character of password) {
    if (/[A-Z]/.test(character)) {
      uppercase++;
    } else if (/[a-z]/.test(character)) {
      lowercase++;
    } else if (/[0-9]/.test(character)) {
      numbers++;
    } else {
      special++;
    }
  }

  const length = password.length;

  const hasMinLength = length >= 8;
  const hasUppercase = uppercase > 0;
  const hasLowercase = lowercase > 0;
  const hasNumber = numbers > 0;
  const hasSpecial = special > 0;

  /*
   * Character pool:
   *
   * Lowercase letters = 26
   * Uppercase letters = 26
   * Numbers = 10
   * Common special characters = 32
   */

  let characterPool = 0;

  if (hasLowercase) {
    characterPool += 26;
  }

  if (hasUppercase) {
    characterPool += 26;
  }

  if (hasNumber) {
    characterPool += 10;
  }

  if (hasSpecial) {
    characterPool += 32;
  }

  /*
   * Entropy = length × log2(character pool)
   */

  const entropy =
    length > 0 && characterPool > 0
      ? length * Math.log2(characterPool)
      : 0;

  /*
   * Strength score
   */

  let score = 0;

  if (length >= 8) {
    score += 20;
  }

  if (length >= 12) {
    score += 10;
  }

  if (length >= 16) {
    score += 10;
  }

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

  /*
   * Penalize very short passwords.
   */

  if (length < 4) {
    score = Math.min(score, 15);
  }

  /*
   * Prevent score from exceeding 100.
   */

  score = Math.min(score, 100);

  /*
   * Convert score into a strength label.
   */

  let strength: PasswordStrength;

  if (score < 30) {
    strength = "Very Weak";
  } else if (score < 50) {
    strength = "Weak";
  } else if (score < 70) {
    strength = "Moderate";
  } else if (score < 85) {
    strength = "Strong";
  } else {
    strength = "Very Strong";
  }

  return {
    length,

    uppercase,
    lowercase,
    numbers,
    special,

    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,

    characterPool,
    entropy,

    score,
    strength,
  };
}