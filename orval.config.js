process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = {
  api: {
    input: "https://localhost:7193/swagger/v1/swagger.json",
    output: {
      schemas: "./types",
    },
  },
};
