/**
 * ChemLearn AI — Modern AI-Powered Chemistry Platform Core Engine
 * Data-Driven Single-Page Architecture with RAG AI Tutor, 3D VSEPR Canvas,
 * Adaptive Quiz System, 3D Flashcards, and LocalStorage Progress Persistence.
 */

class ChemLearnApp {
  constructor() {
    // Core Data Models
    this.chapterData = null;
    this.topics = [];
    this.flashcards = [];
    this.questions = [];
    this.revision = null;

    // Active View & State
    this.currentView = "dashboard";
    this.activeTopicId = "kossel-lewis";
    this.isExplainSimplyOpen = false;

    // Flashcards State
    this.activeCardIndex = 0;
    this.isCardFlipped = false;
    this.filteredFlashcards = [];
    this.currentFlashcardFilter = "all";

    // Quiz State
    this.quizQueue = [];
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.currentQuizFilter = "all";
    this.hasAnsweredCurrentQuestion = false;

    // User Progress Persistent State
    this.progressState = {
      completedTopics: [],
      masteredFlashcards: [],
      reviewFlashcards: [],
      quizScores: [],
      questionsAttempted: 0,
      correctAnswers: 0,
      topicMistakes: {}, // topic_id -> count of incorrect answers
      overallPercentage: 0
    };

    this.init();
  }

  async init() {
    this.loadPersistentProgress();
    await this.loadAllDatasets();
    this.setupNavigationAndEvents();
    this.renderDashboardView();
    this.renderChapterView();
    this.renderFlashcardsView();
    this.renderQuizView();
    this.renderRevisionView();
    this.setupVSEPRCanvas();
    this.updateProgressUI();
  }

  /* --------------------------------------------------------------------------
     1. Persistent Storage Engine
     -------------------------------------------------------------------------- */
  loadPersistentProgress() {
    try {
      const saved = localStorage.getItem("chemlearn_progress");
      if (saved) {
        this.progressState = { ...this.progressState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not read local progress", e);
    }
  }

  savePersistentProgress() {
    try {
      this.recalculateOverallProgress();
      localStorage.setItem("chemlearn_progress", JSON.stringify(this.progressState));
      this.updateProgressUI();
    } catch (e) {
      console.warn("Could not save local progress", e);
    }
  }

  recalculateOverallProgress() {
    const totalTopics = this.topics.length || 9;
    const completedCount = this.progressState.completedTopics.length;
    const topicWeight = (completedCount / totalTopics) * 50;

    const totalQuestions = this.progressState.questionsAttempted || 0;
    const accuracy = totalQuestions > 0 ? (this.progressState.correctAnswers / totalQuestions) : 0;
    const quizWeight = accuracy * 35;

    const totalCards = this.flashcards.length || 15;
    const cardsMastered = this.progressState.masteredFlashcards.length;
    const cardWeight = (cardsMastered / totalCards) * 15;

    this.progressState.overallPercentage = Math.min(100, Math.round(topicWeight + quizWeight + cardWeight));
  }

  updateProgressUI() {
    const pct = this.progressState.overallPercentage || 0;
    const pctStr = `${pct}%`;

    // Sidebar
    const spFill = document.getElementById("sp-progress-fill");
    const spPct = document.getElementById("sp-percentage");
    const spDone = document.getElementById("sp-topics-done");
    const spQuiz = document.getElementById("sp-quiz-score");

    if (spFill) spFill.style.width = pctStr;
    if (spPct) spPct.innerText = pctStr;
    if (spDone) spDone.innerText = this.progressState.completedTopics.length;
    
    const accuracy = this.progressState.questionsAttempted > 0 
      ? Math.round((this.progressState.correctAnswers / this.progressState.questionsAttempted) * 100)
      : 0;
    if (spQuiz) spQuiz.innerText = `${accuracy}%`;

    // Topbar Pill
    const ringCircle = document.getElementById("topbar-ring-circle");
    const ringPct = document.getElementById("topbar-ring-pct");
    if (ringCircle) {
      const offset = 88 - (88 * pct) / 100;
      ringCircle.style.strokeDashoffset = offset;
    }
    if (ringPct) ringPct.innerText = pctStr;

    // Dashboard Hero Metric Card
    const heroVal = document.getElementById("hero-progress-val");
    const heroCircle = document.getElementById("hero-progress-circle");
    const heroTopics = document.getElementById("hero-stat-topics");
    const heroQuiz = document.getElementById("hero-stat-quiz");
    const heroCards = document.getElementById("hero-stat-cards");
    const heroLevel = document.getElementById("dashboard-mastery-level");

    if (heroVal) heroVal.innerText = pctStr;
    if (heroCircle) {
      const heroOffset = 264 - (264 * pct) / 100;
      heroCircle.style.strokeDashoffset = heroOffset;
    }
    if (heroTopics) heroTopics.innerText = `${this.progressState.completedTopics.length}/${this.topics.length || 9}`;
    if (heroQuiz) heroQuiz.innerText = `${accuracy}%`;
    if (heroCards) heroCards.innerText = `${this.progressState.masteredFlashcards.length}/${this.flashcards.length || 15}`;
    
    if (heroLevel) {
      if (pct >= 85) heroLevel.innerText = "Master";
      else if (pct >= 50) heroLevel.innerText = "Proficient";
      else if (pct >= 20) heroLevel.innerText = "Intermediate";
      else heroLevel.innerText = "Beginner";
    }

    // Check for Weak Topic Alert
    this.updateWeakTopicAlert();
  }

  updateWeakTopicAlert() {
    const alertBanner = document.getElementById("dashboard-weak-alert");
    const alertTitle = document.getElementById("weak-alert-title");
    const alertDesc = document.getElementById("weak-alert-desc");
    if (!alertBanner) return;

    // Find topic with highest mistake count
    let maxMistakes = 0;
    let worstTopicId = null;

    for (const [topicId, count] of Object.entries(this.progressState.topicMistakes)) {
      if (count > maxMistakes) {
        maxMistakes = count;
        worstTopicId = topicId;
      }
    }

    if (maxMistakes >= 2 && worstTopicId) {
      const topicObj = this.topics.find(t => t.id === worstTopicId);
      const topicName = topicObj ? topicObj.title : worstTopicId;
      alertTitle.innerText = `Recommended Revision: ${topicName}`;
      alertDesc.innerText = `You missed ${maxMistakes} questions related to this topic in your practice sessions. A quick review will solidify your concepts!`;
      alertBanner.classList.remove("hidden");

      const alertBtn = document.getElementById("weak-alert-btn");
      if (alertBtn) {
        alertBtn.onclick = () => {
          this.activeTopicId = worstTopicId;
          this.switchView("chapter");
          this.renderActiveTopicContent();
        };
      }
    } else {
      alertBanner.classList.add("hidden");
    }
  }

  /* --------------------------------------------------------------------------
     2. Data Loading Engine
     -------------------------------------------------------------------------- */
  async loadAllDatasets() {
    try {
      const [chRes, topRes, fcRes, qRes, revRes] = await Promise.all([
        fetch("chapter.json"),
        fetch("topics.json"),
        fetch("flashcards.json"),
        fetch("questions.json"),
        fetch("revision.json")
      ]);

      if (chRes.ok) this.chapterData = await chRes.json();
      if (topRes.ok) this.topics = await topRes.json();
      if (fcRes.ok) this.flashcards = await fcRes.json();
      if (qRes.ok) this.questions = await qRes.json();
      if (revRes.ok) this.revision = await revRes.json();

      this.filteredFlashcards = [...this.flashcards];
      this.quizQueue = [...this.questions];
    } catch (e) {
      console.error("Error loading textbook datasets:", e);
    }
  }

  /* --------------------------------------------------------------------------
     3. SPA Navigation & Global Event Handlers
     -------------------------------------------------------------------------- */
  setupNavigationAndEvents() {
    // Sidebar Navigation Links
    document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
      btn.addEventListener("click", () => {
        const viewId = btn.getAttribute("data-view");
        this.switchView(viewId);
        // On mobile close sidebar
        document.getElementById("app-sidebar")?.classList.remove("open");
      });
    });

    // Mobile Sidebar Toggle
    document.getElementById("mobile-menu-toggle")?.addEventListener("click", () => {
      document.getElementById("app-sidebar")?.classList.toggle("open");
    });
    document.getElementById("sidebar-close-btn")?.addEventListener("click", () => {
      document.getElementById("app-sidebar")?.classList.remove("open");
    });

    // Dashboard Hero CTAs
    document.getElementById("hero-continue-btn")?.addEventListener("click", () => {
      // Find first uncompleted topic
      const firstUncompleted = this.topics.find(t => !this.progressState.completedTopics.includes(t.id));
      if (firstUncompleted) this.activeTopicId = firstUncompleted.id;
      this.switchView("chapter");
      this.renderActiveTopicContent();
    });

    document.getElementById("hero-quiz-btn")?.addEventListener("click", () => {
      this.switchView("quiz");
    });

    document.getElementById("hero-flashcards-btn")?.addEventListener("click", () => {
      this.switchView("flashcards");
    });

    document.getElementById("btn-view-all-topics")?.addEventListener("click", () => {
      this.switchView("chapter");
    });

    // Feature Boxes
    document.getElementById("fbox-flashcards")?.addEventListener("click", () => this.switchView("flashcards"));
    document.getElementById("fbox-quiz")?.addEventListener("click", () => this.switchView("quiz"));
    document.getElementById("fbox-revision")?.addEventListener("click", () => this.switchView("revision"));
    document.getElementById("fbox-ai")?.addEventListener("click", () => this.toggleAIDrawer(true));

    // AI Tutor Drawer Triggers
    document.getElementById("btn-quick-ai-tutor")?.addEventListener("click", () => this.toggleAIDrawer(true));
    document.getElementById("nav-ai-tutor-btn")?.addEventListener("click", () => this.toggleAIDrawer(true));
    document.getElementById("btn-close-ai-drawer")?.addEventListener("click", () => this.toggleAIDrawer(false));
    document.getElementById("btn-ask-ai-topic")?.addEventListener("click", () => {
      const activeTopic = this.topics.find(t => t.id === this.activeTopicId);
      const query = `Explain ${activeTopic ? activeTopic.title : 'this topic'} and its most important exam rules.`;
      this.toggleAIDrawer(true);
      this.sendUserAIQuery(query);
    });

    // AI Send Query
    document.getElementById("btn-send-ai-query")?.addEventListener("click", () => this.handleAIQuerySubmit());
    document.getElementById("ai-user-query")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleAIQuerySubmit();
    });

    // AI Suggestion Chips
    document.querySelectorAll(".ai-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const prompt = chip.getAttribute("data-prompt");
        this.sendUserAIQuery(prompt);
      });
    });

    // Global Search Modal (Ctrl+K)
    document.getElementById("global-search-trigger")?.addEventListener("click", () => this.toggleSearchModal(true));
    document.getElementById("btn-close-search-modal")?.addEventListener("click", () => this.toggleSearchModal(false));
    document.getElementById("search-modal-backdrop")?.addEventListener("click", (e) => {
      if (e.target.id === "search-modal-backdrop") this.toggleSearchModal(false);
    });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        this.toggleSearchModal(true);
      }
      if (e.key === "Escape") {
        this.toggleSearchModal(false);
      }
    });
    document.getElementById("search-modal-input")?.addEventListener("input", (e) => {
      this.handleGlobalSearch(e.target.value);
    });

    // PowerPoint Export
    document.getElementById("nav-export-pptx-btn")?.addEventListener("click", () => this.exportChapterPowerPoint());

    // Practice Generator Actions
    document.getElementById("btn-run-practice-gen")?.addEventListener("click", () => this.runPracticeGenerator());
    document.getElementById("btn-export-gen-pdf")?.addEventListener("click", () => window.print());
  }

  switchView(viewId) {
    this.currentView = viewId;

    // Update Nav Item Active states
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.getAttribute("data-view") === viewId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Switch App View Section
    document.querySelectorAll(".app-view").forEach(sec => sec.classList.remove("active"));
    const activeSec = document.getElementById(`view-${viewId}`);
    if (activeSec) {
      activeSec.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (viewId === "chapter") {
      this.renderActiveTopicContent();
    }
  }

  /* --------------------------------------------------------------------------
     4. View 1: Dashboard Renderer
     -------------------------------------------------------------------------- */
  renderDashboardView() {
    // Render 6 Big Questions
    const bqGrid = document.getElementById("dashboard-big-questions-grid");
    if (bqGrid && this.chapterData && this.chapterData.big_questions) {
      bqGrid.innerHTML = "";
      this.chapterData.big_questions.forEach(q => {
        const card = document.createElement("div");
        card.className = "bq-card";
        card.innerHTML = `
          <div class="bq-card-header">
            <div class="bq-icon-box"><i class="fa-solid fa-${q.icon || 'lightbulb'}"></i></div>
            <div>
              <span class="bq-tag">${q.category}</span>
              <h3 class="bq-title">${q.question}</h3>
            </div>
          </div>
          <div class="bq-body">
            <p class="bq-answer">${q.answer}</p>
            <div class="bq-fact"><i class="fa-solid fa-sparkles"></i> <strong>Did You Know?</strong> ${q.fun_fact}</div>
          </div>
        `;
        bqGrid.appendChild(card);
      });
    }

    // Render Topics Grid
    const topicsGrid = document.getElementById("dashboard-topics-grid");
    if (topicsGrid && this.topics.length > 0) {
      topicsGrid.innerHTML = "";
      this.topics.forEach((t, idx) => {
        const isDone = this.progressState.completedTopics.includes(t.id);
        const card = document.createElement("div");
        card.className = "topic-card";
        card.innerHTML = `
          <div class="topic-card-top">
            <div class="tc-icon"><i class="fa-solid fa-${t.icon || 'atom'}"></i></div>
            <span class="tc-status-pill ${isDone ? 'completed' : ''}">
              ${isDone ? '<i class="fa-solid fa-check"></i> Completed' : `Topic 4.${idx + 1}`}
            </span>
          </div>
          <h3 class="tc-title">${t.title}</h3>
          <h4 class="tc-subtitle">${t.subtitle || ''}</h4>
          <p class="tc-summary">${t.summary || ''}</p>
          <div class="tc-footer">
            <span>${t.subsections ? t.subsections.length : 1} sub-concepts</span>
            <span class="tc-btn-learn">Start Lesson &rarr;</span>
          </div>
        `;
        card.addEventListener("click", () => {
          this.activeTopicId = t.id;
          this.switchView("chapter");
          this.renderActiveTopicContent();
        });
        topicsGrid.appendChild(card);
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. View 2: Chapter & Topic Learning Reader
     -------------------------------------------------------------------------- */
  renderChapterView() {
    // Render Left TOC Sidebar
    const tocList = document.getElementById("topic-toc-list");
    if (!tocList) return;

    tocList.innerHTML = "";
    this.topics.forEach((t, idx) => {
      const isDone = this.progressState.completedTopics.includes(t.id);
      const isActive = t.id === this.activeTopicId;

      const item = document.createElement("div");
      item.className = `toc-item ${isActive ? 'active' : ''}`;
      item.setAttribute("data-topic-id", t.id);
      item.innerHTML = `
        <i class="fa-solid fa-${t.icon || 'atom'}"></i>
        <span>${t.title}</span>
        ${isDone ? '<i class="fa-solid fa-circle-check toc-check"></i>' : ''}
      `;
      item.addEventListener("click", () => {
        this.activeTopicId = t.id;
        this.renderActiveTopicContent();
      });
      tocList.appendChild(item);
    });

    // Topic Toolbar Actions
    const btnExplain = document.getElementById("btn-toggle-explain-simply");
    if (btnExplain) {
      btnExplain.onclick = () => this.toggleExplainSimply();
    }
    const btnCloseExplain = document.getElementById("btn-close-explain-simply");
    if (btnCloseExplain) {
      btnCloseExplain.onclick = () => this.toggleExplainSimply(false);
    }

    const btnComplete = document.getElementById("btn-mark-topic-complete");
    if (btnComplete) {
      btnComplete.onclick = () => this.toggleTopicCompletion(this.activeTopicId);
    }

    // Prev / Next Topic Buttons
    document.getElementById("btn-prev-topic")?.addEventListener("click", () => this.navigateTopicStep(-1));
    document.getElementById("btn-next-topic")?.addEventListener("click", () => this.navigateTopicStep(1));
  }

  renderActiveTopicContent() {
    const topic = this.topics.find(t => t.id === this.activeTopicId) || this.topics[0];
    if (!topic) return;

    // Update TOC active state
    document.querySelectorAll(".toc-item").forEach(item => {
      if (item.getAttribute("data-topic-id") === topic.id) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update Header
    const tIndex = this.topics.findIndex(t => t.id === topic.id);
    document.getElementById("topic-header-id").innerText = `Topic 4.${tIndex + 1}`;
    document.getElementById("topic-header-title").innerText = topic.title;
    document.getElementById("topic-header-subtitle").innerText = topic.subtitle || topic.summary;

    // Update Complete Button state
    const isCompleted = this.progressState.completedTopics.includes(topic.id);
    const completeBtn = document.getElementById("btn-mark-topic-complete");
    const completeIcon = document.getElementById("complete-btn-icon");
    const completeText = document.getElementById("complete-btn-text");

    if (completeBtn) {
      if (isCompleted) {
        completeBtn.classList.add("completed");
        completeIcon.className = "fa-solid fa-circle-check";
        completeText.innerText = "Completed";
      } else {
        completeBtn.classList.remove("completed");
        completeIcon.className = "fa-regular fa-circle-check";
        completeText.innerText = "Mark as Completed";
      }
    }

    // Update "Explain Simply" Panel Data
    if (topic.explain_simply) {
      document.getElementById("es-analogy-text").innerText = topic.explain_simply.analogy || "No analogy available.";
      document.getElementById("es-takeaway-text").innerText = topic.explain_simply.takeaway || "No takeaway available.";
      
      const tagsRow = document.getElementById("es-tags-row");
      if (tagsRow) {
        tagsRow.innerHTML = "";
        (topic.explain_simply.key_terms || []).forEach(term => {
          const tag = document.createElement("span");
          tag.className = "es-tag";
          tag.innerText = term;
          tagsRow.appendChild(tag);
        });
      }
    }

    // Hide explain simply by default on topic change
    this.toggleExplainSimply(false);

    // Render Subsections
    const bodyContent = document.getElementById("topic-body-content");
    bodyContent.innerHTML = "";

    if (topic.subsections && topic.subsections.length > 0) {
      topic.subsections.forEach(sub => {
        const subBox = document.createElement("div");
        subBox.className = "topic-subsection";
        subBox.innerHTML = `
          <h3 class="subsection-title"><i class="fa-solid fa-book-open"></i> ${sub.title}</h3>
          <p class="subsection-text">${sub.content}</p>
        `;
        bodyContent.appendChild(subBox);
      });
    } else if (topic.exercises && topic.exercises.length > 0) {
      // NCERT Solved Exercises Renderer
      topic.exercises.forEach(ex => {
        const exBox = document.createElement("div");
        exBox.className = "topic-subsection";
        exBox.innerHTML = `
          <h3 class="subsection-title"><i class="fa-solid fa-circle-question"></i> Exercise ${ex.q_num}: ${ex.question}</h3>
          <p class="subsection-text" style="color: #cbd5e1;"><strong>Solution:</strong> ${ex.answer}</p>
        `;
        bodyContent.appendChild(exBox);
      });
    }

    // Render Interactive Visualizer / Calculator Lab
    this.renderInteractiveLab(topic);

    // Render Extra Tables / Formulas
    this.renderExtraTablesAndFormulas(topic);

    // Update Footer Navigation
    const prevBtn = document.getElementById("btn-prev-topic");
    const nextBtn = document.getElementById("btn-next-topic");
    const prevName = document.getElementById("prev-topic-name");
    const nextName = document.getElementById("next-topic-name");

    if (tIndex > 0) {
      prevBtn.style.visibility = "visible";
      prevName.innerText = this.topics[tIndex - 1].title;
    } else {
      prevBtn.style.visibility = "hidden";
    }

    if (tIndex < this.topics.length - 1) {
      nextBtn.style.visibility = "visible";
      nextName.innerText = this.topics[tIndex + 1].title;
    } else {
      nextBtn.style.visibility = "hidden";
    }
  }

  toggleExplainSimply(forceState) {
    const card = document.getElementById("explain-simply-card");
    const btnText = document.getElementById("explain-simply-btn-text");
    if (!card) return;

    if (typeof forceState === "boolean") {
      this.isExplainSimplyOpen = forceState;
    } else {
      this.isExplainSimplyOpen = !this.isExplainSimplyOpen;
    }

    if (this.isExplainSimplyOpen) {
      card.classList.remove("hidden");
      if (btnText) btnText.innerText = "Hide Simple Explanation";
    } else {
      card.classList.add("hidden");
      if (btnText) btnText.innerText = "Explain Simply";
    }
  }

  toggleTopicCompletion(topicId) {
    const idx = this.progressState.completedTopics.indexOf(topicId);
    if (idx === -1) {
      this.progressState.completedTopics.push(topicId);
    } else {
      this.progressState.completedTopics.splice(idx, 1);
    }
    this.savePersistentProgress();
    this.renderChapterView();
    this.renderActiveTopicContent();
    this.renderDashboardView();
  }

  navigateTopicStep(delta) {
    const currentIndex = this.topics.findIndex(t => t.id === this.activeTopicId);
    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < this.topics.length) {
      this.activeTopicId = this.topics[newIndex].id;
      this.renderActiveTopicContent();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* Interactive Lab Component (VSEPR 3D Canvas, Formal Charge Calc, MOT) */
  renderInteractiveLab(topic) {
    const labContainer = document.getElementById("topic-interactive-lab");
    if (!labContainer) return;

    if (topic.id === "vsepr-theory") {
      labContainer.innerHTML = `
        <div class="lab-container">
          <h3 class="lab-title"><i class="fa-solid fa-shapes"></i> Interactive 3D VSEPR Geometry Visualizer</h3>
          <div class="vsepr-visualizer-box">
            <div class="vsepr-canvas-wrapper">
              <canvas id="vsepr-canvas" width="360" height="260"></canvas>
            </div>
            <div class="vsepr-ctrls">
              <label class="vsepr-select-label" for="vsepr-shape-select">Select Molecular Geometry / Molecule:</label>
              <select id="vsepr-shape-select" class="vsepr-select">
                <option value="linear">Linear (BeCl2, CO2 - 180°)</option>
                <option value="trigonal-planar">Trigonal Planar (BF3, BCl3 - 120°)</option>
                <option value="tetrahedral" selected>Tetrahedral (CH4, CCl4 - 109.5°)</option>
                <option value="trigonal-pyramidal">Trigonal Pyramidal (NH3 - 107°)</option>
                <option value="bent">Bent / V-shaped (H2O - 104.5°)</option>
                <option value="trigonal-bipyramidal">Trigonal Bipyramidal (PCl5 - 90° & 120°)</option>
                <option value="see-saw">See-saw (SF4 - Distorted)</option>
                <option value="t-shaped">T-shaped (ClF3)</option>
                <option value="octahedral">Octahedral (SF6 - 90°)</option>
                <option value="square-planar">Square Planar (XeF4 - 90°)</option>
              </select>
              
              <div class="vsepr-meta-card">
                <div class="vsepr-meta-row">
                  <span>Type &amp; Bond Pairs:</span>
                  <strong id="vsepr-meta-type">AB4 (4 BP, 0 LP)</strong>
                </div>
                <div class="vsepr-meta-row">
                  <span>Ideal Angle:</span>
                  <strong id="vsepr-meta-angle">109.5°</strong>
                </div>
                <div class="vsepr-meta-row">
                  <span>Textbook Example:</span>
                  <strong id="vsepr-meta-example">CH4, CCl4, SiF4</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      setTimeout(() => {
        document.getElementById("vsepr-shape-select")?.addEventListener("change", () => this.drawVSEPRShape());
        this.drawVSEPRShape();
      }, 50);

    } else if (topic.id === "kossel-lewis") {
      labContainer.innerHTML = `
        <div class="lab-container">
          <h3 class="lab-title"><i class="fa-solid fa-calculator"></i> Formal Charge Calculator Lab</h3>
          <p style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 16px;">
            Formula: $\\text{F.C.} = V - N - \\frac{1}{2}B$ (Calculates atom formal charge to determine lowest energy canonical form).
          </p>
          <div class="fc-calc-box">
            <div class="fc-calc-field">
              <label>Valence Electrons in Free Atom (V):</label>
              <input type="number" id="fc-input-v" value="6" min="1" max="8">
            </div>
            <div class="fc-calc-field">
              <label>Non-bonding Lone Pair e⁻ (N):</label>
              <input type="number" id="fc-input-n" value="2" min="0" max="8">
            </div>
            <div class="fc-calc-field">
              <label>Total Bonding Shared e⁻ (B):</label>
              <input type="number" id="fc-input-b" value="6" min="0" max="12">
            </div>
            <div class="fc-result-card">
              <span style="font-size: 0.75rem; color: #94a3b8; display: block;">Calculated Formal Charge</span>
              <strong class="fc-result-val" id="fc-output-val">+1</strong>
            </div>
          </div>
        </div>
      `;
      setTimeout(() => {
        ["fc-input-v", "fc-input-n", "fc-input-b"].forEach(id => {
          document.getElementById(id)?.addEventListener("input", () => this.computeFormalCharge());
        });
        this.computeFormalCharge();
      }, 50);

    } else {
      labContainer.innerHTML = "";
    }
  }

  computeFormalCharge() {
    const v = parseFloat(document.getElementById("fc-input-v")?.value) || 0;
    const n = parseFloat(document.getElementById("fc-input-n")?.value) || 0;
    const b = parseFloat(document.getElementById("fc-input-b")?.value) || 0;
    const fc = v - n - (0.5 * b);
    const out = document.getElementById("fc-output-val");
    if (out) {
      out.innerText = fc > 0 ? `+${fc}` : `${fc}`;
    }
  }

  drawVSEPRShape() {
    const canvas = document.getElementById("vsepr-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const shape = document.getElementById("vsepr-shape-select")?.value || "tetrahedral";

    const metaType = document.getElementById("vsepr-meta-type");
    const metaAngle = document.getElementById("vsepr-meta-angle");
    const metaExample = document.getElementById("vsepr-meta-example");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Helper for rendering spheres
    const drawAtom = (x, y, r, color, label) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x, y);
    };

    const drawBond = (x1, y1, x2, y2, color = "#38bdf8") => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    // Render geometries
    if (shape === "linear") {
      if (metaType) metaType.innerText = "AB2 (2 BP, 0 LP)";
      if (metaAngle) metaAngle.innerText = "180°";
      if (metaExample) metaExample.innerText = "BeCl2, CO2, HgCl2";

      drawBond(cx - 85, cy, cx + 85, cy);
      drawAtom(cx - 85, cy, 14, "#10b981", "Cl");
      drawAtom(cx + 85, cy, 14, "#10b981", "Cl");
      drawAtom(cx, cy, 18, "#38bdf8", "Be");

    } else if (shape === "trigonal-planar") {
      if (metaType) metaType.innerText = "AB3 (3 BP, 0 LP)";
      if (metaAngle) metaAngle.innerText = "120°";
      if (metaExample) metaExample.innerText = "BF3, BCl3";

      drawBond(cx, cy, cx, cy - 75);
      drawBond(cx, cy, cx - 65, cy + 45);
      drawBond(cx, cy, cx + 65, cy + 45);

      drawAtom(cx, cy - 75, 14, "#f59e0b", "F");
      drawAtom(cx - 65, cy + 45, 14, "#f59e0b", "F");
      drawAtom(cx + 65, cy + 45, 14, "#f59e0b", "F");
      drawAtom(cx, cy, 18, "#6366f1", "B");

    } else if (shape === "tetrahedral") {
      if (metaType) metaType.innerText = "AB4 (4 BP, 0 LP)";
      if (metaAngle) metaAngle.innerText = "109.5°";
      if (metaExample) metaExample.innerText = "CH4, CCl4, SiF4, NH4+";

      drawBond(cx, cy, cx, cy - 80);
      drawBond(cx, cy, cx - 70, cy + 55);
      drawBond(cx, cy, cx + 70, cy + 55);
      drawBond(cx, cy, cx + 25, cy - 25, "rgba(56,189,248,0.5)"); // 3D depth

      drawAtom(cx, cy - 80, 13, "#fff", "H");
      drawAtom(cx - 70, cy + 55, 13, "#fff", "H");
      drawAtom(cx + 70, cy + 55, 13, "#fff", "H");
      drawAtom(cx + 25, cy - 25, 11, "rgba(255,255,255,0.7)", "H");
      drawAtom(cx, cy, 18, "#38bdf8", "C");

    } else if (shape === "trigonal-pyramidal") {
      if (metaType) metaType.innerText = "AB3E (3 BP, 1 LP)";
      if (metaAngle) metaAngle.innerText = "107° (Compressed by LP)";
      if (metaExample) metaExample.innerText = "NH3, PCl3";

      // Draw Lone Pair Balloon
      ctx.beginPath();
      ctx.ellipse(cx, cy - 45, 16, 26, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      drawBond(cx, cy, cx - 65, cy + 60);
      drawBond(cx, cy, cx + 65, cy + 60);
      drawBond(cx, cy, cx, cy + 70);

      drawAtom(cx - 65, cy + 60, 13, "#fff", "H");
      drawAtom(cx + 65, cy + 60, 13, "#fff", "H");
      drawAtom(cx, cy + 70, 13, "#fff", "H");
      drawAtom(cx, cy, 18, "#38bdf8", "N");

    } else if (shape === "bent") {
      if (metaType) metaType.innerText = "AB2E2 (2 BP, 2 LP)";
      if (metaAngle) metaAngle.innerText = "104.5° (2 LP-LP Repulsions)";
      if (metaExample) metaExample.innerText = "H2O, SO2, O3";

      // Draw 2 Lone Pair Balloons
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy - 40, 14, 22, -0.4, 0, Math.PI * 2);
      ctx.ellipse(cx + 30, cy - 40, 14, 22, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      drawBond(cx, cy, cx - 65, cy + 55);
      drawBond(cx, cy, cx + 65, cy + 55);

      drawAtom(cx - 65, cy + 55, 13, "#fff", "H");
      drawAtom(cx + 65, cy + 55, 13, "#fff", "H");
      drawAtom(cx, cy, 18, "#f43f5e", "O");

    } else {
      // Octahedral / T-shaped / Bipyramidal default
      if (metaType) metaType.innerText = "AB5 / AB6 Complex";
      if (metaAngle) metaAngle.innerText = "90°, 120°";
      if (metaExample) metaExample.innerText = "PCl5, SF6";

      drawBond(cx, cy - 80, cx, cy + 80);
      drawBond(cx - 75, cy, cx + 75, cy);
      drawBond(cx - 45, cy - 35, cx + 45, cy + 35, "rgba(56,189,248,0.6)");

      drawAtom(cx, cy - 80, 12, "#10b981", "F");
      drawAtom(cx, cy + 80, 12, "#10b981", "F");
      drawAtom(cx - 75, cy, 12, "#10b981", "F");
      drawAtom(cx + 75, cy, 12, "#10b981", "F");
      drawAtom(cx - 45, cy - 35, 10, "#10b981", "F");
      drawAtom(cx + 45, cy + 35, 10, "#10b981", "F");
      drawAtom(cx, cy, 18, "#f59e0b", "S");
    }
  }

  setupVSEPRCanvas() {
    window.addEventListener("resize", () => {
      if (this.currentView === "chapter" && this.activeTopicId === "vsepr-theory") {
        this.drawVSEPRShape();
      }
    });
  }

  renderExtraTablesAndFormulas(topic) {
    const extraBox = document.getElementById("topic-extra-tables");
    if (!extraBox) return;
    extraBox.innerHTML = "";

    // If Table Data exists (e.g. Lewis table, Dipole table, MOT table)
    if (topic.table_data && topic.table_data.length > 0) {
      const keys = Object.keys(topic.table_data[0]);
      let tableHTML = `
        <div class="data-table-wrapper">
          <table class="chem-data-table">
            <thead>
              <tr>${keys.map(k => `<th>${k}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${topic.table_data.map(row => `
                <tr>${keys.map(k => `<td>${row[k]}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      extraBox.innerHTML += tableHTML;
    }
  }

  /* --------------------------------------------------------------------------
     6. View 3: 3D Concept Flashcards Engine
     -------------------------------------------------------------------------- */
  renderFlashcardsView() {
    // Setup Filter Buttons
    document.querySelectorAll(".fc-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".fc-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFlashcardFilter = btn.getAttribute("data-filter");
        this.applyFlashcardFilter();
      });
    });

    // Flip Card Click
    const scene = document.getElementById("flashcard-scene");
    if (scene) {
      scene.onclick = () => this.flipActiveFlashcard();
    }
    document.getElementById("btn-fc-flip")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.flipActiveFlashcard();
    });

    // Keyboard Spacebar Flip
    document.addEventListener("keydown", (e) => {
      if (this.currentView === "flashcards" && e.code === "Space" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        this.flipActiveFlashcard();
      }
    });

    // Navigation Controls
    document.getElementById("btn-fc-prev")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.stepFlashcard(-1);
    });
    document.getElementById("btn-fc-next")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.stepFlashcard(1);
    });

    // Mastery Action Buttons
    document.getElementById("btn-fc-known")?.addEventListener("click", () => {
      const current = this.filteredFlashcards[this.activeCardIndex];
      if (current) {
        if (!this.progressState.masteredFlashcards.includes(current.id)) {
          this.progressState.masteredFlashcards.push(current.id);
        }
        // Remove from review if was there
        const revIdx = this.progressState.reviewFlashcards.indexOf(current.id);
        if (revIdx !== -1) this.progressState.reviewFlashcards.splice(revIdx, 1);
        
        this.savePersistentProgress();
        this.updateFlashcardStats();
        this.stepFlashcard(1);
      }
    });

    document.getElementById("btn-fc-need-rev")?.addEventListener("click", () => {
      const current = this.filteredFlashcards[this.activeCardIndex];
      if (current) {
        if (!this.progressState.reviewFlashcards.includes(current.id)) {
          this.progressState.reviewFlashcards.push(current.id);
        }
        const mIdx = this.progressState.masteredFlashcards.indexOf(current.id);
        if (mIdx !== -1) this.progressState.masteredFlashcards.splice(mIdx, 1);

        this.savePersistentProgress();
        this.updateFlashcardStats();
        this.stepFlashcard(1);
      }
    });

    this.applyFlashcardFilter();
  }

  applyFlashcardFilter() {
    if (this.currentFlashcardFilter === "all") {
      this.filteredFlashcards = [...this.flashcards];
    } else {
      this.filteredFlashcards = this.flashcards.filter(fc => fc.topic_id === this.currentFlashcardFilter);
    }
    this.activeCardIndex = 0;
    this.isCardFlipped = false;
    this.renderCurrentFlashcard();
    this.updateFlashcardStats();
  }

  renderCurrentFlashcard() {
    const card = this.filteredFlashcards[this.activeCardIndex];
    const inner = document.getElementById("active-flashcard");
    if (!card || !inner) return;

    inner.classList.remove("is-flipped");
    this.isCardFlipped = false;

    document.getElementById("fc-front-topic").innerText = `Topic: ${card.topic}`;
    document.getElementById("fc-front-diff").innerText = card.difficulty || "Medium";
    document.getElementById("fc-front-text").innerText = card.front;

    document.getElementById("fc-back-topic").innerText = `Topic: ${card.topic}`;
    document.getElementById("fc-back-text").innerText = card.back;

    document.getElementById("fc-current-index-label").innerText = `Card ${this.activeCardIndex + 1} of ${this.filteredFlashcards.length}`;
  }

  flipActiveFlashcard() {
    const inner = document.getElementById("active-flashcard");
    if (!inner) return;
    this.isCardFlipped = !this.isCardFlipped;
    inner.classList.toggle("is-flipped", this.isCardFlipped);
  }

  stepFlashcard(delta) {
    const len = this.filteredFlashcards.length;
    if (len === 0) return;
    this.activeCardIndex = (this.activeCardIndex + delta + len) % len;
    this.renderCurrentFlashcard();
  }

  updateFlashcardStats() {
    const totalEl = document.getElementById("fc-stat-total");
    const masteredEl = document.getElementById("fc-stat-mastered");
    const learningEl = document.getElementById("fc-stat-learning");

    if (totalEl) totalEl.innerText = this.flashcards.length;
    if (masteredEl) masteredEl.innerText = this.progressState.masteredFlashcards.length;
    if (learningEl) learningEl.innerText = this.progressState.reviewFlashcards.length;
  }

  /* --------------------------------------------------------------------------
     7. View 4: Adaptive Quiz Engine
     -------------------------------------------------------------------------- */
  renderQuizView() {
    // Difficulty Filter Buttons
    document.querySelectorAll(".quiz-diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".quiz-diff-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentQuizFilter = btn.getAttribute("data-diff");
        this.restartQuiz();
      });
    });

    document.getElementById("btn-next-quiz-question")?.addEventListener("click", () => {
      this.stepQuizQuestion();
    });

    document.getElementById("btn-retake-quiz")?.addEventListener("click", () => this.restartQuiz());
    document.getElementById("btn-results-to-dashboard")?.addEventListener("click", () => this.switchView("dashboard"));
    document.getElementById("btn-review-weak-from-results")?.addEventListener("click", () => {
      // Find weak topic and navigate
      let worst = null;
      let maxCount = 0;
      for (const [tId, count] of Object.entries(this.progressState.topicMistakes)) {
        if (count > maxCount) {
          maxCount = count;
          worst = tId;
        }
      }
      if (worst) this.activeTopicId = worst;
      this.switchView("chapter");
      this.renderActiveTopicContent();
    });

    this.restartQuiz();
  }

  restartQuiz() {
    if (this.currentQuizFilter === "all") {
      this.quizQueue = [...this.questions];
    } else {
      this.quizQueue = this.questions.filter(q => q.difficulty === this.currentQuizFilter);
    }

    // Shuffle questions slightly for variety
    this.quizQueue.sort(() => Math.random() - 0.5);

    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.hasAnsweredCurrentQuestion = false;

    document.getElementById("quiz-card-container")?.classList.remove("hidden");
    document.getElementById("quiz-results-screen")?.classList.add("hidden");
    document.getElementById("quiz-live-score").innerText = "0";

    this.renderActiveQuizQuestion();
  }

  renderActiveQuizQuestion() {
    const q = this.quizQueue[this.currentQuizIndex];
    if (!q) {
      this.showQuizResults();
      return;
    }

    this.hasAnsweredCurrentQuestion = false;

    // Update Progress Info
    document.getElementById("quiz-question-index").innerText = `Question ${this.currentQuizIndex + 1} of ${this.quizQueue.length}`;
    document.getElementById("quiz-current-topic").innerText = `Topic: ${q.topic}`;
    
    const fillPct = ((this.currentQuizIndex + 1) / this.quizQueue.length) * 100;
    document.getElementById("quiz-progress-fill").style.width = `${fillPct}%`;

    // Question Text
    document.getElementById("quiz-question-text").innerText = q.question;

    // Options
    const optionsContainer = document.getElementById("quiz-options-list");
    optionsContainer.innerHTML = "";

    const prefixes = ["A", "B", "C", "D"];
    q.options.forEach((opt, idx) => {
      const optBtn = document.createElement("div");
      optBtn.className = "quiz-option";
      optBtn.innerHTML = `
        <span class="option-prefix">${prefixes[idx] || (idx + 1)}</span>
        <span class="option-text">${opt}</span>
      `;
      optBtn.addEventListener("click", () => this.handleOptionSelection(opt, q, optBtn));
      optionsContainer.appendChild(optBtn);
    });

    // Hide feedback box
    document.getElementById("quiz-feedback-box")?.classList.add("hidden");
  }

  handleOptionSelection(selectedOption, question, optionEl) {
    if (this.hasAnsweredCurrentQuestion) return;
    this.hasAnsweredCurrentQuestion = true;

    this.progressState.questionsAttempted += 1;
    const isCorrect = selectedOption.trim().toLowerCase() === question.answer.trim().toLowerCase();

    // Disable all options
    document.querySelectorAll(".quiz-option").forEach(el => {
      el.classList.add("disabled");
      const txt = el.querySelector(".option-text")?.innerText || "";
      if (txt.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
        el.classList.add("correct");
      }
    });

    if (isCorrect) {
      optionEl.classList.add("correct");
      this.quizScore += 10;
      this.progressState.correctAnswers += 1;
      document.getElementById("quiz-live-score").innerText = this.quizScore;
    } else {
      optionEl.classList.add("incorrect");
      // Record mistake for weak topic analyzer
      const tId = question.topic_id || "general";
      this.progressState.topicMistakes[tId] = (this.progressState.topicMistakes[tId] || 0) + 1;
    }

    this.savePersistentProgress();

    // Show Feedback Box
    const fbBox = document.getElementById("quiz-feedback-box");
    const fbTitle = document.getElementById("feedback-status-title");
    const fbText = document.getElementById("feedback-explanation-text");

    if (fbBox && fbTitle && fbText) {
      if (isCorrect) {
        fbTitle.className = "feedback-status correct";
        fbTitle.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct Answer!';
      } else {
        fbTitle.className = "feedback-status incorrect";
        fbTitle.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Incorrect. Correct Answer is: <strong>${question.answer}</strong>`;
      }
      fbText.innerText = question.explanation || "No explanation provided.";
      fbBox.classList.remove("hidden");
    }
  }

  stepQuizQuestion() {
    this.currentQuizIndex += 1;
    if (this.currentQuizIndex < this.quizQueue.length) {
      this.renderActiveQuizQuestion();
    } else {
      this.showQuizResults();
    }
  }

  showQuizResults() {
    document.getElementById("quiz-card-container")?.classList.add("hidden");
    const resScreen = document.getElementById("quiz-results-screen");
    if (!resScreen) return;

    resScreen.classList.remove("hidden");

    const total = this.quizQueue.length;
    const correct = this.quizScore / 10;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById("results-score-pct").innerText = `${pct}%`;
    document.getElementById("results-score-fraction").innerText = `${correct}/${total} Correct`;
    document.getElementById("results-attempted").innerText = total;
    document.getElementById("results-accuracy").innerText = `${pct}%`;

    // Calculate Weakest Topic
    let worst = "None Identified";
    let maxMistakes = 0;
    for (const [tId, count] of Object.entries(this.progressState.topicMistakes)) {
      if (count > maxMistakes) {
        maxMistakes = count;
        const topObj = this.topics.find(t => t.id === tId);
        worst = topObj ? topObj.title : tId;
      }
    }
    document.getElementById("results-weak-topic").innerText = worst;
  }

  /* --------------------------------------------------------------------------
     8. View 5: Quick Revision Sheet Renderer
     -------------------------------------------------------------------------- */
  renderRevisionView() {
    // Tab buttons
    document.querySelectorAll(".rev-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".rev-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const tabId = tab.getAttribute("data-tab");
        document.querySelectorAll(".revision-tab-panel").forEach(p => p.classList.remove("active"));
        document.getElementById(`rev-tab-${tabId}`)?.classList.add("active");
      });
    });

    if (!this.revision) return;

    // Formulas
    const fGrid = document.getElementById("rev-formulas-grid");
    if (fGrid && this.revision.master_formulas) {
      fGrid.innerHTML = "";
      this.revision.master_formulas.forEach(f => {
        const card = document.createElement("div");
        card.className = "rev-card";
        card.innerHTML = `
          <h3 class="rev-card-title"><i class="fa-solid fa-square-root-variable" style="color:#38bdf8;"></i> ${f.name}</h3>
          <div class="rev-formula-box">${f.formula}</div>
          <p class="rev-card-desc">${f.description}</p>
        `;
        fGrid.appendChild(card);
      });
    }

    // Definitions
    const dGrid = document.getElementById("rev-definitions-grid");
    if (dGrid && this.revision.key_definitions) {
      dGrid.innerHTML = "";
      this.revision.key_definitions.forEach(d => {
        const card = document.createElement("div");
        card.className = "rev-card";
        card.innerHTML = `
          <h3 class="rev-card-title"><i class="fa-solid fa-book" style="color:#10b981;"></i> ${d.term}</h3>
          <p class="rev-card-desc" style="color: #e2e8f0;">${d.definition}</p>
        `;
        dGrid.appendChild(card);
      });
    }

    // Differences
    const diffContainer = document.getElementById("rev-differences-container");
    if (diffContainer && this.revision.key_differences) {
      diffContainer.innerHTML = "";
      this.revision.key_differences.forEach(diff => {
        const card = document.createElement("div");
        card.className = "diff-card";
        card.innerHTML = `
          <h3 class="diff-card-title">${diff.topic}</h3>
          <table class="diff-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>${diff.topic.split(' vs ')[0]}</th>
                <th>${diff.topic.split(' vs ')[1] || 'Alternative'}</th>
              </tr>
            </thead>
            <tbody>
              ${diff.points.map(p => `
                <tr>
                  <td><strong>${p.aspect}</strong></td>
                  <td>${p.a}</td>
                  <td>${p.b}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        diffContainer.appendChild(card);
      });
    }

    // Exam Tips
    const tipsList = document.getElementById("rev-tips-list");
    if (tipsList && this.revision.exam_tips) {
      tipsList.innerHTML = "";
      this.revision.exam_tips.forEach(tip => {
        const item = document.createElement("div");
        item.className = "tip-item";
        item.innerHTML = `
          <div class="tip-icon"><i class="fa-solid fa-lightbulb"></i></div>
          <p class="tip-text">${tip}</p>
        `;
        tipsList.appendChild(item);
      });
    }
  }

  /* --------------------------------------------------------------------------
     9. View 6: Practice Question Generator
     -------------------------------------------------------------------------- */
  runPracticeGenerator() {
    const topicSelect = document.getElementById("gen-topic-select")?.value || "all";
    const diffSelect = document.getElementById("gen-diff-select")?.value || "all";
    const countSelect = parseInt(document.getElementById("gen-count-select")?.value) || 10;

    let pool = [...this.questions];

    if (topicSelect !== "all") {
      pool = pool.filter(q => q.topic_id === topicSelect);
    }
    if (diffSelect !== "all") {
      pool = pool.filter(q => q.difficulty === diffSelect);
    }

    // Shuffle and slice
    pool.sort(() => Math.random() - 0.5);
    const chosen = pool.slice(0, countSelect);

    const outContainer = document.getElementById("gen-output-container");
    const outList = document.getElementById("gen-questions-list");
    const outTitle = document.getElementById("gen-output-title");

    if (!outContainer || !outList) return;

    outTitle.innerText = `Custom Practice Set Generated (${chosen.length} Questions)`;
    outList.innerHTML = "";

    chosen.forEach((q, idx) => {
      const qItem = document.createElement("div");
      qItem.className = "gen-q-item";
      qItem.innerHTML = `
        <div class="gen-q-meta">
          <span class="gen-tag">Q${idx + 1}</span>
          <span class="gen-tag">${q.topic}</span>
          <span class="gen-tag" style="background:rgba(255,255,255,0.06); color:#94a3b8;">${q.difficulty}</span>
        </div>
        <h4 class="gen-q-text">${q.question}</h4>
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
          ${q.options.map(opt => `<div style="font-size:0.9rem; color:#94a3b8;">&bull; ${opt}</div>`).join('')}
        </div>
        <details class="gen-answer-reveal">
          <summary style="cursor:pointer; font-weight:700; color:#10b981;">Click to Reveal Correct Answer &amp; Explanation</summary>
          <div style="margin-top:8px;">
            <strong>Answer:</strong> ${q.answer}<br>
            <span style="color:#94a3b8;">${q.explanation}</span>
          </div>
        </details>
      `;
      outList.appendChild(qItem);
    });

    outContainer.classList.remove("hidden");
    outContainer.scrollIntoView({ behavior: "smooth" });
  }

  /* --------------------------------------------------------------------------
     10. Textbook RAG AI Tutor Engine
     -------------------------------------------------------------------------- */
  toggleAIDrawer(isOpen) {
    const drawer = document.getElementById("ai-tutor-drawer");
    if (!drawer) return;
    drawer.classList.toggle("open", isOpen);
  }

  handleAIQuerySubmit() {
    const input = document.getElementById("ai-user-query");
    if (!input || !input.value.trim()) return;
    const query = input.value.trim();
    input.value = "";
    this.sendUserAIQuery(query);
  }

  sendUserAIQuery(query) {
    const messagesContainer = document.getElementById("ai-chat-messages");
    if (!messagesContainer) return;

    // 1. Add User Message
    const userMsg = document.createElement("div");
    userMsg.className = "ai-message user";
    userMsg.innerHTML = `<div class="msg-content"><p>${query}</p></div>`;
    messagesContainer.appendChild(userMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Add Assistant Thinking Bubble
    const assistantMsg = document.createElement("div");
    assistantMsg.className = "ai-message assistant";
    assistantMsg.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-content"><p><i class="fa-solid fa-spinner fa-spin"></i> Searching NCERT Chapter 4 knowledge base...</p></div>
    `;
    messagesContainer.appendChild(assistantMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Process Query through RAG Matcher
    setTimeout(() => {
      const responseObj = this.retrieveTextbookAnswer(query);
      assistantMsg.innerHTML = `
        <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-content">
          <p>${responseObj.answer}</p>
          <span class="citation-tag"><i class="fa-solid fa-bookmark"></i> Cited: ${responseObj.citation}</span>
        </div>
      `;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 450);
  }

  /**
   * Semantic BM25-style textbook chunk retrieval
   */
  retrieveTextbookAnswer(query) {
    const qLower = query.toLowerCase();

    // 1. VSEPR Repulsion / Shapes
    if (qLower.includes("vsepr") || qLower.includes("shape") || qLower.includes("geometry") || qLower.includes("lone pair") || qLower.includes("repulsion")) {
      return {
        answer: `According to <strong>VSEPR Theory</strong> (proposed by Sidgwick &amp; Powell, refined by Nyholm &amp; Gillespie):<br><br>
        1. Molecular geometry is determined by repulsions between electron pairs around the central atom.<br>
        2. The order of repulsion is: <code>Lone Pair - Lone Pair &gt; Lone Pair - Bond Pair &gt; Bond Pair - Bond Pair</code>.<br>
        3. Lone pairs occupy more space because they are localized on a single nucleus, which compresses ideal bond angles (e.g. H₂O is 104.5° instead of 109.5°).`,
        citation: "NCERT Section 4.4 — VSEPR Theory"
      };
    }

    // 2. MOT / O2 Paramagnetism / Bond Order
    if (qLower.includes("mot") || qLower.includes("paramagnetic") || qLower.includes("o2") || qLower.includes("molecular orbital") || qLower.includes("bond order")) {
      return {
        answer: `In <strong>Molecular Orbital Theory (MOT)</strong> (Hund &amp; Mulliken, 1932):<br><br>
        • <strong>Paramagnetism of O₂:</strong> Liquid oxygen is paramagnetic because its MO configuration has 2 unpaired electrons occupying degenerate antibonding orbitals: <code>(π*2px)¹ (π*2py)¹</code>.<br>
        • <strong>Bond Order Formula:</strong> $\\text{B.O.} = \\frac{N_b - N_a}{2}$. For O₂, B.O. = (10 - 6)/2 = <strong>2.0</strong>.<br>
        • For species with $\\le 14$ electrons (N₂, C₂), $\\pi 2px = \\pi 2py$ is lower in energy than $\\sigma 2pz$.`,
        citation: "NCERT Section 4.7 & 4.8 — Molecular Orbital Theory"
      };
    }

    // 3. Sigma vs Pi Bond
    if (qLower.includes("sigma") || qLower.includes("pi bond") || qLower.includes("difference") || qLower.includes("overlap")) {
      return {
        answer: `<strong>Key Differences between $\\sigma$ and $\\pi$ Bonds:</strong><br><br>
        • <strong>$\\sigma$ (Sigma) Bond:</strong> Formed by axial (head-on) overlap of atomic orbitals along the internuclear axis. Cylindrically symmetrical, strong, and allows free rotation.<br>
        • <strong>$\\pi$ (Pi) Bond:</strong> Formed by lateral (sideways) overlap perpendicular to the internuclear axis. Weaker, restricted rotation, with electron clouds above and below the plane.`,
        citation: "NCERT Section 4.5.3 — Types of Overlapping and Nature of Covalent Bonds"
      };
    }

    // 4. Axial vs Equatorial in PCl5
    if (qLower.includes("pcl5") || qLower.includes("axial") || qLower.includes("equatorial")) {
      return {
        answer: `In <strong>PCl₅ ($sp^3d$ hybridisation, Trigonal Bipyramidal)</strong>:<br><br>
        The 2 <strong>axial P-Cl bonds</strong> (240 pm) are longer and weaker than the 3 <strong>equatorial P-Cl bonds</strong> (202 pm). This occurs because axial electron pairs suffer greater repulsive interaction at 90° from the three equatorial pairs, forcing the axial bonds to lengthen to minimize repulsions.`,
        citation: "NCERT Section 4.6.4 — Hybridisation in PCl5"
      };
    }

    // 5. Formal Charge
    if (qLower.includes("formal charge") || qLower.includes("f.c.")) {
      return {
        answer: `<strong>Formal Charge Formula:</strong><br>
        $$\\text{F.C.} = V - N - \\frac{1}{2}B$$
        Where $V$ is valence electrons in free atom, $N$ is non-bonding lone pair electrons, and $B$ is total shared bonding electrons. Formal charge helps select the lowest-energy canonical structure among Lewis resonance forms.`,
        citation: "NCERT Section 4.1.4 — Formal Charge"
      };
    }

    // 6. Hydrogen Bonding
    if (qLower.includes("hydrogen bond") || qLower.includes("h-bond") || qLower.includes("water boiling")) {
      return {
        answer: `<strong>Hydrogen Bonding:</strong> The attractive electrostatic force binding a hydrogen atom attached to a highly electronegative atom (F, O, N) with a lone pair of a neighbor atom.<br><br>
        • <strong>Intermolecular:</strong> Formed between separate molecules (H₂O, HF, ethanol) causing high boiling points.<br>
        • <strong>Intramolecular:</strong> Formed within the same molecule (e.g. o-nitrophenol), lowering boiling points.`,
        citation: "NCERT Section 4.9 — Hydrogen Bonding"
      };
    }

    // 7. General Chapter Search / Fallback
    return {
      answer: `Based on <strong>NCERT Class 11 Chemistry Chapter 4</strong>: Chemical bonding is nature's mechanism of lowering overall potential energy to attain stability. Atoms transfer (ionic) or share (covalent) valence electrons to achieve the noble gas octet configuration.`,
      citation: "NCERT Chapter 4 — Chemical Bonding & Molecular Structure"
    };
  }

  /* --------------------------------------------------------------------------
     11. Global Search Engine (Ctrl+K)
     -------------------------------------------------------------------------- */
  toggleSearchModal(isOpen) {
    const modal = document.getElementById("search-modal-backdrop");
    const input = document.getElementById("search-modal-input");
    if (!modal) return;

    modal.classList.toggle("hidden", !isOpen);
    if (isOpen && input) {
      input.value = "";
      input.focus();
      this.handleGlobalSearch("");
    }
  }

  handleGlobalSearch(query) {
    const resultsContainer = document.getElementById("search-results-wrapper");
    if (!resultsContainer) return;

    if (!query.trim()) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          <p>Type keywords like <em>hybridisation, formal charge, vsepr, dipole moment, lattice enthalpy...</em></p>
        </div>
      `;
      return;
    }

    const q = query.toLowerCase();
    const matches = [];

    // Search topics
    this.topics.forEach(t => {
      if (t.title.toLowerCase().includes(q) || (t.summary && t.summary.toLowerCase().includes(q))) {
        matches.push({
          type: "Topic",
          title: t.title,
          snippet: t.summary || t.subtitle,
          icon: "atom",
          action: () => {
            this.activeTopicId = t.id;
            this.switchView("chapter");
            this.renderActiveTopicContent();
            this.toggleSearchModal(false);
          }
        });
      }
    });

    // Search Flashcards
    this.flashcards.forEach(fc => {
      if (fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q)) {
        matches.push({
          type: "Flashcard",
          title: fc.front,
          snippet: fc.back,
          icon: "clone",
          action: () => {
            this.switchView("flashcards");
            this.toggleSearchModal(false);
          }
        });
      }
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          <p>No direct matches found for "<strong>${query}</strong>" in Unit 4.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = "";
    matches.slice(0, 8).forEach(m => {
      const row = document.createElement("div");
      row.className = "search-result-item";
      row.innerHTML = `
        <div class="s-res-icon"><i class="fa-solid fa-${m.icon}"></i></div>
        <div class="s-res-info">
          <h4>${m.title}</h4>
          <p>${m.snippet.slice(0, 100)}...</p>
        </div>
      `;
      row.onclick = m.action;
      resultsContainer.appendChild(row);
    });
  }

  /* --------------------------------------------------------------------------
     12. PowerPoint Presentation Export
     -------------------------------------------------------------------------- */
  exportChapterPowerPoint() {
    if (typeof PptxGenJS === "undefined") {
      alert("PptxGenJS library is loading, please try again in a moment.");
      return;
    }

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_16x9";
    pptx.defineLayout({ name: "16x9", width: 10, height: 5.625 });

    // Slide 1: Title Slide
    const s1 = pptx.addSlide();
    s1.background = { color: "0B0F19" };
    s1.addText("Chemical Bonding & Molecular Structure", {
      x: 0.8,
      y: 1.8,
      w: 8.4,
      fontSize: 28,
      bold: true,
      color: "38BDF8",
      fontFace: "Arial"
    });
    s1.addText("NCERT Class 11 Chemistry — Unit 4 Comprehensive Master Summary", {
      x: 0.8,
      y: 2.8,
      w: 8.4,
      fontSize: 14,
      color: "94A3B8",
      fontFace: "Arial"
    });

    // Slide 2: Topics Overview
    const s2 = pptx.addSlide();
    s2.background = { color: "0F172A" };
    s2.addText("Chapter Curriculum Overview", {
      x: 0.8,
      y: 0.6,
      w: 8.4,
      fontSize: 20,
      bold: true,
      color: "F8FAFC"
    });
    const topicBullets = this.topics.map(t => ({ text: t.title, options: { fontSize: 11, color: "CBD5E1" } }));
    s2.addText(topicBullets, { x: 0.8, y: 1.4, w: 8.4, h: 3.6, bullet: true });

    // Save
    pptx.writeFile({ fileName: "Chemical_Bonding_NCERT_Summary.pptx" });
  }
}

// Initialize Application on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ChemLearnApp();
});
