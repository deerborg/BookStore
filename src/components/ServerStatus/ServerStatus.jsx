import axios from "axios";
import { useEffect, useState } from "react";
import authorBaseUrl from "../../api/authorApi";

const ServerStatus = () => {
  const [status, setStatus] = useState("loading server...");
  const [statusCounter, setStatusCounter] = useState();
  const [isServerOnline, setIsServerOnline] = useState(false);

  const checkServerStatus = async () => {
    try {
      await axios.get(authorBaseUrl.baseUrl);
      setIsServerOnline(true);

      setStatus("");
    } catch (error) {
      setIsServerOnline(false);
      setStatus(
        "The server is sleeping, please wait. If it takes a long time, please contact me (Furkan Aydemir)."
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkServerStatus, 5000);

    checkServerStatus();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {!isServerOnline && (
        <div className="server-status-container">
          <div className="server-status-card">
            <h1>{status}</h1>
            <div class="loader"></div>
            <h2>Trying to wake up ..</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default ServerStatus;
