import { defineEndpoint, UsageModelKind } from "@shared/core";
import { zReportBazaarGetReportQueryParams } from "./schema/inputs.ts";

/**
 * ReportBazaar — Fetch Macro Report.
 *
 * GET /monid/report?{id,format}. The provider-authenticated surface returns
 * the full year-by-year panel plus derived analytics for one report id as
 * HTML, JSON, or CSV. The free /preview/:id endpoint (same host) returns the
 * latest year per economy in the same field names, so an agent can sample
 * before paying. A miss (unknown id) returns 404 and costs nothing.
 */
export default defineEndpoint({
    meta: {
        displayName: "Fetch Macro Report",
        summary: "Fetch any of 171 cross-country macroeconomic reports by id.",
        description: "Fetch a single macroeconomic report by its id " +
            "(e.g. 'macro-gdp', 'pair-us-cn', 'shock-covid'). Returns the " +
            "full year-by-year panel plus derived analytics as HTML, JSON, or " +
            "CSV (set 'format'; defaults to html). The free /preview/:id " +
            "endpoint returns the latest year per economy in the same field " +
            "names, so an agent can sample before paying. The full catalog of " +
            "ids is at /catalog. Prefer the bundle endpoint for multi-report " +
            "pulls. Freshness tracks World Bank Open Data, generated on demand.",
        docsUrl: "https://reportbazaar.app.workbuddy.host/catalog",
        categories: ["macroeconomic-data"],
    },
    request: { method: "GET", path: "/monid/report" },
    input: { schema: { queryParams: zReportBazaarGetReportQueryParams } },
    usage: {
        model: {
            kind: UsageModelKind.PER_CALL,
            label: "report",
            consumes: { credit: "default", amount: 0.03 },
        },
    },
    timeouts: { requestMs: 30_000, runMs: 45_000 },
});
