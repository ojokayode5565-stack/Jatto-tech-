# Jatto Tech World — Official NIN & CAC Verification Portal

A high-performance, responsive identity portal designed with **Tactile Neobrutalism** (inspired by the Victor Ayobami Portfolio design system) and institutional Nigerian Government identity standards (**NIMC & CAC**).

---

## 🎨 UI/UX & Design Highlights

### 1. Tactile Neobrutalism Design System
- **Crisp Outlines & Hard Drop Shadows:** Solid 2.5px dark ink borders (`#0f172a`) paired with offset drop shadows (`4px 4px 0px`, `6px 6px 0px`, `10px 10px 0px`).
- **Tactile Interactive States:** Buttons and cards lift up on hover (`translate(-3px, -3px)`) and press down on active clicks.
- **Sticky White Navbar:** Pure white (`#FFFFFF`) floating navigation bar with solid bottom ink border, drop shadow, brand badge, and slide-out mobile drawer overlay.
- **Continuous Moving Brand Marquee:** Straight-line infinite marquee showcasing official regulatory bodies (NIMC, CAC, NIS Passport, BVN, UK/USA/Canada Diaspora desks).
- **Official Brand Colors Preserved:**
  - Nigerian National Green: `#008751`
  - Deep Forest Green: `#064e3b` / `#022c22`
  - Accent Gold / Amber: `#f59e0b` / `#fef3c7`
  - WhatsApp Green: `#25D366`

### 2. Conversational Enquiry Wizard (Victor Portfolio "Start A Project" Flow)
- **Step-by-Step Card Flow (`.sap-convo-card`):**
  - **Step 0:** Full Name (with personalized name echo on subsequent slides)
  - **Step 1:** Location Desk (Nigeria Home, UK, USA/Canada, UAE, Global Diaspora)
  - **Step 2:** Service Selection (Multi-select tactile chips for Enrollment, Modification, Retrieval, Validation, CAC)
  - **Step 3:** Applicant Category (Adult 16+, Minor 0-15, Corporate Entity)
  - **Step 4:** Turnaround & Urgency (⚡ Express Same-Day, ⏱️ Standard 24–48h, 💬 Consultation)
  - **Step 5:** Contact Information (Phone/WhatsApp, Email, Existing NIN)
  - **Step 6:** Specific Notes & Challenge Details
  - **Step 7 (Action):** Instant 1-click transmission:
    - **Fast-Track WhatsApp:** Directly sends a pre-formatted, structured message to `+2348073638878`.
    - **Submit Ticket Online:** Generates an official tracking reference code (e.g. `JTW-88492`) with a receipt modal.
    - **Draft Email:** Opens email client with formatted brief.

### 3. Comprehensive Flyer Services Included
1. **NIN Enrollment (Child & Adult)**
2. **NIN Modification (Name, DOB, Phone, Address)**
3. **NIN / BVN Slip Retrieval (Standard Color Slip & PVC Smart Card)**
4. **NIN Validation (NIS International Passport & Tier-3 Bank KYC)**
5. **CAC Business Registration (Business Names, Companies, NGOs)**
6. **All NIN General Services (Duplicate Resolution & Biometric Errors)**

---

## 🚀 How to Preview Locally

The local preview server is running at:
```
http://localhost:5600/
```

Or run:
```bash
agy-node server.js
```
