export async function feachApi(url: string) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const res = await fetch(`https://localhost:7193/api${url}`);
  return res.json();
}
