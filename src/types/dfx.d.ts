interface DfxManifest {
  tags: {
    latest: string;
  };
  versions: string[];
}

type DfxCanisterType = 'motoko' | 'rust';
