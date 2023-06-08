import EmailChipper from "./emailChipper";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("toChips");
const toChips = createRoot(document.getElementById("toChips"));
const ccChips = createRoot(document.getElementById("ccChips"));
const bccChips = createRoot(document.getElementById("bccChips"));
toChips.render(<EmailChipper />);
ccChips.render(<EmailChipper />);
bccChips.render(<EmailChipper />);

const emailData = function () {
  const toChips = document.getElementById("toChips").getElementsByClassName("wrapper");
  const ccChips = document.getElementById("ccChips").getElementsByClassName("wrapper");
  const bccChips = document.getElementById("bccChips").getElementsByClassName("wrapper");
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("messageText").value;

  const emailText = (HTML) =>{
    return Array.from(HTML)
    .flatMap(wrapper => Array.from(wrapper.getElementsByClassName("tag-item")))
    .map(tagItem => {
      const buttonElement = tagItem.querySelector("button");
      const textContent = Array.from(tagItem.childNodes)
        .filter(node => node !== buttonElement)
        .map(node => node.textContent)
        .join("")
        .trim();
      return textContent;
  })
  .join(", "); // You can specify a separator of your choice, e.g., ", "
 }; 

  const email = {
    to: emailText(toChips),
    cc: emailText(ccChips),
    bcc: emailText(bccChips),
    subject: subject,
    message: message,
  };
  FileMaker.PerformScript("SendMail", JSON.stringify(email))
};
const button = document.getElementById("button");
button.addEventListener("click", emailData);
