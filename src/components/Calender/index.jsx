import React, { useState, useEffect } from "react";
import useCalendar from "./../../hooks/useCalender";
import { Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import AddEvent from "./../AddEvent";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    textAlign: "center",
  },
});
const Calender = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();
  const [eventToEditt, setEventToEditt] = useState({});
  const [events, setEvents] = useState([]);
  const [selectDate, setSelectDate] = useState(selectedDate);
  const [showEventModal, setShowEventModal] = useState(false);
  useEffect(() => {
    let events =
      localStorage.getItem("CalendarEvents") !== ("undefined" && null)
        ? JSON.parse(localStorage.getItem("CalendarEvents"))
        : [];
    setEvents(events);
  });
  const toggleModal = () => {
    const newState = { showEventModal: !showEventModal };
    if (showEventModal) {
      newState.setEventToEditt({});
    }
    setShowEventModal(newState);
  };
  const dateClickHandler = (date) => {
    setSelectDate(date);
    toggleModal();
    console.log(date);
  };
  const sty = useStyles();
  const handleFormSubmit = ({ id, title, description, date, time }) => {
    console.log(title);
    if (id) {
      const updatedEvent = {
        id,
        title,
        description,
        date,
        time,
      };
      const eventIndex = events.findIndex((e) => e.id === id);
      events.splice(eventIndex, 1, updatedEvent);
      setEvents(events, () => {
        toggleModal();
        localStorage.setItem("CalendarEvents", JSON.stringify(events));
      });
    } else {
      const lastEvent = events[events.length - 1];
      const newEvent = {
        id: ((lastEvent && lastEvent.id) || 0) + 1,
        title,
        description,
        date: selectedDate,
        time,
      };
      events = events.concat(newEvent);
      setEvents(events, () => {
        toggleModal();
        localStorage.setItem("CalendarEvents", JSON.stringify(events));
      });
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Button className="Button" onClick={getPrevMonth}>
          <Icon className="fas fa-angle-left"></Icon>
        </Button>
        <p style={{ display: "inline-block" }}>
          {`${
            monthNames[selectedDate.getMonth()]
          } - ${selectedDate.getFullYear()}`}
        </p>

        <Button className="Button" onClick={getNextMonth}>
          <Icon className="fas fa-angle-right"></Icon>
        </Button>
        <Table className={sty.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(calendarRows).map((cols) => {
              return (
                <TableRow key={cols[0].date}>
                  {cols.map((col) =>
                    col.date === todayFormatted ? (
                      <TableCell
                        style={{ color: "red" }}
                        key={col.date}
                        className={`${col.classes} today ${sty.tableCell}`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                        <Icon
                          className="fa fa-plus-circle"
                          style={{ color: "bisque", marginLeft: "10%" }}
                          fontSize="small"
                        ></Icon>
                      </TableCell>
                    ) : (
                      <TableCell
                        key={col.date}
                        className={`${sty.tableCell} ${col.classes}`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                        <Icon
                          className="fa fa-plus-circle"
                          style={{ color: "bisque", marginLeft: "10%" }}
                          fontSize="small"
                        ></Icon>
                      </TableCell>
                    )
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showEventModal && (
        <AddEvent
          showModal={showEventModal}
          toggleModal={toggleModal}
          handleFormSubmit={handleFormSubmit}
          eventToEditt={eventToEditt}
        />
      )}
    </>
  );
};

export default Calender;
