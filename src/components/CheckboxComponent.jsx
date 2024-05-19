import React from "react";
import { Checkbox, Typography } from "@material-tailwind/react";

function CheckboxComponent({ label_text, subLabel_text, setIsPublic }) {
  return (
    <Checkbox
      label={
        <div>
          <Typography color="blue-gray" className="font-medium px-2">
            {label_text}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal px-2">
            {subLabel_text}
          </Typography>
        </div>
      }
      containerProps={{
        className: "-mt-5",
      }}
      onChange={(e) => setIsPublic(e.target.checked)}
    />
  );
}

export default CheckboxComponent;
