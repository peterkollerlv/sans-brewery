import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { BreweryDetailRowProps } from "../interface/props/BreweryDetailRowProps";

export const BreweryDetailRow: React.FC<BreweryDetailRowProps> = ({ ...props }) => {
  if (!props.entryValue) {
    return null;
  }
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <Typography variant="body1" sx={{ color: "var(--primary-color)" }}>
          {props.entryKey}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography variant="body2" sx={{ color: "var(--primary-color)" }}>
          {props.asLink ? (
            <a href={props.entryValue}>{props.entryValue}</a>
          ) : (
            props.entryValue ?? "n/a"
          )}
          {}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
