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

      setStatus(""); // Sunucu açıldığında metni temizle
    } catch (error) {
      setIsServerOnline(false);
      setStatus(
        "The server is sleeping, please wait. If it takes a long time, please contact me (Furkan Aydemir)."
      );
    }
  };

  useEffect(() => {
    // İlk yüklemede ve belirli aralıklarla sunucu durumunu kontrol et
    const intervalId = setInterval(checkServerStatus, 5000); // 5 saniyede bir kontrol et

    // İlk kontrol
    checkServerStatus();

    // Bileşen unmount olduğunda zamanlayıcıyı temizle
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {!isServerOnline && (
        <div className="server-status-container">
          <div className="server-status-card">
            <h1>{status}</h1>
            <h2>Trying to wake up ..</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default ServerStatus;
