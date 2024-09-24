import { useEffect, useState } from "react";
import axios from "axios";
import publisherBaseUrl from "../../api/publisherApi";
import validateFields from "../../common/util/checkField";

const Publisher = () => {
  const [preventSpamReuqest, setPreventSpamRequest] = useState(false);
  const [loadServer, setLoadServer] = useState(false);
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [publisher, setPublisher] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [updatePublisher, setUpdatePublisher] = useState({
    id: "",
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [publishers, setPublishers] = useState([]);
  const [publisherListChange, setPublisherListChange] = useState(false);
  const [showPublishers, setShowPublishers] = useState(false);
  const [showPublishersBtnName, setShowPublishersBtnName] =
    useState("Show All Publisher");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublisher({
      ...publisher,
      [name]: value,
    });

    setUpdatePublisher({
      ...updatePublisher,
      [name]: value,
    });
  };

  const handleUpdatePublisher = (id, name, establishmentYear, address) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updatePublisher = {
      name: name,
      establishmentYear: establishmentYear,
      address: address,
    };

    setPublisher(updatePublisher);
    setUpdatePublisher({
      id: id,
      ...updatePublisher,
    });
  };

  const handleUpdateSaveClick = () => {
    const errors = validateFields(publisher);
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
        .put(
          publisherBaseUrl.baseUrl + "/" + updatePublisher.id,
          updatePublisher
        )
        .then((res) => {
          setErrorFlag(false);
          setPublisherListChange(true);
          setPublisher({
            name: "",
            establishmentYear: "",
            address: "",
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
        .finally(setPublisherListChange(false));
    }
  };

  const handleSavePublisher = () => {
    const errors = validateFields(publisher);
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
        .post(publisherBaseUrl.baseUrl, publisher)
        .then((res) => {
          setErrorFlag(false);
          setPublisherListChange(true);
          setPublisher({
            name: "",
            establishmentYear: "",
            address: "",
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
            const err = ["Server Down"];
            setError(err);
          } else {
            const err = ["Bad Request. Contact a developer."];
            setError(err);
            console.log(e);
          }
        })
        .finally(setPublisherListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(publisherBaseUrl.baseUrl).then((res) => {
      setPublishers(res.data);
    });
  }, [publisherListChange]);

  const handleShowPublisher = () => {
    if (showPublishers) {
      setShowPublishersBtnName("Show All Publisher");
      return setShowPublishers(false);
    }
    setShowPublishersBtnName("Hidden List");
    return setShowPublishers(true);
  };

  const handleDeletePublisher = (id) => {
    setPreventSpamRequest(true);
    setLoadServer(true);
    console.log(id);
    axios
      .delete(publisherBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setPublisherListChange(true);
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
      .finally(setPublisherListChange(false));
  };

  const handleCancelClick = () => {
    setPublisher({
      name: "",
      establishmentYear: "",
      address: "",
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
            placeholder="Publisher Name"
            required
            type="text"
            value={publisher.name}
            onChange={handleChange}
          />

          <input
            name="establishmentYear"
            placeholder="Establishment Year"
            required
            type="number"
            min={1900}
            max={2024}
            value={publisher.establishmentYear}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Publisher Address"
            required
            type="text"
            value={publisher.address}
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
            onClick={handleSavePublisher}
          >
            Create Publisher
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
        <button onClick={handleShowPublisher} className="show-form-btn">
          {showPublishersBtnName}
        </button>
      </div>
      {showPublishers && (
        <div className="form-list">
          {publishers.map((publisher) => {
            return (
              <>
                <div className="form-list-lable">
                  <h3>Publisher Name: {publisher.name}</h3>
                  <h3>
                    Publisher Establishment Year: {publisher.establishmentYear}
                  </h3>
                  <h3>Publisher Address: {publisher.address}</h3>
                  <button
                    disabled={preventSpamReuqest}
                    onClick={(e) => {
                      handleDeletePublisher(publisher.id);
                    }}
                    className="delete-form-btn"
                  >
                    Delete
                  </button>
                  <button
                    disabled={preventSpamReuqest}
                    onClick={(e) => {
                      handleUpdatePublisher(
                        publisher.id,
                        publisher.name,
                        publisher.establishmentYear,
                        publisher.address
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
export default Publisher;
