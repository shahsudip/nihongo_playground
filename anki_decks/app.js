/**
 * Anki Deck Studio - Readable Flashcard & Deck Builder
 * Zero-emoji, clean ASCII implementation.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    deckName: 'Computer Science Fundamentals',
    cards: [],
    currentIndex: 0,
    isFlipped: false,
    filterText: '',
    filterTag: 'all',
    activeView: 'flip', // 'flip' or 'table'
    activeEditorTab: 'batch', // 'batch' or 'form'
    editingCardId: null,
    exportFormat: 'apkg' // 'apkg', 'tsv', 'markdown', 'json'
  };

  // Preloaded Initial Deck
  const DEFAULT_SAMPLE_TEXT = `# Anki Deck: Computer Science Fundamentals

Q: What is the main advantage of spaced repetition systems like Anki?
A: They schedule reviews at the optimal moment right before memory decay occurs, maximizing long-term retention with minimal study time.
Tags: learning memory anki

Q: What is the difference between synchronous and asynchronous execution in JavaScript?
A: Synchronous execution runs tasks sequentially, blocking further execution until the current task finishes. Asynchronous execution offloads long operations (like I/O or timers) and continues executing subsequent code via the event loop.
Tags: javascript async web

Q: In relational databases, what does ACID stand for?
A: Atomicity (all or nothing), Consistency (preserves schema rules), Isolation (concurrent transactions do not interfere), and Durability (committed changes persist).
Tags: databases architecture

### What is the purpose of the HTTP 429 status code?
Too Many Requests. It indicates that the client has sent too many requests in a given amount of time (rate limited).
Tags: http networking

### Explain the concept of idempotency in REST APIs.
An HTTP method is idempotent if executing it multiple times produces the same side effects on the server state as executing it once. Examples: GET, PUT, DELETE.
Tags: api rest web

Q: In CSS flexbox, the property {{c1::justify-content}} aligns items along the main axis, while {{c2::align-items}} aligns items along the cross axis.
Tags: css flexbox web

Q: The average search time complexity in a balanced Binary Search Tree is {{c1::O(log n)}}.
Tags: algorithms data-structures`;

  // DOM Elements
  const deckNameInput = document.getElementById('deckNameInput');
  const rawInputText = document.getElementById('rawInputText');
  const detectedCardCount = document.getElementById('detectedCardCount');
  const editorStatusText = document.getElementById('editorStatusText');
  const btnSyncDeck = document.getElementById('btnSyncDeck');
  const btnClearEditor = document.getElementById('btnClearEditor');
  const btnLoadSample = document.getElementById('btnLoadSample');
  const btnExportModal = document.getElementById('btnExportModal');
  const btnQuickApkg = document.getElementById('btnQuickApkg');

  // Tabs
  const tabBatch = document.getElementById('tabBatch');
  const tabForm = document.getElementById('tabForm');
  const batchEditorView = document.getElementById('batchEditorView');
  const formBuilderView = document.getElementById('formBuilderView');

  // Form inputs
  const formCardType = document.getElementById('formCardType');
  const formTags = document.getElementById('formTags');
  const formFront = document.getElementById('formFront');
  const formBack = document.getElementById('formBack');
  const frontLabelText = document.getElementById('frontLabelText');
  const backGroupContainer = document.getElementById('backGroupContainer');
  const btnInsertClozeHelper = document.getElementById('btnInsertClozeHelper');
  const btnResetForm = document.getElementById('btnResetForm');
  const btnAddCardFromForm = document.getElementById('btnAddCardFromForm');

  // Preview elements
  const tabViewFlip = document.getElementById('tabViewFlip');
  const tabViewTable = document.getElementById('tabViewTable');
  const flipCardView = document.getElementById('flipCardView');
  const deckTableView = document.getElementById('deckTableView');
  const activeFlashcard = document.getElementById('activeFlashcard');
  const cardFrontDisplay = document.getElementById('cardFrontDisplay');
  const cardBackDisplay = document.getElementById('cardBackDisplay');
  const cardFrontTags = document.getElementById('cardFrontTags');
  const cardBackTags = document.getElementById('cardBackTags');
  const previewCardCounter = document.getElementById('previewCardCounter');
  const filterInput = document.getElementById('filterInput');
  const tagFilterSelect = document.getElementById('tagFilterSelect');
  const deckTableBody = document.getElementById('deckTableBody');

  // Nav buttons
  const btnPrevCard = document.getElementById('btnPrevCard');
  const btnFlipCard = document.getElementById('btnFlipCard');
  const btnNextCard = document.getElementById('btnNextCard');
  const btnEditCurrentCard = document.getElementById('btnEditCurrentCard');
  const btnDuplicateCurrentCard = document.getElementById('btnDuplicateCurrentCard');
  const btnDeleteCurrentCard = document.getElementById('btnDeleteCurrentCard');

  // Export Modal Elements
  const exportModal = document.getElementById('exportModal');
  const btnCloseExportModal = document.getElementById('btnCloseExportModal');
  const optApkg = document.getElementById('optApkg');
  const optTsv = document.getElementById('optTsv');
  const optMarkdown = document.getElementById('optMarkdown');
  const optJson = document.getElementById('optJson');
  const previewFormatLabel = document.getElementById('previewFormatLabel');
  const exportPreviewText = document.getElementById('exportPreviewText');
  const btnCopyExportText = document.getElementById('btnCopyExportText');
  const btnDownloadExportFile = document.getElementById('btnDownloadExportFile');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // Format sample chips
  const chipQA = document.getElementById('chipQA');
  const chipHeading = document.getElementById('chipHeading');
  const chipCloze = document.getElementById('chipCloze');
  const chipTable = document.getElementById('chipTable');

  // Unique ID generator
  let idCounter = 1000;
  function generateId() {
    return 'card_' + Date.now() + '_' + (++idCounter);
  }

  // Toast Notification Helper
  function showToast(message, type) {
    type = type || 'info';
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  // Parse Raw Text to Cards
  function parseReadableText(text) {
    const lines = text.split(/\r?\n/);
    const parsedCards = [];
    let currentDeck = null;

    let currentQ = null;
    let currentA = null;
    let currentTags = [];
    let stateMode = null; // 'qa', 'heading', 'table'

    function commitCurrentCard() {
      if (!currentQ && !currentA) return;

      const qText = (currentQ || '').trim();
      const aText = (currentA || '').trim();

      if (!qText && !aText) return;

      // Cloze detection: if text contains {{c1::...}}
      const isCloze = /\{\{c\d+::.*?\}\}/.test(qText) || /\{\{c\d+::.*?\}\}/.test(aText);
      let cardType = isCloze ? 'cloze' : 'basic';

      parsedCards.push({
        id: generateId(),
        front: qText || (isCloze ? aText : 'Prompt'),
        back: isCloze && !aText ? '' : aText,
        tags: currentTags.slice(),
        type: cardType
      });

      currentQ = null;
      currentA = null;
      currentTags = [];
      stateMode = null;
    }

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      // Deck Name check: # Deck Name
      if (/^#\s+(.+)$/.test(trimmed) && !trimmed.startsWith('###')) {
        const match = trimmed.match(/^#\s+(?:Anki Deck:\s*)?(.+)$/i);
        if (match && match[1]) {
          currentDeck = match[1].trim();
        }
        continue;
      }

      // Horizontal separator ---
      if (/^---+$/.test(trimmed)) {
        commitCurrentCard();
        continue;
      }

      // Tags line: Tags: tag1 tag2
      if (/^(?:Tags|TAGS):\s*(.+)$/i.test(trimmed)) {
        const tagLine = trimmed.replace(/^(?:Tags|TAGS):\s*/i, '');
        const extracted = tagLine.split(/[\s,]+/).map(function (t) { return t.trim(); }).filter(Boolean);
        currentTags = currentTags.concat(extracted);
        continue;
      }

      // Format 1: Q: ... and A: ...
      if (/^Q:\s*(.+)$/i.test(trimmed)) {
        commitCurrentCard();
        stateMode = 'qa';
        currentQ = trimmed.replace(/^Q:\s*/i, '');
        continue;
      }

      if (/^A:\s*(.+)$/i.test(trimmed) && stateMode === 'qa') {
        currentA = trimmed.replace(/^A:\s*/i, '');
        continue;
      }

      // Format 2: Heading Cards: ### Question
      if (/^###\s+(.+)$/.test(trimmed)) {
        commitCurrentCard();
        stateMode = 'heading';
        currentQ = trimmed.replace(/^###\s+/, '');
        continue;
      }

      // Format 3: Markdown Table rows: | Front | Back | Tags |
      if (/^\|(.+)\|$/.test(trimmed)) {
        // Skip table separator line |---|---|
        if (/^\|[-:\s|]+\|$/.test(trimmed)) {
          continue;
        }
        const cols = trimmed.split('|').map(function (c) { return c.trim(); });
        cols.shift();
        cols.pop();
        if (cols.length >= 2) {
          // If this is header row | Front | Back |, skip
          if (cols[0].toLowerCase() === 'front' && cols[1].toLowerCase() === 'back') {
            continue;
          }
          commitCurrentCard();
          const tList = cols[2] ? cols[2].split(/[\s,]+/).filter(Boolean) : [];
          parsedCards.push({
            id: generateId(),
            front: cols[0],
            back: cols[1],
            tags: tList,
            type: /\{\{c\d+::.*?\}\}/.test(cols[0]) ? 'cloze' : 'basic'
          });
          continue;
        }
      }

      // Multi-line continuation for Q or A or Heading
      if (stateMode === 'qa') {
        if (currentA !== null) {
          currentA += '\n' + rawLine;
        } else if (currentQ !== null) {
          currentQ += '\n' + rawLine;
        }
      } else if (stateMode === 'heading') {
        if (trimmed === '') {
          // empty line might end heading card or separate paragraphs
          if (currentA !== null) {
            currentA += '\n';
          }
        } else {
          if (currentA === null) {
            currentA = rawLine;
          } else {
            currentA += '\n' + rawLine;
          }
        }
      }
    }

    commitCurrentCard();

    return {
      deckName: currentDeck,
      cards: parsedCards
    };
  }

  // Convert Cards back to clean readable text
  function cardsToReadableText(deckName, cards) {
    let out = '# Anki Deck: ' + (deckName || 'My Deck') + '\n\n';

    cards.forEach(function (c, idx) {
      if (c.type === 'cloze') {
        out += 'Q: ' + c.front + '\n';
        if (c.back && c.back.trim()) {
          out += 'A: ' + c.back + '\n';
        }
      } else {
        out += 'Q: ' + c.front + '\n';
        out += 'A: ' + c.back + '\n';
      }

      if (c.tags && c.tags.length > 0) {
        out += 'Tags: ' + c.tags.join(' ') + '\n';
      }

      if (idx < cards.length - 1) {
        out += '\n';
      }
    });

    return out;
  }

  // Format Cloze text for preview with highlight spans
  function renderCardContent(text, isFront, isCloze) {
    if (!text) return '<span style="color: var(--text-dim);">[Empty Content]</span>';

    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (isCloze) {
      if (isFront) {
        // Replace {{c1::hidden}} with [...] on front face
        safe = safe.replace(/\{\{c(\d+)::(.*?)\}\}/g, function (match, num, answer) {
          return '<span class="cloze-highlight">[...' + num + '...]</span>';
        });
      } else {
        // Show the revealed answer highlighted on back face
        safe = safe.replace(/\{\{c(\d+)::(.*?)\}\}/g, function (match, num, answer) {
          return '<span class="cloze-highlight">' + answer + '</span>';
        });
      }
    }

    // Convert line breaks
    return safe.replace(/\n/g, '<br>');
  }

  // Get active filtered cards list
  function getFilteredCards() {
    return state.cards.filter(function (card) {
      // Search match
      if (state.filterText) {
        const q = state.filterText.toLowerCase();
        const fMatch = (card.front || '').toLowerCase().indexOf(q) !== -1;
        const bMatch = (card.back || '').toLowerCase().indexOf(q) !== -1;
        const tMatch = (card.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) !== -1; });
        if (!fMatch && !bMatch && !tMatch) return false;
      }
      // Tag filter
      if (state.filterTag !== 'all') {
        if (!card.tags || card.tags.indexOf(state.filterTag) === -1) {
          return false;
        }
      }
      return true;
    });
  }

  // Update tag dropdown filter options
  function updateTagFilterDropdown() {
    const allTags = new Set();
    state.cards.forEach(function (card) {
      if (card.tags && Array.isArray(card.tags)) {
        card.tags.forEach(function (t) { allTags.add(t); });
      }
    });

    const currentVal = tagFilterSelect.value;
    tagFilterSelect.innerHTML = '<option value="all">All Tags</option>';

    Array.from(allTags).sort().forEach(function (tag) {
      const opt = document.createElement('option');
      opt.value = tag;
      opt.textContent = tag;
      if (tag === currentVal) {
        opt.selected = true;
      }
      tagFilterSelect.appendChild(opt);
    });
  }

  // Update Table View
  function renderTableView() {
    const filtered = getFilteredCards();
    deckTableBody.innerHTML = '';

    if (filtered.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">No cards found matching current filter.</td>';
      deckTableBody.appendChild(row);
      return;
    }

    filtered.forEach(function (card, idx) {
      const tr = document.createElement('tr');

      const tagHtml = (card.tags && card.tags.length > 0)
        ? card.tags.map(function (t) { return '<span class="tag-item" style="font-size:10px;">' + t + '</span>'; }).join(' ')
        : '<span style="color: var(--text-dim);">-</span>';

      tr.innerHTML = `
        <td style="color: var(--text-dim); font-family: var(--font-mono);">${idx + 1}</td>
        <td class="cell-text" title="${card.front.replace(/"/g, '&quot;')}">${card.front}</td>
        <td class="cell-text" title="${(card.back || '').replace(/"/g, '&quot;')}">${card.back || '-'}</td>
        <td>${tagHtml}</td>
        <td><span style="text-transform: uppercase; font-size: 10px; color: var(--accent-cyan);">${card.type}</span></td>
        <td>
          <button class="btn-icon" data-action="edit" data-id="${card.id}" title="Edit Card">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="btn-icon" data-action="dup" data-id="${card.id}" title="Duplicate Card">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <button class="btn-icon btn-icon-danger" data-action="del" data-id="${card.id}" title="Delete Card">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      `;
      deckTableBody.appendChild(tr);
    });
  }

  // Update Live Flip Card View
  function renderFlipCardView() {
    const filtered = getFilteredCards();

    if (filtered.length === 0) {
      previewCardCounter.textContent = '0 of 0';
      cardFrontDisplay.innerHTML = '<span style="color: var(--text-dim);">No cards match the active filter.</span>';
      cardBackDisplay.innerHTML = '<span style="color: var(--text-dim);">No cards match the active filter.</span>';
      cardFrontTags.innerHTML = '';
      cardBackTags.innerHTML = '';
      return;
    }

    if (state.currentIndex >= filtered.length) {
      state.currentIndex = filtered.length - 1;
    }
    if (state.currentIndex < 0) {
      state.currentIndex = 0;
    }

    const card = filtered[state.currentIndex];
    previewCardCounter.textContent = 'Card ' + (state.currentIndex + 1) + ' of ' + filtered.length;

    const isCloze = card.type === 'cloze';
    cardFrontDisplay.innerHTML = renderCardContent(card.front, true, isCloze);
    cardBackDisplay.innerHTML = renderCardContent(card.back || (isCloze ? card.front : ''), false, isCloze);

    // Tags
    const tagsHtml = (card.tags && card.tags.length > 0)
      ? card.tags.map(function (t) { return '<span class="tag-item">' + t + '</span>'; }).join('')
      : '<span style="color: var(--text-dim); font-size: 11px;">No tags</span>';

    cardFrontTags.innerHTML = tagsHtml;
    cardBackTags.innerHTML = tagsHtml;
  }

  // Sync cards and views
  function updateAllViews() {
    detectedCardCount.textContent = state.cards.length + ' Cards';
    updateTagFilterDropdown();
    renderFlipCardView();
    renderTableView();
  }

  // Load sample deck
  function loadSampleDeck() {
    rawInputText.value = DEFAULT_SAMPLE_TEXT;
    const res = parseReadableText(DEFAULT_SAMPLE_TEXT);
    if (res.deckName) {
      state.deckName = res.deckName;
      deckNameInput.value = res.deckName;
    }
    state.cards = res.cards;
    state.currentIndex = 0;
    state.isFlipped = false;
    activeFlashcard.classList.remove('flipped');
    updateAllViews();
    showToast('Loaded sample deck with ' + state.cards.length + ' cards', 'success');
  }

  // Flip Card Action
  function flipCard() {
    state.isFlipped = !state.isFlipped;
    if (state.isFlipped) {
      activeFlashcard.classList.add('flipped');
    } else {
      activeFlashcard.classList.remove('flipped');
    }
  }

  // Next / Prev Card
  function nextCard() {
    const filtered = getFilteredCards();
    if (filtered.length <= 1) return;
    state.isFlipped = false;
    activeFlashcard.classList.remove('flipped');
    state.currentIndex = (state.currentIndex + 1) % filtered.length;
    renderFlipCardView();
  }

  function prevCard() {
    const filtered = getFilteredCards();
    if (filtered.length <= 1) return;
    state.isFlipped = false;
    activeFlashcard.classList.remove('flipped');
    state.currentIndex = (state.currentIndex - 1 + filtered.length) % filtered.length;
    renderFlipCardView();
  }

  // Form Builder: Add or Update Card
  function handleSaveFormCard() {
    const front = formFront.value.trim();
    const back = formBack.value.trim();
    const tagText = formTags.value.trim();
    const type = formCardType.value;

    if (!front) {
      showToast('Front / Question field cannot be empty', 'info');
      formFront.focus();
      return;
    }

    const tags = tagText ? tagText.split(/[\s,]+/).map(function (t) { return t.trim(); }).filter(Boolean) : [];

    if (state.editingCardId) {
      // Update existing
      const card = state.cards.find(function (c) { return c.id === state.editingCardId; });
      if (card) {
        card.front = front;
        card.back = back;
        card.tags = tags;
        card.type = type;
        showToast('Card updated successfully', 'success');
      }
      state.editingCardId = null;
      btnAddCardFromForm.textContent = 'Add Card to Deck';
    } else {
      // Create new
      if (type === 'reversed') {
        // Adds both Front -> Back and Back -> Front
        state.cards.push({
          id: generateId(),
          front: front,
          back: back,
          tags: tags.slice(),
          type: 'basic'
        });
        state.cards.push({
          id: generateId(),
          front: back,
          back: front,
          tags: tags.slice(),
          type: 'basic'
        });
        showToast('Added 2 cards (Front -> Back & Reversed)', 'success');
      } else {
        state.cards.push({
          id: generateId(),
          front: front,
          back: back,
          tags: tags,
          type: type
        });
        showToast('Card added to deck', 'success');
      }
    }

    // Reset Form fields
    formFront.value = '';
    formBack.value = '';
    formTags.value = '';

    // Update raw textarea to stay synced
    rawInputText.value = cardsToReadableText(state.deckName, state.cards);

    // Jump to the newest card
    state.currentIndex = state.cards.length - 1;
    state.isFlipped = false;
    activeFlashcard.classList.remove('flipped');
    updateAllViews();
  }

  // Load a card into the Form Builder for editing
  function loadCardIntoForm(cardId) {
    const card = state.cards.find(function (c) { return c.id === cardId; });
    if (!card) return;

    state.editingCardId = card.id;
    formFront.value = card.front;
    formBack.value = card.back || '';
    formTags.value = (card.tags || []).join(', ');
    formCardType.value = card.type || 'basic';

    btnAddCardFromForm.textContent = 'Update Card';

    // Switch tab to form builder
    tabBatch.classList.remove('active');
    tabForm.classList.add('active');
    batchEditorView.style.display = 'none';
    formBuilderView.style.display = 'flex';
    formFront.focus();
  }

  // Duplicate Card
  function duplicateCard(cardId) {
    const card = state.cards.find(function (c) { return c.id === cardId; });
    if (!card) return;

    const newCard = {
      id: generateId(),
      front: card.front + ' (Copy)',
      back: card.back,
      tags: (card.tags || []).slice(),
      type: card.type
    };

    state.cards.push(newCard);
    rawInputText.value = cardsToReadableText(state.deckName, state.cards);
    state.currentIndex = state.cards.length - 1;
    updateAllViews();
    showToast('Card duplicated', 'info');
  }

  // Delete Card
  function deleteCard(cardId) {
    const index = state.cards.findIndex(function (c) { return c.id === cardId; });
    if (index === -1) return;

    state.cards.splice(index, 1);
    rawInputText.value = cardsToReadableText(state.deckName, state.cards);
    if (state.currentIndex >= state.cards.length) {
      state.currentIndex = Math.max(0, state.cards.length - 1);
    }
    updateAllViews();
    showToast('Card deleted', 'info');
  }

  // ==========================================
  // EXPORT ENGINE (Anki TSV, Markdown, JSON, .apkg)
  // ==========================================

  // Generate Anki Standard TSV / CSV text
  function generateAnkiTsv(deckName, cards) {
    let tsv = '#separator:tab\n';
    tsv += '#html:true\n';
    tsv += '#deck:' + (deckName || 'Anki Deck') + '\n';
    tsv += '#tags column:3\n';

    cards.forEach(function (card) {
      // Escape tabs and convert linebreaks to <br>
      const cleanFront = (card.front || '').replace(/\t/g, '    ').replace(/\r?\n/g, '<br>');
      const cleanBack = (card.back || '').replace(/\t/g, '    ').replace(/\r?\n/g, '<br>');
      const tagString = (card.tags || []).join(' ');

      tsv += cleanFront + '\t' + cleanBack + '\t' + tagString + '\n';
    });

    return tsv;
  }

  // Generate JSON backup
  function generateJson(deckName, cards) {
    return JSON.stringify({
      deckName: deckName,
      version: '1.0',
      exportedAt: new Date().toISOString(),
      cardCount: cards.length,
      cards: cards
    }, null, 2);
  }

  // Simple string hash for Anki sfld checksum
  function computeSimpleChecksum(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // Build Native .apkg using SQL.js and JSZip
  async function generateApkgBlob(deckName, cards) {
    if (typeof initSqlJs === 'undefined') {
      throw new Error('SQL.js library failed to load from CDN. Please verify internet connectivity or use Anki TSV export.');
    }
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip library failed to load from CDN. Please verify internet connectivity or use Anki TSV export.');
    }

    // Initialize WebAssembly SQLite
    const SQL = await initSqlJs({
      locateFile: function (file) {
        return 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/' + file;
      }
    });

    const db = new SQL.Database();
    const nowSec = Math.floor(Date.now() / 1000);
    const nowMs = Date.now();

    // 1. Create Anki 2.0 Schema
    db.run(`
      CREATE TABLE col (
        id              integer primary key,
        crt             integer not null,
        mod             integer not null,
        scm             integer not null,
        ver             integer not null,
        dconf           text not null,
        decks           text not null,
        models          text not null,
        conf            text not null,
        tags            text not null
      );
      CREATE TABLE notes (
        id              integer primary key,
        guid            text not null,
        mid             integer not null,
        mod             integer not null,
        usn             integer not null,
        tags            text not null,
        flds            text not null,
        sfld            text not null,
        csum            integer not null,
        flags           integer not null,
        data            text not null
      );
      CREATE TABLE cards (
        id              integer primary key,
        nid             integer not null,
        did             integer not null,
        ord             integer not null,
        mod             integer not null,
        usn             integer not null,
        type            integer not null,
        queue           integer not null,
        due             integer not null,
        ivl             integer not null,
        factor          integer not null,
        reps            integer not null,
        lapses          integer not null,
        left            integer not null,
        odue            integer not null,
        odid            integer not null,
        flags           integer not null,
        data            text not null
      );
      CREATE TABLE revlog (
        id              integer primary key,
        cid             integer not null,
        usn             integer not null,
        ease            integer not null,
        ivl             integer not null,
        lastIvl         integer not null,
        factor          integer not null,
        time            integer not null,
        type            integer not null
      );
      CREATE TABLE graves (
        usn             integer not null,
        oid             integer not null,
        type            integer not null
      );
    `);

    // IDs
    const deckId = 1680000000000 + Math.floor(Math.random() * 100000);
    const modelId = 1680000000001 + Math.floor(Math.random() * 100000);

    // Deck Definition
    const decksObj = {
      "1": {
        "id": 1,
        "mod": 0,
        "name": "Default",
        "usn": 0,
        "maxTaken": 60,
        "collapsed": false,
        "browserCollapsed": false,
        "desc": "",
        "dyn": 0,
        "conf": 1,
        "extendNew": 10,
        "extendRev": 50
      }
    };
    decksObj[String(deckId)] = {
      "id": deckId,
      "mod": nowSec,
      "name": deckName || "Imported Deck",
      "usn": -1,
      "collapsed": false,
      "browserCollapsed": false,
      "desc": "Created with Readable Anki Deck Studio",
      "dyn": 0,
      "conf": 1,
      "extendNew": 10,
      "extendRev": 50
    };

    // Card Note Type (Model)
    const modelsObj = {};
    modelsObj[String(modelId)] = {
      "id": modelId,
      "name": "Basic (Anki Studio)",
      "type": 0,
      "mod": nowSec,
      "usn": -1,
      "sortf": 0,
      "did": deckId,
      "tmpls": [
        {
          "name": "Card 1",
          "ord": 0,
          "qfmt": "{{Front}}",
          "afmt": "{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}",
          "bqfmt": "",
          "bafmt": "",
          "did": null
        }
      ],
      "flds": [
        { "name": "Front", "ord": 0, "sticky": false, "rtl": false, "font": "Arial", "size": 20 },
        { "name": "Back", "ord": 1, "sticky": false, "rtl": false, "font": "Arial", "size": 20 }
      ],
      "css": ".card { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; text-align: center; color: #111827; background-color: #ffffff; padding: 24px; border-radius: 8px; }\n.cloze { font-weight: bold; color: #2563eb; }",
      "latexPre": "",
      "latexPost": ""
    };

    const dconfObj = {
      "1": {
        "id": 1,
        "mod": 0,
        "name": "Default",
        "usn": 0,
        "maxTaken": 60,
        "autoplay": true,
        "timer": 0,
        "replayq": true,
        "new": { "bury": false, "delays": [1, 10], "initialFactor": 2500, "ints": [1, 4, 0], "order": 1, "perDay": 20 },
        "lapse": { "delays": [10], "leechAction": 0, "leechFails": 8, "minInt": 1, "mult": 0 },
        "rev": { "bury": false, "ease4": 1.3, "fuzz": 0.05, "ivlFct": 1, "maxIvl": 36500, "perDay": 200 }
      }
    };

    const confObj = {
      "nextPos": 1,
      "estTimes": true,
      "activeDecks": [1],
      "sortType": "noteFld",
      "timeLim": 0,
      "sortBackwards": false,
      "addToCur": true,
      "curDeck": 1,
      "curModel": modelId,
      "collapseTime": 1200
    };

    // Insert col row
    db.run(
      "INSERT INTO col VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        1,
        nowSec,
        nowMs,
        nowMs,
        11,
        JSON.stringify(dconfObj),
        JSON.stringify(decksObj),
        JSON.stringify(modelsObj),
        JSON.stringify(confObj),
        "{}"
      ]
    );

    // Insert Notes and Cards
    const insertNoteStmt = db.prepare("INSERT INTO notes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    const insertCardStmt = db.prepare("INSERT INTO cards VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    cards.forEach(function (card, index) {
      const noteId = nowMs + index * 2;
      const cardId = noteId + 1;
      const guid = 'ad_' + Math.random().toString(36).substring(2, 12);

      const fFront = (card.front || '').replace(/\r?\n/g, '<br>');
      const fBack = (card.back || '').replace(/\r?\n/g, '<br>');
      const flds = fFront + '\x1f' + fBack;
      const sfld = card.front || '';
      const csum = computeSimpleChecksum(sfld);
      const tagStr = (card.tags && card.tags.length > 0) ? ' ' + card.tags.join(' ') + ' ' : '';

      insertNoteStmt.run([
        noteId,
        guid,
        modelId,
        nowSec,
        -1,
        tagStr,
        flds,
        sfld,
        csum,
        0,
        ""
      ]);

      insertCardStmt.run([
        cardId,
        noteId,
        deckId,
        0,      // ord
        nowSec, // mod
        -1,     // usn
        0,      // type (new)
        0,      // queue (new)
        index + 1, // due
        0,      // ivl
        2500,   // factor
        0,      // reps
        0,      // lapses
        0,      // left
        0,      // odue
        0,      // odid
        0,      // flags
        ""      // data
      ]);
    });

    insertNoteStmt.free();
    insertCardStmt.free();

    // Export SQLite binary data
    const binaryDb = db.export();
    db.close();

    // Package into ZIP using JSZip
    const zip = new JSZip();
    zip.file("collection.anki2", binaryDb);
    zip.file("media", "{}");

    return await zip.generateAsync({
      type: "blob",
      mimeType: "application/zip"
    });
  }

  // Trigger browser file download
  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }

  // Update Export Modal Content
  function updateExportModalPreview() {
    const deckName = state.deckName || 'My_Deck';
    const cards = state.cards;

    optApkg.classList.remove('btn-primary');
    optApkg.classList.add('btn-secondary');
    optTsv.classList.remove('btn-primary');
    optTsv.classList.add('btn-secondary');
    optMarkdown.classList.remove('btn-primary');
    optMarkdown.classList.add('btn-secondary');
    optJson.classList.remove('btn-primary');
    optJson.classList.add('btn-secondary');

    if (state.exportFormat === 'apkg') {
      optApkg.classList.add('btn-primary');
      optApkg.classList.remove('btn-secondary');
      previewFormatLabel.textContent = 'Native Anki Package (.apkg)';
      exportPreviewText.textContent = `[Binary SQLite Archive Ready]
Target: ${deckName}.apkg
Cards to package: ${cards.length}
Database: collection.anki2 (SQLite 3)
Media manifest: media (JSON)

Click "Download File" to export your .apkg file.
Once downloaded, double-click the file to open and import directly into Anki.`;
    } else if (state.exportFormat === 'tsv') {
      optTsv.classList.add('btn-primary');
      optTsv.classList.remove('btn-secondary');
      previewFormatLabel.textContent = 'Anki Tab-Separated Values (.txt)';
      exportPreviewText.textContent = generateAnkiTsv(deckName, cards);
    } else if (state.exportFormat === 'markdown') {
      optMarkdown.classList.add('btn-primary');
      optMarkdown.classList.remove('btn-secondary');
      previewFormatLabel.textContent = 'Readable Markdown File (.md)';
      exportPreviewText.textContent = cardsToReadableText(deckName, cards);
    } else if (state.exportFormat === 'json') {
      optJson.classList.add('btn-primary');
      optJson.classList.remove('btn-secondary');
      previewFormatLabel.textContent = 'Structured JSON Backup (.json)';
      exportPreviewText.textContent = generateJson(deckName, cards);
    }
  }

  // Handle Export File Download
  async function handleExportDownload() {
    const deckName = (state.deckName || 'Anki_Deck').replace(/[/\\?%*:|"<>]/g, '_');
    const cards = state.cards;

    if (cards.length === 0) {
      showToast('Deck has no cards to export. Add some cards first.', 'info');
      return;
    }

    if (state.exportFormat === 'apkg') {
      showToast('Generating .apkg package...', 'info');
      try {
        const apkgBlob = await generateApkgBlob(deckName, cards);
        triggerDownload(apkgBlob, deckName + '.apkg');
        showToast('Exported ' + cards.length + ' cards to ' + deckName + '.apkg', 'success');
        exportModal.classList.remove('active');
      } catch (err) {
        console.error(err);
        showToast('Direct .apkg build failed: ' + err.message + '. Falling back to TSV.', 'danger');
        state.exportFormat = 'tsv';
        updateExportModalPreview();
      }
    } else if (state.exportFormat === 'tsv') {
      const tsvContent = generateAnkiTsv(deckName, cards);
      const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
      triggerDownload(blob, deckName + '_anki_import.txt');
      showToast('Exported Anki TSV file', 'success');
      exportModal.classList.remove('active');
    } else if (state.exportFormat === 'markdown') {
      const mdContent = cardsToReadableText(deckName, cards);
      const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
      triggerDownload(blob, deckName + '.md');
      showToast('Exported readable markdown file', 'success');
      exportModal.classList.remove('active');
    } else if (state.exportFormat === 'json') {
      const jsonContent = generateJson(deckName, cards);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      triggerDownload(blob, deckName + '.json');
      showToast('Exported JSON backup', 'success');
      exportModal.classList.remove('active');
    }
  }

  // ==========================================
  // EVENT LISTENERS & BINDINGS
  // ==========================================

  // Deck Name Input
  deckNameInput.addEventListener('input', function (e) {
    state.deckName = e.target.value.trim();
  });

  // Sync Button (Raw Text -> Deck)
  btnSyncDeck.addEventListener('click', function () {
    const text = rawInputText.value;
    const res = parseReadableText(text);
    if (res.deckName) {
      state.deckName = res.deckName;
      deckNameInput.value = res.deckName;
    }
    state.cards = res.cards;
    state.currentIndex = 0;
    updateAllViews();
    showToast('Synchronized ' + res.cards.length + ' cards to deck', 'success');
  });

  // Clear text editor
  btnClearEditor.addEventListener('click', function () {
    if (confirm('Clear raw text editor?')) {
      rawInputText.value = '';
      state.cards = [];
      updateAllViews();
      showToast('Editor cleared', 'info');
    }
  });

  // Load sample deck button
  btnLoadSample.addEventListener('click', function () {
    loadSampleDeck();
  });

  // Export Modal Open
  btnExportModal.addEventListener('click', function () {
    updateExportModalPreview();
    exportModal.classList.add('active');
  });

  // Close Export Modal
  btnCloseExportModal.addEventListener('click', function () {
    exportModal.classList.remove('active');
  });

  // Quick 1-click .apkg export button
  btnQuickApkg.addEventListener('click', async function () {
    state.exportFormat = 'apkg';
    await handleExportDownload();
  });

  // Export option format switchers
  optApkg.addEventListener('click', function () {
    state.exportFormat = 'apkg';
    updateExportModalPreview();
  });
  optTsv.addEventListener('click', function () {
    state.exportFormat = 'tsv';
    updateExportModalPreview();
  });
  optMarkdown.addEventListener('click', function () {
    state.exportFormat = 'markdown';
    updateExportModalPreview();
  });
  optJson.addEventListener('click', function () {
    state.exportFormat = 'json';
    updateExportModalPreview();
  });

  // Copy export preview text
  btnCopyExportText.addEventListener('click', function () {
    const text = exportPreviewText.textContent;
    navigator.clipboard.writeText(text).then(function () {
      showToast('Copied content to clipboard', 'success');
    }).catch(function () {
      showToast('Unable to copy to clipboard', 'info');
    });
  });

  // Download export file
  btnDownloadExportFile.addEventListener('click', function () {
    handleExportDownload();
  });

  // Editor Tabs
  tabBatch.addEventListener('click', function () {
    tabBatch.classList.add('active');
    tabForm.classList.remove('active');
    batchEditorView.style.display = 'flex';
    formBuilderView.style.display = 'none';
  });

  tabForm.addEventListener('click', function () {
    tabForm.classList.add('active');
    tabBatch.classList.remove('active');
    formBuilderView.style.display = 'flex';
    batchEditorView.style.display = 'none';
  });

  // View Tabs (Flip vs Table)
  tabViewFlip.addEventListener('click', function () {
    tabViewFlip.classList.add('active');
    tabViewTable.classList.remove('active');
    flipCardView.style.display = 'block';
    deckTableView.style.display = 'none';
    renderFlipCardView();
  });

  tabViewTable.addEventListener('click', function () {
    tabViewTable.classList.add('active');
    tabViewFlip.classList.remove('active');
    deckTableView.style.display = 'flex';
    flipCardView.style.display = 'none';
    renderTableView();
  });

  // Flip card interactions
  activeFlashcard.addEventListener('click', flipCard);
  btnFlipCard.addEventListener('click', flipCard);
  btnNextCard.addEventListener('click', nextCard);
  btnPrevCard.addEventListener('click', prevCard);

  // Keyboard navigation for card flip and arrow navigation
  document.addEventListener('keydown', function (e) {
    // Ignore if focus is in textarea or input
    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      nextCard();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      prevCard();
    }
  });

  // Quick Action Buttons on Active Card
  btnEditCurrentCard.addEventListener('click', function () {
    const filtered = getFilteredCards();
    if (filtered.length === 0) return;
    const card = filtered[state.currentIndex];
    loadCardIntoForm(card.id);
  });

  btnDuplicateCurrentCard.addEventListener('click', function () {
    const filtered = getFilteredCards();
    if (filtered.length === 0) return;
    const card = filtered[state.currentIndex];
    duplicateCard(card.id);
  });

  btnDeleteCurrentCard.addEventListener('click', function () {
    const filtered = getFilteredCards();
    if (filtered.length === 0) return;
    const card = filtered[state.currentIndex];
    if (confirm('Delete current card?')) {
      deleteCard(card.id);
    }
  });

  // Form Builder Events
  formCardType.addEventListener('change', function () {
    const type = formCardType.value;
    if (type === 'cloze') {
      frontLabelText.textContent = 'Text with Cloze Deletion (e.g. {{c1::keyword}})';
      backGroupContainer.style.display = 'flex';
    } else if (type === 'reversed') {
      frontLabelText.textContent = 'Front (will also be generated as Back)';
      backGroupContainer.style.display = 'flex';
    } else {
      frontLabelText.textContent = 'Front / Question';
      backGroupContainer.style.display = 'flex';
    }
  });

  btnInsertClozeHelper.addEventListener('click', function () {
    const textarea = formFront;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end) || 'text';
    const clozeText = '{{c1::' + selected + '}}';
    textarea.value = textarea.value.substring(0, start) + clozeText + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + 6, start + 6 + selected.length);
  });

  btnResetForm.addEventListener('click', function () {
    formFront.value = '';
    formBack.value = '';
    formTags.value = '';
    state.editingCardId = null;
    btnAddCardFromForm.textContent = 'Add Card to Deck';
  });

  btnAddCardFromForm.addEventListener('click', handleSaveFormCard);

  // Search filter
  filterInput.addEventListener('input', function (e) {
    state.filterText = e.target.value.trim();
    state.currentIndex = 0;
    renderFlipCardView();
    renderTableView();
  });

  // Tag filter dropdown
  tagFilterSelect.addEventListener('change', function (e) {
    state.filterTag = e.target.value;
    state.currentIndex = 0;
    renderFlipCardView();
    renderTableView();
  });

  // Table action buttons delegation
  deckTableBody.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');

    if (action === 'edit') {
      loadCardIntoForm(id);
    } else if (action === 'dup') {
      duplicateCard(id);
    } else if (action === 'del') {
      if (confirm('Delete this card?')) {
        deleteCard(id);
      }
    }
  });

  // Insert template chips into Raw Editor
  chipQA.addEventListener('click', function () {
    rawInputText.value += '\n\nQ: New Question?\nA: Detailed Answer explanation.\nTags: topic category';
    btnSyncDeck.click();
  });

  chipHeading.addEventListener('click', function () {
    rawInputText.value += '\n\n### New Concept Heading\nThis is the explanation that becomes the back of the card.\nTags: topic';
    btnSyncDeck.click();
  });

  chipCloze.addEventListener('click', function () {
    rawInputText.value += '\n\nQ: In computer science, {{c1::caching}} improves data retrieval performance.\nTags: computer-science';
    btnSyncDeck.click();
  });

  chipTable.addEventListener('click', function () {
    rawInputText.value += '\n\n| Term / Question | Definition / Answer | Tags |\n|-----------------|---------------------|------|\n| DNS             | Domain Name System  | networking internet |';
    btnSyncDeck.click();
  });

  // Close modal when clicking on overlay background
  exportModal.addEventListener('click', function (e) {
    if (e.target === exportModal) {
      exportModal.classList.remove('active');
    }
  });

  // Initialize with Sample Deck
  loadSampleDeck();

})();
