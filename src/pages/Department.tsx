import React from "react";
import DisplayData from "../components/DisplayData";
import DisplayDepartment from "../components/DisplayDepartment";
const Department = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col  p-32">
        <DisplayData />
        <DisplayDepartment />
      </div>
    </>
  );
};

export default Department;
