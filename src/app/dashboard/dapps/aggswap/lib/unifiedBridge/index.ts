import { execFile } from "node:child_process";
import { resolve } from "node:path";

const scriptsDir = resolve(process.cwd(), "src/app/dashboard/dapps/aggswap/unified-bridge-scripts/scripts");

/**
 * Spawn one of the reference bridge scripts with Node.
 * @param scriptName e.g. "bridge_asset.js" | "bridge_and_call.js"
 * @param args Extra CLI args (optional)
 */
export function runBridgeScript(scriptName: string, args: string[] = []) {
  return new Promise<{ stdout: string; stderr: string }>((res, rej) => {
    execFile("node", [resolve(scriptsDir, scriptName), ...args], (err, stdout, stderr) => {
      if (err) return rej(err);
      res({ stdout: stdout.toString(), stderr: stderr.toString() });
    });
  });
}