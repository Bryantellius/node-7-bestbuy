import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Sales = () => {
  let [sales, setSales] = useState(null);
  let [hasLoaded, setHasLoaded] = useState(false);
  let [pageLimit, setPageLimit] = useState(10);
  let [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8080/api/sales?limit=${pageLimit}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSales(data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      })
      .finally(() => setHasLoaded(true));
  }, [pageLimit, page]);

  const changePage = (dir) => {
    let maxPages = Math.ceil(sales.total / pageLimit);
    let nextPage = page + dir;

    if (nextPage <= maxPages && nextPage >= 1) {
      setPage(nextPage);
    }
  };

  if (!hasLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1>Sales Pagination</h1>
      <hr />
      {sales ? (
        <table>
          <thead>
            <tr>
              <th>Page: {page ?? "Couldn't load sales"}</th>
              <th>
                <label htmlFor="pageLimit">Results Per Page:</label>
                <select
                  name="pageLimit"
                  id="pageLimit"
                  value={pageLimit}
                  onChange={(e) => setPageLimit(e.target.value)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </th>
              <th>
                <button onClick={(e) => changePage(-1)} disabled={page === 1}>
                  Prev
                </button>
                <button
                  onClick={(e) => changePage(1)}
                  disabled={page === Math.ceil(sales.total / pageLimit)}
                >
                  Next
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.results.map((s, idx) => {
              return (
                <tr key={s.SalesID}>
                  <td>{idx + 1}</td>
                  <td><Link to={`/products/${s.ProductID}`}>{s.Name}</Link></td>
                  <td>{s.Quantity}</td>
                  <td>{s.Price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Failed to load sales from database.</p>
      )}
    </Layout>
  );
}

export default Sales;
