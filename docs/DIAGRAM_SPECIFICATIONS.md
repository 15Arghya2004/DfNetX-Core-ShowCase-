# Sentrix V10 — Diagram Specifications

This document contains complete image generation specifications for all five architecture diagrams. Each specification is a self-contained prompt for an AI image generator (e.g., ChatGPT DALL-E, Midjourney, or Stable Diffusion).

---

## Diagram Priority and Placement

| Priority | Diagram | README Section | File |
|---|---|---|---|
| 1 (Hero) | Architecture Overview | Top of README, below badges | `docs/architecture_overview.png` |
| 2 | Detection Pipeline | Detection Pipeline section | `docs/detection_pipeline.png` |
| 3 | ML Pipeline | Machine Learning Pipeline section | `docs/ml_pipeline.png` |
| 4 | Deployment Diagram | Docker Deployment section | `docs/deployment_diagram.png` |
| 5 | Authentication Flow | Security Model section | `docs/auth_flow.png` |

---

## Diagram 1 — Architecture Overview (Hero Image)

**Purpose:** Give any reader — engineer, manager, investor — an instant understanding of the entire Sentrix platform: what connects to what, how data flows from external sources through detection engines to analyst response.

**Why it is the hero:** This is the single most important visualisation. It communicates the system's scope, sophistication, and design philosophy in one glance.

**Recommended Size:** 2400 x 1400 pixels  
**Aspect Ratio:** 12:7  
**Format:** PNG with transparent or dark background

---

### Visual Style

- Dark mode engineering diagram. Deep navy background (#0D1B2A or #0A0E1A).
- Professional, clean, "infrastructure as code" aesthetic — similar to AWS architecture diagrams but with cybersecurity colouring.
- Glassmorphism panels for each major component group (semi-transparent frosted glass cards with subtle white borders).
- Accent colours:
  - Threat/Detection: Amber/Orange (#F59E0B)
  - ML/AI: Purple (#8B5CF6)
  - SOAR/Response: Red (#EF4444)
  - Investigation: Teal (#14B8A6)
  - Ingestion/Collectors: Cyan (#06B6D4)
  - Storage/Database: Emerald (#10B981)
  - Infrastructure: Steel Blue (#64748B)
  - User/Browser: Indigo (#6366F1)

---

### Layout

Three horizontal layers, top to bottom:

**LAYER 1 (TOP) — DATA SOURCES AND COLLECTORS**  
Left side: DVWA attack target application box (red border, skull icon, label "Attack Target DVWA Port 8080"), connected with orange dotted arrow labelled "HTTP Traffic" to Suricata IDS box (amber, antenna/eye icon, label "Suricata IDS Network Sidecar"). Suricata box connected with solid cyan arrow labelled "eve.json tail" to Suricata Collector box (cyan, label "suricata-collector").

Right side: Wazuh Agent box (blue, laptop icon, label "Wazuh Agent Endpoint EDR"), connected with blue arrow to Wazuh Manager box (blue, server icon, label "Wazuh Manager 4.7.5 Port 55000"). Wazuh Manager connected with solid cyan arrow labelled "alerts.json tail" to Wazuh Collector box (cyan, label "wazuh-collector").

Both collector boxes converge with arrows pointing downward to a label "HTTP POST /api/v1/threat/events/ingest" connecting them to the centre layer.

**LAYER 2 (MIDDLE) — SENTRIX CORE (FastAPI)**  
Large central glassmorphism panel labelled "SENTRIX CORE v10.0.0 FastAPI + Uvicorn Port 8000".

Inside this panel, arranged in a 2x3 grid of smaller sub-panels:
- Top-left: "Threat Engine" (amber icon, label includes "Signatures, Behavioural, Anomaly, 26-feature ML")
- Top-right: "ML Engine" (purple icon, label includes "Online SGD, Risk Scorer, Threat Classifier, Explainability")
- Middle-left: "Correlation Engine" (orange icon, label includes "5-min sliding window, Multi-source chain")
- Middle-right: "Prediction Engine" (indigo icon, label includes "Markov Chain, 14-stage ATT&CK graph")
- Bottom-left: "SOAR Engine" (red icon, label includes "4-worker async playbooks, block_ip, isolate_host")
- Bottom-right: "Investigation Studio" (teal icon, label includes "AI Reports, Case Management, PDF/JSON Export")

In the centre of these sub-panels: a small cylinder icon labelled "SQLite Event Bus (pub/sub)" with small arrows connecting to each sub-panel showing the pub/sub relationships.

**LAYER 3 (BOTTOM) — PERSISTENCE AND ANALYTICS**  
Six database cylinders in a horizontal row, each with distinct emerald/green shading:
- events.db (label: "17 tables: raw events, alerts, incidents, IOCs, MITRE, timeline")
- predictions.db (label: "Attack forecasts and Markov results")
- investigations.db (label: "AI reports and case tickets")
- soar_audit.db (label: "Playbook execution audit trail")
- registry.db (label: "ML model versions and checkpoints")
- suppression.db (label: "IP, host, rule, and window suppressions")

---

### Connections and Arrows

- Suricata Collector -> Sentrix Core: thick cyan arrow, label "HTTP POST Raw Events"
- Wazuh Collector -> Sentrix Core: thick cyan arrow, label "HTTP POST Raw Events"
- Nginx Dashboard (left of Sentrix Core panel) -> Sentrix Core: bi-directional arrows labelled "REST API" and "WebSocket /ws/live"
- Threat Engine -> ML Engine: bidirectional thin purple arrow labelled "26 features / risk score"
- Threat Engine -> Correlation Engine: orange arrow labelled "events.alerts"
- Correlation Engine -> Prediction Engine: dashed indigo arrow labelled "incidents.correlated"
- Correlation Engine -> SOAR Engine: dashed red arrow labelled "incidents.correlated"
- Correlation Engine -> Investigation Studio: dashed teal arrow labelled "incidents.correlated"
- All engines -> respective databases: downward emerald arrows labelled "persist"

---

### Additional Elements

- Top-right corner badge: "22/22 Tests Passing" in green pill
- Bottom-left corner: Sentrix logo (geometric shield with circuit pattern)
- Footer: "Sentrix V10 — Enterprise SOC/XDR Platform | MIT License | github.com/your-org/sentrix"
- Small MITRE ATT&CK logo/badge on the Prediction Engine sub-panel
- Docker whale icon on each external container (DVWA, Wazuh, Suricata, Nginx)
- Lock icon on the Nginx/browser connection point

---

### Final Image Prompt

Create a professional, dark-mode enterprise software architecture diagram titled "Sentrix V10 — Enterprise SOC/XDR Platform Architecture". Use a deep navy background (#0D1B2A). The diagram has three horizontal layers. Top layer shows security data sources: a red-bordered DVWA attack target box connected via orange dotted arrow to an amber Suricata IDS box, which connects via cyan arrow to a "suricata-collector" box; separately a blue Wazuh Agent connects to a blue Wazuh Manager box which connects to a "wazuh-collector" box. Both collector boxes converge with arrows pointing down to the central layer. The middle layer is a large glassmorphism panel titled "SENTRIX CORE FastAPI + Uvicorn" containing six internal sub-panels in a 2x3 grid: Threat Engine (amber), ML Engine (purple), Correlation Engine (orange), Prediction Engine (indigo), SOAR Engine (red), and Investigation Studio (teal), all connected by a central "SQLite Event Bus" cylinder with arrows showing pub/sub relationships. The bottom layer shows six emerald database cylinder icons: events.db, predictions.db, investigations.db, soar_audit.db, registry.db, and suppression.db. On the left side an Nginx box labelled "Dashboard + Reverse Proxy Port 80" connects to the central panel with bi-directional REST and WebSocket arrows. Connection arrows between components are colour-coded by data type. Small Docker whale icons appear on each infrastructure container. A green badge reads "22/22 Tests Passing". The footer reads "Sentrix V10 - Enterprise SOC/XDR Platform". Style: ultra-clean, professional, suitable for a GitHub README hero image, similar in quality to AWS architecture diagrams. Resolution 2400x1400 pixels.

---

## Diagram 2 — Detection Pipeline (Event Lifecycle Flow)

**Purpose:** Show exactly how a single raw log event travels through the six-stage Sentrix processing pipeline from ingest to alert publication, with branching paths for valid vs invalid events.

**Why important:** This is the core value proposition visualised — the technical depth of what happens to every event between receipt and action.

**Recommended Size:** 1800 x 2400 pixels  
**Aspect Ratio:** 3:4 (tall vertical flowchart)  
**Format:** PNG

---

### Visual Style

Dark charcoal background (#1A1A2E). Vertical flowchart. Each stage is a rounded rectangle with stage number badge. Colour-coded by stage type. Connecting arrows are thick and directional. Side panels show detail callouts.

---

### Layout (Top to Bottom Vertical Flow)

**START:** Collector icon with label "Suricata Collector / Wazuh Collector" at top

**STAGE 1 — RAW INGEST (Cyan):**  
Box: "Stage 1: Raw Ingest". Contents: "/api/v1/threat/events/ingest", "Source auto-detection: suricata | wazuh | generic", "Collector health heartbeat update", "Persist raw event to events.db"

**STAGE 2 — SCHEMA VALIDATION (Yellow):**  
Box: "Stage 2: Schema Validation". Contents: "TelemetryValidator.validate_event()", "Check required fields and types"
Branch: RIGHT path (red dashed arrow) = "INVALID: Route to Dead Letter Queue (DLQ)" -> hexagon labelled "DLQ events.db" -> "Audit log entry written" -> stop/end symbol
LEFT path (green arrow) = "VALID: Continue pipeline"

**STAGE 3 — CANONICAL NORMALISATION (Blue):**  
Box: "Stage 3: Canonical Normalisation". Contents: "Plugin selected by source type", sub-list: "normalize_wazuh()", "normalize_suricata()", "normalize_sysmon()", "normalize_zeek()", "normalize_generic()", "Output: CanonicalEvent Pydantic model (17 typed fields)"

**STAGE 4 — ENRICHMENT (Teal):**  
Box: "Stage 4: Enrichment". Three parallel enrichment callouts branching right:
- MITRE mapper: "Technique ID -> Tactic -> Kill-chain Stage"
- Threat Intel: "AbuseIPDB, VirusTotal, GeoIP, Shodan"
- IOC Repo: "Cross-reference known malicious indicators"

**STAGE 5 — THREAT DETECTION (Orange, largest box):**  
Box: "Stage 5: Multi-Layer Threat Detection". Eight numbered sub-steps in vertical list:
1. Suppression Check (IP whitelist, maintenance window)
2. Signature Rules (equals, contains, greater_than, regex)
3. Behavioural Detector (baseline deviation)
4. Anomaly Detector (statistical outlier)
5. ML Engine: Feature Extraction (26 features)
6. ML Engine: Risk Scoring + Threat Classification
7. ML Engine: SHAP-like Explainability
8. Threshold / Sequence / Chain Engines

**STAGE 6 — ALERT GENERATION (Amber):**  
Box: "Stage 6: Alert Generation". Contents: "Write alert to events.db alerts table", "Publish to EventBus: events.alerts topic"

**DOWNSTREAM SUBSCRIBERS (three parallel boxes below Stage 6):**
- "Correlation Engine" (orange) — "5-min window bucket aggregation"
- "Prediction Engine" (indigo) — "Markov next-stage forecast"
- These converge when incident promoted to "SOAR Engine" (red) and "Investigation Studio" (teal)

---

### Final Image Prompt

Create a professional dark-mode software engineering flowchart titled "Sentrix Detection Pipeline — Event Lifecycle". Background: dark charcoal (#1A1A2E). Vertical top-to-bottom flow diagram with 6 numbered stages as colour-coded rounded rectangles. Stage 1 Cyan: "Raw Ingest - HTTP POST /api/v1/threat/events/ingest, source auto-detection, persist raw event". Stage 2 Yellow: "Schema Validation - TelemetryValidator" with a right-branching red dashed arrow to a "DEAD LETTER QUEUE (DLQ)" hexagon for invalid events, and a green arrow continuing down for valid events. Stage 3 Blue: "Canonical Normalisation - Plugin router selects: normalize_wazuh, normalize_suricata, normalize_sysmon, normalize_zeek. Output: CanonicalEvent (17 typed fields)". Stage 4 Teal: "Enrichment - MITRE Mapping, Threat Intel (AbuseIPDB/VT/Shodan), IOC Cross-reference" with three parallel callout boxes to the right. Stage 5 Orange (tallest box): "Multi-Layer Threat Detection" listing 8 sub-steps: Suppression Check, Signature Rules, Behavioural Detector, Anomaly Detector, ML Feature Extraction (26 features), ML Risk Scoring 0-100, SHAP Explainability, and Chain/Sequence/Threshold Engines. Stage 6 Amber: "Alert Generation - Write to events.db, Publish to events.alerts topic". Below Stage 6, three parallel downstream subscriber boxes: Correlation Engine (orange), Prediction Engine (indigo), both leading to SOAR Engine (red) and Investigation Studio (teal). All connecting arrows are thick and directional with descriptive labels. Right side shows a thin timeline ruler. Style: professional engineering diagram quality, dark mode, suitable for technical documentation. Resolution 1800x2400 pixels.

---

## Diagram 3 — Machine Learning Pipeline (MLOps Lifecycle)

**Purpose:** Visualise the complete online learning lifecycle: from feature extraction through inference to analyst feedback and model weight update.

**Why important:** The embedded MLOps pipeline is one of Sentrix's most distinctive capabilities. This diagram communicates its sophistication.

**Recommended Size:** 2000 x 1200 pixels  
**Aspect Ratio:** 5:3  
**Format:** PNG

---

### Visual Style

Dark mode. Deep space purple background (#0F0A1E). Circular pipeline flow with linear training loop on the right side. Purple/violet colour scheme for ML components.

---

### Layout

**LEFT SIDE — Inference Pipeline (circular loop):**

Circle arrangement starting from "Live Event" at top:

1. "Live Event Received" (white icon, top centre)
   -> "Feature Engineering Pipeline" (violet box, list of 5 feature groups: Severity, Protocol, Network, Historical, MITRE flags)
   -> "26-Feature Vector [f1, f2, ..., f26]" (numpy array visualisation as small grid of numbers)
   -> "ML Inference Engine" (purple box, three sub-items: Risk Scorer (Ridge SGD), Threat Classifier (Logistic SGD), Attack Predictor (Markov))
   -> "Prediction Output" (three result pill badges: "Risk Score: 87", "Category: Credential Access", "Next Stage: Lateral Movement")
   -> "Explainability: Top-3 Features" (teal callout with bar chart showing feature contributions)
   -> Results pushed to "SOC Dashboard" (browser icon)

**RIGHT SIDE — Learning Loop (vertical):**

"Analyst Closes Incident" (person icon) at top
   -> "Analyst Resolution Label: confirmed_threat / false_positive" (input box)
   -> "Learning Queue (maxsize=5000)" (queue/pipe visualisation)
   -> "OnlineLearningWorker" (spinning gear icon, daemon thread label)
   -> Two parallel boxes:
      - Left: "Clone Active Model State (deep copy)" 
      - Right: "Apply SGD Weight Update (train_step)"
   -> "Evaluate on Validation Cache (last 200 samples)" (chart icon with accuracy bar)
   -> Decision diamond: "Accuracy Improved?"
      - YES -> "Promote Candidate to Active" (green up-arrow) -> "Write Atomic Checkpoint"
      - NO  -> "Rollback to Previous Checkpoint" (red down-arrow)

**BOTTOM — Model Registry Timeline:**

Horizontal timeline with model version bubbles:
v1.0.0 (bootstrapped) -> v1.1.0 (first feedback) -> v1.2.0 ... -> vN.X.X (current active)
Each bubble coloured: grey (retired), amber (candidate), green (active)

---

### Final Image Prompt

Create a professional dark-mode ML pipeline diagram titled "Sentrix ML Engine — Online Learning Lifecycle". Background: deep space purple (#0F0A1E). The diagram has two main sections. LEFT SECTION: circular inference pipeline starting from "Live Security Event" flowing through "Feature Engineering (26 features: severity, protocol, ports, historical, MITRE tactic flags)", then to "26-Feature Vector" shown as a small numerical array, then to "ML Inference Engine" box containing three models (Ridge SGD Risk Scorer, Logistic SGD Classifier, Markov Attack Predictor), then to output badges showing "Risk Score 87", "Category: Credential Access", "Next Stage: Lateral Movement", then to "SHAP-like Explainability (top-3 features)" with a small bar chart, and results pushed to a browser Dashboard icon. RIGHT SECTION: vertical learning loop starting from "Analyst Closes Incident" with a person icon, flowing down through "Resolution Label (confirmed / false_positive)", into "Learning Queue (maxsize=5000)" shown as a pipe, into "OnlineLearningWorker thread" with a gear icon, splitting into parallel "Clone Active Model State" and "Apply SGD Weight Update" boxes, merging at "Evaluate Candidate on Validation Cache (200 samples)", then a decision diamond "Accuracy Improved?" with green YES path to "Promote + Write Checkpoint" and red NO path to "Rollback to Previous". BOTTOM: horizontal model version timeline showing v1.0.0 through vN.X.X with colour-coded bubbles (grey=retired, amber=candidate, green=active). All components rendered in violet/purple palette with glowing neon outlines. Resolution 2000x1200 pixels, professional MLOps diagram quality.

---

## Diagram 4 — Docker Deployment Diagram (Container Topology)

**Purpose:** Show the exact container topology, network segmentation, port mappings, volume mounts, and dependency ordering of the 8-container Docker Compose deployment.

**Why important:** Operators and DevOps engineers need this to understand what they are deploying, how to troubleshoot, and how to extend the stack.

**Recommended Size:** 2400 x 1600 pixels  
**Aspect Ratio:** 3:2  
**Format:** PNG

---

### Visual Style

Dark mode. Background: very dark slate (#0B1320). Infrastructure diagram style. Two clearly separated network zones rendered as semi-transparent coloured regions. Docker logo on each container icon.

---

### Layout

**LEFT ZONE — dvwa-net (172.21.0.0/16) — Red tinted region:**

Three containers stacked vertically:
- `sentrix-dvwa-db` (MySQL icon, label "MySQL 5.7 | mem: 512m | Port: internal | Secrets: db_root_password, db_password | Volume: dvwa-db-data")
- Arrow pointing up from dvwa-db to `sentrix-dvwa` (DVWA icon, label "DVWA Latest | mem: 256m | Port: 8080:80 | depends_on: dvwa-db HEALTHY")
- `sentrix-suricata` (Suricata eye icon, label "Suricata IDS | mem: 256m | network_mode: service:dvwa | cap_add: NET_ADMIN, NET_RAW")

**RIGHT ZONE — sentrix-net (172.20.0.0/16) — Blue tinted region:**

Six containers arranged:

Top row:
- `sentrix-core` (Python/FastAPI icon, large box, label "sentrix-core:v10 | mem: 2GB | Port: 8000:8000 | Secrets: sentrix_api_key, jwt_secret_key | Volume: sentrix-data | env: SENTRIX_AUTH_ENABLED=true")
- `sentrix-dashboard` (Nginx icon, label "nginx:alpine | mem: 256m | Port: 80:80 | Volume: ./dashboard")

Bottom row:
- `sentrix-suricata-collector` (Python icon, label "sentrix-core:v10 | mem: 256m | cmd: suricata_collector | Volume: suricata-logs:ro")
- `sentrix-wazuh-collector` (Python icon, label "sentrix-core:v10 | mem: 256m | cmd: wazuh_collector | Volume: wazuh-logs:ro")
- `sentrix-wazuh` (Wazuh icon, label "Wazuh Manager 4.7.5 | mem: 1GB | Ports: 1514/udp, 514/udp, 55000 | Secrets: wazuh_api_password | Volumes: wazuh-logs, wazuh-data, wazuh-etc")

**CONNECTIONS:**
- sentrix-suricata (left zone) -> suricata-collector (right zone): dashed arrow labelled "suricata-logs volume (read-only)"
- sentrix-wazuh -> wazuh-collector: dashed arrow labelled "wazuh-logs volume (read-only)"
- suricata-collector -> sentrix-core: solid arrow labelled "HTTP POST eve.json events"
- wazuh-collector -> sentrix-core: solid arrow labelled "HTTP POST alerts.json events"
- sentrix-dashboard -> sentrix-core: bi-directional arrow labelled "Nginx reverse proxy /api/v1/ and /ws/"
- Browser icon (outside both zones) -> sentrix-dashboard: arrow labelled "HTTP Port 80"

**BOTTOM — Named Volumes (emerald green boxes):**
sentrix-data | suricata-logs | wazuh-logs | wazuh-data | wazuh-etc | dvwa-db-data

**BOTTOM RIGHT — Secrets (padlock icons):**
sentrix_api_key | jwt_secret_key | db_root_password | db_password | wazuh_api_password

**Startup Order annotation** (numbered badge chain): 1. dvwa-db -> 2. dvwa -> 3. suricata -> 4. wazuh-manager -> 5. sentrix-core -> 6. collectors -> 7. dashboard

---

### Final Image Prompt

Create a professional dark-mode Docker container topology diagram titled "Sentrix V10 — Docker Compose Deployment". Background: very dark slate (#0B1320). The diagram shows two distinct network zones as semi-transparent coloured regions. LEFT ZONE (red tint, labelled "dvwa-net 172.21.0.0/16"): three vertically stacked container boxes for sentrix-dvwa-db (MySQL 5.7, 512m, secrets mounted), sentrix-dvwa (DVWA latest, port 8080:80, 256m), and sentrix-suricata (Suricata IDS, NET_ADMIN/NET_RAW caps, shared DVWA namespace). RIGHT ZONE (blue tint, labelled "sentrix-net 172.20.0.0/16"): five container boxes arranged in two rows. Top row: large sentrix-core box (FastAPI v10, 2GB, port 8000, secrets mounted, sentrix-data volume) and sentrix-dashboard box (nginx:alpine, port 80:80). Bottom row: sentrix-suricata-collector, sentrix-wazuh-collector, and sentrix-wazuh (Wazuh Manager, 1GB, ports 1514/514/55000). Dashed arrows show shared named volume connections: suricata-logs and wazuh-logs in read-only mode. Solid arrows show HTTP POST connections from collectors to sentrix-core. Bi-directional arrow from dashboard to core labelled "Nginx reverse proxy". An external browser icon connects to the dashboard on port 80. A bottom panel shows six named volume icons in emerald green and five secrets padlock icons. A numbered startup order badge chain (1-7) shows dependency ordering. Docker whale logo appears on each container. Startup dependency arrows use dotted lines labelled HEALTHY or service_started. Resolution 2400x1600 pixels, infrastructure diagram quality.

---

## Diagram 5 — Authentication Flow (Security Sequence Diagram)

**Purpose:** Show the dual-mode authentication flow (API Key and JWT) and how RBAC roles are enforced across different endpoint tiers.

**Why important:** Security architecture is non-negotiable for enterprise adoption. This shows the platform takes auth seriously.

**Recommended Size:** 1600 x 1200 pixels  
**Aspect Ratio:** 4:3  
**Format:** PNG

---

### Visual Style

Dark mode. Dark charcoal background (#121212). UML sequence diagram style with participant lanes. Security-themed colouring: gold for success, red for rejection.

---

### Participants (Left to Right Lanes)

1. Collector / Browser (actor icon)
2. Nginx Reverse Proxy (proxy icon)
3. FastAPI Middleware (auth icon)
4. JWT/API Key Validator (key icon)
5. Role Enforcer (shield icon)
6. Route Handler (server icon)
7. EventStore SQLite (database icon)

---

### Sequence A — Collector API Key Auth (Top Section)

```
Collector -> Nginx: POST /api/v1/threat/events/ingest
              X-API-Key: [secret]
Nginx -> FastAPI: Forward request with headers
FastAPI -> JWT/APIKeyValidator: get_current_user()
  APIKeyValidator: Compare to settings.SENTRIX_API_KEY
  [SUCCESS] return {sub: api_key_user, role: admin}
FastAPI -> RouteHandler: Invoke ingest handler
RouteHandler -> EventStore: store_event(), update_collector_health()
RouteHandler -> Collector: 200 OK {events_processed: 1}
```

### Sequence B — Browser JWT Login (Middle Section)

```
Browser -> Nginx: POST /api/v1/admin/token {username, password}
Nginx -> FastAPI: Forward
FastAPI -> JWT Validator: create_access_token()
  JWT Validator: Sign HS256 with JWT_SECRET_KEY, TTL=60min
  Return: eyJhbGci... JWT token
FastAPI -> Browser: 200 OK {access_token: "eyJ..."}
```

### Sequence C — JWT Authenticated API Call (Middle Section)

```
Browser -> Nginx: GET /api/v1/soar/execute
              Authorization: Bearer eyJhbGci...
Nginx -> FastAPI: Forward
FastAPI -> JWT Validator: decode_token(bearer.credentials)
  JWT Validator: Verify HS256 signature, check exp
  Return: {sub: analyst_user, role: soc_analyst}
FastAPI -> Role Enforcer: require_soc_analyst()
  Role Enforcer: ROLE_HIERARCHY[soc_analyst]=1 >= MINIMUM=1
  [SUCCESS] proceed
FastAPI -> RouteHandler: Invoke SOAR execute handler
RouteHandler -> EventStore: log SOAR action
RouteHandler -> Browser: 200 OK {action_id: ..., status: success}
```

### Sequence D — Insufficient Role Rejection (Bottom Section)

```
Browser -> Nginx: GET /api/v1/admin/health
              Authorization: Bearer eyJhbGci... (role: read_only)
Nginx -> FastAPI: Forward
FastAPI -> JWT Validator: decode_token() -> {role: read_only}
FastAPI -> Role Enforcer: require_admin()
  Role Enforcer: ROLE_HIERARCHY[read_only]=0 < MINIMUM[admin]=2
  [REJECT]
FastAPI -> Browser: 403 Forbidden "Insufficient permissions. Required role: admin"
```

---

### Final Image Prompt

Create a professional dark-mode UML sequence diagram titled "Sentrix Authentication and RBAC Flow". Background: dark charcoal (#121212). Seven vertical participant lanes from left to right: Actor icon labelled "Collector/Browser", proxy icon "Nginx :80", middleware icon "FastAPI Auth Middleware", key icon "JWT/APIKey Validator", shield icon "Role Enforcer", server icon "Route Handler", and database icon "SQLite EventStore". Four distinct labelled sequence sections separated by horizontal dividers. Section A (Cyan header: "Collector API Key Auth"): shows HTTP POST with X-API-Key header flowing right, get_current_user() call, API key comparison, success return as admin role, ingest handler called, store_event and 200 OK response. Section B (Gold header: "Browser JWT Token Generation"): shows POST /admin/token, create_access_token() with HS256 signing, JWT returned in response body. Section C (Teal header: "JWT Authenticated SOC Analyst Request"): shows Bearer token in Authorization header, decode_token() call, role extraction, require_soc_analyst() check passing (role 1 >= minimum 1), route handler invoked, 200 OK. Section D (Red header: "Insufficient Role Rejection"): shows read_only role token, require_admin() check failing (role 0 < minimum 2), red 403 Forbidden response arrow. All success paths use gold/green arrows. All rejection paths use red arrows. Each participant lane is a distinct column with lifeline. Resolution 1600x1200 pixels, professional UML diagram quality.

---

## Summary

| File | Diagram | Size | Position in README |
|---|---|---|---|
| `docs/architecture_overview.png` | Full system topology | 2400x1400 | Hero image, top of README |
| `docs/detection_pipeline.png` | 6-stage event lifecycle | 1800x2400 | Detection Pipeline section |
| `docs/ml_pipeline.png` | Online learning lifecycle | 2000x1200 | Machine Learning section |
| `docs/deployment_diagram.png` | 8-container Docker topology | 2400x1600 | Docker Deployment section |
| `docs/auth_flow.png` | Auth sequence diagram | 1600x1200 | Security Model section |
