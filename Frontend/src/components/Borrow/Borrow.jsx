import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../api/categoryApi";
import publisherBaseUrl from "../../api/publisherApi";
import bookBaseUrl from "../../api/bookApi";
import authorBaseUrl from "../../api/authorApi";
import borrowBaseUrl from "../../api/borrowApi";

const Borrow = () => {
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [borrow, setBorrow] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    bookForBorrowingRequest: {
      id: "",
      name: "",
    },
  });
  const [updateBorrow, setUpdateBorrow] = useState({
    id: "",
    borrowerName: "",
    borrowingDate: "",
    returnDate: "",
  });
  const [borrows, setBorrows] = useState([]);
  const [book, setBooks] = useState([]);
  const [borrowListChange, setBorrowListChange] = useState(false);
  const [showBorrows, setShowBorrows] = useState(false);
  const [showBorrowBtnName, setShowBorrowBtnName] = useState("Show All Borrow");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrow({
      ...borrow,
      [name]: value,
    });

    setUpdateBorrow({
      ...updateBorrow,
      [name]: value,
    });
  };

  const handleUpdateBook = (
    id,
    name,
    publicationYear,
    stock,
    authorId,
    publisherId,
    categories
  ) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);

    const updateBookData = {
      id: id,
      name: name,
      publicationYear: publicationYear,
      stock: stock,
      author: { id: authorId },
      publisher: {
        id: publisherId,
      },
      categories: categories.map((cat) => ({ id: cat })),
    };

    setBorrow(updateBookData);

    setUpdateBorrow(updateBookData);
  };

  const handleUpdateSaveClick = () => {
    if (
      borrow.borrowerName === "" ||
      borrow.borrowerName === undefined ||
      borrow.borrowerMail === "" ||
      borrow.borrowerMail === undefined
    ) {
      const emptyFieldErros = ["Empty Field"];
      const clearMsg = () =>
        setTimeout(() => {
          const clearError = [];
          setError(clearError);
          setErrorFlag(false);
        }, 2000);
      setError(emptyFieldErros);
      clearMsg();
    } else {
      axios
        .put(borrowBaseUrl.baseUrl + "/" + updateBorrow.id, updateBorrow)
        .then((res) => {
          setErrorFlag(false);
          setBorrowListChange(true);
          setBorrow({
            borrowerName: "",
            borrowerMail: "",
            borrowingDate: "",
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
            const err = ["Server Down"];
            setError(err);
          } else {
            setError(["Bad Request"]);
          }
        })
        .finally(setBorrowListChange(false));
    }
  };

  const handleSaveBook = () => {
    console.log(borrow.bookForBorrowingRequest.id);
    if (
      borrow.borrowerName === "" ||
      borrow.borrowerName === undefined ||
      borrow.borrowerMail === "" ||
      borrow.borrowerMail === undefined
    ) {
      const emptyFieldErros = ["Empty Field"];
      const clearMsg = () =>
        setTimeout(() => {
          const clearError = [];
          setError(clearError);
          setErrorFlag(false);
        }, 2000);
      setError(emptyFieldErros);
      clearMsg();
    } else {
      axios
        .post(borrowBaseUrl.baseUrl, borrow)
        .then((res) => {
          setErrorFlag(false);
          setBorrowListChange(true);
          setBorrow({
            borrowerName: "",
            borrowerMail: "",
            borrowingDate: "",
            bookForBorrowingRequest: { id: "" },
          });
          setCheckStats("Created");
          function clearStats() {
            setTimeout(() => {
              setCheckStats("");
              window.location.reload();
            }, 2000);
          }
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
        .finally(setBorrowListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(borrowBaseUrl.baseUrl).then((res) => {
      setBorrows(res.data);
    });
  }, [borrowListChange]);

  const handleShowBook = () => {
    if (showBorrows) {
      setShowBorrowBtnName("Show All Category");
      return setShowBorrows(false);
    }
    setShowBorrowBtnName("Hidden List");
    return setShowBorrows(true);
  };

  const handleDeleteBook = (id) => {
    console.log(id);
    axios
      .delete(borrowBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setBorrowListChange(true);
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
      .finally(setBorrowListChange(false));
  };

  const handleCancelClick = () => {
    setBorrow({
      borrowerName: "",
      borrowerMail: "",
    });
    setUpdateButtonsVisible(false);
    setCreateButtonVisible(true);
  };

  useEffect(() => {
    axios.get(bookBaseUrl.baseUrl).then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <>
      <div className="form-submit">
        <h3 className="form-stats-for-submit">{checkStats}</h3>
        <div className="form-inputs">
          <input
            name="borrowerName"
            placeholder="Borrower Name"
            required
            type="text"
            value={borrow.borrowerName}
            onChange={handleChange}
          />

          <input
            name="borrowingDate"
            placeholder="Borrower Date"
            required
            type="date"
            value={borrow.borrowingDate}
            onChange={handleChange}
          />

          <input
            name="borrowerMail"
            placeholder="Borrower Mail"
            required
            type="email"
            value={borrow.borrowerMail}
            onChange={handleChange}
          />
          <select
            name="bookForBorrowingRequest"
            onChange={(e) =>
              setBorrow({
                ...borrow,
                bookForBorrowingRequest: { id: e.target.value },
              })
            }
          >
            <option value={0} disabled selected>
              Select Book
            </option>
            {book?.map((e) => {
              return (
                <>
                  <option value={e.id}>{e.name}</option>
                </>
              );
            })}
          </select>
        </div>
        {createButtonVisible && (
          <button className="form-submit-btn" onClick={handleSaveBook}>
            Create Book
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
        <button onClick={handleShowBook} className="show-form-btn">
          {showBorrowBtnName}
        </button>
      </div>
      {showBorrows && (
        <div className="form-list">
          {borrows.map((borrow) => {
            return (
              <>
                <div className="form-list-lable">
                  <h3>Name: {borrow.borrowerName}</h3>
                  <h3>Mail: {borrow.borrowerMail}</h3>
                  <h3>Borrow Date: {borrow.borrowingDate}</h3>
                  <h3>Book: {borrow.book.name}</h3>
                  <button
                    onClick={(e) => {
                      handleDeleteBook(borrow.id);
                    }}
                    className="delete-form-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      handleUpdateBook(
                        borrow.id,
                        borrow.name,
                        borrow.publicationYear,
                        borrow.stock,
                        borrow.author.id,
                        borrow.publisher.id,
                        borrow.categories.map((c) => c.id)
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
export default Borrow;
