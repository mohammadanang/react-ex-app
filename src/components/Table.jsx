import React from "react";
import DataTable from "react-data-table-component";
import Spinner from "components/Spinner.jsx";
import Pagination from "components/Pagination.jsx";

const tableTheme = {
  header: {
    backgroundColor: 'rgba(255,255,255,.1)',
    fontColor: 'rgba(255,255,255,.87)',
    fontSize: 14
  },
  rows: {
    borderColor: 'rgba(255,255,255,.1)',
    fontColor: 'rgba(255,255,255,.87)'
  },
  cell: {
    cellPadding: '40px',
  },
  pagination: {
    fontColor: 'rgba(150,150,150,.87)',
    buttonFontColor: 'rgba(255,255,255,.87)',
    buttonHoverBackground: 'rgba(255,255,255,.12)'
  }
};

class Table extends React.Component {
  render() {
    const { onChangePaging } = this.props;
    const { limit, page, total } = this.props.paging || {};
    return (
      <React.Fragment>
        <DataTable 
          className="table"
          keyField="_id"
          customTheme={tableTheme}
          progressComponent={<Spinner/>}
          noHeader={true}
          {...this.props}
        />
        <nav className="table-footer">
          <Pagination 
            limit={limit || 10}
            page={page || 1}
            total={total || 0}
            onChangePaging={onChangePaging}
          />
        </nav>
      </React.Fragment>
    )
  }
}

export default Table;
