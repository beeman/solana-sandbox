import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { tx } from './tx';

describe('tx', () => {
  it('should work', () => {
    expect(tx()).toEqual('tx');
    const sender = Keypair.fromSeed(Uint8Array.from(Array(32).fill(8))); // Arbitrary known account
    const recentBlockhash = 'EETubP5AKHgjPAhzPAFcb8BAY1hMH639CWCFTqi3hq1k'; // Arbitrary known recentBlockhash
    const recipient = new PublicKey(
      'J3dxNj7nDRRqRRXuEMynDG57DkZK4jYRuv3Garmb1i99'
    ); // Arbitrary known public key
    const transfer = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient,
      lamports: 49,
    });
    const expectedTransaction = new Transaction({
      blockhash: recentBlockhash,
      feePayer: sender.publicKey,
      lastValidBlockHeight: 9999,
    }).add(transfer);
    expectedTransaction.sign(sender);

    const serializedTransaction = expectedTransaction.serialize();
    const deserializedTransaction = Transaction.from(serializedTransaction);

    expect(expectedTransaction.serialize()).toEqual(serializedTransaction);
    expect(deserializedTransaction.recentBlockhash).toEqual(recentBlockhash);
    expect(deserializedTransaction.lastValidBlockHeight).toEqual(9999);
  });
});
