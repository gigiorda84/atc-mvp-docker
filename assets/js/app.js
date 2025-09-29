// ATC MVP Application JavaScript

class ATCApp {
  constructor() {
    this.currentPage = 'dashboard';
    this.user = {
      name: 'Elena Rossi',
      code: '456789',
      apartment: 'Via Roma 123, App. 4B',
      email: 'elena.rossi@email.com'
    };
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupThemeToggle();
    this.loadPage(this.getCurrentPageFromURL());
  }

  getCurrentPageFromURL() {
    const hash = window.location.hash.substring(1);
    return hash || 'dashboard';
  }

  setupNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('[data-page]');
      if (navLink) {
        e.preventDefault();
        const page = navLink.dataset.page;
        this.navigateTo(page);
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.loadPage(this.getCurrentPageFromURL());
    });
  }

  setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
      });
    }

    if (closeMobileMenuButton && mobileMenu) {
      closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    }

    // Close mobile menu when clicking on a navigation link
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('[data-page]');
      if (navLink && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme',
          document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
      });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  navigateTo(page) {
    window.history.pushState({}, '', `#${page}`);
    this.loadPage(page);
  }

  loadPage(page) {
    this.currentPage = page;
    this.updateActiveNavigation(page);
    this.renderPageContent(page);
  }

  updateActiveNavigation(page) {
    // Update sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('nav-link-active');
      link.classList.add('nav-link');
    });

    document.querySelectorAll(`[data-page="${page}"]`).forEach(link => {
      link.classList.remove('nav-link');
      link.classList.add('nav-link-active');
    });
  }

  renderPageContent(page) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Add fade-in animation
    mainContent.classList.remove('fade-in');
    setTimeout(() => {
      mainContent.classList.add('fade-in');
    }, 10);

    switch (page) {
      case 'dashboard':
        mainContent.innerHTML = this.getDashboardHTML();
        break;
      case 'maintenance':
        mainContent.innerHTML = this.getMaintenanceHTML();
        break;
      case 'communications':
        mainContent.innerHTML = this.getCommunicationsHTML();
        break;
      case 'payments':
        mainContent.innerHTML = this.getPaymentsHTML();
        break;
      case 'support':
        mainContent.innerHTML = this.getSupportHTML();
        break;
      default:
        mainContent.innerHTML = this.getDashboardHTML();
    }

    // Setup page-specific functionality
    this.setupPageInteractions(page);
  }

  setupPageInteractions(page) {
    switch (page) {
      case 'maintenance':
        this.setupMaintenanceInteractions();
        break;
      case 'communications':
        this.setupCommunicationsInteractions();
        break;
      case 'payments':
        this.setupPaymentsInteractions();
        break;
      case 'support':
        this.setupSupportInteractions();
        break;
    }
  }

  setupMaintenanceInteractions() {
    // New ticket modal
    const newTicketBtn = document.getElementById('new-ticket-btn');
    if (newTicketBtn) {
      newTicketBtn.addEventListener('click', () => {
        this.showNewTicketModal();
      });
    }
  }

  setupCommunicationsInteractions() {
    // Document search and filters
    const searchInput = document.getElementById('document-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterDocuments(e.target.value);
      });
    }
  }

  setupPaymentsInteractions() {
    // Payment buttons
    document.querySelectorAll('.pay-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const paymentId = e.target.dataset.paymentId;
        this.processPayment(paymentId);
      });
    });
  }

  setupSupportInteractions() {
    // Chatbot interactions
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleChatMessage();
      });
    }
  }

  showNewTicketModal() {
    // Implementation for new ticket modal
    console.log('Opening new ticket modal');
  }

  filterDocuments(searchTerm) {
    // Implementation for document filtering
    console.log('Filtering documents:', searchTerm);
  }

  processPayment(paymentId) {
    // Implementation for payment processing
    console.log('Processing payment:', paymentId);
  }

  handleChatMessage() {
    // Implementation for chat message handling
    console.log('Handling chat message');
  }

  // Page templates will be added in separate methods
  getDashboardHTML() {
    return `
      <div class="container-wide">
        <div class="page-header">
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Bentornata, ${this.user.name}!</p>
        </div>

        <div class="mb-8">
          <h2 class="section-title">Azioni Rapide</h2>
          <div class="flex flex-col sm:flex-row gap-4">
            <button data-page="maintenance" class="btn-primary">
              <span class="material-symbols-outlined text-lg">construction</span>
              <span>Segnala Manutenzione</span>
            </button>
            <button data-page="payments" class="btn-secondary">
              <span class="material-symbols-outlined text-lg">credit_card</span>
              <span>Effettua un Pagamento</span>
            </button>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="section-title">Riepilogo</h2>
          <div class="content-grid-3">
            <div class="surface p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Richieste Aperte</p>
                  <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">3</p>
                </div>
                <div class="bg-primary/10 text-primary p-3 rounded-xl">
                  <span class="material-symbols-outlined text-2xl">construction</span>
                </div>
              </div>
            </div>
            <div class="surface p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Pagamenti in Scadenza</p>
                  <p class="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">1</p>
                </div>
                <div class="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl">
                  <span class="material-symbols-outlined text-2xl">account_balance</span>
                </div>
              </div>
            </div>
            <div class="surface p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Notifiche</p>
                  <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">5</p>
                </div>
                <div class="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-xl">
                  <span class="material-symbols-outlined text-2xl">notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="section-title">Attività Recenti</h2>
          <div class="space-y-3">
            <div class="surface card-hover card-interactive p-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center rounded-xl bg-primary/10 text-primary w-12 h-12">
                  <span class="material-symbols-outlined text-xl">construction</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-slate-900 dark:text-white">Richiesta di manutenzione per rubinetto che perde</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 truncate">Richiesta #12345 • In corso</p>
                </div>
                <div class="text-right">
                  <div class="text-sm text-slate-500 dark:text-slate-400">2 giorni fa</div>
                  <div class="status-badge bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">In corso</div>
                </div>
              </div>
            </div>
            <div class="surface card-hover card-interactive p-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 w-12 h-12">
                  <span class="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-slate-900 dark:text-white">Pagamento affitto dovuto</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 truncate">Pagamento per Ottobre 2024 • €750,00</p>
                </div>
                <div class="text-right">
                  <div class="text-sm text-slate-500 dark:text-slate-400">5 giorni fa</div>
                  <div class="status-badge bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200">Scade tra 5 giorni</div>
                </div>
              </div>
            </div>
            <div class="surface card-hover card-interactive p-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 w-12 h-12">
                  <span class="material-symbols-outlined text-xl">campaign</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-slate-900 dark:text-white">Nuovo avviso importante</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 truncate">Interruzione servizio idrico programmata</p>
                </div>
                <div class="text-right">
                  <div class="text-sm text-slate-500 dark:text-slate-400">1 settimana fa</div>
                  <div class="status-badge bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">Letto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getMaintenanceHTML() {
    return `
      <div class="max-w-7xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Manutenzione & Assistenza</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Richiedi e monitora le tue richieste di manutenzione.</p>
        </header>

        <!-- Quick Actions -->
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <button id="new-ticket-btn" class="btn-primary flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-base">add_circle</span>
              <span>Nuova Richiesta</span>
            </button>
            <button class="btn-secondary flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-base">call</span>
              <span>Emergenza 24h</span>
            </button>
          </div>
        </div>

        <!-- Current Tickets -->
        <div class="mb-8">
          <div class="card">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Le Tue Richieste</h2>
              <div class="flex gap-2">
                <select class="text-sm border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <option>Tutte</option>
                  <option>Aperte</option>
                  <option>In corso</option>
                  <option>Completate</option>
                </select>
              </div>
            </div>

            <div class="space-y-4">
              <!-- Ticket 1 -->
              <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <span class="text-sm font-mono text-slate-500 dark:text-slate-400">#12345</span>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full status-badge-in-progress">In corso</span>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full priority-high">Alta priorità</span>
                    </div>
                    <h3 class="font-semibold text-slate-900 dark:text-white mb-1">Perdita d'acqua dal rubinetto della cucina</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Categoria: Idraulica • Creato il 15/03/2024</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Assegnato a: Marco Fontana (Idraulico) • SLA: 48 ore</p>
                  </div>
                  <div class="flex flex-col sm:items-end gap-2">
                    <button class="text-primary hover:underline text-sm font-medium">Visualizza dettagli</button>
                    <div class="text-xs text-slate-500 dark:text-slate-400">Ultima modifica: 2 ore fa</div>
                  </div>
                </div>
              </div>

              <!-- Ticket 2 -->
              <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <span class="text-sm font-mono text-slate-500 dark:text-slate-400">#12344</span>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full status-badge-pending">In attesa</span>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full priority-medium">Media priorità</span>
                    </div>
                    <h3 class="font-semibold text-slate-900 dark:text-white mb-1">Sostituzione lampadina corridoio</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Categoria: Elettricità • Creato il 10/03/2024</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Non ancora assegnato • SLA: 5 giorni lavorativi</p>
                  </div>
                  <div class="flex flex-col sm:items-end gap-2">
                    <button class="text-primary hover:underline text-sm font-medium">Visualizza dettagli</button>
                    <div class="text-xs text-slate-500 dark:text-slate-400">Ultima modifica: 1 giorno fa</div>
                  </div>
                </div>
              </div>

              <!-- Ticket 3 -->
              <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <span class="text-sm font-mono text-slate-500 dark:text-slate-400">#12343</span>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full status-badge-completed">Completato</span>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full priority-low">Bassa priorità</span>
                    </div>
                    <h3 class="font-semibold text-slate-900 dark:text-white mb-1">Riparazione serratura porta d'ingresso</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Categoria: Serrature • Completato il 05/03/2024</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Completato da: Giuseppe Bianchi (Fabbro)</p>
                  </div>
                  <div class="flex flex-col sm:items-end gap-2">
                    <button class="text-primary hover:underline text-sm font-medium">Visualizza dettagli</button>
                    <div class="text-xs text-green-600 dark:text-green-400">✓ Verificato</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Two column layout for additional info -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Emergency Contacts -->
          <div class="card">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Contatti di Emergenza</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <span class="font-medium text-slate-900 dark:text-white">Emergenze 24h</span>
                  <p class="text-sm text-slate-500 dark:text-slate-400">Guasti gravi, allagamenti</p>
                </div>
                <a href="tel:112" class="btn-primary">112</a>
              </div>
              <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <span class="font-medium text-slate-900 dark:text-white">Amministratore</span>
                  <p class="text-sm text-slate-500 dark:text-slate-400">Luca Bianchi</p>
                </div>
                <a href="tel:+393331234567" class="btn-secondary">333 123 4567</a>
              </div>
              <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <span class="font-medium text-slate-900 dark:text-white">Custode</span>
                  <p class="text-sm text-slate-500 dark:text-slate-400">Giovanni Verdi</p>
                </div>
                <a href="tel:+393339876543" class="btn-secondary">333 987 6543</a>
              </div>
            </div>
          </div>

          <!-- Maintenance Reminders -->
          <div class="card">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Promemoria Manutenzione</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="bg-primary/10 text-primary p-2 rounded-lg">
                    <span class="material-symbols-outlined text-lg">local_fire_department</span>
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white">Revisione caldaia</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Scadenza: 15/11/2024</p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="bg-primary/10 text-primary p-2 rounded-lg">
                    <span class="material-symbols-outlined text-lg">electrical_services</span>
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white">Controllo impianto elettrico</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Scadenza: 01/06/2025</p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="bg-primary/10 text-primary p-2 rounded-lg">
                    <span class="material-symbols-outlined text-lg">hvac</span>
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white">Pulizia filtri condizionatore</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Scadenza: 01/04/2024</p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getCommunicationsHTML() {
    return `
      <div class="max-w-7xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Comunicazioni & Documenti</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Avvisi ATC, documenti e notifiche.</p>
        </header>

        <!-- Search and Filters -->
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input
                id="document-search"
                type="text"
                placeholder="Cerca documenti, avvisi..."
                class="form-input w-full"
              >
            </div>
            <div class="flex gap-2">
              <select class="text-sm border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <option>Tutti i tipi</option>
                <option>Avvisi</option>
                <option>Documenti</option>
                <option>Bollette</option>
                <option>Contratti</option>
              </select>
              <select class="text-sm border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav class="-mb-px flex space-x-8">
            <button class="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Avvisi Recenti
            </button>
            <button class="border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Documenti
            </button>
            <button class="border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Archivio
            </button>
          </nav>
        </div>

        <!-- Recent Announcements -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-6 text-slate-900 dark:text-white">Avvisi Recenti</h2>
          <div class="space-y-6">
            <!-- Important Announcement -->
            <article class="card card-hover border-l-4 border-l-red-500">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200">IMPORTANTE</span>
                    <span class="text-sm text-slate-500 dark:text-slate-400">25 Settembre 2024</span>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Interruzione servizio idrico programmata</h3>
                  <p class="text-slate-600 dark:text-slate-300 mb-3">Il servizio idrico sarà interrotto domenica 29 settembre dalle ore 8:00 alle 16:00 per lavori di manutenzione straordinaria alla rete. Si consiglia di fare scorta d'acqua.</p>
                  <div class="flex items-center gap-4 text-sm">
                    <button class="text-primary hover:underline font-medium">Leggi tutto</button>
                    <span class="text-slate-500 dark:text-slate-400">• Pubblicato da ATC Manutenzioni</span>
                  </div>
                </div>
                <div class="md:w-1/3">
                  <div class="h-32 md:h-full rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <span class="material-symbols-outlined text-4xl text-slate-400">water_drop</span>
                  </div>
                </div>
              </div>
            </article>

            <!-- Regular Announcement -->
            <article class="card card-hover">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">INFORMAZIONI</span>
                    <span class="text-sm text-slate-500 dark:text-slate-400">20 Settembre 2024</span>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Nuove procedure per la segnalazione guasti</h3>
                  <p class="text-slate-600 dark:text-slate-300 mb-3">A partire dal 1 ottobre 2024, tutte le segnalazioni di guasti dovranno essere effettuate tramite il nuovo portale online. Non saranno più accettate segnalazioni telefoniche per guasti non urgenti.</p>
                  <div class="flex items-center gap-4 text-sm">
                    <button class="text-primary hover:underline font-medium">Leggi tutto</button>
                    <span class="text-slate-500 dark:text-slate-400">• Pubblicato da ATC Comunicazioni</span>
                  </div>
                </div>
                <div class="md:w-1/3">
                  <div class="h-32 md:h-full rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <span class="material-symbols-outlined text-4xl text-slate-400">construction</span>
                  </div>
                </div>
              </div>
            </article>

            <!-- Community Announcement -->
            <article class="card card-hover">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">COMUNITÀ</span>
                    <span class="text-sm text-slate-500 dark:text-slate-400">15 Settembre 2024</span>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Aggiornamento regolamento condominio</h3>
                  <p class="text-slate-600 dark:text-slate-300 mb-3">Il regolamento di condominio è stato aggiornato con nuove disposizioni riguardanti l'utilizzo degli spazi comuni, la gestione dei rifiuti e gli orari di silenzio. Il documento è disponibile nella sezione documenti.</p>
                  <div class="flex items-center gap-4 text-sm">
                    <button class="text-primary hover:underline font-medium">Scarica PDF</button>
                    <span class="text-slate-500 dark:text-slate-400">• Pubblicato da Amministratore</span>
                  </div>
                </div>
                <div class="md:w-1/3">
                  <div class="h-32 md:h-full rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <span class="material-symbols-outlined text-4xl text-slate-400">description</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Documents Section -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Documenti Importanti</h2>
            <button class="btn-secondary text-sm">Visualizza tutti</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Contract Document -->
            <div class="card card-hover">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-primary/10 text-primary p-2 rounded-lg">
                  <span class="material-symbols-outlined">description</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-slate-900 dark:text-white">Contratto di Locazione</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">PDF • 1.2 MB</p>
                </div>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mb-3">Contratto di locazione in corso di validità, aggiornato al 2024.</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-500 dark:text-slate-400">01/01/2024</span>
                <button class="text-primary hover:underline text-sm font-medium">Scarica</button>
              </div>
            </div>

            <!-- Building Rules -->
            <div class="card card-hover">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-primary/10 text-primary p-2 rounded-lg">
                  <span class="material-symbols-outlined">rule</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-slate-900 dark:text-white">Regolamento Condominio</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">PDF • 896 KB</p>
                </div>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mb-3">Regolamento aggiornato con le nuove disposizioni.</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-500 dark:text-slate-400">15/09/2024</span>
                <button class="text-primary hover:underline text-sm font-medium">Scarica</button>
              </div>
            </div>

            <!-- Utility Manual -->
            <div class="card card-hover">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-primary/10 text-primary p-2 rounded-lg">
                  <span class="material-symbols-outlined">menu_book</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-slate-900 dark:text-white">Manuale d'uso Alloggio</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">PDF • 2.1 MB</p>
                </div>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mb-3">Guida completa per l'utilizzo dell'alloggio.</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-500 dark:text-slate-400">01/06/2024</span>
                <button class="text-primary hover:underline text-sm font-medium">Scarica</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Notifications -->
        <div>
          <h2 class="text-xl font-bold mb-6 text-slate-900 dark:text-white">Notifiche Recenti</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">notifications</span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-slate-800 dark:text-slate-200">Nuovo avviso importante disponibile</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">25 Settembre 2024, 14:30</p>
              </div>
              <div class="w-2 h-2 bg-primary rounded-full"></div>
            </div>

            <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">description</span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-slate-800 dark:text-slate-200">Documento aggiornato: Regolamento</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">20 Settembre 2024, 10:15</p>
              </div>
            </div>

            <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">campaign</span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-slate-800 dark:text-slate-200">Nuove procedure per segnalazioni</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">15 Settembre 2024, 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getPaymentsHTML() {
    return `
      <div class="max-w-7xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Pagamenti & Pratiche</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Gestisci i tuoi pagamenti e pratiche amministrative.</p>
        </header>

        <!-- Payment Summary Cards -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Outstanding Balance -->
            <div class="card border-l-4 border-l-red-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 font-medium">Saldo da Pagare</p>
                  <p class="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">€ 1.247,50</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">2 fatture in scadenza</p>
                </div>
                <div class="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg">
                  <span class="material-symbols-outlined text-2xl">account_balance</span>
                </div>
              </div>
            </div>

            <!-- This Month -->
            <div class="card border-l-4 border-l-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 font-medium">Questo Mese</p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">€ 825,00</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Canone + Spese</p>
                </div>
                <div class="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg">
                  <span class="material-symbols-outlined text-2xl">receipt_long</span>
                </div>
              </div>
            </div>

            <!-- Paid This Year -->
            <div class="card border-l-4 border-l-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-500 dark:text-slate-400 font-medium">Pagato nel 2024</p>
                  <p class="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">€ 7.425,00</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">9 pagamenti</p>
                </div>
                <div class="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg">
                  <span class="material-symbols-outlined text-2xl">paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Tabs -->
        <div class="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav class="-mb-px flex space-x-8">
            <button class="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Da Pagare
            </button>
            <button class="border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Storico Pagamenti
            </button>
            <button class="border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Pratiche Digitali
            </button>
          </nav>
        </div>

        <!-- Outstanding Payments -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Pagamenti in Scadenza</h2>
            <button class="btn-primary">Paga Tutto (€ 1.247,50)</button>
          </div>

          <div class="space-y-4">
            <!-- Rent Payment -->
            <div class="card border border-red-200 dark:border-red-800">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="flex items-center gap-4 flex-1">
                  <div class="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg">
                    <span class="material-symbols-outlined">home</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-slate-900 dark:text-white">Canone di Locazione</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Ottobre 2024 • Riferimento: CN-2024-10</p>
                    <div class="flex items-center gap-4 mt-2">
                      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200">Scade tra 3 giorni</span>
                      <span class="text-sm text-slate-500 dark:text-slate-400">Scadenza: 31/10/2024</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                  <div class="text-right">
                    <p class="text-2xl font-bold text-slate-900 dark:text-white">€ 750,00</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">IVA inclusa</p>
                  </div>
                  <div class="flex gap-2">
                    <button class="btn-secondary text-sm">Dettagli</button>
                    <button class="pay-button btn-primary" data-payment-id="rent-2024-10">Paga Ora</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Condo Fees -->
            <div class="card border border-orange-200 dark:border-orange-800">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="flex items-center gap-4 flex-1">
                  <div class="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 p-3 rounded-lg">
                    <span class="material-symbols-outlined">apartment</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-slate-900 dark:text-white">Spese Condominiali</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Trimestre Q3 2024 • Riferimento: SC-2024-Q3</p>
                    <div class="flex items-center gap-4 mt-2">
                      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">Scade tra 12 giorni</span>
                      <span class="text-sm text-slate-500 dark:text-slate-400">Scadenza: 15/11/2024</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                  <div class="text-right">
                    <p class="text-2xl font-bold text-slate-900 dark:text-white">€ 497,50</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">IVA inclusa</p>
                  </div>
                  <div class="flex gap-2">
                    <button class="btn-secondary text-sm">Dettagli</button>
                    <button class="pay-button btn-primary" data-payment-id="condo-2024-q3">Paga Ora</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="mb-8">
          <div class="card">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Metodi di Pagamento</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- PagoPA -->
              <div class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                <div class="flex items-center gap-4">
                  <div class="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg">
                    <span class="material-symbols-outlined">account_balance</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900 dark:text-white">PagoPA</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-300">Pagamento sicuro tramite il sistema nazionale</p>
                    <p class="text-xs text-green-600 dark:text-green-400 font-medium mt-1">✓ Consigliato</p>
                  </div>
                </div>
              </div>

              <!-- Credit Card -->
              <div class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                <div class="flex items-center gap-4">
                  <div class="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-3 rounded-lg">
                    <span class="material-symbols-outlined">credit_card</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900 dark:text-white">Carta di Credito</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-300">Visa, Mastercard, American Express</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Commissioni applicate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Digital Practices Section -->
        <div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Pratiche Digitali</h2>
            <button class="btn-primary">Nuova Pratica</button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Active Practices -->
            <div class="card">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Pratiche in Corso</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded">
                      <span class="material-symbols-outlined text-sm">description</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">Richiesta cambio serratura</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">Prot. PR-2024-0156 • In lavorazione</p>
                    </div>
                  </div>
                  <button class="text-primary hover:underline text-sm font-medium">Visualizza</button>
                </div>

                <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-2 rounded">
                      <span class="material-symbols-outlined text-sm">verified</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">Autocertificazione ISEE</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">Prot. PR-2024-0134 • Approvata</p>
                    </div>
                  </div>
                  <button class="text-primary hover:underline text-sm font-medium">Scarica</button>
                </div>
              </div>
            </div>

            <!-- Available Forms -->
            <div class="card">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Moduli Disponibili</h3>
              <div class="space-y-3">
                <button class="w-full text-left p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="bg-primary/10 text-primary p-2 rounded">
                      <span class="material-symbols-outlined text-sm">person</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">Variazione nucleo familiare</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">Comunica cambiamenti nel nucleo</p>
                    </div>
                  </div>
                </button>

                <button class="w-full text-left p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="bg-primary/10 text-primary p-2 rounded">
                      <span class="material-symbols-outlined text-sm">attach_money</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">Richiesta rateizzazione</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">Per pagamenti in ritardo</p>
                    </div>
                  </div>
                </button>

                <button class="w-full text-left p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="bg-primary/10 text-primary p-2 rounded">
                      <span class="material-symbols-outlined text-sm">key</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">Autorizzazione lavori</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">Per modifiche all'alloggio</p>
                    </div>
                  </div>
                </button>

                <button class="w-full text-left p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="bg-primary/10 text-primary p-2 rounded">
                      <span class="material-symbols-outlined text-sm">pets</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-900 dark:text-white">Autorizzazione animali</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">Per tenere animali domestici</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getSupportHTML() {
    return `
      <div class="max-w-7xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Supporto & Servizi</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Assistenza, FAQ e servizi per la comunità.</p>
        </header>

        <!-- Quick Help Actions -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Chat Support -->
            <div class="card card-hover cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="bg-primary/10 text-primary p-3 rounded-lg">
                  <span class="material-symbols-outlined text-2xl">support_agent</span>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white">Chat con Operatore</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-300">Disponibile Lun-Ven 9:00-17:00</p>
                  <p class="text-xs text-green-600 dark:text-green-400 font-medium mt-1">● Online ora</p>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div class="card card-hover cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg">
                  <span class="material-symbols-outlined text-2xl">help</span>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white">Domande Frequenti</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-300">Trova risposte immediate</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">45+ articoli disponibili</p>
                </div>
              </div>
            </div>

            <!-- Call Center -->
            <div class="card card-hover cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 p-3 rounded-lg">
                  <span class="material-symbols-outlined text-2xl">call</span>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white">Chiama il Supporto</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-300">800 123 456</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Lun-Ven 8:30-17:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chatbot Section -->
        <div class="mb-8">
          <div class="card">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-primary/10 text-primary p-2 rounded-lg">
                <span class="material-symbols-outlined">smart_toy</span>
              </div>
              <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Assistente Virtuale ATC</h2>
            </div>

            <!-- Chat Messages -->
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
              <div class="space-y-4">
                <!-- Bot Welcome Message -->
                <div class="flex items-start gap-3">
                  <div class="bg-primary text-white p-2 rounded-lg">
                    <span class="material-symbols-outlined text-sm">smart_toy</span>
                  </div>
                  <div class="flex-1">
                    <div class="bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm">
                      <p class="text-slate-900 dark:text-white">Ciao Elena! Sono l'assistente virtuale di ATC. Come posso aiutarti oggi?</p>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Ora</p>
                  </div>
                </div>

                <!-- Quick Suggestions -->
                <div class="flex flex-wrap gap-2 ml-12">
                  <button class="btn-secondary text-sm">Come faccio una segnalazione?</button>
                  <button class="btn-secondary text-sm">Quando scade l'affitto?</button>
                  <button class="btn-secondary text-sm">Orari raccolta rifiuti</button>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <form id="chat-form" class="flex gap-3">
              <input
                type="text"
                placeholder="Scrivi la tua domanda..."
                class="form-input flex-1"
                id="chat-input"
              >
              <button type="submit" class="btn-primary">Invia</button>
            </form>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-6 text-slate-900 dark:text-white">Domande Frequenti</h2>
          <div class="space-y-4">
            <!-- FAQ Item -->
            <details class="card group">
              <summary class="flex items-center justify-between cursor-pointer">
                <h3 class="font-semibold text-slate-900 dark:text-white">Come posso segnalare un guasto?</h3>
                <span class="material-symbols-outlined transform group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p class="text-slate-600 dark:text-slate-300 mb-3">
                  Puoi segnalare un guasto in diversi modi:
                </p>
                <ol class="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Tramite la sezione "Manutenzione" di questo portale (consigliato)</li>
                  <li>Chiamando il numero di emergenza 112 per guasti gravi</li>
                  <li>Contattando l'amministratore al 333 123 4567</li>
                </ol>
                <p class="text-slate-600 dark:text-slate-300 mt-3">
                  Il portale ti permette di allegare foto e ricevere aggiornamenti in tempo reale.
                </p>
              </div>
            </details>

            <details class="card group">
              <summary class="flex items-center justify-between cursor-pointer">
                <h3 class="font-semibold text-slate-900 dark:text-white">Quando devo pagare l'affitto?</h3>
                <span class="material-symbols-outlined transform group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p class="text-slate-600 dark:text-slate-300">
                  L'affitto deve essere pagato entro il giorno 31 di ogni mese. Riceverai una notifica 7 giorni prima della scadenza.
                  Le spese condominiali sono addebitate trimestralmente.
                </p>
              </div>
            </details>

            <details class="card group">
              <summary class="flex items-center justify-between cursor-pointer">
                <h3 class="font-semibold text-slate-900 dark:text-white">Come posso modificare i miei dati personali?</h3>
                <span class="material-symbols-outlined transform group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p class="text-slate-600 dark:text-slate-300">
                  Puoi aggiornare i tuoi dati accedendo alla sezione "Profilo" oppure compilando il modulo
                  "Variazione nucleo familiare" nella sezione Pagamenti & Pratiche.
                </p>
              </div>
            </details>

            <details class="card group">
              <summary class="flex items-center justify-between cursor-pointer">
                <h3 class="font-semibold text-slate-900 dark:text-white">Posso tenere animali domestici?</h3>
                <span class="material-symbols-outlined transform group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p class="text-slate-600 dark:text-slate-300">
                  È necessaria un'autorizzazione preventiva. Compila il modulo "Autorizzazione animali"
                  nella sezione Pagamenti & Pratiche specificando tipo, razza e dimensione dell'animale.
                </p>
              </div>
            </details>
          </div>
        </div>

        <!-- Local Services -->
        <div>
          <h2 class="text-xl font-bold mb-6 text-slate-900 dark:text-white">Servizi Locali</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Waste Collection -->
            <div class="card card-hover">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-2 rounded-lg">
                  <span class="material-symbols-outlined">delete</span>
                </div>
                <h3 class="font-semibold text-slate-900 dark:text-white">Raccolta Rifiuti</h3>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Calendario e info sulla raccolta differenziata per la tua zona.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Organico:</span>
                  <span class="text-slate-900 dark:text-white font-medium">Lun, Mer, Ven</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Carta:</span>
                  <span class="text-slate-900 dark:text-white font-medium">Martedì</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Plastica:</span>
                  <span class="text-slate-900 dark:text-white font-medium">Giovedì</span>
                </div>
              </div>
            </div>

            <!-- Public Transport -->
            <div class="card card-hover">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                  <span class="material-symbols-outlined">directions_bus</span>
                </div>
                <h3 class="font-semibold text-slate-900 dark:text-white">Trasporti Pubblici</h3>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Orari e percorsi dei mezzi pubblici nelle vicinanze.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Linea 42:</span>
                  <span class="text-slate-900 dark:text-white font-medium">5 min</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Linea 18:</span>
                  <span class="text-slate-900 dark:text-white font-medium">12 min</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Metro A:</span>
                  <span class="text-slate-900 dark:text-white font-medium">450m</span>
                </div>
              </div>
            </div>

            <!-- Community Spaces -->
            <div class="card card-hover">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-2 rounded-lg">
                  <span class="material-symbols-outlined">event</span>
                </div>
                <h3 class="font-semibold text-slate-900 dark:text-white">Spazi Comuni</h3>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Prenota gli spazi comuni per eventi e riunioni.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Sala riunioni:</span>
                  <span class="text-green-600 dark:text-green-400 font-medium">Disponibile</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Giardino:</span>
                  <span class="text-green-600 dark:text-green-400 font-medium">Disponibile</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Area barbecue:</span>
                  <span class="text-red-600 dark:text-red-400 font-medium">Occupata</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ATCApp();
});