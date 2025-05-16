// Demo data
const customers = [
  {
    id: '#00001',
    services: ['Haircut w/ shampoo'],
    staff: 'Gilly'
  },
  {
    id: '#00002',
    services: ['Haircut'],
    staff: 'Sol'
  },
  {
    id: '#00003',
    services: ['Manicure', 'Pedicure'],
    staff: 'Grace'
  }
];

function populateDateDropdowns() {
  const daySelect = document.getElementById('date-day');
  const monthSelect = document.getElementById('date-month');
  const yearSelect = document.getElementById('date-year');

  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    daySelect.appendChild(opt);
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = i + 1;
    opt.textContent = m;
    monthSelect.appendChild(opt);
  });

  const year = new Date().getFullYear();
  for (let y = year - 5; y <= year + 5; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
  // Set current date
  daySelect.value = new Date().getDate();
  monthSelect.value = new Date().getMonth() + 1;
  yearSelect.value = year;
}

function renderCustomerTable() {
  const tbody = document.getElementById('customer-table-body');
  tbody.innerHTML = '';
  customers.forEach((customer, idx) => {
    const tr = document.createElement('tr');
    // Customer ID
    const tdId = document.createElement('td');
    tdId.textContent = customer.id;
    tr.appendChild(tdId);
    // Services
    const tdServices = document.createElement('td');
    tdServices.textContent = customer.services.join(', ');
    tr.appendChild(tdServices);
    // Add/Delete Service buttons
    const tdActions = document.createElement('td');
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Service';
    addBtn.className = 'action-btn';
    addBtn.onclick = () => {
      const newService = prompt('Enter new service:');
      if (newService) {
        customer.services.push(newService);
        renderCustomerTable();
      }
    };
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete Service';
    delBtn.className = 'action-btn';
    delBtn.onclick = () => {
      if (customer.services.length > 0) {
        customer.services.pop();
        renderCustomerTable();
      }
    };
    tdActions.appendChild(addBtn);
    tdActions.appendChild(delBtn);
    tr.appendChild(tdActions);
    // Staff
    const tdStaff = document.createElement('td');
    tdStaff.textContent = customer.staff;
    tr.appendChild(tdStaff);
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateDateDropdowns();
  renderCustomerTable();
}); 