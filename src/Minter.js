import { useEffect, useState } from "react";
import { connectWallet , getCurrentWalletConnected , mintNFT , transferNFT} from "./utils/interact";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  // const [description, setDescription] = useState("");

 
  useEffect(async () => { //TODO: implement
    const {address,status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
    setStatus(walletResponse.status);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const onMintPressed = async () => { //TODO: implement
    const {status} = await mintNFT();
    setStatus(status);
  };
  const onTransferPressed = async () => { //TODO: implement
    const {status} = await transferNFT(tokenId,sendAddress);
    setStatus(status);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title"> NFT Minter</h1>
      <p>
        Press "Mint" to mint a token. Enter tokenID to transfer.
      </p>
      
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <form>
        <h2> Token ID: </h2>
        <input
          type="text"
          placeholder="uint256"
          onChange={(event) => setTokenId(event.target.value)}
        />
        <h2> Address </h2>
        <input
          type="text"
          placeholder="0x0"
          onChange={(event) => setSendAddress(event.target.value)}
        />
        {/* <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        /> */
        }
      </form>
      <button id="mintButton" onClick={onTransferPressed}>
        Transfer
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
