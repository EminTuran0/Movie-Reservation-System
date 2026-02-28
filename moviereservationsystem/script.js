let currentUser = null;
let selectedSeats = [];
let seatMatrix = [];
let seatElements = []; // DOM elemanlarını burada saklayacağız

// Yaşa göre fiyat
function getTicketPrice(age) {
  if (age < 18) return 10;
  if (age < 26) return 15;
  if (age < 65) return 25;
  return 10;
}

// Kullanıcı formu
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = parseInt(document.getElementById("age").value);

  const role = (email === "admin@admin.com") ? "admin" : "user";
  const ticketPrice = getTicketPrice(age);

  currentUser = { name, surname, email, phone, age, role, ticketPrice };

  // Sağ panel aktif
  document.getElementById("reservationInfo").classList.remove("hidden");
  document.getElementById("resName").textContent = name;
  document.getElementById("resSurname").textContent = surname;

  // Adminse koltuk kurulum paneli göster
  if (role === "admin") {
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    // Kullanıcıysa mevcut koltuklara tıklama aktifleşsin
    enableSeatClicking();
  }
});

// Admin koltukları tanımlar
document.getElementById("setSeats").addEventListener("click", function () {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const seatingArea = document.getElementById("seatingArea");

  seatingArea.innerHTML = '';
  seatMatrix = [];
  seatElements = [];

  for (let i = 0; i < rows; i++) {
    const rowDiv = document.createElement("div");
    seatElements[i] = [];
    seatMatrix[i] = [];

    for (let j = 0; j < cols; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.dataset.row = i;
      seat.dataset.col = j;
      seat.title = "Available";

      rowDiv.appendChild(seat);
      seatElements[i][j] = seat;
      seatMatrix[i][j] = { reserved: false, user: null };
    }

    seatingArea.appendChild(rowDiv);
  }

  // Kullanıcı daha önce giriş yaptıysa tıklamayı etkinleştir
  if (currentUser && currentUser.role === "user") {
    enableSeatClicking();
  }
});

// Kullanıcı giriş yaptıysa koltuk tıklamasını aktif eder
function enableSeatClicking() {
  for (let i = 0; i < seatElements.length; i++) {
    for (let j = 0; j < seatElements[i].length; j++) {
      const seat = seatElements[i][j];
      seat.onclick = () => toggleSeat(seat);
    }
  }
}

// Koltuk seçme/iptal
function toggleSeat(seat) {
  const row = seat.dataset.row;
  const col = seat.dataset.col;
  const seatId = `${parseInt(row) + 1}-${parseInt(col) + 1}`;
  const seatKey = `${row}-${col}`;

  const index = selectedSeats.findIndex(s => s.key === seatKey);

  if (index > -1) {
    selectedSeats.splice(index, 1);
    seat.classList.remove("selected");
    seat.removeAttribute("data-price");
  } else {
    const price = getTicketPrice(currentUser.age);
    selectedSeats.push({
      key: seatKey,
      label: seatId,
      price: price
    });

    seat.classList.add("selected");
    seat.setAttribute("data-price", `$${price}`);
  }

  updateReservationInfo();
}

// Sağ panele koltuk ve fiyat bilgisi yaz
function updateReservationInfo() {
  const seatLabels = selectedSeats.map(seat => seat.label);
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  document.getElementById("resSeats").textContent = seatLabels.join(", ");
  document.getElementById("resPrice").textContent = totalPrice;
}

// Onay butonu
document.getElementById("confirm").addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  const name = currentUser.name;
  const surname = currentUser.surname;
  const seats = selectedSeats.map(s => s.label).join(", ");
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  alert(`Reservation Confirmed!\n\nName: ${name} ${surname}\nSeats: ${seats}\nTotal: $${total}`);

  // Koltukları pasifleştir, istersen kilitleyebilirsin
  selectedSeats.forEach(s => {
    const [row, col] = s.key.split("-");
    const seat = seatElements[row][col];
    seat.classList.remove("selected");
    seat.classList.add("disabled");
    seat.onclick = null;
  });

  selectedSeats = [];
  updateReservationInfo();
});
