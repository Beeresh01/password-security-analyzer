# 🔐 Password Security Analyzer

A privacy-focused, client-side web application that analyzes password strength, detects common security patterns, calculates a security score, estimates entropy, and generates secure passwords.

> 🔒 **Your password never leaves your browser.**

The entire analysis is performed locally on the user's device. No backend server, database, or external password-analysis API is required.

---

## 🚀 Live Demo

👉 **[Open Password Security Analyzer](https://beeresh01.github.io/password-security-analyzer/)**

Try the application directly in your browser.

---

## 📌 About the Project

Password Security Analyzer is a frontend security project designed to help users understand the strength and characteristics of their passwords.

The application evaluates a password using multiple security-related factors such as:

- Password length
- Uppercase characters
- Lowercase characters
- Numbers
- Special characters
- Common password patterns
- Sequential characters
- Repeated characters
- Repeated patterns
- Keyboard patterns
- Common character substitutions
- Estimated entropy

It also provides a **0–100 security score**, detailed warnings, character analysis, and a secure password generator.

The project was built as a practical application of frontend development, TypeScript, browser APIs, password-security concepts, and responsive UI design.

---

## ✨ Features

### 🔐 Password Strength Analysis

Analyze a password in real time and receive a strength classification:

- Very Weak
- Weak
- Moderate
- Strong
- Very Strong

The analysis considers multiple password characteristics rather than relying only on password length.

---

### 📊 Security Score

The application calculates a security score from:

```text
0 – 100