import {
  BuildType,
  HeaderList,
  OUTPUT_DIR,
} from "../../../src/types/package-config.ts";
import { runPackageAction } from "../../../src/commands/packages.ts";

import { resolve } from "node:path";
import { argv } from "node:process";

export const build = (cwd: string = process.cwd()): BuildType => {
  const INSTALL_DIR = resolve(cwd, OUTPUT_DIR);
  const STB_IMAGE_INSTALL = resolve(INSTALL_DIR, "stb-image");
  const STB_FONT_INSTALL = resolve(INSTALL_DIR, "stb-font");
  const STB_AUDIO_INSTALL = resolve(INSTALL_DIR, "stb-audio");

  const STB_IMAGE_INCLUDE = resolve(INSTALL_DIR, "stb-image", "include");
  const STB_FONT_INCLUDE = resolve(INSTALL_DIR, "stb-font", "include");
  const STB_AUDIO_INCLUDE = resolve(INSTALL_DIR, "stb-audio", "include");

  const stbLibs: HeaderList = {
    type: "headers",
    libs: {
      [STB_IMAGE_INSTALL]: [".codeframe/stb-image-config/lib.json"],
      [STB_FONT_INSTALL]: [".codeframe/stb-font-config/lib.json"],
      [STB_AUDIO_INSTALL]: [".codeframe/stb-audio-config/lib.json"],
      [STB_IMAGE_INCLUDE]: [
        "stb_image.h",
        "stb_image_write.h",
        "stb_image_resize2.h",
      ],
      [STB_FONT_INCLUDE]: ["stb_truetype.h", "stb_rect_pack.h"],
      [STB_AUDIO_INCLUDE]: ["stb_vorbis.c", "stb_hexwave.h"],
    },
  };

  return stbLibs satisfies BuildType;
};

const args = argv.slice(2);
const [action = "help"] = args;

await runPackageAction(action, process.cwd(), build());

// stb-image
//  - stb_image.h
//  - stb_image_write.h
//  - stb_image_resize2.h

// stb-font
// - stb_truetype.h
// - stb_rect_pack.h

// stb-audio
// Typical use: Ogg Vorbis decode + simple waveform synth.
// - stb_vorbis.c
// - stb_hexwave.h

// TODO
// stb-containers
// - stb_ds.h

// stb-printf
// - stb_sprintf.h

// stb-noise
// Typical use: terrain, textures, procedural gen.
// - stb_perlin.h

// stb-dxt
// Typical use: GPU texture compression tools.
// - stb_dxt.h

// stb-parse-lite
// Typical use: writing little DSLs/toy parsers and preprocessing.
// - stb_c_lexer.h
// - stb_include.h

// stb-tiles
// Typical use: tooling for tilemaps and procedural tiling.
// - stb_tilemap_editor.h
// - stb_herringbone_wang_tile.h

// TODO
// stb-util
// - stb_divide.h
// - stb_connected_components.h
// - stb_leakcheck.h
