import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../categoryApi";
const Book = () => {
  // State başı
  const [error, setError] = useState([]); // Valid sonrası oluşan excepitonlar listesi
  const [errorMsg, setErrorMsg] = useState([]); // Mesajların listeye dahili
  const [errorFlag, setErrorFlag] = useState(false); // Hata durumu kontrolü
  const [category, setCategory] = useState({
    name: "",
    description: "",
  }); // Kayıt için field
  const [updateCategory, setUpdateCategory] = useState({
    id: "",
    name: "",
    description: "",
  }); // Güncelleme için filed
  const [categories, setCategories] = useState([]); // YAzar listesi
  const [categoryListChange, setCategoryListChange] = useState(false); // Yazar listesi güncellenme kontrolü
  const [showCategories, setShowCategories] = useState(false); // Yazar listesi gizle göster
  const [showCategoryBtnName, setShowCategoryBtnName] =
    useState("Show All Category"); // Yazar listesi duruma göre isim değişimi
  const [checkStats, setCheckStats] = useState(""); // Başarılı işlemler için
  const [createButtonVisible, setCreateButtonVisible] = useState(true); // Güncelleme işlemlerinde Yeni yazar oluştur butonunu gizler
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false); // Güncelleme işlemleri için İptal ve Kaydet butonlarını aktif eder
  // State sonu

  // Kayıt için standart şablon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
    // Update içinde gerekli standart şablon
    setUpdateCategory({
      ...updateCategory,
      [name]: value,
    });
  };

  const handleUpdateCategory = (id, name, description) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updateCategory = {
      name: name,
      description: description,
    };

    setCategory(updateCategory); // Formu doldurmak için
    setUpdateCategory({
      id: id,
      ...updateCategory, // Update işlemi için
    });
  };

  const handleUpdateSaveClick = () => {
    // Boş  veya tanımlanmamış fieldlar için
    if (
      category.name === "" ||
      category.name === undefined ||
      category.description === "" ||
      category.description === undefined
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
        .put(categoryBaseUrl.baseUrl + "/" + updateCategory.id, updateCategory)
        .then((res) => {
          setErrorFlag(false);
          setCategoryListChange(true);
          setCategory({
            name: "",
            description: "",
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
        .finally(setCategoryListChange(false));
    }
  };

  // Yazar kaydı isteği
  const handleSaveCategory = () => {
    // Boş  veya tanımlanmamış fieldlar için
    if (
      category.name === "" ||
      category.name === undefined ||
      category.description === "" ||
      category.description === undefined
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
        .post(categoryBaseUrl.baseUrl, category)
        .then((res) => {
          setErrorFlag(false);
          setCategoryListChange(true);
          setCategory({
            name: "",
            description: "",
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
            console.log(e);
          }
        })
        .finally(setCategoryListChange(false));
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
    axios.get(categoryBaseUrl.baseUrl).then((res) => {
      setCategories(res.data);
    });
  }, [categoryListChange]);

  // Yazarları listeleme butonu için
  const handleShowCategory = () => {
    if (showCategories) {
      setShowCategoryBtnName("Show All Category");
      return setShowCategories(false);
    }
    setShowCategoryBtnName("Hidden List");
    return setShowCategories(true);
  };

  // Yazar silme isteği
  const handleDeleteCategory = (id) => {
    console.log(id);
    axios
      .delete(categoryBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setCategoryListChange(true);
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
      .finally(setCategoryListChange(false));
  };

  const handleCancelClick = () => {
    setCategory({
      name: "",
      description: "",
    });
    setUpdateButtonsVisible(false);
    setCreateButtonVisible(true);
  };

  return (
    <>
      <div className="form-submit">
        <h3 className="form-stats-for-submit">{checkStats}</h3>
        <div className="form-inputs">
          <input
            name="name"
            placeholder="Category Name"
            required
            type="text"
            value={category.name}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Category Description"
            required
            type="text"
            value={category.description}
            onChange={handleChange}
          />
        </div>
        {createButtonVisible && (
          <button className="form-submit-btn" onClick={handleSaveCategory}>
            Create Category
          </button>
        )}

        {updateButtonsVisible && (
          <>
            <div className="form-update-btns">
              <button
                onClick={handleUpdateSaveClick}
                className="author-submit-btn"
              >
                Save
              </button>
              <button onClick={handleCancelClick} className="form-submit-btn">
                Cancel
              </button>
            </div>
          </>
        )}

        {errorFlag && (
          <div className="form-error-msg">
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
        <button onClick={handleShowCategory} className="show-form-btn">
          {showCategoryBtnName}
        </button>
      </div>
      {showCategories && (
        <div className="form-list">
          {categories.map((category) => {
            return (
              <>
                <div className="form-list-lable">
                  <h3>Category Name: {category.name}</h3>
                  <h3>Category Description: {category.description}</h3>
                  <button
                    onClick={(e) => {
                      handleDeleteCategory(category.id);
                    }}
                    className="delete-form-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      handleUpdateCategory(
                        category.id,
                        category.name,
                        category.description
                      );
                    }}
                    className="update-form-btn"
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
export default Book;
