import { useEffect, useState } from "react";
import axios from "axios";

import bookBaseUrl from "../../api/bookApi";
import validateFields from "../../common/util/checkField";
import borrowBaseUrl from "../../api/borrowApi";
import putRequest from "../../common/request/putRequest";
import deleteRequest from "../../common/request/deleteRequest";
import postRequest from "../../common/request/postRequest";
import resetFormField from "../../common/util/resetFormField";

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
  const [showUpdateReturnDate, setShowUpdateReturnDate] = useState(false);
  const [hiddenOtherInputs, setHiddenOtherInputs] = useState(true);
  const [hiddenSelectedBook, setHiddenSelectedBook] = useState(true);
  const [selectedDefaultValue, setSelectedDefaultValue] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrow((prev) => ({ ...prev, [name]: value }));

    setUpdateBorrow((prev) => ({ ...prev, [name]: value }));
  };

  const resetBorrowForm = () => {
    resetFormField(setBorrow, {
      borrowerName: "",
      borrowerMail: "",
      borrowingDate: "",
      bookForBorrowingRequest: {
        id: "",
        name: "",
      },
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
      axios
        .get(bookBaseUrl.baseUrl + "/" + borrow.bookForBorrowingRequest.id)
        .then((e) => {
          if (e.data.stock <= 0) {
            setErrorFlag(true);
            const customError = ["Out of Book stock"];
            setError(customError);
            setTimeout(() => {
              const customError = [""];
              setError(customError);
            }, 2000);
          } else {
            postRequest(
              borrowBaseUrl.baseUrl,
              data,
              () => resetFormField,
              setBorrowListChange,
              setErrorFlag,
              setCheckStats,
              setError
            );
            setBorrow({
              borrowerName: "",
              borrowerMail: "",
              borrowingDate: "",
              bookForBorrowingRequest: {
                id: "",
                name: "",
              },
            });
            setSelectedDefaultValue(0);
            setTimeout(() => {
              setSelectedDefaultValue();
            }, 100);
          }
        });
    } else if (method === "PUT") {
      putRequest(
        borrowBaseUrl.baseUrl,
        data.id,
        data,
        () => resetBorrowForm,
        setBorrowListChange,
        setErrorFlag,
        setCheckStats,
        setError
      );
      setBorrow({
        borrowerName: "",
        borrowerMail: "",
        borrowingDate: "",
        bookForBorrowingRequest: {
          id: "",
          name: "",
        },
      });
      setUpdateBorrow({
        id: "",
        borrowerName: "",
        borrowingDate: "",
        returnDate: "",
      });
    }
  };

  const handleSaveBorrower = () => {
    const errors = validateFields(borrow);
    if (handleValidationErrors(errors)) return;

    requestHandler("POST", borrow);
  };

  const handleUpdateSaveClick = () => {
    const errors = validateFields(updateBorrow);
    if (handleValidationErrors(errors)) return;

    requestHandler("PUT", updateBorrow);
  };

  const handleDeleteBorrower = (id) => {
    deleteRequest(
      id,
      borrowBaseUrl.baseUrl,
      () => resetBorrowForm,
      setBorrowListChange,
      setErrorFlag,
      setCheckStats,
      setError
    );
  };

  const handleUpdateBorrower = (
    id,
    borrowerName,
    borrowingDate,
    returnDate
  ) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);

    const updateBorrowData = {
      id: id,
      borrowerName: borrowerName,
      borrowingDate: borrowingDate,
      returnDate: returnDate,
    };

    setUpdateBorrow(updateBorrowData);
    setBorrow(updateBorrowData);
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

  const handleShowBorrower = () => {
    if (showBorrows) {
      setShowBorrowBtnName("Show All Category");
      return setShowBorrows(false);
    }
    setShowBorrowBtnName("Hidden List");
    return setShowBorrows(true);
  };

  const handleCancelClick = () => {
    setBorrow({
      borrowerName: "",
      borrowerMail: "",
    });
    setUpdateButtonsVisible(false);
    setCreateButtonVisible(true);
    setShowUpdateReturnDate(false);
    setHiddenOtherInputs(true);
    setHiddenSelectedBook(true);
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
          {showUpdateReturnDate && (
            <div>
              <label>
                Return Date
                <input
                  value={updateBorrow.returnDate}
                  name="returnDate"
                  onChange={handleChange}
                  type="date"
                />
              </label>
            </div>
          )}

          {hiddenOtherInputs && (
            <>
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

              {hiddenSelectedBook && (
                <input
                  name="borrowerMail"
                  placeholder="Borrower Mail"
                  required
                  type="email"
                  value={borrow.borrowerMail}
                  onChange={handleChange}
                />
              )}
              {hiddenSelectedBook && (
                <select
                  name="bookForBorrowingRequest"
                  onChange={(e) =>
                    setBorrow({
                      ...borrow,
                      bookForBorrowingRequest: { id: e.target.value },
                    })
                  }
                  value={selectedDefaultValue}
                >
                  <option value={0} disabled selected>
                    Select Book
                  </option>

                  {/* Stok 0 dan fazla olanları getirir */}
                  {book
                    ?.filter((e) => e.stock > 0)
                    .map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </select>
              )}
            </>
          )}
        </div>
        {createButtonVisible && (
          <button className="form-submit-btn" onClick={handleSaveBorrower}>
            Create Borrower
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
        <button onClick={handleShowBorrower} className="show-form-btn">
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
                  <h3>
                    Return Date :{" "}
                    {borrow.returnDate ? borrow.returnDate : "Not brought"}
                  </h3>
                  <button
                    onClick={(e) => {
                      handleDeleteBorrower(borrow.id);
                    }}
                    className="delete-form-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      setShowUpdateReturnDate(true);
                      setHiddenOtherInputs(false);
                      handleUpdateBorrower(
                        borrow.id,
                        borrow.borrowerName,
                        borrow.borrowingDate,
                        borrow.returnDate
                      );
                    }}
                    className="update-form-btn"
                  >
                    Update For Return Date
                  </button>

                  <button
                    onClick={(e) => {
                      setShowUpdateReturnDate(false);
                      setHiddenOtherInputs(true);
                      setHiddenSelectedBook(false);
                      handleUpdateBorrower(
                        borrow.id,
                        borrow.borrowerName,
                        borrow.borrowingDate,
                        borrow.returnDate
                      );
                    }}
                    className="update-form-btn"
                  >
                    Update Borrower
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
