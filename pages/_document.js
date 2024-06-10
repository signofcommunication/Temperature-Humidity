import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta
        name="format-detection"
        content="telephone=no, date=no, email=no, address=no"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
