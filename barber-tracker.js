const statusOptions = [
  { value: 'Available', label: 'Available' },
  { value: 'On Break', label: 'On Break' },
  { value: 'In Service', label: 'In Service' }
];

const barbers = [
  { name: 'Barber 1', status: 'Available', customer: '-' },
  { name: 'Barber 2', status: 'On Break', customer: '-' },
  { name: 'Barber 3', status: 'In Service', customer: '-' }
];

const modal = document.getElementById('editModal');
const removeModal = document.getElementById('removeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const addBarberBtn = document.getElementById('addBarberBtn');
const removeBarberBtn = document.getElementById('removeBarberBtn');
const confirmRemoveBtn = document.getElementById('confirmRemoveBtn');
const cancelRemoveBtn = document.getElementById('cancelRemoveBtn');
const removeSelect = document.getElementById('removeSelect');

let currentEditIndex = null;
let currentEditField = null;

function renderTable() {
  const tbody = document.querySelector('#barberTable tbody');
  tbody.innerHTML = '';
  barbers.forEach((barber, idx) => {
    const tr = document.createElement('tr');

    // Barber name (editable)
    const tdName = document.createElement('td');
    tdName.textContent = barber.name;
    tdName.onclick = () => openModal('name', idx);
    tr.appendChild(tdName);

    // Status (editable)
    const tdStatus = document.createElement('td');
    tdStatus.textContent = barber.status;
    tdStatus.className = getStatusClass(barber.status);
    tdStatus.onclick = () => openModal('status', idx);
    tr.appendChild(tdStatus);

    // Current Customer (always dash)
    const tdCustomer = document.createElement('td');
    tdCustomer.textContent = barber.customer;
    tr.appendChild(tdCustomer);

    tbody.appendChild(tr);
  });
}

function getStatusClass(status) {
  if (status === 'Available') return 'status-available';
  if (status === 'On Break') return 'status-break';
  if (status === 'In Service') return 'status-service';
  return '';
}

function openModal(field, idx) {
  currentEditIndex = idx;
  currentEditField = field;

  if (field === 'name') {
    modalTitle.textContent = 'Edit Barber Name';
    modalBody.innerHTML = `<input type="text" id="editInput" value="${barbers[idx].name}" style="width: 100%; padding: 0.5rem;">`;
  } else if (field === 'status') {
    modalTitle.textContent = 'Edit Barber Status';
    modalBody.innerHTML = `
      <select id="editInput" style="width: 100%; padding: 0.5rem;">
        ${statusOptions.map(opt => `<option value="${opt.value}" ${opt.value === barbers[idx].status ? 'selected' : ''}>${opt.label}</option>`).join('')}
      </select>
    `;
  }

  modal.classList.add('active');
}

saveBtn.onclick = () => {
  const editInput = document.getElementById('editInput');
  if (currentEditField === 'name') {
    barbers[currentEditIndex].name = editInput.value || 'Barber';
  } else if (currentEditField === 'status') {
    barbers[currentEditIndex].status = editInput.value;
  }
  closeModal();
  renderTable();
};

cancelBtn.onclick = closeModal;

function closeModal() {
  modal.classList.remove('active');
  currentEditIndex = null;
  currentEditField = null;
}

addBarberBtn.onclick = () => {
  barbers.push({ name: `Barber ${barbers.length + 1}`, status: 'Available', customer: '-' });
  renderTable();
};

removeBarberBtn.onclick = () => {
  populateRemoveSelect();
  removeModal.classList.add('active');
};

confirmRemoveBtn.onclick = () => {
  const selectedBarber = removeSelect.value;
  const index = barbers.findIndex(barber => barber.name === selectedBarber);
  if (index !== -1) {
    barbers.splice(index, 1);
    renderTable();
  }
  closeRemoveModal();
};

cancelRemoveBtn.onclick = closeRemoveModal;

function closeRemoveModal() {
  removeModal.classList.remove('active');
}

function populateRemoveSelect() {
  removeSelect.innerHTML = barbers.map(barber => `<option value="${barber.name}">${barber.name}</option>`).join('');
}

renderTable();