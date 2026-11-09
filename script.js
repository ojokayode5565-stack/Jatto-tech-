/**
 * JATTO TECH WORLD - OFFICIAL SCRIPT
 * Interactive Conversational Enquiry Wizard (Modeled on Victor's Portfolio Start-A-Project)
 * + Tactile Neobrutalism Navigation, Tracker & Requirements Matrix
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  initMobileDrawer();

  // 2. Requirements Tab Navigation
  initRequirementsTabs();

  // 3. FAQ Accordion
  initFaqAccordion();

  // 4. Conversational Enquiry Wizard (Victor's Portfolio UI/UX)
  initConversationalWizard();

  // 5. Interactive Status Tracker Simulator
  initStatusTracker();

  // 6. Dynamic Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   1. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (mobileDrawerOverlay) {
    mobileDrawerOverlay.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   2. REQUIREMENTS TABS
   ========================================================================== */
function initRequirementsTabs() {
  const tabButtons = document.querySelectorAll('.req-tab-btn');
  const tabPanes = document.querySelectorAll('.req-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   4. CONVERSATIONAL ENQUIRY WIZARD (Victor's Start-A-Project UI/UX)
   ========================================================================== */
function initConversationalWizard() {
  const slides = document.querySelectorAll('.sap-q');
  const progressBar = document.getElementById('progress-bar');
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');
  const sapNav = document.getElementById('sap-nav');

  // Input elements
  const qName = document.getElementById('q-name');
  const echoName = document.getElementById('echo-name');
  const qLocationOptions = document.querySelectorAll('#q-location .sap-option');
  const qLocationOther = document.getElementById('q-location-other');
  const qServicesOptions = document.querySelectorAll('#q-services .sap-option');
  const qCategoryOptions = document.querySelectorAll('#q-category .sap-option');
  const qUrgencyOptions = document.querySelectorAll('#q-urgency .sap-option');
  const qPhone = document.getElementById('q-phone');
  const qEmail = document.getElementById('q-email');
  const qExistingNin = document.getElementById('q-existing-nin');
  const qNotes = document.getElementById('q-notes');

  // Action buttons on send step
  const btnWizardWhatsApp = document.getElementById('btn-wizard-whatsapp');
  const btnWizardTicket = document.getElementById('btn-wizard-ticket');
  const btnWizardEmail = document.getElementById('btn-wizard-email');

  // Modal elements
  const submissionModal = document.getElementById('submissionModal');
  const modalClose = document.getElementById('modalClose');
  const modalTicketNum = document.getElementById('modalTicketNum');
  const modalDetailsSummary = document.getElementById('modalDetailsSummary');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
  const modalCopyBtn = document.getElementById('modalCopyBtn');

  let currentStep = 0;
  const totalQuestionSteps = 7; // Steps 0 to 6 + final send step

  // Setup Single-select options (Location, Category, Urgency)
  function setupSingleSelect(optionsList, otherInput) {
    optionsList.forEach(opt => {
      opt.addEventListener('click', () => {
        optionsList.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        if (otherInput) {
          if (opt.getAttribute('data-value').includes('Other') || opt.getAttribute('data-value').includes('Others')) {
            otherInput.style.display = 'block';
            otherInput.focus();
          } else {
            otherInput.style.display = 'none';
          }
        }
      });
    });
  }

  setupSingleSelect(qLocationOptions, qLocationOther);
  setupSingleSelect(qCategoryOptions);
  setupSingleSelect(qUrgencyOptions);

  // Setup Multi-select options (Services)
  qServicesOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const selectedCount = document.querySelectorAll('#q-services .sap-option.selected').length;
      if (selectedCount === 0) {
        opt.classList.add('selected'); // Keep at least one selected
      }
    });
  });

  function getSelectedServices() {
    const actives = document.querySelectorAll('#q-services .sap-option.selected');
    return Array.from(actives).map(c => c.getAttribute('data-value'));
  }

  function getSelectedSingle(optionsList, otherInput) {
    const active = Array.from(optionsList).find(o => o.classList.contains('selected'));
    if (!active) return '';
    const val = active.getAttribute('data-value');
    if (otherInput && otherInput.style.display !== 'none' && otherInput.value.trim()) {
      return `${val} (${otherInput.value.trim()})`;
    }
    return val;
  }

  function updateProgress() {
    const progressPercent = Math.min(100, Math.round(((currentStep + 1) / (totalQuestionSteps + 1)) * 100));
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }
  }

  function showStep(stepIndex, shouldFocus = false) {
    slides.forEach((slide, idx) => {
      if (idx === stepIndex) {
        slide.classList.add('active');
        // Only focus text input if explicitly requested (not on initial page load)
        if (shouldFocus) {
          const textInput = slide.querySelector('input[type="text"], input[type="tel"], textarea');
          if (textInput && textInput.style.display !== 'none') {
            setTimeout(() => textInput.focus(), 150);
          }
        }
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Nav buttons
    if (btnBack) {
      btnBack.disabled = (stepIndex === 0);
    }

    if (btnNext) {
      if (stepIndex >= totalQuestionSteps) {
        // We are on the final Send slide
        btnNext.style.display = 'none';
      } else {
        btnNext.style.display = 'inline-flex';
        btnNext.innerHTML = (stepIndex === totalQuestionSteps - 1)
          ? `View Send Options <i class="fa-solid fa-arrow-right"></i>`
          : `Continue <i class="fa-solid fa-arrow-right"></i>`;
      }
    }

    updateProgress();
  }

  function validateCurrentStep() {
    // Step 0: Name validation
    if (currentStep === 0) {
      const nameVal = qName.value.trim();
      if (!nameVal) {
        qName.focus();
        qName.style.borderColor = '#ef4444';
        setTimeout(() => qName.style.borderColor = '', 1500);
        return false;
      }
      if (echoName) {
        const firstName = nameVal.split(' ')[0] || nameVal;
        echoName.textContent = firstName;
      }
    }

    // Step 2: Services validation
    if (currentStep === 2) {
      const services = getSelectedServices();
      if (services.length === 0) {
        alert('Please select at least one identity or corporate service.');
        return false;
      }
    }

    // Step 5: Phone validation
    if (currentStep === 5) {
      const phoneVal = qPhone.value.trim();
      if (!phoneVal) {
        qPhone.focus();
        qPhone.style.borderColor = '#ef4444';
        setTimeout(() => qPhone.style.borderColor = '', 1500);
        return false;
      }
    }

    return true;
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (!validateCurrentStep()) return;
      if (currentStep < slides.length - 1) {
        currentStep++;
        showStep(currentStep, true);
      }
    });
  }

  if (btnBack) {
    btnBack.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep, false);
      }
    });
  }

  // Keyboard Enter key on text inputs
  [qName, qLocationOther, qPhone, qEmail, qExistingNin].forEach(inp => {
    if (inp) {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (btnNext && btnNext.style.display !== 'none') {
            btnNext.click();
          }
        }
      });
    }
  });

  // Construct structured WhatsApp message
  function buildWhatsAppUrl() {
    const name = qName.value.trim() || 'Prospective Client';
    const location = getSelectedSingle(qLocationOptions, qLocationOther) || 'Nigeria';
    const services = getSelectedServices().join(', ') || 'NIN Service';
    const category = getSelectedSingle(qCategoryOptions) || 'Adult';
    const urgency = getSelectedSingle(qUrgencyOptions) || 'Express';
    const phone = qPhone.value.trim() || 'Not specified';
    const email = qEmail.value.trim() || 'Not specified';
    const nin = qExistingNin.value.trim() || 'None provided';
    const notes = qNotes.value.trim() || 'None';

    const message = 
      `*NEW FAST-TRACK BRIEF - JATTO TECH WORLD*\n\n` +
      `👤 *Full Name:* ${name}\n` +
      `📞 *Phone/WhatsApp:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `🌍 *Location Desk:* ${location}\n` +
      `👥 *Applicant Category:* ${category}\n` +
      `⚡ *Priority:* ${urgency}\n` +
      `🆔 *Existing NIN/Tracking:* ${nin}\n\n` +
      `📋 *Requested Services:*\n${services}\n\n` +
      `📝 *Notes / Challenges:*\n${notes}\n\n` +
      `_Sent via Jatto Tech World Portal Wizard_`;

    return `https://wa.me/2348073638878?text=${encodeURIComponent(message)}`;
  }

  // Handle WhatsApp Fast-Track Click
  if (btnWizardWhatsApp) {
    btnWizardWhatsApp.addEventListener('click', () => {
      const waUrl = buildWhatsAppUrl();
      window.open(waUrl, '_blank');
    });
  }

  // Handle Online Ticket Submission Click
  if (btnWizardTicket) {
    btnWizardTicket.addEventListener('click', () => {
      const randomTicketNum = Math.floor(10000 + Math.random() * 90000);
      const ticketId = `JTW-${randomTicketNum}`;

      const name = qName.value.trim() || 'Prospective Applicant';
      const services = getSelectedServices().join(', ') || 'NIN Service';
      const location = getSelectedSingle(qLocationOptions, qLocationOther);
      const urgency = getSelectedSingle(qUrgencyOptions);

      if (modalTicketNum) modalTicketNum.textContent = ticketId;
      if (modalDetailsSummary) {
        modalDetailsSummary.innerHTML = `
          <strong>Applicant:</strong> ${name}<br/>
          <strong>Services:</strong> ${services}<br/>
          <strong>Location Desk:</strong> ${location}<br/>
          <strong>Urgency:</strong> ${urgency}<br/>
          <strong>Status:</strong> Queued &amp; Assigned to Desk Officer
        `;
      }

      if (modalWhatsAppBtn) {
        modalWhatsAppBtn.onclick = () => {
          const waUrl = buildWhatsAppUrl();
          window.open(waUrl, '_blank');
        };
      }

      if (modalCopyBtn) {
        modalCopyBtn.onclick = () => {
          const summaryText = `JATTO TECH WORLD Ticket: ${ticketId} | Applicant: ${name} | Services: ${services} | Location: ${location}`;
          navigator.clipboard.writeText(summaryText).then(() => {
            alert('Tracking Reference ' + ticketId + ' copied to clipboard!');
          });
        };
      }

      if (submissionModal) {
        submissionModal.classList.add('active');
      }
    });
  }

  // Handle Email Draft Click
  if (btnWizardEmail) {
    btnWizardEmail.addEventListener('click', () => {
      const name = qName.value.trim() || 'Prospective Applicant';
      const phone = qPhone.value.trim();
      const services = getSelectedServices().join(', ');
      const location = getSelectedSingle(qLocationOptions, qLocationOther);
      const notes = qNotes.value.trim();

      const subject = encodeURIComponent(`NIN / CAC Verification Brief - ${name}`);
      const body = encodeURIComponent(
        `Hello Jatto Tech World Support Desk,\n\n` +
        `I would like to initiate an identity / corporate verification brief:\n\n` +
        `Applicant Name: ${name}\n` +
        `Phone Number: ${phone}\n` +
        `Location Desk: ${location}\n` +
        `Services: ${services}\n` +
        `Notes: ${notes}\n\n` +
        `Please advise on document verification steps.`
      );

      window.location.href = `mailto:jattotechworld@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Close modal
  if (modalClose && submissionModal) {
    modalClose.addEventListener('click', () => {
      submissionModal.classList.remove('active');
    });

    submissionModal.addEventListener('click', (e) => {
      if (e.target === submissionModal) {
        submissionModal.classList.remove('active');
      }
    });
  }

  // Global jump helpers
  window.selectServiceInForm = function(serviceName) {
    qServicesOptions.forEach(opt => {
      if (opt.getAttribute('data-value') === serviceName) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.selectLocationInForm = function(locationKeyword) {
    qLocationOptions.forEach(opt => {
      if (opt.getAttribute('data-value').includes(locationKeyword)) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize first slide WITHOUT auto-focusing to prevent auto-scrolling to enquiry
  showStep(0, false);

  // If no anchor in URL, ensure viewport starts at the top (Home)
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}

/* ==========================================================================
   5. STATUS TRACKER SIMULATOR
   ========================================================================== */
function initStatusTracker() {
  const btnCheckStatus = document.getElementById('btnCheckStatus');
  const trackerInput = document.getElementById('trackerInput');
  const trackerResult = document.getElementById('trackerResult');

  if (btnCheckStatus && trackerInput && trackerResult) {
    btnCheckStatus.addEventListener('click', () => {
      const query = trackerInput.value.trim();
      if (!query) {
        alert('Please enter a ticket number (e.g. JTW-7281) or registered phone number.');
        trackerInput.focus();
        return;
      }

      btnCheckStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
      btnCheckStatus.disabled = true;

      setTimeout(() => {
        btnCheckStatus.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Check Status';
        btnCheckStatus.disabled = false;

        trackerResult.innerHTML = `
          <div class="tracker-status-header">
            <div>
              <span class="status-code">QUERY: ${query.toUpperCase()}</span>
              <span class="status-applicant">Verification System Verified • Priority Queue Active</span>
            </div>
            <span class="status-pill status-in-progress">
              Active in Processing
            </span>
          </div>

          <div class="tracking-timeline">
            <div class="track-step completed">
              <div class="track-dot"><i class="fa-solid fa-check"></i></div>
              <div class="track-info">
                <h5>Verification Ingestion</h5>
                <span>Identity parameters validated</span>
              </div>
            </div>
            <div class="track-step completed">
              <div class="track-dot"><i class="fa-solid fa-check"></i></div>
              <div class="track-info">
                <h5>NIMC Database Match</h5>
                <span>Biometrics synchronized</span>
              </div>
            </div>
            <div class="track-step active">
              <div class="track-dot"><span class="track-pulse"></span></div>
              <div class="track-info">
                <h5>Harmonization</h5>
                <span>High-resolution document rendering</span>
              </div>
            </div>
            <div class="track-step">
              <div class="track-dot"><i class="fa-solid fa-clock"></i></div>
              <div class="track-info">
                <h5>Client Dispatch</h5>
                <span>Encrypted PDF delivery via WhatsApp</span>
              </div>
            </div>
          </div>
        `;
      }, 600);
    });
  }
}
