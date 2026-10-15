import { defineProvider, presets, UsageModelKind } from "@shared/core";

/**
 * ReportBazaar (reportbazaar.app.workbuddy.host) — machine-generated
 * cross-country macroeconomic reports sold per fetch over x402. For Monid we
 * expose the same reports through a provider-authenticated surface
 * (`/monid/report`) so the Monid engine can route agent traffic to it, meter
 * every call, and share revenue. The vendor (us) is settled per call at the
 * price declared below; Monid adds its channel fee on top for the end user.
 */
export default defineProvider({
    name: "reportbazaar",
    meta: {
        displayName: "ReportBazaar",
        summary: "Machine-generated cross-country macroeconomic reports.",
        description: "171 machine-generated macroeconomic reports built from " +
            "World Bank Open Data (CC BY 4.0), covering 20 economies and 24 " +
            "categories across 2015–2025 — growth, inflation, unemployment, " +
            "debt, trade, and crisis windows. Each report is a clean HTML, " +
            "JSON, or CSV panel an agent can read directly. Pick a report by " +
            "id (e.g. 'macro-gdp', 'pair-us-cn', 'shock-covid'); the full " +
            "catalog of ids is listed at /catalog. For breadth, buy the " +
            "full-catalog bundle in one call. Reports are generated on demand " +
            "from the World Bank API, so freshness tracks the source.",
        homepageUrl: "https://reportbazaar.app.workbuddy.host",
        docsUrl: "https://reportbazaar.app.workbuddy.host/catalog",
        categories: ["macroeconomic-data"],
    },
    auth: { inject: presets.auth.header("x-api-key") },
    request: { baseUrl: "https://reportbazaar.app.workbuddy.host" },
    timeouts: { requestMs: 30_000, runMs: 45_000 },
    usage: {
        // Per-call US-dollar settlement. The endpoint declares the flat
        // $0.05/call; Monid adds its channel fee on top for the end user.
        credits: { default: { label: "US dollars" } },
    },
});
