/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/components/**/*.stories.ts'],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  staticDirs: [
    {
      from: '../node_modules/@webcomponents/webcomponentsjs',
      to: '/webcomponentsjs',
    },
  ],
  webpackFinal: async (config) => {
    // Exclude .component.html and .component.css from all existing rules
    config.module.rules.forEach((rule) => {
      if (rule.test) {
        const testStr = rule.test.toString();
        // Exclude component files from html loaders
        if (testStr.includes('html')) {
          rule.exclude = rule.exclude
            ? [].concat(rule.exclude, /\.component\.html$/)
            : /\.component\.html$/;
        }
        // Exclude component CSS from default CSS handling
        if (testStr.includes('css')) {
          rule.exclude = rule.exclude
            ? [].concat(rule.exclude, /\.component\.css$/)
            : /\.component\.css$/;
        }
      }
    });

    // Add loaders for HTML and CSS as raw strings using raw-loader (at the start for priority)
    config.module.rules.unshift({
      test: /\.component\.html$/,
      type: 'asset/source',
    });

    config.module.rules.unshift({
      test: /\.component\.css$/,
      type: 'asset/source',
    });

    // Add TypeScript support
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};

export default config;
