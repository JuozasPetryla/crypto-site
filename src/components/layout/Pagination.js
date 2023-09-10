import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchCryptos } from "../../app/cryptoSlice";
import classes from "./Pagination.module.scss";

function Pagination() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.crypto.totalPages);
  const search = useSelector((state) => state.crypto.searchTerm);
  const curPage = useSelector((state) => state.crypto.curPage);
  const [pageNum, setPageNum] = useState(1);

  function goToPrevPage() {
    if (pageNum === 1) return;
    const newPage = pageNum - 1;
    setPageNum(newPage);
  }

  function goToNextPage() {
    if (pageNum === totalPages) return;
    const newPage = pageNum + 1;
    setPageNum(newPage);
  }

  useEffect(() => {
    dispatch(fetchCryptos({ search, pageNum }));
    // eslint-disable-next-line
  }, [dispatch, pageNum]);

  return (
    <div className={classes.pagination}>
      <button
        className={classes.button + " btn " + classes["button-page"]}
        onClick={goToPrevPage}
      >
        Prev
      </button>
      <div className={classes.curPage}>
        <p>{curPage}</p>
      </div>
      <button
        className={classes.button + " btn " + classes["button-page"]}
        onClick={goToNextPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
