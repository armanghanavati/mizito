import React from "react";

const Loading = ({ title = "", isLoading = true }) => {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 999999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: isLoading ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    pointerEvents: isLoading ? "auto" : "none",
  };

  return (
    <div style={overlayStyle}>
      <div className="rounded-4 loading-container">
        <div
          className="loading-bar d-flex shadow"
          style={{ background: "#21252926" }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default Loading;
