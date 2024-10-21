import { TextField, FormLabel, RadioGroup, Radio, FormControlLabel, Stack, Button, MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [courses, setCourses] = useState("");

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isMobileInvalid, setIsMobileInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isDobInvalid, setIsDobInvalid] = useState(false);
  const [isGenderInvalid, setIsGenderInvalid] = useState(false);
  const [isCoursesInvalid, setIsCoursesInvalid] = useState(false);

  // State to store data for display
  const [displayData, setDisplayData] = useState(null);
  // State to control display of form or submitted data
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userInputValidation = (inputTag) => {
    const { name, value } = inputTag;
    if (name === "Name") {
      setName(value);
      !!value.match(/^[a-zA-Z\s\.]+$/) ? setIsNameInvalid(false) : setIsNameInvalid(true);
    }
    else if (name === 'Address') {
      setAddress(value);
      !!value ? setIsAddressInvalid(false) : setIsAddressInvalid(true);
    }
    else if (name === 'Mobile') {
      setMobile(value);
      !!value.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/) ? setIsMobileInvalid(false) : setIsMobileInvalid(true);
    }
    else if (name === 'Email') {
      setEmail(value);
      !!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ? setIsEmailInvalid(false) : setIsEmailInvalid(true);
    }
    else if (name === 'Gender') {
      setGender(value);
      !!value ? setIsGenderInvalid(false) : setIsGenderInvalid(true);
    }
    else if (name === "Dob") {
      setDob(value);
      const selectedDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const isUnderAge = age < 18 || (age === 18 && today < new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
      isUnderAge ? setIsDobInvalid(true) : setIsDobInvalid(false);
    }
    else if (name === 'Courses') {
      setCourses(value);
      !!value ? setIsCoursesInvalid(false) : setIsCoursesInvalid(true);
    }
  };

  const getRegisterDetails = () => {
    if (name && address && mobile && email && gender && dob && courses) {
      // Store data in displayData state
      setDisplayData({ name, address, mobile, email, gender, dob, courses });
      setIsSubmitted(true); // Set the form as submitted
    } else {
      alert(`Please fill the form`);
    }
  };

  const resetAllDetails = () => {
    setName("");
    setAddress("");
    setMobile("");
    setEmail("");
    setDob("");
    setGender("");
    setCourses("");
    setIsNameInvalid(false);
    setIsAddressInvalid(false);
    setIsMobileInvalid(false);
    setIsEmailInvalid(false);
    setIsDobInvalid(false);
    setIsGenderInvalid(false);
    setIsCoursesInvalid(false);
    setDisplayData(null); // Reset display data
    setIsSubmitted(false); // Reset submission state
  };

  const courseOptions = [
    { value: '', label: 'Choose any Course' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Commerce', label: 'Commerce' },
    { value: 'Humanities', label: 'Humanities' },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center text-light min-vh-100" >
  <div className="rounded p-5 bg-danger-subtle text-dark" style={{ width: '600px',}}>
    <h1 className="text-center font-weight-bold" style={{ fontFamily: 'fantasy' }}>Higher Secondary Admission</h1>

    {/* Conditionally render form or submitted data */}
    {!isSubmitted ? (
      <form className="mt-3 d-flex flex-column align-items-center">

        <TextField id="name" value={name} label="Student Name" onChange={e => userInputValidation(e.target)} name="Name" variant="outlined" className="w-100 mb-3" />
        {isNameInvalid && <div className="text-danger fw-bold text-start w-100">*Invalid Character</div>}

        <TextField id="address" value={address} label="Address" name="Address" onChange={e => userInputValidation(e.target)} variant="outlined" className="w-100 mb-3" />
        {isAddressInvalid && <div className="text-danger fw-bold text-start w-100">*Enter your Address</div>}

        <TextField
          id="mobile"
          label="Phone Number"
          name="Mobile"
          value={mobile}
          onChange={e => userInputValidation(e.target)}
          variant="outlined"
          className="w-100 mb-3"
          InputProps={{
            startAdornment: <InputAdornment position="start">+91</InputAdornment>,
          }}
        />
        {isMobileInvalid && <div className="text-danger fw-bold text-start w-100">*Enter a valid Mobile Number</div>}

        <TextField id="email" value={email} onChange={e => userInputValidation(e.target)} label="Email" name="Email" variant="outlined" className="w-100 mb-3" />
        {isEmailInvalid && <div className="text-danger fw-bold text-start w-100">*Enter a valid email</div>}

        <div className="w-100 border rounded p-3 mb-3">
          <FormLabel className="text-dark">Gender:</FormLabel>
          <RadioGroup name="Gender" onChange={e => userInputValidation(e.target)} className="d-flex">
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          {isGenderInvalid && <div className="text-danger fw-bold">*Gender is required</div>}
        </div>

        <TextField
  id="dob"
  value={dob}
  onChange={e => userInputValidation(e.target)}
  name="Dob"
  label="Date of Birth"
  type="date"
  variant="outlined"
  className="w-100 mb-3" 
  InputLabelProps={{
    shrink: true, 
  }}
  style={{
    backgroundColor: '#f8f9fa', 
    borderRadius: '5px', 
  }}
/>
{isDobInvalid && (
  <div className="text-danger fw-bold text-start w-100">
    *You must be at least 18 years old
  </div>
)}

        {isDobInvalid && <div className="text-danger fw-bold text-start w-100">*You must be at least 18 years old</div>}

        <TextField
          id="courses"
          value={courses}
          onChange={e => userInputValidation(e.target)}
          label="Courses"
          name="Courses"
          select
          variant="outlined"
          className="w-100 mb-3"
        >
          {courseOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {isCoursesInvalid && <div className="text-danger fw-bold text-start w-100">*Courses is required</div>}

        <Stack direction="row" justifyContent="center" spacing={2} className="mt-3">
          <Button
            onClick={getRegisterDetails}
            disabled={isNameInvalid || isAddressInvalid || isMobileInvalid || isEmailInvalid || isDobInvalid || isGenderInvalid || isCoursesInvalid}
            variant="contained"
            className="btn-primary"
          >
            Register
          </Button>
          <Button onClick={resetAllDetails} variant="contained" className="btn-danger">
            Reset
          </Button>
        </Stack>

      </form>
    ) : (
      // Displaying the submitted data 
      <div className="mt-4">
        <h2>Submitted Data:</h2>
        <ul className="list-unstyled">
          <li><strong>Name:</strong> {displayData.name}</li>
          <li><strong>Address:</strong> {displayData.address}</li>
          <li><strong>Mobile:</strong> {displayData.mobile}</li>
          <li><strong>Email:</strong> {displayData.email}</li>
          <li><strong>Gender:</strong> {displayData.gender}</li>
          <li><strong>Date of Birth:</strong> {displayData.dob}</li>
          <li><strong>Course:</strong> {displayData.courses}</li>
        </ul>
        <Button onClick={resetAllDetails} variant="contained" className="btn-danger">Go Back</Button>
      </div>
    )}
  </div>
</div>

  );
}

export default App;





