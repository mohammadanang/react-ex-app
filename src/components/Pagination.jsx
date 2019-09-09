import React from "react";

const firstPage = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
    <path fill="none" d="M24 24H0V0h24v24z" />
  </svg>
);

const lastPage = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
    <path fill="none" d="M0 0h24v24H0V0z" />
  </svg>
);

const left = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const right = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const dropdown = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

// For use with Formik Field
class Pagination extends React.Component {
  getNumberOfPages() {
    const { limit, total } = this.props;
    return Math.ceil(total / limit);
  }

  handleLimitChange = e => {
    const { onChangePaging } = this.props;
    onChangePaging({ limit: Number(e.target.value), page: 1 });
  }

  handlePrevious = () => {
    const { onChangePaging, page } = this.props;
    onChangePaging({ page: page - 1 });
  }

  handleNext = () => {
    const { onChangePaging, page } = this.props;
    onChangePaging({ page: page + 1 });
  }

  handleFirst = () => {
    const { onChangePaging } = this.props;
    onChangePaging({ page: 1 });
  }

  handleLast = () => {
    const { onChangePaging } = this.props;
    onChangePaging({ page: this.getNumberOfPages() });
  }

  render() {
    const { limit, page, total } = this.props;
    const numPages = this.getNumberOfPages();
    const lastIndex = page * limit;
    const firstIndex = (lastIndex - limit) + 1;
    const status = page === numPages
      ? `${firstIndex}-${total} dari ${total}`
      : `${firstIndex}-${lastIndex} dari ${total}`;
    const disabledLesser = page === 1;
    const disabledGreater = page === numPages;

    return (
      <div className="pagination">
        <div className="select-wrapper">
          <span>Baris per halaman:</span>
          <select onChange={this.handleLimitChange} defaultValue={limit}>
            {[10, 15, 20, 25].map(num => (
              <option
                key={num}
                value={num}
              >
                {num}
              </option>
            ))}
          </select>
          {dropdown}
        </div>

        <span>
          {status}
        </span>

        <div className="page-list">
          <button 
            id="pagination-first-page"
            disabled={disabledLesser}
            onClick={this.handleFirst}
          >
            {firstPage}
          </button>
          <button
            id="pagination-previous-page"
            disabled={disabledLesser}
            onClick={this.handlePrevious}
          >
            {left}
          </button>
          <button
            id="pagination-next-page"
            disabled={disabledGreater}
            onClick={this.handleNext}
          >
            {right}
          </button>
          <button
            id="pagination-last-page"
            disabled={disabledGreater}
            onClick={this.handleLast}
          >
            {lastPage}
          </button>
        </div>
      </div>
    )
  }
}

export default Pagination;
