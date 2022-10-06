// const express = require("express");

// const { OAuth } = require("./common/oauth");

// let router = express.Router();
// const config = require("../config");

// // Endpoint to return a 3-legged access token
// router.get("/callback/oauth", async (req, res, next) => {
//   const { code } = req.query;
//   const oauth = new OAuth(req.session);
//   try {
//     await oauth.setCode(code);
//     res.redirect("/");
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/oauth/url", (req, res) => {
//   try {
//     const url =
//       "https://developer.api.autodesk.com" +
//       "/authentication/v1/authorize?response_type=code" +
//       "&client_id=" +
//       config.credentials.client_id +
//       "&redirect_uri=" +
//       config.credentials.callback_url +
//       "&scope=" +
//       config.scopes.internal.join(" ");
//     res.end(url);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/oauth/signout", (req, res) => {
//   req.session = null;
//   res.redirect("/");
// });

// // Endpoint to return a 2-legged access token
// // GET /api/forge/oauth/token - generates a public access token (required by the Forge viewer).
// router.get("/token", async (req, res, next) => {
//   try {
//     const token = await new OAuth().getPublicToken();
//     res.status(200).json({
//       access_token: token.access_token,
//       expires_in: token.expires_in,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("lỗi");
//   }
// });

// module.exports = router;

const express = require("express");

const { getPublicToken } = require("./common/oauth");

let router = express.Router();

// GET /api/forge/oauth/token - generates a public access token (required by the Forge viewer).
router.get("/token", async (req, res, next) => {
  try {
    const token = await getPublicToken();
    res.json({
      access_token: token.access_token,
      expires_in: token.expires_in,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
