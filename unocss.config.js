// import presetWeapp from "unocss-preset-weapp";
// import { defineConfig, presetIcons } from "unocss";
// import {
//   transformerAttributify,
//   transformerClass,
// } from "unocss-preset-weapp/transformer";

// export default defineConfig({
//   presets: [
//     // https://github.com/MellowCo/unocss-preset-weapp
//     presetWeapp({
//       // h5兼容
//       platform: "uniapp",
//       isH5: process.env.UNI_PLATFORM === "h5",
//     }),
//     presetIcons(),
//   ],
//   rules: [],
//   shortcuts: [],
//   transformers: [
//     // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
//     transformerAttributify(),

//     // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
//     transformerClass(),
//   ],
// });

// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
