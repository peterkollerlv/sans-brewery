import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BreweryDetailRowProps } from "../interface/props/BreweryDetailRowProps";

export const BreweryDetailRow: React.FC<BreweryDetailRowProps> = ({
  ...props
}) => {
  if (!props.entryValue) {
    return null;
  }
  return (
    <TableRow>
      <TableCell sx={{ border: 0 }}>
        <Typography variant="body1" color="primary">
          {props.entryKey}
        </Typography>
      </TableCell>

      <TableCell align="left" sx={{ border: 0 }}>
        <Typography variant="body2" color="primary">
          {props.asLink ? (
            <a href={props.entryValue}>{props.entryValue}</a>
          ) : (
            props.entryValue ?? "n/a"
          )}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
