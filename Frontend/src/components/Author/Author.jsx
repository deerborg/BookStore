import { useEffect, useState } from "react";
import axios from "axios";
const Auhtor = () => {
  // State başı
  const [error, setError] = useState([]); // Valid sonrası oluşan excepitonlar listesi
  const [errorMsg, setErrorMsg] = useState([]); // Mesajların listeye dahili
  const [errorFlag, setErrorFlag] = useState(false); // Hata durumu kontrolü
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  }); // Kayıt için field
  const [updateAuthor, setUpdateAuthor] = useState({
    id: "",
    name: "",
    birthDate: "",
    country: "",
  }); // Güncelleme için filed
  const [authors, setAuthors] = useState([]); // YAzar listesi
  const [authorListChange, setAuthorListChange] = useState(false); // Yazar listesi güncellenme kontrolü
  const [showAuthors, setShowAuthors] = useState(false); // Yazar listesi gizle göster
  const [shotAuthorsBtnName, setShowAuthorsBtnName] =
    useState("Show All Authors"); // Yazar listesi duruma göre isim değişimi
  const [checkStats, setCheckStats] = useState(""); // Başarılı işlemler için
  // State sonu

  // Kayıt için standart şablon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });
  };

  const handleUpdateAuthor = () => {};

  // Yazar kaydı isteği
  const handleSaveAuthor = () => {
    axios
      .post("http://localhost:8080/author/create-author", author)
      .then((res) => {
        setErrorFlag(false);
        setAuthorListChange(true);
        setAuthor({
          name: "",
          birthDate: "",
          country: "",
        });
        setCheckStats("Created");
        function clearStats() {
          setTimeout(() => {
            setCheckStats("");
          }, 2000);
        }
        clearStats();
      })
      .catch((e) => {
        console.log(e);
        if (e.code === "ERR_NETWORK") {
          // Sunucu bağlantısı kopar ise
          const err = ["Server Down"];
          setError(err);
        } else {
          setError(e.response.data);
        }
      })
      .finally(setAuthorListChange(false));
  };

  // Backendden gelen exceptionları diziye aktarma
  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  // Aktif listenin kayıt ve silme isteklerinden sonra yenilenmesi için
  useEffect(() => {
    axios.get("http://localhost:8080/author/get-all-authors").then((res) => {
      setAuthors(res.data);
    });
  }, [authorListChange]);

  // Yazarları listeleme butonu için
  const handeShowAuthors = () => {
    if (showAuthors) {
      setShowAuthorsBtnName("Show All Authors");
      return setShowAuthors(false);
    }
    setShowAuthorsBtnName("Hidden List");
    return setShowAuthors(true);
  };

  // Yazar silme isteği
  const handleDeleteAuthor = (id) => {
    axios
      .delete("http://localhost:8080/author/" + id)
      .then((res) => {
        setAuthorListChange(true);
        setCheckStats("Deleted");
        function clearStats() {
          setTimeout(() => {
            setCheckStats("");
          }, 2000);
        }
        clearStats();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(setAuthorListChange(false));
  };

  return (
    <>
      <div className="author-submit">
        <h3 className="auth-stats-for-submit">{checkStats}</h3>
        <div className="author-inputs">
          <input
            name="name"
            placeholder="Author Name"
            required
            type="text"
            value={author.name}
            onChange={handleChange}
          />

          <input
            name="birthDate"
            placeholder="Author Birth Date"
            required
            type="date"
            value={author.birthDate}
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Author Country"
            required
            type="text"
            value={author.country}
            onChange={handleChange}
          />
        </div>
        <button className="author-submit-btn" onClick={handleSaveAuthor}>
          Create Author
        </button>
        {errorFlag && (
          <div className="author-error-msg">
            {errorFlag &&
              errorMsg.map((e) => {
                return (
                  <>
                    <h1>{e}</h1>
                  </>
                );
              })}
          </div>
        )}
        <button onClick={handeShowAuthors} className="show-authors-btn">
          {shotAuthorsBtnName}
        </button>
      </div>
      {showAuthors && (
        <div className="author-list">
          {authors.map((a) => {
            return (
              <>
                <div className="author-list-lable">
                  <h3>Author Name: {a.name}</h3>
                  <h3>Author Birthday: {a.birthDate}</h3>
                  <h3>Author Country: {a.country}</h3>
                  {a.books.map((b) => {
                    return <h3>Books: {b}</h3>;
                  })}
                  <button
                    onClick={(e) => {
                      handleDeleteAuthor(a.id);
                    }}
                    className="delete-auhtor-btn"
                  >
                    Delete
                  </button>
                  <button className="update-author-btn">Update</button>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Auhtor;
