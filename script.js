// array to store details of issued books
var issuedBooks = [];

// function to issue a book
function issueBook() {
  var bookName = document.getElementById("bookName").value;
  var issuedTo = document.getElementById("issuedTo").value;
  var issuedTime = new Date().toLocaleString();
  var status = "not returned";
  var id = issuedBooks.length + 1;
  issuedBooks.push({id: id, book_name: bookName, issued_to: issuedTo, issued_time: issuedTime, status: status});
  updateTable();
}

// function to update the table with issued books
function updateTable() {
  var table = document.getElementById("issuedBooksTable");
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  for (var i = 0; i < issuedBooks.length; i++) {
    var row = table.insertRow(i+1);
    row.insertCell(0).innerHTML = issuedBooks[i].id;
    row.insertCell(1).innerHTML = issuedBooks[i].book_name;
    row.insertCell(2).innerHTML = issuedBooks[i].issued_to;
    row.insertCell(3).innerHTML = issuedBooks[i].issued_time;
    var statusCell = row.insertCell(4);
    statusCell.innerHTML = issuedBooks[i].status;
    if (issuedBooks[i].status === "not returned") {
      statusCell.style.color = "red";
    } else {
      statusCell.style.color = "green";
    }
    statusCell.contentEditable = true;
    statusCell.onblur = function() {
      updateStatus(this);
    };
  }
}

// function to update the status of an issued book
function updateStatus(cell) {
  var row = cell.parentNode;
  var index = row.rowIndex - 1;
  var status = cell.innerHTML;
  issuedBooks[index].status = status;
  if (status === "not returned") {
    cell.style.color = "red";
  } else {
    cell.style.color = "green";
  }
}