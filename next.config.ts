import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const nextConfig: NextConfig = {
  server: {
    https: {
      key: fs.readFileSync(path.join(process.cwd(), "certs", "private.key")),
      cert: fs.readFileSync(
        path.join(process.cwd(), "certs", "certificate.crt")
      ),
    },
  },
};

export default nextConfig;
