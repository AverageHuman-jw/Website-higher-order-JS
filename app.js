console.log('Hello World!');

//Show feedback from resume download
const downloadBtn = document.getElementById('downloadResume');

let hasDownloadedResume = false;
let downloadCount = 0;

function updateDownloadCount() {
    downloadCount++;
    document.getElementById('downloadCount').textContent = 'Resume downloads: ' + downloadCount;
}

downloadBtn.addEventListener('click', function () {
    updateDownloadCount();

    if (!hasDownloadedResume) {
        alert('Your resume is downloaded successfully!');
        hasDownloadedResume = true;
    }
});

// ----- User data --------
// const
const name = 'Jackson Weidner';

// ----- Greeting -----
//takes name and returns greeting
function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

//Display greeting
document.getElementById('greetingMessage').textContent = showGreeting(name);

// ----- Project data -----
// Three parallel arrays: the item at the same position in each array belongs to the same project
const projectTitles = [
    'Project One',
    'Project Two'
];

const projectDescriptions = [
    'A one or two sentence description of what this project does and what you built.',
    'A sample project in progress: a task-tracking app that lets users add, sort, and complete tasks.'
];

const projectDeadlines = [
    '2027-01-15',   // placeholder date (this project has no real deadline yet)
    '2026-12-11'
];

// ---- Project deadline -----
// Returns how many days are left from current day
function daysUntilDeadline(deadline) {
    const msPerDay = 1000 * 60 * 60 * 24;   // 1000 ms * 60 s * 60 min * 24 h = 86,400,000

    const today = new Date();               // right now
    today.setHours(0, 0, 0, 0);             // ignore the time of day: start of today

    const end = new Date(deadline + 'T00:00:00');   // start of the deadline day (local time)

    return Math.round((end - today) / msPerDay);    // difference in ms -> whole days
}

function getDeadlineMessage(daysLeft) {
    if (daysLeft > 1) {
        return '(' + daysLeft + ' days left'
    } else if (daysLeft === 1) {
        return '(1 day left)'
    } else if (daysLeft === 0){
        return '(due today!)';
    }
    return '(deadline passed)'
}

//compares the days remaining with current day to decide the projects status
function getProjectStatus(daysLeft) {
    if (daysLeft > 0) {
        return 'Ongoing';
    } else if (daysLeft === 0) {
        return 'Ongoing';
    } else if (daysLeft < 0) {
        return 'Completed';
    }
}

// Read the deadline from the page so the date only has to be written in one place

// ----- Project listings -----
// Build one card per project by looping over the arrays
const projectList = document.getElementById('projectList');
let projectCardsHTML = '';

for (let i = 0; i < projectTitles.length; i++) {
    const daysLeft = daysUntilDeadline(projectDeadlines[i]);
    const status = getProjectStatus(daysLeft);
    const badgeClass = (status === 'Ongoing') ? 'text-bg-success' : 'text-bg-secondary';

    // '2026-12-11' -> 'December 11, 2026'
    const deadlineText = new Date(projectDeadlines[i] + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    console.log(projectTitles[i] + ': ' + status + ',' + 'daysLeft' + ' days until deadline (' + projectDeadlines[i] + ')');

    projectCardsHTML += `
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h3 class="card-title h5">${projectTitles[i]} <spen class="badge ${badgeClass} align-middle ms-1">${status}</span></h3>
                    <p class="card-text">${projectDescriptions[i]}</p>
                </div>
                <div class="card-footer">
                    <strong>Deadline:</strong>
                    <time datetime="${projectDeadlines[i]}">${deadlineText}</time>
                    <span class="fw-semibold">${getDeadlineMessage(daysLeft)}</span>
                </div>
            </div>
        </div>`;
}

projectList.innerHTML = projectCardsHTML;

const deadlineDate = document.getElementById('projectDeadline').getAttribute('datetime');
const daysLeft = daysUntilDeadline(deadlineDate);

console.log('Days until project deadline (' + deadlineDate + '): ' + daysLeft);

// Show the result next to the deadline
let deadlineMessage;
if (daysLeft > 1) {
    deadlineMessage = '(' + daysLeft + ' days left)';
} else if (daysLeft === 1) {
    deadlineMessage = '(1 day left)';
} else if (daysLeft === 0) {
    deadlineMessage = '(due today!)';
} else {
    deadlineMessage = '(deadline passed)';
}
document.getElementById('daysRemaining').textContent = deadlineMessage;

// ----- Add a Skill -------
function addSkill(event) {
    event.preventDefault();

    const skillInput = document.getElementById('skillInput');
    const skillCategory = document.getElementById('killCategory');

    const skill = skillIinput.value.trim();
    if(skill === '') {
        skillInput.focus();
        return;
    }

    const list = document.getElementById(skillCategory.value);

    const newItem = document.createElement('li');
    newItem.textContent = skill;
    list.appendChild(newItem);

    skillInput.value = '';
    skillInput.focus();

}

document.getElementById('skillForm').addEventListener('submit',addSkill)

// ----- Education and experience tables -----
// Table data: each inner array is one row, in the same order as its headers
const educationHeaders = ['Institution', 'Degree', 'Status', 'Duration'];
const educationRows = [
    ['Capistrano Valley Highschool', 'Diploma', 'Graduated', '4 Years'],
    ['Saddleback Community College', 'None', 'Not graduated', '2023 - 2025'],
    ['Northern Arizona University', 'B.S. Software Engineering', 'Attending', '2025 - Present']
];

const experienceHeaders = ['Institution / Company', 'Position', 'Duration'];
const experienceRows = [
    ['Northern Arizona University', 'Software Engineering Student', '2025 - Present'],
    ['Northern Arizona University', 'CISSC Teaching Assistant', '2026 - Present']
];

// Builds a complete table from the data it is given and returns it
function createTable(captionText, headers, rows, footerText) {
    const table = document.createElement('table');
    table.className = 'table table-striped table-hover table-bordered align-middle';

    // Caption (hidden visually, read by screen readers)
    const caption = document.createElement('caption');
    caption.className = 'visually-hidden';
    caption.textContent = captionText;
    table.appendChild(caption);

    // Header row
    const thead = document.createElement('thead');
    thead.className = 'table-dark';
    const headerRow = document.createElement('tr');
    for (let i = 0; i < headers.length; i++) {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body: one <tr> per row, one <td> per value in that row
    const tbody = document.createElement('tbody');
    for (let r = 0; r < rows.length; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < rows[r].length; c++) {
            const td = document.createElement('td');
            td.textContent = rows[r][c];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    // Optional footer row that spans every column
    if (footerText) {
        const tfoot = document.createElement('tfoot');
        tfoot.className = 'table-light';
        const footerRow = document.createElement('tr');
        const footerCell = document.createElement('td');
        footerCell.colSpan = headers.length;
        footerCell.className = 'fst-italic text-muted';
        footerCell.textContent = footerText;
        footerRow.appendChild(footerCell);
        tfoot.appendChild(footerRow);
        table.appendChild(tfoot);
    }

    return table;
}

// Build both tables and put them on the page
document.getElementById('educationTable').appendChild(
    createTable('Education history', educationHeaders, educationRows, 'Expected graduation: 2028')
);
document.getElementById('experienceTable').appendChild(
    createTable('Work and school experience', experienceHeaders, experienceRows)
);