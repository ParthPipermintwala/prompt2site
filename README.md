<p align="center">
  <img src="assets/prompt2site-hero.svg" alt="Prompt2Site animated hero banner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&pause=950&color=06B6D4&center=true&vCenter=true&width=980&lines=Turn+ideas+into+responsive+websites;AI+generation+%7C+Live+preview+%7C+Chat+editing+%7C+One-click+share;Google+OAuth+%7C+JWT+cookies+%7C+RedisJSON+cache+%7C+Razorpay+credits" alt="typing animation" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%208%20%7C%20Tailwind-06b6d4?style=for-the-badge" alt="frontend" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%205-111827?style=for-the-badge" alt="backend" />
  <img src="https://img.shields.io/badge/Data-MongoDB%20%7C%20RedisJSON-16a34a?style=for-the-badge" alt="data" />
  <img src="https://img.shields.io/badge/AI-OpenRouter-a855f7?style=for-the-badge" alt="ai" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-02042B?style=for-the-badge" alt="payments" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="license" />
  <img src="https://visitor-badge.laobi.icu/badge?page_id=ParthPipermintwala.prompt2site" alt="visitors" />
  <img src="https://img.shields.io/github/stars/ParthPipermintwala/prompt2site?style=social" alt="stars" />
  <img src="https://img.shields.io/github/forks/ParthPipermintwala/prompt2site?style=social" alt="forks" />
</p>

---

## Why This Project

**Prompt2Site** turns a plain-language idea into a working, responsive HTML website with AI.

Instead of starting from an empty editor, users can:

- Generate a complete website from a prompt
- Preview the result instantly in a sandboxed iframe
- Refine the site through chat-style AI edits
- Feel the product through ReactBits-inspired motion, particles, and shiny text
- Inspect and edit generated HTML with Monaco Editor
- Save generated websites to a private dashboard
- Buy credits through Razorpay
- Share generated pages through deployed site URLs

> Built to solve: "How can creators move from website idea to usable, editable prototype faster?"

---

## Feature Highlights

| Feature | What it does |
| :---: | :--- |
| Prompt Website Generation | Sends a user prompt to OpenRouter and creates a saved HTML website |
| AI Change Requests | Updates an existing website using the current code plus a new prompt |
| Live Preview | Renders generated HTML inside a sandboxed iframe |
| Code Editor | Opens generated HTML in Monaco Editor for inspection and manual tweaks |
| Dashboard | Shows saved website cards with iframe thumbnails |
| Deploy / Share | Creates a slug and shareable site URL |
| Google Login | Verifies Google ID tokens on the backend and issues a JWT cookie |
| Credit System | Deducts credits for generation and website updates |
| Razorpay Payments | Creates orders and verifies payment signatures before adding credits |
| RedisJSON Cache | Caches users, website lists, website details, and slug lookups for 2 days |

---

## Animated Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#0b0f19', 'primaryColor': '#0f172a', 'primaryTextColor': '#e2e8f0', 'primaryBorderColor': '#2ec4b6', 'lineColor': '#94a3b8', 'clusterBkg': '#252a2a', 'clusterBorder': '#52575a', 'fontFamily': 'Inter, ui-sans-serif, system-ui' }}}%%
flowchart TD
	A[User enters website idea]
	A --> B[Prompt2Site generation pipeline]

	subgraph GEN[AI Website Generation]
		direction TB
		B --> C[Load prompt template]
		C --> D[Call OpenRouter model]
		D --> E[Extract title, message, and HTML]
	end

	subgraph DATA[Persistence and Cache]
		direction TB
		E --> F[Save website and messages]
		F --> G[Update credits and invalidate RedisJSON]
		G --> H[Return website editor ID]
	end

	subgraph OUTPUT[Builder Outputs]
		direction LR
		H --> I[Live Preview]
		H --> J[AI Chat Edits]
		H --> K[Code Editor]
		H --> L[Deploy and Share]
	end

	classDef gen fill:#0f172a,stroke:#2ec4b6,color:#e2e8f0,stroke-width:1px;
	classDef data fill:#111827,stroke:#22d3ee,color:#e2e8f0,stroke-width:1px;
	classDef output fill:#0b132b,stroke:#14b8a6,color:#e2e8f0,stroke-width:1px;
	classDef entry fill:#202124,stroke:#8b949e,color:#f8fafc,stroke-width:1px;

	class A entry;
	class B,C,D,E gen;
	class F,G,H data;
	class I,J,K,L output;
```

---

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,mongodb,redis,redux,js" alt="stack icons" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Core-Modern%20JavaScript%20Fullstack-0f172a?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="core" />
  <img src="https://img.shields.io/badge/AI-Prompt%20Pipeline%20%2B%20OpenRouter-111827?style=for-the-badge&logo=openai&logoColor=22d3ee" alt="ai core" />
  <img src="https://img.shields.io/badge/Cache-RedisJSON%20Read%20Through-111827?style=for-the-badge&logo=redis&logoColor=DC382D" alt="cache" />
</p>

<table align="center">
  <tr>
    <th align="center" width="22%">Domain</th>
    <th align="center">Stack</th>
    <th align="center" width="25%">Purpose</th>
  </tr>
  <tr>
    <td align="center"><strong>Frontend UI</strong></td>
    <td align="center">
      <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
      <img src="https://img.shields.io/badge/Vite-111827?style=flat-square&logo=vite&logoColor=646CFF" alt="Vite" />
      <img src="https://img.shields.io/badge/Tailwind_CSS-0f172a?style=flat-square&logo=tailwindcss&logoColor=38B2AC" alt="Tailwind CSS" />
      <img src="https://img.shields.io/badge/Redux_Toolkit-111827?style=flat-square&logo=redux&logoColor=764ABC" alt="Redux Toolkit" />
      <img src="https://img.shields.io/badge/ReactBits-111827?style=flat-square&logo=react&logoColor=a855f7" alt="ReactBits" />
      <img src="https://img.shields.io/badge/Framer_Motion-0f172a?style=flat-square&logo=framer&logoColor=ffffff" alt="Framer Motion" />
    </td>
    <td align="center">Responsive, animated website builder interface with ReactBits-style effects</td>
  </tr>
  <tr>
    <td align="center"><strong>Editor UX</strong></td>
    <td align="center">
      <img src="https://img.shields.io/badge/Monaco_Editor-1f2937?style=flat-square&logo=visualstudiocode&logoColor=007ACC" alt="Monaco Editor" />
      <img src="https://img.shields.io/badge/Lucide_Icons-111827?style=flat-square&logo=lucide&logoColor=ffffff" alt="Lucide" />
      <img src="https://img.shields.io/badge/OGL-0f172a?style=flat-square" alt="OGL" />
    </td>
    <td align="center">Code view, preview controls, particles, and tool actions</td>
  </tr>
  <tr>
    <td align="center"><strong>Backend API</strong></td>
    <td align="center">
      <img src="https://img.shields.io/badge/Node.js-0f172a?style=flat-square&logo=nodedotjs&logoColor=339933" alt="Node.js" />
      <img src="https://img.shields.io/badge/Express-111827?style=flat-square&logo=express&logoColor=ffffff" alt="Express" />
      <img src="https://img.shields.io/badge/JWT-0b132b?style=flat-square&logo=jsonwebtokens&logoColor=ffffff" alt="JWT" />
      <img src="https://img.shields.io/badge/Cookies-0f172a?style=flat-square" alt="cookies" />
    </td>
    <td align="center">Routing, auth, AI orchestration, and payment verification</td>
  </tr>
  <tr>
    <td align="center"><strong>Data Layer</strong></td>
    <td align="center">
      <img src="https://img.shields.io/badge/MongoDB-0f172a?style=flat-square&logo=mongodb&logoColor=47A248" alt="MongoDB" />
      <img src="https://img.shields.io/badge/Mongoose-111827?style=flat-square&logo=mongoose&logoColor=880000" alt="Mongoose" />
      <img src="https://img.shields.io/badge/RedisJSON-111827?style=flat-square&logo=redis&logoColor=DC382D" alt="RedisJSON" />
    </td>
    <td align="center">Users, websites, messages, and cached hot reads</td>
  </tr>
  <tr>
    <td align="center"><strong>AI + Payments</strong></td>
    <td align="center">
      <img src="https://img.shields.io/badge/OpenRouter-0f172a?style=flat-square&logo=openai&logoColor=10b981" alt="OpenRouter" />
      <img src="https://img.shields.io/badge/Google_OAuth-111827?style=flat-square&logo=google&logoColor=4285F4" alt="Google OAuth" />
      <img src="https://img.shields.io/badge/Razorpay-0f172a?style=flat-square" alt="Razorpay" />
    </td>
    <td align="center">Website generation, sign-in, checkout, and credit updates</td>
  </tr>
</table>

---

## Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#0b0f19', 'primaryColor': '#0f172a', 'primaryTextColor': '#e2e8f0', 'primaryBorderColor': '#22d3ee', 'lineColor': '#94a3b8', 'clusterBkg': '#252a2a', 'clusterBorder': '#52575a', 'fontFamily': 'Inter, ui-sans-serif, system-ui' }}}%%
flowchart TD
  A["React + Vite Client"] --> B["React Router"]
  B --> C["Redux + localStorage"]
  C --> D["Axios requests with cookies"]

  subgraph API["Express API Layer"]
    direction TB
    D --> E["CORS + cookie-parser"]
    E --> F["JWT auth middleware"]
    F --> G["Route controllers"]
  end

  subgraph SERVICES["Product Services"]
    direction LR
    G --> H["Auth"]
    G --> I["Website Builder"]
    G --> J["Payments"]
  end

  subgraph INFRA["External Systems"]
    direction LR
    H --> K["Google OAuth"]
    I --> L["OpenRouter AI"]
    I --> M["MongoDB"]
    F --> N["RedisJSON"]
    J --> O["Razorpay"]
  end

  classDef input fill:#202124,stroke:#9ca3af,color:#f8fafc,stroke-width:1px;
  classDef core fill:#071126,stroke:#06b6d4,color:#f8fafc,stroke-width:1px;
  classDef service fill:#120f2a,stroke:#8b5cf6,color:#f8fafc,stroke-width:1px;
  classDef infra fill:#06231f,stroke:#2dd4bf,color:#f8fafc,stroke-width:1px;

  class A,B,C,D input;
  class E,F,G core;
  class H,I,J service;
  class K,L,M,N,O infra;
```

---

## Authentication Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#0b0f19', 'primaryColor': '#0f172a', 'primaryTextColor': '#e2e8f0', 'primaryBorderColor': '#22d3ee', 'lineColor': '#94a3b8', 'clusterBkg': '#252a2a', 'clusterBorder': '#52575a', 'fontFamily': 'Inter, ui-sans-serif, system-ui' }}}%%
flowchart TD
  A["User clicks Continue with Google"] --> B["Google returns credential token"]

  subgraph VERIFY["Backend Verification"]
    direction TB
    B --> C["POST /api/auth/google"]
    C --> D["Verify audience, issuer, and email"]
    D --> E["Find, link, or create user"]
  end

  subgraph SESSION["Session Creation"]
    direction TB
    E --> F["Sign JWT for 7 days"]
    F --> G["Set HTTP-only cookie"]
    G --> H["Cache safe user in RedisJSON"]
  end

  subgraph CLIENT["Client State"]
    direction LR
    H --> I["Redux user"]
    H --> J["localStorage user"]
    H --> K["Protected routes unlock"]
  end

  classDef input fill:#222222,stroke:#9ca3af,color:#f8fafc,stroke-width:1px;
  classDef core fill:#071126,stroke:#06b6d4,color:#f8fafc,stroke-width:1px;
  classDef output fill:#071126,stroke:#2dd4bf,color:#f8fafc,stroke-width:1px;

  class A,B input;
  class C,D,E,F,G,H core;
  class I,J,K output;
```

### Auth Notes

| Area | Implementation |
| :---: | :--- |
| Login UI | `@react-oauth/google` |
| Token verification | `google-auth-library` on backend |
| Session transport | JWT in HTTP-only cookie named `token` |
| Protected APIs | `/api/user`, `/api/website`, `/api/payment` |
| Password support | Backend supports bcrypt signup/signin endpoints |
| Not implemented | GitHub OAuth, refresh tokens |

---

## API Surface

| Group | Method | Endpoint | Purpose |
| :---: | :---: | :--- | :--- |
| Auth | `POST` | `/api/auth/google` | Google login, user creation/linking, JWT cookie |
| Auth | `GET` | `/api/auth/logout` | Clear cookie |
| User | `GET` | `/api/user/profile` | Return authenticated user |
| Website | `POST` | `/api/website/generate` | Generate website from prompt |
| Website | `GET` | `/api/website/websiteData/:id` | Fetch website with conversations |
| Website | `POST` | `/api/website/changeWebsite/:id` | Update generated website with AI |
| Website | `GET` | `/api/website/getAll` | Fetch user's saved websites |
| Website | `GET` | `/api/website/deploy/:id` | Create deployed share URL |
| Website | `GET` | `/api/website/getBySlug/:slug` | Fetch latest HTML by slug |
| Website | `DELETE` | `/api/website/delete/:id` | Delete website and messages |
| Payment | `POST` | `/api/payment/createOrder` | Create Razorpay order |
| Payment | `POST` | `/api/payment/verifyPayment` | Verify signature and add credits |

---

## AI Pipeline

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#0b0f19', 'primaryColor': '#0f172a', 'primaryTextColor': '#e2e8f0', 'primaryBorderColor': '#22d3ee', 'lineColor': '#94a3b8', 'clusterBkg': '#252a2a', 'clusterBorder': '#52575a', 'fontFamily': 'Inter, ui-sans-serif, system-ui' }}}%%
flowchart TD
  A["User prompt"] --> B["Choose generation mode"]

  subgraph PROMPT["Prompt Assembly"]
    direction TB
    B --> C["New site: prompt.txt"]
    B --> D["Edit site: updatePrompt.txt + latestCode"]
    C --> E["Final model prompt"]
    D --> E
  end

  subgraph AI["OpenRouter Inference"]
    direction TB
    E --> F["Chat completion request"]
    F --> G["Raw model response"]
    G --> H["Retry once if format is invalid"]
  end

  subgraph RESULT["Structured Website Output"]
    direction LR
    H --> I["Title"]
    H --> J["AI message"]
    H --> K["HTML code"]
  end

  K --> L["Save to MongoDB"]
  L --> M["Render in editor iframe"]

  classDef input fill:#222222,stroke:#9ca3af,color:#f8fafc,stroke-width:1px;
  classDef core fill:#071126,stroke:#06b6d4,color:#f8fafc,stroke-width:1px;
  classDef output fill:#071126,stroke:#2dd4bf,color:#f8fafc,stroke-width:1px;

  class A,B input;
  class C,D,E,F,G,H,L core;
  class I,J,K,M output;
```

| Detail | Current implementation |
| :---: | :--- |
| Provider | OpenRouter-compatible chat completions endpoint |
| Model | Controlled by `MODEL` env variable |
| Parser | Extracts `TITLE`, `MESSAGE`, and fenced HTML |
| Retry | Re-prompts once with stricter formatting if parsing fails |
| Streaming | Not implemented |
| Vector DB / RAG | Not implemented |
| Background jobs | Not implemented |

---

## RedisJSON Cache

Prompt2Site uses the official `redis` package and RedisJSON commands.

```js
await redisClient.json.get(key);
await redisClient.json.set(key, "$", value);
await redisClient.expire(key, 172800);
```

| Key | Value | TTL | Invalidated when |
| :--- | :---: | :---: | :--- |
| `prompt2site:user:{userId}` | Safe user profile | 2 days | auth, credit changes, generation, update |
| `prompt2site:websites:list:{userId}` | Dashboard site list | 2 days | generate, update, delete, deploy |
| `prompt2site:website:detail:{userId}:{websiteId}` | Website detail + conversations | 2 days | update, delete, deploy |
| `prompt2site:website:slug:{userId}:{slug}` | Latest HTML for slug route | 2 days | update, delete, deploy |

If Redis is missing or down, the app logs the issue and falls back to MongoDB.

---

## Database Model

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#0b0f19', 'primaryColor': '#0f172a', 'primaryTextColor': '#e2e8f0', 'primaryBorderColor': '#22d3ee', 'lineColor': '#94a3b8', 'clusterBkg': '#252a2a', 'clusterBorder': '#52575a', 'fontFamily': 'Inter, ui-sans-serif, system-ui' }}}%%
flowchart TD
  A["User"]

  subgraph USER["User Document"]
    direction TB
    A --> B["name + email + avatar"]
    B --> C["googleId / password"]
    C --> D["credits + plan"]
  end

  subgraph WEBSITE["Website Document"]
    direction TB
    A --> E["owned websites"]
    E --> F["title + latestCode"]
    F --> G["slug + deployeUrl"]
  end

  subgraph MESSAGE["Message Documents"]
    direction LR
    F --> H["user messages"]
    F --> I["AI messages"]
    H --> J["conversation history"]
    I --> J
  end

  classDef input fill:#222222,stroke:#9ca3af,color:#f8fafc,stroke-width:1px;
  classDef core fill:#071126,stroke:#06b6d4,color:#f8fafc,stroke-width:1px;
  classDef output fill:#071126,stroke:#2dd4bf,color:#f8fafc,stroke-width:1px;

  class A input;
  class B,C,D,E,F,G core;
  class H,I,J output;
```

---

## Project Structure

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#0b0f19', 'primaryColor': '#0f172a', 'primaryTextColor': '#e2e8f0', 'primaryBorderColor': '#22d3ee', 'lineColor': '#94a3b8', 'clusterBkg': '#252a2a', 'clusterBorder': '#52575a', 'fontFamily': 'Inter, ui-sans-serif, system-ui' }}}%%
flowchart TD
  ROOT["prompt2site"]

  subgraph CLIENT["client - React Experience"]
    direction TB
    C1["src/app - Redux store"]
    C2["src/components - UI + animation"]
    C3["src/pages - product screens"]
    C4["src/hooks - auth + payments"]
    C5["router.jsx - route guard"]
  end

  subgraph SERVER["server - Express API"]
    direction TB
    S1["asset - AI prompt templates"]
    S2["config - DB, Redis, OpenRouter"]
    S3["controllers - request logic"]
    S4["models - Mongo schemas"]
    S5["routes + middleware + services"]
  end

  ROOT --> CLIENT
  ROOT --> SERVER
  ROOT --> DOCS["README + LICENSE"]

  classDef root fill:#202124,stroke:#9ca3af,color:#f8fafc,stroke-width:1px;
  classDef client fill:#071126,stroke:#06b6d4,color:#f8fafc,stroke-width:1px;
  classDef server fill:#120f2a,stroke:#8b5cf6,color:#f8fafc,stroke-width:1px;
  classDef docs fill:#06231f,stroke:#2dd4bf,color:#f8fafc,stroke-width:1px;

  class ROOT root;
  class C1,C2,C3,C4,C5 client;
  class S1,S2,S3,S4,S5 server;
  class DOCS docs;
```

---

## Quick Start

### 1. Clone

```bash
git clone https://github.com/ParthPipermintwala/prompt2site.git
cd prompt2site
```

### 2. Backend

```bash
cd server
npm install
npm start
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## Environment Variables

### Backend `.env`

| Variable | Purpose |
| :---: | :--- |
| `PORT` | Backend port |
| `ORIGIN` | Allowed frontend origin and share URL base |
| `JWT_SECRET` | JWT signing secret |
| `MONGODB_URL` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth backend verification |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `OPENROUTER_URL` | OpenRouter chat completions endpoint |
| `MODEL` | Model used for generation |
| `RAZORPAY_KEY_ID` | Razorpay server key |
| `RAZORPAY_KEY_SECRET` | Razorpay signature verification secret |
| `REDIS_URL` | Redis URL with RedisJSON support |

### Frontend `.env`

| Variable | Purpose |
| :---: | :--- |
| `VITE_BACKEND_URL` | Express API base URL |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth browser client ID |
| `VITE_RAZORPAY_KEY_ID` | Razorpay checkout key |

> Keep secret keys on the backend. `VITE_` variables are exposed to the browser.

---

## Demo Sequence

1. Login with Google
2. Enter a website idea
3. Wait for AI generation
4. Open the generated website in the editor
5. Ask for changes in chat
6. Inspect HTML in Monaco Editor
7. Deploy and copy the share link
8. Buy more credits through Razorpay

---

## Security and Performance

| Area | Current implementation |
| :---: | :--- |
| Auth protection | JWT cookie middleware on user, website, and payment APIs |
| Cookie settings | `httpOnly`, `sameSite: "lax"`, local `secure: false` |
| Passwords | bcrypt hashing for email/password auth |
| OAuth | Backend validates Google token issuer, audience, and verified email |
| Payments | Razorpay HMAC signature verification |
| Query performance | `.lean()` on read-heavy MongoDB queries |
| Cache performance | RedisJSON read-through cache with 2-day TTL |
| Preview isolation | Generated HTML renders inside sandboxed iframes |

## Created By

<p align="center">
<img src="https://capsule-render.vercel.app/api?type=transparent&height=110&text=Parth%20Pipermintwala&fontSize=34&fontColor=ffffff&desc=Full-Stack%20%2B%20Modern%20Web%20Architecture&descSize=14&descAlignY=82&animation=fadeIn" alt="Created by Parth Pipermintwala" />
</p>
<p align="center">
  <a href="https://github.com/ParthPipermintwala">
    <img src="https://img.shields.io/badge/GitHub-@ParthPipermintwala-111827?style=for-the-badge&logo=github&logoColor=ffffff" alt="Parth GitHub" />
  </a>
  <img src="https://img.shields.io/badge/Role-Full--Stack%20Builder-4f46e5?style=for-the-badge" alt="Full Stack Builder" />
  <img src="https://img.shields.io/badge/Focus-AI%20Product%20UX-06b6d4?style=for-the-badge" alt="AI Product UX" />
</p>

---

## License

Prompt2Site is released under the [MIT License](LICENSE).

<p align="center">
  <img src="https://img.shields.io/badge/Project-Prompt2Site-4f46e5?style=for-the-badge" alt="project" />
  <img src="https://img.shields.io/badge/Made%20With-ReactBits%20%2B%20React%20%2B%20AI-06b6d4?style=for-the-badge" alt="made with" />
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&section=footer&height=120&color=0:120f17,30:1f1147,65:4f46e5,100:06b6d4" alt="footer" />
</p>
