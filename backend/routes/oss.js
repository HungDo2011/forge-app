const fs = require("fs");
const express = require("express");
const multer = require("multer");
const { BucketsApi, ObjectsApi, PostBucketsPayload } = require("forge-apis");

const { getClient, getInternalToken } = require("./common/oauth");
const config = require("../config");

let router = express.Router();

// Middleware for obtaining a token for each request.
router.use(async (req, res, next) => {
  const token = await getInternalToken();
  req.oauth_token = token;
  req.oauth_client = getClient();
  next();
});

// GET /api/forge/oss/buckets - expects a query param 'id'; if the param is '#' or empty,
// returns a JSON with list of buckets, otherwise returns a JSON with list of objects in bucket with given name.
router.get("/buckets", async (req, res, next) => {
  let bucket_name = req.query.id;
  // Retrieve up to 100 buckets from Forge using the [BucketsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/BucketsApi.md#getBuckets)
  // Note: if there's more buckets, you should call the getBucket method in a loop, providing different 'startAt' params
  const buckets = await new BucketsApi().getBuckets(
    { limit: 100 },
    req.oauth_client,
    req.oauth_token
  );

  if (!bucket_name || bucket_name === "#") {
    try {
      res.status(200).json(
        buckets.body.items.map((bucket) => {
          return {
            id: bucket.bucketKey,
            // Remove bucket key prefix that was added during bucket creation
            text: bucket.bucketKey.replace(
              config.credentials.client_id.toLowerCase() + "-",
              ""
            ),
            type: "bucket",
            children: [],
          };
        })
      );
    } catch (err) {
      next(err);
    }
  } else {
    try {
      // Retrieve up to 100 objects from Forge using the [ObjectsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/ObjectsApi.md#getObjects)
      // Note: if there's more objects in the bucket, you should call the getObjects method in a loop, providing different 'startAt' params
      const objects = await new ObjectsApi().getObjects(
        bucket_name,
        { limit: 100 },
        req.oauth_client,
        req.oauth_token
      );

      res.status(200).json(
        objects.body.items.map((object) => {
          return {
            parentId: object.bucketKey,
            id: Buffer.from(object.objectId).toString("base64"),
            text: object.objectKey,
            type: "object",
            children: false,
          };
        })
      );
    } catch (err) {
      next(err);
    }
  }
});

// POST /api/forge/oss/bucket - creates a new bucket.
// Request body must be a valid JSON in the form of { "bucketKey": "<new_bucket_name>" }.
router.post("/bucket", async (req, res, next) => {
  let payload = new PostBucketsPayload();
  payload.bucketKey =
    config.credentials.client_id.toLowerCase() + "-" + req.body.bucketKey;
  payload.policyKey = "persistent"; // Storage that persists until it’s deleted

  try {
    // Create a bucket using [BucketsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/BucketsApi.md#createBucket).
    await new BucketsApi().createBucket(
      payload,
      {},
      req.oauth_client,
      req.oauth_token
    );
    res.status(201).json("Successfully!");
  } catch (err) {
    next(err);
  }
});

//DELETE /api/forge/oss/buckets/:bucketKey - remove a bucket.

router.delete("/buckets/:bucketKey", async (req, res) => {
  try {
    await new BucketsApi().deleteBucket(
      req.params.bucketKey,
      req.oauth_client,
      req.oauth_token
    );
    res.status(200).json("Remove successfully!");
  } catch (err) {
    res.status(500).json("Failed!");
  }
});

// POST /api/forge/oss/objects - uploads new object to given bucket.
// Request body must be structured as 'form-data' dictionary
// with the uploaded file under "fileToUpload" key, and the bucket name under "bucketKey".
router.post(
  "/objects",
  multer({ dest: "uploads/" }).single("fileToUpload"),
  async (req, res, next) => {
    fs.readFile(req.file.path, async (err, data) => {
      if (err) {
        next(err);
      }
      try {
        // Upload an object to bucket using [ObjectsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/ObjectsApi.md#uploadObject).
        const object = await new ObjectsApi().uploadObject(
          req.body.bucketKey,
          req.file.originalname,
          data.length,
          data,
          {},
          req.oauth_client,
          req.oauth_token
        );
        res.status(200).json(object);
      } catch (err) {
        next(err);
      }
    });
  }
);

//DELETE /api/forge/oss/objects - remove object

router.delete("/objects", async (req, res, next) => {
  const bucketKey = req.query.bucketKey;
  const objectKey = req.query.objectKey;

  try {
    await new ObjectsApi().deleteObject(
      bucketKey,
      objectKey,
      req.oauth_client,
      req.oauth_token
    );
    res.status(200).json("Remove object successfully!");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
