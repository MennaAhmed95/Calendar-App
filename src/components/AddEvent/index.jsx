import React, { useState } from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import "./addEvent.css";

const AddEvent = ({
  showModal,
  toggleModal,
  eventToEditt,
  handleFormSubmit,
}) => {
  const [eventToEdit, setEventToEdit] = useState(eventToEditt);
  const submitForm = (e) => {
    e.preventDefault();
    const { date, id, title, description, time } = eventToEdit;
    handleFormSubmit({
      id,
      title,
      description,
      date,
      time,
    });
  };

  const setTitle = (t) => {
    setEventToEdit((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        title: t,
      },
    }));
  };

  const setDescription = (d) => {
    setEventToEdit((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        description: d,
      },
    }));
  };

  const setTime = (t) => {
    setEventToEdit((prevState) => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        time: t,
      },
    }));
  };

  const { title, description, time } = eventToEdit;

  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showModal}
        onClose={toggleModal}
      >
        <div className="paper add-event-modal">
          <center>
            <h2 id="simple-modal-title">Add Event</h2>
          </center>
          <form onSubmit={submitForm}>
            <div>
              <TextField
                required
                id={title}
                label="Event Title"
                defaultValue={title}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id={description}
                label="Event Description"
                defaultValue={description}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id={time}
                type="time"
                defaultValue="07:30"
                label="Event Time"
                defaultValue={time}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="event-button">
              <center>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  Save Event
                </Button>
              </center>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddEvent;
