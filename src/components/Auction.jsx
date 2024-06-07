import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AuctionStartModal from "../modals/AuctionStartModal";

const Auction = ({
  sendOffer,
  offer,
  setInputValue,
  inputValue,
  finishAuction,
  messages,
  auctionDetails,
  startAuction,
  timeLeft,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatTime = (seconds) => {
    const weeks = Math.floor(seconds / 604800);
    const days = Math.floor((seconds % 604800) / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${weeks}w ${days}d ${hours}h ${minutes}m ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}s`;
  };

  const isAdmin =
    localStorage.getItem("bird_auction_name") == "Admin" ||
    localStorage.getItem("bird_auction_name") == "admin";

  const [show, setShow] = useState(false);

  return (
    <>
      <div
        style={{
          filter: timeLeft == 0 && !isAdmin ? "blur(20px)" : "",
          transition: "filter 0.5s ease-in-out",
        }}
      >
        <AuctionStartModal
          startAuction={startAuction}
          onHide={() => setShow(false)}
          show={show}
        ></AuctionStartModal>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#!">
              Auction Demo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#!">
                    {localStorage.getItem("bird_auction_name")}
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <button
                  onClick={() => localStorage.removeItem("bird_auction_name")}
                  className="btn btn-outline-dark"
                  type="submit"
                >
                  <i className="bi-cart-fill me-1" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </nav>
        {/* Product section*/}

        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-3">
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={
                    auctionDetails?.image ||
                    "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJpcmR8ZW58MHx8MHx8fDA%3D"
                  }
                  alt="..."
                />
              </div>
              <div className="col-md-5">
                <h1 className="display-5 fw-bolder mb-5">
                  {auctionDetails?.title || "A Cute Bird"}
                </h1>
                <div
                  className="fs-5 mb-5"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    className="text-secondary"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Last Offer{" "}
                  </span>
                  <span
                    style={{ fontSize: "3rem", paddingLeft: "2rem" }}
                    className="text-success"
                  >
                    ${offer}
                  </span>
                </div>
                <p className="lead">
                  {auctionDetails?.description ||
                    ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium at dolorem quidem modi. Nam sequi consequatur
                  obcaecati excepturi alias magni, accusamus eius blanditiis
                  delectus ipsam minima ea iste laborum vero?`}
                </p>
                <div
                  style={{
                    display: isAdmin ? "none" : "flex",
                  }}
                >
                  <input
                    className="form-control text-center me-3"
                    id="inputQuantity"
                    type="number"
                    defaultValue={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ maxWidth: "10rem" }}
                  />
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={sendOffer}
                  >
                    <i className="bi-cart-fill me-1" />
                    Make a offer
                  </button>
                </div>
                <div
                  style={{
                    display: timeLeft == 0 && isAdmin ? "block" : "none",
                  }}
                  className="bg-success text-center py-2 text-white rounded-3"
                >
                  {messages.length ? (
                    <>
                      Auction winner is{" "}
                      <strong>
                        {messages[messages.length - 1]?.split("increased")[0]}
                      </strong>
                    </>
                  ) : (
                    "No bids yet"
                  )}
                </div>
                <div
                  onClick={finishAuction}
                  role="button"
                  style={{
                    display: isAdmin && timeLeft != 0 ? "block" : "none",
                  }}
                  className="bg-danger text-center py-2 text-white rounded-3 mt-3"
                >
                  Finish auction
                </div>
                <div
                  role="button"
                  onClick={() => setShow(true)}
                  style={{
                    display: isAdmin && timeLeft == 0 ? "block" : "none",
                  }}
                  className="bg-warning text-center py-2 text-dark rounded-3 mt-3"
                >
                  Start auction
                </div>
              </div>

              <div
                className="col-md-4
                d-flex align-items-center justify-content-center flex-column"
              >
                <span className="text-secondary d-block ">Auction ends in</span>
                <span className="fw-bold" style={{ fontSize: "2rem " }}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="col-md-12 d-flex flex-column px-5">
          <h2 className="mb-3">Bid History</h2>
          <div
            style={{
              overflowY: "scroll",
              height: "150px",
            }}
            className="d-flex flex-column align-items-start"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center py-2"
              >
                <span className="text-primary small fw-bold">
                  {message?.split("increased")[0]}
                  <span className="text-secondary fw-normal">
                    {message?.split("increased")[1]?.split("$")[0]}
                    <span className="text-success fw-bold">
                      {message?.split("from")[1]?.split("to")[0]}
                      
                      <span className="text-success">
                        <span className="text-secondary fw-normal">to</span>
                        {message?.split("from")[1]?.split("to")[1]}
                      </span>
                    </span>
                  </span>
                </span>

                <div ref={messagesEndRef} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
