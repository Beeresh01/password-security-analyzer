const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

interface GeneratorOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function getRandomIndex(max: number): number {
  const randomArray = new Uint32Array(1);

  crypto.getRandomValues(randomArray);

  return randomArray[0] % max;
}

function getRandomCharacter(characters: string): string {
  return characters[getRandomIndex(characters.length)];
}

export function generatePassword({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
}: GeneratorOptions): string {
  let characterPool = "";

  const requiredCharacters: string[] = [];

  if (lowercase) {
    characterPool += LOWERCASE;
    requiredCharacters.push(getRandomCharacter(LOWERCASE));
  }

  if (uppercase) {
    characterPool += UPPERCASE;
    requiredCharacters.push(getRandomCharacter(UPPERCASE));
  }

  if (numbers) {
    characterPool += NUMBERS;
    requiredCharacters.push(getRandomCharacter(NUMBERS));
  }

  if (symbols) {
    characterPool += SYMBOLS;
    requiredCharacters.push(getRandomCharacter(SYMBOLS));
  }

  // If no character types are selected
  if (characterPool.length === 0) {
    return "";
  }

  const safeLength = Math.max(
    length,
    requiredCharacters.length
  );

  const passwordCharacters = [...requiredCharacters];

  while (passwordCharacters.length < safeLength) {
    passwordCharacters.push(
      getRandomCharacter(characterPool)
    );
  }

  // Fisher-Yates shuffle using cryptographic randomness
  for (
    let i = passwordCharacters.length - 1;
    i > 0;
    i--
  ) {
    const j = getRandomIndex(i + 1);

    [passwordCharacters[i], passwordCharacters[j]] = [
      passwordCharacters[j],
      passwordCharacters[i],
    ];
  }

  return passwordCharacters.join("");
}