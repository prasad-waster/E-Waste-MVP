# ♻️ Revolutionizing E-Waste Management with AI and Community

InnoVibe is a dynamic web platform developed for the **Google Solution Challenge** to address the escalating **e-waste crisis** through innovative technology and community engagement.

Our platform empowers users to recycle responsibly by:
- Estimating the value of old electronics using AI,
- Connecting with upcyclers/artists for creative reuse,
- Locating nearby recycling and collection centers via Google Maps,
- Earning rewards and tracking contributions through a gamified credit system.

## 🌍 Problem Statement

E-waste is one of the fastest-growing waste streams globally, yet recycling remains inefficient, inaccessible, and unengaging. Millions of usable electronics are discarded due to a lack of awareness, infrastructure, and incentives.

## 💡 Our Solution

InnoVibe makes e-waste management:
- **Easy** with AI-based product valuation,
- **Creative** by partnering with artists for upcycling,
- **Accessible** with map-based navigation to centers,
- **Motivating** with reward points and leaderboards.

## ✨ Features

- 🔍 **AI Price Estimator**  
  Upload images of your old devices and get an estimated value instantly.

- 🎨 **Upcycle Connect**  
  Artists can showcase their recycled creations, and users can submit items to be creatively reused.

- 🗺️ **Google Maps Integration**  
  Find the nearest certified recycling or donation center.

- 🏆 **Gamified Recycling**  
  Earn credit points for every recycled item and climb the leaderboard to win eco-badges.

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Python + Django  
- **AI Model**: TensorFlow / Custom Python Model for image-based price estimation  
- **APIs**: Google Maps API, EmailJS  
- **Database**: SQLite/PostgreSQL (depending on deployment)

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/innovibe-ewaste-app.git
cd innovibe-ewaste-app

# Install frontend dependencies
cd frontend
npm install
npm start

# In a new terminal, run backend
cd backend
pip install -r requirements.txt
python manage.py runserver
