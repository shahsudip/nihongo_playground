import os

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 440" width="100%" height="100%" style="background: transparent; font-family: 'Hiragino Kaku Gothic ProN', 'Yu Gothic', Meiryo, -apple-system, sans-serif;">
  <defs>
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.05" />
    </filter>
  </defs>

  <!-- GRAPH 1 -->
  <g transform="translate(10, 10)">
    <!-- Card Frame -->
    <rect x="0" y="0" width="270" height="205" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />

    <!-- Number 1 -->
    <text x="16" y="24" font-size="16" font-weight="900" fill="#0f172a">1</text>
    
    <!-- Y Label & Values -->
    <text x="36" y="32" font-size="10" font-weight="bold" fill="#64748b">(秒)</text>
    <text x="44" y="44" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">100</text>
    <text x="44" y="113" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">50</text>
    <text x="44" y="182" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">0</text>
    
    <!-- Y-axis line -->
    <line x1="50" y1="40" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <!-- Y Ticks -->
    <line x1="45" y1="40" x2="50" y2="40" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="54" x2="50" y2="54" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="68" x2="50" y2="68" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="82" x2="50" y2="82" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="95" x2="50" y2="95" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="109" x2="50" y2="109" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="123" x2="50" y2="123" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="137" x2="50" y2="137" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="150" x2="50" y2="150" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="164" x2="50" y2="164" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="178" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />

    <!-- X-axis line -->
    <line x1="50" y1="178" x2="256" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <!-- X Ticks & Labels -->
    <line x1="76" y1="178" x2="76" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="76" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">10</text>
    
    <line x1="103" y1="178" x2="103" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="103" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">20</text>
    
    <line x1="130" y1="178" x2="130" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="130" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">30</text>
    
    <line x1="157" y1="178" x2="157" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="157" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">40</text>
    
    <line x1="184" y1="178" x2="184" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="184" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">50</text>
    
    <line x1="211" y1="178" x2="211" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="211" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">60</text>
    
    <line x1="238" y1="178" x2="238" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="238" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">70<tspan font-size="8.5">(歳)</tspan></text>

    <!-- Dashed Drop Lines from Points to X-axis -->
    <line x1="76" y1="164" x2="76" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="103" y1="109" x2="103" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="130" y1="68" x2="130" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="157" y1="109" x2="157" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="184" y1="109" x2="184" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="211" y1="144" x2="211" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="238" y1="168" x2="238" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />

    <!-- Data Line with outer stroke & inner highlight for crisp double-line textbook feel -->
    <polyline points="56,164 76,164 103,109 130,68 157,109 184,109 211,144 246,171" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <polyline points="56,164 76,164 103,109 130,68 157,109 184,109 211,144 246,171" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- GRAPH 2 -->
  <g transform="translate(300, 10)">
    <!-- Card Frame -->
    <rect x="0" y="0" width="270" height="205" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />

    <!-- Number 2 -->
    <text x="16" y="24" font-size="16" font-weight="900" fill="#0f172a">2</text>
    
    <!-- Y Label & Values -->
    <text x="36" y="32" font-size="10" font-weight="bold" fill="#64748b">(秒)</text>
    <text x="44" y="44" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">100</text>
    <text x="44" y="113" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">50</text>
    <text x="44" y="182" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">0</text>
    
    <!-- Y-axis line -->
    <line x1="50" y1="40" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <line x1="45" y1="40" x2="50" y2="40" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="54" x2="50" y2="54" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="68" x2="50" y2="68" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="82" x2="50" y2="82" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="95" x2="50" y2="95" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="109" x2="50" y2="109" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="123" x2="50" y2="123" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="137" x2="50" y2="137" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="150" x2="50" y2="150" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="164" x2="50" y2="164" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="178" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />

    <!-- X-axis line -->
    <line x1="50" y1="178" x2="256" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <line x1="76" y1="178" x2="76" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="76" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">10</text>
    
    <line x1="103" y1="178" x2="103" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="103" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">20</text>
    
    <line x1="130" y1="178" x2="130" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="130" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">30</text>
    
    <line x1="157" y1="178" x2="157" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="157" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">40</text>
    
    <line x1="184" y1="178" x2="184" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="184" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">50</text>
    
    <line x1="211" y1="178" x2="211" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="211" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">60</text>
    
    <line x1="238" y1="178" x2="238" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="238" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">70<tspan font-size="8.5">(歳)</tspan></text>

    <!-- Dashed Drop Lines -->
    <line x1="76" y1="168" x2="76" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="103" y1="133" x2="103" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="130" y1="56" x2="130" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="157" y1="120" x2="157" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="184" y1="139" x2="184" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="211" y1="140" x2="211" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="238" y1="160" x2="238" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />

    <!-- Data Line 2 -->
    <polyline points="56,170 76,168 103,133 130,56 157,120 184,139 211,140 246,165" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <polyline points="56,170 76,168 103,133 130,56 157,120 184,139 211,140 246,165" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- GRAPH 3 -->
  <g transform="translate(10, 225)">
    <!-- Card Frame -->
    <rect x="0" y="0" width="270" height="205" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />

    <!-- Number 3 -->
    <text x="16" y="24" font-size="16" font-weight="900" fill="#0f172a">3</text>
    
    <!-- Y Label & Values -->
    <text x="36" y="32" font-size="10" font-weight="bold" fill="#64748b">(秒)</text>
    <text x="44" y="44" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">100</text>
    <text x="44" y="113" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">50</text>
    <text x="44" y="182" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">0</text>
    
    <!-- Y-axis line -->
    <line x1="50" y1="40" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <line x1="45" y1="40" x2="50" y2="40" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="54" x2="50" y2="54" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="68" x2="50" y2="68" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="82" x2="50" y2="82" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="95" x2="50" y2="95" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="109" x2="50" y2="109" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="123" x2="50" y2="123" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="137" x2="50" y2="137" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="150" x2="50" y2="150" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="164" x2="50" y2="164" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="178" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />

    <!-- X-axis line -->
    <line x1="50" y1="178" x2="256" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <line x1="76" y1="178" x2="76" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="76" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">10</text>
    
    <line x1="103" y1="178" x2="103" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="103" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">20</text>
    
    <line x1="130" y1="178" x2="130" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="130" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">30</text>
    
    <line x1="157" y1="178" x2="157" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="157" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">40</text>
    
    <line x1="184" y1="178" x2="184" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="184" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">50</text>
    
    <line x1="211" y1="178" x2="211" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="211" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">60</text>
    
    <line x1="238" y1="178" x2="238" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="238" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">70<tspan font-size="8.5">(歳)</tspan></text>

    <!-- Dashed Drop Lines -->
    <line x1="76" y1="172" x2="76" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="103" y1="60" x2="103" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="130" y1="60" x2="130" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="157" y1="84" x2="157" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="184" y1="106" x2="184" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="211" y1="168" x2="211" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="238" y1="168" x2="238" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />

    <!-- Data Line 3 -->
    <polyline points="56,174 76,172 103,60 130,60 157,84 184,106 211,168 246,168" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <polyline points="56,174 76,172 103,60 130,60 157,84 184,106 211,168 246,168" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- GRAPH 4 (Correct Answer) -->
  <g transform="translate(300, 225)">
    <!-- Card Frame -->
    <rect x="0" y="0" width="270" height="205" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />

    <!-- Number 4 -->
    <text x="16" y="24" font-size="16" font-weight="900" fill="#0f172a">4</text>
    
    <!-- Y Label & Values -->
    <text x="36" y="32" font-size="10" font-weight="bold" fill="#64748b">(秒)</text>
    <text x="44" y="44" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">100</text>
    <text x="44" y="113" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">50</text>
    <text x="44" y="182" font-size="10" font-weight="bold" text-anchor="end" fill="#475569">0</text>
    
    <!-- Y-axis line -->
    <line x1="50" y1="40" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <line x1="45" y1="40" x2="50" y2="40" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="54" x2="50" y2="54" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="68" x2="50" y2="68" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="82" x2="50" y2="82" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="95" x2="50" y2="95" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="109" x2="50" y2="109" stroke="#1e293b" stroke-width="1.5" />
    <line x1="46" y1="123" x2="50" y2="123" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="137" x2="50" y2="137" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="150" x2="50" y2="150" stroke="#64748b" stroke-width="1" />
    <line x1="46" y1="164" x2="50" y2="164" stroke="#64748b" stroke-width="1" />
    <line x1="45" y1="178" x2="50" y2="178" stroke="#1e293b" stroke-width="1.5" />

    <!-- X-axis line -->
    <line x1="50" y1="178" x2="256" y2="178" stroke="#1e293b" stroke-width="1.5" />
    <line x1="76" y1="178" x2="76" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="76" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">10</text>
    
    <line x1="103" y1="178" x2="103" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="103" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">20</text>
    
    <line x1="130" y1="178" x2="130" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="130" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">30</text>
    
    <line x1="157" y1="178" x2="157" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="157" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">40</text>
    
    <line x1="184" y1="178" x2="184" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="184" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">50</text>
    
    <line x1="211" y1="178" x2="211" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="211" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">60</text>
    
    <line x1="238" y1="178" x2="238" y2="183" stroke="#1e293b" stroke-width="1.5" />
    <text x="238" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#475569">70<tspan font-size="8.5">(歳)</tspan></text>

    <!-- Dashed Drop Lines -->
    <line x1="76" y1="138" x2="76" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="103" y1="58" x2="103" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="130" y1="74" x2="130" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="157" y1="107" x2="157" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="184" y1="138" x2="184" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="211" y1="154" x2="211" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />
    <line x1="238" y1="168" x2="238" y2="178" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2.5" />

    <!-- Data Line 4 (Linear drop from peak at 20) -->
    <polyline points="56,168 76,138 103,58 130,74 157,107 184,138 211,154 246,171" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <polyline points="56,168 76,138 103,58 130,74 157,107 184,138 211,154 246,171" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>'''

os.makedirs('public/speed_master_n3_pages', exist_ok=True)
with open('public/speed_master_n3_pages/mondai_search_15_graphs.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('Generated public/speed_master_n3_pages/mondai_search_15_graphs.svg')
