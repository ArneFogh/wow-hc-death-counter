# WoW Hardcore Death Counter

A web application specifically designed for World of Warcraft Hardcore players to track and commemorate their character deaths. Currently themed for the "Mayo" guild/community, but easily customizable for any WoW community.

[Screenshot placeholder]

## Features

- Track WoW character deaths including:
  - Character name
  - Level at death
  - Character class
  - Player name
  - Cause of death
- Theme-based username generator (currently Mayo-themed, easily customizable)
- Real-time updates
- Dark mode interface
- Data stored in Google Sheets for easy access and community management

## Customization

The application is currently themed for the "Mayo" community but can be easily customized:

1. Change the project name in `package.json`
2. Modify the username generator themes in `src/components/UsernameGenerator.js`
3. Update colors in `tailwind.config.js`
4. Replace fonts in the `src/app/fonts` directory

## Setup Guide

### 1. Google Sheets Setup

1. Create a new Google Sheet
2. Add these column headers in row 1:
   - A1: Name
   - B1: Level
   - C1: Reason
   - D1: Class
   - E1: Player

[Screenshot placeholder: Google Sheets setup]

### 2. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a service account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the service account details
   - Click "Done"
5. Create a key for your service account:
   - Click on your service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON
   - Download the key file
6. Share your Google Sheet with the service account email

[Screenshot placeholder: Google Cloud setup steps]

### 3. Deploy to Vercel

1. Fork this repository
2. Go to [Vercel](https://vercel.com/)
3. Create a new project and import your forked repository
4. Add these environment variables:
   ```
   GOOGLE_SERVICE_ACCOUNT=[Your base64 encoded service account JSON]
   SPREADSHEET_ID=[Your Google Spreadsheet ID]
   ```
   To encode your service account JSON:
   ```bash
   cat your-service-account.json | base64
   ```
5. Deploy!

[Screenshot placeholder: Vercel deployment]

### 4. Local Development

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Create .env.local with your environment variables
# Add the same variables as in the Vercel deployment

# Start development server
npm run dev
```

## Support

If you need help or want to report issues, please create an issue in this repository.

## License

This project is open source and available under the MIT License.
