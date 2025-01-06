document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display overview stats
    fetchOverviewStats();

    // Fetch and display programs
    fetchPrograms();

    // Fetch and display events
    fetchEvents();

    // Fetch and display news
    fetchNews();

    // Fetch and display admissions
    fetchAdmissions();

    // Fetch and display users
    fetchUsers();

    // Load settings
    loadSettings();

    // Add event listeners for action buttons
    document.getElementById('add-program').addEventListener('click', showAddProgramModal);
    document.getElementById('add-event').addEventListener('click', showAddEventModal);
    document.getElementById('add-news').addEventListener('click', showAddNewsModal);
    document.getElementById('add-user').addEventListener('click', showAddUserModal);

    // Add event listener for settings form submission
    document.getElementById('settings-form').addEventListener('submit', handleSettingsSubmit);
});

async function fetchOverviewStats() {
    try {
        const response = await fetch('/api/overview-stats');
        const stats = await response.json();
        document.getElementById('total-students').textContent = stats.totalStudents;
        document.getElementById('total-teachers').textContent = stats.totalTeachers;
        document.getElementById('total-programs').textContent = stats.totalPrograms;
        document.getElementById('upcoming-events').textContent = stats.upcomingEvents;
    } catch (error) {
        console.error('Error fetching overview stats:', error);
    }
}

async function fetchPrograms() {
    try {
        const response = await fetch('/api/programs');
        const programs = await response.json();
        const tableBody = document.querySelector('#programs-table tbody');
        tableBody.innerHTML = programs.map(program => `
            <tr>
                <td>${program.name}</td>
                <td>${program.description}</td>
                <td>
                    <button onclick="editProgram(${program.id})">Edit</button>
                    <button onclick="deleteProgram(${program.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching programs:', error);
    }
}

async function fetchEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        const tableBody = document.querySelector('#events-table tbody');
        tableBody.innerHTML = events.map(event => `
            <tr>
                <td>${event.name}</td>
                <td>${new Date(event.date).toLocaleDateString()}</td>
                <td>${event.description}</td>
                <td>
                    <button onclick="editEvent(${event.id})">Edit</button>
                    <button onclick="deleteEvent(${event.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

async function fetchNews() {
    try {
        const response = await fetch('/api/news');
        const newsItems = await response.json();
        const tableBody = document.querySelector('#news-table tbody');
        tableBody.innerHTML = newsItems.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${item.summary}</td>
                <td>
                    <button onclick="editNews(${item.id})">Edit</button>
                    <button onclick="deleteNews(${item.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

async function fetchAdmissions() {
    try {
        const response = await fetch('/api/admissions');
        const admissions = await response.json();
        const tableBody = document.querySelector('#admissions-table tbody');
        tableBody.innerHTML = admissions.map(admission => `
            <tr>
                <td>${admission.studentName}</td>
                <td>${admission.grade}</td>
                <td>${new Date(admission.applicationDate).toLocaleDateString()}</td>
                <td>${admission.status}</td>
                <td>
                    <button onclick="viewAdmission(${admission.id})">View</button>
                    <button onclick="updateAdmissionStatus(${admission.id})">Update Status</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching admissions:', error);
    }
}

async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const tableBody = document.querySelector('#users-table tbody');
        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function showAddProgramModal() {
    // Implement modal for adding a new program
}

function showAddEventModal() {
    // Implement modal for adding a new event
}

function showAddNewsModal() {
    // Implement modal for adding a new news item
}

function showAddUserModal() {
    // Implement modal for adding a new user
}

function editProgram(id) {
    // Implement edit program functionality
}

function deleteProgram(id) {
    // Implement delete program functionality
}

function editEvent(id) {
    // Implement edit event functionality
}

function deleteEvent(id) {
    // Implement delete event functionality
}

function editNews(id) {
    // Implement edit news functionality
}

function deleteNews(id) {
    // Implement delete news functionality
}

function viewAdmission(id) {
    // Implement view admission details functionality
}

function updateAdmissionStatus(id) {
    // Implement update admission status functionality
}

function editUser(id) {
    // Implement edit user functionality
}

function deleteUser(id) {
    // Implement delete user functionality
}

async function loadSettings() {
    try {
        const response = await fetch('/api/settings');
        const settings = await response.json();
        document.getElementById('school-name').value = settings.schoolName;
        document.getElementById('school-email').value = settings.schoolEmail;
        document.getElementById('school-phone').value = settings.schoolPhone;
        document.getElementById('school-address').value = settings.schoolAddress;
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

async function handleSettingsSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/settings', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Settings updated successfully');
        } else {
            throw new Error('Failed to update settings');
        }
    } catch (error) {
        console.error('Error updating settings:', error);
        alert('There was an error updating the settings. Please try again.');
    }
}