import React, { useState, useEffect, useMemo, useRef } from "react";
import TutorialDataService from "../services/CrmService";
import { useTable } from "react-table";

const CrmList = (props) => {
  const [tutorials, setCrm] = useState([]);
  const [searchName, setSearchName] = useState("");
  const tutorialsRef = useRef();

  tutorialsRef.current = tutorials;

  useEffect(() => {
    retrieveCrm();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCrm = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setCrm(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    TutorialDataService.findByName(searchName)
      .then((response) => {
        setCrm(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openCrm = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;
    props.history.push("/tutorials/" + id);
  };

  const deleteCrm = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    TutorialDataService.remove(id)
      .then((response) => {
        props.history.push("/tutorials");
        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);
        setCrm(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Father name",
        accessor: "father_name",
      },
      {
        Header: "Mother name",
        accessor: "mother_name",
      },
      {
        Header: "Job",
        accessor: "job",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
      {
        Header: "Birth Day",
        accessor: "date_name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCrm(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteCrm(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tutorials,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrmList;
