import { useEffect, useState } from "react";
import axios from "axios";
import authorBaseUrl from "../../api/authorApi";
import validateFields from "../../common/util/checkField";
import putRequest from "../../common/request/putRequest";
import postRequest from "../../common/request/postRequest";
import deleteRequest from "../../common/request/deleteRequest";
import resetFormField from "../../common/util/resetFormField";

const Auhtor = () => {
  const [preventSpamReuqest, setPreventSpamRequest] = useState(false);
  const [loadServer, setLoadServer] = useState(false);
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  });
  const [updateAuthor, setUpdateAuthor] = useState({
    id: "",
    name: "",
    birthDate: "",
    country: "",
  });
  const [authors, setAuthors] = useState([]);
  const [authorListChange, setAuthorListChange] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [shotAuthorsBtnName, setShowAuthorsBtnName] =
    useState("Show All Authors");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
    setUpdateAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const resetAuthorForm = () => {
    resetFormField(setAuthor, {
      name: "",
      birthDate: "",
      country: "",
    });
  };

  const handleValidationErrors = (errors) => {
    if (errors) {
      setError(errors);
      setErrorFlag(true);
      setTimeout(() => {
        setError([]);
        setErrorFlag(false);
      }, 2000);
      return true;
    }
    return false;
  };

  const requestHandler = (method, data) => {
    if (method === "POST") {
      postRequest(
        authorBaseUrl.baseUrl,
        data,
        resetAuthorForm,
        setAuthorListChange,
        setErrorFlag,
        setCheckStats,
        setError,
        setLoadServer,
        setPreventSpamRequest
      );
    } else if (method === "PUT") {
      putRequest(
        authorBaseUrl.baseUrl,
        data.id,
        data,
        resetAuthorForm,
        setAuthorListChange,
        setErrorFlag,
        setCheckStats,
        setError,
        setLoadServer,
        setPreventSpamRequest
      );
    }
  };

  const handleSaveAuthor = () => {
    const errors = validateFields(author);
    if (handleValidationErrors(errors)) return;

    requestHandler("POST", author);
  };

  const handleUpdateSaveClick = () => {
    const errors = validateFields(updateAuthor);
    if (handleValidationErrors(errors)) return;

    requestHandler("PUT", updateAuthor);
  };

  const handleDeleteAuthor = (id) => {
    deleteRequest(
      id,
      authorBaseUrl.baseUrl,
      resetAuthorForm,
      setAuthorListChange,
      setErrorFlag,
      setCheckStats,
      setError,
      setLoadServer,
      setPreventSpamRequest
    );
  };

  const handleUpdateAuthor = (id, name, birthDate, country) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updatedAuthor = {
      id: id,
      name: name,
      birthDate: birthDate,
      country: country,
    };

    setAuthor(updatedAuthor);
    setUpdateAuthor(updatedAuthor);
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(authorBaseUrl.baseUrl).then((res) => {
      setAuthors(res.data);
    });
  }, [authorListChange]);

  const handeShowAuthors = () => {
    setShowAuthors(!showAuthors);
    setShowAuthorsBtnName(showAuthors ? "Show All Authors" : "Hidden List");
  };

  const handleCancelClick = () => {
    resetAuthorForm();
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
        {loadServer && (
          <div className="load-container">
            <div class="loader"></div>
          </div>
        )}
        {createButtonVisible && (
          <button
            disabled={preventSpamReuqest}
            className="author-submit-btn"
            onClick={handleSaveAuthor}
          >
            Create Author
          </button>
        )}

        {updateButtonsVisible && (
          <>
            <div className="author-update-btns">
              <button
                disabled={preventSpamReuqest}
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
                  <button
                    onClick={(e) => {
                      handleDeleteAuthor(auhtor.id);
                    }}
                    className="delete-auhtor-btn"
                    disabled={preventSpamReuqest}
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
                    disabled={preventSpamReuqest}
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
