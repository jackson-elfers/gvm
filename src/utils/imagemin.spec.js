const imagemin = require("./imagemin");
const assert = require("assert");
const check = require("check-types");
const fs = require("fs");
const path = require("path");

describe("src/utils/imagemin.js", () => {
  describe("imagemin", () => {
    it("accepts an input stream and compresses file", async () => {
      const file = await imagemin({
        input: fs.createReadStream(path.join(process.cwd(), "./public/images/test.jpg")),
        content_type: "image/jpeg"
      });
    });
  });
});
