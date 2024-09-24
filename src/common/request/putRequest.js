import axios from "axios";

const putRequest = (
  url,
  requestId,
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
    .put(url + "/" + requestId, data)
    .then((res) => {
      setErrorFlag(false);
      setListChange(true);
      resetForm();
      setCheckStats("Updated");
      setLoad(false);
      setBtnFlag(false);
      setTimeout(() => {
        setCheckStats("");
      }, 2000);
    })
    .catch((e) => {
      if (e.code === "ERR_NETWORK") {
        const err = ["Server Down"];
        setError(err);
        setLoad(false);
        setBtnFlag(false);
      } else {
        const err = ["Bad Request. Contact a developer."];
        setError(err);
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
export default putRequest;
