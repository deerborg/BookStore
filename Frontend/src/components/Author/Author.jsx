import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../api/categoryApi";
import publisherBaseUrl from "../../api/publisherApi";
import bookBaseUrl from "../../api/bookApi";
import authorBaseUrl from "../../api/authorApi";
import borrowBaseUrl from "../../api/borrowApi";
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
  const [createButtonVisible, setCreateButtonVisible] = useState(true); // Güncelleme işlemlerinde Yeni yazar oluştur butonunu gizler
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false); // Güncelleme işlemleri için İptal ve Kaydet butonlarını aktif eder
  // State sonu

  // Kayıt için standart şablon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });
    // Update içinde gerekli standart şablon
    setUpdateAuthor({
      ...updateAuthor,
      [name]: value,
    });
  };

  const handleUpdateAuthor = (id, name, birthDate, country) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updatedAuthor = {
      name: name,
      birthDate: birthDate,
      country: country,
    };

    setAuthor(updatedAuthor); // Formu doldurmak için
    setUpdateAuthor({
      id: id,
      ...updatedAuthor, // Update işlemi için
    });
  };

  const handleUpdateSaveClick = () => {
    // Boş  veya tanımlanmamış fieldlar için
    if (
      author.name === "" ||
      author.name === undefined ||
      author.birthDate === "" ||
      author.birthDate === undefined ||
      author.country === "" ||
      author.country === undefined
    ) {
      const emptyFieldErros = ["Empty Field"];
      const clearMsg = () =>
        setTimeout(() => {
          const clearError = []; // Dizi uzunluğu divin silinmesi için 1 den küçük olmalı
          setError(clearError);
          setErrorFlag(false);
        }, 2000);
      setError(emptyFieldErros);
      clearMsg();
    } else {
      axios
        .put(authorBaseUrl.baseUrl + "/" + updateAuthor.id, updateAuthor)
        .then((res) => {
          setErrorFlag(false);
          setAuthorListChange(true);
          setAuthor({
            name: "",
            birthDate: "",
            country: "",
          });
          setCheckStats("Updated");
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
            setError(["Bad Request"]);
          }
        })
        .finally(setAuthorListChange(false));
    }
  };

  // Yazar kaydı isteği
  const handleSaveAuthor = () => {
    // Boş  veya tanımlanmamış fieldlar için
    if (
      author.name === "" ||
      author.name === undefined ||
      author.birthDate === "" ||
      author.birthDate === undefined ||
      author.country === "" ||
      author.country === undefined
    ) {
      const emptyFieldErros = ["Empty Field"];
      const clearMsg = () =>
        setTimeout(() => {
          const clearError = []; // Dizi uzunluğu divin silinmesi için 1 den küçük olmalı
          setError(clearError);
          setErrorFlag(false);
        }, 2000);
      setError(emptyFieldErros);
      clearMsg();
    } else {
      axios
        .post(authorBaseUrl.baseUrl, author)
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
          if (e.code === "ERR_NETWORK") {
            // Sunucu bağlantısı kopar ise
            const err = ["Server Down"];
            setError(err);
          } else {
            const err = ["Bad Request. Contact a developer."];
            setError(err);
          }
        })
        .finally(setAuthorListChange(false));
    }
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
    axios.get(authorBaseUrl.baseUrl).then((res) => {
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
    console.log(id);
    axios
      .delete(authorBaseUrl.baseUrl + "/" + id)
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

  const handleCancelClick = () => {
    setAuthor({
      name: "",
      birthDate: "",
      country: "",
    });
    setUpdateButtonsVisible(false);
    setCreateButtonVisible(true);
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
        {createButtonVisible && (
          <button className="author-submit-btn" onClick={handleSaveAuthor}>
            Create Author
          </button>
        )}

        {updateButtonsVisible && (
          <>
            <div className="author-update-btns">
              <button
                onClick={handleUpdateSaveClick}
                className="author-submit-btn"
              >
                Save
              </button>
              <button onClick={handleCancelClick} className="author-submit-btn">
                Cancel
              </button>
            </div>
          </>
        )}

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
          {authors.map((auhtor) => {
            return (
              <>
                <div className="author-list-lable">
                  <h3>Author Name: {auhtor.name}</h3>
                  <h3>Author Birthday: {auhtor.birthDate}</h3>
                  <h3>Author Country: {auhtor.country}</h3>
                  {/* {auhtor.books.map((b) => {
                    return <h3>Books: {b}</h3>;
                  })} */}
                  <button
                    onClick={(e) => {
                      handleDeleteAuthor(auhtor.id);
                    }}
                    className="delete-auhtor-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      handleUpdateAuthor(
                        auhtor.id,
                        auhtor.name,
                        auhtor.birthDate,
                        auhtor.country
                      );
                    }}
                    className="update-author-btn"
                  >
                    Update
                  </button>
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
