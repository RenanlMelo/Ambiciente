# Ambiciente
---

## Changelog

**Current Version: [1.1.0] - 2025-05-10**

### Changed
- Completely revamped UI/UX for a smoother user experience
- Added redirect callback after login to return users to their intended page
- Updated the About page with additional content and improved structure
- Updating metadata informations

---

Ambiciente is a digital platform dedicated to environmental care and preservation. The site enables users to report environmental violations, offers informative articles, and presents an interactive map that displays environmental indicators by state. Users can also track their reports through a secure login and registration system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API's Links for Power BI](#apis-links-for-power-bi)
- [Installation and Configuration](#installation-and-configuration)
- [Versioning](#versioning)

## Overview

Ambiciente engages the community in protecting the environment by allowing users to report irregularities, stay informed through articles, and view up-to-date environmental data. With a secure login and registration system, users can track the status of their reports and access exclusive content.

## Features

### Roles
- **Description:** Divided in 3 different roles, user, staff and admin
  - **User:** Can view articles (read-only) and share reports.
  - **Staff:** Can view articles (read-only), access reports, and update report statuses.
  - **Admin:** Has full access to create and edit articles, view all users in the system, add new staff members, and remove users.

### Reporting Page
- **Description:** Enables users to report environmental violations.
- **Objective:** Facilitate the submission of reports so that authorities can take the necessary actions.

### Articles Page
- **Description:** Gathers content and news about the environment.
- **Objective:** Inform and raise awareness among users about sustainable practices and environmental preservation.

### Environmental Map Page
- **Description:** Displays an interactive map integrated with Power BI that presents environmental indicators by state.
- **Objective:** Provide a clear and updated view of the environmental state across different regions of the country through interactive reports.

### Login and Registration System
- **Description:** User authentication area.
- **Objective:** Allow users to track the status of their reports and access personalized content.

### Admin Page
- **Description:** Main page for the admin to view all users, add new staff members, and remove existing users.
- **Objective:** Enable the admin to manage users within the system.

### Staff Page
- **Description:** Main page for staff to view all reports submitted by users and update their statuses.
- **Objective:** Allow staff members to manage user reports effectively.

### User Page
- **Description:** Page where users can view all reports they have submitted.
- **Objective:** Allow users to track their reports and view the status of each one.

## Technologies Used

- **Front-end:** 
  - **Next.js:** A React framework for building modern and scalable interfaces.
  - **Tailwind CSS:** A CSS framework for rapid and responsive styling.
- **Back-end:** 
  - **FastAPI:** A Python framework for creating fast and efficient APIs.
- **Database:** 
  - **SQLite:** A lightweight database ideal for small to medium-sized applications.
- **Data Visualization:** 
  - **Power BI:** For creating and integrating interactive dashboards that display environmental indicators.
    - Made by [![KevinScavassin](https://img.shields.io/badge/@KevinScavassin-100000?style=flat&logo=github&logoColor=white)][https://github.com/KevinScavassin]

## API's Links for Power BI
- **INPE:** [Queimadas – TerraBrasilis](https://terrabrasilis.dpi.inpe.br/queimadas/bdqueimadas/)
- **IEMA:** [Air Quality – IEMA](https://energiaeambiente.org.br/qualidadedoar/)
- **ANA:** [Open Data – ANA](https://dadosabertos.ana.gov.br/search?groupIds=a7877fdc2dff4ad4a3087f0943d47e42)

## Installation and Configuration

### Prerequisites

- Node.js (for the front-end with Next.js)
- Python 3.8+ (for the back-end with FastAPI)
- npm or yarn package manager
- A Python virtual environment (optional, but recommended)

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/RenanlMelo/Ambiciente.git
   ```
   ```bash
   cd Ambiciente
   ```
   
2. **Front-end Setup:**
   - Navigate to the Next.js project directory:
    ```bash
   cd frontend
   ```
    
    - Install dependencies:
    ```bash
   npm install
    # or, if you prefer yarn:
    yarn install
   ```

    - Start the development server:
    ```bash
   npm run dev
    # or
    yarn dev
   ```
    
3. **Back-end Setup:**
   - Navigate to the back-end directory:
    ```bash
   cd ../backend
   ```
    
    - Create and activate a virtual environment (optional but recommended):
    ```bash
   python -m venv venv
    source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

    - Install dependencies:
    ```bash
   pip install -r requirements.txt
   ```

    - Start the FastAPI server:
    ```bash
   uvicorn main:app --reload
   ```

## Versioning

---

## [1.1.0] - 2025-05-10
### Changed
- Completely revamped UI/UX for a smoother user experience
- Added redirect callback after login to return users to their intended page
- Updated the About page with additional content and improved structure

---

## [1.0.0] - 2025-05-06
### Added
- Production release

---

## [0.5.0] - 2025-05-06
### Changed
- Optimized image tags for Next.js
- Improved article creation and editing functionalities
- Fixed admin functionalities
- Improved rendering performance

## [0.4.0] - 2025-05-05
### Added
- Power BI map
- Image selection option for each article

### Changed
- Improved responsiveness
- Updated image handling (front-end and back-end)
- Updated article PUT request

---

## [0.3.0] - 2025-05-02
### Added
- Private routes for each user role
- Admin functionalities: user management, staff sign-up, and user table view

### Fixed
- Static Site Generation (SSG) errors

### Changed
- Improved responsiveness

---

## [0.2.3] - 2025-04-30
### Added
- Roles functionality (front-end and back-end)
- Functionality to the reports page

### Changed
- Improved responsiveness

---

## [0.2.2] - 2025-04-26
### Changed
- Improved sign-in and sign-up functionalities
- Improved responsiveness
- Updated mobile header

---

## [0.2.1] - 2025-04-24
### Changed
- Updated sign-in and sign-up functionalities
- Added text responsiveness

---

## [0.2.0] - 2025-04-22
### Added
- User routes, schema, and model (sign-in and sign-up)

---

## [0.1.0] - 2025-03-24
### Added
- Topic functionalities within articles

### Changed
- Updated article request functionalities

---

## [0.0.3] - 2025-03-14
### Changed
- Rearranged back-end structure

---

## [0.0.2] - 2025-03-08
### Changed
- Updated article request functionalities

---

## [0.0.1] - 2025-03-07
### Added
- Initial back-end functionalities

---

## [0.0.0] - 2025-02-25
### Added
- Main pages and components

---
