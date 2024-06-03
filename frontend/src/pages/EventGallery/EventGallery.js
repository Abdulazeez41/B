import React, { useState, useEffect } from "react";
import { events } from "../../data";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { getAllEvents } from "../MyTicket/ticketApi";

import logo from "../../assets/logos/logo.png";

let eventData = events;
console.log(eventData)
const EventGallery = () => {
  const [events, setEvents] = useState([]);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //   useEffect(() => {
  //     // Fetch the events from an API or service
  //     // This is a placeholder for now
  //     setEvents(eventData);
  //   }, []);

  // Function to transform raw events data
  const transformEvent = (event) => {
    return {
      organizer: event[0],
      metadata: event[1],
      category: event[2],
      blockPassId: event[3],
      passesSold: event[4],
      max_passes: event[5],
      passPrice: event[6],
      startTime: event[7],
      salesEndTime: event[8],
      bpEnded: event[9]
    };
  };

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

    const fetchEvents = () => {
      getAllEvents()
        .then((events) => {
          if (events) {
            const transformedEvents = events.map((event) => transformEvent(event));
            setEvents(transformedEvents);
          } else {
            console.error("No events returned from getAllEvents");
          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };

    loadWeb3();
    fetchEvents();
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


  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <nav className="container flex justify-between mx-auto items-center px-8 py-4">
        {/* Logo and Brand Name */}
        <Link to="/">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Bpass Logo"
              className="h-8 mr-2 text-blue-500 "
            />
            <span className="text-black font-semibold text-lg">
              B<span className="text-[#F5167E]">Pass</span>{" "}
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
          <a
            href="#!"
            className="text-black hover:text-[#F5167E]  transition-colors duration-200"
          >
            All Events
          </a>

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
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          EVENTS GALLERY
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl w-auto h-auto overflow-hidden shadow-lg"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex p-4">
                <div className="flex-none mr-5 align-middle items-center ">
                  <p className="text-gray-500 font-semibold">
                    {formatDate(event.date).split(" ")[0]}
                  </p>
                  <p className="text-black text-3xl font-bold">
                    {formatDate(event.date).split(" ")[1]}
                  </p>
                </div>
                <div className="flex-grow text-center flex flex-col justify-center">
                  <h3 className="text-sm text-start font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 text-start  text-xs">
                    {event.description}
                  </p>
                  <p className="text-gray-700 text-start mt-2  text-xs">
                    📍{event.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default EventGallery;
