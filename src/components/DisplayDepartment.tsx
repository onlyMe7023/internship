import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import data from "./DummyData";

interface Department {
  department: string;
  sub_departments: string[];
}

const DisplayDepartment: React.FC = () => {
  const [checked, setChecked] = React.useState<{ [key: string]: boolean[] }>(
    {}
  );
  const [hide, setHide] = React.useState<{ [key: string]: boolean }>({});

  React.useEffect(() => {
    const initialChecked: { [key: string]: boolean[] } = {};
    const initialHide: { [key: string]: boolean } = {};
    data.forEach((department: Department) => {
      initialChecked[department.department] = department.sub_departments.map(
        () => false
      );
      initialHide[department.department] = false;
    });
    setChecked(initialChecked);
    setHide(initialHide);
  }, []);

  const handleParentChange =
    (department: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedChecked = { ...checked };
      updatedChecked[department] = updatedChecked[department].map(
        () => event.target.checked
      );
      setChecked(updatedChecked);
    };

  const handleChildChange =
    (department: string, index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedChecked = { ...checked };
      updatedChecked[department][index] = event.target.checked;
      setChecked(updatedChecked);
    };

  const toggleHide = (department: string) => () => {
    setHide((prevHide) => ({
      ...prevHide,
      [department]: !prevHide[department],
    }));
  };

  return (
    <div className="w-full">
      {data.map((departmentData: Department) => {
        const departmentChecked = checked[departmentData.department] || [];
        const allChecked = departmentChecked.every(Boolean);
        const someChecked = departmentChecked.some(Boolean);
        const isHidden = hide[departmentData.department];

        return (
          <div key={departmentData.department}>
            <div
              className="inline-block pr-10 cursor-pointer"
              onClick={toggleHide(departmentData.department)}>
              {isHidden ? "-" : "+"}
            </div>
            <FormControlLabel
              label={departmentData.department}
              control={
                <Checkbox
                  checked={allChecked}
                  indeterminate={someChecked && !allChecked}
                  onChange={handleParentChange(departmentData.department)}
                />
              }
            />
            {isHidden && (
              <div className="pl-16">
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  {departmentData.sub_departments.map(
                    (subDepartment, index) => (
                      <FormControlLabel
                        key={subDepartment}
                        label={subDepartment}
                        control={
                          <Checkbox
                            checked={departmentChecked[index]}
                            onChange={handleChildChange(
                              departmentData.department,
                              index
                            )}
                          />
                        }
                      />
                    )
                  )}
                </Box>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayDepartment;
