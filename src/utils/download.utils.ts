import {get} from 'https';

export const downloadDfxManifest = async (): Promise<DfxManifest> => {
  const buffer: Buffer = await downloadFromURL(`https://sdk.dfinity.org/manifest.json`);

  const decoder = new TextDecoder('utf8');
  return JSON.parse(decoder.decode(buffer));
};

export const downloadFromURL = (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    get(url, async (res) => {
      if (res.statusCode !== undefined && [301, 302].includes(res.statusCode)) {
        await downloadFromURL(res.headers.location!).then(resolve, reject);
      }

      const data: any[] = [];

      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        resolve(Buffer.concat(data));
      });
      res.on('error', reject);
    });
  });
};
