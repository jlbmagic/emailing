import React, { useState } from "react";

import Button from "../components/Button";

const EmailChipper = () => {
  const [value, setValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  //functionality
  const handleChange = (e) => {
    setValue(e.target.value);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      if (value && isValid(value)) {
        setEmails([...emails, value]);
        setValue("");
        e.preventDefault();
      } else if (value && !isValid(value)) {
        setError("Please enter a unique & valid email address");
        e.preventDefault();
      }
    }
  };

  const handleDelete = (index) => {
    console.log("index", index);
    setEmails(emails.filter((email) => email !== index));
  };

  const isInList = (email) => {
    return emails.includes(email);
  };

  const isEmail = (email) => {
    // eslint-disable-next-line
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };
  const isValid = (email) => {
    let error = null;
    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }
    if (isInList(email)) {
      error = `${email} has already been added.`;
    }
    if (isEmail(email)) {
      // eslint-disable-next-line
      return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }
    if (error) {
      setError(error);
      return false;
    }
    return true;
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    //const isValid = isValid(paste);
    if (isValid(paste)){
    const newEmails = [];
    newEmails.push(paste); 
    const toBeAdded = newEmails.filter((email) => {
      return !emails.includes(email); 
    })
    setEmails([...toBeAdded,...emails]);
    } else {
      setError("Please enter a unique & valid email address")
    };
  };

  return (
    <main className="wrapper">
      {emails.map((email,i) => (
        <div className="tag-item" key={i}>
          {email}

          <button
            type="button"
            className="button"
            onClick={() => handleDelete(email)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        className="input"
        placeholder="Type or paste email and hit 'Enter'"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />

      {error && <p className="error">{error}</p>}
    </main>
  );
};

export default EmailChipper;