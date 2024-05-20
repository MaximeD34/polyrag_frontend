import React from "react";
import { Typography } from "@material-tailwind/react";

function CheckboxComponent({
  label_text,
  subLabel_text,
  isPublic,
  setIsPublic,
}) {
  return (
    <div className="">
      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        <div>
          <Typography color="blue-gray" className="font-medium px-2">
            {label_text}
          </Typography>
        </div>
      </label>
      <Typography variant="small" color="gray" className="font-normal px-2">
        {subLabel_text}
      </Typography>
    </div>
  );
}

export default CheckboxComponent;
