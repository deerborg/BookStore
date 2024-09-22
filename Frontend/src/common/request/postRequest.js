import axios from "axios";

const postRequest = (
  url,
  data,
  resetForm,
  setListChange,
  setErrorFlag,
  setCheckStats,
  setError // Yeni parametre
) => {
  axios
    .post(url, data)
    .then((res) => {
      setErrorFlag(false);
      setListChange(true); // Listeyi güncelle
      resetForm(); // Formu sıfırla
      setCheckStats("Created");
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
export default postRequest;
