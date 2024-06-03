/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import logo from "../../assets/logos/logo.png";

const NavBar = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


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
    <nav className="container flex justify-between lg:relative mx-auto items-center px-8 py-4">
      {/* Logo and Brand Name */}
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="Bpass Logo" className="h-8 mr-2" />
          <span className="text-white font-semibold text-lg">Bpass</span>
        </div>
      </Link>
      {/* Hamburger Button */}
      <button
        className="md:hidden text-white hover:text-[#F5167E] focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black/30 md:bg-transparent p-4 md:p-0 z-10`}
      >
        <Link
          to="/create"
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          Create
        </Link>
        <a
          href="#"
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          All Events
        </a>
        <Link
          to={"/gallery"}
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          Gallery
        </Link>
        <a
          href="#"
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          Contact
        </a>
        <Link
          to={"/my-tickets"}
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
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
  );
};

export default NavBar;
