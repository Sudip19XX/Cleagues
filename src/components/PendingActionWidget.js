// Pending Action Widget Component
// Floating widget that appears when user has pending team submission

import { subscribeToTeam, isTeamComplete, setShouldOpenModal, getSelectedTeam } from '../utils/teamState.js';
import { navigate } from '../App.js';

let widgetElement = null;
let unsubscribe = null;

export function createPendingActionWidget() {
  // Create widget element
  widgetElement = document.createElement('div');
  widgetElement.id = 'pending-action-widget';
  widgetElement.innerHTML = `
    <div class="pending-widget-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <span class="pending-widget-text">Pending Dream Team Selection</span>
    <span class="pending-widget-badge">0</span>
  `;

  // Add styles
  addWidgetStyles();

  // Add click handler
  widgetElement.addEventListener('click', handleWidgetClick);

  // Subscribe to team changes
  unsubscribe = subscribeToTeam(updateWidgetVisibility);

  // Initial visibility check
  updateWidgetVisibility();

  // Append to body
  document.body.appendChild(widgetElement);

  return widgetElement;
}

function handleWidgetClick() {
  const team = getSelectedTeam();

  // Set flag to auto-open modal ONLY if team is complete
  if (team.length === 15) {
    setShouldOpenModal(true);
  } else {
    setShouldOpenModal(false);
  }

  // Navigate to Dream Team page
  navigate('/dream-team');

  // Hide widget immediately
  if (widgetElement) {
    widgetElement.style.display = 'none';
  }
}

function updateWidgetVisibility(team) {
  if (!widgetElement) return;

  // Use provided team or get latest
  const currentTeam = Array.isArray(team) ? team : getSelectedTeam();

  // Check if we're on Dream Team page
  const currentPath = window.location.hash.replace('#', '') || '/';
  const isOnDreamTeam = currentPath === '/dream-team';

  // Show widget only if:
  // 1. Team has ANY selection (> 0)
  // 2. User is NOT on Dream Team page
  if (currentTeam.length > 0 && !isOnDreamTeam) {
    widgetElement.style.display = 'flex';
    widgetElement.classList.add('pulse');

    // Update count badge
    const badge = widgetElement.querySelector('.pending-widget-badge');
    if (badge) badge.textContent = currentTeam.length;

    // Update text based on completeness
    const textEl = widgetElement.querySelector('.pending-widget-text');
    if (textEl) {
      if (currentTeam.length === 15) {
        textEl.textContent = "Dream Team Ready to Submit";
        badge.style.background = "#09C285"; // Green for ready
      } else {
        textEl.textContent = "Pending Dream Team Selection";
        badge.style.background = "var(--color-primary)"; // Default blue
      }
    }

  } else {
    widgetElement.style.display = 'none';
    widgetElement.classList.remove('pulse');
  }
}

// Call this when route changes
export function onRouteChange() {
  updateWidgetVisibility();
}

function addWidgetStyles() {
  const styleId = 'pending-widget-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    #pending-action-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      
      display: none;
      align-items: center;
      gap: 12px;
      
      padding: 12px 20px;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #pending-action-widget:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      border-color: var(--color-primary);
      background: rgba(15, 23, 42, 0.9);
    }
    
    .pending-widget-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
    }
    
    .pending-widget-text {
      font-family: var(--font-primary);
      font-weight: 600;
      font-size: 0.95rem;
      color: #fff;
    }

    .pending-widget-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
      background: var(--color-primary);
      color: white;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    #pending-action-widget.pulse {
      animation: widgetPulse 2s infinite;
    }

    @keyframes widgetPulse {
      0% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      }
      50% {
        box-shadow: 0 4px 25px rgba(9, 194, 133, 0.4);
      }
      100% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      }
    }
  `;
  document.head.appendChild(style);
}

export function destroyWidget() {
  if (unsubscribe) {
    unsubscribe();
  }
  if (widgetElement && widgetElement.parentNode) {
    widgetElement.parentNode.removeChild(widgetElement);
  }
  widgetElement = null;
}
