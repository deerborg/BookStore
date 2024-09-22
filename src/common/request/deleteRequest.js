import axios from "axios";

const deleteRequest = (
  requestId,
  url,
  resetForm,
  setListChange,
  setErrorFlag,
  setCheckStats,
  setError // Yeni parametre
) => {
  axios
    .delete(url + "/" + requestId)
    .then((res) => {
      setErrorFlag(false);
      setListChange(true); // Listeyi güncelle
      resetForm(); // Formu sıfırla
      setCheckStats("Deleted");
      setTimeout(() => {
        setCheckStats("");
      }, 2000);
    })
    .catch((e) => {
      if (e.code === "ERR_NETWORK") {
        const err = ["Server Down"];
        setError(err); // Hata mesajı güncelleme
      } else {
        const err = ["Bad Request. Contact a developer."];
        setError(err); // Hata mesajı güncelleme
      }
    })
    .finally(setListChange(false)); // Liste güncelleme işlemini kapat
};
export default deleteRequest;
