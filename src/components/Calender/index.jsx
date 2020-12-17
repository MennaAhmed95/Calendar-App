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
import AddIcon from "./../AddIcon/index";

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

  let [eventToEditt, setEventToEditt] = useState({});
  let [events, setEvents] = useState([]);
  let [selectDate, setSelectDate] = useState("");
  let [showEventModal, setShowEventModal] = useState(false);
  useEffect(() => {
    let events =
      localStorage.getItem("CalendarEvents") !== ("undefined" && null)
        ? JSON.parse(localStorage.getItem("CalendarEvents"))
        : [];
    console.log("eve", events);
    setEvents(events);
  }, []);
  useEffect(() => {
    toggleModal();
    localStorage.setItem("CalendarEvents", JSON.stringify(events));
  }, [events]);
  const toggleModal = () => {
    showEventModal = !showEventModal;
    if (showEventModal) {
      setEventToEditt({});
    }
    setShowEventModal(showEventModal);
  };
  const dateClickHandler = (date) => {
    selectDate = date;
    setSelectDate(selectDate);
    toggleModal();
    console.log(date);
  };
  const sty = useStyles();
  function handleFormSubmit({ id, title, description, date, time }) {
    const lastEvent = events.length;
    console.log("lastEvent : ", lastEvent);
    const newEvent = {
      id: (lastEvent || 0) + 1,
      title,
      description,
      date: selectDate,
      time,
    };
    events = [...events, newEvent];
    setEvents(events);
    console.log(events);
  }
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
                        <AddIcon />
                      </TableCell>
                    ) : (
                      <TableCell
                        key={col.date}
                        className={`${sty.tableCell} ${col.classes}`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                        <AddIcon />
                        <div>
                          {events.map((e, i) => {
                            return (
                              e.date === col.date && (
                                <div key={i} className="event-data">
                                  {e.time} - {e.title}
                                </div>
                              )
                            );
                          })}
                        </div>
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
