import axios from "axios";

const deleteRequest = (
  requestId,
  url,
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
    .delete(url + "/" + requestId)
    .then((res) => {
      setErrorFlag(false);
      setListChange(true);
      resetForm();
      setCheckStats("Deleted");
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
      }
    })
    .finally(setListChange(false));
};
export default deleteRequest;
