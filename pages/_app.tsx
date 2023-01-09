import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

export default function App({
  Component,
  pageProps: { topbarTransparent, ...pageProps },
}: AppProps) {
  return (
    <Layout topbarTransparent={topbarTransparent}>
      <Component {...pageProps} />
    </Layout>
  );
}
