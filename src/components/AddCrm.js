import React, { useState } from "react";
import TutorialDataService from "../services/CrmService";

const AddCrm = () => {
  const initialTutorialState = {
    id: null,
    name:null,
    father_name: null,
    mother_name: null,
    job: null,
    salary: null,
    status: null,
    contract_day: null,
    date_name:  null
  };
  const [Crm, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...Crm, [name]: value });
  };

  const saveTutorial = () => {
    let data = {
      name: Crm.name,
      father_name: Crm.father_name,
      mother_name: Crm.mother_name,
      job: Crm.job,
      salary: Crm.salary,
      status: Crm.status,
      contract_day:  Crm.contract_day,
      date_name:  Crm.date_name
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          father_name: response.data.father_name,
          mother_name: response.data.mother_name,
          status: response.data.status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={Crm.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Father Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Crm.father_name}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Mother name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Crm.mother_name}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Status</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Crm.status}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">salary</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Crm.salary}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCrm;
