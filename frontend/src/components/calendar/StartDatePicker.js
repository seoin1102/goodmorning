import * as React from "react";
import dayjs from "dayjs";
import koLocale from "dayjs/locale/ko";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


export default function StartDatePick(props) {
  const [datePickerValue, setDatePickerValue] = React.useState(dayjs());
  const startHandler = (value) => {
    setDatePickerValue(value.$d);
    props.setClickedStart(value.$d)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale}>
      <Stack spacing={3}>
        
        <DatePicker
          value={props.clickedStart}
          onChange={startHandler}
          renderInput={(params) => <TextField {...params} />}

        />

      </Stack>
    </LocalizationProvider>
  );
}
