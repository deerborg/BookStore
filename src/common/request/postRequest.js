import axios from "axios";

const postRequest = (
  url,
  data,
  resetForm,
  setListChange,
  setErrorFlag,
  setCheckStats,
  setError,
  setLoad,
  setBtnFlag
) => {
  setBtnFlag(true);
  setLoad(true);
  axios
    .post(url, data)
    .then((res) => {
      setErrorFlag(false);
      setListChange(true); // Listeyi güncelle
      resetForm(); // Formu sıfırla
      setLoad(false);
      setBtnFlag(false);
      setCheckStats("Created");
      setTimeout(() => {
        setCheckStats("");
      }, 2000);
    })
    .catch((e) => {
      if (e.code === "ERR_NETWORK") {
        const err = ["Server Down"];
        setError(err); // Hata mesajı güncelleme
        setLoad(false);
        setBtnFlag(false);
      } else {
        const err = ["Bad Request. Contact a developer."];
        setError(err); // Hata mesajı güncelleme
        setLoad(false);
        setBtnFlag(false);
        setTimeout(() => {
          const err = [""];
          setError(err);
        }, 2000);
      }
    })
    .finally(setListChange(false));
};
export default postRequest;
