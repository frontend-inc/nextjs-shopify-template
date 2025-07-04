import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    rules: {
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
];

const processedConfig = eslintConfig.map(config => {
  if (config.rules) {
    const processedRules = {};
    for (const [ruleName, ruleConfig] of Object.entries(config.rules)) {
      if (ruleConfig === "error" || ruleConfig === 2) {
        processedRules[ruleName] = "warn";
      } else if (Array.isArray(ruleConfig) && (ruleConfig[0] === "error" || ruleConfig[0] === 2)) {
        processedRules[ruleName] = ["warn", ...ruleConfig.slice(1)];
      } else {
        processedRules[ruleName] = ruleConfig;
      }
    }
    return { ...config, rules: processedRules };
  }
  return config;
});

export default processedConfig;
