// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  stylistic.configs['recommended-flat'],
  stylistic.configs.customize({
    semi: true,
    arrowParens: false
  }),
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/require-await': 'off'
    }
  },
  {
    ignores: [
      '**/*.js',
    ]
  }
);