const e=globalThis.OffscreenCanvas&&new OffscreenCanvas(1,1),s=e?.getContext("webgl2");s?self.postMessage({result:!0}):self.postMessage({result:!1});
