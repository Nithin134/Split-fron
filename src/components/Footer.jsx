import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div>Customer Support: support@roomexpense.com</div>
      <div>© 2024 Room Expense Splitter</div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#004080",
    color: "white",
    padding: 15,
    textAlign: "center",
    flexShrink: 0,
  },
};
