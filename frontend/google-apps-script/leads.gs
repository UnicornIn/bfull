/**
 * Recibe las solicitudes de demo de la landing y las guarda en esta hoja.
 * Instrucciones de instalación: frontend/README.md → "Guardar solicitudes en Google Sheets".
 */
const SHEET_NAME = "Leads";
const FIELDS = ["nombre", "negocio", "tipo", "sedes", "whatsapp", "origen"];
const HEADERS = ["Fecha", "Nombre", "Negocio", "Tipo de negocio", "Sedes", "WhatsApp", "Origen"];

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  // campo trampa: si viene lleno es un bot
  if (data.website) return ContentService.createTextOutput("ok");

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

  // recorta y evita que un valor se interprete como fórmula
  const clean = (v) => String(v || "").slice(0, 200).replace(/^[=+\-@]/, "'$&");
  sheet.appendRow([new Date()].concat(FIELDS.map((k) => clean(data[k]))));

  return ContentService.createTextOutput("ok");
}
