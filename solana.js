const web3 = require("@solana/web3.js");

const getWalletBalance = async (publicKey) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const walletBalance = await connection.getBalance(
      new web3.PublicKey(publicKey)
    );
    return walletBalance / web3.LAMPORTS_PER_SOL;
  } catch (error) {
    console.log(error);
  }
};

const airDropSol = async (wallet, transferAmount) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const fromAirDropSignature = await connection.requestAirdrop(
      new web3.PublicKey(wallet.publicKey.toString()),
      web3.LAMPORTS_PER_SOL * transferAmount
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (error) {
    console.log(error);
  }
};

const transferSOL = async (
  fromWalletInstance,
  toWalletInstance,
  transferAmount
) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(fromWalletInstance.publicKey.toString()),
        toPubkey: new web3.PublicKey(toWalletInstance.publicKey.toString()),
        lamports: transferAmount * web3.LAMPORTS_PER_SOL,
      })
    );
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWalletInstance]
    );
    return signature;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWalletBalance,
  airDropSol,
  transferSOL,
};
