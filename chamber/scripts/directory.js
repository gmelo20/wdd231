// Display current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Display last modified date
document.getElementById('last-modified').textContent = document.lastModified;

let allMembers = [];
let filteredMembers = [];

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        allMembers = await response.json();
        filteredMembers = [...allMembers];
        
        displayMembers(filteredMembers);
        setupViewToggle(filteredMembers);
        updateStats(allMembers);
        setupFilter();
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('directory-container').innerHTML = 
            '<p class="error">Error loading directory. Please try again later.</p>';
    }
}

function updateStats(members) {
    const gold = members.filter(m => m.membershipLevel === 3).length;
    const silver = members.filter(m => m.membershipLevel === 2).length;
    
    document.getElementById('total-members').textContent = members.length;
    document.getElementById('gold-members').textContent = gold;
    document.getElementById('silver-members').textContent = silver;
}

function setupFilter() {
    const filter = document.getElementById('industry-filter');
    filter.addEventListener('change', () => {
        const selectedIndustry = filter.value;
        
        if (selectedIndustry === 'all') {
            filteredMembers = [...allMembers];
        } else {
            filteredMembers = allMembers.filter(member => 
                member.industry === selectedIndustry
            );
        }
        
        // Reapply current view
        const isListView = document.getElementById('directory-container').classList.contains('list-view');
        if (isListView) {
            displayMembersAsList(filteredMembers);
        } else {
            displayMembers(filteredMembers);
        }
        updateStats(filteredMembers);
    });
}

function displayMembers(members) {
    const container = document.getElementById('directory-container');
    container.innerHTML = '';
    
    if (members.length === 0) {
        container.innerHTML = '<p class="no-results">No businesses found in this category.</p>';
        return;
    }
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        // Determine membership level and color
        let membershipLevel = '';
        let membershipClass = '';
        switch(member.membershipLevel) {
            case 1: 
                membershipLevel = 'Member';
                membershipClass = 'bronze';
                break;
            case 2: 
                membershipLevel = 'Silver';
                membershipClass = 'silver';
                break;
            case 3: 
                membershipLevel = 'Gold';
                membershipClass = 'gold';
                break;
        }
        
        card.innerHTML = `
            <div class="card-image">
                <img src="images/${member.image || 'placeholder.jpg'}" alt="${member.name}" loading="lazy">
                <div class="membership-badge ${membershipClass}">${membershipLevel}</div>
            </div>
            <div class="card-content">
                <h3>${member.name}</h3>
                <p class="industry">${member.industry}</p>
                <p><i class="icon">📍</i> ${member.address}</p>
                <p><i class="icon">📞</i> ${member.phone}</p>
                <p><i class="icon">🌐</i> <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                <p class="description">${member.description}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function displayMembersAsList(members) {
    const container = document.getElementById('directory-container');
    container.innerHTML = '';
    
    if (members.length === 0) {
        container.innerHTML = '<p class="no-results">No businesses found in this category.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Business Name</th>
                <th>Industry</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Membership</th>
            </tr>
        </thead>
        <tbody>
            ${members.map(member => `
                <tr>
                    <td><strong>${member.name}</strong></td>
                    <td>${member.industry}</td>
                    <td>${member.address}</td>
                    <td>${member.phone}</td>
                    <td><a href="${member.website}" target="_blank" rel="noopener">Website</a></td>
                    <td class="membership-${member.membershipLevel}">
                        ${member.membershipLevel === 1 ? 'Member' : 
                          member.membershipLevel === 2 ? 'Silver' : 'Gold'}
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.appendChild(table);
}

function setupViewToggle(members) {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const container = document.getElementById('directory-container');
    
    gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        container.classList.remove('list-view');
        container.classList.add('grid-view');
        displayMembers(members);
    });
    
    listBtn.addEventListener('click', () => {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        container.classList.remove('grid-view');
        container.classList.add('list-view');
        displayMembersAsList(members);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', getMembers);