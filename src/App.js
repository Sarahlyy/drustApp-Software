import { useState } from "react";
import "./App.css";
import verify from "./utils/verifier";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleVerifyClick = async () => {
    try {
      setLoading(true);
      // Pass username to the verify function
      const result = await verify(setLoading, username);
      setVerificationResult(result);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationResult("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Verify Username</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleInputChange}
        className="username-input"
        disabled={loading}
      />
      <button
        onClick={handleVerifyClick}
        className="verify-button"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
      {verificationResult && (
        <p className="verification-result">{verificationResult}</p>
      )}
    </div>
  );
}

export default App;
