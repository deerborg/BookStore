import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../api/categoryApi";
import validateFields from "../../common/util/checkField";

const Category = () => {
  const [preventSpamReuqest, setPreventSpamRequest] = useState(false);
  const [loadServer, setLoadServer] = useState(false);
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [updateCategory, setUpdateCategory] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [categoryListChange, setCategoryListChange] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCategoryBtnName, setShowCategoryBtnName] =
    useState("Show All Category");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });

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

    setCategory(updateCategory);
    setUpdateCategory({
      id: id,
      ...updateCategory,
    });
  };

  const handleSaveCategory = () => {
    const errors = validateFields(category);
    if (errors) {
      setError(errors);
      setErrorFlag(true);
      setTimeout(() => {
        setError([]);
        setErrorFlag(false);
      }, 2000);
    } else {
      setPreventSpamRequest(true);
      setLoadServer(true);
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
          setPreventSpamRequest(false);
          setLoadServer(false);
          clearStats();
        })
        .catch((e) => {
          if (e.code === "ERR_NETWORK") {
            setPreventSpamRequest(false);
            setLoadServer(false);
            const err = ["Server Down"];
            setError(err);
          } else {
            setPreventSpamRequest(false);
            setLoadServer(false);
            const err = ["Bad Request. Contact a developer."];
            setError(err);
            console.log(e);
          }
        })
        .finally(setCategoryListChange(false));
    }
  };

  const handleUpdateSaveClick = () => {
    const errors = validateFields(category);
    if (errors) {
      setError(errors);
      setErrorFlag(true);
      setTimeout(() => {
        setError([]);
        setErrorFlag(false);
      }, 2000);
    } else {
      setPreventSpamRequest(true);
      setLoadServer(true);
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
          setPreventSpamRequest(false);
          setLoadServer(false);
          clearStats();
        })
        .catch((e) => {
          console.log(e);
          if (e.code === "ERR_NETWORK") {
            setPreventSpamRequest(false);
            setLoadServer(false);
            const err = ["Server Down"];
            setError(err);
          } else {
            setPreventSpamRequest(false);
            setLoadServer(false);
            setError(["Bad Request"]);
          }
        })
        .finally(setCategoryListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(categoryBaseUrl.baseUrl).then((res) => {
      setCategories(res.data);
    });
  }, [categoryListChange]);

  const handleShowCategory = () => {
    if (showCategories) {
      setShowCategoryBtnName("Show All Category");
      return setShowCategories(false);
    }
    setShowCategoryBtnName("Hidden List");
    return setShowCategories(true);
  };

  const handleDeleteCategory = (id) => {
    setPreventSpamRequest(true);
    setLoadServer(true);
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
        setPreventSpamRequest(false);
        setLoadServer(false);
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

        {loadServer && (
          <div className="load-container">
            <div class="loader"></div>
          </div>
        )}

        {createButtonVisible && (
          <button
            disabled={preventSpamReuqest}
            className="form-submit-btn"
            onClick={handleSaveCategory}
          >
            Create Category
          </button>
        )}

        {updateButtonsVisible && (
          <>
            <div className="form-update-btns">
              <button
                disabled={preventSpamReuqest}
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
                    disabled={preventSpamReuqest}
                    onClick={(e) => {
                      handleDeleteCategory(category.id);
                    }}
                    className="delete-form-btn"
                  >
                    Delete
                  </button>
                  <button
                    disabled={preventSpamReuqest}
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
export default Category;
