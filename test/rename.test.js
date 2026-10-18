import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
// @req integration/github-action
test("rename: Janus of Agents package with specgate commands kept as aliases", () => {
    assert.equal(pkg.name, "@kurtfrancisco/janus");
    assert.equal(pkg.bin.janus, pkg.bin.specgate);
    assert.equal(pkg.bin["janus-mcp"], pkg.bin["specgate-mcp"]);
    const r = spawnSync(process.execPath, [join(root, "dist", "src", "cli.js"), "--help"], { encoding: "utf8" });
    assert.match(r.stdout + r.stderr, /Janus of Agents/);
});
