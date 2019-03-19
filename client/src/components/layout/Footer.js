import React from "react";

const fstyle = {
  position: "absolute",
  left: "0",
  bottom: "0",
  right: "0"
};

export default function Footer() {
  return (
    <footer style={fstyle} className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Sarthak Sarangi
    </footer>
  );
}
