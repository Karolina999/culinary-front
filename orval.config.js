// orval.config.js
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
module.exports = {
  api: {
    input: "https://localhost:7193/swagger/v1/swagger.json",
    output: {
      target: "./api/generated-api.ts",
      mode: "tags-split",
    },
  },
};

// module.exports = {
//   api: {
//     input: "https://localhost:7193/swagger/v1/swagger.json",
//     output: "./api/generated-api.ts",
//   },
// };

// module.exports = {
//   alternativeTo: {
//     output: {
//       schemas: "./types/api",
//     },
//     input: {
//       target: "https://localhost:7193/swagger/v1/swagger.json",
//       //   prettier: true,
//     },
//     // hooks: {
//     //   afterAllFilesWrite: "prettier --write",
//     // },
//   },
// };
