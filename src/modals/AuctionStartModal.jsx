import { useState } from "react";
import React from "react";
import { Modal } from "react-bootstrap";

const AuctionStartModal = ({ show, onHide, startAuction }) => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    startPrice: "",
    endDate: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleStartAuction = () => {
    const endDateInSeconds = Math.floor(
      new Date(details.endDate).getTime() / 1000
    );
    const auctionDetails = {
      ...details,
      endDate: endDateInSeconds,
    };
    startAuction(auctionDetails);

    setDetails({
      title: "",
      description: "",
      startPrice: "",
      endDate: "",
      image: "",
    });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Auction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={details.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={details.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startPrice" className="form-label">
              Start Price
            </label>
            <input
              type="number"
              className="form-control"
              id="startPrice"
              name="startPrice"
              value={details.startPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="endDate"
              name="endDate"
              min={new Date().toISOString().slice(0, -8)}
              value={details.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={details.image}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setDetails({
              title: "",
              description: "",
              startPrice: "",
              endDate: "",
              image: "",
            });

            onHide();
          }}
        >
          Cancel
        </button>
        <button
          disabled={
            !details.title ||
            !details.description ||
            !details.startPrice ||
            !details.endDate
          }
          className="btn btn-primary"
          onClick={handleStartAuction}
        >
          Start Auction
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuctionStartModal;
