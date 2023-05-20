import EmailTypeAhead from "./EmailTypeAhead";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("toChips");
const toChips = createRoot(document.getElementById("toChips"));
const ccChips = createRoot(document.getElementById("ccChips"));
const bccChips = createRoot(document.getElementById("bccChips"));
toChips.render(<EmailTypeAhead />);
ccChips.render(<EmailTypeAhead />);
bccChips.render(<EmailTypeAhead />);

const emailData = function () {
  const toChips = document.getElementById("toChips");
  const toChipsMain = toChips.getElementsByClassName("main");
  const toChipsText = toChipsMain.getElementsByClassName("tag-item");
  const ccChips = document.getElementById("ccChips").innerHTML;
  const bccChips = document.getElementById("bccChips").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("messageText").value;
  const email = {
    toChips: toChips,
    ccChips: ccChips,
    bccChips: bccChips,
    subject: subject,
    message: message,
  };
  console.log(toChipsText);
};
const button = document.getElementById("button");
button.addEventListener("click", emailData);
