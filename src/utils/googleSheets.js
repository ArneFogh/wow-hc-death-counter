import { google } from "googleapis";

if (!process.env.GOOGLE_SERVICE_ACCOUNT || !process.env.SPREADSHEET_ID) {
  throw new Error("Missing required environment variables");
}

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

let credentials;
try {
  credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, "base64").toString()
  );
} catch (error) {
  throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT credentials");
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export async function addDeath({ name, level, reason }) {
  try {
    console.log("Attempting to add death:", { name, level, reason });

    // Simpel range notation uden quotes
    const range = "A2:C";
    const values = [[name, level, reason]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    console.log("Successfully added death");
    return response;
  } catch (error) {
    console.error("Error adding death:", error);

    if (error.code === 404) {
      throw new Error(
        "Spreadsheet not found. Please check your SPREADSHEET_ID"
      );
    }

    if (error.code === 403) {
      throw new Error(
        "Access denied. Please check your service account permissions"
      );
    }

    throw new Error(`Failed to add death: ${error.message}`);
  }
}

export async function getDeaths() {
  try {
    console.log("Attempting to fetch deaths from spreadsheet");

    // Simpel range notation uden quotes og sheet navn
    const range = "A1:C";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });

    // Skip the header row when returning data
    const values = response.data.values || [];
    const dataRows = values.slice(1);

    console.log("Successfully fetched deaths:", dataRows);
    return dataRows;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error?.details,
    });

    if (error.code === 404) {
      throw new Error(
        "Spreadsheet not found. Please check your SPREADSHEET_ID"
      );
    }

    if (error.code === 403) {
      throw new Error(
        "Access denied. Please check your service account permissions"
      );
    }

    throw new Error(`Failed to fetch deaths: ${error.message}`);
  }
}
