interface DfxManifest {
  tags: {
    latest: string;
  };
  versions: string[];
}

type DfxCanisterType = 'motoko' | 'rust';

interface DfxJson {
  canisters: Record<
    string,
    {
      type: 'custom' | 'motoko' | 'assets' | 'rust';
      candid?: string;
      wasm?: string;
      build?: string;
      remote?: {
        candid: string;
        id: {
          ic: string;
        };
      };
    }
  >;
}
