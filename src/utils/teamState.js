// Global Team State Manager
// Allows sharing selected team state across components

let selectedTeam = [];
let subscribers = [];

export function getSelectedTeam() {
    return [...selectedTeam];
}

export function setSelectedTeam(team) {
    selectedTeam = [...team];
    notifySubscribers();
}

export function addToTeam(token) {
    if (selectedTeam.length < 15 && !selectedTeam.find(t => t.id === token.id)) {
        selectedTeam.push(token);
        notifySubscribers();
        return true;
    }
    return false;
}

export function removeFromTeam(tokenId) {
    const index = selectedTeam.findIndex(t => t.id === tokenId);
    if (index !== -1) {
        selectedTeam.splice(index, 1);
        notifySubscribers();
        return true;
    }
    return false;
}

export function clearTeam() {
    selectedTeam = [];
    notifySubscribers();
}

export function isTeamComplete() {
    return selectedTeam.length === 15;
}

export function subscribeToTeam(callback) {
    subscribers.push(callback);
    // Return unsubscribe function
    return () => {
        const index = subscribers.indexOf(callback);
        if (index !== -1) {
            subscribers.splice(index, 1);
        }
    };
}

function notifySubscribers() {
    subscribers.forEach(callback => callback(getSelectedTeam()));
}

// Flag to auto-open modal when navigating from widget
let shouldOpenModal = false;

export function setShouldOpenModal(value) {
    shouldOpenModal = value;
}

export function getShouldOpenModal() {
    const value = shouldOpenModal;
    shouldOpenModal = false; // Reset after reading
    return value;
}
