"use strict";

const calculateDiscount = (customer, subtotal) => {
  if (customer == "reg") {
    if (subtotal >= 100 && subtotal < 250) {
      return 0.1;
    } else if (subtotal >= 250 && subtotal < 500) {
      return 0.25;
    } else if (subtotal >= 500) {
      return 0.3;
    } else {
      return 0;
    }
  } else if (customer == "loyal") {
    return 0.3;
  } else if (customer == "honored") {
    if (subtotal < 500) {
      return 0.4;
    } else {
      return 0.5;
    }
  }
};

$(document).ready(() => {
  $("#calculate").click(() => {
    const customerType = $("#type").val();
    let subtotal = $("#subtotal").val();
    let invoiceDate = $("#invoice_date").val();
    subtotal = parseFloat(subtotal);
    if (isNaN(subtotal) || subtotal <= 0) {
      alert("Subtotal must be a number greater than zero.");
      $("#clear").click();
      $("#subtotal").focus();
      return;
    }

    if (!invoiceDate) {
      let date = new Date();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      const yy = date.getFullYear();
      invoiceDate = mm + "/" + dd + "/" + yy;
      $("#invoice_date").val(invoiceDate);
    }

    const dateParts = invoiceDate.split("/");
    if (dateParts.length != 3) {
      $("#invoice_date").val("");
      $("#invoice_date").focus();
      alert("Please enter the date in MM/DD/YYYY format.");
      return;
    }

    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    if (month < 1 || month > 12) {
      $("#invoice_date").val("");
      $("#invoice_date").focus();
      alert("Month should be between 01-12");
      return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    if (day < 1 || day > daysInMonth) {
      $("#invoice_date").val("");
      $("#invoice_date").focus();
      alert("Invalid day of month");
      return;
    }

    let date = new Date(invoiceDate);
    if (date == "Invalid Date") {
      $("#invoice_date").val("");
      $("#invoice_date").focus();
      alert("Please enter the valid date in MM/DD/YYYY format.");
      return;
    }

    const discountPercent = calculateDiscount(customerType, subtotal);
    const discountAmount = subtotal * discountPercent;
    const invoiceTotal = subtotal - discountAmount;

    $("#subtotal").val(subtotal.toFixed(2));
    $("#percent").val((discountPercent * 100).toFixed(2));
    $("#discount").val(discountAmount.toFixed(2));
    $("#total").val(invoiceTotal.toFixed(2));

    let dueDate = new Date(month + "/" + day + "/" + year);
    dueDate.setDate(dueDate.getDate() + 30);

    const m = dueDate.getMonth() + 1;
    const d = dueDate.getDate();
    const y = dueDate.getFullYear();

    $("#due_date").val(m + "/" + d + "/" + y);

    // set focus on type drop-down when done
    $("#type").focus();
  });

  $("#clear").click(() => {
    $("#type").val("reg");
    $("#subtotal").val("");
    $("#invoice_date").val("");
    $("#percent").val("");
    $("#discount").val("");
    $("#total").val("");
    $("#due_date").val("");

    // set focus on type drop-down when done
    $("#type").focus();
  });

  // set focus on type drop-down on initial load
  $("#type").focus();
});
