import axios from "axios";

const putRequest = (
  url,
  requestId,
  data,
  resetForm,
  setListChange,
  setErrorFlag,
  setCheckStats,
  setError // Yeni parametre
) => {
  axios
    .put(url + "/" + requestId, data)
    .then((res) => {
      setErrorFlag(false);
      setListChange(true); // Listeyi güncelle
      resetForm(); // Formu sıfırla
      setCheckStats("Updated");
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
export default putRequest;
