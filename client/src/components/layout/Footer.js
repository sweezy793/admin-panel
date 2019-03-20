import React from "react";

const fstyle = {
  position: "absolute",
  left: "0",
  bottom: "0",
  right: "0"
};

export default function Footer() {
  return (
    <footer
      style={fstyle}
      className="bg-primary text-white mt-5 p-4 text-center"
    >
      Sarthak Sarangi @ 2019
    </footer>
  );
}
