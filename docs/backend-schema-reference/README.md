# Backend schema reference (NOT app code)

These `.jsonc` files are Base44's original data-entity definitions, kept
here only as a reference for designing the equivalent tables in
`easefin-ai`'s `app/db/models.py`. Nothing in `easefin-web` imports or
uses these — they document intent, not code.

- `GoldRate.jsonc` → informs a future `gold_rates` table
- `RemittanceCountry.jsonc` → informs a future `remittance_countries` table
- `SubscriptionRequest.jsonc` → informs the `leads` table (subscription type)
