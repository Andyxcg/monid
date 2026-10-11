import { z } from "zod";

/** GET /monid/report — provider-authenticated (X-API-Key). */
export const zReportBazaarGetReportQueryParams = z.strictObject({
    id: z.string().min(1).describe(
        "Report id, e.g. 'macro-gdp', 'pair-us-cn', 'shock-covid'. " +
            "List every id at /catalog (https://reportbazaar.app.workbuddy.host/catalog).",
    ),
    format: z.enum(["html", "json", "csv"]).optional().describe(
        "Output format. Defaults to html. JSON and CSV are machine-readable " +
            "panels an agent can parse directly.",
    ),
});
