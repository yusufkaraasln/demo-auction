import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./styles.css";
import Auction from "./components/Auction";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(localStorage.getItem("bird_auction_name"));

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(600);

  console.log(timeLeft);

  const [offer, setOffer] = useState("");
  const [auctionDetails, setAuctionDetails] = useState({});

  useEffect(() => {
    const socket = io("https://acuction-api-demo.vercel.app/", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    const onConnected = () => setIsConnected(true);
    const onDisconnected = () => setIsConnected(false);
    const onMessages = (msgs) => setMessages(msgs);

    const onOffer = (offer) => setOffer(offer);
    const onLogs = (logs) => setLogs(logs);
    const onAuctionDetails = (details) => setAuctionDetails(details);

    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnected);
    socket.on("messages", onMessages);
    socket.on("offer", onOffer);
    socket.on("logs", onLogs);
    socket.on("auction_details", onAuctionDetails);

    socket.on("timeUpdate", (newTimeLeft) => {
      setTimeLeft(newTimeLeft);
    });

    if (user) {
      socket.emit("login", user);
    }

    return () => {
      socket.off("connect", onConnected);
      socket.off("disconnect", onDisconnected);
      socket.off("messages", onMessages);
      socket.off("offer", onOffer);
      socket.off("logs", onLogs);
      socket.off("is_finished_auction");
      socket.off("timeUpdate");
      socket.off("auction_details", onAuctionDetails);

      socket.close();
    };
  }, [user]);

  const sendOffer = () => {
    if (inputValue.trim() && socketRef.current) {
      socketRef.current.emit("offer", inputValue);
      setInputValue("");
    }
  };

  const finishAuction = () => {
    socketRef.current.emit("is_finished_auction", true);
  };

  const startAuction = (details) => {
    socketRef.current.emit("start_auction", details);
  };

  console.log(messages);

  return (
    <>
      {user ? (
        <Auction
          socketRef={socketRef}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          sendOffer={sendOffer}
          finishAuction={finishAuction}
          timeLeft={timeLeft}
          auctionDetails={auctionDetails}
          startAuction={startAuction}
          offer={offer}
        ></Auction>
      ) : (
        <Login user={user} setUser={setUser}></Login>
      )}
    </>
  );
}

export default App;
