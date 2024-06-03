import React, { useState, useEffect } from "react";
// Assume you have a function to check if the wallet is connected and to fetch tickets
// import { isWalletConnected, fetchUserTickets } from "./ticketApi";
import { Link } from "react-router-dom";
import Web3 from "web3";

import logo from "../../assets/logos/logo.png";

const MyTickets = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   const checkWalletConnection = async () => {
  //     //   const connected = await isWalletConnected();
  //     //   setWalletConnected(connected);
  //     //   if (connected) {
  //     //     const userTickets = await fetchUserTickets(); // Fetch the tickets for the current user
  //     //     setTickets(userTickets);
  //     //   }
  //   };

  //   checkWalletConnection();
  // }, []);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          await setScrollSepoliaNetwork(web3);
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccountAddress(accounts[0]);
          }
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("MetaMask is not installed");
      }
    };

    loadWeb3();
  }, []);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await setScrollSepoliaNetwork(web3);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
        }
      } catch (error) {
        console.error("User denied account access");
      } finally {
        setIsConnecting(false);
        console.log(accountAddress);
      }
    } else {
      console.error("MetaMask is not installed");
      setIsConnecting(false);
    }
  };

  const setScrollSepoliaNetwork = async (web3) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x8274F", // Scroll Sepolia chain ID
            chainName: "Scroll Sepolia",
            nativeCurrency: {
              name: "Sepolia Ether",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"],
            blockExplorerUrls: ["https://sepolia.scrollscan.dev"],
          },
        ],
      });
    } catch (addError) {
      console.error(
        "Error adding Scroll Sepolia network to MetaMask:",
        addError
      );
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatAddress = (address) => {
    if (address.length > 0) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return "";
  };

  return (
    <>
      <nav className="container flex justify-between mx-auto items-center px-8 py-4">
        {/* Logo and Brand Name */}
        <Link to="/">
          <div className="flex items-center">
            <img src={logo} alt="Bpass Logo" className="h-8 mr-2 " />
            <span className="text-black font-semibold text-lg">
              Block<span className="text-[#F5167E]">Pass</span>{" "}
            </span>
          </div>
        </Link>
        <div className="hidden items-center md:flex space-x-6">
        <Link
          to="/"
          className="text-black hover:text-[#F5167E]  transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="text-black hover:text-[#F5167E]  transition-colors duration-200"
        >
          Create
        </Link>
        <Link
          to={"/gallery"}
          className="text-black hover:text-[#F5167E]  transition-colors duration-200"
        >
          Gallery
        </Link>
          <Link
            to={"/my-tickets"}
            className="text-black hover:text-[#F5167E] transition-colors duration-200"
          >
            My tickets
          </Link>

          {/* Connect Button */}
          <button
          onClick={connectMetaMask}
          className="block md:inline-block text-white bg-purple-800/30 hover:bg-purple-900 px-4 py-2 rounded-full transition-colors duration-200 ring-2 ring-white ring-opacity-50 hover:ring-opacity-75"
          disabled={isConnecting}
        >
          {isConnecting
            ? "Connecting..."
            : accountAddress
            ? formatAddress(accountAddress)
            : "Connect"}
        </button>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto my-10 p-8 ">
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">MY TICKETS</h2>
        <p className="mb-4 italic text-gray-700 text-sm">
          To view NFT on other networks, switch connected network
        </p>
        {walletConnected ? (
          <div className="bg-pink-100 p-4 rounded-md text-center">
            <p className="text-lg text-red-600 mb-3">Wallet not connected!</p>
            <p>You must connect to metamask to access this page.</p>
            <button
              className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              // Implement wallet connect functionality
              // onClick={/* Function to connect wallet */}
            >
              Connect
            </button>
          </div>
        ) : (
          <div>
            {tickets.length === 0 ? (
              <p className="text-center my-10">Wow, so much empty!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    {/* Display ticket details here */}
                    <h3 className="text-lg font-bold">{ticket.eventName}</h3>
                    <p>Date: {ticket.date}</p>
                    <p>Location: {ticket.location}</p>
                    {/* Add more details as needed */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MyTickets;
