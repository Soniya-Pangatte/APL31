import { UGFClient } from '@tychilabs/ugf-testnet-js';

const client = new UGFClient();

async function run() {
  try {
    const entry = await client.registry.getChainEntry('TYI_MOCK_USD', '84532');
    console.log('Chain entry:', JSON.stringify(entry, null, 2));
  } catch (err) {
    console.error('Error fetching chain entry:', err);
  }
}

run();
